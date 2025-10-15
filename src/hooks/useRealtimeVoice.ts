/**
 * useRealtimeVoice Hook
 * 
 * React hook for OpenAI Realtime API integration.
 * Provides state management, lifecycle handling, and clean API
 * for voice conversations in React components.
 * 
 * Usage:
 * ```tsx
 * const { connect, disconnect, isConnected, isCapSpeaking, transcript } = useRealtimeVoice({
 *   instructions: 'You are Cap, a loan assistant...',
 *   voice: 'echo',
 * });
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { RealtimeService } from '@/lib/realtime/RealtimeService';
import { getAudioPlayer, disposeAudioPlayer } from '@/lib/realtime/AudioPlayer';
import type { RealtimeSessionConfig, UseRealtimeVoiceReturn } from '@/types/realtime';

export interface UseRealtimeVoiceOptions {
  instructions: string;
  voice?: 'alloy' | 'echo' | 'shimmer';
  autoConnect?: boolean;
  onError?: (error: Error) => void;
  onTranscriptUpdate?: (transcript: string) => void;
}

export function useRealtimeVoice(options: UseRealtimeVoiceOptions): UseRealtimeVoiceReturn {
  const {
    instructions,
    voice = 'echo',
    autoConnect = false,
    onError,
    onTranscriptUpdate,
  } = options;

  // ==========================================================================
  // State
  // ==========================================================================

  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [isCapSpeaking, setIsCapSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<Error | null>(null);

  // ==========================================================================
  // Refs
  // ==========================================================================

  const serviceRef = useRef<RealtimeService | null>(null);
  const audioPlayerRef = useRef<ReturnType<typeof getAudioPlayer> | null>(null);
  const isConnectingRef = useRef(false);

  // Lazy initialization of audio player (browser only)
  const getOrCreateAudioPlayer = () => {
    if (!audioPlayerRef.current && typeof window !== 'undefined') {
      audioPlayerRef.current = getAudioPlayer();
    }
    return audioPlayerRef.current;
  };

  // ==========================================================================
  // Service Initialization
  // ==========================================================================

  const initializeService = useCallback(() => {
    if (serviceRef.current) {
      return serviceRef.current;
    }

    const sessionConfig: Partial<RealtimeSessionConfig> = {
      instructions,
      voice,
      modalities: ['text', 'audio'],
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
    };

    const service = new RealtimeService(sessionConfig, {
      onConnect: () => {
        console.log('[useRealtimeVoice] Connected');
        setStatus('connected');
        setError(null);
        isConnectingRef.current = false;
      },

      onDisconnect: () => {
        console.log('[useRealtimeVoice] Disconnected');
        setStatus('disconnected');
        setIsCapSpeaking(false);
        setIsUserSpeaking(false);
        isConnectingRef.current = false;
        getOrCreateAudioPlayer()?.stop();
      },

      onError: (err) => {
        console.error('[useRealtimeVoice] Error:', err);
        setStatus('error');
        setError(err);
        isConnectingRef.current = false;
        onError?.(err);
      },

      onAudioDelta: (audioData) => {
        // Play audio chunk immediately
        getOrCreateAudioPlayer()?.play(audioData);
      },

      onTranscriptDelta: (text) => {
        setTranscript((prev) => prev + text);
        onTranscriptUpdate?.(text);
      },

      onUserSpeechStart: () => {
        console.log('[useRealtimeVoice] User started speaking');
        setIsUserSpeaking(true);
      },

      onUserSpeechEnd: () => {
        console.log('[useRealtimeVoice] User stopped speaking');
        setIsUserSpeaking(false);
      },

      onCapSpeakingStart: () => {
        console.log('[useRealtimeVoice] Cap started speaking');
        setIsCapSpeaking(true);
      },

      onCapSpeakingEnd: () => {
        console.log('[useRealtimeVoice] Cap finished speaking');
        setIsCapSpeaking(false);
      },
    });

    serviceRef.current = service;
    return service;
  }, [instructions, voice, onError, onTranscriptUpdate]);

  // ==========================================================================
  // Connection Management
  // ==========================================================================

  const connect = useCallback(async () => {
    if (isConnectingRef.current) {
      console.warn('[useRealtimeVoice] Already connecting...');
      return;
    }

    if (status === 'connected') {
      console.warn('[useRealtimeVoice] Already connected');
      return;
    }

    isConnectingRef.current = true;
    setStatus('connecting');
    setError(null);

    try {
      // Get ephemeral token from server
      console.log('[useRealtimeVoice] Fetching session token...');
      const response = await fetch('/api/realtime/session', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Failed to get session token: ${response.statusText}`);
      }

      const { token } = await response.json();

      if (!token) {
        throw new Error('No session token received');
      }

      // Initialize service and connect
      const service = initializeService();
      await service.connect(token);

      console.log('[useRealtimeVoice] Successfully connected');
    } catch (err) {
      console.error('[useRealtimeVoice] Connection failed:', err);
      setStatus('error');
      setError(err as Error);
      isConnectingRef.current = false;
      onError?.(err as Error);
      throw err;
    }
  }, [status, initializeService, onError]);

  const disconnect = useCallback(() => {
    console.log('[useRealtimeVoice] Disconnecting...');
    
    if (serviceRef.current) {
      serviceRef.current.disconnect();
      serviceRef.current = null;
    }

    getOrCreateAudioPlayer()?.stop();
    setStatus('disconnected');
    setIsCapSpeaking(false);
    setIsUserSpeaking(false);
    setTranscript('');
    isConnectingRef.current = false;
  }, []);

  // ==========================================================================
  // Interaction Methods
  // ==========================================================================

  const interrupt = useCallback(() => {
    console.log('[useRealtimeVoice] Interrupting Cap...');
    
    if (serviceRef.current && status === 'connected') {
      serviceRef.current.interrupt();
      getOrCreateAudioPlayer()?.stop();
      setIsCapSpeaking(false);
    }
  }, [status]);

  // ==========================================================================
  // Lifecycle
  // ==========================================================================

  // Auto-connect if enabled
  useEffect(() => {
    if (autoConnect && status === 'disconnected' && !isConnectingRef.current) {
      connect().catch((err) => {
        console.error('[useRealtimeVoice] Auto-connect failed:', err);
      });
    }
  }, [autoConnect, status, connect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('[useRealtimeVoice] Cleaning up...');
      
      if (serviceRef.current) {
        serviceRef.current.disconnect();
        serviceRef.current = null;
      }

      // Don't dispose audio player globally - other components might use it
      getOrCreateAudioPlayer()?.stop();
    };
  }, []);

  // ==========================================================================
  // Return API
  // ==========================================================================

  return {
    // State
    isConnected: status === 'connected',
    isCapSpeaking,
    isUserSpeaking,
    transcript,
    error,
    status,

    // Actions
    connect,
    disconnect,
    interrupt,
  };
}

// =============================================================================
// Utility Hooks
// =============================================================================

/**
 * Hook to manage audio player volume
 */
export function useAudioVolume() {
  const audioPlayer = getAudioPlayer();
  const [volume, setVolumeState] = useState(audioPlayer.getVolume());
  const [isMuted, setIsMuted] = useState(audioPlayer.isMutedStatus());

  const setVolume = useCallback((newVolume: number) => {
    audioPlayer.setVolume(newVolume);
    setVolumeState(newVolume);
  }, [audioPlayer]);

  const toggleMute = useCallback(() => {
    const muted = audioPlayer.toggleMute();
    setIsMuted(muted);
    return muted;
  }, [audioPlayer]);

  return {
    volume,
    isMuted,
    setVolume,
    toggleMute,
  };
}
