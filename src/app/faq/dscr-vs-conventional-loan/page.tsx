import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DSCR Loan vs Conventional Loan: Which is Better? 2025',
  description: 'DSCR: no tax returns, unlimited properties. Conventional: lower rates, stricter requirements. Compare rates, requirements, and choose the best option for your investment.',
};

export default function DSCRVsConventionalLoanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">DSCR vs Conventional Loan</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>DSCR loans: No tax returns, unlimited properties, faster approval (24-48 hours), higher rates (5.5-9.5%).</strong>
            <strong> Conventional: Requires tax returns, max 10 properties, slower approval (30-45 days), lower rates (5.5-7.5%).</strong>
            Choose DSCR for flexibility and speed. Choose conventional for lowest rate if you qualify.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          DSCR Loan vs Conventional Loan
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Head-to-Head Comparison</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">DSCR Loan</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Conventional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {[
                    { feature: 'Tax Returns', dscr: '❌ NOT Required', conv: '✅ Required (2 years)', winner: 'dscr' },
                    { feature: 'Income Verification', dscr: '❌ None', conv: '✅ Full verification', winner: 'dscr' },
                    { feature: 'Interest Rate', dscr: '5.5% - 9.5%', conv: '5.5% - 7.5%', winner: 'conv' },
                    { feature: 'Credit Minimum', dscr: '620', conv: '640-680', winner: 'dscr' },
                    { feature: 'Down Payment', dscr: '20-25%', conv: '15-25%', winner: 'tie' },
                    { feature: 'Property Limit', dscr: '♾️ Unlimited', conv: '🔟 Max 10', winner: 'dscr' },
                    { feature: 'Approval Time', dscr: '24-48 hours', conv: '30-45 days', winner: 'dscr' },
                    { feature: 'Closing Time', dscr: '7-14 days', conv: '30-45 days', winner: 'dscr' },
                    { feature: 'Self-Employed', dscr: '✅ Easy', conv: '⚠️ Hard', winner: 'dscr' },
                    { feature: 'DTI Limits', dscr: '❌ No limits', conv: '✅ 43-50% max', winner: 'dscr' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-dark-800/50 transition-colors">
                      <td className="px-6 py-4 text-gray-300 font-semibold">{row.feature}</td>
                      <td className={`px-6 py-4 ${row.winner === 'dscr' ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                        {row.dscr}
                      </td>
                      <td className={`px-6 py-4 ${row.winner === 'conv' ? 'text-green-400 font-semibold' : 'text-gray-300'}`}>
                        {row.conv}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Detailed Comparison</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
                <h3 className="text-2xl font-bold text-primary-400 mb-4">DSCR Loan</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-green-400 font-semibold mb-2">✓ Advantages</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• No tax returns or income docs</li>
                      <li>• Finance unlimited properties</li>
                      <li>• 24-48 hour approval</li>
                      <li>• No DTI calculation</li>
                      <li>• Perfect for self-employed</li>
                      <li>• Close in 7-14 days</li>
                      <li>• 620 credit minimum</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-400 font-semibold mb-2">✗ Disadvantages</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Rates 0.5-1.5% higher</li>
                      <li>• Investment property only</li>
                      <li>• Typically requires 25% down</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-2xl font-bold text-gray-300 mb-4">Conventional Loan</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-green-400 font-semibold mb-2">✓ Advantages</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Lower interest rates</li>
                      <li>• 15% down possible</li>
                      <li>• Can be primary/investment</li>
                      <li>• Longer track record</li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-red-400 font-semibold mb-2">✗ Disadvantages</div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Requires 2 years tax returns</li>
                      <li>• Full income verification</li>
                      <li>• Max 10 financed properties</li>
                      <li>• 30-45 day close timeline</li>
                      <li>• DTI limits (43-50% max)</li>
                      <li>• Hard for self-employed</li>
                      <li>• 640-680 credit needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Cost Comparison Example</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
              <p className="text-gray-300 mb-6">Same property, different loan types. See the actual numbers:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary-900/10 border border-primary-600/30 rounded-lg p-5">
                  <h3 className="text-xl font-semibold text-primary-400 mb-4">DSCR Loan</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between"><span>Property:</span><span className="text-white">$500K</span></div>
                    <div className="flex justify-between"><span>Down (25%):</span><span className="text-white">$125K</span></div>
                    <div className="flex justify-between"><span>Loan Amount:</span><span className="text-white">$375K</span></div>
                    <div className="flex justify-between"><span>Rate:</span><span className="text-white">7.0%</span></div>
                    <div className="flex justify-between"><span>Points:</span><span className="text-white">0.75%</span></div>
                    <div className="h-px bg-dark-700 my-3"></div>
                    <div className="flex justify-between font-bold"><span>Monthly P&I:</span><span className="text-primary-400">$2,494</span></div>
                    <div className="flex justify-between"><span>30yr Total Int:</span><span className="text-white">$522,840</span></div>
                  </div>
                  <div className="mt-4 p-3 bg-green-600/10 rounded text-sm space-y-1">
                    <div className="text-green-400 font-semibold">✓ Approved in 36 hours</div>
                    <div className="text-gray-300">No tax returns needed</div>
                  </div>
                </div>

                <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-5">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">Conventional Loan</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between"><span>Property:</span><span className="text-white">$500K</span></div>
                    <div className="flex justify-between"><span>Down (20%):</span><span className="text-white">$100K</span></div>
                    <div className="flex justify-between"><span>Loan Amount:</span><span className="text-white">$400K</span></div>
                    <div className="flex justify-between"><span>Rate:</span><span className="text-white">6.5%</span></div>
                    <div className="flex justify-between"><span>Points:</span><span className="text-white">0%</span></div>
                    <div className="h-px bg-dark-700 my-3"></div>
                    <div className="flex justify-between font-bold"><span>Monthly P&I:</span><span className="text-white">$2,528</span></div>
                    <div className="flex justify-between"><span>30yr Total Int:</span><span className="text-white">$510,080</span></div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-600/10 rounded text-sm space-y-1">
                    <div className="text-yellow-400 font-semibold">⚠️ 30-45 day approval</div>
                    <div className="text-gray-300">Extensive documentation</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary-600/10 border border-primary-600/30 rounded-lg">
                <div className="font-semibold text-white mb-2">The Trade-Off:</div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>• DSCR: $25K more down payment, slightly higher rate, but NO documentation hassle</div>
                  <div>• Conventional: Lower rate saves ~$13K in interest, but requires extensive docs and 45-day close</div>
                  <div>• For self-employed/privacy-focused: DSCR is worth the small premium</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Which One Should You Choose?</h2>
            <div className="space-y-4">
              {[
                {
                  scenario: 'You\'re self-employed with high write-offs',
                  choice: 'DSCR',
                  reason: 'Tax returns show low income. Conventional will deny you. DSCR only cares about property income.'
                },
                {
                  scenario: 'You already own 10+ investment properties',
                  choice: 'DSCR',
                  reason: 'Conventional caps at 10 financed properties. DSCR has no limit.'
                },
                {
                  scenario: 'You need to close in under 2 weeks',
                  choice: 'DSCR',
                  reason: 'DSCR closes in 7-14 days. Conventional takes 30-45 days minimum.'
                },
                {
                  scenario: 'You\'re W-2 employee with clean tax returns',
                  choice: 'Conventional',
                  reason: 'You easily qualify for conventional. Save 0.5-1.0% on rate.'
                },
                {
                  scenario: 'This is your first investment property',
                  choice: 'Either',
                  reason: 'Compare both. If you have clean W-2 income, conventional saves money. If self-employed, DSCR is easier.'
                },
                {
                  scenario: 'You value privacy over lowest rate',
                  choice: 'DSCR',
                  reason: 'DSCR doesn\'t require sharing tax returns or financial statements.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.scenario}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.choice === 'DSCR' ? 'bg-primary-600/20 text-primary-400' :
                        item.choice === 'Conventional' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-gray-600/20 text-gray-400'
                      }`}>
                      {item.choice}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{item.reason}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Get Pre-Approved for DSCR Loan</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Skip the documentation hassle. Get approved in 24-48 hours with no tax returns required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Apply for DSCR Loan
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
                { q: 'Do DSCR loans require tax returns?', url: '/faq/do-dscr-loans-require-tax-returns' },
                { q: 'Current DSCR loan rates', url: '/faq/current-dscr-loan-rates' },
                { q: 'DSCR loans for self-employed', url: '/faq/dscr-loan-self-employed' },
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
              name: 'DSCR loan vs conventional loan - which is better?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'DSCR loans: No tax returns, unlimited properties, 24-48 hour approval, higher rates (5.5-9.5%). Conventional: Requires tax returns, max 10 properties, 30-45 day approval, lower rates (5.5-7.5%). Choose DSCR if self-employed, have 10+ properties, or need fast closing. Choose conventional if W-2 employee seeking lowest rate. DSCR trades slightly higher rate for massive flexibility.'
              }
            }
          })
        }}
      />
    </div>
  );
}
