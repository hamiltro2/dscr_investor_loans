import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Current DSCR Loan Rates 2025: 5.99% Starting | Capital Bridge',
  description: 'DSCR loan rates start at 5.99% for qualified borrowers. Get today\'s rates, factors affecting your rate, and how to get the lowest rate. 620 credit minimum.',
};

export default function CurrentDSCRLoanRatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">Current DSCR Loan Rates</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>Current DSCR loan rates start at 5.99%</strong> for well-qualified borrowers (700+ credit, 25%+ down, 1.25+ DSCR). 
            Rates range from 5.99% to 9.5% depending on credit score, down payment, DSCR ratio, and property type. 
            <strong>No rate shopping</strong> - we find you the best rate from multiple lenders.
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">5.99%</div>
              <div className="text-xs text-gray-400">Best Rate</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">6.5-7.5%</div>
              <div className="text-xs text-gray-400">Avg Range</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">0.75%</div>
              <div className="text-xs text-gray-400">Points $450K+</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary-400">30yr</div>
              <div className="text-xs text-gray-400">Fixed</div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Current DSCR Loan Rates 2025
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Rate Matrix by Credit Score</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-semibold">Credit Score</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">25% Down</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">20% Down</th>
                      <th className="px-6 py-4 text-left text-white font-semibold">Est. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {[
                      { score: '740+', down25: '✓ Best', down20: '✓ Excellent', rate: '5.99% - 6.49%' },
                      { score: '700-739', down25: '✓ Great', down20: '✓ Good', rate: '6.25% - 6.99%' },
                      { score: '680-699', down25: '✓ Good', down20: '✓ Fair', rate: '6.75% - 7.49%' },
                      { score: '660-679', down25: '✓ Fair', down20: '⚠ Higher', rate: '7.25% - 7.99%' },
                      { score: '640-659', down25: '⚠ Higher', down20: '⚠ Much Higher', rate: '7.75% - 8.49%' },
                      { score: '620-639', down25: '⚠ Highest', down20: '⚠ Highest', rate: '8.25% - 9.50%' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-dark-800/50 transition-colors">
                        <td className="px-6 py-4 text-gray-300 font-semibold">{row.score}</td>
                        <td className="px-6 py-4 text-gray-300">{row.down25}</td>
                        <td className="px-6 py-4 text-gray-300">{row.down20}</td>
                        <td className="px-6 py-4 text-primary-400 font-semibold">{row.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-dark-800/50 text-sm text-gray-400">
                <p>* Rates as of January 2025. Subject to change. Actual rate depends on full application review.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Factors Affecting Your Rate</h2>
            <div className="space-y-4">
              {[
                {
                  factor: 'Credit Score',
                  impact: 'High Impact',
                  details: '740+ gets best rates. Every 20-point drop adds ~0.25-0.50% to rate. 620 minimum required.'
                },
                {
                  factor: 'Down Payment',
                  impact: 'High Impact',
                  details: '25% down gets better rate than 20%. 30%+ down can save 0.25-0.50% on rate.'
                },
                {
                  factor: 'DSCR Ratio',
                  impact: 'Medium Impact',
                  details: '1.25+ gets best pricing. 1.0-1.24 adds ~0.25%. Below 1.0 requires special pricing.'
                },
                {
                  factor: 'Property Type',
                  impact: 'Medium Impact',
                  details: 'SFR gets best rate. Condos add ~0.25%. Multi-family 2-4 units add ~0.125-0.25%.'
                },
                {
                  factor: 'Loan Amount',
                  impact: 'Low-Medium Impact',
                  details: 'Larger loans ($450K+) qualify for lower points (0.75% vs 1.5-2%). Better pricing on $1M+ loans.'
                },
                {
                  factor: 'Loan Purpose',
                  impact: 'Medium Impact',
                  details: 'Purchase slightly better than refi. Cash-out refi adds ~0.25-0.50% to rate.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.factor}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      item.impact === 'High Impact' ? 'bg-red-600/20 text-red-400' :
                      item.impact === 'Medium Impact' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-green-600/20 text-green-400'
                    }`}>
                      {item.impact}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How to Get the Lowest Rate</h2>
            <div className="bg-gradient-to-br from-primary-600/5 to-primary-700/5 border border-primary-600/20 rounded-xl p-6">
              <div className="space-y-4">
                {[
                  { tip: 'Improve credit to 740+', saving: 'Save 0.50-1.00% on rate' },
                  { tip: 'Put down 25% or more', saving: 'Save 0.25-0.50% on rate' },
                  { tip: 'Target DSCR of 1.25+', saving: 'Save 0.25% on rate' },
                  { tip: 'Choose single-family home', saving: 'Best available rates' },
                  { tip: 'Borrow $450K or more', saving: 'Pay only 0.75 points vs 1.5-2%' },
                  { tip: 'Purchase vs cash-out refi', saving: 'Save 0.25-0.50% on rate' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">{item.tip}</div>
                      <div className="text-sm text-primary-400">{item.saving}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR vs Conventional Rates</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Conventional Mortgage</h3>
                <div className="space-y-3 text-gray-300 mb-6">
                  <div>Rate: <span className="text-white font-semibold">5.5% - 6.5%</span></div>
                  <div>Points: <span className="text-white font-semibold">0-1%</span></div>
                  <div>Down Payment: <span className="text-white font-semibold">15-25%</span></div>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <div>✓ Slightly lower rate</div>
                  <div>✗ Requires tax returns</div>
                  <div>✗ Income verification</div>
                  <div>✗ Debt-to-income limits</div>
                  <div>✗ Max 10 financed properties</div>
                </div>
              </div>

              <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">DSCR Loan</h3>
                <div className="space-y-3 text-gray-300 mb-6">
                  <div>Rate: <span className="text-white font-semibold">5.99% - 9.5%</span></div>
                  <div>Points: <span className="text-white font-semibold">0.75-2%</span></div>
                  <div>Down Payment: <span className="text-white font-semibold">20-25%</span></div>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <div>⚠ Slightly higher rate</div>
                  <div>✓ No tax returns needed</div>
                  <div>✓ No income verification</div>
                  <div>✓ No DTI limits</div>
                  <div>✓ Unlimited properties</div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
              <p className="text-green-400 font-semibold mb-1">✓ Worth It For Most Investors</p>
              <p className="text-sm text-gray-300">
                The 0.5-1.5% higher rate is worth it to avoid documentation hassles, qualify faster, and finance unlimited properties.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Get Your Rate Quote</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We shop multiple lenders to find you the best rate. Get a custom rate quote in 24-48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Get My Rate Quote
                </Link>
                <a
                  href="tel:+19493393555"
                  className="btn-secondary"
                  onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
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
                { q: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements' },
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
                { q: 'DSCR vs conventional loan', url: '/faq/dscr-vs-conventional-loan' },
                { q: 'What credit score for DSCR loan?', url: '/faq/credit-score-for-dscr-loan' },
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
              name: 'What are current DSCR loan rates?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Current DSCR loan rates start at 5.99% for well-qualified borrowers (700+ credit, 25% down, 1.25+ DSCR). Rates range from 5.99% to 9.5% depending on credit score, down payment, DSCR ratio, and property type. Most borrowers get rates between 6.5-7.5%. Fixed 30-year terms available. Points start at 0.75% for loans over $450,000.'
              }
            }
          })
        }}
      />
    </div>
  );
}
