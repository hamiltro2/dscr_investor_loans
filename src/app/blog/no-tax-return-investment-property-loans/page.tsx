'use client';

import Link from 'next/link';
import { CheckCircle, XCircle, FileX, TrendingUp, Shield, Clock, DollarSign, AlertCircle, ArrowRight } from 'lucide-react';
import { FAQSection, CTASection } from './faq-cta';

export default function NoTaxReturnLoansPage() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      {/* Hero Section */}
      <section className="relative py-16 border-b border-primary-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary-400">Blog</Link>
              <span>/</span>
              <span className="text-white">No Tax Return Investment Loans</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              No Tax Return Investment Property Loans California
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: September 23, 2024</span>
              <span>•</span>
              <span>11 min read</span>
              <span>•</span>
              <span>By Capital Bridge Solutions Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                California real estate investors are increasingly turning to no tax return investment 
                property loans to expand their portfolios without the hassle of traditional income 
                documentation. Whether you're self-employed, have complex tax situations, or simply 
                value privacy, these innovative loan programs offer a path to property ownership based 
                on the asset's performance, not your personal finances.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <FileX className="w-6 h-6 text-primary-400" />
                  The No Tax Return Advantage
                </h2>
                <p className="text-gray-300">
                  These loans evaluate your investment based on the property's income potential, not your 
                  personal tax returns. Perfect for investors who maximize deductions, have variable income, 
                  or prefer to keep their financial information private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of No Tax Return Loans */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Types of No Tax Return Investment Loans in California
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* DSCR Loans */}
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30">
                <h3 className="text-xl font-bold text-white mb-4">DSCR Loans</h3>
                <p className="text-gray-300 mb-4">Most popular option for rental properties</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Based on rental income vs. expenses</li>
                  <li>✓ No personal income verification</li>
                  <li>✓ 30-year fixed rates available</li>
                  <li>✓ LTV up to 80%</li>
                  <li>✓ Rates from 6.99%</li>
                </ul>
              </div>

              {/* Bank Statement Loans */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Bank Statement Loans</h3>
                <p className="text-gray-300 mb-4">Uses deposits instead of tax returns</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ 12-24 months bank statements</li>
                  <li>✓ Personal or business accounts</li>
                  <li>✓ Good for consistent deposits</li>
                  <li>✓ LTV up to 90%</li>
                  <li>✓ Rates from 7.49%</li>
                </ul>
              </div>

              {/* Asset Depletion Loans */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Asset Depletion Loans</h3>
                <p className="text-gray-300 mb-4">Qualify using liquid assets</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Uses assets as income</li>
                  <li>✓ Retirement accounts eligible</li>
                  <li>✓ No employment needed</li>
                  <li>✓ LTV up to 70%</li>
                  <li>✓ Rates from 7.99%</li>
                </ul>
              </div>

              {/* Hard Money Loans */}
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-6 border border-orange-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Hard Money Loans</h3>
                <p className="text-gray-300 mb-4">Fast funding for opportunities</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Close in 7-10 days</li>
                  <li>✓ Based on property value</li>
                  <li>✓ Fix & flip friendly</li>
                  <li>✓ LTV up to 70%</li>
                  <li>✓ Rates from 9.99%</li>
                </ul>
              </div>

              {/* Stated Income Loans */}
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Stated Income Loans</h3>
                <p className="text-gray-300 mb-4">State income without proof</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ No income documentation</li>
                  <li>✓ Higher credit required (700+)</li>
                  <li>✓ Larger down payment (30%+)</li>
                  <li>✓ LTV up to 70%</li>
                  <li>✓ Rates from 8.49%</li>
                </ul>
              </div>

              {/* Private Money Loans */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Private Money Loans</h3>
                <p className="text-gray-300 mb-4">Most flexible option</p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ No credit check options</li>
                  <li>✓ Creative deal structures</li>
                  <li>✓ Fast decisions</li>
                  <li>✓ LTV varies by deal</li>
                  <li>✓ Rates from 10%+</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Comparing No Tax Return Loan Options
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-dark-800/50 backdrop-blur-sm rounded-xl border border-primary-500/20">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-300">Loan Type</th>
                    <th className="text-left py-4 px-6 text-gray-300">Best For</th>
                    <th className="text-left py-4 px-6 text-gray-300">Min Credit</th>
                    <th className="text-left py-4 px-6 text-gray-300">Down Payment</th>
                    <th className="text-left py-4 px-6 text-gray-300">Approval Time</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold text-white">DSCR Loans</td>
                    <td className="py-4 px-6">Long-term rentals</td>
                    <td className="py-4 px-6">620</td>
                    <td className="py-4 px-6">20-25%</td>
                    <td className="py-4 px-6">24-48 hours</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold text-white">Bank Statement</td>
                    <td className="py-4 px-6">Self-employed with deposits</td>
                    <td className="py-4 px-6">660</td>
                    <td className="py-4 px-6">10-20%</td>
                    <td className="py-4 px-6">3-5 days</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold text-white">Asset Depletion</td>
                    <td className="py-4 px-6">High net worth retirees</td>
                    <td className="py-4 px-6">680</td>
                    <td className="py-4 px-6">30%</td>
                    <td className="py-4 px-6">5-7 days</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold text-white">Hard Money</td>
                    <td className="py-4 px-6">Fix & flip, time-sensitive</td>
                    <td className="py-4 px-6">No minimum</td>
                    <td className="py-4 px-6">30-40%</td>
                    <td className="py-4 px-6">3-7 days</td>
                  </tr>
                  <tr className="border-t border-gray-700">
                    <td className="py-4 px-6 font-semibold text-white">Stated Income</td>
                    <td className="py-4 px-6">High credit borrowers</td>
                    <td className="py-4 px-6">700</td>
                    <td className="py-4 px-6">30-40%</td>
                    <td className="py-4 px-6">5-10 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Who Benefits from No Tax Return Loans?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary-400" />
                    Self-Employed Professionals
                  </h3>
                  <p className="text-gray-300">
                    Business owners, consultants, freelancers, and contractors who maximize tax deductions 
                    but have strong cash flow.
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary-400" />
                    Real Estate Investors
                  </h3>
                  <p className="text-gray-300">
                    Experienced investors with multiple properties who show losses on taxes due to 
                    depreciation and expenses.
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-400" />
                    Recent Career Changes
                  </h3>
                  <p className="text-gray-300">
                    Those who recently started a business or changed careers and lack 2 years of 
                    consistent tax returns.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary-400" />
                    High Net Worth Individuals
                  </h3>
                  <p className="text-gray-300">
                    Investors with significant assets but complex income structures that don't show 
                    well on tax returns.
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <FileX className="w-5 h-5 text-primary-400" />
                    Privacy-Conscious Borrowers
                  </h3>
                  <p className="text-gray-300">
                    Those who prefer not to share detailed financial information and value discretion 
                    in their transactions.
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-primary-400" />
                    Foreign Nationals
                  </h3>
                  <p className="text-gray-300">
                    International investors without US tax returns who want to invest in California 
                    real estate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* California Market Specifics */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              California-Specific Advantages
            </h2>

            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why California is Perfect for No Tax Return Loans</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">Strong Rental Markets</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• High rental demand statewide</li>
                    <li>• Premium rents support DSCR ratios</li>
                    <li>• Diverse markets from urban to suburban</li>
                    <li>• Strong appreciation potential</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">Investor-Friendly Environment</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Large self-employed population</li>
                    <li>• Tech and entertainment industries</li>
                    <li>• International investment hub</li>
                    <li>• Established rental infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Top Markets */}
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Top California Markets for No Tax Return Loans</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <strong className="text-white">High Cash Flow:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• Riverside - 1.35 avg DSCR</li>
                    <li>• San Bernardino - 1.31 avg DSCR</li>
                    <li>• Fresno - 1.42 avg DSCR</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-white">Appreciation Play:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• San Diego - Coastal growth</li>
                    <li>• Orange County - Tech expansion</li>
                    <li>• Sacramento - Capital appreciation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Simple Application Process
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-grow bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-xl font-bold text-white mb-2">Choose Your Loan Type</h3>
                  <p className="text-gray-300">
                    Discuss your situation with a loan officer to determine whether DSCR, bank statement, 
                    or another no tax return option fits best. Most borrowers qualify for multiple programs.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-grow bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-xl font-bold text-white mb-2">Submit Basic Documentation</h3>
                  <p className="text-gray-300">
                    Provide ID, credit authorization, and program-specific docs (rent rolls for DSCR, 
                    bank statements for bank statement loans, etc.). No tax returns needed!
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-grow bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-xl font-bold text-white mb-2">Property Evaluation</h3>
                  <p className="text-gray-300">
                    Appraiser assesses property value and rental income potential. For DSCR loans, this 
                    determines your qualification. Other programs may focus more on your assets or deposits.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-grow bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h3 className="text-xl font-bold text-white mb-2">Close and Fund</h3>
                  <p className="text-gray-300">
                    Sign documents and receive funds. Most no tax return loans close in 2-3 weeks, with 
                    hard money options available in as little as 7 days for time-sensitive opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Misconceptions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Common Misconceptions About No Tax Return Loans
            </h2>

            <div className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      "These loans are only for people with bad credit"
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-white">Reality:</strong> Many borrowers have excellent credit 
                      but choose no tax return loans for convenience, privacy, or because their tax returns 
                      don't reflect their true financial strength.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      "Interest rates are always much higher"
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-white">Reality:</strong> DSCR loans often have rates within 
                      0.5-1% of conventional loans. Bank statement loans can be similarly competitive for 
                      well-qualified borrowers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      "You need a huge down payment"
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-white">Reality:</strong> Many no tax return loans offer 
                      80% LTV (20% down). Bank statement loans can go up to 90% LTV for primary residences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      "These are predatory loans"
                    </h3>
                    <p className="text-gray-300">
                      <strong className="text-white">Reality:</strong> Reputable lenders offer transparent 
                      terms with no hidden fees. These are legitimate alternatives designed for specific 
                      borrower situations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Tips for Getting Approved
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Do This
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✓ Maintain good credit (680+ ideal)</li>
                  <li>✓ Have reserves (3-6 months PITIA)</li>
                  <li>✓ Choose properties with strong rental income</li>
                  <li>✓ Work with experienced lenders</li>
                  <li>✓ Get pre-approved before shopping</li>
                  <li>✓ Consider multiple loan options</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                  Avoid This
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li>✗ Making large deposits before applying</li>
                  <li>✗ Opening new credit accounts</li>
                  <li>✗ Overestimating rental income</li>
                  <li>✗ Choosing the first lender you find</li>
                  <li>✗ Ignoring prepayment penalties</li>
                  <li>✗ Forgetting about reserves requirement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </article>
  );
}
