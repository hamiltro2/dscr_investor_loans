'use client';

import { useState } from 'react';
import { Calculator } from '@/components/Calculator';
import { SocialShare } from '@/components/SocialShare';
import { StructuredData } from '@/components/StructuredData';
import Link from 'next/link';
import { ArrowLeft, Calculator as CalculatorIcon, TrendingUp, Building, DollarSign } from 'lucide-react';

export default function DSCRCalculatorPage() {
  const [calculationResult, setCalculationResult] = useState<{
    dscr: number;
    qualified: boolean;
    monthlyPayment: number;
    noi: number;
  } | null>(null);

  const calculateDSCR = (values: Record<string, number | string>) => {
    const monthlyRent = Number(values.monthlyRent) || 0;
    const annualRent = monthlyRent * 12;
    
    // Calculate operating expenses (45% of gross rent)
    const operatingExpenses = annualRent * 0.45;
    const noi = annualRent - operatingExpenses;
    
    const loanAmount = Number(values.loanAmount) || 0;
    const interestRate = Number(values.interestRate) || 0;
    const loanTerm = Number(values.loanTerm) || 30;
    
    // Calculate monthly interest-only payment
    const monthlyPayment = (loanAmount * (interestRate / 100)) / 12;
    const annualDebtService = monthlyPayment * 12;
    
    // Calculate DSCR
    const dscr = annualDebtService > 0 ? (noi / annualDebtService) : 0;
    const qualified = dscr >= 1.0; // We can work with 1.0 DSCR
    
    setCalculationResult({
      dscr: Number(dscr.toFixed(2)),
      qualified,
      monthlyPayment,
      noi,
    });
    
    return {
      result: Number(dscr.toFixed(2)),
      details: {
        'Monthly Payment (Interest Only)': monthlyPayment,
        'Annual Gross Rent': annualRent,
        'Operating Expenses (45%)': operatingExpenses,
        'Net Operating Income (NOI)': noi,
        'Annual Debt Service': annualDebtService,
      },
    };
  };

  // Structured data for the calculator
  const calculatorStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "DSCR Loan Calculator",
    "description": "Calculate your property's debt service coverage ratio (DSCR) to determine qualification for investment property loans",
    "url": "https://www.capitalbridgesolutions.com/calculators/dscr",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Capital Bridge Solutions",
      "url": "https://www.capitalbridgesolutions.com"
    },
    "featureList": [
      "Calculate DSCR instantly",
      "No personal income verification",
      "Interest-only payment calculations",
      "45% operating expense ratio",
      "Qualification assessment"
    ],
    "screenshot": "https://www.capitalbridgesolutions.com/dscr-calculator-screenshot.png"
  };

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good DSCR ratio?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most lenders require a minimum DSCR of 1.25, but Capital Bridge Solutions can work with DSCRs as low as 1.0. A DSCR above 1.0 means the property generates enough income to cover the loan payments."
        }
      },
      {
        "@type": "Question",
        "name": "How is DSCR calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DSCR is calculated by dividing Net Operating Income (NOI) by Annual Debt Service. NOI is rental income minus operating expenses (typically 45% of gross rent)."
        }
      },
      {
        "@type": "Question",
        "name": "What expenses are included in the DSCR calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Operating expenses typically include property taxes, insurance, maintenance, vacancy allowance, property management fees, and utilities. We use 45% of gross rent as a standard estimate."
        }
      }
    ]
  };

  const shareUrl = 'https://www.capitalbridgesolutions.com/calculators/dscr';
  const shareTitle = 'DSCR Loan Calculator - Check if your property qualifies for investment financing';
  const shareDescription = 'Free DSCR calculator for real estate investors. No income verification required.';

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <StructuredData data={calculatorStructuredData} />
      <StructuredData data={faqStructuredData} />
      
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10" />
        
        <div className="container relative z-10">
          <Link 
            href="/calculators" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Calculators
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary-500/20 rounded-xl">
                <CalculatorIcon className="w-8 h-8 text-primary-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                DSCR Loan Calculator
              </h1>
            </div>
            
            <p className="text-xl text-dark-200 mb-8">
              Calculate your property's Debt Service Coverage Ratio instantly. 
              See if you qualify for investment property financing without income verification.
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">No Income Docs</h3>
                  <p className="text-sm text-dark-300">Qualify based on property cash flow</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">1.0+ DSCR</h3>
                  <p className="text-sm text-dark-300">We work with lower ratios</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Interest Only</h3>
                  <p className="text-sm text-dark-300">Lower monthly payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calculator */}
              <div className="lg:col-span-2">
                <Calculator
                  title="Calculate Your DSCR"
                  titleClassName="text-white text-2xl"
                  description="Enter your property details below to calculate the debt service coverage ratio."
                  descriptionClassName="text-dark-200"
                  inputClassName="text-black bg-white border-gray-300"
                  labelClassName="text-white"
                  resultClassName="text-white"
                  tipsClassName="text-dark-200"
                  fields={[
                    {
                      name: 'monthlyRent',
                      label: 'Monthly Rental Income',
                      type: 'number',
                      prefix: '$',
                      min: 1000,
                      step: 100,
                    },
                    {
                      name: 'loanAmount',
                      label: 'Loan Amount (Max 80% LTV)',
                      type: 'number',
                      prefix: '$',
                      min: 100000,
                      step: 5000,
                    },
                    {
                      name: 'interestRate',
                      label: 'Interest Rate',
                      type: 'number',
                      suffix: '%',
                      min: 1,
                      max: 15,
                      step: 0.125,
                    },
                    {
                      name: 'loanTerm',
                      label: 'Loan Term',
                      type: 'select',
                      options: [
                        { value: '30', label: '30 Years' },
                        { value: '25', label: '25 Years' },
                        { value: '20', label: '20 Years' },
                        { value: '15', label: '15 Years' },
                      ],
                    },
                  ]}
                  onCalculate={calculateDSCR}
                  resultTitle="DSCR:"
                  resultPrefix=""
                  resultSuffix=""
                  tips={[
                    'Most lenders require a minimum DSCR of 1.25 but we can work with 1.0',
                    'DSCR loans are typically interest-only payments',
                    'Operating expenses calculated at 45% include taxes, insurance, maintenance, vacancy',
                    'A DSCR above 1.0 means the property income covers the debt payments',
                  ]}
                />
                
                {/* Qualification Result */}
                {calculationResult && (
                  <div className={`mt-6 p-6 rounded-lg ${
                    calculationResult.qualified 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : 'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      calculationResult.qualified ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {calculationResult.qualified 
                        ? '✓ Your Property Likely Qualifies!' 
                        : '⚠ Your Property May Need Review'}
                    </h3>
                    <p className="text-dark-200 mb-4">
                      {calculationResult.qualified 
                        ? 'Based on the DSCR of ' + calculationResult.dscr + ', your property appears to qualify for our DSCR loan program.'
                        : 'With a DSCR of ' + calculationResult.dscr + ', your property may still qualify with our flexible underwriting.'}
                    </p>
                    <Link 
                      href="/get-started" 
                      className="inline-flex btn-primary"
                    >
                      Get Pre-Approved Now
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Social Sharing */}
                <div className="card p-6 bg-dark-900/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Share This Calculator</h3>
                  <SocialShare 
                    url={shareUrl}
                    title={shareTitle}
                    description={shareDescription}
                  />
                </div>

                {/* Quick Facts */}
                <div className="card p-6 bg-dark-900/50">
                  <h3 className="text-lg font-semibold text-white mb-4">DSCR Loan Facts</h3>
                  <ul className="space-y-3 text-sm text-dark-200">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>No personal income verification required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Qualify based on property cash flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Perfect for self-employed investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>620+ credit score required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Up to 80% LTV available</span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="card p-6 bg-primary-500/10 border border-primary-500/20">
                  <h3 className="text-lg font-semibold text-white mb-2">Ready to Apply?</h3>
                  <p className="text-sm text-dark-200 mb-4">
                    Get pre-approved in 24-48 hours with our streamlined process.
                  </p>
                  <Link href="/get-started" className="btn-primary w-full text-center">
                    Start Application
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-dark-900/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Understanding DSCR Calculations</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">What is DSCR?</h3>
                <p className="text-dark-200 mb-4">
                  The Debt Service Coverage Ratio (DSCR) measures a property's ability to cover its mortgage payments 
                  using its rental income. It's calculated by dividing the Net Operating Income (NOI) by the Annual Debt Service.
                </p>
                <div className="bg-dark-800 rounded-lg p-4">
                  <code className="text-primary-400">DSCR = NOI ÷ Annual Debt Service</code>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">How We Calculate NOI</h3>
                <p className="text-dark-200 mb-4">
                  Net Operating Income is your rental income minus operating expenses. We use a standard 45% expense ratio:
                </p>
                <ul className="space-y-2 text-sm text-dark-300">
                  <li>• Property taxes & insurance</li>
                  <li>• Maintenance & repairs</li>
                  <li>• Vacancy allowance</li>
                  <li>• Property management</li>
                  <li>• Utilities & other expenses</li>
                </ul>
              </div>
            </div>

            {/* DSCR Ranges */}
            <div className="bg-dark-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">DSCR Qualification Ranges</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                  <span className="text-white font-medium">1.25+ DSCR</span>
                  <span className="text-green-400">Excellent - Best rates available</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded">
                  <span className="text-white font-medium">1.10 - 1.24 DSCR</span>
                  <span className="text-blue-400">Good - Standard qualification</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded">
                  <span className="text-white font-medium">1.00 - 1.09 DSCR</span>
                  <span className="text-yellow-400">Acceptable - May require review</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded">
                  <span className="text-white font-medium">Below 1.00 DSCR</span>
                  <span className="text-red-400">Challenging - Special programs available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
