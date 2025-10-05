'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  // Featured Calculator
  {
    slug: 'dscr-loan-calculator-california',
    title: 'DSCR Loan Calculator California: Free Tool + 2024 Rates',
    excerpt: 'Calculate your DSCR loan eligibility instantly. See real examples for Los Angeles, Orange County, and San Diego properties with current rates.',
    date: '2024-09-23',
    readTime: '8 min read',
    category: 'Tools & Calculators'
  },
  // State-Specific Guides
  {
    slug: 'dscr-loans-texas',
    title: 'DSCR Loans Texas: Investment Property Financing Guide 2024',
    excerpt: 'Complete guide to DSCR loans in Texas. Dallas, Houston, Austin, San Antonio markets. No income verification, rates from 7.25%.',
    date: '2024-10-04',
    readTime: '12 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-florida',
    title: 'DSCR Loans Florida: Vacation Rental & Investment Guide 2024',
    excerpt: 'Get DSCR loans in Florida for vacation rentals and investment properties. Orlando, Miami, Tampa markets covered.',
    date: '2024-10-04',
    readTime: '13 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-arizona',
    title: 'DSCR Loans Arizona: Phoenix & Scottsdale Investment Guide',
    excerpt: 'Arizona DSCR loans for vacation rentals and investment properties. Phoenix, Scottsdale, Tucson markets with strong rental demand.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-georgia',
    title: 'DSCR Loans Georgia: Atlanta Investment Property Guide 2024',
    excerpt: 'Get DSCR loans in Georgia with no income verification. Atlanta, Savannah markets with strong job growth and affordable entry.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-nevada',
    title: 'DSCR Loans Nevada: Las Vegas & Reno Investment Guide',
    excerpt: 'Nevada DSCR loans for vacation rentals and investment properties. No state income tax, strong tourism market.',
    date: '2024-10-04',
    readTime: '12 min read',
    category: 'State Guides'
  },
  // Credit & Qualification
  {
    slug: 'dscr-loan-620-credit-score',
    title: 'DSCR Loan 620 Credit Score: How to Get Approved',
    excerpt: 'Get approved for a DSCR loan with 620 credit score. Learn requirements, interest rates, and proven strategies for investment properties.',
    date: '2024-09-23',
    readTime: '9 min read',
    category: 'Credit & Qualification'
  },
  {
    slug: 'how-to-qualify-for-dscr-loan',
    title: 'How to Qualify for DSCR Loan: Complete Guide',
    excerpt: 'Step-by-step qualification guide covering requirements, DSCR calculations, documents needed, and insider tips for getting approved.',
    date: '2024-09-24',
    readTime: '13 min read',
    category: 'Loan Guides'
  },
  // Requirements & Rates
  {
    slug: 'dscr-loan-requirements-california-2024',
    title: 'DSCR Loan Requirements California 2024: What You Need to Know',
    excerpt: 'Complete breakdown of 2024 DSCR loan requirements including credit scores, down payments, property types, and documentation needed.',
    date: '2024-09-23',
    readTime: '10 min read',
    category: 'Loan Guides'
  },
  {
    slug: 'dscr-loan-rates-california-2024',
    title: 'DSCR Loan Rates California 2024: Current Rates & Factors',
    excerpt: 'Current DSCR rates from 7.25-9.75%. Complete rate tables by credit score, factors affecting your rate, and strategies to get the best pricing.',
    date: '2024-09-24',
    readTime: '10 min read',
    category: 'Rates & Terms'
  },
  // Self-Employed & No Tax Returns
  {
    slug: 'no-income-verification-loans',
    title: 'No Income Verification Loans for Investment Property [2024 Guide]',
    excerpt: 'Get investment property loans without income verification. DSCR loans require no tax returns, W2s, or pay stubs. Qualify by rental income alone.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'Loan Guides'
  },
  {
    slug: 'dscr-loans-self-employed-california',
    title: 'DSCR Loans for Self-Employed: Complete Guide',
    excerpt: 'No tax returns? No problem. Learn how self-employed investors qualify for DSCR loans based on property income, not personal income.',
    date: '2024-09-23',
    readTime: '12 min read',
    category: 'Loan Guides'
  },
  {
    slug: 'no-tax-return-investment-property-loans',
    title: 'No Tax Return Investment Property Loans',
    excerpt: 'Discover 6 types of investment property loans that don\'t require tax returns. Perfect for self-employed and privacy-conscious investors.',
    date: '2024-09-23',
    readTime: '11 min read',
    category: 'Alternative Financing'
  },
  // Property Types
  {
    slug: 'airbnb-dscr-loans-california',
    title: 'Airbnb DSCR Loans: STR Financing Guide',
    excerpt: 'Finance your short-term rental with projected Airbnb income. Top markets, lender requirements, and success strategies for STR investors.',
    date: '2024-09-23',
    readTime: '10 min read',
    category: 'STR Financing'
  },
  {
    slug: 'dscr-loans-multi-family',
    title: 'DSCR Loans for Multi-Family Properties',
    excerpt: 'Finance duplexes, triplexes, and 4-plexes with DSCR loans. Higher rental income means better DSCR ratios and easier qualification.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'Property Types'
  },
  // Loan Comparisons
  {
    slug: 'dscr-vs-hard-money-loans',
    title: 'DSCR vs Hard Money Loans: Which is Better?',
    excerpt: 'Complete comparison of DSCR loans vs hard money. See rates, terms, costs, and when to use each type of financing for maximum profit.',
    date: '2024-09-24',
    readTime: '11 min read',
    category: 'Loan Comparisons'
  },
  {
    slug: 'dscr-vs-conventional-loans',
    title: 'DSCR vs Conventional Loans: Investment Property Comparison',
    excerpt: 'Compare DSCR loans vs conventional loans for investment properties. See rates, requirements, pros/cons, and when to use each type.',
    date: '2024-10-04',
    readTime: '12 min read',
    category: 'Loan Comparisons'
  },
  // Investment Strategies
  {
    slug: 'fix-and-flip-dscr-loans-california',
    title: 'Fix and Flip DSCR Loans: Complete Strategy Guide',
    excerpt: 'Learn advanced strategies for using DSCR loans in fix-and-flip projects. Flip-to-rent model, BRRRR method, and building wealth while flipping.',
    date: '2024-09-24',
    readTime: '12 min read',
    category: 'Investment Strategies'
  },
  {
    slug: 'portfolio-dscr-loans',
    title: 'Portfolio DSCR Loans: Finance Multiple Properties',
    excerpt: 'Scale your portfolio with DSCR loans for 5-10+ properties. Blanket loans, cross-collateralization, and portfolio financing strategies.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'Investment Strategies'
  },
  // Advanced Topics
  {
    slug: 'dscr-loan-refinancing',
    title: 'DSCR Loan Refinancing Guide: Cash-Out & Rate-Term',
    excerpt: 'Complete guide to DSCR loan refinancing. Cash-out refinance to pull equity, rate-and-term to lower payments. No income verification required.',
    date: '2024-10-04',
    readTime: '10 min read',
    category: 'Advanced Topics'
  },
  {
    slug: 'dscr-loans-foreign-investors',
    title: 'DSCR Loans for Foreign Investors: ITIN Guide',
    excerpt: 'Get DSCR loans as a foreign investor. ITIN requirements, non-US citizen financing, and international real estate investment strategies.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'Advanced Topics'
  },
  // Market Insights
  {
    slug: 'dscr-loan-predictions-2025',
    title: 'DSCR Loan Market Predictions 2025',
    excerpt: 'Expert predictions for DSCR loans in 2025. Rate forecasts, market trends, and what investors should expect in the coming year.',
    date: '2024-10-04',
    readTime: '10 min read',
    category: 'Market Insights'
  },
  {
    slug: 'dscr-loans-market-downturn',
    title: 'DSCR Loans During Market Downturns',
    excerpt: 'How to use DSCR loans during market downturns and recessions. Opportunity strategies, risk management, and recession-proof tactics.',
    date: '2024-10-04',
    readTime: '11 min read',
    category: 'Market Insights'
  },
  {
    slug: 'dscr-loan-tax-benefits',
    title: 'DSCR Loan Tax Benefits: Maximize Deductions',
    excerpt: 'Maximize tax benefits with DSCR loans. Learn about deductions, depreciation, 1031 exchanges, and strategies to reduce your tax burden.',
    date: '2024-10-04',
    readTime: '12 min read',
    category: 'Tax Strategies'
  },
  // Case Studies
  {
    slug: 'case-study-first-time-investor-620-credit',
    title: 'Case Study: First-Time Investor with 620 Credit Success',
    excerpt: 'Real success story: How a first-time investor with 620 credit score got approved for a DSCR loan and built wealth through real estate.',
    date: '2024-10-04',
    readTime: '9 min read',
    category: 'Success Stories'
  },
  {
    slug: 'case-study-10-property-portfolio',
    title: 'Case Study: Building a 10-Property Portfolio with DSCR',
    excerpt: 'Real case study: How one investor scaled from 1 to 10 properties in 2 years using DSCR loans. Portfolio building strategies revealed.',
    date: '2024-10-04',
    readTime: '10 min read',
    category: 'Success Stories'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              DSCR Loan Resources & Guides
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Expert insights on investment property financing in California & Nationwide
            </p>
            <p className="text-lg text-gray-400">
              Serving real estate investors across all 50 states with competitive DSCR loan solutions
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article key={post.slug} className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 hover:border-primary-500/40 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <span className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
