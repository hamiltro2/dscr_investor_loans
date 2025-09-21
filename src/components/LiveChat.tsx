'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-primary-500 text-white rounded-full p-4 shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110"
        aria-label="Open live chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-dark-900 rounded-2xl shadow-2xl border border-dark-800">
          <div className="bg-primary-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Chat with a DSCR Expert</h3>
              <p className="text-sm opacity-90">Typically replies in minutes</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="bg-dark-800 rounded-lg p-4 mb-4">
              <p className="text-gray-300 text-sm">
                👋 Hi! I'm here to help with your DSCR loan questions. How can I assist you today?
              </p>
            </div>
            
            <div className="space-y-2">
              <button className="w-full text-left bg-dark-800 hover:bg-dark-700 rounded-lg p-3 text-sm text-gray-300 transition-colors">
                What are current DSCR loan rates?
              </button>
              <button className="w-full text-left bg-dark-800 hover:bg-dark-700 rounded-lg p-3 text-sm text-gray-300 transition-colors">
                How fast can I get approved?
              </button>
              <button className="w-full text-left bg-dark-800 hover:bg-dark-700 rounded-lg p-3 text-sm text-gray-300 transition-colors">
                What's the minimum credit score?
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-dark-800">
              <p className="text-xs text-gray-400 text-center">
                Or call us directly at{' '}
                <a href="tel:+19493393555" className="text-primary-400 hover:text-primary-300">
                  (949) 339-3555
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
