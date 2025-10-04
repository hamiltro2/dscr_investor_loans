'use client';

import Link from 'next/link';
import { Globe, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function DSCRForeignInvestorsPage() {
  return (
    <>
      <ArticleSchema 
        headline="DSCR Loans for Foreign Investors | ITIN & Non-US Citizen Guide"
        description="Get DSCR loans as a foreign investor. ITIN requirements, non-US citizen financing, international real estate investment in the USA."
        datePublished="2024-10-04T00:00:00.000Z"
        dateModified="2024-10-04T00:00:00.000Z"
        author="Capital Bridge Solutions"
        image="/DSCR_loan_Requirements.png"
        url="https://www.capitalbridgesolutions.com/blog/dscr-loans-foreign-investors"
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
              <span className="text-white">DSCR Loans for Foreign Investors</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loans for Foreign Investors: ITIN & Non-US Citizen Guide
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
              alt="DSCR Loans for Foreign Investors - ITIN and non-US citizen financing guide"
              width={1200}
              height={630}
              priority={true}
              caption="Foreign investors can access US real estate with DSCR loans"
            />
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Foreign nationals and non-US citizens can invest in American real estate using DSCR loans. With an 
                ITIN (Individual Taxpayer Identification Number) and strong rental income, international investors 
                can access the same financing opportunities as US citizens—no SSN required, no US credit history needed.
              </p>
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary-400" />
                  Why Foreign Investors Choose DSCR Loans
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No SSN Required:</strong> ITIN is sufficient for qualification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No US Credit History:</strong> Qualify based on property income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>No Income Verification:</strong> Foreign income not required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Fast Approval:</strong> 24-48 hours with proper documentation</span>
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
            <h2 className="text-3xl font-bold text-white mb-8">Foreign Investor Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">Required Documents</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• ITIN (Individual Taxpayer ID)</li>
                  <li>• Valid passport</li>
                  <li>• Proof of down payment funds</li>
                  <li>• Property rental income documentation</li>
                  <li>• US bank account (can be opened)</li>
                </ul>
              </div>
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Loan Terms</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Down Payment: 25-30%</li>
                  <li>• Credit Score: Not required</li>
                  <li>• DSCR Ratio: 1.0+ preferred</li>
                  <li>• Rates: 7.5-10% typical</li>
                  <li>• Terms: 30-year fixed available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest in US Real Estate?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get pre-approved as a foreign investor. We specialize in ITIN loans and international buyer financing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/landing/dscr-loans" className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get Pre-Approved
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
