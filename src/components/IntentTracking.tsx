'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function IntentTracking() {
  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > maxScroll) {
          maxScroll = scrollPercentage;
          
          // Track 50% scroll
          if (scrollPercentage > 50 && !sessionStorage.getItem('scroll50')) {
            window.dataLayer?.push({
              'event': 'scroll_depth',
              'scroll_threshold': 50
            });
            sessionStorage.setItem('scroll50', 'true');
          }
          
          // Track 75% scroll (high intent)
          if (scrollPercentage > 75 && !sessionStorage.getItem('scroll75')) {
            window.dataLayer?.push({
              'event': 'high_intent_scroll',
              'scroll_threshold': 75
            });
            
            // Fire Google Ads remarketing event
            if (window.gtag) {
              window.gtag('event', 'page_view', {
                'send_to': 'AW-1002915679',
                'value': 1,
                'items': [{
                  'id': 'high_intent_scroll',
                  'google_business_vertical': 'custom'
                }]
              });
            }
            
            sessionStorage.setItem('scroll75', 'true');
          }
          
          // Track 90% scroll (very high intent)
          if (scrollPercentage > 90 && !sessionStorage.getItem('scroll90')) {
            window.dataLayer?.push({
              'event': 'very_high_intent_scroll',
              'scroll_threshold': 90
            });
            sessionStorage.setItem('scroll90', 'true');
          }
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    let announced30s = false;
    let announced2m = false;
    let announced5m = false;

    const trackTime = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      // 30 seconds - interested
      if (timeSpent > 30 && !announced30s) {
        window.dataLayer?.push({
          'event': 'time_on_page',
          'time_threshold': 30
        });
        announced30s = true;
      }
      
      // 2 minutes - high intent
      if (timeSpent > 120 && !announced2m) {
        window.dataLayer?.push({
          'event': 'high_intent_time',
          'time_threshold': 120
        });
        
        // Fire Google Ads remarketing event
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            'send_to': 'AW-1002915679',
            'value': 2,
            'items': [{
              'id': 'high_intent_time',
              'google_business_vertical': 'custom'
            }]
          });
        }
        
        announced2m = true;
      }
      
      // 5 minutes - very high intent
      if (timeSpent > 300 && !announced5m) {
        window.dataLayer?.push({
          'event': 'very_high_intent_time',
          'time_threshold': 300
        });
        announced5m = true;
      }
    };

    const interval = setInterval(trackTime, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Track rage clicks (frustration indicator)
  useEffect(() => {
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;

    const handleClick = () => {
      clickCount++;
      
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        if (clickCount > 3) {
          window.dataLayer?.push({
            'event': 'rage_clicks',
            'click_count': clickCount
          });
        }
        clickCount = 0;
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      clearTimeout(clickTimer);
    };
  }, []);

  // Track form field interactions
  useEffect(() => {
    const trackFormFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const fieldName = target.getAttribute('name') || target.getAttribute('id') || 'unknown';
        
        if (!sessionStorage.getItem(`field_${fieldName}`)) {
          window.dataLayer?.push({
            'event': 'form_field_interaction',
            'field_name': fieldName
          });
          sessionStorage.setItem(`field_${fieldName}`, 'true');
          
          // Track form start
          if (!sessionStorage.getItem('form_started')) {
            window.dataLayer?.push({
              'event': 'form_start'
            });
            
            // Fire Google Ads remarketing event for form starters
            if (window.gtag) {
              window.gtag('event', 'page_view', {
                'send_to': 'AW-1002915679',
                'value': 3,
                'items': [{
                  'id': 'form_starter',
                  'google_business_vertical': 'custom'
                }]
              });
            }
            
            sessionStorage.setItem('form_started', 'true');
          }
        }
      }
    };

    document.addEventListener('focusin', trackFormFocus);
    return () => document.removeEventListener('focusin', trackFormFocus);
  }, []);

  // Track intent score
  useEffect(() => {
    const calculateIntentScore = () => {
      let score = 0;
      
      // Scroll depth points
      if (sessionStorage.getItem('scroll50')) score += 1;
      if (sessionStorage.getItem('scroll75')) score += 2;
      if (sessionStorage.getItem('scroll90')) score += 3;
      
      // Time on page points
      if (sessionStorage.getItem('time30')) score += 1;
      if (sessionStorage.getItem('time120')) score += 3;
      if (sessionStorage.getItem('time300')) score += 5;
      
      // Form interaction points
      if (sessionStorage.getItem('form_started')) score += 5;
      
      // FAQ interaction points
      const faqClicks = parseInt(sessionStorage.getItem('faq_clicks') || '0');
      score += faqClicks * 2;
      
      return score;
    };

    // Check intent score every 30 seconds
    const checkIntent = () => {
      const score = calculateIntentScore();
      
      if (score >= 10 && !sessionStorage.getItem('high_intent_user')) {
        window.dataLayer?.push({
          'event': 'high_intent_user_identified',
          'intent_score': score
        });
        
        // Create high-value remarketing audience
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-1002915679',
            'value': score,
            'currency': 'USD',
            'transaction_id': `intent_${Date.now()}`
          });
        }
        
        sessionStorage.setItem('high_intent_user', 'true');
      }
    };

    const interval = setInterval(checkIntent, 30000);
    checkIntent(); // Check immediately
    
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}

// Export tracking utilities
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  window.dataLayer?.push({
    'event': eventName,
    ...parameters
  });
};

export const trackFAQClick = (question: string) => {
  const currentClicks = parseInt(sessionStorage.getItem('faq_clicks') || '0');
  sessionStorage.setItem('faq_clicks', String(currentClicks + 1));
  
  trackEvent('faq_interaction', {
    'question': question,
    'total_faq_clicks': currentClicks + 1
  });
};

export const trackCalculatorUse = (calculatorType: string, result?: any) => {
  trackEvent('calculator_use', {
    'calculator_type': calculatorType,
    'has_result': !!result
  });
  
  if (result) {
    // High intent - they got a result
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        'send_to': 'AW-1002915679',
        'value': 5,
        'items': [{
          'id': 'calculator_user',
          'google_business_vertical': 'custom'
        }]
      });
    }
  }
};
