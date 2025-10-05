'use client';

import { Phone, Calculator, CheckCircle, AlertCircle, TrendingUp, FileText, DollarSign, Clock, Shield } from 'lucide-react';
import { ArticleSchema } from '@/components/ArticleSchema';
import { BlogImage } from '@/components/BlogImage';

export default function NoIncomeVerificationLoansPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a no income verification loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A no income verification loan qualifies borrowers based on property rental income, not personal income. No tax returns, W2s, or pay stubs required. Ideal for self-employed investors and real estate professionals."
        }
      },
      {
        "@type": "Question",
        "name": "How do you qualify for a no income verification loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Requirements: 620-640 credit score, 20-25% down payment, DSCR of 1.0+, 6-12 months reserves, and investment property only. Property rental income must cover mortgage, taxes, insurance, and HOA fees."
        }
      },
      {
        "@type": "Question",
        "name": "What documents do you need for a no income verification loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Required: Photo ID, credit authorization, bank statements, property appraisal, and lease/rental analysis. NOT needed: tax returns, W2s, pay stubs, employment verification, or P&L statements."
        }
      },
      {
        "@type": "Question",
        "name": "Are no income verification loans more expensive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates are typically 0.5-1.5% higher than conventional loans. However, they save money for self-employed borrowers who would otherwise pay more taxes or be denied. Convenience and speed often outweigh the rate."
        }
      },
      {
        "@type": "Question",
        "name": "Can self-employed borrowers get no income verification loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, perfect for self-employed borrowers. Business tax returns don't matter - only property rental income. This lets self-employed investors maximize tax deductions while qualifying for loans."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum DSCR ratio required?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most lenders require DSCR of 1.0 to 1.25. DSCR of 1.0 means rental income covers the payment. DSCR of 1.25 means income is 25% higher. Higher ratios (1.25+) get better rates."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get approved for a no income verification loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Approval in 24-48 hours with no employment verification or tax return analysis. Application to closing takes 2-3 weeks versus 30-45 days for conventional loans. Ideal for competitive markets."
        }
      },
      {
        "@type": "Question",
        "name": "Can you use a no income verification loan for a primary residence?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, DSCR loans are only for investment properties, not primary residences or second homes. Property must be rented to generate qualifying income. For primary residences, explore bank statement loans."
        }
      }
    ]
  };

  return (
    <>
      <ArticleSchema 
        headline="No Income Verification Loans for Investment Property: Complete 2024 Guide"
        description="Comprehensive guide to no income verification loans for real estate investors. Learn how to qualify without tax returns, W2s, or income documentation."
        datePublished="2024-10-04T00:00:00Z"
        dateModified="2024-10-04T00:00:00Z"
        author="Capital Bridge Solutions"
        image="/No_Tax_Return_Investment_Property_loans.png"
        url="https://www.capitalbridgesolutions.com/blog/no-income-verification-loans"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-dark-950 border-b border-primary-500/20 py-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <FileText className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-400 font-medium">No Documentation Required</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                No Income Verification Loans for Investment Property
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Get approved for investment property loans without tax returns, W2s, or pay stubs. 
                Qualify by rental income alone with DSCR loans.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+19493393555"
                  onClick={handlePhoneClick}
                  className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>(949) 339-3555</span>
                </a>
                <a
                  href="/blog/dscr-loan-calculator-california"
                  className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Calculate DSCR</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Featured Image */}
          <BlogImage 
            src="/No_Tax_Return_Investment_Property_loans.png"
            alt="No Income Verification Loans - Investment property financing without tax returns or W2s"
            width={1200}
            height={630}
            priority={true}
            caption="No income verification loans let you qualify by rental income alone"
          />

          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              Traditional mortgage lenders require extensive income documentation—tax returns, W2s, pay stubs, 
              employment verification, and more. For self-employed investors, real estate professionals, and 
              anyone with complex income, this process is frustrating and often results in denial.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              <strong className="text-primary-400">No income verification loans</strong> solve this problem. 
              These loans, also known as DSCR (Debt Service Coverage Ratio) loans, qualify you based on your 
              property's rental income—not your personal income. No tax returns. No W2s. No income documentation.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Perfect for{' '}
              <a href="/blog/investment-property-loans-self-employed" className="text-primary-400 hover:text-primary-300 underline">
                self-employed investors
              </a>
              {' '}and those seeking{' '}
              <a href="/blog/no-tax-return-investment-property-loans" className="text-primary-400 hover:text-primary-300 underline">
                investment property loans without tax returns
              </a>
              . Compare{' '}
              <a href="/blog/best-dscr-loan-lenders-california" className="text-primary-400 hover:text-primary-300 underline">
                the best DSCR lenders in California
              </a>
              {' '}to find the right fit.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 text-center">
              <Clock className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">24-48 Hours</div>
              <div className="text-gray-400">Approval Time</div>
            </div>
            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 text-center">
              <DollarSign className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">20% Down</div>
              <div className="text-gray-400">Minimum Required</div>
            </div>
            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-2">Unlimited</div>
              <div className="text-gray-400">Properties Allowed</div>
            </div>
          </div>

          {/* What is a No Income Verification Loan */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">What is a No Income Verification Loan?</h2>
            <p className="text-gray-300 mb-6">
              A no income verification loan is a mortgage product that doesn't require traditional income documentation. 
              Instead of analyzing your tax returns, W2s, or pay stubs, lenders focus on the property's ability to 
              generate rental income.
            </p>
            <p className="text-gray-300 mb-6">
              The most common type of no income verification loan is the <strong className="text-primary-400">DSCR loan</strong> 
              (Debt Service Coverage Ratio loan). With a DSCR loan, qualification is based on a simple calculation:
            </p>
            
            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-4">DSCR Formula</div>
                <div className="text-3xl text-primary-400 font-mono mb-4">
                  DSCR = Monthly Rental Income ÷ Monthly Debt Payment
                </div>
                <p className="text-gray-400">
                  A DSCR of 1.0 or higher means the property generates enough income to cover the mortgage payment
                </p>
              </div>
            </div>

            <p className="text-gray-300">
              If your property's rental income covers the mortgage payment (DSCR ≥ 1.0), you qualify—regardless of 
              your personal income, tax returns, or employment status.
            </p>
          </div>

          {/* Who Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Who Benefits from No Income Verification Loans?</h2>
            <p className="text-gray-300 mb-6">
              No income verification loans are perfect for:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Self-Employed Investors</h3>
                <p className="text-gray-400">
                  Business owners who write off expenses to reduce taxable income. Your tax returns show low income, 
                  but you have plenty of cash flow for real estate investing.
                </p>
              </div>

              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">1099 Contractors</h3>
                <p className="text-gray-400">
                  Freelancers and contractors with variable income. Traditional lenders average your income over 2 years, 
                  often underestimating your earning power.
                </p>
              </div>

              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Real Estate Professionals</h3>
                <p className="text-gray-400">
                  Agents, brokers, and investors who want to scale their portfolio quickly without the paperwork 
                  bottleneck of traditional financing.
                </p>
              </div>

              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">High-Net-Worth Individuals</h3>
                <p className="text-gray-400">
                  Investors with complex income structures (trusts, LLCs, partnerships) who don't want to provide 
                  extensive documentation for each property purchase.
                </p>
              </div>

              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Foreign Nationals</h3>
                <p className="text-gray-400">
                  International investors who don't have U.S. tax returns or employment history but want to invest 
                  in American real estate.
                </p>
              </div>

              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-primary-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Privacy-Conscious Investors</h3>
                <p className="text-gray-400">
                  Anyone who values privacy and doesn't want to share detailed financial information with lenders 
                  for every property purchase.
                </p>
              </div>
            </div>
          </div>

          {/* How to Qualify */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">How to Qualify for a No Income Verification Loan</h2>
            <p className="text-gray-300 mb-6">
              Qualifying for a no income verification loan is straightforward. Here are the typical requirements:
            </p>

            <div className="space-y-6">
              <div className="bg-dark-800 border-l-4 border-primary-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-3">1. Credit Score: 620-640 Minimum</h3>
                <p className="text-gray-400 mb-3">
                  Most lenders require a minimum credit score of 620-640. Higher credit scores (680+) qualify for 
                  better rates and terms. Some lenders offer programs down to 600 with larger down payments.
                </p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-400">620-659</div>
                      <div className="text-sm text-gray-400">Higher rates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">660-719</div>
                      <div className="text-sm text-gray-400">Standard rates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">720+</div>
                      <div className="text-sm text-gray-400">Best rates</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800 border-l-4 border-primary-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-3">2. Down Payment: 20-25%</h3>
                <p className="text-gray-400 mb-3">
                  No income verification loans typically require 20-25% down payment. This is higher than conventional 
                  loans (3-5% down) but provides lenders with equity cushion since they're not verifying income.
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                  <li>20% down = 80% LTV (most common)</li>
                  <li>25% down = 75% LTV (better rates available)</li>
                  <li>30% down = 70% LTV (best rates and terms)</li>
                </ul>
              </div>

              <div className="bg-dark-800 border-l-4 border-primary-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-3">3. DSCR Ratio: 1.0 or Higher</h3>
                <p className="text-gray-400 mb-3">
                  The property's rental income must cover the mortgage payment. Most lenders require a DSCR of 1.0 to 1.25:
                </p>
                <div className="bg-dark-900 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">DSCR 1.0</span>
                      <span className="text-white">Rental income = Mortgage payment</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">DSCR 1.25</span>
                      <span className="text-white">Rental income 25% higher than payment</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">DSCR 1.5</span>
                      <span className="text-white">Rental income 50% higher (best rates)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800 border-l-4 border-primary-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-3">4. Reserves: 6-12 Months</h3>
                <p className="text-gray-400">
                  Lenders typically require 6-12 months of reserves (PITI payments) in the bank. This shows you can 
                  handle vacancies or unexpected expenses. Reserves can be in checking, savings, or investment accounts.
                </p>
              </div>

              <div className="bg-dark-800 border-l-4 border-primary-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-white mb-3">5. Investment Property Only</h3>
                <p className="text-gray-400">
                  No income verification loans are only available for investment properties—not primary residences or 
                  second homes. The property must be rented out to generate the income used for qualification.
                </p>
              </div>
            </div>
          </div>

          {/* Documents Needed vs Not Needed */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">What Documents Do You Need?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">Documents You NEED</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Photo ID (driver's license or passport)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Credit report authorization</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Bank statements (2-3 months for reserves)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Property appraisal</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Lease agreement or rental market analysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span>Property insurance quote</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                  <h3 className="text-2xl font-bold text-white">Documents You DON'T NEED</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>Tax returns (personal or business)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>W2s or 1099s</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>Pay stubs</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>Employment verification</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>Profit & loss statements</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>Business bank statements</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span>DTI (debt-to-income) calculations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">No Income Verification vs Traditional Loans</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-dark-800 border border-primary-500/20 rounded-xl overflow-hidden">
                <thead className="bg-dark-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold">Feature</th>
                    <th className="px-6 py-4 text-left text-white font-bold">No Income Verification (DSCR)</th>
                    <th className="px-6 py-4 text-left text-white font-bold">Traditional Mortgage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Income Documentation</td>
                    <td className="px-6 py-4 text-green-400">Not required</td>
                    <td className="px-6 py-4 text-red-400">2 years tax returns, W2s, pay stubs</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Qualification Method</td>
                    <td className="px-6 py-4 text-gray-400">Property rental income (DSCR)</td>
                    <td className="px-6 py-4 text-gray-400">Personal income (DTI)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Minimum Credit Score</td>
                    <td className="px-6 py-4 text-gray-400">620-640</td>
                    <td className="px-6 py-4 text-gray-400">620-680</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Down Payment</td>
                    <td className="px-6 py-4 text-gray-400">20-25%</td>
                    <td className="px-6 py-4 text-gray-400">15-25% (investment)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Interest Rate</td>
                    <td className="px-6 py-4 text-gray-400">0.5-1.5% higher</td>
                    <td className="px-6 py-4 text-gray-400">Market rate</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Approval Time</td>
                    <td className="px-6 py-4 text-green-400">24-48 hours</td>
                    <td className="px-6 py-4 text-yellow-400">7-14 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Closing Time</td>
                    <td className="px-6 py-4 text-green-400">2-3 weeks</td>
                    <td className="px-6 py-4 text-yellow-400">30-45 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Property Limit</td>
                    <td className="px-6 py-4 text-green-400">Unlimited</td>
                    <td className="px-6 py-4 text-red-400">10 properties max</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-300 font-medium">Best For</td>
                    <td className="px-6 py-4 text-gray-400">Self-employed, investors, privacy</td>
                    <td className="px-6 py-4 text-gray-400">W2 employees, primary residence</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Pros and Cons of No Income Verification Loans</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>No income documentation hassle</strong> - Skip tax returns, W2s, pay stubs entirely</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Fast approval</strong> - Get approved in 24-48 hours vs weeks</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Perfect for self-employed</strong> - Tax write-offs don't hurt qualification</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Unlimited properties</strong> - No 10-property limit like conventional loans</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Privacy</strong> - Don't share detailed financial information</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <span><strong>Simpler process</strong> - Less paperwork, faster closing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Considerations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Higher interest rates</strong> - Typically 0.5-1.5% above conventional</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Larger down payment</strong> - 20-25% vs 15-20% conventional</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Investment property only</strong> - Not available for primary residence</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Property must cash flow</strong> - Need positive DSCR ratio</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <span><strong>Reserves required</strong> - Need 6-12 months PITI in bank</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">What is a no income verification loan?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  A no income verification loan is a type of mortgage that doesn't require traditional income documentation 
                  like tax returns, W2s, or pay stubs. Instead, lenders qualify borrowers based on the property's rental 
                  income or debt service coverage ratio (DSCR). These loans are ideal for self-employed investors, real 
                  estate professionals, and anyone who wants to avoid extensive income documentation.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">How do you qualify for a no income verification loan?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  To qualify for a no income verification loan, you typically need: (1) A minimum credit score of 620-640, 
                  (2) 20-25% down payment, (3) Property with positive cash flow (DSCR of 1.0 or higher), (4) Reserves of 
                  6-12 months, and (5) Investment property (not primary residence). The property's rental income must cover 
                  the mortgage payment, taxes, insurance, and HOA fees.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">What documents do you need for a no income verification loan?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  For a no income verification loan, you need: (1) Photo ID and proof of citizenship/residency, (2) Credit 
                  report authorization, (3) Bank statements showing reserves, (4) Property appraisal, (5) Lease agreement or 
                  rental market analysis. You do NOT need tax returns, W2s, pay stubs, employment verification, or profit & 
                  loss statements.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">Are no income verification loans more expensive?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  No income verification loans typically have interest rates 0.5% to 1.5% higher than conventional loans due 
                  to perceived higher risk. However, they often save money for self-employed borrowers who would otherwise 
                  need to show higher income, pay more taxes, or be denied entirely. The convenience and speed often outweigh 
                  the slightly higher rate.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">Can self-employed borrowers get no income verification loans?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  Yes, no income verification loans are perfect for self-employed borrowers. Self-employed individuals often 
                  write off business expenses to reduce taxable income, making traditional loan qualification difficult. With 
                  DSCR loans, your business tax returns don't matter - only the property's rental income. This allows 
                  self-employed investors to maximize tax deductions while still qualifying for investment property loans.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">What is the minimum DSCR ratio required?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  Most lenders require a minimum DSCR (Debt Service Coverage Ratio) of 1.0 to 1.25. A DSCR of 1.0 means the 
                  rental income exactly covers the mortgage payment. A DSCR of 1.25 means rental income is 25% higher than 
                  the payment. Higher DSCR ratios (1.25+) typically qualify for better interest rates and terms.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">How long does it take to get approved for a no income verification loan?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  No income verification loans can be approved in 24-48 hours since there's no need to verify employment or 
                  analyze tax returns. The entire process from application to closing typically takes 2-3 weeks, compared to 
                  30-45 days for conventional loans. This speed makes them ideal for competitive real estate markets where 
                  quick closings matter.
                </p>
              </details>

              <details className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-xl font-bold text-white">Can you use a no income verification loan for a primary residence?</h3>
                  <span className="text-primary-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-400 mt-4">
                  No, DSCR and no income verification loans are only available for investment properties, not primary 
                  residences or second homes. The property must be rented out to generate income that qualifies you for the 
                  loan. If you need a no doc loan for a primary residence, you may need to explore bank statement loans or 
                  other alternative documentation programs.
                </p>
              </details>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-900/20 to-dark-800 border border-primary-500/20 rounded-2xl p-8 md:p-12 text-center">
            <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started with No Income Verification Loans?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get approved in 24-48 hours. No tax returns, W2s, or income documentation required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19493393555"
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-6 h-6" />
                <span>(949) 339-3555</span>
              </a>
              <a
                href="/blog/dscr-loan-calculator-california"
                className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
              >
                <Calculator className="w-6 h-6" />
                <span>Calculate Your DSCR</span>
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/blog/dscr-loans-self-employed-california" className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">DSCR Loans for Self-Employed</h3>
                <p className="text-gray-400 text-sm">Perfect solution for self-employed investors who write off business expenses</p>
              </a>
              <a href="/blog/dscr-loan-requirements-california-2024" className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">DSCR Loan Requirements</h3>
                <p className="text-gray-400 text-sm">Complete guide to qualifying for DSCR loans in California</p>
              </a>
              <a href="/blog/dscr-loan-calculator-california" className="bg-dark-800 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">DSCR Calculator</h3>
                <p className="text-gray-400 text-sm">Calculate your debt service coverage ratio instantly</p>
              </a>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
