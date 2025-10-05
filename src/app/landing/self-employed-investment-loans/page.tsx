'use client';

import { useState } from 'react';
import { Phone, CheckCircle, Calculator, Clock, TrendingUp, Shield, FileX, DollarSign } from 'lucide-react';

export default function SelfEmployedInvestmentLoansLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    propertyType: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }

    // Track form submission
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submission_success',
        formType: 'self_employed_landing_page',
        loanAmount: formData.loanAmount,
        propertyType: formData.propertyType
      });
    }

    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll contact you within 24 hours.');
  };

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-dark-950 border-b border-primary-500/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline & Benefits */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <FileX className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-400 font-medium">No W2s or Tax Returns Needed</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                Self-Employed?
                <span className="block text-primary-400 mt-2">Get Investment Property Loans</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                DSCR loans designed specifically for self-employed real estate investors. 
                No income documentation required - qualify by your property's rental income alone.
              </p>

              {/* Key Benefits */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">No Tax Returns</h3>
                    <p className="text-sm text-gray-400">Skip the paperwork hassle</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">No W2s Required</h3>
                    <p className="text-sm text-gray-400">Perfect for 1099 contractors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">No Income Verification</h3>
                    <p className="text-sm text-gray-400">Property cash flow qualifies you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Fast Approval</h3>
                    <p className="text-sm text-gray-400">24-48 hour decisions</p>
                  </div>
                </div>
              </div>

              {/* Phone CTA */}
              <a
                href="tel:+19493393555"
                onClick={handlePhoneClick}
                className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
              >
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-sm opacity-90">Speak to a Specialist</div>
                  <div className="text-xl">(949) 339-3555</div>
                </div>
              </a>
            </div>

            {/* Right Column - Lead Form */}
            <div className="bg-dark-800 border border-primary-500/20 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Get Pre-Qualified Today</h2>
              <p className="text-gray-400 mb-6">No credit check to get started. Response within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="(949) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-300 mb-2">
                    Loan Amount Needed *
                  </label>
                  <select
                    id="loanAmount"
                    required
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select loan amount</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="250k-500k">$250,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1,000,000</option>
                    <option value="1m+">$1,000,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-300 mb-2">
                    Property Type *
                  </label>
                  <select
                    id="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select property type</option>
                    <option value="single-family">Single Family</option>
                    <option value="multi-family">Multi-Family (2-4 units)</option>
                    <option value="condo">Condo/Townhouse</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
                >
                  Get Pre-Qualified Now
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Self-Employed Love DSCR Loans */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Why Self-Employed Investors Choose DSCR Loans</h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Traditional lenders make it difficult for self-employed borrowers. DSCR loans solve this problem.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
              <FileX className="w-12 h-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">No Documentation Headaches</h3>
              <p className="text-gray-400">
                Forget about 2 years of tax returns, P&L statements, or 1099s. Your property's rental income is all we need.
              </p>
            </div>

            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
              <DollarSign className="w-12 h-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Write-Offs Don't Hurt You</h3>
              <p className="text-gray-400">
                Maximize your tax deductions without worrying about loan qualification. DSCR loans don't look at your personal income.
              </p>
            </div>

            <div className="bg-dark-800 border border-primary-500/20 rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-primary-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Build Wealth Faster</h3>
              <p className="text-gray-400">
                No limit on properties. Scale your portfolio without the income verification bottleneck that stops most self-employed investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Simple 3-Step Process</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 border-2 border-primary-500 rounded-full text-2xl font-bold text-primary-400 mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Submit Property Info</h3>
              <p className="text-gray-400">
                Tell us about your investment property and expected rental income. That's it - no personal financial docs needed.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 border-2 border-primary-500 rounded-full text-2xl font-bold text-primary-400 mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Approved</h3>
              <p className="text-gray-400">
                We calculate your DSCR ratio and provide approval within 24-48 hours. Simple, fast, and transparent.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 border-2 border-primary-500 rounded-full text-2xl font-bold text-primary-400 mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Close & Invest</h3>
              <p className="text-gray-400">
                Close in 2-3 weeks and start building your real estate empire. Repeat for unlimited properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-900/20 to-dark-800 border border-primary-500/20 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Simple Requirements</h2>
                <p className="text-gray-300 mb-6">
                  Unlike traditional lenders who scrutinize your tax returns and business structure, we keep it simple.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span>620+ credit score (some exceptions available)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span>20% down payment (80% LTV)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span>DSCR ratio of 1.0 or higher</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                    <span>Investment property (not primary residence)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-dark-900 border border-primary-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">What You DON'T Need</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileX className="w-6 h-6 text-red-400" />
                    <span>Tax returns</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileX className="w-6 h-6 text-red-400" />
                    <span>W2s or pay stubs</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileX className="w-6 h-6 text-red-400" />
                    <span>P&L statements</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileX className="w-6 h-6 text-red-400" />
                    <span>Business bank statements</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileX className="w-6 h-6 text-red-400" />
                    <span>Employment verification</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <FileX className="w-6 h-6 text-red-400" />
                    <span>DTI calculations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900/20 to-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop Letting Tax Write-Offs Hold You Back
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of self-employed investors who've unlocked their real estate potential with DSCR loans
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19493393555"
              onClick={handlePhoneClick}
              className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/50"
            >
              <Phone className="w-6 h-6" />
              <span>(949) 339-3555</span>
            </a>
            <a
              href="#form"
              className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
            >
              <Calculator className="w-6 h-6" />
              <span>Get Pre-Qualified</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
