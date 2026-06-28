'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Calculator, TrendingUp, Building2, Home, CheckCircle, ArrowRight, FileText, Shield, Zap, Award, Scale, DollarSign, Download, Clock } from 'lucide-react';

export default function CaliforniaNoDocLoansPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a California no-doc loan for investment properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A California no-doc (no-income verification) loan is an investment property loan where qualification is based on the property's rental income rather than the borrower's personal tax returns, W-2s, or pay stubs. It is also known as a DSCR (Debt Service Coverage Ratio) loan."
        }
      },
      {
        "@type": "Question",
        "name": "How does Capital Bridge Solutions compare to Angel Oak and Visio Lending in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Capital Bridge Solutions shops over 50 lenders to offer starting rates from 5.5% and origination points from 0.75% for California properties. Angel Oak's Investor Cash Flow program starts at 7.50% (1.5-2.5% points) and Visio Lending's Rental30 starts at 7.75% (2.0-3.0% points). Capital Bridge also closes in 5-7 days compared to 10-21 days for competitors."
        }
      },
      {
        "@type": "Question",
        "name": "What are the credit and LTV requirements for California no-doc loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Borrowers generally need a credit score of 640 or higher, with 720+ yielding the best interest rates. The maximum loan-to-value (LTV) ratio is up to 80-85% for purchases, meaning a 15-20% down payment is required."
        }
      }
    ]
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-gray-100">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="container relative z-10 px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
                <span>/</span>
                <Link href="/locations/california" className="hover:text-primary-400 transition-colors">California</Link>
                <span>/</span>
                <span className="text-primary-400">No-Doc Loans</span>
              </div>

              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium text-sm uppercase tracking-wider">California No-Doc Lending</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80 leading-tight">
                  California No-Doc Loans
                </h1>

                <p className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
                  No W-2s • No Tax Returns • Underwritten by Property Cash Flow
                </p>

                <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                  Qualify based on rental income alone. Rates starting at <span className="text-emerald-400 font-bold">5.50%</span> and points down to <span className="text-emerald-400 font-bold">0.75%</span>. Fast closing in 5-7 days.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <Link
                    href="/get-started"
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-primary-400/30 inline-flex items-center gap-2 justify-center w-full sm:w-auto"
                  >
                    Get Free Rate Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <a
                    href="tel:+19493393555"
                    onClick={handlePhoneClick}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5" />
                    (949) 339-3555
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>Rates from 5.5%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>Points from 0.75%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>DSCR down to 0.75</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>LTV up to 85%</span>
                  </div>
                </div>
              </div>

              {/* Chrome Extension Callout */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl border border-white/15 p-8 hover:border-primary-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Free Chrome Extension: Analyze California Listings Instantly
                    </h3>
                    <p className="text-gray-300">
                      Works on Zillow, Redfin, and more. Calculate cash flow, ROI, and your DSCR ratio on any California rental property listing instantly as you browse.
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-full md:w-auto">
                    <a
                      href="https://chrome.google.com/webstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 block text-center"
                    >
                      Install Free
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 border-y border-white/10">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">5.50%</div>
                <div className="text-gray-400 text-sm">Starting Interest Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">0.75%</div>
                <div className="text-gray-400 text-sm">Starting Origination Points</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">5 - 7</div>
                <div className="text-gray-400 text-sm">Days to Close Property</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">0.75</div>
                <div className="text-gray-400 text-sm">Minimum DSCR Allowed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-4">
                {[
                  { id: 'overview', label: 'Overview', icon: Home },
                  { id: 'comparison', label: 'Lender Comparison', icon: Scale },
                  { id: 'requirements', label: 'CA Requirements', icon: FileText },
                  { id: 'markets', label: 'Top CA Markets', icon: MapPin }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="min-h-[500px]">
                {activeTab === 'overview' && (
                  <div className="space-y-12 animate-fadeIn">
                    <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-primary-400" />
                        Understanding California No-Doc Loans
                      </h2>
                      <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p className="text-lg leading-relaxed mb-4">
                          In California's fast-moving and expensive real estate market, standard bank verification processes can prevent investors from securing hot properties. <strong className="text-white">California No-Doc Loans</strong> bypass these verification hurdles entirely. Instead of analyzing tax returns, W-2 forms, or personal debt-to-income (DTI) ratios, these loans look exclusively at the rental property's ability to cover its own mortgage payments.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                          Whether you are purchase-financing a duplex in <strong className="text-primary-400">Los Angeles</strong>, cash-out refinancing a rental property in <strong className="text-primary-400">San Diego</strong>, or expanding a vacation rental portfolio in <strong className="text-primary-400">Orange County</strong>, no-doc loans serve as the ultimate leverage. Qualification relies entirely on a metric called the <strong className="text-primary-400">Debt Service Coverage Ratio (DSCR)</strong>.
                        </p>
                        <p className="text-lg leading-relaxed">
                          By partnering with Capital Bridge Solutions, you unlock access to wholesale capital pools. While direct competitors lock you into a single guideline, we shop your deal across 50+ private lenders to guarantee you secure the absolute best interest rates and points in California.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="bg-dark-800/50 border border-white/10 rounded-xl p-6">
                        <DollarSign className="w-10 h-10 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Unmatched Savings</h3>
                        <p className="text-gray-400 text-sm">
                          Our starting rates from 5.5% and origination points from 0.75% provide thousands of dollars in upfront and monthly savings compared to other non-QM lenders.
                        </p>
                      </div>
                      <div className="bg-dark-800/50 border border-white/10 rounded-xl p-6">
                        <Clock className="w-10 h-10 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Escrow-Beating Speed</h3>
                        <p className="text-gray-400 text-sm">
                          We process and close deals in 5-7 days, allowing you to compete effectively against cash offers in competitive California markets.
                        </p>
                      </div>
                      <div className="bg-dark-800/50 border border-white/10 rounded-xl p-6">
                        <Shield className="w-10 h-10 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Zero Income Verification</h3>
                        <p className="text-gray-400 text-sm">
                          Keep your personal financials private. No tax returns, W-2s, pay stubs, bank statements, or employer audits are ever required.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'comparison' && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h2 className="text-3xl font-bold text-white mb-6 text-center">
                        Capital Bridge Solutions vs. Angel Oak vs. Visio Lending
                      </h2>
                      <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                        See how we compare against institutional non-QM lenders for California investment properties. By shopping 50+ wholesale outlets, we secure significantly better rates and terms.
                      </p>

                      <div className="overflow-x-auto">
                        <table className="w-full bg-dark-800/40 rounded-xl border border-white/10 overflow-hidden text-base">
                          <thead className="bg-dark-700">
                            <tr className="text-left text-gray-300">
                              <th className="py-4 px-6 font-semibold">Lending Metric</th>
                              <th className="py-4 px-6 text-emerald-400 font-bold">Capital Bridge Solutions</th>
                              <th className="py-4 px-6 text-blue-400 font-semibold">Angel Oak Solutions</th>
                              <th className="py-4 px-6 text-orange-400 font-semibold">Visio Lending</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-300 divide-y divide-white/5">
                            <tr className="bg-emerald-500/5">
                              <td className="py-4 px-6 font-semibold">Starting Interest Rate</td>
                              <td className="py-4 px-6 font-bold text-emerald-400">5.50% - 6.25%</td>
                              <td className="py-4 px-6">7.50% - 8.25%</td>
                              <td className="py-4 px-6">7.75% - 8.50%</td>
                            </tr>
                            <tr>
                              <td className="py-4 px-6 font-semibold">Origination Points</td>
                              <td className="py-4 px-6 font-bold text-emerald-400">From 0.75%</td>
                              <td className="py-4 px-6">1.5% - 2.5%</td>
                              <td className="py-4 px-6">2.0% - 3.0%</td>
                            </tr>
                            <tr className="bg-dark-700/10">
                              <td className="py-4 px-6 font-semibold">Average Closing Speed</td>
                              <td className="py-4 px-6 font-bold text-emerald-400">5 - 7 Days</td>
                              <td className="py-4 px-6">10 - 14 Days</td>
                              <td className="py-4 px-6">14 - 21 Days</td>
                            </tr>
                            <tr>
                              <td className="py-4 px-6 font-semibold">Minimum DSCR Ratio</td>
                              <td className="py-4 px-6 font-bold text-emerald-400">0.75 (Highly Flexible)</td>
                              <td className="py-4 px-6">1.00 (Strict Limit)</td>
                              <td className="py-4 px-6">1.00 (Strict Limit)</td>
                            </tr>
                            <tr className="bg-dark-700/10">
                              <td className="py-4 px-6 font-semibold">Max Loan-to-Value (LTV)</td>
                              <td className="py-4 px-6 font-bold text-emerald-400">Up to 85% (Purchase)</td>
                              <td className="py-4 px-6">Up to 80%</td>
                              <td className="py-4 px-6">Up to 80%</td>
                            </tr>
                            <tr>
                              <td className="py-4 px-6 font-semibold">Maximum Loan Size</td>
                              <td className="py-4 px-6 font-bold text-emerald-400">Up to $30M</td>
                              <td className="py-4 px-6">Up to $3M</td>
                              <td className="py-4 px-6">Up to $5M</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h2 className="text-3xl font-bold text-white mb-6 text-center">California Qualification Guidelines</h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            What is Required
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                              <span><strong>640+ Credit Score</strong> (higher scores receive lower rates and points).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                              <span><strong>15% - 20% Down Payment</strong> (LTV ratios up to 85%).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                              <span><strong>DSCR calculation</strong> based on rental income vs. mortgage payment (PITIA). Ratios down to 0.75 eligible.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                              <span><strong>Appraisal report</strong> containing an official rent schedule (Form 1007 or 1025).</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                              <span><strong>Liquid cash reserves</strong> representing 3 to 6 months of mortgage payments.</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            What is NOT Required
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 text-red-400 mt-1 flex-shrink-0 font-bold">✗</span>
                              <span className="text-gray-400 line-through">Personal income tax returns or 1040 forms.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 text-red-400 mt-1 flex-shrink-0 font-bold">✗</span>
                              <span className="text-gray-400 line-through">W-2 corporate forms, salary slips, or pay stubs.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 text-red-400 mt-1 flex-shrink-0 font-bold">✗</span>
                              <span className="text-gray-400 line-through">Personal debt-to-income (DTI) audits or verification.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 text-red-400 mt-1 flex-shrink-0 font-bold">✗</span>
                              <span className="text-gray-400 line-through">Employer calls, employment history verification, or references.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-4 h-4 text-red-400 mt-1 flex-shrink-0 font-bold">✗</span>
                              <span className="text-gray-400 line-through">Complex corporate tax audits.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'markets' && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h2 className="text-3xl font-bold text-white mb-8 text-center">Top California Investment Markets</h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          { name: 'Los Angeles County', price: '$850K', rent: '$3,100', description: 'Massive rental pool, tight vacancy rates, high appreciation.' },
                          { name: 'Orange County', price: '$955K', rent: '$3,200', description: 'Premium coastal market, strong household incomes, local headquarters.' },
                          { name: 'San Diego County', price: '$890K', rent: '$3,000', description: 'Exceptional defense and tech jobs, high tenant demand.' },
                          { name: 'San Francisco Bay Area', price: '$1.2M', rent: '$3,500', description: 'Elite appreciation, global tech hub, premium rent margins.' },
                          { name: 'Inland Empire', price: '$580K', rent: '$2,400', description: 'Excellent cash flow, rapidly expanding logistics hub.' },
                          { name: 'Sacramento Metro', price: '$510K', rent: '$2,100', description: 'Strong yield/appreciation balance, state capital stability.' }
                        ].map((market, index) => (
                          <div key={index} className="bg-dark-800/40 border border-white/5 rounded-xl p-6 hover:border-primary-500/30 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-2">{market.name}</h3>
                            <div className="flex gap-4 mb-3 text-sm">
                              <div>
                                <span className="text-gray-400 block">Avg Price</span>
                                <span className="font-bold text-primary-400">{market.price}</span>
                              </div>
                              <div>
                                <span className="text-gray-400 block">Median Rent</span>
                                <span className="font-bold text-emerald-400">{market.rent}/mo</span>
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm">{market.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-dark-950/50 border-t border-white/5">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  { q: "How is the DSCR calculated for a California property?", a: "The Debt Service Coverage Ratio (DSCR) is calculated by dividing the gross monthly rental income by the monthly mortgage payment (which includes Principal, Interest, Taxes, Insurance, and any HOA dues, or PITIA). For example, if a property rents for $3,000 per month and the PITIA payment is $2,500, the DSCR is 1.20." },
                  { q: "Can I close a California no-doc loan in the name of an LLC?", a: "Yes, closing in the name of a business entity (like an LLC, Corporation, or Partnership) is highly encouraged for asset protection and liability limitation, and is fully supported by our wholesale lending programs." },
                  { q: "Can I use no-doc financing for short-term rentals like Airbnb?", a: "Absolutely. We offer specialized short-term rental programs where we calculate the DSCR using historical Airbnb/VRBO statement data or projections from third-party tools like AirDNA." },
                  { q: "What is the minimum loan amount for a no-doc loan in California?", a: "Our wholesale lending programs cover loan amounts ranging from $75,000 up to $30,000,000, allowing you to finance everything from small condos to large multi-family portfolios." }
                ].map((faq, index) => (
                  <div key={index} className="bg-dark-800/40 rounded-xl p-6 border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-2 flex gap-3">
                      <span className="text-primary-400">Q:</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-300 pl-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary-950/20 to-dark-950">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Experience the Best No-Doc Lending in California</h2>
              <p className="text-lg text-gray-300 mb-8">
                Skip the red tape. Save thousands on rates and points by letting us shop over 50 lenders. Get pre-approved in 24-48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+19493393555"
                  onClick={handlePhoneClick}
                  className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call (949) 339-3555</span>
                </a>
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <span>Get Pre-Approved</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
