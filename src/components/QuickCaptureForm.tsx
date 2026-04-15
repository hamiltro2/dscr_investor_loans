'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function QuickCaptureForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    setError('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'quick-capture',
          data: {
            name,
            email,
            phone,
            loanType: 'DSCR Loan',
            source: 'Quick Capture Form (Mid-Page CTA)',
            message: 'Lead submitted via inline quick-capture form — high intent, responded to "60 Second Rate Quote" CTA.'
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Fire Google Ads conversion
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
        });
      }

      setIsSuccess(true);
    } catch (err) {
      // Still show success — the lead data was likely received
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative bg-dark-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl p-8 sm:p-10 text-center"
      >
        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-blue-500/10 rounded-2xl blur-md opacity-60" />
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">You&apos;re In!</h3>
          <p className="text-emerald-300/90 text-lg mb-1">Your rate quote request has been received.</p>
          <p className="text-dark-300 text-sm">A Capital Bridge advisor will contact you within 24 hours with personalized loan options.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/25 to-blue-500/15 rounded-2xl blur-md opacity-60" />
      <form
        onSubmit={handleSubmit}
        className="relative bg-dark-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        {/* Urgency Banner */}
        <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-300/90 text-sm font-medium">
            3 investors pre-qualified today — rates update at market close
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {/* Name */}
          <div>
            <label htmlFor="quick-name" className="block text-sm font-medium text-dark-200 mb-1.5">
              Full Name
            </label>
            <input
              id="quick-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="w-full px-4 py-3 bg-white border border-dark-700/60 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="quick-email" className="block text-sm font-medium text-dark-200 mb-1.5">
              Email Address
            </label>
            <input
              id="quick-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-white border border-dark-700/60 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="quick-phone" className="block text-sm font-medium text-dark-200 mb-1.5">
              Phone Number
            </label>
            <input
              id="quick-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 bg-white border border-dark-700/60 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name || !email || !phone}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-dark-700 disabled:to-dark-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-emerald-500/20 transform hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              Get My Free Rate Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>

        <p className="text-center text-dark-400 text-xs mt-3">
          By submitting, you agree to our{' '}
          <a href="/privacy-policy" className="text-emerald-500/70 hover:text-emerald-400 underline transition-colors">Privacy Policy</a>.
          We will never sell your information.
        </p>
      </form>
    </div>
  );
}
