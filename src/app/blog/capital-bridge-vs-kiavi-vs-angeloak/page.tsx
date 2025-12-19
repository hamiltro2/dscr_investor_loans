'use client';

import Link from 'next/link';
import { Scale, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, Phone, ArrowRight, Star, Zap, Award, Target } from 'lucide-react';
import { ArticleSchema } from '@/components/ArticleSchema';
import { CostComparison, FAQ, FinalCTA } from './content';

export default function CapitalBridgeVsKiaviVsAngelOakPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  return (
    <>
      <ArticleSchema
        headline="Capital Bridge Solutions vs Kiavi vs AngelOak: DSCR Loan Comparison 2024"
        description="Compare Capital Bridge Solutions, Kiavi, and AngelOak DSCR loans. See rates from 5.5%, save $20K-$50K over 5 years on your California investment property."
        datePublished="2024-11-16T00:00:00.000Z"
        dateModified="2024-11-16T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/blog/dscr-lender-comparison.png"
        url="https://www.capitalbridgesolutions.com/blog/capital-bridge-vs-kiavi-vs-angeloak"
      />
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
                <span className="text-white">DSCR Lender Comparison</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Capital Bridge Solutions vs Kiavi vs AngelOak: DSCR Loan Comparison 2024
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <span>Updated: November 16, 2024</span>
                <span>•</span>
                <span>15 min read</span>
                <span>•</span>
                <span>By Capital Bridge Solutions Team</span>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-6">
                <p className="text-lg text-gray-300">
                  <strong className="text-emerald-400">Save $20,000 - $50,000</strong> over 5 years by choosing the right DSCR lender.
                  This comprehensive comparison shows you exactly how Capital Bridge Solutions, Kiavi, and AngelOak stack up on rates, fees, and closing speed.
                </p>
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
                  When shopping for a DSCR loan (Debt Service Coverage Ratio loan) in California or nationwide,
                  you'll quickly encounter three names: <strong className="text-white">Capital Bridge Solutions</strong>,
                  <strong className="text-white"> Kiavi</strong>, and <strong className="text-white">AngelOak</strong>.
                  Each lender has its strengths, but the differences in rates, fees, and closing times can mean tens of
                  thousands of dollars in savings—or extra costs—over the life of your loan.
                </p>

                <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary-400" />
                    The Bottom Line Up Front
                  </h2>
                  <p className="text-gray-300 mb-4">
                    For California investors seeking the <strong className="text-emerald-400">lowest rates</strong> (5.5%+),
                    <strong className="text-emerald-400"> lowest points</strong> (0.75%), and <strong className="text-emerald-400">fastest
                      closing</strong> (5-7 days), Capital Bridge Solutions offers the best value. Kiavi and AngelOak are solid national
                    lenders but charge 1.5%+ higher rates and 1-2% more in points.
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Potential savings:</strong> $20,000 - $50,000 over 5 years on a typical $500K-$750K loan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="py-12 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Quick Comparison Table
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-primary-500/20">
                  <thead className="bg-dark-700">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-300 font-semibold">Feature</th>
                      <th className="text-left py-4 px-6 text-emerald-400 font-semibold">Capital Bridge</th>
                      <th className="text-left py-4 px-6 text-orange-400 font-semibold">Kiavi</th>
                      <th className="text-left py-4 px-6 text-blue-400 font-semibold">AngelOak</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-gray-700">
                      <td className="py-4 px-6 font-semibold">Starting Rate</td>
                      <td className="py-4 px-6"><span className="text-emerald-400 font-bold">5.5%</span></td>
                      <td className="py-4 px-6">7.75%</td>
                      <td className="py-4 px-6">7.50%</td>
                    </tr>
                    <tr className="border-t border-gray-700 bg-dark-700/30">
                      <td className="py-4 px-6 font-semibold">Points</td>
                      <td className="py-4 px-6"><span className="text-emerald-400 font-bold">0.75%</span> (loans $450K+)</td>
                      <td className="py-4 px-6">2.0% - 3.0%</td>
                      <td className="py-4 px-6">1.5% - 2.5%</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-4 px-6 font-semibold">Min Credit Score</td>
                      <td className="py-4 px-6">640</td>
                      <td className="py-4 px-6">660</td>
                      <td className="py-4 px-6">640</td>
                    </tr>
                    <tr className="border-t border-gray-700 bg-dark-700/30">
                      <td className="py-4 px-6 font-semibold">Closing Time</td>
                      <td className="py-4 px-6"><span className="text-emerald-400 font-bold">5-7 days</span></td>
                      <td className="py-4 px-6">10-14 days</td>
                      <td className="py-4 px-6">10-14 days</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-4 px-6 font-semibold">Max LTV</td>
                      <td className="py-4 px-6">80%</td>
                      <td className="py-4 px-6">80%</td>
                      <td className="py-4 px-6">80%</td>
                    </tr>
                    <tr className="border-t border-gray-700 bg-dark-700/30">
                      <td className="py-4 px-6 font-semibold">Min DSCR</td>
                      <td className="py-4 px-6"><span className="text-emerald-400 font-bold">0.75</span></td>
                      <td className="py-4 px-6">1.0</td>
                      <td className="py-4 px-6">1.0</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-4 px-6 font-semibold">Short-Term Rentals</td>
                      <td className="py-4 px-6"><CheckCircle className="w-5 h-5 text-emerald-400 inline" /></td>
                      <td className="py-4 px-6"><CheckCircle className="w-5 h-5 text-emerald-400 inline" /></td>
                      <td className="py-4 px-6"><XCircle className="w-5 h-5 text-red-400 inline" /></td>
                    </tr>
                    <tr className="border-t border-gray-700 bg-dark-700/30">
                      <td className="py-4 px-6 font-semibold">California Specialist</td>
                      <td className="py-4 px-6"><CheckCircle className="w-5 h-5 text-emerald-400 inline" /></td>
                      <td className="py-4 px-6">Nationwide</td>
                      <td className="py-4 px-6">Nationwide</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-4 px-6 font-semibold">Total Funded</td>
                      <td className="py-4 px-6">$2.5B+</td>
                      <td className="py-4 px-6">$10B+</td>
                      <td className="py-4 px-6">$15B+</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                <p className="text-gray-300 mb-4">
                  <strong className="text-white">Ready to save $20K-$50K on your DSCR loan?</strong>
                </p>
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Each Lender - Continued in part 2 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">About Each Lender</h2>

              <div className="space-y-8">
                {/* Capital Bridge Solutions */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Award className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Capital Bridge Solutions</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <span><strong>Founded:</strong> 2010</span>
                        <span><strong>Total Funded:</strong> $2.5B+</span>
                        <span><strong>Specialty:</strong> California DSCR</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">
                    California-based private lender specializing in DSCR loans for real estate investors. With 15+ years of experience
                    and $2.5B+ funded, Capital Bridge Solutions focuses on California market expertise, faster closing times (5-7 days),
                    lower rates (starting at 5.5%), and transparent pricing.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Key Advantages:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Lowest rates (5.5%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Lowest points (0.75%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Fastest closing (5-7 days)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>CA market expertise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>AI advisor (Cap)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Best For:</h4>
                      <p className="text-gray-300 text-sm mb-4">
                        California investors, time-sensitive deals, investors wanting personalized service and lowest costs.
                      </p>
                      <a
                        href="tel:+19493393555"
                        onClick={handlePhoneClick}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        (949) 339-3555
                      </a>
                    </div>
                  </div>
                </div>

                {/* Kiavi */}
                <div className="bg-dark-800/50 border border-orange-500/30 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <TrendingUp className="w-8 h-8 text-orange-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Kiavi</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <span><strong>Founded:</strong> 2013</span>
                        <span><strong>Total Funded:</strong> $10B+</span>
                        <span><strong>Specialty:</strong> Nationwide</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">
                    One of the largest private real estate lenders in the U.S. Offers extensive product line including fix-and-flip,
                    construction, and rental loans with strong tech platform and national footprint.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Strengths:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Large scale ($10B+)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>All 50 states</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Multiple products</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Trade-offs:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Higher rates (7.75%+)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Higher points (2-3%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Slower (10-14 days)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* AngelOak */}
                <div className="bg-dark-800/50 border border-blue-500/30 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Scale className="w-8 h-8 text-blue-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">AngelOak</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <span><strong>Founded:</strong> 2008</span>
                        <span><strong>Total Funded:</strong> $15B+</span>
                        <span><strong>Specialty:</strong> Non-QM</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">
                    Established non-QM lender with $15B+ in originations. Their Investor Cash Flow program is their DSCR loan product.
                    Strong reputation in non-QM space, works extensively through mortgage brokers.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Strengths:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Established ($15B+)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Non-QM expertise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>Broker-friendly</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Trade-offs:</h4>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Higher rates (7.50%+)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Higher points (1.5-2.5%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>Limited STR</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison Section */}
        <CostComparison handlePhoneClick={handlePhoneClick} />

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA handlePhoneClick={handlePhoneClick} />
      </article>
    </>
  );
}
