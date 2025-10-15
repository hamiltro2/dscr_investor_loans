/**
 * OpenAI Realtime API Service
 * 
 * Manages WebSocket connection, audio streaming, and event handling
 * for real-time voice conversations with GPT-4o.
 * 
 * Architecture:
 * - Event-driven design with typed event handlers
 * - Automatic reconnection with exponential backoff
 * - Audio buffer management with configurable chunk size
 * - Graceful error handling and recovery
 */

import type {
  RealtimeSessionConfig,
  RealtimeServerEvent,
  RealtimeClientEvent,
  RealtimeServiceState,
  ResponseAudioDeltaEvent,
  InputAudioBufferSpeechStartedEvent,
  InputAudioBufferSpeechStoppedEvent,
  ErrorEvent,
  SessionCreatedEvent,
  ResponseAudioTranscriptDeltaEvent,
} from '@/types/realtime';

// ============================================================================
// Configuration
// ============================================================================

const WEBSOCKET_URL = 'wss://api.openai.com/v1/realtime';
const RECONNECT_DELAY_MS = 1000;
const MAX_RECONNECT_ATTEMPTS = 5;
const AUDIO_CHUNK_SIZE = 4096; // bytes
const SAMPLE_RATE = 24000; // Hz (required by OpenAI)

// ============================================================================
// Event Handler Types
// ============================================================================

export interface RealtimeEventHandlers {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  onAudioDelta?: (audio: Int16Array) => void;
  onTranscriptDelta?: (text: string) => void;
  onUserSpeechStart?: () => void;
  onUserSpeechEnd?: () => void;
  onCapSpeakingStart?: () => void;
  onCapSpeakingEnd?: () => void;
}

// ============================================================================
// RealtimeService Class
// ============================================================================

export class RealtimeService {
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private audioWorkletNode: AudioWorkletNode | null = null;
  private reconnectAttempts = 0;
  private reconnectTimer: NodeJS.Timeout | null = null;
  
  private state: RealtimeServiceState = {
    status: 'disconnected',
    isCapSpeaking: false,
    isUserSpeaking: false,
    error: null,
    transcript: '',
    sessionId: null,
  };

  private handlers: RealtimeEventHandlers = {};
  private sessionConfig: Partial<RealtimeSessionConfig>;

  constructor(
    sessionConfig: Partial<RealtimeSessionConfig>,
    handlers: RealtimeEventHandlers = {}
  ) {
    this.sessionConfig = sessionConfig;
    this.handlers = handlers;
  }

  // ==========================================================================
  // Public API
  // ==========================================================================

  /**
   * Connect to OpenAI Realtime API
   */
  async connect(ephemeralToken: string): Promise<void> {
    if (this.state.status === 'connected' || this.state.status === 'connecting') {
      console.warn('[RealtimeService] Already connected or connecting');
      return;
    }

    this.updateState({ status: 'connecting', error: null });

    try {
      // Initialize WebSocket
      await this.initializeWebSocket(ephemeralToken);

      // Initialize audio capture
      await this.initializeAudioCapture();

      // Send initial session configuration
      this.sendSessionUpdate();

      console.log('[RealtimeService] Connected successfully');
    } catch (error) {
      console.error('[RealtimeService] Connection failed:', error);
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Disconnect from Realtime API and cleanup resources
   */
  disconnect(): void {
    console.log('[RealtimeService] Disconnecting...');

    // Clear reconnect timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // Close WebSocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    // Stop audio capture
    this.stopAudioCapture();

    // Close audio context
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.updateState({ status: 'disconnected', sessionId: null });
    this.handlers.onDisconnect?.();
  }

  /**
   * Interrupt Cap mid-speech and clear response queue
   */
  interrupt(): void {
    if (this.state.status !== 'connected') {
      console.warn('[RealtimeService] Cannot interrupt when not connected');
      return;
    }

    console.log('[RealtimeService] Interrupting Cap...');
    
    this.sendEvent({
      type: 'response.cancel',
    });

    this.updateState({ isCapSpeaking: false });
  }

  /**
   * Get current service state
   */
  getState(): Readonly<RealtimeServiceState> {
    return { ...this.state };
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.state.status === 'connected' && this.ws?.readyState === WebSocket.OPEN;
  }

  // ==========================================================================
  // WebSocket Management
  // ==========================================================================

  private async initializeWebSocket(ephemeralToken: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // OpenAI Realtime API with ephemeral session token (ek_*)
      // Based on OpenAI docs: Use Authorization header via WebSocket subprotocols
      const url = `${WEBSOCKET_URL}?model=gpt-4o-realtime-preview-2024-10-01`;
      
      console.log('[RealtimeService] Ephemeral token:', ephemeralToken);
      
      // OpenAI Realtime API accepts tokens via specific subprotocol format
      // Format: realtime=v1 + Authorization via custom header encoding
      const protocols = [
        'realtime',
        `Authorization.Bearer.${ephemeralToken}`
      ];
      
      console.log('[RealtimeService] Using protocols:', protocols);
      
      // Connect with authorization protocols
      this.ws = new WebSocket(url, protocols);

      this.ws.onopen = () => {
        console.log('[RealtimeService] WebSocket connected successfully');
        this.reconnectAttempts = 0;
        this.updateState({ status: 'connected' });
        this.handlers.onConnect?.();
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          this.handleServerEvent(JSON.parse(event.data));
        } catch (error) {
          console.error('[RealtimeService] Failed to parse message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('[RealtimeService] WebSocket error:', error);
        reject(new Error('WebSocket connection failed - check console for details'));
      };

      this.ws.onclose = (event) => {
        console.log('[RealtimeService] WebSocket closed');
        console.log('[RealtimeService] Close code:', event.code);
        console.log('[RealtimeService] Close reason:', event.reason);
        console.log('[RealtimeService] Clean close?:', event.wasClean);
        this.handleDisconnect();
      };
    });
  }

  private handleDisconnect(): void {
    if (this.state.status === 'disconnected') {
      return; // Already handled
    }

    this.updateState({ status: 'disconnected' });
    this.handlers.onDisconnect?.();

    // Attempt reconnection
    if (this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      const delay = RECONNECT_DELAY_MS * Math.pow(2, this.reconnectAttempts - 1);
      
      console.log(`[RealtimeService] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
      
      this.reconnectTimer = setTimeout(() => {
        this.reconnect();
      }, delay);
    } else {
      this.handleError(new Error('Max reconnection attempts reached'));
    }
  }

  private async reconnect(): Promise<void> {
    console.log('[RealtimeService] Attempting to reconnect...');
    
    try {
      // Get new ephemeral token
      const response = await fetch('/api/realtime/session');
      const { token } = await response.json();
      
      await this.connect(token);
    } catch (error) {
      console.error('[RealtimeService] Reconnection failed:', error);
      this.handleError(error as Error);
    }
  }

  // ==========================================================================
  // Audio Capture
  // ==========================================================================

  private async initializeAudioCapture(): Promise<void> {
    try {
      // Get microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: SAMPLE_RATE,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Create audio context
      this.audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });

      // Create audio worklet for processing
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      
      // Use ScriptProcessorNode for audio capture (fallback for better compatibility)
      const processor = this.audioContext.createScriptProcessor(AUDIO_CHUNK_SIZE, 1, 1);
      
      processor.onaudioprocess = (event) => {
        if (!this.isConnected()) return;

        const inputData = event.inputBuffer.getChannelData(0);
        
        // Convert Float32Array to Int16Array (PCM16)
        const pcm16 = this.float32ToInt16(inputData);
        
        // Convert to base64
        const base64Audio = this.arrayBufferToBase64(pcm16.buffer);
        
        // Send to OpenAI
        this.sendEvent({
          type: 'input_audio_buffer.append',
          audio: base64Audio,
        });
      };

      source.connect(processor);
      processor.connect(this.audioContext.destination);

      console.log('[RealtimeService] Audio capture initialized');
    } catch (error) {
      console.error('[RealtimeService] Failed to initialize audio capture:', error);
      throw new Error('Microphone access denied or unavailable');
    }
  }

  private stopAudioCapture(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.audioWorkletNode) {
      this.audioWorkletNode.disconnect();
      this.audioWorkletNode = null;
    }
  }

  // ==========================================================================
  // Event Handling
  // ==========================================================================

  private handleServerEvent(event: RealtimeServerEvent): void {
    // console.log('[RealtimeService] Server event:', event.type);

    switch (event.type) {
      case 'session.created':
        this.handleSessionCreated(event);
        break;

      case 'session.updated':
        console.log('[RealtimeService] Session updated');
        break;

      case 'error':
        this.handleErrorEvent(event);
        break;

      case 'input_audio_buffer.speech_started':
        this.handleUserSpeechStart(event);
        break;

      case 'input_audio_buffer.speech_stopped':
        this.handleUserSpeechEnd(event);
        break;

      case 'response.audio.delta':
        this.handleAudioDelta(event);
        break;

      case 'response.audio.done':
        this.handleAudioDone();
        break;

      case 'response.audio_transcript.delta':
        this.handleTranscriptDelta(event);
        break;

      case 'response.done':
        console.log('[RealtimeService] Response complete');
        break;

      // Add more event handlers as needed
      default:
        // console.log('[RealtimeService] Unhandled event:', event.type);
        break;
    }
  }

  private handleSessionCreated(event: SessionCreatedEvent): void {
    console.log('[RealtimeService] Session created:', event.session.id);
    this.updateState({ sessionId: event.session.id });
  }

  private handleUserSpeechStart(event: InputAudioBufferSpeechStartedEvent): void {
    console.log('[RealtimeService] User started speaking');
    this.updateState({ isUserSpeaking: true });
    this.handlers.onUserSpeechStart?.();
  }

  private handleUserSpeechEnd(event: InputAudioBufferSpeechStoppedEvent): void {
    console.log('[RealtimeService] User stopped speaking');
    this.updateState({ isUserSpeaking: false });
    this.handlers.onUserSpeechEnd?.();
  }

  private handleAudioDelta(event: ResponseAudioDeltaEvent): void {
    if (!this.state.isCapSpeaking) {
      this.updateState({ isCapSpeaking: true });
      this.handlers.onCapSpeakingStart?.();
    }

    // Decode base64 to PCM16
    const audioData = this.base64ToInt16Array(event.delta);
    
    // Send to audio playback
    this.handlers.onAudioDelta?.(audioData);
  }

  private handleAudioDone(): void {
    console.log('[RealtimeService] Cap finished speaking');
    this.updateState({ isCapSpeaking: false });
    this.handlers.onCapSpeakingEnd?.();
  }

  private handleTranscriptDelta(event: ResponseAudioTranscriptDeltaEvent): void {
    this.updateState({ 
      transcript: this.state.transcript + event.delta 
    });
    this.handlers.onTranscriptDelta?.(event.delta);
  }

  private handleErrorEvent(event: ErrorEvent): void {
    console.error('[RealtimeService] API error:', event.error);
    this.handleError(new Error(event.error.message));
  }

  private handleError(error: Error): void {
    this.updateState({ status: 'error', error });
    this.handlers.onError?.(error);
  }

  // ==========================================================================
  // Sending Events
  // ==========================================================================

  private sendEvent(event: RealtimeClientEvent): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('[RealtimeService] Cannot send event, WebSocket not open');
      return;
    }

    this.ws.send(JSON.stringify(event));
  }

  private sendSessionUpdate(): void {
    const config: Partial<RealtimeSessionConfig> = {
      modalities: ['text', 'audio'],
      instructions: this.sessionConfig.instructions || '',
      voice: this.sessionConfig.voice || 'echo',
      input_audio_format: 'pcm16',
      output_audio_format: 'pcm16',
      input_audio_transcription: {
        model: 'whisper-1',
      },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
      },
      temperature: 0.7,
      ...this.sessionConfig,
    };

    this.sendEvent({
      type: 'session.update',
      session: config,
    });

    console.log('[RealtimeService] Session configuration sent');
  }

  // ==========================================================================
  // Audio Utilities
  // ==========================================================================

  private float32ToInt16(float32Array: Float32Array): Int16Array {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16Array;
  }

  private arrayBufferToBase64(buffer: ArrayBufferLike): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToInt16Array(base64: string): Int16Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Int16Array(bytes.buffer);
  }

  // ==========================================================================
  // State Management
  // ==========================================================================

  private updateState(updates: Partial<RealtimeServiceState>): void {
    this.state = { ...this.state, ...updates };
  }
}
