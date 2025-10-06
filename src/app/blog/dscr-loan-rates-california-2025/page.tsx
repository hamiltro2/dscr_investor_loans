'use client';

import Link from 'next/link';
import { TrendingUp, Percent, Calculator, Shield, Home, DollarSign, Clock, Target, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { FAQSection, CTASection } from './faq-cta';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRRatesPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR Loan Rates California 2025: Current Rates & Factors"
        description="Current DSCR loan rates in California start as low as 5.99%. See rate tables by credit score, learn what affects your rate, and get the best pricing."
        datePublished="2024-09-24T00:00:00.000Z"
        dateModified="2025-01-05T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR-Loans-599.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loan-rates-california-2025"
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
              <span className="text-white">DSCR Loan Rates California 2025</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loan Rates California 2025: Current Rates & Factors
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: January 5, 2025</span>
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
              src="/DSCR-Loans-599.png"
              alt="DSCR Loan Rates California 2025 - Current interest rates starting at 5.99% for investment property loans"
              width={1200}
              height={630}
              priority={true}
              caption="DSCR Loan Rates from 5.99% - Get the best rates for your California investment property"
            />
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                DSCR loan rates in California currently start as low as 5.99%, influenced by factors like 
                credit score, down payment, property type, and market conditions. This comprehensive guide breaks 
                down current rates, what affects your pricing, and strategies to secure the best possible rate 
                for your investment property in today's market.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary-400" />
                  Current Market Snapshot
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">5.99%</div>
                    <p className="text-sm text-gray-300">Best Rate (760+ credit)</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">8.25%</div>
                    <p className="text-sm text-gray-300">Average Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">9.75%</div>
                    <p className="text-sm text-gray-300">620 Credit Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Rate Grid */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              DSCR Loan Rates by Credit Score & LTV
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-500/20">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">Credit Score</th>
                    <th className="text-center py-4 px-6 text-gray-300 font-semibold">75% LTV</th>
                    <th className="text-center py-4 px-6 text-gray-300 font-semibold">70% LTV</th>
                    <th className="text-center py-4 px-6 text-gray-300 font-semibold">65% LTV</th>
                    <th className="text-center py-4 px-6 text-gray-300 font-semibold">Rate Adjustment</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">760+</td>
                    <td className="py-4 px-6 text-center">5.99%</td>
                    <td className="py-4 px-6 text-center">5.75%</td>
                    <td className="py-4 px-6 text-center">5.50%</td>
                    <td className="py-4 px-6 text-center text-green-400">Best Pricing</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-dark-700/30">
                    <td className="py-4 px-6 font-semibold">740-759</td>
                    <td className="py-4 px-6 text-center">6.25%</td>
                    <td className="py-4 px-6 text-center">5.99%</td>
                    <td className="py-4 px-6 text-center">5.75%</td>
                    <td className="py-4 px-6 text-center">+0.25%</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">720-739</td>
                    <td className="py-4 px-6 text-center">6.50%</td>
                    <td className="py-4 px-6 text-center">6.25%</td>
                    <td className="py-4 px-6 text-center">5.99%</td>
                    <td className="py-4 px-6 text-center">+0.50%</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-dark-700/30">
                    <td className="py-4 px-6 font-semibold">700-719</td>
                    <td className="py-4 px-6 text-center">8.00%</td>
                    <td className="py-4 px-6 text-center">7.75%</td>
                    <td className="py-4 px-6 text-center">7.50%</td>
                    <td className="py-4 px-6 text-center">+0.75%</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">680-699</td>
                    <td className="py-4 px-6 text-center">8.50%</td>
                    <td className="py-4 px-6 text-center">8.25%</td>
                    <td className="py-4 px-6 text-center">8.00%</td>
                    <td className="py-4 px-6 text-center">+1.25%</td>
                  </tr>
                  <tr className="border-t border-gray-700 bg-dark-700/30">
                    <td className="py-4 px-6 font-semibold">660-679</td>
                    <td className="py-4 px-6 text-center">9.00%</td>
                    <td className="py-4 px-6 text-center">8.75%</td>
                    <td className="py-4 px-6 text-center">8.50%</td>
                    <td className="py-4 px-6 text-center">+1.75%</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold">620-659</td>
                    <td className="py-4 px-6 text-center">9.75%</td>
                    <td className="py-4 px-6 text-center">9.50%</td>
                    <td className="py-4 px-6 text-center">9.25%</td>
                    <td className="py-4 px-6 text-center text-orange-400">+2.50%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              *Rates as of January 2025. Subject to change based on market conditions. Additional adjustments may apply.
            </p>
          </div>
        </div>
      </section>

      {/* How to Get Best Rate */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              7 Strategies to Get the Best DSCR Rate
            </h2>

            <div className="space-y-4">
              {[
                {
                  number: "1",
                  title: "Improve Your Credit Score",
                  description: "Even 20 points can save 0.25%. Pay down credit cards below 30% utilization.",
                  impact: "Save 0.25-0.75%"
                },
                {
                  number: "2",
                  title: "Increase Down Payment",
                  description: "Put 30% down instead of 25% for better pricing tier.",
                  impact: "Save 0.25-0.50%"
                },
                {
                  number: "3",
                  title: "Target High DSCR Properties",
                  description: "Properties with 1.25+ DSCR qualify for best rates.",
                  impact: "Save 0.25-0.50%"
                },
                {
                  number: "4",
                  title: "Accept Prepayment Penalty",
                  description: "3-5 year prepay reduces rate if holding long-term.",
                  impact: "Save 0.25-0.50%"
                },
                {
                  number: "5",
                  title: "Shop Multiple Lenders",
                  description: "Rates vary 0.5-1% between lenders for same scenario.",
                  impact: "Save 0.25-1.00%"
                },
                {
                  number: "6",
                  title: "Time the Market",
                  description: "Lock when rates dip. Watch Fed announcements.",
                  impact: "Save 0.25-0.50%"
                },
                {
                  number: "7",
                  title: "Bundle Properties",
                  description: "Portfolio deals with 5+ properties get better pricing.",
                  impact: "Save 0.25-0.375%"
                }
              ].map((strategy) => (
                <div key={strategy.number} className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-400 font-bold">{strategy.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{strategy.title}</h3>
                        <span className="text-sm font-semibold text-green-400">{strategy.impact}</span>
                      </div>
                      <p className="text-gray-300">{strategy.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
      </article>
    </>
  );
}
