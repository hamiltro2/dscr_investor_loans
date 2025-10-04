'use client';

import Link from 'next/link';
import { MapPin, DollarSign, Building2, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRLoansNevadaPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR Loans Nevada: Las Vegas & Reno Investment Guide 2024"
        description="Get DSCR loans in Nevada for vacation rentals and investment properties. Las Vegas, Reno markets. No state income tax, rates from 7.25%."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/Airbnb_DSCR_Loans.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loans-nevada"
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
              <span className="text-white">DSCR Loans Nevada</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loans Nevada: Las Vegas & Reno Investment Guide 2024
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
              src="/Airbnb_DSCR_Loans.png"
              alt="DSCR Loans Nevada - Las Vegas and Reno vacation rental and investment property financing"
              width={1200}
              height={630}
              priority={true}
              caption="DSCR Loans in Nevada - Perfect for Las Vegas vacation rentals and Reno investments"
            />
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Nevada offers exceptional opportunities for DSCR loan investors with no state income tax, 
                thriving vacation rental markets in Las Vegas, and strong growth in Reno. Tourism-driven rental 
                income makes DSCR ratios highly favorable. Qualify based on rental income alone—no tax returns 
                or income verification required.
              </p>
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-primary-400" />
                  Nevada's Tax-Free Advantage
                </h2>
                <p className="text-gray-300">
                  No state income tax means better cash flow for investors. Las Vegas vacation rentals generate 
                  premium income from year-round tourism, while Reno offers strong long-term rental demand from 
                  tech industry growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Top Nevada Markets for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Las Vegas</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Median Home Price:</span>
                    <span className="text-white font-semibold">$425,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">STR Monthly Income:</span>
                    <span className="text-white font-semibold">$3,800</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Typical DSCR:</span>
                    <span className="text-green-400 font-semibold">1.40-1.55</span>
                  </div>
                  <p className="text-sm text-gray-300 pt-3 border-t border-gray-700">
                    <strong>Best For:</strong> Vacation rentals, tourism-driven income
                  </p>
                </div>
              </div>
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Reno/Sparks</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Median Home Price:</span>
                    <span className="text-white font-semibold">$515,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Rent:</span>
                    <span className="text-white font-semibold">$2,400</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Typical DSCR:</span>
                    <span className="text-green-400 font-semibold">1.15-1.25</span>
                  </div>
                  <p className="text-sm text-gray-300 pt-3 border-t border-gray-700">
                    <strong>Best For:</strong> Tech workers, Tesla/Panasonic employees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest in Nevada Real Estate?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get pre-approved for a Nevada DSCR loan in 24-48 hours. Perfect for vacation rentals and investment properties.
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
