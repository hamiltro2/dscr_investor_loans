'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, TrendingUp, Clock, Calculator, Phone, ArrowRight } from 'lucide-react';
import { MultiStepForm } from '@/components/MultiStepForm';

// Declare gtag and dataLayer for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    highIntentFired?: boolean;
  }
}

export default function DSCRLoansLandingPage() {
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    // Capture URL parameters for personalization
    setUrlParams(new URLSearchParams(window.location.search));
    
    // High Intent User Tracking
    let scrollDepth = 0;
    let timeOnPage = 0;
    let formInteractions = 0;
    
    // Track scroll depth
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollDepth = Math.max(scrollDepth, Math.round((winScroll / height) * 100));
    };
    
    // Track time on page
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      
      // Check for high intent signals
      if (
        (scrollDepth > 50 && timeOnPage > 30) || // Engaged reader
        (formInteractions > 0 && timeOnPage > 10) || // Form interest
        (scrollDepth > 75 && timeOnPage > 60) // Deep engagement
      ) {
        // Push high intent event to dataLayer
        if (window.dataLayer && !window.highIntentFired) {
          window.highIntentFired = true;
          window.dataLayer.push({
            'event': 'high_intent_user_identified',
            'intent_score': calculateIntentScore(),
            'scroll_depth': scrollDepth,
            'time_on_page': timeOnPage,
            'form_interactions': formInteractions
          });
        }
      }
    }, 5000);
    
    // Track form interactions
    const handleFormInteraction = () => {
      formInteractions++;
    };
    
    // Calculate intent score
    const calculateIntentScore = () => {
      let score = 0;
      if (scrollDepth > 75) score += 30;
      else if (scrollDepth > 50) score += 20;
      else if (scrollDepth > 25) score += 10;
      
      if (timeOnPage > 120) score += 30;
      else if (timeOnPage > 60) score += 20;
      else if (timeOnPage > 30) score += 10;
      
      if (formInteractions > 2) score += 40;
      else if (formInteractions > 0) score += 30;
      
      return Math.min(score, 100);
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('focus', (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        handleFormInteraction();
      }
    }, true);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  const benefits = [
    'No Tax Returns Required',
    'Qualify Based on Property Income',
    'Self-Employed Friendly',
    '24-48 Hour Approval',
    'Rates from 5.99%',
    'Up to $30 Million'
  ];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-400" />,
      title: 'Higher Loan Amounts',
      description: 'Leverage property income for larger loans than traditional mortgages'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-400" />,
      title: 'Fast Closings',
      description: '2+ week closings with streamlined documentation'
    },
    {
      icon: <Calculator className="w-8 h-8 text-primary-400" />,
      title: 'Portfolio Friendly',
      description: 'Finance multiple properties without W-2 restrictions'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* City Skyline Background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10" />
          
          {/* City skyline SVG - Mobile optimized */}
          <div className="absolute bottom-0 left-0 right-0 opacity-[0.08] md:opacity-[0.05] h-[200px] md:h-[300px] lg:h-[400px]">
            {/* Mobile version - simplified */}
            <svg 
              viewBox="0 0 600 400" 
              className="w-full h-full md:hidden"
              preserveAspectRatio="xMidYEnd slice"
            >
              {/* Simplified buildings for mobile */}
              <g className="text-white">
                <rect x="0" y="200" width="80" height="200" fill="currentColor" />
                <rect x="100" y="150" width="100" height="250" fill="currentColor" />
                <rect x="220" y="180" width="90" height="220" fill="currentColor" />
                <rect x="330" y="120" width="110" height="280" fill="currentColor" />
                <rect x="460" y="160" width="85" height="240" fill="currentColor" />
                <rect x="560" y="140" width="40" height="260" fill="currentColor" />
              </g>
              {/* Simple window lights for mobile */}
              <g className="text-primary-400">
                <circle cx="40" cy="220" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="40" cy="250" r="1.5" fill="currentColor" opacity="0.4" />
                <circle cx="40" cy="280" r="1.5" fill="currentColor" opacity="0.9" />
                <circle cx="150" cy="170" r="1.5" fill="currentColor" opacity="0.7" />
                <circle cx="150" cy="200" r="1.5" fill="currentColor" opacity="0.3" />
                <circle cx="265" cy="200" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="265" cy="230" r="1.5" fill="currentColor" opacity="0.5" />
                <circle cx="385" cy="140" r="1.5" fill="currentColor" opacity="0.9" />
                <circle cx="385" cy="170" r="1.5" fill="currentColor" opacity="0.4" />
                <circle cx="502" cy="180" r="1.5" fill="currentColor" opacity="0.7" />
              </g>
            </svg>
            
            {/* Desktop version - full detail */}
            <svg 
              viewBox="0 0 1200 400" 
              className="w-full h-full hidden md:block"
              preserveAspectRatio="xMidYEnd slice"
            >
              {/* Background buildings - far layer with architectural details */}
              <g className="text-white">
                {/* Building 1 - Modern tower */}
                <rect x="0" y="200" width="80" height="200" fill="currentColor" />
                <rect x="10" y="210" width="60" height="4" fill="currentColor" opacity="0.4" />
                <rect x="10" y="240" width="60" height="4" fill="currentColor" opacity="0.4" />
                <rect x="10" y="270" width="60" height="4" fill="currentColor" opacity="0.4" />
                <rect x="10" y="300" width="60" height="4" fill="currentColor" opacity="0.4" />
                <rect x="10" y="330" width="60" height="4" fill="currentColor" opacity="0.4" />
                <rect x="10" y="360" width="60" height="4" fill="currentColor" opacity="0.4" />
                {/* Enhanced window grid - 6 floors x 4 windows */}
                <rect x="12" y="220" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="220" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="32" y="220" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="42" y="220" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="52" y="220" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="62" y="220" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="12" y="250" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="250" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="32" y="250" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="42" y="250" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="52" y="250" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="62" y="250" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="12" y="280" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="280" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="32" y="280" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="42" y="280" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="52" y="280" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="62" y="280" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="12" y="310" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="310" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="32" y="310" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="42" y="310" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="52" y="310" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="62" y="310" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="12" y="340" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="340" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="32" y="340" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="42" y="340" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="52" y="340" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="62" y="340" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="12" y="370" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="370" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="32" y="370" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="42" y="370" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="52" y="370" width="6" height="10" fill="currentColor" opacity="0.4" />
                <rect x="62" y="370" width="6" height="10" fill="currentColor" opacity="0.4" />
                
                {/* Building 2 - Art Deco style */}
                <rect x="90" y="150" width="60" height="250" fill="currentColor" />
                <polygon points="90,150 120,130 150,150" fill="currentColor" opacity="0.4" />
                <rect x="100" y="160" width="40" height="3" fill="currentColor" opacity="0.3" />
                <rect x="100" y="180" width="40" height="3" fill="currentColor" opacity="0.3" />
                <rect x="100" y="200" width="40" height="3" fill="currentColor" opacity="0.3" />
                {/* Art Deco windows */}
                <rect x="95" y="170" width="6" height="8" fill="currentColor" opacity="0.25" />
                <rect x="105" y="170" width="6" height="8" fill="currentColor" opacity="0.25" />
                <rect x="115" y="170" width="6" height="8" fill="currentColor" opacity="0.25" />
                <rect x="125" y="170" width="6" height="8" fill="currentColor" opacity="0.25" />
                <rect x="135" y="170" width="6" height="8" fill="currentColor" opacity="0.25" />
                <rect x="145" y="170" width="6" height="8" fill="currentColor" opacity="0.25" />
                
                {/* Building 3 - Glass tower with setbacks */}
                <rect x="160" y="180" width="70" height="220" fill="currentColor" />
                <rect x="170" y="160" width="50" height="20" fill="currentColor" opacity="0.7" />
                <rect x="180" y="140" width="30" height="20" fill="currentColor" opacity="0.5" />
                <line x1="165" y1="190" x2="225" y2="190" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="165" y1="220" x2="225" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="165" y1="250" x2="225" y2="250" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="165" y1="280" x2="225" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                
                {/* Building 4 - Spire building */}
                <rect x="240" y="120" width="50" height="280" fill="currentColor" />
                <polygon points="240,120 265,90 290,120" fill="currentColor" opacity="0.6" />
                <rect x="250" y="130" width="30" height="2" fill="currentColor" opacity="0.3" />
                <rect x="250" y="160" width="30" height="2" fill="currentColor" opacity="0.3" />
                <rect x="250" y="190" width="30" height="2" fill="currentColor" opacity="0.3" />
                
                {/* Building 5 - Wide commercial */}
                <rect x="300" y="160" width="80" height="240" fill="currentColor" />
                <rect x="310" y="170" width="60" height="6" fill="currentColor" opacity="0.3" />
                <rect x="310" y="200" width="60" height="6" fill="currentColor" opacity="0.3" />
                <rect x="310" y="230" width="60" height="6" fill="currentColor" opacity="0.3" />
                <rect x="310" y="260" width="60" height="6" fill="currentColor" opacity="0.3" />
                <rect x="320" y="140" width="40" height="20" fill="currentColor" opacity="0.4" />
                
                {/* Building 6 - Modern office tower */}
                <rect x="390" y="100" width="60" height="300" fill="currentColor" />
                <rect x="400" y="110" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="140" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="170" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="200" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="230" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="260" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="290" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="320" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="350" width="40" height="4" fill="currentColor" opacity="0.3" />
                <rect x="400" y="380" width="40" height="4" fill="currentColor" opacity="0.3" />
                
                {/* Continue with more detailed buildings... */}
                <rect x="460" y="140" width="70" height="260" fill="currentColor" />
                <rect x="470" y="150" width="50" height="4" fill="currentColor" opacity="0.3" />
                <rect x="470" y="180" width="50" height="4" fill="currentColor" opacity="0.3" />
                <rect x="470" y="210" width="50" height="4" fill="currentColor" opacity="0.3" />
                <rect x="480" y="120" width="30" height="20" fill="currentColor" opacity="0.5" />
                
                {/* Tallest building - centerpiece */}
                <rect x="540" y="80" width="90" height="320" fill="currentColor" />
                <rect x="550" y="60" width="70" height="20" fill="currentColor" opacity="0.6" />
                <rect x="560" y="40" width="50" height="20" fill="currentColor" opacity="0.4" />
                <polygon points="560,40 585,20 610,40" fill="currentColor" opacity="0.3" />
                <rect x="550" y="90" width="70" height="5" fill="currentColor" opacity="0.4" />
                <rect x="550" y="130" width="70" height="5" fill="currentColor" opacity="0.4" />
                <rect x="550" y="170" width="70" height="5" fill="currentColor" opacity="0.4" />
                <rect x="550" y="210" width="70" height="5" fill="currentColor" opacity="0.4" />
                <rect x="550" y="250" width="70" height="5" fill="currentColor" opacity="0.4" />
                <rect x="550" y="290" width="70" height="5" fill="currentColor" opacity="0.4" />
                <rect x="550" y="330" width="70" height="5" fill="currentColor" opacity="0.4" />
                {/* Detailed window grid - 8 floors x 6 windows */}
                <rect x="545" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="100" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="545" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="140" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="545" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="180" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="545" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="220" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="545" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="260" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="545" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="300" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="545" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="555" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="565" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="575" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="585" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="595" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="605" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="615" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                <rect x="625" y="340" width="5" height="8" fill="currentColor" opacity="0.5" />
                
                {/* Continue pattern for remaining buildings... */}
                <rect x="640" y="110" width="75" height="290" fill="currentColor" />
                <rect x="650" y="120" width="55" height="3" fill="currentColor" opacity="0.3" />
                <rect x="650" y="150" width="55" height="3" fill="currentColor" opacity="0.3" />
                <rect x="650" y="180" width="55" height="3" fill="currentColor" opacity="0.3" />
                <rect x="660" y="90" width="35" height="20" fill="currentColor" opacity="0.4" />
                
                <rect x="725" y="130" width="65" height="270" fill="currentColor" />
                <rect x="735" y="140" width="45" height="4" fill="currentColor" opacity="0.3" />
                <rect x="735" y="170" width="45" height="4" fill="currentColor" opacity="0.3" />
                <rect x="735" y="200" width="45" height="4" fill="currentColor" opacity="0.3" />
                
                <rect x="800" y="90" width="85" height="310" fill="currentColor" />
                <rect x="810" y="100" width="65" height="5" fill="currentColor" opacity="0.3" />
                <rect x="810" y="140" width="65" height="5" fill="currentColor" opacity="0.3" />
                <rect x="810" y="180" width="65" height="5" fill="currentColor" opacity="0.3" />
                <rect x="820" y="70" width="45" height="20" fill="currentColor" opacity="0.5" />
                
                <rect x="895" y="170" width="55" height="230" fill="currentColor" />
                <rect x="905" y="180" width="35" height="3" fill="currentColor" opacity="0.3" />
                <rect x="905" y="210" width="35" height="3" fill="currentColor" opacity="0.3" />
                
                <rect x="960" y="120" width="70" height="280" fill="currentColor" />
                <rect x="970" y="130" width="50" height="4" fill="currentColor" opacity="0.3" />
                <rect x="970" y="160" width="50" height="4" fill="currentColor" opacity="0.3" />
                <rect x="980" y="100" width="30" height="20" fill="currentColor" opacity="0.4" />
                
                <rect x="1040" y="160" width="80" height="240" fill="currentColor" />
                <rect x="1050" y="170" width="60" height="4" fill="currentColor" opacity="0.3" />
                <rect x="1050" y="200" width="60" height="4" fill="currentColor" opacity="0.3" />
                
                <rect x="1130" y="140" width="70" height="260" fill="currentColor" />
                <rect x="1140" y="150" width="50" height="3" fill="currentColor" opacity="0.3" />
                <rect x="1140" y="180" width="50" height="3" fill="currentColor" opacity="0.3" />
              </g>
              
              {/* Mid-layer buildings with enhanced details */}
              <g className="text-white opacity-80">
                <rect x="50" y="220" width="40" height="180" fill="currentColor" />
                <rect x="55" y="230" width="30" height="2" fill="currentColor" opacity="0.4" />
                <rect x="55" y="260" width="30" height="2" fill="currentColor" opacity="0.4" />
                
                <rect x="120" y="190" width="35" height="210" fill="currentColor" />
                <rect x="125" y="200" width="25" height="2" fill="currentColor" opacity="0.4" />
                <rect x="125" y="230" width="25" height="2" fill="currentColor" opacity="0.4" />
                
                <rect x="200" y="160" width="45" height="240" fill="currentColor" />
                <rect x="205" y="170" width="35" height="3" fill="currentColor" opacity="0.4" />
                <rect x="205" y="200" width="35" height="3" fill="currentColor" opacity="0.4" />
                
                {/* Continue pattern for mid-layer... */}
                <rect x="280" y="140" width="40" height="260" fill="currentColor" />
                <rect x="350" y="180" width="50" height="220" fill="currentColor" />
                <rect x="430" y="120" width="45" height="280" fill="currentColor" />
                <rect x="500" y="200" width="35" height="200" fill="currentColor" />
                <rect x="570" y="110" width="55" height="290" fill="currentColor" />
                <rect x="650" y="170" width="40" height="230" fill="currentColor" />
                <rect x="720" y="150" width="45" height="250" fill="currentColor" />
                <rect x="790" y="130" width="50" height="270" fill="currentColor" />
                <rect x="870" y="190" width="35" height="210" fill="currentColor" />
                <rect x="930" y="160" width="40" height="240" fill="currentColor" />
                <rect x="1000" y="180" width="45" height="220" fill="currentColor" />
                <rect x="1070" y="140" width="50" height="260" fill="currentColor" />
              </g>
              
              {/* Foreground accent buildings with premium details */}
              <g className="text-primary-300 opacity-60">
                <rect x="100" y="240" width="25" height="160" fill="currentColor" />
                <rect x="105" y="250" width="15" height="2" fill="currentColor" opacity="0.6" />
                <rect x="105" y="280" width="15" height="2" fill="currentColor" opacity="0.6" />
                
                <rect x="250" y="200" width="30" height="200" fill="currentColor" />
                <rect x="255" y="210" width="20" height="2" fill="currentColor" opacity="0.6" />
                <rect x="255" y="240" width="20" height="2" fill="currentColor" opacity="0.6" />
                
                <rect x="400" y="180" width="35" height="220" fill="currentColor" />
                <rect x="405" y="190" width="25" height="3" fill="currentColor" opacity="0.6" />
                <rect x="405" y="220" width="25" height="3" fill="currentColor" opacity="0.6" />
                
                <rect x="600" y="160" width="28" height="240" fill="currentColor" />
                <rect x="605" y="170" width="18" height="2" fill="currentColor" opacity="0.6" />
                <rect x="605" y="200" width="18" height="2" fill="currentColor" opacity="0.6" />
                
                <rect x="750" y="190" width="32" height="210" fill="currentColor" />
                <rect x="755" y="200" width="22" height="2" fill="currentColor" opacity="0.6" />
                <rect x="755" y="230" width="22" height="2" fill="currentColor" opacity="0.6" />
                
                <rect x="900" y="220" width="25" height="180" fill="currentColor" />
                <rect x="905" y="230" width="15" height="2" fill="currentColor" opacity="0.6" />
                <rect x="905" y="260" width="15" height="2" fill="currentColor" opacity="0.6" />
                
                <rect x="1050" y="200" width="30" height="200" fill="currentColor" />
                <rect x="1055" y="210" width="20" height="2" fill="currentColor" opacity="0.6" />
                <rect x="1055" y="240" width="20" height="2" fill="currentColor" opacity="0.6" />
              </g>
              
              {/* Realistic window lights - some on, some off */}
              <g className="text-primary-400">
                {/* Building 1 - Modern tower window lights (varied brightness) */}
                <circle cx="15" cy="225" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="25" cy="225" r="0.8" fill="currentColor" opacity="0.3" />
                <circle cx="35" cy="225" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="45" cy="225" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="55" cy="225" r="0.8" fill="currentColor" opacity="0.7" />
                <circle cx="65" cy="225" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="15" cy="255" r="0.8" fill="currentColor" opacity="0.2" />
                <circle cx="25" cy="255" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="35" cy="255" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="45" cy="255" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="55" cy="255" r="0.8" fill="currentColor" opacity="0.4" />
                <circle cx="65" cy="255" r="0.8" fill="currentColor" opacity="0.7" />
                <circle cx="15" cy="285" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="25" cy="285" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="35" cy="285" r="0.8" fill="currentColor" opacity="0.6" />
                <circle cx="45" cy="285" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="55" cy="285" r="0.8" fill="currentColor" opacity="0.2" />
                <circle cx="65" cy="285" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="15" cy="315" r="0.8" fill="currentColor" opacity="0.4" />
                <circle cx="25" cy="315" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="35" cy="315" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="45" cy="315" r="0.8" fill="currentColor" opacity="0.7" />
                <circle cx="55" cy="315" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="65" cy="315" r="0.8" fill="currentColor" opacity="0.3" />
                <circle cx="15" cy="345" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="25" cy="345" r="0.8" fill="currentColor" opacity="0.2" />
                <circle cx="35" cy="345" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="45" cy="345" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="55" cy="345" r="0.8" fill="currentColor" opacity="0.6" />
                <circle cx="65" cy="345" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="15" cy="375" r="0.8" fill="currentColor" opacity="0.3" />
                <circle cx="25" cy="375" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="35" cy="375" r="0.8" fill="currentColor" opacity="0.7" />
                <circle cx="45" cy="375" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="55" cy="375" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="65" cy="375" r="0.8" fill="currentColor" opacity="0.5" />
                
                {/* Building 2 - Art Deco window lights (some on/off) */}
                <circle cx="98" cy="174" r="0.6" fill="currentColor" opacity="0.8" />
                <circle cx="108" cy="174" r="0.6" fill="currentColor" opacity="0.2" />
                <circle cx="118" cy="174" r="0.6" fill="currentColor" opacity="0.9" />
                <circle cx="128" cy="174" r="0.6" fill="currentColor" opacity="0.1" />
                <circle cx="138" cy="174" r="0.6" fill="currentColor" opacity="0.7" />
                <circle cx="148" cy="174" r="0.6" fill="currentColor" opacity="0.9" />
                
                {/* Modern office tower windows - varied lighting */}
                <circle cx="410" cy="125" r="0.9" fill="currentColor" opacity="0.8" />
                <circle cx="425" cy="125" r="0.9" fill="currentColor" opacity="0.3" />
                <circle cx="410" cy="155" r="0.9" fill="currentColor" opacity="0.1" />
                <circle cx="425" cy="155" r="0.9" fill="currentColor" opacity="0.9" />
                <circle cx="410" cy="185" r="0.9" fill="currentColor" opacity="0.7" />
                <circle cx="425" cy="185" r="0.9" fill="currentColor" opacity="0.2" />
                <circle cx="410" cy="215" r="0.9" fill="currentColor" opacity="0.9" />
                <circle cx="425" cy="215" r="0.9" fill="currentColor" opacity="0.6" />
                <circle cx="410" cy="245" r="0.9" fill="currentColor" opacity="0.1" />
                <circle cx="425" cy="245" r="0.9" fill="currentColor" opacity="0.8" />
                <circle cx="410" cy="275" r="0.9" fill="currentColor" opacity="0.4" />
                <circle cx="425" cy="275" r="0.9" fill="currentColor" opacity="0.9" />
                
                {/* Tallest building windows - centerpiece with realistic pattern */}
                <circle cx="548" cy="105" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="558" cy="105" r="1.1" fill="currentColor" opacity="0.2" />
                <circle cx="568" cy="105" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="578" cy="105" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="588" cy="105" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="598" cy="105" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="608" cy="105" r="1.1" fill="currentColor" opacity="0.3" />
                <circle cx="618" cy="105" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="628" cy="105" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="548" cy="145" r="1.1" fill="currentColor" opacity="0.4" />
                <circle cx="558" cy="145" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="568" cy="145" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="578" cy="145" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="588" cy="145" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="598" cy="145" r="1.1" fill="currentColor" opacity="0.2" />
                <circle cx="608" cy="145" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="618" cy="145" r="1.1" fill="currentColor" opacity="0.5" />
                <circle cx="628" cy="145" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="548" cy="185" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="558" cy="185" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="568" cy="185" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="578" cy="185" r="1.1" fill="currentColor" opacity="0.3" />
                <circle cx="588" cy="185" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="598" cy="185" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="608" cy="185" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="618" cy="185" r="1.1" fill="currentColor" opacity="0.6" />
                <circle cx="628" cy="185" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="548" cy="225" r="1.1" fill="currentColor" opacity="0.2" />
                <circle cx="558" cy="225" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="568" cy="225" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="578" cy="225" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="588" cy="225" r="1.1" fill="currentColor" opacity="0.5" />
                <circle cx="598" cy="225" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="608" cy="225" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="618" cy="225" r="1.1" fill="currentColor" opacity="0.2" />
                <circle cx="628" cy="225" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="548" cy="265" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="558" cy="265" r="1.1" fill="currentColor" opacity="0.3" />
                <circle cx="568" cy="265" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="578" cy="265" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="588" cy="265" r="1.1" fill="currentColor" opacity="0.6" />
                <circle cx="598" cy="265" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="608" cy="265" r="1.1" fill="currentColor" opacity="0.4" />
                <circle cx="618" cy="265" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="628" cy="265" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="548" cy="305" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="558" cy="305" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="568" cy="305" r="1.1" fill="currentColor" opacity="0.2" />
                <circle cx="578" cy="305" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="588" cy="305" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="598" cy="305" r="1.1" fill="currentColor" opacity="0.5" />
                <circle cx="608" cy="305" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="618" cy="305" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="628" cy="305" r="1.1" fill="currentColor" opacity="0.3" />
                <circle cx="548" cy="345" r="1.1" fill="currentColor" opacity="0.4" />
                <circle cx="558" cy="345" r="1.1" fill="currentColor" opacity="0.8" />
                <circle cx="568" cy="345" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="578" cy="345" r="1.1" fill="currentColor" opacity="0.1" />
                <circle cx="588" cy="345" r="1.1" fill="currentColor" opacity="0.7" />
                <circle cx="598" cy="345" r="1.1" fill="currentColor" opacity="0.2" />
                <circle cx="608" cy="345" r="1.1" fill="currentColor" opacity="0.9" />
                <circle cx="618" cy="345" r="1.1" fill="currentColor" opacity="0.6" />
                <circle cx="628" cy="345" r="1.1" fill="currentColor" opacity="0.8" />
                
                {/* Large building windows - varied lighting */}
                <circle cx="820" cy="130" r="1.0" fill="currentColor" opacity="0.9" />
                <circle cx="840" cy="130" r="1.0" fill="currentColor" opacity="0.2" />
                <circle cx="860" cy="130" r="1.0" fill="currentColor" opacity="0.8" />
                <circle cx="820" cy="170" r="1.0" fill="currentColor" opacity="0.1" />
                <circle cx="840" cy="170" r="1.0" fill="currentColor" opacity="0.7" />
                <circle cx="860" cy="170" r="1.0" fill="currentColor" opacity="0.9" />
                <circle cx="820" cy="210" r="1.0" fill="currentColor" opacity="0.6" />
                <circle cx="840" cy="210" r="1.0" fill="currentColor" opacity="0.9" />
                <circle cx="860" cy="210" r="1.0" fill="currentColor" opacity="0.3" />
                <circle cx="820" cy="250" r="1.0" fill="currentColor" opacity="0.8" />
                <circle cx="840" cy="250" r="1.0" fill="currentColor" opacity="0.1" />
                <circle cx="860" cy="250" r="1.0" fill="currentColor" opacity="0.7" />
                
                {/* Glass tower windows - some on/off */}
                <circle cx="180" cy="200" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="195" cy="200" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="210" cy="200" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="180" cy="230" r="0.8" fill="currentColor" opacity="0.3" />
                <circle cx="195" cy="230" r="0.8" fill="currentColor" opacity="0.7" />
                <circle cx="210" cy="230" r="0.8" fill="currentColor" opacity="0.2" />
                <circle cx="180" cy="260" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="195" cy="260" r="0.8" fill="currentColor" opacity="0.5" />
                <circle cx="210" cy="260" r="0.8" fill="currentColor" opacity="0.8" />
                
                {/* Wide commercial building windows - realistic pattern */}
                <circle cx="330" cy="185" r="0.9" fill="currentColor" opacity="0.7" />
                <circle cx="350" cy="185" r="0.9" fill="currentColor" opacity="0.9" />
                <circle cx="370" cy="185" r="0.9" fill="currentColor" opacity="0.1" />
                <circle cx="330" cy="215" r="0.9" fill="currentColor" opacity="0.2" />
                <circle cx="350" cy="215" r="0.9" fill="currentColor" opacity="0.8" />
                <circle cx="370" cy="215" r="0.9" fill="currentColor" opacity="0.6" />
                <circle cx="330" cy="245" r="0.9" fill="currentColor" opacity="0.9" />
                <circle cx="350" cy="245" r="0.9" fill="currentColor" opacity="0.3" />
                <circle cx="370" cy="245" r="0.9" fill="currentColor" opacity="0.8" />
                
                {/* Additional scattered lights across other buildings */}
                <circle cx="480" cy="165" r="0.7" fill="currentColor" opacity="0.8" />
                <circle cx="495" cy="165" r="0.7" fill="currentColor" opacity="0.2" />
                <circle cx="510" cy="165" r="0.7" fill="currentColor" opacity="0.9" />
                <circle cx="480" cy="195" r="0.7" fill="currentColor" opacity="0.1" />
                <circle cx="495" cy="195" r="0.7" fill="currentColor" opacity="0.7" />
                <circle cx="510" cy="195" r="0.7" fill="currentColor" opacity="0.4" />
                
                <circle cx="670" cy="140" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="685" cy="140" r="0.8" fill="currentColor" opacity="0.3" />
                <circle cx="700" cy="140" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="670" cy="170" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="685" cy="170" r="0.8" fill="currentColor" opacity="0.6" />
                <circle cx="700" cy="170" r="0.8" fill="currentColor" opacity="0.9" />
                
                <circle cx="750" cy="160" r="0.7" fill="currentColor" opacity="0.7" />
                <circle cx="765" cy="160" r="0.7" fill="currentColor" opacity="0.2" />
                <circle cx="750" cy="190" r="0.7" fill="currentColor" opacity="0.9" />
                <circle cx="765" cy="190" r="0.7" fill="currentColor" opacity="0.4" />
                
                <circle cx="980" cy="145" r="0.8" fill="currentColor" opacity="0.8" />
                <circle cx="995" cy="145" r="0.8" fill="currentColor" opacity="0.1" />
                <circle cx="1010" cy="145" r="0.8" fill="currentColor" opacity="0.9" />
                <circle cx="980" cy="175" r="0.8" fill="currentColor" opacity="0.3" />
                <circle cx="995" cy="175" r="0.8" fill="currentColor" opacity="0.7" />
                <circle cx="1010" cy="175" r="0.8" fill="currentColor" opacity="0.5" />
              </g>
              
              {/* Subtle building glow effects */}
              <g className="text-primary-300 opacity-30">
                <rect x="540" y="80" width="90" height="320" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <rect x="390" y="100" width="60" height="300" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <rect x="800" y="90" width="85" height="310" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              </g>
            </svg>
          </div>
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/20 via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Lock in 5.99% on 30 Year Fixed DSCR Loans
              {urlParams?.get('_location') && (
                <span className="block text-3xl md:text-4xl mt-4 text-primary-400">
                  in {urlParams.get('_location')}
                </span>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              We'll get you funded with no tax returns and closing in 2+ weeks.
            </p>
            
            {/* Low Points Highlight */}
            <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-xl p-6 mb-8 border border-primary-500/30">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-2">
                  Only 0.75 Points
                </div>
                <p className="text-lg text-gray-300">
                  That's right, no inflated fees. You keep more of your equity.
                </p>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">$500M+</div>
                <div className="text-gray-400">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">3,500+</div>
                <div className="text-gray-400">Happy Investors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">5.99%</div>
                <div className="text-gray-400">Rates From</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#apply-now"
                className="btn-primary text-lg px-8 py-4"
              >
                Get Approved Now
              </a>
              <a 
                href="tel:+19493393555"
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2"
                onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
              >
                <Phone className="w-5 h-5" />
                (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-dark-900/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Choose DSCR Loans?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-dark-800/50 rounded-lg p-4">
                  <Check className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Banner Section */}
      <section className="py-16 bg-dark-900/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="/testimonial-banner.png" 
                alt="Client Success Stories - DSCR Loan Testimonials"
                className="w-full h-auto rounded-2xl"
              />
              {/* Optional overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply-now" className="py-16 bg-dark-900/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Get Your DSCR Loan Quote
            </h2>
            <MultiStepForm />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still in Doubt? Take a look at what our clients are saying.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800 hover:border-primary-500/50 transition-colors">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary-400 mb-2">$2.3M annual savings</div>
                  <div className="text-gray-400">through refinancing</div>
                </div>
                <p className="text-gray-300 mb-6">
                  "Refinancing our portfolio of apartment buildings was seamless. Their expertise in multi-family properties and market-leading rates saved us thousands in monthly payments."
                </p>
                <div>
                  <div className="font-semibold text-white">ROBERT CHEN</div>
                  <div className="text-gray-400 text-sm">Multi-Family Investor</div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800 hover:border-primary-500/50 transition-colors">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary-400 mb-2">Mixed-Use Development</div>
                  <div className="text-gray-400">Funded Successfully</div>
                </div>
                <p className="text-gray-300 mb-6">
                  "The construction loan terms were exactly what we needed for our mixed-use development. Their team understood the complexities of our project and provided solutions at every step."
                </p>
                <div>
                  <div className="font-semibold text-white">SANDRA MARTINEZ</div>
                  <div className="text-gray-400 text-sm">Commercial Property Developer</div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800 hover:border-primary-500/50 transition-colors">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary-400 mb-2">Portfolio expanded</div>
                  <div className="text-gray-400">from 3 to 12 properties</div>
                </div>
                <p className="text-gray-300 mb-6">
                  "Their DSCR loan program helped me expand my portfolio from 3 to 12 properties in just 18 months. The streamlined process and competitive rates made scaling my business possible."
                </p>
                <div>
                  <div className="font-semibold text-white">MICHAEL THOMPSON</div>
                  <div className="text-gray-400 text-sm">Real Estate Investor</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <a 
                href="#apply-now"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Get Your Loan
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of investors who've grown their portfolios with DSCR loans
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#apply-now"
                className="btn-primary text-lg px-8 py-4"
              >
                Apply Now
              </a>
              <Link 
                href="/calculators"
                className="btn-secondary text-lg px-8 py-4"
              >
                Calculate Your DSCR
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
