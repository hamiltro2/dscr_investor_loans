// Enhanced Cap Chat Widget with Text + Voice Toggle
'use client';

import { useState, useEffect } from 'react';
import { CapTextChat } from './CapTextChat';
import { CapVoiceChat } from './CapVoiceChat';

type ChatMode = 'text' | 'voice';

export function CapChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('text');
  const [size, setSize] = useState({ width: 420, height: 650 });
  const [isResizing, setIsResizing] = useState(false);

  // Listen for event from "Chat with Cap" button in header
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    const handleSwitchToText = () => {
      setMode('text');
      // Trigger lead capture after switching
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('startLeadCapture'));
      }, 500);
    };

    window.addEventListener('openChatWidget', handleOpenChat);
    window.addEventListener('switchToTextChat', handleSwitchToText);
    
    return () => {
      window.removeEventListener('openChatWidget', handleOpenChat);
      window.removeEventListener('switchToTextChat', handleSwitchToText);
    };
  }, []);

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent, direction: 'width' | 'height' | 'both') => {
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e: MouseEvent) => {
      if (direction === 'width' || direction === 'both') {
        const newWidth = Math.max(380, Math.min(800, startWidth - (e.clientX - startX)));
        setSize(prev => ({ ...prev, width: newWidth }));
      }
      if (direction === 'height' || direction === 'both') {
        const newHeight = Math.max(500, Math.min(900, startHeight + (e.clientY - startY)));
        setSize(prev => ({ ...prev, height: newHeight }));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Chat with Cap"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#0a0e1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-primary-500/20 transition-shadow"
          style={{ 
            width: `${size.width}px`, 
            height: `${size.height}px`,
            boxShadow: isResizing ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : undefined
          }}
        >
          {/* Resize handles */}
          {/* Left edge resize */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-primary-500/20 transition-colors z-10"
            onMouseDown={(e) => handleMouseDown(e, 'width')}
          />
          {/* Bottom edge resize */}
          <div
            className="absolute left-0 right-0 bottom-0 h-2 cursor-ns-resize hover:bg-primary-500/20 transition-colors z-10"
            onMouseDown={(e) => handleMouseDown(e, 'height')}
          />
          {/* Bottom-left corner resize */}
          <div
            className="absolute left-0 bottom-0 w-4 h-4 cursor-nesw-resize hover:bg-primary-500/40 transition-colors z-10"
            onMouseDown={(e) => handleMouseDown(e, 'both')}
          />
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                {mode === 'text' ? '💬' : '🎙️'}
              </div>
              <div>
                <h3 className="font-bold text-lg">Cap - Your Loan Companion</h3>
                <p className="text-xs text-white/80">
                  {mode === 'text' ? 'Text Chat' : 'Voice Chat'} • Online
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="bg-[#0f1421] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                {mode === 'text' ? '💬 Typing mode' : '🎙️ Speaking mode'}
              </span>
            </div>
            
            <button
              onClick={() => setMode(mode === 'text' ? 'voice' : 'text')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg"
            >
              {mode === 'text' ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                  Switch to Voice
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Switch to Text
                </>
              )}
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-hidden">
            {mode === 'text' ? (
              <CapTextChat />
            ) : (
              <CapVoiceChat />
            )}
          </div>
        </div>
      )}
    </>
  );
}
