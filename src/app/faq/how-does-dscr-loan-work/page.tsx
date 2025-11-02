import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Does a DSCR Loan Work? Step-by-Step Guide 2025',
  description: 'Learn exactly how DSCR loans work: qualification process, calculation formula, and approval steps. Get pre-approved in 24-48 hours with rates starting at 5.99%.',
};

export default function HowDoesDSCRLoanWorkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">How Does a DSCR Loan Work?</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            A DSCR loan works by qualifying you based on the property's rental income instead of your personal income. 
            The lender calculates if the monthly rent covers the mortgage payment (PITI) plus HOA fees. 
            A DSCR ratio of 1.0 or higher (rent ≥ debt) typically qualifies. No tax returns, W-2s, or employment verification required.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          How Does a DSCR Loan Work?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The DSCR Loan Process: Step-by-Step</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Property Income Assessment',
                  content: 'The lender determines the property\'s monthly rental income using a market rent analysis, existing lease, or projected Airbnb income. No need to verify YOUR income.'
                },
                {
                  step: '2',
                  title: 'Calculate Monthly Debt Payment',
                  content: 'Add up all monthly costs: mortgage payment (principal, interest, taxes, insurance) + HOA fees + any other property-related debt.'
                },
                {
                  step: '3',
                  title: 'DSCR Calculation',
                  content: 'Divide monthly rent by monthly debt payment. Example: $3,000 rent ÷ $2,500 debt = 1.20 DSCR (property cash flows 20% above break-even).'
                },
                {
                  step: '4',
                  title: 'Credit & Down Payment Review',
                  content: 'Lender reviews credit score (620+ required) and down payment (20-25%). No income documentation needed.'
                },
                {
                  step: '5',
                  title: 'Approval & Closing',
                  content: 'Get pre-approved in 24-48 hours, close in 7-14 days. Much faster than traditional loans due to no income verification.'
                },
              ].map((item) => (
                <div key={item.step} className="bg-dark-900/50 rounded-xl p-6 border border-dark-800">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-400">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR Calculation Formula</h2>
            <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="text-2xl font-mono text-primary-400 mb-4">
                  DSCR = Monthly Rental Income ÷ Total Monthly Debt
                </div>
              </div>
              
              <div className="bg-dark-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Real Example:</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between pb-2 border-b border-dark-700">
                    <span>Monthly Rent:</span>
                    <span className="text-white font-semibold">$4,200</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-700">
                    <span>Mortgage Payment (P&I):</span>
                    <span>$2,800</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-700">
                    <span>Property Tax:</span>
                    <span>$350</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-700">
                    <span>Insurance:</span>
                    <span>$180</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-700">
                    <span>HOA:</span>
                    <span>$120</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-3">
                    <span>Total Monthly Debt:</span>
                    <span className="text-primary-400">$3,450</span>
                  </div>
                  <div className="flex justify-between font-bold text-2xl pt-4 border-t-2 border-primary-600">
                    <span>DSCR:</span>
                    <span className="text-primary-400">1.22</span>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                  <p className="text-green-400 font-semibold">✓ APPROVED</p>
                  <p className="text-sm text-gray-300 mt-1">
                    DSCR of 1.22 means the property generates 22% more income than debt payments. This qualifies for most DSCR loan programs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Makes DSCR Loans Different?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl p-6 border border-dark-800">
                <h3 className="text-xl font-semibold text-red-400 mb-4">✗ Traditional Mortgage</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✗ Requires 2 years tax returns</li>
                  <li>✗ Needs W-2s and pay stubs</li>
                  <li>✗ Employment verification required</li>
                  <li>✗ Debt-to-income ratio calculated</li>
                  <li>✗ 30-45 day closing process</li>
                  <li>✗ Limited to 10 financed properties</li>
                </ul>
              </div>
              <div className="bg-dark-900/50 rounded-xl p-6 border border-primary-800">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">✓ DSCR Loan</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ No tax returns needed</li>
                  <li>✓ No W-2s or pay stubs</li>
                  <li>✓ No employment verification</li>
                  <li>✓ Only property income matters</li>
                  <li>✓ 7-14 day closing possible</li>
                  <li>✓ Unlimited financed properties</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Calculate Your DSCR Now</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Use our free DSCR calculator to see if you qualify. Get instant results and pre-approval in 24-48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/calculators/dscr" className="btn-primary flex items-center justify-center gap-2">
                  <Calculator className="w-4 h-4" />
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
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
                { q: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements' },
                { q: 'What is a good DSCR ratio?', url: '/faq/what-is-good-dscr-ratio' },
                { q: 'How to calculate DSCR?', url: '/faq/calculate-dscr-rental-property' },
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
              name: 'How does a DSCR loan work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A DSCR loan works by qualifying you based on the property\'s rental income instead of your personal income. The lender calculates the Debt Service Coverage Ratio by dividing monthly rent by monthly debt payments (mortgage PITI + HOA). A ratio of 1.0 or higher typically qualifies. No tax returns, W-2s, or employment verification required. Approval in 24-48 hours, close in 7-14 days.'
              }
            }
          })
        }}
      />
    </div>
  );
}
