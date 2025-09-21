'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, TrendingUp, Clock, Calculator, Phone, ArrowRight } from 'lucide-react';
import { MultiStepForm } from '@/components/MultiStepForm';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function DSCRLoansLandingPage() {
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    // Capture URL parameters for personalization
    setUrlParams(new URLSearchParams(window.location.search));
  }, []);

  const benefits = [
    'No Tax Returns Required',
    'Qualify Based on Property Income',
    'Self-Employed Friendly',
    '24-48 Hour Approval',
    'Rates from 5.99%',
    'Up to $3.5 Million'
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
