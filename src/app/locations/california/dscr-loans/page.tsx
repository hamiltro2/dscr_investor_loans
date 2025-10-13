'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Calculator, TrendingUp, Building2, Home, CheckCircle, ArrowRight, FileText, Users, Shield, Download, BarChart } from 'lucide-react';
import CaliforniaFAQ from '@/components/california/CaliforniaFAQ';
import CaliforniaMarkets from '@/components/california/CaliforniaMarkets';
import CaliforniaRequirements from '@/components/california/CaliforniaRequirements';
import CaliforniaSchema from '@/components/california/CaliforniaSchema';

export default function CaliforniaDSCRLoansPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <CaliforniaSchema />
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
              <span>/</span>
              <Link href="/locations/california" className="hover:text-primary-400 transition-colors">California</Link>
              <span>/</span>
              <span className="text-primary-400">DSCR Loans</span>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">California Investment Financing</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80 leading-tight">
                California DSCR Loans
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
                Fast Approval for Investment Properties in the Golden State
              </p>
              
              <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                No tax returns. No W-2s. No pay stubs. Qualify based on rental income alone. 
                <span className="text-primary-400 font-semibold"> Rates from 5.99%</span> • Close in 10-15 days
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link 
                  href="/get-started"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-primary-400/30 inline-flex items-center gap-2"
                >
                  Get Free Rate Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <a 
                  href="tel:+19493393555"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2"
                  onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
                >
                  <Phone className="w-5 h-5" />
                  (949) 339-3555
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>640+ Credit Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>20% Down Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Close in LLC</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Unlimited Properties</span>
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
                    Free Chrome Extension: Analyze California Properties Instantly
                  </h3>
                  <p className="text-gray-300">
                    Works on Zillow, Redfin, and 17+ sites. Auto-calculates DSCR, cash flow, and ROI as you browse. 
                    <span className="text-primary-400 font-semibold"> AI-powered analysis</span> for every California listing.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <a 
                    href="https://chrome.google.com/webstore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
        <div className="container">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">5.99%</div>
              <div className="text-gray-400 text-sm">Rates Starting At</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">10-15</div>
              <div className="text-gray-400 text-sm">Days to Close</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">$75K-$3M</div>
              <div className="text-gray-400 text-sm">Loan Amounts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">80%</div>
              <div className="text-gray-400 text-sm">Max LTV</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12 border-b border-white/10 pb-4">
              {[
                { id: 'overview', label: 'Overview', icon: Home },
                { id: 'requirements', label: 'Requirements', icon: FileText },
                { id: 'markets', label: 'CA Markets', icon: MapPin },
                { id: 'calculator', label: 'Calculator', icon: Calculator }
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

            <div className="min-h-[600px]">
              {activeTab === 'overview' && (
                <div className="space-y-12 animate-fadeIn">
                  <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <Building2 className="w-8 h-8 text-primary-400" />
                      What is a California DSCR Loan?
                    </h2>
                    <div className="prose prose-invert prose-lg max-w-none">
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        A California DSCR (Debt Service Coverage Ratio) loan is a specialized real estate investment loan that qualifies you based on your <strong className="text-white">property's rental income</strong>, not your personal income. This revolutionary financing method has transformed how investors scale their California rental portfolios.
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        California's unique real estate market—with property values averaging $800K+ and strong rental demand—makes DSCR loans particularly powerful. Whether you're targeting <strong className="text-primary-400">Los Angeles multi-families</strong>, <strong className="text-primary-400">Palm Springs vacation rentals</strong>, or <strong className="text-primary-400">Sacramento cash-flowing properties</strong>, DSCR loans let you qualify without tax returns, W-2s, or employment verification.
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        The DSCR ratio is simple: <strong className="text-primary-400">Monthly Rental Income ÷ Monthly PITIA Payment</strong>. A ratio of 1.0 means the property breaks even. California's competitive rental markets often produce ratios of 1.15-1.45, qualifying you for excellent rates and terms.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                      Why California is the #1 State for DSCR Loans
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { icon: TrendingUp, title: 'Strong Appreciation', description: 'California properties have appreciated 6-8% annually over the past decade. Leverage amplifies these gains, building equity you can tap with cash-out refinances.' },
                        { icon: Users, title: 'High Rental Demand', description: 'With 45% of Californians renting, demand is consistent across all markets. LA, SF, and San Diego have sub-3% vacancy rates in quality neighborhoods.' },
                        { icon: Home, title: 'Diverse Property Types', description: 'From urban condos to desert vacation rentals to suburban single-families, California offers every property type. DSCR loans finance them all.' },
                        { icon: BarChart, title: 'Premium Rental Rates', description: 'California commands some of the nation\'s highest rents. Median rent in LA: $2,800. Orange County: $3,200. These rates support strong DSCR ratios.' },
                        { icon: MapPin, title: 'Multiple Strong Markets', description: 'Unlike single-city states, California has 8+ major investor markets. Inland Empire offers 7%+ yields. SF offers appreciation. Diversify within one state.' },
                        { icon: Shield, title: 'Economic Resilience', description: 'As the 5th largest economy globally, California\'s diverse job market (tech, entertainment, agriculture, tourism) creates rental stability across cycles.' }
                      ].map((benefit, index) => (
                        <div key={index} className="group bg-dark-900/50 rounded-xl p-6 border border-dark-800 hover:border-primary-500/30 transition-all duration-300">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <benefit.icon className="w-7 h-7 text-primary-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                          <p className="text-gray-400">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && <CaliforniaRequirements />}
              {activeTab === 'markets' && <CaliforniaMarkets />}
              {activeTab === 'calculator' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">California DSCR Loan Calculator</h2>
                    <p className="text-xl text-gray-300">Calculate your DSCR ratio, cash flow, and loan qualification</p>
                  </div>
                  <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="text-center py-12">
                      <Calculator className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-4">Interactive DSCR Calculator</h3>
                      <p className="text-gray-300 mb-6">Use our comprehensive calculator to analyze California investment properties</p>
                      <Link href="/calculators" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                        Open Calculator
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-dark-950/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300">Everything you need to know about California DSCR loans</p>
            </div>
            <CaliforniaFAQ />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gradient-to-br from-primary-500/5 to-blue-500/5">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Related Resources</h2>
              <p className="text-xl text-gray-300">Expert guides to help you maximize your California investments</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/best-lenders-self-employed-california" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Best Lenders for Self-Employed</h3>
                <p className="text-gray-400 text-sm mb-4">Compare top lenders for self-employed borrowers in California. No tax returns required.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Guide →</span>
              </Link>
              <Link href="/blog/best-dscr-loan-lenders-california" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Best DSCR Lenders</h3>
                <p className="text-gray-400 text-sm mb-4">Expert comparison of the top DSCR loan lenders serving California investors.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Guide →</span>
              </Link>
              <Link href="/blog/dscr-loan-calculator-california" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">DSCR Calculator</h3>
                <p className="text-gray-400 text-sm mb-4">Calculate your debt service coverage ratio and estimate your maximum loan amount.</p>
                <span className="text-primary-400 text-sm font-semibold">Use Calculator →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Finance Your California Investment Property?</h2>
            <p className="text-xl text-gray-300 mb-8">Get pre-approved in 24-48 hours. No tax returns required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 justify-center">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+19493393555" className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center" onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}>
                <Phone className="w-5 h-5" />
                (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
