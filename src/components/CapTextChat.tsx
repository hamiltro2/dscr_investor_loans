// Text Chat Mode (Your existing chat implementation)
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Message interface for type-safe chat messages
 */
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function CapTextChat() {
  // ==================== STATE MANAGEMENT ====================
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm Cap, your AI loan companion. 👋\n\nI help real estate investors find the perfect financing for their investment properties. I can:\n\n• Analyze property deals (DSCR, cash flow, ROI)\n• Check rates and qualification\n• Answer questions about ALL investor loans (DSCR, Hard Money, Fix & Flip, Refinance, etc.)\n• Analyze ANY property URL (Zillow, Redfin, BiggerPockets, LoopNet, etc.!) 🔗\n• Upload property photos for analysis 📸\n• Analyze documents (PDFs, bank statements, tax returns, etc.) 📄\n• 🎙️ Use voice input for hands-free interaction\n• Save your info for pre-approval\n\nWhat property or loan question can I help with today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // File upload state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedDocument, setUploadedDocument] = useState<{ data: string; name: string; type: string } | null>(null);
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  // ==================== REFS ====================
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Voice recording refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // ==================== UTILITY FUNCTIONS ====================
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Cleanup function for voice recording resources
   * Prevents memory leaks by properly disposing of Web Audio API resources
   */
  const cleanupVoiceResources = useCallback(() => {
    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    // Clear recording timer
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Close audio context (critical for preventing memory leaks)
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Reset state
    setAudioLevel(0);
    setRecordingTime(0);
  }, []);

  /**
   * Cleanup on component unmount
   */
  useEffect(() => {
    return () => {
      cleanupVoiceResources();
    };
  }, [cleanupVoiceResources]);

  // Listen for lead capture trigger from voice chat switch
  useEffect(() => {
    const handleStartLeadCapture = () => {
      // Auto-send "I need a DSCR loan" to trigger lead capture
      setInput('I need a DSCR loan');
      // Auto-submit after a brief delay
      setTimeout(() => {
        const form = document.querySelector('form');
        if (form) {
          form.requestSubmit();
        }
      }, 300);
    };

    window.addEventListener('startLeadCapture', handleStartLeadCapture);
    
    return () => {
      window.removeEventListener('startLeadCapture', handleStartLeadCapture);
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image too large (max 10MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadedImage(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF, DOCX, TXT, etc.)
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'image/png',
      'image/jpeg'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, Word document, text file, or image');
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert('File too large (max 20MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUploadedDocument({
        data: base64,
        name: file.name,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeDocument = () => {
    setUploadedDocument(null);
    if (docInputRef.current) {
      docInputRef.current.value = '';
    }
  };

  // ==================== VOICE RECORDING FUNCTIONS ====================
  /**
   * Start real-time audio level monitoring
   * Uses Web Audio API for precise frequency analysis
   */
  const startVolumeMonitoring = useCallback((stream: MediaStream) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      // Configure analyser for optimal frequency resolution
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateLevel = () => {
        if (analyserRef.current && isRecording) {
          analyserRef.current.getByteFrequencyData(dataArray);
          // Calculate RMS (Root Mean Square) for accurate volume
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(Math.min(100, (average / 128) * 100));
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };
      
      updateLevel();
    } catch (error) {
      console.error('[Voice Recording] Volume monitoring error:', error);
    }
  }, [isRecording]);

  /**
   * Start voice recording
   * Captures audio, transcribes via Whisper API, and populates input field
   */
  const startRecording = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      // Create MediaRecorder with optimal settings
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });
      const chunks: Blob[] = [];

      // Start recording timer
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Start volume monitoring
      startVolumeMonitoring(stream);

      // Collect audio chunks
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');

        try {
          // Send to Whisper transcription API
          const res = await fetch('/api/voice/transcribe', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            const { text } = await res.json();
            setInput(text);
            
            // Focus input to allow user to edit before sending
            setTimeout(() => inputRef.current?.focus(), 100);
          } else {
            const errorText = await res.text();
            console.error('[Voice Recording] Transcription failed:', errorText);
            alert('Sorry, I couldn\'t understand that. Please try speaking again.');
          }
        } catch (error) {
          console.error('[Voice Recording] Transcription error:', error);
          alert('Transcription error. Please check your internet connection.');
        }

        // Stop all tracks and cleanup
        stream.getTracks().forEach((track) => track.stop());
        cleanupVoiceResources();
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error('[Voice Recording] Microphone access error:', error);
      alert('Please allow microphone access to use voice input.');
      cleanupVoiceResources();
    }
  };

  /**
   * Stop voice recording
   * Triggers transcription and cleanup
   */
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  // ==================== KEYBOARD SHORTCUTS ====================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + / to toggle recording
      if ((e.ctrlKey || e.metaKey) && e.key === '/' && !isLoading) {
        e.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, isLoading, stopRecording]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !uploadedImage && !uploadedDocument) || isLoading) return;

    const userMessage = input.trim() || (uploadedImage ? 'Analyze this property image' : 'Analyze this document');
    const imageData = uploadedImage;
    const docData = uploadedDocument;
    
    setInput('');
    setUploadedImage(null);
    setImagePreview(null);
    setUploadedDocument(null);
    setIsLoading(true);

    // Add user message with file indicator
    let displayMessage = userMessage;
    if (imageData) {
      displayMessage = `📸 ${userMessage}\n[Property image uploaded]`;
    } else if (docData) {
      displayMessage = `📄 ${userMessage}\n[${docData.name} uploaded]`;
    }
    
    // Check if message contains a URL
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = userMessage.match(urlRegex);
    
    // Detect if URL is likely a property listing (broad detection)
    const propertyKeywords = [
      'redfin', 'zillow', 'realtor', 'trulia', 'homes.com',
      'apartments.com', 'rent.com', 'loopnet', 'crexi',
      'realtor.ca', 'rightmove', 'zoopla', 'domain.com.au',
      'biggerpockets', 'bigger-pockets',
      'property', 'home', 'house', 'listing', 'real-estate',
      'realestate', 'forsale', 'for-sale', 'mls'
    ];
    
    const isPropertyUrl = urls?.some(url => {
      const lowerUrl = url.toLowerCase();
      return propertyKeywords.some(keyword => lowerUrl.includes(keyword));
    });
    
    if (isPropertyUrl && urls) {
      displayMessage = `🔗 ${userMessage}\n[Fetching property listing...]`;
    }
    
    setMessages(prev => [...prev, { role: 'user', content: displayMessage }]);

    try {
      // Build message content (text + image/document/URL if present)
      let messageContent;
      
      if (imageData) {
        messageContent = [
          { type: 'text', text: userMessage },
          { type: 'image_url', image_url: { url: imageData } }
        ];
      } else if (docData) {
        // For documents, include file data and instructions
        const docInstruction = `Analyze this ${docData.type.includes('pdf') ? 'PDF' : docData.type.includes('word') ? 'Word' : 'document'} (${docData.name}) and extract key information relevant to real estate investing and loan qualification. ${userMessage}`;
        messageContent = [
          { type: 'text', text: docInstruction },
          { type: 'image_url', image_url: { url: docData.data } }
        ];
      } else if (isPropertyUrl && urls) {
        // Fetch URL content from any real estate website
        try {
          const urlResponse = await fetch('/api/fetch-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urls[0] })
          });
          
          if (urlResponse.ok) {
            const urlData = await urlResponse.json();
            
            // Build comprehensive analysis prompt with all available data
            let urlInstruction = `Analyze this property listing from any real estate website and extract ALL available information:\n\nURL: ${urls[0]}\n\n`;
            
            if (urlData.metadata?.title) {
              urlInstruction += `Title: ${urlData.metadata.title}\n\n`;
            }
            
            if (urlData.metadata?.description) {
              urlInstruction += `Description: ${urlData.metadata.description}\n\n`;
            }
            
            if (urlData.metadata?.structuredData) {
              urlInstruction += `Structured Data: ${JSON.stringify(urlData.metadata.structuredData, null, 2)}\n\n`;
            }
            
            if (urlData.metadata?.priceText) {
              urlInstruction += `Price Found: ${urlData.metadata.priceText}\n\n`;
            }
            
            urlInstruction += `Please extract and analyze:\n`;
            urlInstruction += `• Property address and location\n`;
            urlInstruction += `• List price\n`;
            urlInstruction += `• Bedrooms, bathrooms, square footage\n`;
            urlInstruction += `• Property type (SFH, condo, multi-family, etc.)\n`;
            urlInstruction += `• Year built, lot size, features\n`;
            urlInstruction += `• Estimated rental income (if not provided, estimate based on market)\n`;
            urlInstruction += `• Calculate DSCR (debt service coverage ratio)\n`;
            urlInstruction += `• Provide investment analysis and qualification assessment\n`;
            urlInstruction += `\nIf any information is missing, make reasonable estimates based on the location and property type.`;
            
            messageContent = urlInstruction;
          } else {
            messageContent = `I found a property URL but couldn't fetch it (the website may block automated requests). Please try:\n\n1. Taking a screenshot of the listing (Win+Shift+S or Cmd+Shift+4), then paste it here (Ctrl+V)\n2. Or copy/paste the property details as text\n\nURL: ${urls[0]}`;
          }
        } catch (err) {
          messageContent = `I found a property URL but couldn't fetch it. Please try:\n\n1. Taking a screenshot of the listing\n2. Or copy/paste the property details\n\nURL: ${urls[0]}`;
        }
      } else {
        messageContent = userMessage;
      }

      // Call your existing Cap API
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: messageContent }]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Check for error responses (even with 200 status)
      if (data.error && !data.message) {
        console.error('API returned error:', data.error);
        throw new Error(typeof data.error === 'string' ? data.error : 'API error occurred');
      }
      
      // Handle different response formats with robust null checking
      let assistantMessage: string;
      
      if (data.choices && data.choices[0]?.message?.content) {
        // OpenAI chat completion format (prioritized for new format)
        assistantMessage = data.choices[0].message.content;
      } else if (data.message && typeof data.message === 'string' && data.message.trim()) {
        // Simple message format (fallback)
        assistantMessage = data.message;
      } else if (data.response && typeof data.response === 'string' && data.response.trim()) {
        // Alternative format
        assistantMessage = data.response;
      } else if (typeof data === 'string' && data.trim()) {
        // Direct string response
        assistantMessage = data;
      } else {
        console.error('Unexpected response format:', data);
        console.error('Response keys:', Object.keys(data));
        throw new Error('AI returned empty or invalid response. Please try rephrasing your question.');
      }

      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Provide context-specific error messages
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('fetch') || error.message.includes('URL')) {
          errorMessage = '❌ I had trouble analyzing that property URL. The website may be blocking automated access. Please try:\n\n1. Taking a screenshot of the listing (Win+Shift+S or Cmd+Shift+4) and pasting it here\n2. Or copying the property details as text\n\nI\'ll analyze it right away!';
        } else if (error.message.includes('empty') || error.message.includes('invalid')) {
          errorMessage = '⚠️ I received an empty response. This usually means:\n\n• The property URL may have issues\n• Network connectivity problems\n\nPlease try again or paste the property details directly.';
        } else if (error.message.includes('API error')) {
          errorMessage = `⚠️ API Error: ${error.message}\n\nPlease try again in a moment. If the issue persists, contact support.`;
        }
      }
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
      // Refocus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e1a]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0e1a]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[95%] rounded-2xl px-5 py-4 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-sm'
                  : 'bg-dark-800 text-gray-100 border border-dark-700 rounded-bl-sm'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-primary-600/20 rounded-full flex items-center justify-center text-xs">
                    🧢
                  </div>
                  <span className="font-semibold text-sm text-primary-400">Cap</span>
                </div>
              )}
              {message.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none
                  prose-headings:font-bold prose-headings:text-white prose-headings:mb-2 prose-headings:mt-4
                  prose-h2:text-lg prose-h3:text-base
                  prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-3
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:ml-4 prose-ul:mb-3
                  prose-li:text-gray-200 prose-li:mb-1
                  prose-a:text-primary-400 prose-a:underline
                  prose-code:text-primary-300 prose-code:bg-dark-700 prose-code:px-1 prose-code:rounded">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl rounded-bl-sm px-5 py-4 max-w-[95%]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-primary-600/20 rounded-full flex items-center justify-center text-xs">
                  🧢
                </div>
                <span className="font-semibold text-sm text-primary-400">Cap</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Animated spinner */}
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 border-3 border-primary-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-3 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-1 border-2 border-transparent border-r-primary-400 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
                </div>
                {/* Animated text */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300 font-medium">Analyzing property</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                      <div className="w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Calculating DSCR, ROI, cash flow...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4 bg-[#0f1421]">
        {/* Image preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Property preview"
              className="max-h-32 rounded-lg border-2 border-primary-500"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
            <div className="mt-1 text-xs text-gray-400">📸 Property image ready</div>
          </div>
        )}

        {/* Document preview */}
        {uploadedDocument && (
          <div className="mb-3 relative inline-block">
            <div className="px-4 py-3 bg-dark-700 rounded-lg border-2 border-primary-500 flex items-center gap-3 max-w-xs">
              <svg className="w-8 h-8 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm text-white font-medium truncate">{uploadedDocument.name}</div>
                <div className="text-xs text-gray-400">
                  {uploadedDocument.type.includes('pdf') ? 'PDF Document' : 
                   uploadedDocument.type.includes('word') ? 'Word Document' : 'Document'}
                </div>
              </div>
              <button
                type="button"
                onClick={removeDocument}
                className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors flex-shrink-0"
              >
                ×
              </button>
            </div>
            <div className="mt-1 text-xs text-gray-400">📄 Document ready for analysis</div>
          </div>
        )}

        <form onSubmit={sendMessage} className="flex gap-1.5">
          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={docInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,image/*"
            onChange={handleDocumentUpload}
            className="hidden"
          />
          
          {/* Image upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || isRecording}
            className="bg-dark-700 hover:bg-dark-600 text-gray-300 px-2.5 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            title="Upload property photo"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Document upload button */}
          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            disabled={isLoading || isRecording}
            className="bg-dark-700 hover:bg-dark-600 text-gray-300 px-2.5 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            title="Upload document (PDF, Word, etc.)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Voice recording button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className={`relative px-2.5 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                : 'bg-dark-700 hover:bg-dark-600 text-gray-300'
            }`}
            title={isRecording ? 'Stop recording (Ctrl+/)' : 'Start voice input (Ctrl+/)'}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? (
              <>
                {/* Recording indicator */}
                <div className="w-4 h-4 bg-white rounded-full animate-ping absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-75"></div>
                <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="6" y="6" width="8" height="8" rx="1" />
                </svg>
              </>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>

          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              // Submit on Enter (without Shift), Shift+Enter for new line
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const form = e.currentTarget.form;
                if (form) {
                  form.requestSubmit();
                }
              }
            }}
            onPaste={(e) => {
              // Handle pasted images from clipboard (screenshots, etc.)
              const items = e.clipboardData?.items;
              if (!items) return;

              for (let i = 0; i < items.length; i++) {
                const item = items[i];
                
                // Check if pasted item is an image
                if (item.type.startsWith('image/')) {
                  e.preventDefault(); // Prevent default paste behavior for images
                  
                  const file = item.getAsFile();
                  if (file) {
                    // Validate file size (max 10MB)
                    if (file.size > 10 * 1024 * 1024) {
                      alert('Image too large (max 10MB)');
                      return;
                    }

                    // Convert to base64 and set as uploaded image
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = reader.result as string;
                      setUploadedImage(base64);
                      setImagePreview(base64);
                    };
                    reader.readAsDataURL(file);
                  }
                  break; // Only handle first image
                }
              }
            }}
            placeholder={
              imagePreview ? "Add a message about this property..." :
              uploadedDocument ? "Add a message about this document..." :
              "Type, paste URLs/screenshots/text..."
            }
            rows={2}
            className="flex-1 px-4 py-3 bg-[#1a1f2e] border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none overflow-y-auto"
            style={{ minHeight: '56px', maxHeight: '200px' }}
            onInput={(e) => {
              // Auto-resize textarea based on content
              const target = e.target as HTMLTextAreaElement;
              target.style.height = '56px';
              target.style.height = Math.min(target.scrollHeight, 200) + 'px';
            }}
            disabled={isLoading || isRecording}
            suppressHydrationWarning
          />
          
          {/* Recording status overlay */}
          {isRecording && (
            <div className="absolute inset-0 bg-red-600/10 border-2 border-red-500 rounded-lg pointer-events-none flex items-center justify-center">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Recording {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
                {audioLevel > 0 && (
                  <div className="flex items-center gap-0.5 ml-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-white rounded-full transition-all duration-100"
                        style={{
                          height: `${Math.max(4, Math.min(16, (audioLevel / 100) * 16 * (i + 1) / 5))}px`,
                          opacity: audioLevel > (i * 20) ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={(!input.trim() && !uploadedImage && !uploadedDocument) || isLoading}
            className="bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:bg-dark-700 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setInput("Paste any property listing URL here")}
            className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-full text-gray-300 transition-colors"
            disabled={isRecording}
          >
            🔗 Paste any property URL
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`text-xs px-3 py-1.5 border rounded-full transition-colors ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 border-red-500 text-white'
                : 'bg-dark-700 hover:bg-dark-600 border-dark-600 text-gray-300'
            }`}
          >
            {isRecording ? '⏹️ Stop recording' : '🎙️ Voice input'}
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-full text-gray-300 transition-colors"
          >
            📸 Upload property photo
          </button>
          <button
            onClick={() => docInputRef.current?.click()}
            className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-full text-gray-300 transition-colors"
          >
            📄 Upload documents
          </button>
          <button
            onClick={() => setInput("I'm looking at a $400K property that rents for $3,200")}
            className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-full text-gray-300 transition-colors"
          >
            💰 Analyze a deal
          </button>
          <button
            onClick={() => setInput("What rate would I qualify for?")}
            className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-full text-gray-300 transition-colors"
          >
            📊 Check my rate
          </button>
          <button
            onClick={() => setInput("How do DSCR loans work?")}
            className="text-xs px-3 py-1.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-full text-gray-300 transition-colors"
          >
            📚 Learn about DSCR
          </button>
        </div>
      </div>
    </div>
  );
}
