import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DSCR Loan Requirements 2025: Complete Checklist | Capital Bridge',
  description: '620 credit minimum, 20-25% down, no tax returns. Complete DSCR loan requirements checklist. Get pre-approved in 24-48 hours with rates starting at 5.5%.',
};

export default function DSCRLoanRequirementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">DSCR Loan Requirements</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            DSCR loan requirements: 620+ credit score, 20-25% down payment, 1.0+ DSCR ratio, investment property only.
            <strong> NO tax returns, W-2s, or income verification required.</strong> Loan amounts from $75K to $30M.
            Approval in 24-48 hours, close in 7-14 days.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          DSCR Loan Requirements 2025
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Complete Requirements Checklist</h2>

            <div className="space-y-4">
              {[
                {
                  title: 'Credit Score',
                  required: '620 minimum',
                  ideal: '640+ for best rates',
                  details: 'Lower scores available case-by-case. 700+ qualifies for lowest rates (5.5%)'
                },
                {
                  title: 'Down Payment',
                  required: '20-25%',
                  ideal: '25%+ for best terms',
                  details: 'Varies by credit score and property type. Higher down = better rate'
                },
                {
                  title: 'DSCR Ratio',
                  required: '1.0 or higher',
                  ideal: '1.25+',
                  details: 'Monthly rent ÷ monthly debt. Some programs accept 0.75+ with compensating factors'
                },
                {
                  title: 'Property Type',
                  required: '1-4 unit residential',
                  ideal: 'Single-family, strong market',
                  details: 'Also accepts: condos, townhomes, small commercial, mixed-use'
                },
                {
                  title: 'Loan Amount',
                  required: '$75,000 minimum',
                  ideal: 'No maximum',
                  details: 'We finance up to $30,000,000 for large portfolios'
                },
                {
                  title: 'Property Use',
                  required: 'Investment only',
                  ideal: 'Cash-flowing rental',
                  details: 'Long-term rental, Airbnb/STR, or property needing minor repairs'
                },
              ].map((req, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{req.title}</h3>
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Minimum Required</div>
                      <div className="text-primary-400 font-semibold">{req.required}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Ideal</div>
                      <div className="text-green-400 font-semibold">{req.ideal}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{req.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">What You DON'T Need (No-Doc Advantage)</h2>
            <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Tax returns (1040, Schedule E)',
                  'W-2 forms or pay stubs',
                  'Employment verification',
                  'Bank statements',
                  'Debt-to-income calculation',
                  'Personal financial statements',
                  'Profit & loss statements',
                  'Business tax returns',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ This is the power of DSCR loans</p>
                <p className="text-gray-300 text-sm">
                  You qualify based on the property's rental income, not your personal income.
                  Perfect for self-employed, business owners, and investors with complex finances.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Required Documentation</h2>
            <p className="text-gray-300 mb-6">While we don't need tax returns or W-2s, you'll need these basic documents:</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-lg font-semibold text-primary-400 mb-4">Personal Documents</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Government-issued ID (driver's license, passport)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Credit authorization form
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Proof of down payment funds
                  </li>
                </ul>
              </div>

              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-lg font-semibold text-primary-400 mb-4">Property Documents</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Purchase contract (if buying)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Current lease agreement (if refinancing)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Property insurance quote
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    Market rent analysis (we can provide)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Property Requirements</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Acceptable Property Types</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Single-family homes',
                      '2-4 unit multi-family',
                      'Condos (warrantable)',
                      'Townhomes',
                      'Mixed-use (residential + commercial)',
                      'Small commercial properties',
                    ].map((type, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-dark-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Property Condition</h3>
                  <p className="text-gray-300 mb-3">
                    Property must be in rentable condition (no major repairs needed). However:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Minor cosmetic updates are acceptable</li>
                    <li>✓ We finance Airbnb/short-term rentals</li>
                    <li>✓ Long-term rental properties (existing tenants OK)</li>
                    <li>✓ Properties rented within last 12 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Special Situations</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Foreign Nationals',
                  answer: 'Yes! We offer DSCR loans to foreign nationals investing in U.S. real estate. Same requirements apply.'
                },
                {
                  title: 'First-Time Investors',
                  answer: 'Yes! No previous investment property experience required. We help first-time investors get started.'
                },
                {
                  title: 'Multiple Properties',
                  answer: 'No limit! Finance 10, 20, or 100+ properties. Portfolio loans available for 5+ properties.'
                },
                {
                  title: 'Cash-Out Refinance',
                  answer: 'Must own property for 6+ months. Can access up to 80% LTV. Use cash for renovations or next purchase.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Check If You Qualify</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get pre-approved in 24-48 hours. Submit your property info and we'll provide a preliminary qualification within 1 business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Get Pre-Approved Now
                </Link>
                <a
                  href="tel:+19493393555"
                  className="btn-secondary"
                >
                  Call (949) 339-3555
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Related Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
                { q: 'What credit score for DSCR loan?', url: '/faq/credit-score-for-dscr-loan' },
                { q: 'Do DSCR loans require tax returns?', url: '/faq/do-dscr-loans-require-tax-returns' },
                { q: 'Can I get a DSCR loan with bad credit?', url: '/faq/dscr-loan-bad-credit' },
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
              name: 'What are DSCR loan requirements?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'DSCR loan requirements: 620+ credit score, 20-25% down payment, 1.0+ DSCR ratio, investment property only. NO tax returns, W-2s, or income verification required. Loan amounts from $75,000 to $30,000,000. Approval in 24-48 hours, close in 7-14 days. Property must be 1-4 unit residential (single-family, multi-family, condo, townhome). Rates start at 5.5% for qualified borrowers.'
              }
            }
          })
        }}
      />
    </div>
  );
}
