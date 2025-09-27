'use client';

import { useState } from 'react';
import { Calculator } from '@/components/Calculator';
import { SocialShare } from '@/components/SocialShare';
import { StructuredData } from '@/components/StructuredData';
import Link from 'next/link';
import { ArrowLeft, Calculator as CalculatorIcon, Hammer, Clock, DollarSign } from 'lucide-react';

export default function HardMoneyCalculatorPage() {
  const [calculationResult, setCalculationResult] = useState<{
    loanAmount: number;
    downPayment: number;
    monthlyPayment: number;
    totalCost: number;
    profitPotential: number;
  } | null>(null);

  const calculateHardMoney = (values: Record<string, number | string>) => {
    const purchasePrice = Number(values.purchasePrice) || 0;
    const arv = Number(values.arv) || 0;
    const interestRate = Number(values.interestRate) || 0;
    const loanTerm = Number(values.loanTerm) || 12;
    
    // Use standard 70% LTV for hard money loans
    const ltvRatio = 70;
    const maxLoanAmount = (purchasePrice * (ltvRatio / 100));
    
    // Calculate monthly interest-only payment
    const monthlyPayment = (maxLoanAmount * (interestRate / 100)) / 12;
    
    // Calculate total interest for the term
    const totalInterest = monthlyPayment * loanTerm;
    const totalCost = maxLoanAmount + totalInterest;

    // Calculate key ratios
    const actualLTV = purchasePrice > 0 ? (maxLoanAmount / purchasePrice) * 100 : 0;
    const loanToARV = arv > 0 ? (maxLoanAmount / arv) * 100 : 0;
    const requiredDownPayment = purchasePrice - maxLoanAmount;
    const profitPotential = arv - totalCost - requiredDownPayment;
    
    setCalculationResult({
      loanAmount: maxLoanAmount,
      downPayment: requiredDownPayment,
      monthlyPayment,
      totalCost,
      profitPotential,
    });
    
    return {
      result: maxLoanAmount,
      details: {
        'Loan Amount': maxLoanAmount,
        'Down Payment Required': requiredDownPayment,
        'Monthly Payment (Interest Only)': monthlyPayment,
        'Total Interest': totalInterest,
        'Total Cost (Principal + Interest)': totalCost,
        'Loan to Purchase Price': actualLTV.toFixed(1) + '%',
        'Loan to ARV': loanToARV.toFixed(1) + '%'
      },
    };
  };

  // Structured data for the calculator
  const calculatorStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hard Money Loan Calculator",
    "description": "Calculate hard money loan amounts, payments, and costs for fix & flip real estate investments",
    "url": "https://www.capitalbridgesolutions.com/calculators/hard-money",
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
      "Calculate loan amounts up to 70% LTV",
      "Interest-only payment calculations",
      "Total project cost analysis",
      "Profit potential estimation",
      "Multiple loan term options"
    ],
    "screenshot": "https://www.capitalbridgesolutions.com/hard-money-calculator-screenshot.png"
  };

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the typical LTV for hard money loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hard money loans typically offer up to 70% of the purchase price. This means you'll need a 30% down payment. The loan amount is based on the purchase price, not the after-repair value (ARV)."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can I get a hard money loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hard money loans can close in as little as 5-7 days, compared to 30-45 days for traditional loans. This speed makes them ideal for competitive real estate markets and time-sensitive opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "What are typical hard money loan rates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hard money loan rates typically range from 10-15% annually, with interest-only payments. While higher than traditional mortgages, the speed and flexibility often justify the cost for short-term projects."
        }
      }
    ]
  };

  const shareUrl = 'https://www.capitalbridgesolutions.com/calculators/hard-money';
  const shareTitle = 'Hard Money Loan Calculator - Fix & Flip Financing Calculator';
  const shareDescription = 'Free hard money loan calculator for real estate investors. Calculate your project financing instantly.';

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
                <Hammer className="w-8 h-8 text-primary-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Hard Money Loan Calculator
              </h1>
            </div>
            
            <p className="text-xl text-dark-200 mb-8">
              Calculate loan amounts and costs for your fix & flip projects. 
              Get funded in days with our fast, asset-based lending.
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">5-7 Day Closing</h3>
                  <p className="text-sm text-dark-300">Fast funding for time-sensitive deals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">70% LTV</h3>
                  <p className="text-sm text-dark-300">Up to 70% of purchase price</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hammer className="w-5 h-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Asset-Based</h3>
                  <p className="text-sm text-dark-300">Qualify based on property value</p>
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
                  title="Calculate Your Hard Money Loan"
                  titleClassName="text-white text-2xl"
                  description="Enter your project details to calculate loan amount and costs."
                  descriptionClassName="text-dark-200"
                  inputClassName="text-white bg-dark-800 border-dark-700"
                  labelClassName="text-white"
                  resultClassName="text-white"
                  tipsClassName="text-dark-200"
                  resultTitle="Hard Money Loan Amount"
                  fields={[
                    {
                      name: 'purchasePrice',
                      label: 'Purchase Price',
                      type: 'number',
                      prefix: '$',
                      min: 0,
                    },
                    {
                      name: 'arv',
                      label: 'After Repair Value (ARV)',
                      type: 'number',
                      prefix: '$',
                      min: 0,
                    },
                    {
                      name: 'interestRate',
                      label: 'Interest Rate',
                      type: 'number',
                      suffix: '%',
                      min: 0,
                      max: 100,
                      step: 0.125,
                    },
                    {
                      name: 'loanTerm',
                      label: 'Loan Term (Months)',
                      type: 'select',
                      options: [
                        { value: '12', label: '12 Months' },
                        { value: '18', label: '18 Months' },
                        { value: '24', label: '24 Months' },
                        { value: '36', label: '36 Months' },
                      ],
                    },
                  ]}
                  onCalculate={calculateHardMoney}
                  resultPrefix="$"
                  tips={[
                    'Hard money loans typically lend 70% of the purchase price',
                    'Payments are interest-only with a balloon payment at the end',
                    'Most hard money lenders lend based on the property value, not your credit score',
                    'Consider renovation costs in your total project budget',
                    'Plan your exit strategy before the balloon payment is due',
                  ]}
                />
                
                {/* Profit Analysis */}
                {calculationResult && calculationResult.profitPotential > 0 && (
                  <div className="mt-6 p-6 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">
                      Profit Potential Analysis
                    </h3>
                    <div className="space-y-2 text-dark-200">
                      <p>Estimated Profit Potential: <span className="text-green-400 font-semibold">
                        ${calculationResult.profitPotential.toLocaleString()}
                      </span></p>
                      <p className="text-sm">
                        This assumes selling at ARV after paying off the loan and recovering your down payment. 
                        Remember to factor in renovation costs, holding costs, and selling expenses.
                      </p>
                    </div>
                    <Link 
                      href="/get-started" 
                      className="inline-flex btn-primary mt-4"
                    >
                      Apply for Funding
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
                  <h3 className="text-lg font-semibold text-white mb-4">Hard Money Facts</h3>
                  <ul className="space-y-3 text-sm text-dark-200">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Close in 5-7 days vs 30-45 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Based on property value, not income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Interest-only payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>Perfect for fix & flip projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>No prepayment penalties</span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="card p-6 bg-primary-500/10 border border-primary-500/20">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Fast Funding?</h3>
                  <p className="text-sm text-dark-200 mb-4">
                    Get approved in 24 hours and funded in 5-7 days.
                  </p>
                  <Link href="/get-started" className="btn-primary w-full text-center">
                    Apply Now
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
            <h2 className="text-3xl font-bold text-white mb-8">Understanding Hard Money Loans</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">When to Use Hard Money</h3>
                <ul className="space-y-3 text-dark-200">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">✓</span>
                    <span>Fix & flip projects needing quick closing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">✓</span>
                    <span>Competitive markets requiring cash-like offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">✓</span>
                    <span>Properties needing renovation before qualifying for traditional loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">✓</span>
                    <span>Bridge financing while selling another property</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Exit Strategies</h3>
                <ul className="space-y-3 text-dark-200">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">1.</span>
                    <span><strong>Sell the property</strong> - Most common for fix & flips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">2.</span>
                    <span><strong>Refinance to DSCR loan</strong> - Keep as rental property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">3.</span>
                    <span><strong>Refinance to conventional</strong> - If qualifying with W-2 income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">4.</span>
                    <span><strong>Seller financing</strong> - Create passive income stream</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-dark-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Typical Project Cost Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-dark-200">
                  <span>Purchase Price (Example: $200,000)</span>
                  <span className="text-white">$200,000</span>
                </div>
                <div className="flex justify-between text-dark-200">
                  <span>Down Payment (30%)</span>
                  <span className="text-white">$60,000</span>
                </div>
                <div className="flex justify-between text-dark-200">
                  <span>Loan Amount (70%)</span>
                  <span className="text-white">$140,000</span>
                </div>
                <div className="flex justify-between text-dark-200">
                  <span>Interest (12% for 6 months)</span>
                  <span className="text-white">$8,400</span>
                </div>
                <div className="flex justify-between text-dark-200">
                  <span>Loan Points (2-3%)</span>
                  <span className="text-white">$2,800 - $4,200</span>
                </div>
                <div className="border-t border-dark-700 pt-3 mt-3">
                  <div className="flex justify-between text-white font-semibold">
                    <span>Total Financing Cost</span>
                    <span>$11,200 - $12,600</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
