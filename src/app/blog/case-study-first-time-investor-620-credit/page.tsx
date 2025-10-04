'use client';

import Link from 'next/link';
import { Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function CaseStudy620CreditPage() {
  return (
    <>
      <ArticleSchema 
        headline="Case Study: First-Time Investor with 620 Credit Score Success"
        description="Real success story: How a first-time investor with 620 credit score got approved for a DSCR loan and built wealth through real estate."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR_Loans_620_Credit_Score.png"
        url="https://www.capitalbridgesolutions.com/blog/case-study-first-time-investor-620-credit"
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
              <span className="text-white">Case Study: 620 Credit Success</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Case Study: First-Time Investor with 620 Credit Score Success
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: October 4, 2024</span>
              <span>•</span>
              <span>9 min read</span>
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
              src="/DSCR_Loans_620_Credit_Score.png"
              alt="Case Study: First-time investor with 620 credit score success story"
              width={1200}
              height={630}
              priority={true}
              caption="Real success story: From 620 credit to successful real estate investor"
            />
            <div className="prose prose-invert max-w-none">
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary-400" />
                  Meet Sarah: First-Time Investor, 620 Credit Score
                </h2>
                <p className="text-gray-300">
                  <strong>Background:</strong> 32-year-old teacher, self-employed side business, 620 credit score, 
                  $45K saved for down payment, denied by 3 conventional lenders
                </p>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
              <p className="text-gray-300 mb-6">
                Sarah had been saving for years to buy her first investment property. Despite having $45,000 saved 
                and stable rental income projections, she was repeatedly denied by conventional lenders due to:
              </p>
              <ul className="space-y-2 text-gray-300 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>620 credit score (below conventional minimums)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>Self-employed income (complex tax returns)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✗</span>
                  <span>High DTI ratio from student loans</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">The DSCR Loan Solution</h2>
              <p className="text-gray-300 mb-6">
                Sarah discovered DSCR loans and qualified based on the property's rental income alone:
              </p>
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Loan Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p><strong>Property:</strong> 3BR/2BA in Phoenix, AZ</p>
                    <p><strong>Purchase Price:</strong> $385,000</p>
                    <p><strong>Down Payment:</strong> $77,000 (20%)</p>
                    <p><strong>Loan Amount:</strong> $308,000</p>
                  </div>
                  <div>
                    <p><strong>Monthly Rent:</strong> $2,400</p>
                    <p><strong>PITIA:</strong> $2,050</p>
                    <p><strong>DSCR Ratio:</strong> 1.17</p>
                    <p><strong>Interest Rate:</strong> 8.25%</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">The Results (18 Months Later)</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/30 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$350/mo</div>
                  <p className="text-gray-300">Positive Cash Flow</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/30 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$42K</div>
                  <p className="text-gray-300">Equity Built</p>
                </div>
                <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30 text-center">
                  <div className="text-3xl font-bold text-primary-400 mb-2">680</div>
                  <p className="text-gray-300">New Credit Score</p>
                </div>
              </div>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Sarah's Advice for 620 Credit Investors:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>"Don't let credit score discourage you—DSCR loans focus on property income"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>"Target properties with strong rental demand and good DSCR ratios"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>"Save for 20-25% down payment—it makes approval much easier"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>"Work with lenders who specialize in DSCR loans for 620 credit"</span>
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
            <h2 className="text-3xl font-bold text-white mb-4">Your Success Story Starts Here</h2>
            <p className="text-xl text-gray-300 mb-8">
              620 credit score? No problem. Get pre-approved for a DSCR loan and start building wealth through real estate.
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
