'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function HeadlineContent() {
  const searchParams = useSearchParams();
  const rawKeyword = searchParams.get('keyword');
  const [keyword, setKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (rawKeyword) {
      // Clean and title case the keyword
      const cleaned = rawKeyword
        .replace(/\+/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      setKeyword(cleaned);
    }
  }, [rawKeyword]);

  // Dynamic Keyword Injection Design
  if (keyword) {
    return (
      <h1 className="title-glow font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4 animate-[fadeIn_0.5s_ease-in-out]">
        <span className="block text-white font-light text-xl sm:text-2xl uppercase tracking-[0.2em] mb-4 opacity-80">
          Looking For
        </span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
          The Best Rates On
        </span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 -mt-2">
          {keyword}
        </span>
      </h1>
    );
  }

  // Fallback / Organic Design
  return (
    <h1 className="title-glow font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4">
      <span className="block text-white font-light text-xl sm:text-2xl uppercase tracking-[0.2em] mb-4 opacity-80">
        Our Promise
      </span>
      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
        No Investor
      </span>
      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 -mt-2">
        Left Behind
      </span>
    </h1>
  );
}

// Wrapping in Suspense is mandatory when using useSearchParams to prevent de-opting the entire page from static generation
export function DynamicHeroHeadline() {
  return (
    <Suspense fallback={
      <h1 className="title-glow font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4">
        <span className="block text-white font-light text-xl sm:text-2xl uppercase tracking-[0.2em] mb-4 opacity-80">
          Our Promise
        </span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
          No Investor
        </span>
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 -mt-2">
          Left Behind
        </span>
      </h1>
    }>
      <HeadlineContent />
    </Suspense>
  );
}
