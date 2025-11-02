import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What is DSCR in Real Estate? Complete Guide 2025',
  description: 'DSCR (Debt Service Coverage Ratio) measures if rental income covers mortgage payments. Formula: Monthly Rent ÷ Monthly Debt. 1.0+ qualifies for DSCR loans.',
};

export default function WhatIsDSCRInRealEstatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">What is DSCR in Real Estate?</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>DSCR (Debt Service Coverage Ratio)</strong> in real estate measures whether a rental property generates enough income to cover its debt payments. 
            <strong> Formula: Monthly Rent ÷ (Mortgage + Taxes + Insurance + HOA).</strong> A DSCR of 1.0 means rent exactly covers debt. 
            1.25 means 25% cushion. Lenders require 1.0-1.25 minimum.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          What is DSCR in Real Estate?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Definition for Real Estate</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              DSCR stands for <strong>Debt Service Coverage Ratio</strong>. In real estate investing, it's the most important metric for determining if an investment property can pay for itself.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The DSCR ratio tells you: <strong>"Does this property make enough rent to cover all its monthly debt payments?"</strong>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The DSCR Formula</h2>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-mono text-primary-400 mb-4">
                  DSCR = Monthly Rental Income ÷ Total Monthly Debt
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  Where Total Monthly Debt = Mortgage (PITI) + HOA + Other Property Debt
                </div>
              </div>
            </div>

            <div className="bg-dark-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Calculation:</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-primary-400 font-semibold mb-2">Step 1: Calculate Monthly Rental Income</h4>
                  <p className="text-gray-300 text-sm">Example: $3,500/month</p>
                </div>
                <div>
                  <h4 className="text-primary-400 font-semibold mb-2">Step 2: Add Up Total Monthly Debt</h4>
                  <div className="text-gray-300 text-sm space-y-1 ml-4">
                    <div>• Mortgage payment (P&I): $2,200</div>
                    <div>• Property taxes: $300</div>
                    <div>• Insurance: $150</div>
                    <div>• HOA fees: $100</div>
                    <div className="font-semibold pt-2 border-t border-dark-700 mt-2">= Total: $2,750</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-primary-400 font-semibold mb-2">Step 3: Divide Rent by Debt</h4>
                  <div className="bg-dark-800 rounded-lg p-4 font-mono">
                    <div className="text-white">$3,500 ÷ $2,750 = <span className="text-primary-400 text-xl font-bold">1.27 DSCR</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What DSCR Numbers Mean</h2>
            <div className="space-y-4">
              {[
                {
                  ratio: 'DSCR = 1.25 or higher',
                  meaning: 'Excellent Cash Flow',
                  details: 'Property generates 25%+ more income than debt. Qualifies for best loan terms.',
                  color: 'green'
                },
                {
                  ratio: 'DSCR = 1.0 to 1.24',
                  meaning: 'Positive Cash Flow',
                  details: 'Property covers debt with small cushion. Most lenders accept. May require higher down payment.',
                  color: 'primary'
                },
                {
                  ratio: 'DSCR = 0.75 to 0.99',
                  meaning: 'Break-Even or Slight Loss',
                  details: 'Property doesn\'t fully cover debt. Special programs available with compensating factors.',
                  color: 'yellow'
                },
                {
                  ratio: 'DSCR below 0.75',
                  meaning: 'Negative Cash Flow',
                  details: 'Property loses money monthly. Hard to finance. May need significant down payment or rate buy-down.',
                  color: 'red'
                },
              ].map((item, idx) => (
                <div key={idx} className={`bg-dark-900/50 rounded-xl border ${
                  item.color === 'green' ? 'border-green-600/30' :
                  item.color === 'yellow' ? 'border-yellow-600/30' :
                  item.color === 'red' ? 'border-red-600/30' :
                  'border-dark-800'
                } p-6`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className={`text-xl font-bold ${
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'yellow' ? 'text-yellow-400' :
                        item.color === 'red' ? 'text-red-400' :
                        'text-primary-400'
                      }`}>{item.ratio}</div>
                      <div className="text-white font-semibold mt-1">{item.meaning}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real-World Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl border border-green-600/30 p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-4">✓ Good Deal (DSCR 1.40)</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="text-white font-semibold">$4,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mortgage (PITI):</span>
                    <span>$2,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HOA:</span>
                    <span>$200</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-dark-700">
                    <span>Total Debt:</span>
                    <span>$3,000</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t-2 border-green-600">
                    <span>DSCR:</span>
                    <span className="text-green-400">1.40</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-600/10 rounded-lg">
                  <p className="text-sm text-green-400 font-semibold">Property cash flows $1,200/month</p>
                  <p className="text-xs text-gray-400 mt-1">Qualifies easily. Best loan terms available.</p>
                </div>
              </div>

              <div className="bg-dark-900/50 rounded-xl border border-red-600/30 p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-4">✗ Marginal Deal (DSCR 0.85)</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="text-white font-semibold">$2,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mortgage (PITI):</span>
                    <span>$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HOA:</span>
                    <span>$300</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-dark-700">
                    <span>Total Debt:</span>
                    <span>$3,300</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t-2 border-red-600">
                    <span>DSCR:</span>
                    <span className="text-red-400">0.85</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-600/10 rounded-lg">
                  <p className="text-sm text-red-400 font-semibold">Property loses $500/month</p>
                  <p className="text-xs text-gray-400 mt-1">Hard to finance. Needs higher down payment or better rate.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why DSCR Matters for Real Estate Investors</h2>
            <div className="space-y-4">
              {[
                {
                  reason: 'Loan Qualification',
                  details: 'Lenders use DSCR to approve loans. 1.0+ qualifies. Higher DSCR = better terms and rates.'
                },
                {
                  reason: 'Property Selection',
                  details: 'Calculate DSCR before buying to ensure property will cash flow. Avoid properties with DSCR below 1.0.'
                },
                {
                  reason: 'Risk Assessment',
                  details: 'Higher DSCR = more cushion if rent drops or expenses rise. 1.25+ protects against vacancies.'
                },
                {
                  reason: 'Portfolio Building',
                  details: 'Strong DSCR properties are easier to refinance and use for scaling your portfolio.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">{item.reason}</h3>
                  <p className="text-gray-300">{item.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Calculate Your Property's DSCR</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Use our free calculator to see if your property qualifies for a DSCR loan. Get instant results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/calculators/dscr" className="btn-primary flex items-center justify-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Calculate DSCR Now
                </Link>
                <Link href="/get-started" className="btn-secondary">
                  Get Pre-Approved
                </Link>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Related Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
                { q: 'How to calculate DSCR?', url: '/faq/calculate-dscr-rental-property' },
                { q: 'What is a good DSCR ratio?', url: '/faq/what-is-good-dscr-ratio' },
                { q: 'How does a DSCR loan work?', url: '/faq/how-does-dscr-loan-work' },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  className="block bg-dark-900/50 rounded-xl p-4 border border-dark-800 hover:border-primary-500/30 transition-colors"
                >
                  <span className="text-gray-300 hover:text-primary-400">{link.q}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: {
              '@type': 'Question',
              name: 'What is DSCR in real estate?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'DSCR (Debt Service Coverage Ratio) in real estate measures whether a rental property generates enough income to cover its debt payments. Formula: Monthly Rent ÷ (Mortgage + Taxes + Insurance + HOA). A DSCR of 1.0 means rent exactly covers debt. 1.25 means 25% cushion above break-even. Lenders require 1.0-1.25 minimum for DSCR loans.'
              }
            }
          })
        }}
      />
    </div>
  );
}
