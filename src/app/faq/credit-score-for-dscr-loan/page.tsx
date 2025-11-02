import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import PhoneButton from '@/components/PhoneButton';

export const metadata: Metadata = {
  title: 'What Credit Score for DSCR Loan? 620 Minimum | Capital Bridge',
  description: '620 minimum credit score for DSCR loans. 640+ for better rates, 700+ for best rates (5.99%). Learn how credit score affects rates, approval odds, and down payment.',
};

export default function CreditScoreForDSCRLoanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">What Credit Score for DSCR Loan?</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>Minimum 620 credit score</strong> for DSCR loans. 640-679 gets good rates (7.0-8.0%). 
            680-699 gets great rates (6.5-7.5%). <strong>700+ gets best rates starting at 5.99%.</strong> 
            Lower scores require larger down payments (25-30%) but approval is still possible. 
            Some lenders accept 600-619 with compensating factors.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          What Credit Score Do I Need for a DSCR Loan?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Credit Score Requirements by Tier</h2>
            <div className="space-y-4">
              {[
                {
                  range: '740+',
                  label: 'Excellent',
                  rate: '5.99% - 6.49%',
                  down: '20%',
                  approval: '95%+',
                  color: 'green',
                  notes: 'Best available rates and terms. Can get 20% down with excellent terms.'
                },
                {
                  range: '700-739',
                  label: 'Very Good',
                  rate: '6.25% - 6.99%',
                  down: '20-25%',
                  approval: '90%+',
                  color: 'green',
                  notes: 'Great rates. Most lenders prefer 25% down for best pricing.'
                },
                {
                  range: '680-699',
                  label: 'Good',
                  rate: '6.75% - 7.49%',
                  down: '25%',
                  approval: '85%+',
                  color: 'primary',
                  notes: 'Solid approval odds. 25% down typically required.'
                },
                {
                  range: '660-679',
                  label: 'Fair',
                  rate: '7.25% - 7.99%',
                  down: '25%',
                  approval: '75%+',
                  color: 'primary',
                  notes: 'Approved with compensating factors. May need higher DSCR (1.25+).'
                },
                {
                  range: '640-659',
                  label: 'Below Average',
                  rate: '7.75% - 8.49%',
                  down: '25-30%',
                  approval: '65%+',
                  color: 'yellow',
                  notes: 'Requires strong DSCR and larger down payment.'
                },
                {
                  range: '620-639',
                  label: 'Poor',
                  rate: '8.25% - 9.50%',
                  down: '30%',
                  approval: '50%+',
                  color: 'yellow',
                  notes: 'Minimum score. Needs 30% down and 1.25+ DSCR for approval.'
                },
                {
                  range: '600-619',
                  label: 'Very Poor',
                  rate: '9.00% - 10.5%',
                  down: '35%+',
                  approval: '30%+',
                  color: 'red',
                  notes: 'Case-by-case basis. Requires exceptional compensating factors.'
                },
              ].map((tier, idx) => (
                <div key={idx} className={`bg-dark-900/50 rounded-xl border ${
                  tier.color === 'green' ? 'border-green-600/30' :
                  tier.color === 'yellow' ? 'border-yellow-600/30' :
                  tier.color === 'red' ? 'border-red-600/30' :
                  'border-primary-600/30'
                } p-6`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`text-2xl font-bold ${
                        tier.color === 'green' ? 'text-green-400' :
                        tier.color === 'yellow' ? 'text-yellow-400' :
                        tier.color === 'red' ? 'text-red-400' :
                        'text-primary-400'
                      }`}>{tier.range}</div>
                      <div className="text-gray-400 text-sm">{tier.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{tier.rate}</div>
                      <div className="text-gray-400 text-sm">Rate Range</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-400">Down Payment</div>
                      <div className="text-white font-semibold">{tier.down}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Approval Rate</div>
                      <div className="text-white font-semibold">{tier.approval}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{tier.notes}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How Credit Score Affects Your Loan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  factor: 'Interest Rate',
                  impact: 'Huge Impact',
                  details: 'Every 20 points = ~0.25-0.50% rate difference. 740 vs 640 = 1.5-2.0% rate difference.',
                  example: '740 score: 6.0% | 640 score: 7.75%'
                },
                {
                  factor: 'Down Payment',
                  impact: 'High Impact',
                  details: 'Lower scores require larger down payments. 700+ can do 20%, 620-699 typically need 25-30%.',
                  example: '740 score: 20% | 640 score: 30%'
                },
                {
                  factor: 'Approval Odds',
                  impact: 'High Impact',
                  details: 'Higher scores approve easier. Lower scores need compensating factors (high DSCR, large down).',
                  example: '740 score: 95% approval | 640 score: 65% approval'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">{item.factor}</h3>
                  <div className="text-yellow-400 text-sm font-semibold mb-3">{item.impact}</div>
                  <p className="text-gray-300 text-sm mb-3">{item.details}</p>
                  <div className="text-xs text-gray-400 bg-dark-800 rounded p-2">{item.example}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real Cost Comparison</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
              <p className="text-gray-300 mb-6">
                Same property, different credit scores. See how much credit score impacts your monthly payment:
              </p>
              <div className="space-y-4">
                {[
                  { score: '740', rate: '6.00%', payment: '$2,398', total: '$863,280', savings: '$0' },
                  { score: '700', rate: '6.50%', payment: '$2,528', total: '$909,936', savings: '-$46,656' },
                  { score: '680', rate: '7.00%', payment: '$2,661', total: '$957,960', savings: '-$94,680' },
                  { score: '660', rate: '7.50%', payment: '$2,797', total: '$1,006,920', savings: '-$143,640' },
                  { score: '640', rate: '8.00%', payment: '$2,935', total: '$1,056,600', savings: '-$193,320' },
                  { score: '620', rate: '8.50%', payment: '$3,076', total: '$1,107,360', savings: '-$244,080' },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${
                    idx === 0 ? 'bg-green-600/10 border border-green-600/30' : 'bg-dark-800'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${idx === 0 ? 'text-green-400' : 'text-white'}`}>{item.score}</div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{item.rate} APR</div>
                        <div className="text-gray-400 text-sm">30-year fixed</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{item.payment}/mo</div>
                      <div className="text-xs text-gray-400">{item.total} total</div>
                      {idx > 0 && <div className="text-red-400 text-xs font-semibold">{item.savings}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
                <p className="text-yellow-400 font-semibold mb-1">💡 120-Point Difference = $244K More in Interest</p>
                <p className="text-sm text-gray-300">
                  Improving credit from 620 to 740 saves $678/month and $244,080 over 30 years on a $400K loan.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How to Improve Your Score</h2>
            <div className="bg-gradient-to-br from-primary-600/5 to-primary-700/5 border border-primary-600/20 rounded-xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Quick Wins (30-60 days):
                  </h3>
                  <ul className="text-gray-300 space-y-1 text-sm ml-6">
                    <li>• Pay down credit cards below 30% utilization (+20-30 points)</li>
                    <li>• Dispute any errors on credit reports (+10-50 points)</li>
                    <li>• Become authorized user on spouse/parent's old card (+10-20 points)</li>
                    <li>• Pay off small collections under $500 (+10-15 points)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Medium-Term (3-6 months):</h3>
                  <ul className="text-gray-300 space-y-1 text-sm ml-6">
                    <li>• Make all payments on time (no late payments!)</li>
                    <li>• Don't apply for new credit (hard inquiries drop score)</li>
                    <li>• Keep old accounts open (length of history matters)</li>
                    <li>• Target 10% credit utilization or less</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Long-Term (6-12 months):</h3>
                  <ul className="text-gray-300 space-y-1 text-sm ml-6">
                    <li>• 12+ months perfect payment history</li>
                    <li>• Diversify credit mix (installment + revolving)</li>
                    <li>• Consider credit repair service if needed</li>
                    <li>• Target 740+ for maximum savings</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Check Your Rate</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get a custom rate quote based on your actual credit score. Soft pull won't affect your credit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Get My Rate - 620+ Welcome
                </Link>
                <PhoneButton phone="+19493393555" className="btn-secondary">
                  Call (949) 339-3555
                </PhoneButton>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Related Questions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { q: 'DSCR loan with bad credit (620)', url: '/faq/dscr-loan-bad-credit' },
                { q: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements' },
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
              name: 'What credit score do I need for a DSCR loan?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Minimum 620 credit score for DSCR loans. 640-679 gets good rates (7.0-8.0%). 680-699 gets great rates (6.5-7.5%). 700+ gets best rates starting at 5.99%. 740+ gets absolute best terms with 20% down. Lower scores require larger down payments (25-30%) but approval is still possible. Some lenders accept 600-619 with strong compensating factors like 35% down and 1.25+ DSCR.'
              }
            }
          })
        }}
      />
    </div>
  );
}
