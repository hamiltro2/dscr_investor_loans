'use client';

import { useState, useEffect } from 'react';
import { X, Clock, TrendingUp, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const [isUserEngaged, setIsUserEngaged] = useState(false);

  useEffect(() => {
    // Don't show on mobile devices
    if (window.innerWidth < 768) {
      return;
    }

    // Check if popup has been shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasBeenShown(true);
      return;
    }

    // Track user engagement with forms
    const handleFormInteraction = () => {
      setIsUserEngaged(true);
      // Reset engagement after 30 seconds of no interaction
      setTimeout(() => setIsUserEngaged(false), 30000);
    };

    // Listen for form interactions
    document.addEventListener('focus', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        handleFormInteraction();
      }
    }, true);

    document.addEventListener('input', handleFormInteraction);
    document.addEventListener('change', handleFormInteraction);

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top AND user is not engaged with forms
      if (e.clientY <= 0 && !hasBeenShown && !isUserEngaged) {
        setIsVisible(true);
        setHasBeenShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Add small delay before activating to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 2000); // 2 seconds to avoid immediate trigger on page load

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('focus', handleFormInteraction, true);
      document.removeEventListener('input', handleFormInteraction);
      document.removeEventListener('change', handleFormInteraction);
    };
  }, [hasBeenShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/aOGJCNjKxa0aEN-Ond4D'
      });
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'exit-intent',
          data: { email, source: 'exit-intent-popup' }
        })
      });

      if (response.ok) {
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-[50%] -translate-y-[50%] max-w-2xl mx-auto z-50"
          >
            <div className="relative bg-gradient-to-br from-dark-900 to-dark-950 rounded-3xl shadow-2xl border border-primary-500/20 overflow-hidden">
              {/* Decorative gradient orb */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl" />

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-dark-800/50 hover:bg-dark-700 transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>

              <div className="relative p-8 md:p-12">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp className="w-8 h-8 text-primary-400" />
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                  Wait! Don't Miss Out on
                  <span className="text-primary-400 block">Lower Rates</span>
                </h2>

                {/* Subheadline */}
                <p className="text-lg text-gray-300 text-center mb-8 max-w-md mx-auto">
                  Get your personalized DSCR loan quote and see how much you could save
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400">5.99%</div>
                    <div className="text-sm text-gray-400">Rates From</div>
                  </div>
                  <div className="text-center border-x border-dark-700">
                    <div className="text-2xl font-bold text-primary-400">24hr</div>
                    <div className="text-sm text-gray-400">Approval</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400">0.75%</div>
                    <div className="text-sm text-gray-400">Points</div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for instant quote"
                    required
                    className="w-full px-5 py-4 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-primary-500/25 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Get My Free Quote →'}
                  </button>
                </form>

                {/* Trust text */}
                <p className="text-center text-sm text-gray-400 mt-4">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Takes only 60 seconds • No credit check required
                </p>

                {/* Alternative CTA */}
                <div className="mt-6 pt-6 border-t border-dark-800">
                  <p className="text-center text-gray-300">
                    Prefer to talk? Call us now at{' '}
                    <a 
                      href="tel:+19493393555" 
                      className="text-primary-400 font-semibold hover:text-primary-300"
                      onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
                    >
                      (949) 339-3555
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
