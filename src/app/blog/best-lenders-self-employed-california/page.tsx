'use client';

import { Phone, Calculator, CheckCircle, AlertCircle, Star, TrendingUp, Shield, Users, DollarSign, ArrowRight, Building2, Clock, Target, Calendar } from 'lucide-react';
import { ArticleSchema } from '@/components/ArticleSchema';
import { BlogImage } from '@/components/BlogImage';
import Link from 'next/link';
import { lenders, loanTypes } from './lender-data';
import { FAQSection } from './faq-section';
import { HowToQualifySection } from './how-to-qualify';

export default function BestLendersSelfEmployedCAPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  const badgeColors: Record<string, string> = {
    emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    purple: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    red: 'bg-red-500/20 border-red-500/30 text-red-400',
    cyan: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
    indigo: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400',
    orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
    green: 'bg-green-500/20 border-green-500/30 text-green-400',
    teal: 'bg-teal-500/20 border-teal-500/30 text-teal-400',
    yellow: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  };

  return (
    <>
      <ArticleSchema
        headline="Best Lenders for Self-Employed in California 2026: Top 10 Comparison"
        description="Compare the best mortgage lenders for self-employed borrowers in California. No tax returns required. Bank statement loans, DSCR loans, and more. Rates from 5.5%."
        datePublished="2026-01-12T00:00:00Z"
        dateModified="2026-01-12T00:00:00Z"
        author="Capital Bridge Solutions"
        image="/Self-employed-DSCR_loans.png"
        url="https://www.capitalbridgesolutions.com/blog/best-lenders-self-employed-california"
      />

      <article className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-dark-950 border-b border-primary-500/20 py-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-400 font-medium">Self-Employed Guide</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best Lenders for Self-Employed in California 2026
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Compare the top 10 mortgage lenders for self-employed borrowers in California. No tax returns required. Get approved with bank statements, 1099s, or DSCR loans.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+19493393555"
                  onClick={handlePhoneClick}
                  className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>(949) 339-3555</span>
                </a>
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Get Pre-Qualified</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Featured Image */}
          <BlogImage
            src="/Self-employed-DSCR_loans.png"
            alt="Best Lenders for Self-Employed in California 2026 - Compare top mortgage lenders for self-employed borrowers"
            width={1200}
            height={630}
            priority={true}
            caption="Top 10 lenders for self-employed borrowers in California - No tax returns required"
          />

          {/* Quick Comparison Table */}
          <div className="my-12 bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-400" />
              Quick Comparison: Top 10 Lenders
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-primary-400 font-semibold">Lender</th>
                    <th className="py-3 px-4 text-primary-400 font-semibold">Min Credit</th>
                    <th className="py-3 px-4 text-primary-400 font-semibold">Down Payment</th>
                    <th className="py-3 px-4 text-primary-400 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {lenders.map((lender) => (
                    <tr key={lender.id} className="border-b border-white/5">
                      <td className="py-3 px-4 font-semibold text-white">{lender.name}</td>
                      <td className="py-3 px-4">{lender.minCredit}</td>
                      <td className="py-3 px-4">{lender.downPayment}</td>
                      <td className="py-3 px-4 text-sm">{lender.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              As a self-employed professional in California, you've likely discovered that getting a mortgage isn't as straightforward as it is for W-2 employees. Traditional lenders often struggle to understand your income, especially when legitimate business deductions reduce your taxable income. The good news? Specialized lenders now offer mortgage programs designed specifically for self-employed borrowers—no tax returns required.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              This comprehensive guide compares the top 10 mortgage lenders for self-employed borrowers in California, covering bank statement loans, DSCR loans, asset-based loans, and other non-QM options. Whether you're a freelancer, business owner, contractor, or gig worker, you'll find the right lender for your situation.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary-400" />
              Key Takeaways
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">No tax returns required:</strong> Bank statement loans and DSCR loans qualify you based on deposits or rental income</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Credit scores from 580:</strong> Bad credit options available with larger down payments</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Down payments 10-25%:</strong> Lower than you might expect for self-employed borrowers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">California specialists:</strong> Lenders who understand CA's unique market and high property values</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Fast approval:</strong> 24-48 hour pre-approvals, 10-15 day closings possible</span>
              </li>
            </ul>
          </div>

          {/* Top 10 Lenders Section */}
          <div id="top-10-lenders" className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Top 10 Lenders for Self-Employed in California</h2>

            {lenders.map((lender, index) => (
              <div
                key={lender.id}
                className={`rounded-2xl p-8 border mb-8 ${index === 0
                  ? 'bg-gradient-to-br from-primary-500/10 to-primary-600/10 border-primary-500/20'
                  : 'bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl border-white/10'
                  }`}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{lender.id}. {lender.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(lender.rating)
                              ? 'fill-primary-400 text-primary-400'
                              : 'text-gray-600'
                              }`}
                          />
                        ))}
                      </div>
                      <span className={`font-semibold ${index === 0 ? 'text-primary-400' : 'text-gray-400'}`}>
                        {lender.rating}/5.0
                      </span>
                    </div>
                  </div>
                  {lender.badge && (
                    <div className={`px-4 py-2 border rounded-lg ${badgeColors[lender.badgeColor || 'emerald']}`}>
                      <span className="font-bold text-sm">{lender.badge}</span>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Rates From</div>
                    <div className="text-2xl font-bold text-primary-400">{lender.ratesFrom}</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Min Credit</div>
                    <div className="text-2xl font-bold text-white">{lender.minCredit}</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Down Payment</div>
                    <div className="text-2xl font-bold text-white">{lender.downPayment}</div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none mb-6">
                  <p className="text-gray-300">
                    <strong className="text-white">Best for:</strong> {lender.bestFor}
                  </p>
                  {lender.description.map((para, i) => (
                    <p key={i} className="text-gray-300">{para}</p>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">✅ Pros</h4>
                    <ul className="space-y-2 text-gray-300">
                      {lender.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">❌ Cons</h4>
                    <ul className="space-y-2 text-gray-300">
                      {lender.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  {lender.phone && (
                    <a
                      href={`tel:${lender.phone.replace(/[^0-9+]/g, '')}`}
                      onClick={handlePhoneClick}
                      className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call {lender.phone}
                    </a>
                  )}
                  {lender.phone ? (
                    <Link
                      href="/get-started"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      {lender.cta}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <a
                      href={lender.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      {lender.cta}
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Loan Types Section */}
          <div id="loan-types" className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Loan Types for Self-Employed Borrowers</h2>
            <p className="text-xl text-gray-300 mb-8">
              Understanding the different loan types available to self-employed borrowers is crucial for choosing the right lender. Here are the most common options:
            </p>

            <div className="grid gap-6">
              {loanTypes.map((loanType, index) => (
                <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-3">{loanType.name}</h3>
                  <p className="text-gray-300 mb-4">{loanType.description}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Min Credit</div>
                      <div className="text-lg font-semibold text-primary-400">{loanType.minCredit}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Down Payment</div>
                      <div className="text-lg font-semibold text-primary-400">{loanType.downPayment}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Best For</div>
                      <div className="text-sm font-semibold text-white">{loanType.bestFor}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DSCR Loan Callout */}
            <div className="mt-8 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary-500/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Learn More About DSCR Loans
                  </h3>
                  <p className="text-gray-300 mb-4">
                    DSCR loans are the easiest way for self-employed investors to qualify. Read our complete guide to California DSCR loans.
                  </p>
                  <Link
                    href="/blog/dscr-loans-self-employed-california"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Read DSCR Guide
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* How to Qualify Section */}
          <HowToQualifySection />

          {/* FAQ Section */}
          <FAQSection />

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-primary-900/20 to-dark-800 border border-primary-500/20 rounded-2xl p-8 md:p-12 text-center">
            <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Pre-Qualified?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Talk to a California self-employed mortgage specialist today. No obligation, no hard credit pull.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19493393555"
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-6 h-6" />
                <span>(949) 339-3555</span>
              </a>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6" />
                <span>Get Pre-Qualified</span>
              </Link>
            </div>
          </div>

        </section>
      </article>
    </>
  );
}
