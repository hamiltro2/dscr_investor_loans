'use client';

import Link from 'next/link';
import { CheckCircle, XCircle, TrendingUp, FileText, Calculator, Phone, ArrowRight, AlertCircle, DollarSign, Home } from 'lucide-react';
import { FAQSection, CTASection } from './faq-section';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRSelfEmployedPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR Loans for Self-Employed in California: Complete Guide"
        description="No tax returns? No problem. Learn how self-employed investors qualify for DSCR loans based on property income, not personal income. Get approved in 24-48 hours."
        datePublished="2024-09-23T00:00:00.000Z"
        dateModified="2024-09-23T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/Self-employed-DSCR_loans.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loans-self-employed-california"
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
              <span className="text-white">DSCR Loans for Self-Employed</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loans for Self-Employed in California: Complete Guide
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: September 23, 2024</span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>By Capital Bridge Solutions Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BlogImage 
              src="/Self-employed-DSCR_loans.png"
              alt="DSCR Loans for Self-Employed California - No tax returns required for investment property financing"
              width={1200}
              height={630}
              priority={true}
              caption="Self-Employed? Get DSCR loans without tax returns or income verification"
            />

            {/* California DSCR Hub Callout */}
            <div className="my-12 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary-500/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                    <Calculator className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Complete California DSCR Loan Guide
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Explore our comprehensive guide covering all California markets, requirements, FAQs, and neighborhood analyses for LA, San Diego, San Francisco, Orange County, and Sacramento.
                  </p>
                  <a 
                    href="/locations/california/dscr-loans"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    View Complete CA Guide
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                As a self-employed real estate investor in California, you've likely faced the frustration 
                of traditional mortgage applications. Despite having successful businesses and strong cash 
                flow, your tax returns might not reflect your true borrowing power due to legitimate 
                business deductions. DSCR loans offer a solution—qualifying you based on the property's 
                income, not your personal tax returns.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-primary-400" />
                  Key Takeaway for Self-Employed Investors
                </h2>
                <p className="text-gray-300">
                  DSCR loans evaluate your investment property's rental income to determine loan eligibility, 
                  completely bypassing personal income verification. No W-2s, no tax returns, no employment 
                  verification—just proof that the property generates enough income to cover the mortgage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Self-Employed Choose DSCR */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Why Self-Employed Investors Choose DSCR Loans
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Traditional Loan Challenges */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                  Traditional Loan Challenges
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    Tax deductions reduce qualifying income
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    Irregular income patterns cause issues
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    Multiple income sources complicate approval
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    Business expenses lower DTI ratios
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✗</span>
                    2 years of tax returns required
                  </li>
                </ul>
              </div>

              {/* DSCR Loan Benefits */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  DSCR Loan Advantages
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    No personal income verification
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Property income is all that matters
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Business structure doesn't affect approval
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Fast approval (24-48 hours)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    Unlimited properties possible
                  </li>
                </ul>
              </div>
            </div>

            {/* Real Example */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Real California Example: Tech Entrepreneur's Success</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">The Challenge:</h4>
                  <p className="text-gray-300 mb-4">
                    Sarah, a software consultant in San Francisco, earned $300K+ annually but showed 
                    only $65K taxable income after business deductions. Traditional lenders rejected 
                    her application for a $750K investment property.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Gross Income: $300,000+</li>
                    <li>• Taxable Income: $65,000</li>
                    <li>• Traditional DTI: 68% (Denied)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">The DSCR Solution:</h4>
                  <p className="text-gray-300 mb-4">
                    Using a DSCR loan, Sarah qualified based on the property's $4,500 monthly rent, 
                    not her tax returns. She closed in 18 days with competitive rates.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Property Rent: $4,500/month</li>
                    <li>• PITIA: $3,600/month</li>
                    <li>• DSCR Ratio: 1.25 (Approved)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualification Requirements */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              DSCR Loan Requirements for Self-Employed Borrowers
            </h2>

            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">What You Need to Qualify</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">Property Requirements</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>DSCR ratio of 1.0 or higher (1.25+ for best rates)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Residential 1-4 units, condos, or townhomes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Non-owner occupied (investment only)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Located in California (all counties)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">Borrower Requirements</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Minimum 620 credit score (700+ for best terms)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>20-30% down payment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>3-6 months reserves (PITIA payments)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Entity ownership allowed (LLC, Corp)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Documents Needed */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-400" />
                Documents Needed (No Tax Returns!)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Required Documents:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ Driver's license or passport</li>
                    <li>✓ Credit authorization</li>
                    <li>✓ Purchase contract (if buying)</li>
                    <li>✓ Rent roll or lease agreements</li>
                    <li>✓ Property insurance quote</li>
                    <li>✓ HOA docs (if applicable)</li>
                    <li>✓ Bank statements (2 months)</li>
                    <li>✓ Entity docs (if using LLC)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">NOT Required:</h4>
                  <ul className="space-y-2 text-gray-300 opacity-60">
                    <li>✗ Tax returns (personal or business)</li>
                    <li>✗ W-2s or 1099s</li>
                    <li>✗ Pay stubs</li>
                    <li>✗ Employment verification</li>
                    <li>✗ Profit & loss statements</li>
                    <li>✗ Business bank statements</li>
                    <li>✗ CPA letters</li>
                    <li>✗ Income documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Structures */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Best Business Structures for DSCR Loans
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">Single-Member LLC</h3>
                <p className="text-gray-300 mb-4">
                  Most popular choice. Provides asset protection while maintaining simple tax structure. 
                  No additional underwriting required.
                </p>
                <div className="text-sm text-primary-400">Best for: 1-4 properties</div>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">Series LLC</h3>
                <p className="text-gray-300 mb-4">
                  Allows multiple properties under one entity with separate liability protection. 
                  Cost-effective for larger portfolios.
                </p>
                <div className="text-sm text-primary-400">Best for: 5+ properties</div>
              </div>

              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-lg font-bold text-white mb-3">Trust Ownership</h3>
                <p className="text-gray-300 mb-4">
                  Land trusts or living trusts can hold title. Provides privacy and estate planning 
                  benefits. May require additional docs.
                </p>
                <div className="text-sm text-primary-400">Best for: Estate planning</div>
              </div>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-white">Pro Tip:</strong> Most DSCR lenders allow vesting in an 
                LLC after closing at no additional cost. This lets you close faster in your personal 
                name, then transfer to your entity for asset protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Step-by-Step DSCR Loan Process for Self-Employed
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Pre-Qualification (5 minutes)</h3>
                  <p className="text-gray-300 mb-3">
                    Provide basic information: property address, estimated rent, purchase price, and credit score range. 
                    Get instant feedback on DSCR ratio and estimated rates.
                  </p>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-300">
                    <strong>What happens:</strong> Loan officer calculates DSCR and provides rate quote
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Application & Credit (Day 1-2)</h3>
                  <p className="text-gray-300 mb-3">
                    Complete simple application focusing on property details. Authorize credit check. 
                    No income documentation needed—just asset verification.
                  </p>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-300">
                    <strong>Documents needed:</strong> ID, credit auth, bank statements, entity docs
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Property Analysis (Day 3-5)</h3>
                  <p className="text-gray-300 mb-3">
                    Appraiser evaluates property and provides rent schedule. Underwriter calculates 
                    official DSCR using appraisal rent estimate and actual PITIA.
                  </p>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-300">
                    <strong>Key milestone:</strong> Appraisal confirms rent supports DSCR requirement
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Underwriting (Day 6-10)</h3>
                  <p className="text-gray-300 mb-3">
                    Final review of all documents. Conditions cleared quickly since no income verification 
                    needed. Title and insurance ordered.
                  </p>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-300">
                    <strong>Typical conditions:</strong> Insurance binder, final bank statements
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    5
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Closing (Day 14-21)</h3>
                  <p className="text-gray-300 mb-3">
                    Sign loan documents at title company or via mobile notary. Fund same day or next day. 
                    Start collecting rent immediately!
                  </p>
                  <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-300">
                    <strong>Final step:</strong> Transfer to LLC if desired (optional)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Strategy Section */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Smart Tax Strategies for Self-Employed DSCR Borrowers
            </h2>

            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-primary-400" />
                Maximize Benefits Without Affecting DSCR Qualification
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">Continue Taking Deductions:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Home office expenses</li>
                    <li>• Vehicle and mileage</li>
                    <li>• Business equipment (Section 179)</li>
                    <li>• Professional services</li>
                    <li>• Retirement contributions</li>
                    <li>• Health insurance premiums</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-4">New Property Deductions:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Mortgage interest</li>
                    <li>• Property depreciation</li>
                    <li>• Repairs and maintenance</li>
                    <li>• Property management fees</li>
                    <li>• Insurance and taxes</li>
                    <li>• Cost segregation studies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-white">Important:</strong> Since DSCR loans don't consider your 
                personal income, you can maximize tax deductions without worrying about qualifying for 
                future loans. This is a major advantage over traditional financing where reducing taxable 
                income hurts your borrowing power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* California Market Insights */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Best California Markets for Self-Employed DSCR Investors (2024)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-dark-800/50 backdrop-blur-sm rounded-xl border border-primary-500/20">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-6 text-gray-300">Market</th>
                    <th className="text-left py-4 px-6 text-gray-300">Avg DSCR</th>
                    <th className="text-left py-4 px-6 text-gray-300">Median Price</th>
                    <th className="text-left py-4 px-6 text-gray-300">Rent/Price</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-white">Riverside County</div>
                        <div className="text-sm">High cash flow potential</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">1.35</td>
                    <td className="py-4 px-6">$525K</td>
                    <td className="py-4 px-6">0.65%</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-white">Sacramento</div>
                        <div className="text-sm">Growing tech market</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">1.28</td>
                    <td className="py-4 px-6">$475K</td>
                    <td className="py-4 px-6">0.62%</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-white">San Bernardino</div>
                        <div className="text-sm">Affordable entry point</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">1.31</td>
                    <td className="py-4 px-6">$450K</td>
                    <td className="py-4 px-6">0.68%</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-white">Fresno</div>
                        <div className="text-sm">Highest yields</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">1.42</td>
                    <td className="py-4 px-6">$385K</td>
                    <td className="py-4 px-6">0.74%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-white">Long Beach</div>
                        <div className="text-sm">Coastal appreciation</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">1.15</td>
                    <td className="py-4 px-6">$725K</td>
                    <td className="py-4 px-6">0.52%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              *Data based on 3BR single-family homes with 20% down payment at 7.5% interest rate
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Common Questions from Self-Employed Investors
            </h2>
            <FAQSection />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
      </article>
    </>
  );
}
