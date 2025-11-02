import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Calculate DSCR for Rental Property | Free Calculator',
  description: 'DSCR formula: Monthly Rent ÷ (Mortgage + Taxes + Insurance + HOA). Step-by-step guide with examples. 1.0+ qualifies. Free calculator included.',
};

export default function CalculateDSCRRentalPropertyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">Calculate DSCR for Rental Property</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>DSCR = Monthly Rent ÷ Total Monthly Debt</strong> where debt = mortgage (PITI) + HOA + other property debt. 
            Example: $3,500 rent ÷ $2,800 debt = 1.25 DSCR. A ratio of 1.0+ means property cash flows. 
            1.25+ qualifies easily. Below 1.0 means negative cash flow.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          How to Calculate DSCR for Rental Property
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">3-Step DSCR Calculation</h2>
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Determine Monthly Rental Income',
                  items: [
                    'Use current lease amount if property is rented',
                    'Get market rent analysis from lender or Zillow/Rentometer',
                    'For Airbnb: Use projected monthly income from AirDNA',
                    'Do NOT subtract vacancy or expenses - lenders use gross rent'
                  ]
                },
                {
                  step: '2',
                  title: 'Calculate Total Monthly Debt Payment',
                  items: [
                    'Principal & Interest (P&I) - mortgage payment',
                    'Property Taxes (monthly amount)',
                    'Insurance (monthly amount)',
                    'HOA Fees (if applicable)',
                    'Any other property debt (2nd mortgage, etc.)'
                  ]
                },
                {
                  step: '3',
                  title: 'Divide Rent by Debt',
                  items: [
                    'DSCR = Monthly Rent ÷ Total Monthly Debt',
                    'Round to 2 decimal places',
                    '1.0 or higher = Property cash flows',
                    'Below 1.0 = Property loses money monthly'
                  ]
                }
              ].map((section) => (
                <div key={section.step} className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-400">{section.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-primary-400 mt-0.5">•</span>
                            <span>{item}</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">Complete Example</h2>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Property: 4-bed Single-Family in Phoenix</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-lg font-semibold text-primary-400 mb-3">Step 1: Monthly Rental Income</div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white mb-1">$3,800/month</div>
                    <div className="text-sm text-gray-400">(Based on current lease)</div>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-semibold text-primary-400 mb-3">Step 2: Calculate Monthly Debt</div>
                  <div className="bg-dark-900/50 rounded-lg p-4 space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Purchase Price:</span>
                      <span className="text-white">$500,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Down Payment (25%):</span>
                      <span className="text-white">$125,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="text-white">$375,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span className="text-white">7.0%</span>
                    </div>
                    <div className="h-px bg-dark-700 my-3"></div>
                    <div className="flex justify-between">
                      <span>Principal & Interest:</span>
                      <span className="text-white">$2,494</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Property Taxes:</span>
                      <span className="text-white">$350</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span className="text-white">$180</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HOA Fees:</span>
                      <span className="text-white">$125</span>
                    </div>
                    <div className="h-px bg-dark-700 my-3"></div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Monthly Debt:</span>
                      <span className="text-primary-400">$3,149</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-lg font-semibold text-primary-400 mb-3">Step 3: Calculate DSCR</div>
                  <div className="bg-primary-600/10 border border-primary-600/30 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-mono text-white mb-2">
                        $3,800 ÷ $3,149 = <span className="text-primary-400">1.21</span>
                      </div>
                      <div className="text-sm text-gray-400">DSCR Ratio</div>
                    </div>
                    <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                      <div className="text-green-400 font-semibold mb-2">✓ QUALIFIES FOR DSCR LOAN</div>
                      <div className="text-sm text-gray-300 space-y-1">
                        <div>• Property generates 21% more income than debt</div>
                        <div>• Monthly cash flow: $651 positive</div>
                        <div>• Meets 1.0 minimum requirement</div>
                        <div>• Qualifies for competitive rates</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Interpretation Guide</h2>
            <div className="space-y-4">
              {[
                { range: '1.50+', meaning: 'Exceptional', details: 'Property generates 50%+ more than debt. Banks love this.', color: 'green' },
                { range: '1.25-1.49', meaning: 'Excellent', details: 'Strong cash flow cushion. Qualifies easily with best terms.', color: 'green' },
                { range: '1.10-1.24', meaning: 'Good', details: 'Decent cash flow. Most lenders approve with standard terms.', color: 'primary' },
                { range: '1.00-1.09', meaning: 'Acceptable', details: 'Barely breaks even. Approved but may need compensating factors.', color: 'primary' },
                { range: '0.85-0.99', meaning: 'Below Breakeven', details: 'Property loses money. Some lenders accept with high down payment.', color: 'yellow' },
                { range: 'Below 0.85', meaning: 'Poor', details: 'Significant loss. Very hard to finance without special programs.', color: 'red' },
              ].map((item, idx) => (
                <div key={idx} className={`bg-dark-900/50 rounded-xl border ${
                  item.color === 'green' ? 'border-green-600/30' :
                  item.color === 'yellow' ? 'border-yellow-600/30' :
                  item.color === 'red' ? 'border-red-600/30' :
                  'border-primary-600/30'
                } p-5`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'yellow' ? 'text-yellow-400' :
                        item.color === 'red' ? 'text-red-400' :
                        'text-primary-400'
                      }`}>{item.range}</div>
                      <div className="text-white font-semibold mt-1">{item.meaning}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{item.details}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Common Mistakes to Avoid</h2>
            <div className="space-y-4">
              {[
                {
                  mistake: 'Subtracting vacancy or expenses from rent',
                  correct: 'Use GROSS monthly rent. Lenders don\'t subtract anything.'
                },
                {
                  mistake: 'Forgetting HOA fees in debt calculation',
                  correct: 'Always include HOA in total debt if property has HOA.'
                },
                {
                  mistake: 'Using annual numbers instead of monthly',
                  correct: 'DSCR must be calculated with monthly numbers only.'
                },
                {
                  mistake: 'Not including property taxes or insurance',
                  correct: 'Always use PITI (Principal, Interest, Taxes, Insurance).'
                },
                {
                  mistake: 'Using your estimate instead of market rent',
                  correct: 'Lenders require official market rent analysis or actual lease.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-red-400 text-xl">✗</span>
                    <div className="text-white font-semibold">{item.mistake}</div>
                  </div>
                  <div className="flex items-start gap-3 ml-8">
                    <span className="text-green-400 text-xl">✓</span>
                    <div className="text-gray-300 text-sm">{item.correct}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Use Our Free DSCR Calculator</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Calculate your property's DSCR instantly. Enter property details and get immediate results with qualification status.
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
                { q: 'What is DSCR in real estate?', url: '/faq/what-is-dscr-in-real-estate' },
                { q: 'What is a good DSCR ratio?', url: '/faq/what-is-good-dscr-ratio' },
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
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
              name: 'How to calculate DSCR for rental property?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'DSCR = Monthly Rent ÷ Total Monthly Debt. Total debt includes mortgage (PITI) + HOA + other property debt. Example: $3,800 rent ÷ $3,149 debt = 1.21 DSCR. A ratio of 1.0+ means property cash flows. 1.25+ qualifies easily for DSCR loans. Below 1.0 means negative cash flow. Use gross rent (don\'t subtract vacancy or expenses).'
              }
            }
          })
        }}
      />
    </div>
  );
}
