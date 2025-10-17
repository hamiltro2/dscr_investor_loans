/**
 * AI Chat Widget Component
 * Floating chat interface for loan pre-qualification
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, X, Mic, MicOff, Volume2, VolumeX, Play, StopCircle, ExternalLink, Sparkles, Zap, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: Array<{ title: string; url: string; text: string }>;
  audioUrl?: string;
  canPlay?: boolean;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hey! I'm Cap, your Capital Bridge Solutions Loan Companion. I can pre-qualify you for a real estate loan in about 2 minutes. What type of financing are you looking for?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [conversationMode, setConversationMode] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for custom event to open chat from anywhere
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener('openChatWidget', handleOpenChat);
    return () => window.removeEventListener('openChatWidget', handleOpenChat);
  }, []);

  // Auto-open chat if URL parameter is present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('chat') === 'open') {
        // Open chat after a brief delay for smooth transition
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
        
        // Remove the parameter from URL without page reload
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Ctrl/Cmd + / to start recording (when chat is open)
      if ((e.ctrlKey || e.metaKey) && e.key === '/' && isOpen && !isLoading) {
        e.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
      // Escape to stop Cap speaking
      if (e.key === 'Escape' && isSpeaking) {
        stopSpeaking();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [isOpen, isLoading, isRecording, isSpeaking]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false); // Hide quick replies after first message

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Parse JSON response
      const data = await response.json();
      const assistantMessage = data.message || '';

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: assistantMessage,
        },
      ]);
    } catch (error: any) {
      console.error('Chat error:', error);
      let errorMessage = "I'm sorry, I'm having trouble right now. ";
      
      if (error.message?.includes('network')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else if (error.message?.includes('timeout')) {
        errorMessage += 'The request timed out. Please try again.';
      } else {
        errorMessage += 'Could you please rephrase that or try again?';
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Stop Cap from speaking
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    }
  };

  // Voice level monitoring
  const startVolumeMonitoring = (stream: MediaStream) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateLevel = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(Math.min(100, (average / 128) * 100));
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };
      
      updateLevel();
    } catch (error) {
      console.error('Volume monitoring error:', error);
    }
  };

  // Voice Input: Record audio and transcribe
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      const chunks: Blob[] = [];

      // Start recording timer
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Start volume monitoring
      startVolumeMonitoring(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');

        try {
          const res = await fetch('/api/voice/transcribe', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            const { text } = await res.json();
            setInput(text);
            
            // In conversation mode, auto-send after transcription
            if (conversationMode && text.trim()) {
              // Small delay to show the transcribed text
              setTimeout(() => {
                sendMessage(text);
              }, 300);
            }
          } else {
            const errorText = await res.text();
            console.error('Transcription failed:', errorText);
            alert('Sorry, I couldn\'t understand that. Please try speaking again.');
          }
        } catch (error) {
          console.error('Transcription error:', error);
          alert('Transcription error. Please check your internet connection.');
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone access error:', error);
      alert('Please allow microphone access to use voice input.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear recording timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      
      // Stop volume monitoring
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Close audio context
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      
      setAudioLevel(0);
    }
  };

  // Voice Output: Speak text using TTS
  const speak = async (text: string, messageIndex?: number) => {
    if (!voiceEnabled || isSpeaking) return;

    try {
      setIsSpeaking(true);

      const res = await fetch('/api/voice/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'echo' }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
        };

        try {
          await audio.play();
          // Autoplay worked, reset blocked state
          if (autoplayBlocked) setAutoplayBlocked(false);
        } catch (playError: any) {
          // Autoplay blocked by browser
          if (playError.name === 'NotAllowedError') {
            setAutoplayBlocked(true);
            setIsSpeaking(false);
            
            // Store audio URL in message for manual play
            if (messageIndex !== undefined) {
              setMessages((prev) => {
                const updated = [...prev];
                if (updated[messageIndex]) {
                  updated[messageIndex] = {
                    ...updated[messageIndex],
                    audioUrl: url,
                    canPlay: true,
                  };
                }
                return updated;
              });
            }
          } else {
            console.error('Audio playback error:', playError);
            setIsSpeaking(false);
          }
        }
      }
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    }
  };

  // Manual play for a specific message
  const playMessageAudio = async (message: Message, index: number) => {
    if (message.audioUrl) {
      try {
        const audio = new Audio(message.audioUrl);
        audioRef.current = audio;
        setIsSpeaking(true);

        audio.onended = () => {
          setIsSpeaking(false);
        };

        await audio.play();
        // Successfully played, remove play button
        setMessages((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], canPlay: false };
          return updated;
        });
      } catch (error) {
        console.error('Play error:', error);
        setIsSpeaking(false);
      }
    }
  };

  // Auto-play voice responses
  useEffect(() => {
    if (voiceEnabled && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const lastIndex = messages.length - 1;
      if (lastMessage.role === 'assistant' && lastMessage.content && !isLoading && !lastMessage.audioUrl) {
        speak(lastMessage.content, lastIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, isLoading]);

  // Smart quick reply suggestions
  const getQuickReplies = () => {
    if (messages.length === 1) {
      return [
        { text: '💰 DSCR Loan', emoji: '🏢' },
        { text: '🏠 Investment Property', emoji: '📈' },
        { text: '💳 Bad Credit Options', emoji: '✅' },
      ];
    }
    return [];
  };

  const quickReplies = getQuickReplies();

  // Format recording time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md h-[600px] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-primary-500/30 flex flex-col overflow-hidden"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(14, 165, 233, 0.2)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Cap - Loan Companion</h3>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notifications Bar */}
            {autoplayBlocked && (
              <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20">
                <p className="text-xs text-yellow-400 flex items-center gap-2">
                  <Volume2 className="w-3 h-3" />
                  Click the ▶️ play button on messages to hear audio responses
                </p>
              </div>
            )}
            
            {/* Cap is Speaking - with Stop Button */}
            {isSpeaking && (
              <div className="px-4 py-2 bg-primary-500/10 border-b border-primary-500/20 flex items-center justify-between">
                <p className="text-xs text-primary-400 flex items-center gap-2">
                  <Volume2 className="w-3 h-3 animate-pulse" />
                  Cap is speaking...
                </p>
                <button
                  onClick={stopSpeaking}
                  className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                >
                  <StopCircle className="w-3 h-3" />
                  Stop (Esc)
                </button>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/50">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-800 text-white border border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === 'assistant' ? (
                        <div className="text-sm flex-1">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({...props}) => <h1 className="text-xl font-bold text-white mb-3 mt-4" {...props} />,
                              h2: ({...props}) => <h2 className="text-lg font-bold text-white mb-2 mt-3" {...props} />,
                              h3: ({...props}) => <h3 className="text-base font-semibold text-white mb-2 mt-2" {...props} />,
                              p: ({...props}) => <p className="text-sm text-white/90 mb-2 leading-relaxed" {...props} />,
                              ul: ({...props}) => <ul className="list-disc ml-5 space-y-1 mb-3 text-white/90" {...props} />,
                              ol: ({...props}) => <ol className="list-decimal ml-5 space-y-1 mb-3 text-white/90" {...props} />,
                              li: ({...props}) => <li className="text-sm leading-relaxed text-white/90" {...props} />,
                              strong: ({...props}) => <strong className="font-bold text-white" {...props} />,
                              em: ({...props}) => <em className="italic text-white/90" {...props} />,
                              code: ({...props}) => <code className="bg-gray-700 px-1.5 py-0.5 rounded text-xs text-primary-300 font-mono" {...props} />,
                              blockquote: ({...props}) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-white/80 my-2" {...props} />,
                              a: ({...props}) => <a className="text-primary-400 hover:text-primary-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap flex-1">{message.content}</p>
                      )}
                      {message.canPlay && message.audioUrl && (
                        <button
                          onClick={() => playMessageAudio(message, index)}
                          disabled={isSpeaking}
                          className="flex-shrink-0 p-1.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 rounded-lg transition-colors"
                          title="Click to play audio"
                          aria-label="Play audio response"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Sources */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-gray-400 mb-2">📚 Sources:</p>
                        {message.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 mb-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {source.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                      <span className="text-xs text-gray-400">Cap is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Reply Buttons */}
              {showQuickReplies && quickReplies.length > 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 justify-center"
                >
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(reply.text);
                        sendMessage(reply.text);
                      }}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-primary-500/50 text-white px-4 py-2 rounded-xl text-sm transition-all shadow-lg hover:shadow-primary-500/20 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-primary-400" />
                      {reply.text}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700/50 bg-gray-900/95 backdrop-blur-sm">
              {/* Recording Indicator */}
              {isRecording && (
                <div className="mb-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-red-400 font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Recording: {formatTime(recordingTime)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Ctrl+/ to stop</span>
                  </div>
                  {/* Volume Visualizer */}
                  <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-primary-400"
                      style={{ width: `${audioLevel}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="mt-1 flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-6 rounded transition-all ${
                          audioLevel > i * 10
                            ? 'bg-primary-500'
                            : 'bg-gray-700'
                        }`}
                        style={{
                          height: audioLevel > i * 10 ? `${12 + (audioLevel / 100) * 12}px` : '8px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isRecording ? 'Listening...' : 'Type or speak (Ctrl+/)...'}
                  className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 shadow-inner"
                  disabled={isLoading || isRecording}
                />
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                  className={`rounded-xl p-2 transition-all shadow-lg ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : conversationMode
                      ? 'bg-primary-500 hover:bg-primary-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                  title={
                    isRecording 
                      ? 'Click to stop speaking' 
                      : conversationMode 
                      ? '🗣️ Conversation mode ON - Click to speak, auto-sends' 
                      : 'Click to speak'
                  }
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl p-2 transition-colors shadow-lg hover:shadow-xl disabled:shadow-none"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <span>🔒 Secure & Private</span>
                  <button
                    onClick={() => {
                      setVoiceEnabled(!voiceEnabled);
                      if (isSpeaking && audioRef.current) {
                        audioRef.current.pause();
                        setIsSpeaking(false);
                      }
                    }}
                    className="flex items-center gap-1 text-gray-400 hover:text-primary-400 transition-colors"
                    title={voiceEnabled ? 'Voice enabled' : 'Voice disabled'}
                  >
                    <Volume2 className="w-3 h-3" />
                    {voiceEnabled ? 'On' : 'Off'}
                  </button>
                  <button
                    onClick={() => setConversationMode(!conversationMode)}
                    className={`flex items-center gap-1 transition-colors ${
                      conversationMode 
                        ? 'text-primary-400 hover:text-primary-300' 
                        : 'text-gray-400 hover:text-primary-400'
                    }`}
                    title={conversationMode ? 'Conversation mode ON - Hands-free chat' : 'Conversation mode OFF - Click to enable'}
                  >
                    <MessageCircle className="w-3 h-3" />
                    {conversationMode ? '🗣️ Chat' : 'Chat'}
                  </button>
                </div>
                <a
                  href="tel:+19493393555"
                  className="flex items-center gap-1 text-primary-400 hover:text-primary-300"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'conversion', {
                        send_to: 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D',
                      });
                    }
                  }}
                >
                  <Phone className="w-3 h-3" />
                  Call Instead
                </a>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="mt-2 pt-2 border-t border-gray-700/30">
                <p className="text-[10px] text-gray-500 text-center">
                  💡 Shortcuts: <span className="text-gray-400">Ctrl+K</span> to open/close • <span className="text-gray-400">Ctrl+/</span> to record • <span className="text-gray-400">Esc</span> to stop Cap
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
