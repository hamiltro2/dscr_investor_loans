/**
 * Realtime Voice Button Component
 * 
 * Provides one-click activation for OpenAI Realtime API voice conversation.
 * Features:
 * - Visual indicators for connection status
 * - Speaking/listening feedback
 * - Transcript display
 * - Interrupt capability
 */

'use client';

import { useState } from 'react';
import { Phone, PhoneOff, Mic, Volume2, Loader2 } from 'lucide-react';
import { useRealtimeVoice } from '@/hooks/useRealtimeVoice';
import { SYSTEM_PROMPT } from '@/constants/prompts';

interface RealtimeVoiceButtonProps {
  onTranscriptUpdate?: (transcript: string) => void;
  className?: string;
}

export function RealtimeVoiceButton({ onTranscriptUpdate, className = '' }: RealtimeVoiceButtonProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  const {
    isConnected,
    isCapSpeaking,
    isUserSpeaking,
    transcript,
    error,
    status,
    connect,
    disconnect,
    interrupt,
  } = useRealtimeVoice({
    instructions: SYSTEM_PROMPT,
    voice: 'echo',
    onTranscriptUpdate: (text) => {
      onTranscriptUpdate?.(text);
    },
    onError: (err) => {
      console.error('[RealtimeVoiceButton] Error:', err);
    },
  });

  // ==========================================================================
  // Event Handlers
  // ==========================================================================

  const handleToggleConnection = async () => {
    if (isConnected) {
      disconnect();
    } else {
      try {
        await connect();
      } catch (err) {
        console.error('[RealtimeVoiceButton] Connection failed:', err);
      }
    }
  };

  const handleInterrupt = () => {
    if (isConnected && isCapSpeaking) {
      interrupt();
    }
  };

  // ==========================================================================
  // UI Helpers
  // ==========================================================================

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500 animate-pulse';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        if (isCapSpeaking) return 'Cap is speaking...';
        if (isUserSpeaking) return 'Listening...';
        return 'Connected - Start talking!';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection error';
      default:
        return 'Click to start voice conversation';
    }
  };

  const getButtonIcon = () => {
    if (status === 'connecting') {
      return <Loader2 className="w-5 h-5 animate-spin" />;
    }
    return isConnected ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />;
  };

  // ==========================================================================
  // Render
  // ==========================================================================

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Main Connection Button */}
      <button
        onClick={handleToggleConnection}
        disabled={status === 'connecting'}
        className={`
          relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl
          font-medium text-white transition-all shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-500 hover:bg-primary-600'}
        `}
        title={getStatusText()}
      >
        {/* Status Indicator */}
        <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${getStatusColor()}`} />

        {/* Icon */}
        {getButtonIcon()}

        {/* Text */}
        <span>
          {isConnected ? 'End Conversation' : 'Start Voice Chat'}
        </span>
      </button>

      {/* Status Display */}
      {isConnected && (
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-gray-800 rounded-lg text-sm">
          {/* Speaking Indicators */}
          <div className="flex items-center gap-2">
            {isUserSpeaking && (
              <div className="flex items-center gap-1 text-blue-400">
                <Mic className="w-4 h-4 animate-pulse" />
                <span>You're speaking</span>
              </div>
            )}
            {isCapSpeaking && (
              <div className="flex items-center gap-1 text-green-400">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Cap speaking</span>
              </div>
            )}
            {!isUserSpeaking && !isCapSpeaking && (
              <span className="text-gray-400">Ready to listen...</span>
            )}
          </div>

          {/* Interrupt Button */}
          {isCapSpeaking && (
            <button
              onClick={handleInterrupt}
              className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-xs text-white transition-colors"
              title="Interrupt Cap"
            >
              Interrupt
            </button>
          )}

          {/* Transcript Toggle */}
          {transcript && (
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-white transition-colors"
            >
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </button>
          )}
        </div>
      )}

      {/* Transcript Display */}
      {isConnected && showTranscript && transcript && (
        <div className="px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 max-h-32 overflow-y-auto">
          <div className="font-medium text-xs text-gray-400 mb-1">Transcript:</div>
          <div className="whitespace-pre-wrap">{transcript}</div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="px-3 py-2 bg-red-900/50 border border-red-500 rounded-lg text-sm text-red-200">
          <div className="font-medium">Error:</div>
          <div>{error.message}</div>
        </div>
      )}

      {/* Usage Instructions */}
      {isConnected && !isUserSpeaking && !isCapSpeaking && (
        <div className="px-3 py-2 bg-blue-900/30 border border-blue-500/50 rounded-lg text-xs text-blue-200">
          <div className="font-medium mb-1">💡 Tips:</div>
          <ul className="list-disc list-inside space-y-1">
            <li>Just start talking - no buttons needed!</li>
            <li>Cap will automatically detect when you stop</li>
            <li>You can interrupt Cap anytime</li>
            <li>Natural conversation - like a phone call!</li>
          </ul>
        </div>
      )}
    </div>
  );
}
