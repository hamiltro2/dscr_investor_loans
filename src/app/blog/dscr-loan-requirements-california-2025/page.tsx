'use client';

import Link from 'next/link';
import { CheckCircle, AlertCircle, FileText, TrendingUp, Home, DollarSign, Shield, Clock, ArrowRight, Calculator } from 'lucide-react';
import { FAQContinued, CTASection } from './faq-cta';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRRequirementsPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR Loan Requirements California 2025: What You Need to Know"
        description="Complete breakdown of 2025 DSCR loan requirements in California. Credit scores from 620, down payments from 20%, and no tax returns needed."
        datePublished="2024-09-23T00:00:00.000Z"
        dateModified="2025-01-20T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR_loan_Requirements.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loan-requirements-california-2025"
      />
      <article className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      {/* Hero Section */}
      <section className="relative py-16 border-b border-primary-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary-400">Blog</Link>
              <span>/</span>
              <span className="text-white">DSCR Loan Requirements 2025</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loan Requirements California 2025: What You Need to Know
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: January 20, 2025</span>
              <span>•</span>
              <span>10 min read</span>
              <span>•</span>
              <span>By Capital Bridge Solutions Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BlogImage 
              src="/DSCR_loan_Requirements.png"
              alt="DSCR Loan Requirements California 2024 - Complete guide to qualifying for investment property loans with no income verification"
              width={1200}
              height={630}
              priority={true}
              caption="2024 DSCR Loan Requirements - Everything you need to qualify for investment property financing"
            />

            {/* California DSCR Hub Callout */}
            <div className="my-12 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary-500/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Complete California DSCR Loan Guide
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Explore our comprehensive guide covering all California markets, requirements, FAQs, and neighborhood analyses for LA, San Diego, San Francisco, Orange County, and Sacramento.
                  </p>
                  <a 
                    href="/locations/california/dscr-loans"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    View Complete CA Guide
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                DSCR loan requirements in California have evolved significantly in 2025, offering more 
                flexibility for real estate investors while maintaining prudent lending standards. 
                Whether you're a seasoned investor or making your first investment property purchase, 
                understanding these requirements is crucial for securing the best financing terms.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-primary-400" />
                  2025 Key Changes
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li>• Minimum DSCR ratios now start at 0.75 (down from 1.0)</li>
                  <li>• Credit score requirements relaxed to 620 minimum</li>
                  <li>• New "no-ratio" programs for strong borrowers</li>
                  <li>• Expanded property types including STRs and mixed-use</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Requirements */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Core DSCR Loan Requirements for 2025
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* DSCR Ratio Requirements */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">DSCR Ratios</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">1.25+:</strong> Best rates, all lenders
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">1.0-1.24:</strong> Standard rates
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">0.75-0.99:</strong> Higher rates, larger down
                    </div>
                  </li>
                </ul>
              </div>

              {/* Credit Score Requirements */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Credit Scores</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">740+:</strong> Premium pricing tier
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">680-739:</strong> Standard pricing
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">620-679:</strong> Available with conditions
                    </div>
                  </li>
                </ul>
              </div>

              {/* Down Payment Requirements */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Down Payment</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">20%:</strong> DSCR 1.25+ only
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">25%:</strong> DSCR 1.0-1.24
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">30-40%:</strong> DSCR below 1.0
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Requirements */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Property Requirements & Eligible Types
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Eligible Properties */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Eligible Properties
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Single-family homes (SFR)</li>
                  <li>✓ 2-4 unit properties</li>
                  <li>✓ Condos (warrantable)</li>
                  <li>✓ Townhomes</li>
                  <li>✓ Short-term rentals (Airbnb/VRBO)</li>
                  <li>✓ Mixed-use (residential portion)</li>
                  <li>✓ Non-warrantable condos (select lenders)</li>
                </ul>
              </div>

              {/* Property Conditions */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4">
                  Property Conditions
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Must be investment/rental property</li>
                  <li>• No owner-occupancy allowed</li>
                  <li>• Property must be rentable condition</li>
                  <li>• Clear title required</li>
                  <li>• Maximum 10 properties per borrower</li>
                  <li>• Located in California</li>
                  <li>• Minimum value $150,000</li>
                </ul>
              </div>
            </div>

            {/* New for 2024 */}
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary-400" />
                New for 2024: Expanded Property Types
              </h3>
              <p className="text-gray-300 mb-4">
                California DSCR lenders now accept a wider range of property types:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-white">Rural properties:</strong> Up to 10 acres with residential use</li>
                <li>• <strong className="text-white">Luxury STRs:</strong> Properties over $2M with proven rental history</li>
                <li>• <strong className="text-white">Student housing:</strong> Near major California universities</li>
                <li>• <strong className="text-white">Accessory Dwelling Units (ADUs):</strong> When included with main property</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Requirements */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Documentation Requirements (Simplified for 2024)
            </h2>

            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary-400" />
                    Required Documents
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Government-issued ID</li>
                    <li>✓ Credit authorization</li>
                    <li>✓ Purchase contract or refi application</li>
                    <li>✓ Rent roll or lease agreements</li>
                    <li>✓ 2 months bank statements</li>
                    <li>✓ Property insurance quote</li>
                    <li>✓ Entity docs (if applicable)</li>
                    <li>✓ HOA docs (if applicable)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    NOT Required
                  </h3>
                  <ul className="space-y-2 text-gray-300 opacity-60">
                    <li>✗ Tax returns</li>
                    <li>✗ W-2s or pay stubs</li>
                    <li>✗ Employment verification</li>
                    <li>✗ Personal income docs</li>
                    <li>✗ DTI calculations</li>
                    <li>✗ Business financials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-white">Pro Tip:</strong> Having digital copies of all documents 
                ready can reduce your approval time from 48 hours to as little as 24 hours. Most lenders 
                now accept DocuSign and digital submissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Terms & Limits */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              2024 Loan Terms & Limits in California
            </h2>

            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-500/20 mb-8">
              <table className="w-full">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-300">Loan Feature</th>
                    <th className="text-left py-4 px-6 text-gray-300">2024 Terms</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Minimum Loan Amount</td>
                    <td className="py-4 px-6">$150,000</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Maximum Loan Amount</td>
                    <td className="py-4 px-6">$5,000,000 (up to $10M for portfolio loans)</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Loan Terms</td>
                    <td className="py-4 px-6">30-year fixed, 5/1 ARM, 7/1 ARM, 10/1 ARM</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Interest-Only Options</td>
                    <td className="py-4 px-6">Available for 10 years on ARMs</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Prepayment Penalties</td>
                    <td className="py-4 px-6">0-5 years (varies by lender)</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Cash-Out Refinance</td>
                    <td className="py-4 px-6">Up to 75% LTV</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Rate Buy-Downs</td>
                    <td className="py-4 px-6">Available (typically 0.25% per point)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Interest Rates */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Current Interest Rates (September 2024)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">30-Year Fixed</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• DSCR 1.25+: 6.99% - 7.49%</li>
                    <li>• DSCR 1.0-1.24: 7.49% - 7.99%</li>
                    <li>• DSCR 0.75-0.99: 8.49% - 9.49%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">5/1 ARM (Interest-Only)</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• DSCR 1.25+: 6.49% - 6.99%</li>
                    <li>• DSCR 1.0-1.24: 6.99% - 7.49%</li>
                    <li>• DSCR 0.75-0.99: 7.99% - 8.99%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve Requirements */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Reserve Requirements by Scenario
            </h2>

            <div className="space-y-6">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">DSCR 1.25+ with 740+ Credit</h3>
                    <p className="text-gray-300">3 months PITIA reserves required. Can include retirement accounts at 70% value.</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">DSCR 1.0-1.24 or 680-739 Credit</h3>
                    <p className="text-gray-300">6 months PITIA reserves required. Must be liquid (checking, savings, money market).</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">DSCR Below 1.0 or Credit Below 680</h3>
                    <p className="text-gray-300">12 months PITIA reserves required. Additional 6 months for each additional property owned.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Special DSCR Programs for California Investors
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Portfolio Loans */}
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Portfolio Blanket Loans</h3>
                <p className="text-gray-300 mb-4">
                  Finance multiple properties under one loan with better terms:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Minimum 5 properties</li>
                  <li>• Up to $10M total financing</li>
                  <li>• Single monthly payment</li>
                  <li>• Cross-collateralization benefits</li>
                  <li>• 0.25-0.5% rate reduction</li>
                </ul>
              </div>

              {/* Bridge to DSCR */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Bridge-to-DSCR Programs</h3>
                <p className="text-gray-300 mb-4">
                  Perfect for fix-and-hold investors:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 12-month bridge loan for rehab</li>
                  <li>• Automatic conversion to DSCR</li>
                  <li>• No new application needed</li>
                  <li>• Rate lock protection</li>
                  <li>• Up to 90% of purchase + rehab</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Common Mistakes to Avoid in 2024
            </h2>

            <div className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  1. Overestimating Rental Income
                </h3>
                <p className="text-gray-300">
                  Lenders use the LOWER of actual rents or appraiser's market rent opinion. Don't assume 
                  your above-market rents will qualify—prepare for potential adjustments.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  2. Ignoring Prepayment Penalties
                </h3>
                <p className="text-gray-300">
                  Most DSCR loans have 3-5 year prepayment penalties. Factor this into your investment 
                  strategy, especially if you plan to sell or refinance soon.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  3. Not Shopping Multiple Lenders
                </h3>
                <p className="text-gray-300">
                  DSCR rates vary significantly between lenders—sometimes by 1% or more. Get quotes from 
                  at least 3-4 lenders to ensure competitive pricing.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  4. Forgetting About Reserves
                </h3>
                <p className="text-gray-300">
                  Reserve requirements are strictly enforced. Ensure you have sufficient liquid funds 
                  AFTER closing costs and down payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">
                  What's the minimum credit score for a DSCR loan in California?
                </h3>
                <p className="text-gray-300">
                  The absolute minimum is 620, but you'll get much better terms with 680+. Borrowers 
                  with 740+ credit scores typically save 0.5-1% on their interest rate and may qualify 
                  for only 20% down even with lower DSCR ratios.
                </p>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">
                  Can I get a DSCR loan for a property that needs renovation?
                </h3>
                <p className="text-gray-300">
                  Yes, through DSCR rehab loans or bridge-to-DSCR programs. These allow you to finance 
                  purchase plus renovation costs, then either refinance or automatically convert to a 
                  long-term DSCR loan after repairs are complete.
                </p>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">
                  How many DSCR loans can I have in California?
                </h3>
                <p className="text-gray-300">
                  There's no strict limit on DSCR loans like there is with conventional mortgages. Most 
                  lenders allow up to 10 properties per borrower, but some portfolio lenders have no 
                  limit as long as each property meets DSCR requirements.
                </p>
              </div>

              <FAQContinued />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
      </article>
    </>
  );
}
