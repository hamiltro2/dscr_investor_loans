'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    slug: 'dscr-loan-calculator-california',
    title: 'DSCR Loan Calculator California: Free Tool + 2024 Rates',
    excerpt: 'Calculate your DSCR loan eligibility instantly. See real examples for Los Angeles, Orange County, and San Diego properties with current rates.',
    date: '2024-09-23',
    readTime: '8 min read',
    category: 'Tools & Calculators'
  },
  {
    slug: 'dscr-loans-self-employed-california',
    title: 'DSCR Loans for Self-Employed in California: Complete Guide',
    excerpt: 'No tax returns? No problem. Learn how self-employed investors qualify for DSCR loans based on property income, not personal income.',
    date: '2024-09-23',
    readTime: '12 min read',
    category: 'Loan Guides'
  },
  {
    slug: 'dscr-loan-requirements-california-2024',
    title: 'DSCR Loan Requirements California 2024: What You Need to Know',
    excerpt: 'Complete breakdown of 2024 DSCR loan requirements including credit scores, down payments, property types, and documentation needed.',
    date: '2024-09-23',
    readTime: '10 min read',
    category: 'Loan Guides'
  },
  {
    slug: 'no-tax-return-investment-property-loans',
    title: 'No Tax Return Investment Property Loans California',
    excerpt: 'Discover 6 types of investment property loans that don\'t require tax returns. Perfect for self-employed and privacy-conscious investors.',
    date: '2024-09-23',
    readTime: '11 min read',
    category: 'Alternative Financing'
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
            <p className="text-xl text-gray-300 mb-8">
              Expert insights on investment property financing in California
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
