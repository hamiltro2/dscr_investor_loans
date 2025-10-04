'use client';

import Link from 'next/link';
import { Trophy, Layers, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function CaseStudy10PropertyPage() {
  return (
    <>
      <ArticleSchema 
        headline="Case Study: Building a 10-Property Portfolio with DSCR Loans"
        description="Real case study: How one investor scaled from 1 to 10 properties in 2 years using DSCR loans. Portfolio building strategies revealed."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/Capital_Bridge_solutions_team.png"
        url="https://www.capitalbridgesolutions.com/blog/case-study-10-property-portfolio"
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
              <span className="text-white">Case Study: 10-Property Portfolio</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Case Study: Building a 10-Property Portfolio with DSCR Loans
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
              src="/Capital_Bridge_solutions_team.png"
              alt="Case Study: Building a 10-property portfolio with DSCR loans in 2 years"
              width={1200}
              height={630}
              priority={true}
              caption="From 1 to 10 properties in 24 months using DSCR loans"
            />
            <div className="prose prose-invert max-w-none">
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-primary-400" />
                  Meet Marcus: From 1 to 10 Properties in 24 Months
                </h2>
                <p className="text-gray-300">
                  <strong>Background:</strong> 38-year-old software engineer, $180K W2 income, owned 1 rental property, 
                  wanted to scale but hit conventional loan limits. Used DSCR loans to build a 10-property portfolio 
                  generating $8,500/month in cash flow.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">The Challenge: Conventional Loan Limits</h2>
              <p className="text-gray-300 mb-6">
                Marcus owned one rental property with a conventional loan but discovered he couldn't scale:
              </p>
              <ul className="space-y-2 text-gray-300 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Conventional loans limited to 10 properties (he wanted more)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>DTI ratio maxed out after 4 properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Each loan took 45+ days to close (too slow)</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">The DSCR Strategy: Sequential Acquisition</h2>
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">24-Month Timeline</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <p className="font-semibold text-white">Month 0-3: Properties 2-3</p>
                    <p>Used savings for 25% down on each. DSCR: 1.25+. Cash flow: $600/property</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-white">Month 4-9: Properties 4-6</p>
                    <p>Cash-out refi on Property 1. Used equity for down payments. DSCR: 1.20+</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-semibold text-white">Month 10-18: Properties 7-9</p>
                    <p>Cash-out refi on Properties 2-3. Cross-collateralization strategy. DSCR: 1.15+</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-semibold text-white">Month 19-24: Property 10</p>
                    <p>Blanket loan for final property. Portfolio DSCR: 1.30 overall</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">The Results: Financial Freedom Achieved</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-xl font-bold text-white mb-3">Monthly Cash Flow</h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">$8,500</div>
                  <p className="text-gray-300">After all expenses (PITIA)</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-white mb-3">Total Equity Built</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">$425K</div>
                  <p className="text-gray-300">In just 24 months</p>
                </div>
                <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30">
                  <h3 className="text-xl font-bold text-white mb-3">Portfolio Value</h3>
                  <div className="text-3xl font-bold text-primary-400 mb-2">$4.2M</div>
                  <p className="text-gray-300">Total property value</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-white mb-3">Annual ROI</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">28%</div>
                  <p className="text-gray-300">On invested capital</p>
                </div>
              </div>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Marcus's Key Strategies:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Use DSCR loans exclusively</strong> - No DTI limits, unlimited properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Cash-out refinance every 6 months</strong> - Pull equity to fund next purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Target 1.20+ DSCR properties</strong> - Strong cash flow from day one</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Reinvest all cash flow</strong> - Compound growth accelerates portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Work with one DSCR lender</strong> - Faster approvals, better relationships</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Portfolio?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get a custom portfolio scaling strategy. Learn how to go from 1 to 10+ properties using DSCR loans.
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
