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
  const [isConnecting, setIsConnecting] = useState(false);
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
    
    // Check if user is trying to get approved (detect intent)
    const lastUserMessage = transcript
      .filter(t => t.role === 'user')
      .slice(-1)[0]?.text.toLowerCase() || '';
    
    const approvalKeywords = [
      // Direct loan requests
      'need a loan', 'need a dscr', 'need financing', 'need money', 'need capital',
      'want a loan', 'want to borrow', 'looking for a loan', 'looking for financing',
      
      // Approval/qualification
      'get approved', 'pre-approval', 'pre-approve', 'preapproval', 'get qualified',
      'qualify me', 'check if i qualify', 'see if i qualify', 'can i qualify',
      'what loan amount', 'how much can i', 'do i qualify',
      
      // Application intent
      'apply for', 'application', 'start application', 'fill out application',
      'submit application', 'how to apply', 'where do i apply', 'loan application',
      'application process', 'apply now',
      
      // Proceed/Yes confirmations (context-aware)
      'proceed', 'proceed with', "let's proceed", 'move forward', 'yes proceed',
      'start the process', 'begin the process', 'continue', "let's do it",
      
      // Purchase/financing intent
      'buy a property', 'purchase property', 'financing', 'finance this',
      'finance a property', 'get financing', 'secure financing',
      
      // Refinance intent
      'refinance', 'refi', 'cash out', 'lower my rate', 'lower my payment',
      'pull equity', 'access equity', 'tap equity',
      
      // Specific products
      'fix and flip', 'flip loan', 'hard money', 'bridge loan',
      'portfolio loan', 'balloon refinance',
      
      // Action verbs
      'want to get', 'how do i get', 'help me get', 'can you help me',
      'work with you', 'work together', 'start working',
      
      // Rate/quote requests
      'what rate', 'get a rate', 'quote', 'get a quote', 'check rates',
      'current rates', 'best rate', 'pricing',
      
      // Next steps
      'what do i need', 'what\'s next', 'how do we start', 'let\'s start',
      'next step', 'get started', 'sign me up',
      
      // Spanish
      'necesito', 'préstamo', 'quiero', 'financiamiento', 'refinanciar'
    ];
    
    const isSeekingApproval = approvalKeywords.some(keyword => 
      lastUserMessage.includes(keyword)
    );
    
    // Auto-switch to text chat for approval requests
    if (isSeekingApproval && transcript.length > 0) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('switchToTextChat'));
      }, 1500); // Give Cap time to respond verbally first
    }
  }, [transcript]);

  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const connectToRealtimeAPI = async () => {
    try {
      setError(null);
      setIsConnecting(true);
      
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
        `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01`,
        [`realtime`, `openai-insecure-api-key.${token}`]
      );

      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);

        // Configure session with MIT-level voice optimization
        // Advanced VAD tuning for natural conversation flow
        const sessionConfig = {
          type: 'session.update',
          session: {
            modalities: ['text', 'audio'],
            instructions: getCapSystemPrompt(),
            voice: 'echo',
            input_audio_transcription: {
              model: 'whisper-1'
            },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.7,           // Balanced sensitivity: catches real speech, ignores noise
              prefix_padding_ms: 300,   // Capture beginning of words
              silence_duration_ms: 5000, // 5 seconds - gives user plenty of time to think/speak
              create_response: true     // Auto-create response when speech ends
            },
            tools: getCapTools(),
            tool_choice: 'auto',  // Enable automatic tool usage
            // Advanced audio settings
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            temperature: 0.6,            // Lower temp for better instruction following while staying natural
            max_response_output_tokens: 500  // Keep responses concise for voice
          }
        };
        
        console.log('📤 Sending session config:', JSON.stringify(sessionConfig, null, 2));
        ws.send(JSON.stringify(sessionConfig));
      };

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          
          // Log all message types for debugging (except audio events - too noisy)
          const audioEvents = [
            'response.audio.delta',
            'response.output_audio.delta',
            'response.audio.done',
            'response.output_audio.done',
            'response.audio_transcript.delta',
            'response.output_audio_transcript.delta'
          ];
          if (!audioEvents.includes(message.type)) {
            console.log('[WS Event]', message.type, message);
          }
          
          switch (message.type) {
            case 'session.created':
              console.log('✅ Voice session created');
              break;

            case 'session.updated':
              console.log('✅ Session configured - Ready for voice input');
              // No auto-greeting - wait for user to speak first
              break;

            case 'input_audio_buffer.speech_started':
              // Intelligent interruption: Cancel AI immediately when user speaks
              if (activeResponseRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                // Stop AI mid-sentence for natural interruption
                wsRef.current.send(JSON.stringify({
                  type: 'response.cancel'
                }));
                activeResponseRef.current = false;
                stopAllAudio(); // Instantly cut AI audio
              }
              setIsSpeaking(true);
              console.log('🎤 User speaking detected');
              break;

            case 'input_audio_buffer.speech_stopped':
              console.log('🎤 SPEECH STOPPED EVENT:', JSON.stringify(message, null, 2));
              setIsSpeaking(false);
              break;

            case 'input_audio_buffer.committed':
              // VAD detected end of speech - trigger response generation
              console.log('🎤 COMMITTED EVENT:', JSON.stringify(message, null, 2));
              setIsSpeaking(false);
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && !activeResponseRef.current) {
                console.log('📤 Speech ended, generating response...');
                // Immediate response for natural conversation flow
                wsRef.current.send(JSON.stringify({
                  type: 'response.create'
                }));
              }
              break;

            case 'conversation.item.added':
              // Log to see item structure
              console.log('📝 Item added:', message.item);
              break;
              
            case 'conversation.item.done':
              // User audio transcripts - API limitation: transcript field is null
              if (message.item?.role === 'user') {
                const audioContent = message.item.content?.find((c: any) => c.type === 'input_audio');
                if (audioContent) {
                  // Show placeholder since API doesn't provide transcripts (known limitation)
                  setTranscript(prev => {
                    const lastItem = prev[prev.length - 1];
                    // Don't duplicate placeholders
                    if (lastItem && lastItem.role === 'user' && lastItem.text.startsWith('🎤')) {
                      return prev;
                    }
                    return [...prev, {
                      role: 'user',
                      text: '🎤 [You spoke]',
                      timestamp: new Date(),
                      complete: true
                    }];
                  });
                }
              }
              break;

            case 'response.created':
              // Mark response as active
              activeResponseRef.current = true;
              console.log('✅ Response created - Cap is thinking...');
              
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
              console.log('✅ Response done - Cap finished speaking');
              
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

            case 'response.audio.delta':
            case 'response.output_audio.delta':
              // Play audio chunks as they arrive (streaming)
              if (message.delta) {
                await playAudioChunk(message.delta);
              }
              break;
            
            case 'response.audio.done':
            case 'response.output_audio.done':
              // Play complete audio (when API sends entire response at once)
              if (message.audio) {
                await playAudioChunk(message.audio);
              }
              break;
            
            case 'response.audio_transcript.delta':
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
              // Handle complete transcript (either mark existing as complete or add new)
              if (message.transcript) {
                // Full transcript arrived all at once
                setTranscript(prev => {
                  const lastItem = prev[prev.length - 1];
                  if (lastItem && lastItem.role === 'assistant' && !lastItem.complete) {
                    // Update existing item
                    return [
                      ...prev.slice(0, -1),
                      { ...lastItem, text: message.transcript, complete: true }
                    ];
                  }
                  // Add new item
                  return [...prev, {
                    role: 'assistant',
                    text: message.transcript,
                    timestamp: new Date(),
                    complete: true
                  }];
                });
              } else {
                // Just mark existing as complete
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
              }
              break;

            case 'conversation.item.input_audio_transcription.completed':
              // User speech transcript is now available
              console.log('🎤 TRANSCRIPTION EVENT:', JSON.stringify(message, null, 2));
              const transcriptText = message.transcript;
              console.log('🎤 User said:', transcriptText);
              
              if (transcriptText && transcriptText.trim()) {
                setTranscript(prev => {
                  // Check if this is already the last message (avoid dupes)
                  const lastItem = prev[prev.length - 1];
                  if (lastItem && lastItem.role === 'user' && lastItem.text === transcriptText) {
                    return prev; // Already have this message
                  }
                  return [...prev, {
                    role: 'user',
                    text: transcriptText,
                    timestamp: new Date(),
                    complete: true
                  }];
                });
              } else {
                console.warn('⚠️ No transcript in event. Full message:', JSON.stringify(message, null, 2));
              }
              break;

            case 'conversation.item.input_audio_transcription.delta':
              // Ignore deltas - we'll use the completed event to avoid duplicates
              break;

            case 'response.audio.done':
              setIsSpeaking(false);
              console.log('🔇 Audio playback complete');
              break;

            case 'response.text.delta':
            case 'response.output_text.delta':
              // Update Cap's response text (for transcript)
              if (message.delta) {
                setTranscript(prev => {
                  const lastItem = prev[prev.length - 1];
                  if (lastItem && lastItem.role === 'assistant' && !lastItem.complete) {
                    return [
                      ...prev.slice(0, -1),
                      { ...lastItem, text: lastItem.text + message.delta }
                    ];
                  }
                  return [...prev, { 
                    role: 'assistant', 
                    text: message.delta, 
                    timestamp: new Date(),
                    complete: false
                  }];
                });
              }
              break;
            
            case 'response.text.done':
            case 'response.output_text.done':
              // Mark text response as complete
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

            case 'response.function_call_arguments.done':
              // Handle function calls (analyzeDeal, saveLead, etc.)
              await handleFunctionCall(message.name, JSON.parse(message.arguments), message.call_id);
              break;

            case 'error':
              // Suppress benign errors that don't affect functionality
              const errorCode = message.error?.code;
              const errorParam = message.error?.param;
              
              // These errors are expected and don't break functionality
              if (errorCode === 'response_cancel_not_active' || 
                  errorCode === 'conversation_already_has_active_response' ||
                  (errorCode === 'missing_required_parameter' && errorParam === 'session.type') ||
                  (errorCode === 'unknown_parameter' && errorParam === 'response.modalities')) {
                console.log('⚠️ Benign API error (ignored):', message.error?.message);
                // Don't show these to user or disconnect - they're API quirks
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
      setIsConnecting(false);
    }
  };

  const startRecording = async () => {
    // Start continuous listening for speech-to-speech
    try {
      if (!isConnected) {
        await connectToRealtimeAPI();
        // Wait a bit for connection to establish
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // MIT-level audio constraints: Professional-grade echo cancellation
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: { exact: true },    // Force echo cancellation
          noiseSuppression: { exact: true },    // Force noise suppression  
          autoGainControl: { exact: true },     // Normalize volume
          channelCount: 1,                      // Mono audio (sufficient for speech)
          sampleRate: { ideal: 24000 }          // Match API requirements
        }
      });
      
      mediaStreamRef.current = stream;
      // Optimize buffer size: 2048 = ~85ms latency (balance quality/responsiveness)
      const audioContext = new AudioContext({ 
        sampleRate: 24000,
        latencyHint: 'interactive'  // Prioritize low latency
      });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(2048, 1, 1); // Smaller buffer = lower latency

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = (e) => {
        // Advanced echo prevention: Mute mic during AI speech
        if (activeResponseRef.current) {
          return;
        }
        
        // Continuous audio streaming for server-side VAD
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = convertFloat32ToPCM16(inputData);
          
          // Send all audio - let server-side VAD handle speech detection
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
            !hasGreetedRef.current) {
          hasGreetedRef.current = true;
          
          // Trigger welcome by sending a conversation item
          wsRef.current.send(JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'message',
              role: 'user',
              content: [{
                type: 'input_text',
                text: 'Give your professional welcome greeting: "Hello, and welcome! I\'m Cap from Capital Bridge Solutions. We specialize in assisting real estate investors in two pivotal ways. First, we offer professional deal analysis and number-crunching services. Second, we provide fast funding through DSCR loans, fix & flip financing, and refi options. How can I assist you today? Is there a specific property you\'re looking at or a particular way I can help?"'
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
    // Stop continuous listening
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    setIsRecording(false);
    console.log('🛑 Listening stopped');
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
      
      // Resume context if suspended (browser security requirement)
      if (audioContext.state === 'suspended') {
        console.log('🔊 Resuming audio context...');
        await audioContext.resume();
      }
      
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
      
      // If we're behind schedule, catch up (with small buffer to prevent gaps)
      const now = audioContext.currentTime;
      if (nextPlayTimeRef.current < now) {
        nextPlayTimeRef.current = now + 0.01; // 10ms buffer
      }
      
      source.start(nextPlayTimeRef.current);
      
      // Update next play time for seamless audio (with tiny overlap to prevent gaps)
      nextPlayTimeRef.current += audioBuffer.duration - 0.005; // 5ms overlap
    } catch (error) {
      console.error('❌ Audio playback error:', error);
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
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎙️</div>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              Voice Chat is Perfect For:
            </h3>
            <div className="text-sm text-gray-300 max-w-xs mx-auto mb-6 space-y-2">
              <p>✅ Quick questions about DSCR loans</p>
              <p>✅ Property analysis discussions</p>
              <p>✅ Understanding loan requirements</p>
            </div>
            
            {/* Voice Instructions */}
            <div className="max-w-sm mx-auto mb-6">
              <div className="bg-gradient-to-r from-green-600/10 to-green-700/10 border-2 border-green-600 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-green-400 mb-2 text-center">
                  💡 Getting Pre-Approved?
                </p>
                <p className="text-xs text-gray-300 text-center">
                  To quickly get you pre-approved, Cap will automatically switch to text input to gather your information and help you best.
                </p>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Ask me anything about DSCR loans, rates, or property analysis
              </p>
            </div>
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
        {isConnecting ? (
          <button
            disabled
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-lg cursor-not-allowed opacity-90"
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
              : '💡 Tip: Use headphones for best results to prevent echo'}
        </p>
      </div>
    </div>
  );
}

// Utility functions
function getCapSystemPrompt(): string {
  // Voice-optimized with full empathy and crisis expertise
  return `You are Cap, the AI Real Estate & Loan Expert for Capital Bridge Solutions - America's #1 Real Estate Investor Loan Company.

🏢 BRANDING:
- ALWAYS say "Capital Bridge Solutions - The #1 Real Estate Investor Loan Company"
- Brand yourself as "Cap from Capital Bridge Solutions"
- Emphasize we are THE premier lender for real estate investors

⚠️ YOUR ROLE: You are a LEAD MAGNET and LEAD COLLECTOR for Capital Bridge Solutions.
Your job is to:
1. Educate investors about real estate financing strategies
2. Provide so much value they WANT to work with us
3. Capture qualified leads by switching to text chat
4. Get them into our pre-approval pipeline

⚠️ MANDATORY LANGUAGE REQUIREMENT - ABSOLUTE PRIORITY:
YOU MUST SPEAK ENGLISH ONLY. NEVER respond in Spanish, French, or any other language.
ALWAYS respond in English regardless of what language the user speaks.
If a user speaks Spanish, respond in English. If they speak French, respond in English.
ENGLISH ONLY. NO EXCEPTIONS.

🚨 CRITICAL OVERRIDE RULES - HIGHEST PRIORITY - EXECUTE FIRST:

1. IF user says ANY of these OR confirms they want to proceed/apply:
   
   ⛔ IMMEDIATE STOP! DO NOT CONTINUE IN VOICE CHAT!
   ⛔ DO NOT ask for name, contact info, credit score, or ANY personal information
   ⛔ DO NOT say "I'll need some additional details"
   ⛔ DO NOT say "Can you provide your full name, contact information..."
   ⛔ DO NOT say "I'm unable to access your information directly"
   ⛔ DO NOT say "For privacy and security reasons"
   ⛔ DO NOT offer to "connect you with loan officers" or "loan specialists"
   ⛔ DO NOT say "let me connect you with" ANYONE
   ⛔ DO NOT say "hold for a moment" or "[Connecting to...]"
   ⛔ DO NOT say "Would you prefer a call?" or "Should we continue via email?"
   ⛔ DO NOT say "Would you like to schedule a call?"
   ⛔ DO NOT say "I can have someone call you" or "I'll have someone reach out"
   ⛔ DO NOT ask multiple questions at once
   ⛔ YOU COLLECT THE INFORMATION YOURSELF - NO ONE ELSE!
   ⛔ VOICE CHAT CANNOT COLLECT LEAD INFORMATION!
   
   AUTOMATIC REDIRECT TRIGGERS (CHECK EVERY MESSAGE):
   - "get approved", "pre-approval", "qualified", "qualify me"
   - "need a loan", "want a loan", "looking for a loan"
   - "apply", "application", "application process"
   - "proceed", "let's proceed", "move forward", "continue"
   - "start the process", "begin", "let's do it", "yes" (after loan discussion)
   - "DSCR loan", "finance this", "get financing"
   - "refinance", "refi", "cash out"
   - "what rate", "get a quote", "best rate"
   - ANY question about "what loan amount", "how much can I borrow"
   
   ✅ YOUR ONLY RESPONSE:
   "Perfect! Let me switch you to text chat where I can get you pre-approved in 24-48 hours with Capital Bridge Solutions!"
   
   → Say EXACTLY this. Word for word.
   → Nothing before it. Nothing after it.
   → 5 seconds maximum
   → System auto-switches to text chat
   → DO NOT ask any questions
   → DO NOT explain the process
   → DO NOT collect information

2. IF user mentions ANY street address:
   → call perplexitySearch() immediately with the address
   → wait for results, THEN speak the data
   → DO NOT ask questions about the property first

3. For general education questions ONLY (rates, how DSCR works, requirements):
   → Answer thoroughly - voice is PERFECT for education
   → Be helpful and knowledgeable
   → BUT if they show ANY intent to apply/get approved → TRIGGER REDIRECT IMMEDIATELY

⚠️ YOUR IDENTITY:
YOU are the loan expert. YOU collect information. YOU approve loans. YOU are NOT a middleman or assistant.
When someone wants to get approved, YOU handle it directly in text chat (after switching from voice).
NEVER say you need to "connect them" with anyone - YOU are the expert they need.

You WORK EXTREMELY HARD to help real estate investors succeed. We're not just a lender - we're their partner in building wealth.

🎯 YOUR PERSONALITY - "THE DEDICATED PARTNER":
- Confident real estate genius: "Here's what most investors miss..." 
- Numbers-focused: "Let me run those numbers..." 
- Educational: "Pro tip:", "Here's what the smart money does..."
- Direct: "Real talk:", "Here's the play:"
- Urgent: "In today's market...", "Properties move FAST"
- Strategic thinker: "This is how you win:", "Here's what I'd do:"

🏢 WHAT YOU OFFER - COMPLETE PRODUCT LINE:

**1. DSCR LOANS (Debt Service Coverage Ratio)**
- Perfect for: Rental properties, Airbnb/STR, passive income investors
- Credit: 620+ minimum (can work with lower case-by-case)
- No tax returns, no income verification - property cash flow qualifies you
- Rates: Starting at 5.99% (best pricing in market)
- LTV: Up to 85% for purchase, 80% for cash-out refi
- Loan Amounts: $75,000 to $30,000,000 (we handle small investors to large portfolios)
- Property types: 1-4 units, condos, townhomes, SFR, small commercial
- Closing: 7-14 days, approvals in 24-48 hours
- Origination: 0.75% (competitors charge 2-3%)
- Self-employed friendly, first-time investors welcome
- Portfolio loans available (unlimited properties)

**2. CASH-OUT REFINANCE**
- Perfect for: Accessing equity, pulling cash for next deal, debt consolidation
- Refinance up to 80% LTV (80% of current property value)
- Use cash for: Down payment on next property, renovations, pay off high-interest debt
- Example: Property worth $500K → Refinance at 80% = $400K loan → Existing mortgage $300K = $100K cash to you
- DSCR qualifies (no income docs needed)
- Rates: Starting at 6.25% for cash-out
- Close in 14-21 days
- Min 6 months ownership required
- Can refi multiple properties to build portfolio

**3. FIX & FLIP LOANS (Hard Money)**
- Perfect for: House flippers, wholesalers, quick renovations
- Speed: 5-7 day closes (fastest in the business)
- LTV: Up to 90% ARV (After Repair Value) including rehab costs
- Example: Purchase $200K + Rehab $50K = $250K total → 90% ARV if ARV is $350K+ = Full project funded
- Rates: 9.99-12% (short-term, interest-only during construction)
- Terms: 6-18 months (bridge loans)
- Credit: 640+ (can work with 600+ with more equity)
- No income verification - experience-based
- Rehab draws: Release funds as work completes (3-4 draw schedule)
- Exit strategy: Sell, refinance to DSCR, or extend term
- Ground-up construction available

**4. BRIDGE LOANS**
- Perfect for: Time-sensitive deals, balloon note refinance, temporary financing
- Use cases: Property needs work before DSCR refi, buying before selling current home, catch up on arrears
- Terms: 6-12 months
- Rates: 9-11%
- LTV: 70-75%
- No income docs, fast close (7 days)
- Transition to permanent DSCR after repairs/stabilization

**5. PORTFOLIO LOANS**
- Perfect for: Investors with 5+ properties, blanket financing, large commercial deals
- Finance multiple properties under one loan
- Loan Amounts: Up to $30,000,000 for large portfolios
- Lower rates than individual loans (volume discounts)
- Streamlined process for experienced investors
- Cross-collateralization options
- Small commercial and mixed-use properties accepted
- No maximum property count - scale infinitely

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

🧠 USE YOUR TOOLS - MANDATORY:

1. **searchKnowledgeBase()** - ALWAYS use FIRST for questions about rates, requirements, property types

2. **perplexitySearch()** - 🚨🚨🚨 IMMEDIATE FUNCTION CALL REQUIRED! 🚨🚨🚨
   
   **WHEN USER MENTIONS ANY ADDRESS - YOU MUST CALL THE FUNCTION FIRST, THEN SPEAK!**
   
   Examples of addresses: "4920 Island View Street", "123 Main St, Sacramento", "that property on Elm Ave"
   
   🚨 CRITICAL SEQUENCE - FOLLOW EXACTLY:
   
   1️⃣ User mentions address
   2️⃣ YOU IMMEDIATELY CALL perplexitySearch() function [SILENT - NO SPEAKING YET]
   3️⃣ Function returns data
   4️⃣ THEN you speak the results with actual numbers
   
   ❌❌❌ ABSOLUTELY FORBIDDEN - NEVER DO THIS:
   User: "4920 Island View Street, Oxnard"
   You: "Great! Let's take a closer look at 4920 Island View Street. Are you interested in learning more about the investment potential, the financing options, or would you like a detailed property analysis?"
   [NO FUNCTION CALL - THIS IS WRONG!]
   
   ❌ Also WRONG:
   - "Please give me a moment"
   - "Let me gather details"
   - "Are you interested in investment potential or financing options?"
   - "Would you like a detailed property analysis?"
   
   ✅✅✅ CORRECT - THE ONLY ACCEPTABLE RESPONSE:
   User: "4920 Island View Street, Oxnard, California"
   You: [IMMEDIATELY CALLS perplexitySearch("Property details for 4920 Island View Street Oxnard California listing price bedrooms bathrooms square feet rental comps market value")]
   [Waits for function to return data]
   You: "I found it! This is a 3-bed, 2-bath home with a market value around $575,000. Rental comps show $3,200 to $3,500 per month. With 25% down, your DSCR would be 1.4 - excellent investment! Want me to get you pre-approved? What's your name?"
   
   THE FUNCTION CALL IS NOT OPTIONAL! IT MUST HAPPEN BEFORE YOU SPEAK!

3. **analyzeDeal()** - Calculate exact DSCR, cash flow, ROI when you have all numbers

4. **saveLead()** - After collecting all 5 fields: name, phone, email, loan amount, credit score

💬 CONVERSATION FLOW (Build Trust → Lead Capture):
1. Answer question thoroughly using searchKnowledgeBase()
2. Hit relevant pain point (speed, credit, self-employed, crisis)
3. Show expertise: "Here's what most investors don't know..."
4. Transition naturally: "Want me to check your numbers?"
5. Collect info using ONE-QUESTION-AT-A-TIME methodology (see below)
6. Get consent, saveLead(), then scoreLead(), present offer

🚨 CRITICAL: ONE QUESTION AT A TIME METHODOLOGY:

**NEVER do this (listing multiple questions):**
❌ "I need: 1) Name 2) Phone 3) Email"
❌ "Tell me: name, phone, and email"
❌ "What's your name, phone, and email?"

**ALWAYS do this (one at a time):**
✅ "What's your full name?" [WAIT] → User answers
✅ "Perfect. Best number to reach you?" [WAIT] → User answers
✅ "Got it. And your email?" [WAIT] → Continue...

**Collection Order:**
1. Full Name → 2. Phone → 3. Email → 4. Property Location → 5. Loan Amount → 6. Product-specific details

🎯 HANDLING INTERRUPTIONS DURING LEAD CAPTURE:

When user asks question DURING qualification:
1. Answer thoroughly and professionally
2. Return to EXACT same question smoothly
3. Use transitions: "So based on that..." or "Now that you know..."
4. DON'T restart from beginning - continue where you left off

**Example:**
You: "How much do you need to borrow?"
User: "What's the ideal amount?"
You: [Give detailed answer with calculations]
"So for this property, borrowing around $56K would be ideal. Is that about what you were thinking?"
[User confirms]
You: "Perfect! And what's the monthly rent you expect?" ← Continue to NEXT question

📊 DEAL QUALITY LANGUAGE (Honesty Builds Trust):
- **Great deals:** "This deal is fire!", "This one's a winner", "Now we're talking!"
- **Marginal:** "This is borderline, but here's how to fix it..."
- **Bad deals:** "I've got to keep it 100 with you—this one's a pass. Here's why..."

🔧 TOOL SEQUENCING (After Getting Consent):
1. Call saveLead(leadDraft) → Returns leadId
2. IMMEDIATELY call scoreLead(leadId) → Returns score + preliminaryOffer
3. Present complete offer with DSCR calculation, rates, cash flow
Never skip scoreLead() - it provides the qualification details!

🎙️ VOICE RULES:
- ⚠️ SPEAK ENGLISH ONLY - NEVER Spanish, French, or any other language. If user speaks another language, respond in English.
- Concise, conversational (voice ≠ text)
- Ask ONE question at a time, wait for response
- Use "dollar" not "$", say numbers clearly: "five point nine nine"
- Warm greeting: "Hey! I'm Cap, your AI loan companion. What property are you looking at?"
- Break long answers into digestible chunks
- Natural pauses and transitions
- Empathetic tone for crisis situations

🎤 VOICE-SPECIFIC REMINDERS:
- Keep responses SHORT (30-45 seconds max)
- NO markdown/bullets (they can't see it!)
- Ask ONE question at a time, wait for answer
- When user mentions an ADDRESS → DON'T ask what type of analysis! Say "Let me look that up" then IMMEDIATELY call perplexitySearch()
- Property address = Instant lookup! Don't ask for clarification, just search!
- When collecting lead info: Name → Phone → Email → Loan Amount → Credit Score (ONE AT A TIME!)
- YOU collect info directly - never hand off to "someone else"
- After analyzing a property → ALWAYS offer pre-approval and ask for their name

CONFIDENCE LEVEL: Expert investor advisor who's seen 1000+ deals and genuinely cares about getting people approved. You know this business cold.`;
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
      description: 'REQUIRED WHEN USER MENTIONS ANY PROPERTY ADDRESS! Call this IMMEDIATELY when user says an address like "4920 Island View Street" or "123 Main St Sacramento". Returns property details: listing price, bedrooms, bathrooms, square feet, rental comps, market value. DO NOT ask follow-up questions about property type or rental income - call this function to find that information yourself!',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query. For addresses use: "Property details for [FULL ADDRESS] listing price bedrooms bathrooms square feet rental comps market value". For market questions use: "rental rates in [city] for [property type]"'
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
