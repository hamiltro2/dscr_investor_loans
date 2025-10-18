// Text Chat Mode (Your existing chat implementation)
'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function CapTextChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm Cap, your AI loan companion. 👋\n\nI help real estate investors find the perfect financing for their investment properties. I can:\n\n• Analyze property deals (DSCR, cash flow, ROI)\n• Check rates and qualification\n• Answer questions about ALL investor loans (DSCR, Hard Money, Fix & Flip, Refinance, etc.)\n• Analyze ANY property URL (Zillow, Redfin, BiggerPockets, LoopNet, etc.!) 🔗\n• Upload property photos for analysis 📸\n• Analyze documents (PDFs, bank statements, tax returns, etc.) 📄\n• Save your info for pre-approval\n\nWhat property or loan question can I help with today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedDocument, setUploadedDocument] = useState<{ data: string; name: string; type: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      
      // Handle different response formats
      let assistantMessage: string;
      
      if (data.choices && data.choices[0]?.message?.content) {
        // OpenAI chat completion format
        assistantMessage = data.choices[0].message.content;
      } else if (data.message) {
        // Simple message format
        assistantMessage = data.message;
      } else if (data.response) {
        // Alternative format
        assistantMessage = data.response;
      } else if (typeof data === 'string') {
        // Direct string response
        assistantMessage = data;
      } else {
        console.error('Unexpected response format:', data);
        throw new Error('Unexpected API response format');
      }

      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I had trouble connecting. Please try again!' 
      }]);
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
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
            disabled={isLoading}
            className="bg-dark-700 hover:bg-dark-600 text-gray-300 px-2.5 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            title="Upload document (PDF, Word, etc.)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </button>

          <textarea
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
            disabled={isLoading}
            suppressHydrationWarning
          />
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
          >
            🔗 Paste any property URL
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
