import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, Phone } from 'lucide-react';
import PhoneButton from '@/components/PhoneButton';

export const metadata: Metadata = {
  title: 'What is a DSCR Loan? Complete Guide 2026 | Capital Bridge Solutions',
  description: 'A DSCR loan is a no-doc investment property loan that qualifies based on rental income, not personal income. Learn how DSCR loans work, requirements, and rates starting at 5.5%.',
  openGraph: {
    title: 'What is a DSCR Loan? Complete Guide 2026',
    description: 'No-doc investment property loans starting at 5.5%. Qualify based on rental income, not personal income. 620 credit minimum.',
  },
};

export default function WhatIsDSCRLoanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">What is a DSCR Loan?</span>
        </nav>

        {/* Quick Answer Box - Featured Snippet Optimized */}
        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            A <strong>DSCR (Debt Service Coverage Ratio) loan</strong> is a no-documentation investment property loan that qualifies based on the property's rental income rather than the borrower's personal income. DSCR loans require no tax returns, W-2s, or income verification, making them ideal for self-employed investors and those with complex income situations.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">5.5%</div>
              <div className="text-xs text-gray-400">Starting Rate</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">620</div>
              <div className="text-xs text-gray-400">Min Credit</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">$75K</div>
              <div className="text-xs text-gray-400">Min Loan</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">$30M</div>
              <div className="text-xs text-gray-400">Max Loan</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          What is a DSCR Loan?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Loan Definition</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              DSCR stands for <strong>Debt Service Coverage Ratio</strong>. A DSCR loan is a specialized mortgage product designed for real estate investors that uses the property's income-generating potential as the primary qualification criteria, rather than the borrower's personal income.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Unlike traditional mortgages that require extensive documentation of your personal finances (W-2s, tax returns, pay stubs, employment verification), DSCR loans focus entirely on whether the rental property can generate enough income to cover its mortgage payment, property taxes, insurance, and HOA fees.
            </p>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How Does a DSCR Loan Work?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The DSCR loan qualification process is straightforward and revolves around one key calculation:
            </p>

            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-mono text-primary-400 mb-2">
                  DSCR = Monthly Rental Income ÷ Monthly Debt Payment
                </div>
                <p className="text-sm text-gray-400">
                  Monthly Debt Payment = Mortgage (PITI) + HOA fees
                </p>
              </div>
            </div>

            <div className="bg-dark-900/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Example Calculation:</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between border-b border-dark-700 pb-2">
                  <span>Monthly Rent:</span>
                  <span className="font-semibold text-white">$3,500</span>
                </div>
                <div className="flex justify-between border-b border-dark-700 pb-2">
                  <span>Monthly Mortgage Payment:</span>
                  <span>$2,400</span>
                </div>
                <div className="flex justify-between border-b border-dark-700 pb-2">
                  <span>Property Tax (monthly):</span>
                  <span>$300</span>
                </div>
                <div className="flex justify-between border-b border-dark-700 pb-2">
                  <span>Insurance (monthly):</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between border-b border-dark-700 pb-2">
                  <span>HOA Fees:</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total Monthly Debt:</span>
                  <span className="text-primary-400">$2,950</span>
                </div>
                <div className="flex justify-between font-bold text-2xl pt-4 border-t-2 border-primary-600">
                  <span>DSCR:</span>
                  <span className="text-primary-400">$3,500 ÷ $2,950 = 1.19</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                A DSCR of 1.19 means the property generates 19% more income than needed to cover all debt payments. Most lenders require a minimum DSCR of 1.0 to 1.25.
              </p>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Key Benefits of DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'No Tax Returns Required',
                  description: 'Perfect for self-employed, business owners, or those with complex tax situations'
                },
                {
                  title: 'No Income Verification',
                  description: 'Personal income, W-2s, and pay stubs are not required'
                },
                {
                  title: 'Fast Approval',
                  description: '24-48 hour pre-approvals and 7-14 day closings'
                },
                {
                  title: 'Unlimited Properties',
                  description: 'No limit on the number of financed investment properties'
                },
                {
                  title: 'Cash-Out Refinance',
                  description: 'Access up to 80% of your property value'
                },
                {
                  title: 'Competitive Rates',
                  description: 'Starting at 5.5% for qualified borrowers'
                },
              ].map((benefit, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl p-5 border border-dark-800">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who Should Get */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Who Should Get a DSCR Loan?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              DSCR loans are ideal for:
            </p>
            <ul className="space-y-3">
              {[
                'Self-employed borrowers who don\'t want to provide tax returns',
                'Business owners with complex income structures',
                'Real estate investors building rental portfolios',
                'High-income earners who write off significant business expenses',
                'Foreign nationals investing in U.S. real estate',
                'Investors with multiple properties (no limit on number of financed properties)',
                'Borrowers with credit scores as low as 620',
                'Anyone who values privacy and wants to avoid extensive financial documentation',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Loan Requirements</h2>
            <div className="bg-dark-900/50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Credit Score</h3>
                <p className="text-gray-300">Minimum 620 (640+ for best rates)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Down Payment</h3>
                <p className="text-gray-300">20-25% (varies by credit score and property type)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">DSCR Ratio</h3>
                <p className="text-gray-300">Typically 1.0 or higher (some programs accept 0.75+)</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Property Type</h3>
                <p className="text-gray-300">1-4 unit residential, condos, townhomes, small commercial</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Loan Amount</h3>
                <p className="text-gray-300">$75,000 to $30,000,000</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Pre-Approved?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Capital Bridge Solutions offers DSCR loans starting at 5.5% with 24-48 hour approvals.
                No tax returns required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Get Pre-Approved in 24-48 Hours
                </Link>
                <PhoneButton phone="+19493393555" className="btn-secondary flex items-center justify-center gap-2">
                  Call (949) 339-3555
                </PhoneButton>
              </div>
            </div>
          </section>

          {/* Related Questions */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Related Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: 'How does a DSCR loan work?', url: '/faq/how-does-dscr-loan-work' },
                { q: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements' },
                { q: 'What credit score for DSCR loan?', url: '/faq/credit-score-for-dscr-loan' },
                { q: 'Do DSCR loans require tax returns?', url: '/faq/do-dscr-loans-require-tax-returns' },
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

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: {
              '@type': 'Question',
              name: 'What is a DSCR loan?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A DSCR (Debt Service Coverage Ratio) loan is a no-documentation investment property loan that qualifies based on the property\'s rental income rather than the borrower\'s personal income. DSCR loans require no tax returns, W-2s, or income verification, making them ideal for self-employed investors and those with complex income situations. Rates start at 5.5% with 620 minimum credit score.',
                author: {
                  '@type': 'Organization',
                  name: 'Capital Bridge Solutions',
                  url: 'https://www.dscrinvestorloans.com'
                }
              }
            },
            about: {
              '@type': 'FinancialProduct',
              name: 'DSCR Loan',
              description: 'Debt Service Coverage Ratio loan for investment properties',
              provider: {
                '@type': 'FinancialService',
                name: 'Capital Bridge Solutions'
              },
              interestRate: {
                '@type': 'QuantitativeValue',
                minValue: 5.5,
                unitText: 'PERCENT'
              }
            }
          })
        }}
      />
    </div>
  );
}
