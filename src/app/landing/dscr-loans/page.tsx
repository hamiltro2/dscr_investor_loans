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
      description: '2-3 week closings with streamlined documentation'
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              DSCR Loans for Real Estate Investors
              {urlParams?.get('_location') && (
                <span className="block text-3xl md:text-4xl mt-4 text-primary-400">
                  in {urlParams.get('_location')}
                </span>
              )}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              No Tax Returns Required • Qualify Based on Rental Income
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">$2.5B+</div>
                <div className="text-gray-400">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400">15,000+</div>
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
                Get Pre-Approved Now
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

      {/* Trust Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Trusted by Real Estate Investors Nationwide
            </h2>
            <div className="bg-dark-900/50 rounded-2xl p-8 border border-dark-800">
              <p className="text-lg text-gray-300 mb-6">
                "Capital Bridge Solutions made my DSCR loan process incredibly smooth. 
                No tax returns needed, and I closed in just 18 days!"
              </p>
              <div className="text-primary-400 font-semibold">
                - Sarah M., Real Estate Investor
              </div>
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
