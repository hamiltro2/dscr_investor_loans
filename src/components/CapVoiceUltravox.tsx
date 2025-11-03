/**
 * CapVoiceUltravox Component
 * Clean Ultravox-powered voice chat with Cap
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { LeadCaptureModal } from './LeadCaptureModal';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export function CapVoiceUltravox() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentCallId, setCurrentCallId] = useState<string | null>(null);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
  const [isStreamingResponse, setIsStreamingResponse] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [modalContext, setModalContext] = useState<string>('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const audioQueueRef = useRef<ArrayBuffer[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const nextPlayTimeRef = useRef<number>(0);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isStreamingRef = useRef<boolean>(false); // Ref for immediate access

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      console.log('[Ultravox] Creating session...');
      
      // Get session from our API
      const response = await fetch('/api/ultravox/session', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Ultravox] Session creation failed:', errorData);
        throw new Error(errorData.error || errorData.details || 'Failed to create session');
      }

      const { callId, websocketUrl } = await response.json();
      setCurrentCallId(callId); // Track call ID for transcript saving
      console.log('[Ultravox] Session created:', callId);

      // Connect to Ultravox WebSocket
      const ws = new WebSocket(websocketUrl);

      ws.onopen = async () => {
        console.log('[Ultravox] WebSocket connected');
        setIsConnected(true);
        setIsConnecting(false);

        // Start microphone
        await startMicrophone();

        // Don't add manual greeting - let Ultravox handle it via system prompt
        // This prevents conflicts with streaming transcript messages
        setTranscript([]);
      };

      ws.onmessage = async (event) => {
        try {
          // Check if message is binary audio data (Blob)
          if (event.data instanceof Blob) {
            // Convert Blob to ArrayBuffer and play
            const arrayBuffer = await event.data.arrayBuffer();
            playAudioBuffer(arrayBuffer);
          } else {
            // Text message - parse as JSON
            const data = JSON.parse(event.data);
            handleUltravoxMessage(data);
          }
        } catch (err) {
          console.warn('[Ultravox] Failed to process message:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('[Ultravox] WebSocket error:', error);
        setError('Connection error. Please try again.');
        setIsConnected(false);
        setIsConnecting(false);
      };

      ws.onclose = () => {
        console.log('[Ultravox] WebSocket closed');
        setIsConnected(false);
        setIsConnecting(false);
      };

      wsRef.current = ws;

    } catch (err) {
      console.error('[Ultravox] Connection error:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    console.log('[Ultravox] Disconnecting...');

    // Save transcript if we have messages
    if (transcript.length > 1 && currentCallId) { // > 1 to exclude just greeting
      try {
        console.log('[Ultravox] Saving transcript...', {
          callId: currentCallId,
          messageCount: transcript.length,
          leadId: currentLeadId || 'unknown'
        });
        
        // Note: This endpoint needs to be created (see VOICE-SYSTEM-AUDIT.md)
        // For now, at least log the transcript
        console.log('[Ultravox] Transcript to save:', transcript);
        
        // TODO: Uncomment when save-transcript endpoint is created
        // await fetch('/api/ultravox/save-transcript', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     callId: currentCallId,
        //     leadId: currentLeadId,
        //     transcript: transcript,
        //   }),
        // });
      } catch (err) {
        console.error('[Ultravox] Failed to save transcript:', err);
      }
    }

    // Clear audio queue and reset playback state
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    nextPlayTimeRef.current = 0;

    // Stop microphone
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Disconnect and clear gain node
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
  };

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 24000,
        },
      });

      mediaStreamRef.current = stream;
      
      // Create audio context for processing
      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = convertFloat32ToPCM16(inputData);
          
          // Send audio to Ultravox
          wsRef.current.send(pcm16);
        }
      };

      console.log('[Ultravox] Microphone started');
    } catch (err) {
      console.error('[Ultravox] Microphone error:', err);
      setError('Microphone access denied. Please allow microphone access.');
    }
  };

  // Lead intent detection patterns - Comprehensive scenarios
  const LEAD_INTENT_PATTERNS = {
    // Direct loan requests
    directRequests: [
      /need a loan/i, /want a loan/i, /looking for a loan/i, /need financing/i,
      /need money/i, /need capital/i, /need a dscr/i, /want a dscr/i,
      /need to borrow/i, /want to borrow/i, /looking to borrow/i,
      /wanna.*get a loan/i, /want to.*get a loan/i, /try.*get a loan/i,
      /start.*get.*loan/i, /get.*loan/i
    ],
    
    // Approval/qualification intent
    approvalIntent: [
      /get approved/i, /pre-approval/i, /pre-approve/i, /preapproval/i,
      /get qualified/i, /qualify me/i, /check if i qualify/i, /see if i qualify/i,
      /can i qualify/i, /do i qualify/i, /will i qualify/i, /am i qualified/i
    ],
    
    // Application intent
    applicationIntent: [
      /apply/i, /application/i, /start application/i, /fill out application/i,
      /submit application/i, /how to apply/i, /where do i apply/i,
      /want to apply/i, /ready to apply/i, /let me apply/i
    ],
    
    // Purchase/financing scenarios
    purchaseIntent: [
      /buy a property/i, /purchase property/i, /buying a property/i,
      /finance this/i, /finance a property/i, /get financing/i,
      /secure financing/i, /need financing for/i, /looking at a property/i,
      /found a property/i, /making an offer/i, /under contract/i
    ],
    
    // Refinance scenarios
    refinanceIntent: [
      /refinance/i, /refi/i, /cash out/i, /lower my rate/i,
      /lower my payment/i, /pull equity/i, /access equity/i,
      /tap equity/i, /take cash out/i, /pull money out/i,
      /refinancing my/i, /want to refinance/i
    ],
    
    // Action phrases
    actionPhrases: [
      /let's do it/i, /let's start/i, /get started/i, /ready to start/i,
      /sign me up/i, /count me in/i, /i'm ready/i, /ready to go/i,
      /let's go/i, /let's move forward/i, /want to proceed/i,
      /yes please/i, /sounds good/i, /that works/i, /perfect/i
    ],
    
    // Rate/quote requests
    rateRequests: [
      /what rate/i, /get a rate/i, /check rates/i, /current rates/i,
      /best rate/i, /my rate/i, /quote/i, /get a quote/i,
      /pricing/i, /what's the rate/i, /interest rate/i
    ],
    
    // Next steps
    nextSteps: [
      /what's next/i, /next step/i, /how do we start/i, /what do i need/i,
      /get me started/i, /move forward/i, /proceed/i, /continue/i,
      /what now/i, /ready to move/i, /let's proceed/i
    ],
    
    // Urgency indicators
    urgencyPhrases: [
      /need this fast/i, /closing soon/i, /time sensitive/i,
      /urgent/i, /asap/i, /quickly/i, /right away/i,
      /by next week/i, /by friday/i, /tomorrow/i
    ],
    
    // Conversational triggers
    conversationalTriggers: [
      /help me get/i, /can you help/i, /i need help/i,
      /work with you/i, /work together/i, /partner with/i,
      /interested in/i, /tell me more about getting/i,
      /how does.*loan.*work/i, /explain.*process/i
    ],
    
    // Property-specific mentions
    propertyMentions: [
      /rental property/i, /investment property/i, /airbnb/i,
      /short term rental/i, /str property/i, /flip.*property/i,
      /fix and flip/i, /brrrr/i, /portfolio/i, /multi-family/i,
      /apartment building/i, /duplex/i, /triplex/i, /fourplex/i
    ],
    
    // Deal analysis leading to application
    dealAnalysis: [
      /analyze.*deal/i, /run.*numbers/i, /calculate.*dscr/i,
      /good deal/i, /this property.*work/i, /cash flow/i,
      /roi/i, /return on investment/i, /cap rate/i
    ]
  };

  const detectLeadIntent = (text: string): { detected: boolean; context: string } => {
    // Check pattern categories and determine context
    for (const [categoryName, patterns] of Object.entries(LEAD_INTENT_PATTERNS)) {
      if (patterns.some(pattern => pattern.test(text))) {
        // Determine context based on category
        let context = '';
        if (categoryName === 'refinanceIntent') context = 'refinance';
        else if (categoryName === 'purchaseIntent') context = 'purchase';
        else if (categoryName === 'urgencyPhrases') context = 'urgent';
        else if (categoryName === 'rateRequests') context = 'rate';
        else if (categoryName === 'propertyMentions') context = 'property';
        else context = 'general';
        
        return { detected: true, context };
      }
    }
    
    // Additional contextual checks
    const lowerText = text.toLowerCase();
    
    // Check for specific conversational contexts
    if (lowerText.includes('yes') || lowerText.includes('yeah') || lowerText.includes('sure')) {
      // Check if the previous assistant message was asking about getting started
      const lastAssistantMsg = transcript.filter(m => m.role === 'assistant').pop();
      if (lastAssistantMsg && /get.*started|ready.*apply|want.*proceed/i.test(lastAssistantMsg.text)) {
        return { detected: true, context: 'general' };
      }
    }
    
    // Check for property addresses (indicates serious intent)
    if (/\d+\s+\w+\s+(street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|boulevard|blvd)/i.test(text)) {
      return { detected: true, context: 'property' };
    }
    
    // Check for loan amounts mentioned
    if (/\$?\d{3,}k|\$?\d{6,}|hundred.*thousand|million/i.test(text)) {
      const hasLoanContext = /loan|borrow|finance|need|want/i.test(text);
      if (hasLoanContext) return { detected: true, context: 'general' };
    }
    
    return { detected: false, context: '' };
  };

  const handleLeadModalSuccess = (leadId: string) => {
    setCurrentLeadId(leadId);
    // Add a message to transcript
    setTranscript(prev => [...prev, {
      role: 'assistant',
      text: "Perfect! I've saved your information. Our team will reach out within 24 hours to get you pre-approved!",
      timestamp: new Date()
    }]);
  };

  const handleUltravoxMessage = (data: any) => {
    // Debug logging to understand message flow
    if (data.type === 'transcript' || data.type === 'transcript_delta') {
      console.log('[DEBUG] Message:', {
        type: data.type,
        role: data.role,
        text: data.text?.substring(0, 50),
        delta: data.delta,
        isStreaming: isStreamingRef.current,
        transcriptLength: transcript.length,
        lastMessage: transcript[transcript.length - 1]?.text?.substring(0, 30) || 'none'
      });
    }

    switch (data.type) {
      case 'transcript':
        // Handle BOTH complete transcript (has text) AND streaming deltas (has delta)
        // Ultravox sends type='transcript' for both, distinguished by text vs delta field
        
        // User transcript
        if (data.role === 'user' && data.text) {
          setTranscript(prev => [...prev, {
            role: 'user',
            text: data.text,
            timestamp: new Date(),
          }]);
          
          // Check for lead intent
          const intentResult = detectLeadIntent(data.text);
          if (intentResult.detected && !showLeadModal && !currentLeadId) {
            console.log('[Ultravox] Lead intent detected, showing modal with context:', intentResult.context);
            setModalContext(intentResult.context);
            setTimeout(() => setShowLeadModal(true), 1000); // Small delay for natural flow
          }
          // DON'T reset streaming - agent might still be streaming when user interrupts
        }
        // Agent/Assistant DELTA (streaming word-by-word)
        else if ((data.role === 'assistant' || data.role === 'agent') && data.delta) {
          // Check streaming state BEFORE updating
          const wasStreaming = isStreamingRef.current;
          
          if (!wasStreaming) {
            // First delta - mark as streaming
            console.log('[Ultravox] Starting new streaming message');
            isStreamingRef.current = true;
            setIsStreamingResponse(true);
          }
          
          setTranscript(prev => {
            // Find the last ASSISTANT message (user might have spoken in between)
            const lastAssistantIdx = prev.findLastIndex(msg => msg.role === 'assistant');
            const lastAssistantMsg = lastAssistantIdx >= 0 ? prev[lastAssistantIdx] : null;
            
            // Append if: we have an assistant message AND we were already streaming
            if (lastAssistantMsg && wasStreaming) {
              const updated = [...prev];
              updated[lastAssistantIdx] = { 
                ...lastAssistantMsg, 
                text: lastAssistantMsg.text + data.delta 
              };
              return updated;
            }
            
            // First delta - start new message
            return [...prev, {
              role: 'assistant',
              text: data.delta,
              timestamp: new Date(),
            }];
          });
        }
        // Agent/Assistant COMPLETE TEXT (end of utterance OR first word)
        else if ((data.role === 'assistant' || data.role === 'agent') && data.text) {
          // Ultravox sends first word as complete text, then deltas for rest
          const wordCount = data.text.trim().split(/\s+/).length;
          const isFirstWord = wordCount <= 2;
          const wasStreaming = isStreamingRef.current;
          
          setTranscript(prev => {
            // Find last assistant message using LATEST state
            const lastAssistantIdx = prev.findLastIndex(msg => msg.role === 'assistant');
            const lastAssistantMsg = lastAssistantIdx >= 0 ? prev[lastAssistantIdx] : null;
            
            // Check if this is a replacement
            const isReplacement = lastAssistantMsg && 
                                  (wasStreaming || 
                                   (data.text.startsWith(lastAssistantMsg.text.trim()) && 
                                    data.text.length > lastAssistantMsg.text.trim().length));
            
            console.log('[Ultravox] Current array:', prev.map((m, i) => `[${i}] ${m.role}: ${m.text.substring(0, 15)}`));
            console.log('[Ultravox] isReplacement:', isReplacement, 'lastAssistantIdx:', lastAssistantIdx, 'arrayLength:', prev.length);
            
            // Check if user spoke during the response (messages exist after the assistant message)
            const hasMessagesAfter = lastAssistantIdx >= 0 && lastAssistantIdx < prev.length - 1;
            
            // Deduplicate: Don't add if exact same message already exists AND no repositioning needed
            if (lastAssistantMsg && lastAssistantMsg.text === data.text && !hasMessagesAfter) {
              console.log('[Ultravox] Duplicate message ignored (already in correct position)');
              return prev;
            }
            
            // If duplicate text but needs repositioning, move it
            if (lastAssistantMsg && lastAssistantMsg.text === data.text && hasMessagesAfter) {
              console.log('[Ultravox] MOVING duplicate message to end (user spoke during response)');
              console.log('[Ultravox] Array before:', prev.map(m => `${m.role}: ${m.text.substring(0, 20)}`));
              
              const lastTimestamp = prev[prev.length - 1].timestamp;
              const newTimestamp = new Date(lastTimestamp.getTime() + 1);
              
              const updated = prev.filter((_, idx) => idx !== lastAssistantIdx);
              const result = [...updated, { role: 'assistant' as const, text: data.text, timestamp: newTimestamp }];
              
              console.log('[Ultravox] Array after:', result.map(m => `${m.role}: ${m.text.substring(0, 20)}`));
              return result;
            }
            
            if (isReplacement) {
              console.log('[Ultravox] hasMessagesAfter:', hasMessagesAfter);
              
              if (hasMessagesAfter) {
                console.log('[Ultravox] MOVING message to end (user spoke during response)');
                console.log('[Ultravox] Array before:', prev.map(m => `${m.role}: ${m.text.substring(0, 20)}`));
                
                // User spoke while AI was responding - remove old position and append at end
                const lastTimestamp = prev[prev.length - 1].timestamp;
                const newTimestamp = new Date(lastTimestamp.getTime() + 1);
                
                const updated = prev.filter((_, idx) => idx !== lastAssistantIdx);
                const result = [...updated, { role: 'assistant' as const, text: data.text, timestamp: newTimestamp }];
                
                console.log('[Ultravox] Array after:', result.map(m => `${m.role}: ${m.text.substring(0, 20)}`));
                return result;
              } else {
                console.log('[Ultravox] Replacing message in place (already last)');
                const updated = [...prev];
                updated[lastAssistantIdx] = { 
                  role: 'assistant', 
                  text: data.text, 
                  timestamp: lastAssistantMsg.timestamp 
                };
                return updated;
              }
            }
            
            // Add new message
            if (isFirstWord) {
              console.log('[Ultravox] First word detected, starting streaming mode');
            }
            return [...prev, {
              role: 'assistant',
              text: data.text,
              timestamp: new Date(),
            }];
          });
          
          // Update flags after transcript
          if (isFirstWord) {
            isStreamingRef.current = true;
            setIsStreamingResponse(true);
          } else {
            isStreamingRef.current = false;
            setIsStreamingResponse(false);
          }
        }
        break;

      case 'audio':
        // Received audio from assistant
        if (data.audio) {
          playAudio(data.audio);
        }
        break;

      case 'speaking_start':
        setIsSpeaking(true);
        break;

      case 'speaking_end':
        setIsSpeaking(false);
        break;

      case 'tool_call':
        console.log('[Ultravox] Tool called:', data.toolName, data.args);
        
        // Track lead ID when lead is captured
        if (data.toolName === 'capture_lead_information') {
          // Tool calls in Ultravox may return result in different formats
          // Log for debugging to see the structure
          console.log('[Ultravox] Lead capture tool response:', data);
        }
        break;

      case 'error':
        console.error('[Ultravox] Error:', data.error);
        setError(data.error.message || 'An error occurred');
        break;

      default:
        // Log unhandled message types for debugging
        if (!['heartbeat', 'ping', 'pong'].includes(data.type)) {
          console.log('[Ultravox] Unhandled message:', data.type);
        }
    }
  };

  const playAudio = (base64Audio: string) => {
    try {
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioContext = new AudioContext();
      audioContext.decodeAudioData(arrayBuffer, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      });
    } catch (err) {
      console.error('[Ultravox] Audio playback error:', err);
    }
  };

  const playAudioBuffer = async (arrayBuffer: ArrayBuffer) => {
    // Add to queue
    audioQueueRef.current.push(arrayBuffer);
    
    // Start processing queue if not already playing
    if (!isPlayingRef.current) {
      processAudioQueue();
    }
  };

  const processAudioQueue = async () => {
    if (isPlayingRef.current) {
      return;
    }

    isPlayingRef.current = true;
    setIsSpeaking(true);

    try {
      // Create or reuse audio context at native sample rate for best quality
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContext({ 
          latencyHint: 'interactive',  // Optimize for low latency
          sampleRate: 24000  // Match Ultravox output
        });
      }

      const audioContext = audioContextRef.current;

      // Create gain node if it doesn't exist or was disconnected
      if (!gainNodeRef.current) {
        gainNodeRef.current = audioContext.createGain();
        gainNodeRef.current.gain.value = 1.0;  // Unity gain - let Ultravox handle levels
        gainNodeRef.current.connect(audioContext.destination);
      }

      const gainNode = gainNodeRef.current;

      // Resume audio context if suspended (browser autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Initialize playback timeline
      if (nextPlayTimeRef.current < audioContext.currentTime) {
        nextPlayTimeRef.current = audioContext.currentTime;
      }

      while (audioQueueRef.current.length > 0) {
        const arrayBuffer = audioQueueRef.current.shift()!;

        // Convert PCM16 to Float32 - raw, no processing
        const pcm16 = new Int16Array(arrayBuffer);
        const float32 = new Float32Array(pcm16.length);

        for (let i = 0; i < pcm16.length; i++) {
          float32[i] = pcm16[i] / 32768.0;
        }

        // Create audio buffer - no windowing, no processing
        const audioBuffer = audioContext.createBuffer(1, float32.length, 24000);
        audioBuffer.getChannelData(0).set(float32);

        // Create source and connect directly
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(gainNode);

        // Schedule immediately at precise time
        source.start(nextPlayTimeRef.current);

        // Update timeline for next chunk
        nextPlayTimeRef.current += audioBuffer.duration;
      }

      // Wait for playback
      const wait = Math.max(0, nextPlayTimeRef.current - audioContext.currentTime);
      if (wait > 0) {
        await new Promise(resolve => setTimeout(resolve, wait * 1000));
      }

    } catch (err) {
      console.error('[Ultravox] Audio playback error:', err);
    } finally {
      isPlayingRef.current = false;
      
      // Only set speaking to false if queue is truly empty
      if (audioQueueRef.current.length === 0) {
        setIsSpeaking(false);
      } else {
        // More audio arrived while processing, restart immediately
        processAudioQueue();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-full bg-[#0a0e1a]">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary-600 to-primary-700 border-b border-primary-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center relative">
              <span className="text-2xl">🧢</span>
              <span className="absolute text-green-400 font-bold" style={{ fontSize: '8px', top: '13px', left: '17px' }}>$</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Voice Chat with Cap</h2>
              <p className="text-xs text-primary-100">
                {isConnecting ? 'Connecting...' : isConnected ? '🟢 Connected' : '⚫ Disconnected'}
              </p>
            </div>
          </div>
          {isConnected && (
            <button
              onClick={disconnect}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              End Call
            </button>
          )}
        </div>
      </div>

      {/* Transcript */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Message */}
        {transcript.length === 0 && !isConnected && (
          <div className="text-center py-12 space-y-6">
            <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center relative mx-auto">
              <span className="text-5xl">🧢</span>
              <span className="absolute text-green-400 font-bold" style={{ fontSize: '14px', top: '26px', left: '34px' }}>$</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Talk to Cap</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Your AI loan companion powered by Ultravox. Get instant answers about DSCR loans, analyze deals, and get pre-approved.
              </p>
            </div>
            <div className="max-w-sm mx-auto text-left space-y-2">
              <p className="text-sm text-gray-300">✅ DSCR loan expertise</p>
              <p className="text-sm text-gray-300">✅ Property & deal analysis</p>
              <p className="text-sm text-gray-300">✅ Fix & Flip, Portfolio loans</p>
              <p className="text-sm text-gray-300">✅ 24-48 hour pre-approvals</p>
            </div>
          </div>
        )}

        {/* Messages */}
        {transcript.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-sm'
                  : 'bg-dark-800 border border-dark-700 text-gray-100 rounded-bl-sm'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-primary-600/20 rounded-full flex items-center justify-center relative">
                    <span className="text-xs">🧢</span>
                    <span className="absolute text-green-400 font-bold" style={{ fontSize: '5px', top: '5px', left: '9px' }}>$</span>
                  </div>
                  <span className="font-semibold text-xs text-primary-400">Cap</span>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>
              <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Speaking indicator */}
        {isSpeaking && isConnected && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary-600/20 rounded-full flex items-center justify-center relative">
                  <span className="text-xs">🧢</span>
                  <span className="absolute text-green-400 font-bold" style={{ fontSize: '5px', top: '5px', left: '9px' }}>$</span>
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

      {/* Controls */}
      <div className="p-4 bg-[#0f1421] border-t border-gray-800">
        {isConnecting ? (
          <button
            disabled
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed opacity-90"
          >
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            Connecting to Cap...
          </button>
        ) : !isConnected ? (
          <button
            onClick={connect}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Start Talking to Cap
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Listening...</span>
            </div>
            <p className="text-xs text-center text-gray-400">
              Speak naturally. Cap will respond automatically.
            </p>
          </div>
        )}
      </div>
    </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSuccess={handleLeadModalSuccess}
        context={modalContext}
      />
    </>
  );
}

// Utility function to convert Float32 to PCM16
function convertFloat32ToPCM16(float32Array: Float32Array): ArrayBuffer {
  const pcm16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return pcm16.buffer;
}
