'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/utils/applovin';

/**
 * Automatically track page views with AppLovin Axon Pixel
 * This component should be added to the root layout
 */
export function ApplovinPageView() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    trackPageView();
  }, [pathname]);

  return null;
}
