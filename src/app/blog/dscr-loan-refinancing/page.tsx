'use client';

import Link from 'next/link';
import { RefreshCw, DollarSign, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRRefinancingPage() {
  return (
    <>
      <ArticleSchema
        headline="DSCR Loan Refinancing Guide | Cash-Out Refi & Rate-Term 2024"
        description="Complete guide to DSCR loan refinancing. Cash-out refinance to pull equity, rate-and-term to lower payments. No income verification required."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR-Loans-599.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loan-refinancing"
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
                <span className="text-white">DSCR Loan Refinancing</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                DSCR Loan Refinancing Guide: Cash-Out & Rate-Term Options 2024
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                <span>Updated: October 4, 2024</span>
                <span>•</span>
                <span>10 min read</span>
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
                src="/DSCR_Loan_Refinancing.png"
                alt="DSCR Loan Refinancing 2026 - Cash-out and rate-term refinance options"
                width={1200}
                height={630}
                priority={true}
                caption="DSCR Loan Refinancing - Pull equity or lower your payments"
              />
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 mb-8">
                  DSCR loan refinancing offers powerful strategies to optimize your investment portfolio. Whether you
                  want to pull equity with a cash-out refinance or lower payments with a rate-and-term refi, DSCR
                  refinancing requires no income verification—just strong rental income and property performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-dark-800/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Two Types of DSCR Refinancing</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-primary-400" />
                    <h3 className="text-2xl font-bold text-white">Cash-Out Refinance</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Pull equity from your property to fund new investments, renovations, or other opportunities.</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Access up to 75% LTV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Use equity for down payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Fund property improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>No income verification needed</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingDown className="w-8 h-8 text-blue-400" />
                    <h3 className="text-2xl font-bold text-white">Rate-and-Term Refi</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Lower your interest rate or change loan terms to improve cash flow and reduce monthly payments.</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Lower interest rates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Reduce monthly payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Switch from ARM to fixed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Improve cash flow</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Refinance Your DSCR Loan?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get a free refinance analysis in 24 hours. Pull equity or lower your payments—no income verification required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/landing/dscr-loans" className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                  Get Refinance Quote
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
