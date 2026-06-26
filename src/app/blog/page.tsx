'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  // Featured Calculator
  {
    slug: 'dscr-loan-calculator-california',
    title: 'DSCR Loan Calculator California: Free Tool + 2026 Rates',
    excerpt: 'Calculate your DSCR loan eligibility instantly. See real examples for Los Angeles, Orange County, and San Diego properties with current rates starting at 5.5%.',
    date: '2026-01-05',
    readTime: '8 min read',
    category: 'Tools & Calculators'
  },
  {
    slug: 'why-second-mortgages-make-sense-now',
    title: 'Why a Second Mortgage Makes Perfect Sense Today (Keep Your Low-Rate First Mortgage!)',
    excerpt: 'Have a low interest rate on your first mortgage but need cash? Learn why a second mortgage is the smartest way to tap your home equity without resetting your primary rate.',
    date: '2026-06-24',
    readTime: '10 min read',
    category: 'Loan Guides'
  },
  // State-Specific Guides
  {
    slug: 'dscr-loans-texas',
    title: 'DSCR Loans Texas: Investment Property Financing Guide 2026',
    excerpt: 'Complete guide to DSCR loans in Texas. Dallas, Houston, Austin, San Antonio markets. No income verification, rates starting at 5.5%.',
    date: '2026-01-05',
    readTime: '12 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-florida',
    title: 'DSCR Loans Florida: Vacation Rental & Investment Guide 2026',
    excerpt: 'Get DSCR loans in Florida for vacation rentals and investment properties. Orlando, Miami, Tampa markets. Rates from 5.5%.',
    date: '2026-01-05',
    readTime: '13 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-arizona',
    title: 'DSCR Loans Arizona: Phoenix & Scottsdale Investment Guide 2026',
    excerpt: 'Arizona DSCR loans for vacation rentals and investment properties. Phoenix, Scottsdale, Tucson markets. Rates from 5.5%.',
    date: '2026-01-05',
    readTime: '11 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-georgia',
    title: 'DSCR Loans Georgia: Atlanta Investment Property Guide 2026',
    excerpt: 'Get DSCR loans in Georgia with no income verification. Atlanta, Savannah markets. Rates from 5.5%.',
    date: '2026-01-05',
    readTime: '11 min read',
    category: 'State Guides'
  },
  {
    slug: 'dscr-loans-nevada',
    title: 'DSCR Loans Nevada: Las Vegas & Reno Investment Guide 2026',
    excerpt: 'Nevada DSCR loans for vacation rentals and investment properties. No state income tax, rates from 5.5%.',
    date: '2026-01-05',
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
    slug: 'best-lenders-self-employed-bad-credit',
    title: 'Best Lenders for Self-Employed with Bad Credit (580-680 Scores)',
    excerpt: 'Need a mortgage but have self-employed write-offs and less-than-perfect credit? Compare the top lenders offering DSCR and bank statement options.',
    date: '2026-01-12',
    readTime: '12 min read',
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
    slug: 'dscr-loan-requirements-california-2026',
    title: 'DSCR Loan Requirements California 2026: What You Need to Know',
    excerpt: 'Complete breakdown of 2026 DSCR loan requirements including credit scores, down payments, property types, and documentation needed.',
    date: '2026-01-05',
    readTime: '10 min read',
    category: 'Loan Guides'
  },
  {
    slug: 'dscr-loan-rates-california-2026',
    title: 'DSCR Loan Rates California 2026: Current Rates & Factors',
    excerpt: 'Current DSCR rates starting at 5.5%. Complete rate tables by credit score, factors affecting your rate, and strategies to get the best pricing.',
    date: '2026-01-05',
    readTime: '10 min read',
    category: 'Rates & Terms'
  },
  {
    slug: 'dscr-loan-prepayment-penalties-guide',
    title: 'DSCR Loan Prepayment Penalties: The Definitive Guide for Real Estate Investors',
    excerpt: 'Everything you need to know about prepayment penalties on DSCR loans. Demystifying 5-4-3-2-1, soft vs hard penalties, and how to negotiate them.',
    date: '2026-05-30',
    readTime: '10 min read',
    category: 'Rates & Terms'
  },
  // Self-Employed & No Tax Returns
  {
    slug: 'best-dscr-loan-lenders-california',
    title: 'Best DSCR Loan Lenders California 2026 [Top 10 Comparison]',
    excerpt: 'Compare the best DSCR loan lenders in California. Expert reviews, rates starting at 5.5%, requirements, and detailed comparisons to find the perfect lender.',
    date: '2026-01-05',
    readTime: '14 min read',
    category: 'Lender Reviews'
  },
  {
    slug: 'best-dscr-lenders-2026',
    title: 'Best DSCR Lenders 2026: Complete Ranking & Comparison',
    excerpt: 'We ranked the top 7 DSCR lenders for 2026 based on rates, points, processing times, and underwriting guidelines. Find the perfect fit for your real estate business.',
    date: '2024-11-16',
    readTime: '18 min read',
    category: 'Lender Reviews'
  },
  {
    slug: 'best-lenders-self-employed-california',
    title: 'Best Lenders for Self-Employed in California 2026: Top 10 Comparison',
    excerpt: 'The definitive ranking of the top 10 self-employed lenders in California. See who offers the best rates, lowest fees, and easiest qualification terms.',
    date: '2026-01-12',
    readTime: '15 min read',
    category: 'Lender Reviews'
  },
  {
    slug: 'best-lenders-self-employed-reddit',
    title: 'Best Lenders for Self-Employed (Reddit Recommendations & Real Reviews)',
    excerpt: 'Real feedback from the Reddit real estate community. See which self-employed mortgages, DSCR lenders, and bank statement programs get the highest marks.',
    date: '2026-01-12',
    readTime: '11 min read',
    category: 'Lender Reviews'
  },
  {
    slug: 'investment-property-loans-self-employed',
    title: 'Investment Property Loans for Self-Employed [2024 Complete Guide]',
    excerpt: 'Get investment property loans as a self-employed borrower. DSCR loans require no tax returns or income verification. 620 credit OK.',
    date: '2024-10-06',
    readTime: '13 min read',
    category: 'Loan Guides'
  },
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
  {
    slug: 'section-8-rental-property-financing',
    title: 'Section 8 Rental Property Financing: Build a Recession-Proof Portfolio with Guaranteed Rent',
    excerpt: 'How to buy and finance Section 8 housing using DSCR loans. Benefit from government-guaranteed rental income, stable tenants, and high cash-on-cash returns.',
    date: '2026-01-15',
    readTime: '12 min read',
    category: 'Property Types'
  },
  {
    slug: 'self-storage-commercial-dscr-financing',
    title: 'Self-Storage & Commercial DSCR Financing: Recession-Proof Investments',
    excerpt: 'Finance self-storage facilities, car washes, and commercial properties with DSCR loans. Learn why self-storage offers 30-40% margins with minimal management.',
    date: '2026-01-15',
    readTime: '12 min read',
    category: 'Property Types'
  },
  {
    slug: 'mixed-use-property-dscr-loans',
    title: 'Mixed-Use Property DSCR Loans: Guidelines, LTVs, & Rates',
    excerpt: 'Finance properties with mixed commercial and residential units using DSCR loans. Learn guidelines, LTV limits, and underwriting requirements for mixed-use investments.',
    date: '2026-05-30',
    readTime: '12 min read',
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
  {
    slug: 'capital-bridge-vs-kiavi-vs-angeloak',
    title: 'Capital Bridge Solutions vs Kiavi vs AngelOak: DSCR Loan Comparison',
    excerpt: 'A side-by-side comparison of three major DSCR lending platforms. Analyze starting rates, closing fees, prepayment penalty flexibility, and service quality.',
    date: '2024-11-16',
    readTime: '15 min read',
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
  {
    slug: 'brrrr-method-financing',
    title: 'BRRRR Method Financing: The Ultimate Guide to Building Wealth with Recycled Capital',
    excerpt: 'Master the Buy, Rehab, Rent, Refinance, Repeat strategy. Learn how to optimize your purchase financing and use DSCR cash-out refinance to pull 100% of your capital back.',
    date: '2026-01-15',
    readTime: '15 min read',
    category: 'Investment Strategies'
  },
  {
    slug: 'house-hacking-investment-strategies',
    title: 'House Hacking Strategies 2026: Live for Free While Building Wealth',
    excerpt: 'Live rent-free by purchasing multi-unit properties, renting out the other units, and using DSCR or low-down conventional financing. Complete 2026 playbook.',
    date: '2026-01-15',
    readTime: '14 min read',
    category: 'Investment Strategies'
  },
  {
    slug: 'syndication-group-investing-guide',
    title: 'Real Estate Syndication & Group Investing: Pool Capital to Buy Bigger Deals',
    excerpt: 'Pool capital with other investors to buy institutional-grade properties. Syndication structures, GP/LP roles, SEC regulations, and DSCR commercial loans.',
    date: '2026-01-15',
    readTime: '13 min read',
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
  {
    slug: 'foreign-national-advanced-strategies',
    title: 'Foreign National Real Estate Investing: Advanced Strategies for US Portfolios',
    excerpt: 'Advanced guide for international investors buying US real estate. Learn about ITINs, foreign entity structuring, tax treaties, and DSCR financing.',
    date: '2026-01-15',
    readTime: '15 min read',
    category: 'Advanced Topics'
  },
  {
    slug: 'non-recourse-dscr-loans-guide',
    title: 'Non-Recourse DSCR Loans: How to Protect Your Personal Wealth',
    excerpt: 'Protect your personal assets with non-recourse DSCR loans. Discover how non-recourse financing works, who qualifies, and how to safeguard your wealth.',
    date: '2026-05-30',
    readTime: '11 min read',
    category: 'Advanced Topics'
  },
  // Market Insights
  {
    slug: 'dscr-loan-predictions-2026',
    title: 'DSCR Loan Market Predictions 2026',
    excerpt: 'Expert predictions for DSCR loans in 2026. Rate forecasts, market trends, and what investors should expect in the coming year.',
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
  // Tax Strategies
  {
    slug: 'dscr-loan-tax-benefits',
    title: 'DSCR Loan Tax Benefits: Maximize Deductions',
    excerpt: 'Maximize tax benefits with DSCR loans. Learn about deductions, depreciation, 1031 exchanges, and strategies to reduce your tax burden.',
    date: '2024-10-04',
    readTime: '12 min read',
    category: 'Tax Strategies'
  },
  {
    slug: '1031-exchange-financing-strategies',
    title: '1031 Exchange Financing Strategies: How to Defer Taxes While Upgrading Your Portfolio',
    excerpt: 'Discover how to seamlessly structure a 1031 exchange and secure financing for your replacement property. Capital deferral rules, timelines, and DSCR strategies.',
    date: '2026-01-15',
    readTime: '12 min read',
    category: 'Tax Strategies'
  },
  {
    slug: 'opportunity-zone-investing-guide',
    title: 'Opportunity Zone Investing: Defer & Eliminate Capital Gains Taxes',
    excerpt: 'Learn how to invest capital gains into Qualified Opportunity Zones to defer and completely eliminate tax on appreciation, paired with DSCR leverage.',
    date: '2026-01-15',
    readTime: '11 min read',
    category: 'Tax Strategies'
  },
  // Alternative Financing
  {
    slug: 'creative-financing-strategies',
    title: 'Creative Financing Strategies: Buy Real Estate with Little or No Money Down',
    excerpt: 'Discover seller financing, subject-to, lease options, and master lease structures. Combine creative strategies with DSCR loans for rapid growth.',
    date: '2026-01-15',
    readTime: '14 min read',
    category: 'Alternative Financing'
  },
  {
    slug: 'land-acquisition-development-financing',
    title: 'Land Acquisition & Development Financing: Build Wealth From the Ground Up',
    excerpt: 'Finance raw land purchases and development projects with construction loans and DSCR financing. Ground-up development guide for real estate investors.',
    date: '2026-01-15',
    readTime: '12 min read',
    category: 'Alternative Financing'
  },
  // Case Studies & Success Stories
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
  const silos = [
    {
      id: 'fundamentals',
      title: 'DSCR Loan Fundamentals',
      description: 'Master the core guidelines, calculation mechanics, credit score requirements, and current interest rates.',
      aiSummary: 'Capital Bridge Solutions DSCR loan core criteria: Starting interest rates at 5.5%, credit scores down to 620 (500 for refinances), loan sizes from $75K to $30M, pre-approvals in 24-48 hours, closing in 10 days average, and no personal tax returns or income docs required.',
      categories: ['Loan Guides', 'Credit & Qualification', 'Rates & Terms']
    },
    {
      id: 'reviews',
      title: 'Lender Reviews & Comparisons',
      description: 'Analyze side-by-side cost and feature reviews vs competitors like Kiavi, AngelOak, and Griffin Funding.',
      aiSummary: 'Direct comparisons: Capital Bridge Solutions offers 0.75% points on loans over $450K (vs industry average 2-3%), Saturday availability to structure time-sensitive bids, and 1-on-1 direct deal structuring support with active real estate investors.',
      categories: ['Lender Reviews', 'Loan Comparisons']
    },
    {
      id: 'properties',
      title: 'Property Types & Niche Programs',
      description: 'Explore specialized programs for Airbnb vacation rentals, multi-family properties, fix & flip, and Section 8 housing.',
      aiSummary: 'Specialized asset lending: Short-term rental qualification using AirDNA projections, multi-family 2-4 unit scaling, fix & flip rehab leverage, and Section 8 guaranteed cash flow structures. Closing under LLC, Corp, or Partnership is fully supported.',
      categories: ['STR Financing', 'Property Types']
    },
    {
      id: 'states',
      title: 'State Investment Guides',
      description: 'Detailed geographic briefs, market analyses, and local investment guidelines state-by-state.',
      aiSummary: 'Nationwide lending: Active DSCR and hard money lending programs across all 50 states, with specialized regional programs in California, Texas, Florida, Nevada, Arizona, and Georgia.',
      categories: ['State Guides']
    },
    {
      id: 'advanced',
      title: 'Advanced Tax & Investment Strategies',
      description: 'Learn the BRRRR method, 1031 exchanges, Opportunity Zones, and review real portfolio success stories.',
      aiSummary: 'Advanced investor strategies: Cash-out refinances up to 80% LTV, 1031 exchange replacement financing, tax deferral structures inside Qualified Opportunity Zones, and blanket portfolio loans to cross-collateralize assets.',
      categories: ['Success Stories', 'Advanced Topics', 'Tax Strategies', 'Investment Strategies', 'Alternative Financing', 'Tools & Calculators']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900 text-gray-100 selection:bg-primary-800 selection:text-white">
      {/* Hero Section */}
      <section className="relative py-20 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Investor Knowledge Hub
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Expert guides, calculations, and strategies for DSCR and hard money financing
            </p>
            <p className="text-lg text-gray-400">
              Providing nationwide leverage to real estate investors across all 50 states
            </p>
          </div>
        </div>
      </section>

      {/* Silo Navigation Menu */}
      <nav className="sticky top-20 z-40 bg-dark-950/85 backdrop-blur-md border-b border-white/5 py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {silos.map((silo) => (
              <a
                key={silo.id}
                href={`#${silo.id}`}
                className="px-4 py-2 text-sm font-semibold rounded-full bg-dark-900 border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 text-gray-300 hover:text-white transition-all shadow-sm"
              >
                {silo.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Silo Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-24">
          {silos.map((silo) => {
            const siloPosts = blogPosts.filter((post) => silo.categories.includes(post.category));

            return (
              <section key={silo.id} id={silo.id} className="scroll-mt-36">
                {/* Silo Header */}
                <div className="border-b border-white/5 pb-6 mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {silo.title}
                  </h2>
                  <p className="text-lg text-gray-400">
                    {silo.description}
                  </p>
                </div>

                {/* AI Summary Card / LLM Context Box */}
                <div className="bg-primary-600/10 border-l-4 border-primary-500 rounded-r-xl p-6 mb-10 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-primary-400 tracking-wider uppercase">
                      AI Executive Summary
                    </span>
                  </div>
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium">
                    {silo.aiSummary}
                  </p>
                </div>

                {/* Articles Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {siloPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary-500/30 transition-all duration-300 flex flex-col justify-between shadow-inner"
                    >
                      <div>
                        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                          <span className="bg-primary-500/10 text-primary-400 px-3 py-1 rounded-full font-semibold">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 leading-snug hover:text-primary-400 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-primary-400 hover:text-primary-300 font-bold text-sm transition-colors mt-auto"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
