'use client';

import Link from 'next/link';
import { Scale, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRvsConventionalPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR vs Conventional Loans | Investment Property Comparison 2024"
        description="Compare DSCR loans vs conventional loans for investment properties. See rates, requirements, pros/cons. Learn when to use each type for maximum ROI."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR_vs_HardMoney_loans.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-vs-conventional-loans"
      />
      <article className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      <section className="relative py-16 border-b border-primary-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary-400">Blog</Link>
              <span>/</span>
              <span className="text-white">DSCR vs Conventional Loans</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR vs Conventional Loans: Investment Property Comparison 2024
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: October 4, 2024</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>By Capital Bridge Solutions Team</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BlogImage 
              src="/DSCR_vs_HardMoney_loans.png"
              alt="DSCR vs Conventional Loans - Complete comparison for investment property financing"
              width={1200}
              height={630}
              priority={true}
              caption="DSCR vs Conventional Loans - Which is better for your investment strategy?"
            />
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Choosing between DSCR loans and conventional loans is one of the most important decisions for real 
                estate investors. While conventional loans offer lower rates, DSCR loans provide flexibility that 
                can be game-changing for portfolio growth. This comprehensive comparison helps you understand when 
                to use each type for maximum ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Scale className="w-8 h-8 text-primary-400" />
              Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-4 text-white font-semibold">Feature</th>
                    <th className="py-4 px-4 text-primary-400 font-semibold">DSCR Loans</th>
                    <th className="py-4 px-4 text-blue-400 font-semibold">Conventional Loans</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Income Verification</td>
                    <td className="py-4 px-4"><XCircle className="w-5 h-5 text-green-400 inline mr-2" />Not Required</td>
                    <td className="py-4 px-4"><CheckCircle className="w-5 h-5 text-red-400 inline mr-2" />Required (W2s, Tax Returns)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Interest Rates</td>
                    <td className="py-4 px-4">7.25% - 9.75%</td>
                    <td className="py-4 px-4">6.50% - 8.25%</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Down Payment</td>
                    <td className="py-4 px-4">20-25%</td>
                    <td className="py-4 px-4">15-25%</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Credit Score Min</td>
                    <td className="py-4 px-4">620</td>
                    <td className="py-4 px-4">620-640</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">DTI Limits</td>
                    <td className="py-4 px-4"><CheckCircle className="w-5 h-5 text-green-400 inline mr-2" />None</td>
                    <td className="py-4 px-4"><XCircle className="w-5 h-5 text-red-400 inline mr-2" />43-50% max</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Property Limit</td>
                    <td className="py-4 px-4"><CheckCircle className="w-5 h-5 text-green-400 inline mr-2" />Unlimited</td>
                    <td className="py-4 px-4"><XCircle className="w-5 h-5 text-red-400 inline mr-2" />10 properties max</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Approval Time</td>
                    <td className="py-4 px-4">24-48 hours</td>
                    <td className="py-4 px-4">30-45 days</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-4 font-semibold">Best For</td>
                    <td className="py-4 px-4">Self-employed, portfolio investors</td>
                    <td className="py-4 px-4">W2 employees, first property</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Choose the Right Loan?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get expert guidance on DSCR vs conventional loans. We'll help you select the best option for your investment strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/landing/dscr-loans" className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get Pre-Approved Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:949-339-3555" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20">
                Call (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </section>
      </article>
    </>
  );
}
