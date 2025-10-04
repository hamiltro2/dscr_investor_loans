'use client';

import Link from 'next/link';
import { CheckCircle, XCircle, FileText, Calculator, Shield, DollarSign, Home, Clock, Target, AlertCircle, ArrowRight } from 'lucide-react';
import { ChallengesSection, FAQSection, CTASection } from './challenges-faq-cta';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function HowToQualifyPage() {
  return (
    <>
      <ArticleSchema 
        headline="How to Qualify for DSCR Loan: Complete California Guide"
        description="Step-by-step guide to qualifying for a DSCR loan in California. Requirements, calculations, documents needed, and expert tips for approval."
        datePublished="2024-09-24T00:00:00.000Z"
        dateModified="2024-09-24T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/How_to_qualify for DSCR loans.png"
        url="https://www.capitalbridgesolutions.com/blog/how-to-qualify-for-dscr-loan"
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
              <span className="text-white">How to Qualify for DSCR Loan</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How to Qualify for DSCR Loan: Complete California Guide
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: September 24, 2024</span>
              <span>•</span>
              <span>13 min read</span>
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
              src="/How_to_qualify for DSCR loans.png"
              alt="How to Qualify for DSCR Loan California - Complete step-by-step guide to getting approved for investment property financing"
              width={1200}
              height={630}
              priority={true}
              caption="How to Qualify for DSCR Loans - Your complete guide to approval in California"
            />
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Qualifying for a DSCR loan in California is fundamentally different from traditional mortgage 
                qualification. Instead of proving your personal income, you'll need to demonstrate that the 
                investment property generates enough rental income to cover its expenses. This comprehensive 
                guide walks you through every requirement, calculation, and strategy to get approved for your 
                DSCR loan.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary-400" />
                  The DSCR Advantage
                </h2>
                <p className="text-gray-300">
                  No tax returns. No employment verification. No debt-to-income ratios. DSCR loans focus solely 
                  on the property's ability to generate income, making them perfect for self-employed investors, 
                  those with complex finances, or anyone who wants privacy in their lending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Requirements */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Core DSCR Loan Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Minimum Requirements */}
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary-400" />
                  Minimum Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Credit Score: 620+</strong>
                      <p className="text-sm text-gray-300">Most lenders require 660-680</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Down Payment: 20-25%</strong>
                      <p className="text-sm text-gray-300">Lower scores need 25-30%</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">DSCR Ratio: 1.0+</strong>
                      <p className="text-sm text-gray-300">1.2+ for best terms</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Reserves: 3-6 months</strong>
                      <p className="text-sm text-gray-300">PITIA payments in liquid funds</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* What's NOT Required */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <XCircle className="w-6 h-6 text-green-400" />
                  What's NOT Required
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Tax Returns</strong>
                      <p className="text-sm text-gray-300">No personal income docs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Pay Stubs</strong>
                      <p className="text-sm text-gray-300">Employment not verified</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">DTI Ratios</strong>
                      <p className="text-sm text-gray-300">Personal debt ignored</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 mt-1">✗</span>
                    <div>
                      <strong className="text-white">Primary Residence</strong>
                      <p className="text-sm text-gray-300">Can be first property</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding DSCR Calculation */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Understanding the DSCR Calculation
            </h2>

            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary-400 mb-2">
                  DSCR = Monthly Rental Income ÷ Monthly PITIA
                </div>
                <p className="text-gray-300">
                  PITIA = Principal + Interest + Taxes + Insurance + HOA (if applicable)
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                  <div className="text-2xl font-bold text-red-400">&lt; 1.0</div>
                  <p className="text-sm text-gray-300">Negative cash flow</p>
                  <p className="text-xs text-gray-400 mt-1">Harder to qualify</p>
                </div>
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                  <div className="text-2xl font-bold text-yellow-400">1.0 - 1.2</div>
                  <p className="text-sm text-gray-300">Break-even to slight positive</p>
                  <p className="text-xs text-gray-400 mt-1">Standard qualification</p>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">&gt; 1.2</div>
                  <p className="text-sm text-gray-300">Strong cash flow</p>
                  <p className="text-xs text-gray-400 mt-1">Best rates & terms</p>
                </div>
              </div>
            </div>

            {/* Real Example */}
            <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-6 border border-primary-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Real DSCR Calculation Example</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary-400 mb-3">Income Side</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex justify-between">
                      <span>Monthly Rent:</span>
                      <span className="font-semibold">$4,500</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-3">Expense Side (PITIA)</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex justify-between">
                      <span>Principal & Interest:</span>
                      <span>$2,750</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Property Taxes:</span>
                      <span>$625</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Insurance:</span>
                      <span>$150</span>
                    </li>
                    <li className="flex justify-between">
                      <span>HOA:</span>
                      <span>$0</span>
                    </li>
                    <li className="flex justify-between border-t border-gray-600 pt-2">
                      <span className="font-semibold">Total PITIA:</span>
                      <span className="font-semibold">$3,525</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-lg">
                  <span className="text-gray-300">DSCR = $4,500 ÷ $3,525 = </span>
                  <span className="text-2xl font-bold text-green-400">1.28</span>
                </p>
                <p className="text-sm text-gray-300 mt-1">Excellent! Qualifies for best rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Step-by-Step DSCR Loan Process
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Pre-Qualification</h3>
                    <p className="text-gray-300 mb-3">
                      Start by getting pre-qualified to understand your buying power:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Soft credit pull to check score</li>
                      <li>• Verify liquid assets for down payment</li>
                      <li>• Discuss target property types</li>
                      <li>• Get estimated rate and terms</li>
                    </ul>
                    <div className="mt-4 p-3 bg-primary-500/10 rounded-lg border border-primary-500/30">
                      <p className="text-sm text-gray-300">
                        <strong className="text-primary-400">Timeline:</strong> 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">Property Selection</h3>
                    <p className="text-gray-300 mb-3">
                      Find a property that meets DSCR requirements:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Calculate potential DSCR before offering</li>
                      <li>• Use rent comps or existing leases</li>
                      <li>• Factor in all expenses (PITIA)</li>
                      <li>• Target 1.2+ DSCR for best terms</li>
                    </ul>
                    <div className="mt-4 p-3 bg-primary-500/10 rounded-lg border border-primary-500/30">
                      <p className="text-sm text-gray-300">
                        <strong className="text-primary-400">Pro Tip:</strong> Get rent estimates from property managers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional steps continue... */}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Needed */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Documents You'll Need
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Documents */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary-400" />
                  Basic Documents
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Government-issued photo ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>2 months bank statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Purchase contract</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Proof of down payment funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Entity docs (if using LLC)</span>
                  </li>
                </ul>
              </div>

              {/* Property Documents */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Home className="w-6 h-6 text-primary-400" />
                  Property Documents
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Current lease (if tenant-occupied)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Rent roll (for multi-units)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Property tax bill</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Insurance quote</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>HOA docs (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <ChallengesSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
      </article>
    </>
  );
}
