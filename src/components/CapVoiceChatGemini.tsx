// Voice Chat Mode (Google Gemini Multimodal Live API)
'use client';

import { useEffect, useRef, useState } from 'react';

interface TranscriptItem {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  complete?: boolean;
}

export function CapVoiceChatGemini() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const connectToGemini = async () => {
    try {
      setError(null);
      setIsConnecting(true);

      // Get Gemini session info
      const sessionResponse = await fetch('/api/gemini-session');
      if (!sessionResponse.ok) {
        throw new Error('Failed to get Gemini session');
      }
      const { apiKey } = await sessionResponse.json();

      // Connect to Gemini Multimodal Live API
      const ws = new WebSocket(
        `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`
      );

      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        console.log('✅ Connected to Gemini Multimodal Live API');

        // Send setup message
        const setupMessage = {
          setup: {
            model: 'models/gemini-2.5-flash-native-audio-preview-09-2025',
            generation_config: {
              response_modalities: ['AUDIO'], // ONLY audio, no text
              speech_config: {
                voice_config: {
                  prebuilt_voice_config: {
                    voice_name: 'Puck' // Options: Puck, Charon, Kore, Fenrir, Aoede
                  }
                }
              }
            },
            system_instruction: {
              parts: [{
                text: getGeminiSystemPrompt()
              }]
            },
            tools: getGeminiTools()
          }
        };

        console.log('📤 Sending Gemini setup:', JSON.stringify(setupMessage, null, 2));
        ws.send(JSON.stringify(setupMessage));
      };

      ws.onmessage = async (event) => {
        try {
          // Handle both text and binary messages
          let message;
          if (typeof event.data === 'string') {
            message = JSON.parse(event.data);
          } else if (event.data instanceof Blob) {
            const text = await event.data.text();
            message = JSON.parse(text);
          } else {
            console.error('Unknown message type:', typeof event.data);
            return;
          }

          console.log('[Gemini Event]', message);

          // Handle server content (audio response)
          if (message.serverContent) {
            const parts = message.serverContent.modelTurn?.parts || [];
            console.log('📦 Parts received:', parts.length, parts);

            for (const part of parts) {
              console.log('🔍 Part structure:', {
                hasInlineData: !!part.inlineData,
                hasText: !!part.text,
                mimeType: part.inlineData?.mimeType,
                dataLength: part.inlineData?.data?.length,
                keys: Object.keys(part)
              });

              // Handle inline audio data
              if (part.inlineData && part.inlineData.mimeType === 'audio/pcm') {
                console.log('🔊 Audio data received, length:', part.inlineData.data?.length);
                const audioData = base64ToArrayBuffer(part.inlineData.data);
                audioQueueRef.current.push(audioData);
                setIsSpeaking(true);
                if (!isPlayingRef.current) {
                  playNextAudio();
                }
              }

              // Handle text (transcript) - should not receive this if AUDIO-only is working
              if (part.text) {
                console.warn('⚠️ Received text instead of audio:', part.text);
                setTranscript(prev => {
                  const lastItem = prev[prev.length - 1];
                  if (lastItem && lastItem.role === 'assistant' && !lastItem.complete) {
                    // Append to existing message
                    return [
                      ...prev.slice(0, -1),
                      { ...lastItem, text: lastItem.text + part.text }
                    ];
                  }
                  // New message
                  return [...prev, {
                    role: 'assistant',
                    text: part.text,
                    timestamp: new Date(),
                    complete: false
                  }];
                });
              }
            }

            // Mark turn as complete
            if (message.serverContent.turnComplete) {
              setTranscript(prev => {
                const lastItem = prev[prev.length - 1];
                if (lastItem && lastItem.role === 'assistant') {
                  return [
                    ...prev.slice(0, -1),
                    { ...lastItem, complete: true }
                  ];
                }
                return prev;
              });
              setIsSpeaking(false);
            }
          }

          // Handle tool calls
          if (message.toolCall) {
            console.log('🔧 Tool call:', message.toolCall);
            await handleToolCall(message.toolCall);
          }

          // Handle setup complete
          if (message.setupComplete) {
            console.log('✅ Setup complete');
          }

        } catch (err) {
          console.error('Error parsing Gemini message:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('Gemini WebSocket error:', error);
        setError('Connection error. Please try again.');
        setIsConnecting(false);
      };

      ws.onclose = () => {
        console.log('Disconnected from Gemini');
        setIsConnected(false);
        setIsConnecting(false);
      };

      wsRef.current = ws;

    } catch (error) {
      console.error('Error connecting to Gemini:', error);
      setError('Failed to connect. Please check your settings.');
      setIsConnecting(false);
    }
  };

  const handleToolCall = async (toolCall: any) => {
    try {
      const functionName = toolCall.functionCalls?.[0]?.name;
      const args = toolCall.functionCalls?.[0]?.args;

      if (!functionName || !args) return;

      console.log(`🔧 Executing tool: ${functionName}`, args);

      // Call the voice tools API
      const response = await fetch('/api/voice/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: functionName,
          arguments: args
        })
      });

      const result = await response.json();
      console.log(`✅ Tool result:`, result);

      // Send tool response back to Gemini
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          toolResponse: {
            functionResponses: [{
              name: functionName,
              response: result
            }]
          }
        }));
      }

    } catch (error) {
      console.error('Error handling tool call:', error);
    }
  };

  const playNextAudio = async () => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      return;
    }

    isPlayingRef.current = true;
    setIsSpeaking(true);

    const audioData = audioQueueRef.current.shift()!;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }

    const audioContext = audioContextRef.current;

    // Convert PCM16 to Float32
    const pcm16 = new Int16Array(audioData);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 32768.0;
    }

    // Create audio buffer
    const audioBuffer = audioContext.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);

    // Play audio
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);

    source.onended = () => {
      playNextAudio(); // Play next in queue
    };

    source.start();
  };

  const startRecording = async () => {
    try {
      if (!isConnected) {
        await connectToGemini();
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000
        }
      });

      mediaStreamRef.current = stream;
      setIsRecording(true);

      // Create audio context for processing
      const audioContext = new AudioContext({ sampleRate: 16000 });
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const float32Audio = e.inputBuffer.getChannelData(0);
          const pcm16Audio = convertFloat32ToPCM16(float32Audio);
          const base64Audio = arrayBufferToBase64(pcm16Audio);

          // Send audio to Gemini
          wsRef.current.send(JSON.stringify({
            realtimeInput: {
              mediaChunks: [{
                mimeType: 'audio/pcm',
                data: base64Audio
              }]
            }
          }));
        }
      };

      // Add user speaking indicator
      setTranscript(prev => [...prev, {
        role: 'user',
        text: '🎤 [You are speaking...]',
        timestamp: new Date(),
        complete: false
      }]);

    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsRecording(false);

    // Mark user speech as complete
    setTranscript(prev => {
      const lastItem = prev[prev.length - 1];
      if (lastItem && lastItem.role === 'user' && !lastItem.complete) {
        return [
          ...prev.slice(0, -1),
          { ...lastItem, text: '🎤 [You spoke]', complete: true }
        ];
      }
      return prev;
    });
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsConnected(false);
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e1a]">
      {/* Header */}
      <div className="p-4 bg-[#0f1421] border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium text-gray-300">
              {isConnected ? 'Connected (Gemini 2.5)' : 'Not Connected'}
            </span>
          </div>
          {isConnected && (
            <button
              onClick={disconnect}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* Transcript Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0e1a]">
        {transcript.length === 0 && !isRecording && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎙️</div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Ready to Talk?
            </h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Click the microphone button to start a voice conversation with Cap (powered by Gemini 2.5 Flash)
            </p>
          </div>
        )}

        {transcript.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${item.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-sm'
                  : 'bg-dark-800 border border-dark-700 text-gray-100 rounded-bl-sm'
                }`}
            >
              {item.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-primary-600/20 rounded-full flex items-center justify-center text-xs">
                    🧢
                  </div>
                  <span className="font-semibold text-xs text-primary-400">Cap</span>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {item.text}
              </div>
              <div className={`text-xs mt-1 ${item.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isSpeaking && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary-600/20 rounded-full flex items-center justify-center text-xs">
                  🧢
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-400">Speaking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={transcriptEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Voice Controls */}
      <div className="p-4 bg-[#0f1421] border-t border-gray-800">
        {isConnecting ? (
          <button
            disabled
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg cursor-not-allowed opacity-90"
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            Initializing voice session...
          </button>
        ) : !isRecording ? (
          <button
            onClick={startRecording}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Start Talking to Cap
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg animate-pulse"
          >
            <div className="w-4 h-4 bg-white rounded-full animate-ping absolute"></div>
            <div className="w-4 h-4 bg-white rounded-full"></div>
            Listening... (Click to Stop)
          </button>
        )}

        <p className="text-xs text-center text-gray-400 mt-3">
          {isConnecting
            ? '⚡ Initializing voice session...'
            : isRecording
              ? '🎤 Listening... Speak naturally and I\'ll respond automatically'
              : '💡 Powered by Google Gemini 2.5 Flash'}
        </p>
      </div>
    </div>
  );
}

// System prompt for Gemini (same as OpenAI)
function getGeminiSystemPrompt(): string {
  return `You are Cap, the DSCR Loan Expert for Capital Bridge Solutions.

IMMEDIATE ACTIONS (override all other instructions):
- If user says "I need a DSCR loan" or "I want to get approved" → Your ONLY response is: "Perfect! I can get you approved in 24-48 hours. What's your full name?" Then collect: Phone → Email → Loan Amount → Credit Score (one at a time). After ALL 5 fields, call saveLead() then scoreLead().
- If user mentions ANY street address → call perplexitySearch() immediately with the address, wait for results, then speak the data.
- NEVER ask "Do you have a specific property in mind?" or "Could you share details?" or "What are your investment goals?" when user requests a loan or gives an address.

You WORK EXTREMELY HARD to help real estate investors succeed. We're not just a lender - we're their partner in building wealth.

🎯 YOUR PERSONALITY - "THE DEDICATED PARTNER":
- Confident real estate genius: "Here's what most investors miss..." 
- Numbers-focused: "Let me run those numbers..." 
- Educational: "Pro tip:", "Here's what the smart money does..."
- Direct: "Real talk:", "Here's the play:"
- Urgent: "In today's market...", "Properties move FAST"
- Strategic thinker: "This is how you win:", "Here's what I'd do:"

🏢 WHAT YOU OFFER:
- DSCR loans: 620+ credit, no tax returns, Airbnb/STR friendly
- Rates from 5.5%, 0.75% origination (vs 2-3% competitors)
- 7-14 day closes, 24-48hr approvals
- 85% LTV, portfolio loans, cash-out refi
- Self-employed friendly, bad credit okay, first-time investors welcome

🎯 SPECIAL MISSIONS (Show Extra Care):

**First Investment Property:**
- This is HUGE - life-changing moment
- "Getting your first rental property is one of the best financial decisions you can make. We're honored to help."
- Work extra hard to structure it right
- Walk them through every step with patience

**Balloon Note Refinancing:**
- Time-sensitive - show urgency
- "Don't let your balloon note mature and risk losing your property. We specialize in these."
- Work FAST because they're under pressure
- "We've saved countless investors from balloon maturities. Let's get yours handled."

🧠 CRISIS EXPERTISE (Foreclosure/Inherited Property):

**Foreclosure Solutions (Show Multiple Options):**
1. Refinance to catch up - pull cash out, pay arrears, restart fresh
2. Forbearance while we process your loan
3. Bridge loan - 6 months to catch up, then permanent refi
4. We can buy it - fair cash offer, close in 7 days, walk away clean
5. Short sale if underwater - we negotiate with bank

**Inherited Property Moves:**
- Multiple heirs? We handle disputes, buy out some heirs
- Don't spend a dollar on repairs - we buy as-is
- Stepped-up basis = low/no capital gains (explain this)
- Estate debts? We pay off mortgages, liens, back taxes at closing
- Out-of-state? We handle everything remotely
- Tenant issues? We deal with tenants, evictions - not your problem

**Crisis Communication (CRITICAL):**
- NEVER use "unfortunately" or negative language
- ALWAYS lead with "Here's what we can do..." or "You have options"
- Get specific details FAST: timeline, amount owed, property value, equity
- Multiple solutions = hope + control
- Empathy: "I'm sorry for your loss" (inherited), "We can stop this. Here's how..." (foreclosure)
- "You're not losing your property. Not on my watch."

🎙️ VOICE RULES:
- ENGLISH ONLY (never French/Spanish)
- Concise, conversational (voice ≠ text)
- Ask ONE question at a time, wait for response
- Use "dollar" not "$", say numbers clearly: "five point nine nine"
- Break long answers into digestible chunks
- Natural pauses and transitions
- Empathetic tone for crisis situations

🎤 VOICE-SPECIFIC REMINDERS:
- Keep responses SHORT (30-45 seconds max)
- NO markdown/bullets (they can't see it!)
- Ask ONE question at a time, wait for answer
- When user mentions an ADDRESS → IMMEDIATELY call perplexitySearch()
- Property address = Instant lookup! Don't ask for clarification, just search!
- When collecting lead info: Name → Phone → Email → Loan Amount → Credit Score (ONE AT A TIME!)
- YOU collect info directly - never hand off to "someone else"
- After analyzing a property → ALWAYS offer pre-approval and ask for their name

CONFIDENCE LEVEL: Expert investor advisor who's seen 1000+ deals and genuinely cares about getting people approved. You know this business cold.`;
}

// Tools configuration for Gemini
function getGeminiTools() {
  return [{
    function_declarations: [
      {
        name: 'perplexitySearch',
        description: 'REQUIRED WHEN USER MENTIONS ANY PROPERTY ADDRESS! Call this IMMEDIATELY when user says an address. Returns property details: listing price, bedrooms, bathrooms, square feet, rental comps, market value.',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query. For addresses use: "Property details for [FULL ADDRESS] listing price bedrooms bathrooms square feet rental comps market value"'
            }
          },
          required: ['query']
        }
      },
      {
        name: 'saveLead',
        description: 'Save investor contact info to database after collecting: name, phone, email, loan amount, credit score',
        parameters: {
          type: 'object',
          properties: {
            leadDraft: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                productType: { type: 'string' },
                loanAmountRequested: { type: 'number' },
                notes: { type: 'string' }
              },
              required: ['name', 'email', 'phone', 'productType']
            }
          },
          required: ['leadDraft']
        }
      },
      {
        name: 'scoreLead',
        description: 'Score and generate preliminary offer. Call AFTER saveLead.',
        parameters: {
          type: 'object',
          properties: {
            leadId: { type: 'string', description: 'Lead ID from saveLead response' }
          },
          required: ['leadId']
        }
      }
    ]
  }];
}

// Utility functions
function convertFloat32ToPCM16(float32Array: Float32Array): ArrayBuffer {
  const pcm16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return pcm16.buffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
