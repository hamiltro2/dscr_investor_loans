import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DSCR Loans for Self-Employed: No Tax Returns | Capital Bridge',
  description: 'Self-employed? Get a DSCR loan with NO tax returns, W-2s, or income verification. Qualify based on property income, not business write-offs. 620 credit, 5.5% rates.',
};

export default function DSCRLoanSelfEmployedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">DSCR Loans for Self-Employed</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>DSCR loans are perfect for self-employed borrowers</strong> because they require <strong>NO tax returns, W-2s, or income verification.</strong>
            You qualify based on the rental property's income, not your business income.
            This means tax write-offs and business expenses don't hurt you. 620 credit minimum, rates start at 5.5%, approval in 24-48 hours.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          DSCR Loans for Self-Employed Borrowers
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Self-Employed Struggle with Traditional Loans</h2>
            <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">The Self-Employed Problem:</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">You make $200K/year,</strong> but after business write-offs,
                  your tax returns show only $50K net income. Traditional lenders see you as a $50K earner and deny your loan.
                </p>
                <div className="bg-dark-900/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Gross Business Income:</span>
                    <span className="text-white font-semibold">$200,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Business Expenses:</span>
                    <span>-$80,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Depreciation:</span>
                    <span>-$40,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Other Write-offs:</span>
                    <span>-$30,000</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-dark-700">
                    <span>Net Income (on tax return):</span>
                    <span className="text-red-400">$50,000</span>
                  </div>
                </div>
                <p className="text-red-400 font-semibold">
                  ✗ Traditional lender: "You don't make enough money. Denied."
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How DSCR Loans Solve This</h2>
            <div className="bg-green-900/10 border border-green-800/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-400 mb-4">The DSCR Solution:</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">DSCR lenders don't care about your tax returns.</strong> They only care if the
                  rental property makes enough money to cover its own mortgage.
                </p>
                <div className="bg-dark-900/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="text-white font-semibold">$4,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Mortgage (PITI):</span>
                    <span>$3,200</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-dark-700">
                    <span>DSCR Ratio:</span>
                    <span className="text-green-400">1.25</span>
                  </div>
                </div>
                <p className="text-green-400 font-semibold">
                  ✓ DSCR lender: "Property cash flows. Approved at 5.5%."
                </p>
                <p className="text-sm">
                  <strong>Your business income, tax returns, and write-offs are irrelevant.</strong> Only the property's income matters.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Who Benefits Most from DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Business Owners',
                  icon: <Briefcase className="w-6 h-6 text-primary-400" />,
                  description: 'Write off everything legally possible. Tax returns show minimal income but you actually earn well.'
                },
                {
                  title: 'Independent Contractors',
                  icon: <Briefcase className="w-6 h-6 text-primary-400" />,
                  description: '1099 income that fluctuates. Traditional banks can\'t figure out your "real" income.'
                },
                {
                  title: 'Real Estate Agents',
                  icon: <Briefcase className="w-6 h-6 text-primary-400" />,
                  description: 'Commission-based income varies wildly. Plus you write off car, phone, marketing, etc.'
                },
                {
                  title: 'Freelancers/Consultants',
                  icon: <Briefcase className="w-6 h-6 text-primary-400" />,
                  description: 'Project-based work. Traditional lenders want "stable" income for 2+ years.'
                },
                {
                  title: 'E-commerce Sellers',
                  icon: <Briefcase className="w-6 h-6 text-primary-400" />,
                  description: 'Amazon/Shopify sellers with lots of business expenses reducing taxable income.'
                },
                {
                  title: 'Multiple LLCs',
                  icon: <Briefcase className="w-6 h-6 text-primary-400" />,
                  description: 'Income spread across multiple entities. Too complex for traditional underwriters.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Requirements for Self-Employed</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">✓ What You NEED:</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li>• 620+ credit score</li>
                    <li>• 20-25% down payment</li>
                    <li>• Investment property with rental income</li>
                    <li>• DSCR of 1.0+ (rent covers mortgage)</li>
                    <li>• Government-issued ID</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-dark-700">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">✓ What You DON'T NEED:</h3>
                  <ul className="space-y-2 text-gray-300 ml-4">
                    <li>• Tax returns (personal or business)</li>
                    <li>• W-2s or 1099s</li>
                    <li>• Profit & loss statements</li>
                    <li>• Business bank statements</li>
                    <li>• Employment verification</li>
                    <li>• Debt-to-income calculation</li>
                    <li>• Explanation of business expenses</li>
                    <li>• CPA letter or financial statements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real Example: Business Owner Approval</h2>
            <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
              <div className="space-y-4 text-gray-300">
                <div><strong className="text-white">Borrower:</strong> Self-employed consultant, multiple LLCs</div>
                <div><strong className="text-white">Actual Income:</strong> ~$180K/year</div>
                <div><strong className="text-white">Tax Return Shows:</strong> $45K (after write-offs)</div>
                <div><strong className="text-white">Credit Score:</strong> 690</div>
                <div className="pt-4 border-t border-dark-700">
                  <div><strong className="text-white">Property:</strong> $500K single-family rental</div>
                  <div><strong className="text-white">Monthly Rent:</strong> $4,200</div>
                  <div><strong className="text-white">Down Payment:</strong> 25% ($125K)</div>
                  <div><strong className="text-white">DSCR:</strong> 1.32</div>
                </div>
                <div className="pt-4 border-t border-dark-700">
                  <div className="text-green-400 font-semibold mb-2">✓ APPROVED</div>
                  <div><strong className="text-white">Rate:</strong> 6.75%</div>
                  <div><strong className="text-white">Loan Amount:</strong> $375,000</div>
                  <div><strong className="text-white">Time to Approval:</strong> 36 hours</div>
                </div>
                <div className="mt-4 p-4 bg-green-600/10 rounded-lg text-sm">
                  <strong className="text-green-400">Why it worked:</strong> Lender never saw tax returns. Only cared that property generated $4,200/month rent.
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">DSCR vs Bank Statement Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-xl font-semibold text-yellow-400 mb-4">Bank Statement Loan</h3>
                <div className="space-y-3 text-gray-300 text-sm mb-4">
                  <div>Qualification: 12-24 months business bank statements</div>
                  <div>Calculates: Average deposits as "income"</div>
                  <div>Rate: 6.5-8.5%</div>
                  <div>Down: 15-20%</div>
                </div>
                <div className="text-sm space-y-1">
                  <div>⚠ Still analyzes your business income</div>
                  <div>⚠ Requires bank statements (privacy concern)</div>
                  <div>✓ Slightly lower rates</div>
                </div>
              </div>

              <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">DSCR Loan (Better)</h3>
                <div className="space-y-3 text-gray-300 text-sm mb-4">
                  <div>Qualification: Property rental income only</div>
                  <div>Calculates: Rent ÷ mortgage payment</div>
                  <div>Rate: 5.5-9.5%</div>
                  <div>Down: 20-25%</div>
                </div>
                <div className="text-sm space-y-1">
                  <div>✓ Zero business documentation</div>
                  <div>✓ Complete financial privacy</div>
                  <div>✓ Faster approval (24-48 hours)</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Apply as Self-Employed</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                No tax returns, W-2s, or income verification. Get pre-approved in 24-48 hours based purely on property income.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Get Pre-Approved - No Tax Returns
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
                { q: 'Do DSCR loans require tax returns?', url: '/faq/do-dscr-loans-require-tax-returns' },
                { q: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan' },
                { q: 'Current DSCR loan rates', url: '/faq/current-dscr-loan-rates' },
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
              name: 'Can self-employed borrowers get DSCR loans?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! DSCR loans are perfect for self-employed borrowers because they require NO tax returns, W-2s, or income verification. You qualify based on the rental property\'s income, not your business income. This means tax write-offs and business expenses don\'t hurt you. 620 credit minimum, rates start at 5.5%, approval in 24-48 hours. Ideal for business owners, contractors, freelancers, and anyone with complex income.'
              }
            }
          })
        }}
      />
    </div>
  );
}
