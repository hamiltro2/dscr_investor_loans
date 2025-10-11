'use client';

import Link from 'next/link';
import { MapPin, TrendingUp, DollarSign, Home, Palmtree, Building2, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRLoansFloridaPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR Loans Florida: Vacation Rental & Investment Property Guide 2025"
        description="Complete guide to DSCR loans in Florida. Perfect for vacation rentals, Airbnb properties, and long-term investments. Miami, Tampa, Orlando markets. Rates from 5.99%."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2025-01-05T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR_Loans_Florida_Vacation_Rental_Investment_Guide.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loans-florida"
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
              <span className="text-white">DSCR Loans Florida</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loans Florida: Vacation Rental & Investment Property Guide 2025
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: January 5, 2025</span>
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
              src="/DSCR_Loans_Florida_Vacation_Rental_Investment_Guide.png"
              alt="DSCR Loans Florida 2025 - Vacation rental and investment property financing for Miami, Orlando, Tampa markets"
              width={1200}
              height={630}
              priority={true}
              caption="DSCR Loans in Florida - Perfect for vacation rentals and investment properties"
            />
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Florida's booming real estate market offers exceptional opportunities for both vacation rental and 
                traditional investment properties. DSCR loans have become the go-to financing solution for Florida 
                investors, especially with the state's thriving short-term rental market. No state income tax, 
                year-round tourism, and strong appreciation make Florida ideal for DSCR loan investing.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Palmtree className="w-6 h-6 text-primary-400" />
                  Florida's DSCR Loan Advantage
                </h2>
                <p className="text-gray-300">
                  Florida's vacation rental market generates 2-3x higher income than traditional rentals, making 
                  DSCR ratios exceptionally strong. With no state income tax and landlord-friendly laws, Florida 
                  offers some of the best cash flow opportunities in the nation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Florida Markets */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Top Florida Markets for DSCR Loans
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Orlando/Kissimmee */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Orlando/Kissimmee</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Median Home Price:</span>
                    <span className="text-white font-semibold">$395,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">STR Monthly Income:</span>
                    <span className="text-white font-semibold">$4,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Typical DSCR:</span>
                    <span className="text-green-400 font-semibold">1.40-1.60</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-sm text-gray-300">
                      <strong>Best For:</strong> Disney vacation rentals, theme park proximity
                    </p>
                  </div>
                </div>
              </div>

              {/* Miami/Fort Lauderdale */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Miami/Fort Lauderdale</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Median Home Price:</span>
                    <span className="text-white font-semibold">$575,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">LTR Monthly Rent:</span>
                    <span className="text-white font-semibold">$3,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Typical DSCR:</span>
                    <span className="text-green-400 font-semibold">1.15-1.25</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-sm text-gray-300">
                      <strong>Best For:</strong> Long-term rentals, appreciation plays
                    </p>
                  </div>
                </div>
              </div>

              {/* Tampa/St. Petersburg */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Tampa/St. Petersburg</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Median Home Price:</span>
                    <span className="text-white font-semibold">$425,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">LTR Monthly Rent:</span>
                    <span className="text-white font-semibold">$2,400</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Typical DSCR:</span>
                    <span className="text-green-400 font-semibold">1.20-1.30</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-sm text-gray-300">
                      <strong>Best For:</strong> Balanced market, strong job growth
                    </p>
                  </div>
                </div>
              </div>

              {/* Jacksonville */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Jacksonville</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Median Home Price:</span>
                    <span className="text-white font-semibold">$345,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">LTR Monthly Rent:</span>
                    <span className="text-white font-semibold">$1,900</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Typical DSCR:</span>
                    <span className="text-green-400 font-semibold">1.25-1.35</span>
                  </div>
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-sm text-gray-300">
                      <strong>Best For:</strong> Cash flow, affordable entry point
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vacation Rental Focus */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              DSCR Loans for Florida Vacation Rentals
            </h2>

            <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-8 border border-primary-500/30 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Florida STRs Excel with DSCR Loans</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">Income Advantages</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Year-round tourism demand</li>
                    <li>• Disney/Universal proximity premiums</li>
                    <li>• Beach rental income potential</li>
                    <li>• 70-80% occupancy rates possible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary-400 mb-3">DSCR Benefits</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Use projected STR income</li>
                    <li>• AirDNA reports accepted</li>
                    <li>• Higher DSCR ratios = better rates</li>
                    <li>• No personal income needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Invest in Florida Real Estate?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get pre-approved for a Florida DSCR loan in 24-48 hours. Perfect for vacation rentals and investment properties.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/landing/dscr-loans"
                className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Get Pre-Approved Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:949-339-3555"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20"
              >
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
