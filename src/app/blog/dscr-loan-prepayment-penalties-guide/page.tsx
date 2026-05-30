'use client';

import Link from 'next/link';
import { Calendar, Clock, Phone, ArrowRight, Shield, HelpCircle, FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function PrepaymentPenaltiesGuidePage() {
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
        headline="DSCR Loan Prepayment Penalties: Complete Guide & Tips"
        description="Demystifying prepayment penalties on DSCR loans. Learn about 5-4-3-2-1 structures, soft vs hard penalties, and how to negotiate them for maximum flexibility."
        datePublished="2026-05-30T00:00:00.000Z"
        dateModified="2026-05-30T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/blog/dscr-loan-prepayment-penalties-guide.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loan-prepayment-penalties-guide"
      />
      <article className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative py-16 border-b border-primary-500/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/" className="hover:text-primary-400">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-primary-400">Blog</Link>
                <span>/</span>
                <span className="text-white">Prepayment Penalties Guide</span>
              </nav>

              <div className="inline-block px-4 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold mb-6">
                Investor Guidelines
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                DSCR Loan Prepayment Penalties: The Definitive Guide for Real Estate Investors
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <span>Published: May 30, 2026</span>
                <span>•</span>
                <span>10 min read</span>
                <span>•</span>
                <span>By Capital Bridge Solutions Editorial Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-invert prose-emerald">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                If you have ever explored a <Link href="/" className="text-emerald-400 hover:underline">DSCR loan</Link> to finance an investment property, you have likely encountered the term <strong className="text-white">prepayment penalty</strong>. Unlike traditional, owner-occupied conventional loans—where prepayment penalties are federally banned—DSCR loans almost always include them by default.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Because DSCR loans are classified as commercial business-purpose loans, they are exempt from consumer mortgage protection laws. Understanding how these prepayment structures work can save you tens of thousands of dollars when it comes time to sell or refinance. Here is everything you need to know to navigate prepayment penalties like a seasoned pro.
              </p>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why Do DSCR Loans Have Prepayment Penalties?</h2>
              <p className="text-gray-300 mb-6">
                DSCR lenders do not issue loans to hold on their own balance sheets indefinitely. Instead, most lenders package these loans into commercial mortgage-backed securities (CMBS) or sell them to secondary market institutional investors who demand a predictable yield.
              </p>
              <p className="text-gray-300 mb-6">
                If an investor pays off their loan within the first few years (due to a sale or refinancing when interest rates drop), the lender and their secondary market buyers lose out on expected interest income. The prepayment penalty acts as a safeguard, ensuring secondary market investors receive a guaranteed minimum return on their capital.
              </p>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Prepayment Penalty Structures</h2>
              <p className="text-gray-300 mb-6">
                Prepayment structures are typically defined as "step-down" penalties, meaning the fee decreases for each year the loan remains active. Below are the most common configurations:
              </p>

              <div className="space-y-6 my-8">
                <div className="bg-dark-800/60 p-6 rounded-xl border border-dark-700">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    The 5-4-3-2-1 Prepayment Penalty (Standard)
                  </h3>
                  <p className="text-gray-300 text-sm">
                    This is the classic 5-year step-down prepay structure:
                  </p>
                  <ul className="list-disc pl-6 text-gray-400 text-xs space-y-1 mt-2">
                    <li><strong>Year 1:</strong> 5% penalty of the outstanding balance</li>
                    <li><strong>Year 2:</strong> 4% penalty</li>
                    <li><strong>Year 3:</strong> 3% penalty</li>
                    <li><strong>Year 4:</strong> 2% penalty</li>
                    <li><strong>Year 5:</strong> 1% penalty</li>
                    <li><strong>Year 6 and beyond:</strong> 0% penalty (completely free to pay off)</li>
                  </ul>
                </div>

                <div className="bg-dark-800/60 p-6 rounded-xl border border-dark-700">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    The 3-2-1 Prepayment Penalty (Highly Popular)
                  </h3>
                  <p className="text-gray-300 text-sm">
                    A shorter 3-year step-down that offers greater flexibility:
                  </p>
                  <ul className="list-disc pl-6 text-gray-400 text-xs space-y-1 mt-2">
                    <li><strong>Year 1:</strong> 3% penalty</li>
                    <li><strong>Year 2:</strong> 2% penalty</li>
                    <li><strong>Year 3:</strong> 1% penalty</li>
                    <li><strong>Year 4 and beyond:</strong> 0% penalty</li>
                  </ul>
                </div>

                <div className="bg-dark-800/60 p-6 rounded-xl border border-dark-700">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    Fixed Prepayment Penalties (e.g., 3% Flat or 5% Flat)
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Some specialty programs feature a flat fee regardless of the year. For instance, a flat 3% penalty for the first 3 years of the loan term.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">Hard vs. Soft Prepayment Penalties</h2>
              <p className="text-gray-300 mb-6">
                It is vital to check whether your loan agreement specifies a <strong className="text-white">Hard</strong> or <strong className="text-white">Soft</strong> penalty:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-dark-800/40 p-6 rounded-xl border border-red-500/20">
                  <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Hard Prepayment Penalty
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Applies to <span className="text-white font-semibold">any</span> payoff of the loan during the prepay period. You will pay the penalty whether you sell the property to a new buyer or refinance with another lender.
                  </p>
                </div>
                
                <div className="bg-dark-800/40 p-6 rounded-xl border border-emerald-500/20">
                  <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-emerald-400" />
                    Soft Prepayment Penalty
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Only applies if you <span className="text-white font-semibold">refinance</span> the loan. If you sell the property to an independent third-party buyer, the prepayment penalty is waived. This is highly favorable if you think you might sell early.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">How Prepayment Penalties Affect Your Interest Rate</h2>
              <p className="text-gray-300 mb-6">
                Prepayment penalties and interest rates exist on a sliding scale. Lenders are willing to offer lower interest rates when investors agree to lock in longer prepayment periods because it guarantees their investment yield.
              </p>
              
              <ul className="list-disc pl-6 text-gray-300 space-y-3 mb-8">
                <li><strong className="text-white">Shortening the Prepay Period:</strong> If you want to shorten the penalty from a 5-year to a 3-year term, your interest rate may increase by 0.125% to 0.25%.</li>
                <li><strong className="text-white">Eliminating the Penalty entirely (No Prepay):</strong> If you require a "No Prepay" option, your rate could increase by 0.50% to 1.00%, and you might face additional underwriting fees.</li>
              </ul>

              <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Choose the Right Strategy for Your Portfolio</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse border border-dark-700">
                  <thead>
                    <tr className="bg-dark-800 text-white">
                      <th className="p-4 border border-dark-700">Strategy</th>
                      <th className="p-4 border border-dark-700">Best Prepayment Option</th>
                      <th className="p-4 border border-dark-700">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-dark-700">
                      <td className="p-4 font-semibold text-white">Buy & Hold (10+ Years)</td>
                      <td className="p-4 text-emerald-400">5-4-3-2-1 Hard Prepay</td>
                      <td className="p-4 text-gray-300">Locks in the absolute lowest rate since you do not plan on paying it off early.</td>
                    </tr>
                    <tr className="border-t border-dark-700">
                      <td className="p-4 font-semibold text-white">BRRRR (Refinance in 1-2 Years)</td>
                      <td className="p-4 text-emerald-400">1-Year or No Prepay</td>
                      <td className="p-4 text-gray-300">Paying a slightly higher rate is worth avoiding a 5% prepayment penalty on refinance.</td>
                    </tr>
                    <tr className="border-t border-dark-700">
                      <td className="p-4 font-semibold text-white">Speculate & Sell (Medium Term)</td>
                      <td className="p-4 text-emerald-400">3-Year Soft Prepay</td>
                      <td className="p-4 text-gray-300">Allows you to sell the property tax-free of prepay fees, while keeping a reasonable rate.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Conversion CTA Block */}
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-8 my-12">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Help Customizing Your DSCR Terms?
                </h3>
                <p className="text-gray-300 mb-6">
                  At Capital Bridge Solutions, we structure DSCR loans tailored to your specific investment timeline. Our advisors can help you weigh the cost-benefits of prepay buy-downs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+19493393555"
                    onClick={handlePhoneClick}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    Speak with a Specialist: (949) 339-3555
                  </a>
                  <Link
                    href="/get-started"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                  >
                    Get a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
