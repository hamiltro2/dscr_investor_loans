'use client';

import { useState, useEffect } from 'react';

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~600px (past the hero form)
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Gradient fade edge */}
      <div className="h-4 bg-gradient-to-t from-dark-950 to-transparent" />
      <div className="bg-dark-950/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex items-center gap-3">
        <a
          href="#quick-apply"
          className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-center rounded-xl shadow-lg text-sm"
        >
          Get Pre-Qualified Now
        </a>
        <a
          href="tel:+19493393555"
          className="flex-shrink-0 w-12 h-12 bg-dark-800 border border-white/10 rounded-xl flex items-center justify-center"
          aria-label="Call us"
        >
          <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
