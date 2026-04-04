'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function HeadlineContent() {
  const searchParams = useSearchParams();
  const rawKeyword = searchParams.get('keyword');
  const [keyword, setKeyword] = useState<string | null>(null);

  useEffect(() => {
    if (rawKeyword) {
      const cleaned = rawKeyword
        .replace(/\+/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      setKeyword(cleaned);
    }
  }, [rawKeyword]);

  // Light Theme styling (Navy Blue & Slate)
  if (keyword) {
    return (
      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4 animate-[fadeIn_0.5s_ease-in-out]">
        <span className="block text-slate-500 font-bold text-xl sm:text-2xl uppercase tracking-[0.2em] mb-4">
          Looking For
        </span>
        <span className="block text-slate-900">
          The Best Rates On
        </span>
        <span className="block text-blue-700 -mt-2 drop-shadow-sm">
          {keyword}
        </span>
      </h1>
    );
  }

  return (
    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4">
      <span className="block text-slate-500 font-bold text-xl sm:text-2xl uppercase tracking-[0.2em] mb-4">
        Our Promise
      </span>
      <span className="block text-slate-900">
        No Investor
      </span>
      <span className="block text-blue-700 -mt-2 drop-shadow-sm">
        Left Behind
      </span>
    </h1>
  );
}

export function DynamicHeroHeadlineLight() {
  return (
    <Suspense fallback={<div className="h-32 animate-pulse bg-slate-200 rounded-lg w-full max-w-2xl mx-auto"></div>}>
      <HeadlineContent />
    </Suspense>
  );
}
