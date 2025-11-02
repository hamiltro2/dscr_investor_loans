import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Can I Get a DSCR Loan with Bad Credit? 620 Minimum | Capital Bridge',
  description: 'Yes! DSCR loans available with 620 credit score. Learn how to qualify with bad credit, rate impacts, and tips to improve approval odds. No income verification required.',
};

export default function DSCRLoanBadCreditPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">DSCR Loan with Bad Credit</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>Yes, you can get a DSCR loan with bad credit as low as 620.</strong> Some lenders accept 600-619 with compensating factors. 
            Lower credit scores require larger down payments (25-30%) and result in higher rates (7.5-9.5%). 
            <strong>Key advantage: No income verification</strong> means credit issues from tax write-offs or business expenses don't matter.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Can I Get a DSCR Loan with Bad Credit?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Loan Credit Requirements</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-dark-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Credit Score</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Approval Status</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Down Payment</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Est. Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {[
                    { score: '700+', status: '✓ Excellent', down: '20-25%', rate: '5.99-7.0%' },
                    { score: '680-699', status: '✓ Very Good', down: '25%', rate: '6.75-7.5%' },
                    { score: '660-679', status: '✓ Good', down: '25%', rate: '7.25-8.0%' },
                    { score: '640-659', status: '✓ Fair', down: '25-30%', rate: '7.75-8.5%' },
                    { score: '620-639', status: '✓ Approved', down: '30%', rate: '8.25-9.5%' },
                    { score: '600-619', status: '⚠ Case-by-Case', down: '35%+', rate: '9.0-10.5%' },
                    { score: 'Below 600', status: '✗ Difficult', down: '40%+', rate: 'Special Pricing' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-dark-800/50 transition-colors">
                      <td className="px-6 py-4 text-gray-300 font-semibold">{row.score}</td>
                      <td className="px-6 py-4 text-gray-300">{row.status}</td>
                      <td className="px-6 py-4 text-gray-300">{row.down}</td>
                      <td className="px-6 py-4 text-primary-400 font-semibold">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How to Qualify with Bad Credit</h2>
            <div className="space-y-4">
              {[
                {
                  tip: 'Larger Down Payment (30%+)',
                  impact: 'Strong compensating factor that offsets credit risk'
                },
                {
                  tip: 'Higher DSCR (1.25+)',
                  impact: 'Property with strong cash flow improves approval odds'
                },
                {
                  tip: 'Lower LTV (70% or less)',
                  impact: 'More equity reduces lender risk significantly'
                },
                {
                  tip: 'Explanation Letter',
                  impact: 'Explain credit issues (medical, divorce, business loss)'
                },
                {
                  tip: 'Strong Rental Market',
                  impact: 'Property in high-demand area with stable rents'
                },
                {
                  tip: 'Recent Payment History',
                  impact: '12+ months of on-time payments shows improvement'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.tip}</h3>
                      <p className="text-gray-300 text-sm">{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why DSCR Loans Work for Bad Credit</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">✓ DSCR Loan Advantages</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ 620 minimum (vs 640-680 conventional)</li>
                  <li>✓ No income verification needed</li>
                  <li>✓ Credit issues from tax strategy OK</li>
                  <li>✓ Recent bankruptcy/foreclosure OK (2+ years)</li>
                  <li>✓ Self-employed with write-offs welcome</li>
                  <li>✓ Multiple late payments may be OK</li>
                </ul>
              </div>
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">✗ Conventional Challenges</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✗ 640-680 minimum usually required</li>
                  <li>✗ Full income documentation</li>
                  <li>✗ Tax write-offs hurt qualification</li>
                  <li>✗ 3-7 years after bankruptcy</li>
                  <li>✗ DTI limits exclude many</li>
                  <li>✗ Strict credit event timelines</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real Example: 640 Credit Approval</h2>
            <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
              <div className="space-y-4 text-gray-300">
                <div><strong className="text-white">Borrower:</strong> Self-employed, 640 credit, recent late payments</div>
                <div><strong className="text-white">Property:</strong> $400K single-family, $3,200/month rent</div>
                <div><strong className="text-white">Down Payment:</strong> 30% ($120K)</div>
                <div><strong className="text-white">DSCR:</strong> 1.35</div>
                <div className="pt-4 border-t border-dark-700">
                  <div className="text-green-400 font-semibold mb-2">✓ APPROVED</div>
                  <div><strong className="text-white">Rate:</strong> 7.75%</div>
                  <div><strong className="text-white">Monthly Payment:</strong> $2,370 (PITI + HOA)</div>
                  <div><strong className="text-white">Cash Flow:</strong> +$830/month</div>
                </div>
                <div className="mt-4 p-4 bg-green-600/10 rounded-lg text-sm">
                  <strong className="text-green-400">Why it worked:</strong> 30% down, strong DSCR, and stable rental market compensated for 640 credit.
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Improve Your Approval Odds</h2>
            <div className="bg-gradient-to-br from-primary-600/5 to-primary-700/5 border border-primary-600/20 rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Short-Term (0-30 days)</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Pay down credit card balances below 30% utilization</li>
                    <li>• Dispute any errors on credit reports</li>
                    <li>• Don't apply for new credit before loan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Medium-Term (3-6 months)</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Make all payments on time</li>
                    <li>• Pay down small collections (under $1K)</li>
                    <li>• Increase down payment savings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Long-Term (6-12 months)</h3>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Establish 12+ months perfect payment history</li>
                    <li>• Work with credit repair if needed</li>
                    <li>• Target 680+ for much better rates</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Get Pre-Approved with Bad Credit</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                We specialize in bad credit DSCR loans. Get a real approval decision in 24-48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Apply Now - 620 Min Credit
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
                { q: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements' },
                { q: 'What credit score for DSCR loan?', url: '/faq/credit-score-for-dscr-loan' },
                { q: 'Current DSCR loan rates', url: '/faq/current-dscr-loan-rates' },
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
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
              name: 'Can I get a DSCR loan with bad credit?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, you can get a DSCR loan with bad credit as low as 620. Some lenders accept 600-619 with compensating factors like larger down payments (25-30%) and strong DSCR ratios. Lower credit scores result in higher rates (7.5-9.5%). Key advantage: No income verification means credit issues from tax write-offs don\'t matter. Recent bankruptcy/foreclosure OK after 2+ years.'
              }
            }
          })
        }}
      />
    </div>
  );
}
