'use client';

import Link from 'next/link';
import { Scale, Clock, DollarSign, Percent, Shield, TrendingUp, AlertCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { FAQContinued, CTASection } from './faq-cta';

export default function DSCRvsHardMoneyPage() {
  return (
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
              <span className="text-white">DSCR vs Hard Money Loans</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR vs Hard Money Loans: Which is Better for California Investors?
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: September 24, 2024</span>
              <span>•</span>
              <span>11 min read</span>
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
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                California real estate investors often face a critical decision: DSCR loans or hard money loans? 
                Both offer fast, flexible financing without traditional income verification, but they serve very 
                different purposes. This comprehensive comparison helps you choose the right financing strategy 
                for your investment goals, whether you're holding long-term rentals or flipping properties.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-primary-400" />
                  The Bottom Line Up Front
                </h2>
                <p className="text-gray-300">
                  <strong className="text-white">DSCR loans</strong> are ideal for buy-and-hold investors seeking 
                  long-term financing at reasonable rates. <strong className="text-white">Hard money loans</strong> excel 
                  for fix-and-flip projects or bridge financing needs. Many successful investors use both strategically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Head-to-Head Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-500/20">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">Feature</th>
                    <th className="text-left py-4 px-6 text-primary-400 font-semibold">DSCR Loans</th>
                    <th className="text-left py-4 px-6 text-orange-400 font-semibold">Hard Money Loans</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Interest Rates</td>
                    <td className="py-4 px-6">7.5-9.5%</td>
                    <td className="py-4 px-6">10-15%</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-dark-700/30">
                    <td className="py-4 px-6 font-semibold">Loan Terms</td>
                    <td className="py-4 px-6">30-year fixed</td>
                    <td className="py-4 px-6">6-24 months</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Down Payment</td>
                    <td className="py-4 px-6">20-25%</td>
                    <td className="py-4 px-6">10-30%</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-dark-700/30">
                    <td className="py-4 px-6 font-semibold">Closing Speed</td>
                    <td className="py-4 px-6">21-30 days</td>
                    <td className="py-4 px-6">7-14 days</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Credit Score Min</td>
                    <td className="py-4 px-6">620-660</td>
                    <td className="py-4 px-6">No minimum</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-dark-700/30">
                    <td className="py-4 px-6 font-semibold">Property Condition</td>
                    <td className="py-4 px-6">Move-in ready</td>
                    <td className="py-4 px-6">Any condition</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">Best For</td>
                    <td className="py-4 px-6">Long-term rentals</td>
                    <td className="py-4 px-6">Fix & flip, bridge</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Real Cost Comparison: $500K Property Example
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* DSCR Example */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-primary-400 mb-4">DSCR Loan Scenario</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Purchase Price:</span>
                    <span className="font-semibold">$500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment (25%):</span>
                    <span className="font-semibold">$125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">$375,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-semibold">8.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-semibold">$2,752</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-3">
                    <span className="font-semibold">First Year Interest:</span>
                    <span className="font-bold text-primary-400">$29,700</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">30-Year Total Interest:</span>
                    <span className="font-bold text-primary-400">$615,720</span>
                  </div>
                </div>
              </div>

              {/* Hard Money Example */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
                <h3 className="text-xl font-bold text-orange-400 mb-4">Hard Money Scenario</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Purchase Price:</span>
                    <span className="font-semibold">$500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment (20%):</span>
                    <span className="font-semibold">$100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Amount:</span>
                    <span className="font-semibold">$400,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-semibold">12.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points (3%):</span>
                    <span className="font-semibold">$12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Interest:</span>
                    <span className="font-semibold">$4,000</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-3">
                    <span className="font-semibold">6-Month Cost:</span>
                    <span className="font-bold text-orange-400">$36,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-yellow-400">Key Insight:</strong> While hard money costs more upfront, 
                it can be profitable for flips completed in 6 months. For holds longer than 12 months, DSCR 
                loans become significantly more cost-effective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Common Questions: DSCR vs Hard Money
            </h2>

            <div className="space-y-6">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">
                  Can I refinance from hard money to DSCR?
                </h3>
                <p className="text-gray-300">
                  Yes! This is a common strategy. Most DSCR lenders require 6 months seasoning and the property 
                  must be rented with sufficient cash flow. Plan your exit strategy before taking hard money to 
                  ensure you qualify for DSCR refinancing.
                </p>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">
                  Which is easier to qualify for?
                </h3>
                <p className="text-gray-300">
                  Hard money is easier to qualify for since it's asset-based with no credit requirements. DSCR 
                  loans require minimum 620-660 credit scores but don't verify income. Both are easier than 
                  conventional loans that require tax returns and debt-to-income ratios.
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
  );
}
