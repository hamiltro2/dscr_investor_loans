'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, CheckCircle, Calculator, TrendingUp, Building2, Home, Users, Shield, ArrowRight, FileText, DollarSign, Clock, MapPin, BarChart } from 'lucide-react';
import DSCRComparisonTable from '@/components/DSCRComparisonTable';
import DSCRCalculatorWidget from '@/components/DSCRCalculatorWidget';
import DSCRCaliforniaSchema from '@/components/DSCRCaliforniaSchema';
import CaliforniaMarketImpact from '@/components/CaliforniaMarketImpact';
import CaliforniaROIProjections from '@/components/CaliforniaROIProjections';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function DSCRLoansCaliforniaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  const faqs = [
    {
      question: 'What minimum DSCR do I need?',
      answer: 'It depends on the specific program, but many lenders look for 1.0–1.25+, with flexibility in exchange for more equity, stronger credit, or additional reserves. Some programs can go as low as 0.75 DSCR with compensating factors like 25-30% down payment and strong credit.'
    },
    {
      question: 'Do I need tax returns or W-2s?',
      answer: 'DSCR loans generally do not rely on your personal tax returns or W-2s. The emphasis is on property cash flow, DSCR ratio, and your overall risk profile. This makes them perfect for self-employed investors, those with complex tax situations, or anyone who wants to avoid the traditional income documentation process.'
    },
    {
      question: 'Can I borrow through an LLC?',
      answer: 'Yes! Many DSCR programs allow entity borrowers (LLCs, corporations) with personal guarantees from the members/managers. This is common in investor lending and can provide liability protection and cleaner accounting for your investment business.'
    },
    {
      question: 'Are short-term rentals allowed?',
      answer: 'Some DSCR lenders finance Airbnb/VRBO-type properties, but they may use either actual STR income or market long-term rent, depending on guidelines. Requirements vary by lender, but many will accept STR properties in California\'s popular vacation markets like Palm Springs, Lake Tahoe, and coastal areas.'
    },
    {
      question: 'What credit score do I need?',
      answer: 'Many DSCR lenders look for minimum FICO in the 640–680+ range, with better pricing and leverage at higher scores. Scores above 720 typically qualify for the best rates and terms.'
    },
    {
      question: 'How long does the approval process take?',
      answer: 'Pre-approval can be issued in 24-48 hours with basic documentation. Full underwriting typically takes 7-10 business days, and you can close in 2-3 weeks depending on appraisal turnaround and title work.'
    },
    {
      question: 'Can I use projected rent or do I need a lease in place?',
      answer: 'Most DSCR lenders will use either actual leases or a market rent appraisal. If the property is vacant or you\'re purchasing, the appraiser will provide a market rent opinion that lenders use to calculate DSCR. This is particularly useful for BRRRR investors who plan to renovate before renting.'
    },
    {
      question: 'What are the typical prepayment penalties?',
      answer: 'Many DSCR loans have prepayment penalties, typically structured as step-downs over 3-5 years (e.g., 3/2/1 or 5/4/3/2/1). Some lenders offer no-prepayment-penalty options at slightly higher rates. We help you evaluate the trade-offs based on your investment timeline.'
    }
  ];

  return (
    <>
      <DSCRCaliforniaSchema />
      <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900">
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-dark-950 border-b border-primary-500/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-5xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-400">DSCR Loans California</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              DSCR Loans in California for Real Estate Investors
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
              Finance your next California rental, BRRRR, or portfolio refinance using cash-flow based lending. At Capital Bridge Solutions, we structure DSCR loans around your property's income—not your tax returns—so you can move fast when a good deal hits your inbox.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link 
                href="/get-started"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                Get My DSCR Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <a 
                href="tel:+19493393555"
                onClick={handlePhoneClick}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                See If My Deal Qualifies
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>No Tax Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>640+ Credit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Close in LLC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Rates from 5.99%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a DSCR Loan Section */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">What Is a DSCR Loan?</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A <strong className="text-white">Debt Service Coverage Ratio (DSCR) loan</strong> is an investment-property mortgage that qualifies you based on the property's cash flow instead of your personal W-2 income.
                </p>
                <div className="bg-primary-900/20 border border-primary-500/30 rounded-xl p-6 my-6">
                  <p className="text-primary-300 text-xl font-semibold mb-2">DSCR = Net Operating Income (NOI) ÷ Total Debt Service (PITIA)</p>
                  <p className="text-gray-400 text-sm">
                    Lenders use this ratio to decide if the rental income can comfortably cover the mortgage payment.
                  </p>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  A DSCR of <strong className="text-emerald-400">1.0 means break-even</strong>; above 1.0 generally means positive cash flow. Different lenders have different minimum DSCRs (some will go below 1.0 with compensating factors such as strong reserves or higher down payments).
                </p>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-4">Simple Examples:</h3>
                  <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Monthly Rent:</span>
                      <span className="text-white font-bold">$4,000</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Monthly PITIA:</span>
                      <span className="text-white font-bold">$3,000</span>
                    </div>
                    <div className="border-t border-emerald-500/30 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">DSCR:</span>
                        <span className="text-emerald-400 font-bold text-xl">1.33 (positive cash flow)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Monthly Rent:</span>
                      <span className="text-white font-bold">$2,800</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Monthly PITIA:</span>
                      <span className="text-white font-bold">$3,000</span>
                    </div>
                    <div className="border-t border-red-500/30 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">DSCR:</span>
                        <span className="text-red-400 font-bold text-xl">0.93 (negative cash flow)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <DSCRCalculatorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Why DSCR Loans Work So Well in California */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why DSCR Loans Work So Well in California</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              California is a high-cost, high-rent market perfect for DSCR financing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-primary-900/20 to-dark-800 border border-primary-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Traditional Lending Challenges</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Complex tax returns with multiple write-offs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>High DTI from multiple properties</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>Self-employment or irregular income</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>LLC ownership limitations</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/20 to-dark-800 border border-emerald-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">DSCR Loan Advantages</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Long-term rentals in LA, San Diego, Bay Area, Sacramento</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Small multifamily (2–4 units) where rents exceed PITI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Short-term rentals in high-demand vacation markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span>Portfolio expansion without income limitations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Top Markets', cities: ['Los Angeles', 'San Diego', 'Bay Area', 'Sacramento', 'Inland Empire', 'Central Valley'] },
              { icon: Home, title: 'Property Types', cities: ['Single Family', 'Multi-Family 2-4', 'Condos', 'Townhomes', 'STR/Airbnb', 'Small Commercial'] },
              { icon: TrendingUp, title: 'Strong Returns', cities: ['6-8% Appreciation', 'Premium Rents', 'Tax Benefits', 'Equity Growth', 'Cash Flow', 'Portfolio Building'] }
            ].map((item, index) => (
              <div key={index} className="bg-dark-900/50 border border-dark-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.cities.map((city, i) => (
                    <span key={i} className="text-sm px-3 py-1 bg-primary-500/10 text-primary-300 rounded-full">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* California Market Impact Section */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaliforniaMarketImpact />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-dark-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">DSCR vs. Other Loan Options</h2>
            <p className="text-xl text-gray-300">
              See how DSCR loans compare to conventional and hard money financing
            </p>
          </div>

          <div className="bg-gradient-to-br from-dark-900/80 to-dark-800/80 border border-primary-500/20 rounded-2xl p-8">
            <DSCRComparisonTable />
          </div>

          <div className="mt-8 bg-primary-900/20 border border-primary-500/30 rounded-xl p-6">
            <p className="text-gray-300 text-center">
              <strong className="text-white">Capital Bridge Solutions positions DSCR as the sweet spot:</strong> long-term, rental-focused financing with easier qualification than conventional but usually cheaper and longer-term than hard money.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Projections Section */}
      <section className="py-16 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaliforniaROIProjections />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know about California DSCR loans</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-dark-900/50 border border-dark-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-dark-800/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <span className={`text-primary-400 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900/20 to-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Run the Numbers on Your California Deal?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Send us your property details and we'll calculate your DSCR, show you viable loan structures, and help you decide if DSCR is the right tool.
          </p>

          <div className="bg-dark-900/80 border border-primary-500/30 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">What We Need:</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                'Property address',
                'Estimated rent (or existing lease)',
                'Purchase price or current balance',
                'Your credit score range'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              Get My DSCR Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19493393555"
              onClick={handlePhoneClick}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              <Phone className="w-5 h-5" />
              Talk to a DSCR Specialist
            </a>
          </div>

          <p className="mt-8 text-gray-400 text-sm">
            Available to California real estate investors • Based in Orange County • Serving all 50 states
          </p>
        </div>
      </section>
      </div>
    </>
  );
}