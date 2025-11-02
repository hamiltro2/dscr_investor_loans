import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, XCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Do DSCR Loans Require Tax Returns? NO! | Capital Bridge Solutions',
  description: 'No! DSCR loans do NOT require tax returns, W-2s, or income verification. Qualify based on property income only. Perfect for self-employed with 620 credit, 5.99% rates.',
};

export default function DoDSCRLoansRequireTaxReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/faq" className="hover:text-primary-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            FAQ
          </Link>
          <span>/</span>
          <span className="text-gray-300">Do DSCR Loans Require Tax Returns?</span>
        </nav>

        <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-primary-300 mb-3">Quick Answer</h2>
          <p className="text-white text-lg leading-relaxed">
            <strong>NO! DSCR loans do NOT require tax returns.</strong> No 1040s, Schedule E, W-2s, pay stubs, or income verification needed. 
            You qualify based solely on the property's rental income. This makes DSCR loans perfect for self-employed borrowers, 
            business owners, and anyone who doesn't want to share tax returns with lenders.
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Do DSCR Loans Require Tax Returns?
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <div className="bg-green-900/10 border-2 border-green-600/30 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-3xl font-bold text-green-400 mb-4">NO TAX RETURNS REQUIRED</h2>
              <p className="text-xl text-gray-300 mb-6">
                This is the #1 benefit of DSCR loans. Zero tax documentation needed.
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-dark-900/50 rounded-lg p-4 text-left">
                  <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                    <XCircle className="w-5 h-5" />
                    Not Required:
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Personal tax returns (1040)</li>
                    <li>• Business tax returns</li>
                    <li>• Schedule E (rental income)</li>
                    <li>• W-2 forms</li>
                    <li>• Pay stubs</li>
                    <li>• 1099 forms</li>
                  </ul>
                </div>
                <div className="bg-dark-900/50 rounded-lg p-4 text-left">
                  <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                    <CheckCircle className="w-5 h-5" />
                    What You Need:
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Government-issued ID</li>
                    <li>• Credit check authorization</li>
                    <li>• Property address</li>
                    <li>• Rent amount/lease</li>
                    <li>• Down payment proof</li>
                    <li>• That's it!</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why DSCR Loans Don't Need Tax Returns</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
              <p className="text-gray-300 leading-relaxed mb-6">
                Traditional mortgages qualify you based on <strong>your personal income</strong> (proven through tax returns). 
                DSCR loans qualify you based on <strong>the property's income</strong> (proven through rent analysis).
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-400 mb-3">Traditional Mortgage Logic:</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>"Can YOU afford this payment?"</div>
                    <div>→ Need YOUR tax returns</div>
                    <div>→ Calculate YOUR income</div>
                    <div>→ Check YOUR debt-to-income</div>
                    <div className="pt-2 text-red-400 font-semibold">= Personal income matters</div>
                  </div>
                </div>

                <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">DSCR Loan Logic:</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>"Can the PROPERTY pay for itself?"</div>
                    <div>→ Need PROPERTY rent amount</div>
                    <div>→ Calculate PROPERTY cash flow</div>
                    <div>→ Check rent vs. mortgage</div>
                    <div className="pt-2 text-green-400 font-semibold">= Property income matters</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Who Benefits Most?</h2>
            <div className="space-y-4">
              {[
                {
                  group: 'Self-Employed with High Write-Offs',
                  scenario: 'You make $200K but tax returns show $50K after business deductions. DSCR loan doesn\'t care - only property income matters.',
                  benefit: 'Avoid income verification entirely'
                },
                {
                  group: 'Multiple Business Entities',
                  scenario: 'Income spread across 3 LLCs and S-corps. Too complex for traditional underwriters. DSCR simplifies everything.',
                  benefit: 'No need to explain complex structure'
                },
                {
                  group: 'Privacy-Focused Investors',
                  scenario: 'You don\'t want lenders seeing your personal or business finances. DSCR respects your privacy.',
                  benefit: 'Keep finances private'
                },
                {
                  group: 'Recent Income Changes',
                  scenario: 'Switched from W-2 to 1099 recently. Traditional lenders want 2 years history. DSCR doesn\'t care.',
                  benefit: 'No income history requirements'
                },
                {
                  group: 'Real Estate Professionals',
                  scenario: 'Commission-based income varies monthly. Hard to show "stable" income. Property income is stable.',
                  benefit: 'Volatile income not a problem'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-primary-400 mb-2">{item.group}</h3>
                  <p className="text-gray-300 text-sm mb-2">{item.scenario}</p>
                  <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    {item.benefit}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Complete Documentation List</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  NOT Required
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✗ Personal tax returns (1040)</li>
                  <li>✗ Business tax returns (1065, 1120, 1120S)</li>
                  <li>✗ Schedule E (rental income schedule)</li>
                  <li>✗ W-2 forms</li>
                  <li>✗ Pay stubs</li>
                  <li>✗ Employment verification letter</li>
                  <li>✗ 1099 forms</li>
                  <li>✗ Bank statements</li>
                  <li>✗ Profit & loss statements</li>
                  <li>✗ CPA letter</li>
                  <li>✗ Business financial statements</li>
                  <li>✗ Income verification of any kind</li>
                </ul>
              </div>

              <div className="bg-green-900/10 border border-green-800/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Actually Required
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ Government-issued ID (license/passport)</li>
                  <li>✓ Credit check authorization</li>
                  <li>✓ Property address</li>
                  <li>✓ Purchase contract (if buying)</li>
                  <li>✓ Current lease (if refinancing)</li>
                  <li>✓ Market rent analysis (we can provide)</li>
                  <li>✓ Down payment bank statement</li>
                  <li>✓ Property insurance quote</li>
                </ul>
                <div className="mt-4 p-3 bg-green-600/10 rounded-lg">
                  <p className="text-sm text-green-400 font-semibold">
                    That's it! 8 items vs. 20+ for traditional loans.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real Example: No Tax Returns</h2>
            <div className="bg-dark-900/50 rounded-xl border border-primary-800 p-6">
              <div className="space-y-3 text-gray-300">
                <div><strong className="text-white">Borrower:</strong> Business owner, multiple LLCs</div>
                <div><strong className="text-white">Traditional Bank:</strong> "We need 2 years personal tax returns, 2 years business returns, Schedule E, YTD P&L, explanation of all business expenses..."</div>
                <div className="pt-4 border-t border-dark-700">
                  <div className="text-red-400 mb-2">❌ Borrower: "Too complicated. I'm not doing this."</div>
                </div>
                <div className="pt-4 border-t border-dark-700">
                  <div><strong className="text-white">Capital Bridge Solutions:</strong> "Show us the property address and rent amount."</div>
                  <div className="mt-2"><strong className="text-white">Documents provided:</strong></div>
                  <ul className="text-sm ml-4 mt-1">
                    <li>• Driver's license</li>
                    <li>• Property at 123 Main St, LA</li>
                    <li>• Current lease showing $4,000/month</li>
                    <li>• $100K down payment proof</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-dark-700">
                  <div className="text-green-400 font-semibold mb-2">✓ APPROVED in 36 hours</div>
                  <div>Rate: 6.75% | Loan: $300K | Monthly: $2,950 PITI</div>
                  <div>DSCR: 1.36 | Cash Flow: +$1,050/month</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Common Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "What if I WANT to show my tax returns for a better rate?",
                  a: "DSCR loans don't work that way. Rates are based on credit score, down payment, and DSCR ratio - not income. Showing tax returns won't improve your rate."
                },
                {
                  q: "Will the lender ever ask for tax returns later?",
                  a: "No. DSCR loans are no-doc by design. The lender will never request tax returns during the process or after closing."
                },
                {
                  q: "What if I have multiple rental properties?",
                  a: "Still no tax returns needed. Each property is evaluated independently based on its own rental income."
                },
                {
                  q: "Do I need Schedule E to show existing rental income?",
                  a: "No. We use current leases or market rent analysis - not Schedule E from tax returns."
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-300 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Get Approved Without Tax Returns</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Apply today and skip the tax return hassle. Pre-approval in 24-48 hours with zero income documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">
                  Apply Now - No Tax Returns
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
                { q: 'DSCR loans for self-employed', url: '/faq/dscr-loan-self-employed' },
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
              name: 'Do DSCR loans require tax returns?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'NO! DSCR loans do NOT require tax returns. No 1040s, Schedule E, W-2s, pay stubs, or income verification needed. You qualify based solely on the property\'s rental income. This makes DSCR loans perfect for self-employed borrowers, business owners, and anyone who doesn\'t want to share tax returns. Required documents: ID, credit check authorization, property address, lease/rent amount, and down payment proof.'
              }
            }
          })
        }}
      />
    </div>
  );
}
