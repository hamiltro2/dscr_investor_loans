import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What is a Good DSCR Ratio? 1.25+ is Ideal | Capital Bridge',
  description: '1.25+ is ideal DSCR ratio. 1.0-1.24 is good. Below 1.0 is negative cash flow. Learn what lenders want, how to improve your DSCR, and qualification thresholds.',
};

export default function WhatIsGoodDSCRRatioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">What is a Good DSCR Ratio?</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>1.25 or higher is an ideal DSCR ratio.</strong> 1.0-1.24 is good (qualifies most lenders).
            0.75-0.99 is borderline (possible with compensating factors). Below 0.75 is poor (hard to finance).
            <strong>1.0 minimum</strong> means rent exactly covers debt. Higher ratios get better rates and terms.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          What is a Good DSCR Ratio?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Rating Scale</h2>
            <div className="space-y-4">
              {[
                {
                  ratio: '1.50+',
                  grade: 'A+',
                  rating: 'Exceptional',
                  details: 'Property generates 50%+ more income than debt payments. Banks compete for this deal.',
                  approval: '99%',
                  rate: 'Best Available',
                  color: 'green',
                  example: '$4,500 rent ÷ $3,000 debt = 1.50'
                },
                {
                  ratio: '1.35-1.49',
                  grade: 'A',
                  rating: 'Excellent',
                  details: 'Strong cash flow cushion. Qualifies easily with top-tier rates and minimal documentation.',
                  approval: '95%',
                  rate: '5.5-6.49%',
                  color: 'green',
                  example: '$4,200 rent ÷ $3,000 debt = 1.40'
                },
                {
                  ratio: '1.25-1.34',
                  grade: 'B+',
                  rating: 'Very Good',
                  details: 'Ideal DSCR for most investors. Meets or exceeds most lender requirements. Excellent approval odds.',
                  approval: '90%',
                  rate: '6.25-6.99%',
                  color: 'green',
                  example: '$3,900 rent ÷ $3,000 debt = 1.30'
                },
                {
                  ratio: '1.10-1.24',
                  grade: 'B',
                  rating: 'Good',
                  details: 'Decent cash flow. Approved by most lenders with standard terms. May need 25% down.',
                  approval: '80%',
                  rate: '6.50-7.49%',
                  color: 'primary',
                  example: '$3,500 rent ÷ $3,000 debt = 1.17'
                },
                {
                  ratio: '1.00-1.09',
                  grade: 'C+',
                  rating: 'Acceptable',
                  details: 'Break-even or slight positive cash flow. Approved but requires compensating factors (high credit, large down).',
                  approval: '65%',
                  rate: '7.00-8.00%',
                  color: 'primary',
                  example: '$3,200 rent ÷ $3,000 debt = 1.07'
                },
                {
                  ratio: '0.85-0.99',
                  grade: 'C',
                  rating: 'Below Break-Even',
                  details: 'Property loses money monthly. Some lenders accept with 30-35% down and strong credit (700+).',
                  approval: '40%',
                  rate: '8.00-9.00%',
                  color: 'yellow',
                  example: '$2,900 rent ÷ $3,000 debt = 0.97'
                },
                {
                  ratio: '0.75-0.84',
                  grade: 'D',
                  rating: 'Poor',
                  details: 'Significant negative cash flow. Very hard to finance. Requires exceptional compensating factors.',
                  approval: '20%',
                  rate: '9.00-10.5%',
                  color: 'red',
                  example: '$2,400 rent ÷ $3,000 debt = 0.80'
                },
                {
                  ratio: 'Below 0.75',
                  grade: 'F',
                  rating: 'Very Poor',
                  details: 'Severely negative. Almost impossible to finance. Consider improving property income or reducing purchase price.',
                  approval: '5%',
                  rate: 'Special Pricing',
                  color: 'red',
                  example: '$2,000 rent ÷ $3,000 debt = 0.67'
                },
              ].map((tier, idx) => (
                <div key={idx} className={`bg-dark-900/50 rounded-xl border-2 ${tier.color === 'green' ? 'border-green-600/30' :
                    tier.color === 'yellow' ? 'border-yellow-600/30' :
                      tier.color === 'red' ? 'border-red-600/30' :
                        'border-primary-600/30'
                  } p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`text-3xl font-bold ${tier.color === 'green' ? 'text-green-400' :
                            tier.color === 'yellow' ? 'text-yellow-400' :
                              tier.color === 'red' ? 'text-red-400' :
                                'text-primary-400'
                          }`}>{tier.ratio}</div>
                        <div className="text-2xl font-bold text-gray-400">{tier.grade}</div>
                      </div>
                      <div className="text-white font-semibold text-lg">{tier.rating}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Approval Rate</div>
                      <div className={`text-2xl font-bold ${tier.color === 'green' ? 'text-green-400' :
                          tier.color === 'yellow' ? 'text-yellow-400' :
                            tier.color === 'red' ? 'text-red-400' :
                              'text-primary-400'
                        }`}>{tier.approval}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-3">{tier.details}</p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Expected Rate: </span>
                      <span className="text-white font-semibold">{tier.rate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Example: </span>
                      <span className="text-white font-mono text-xs">{tier.example}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why 1.25 is the "Sweet Spot"</h2>
            <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
              <div className="space-y-4 text-gray-300">
                <p>
                  Most lenders consider <strong className="text-primary-400">1.25 DSCR as ideal</strong> because:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Lender Perspective:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>25% cushion protects against rent drops</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Covers 2-3 months vacancy per year</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Room for unexpected repairs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>Lower default risk</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Investor Benefit:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-0.5">✓</span>
                        <span>Best interest rates (5.5-6.99%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-0.5">✓</span>
                        <span>20-25% down accepted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-0.5">✓</span>
                        <span>Fast approval process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-400 mt-0.5">✓</span>
                        <span>Actual positive cash flow</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                  <p className="text-green-400 font-semibold">Real Example: 1.25 DSCR</p>
                  <p className="text-sm mt-2">
                    $3,750 monthly rent ÷ $3,000 debt = 1.25 DSCR<br />
                    = $750/month positive cash flow<br />
                    = $9,000/year profit before other expenses<br />
                    = Qualifies easily with 6.25% rate
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How to Improve Your DSCR</h2>
            <div className="space-y-4">
              {[
                {
                  method: 'Increase Rental Income',
                  strategies: [
                    'Raise rent to market rates (use Zillow/Rentometer)',
                    'Add amenities: washer/dryer, parking, storage',
                    'Short-term rental (Airbnb) often generates more',
                    'Add bedrooms/bathrooms through renovation'
                  ],
                  impact: '+0.10 to +0.30 DSCR'
                },
                {
                  method: 'Reduce Purchase Price',
                  strategies: [
                    'Negotiate seller down 5-10%',
                    'Target undervalued properties',
                    'Buy in up-and-coming areas',
                    'Consider properties needing cosmetic work'
                  ],
                  impact: '+0.05 to +0.20 DSCR'
                },
                {
                  method: 'Increase Down Payment',
                  strategies: [
                    'Put down 30% instead of 20-25%',
                    'Lower loan amount = lower monthly payment',
                    'Reduces principal & interest portion',
                    'Improves approval odds even if DSCR stays low'
                  ],
                  impact: '+0.10 to +0.15 DSCR'
                },
                {
                  method: 'Get a Better Interest Rate',
                  strategies: [
                    'Improve credit score to 740+',
                    'Shop multiple lenders',
                    'Consider buying down rate with points',
                    'Time purchase during rate dips'
                  ],
                  impact: '+0.02 to +0.08 DSCR'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{item.method}</h3>
                      <div className="text-sm text-green-400 font-semibold mb-3">Potential Impact: {item.impact}</div>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {item.strategies.map((strategy, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-primary-400 mt-0.5">•</span>
                            <span>{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real Examples Across DSCR Spectrum</h2>
            <div className="space-y-6">
              <div className="bg-green-900/10 border border-green-600/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">✓ Great Deal: 1.45 DSCR</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <div>Property: $450K purchase</div>
                    <div>Monthly Rent: $4,200</div>
                    <div>Mortgage: $2,494 (P&I)</div>
                    <div>Taxes: $300</div>
                    <div>Insurance: $150</div>
                    <div>HOA: $0</div>
                  </div>
                  <div>
                    <div>Total Debt: $2,944</div>
                    <div className="font-semibold text-green-400 text-lg my-2">DSCR: 1.45</div>
                    <div>Cash Flow: +$1,326/mo</div>
                    <div>Rate: 6.25%</div>
                    <div className="text-green-400 font-semibold">Approved easily</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-900/10 border border-primary-600/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">⚠ Borderline: 1.05 DSCR</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <div>Property: $500K purchase</div>
                    <div>Monthly Rent: $3,300</div>
                    <div>Mortgage: $2,765 (P&I)</div>
                    <div>Taxes: $350</div>
                    <div>Insurance: $180</div>
                    <div>HOA: $150</div>
                  </div>
                  <div>
                    <div>Total Debt: $3,145</div>
                    <div className="font-semibold text-primary-400 text-lg my-2">DSCR: 1.05</div>
                    <div>Cash Flow: +$155/mo</div>
                    <div>Rate: 7.50%</div>
                    <div className="text-yellow-400 font-semibold">Needs 30% down, 700+ credit</div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/10 border border-red-600/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">✗ Weak Deal: 0.90 DSCR</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <div>Property: $550K purchase</div>
                    <div>Monthly Rent: $3,100</div>
                    <div>Mortgage: $3,042 (P&I)</div>
                    <div>Taxes: $400</div>
                    <div>Insurance: $200</div>
                    <div>HOA: $200</div>
                  </div>
                  <div>
                    <div>Total Debt: $3,842</div>
                    <div className="font-semibold text-red-400 text-lg my-2">DSCR: 0.81</div>
                    <div>Cash Flow: -$742/mo loss</div>
                    <div>Rate: 9.0%+</div>
                    <div className="text-red-400 font-semibold">Very hard to finance</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Calculate Your DSCR Now</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                See if your property hits the 1.25 sweet spot. Get instant DSCR calculation and qualification status.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/calculators/dscr" className="btn-primary">
                  Calculate DSCR
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
                { q: 'How to calculate DSCR?', url: '/faq/calculate-dscr-rental-property' },
                { q: 'What is DSCR in real estate?', url: '/faq/what-is-dscr-in-real-estate' },
                { q: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements' },
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
              name: 'What is a good DSCR ratio?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '1.25 or higher is an ideal DSCR ratio. 1.0-1.24 is good and qualifies with most lenders. 0.75-0.99 is borderline (possible with compensating factors like high credit and large down payment). Below 0.75 is poor and very hard to finance. 1.0 minimum means rent exactly covers debt. Higher ratios (1.35+) get best rates and approval odds. Most lenders prefer 1.25+ for optimal terms.'
              }
            }
          })
        }}
      />
    </div>
  );
}
