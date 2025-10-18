// Voice Chat Mode (OpenAI Realtime API)
'use client';

import { useEffect, useRef, useState } from 'react';
import { SYSTEM_PROMPT } from '@/constants/prompts';

interface TranscriptItem {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  complete?: boolean; // Track if message is still being built
}

export function CapVoiceChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const hasGreetedRef = useRef<boolean>(false);
  const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const activeResponseRef = useRef<boolean>(false);

  useEffect(() => {
    scrollToBottom();
  }, [transcript]);

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const connectToRealtimeAPI = async () => {
    try {
      setError(null);
      
      // Get ephemeral token from backend
      const tokenResponse = await fetch('/api/realtime-token');
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token endpoint error:', errorData);
        throw new Error(`Failed to get token: ${JSON.stringify(errorData)}`);
      }
      const { token, session_id } = await tokenResponse.json();

      // Connect to OpenAI Realtime API with ephemeral token
      // Use the token in the Authorization header via subprotocol
      const ws = new WebSocket(
        `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`,
        [`realtime`, `openai-insecure-api-key.${token}`]
      );

      ws.onopen = () => {
        setIsConnected(true);

        // Configure session with Cap's personality (GA API format)
        const sessionConfig = {
          type: 'session.update',
          session: {
            type: 'realtime', // REQUIRED for GA API
            model: 'gpt-4o-realtime-preview-2024-12-17', // Use the stable preview model
            output_modalities: ['audio'], // Only audio (can't combine with text in GA API)
            instructions: getCapSystemPrompt(),
            audio: {
              input: {
                format: {
                  type: 'audio/pcm',
                  rate: 24000
                },
                transcription: {
                  model: 'gpt-4o-transcribe'
                },
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 200,
                  create_response: false  // Disable auto-response to debug
                }
              },
              output: {
                format: {
                  type: 'audio/pcm',
                  rate: 24000
                },
                voice: 'alloy' // Neutral, balanced voice - versatile and clear (Options: alloy, echo, shimmer, ash, ballad, coral, sage, verse)
              }
            },
            tools: getCapTools()
          }
        };
        
        ws.send(JSON.stringify(sessionConfig));
      };

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          
          switch (message.type) {
            case 'session.created':
              console.log('✅ Voice session created');
              break;

            case 'session.updated':
              console.log('✅ Session configured');
              break;

            case 'input_audio_buffer.speech_started':
              // User is interrupting - stop all audio immediately
              stopAllAudio();
              setIsSpeaking(false);
              
              // Cancel any ongoing response from the API (ONLY if one is active)
              if (activeResponseRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({
                  type: 'response.cancel'
                }));
                activeResponseRef.current = false;
              }
              
              setIsRecording(true);
              break;

            case 'input_audio_buffer.speech_stopped':
              break;

            case 'input_audio_buffer.committed':
              // Manually create response (let it use session defaults)
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({
                  type: 'response.create'
                }));
              }
              break;

            case 'conversation.item.added':
            case 'conversation.item.done':
              // Silently handle conversation management
              break;

            case 'response.created':
              // Mark response as active
              activeResponseRef.current = true;
              
              // Stop all existing audio sources and reset scheduling for new response
              stopAllAudio();
              if (playbackContextRef.current) {
                nextPlayTimeRef.current = playbackContextRef.current.currentTime;
              }
              setIsSpeaking(true);
              break;

            case 'response.done':
              // Mark response as inactive
              activeResponseRef.current = false;
              
              // Check if response failed
              if (message.response?.status === 'failed') {
                const error = message.response.status_details?.error;
                console.error('❌ Voice response failed:', error?.message || 'Unknown error');
                setError(error?.message || 'Response generation failed');
              }
              
              setIsSpeaking(false);
              break;

            case 'response.cancelled':
              // Mark response as inactive
              activeResponseRef.current = false;
              setIsSpeaking(false);
              console.log('✅ Response cancelled successfully');
              break;

            case 'response.output_item.added':
            case 'response.output_item.done':
              // Silently handle output items
              break;

            case 'response.output_audio.delta':
            case 'response.audio_transcript.delta':
            case 'response.audio.delta':
              // Play audio chunks as they arrive
              if (message.delta || message.audio) {
                const audioData = message.delta || message.audio;
                await playAudioChunk(audioData);
              }
              break;

            case 'response.output_audio_transcript.delta':
              // Build Cap's response incrementally (for smooth display)
              if (message.delta) {
                setTranscript(prev => {
                  const lastItem = prev[prev.length - 1];
                  // Only append if the last message is from assistant AND not yet marked complete
                  if (lastItem && lastItem.role === 'assistant' && !lastItem.complete) {
                    return [
                      ...prev.slice(0, -1),
                      { ...lastItem, text: lastItem.text + message.delta }
                    ];
                  }
                  // Start new assistant message
                  return [...prev, { 
                    role: 'assistant', 
                    text: message.delta, 
                    timestamp: new Date(),
                    complete: false
                  }];
                });
              }
              break;

            case 'response.output_audio_transcript.done':
              // Mark Cap's response as complete
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
              break;

            case 'conversation.item.input_audio_transcription.completed':
              // Only show final transcription (ignore deltas to avoid duplication)
              const transcriptText = message.transcript;
              if (transcriptText) {
                setTranscript(prev => {
                  // Check if this is already the last message (avoid dupes)
                  const lastItem = prev[prev.length - 1];
                  if (lastItem && lastItem.role === 'user' && lastItem.text === transcriptText) {
                    return prev; // Already have this message
                  }
                  return [...prev, {
                    role: 'user',
                    text: transcriptText,
                    timestamp: new Date()
                  }];
                });
              }
              break;

            case 'conversation.item.input_audio_transcription.delta':
              // Ignore deltas - we'll use the completed event to avoid duplicates
              break;

            case 'response.audio.delta':
              // Cap is speaking
              setIsSpeaking(true);
              await playAudioChunk(message.delta);
              break;

            case 'response.audio.done':
              setIsSpeaking(false);
              break;

            case 'response.text.delta':
              // Update Cap's response text (for transcript)
              if (message.delta) {
                setTranscript(prev => {
                  const lastItem = prev[prev.length - 1];
                  if (lastItem && lastItem.role === 'assistant') {
                    return [
                      ...prev.slice(0, -1),
                      { ...lastItem, text: lastItem.text + message.delta }
                    ];
                  }
                  return [...prev, { role: 'assistant', text: message.delta, timestamp: new Date() }];
                });
              }
              break;

            case 'response.function_call_arguments.done':
              // Handle function calls (analyzeDeal, saveLead, etc.)
              await handleFunctionCall(message.name, JSON.parse(message.arguments), message.call_id);
              break;

            case 'error':
              // Suppress benign cancellation errors (these are expected during interruptions)
              const errorCode = message.error?.code;
              if (errorCode === 'response_cancel_not_active' || 
                  errorCode === 'conversation_already_has_active_response') {
                console.log('⚠️ Benign API state error (expected):', message.error?.message);
                // Don't show these to user or disconnect
                break;
              }
              
              // Real errors: log and show to user
              console.error('Realtime API error full message:', JSON.stringify(message, null, 2));
              console.error('Error object:', message.error);
              const errorMsg = message.error?.message || message.error?.type || 'Connection error occurred';
              setError(errorMsg);
              setIsConnected(false);
              break;

            case 'rate_limits.updated':
              // Silently ignore rate limit updates
              break;

            default:
              // Only log truly unhandled message types (not common events)
              if (!message.type.startsWith('response.') && 
                  !message.type.startsWith('conversation.')) {
                console.log('Unhandled event:', message.type);
              }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error. Please try again.');
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('Disconnected from Realtime API');
        setIsConnected(false);
      };

      wsRef.current = ws;

    } catch (error) {
      console.error('Error connecting to Realtime API:', error);
      setError('Failed to connect. Please check your settings.');
    }
  };

  const startRecording = async () => {
    try {
      if (!isConnected) {
        await connectToRealtimeAPI();
        // Wait a bit for connection to establish
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 24000
        } 
      });
      
      mediaStreamRef.current = stream;
      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = convertFloat32ToPCM16(inputData);
          
          // Send audio to Realtime API
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: arrayBufferToBase64(pcm16)
          }));
        }
      };

      setIsRecording(true);
      setError(null);
      
      // Send welcome greeting after a short delay (only once)
      setTimeout(() => {
        if (wsRef.current && 
            wsRef.current.readyState === WebSocket.OPEN && 
            !hasGreetedRef.current &&
            !isSpeaking) {
          hasGreetedRef.current = true;
          
          // Trigger Cap's introduction
          wsRef.current.send(JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'message',
              role: 'user',
              content: [{
                type: 'input_text',
                text: 'Hello'
              }]
            }
          }));
          
          // Request response
          wsRef.current.send(JSON.stringify({
            type: 'response.create'
          }));
        }
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    // Stop audio processing
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    setIsRecording(false);
  };

  const disconnect = () => {
    stopRecording();
    stopAllAudio(); // Stop all audio sources
    activeResponseRef.current = false; // Reset response state
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    // Close playback context
    if (playbackContextRef.current) {
      playbackContextRef.current.close();
      playbackContextRef.current = null;
    }
    // Reset greeting flag
    hasGreetedRef.current = false;
    setIsConnected(false);
    setTranscript([]);
  };

  const handleFunctionCall = async (name: string, args: any, callId: string) => {
    let result;

    try {
      switch (name) {
        case 'searchKnowledgeBase': {
          const response = await fetch('/api/knowledge-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: args.query,
              topK: args.topK || 3
            })
          });
          const data = await response.json();
          result = {
            results: data.results.map((r: any) => ({
              title: r.chunk.title,
              content: r.chunk.content,
              similarity: r.similarity
            })),
            count: data.results.length
          };
          break;
        }

        case 'perplexitySearch': {
          const response = await fetch('/api/perplexity-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: args.query })
          });
          result = await response.json();
          break;
        }

        case 'analyzeDeal': {
          const response = await fetch('/api/analyze-deal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(args)
          });
          result = await response.json();
          break;
        }

        case 'saveLead': {
          // Use dedicated voice tools endpoint with full database integration
          const response = await fetch('/api/voice/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tool: 'saveLead',
              args: args
            })
          });
          const data = await response.json();
          result = data.result;
          break;
        }

        case 'scoreLead': {
          // Use dedicated voice tools endpoint with full database integration
          const response = await fetch('/api/voice/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tool: 'scoreLead',
              args: args
            })
          });
          const data = await response.json();
          result = data.result;
          break;
        }

        case 'scheduleCall': {
          // Use dedicated voice tools endpoint with full database integration
          const response = await fetch('/api/voice/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tool: 'scheduleCall',
              args: args
            })
          });
          const data = await response.json();
          result = data.result;
          break;
        }

        case 'crmWebhook': {
          // Use dedicated voice tools endpoint
          const response = await fetch('/api/voice/tools', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tool: 'crmWebhook',
              args: args
            })
          });
          const data = await response.json();
          result = data.result;
          break;
        }

        default:
          result = { error: `Unknown function: ${name}` };
      }

      // Send function result back
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            call_id: callId,
            output: JSON.stringify(result)
          }
        }));

        // Request response generation
        wsRef.current.send(JSON.stringify({
          type: 'response.create'
        }));
      }
    } catch (error) {
      console.error('Function call error:', error);
      
      // Send error result
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'conversation.item.create',
          item: {
            type: 'function_call_output',
            call_id: callId,
            output: JSON.stringify({ 
              error: error instanceof Error ? error.message : 'Function execution failed' 
            })
          }
        }));
      }
    }
  };

  const stopAllAudio = () => {
    // Stop all currently scheduled/playing audio sources
    audioSourcesRef.current.forEach(source => {
      try {
        source.stop();
        source.disconnect();
      } catch (error) {
        // Source may already be stopped, ignore error
      }
    });
    
    // Clear the array
    audioSourcesRef.current = [];
    
    // Reset scheduling if context exists
    if (playbackContextRef.current) {
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
  };

  const playAudioChunk = async (base64Audio: string) => {
    try {
      if (!base64Audio) return;
      
      // Create or reuse audio context for smooth playback
      if (!playbackContextRef.current) {
        playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
        nextPlayTimeRef.current = playbackContextRef.current.currentTime;
      }
      
      const audioContext = playbackContextRef.current;
      
      // Decode base64 to raw PCM data
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Convert PCM16 to Float32 for Web Audio API
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32768.0; // Convert to -1.0 to 1.0 range
      }
      
      // Create audio buffer
      const audioBuffer = audioContext.createBuffer(1, float32.length, 24000);
      audioBuffer.getChannelData(0).set(float32);
      
      // Schedule for seamless playback
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      // Track this source so we can stop it later if interrupted
      audioSourcesRef.current.push(source);
      
      // Remove source from tracking when it finishes naturally
      source.onended = () => {
        const index = audioSourcesRef.current.indexOf(source);
        if (index > -1) {
          audioSourcesRef.current.splice(index, 1);
        }
      };
      
      // If we're behind schedule, catch up
      const now = audioContext.currentTime;
      if (nextPlayTimeRef.current < now) {
        nextPlayTimeRef.current = now;
      }
      
      source.start(nextPlayTimeRef.current);
      
      // Update next play time for seamless audio
      nextPlayTimeRef.current += audioBuffer.duration;
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e1a]">
      {/* Connection Status */}
      <div className="p-4 bg-[#0f1421] border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium text-gray-300">
              {isConnected ? 'Connected' : 'Not Connected'}
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
              Click the microphone button below to start a voice conversation with Cap
            </p>
          </div>
        )}  

        {transcript.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                item.role === 'user'
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
        {!isRecording ? (
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
          {isRecording ? '🎤 Speak naturally - I can hear you!' : '💡 Tip: Speak clearly for best results'}
        </p>
      </div>
    </div>
  );
}

// Utility functions
function getCapSystemPrompt(): string {
  // Use full system prompt but adapt for voice
  const voiceAdditions = `

🎙️ VOICE-SPECIFIC RULES:
1. Keep responses concise and conversational (voice is different from text)
2. Speak numbers clearly: "one point two five" for 1.25
3. Ask ONE question at a time, wait for response
4. Confirm understanding before moving forward
5. Use natural pauses and transitions
6. When greeting, be warm and brief: "Hey! I'm Cap, your AI loan companion. What property are you looking at?"
7. For long answers, break into digestible chunks
8. Don't read emojis out loud - describe feelings naturally
9. Use "dollar" instead of "$" symbol when speaking amounts
`;
  
  return SYSTEM_PROMPT + voiceAdditions;
}

function getCapTools() {
  return [
    {
      type: 'function',
      name: 'searchKnowledgeBase',
      description: 'Search Capital Bridge Solutions knowledge base for detailed information about DSCR loans, requirements, rates, property types. Use this FIRST when investors ask questions.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query (e.g., "620 credit score requirements", "Airbnb loans")'
          },
          topK: {
            type: 'number',
            description: 'Number of results to return (default: 3)'
          }
        },
        required: ['query']
      }
    },
    {
      type: 'function',
      name: 'perplexitySearch',
      description: 'Search for property and market information using AI. Use for rental rates, market trends, or property details.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query (e.g., "rental rates in Phoenix Arizona for 3-bedroom homes")'
          }
        },
        required: ['query']
      }
    },
    {
      type: 'function',
      name: 'analyzeDeal',
      description: 'Analyze investment property deal with comprehensive DSCR, cash flow, ROI calculations',
      parameters: {
        type: 'object',
        properties: {
          purchasePrice: { type: 'number', description: 'Property purchase price' },
          monthlyRent: { type: 'number', description: 'Expected monthly rental income' },
          downPaymentPercent: { type: 'number', description: 'Down payment percentage (e.g., 25)' },
          interestRate: { type: 'number', description: 'Annual interest rate (default: 7.0)' },
          loanTermYears: { type: 'number', description: 'Loan term in years (default: 30)' }
        },
        required: ['purchasePrice', 'monthlyRent', 'downPaymentPercent']
      }
    },
    {
      type: 'function',
      name: 'saveLead',
      description: 'Save investor contact info and lead details to database after getting consent',
      parameters: {
        type: 'object',
        properties: {
          leadDraft: {
            type: 'object',
            description: 'Lead information',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              productType: { type: 'string', enum: ['hard_money', 'dscr', 'fix_flip', 'balloon_refi'] },
              loanAmountRequested: { type: 'number' },
              notes: { type: 'string' },
              consentGiven: { type: 'boolean' }
            },
            required: ['name', 'email', 'phone', 'productType']
          }
        },
        required: ['leadDraft']
      }
    },
    {
      type: 'function',
      name: 'scoreLead',
      description: 'Score and generate preliminary offer for a saved lead. Call AFTER saveLead.',
      parameters: {
        type: 'object',
        properties: {
          leadId: {
            type: 'string',
            description: 'Lead ID from saveLead response'
          }
        },
        required: ['leadId']
      }
    },
    {
      type: 'function',
      name: 'scheduleCall',
      description: 'Generate scheduling link for follow-up call with lending team',
      parameters: {
        type: 'object',
        properties: {
          leadId: { type: 'string', description: 'Lead ID' }
        },
        required: ['leadId']
      }
    }
  ];
}

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
