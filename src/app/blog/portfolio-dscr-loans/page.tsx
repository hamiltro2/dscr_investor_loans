'use client';

import Link from 'next/link';
import { Layers, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function PortfolioDSCRLoansPage() {
  return (
    <>
      <ArticleSchema 
        headline="Portfolio DSCR Loans | Finance Multiple Properties Simultaneously"
        description="Get portfolio DSCR loans for 5-10+ properties. Blanket loans, cross-collateralization, and strategies to scale your real estate portfolio faster."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR_loan_Requirements.png"
        url="https://www.capitalbridgesolutions.com/blog/portfolio-dscr-loans"
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
              <span className="text-white">Portfolio DSCR Loans</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Portfolio DSCR Loans: Finance Multiple Properties Simultaneously
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: October 4, 2024</span>
              <span>•</span>
              <span>11 min read</span>
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
              src="/DSCR_loan_Requirements.png"
              alt="Portfolio DSCR Loans - Finance multiple investment properties simultaneously"
              width={1200}
              height={630}
              priority={true}
              caption="Portfolio DSCR Loans - Scale your real estate portfolio faster"
            />
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Portfolio DSCR loans are designed for serious investors looking to scale quickly. Finance 5, 10, or 
                even 20+ properties without the conventional loan limit of 10 properties. With blanket loans and 
                cross-collateralization options, portfolio DSCR loans offer the flexibility to build wealth faster 
                than traditional financing methods.
              </p>
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-primary-400" />
                  Why Portfolio DSCR Loans Are Game-Changers
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No Property Limits:</strong> Finance unlimited properties (vs 10 max conventional)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Blanket Loans:</strong> One loan for multiple properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Cross-Collateralization:</strong> Use equity from one property for another</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Faster Scaling:</strong> Acquire properties quickly without DTI limits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Portfolio Loan Strategies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Sequential Strategy</h3>
                <p className="text-gray-300 mb-4">Finance properties one at a time, using each property's equity to fund the next.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Property 1: 25% down payment</li>
                  <li>• Property 2: Cash-out refi Property 1</li>
                  <li>• Property 3: Use equity from 1 & 2</li>
                  <li>• Scale to 10+ properties</li>
                </ul>
              </div>
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Blanket Loan Strategy</h3>
                <p className="text-gray-300 mb-4">Finance multiple properties under one loan with cross-collateralization.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• One loan for 5-10 properties</li>
                  <li>• Lower overall rates</li>
                  <li>• Simplified management</li>
                  <li>• Release clauses available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Scale Your Portfolio?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get a custom portfolio financing strategy. Finance 5-10+ properties with no conventional loan limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/landing/dscr-loans" className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get Portfolio Strategy
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
