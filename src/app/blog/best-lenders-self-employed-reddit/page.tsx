'use client';

import { Phone, CheckCircle, AlertCircle, Star, Users, MessageCircle, ArrowRight, ThumbsUp, Shield } from 'lucide-react';
import { ArticleSchema } from '@/components/ArticleSchema';
import { BlogImage } from '@/components/BlogImage';
import Link from 'next/link';

export default function BestLendersSelfEmployedRedditPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  const redditRecommendations = [
    {
      lender: "Capital Bridge Solutions",
      upvotes: "Most Recommended",
      reason: "DSCR loans without tax returns. Perfect for self-employed investors.",
      creditMin: 640,
      downPayment: "20%",
      ratesFrom: "5.5%",
      pros: ["No tax returns needed", "Fast approval (24-48 hours)", "California focused", "Investment properties OK"],
      cons: ["Primarily investment properties", "Higher rates than conventional"],
      redditQuote: "Used them for my rental property. Approved in 2 days without showing tax returns. 10/10 would recommend."
    },
    {
      lender: "Griffin Funding",
      upvotes: "Popular Choice",
      reason: "Bank statement loans for primary residences and investment properties.",
      creditMin: 620,
      downPayment: "10-20%",
      ratesFrom: "6.25%",
      pros: ["12 or 24 months bank statements", "Primary residence OK", "Lower credit scores accepted", "Online application"],
      cons: ["Income calculated at 50-75% of deposits", "More paperwork than DSCR"],
      redditQuote: "Got my mortgage with just bank statements. No tax returns. As a freelancer this was a lifesaver."
    },
    {
      lender: "CrossCountry Mortgage",
      upvotes: "Budget-Friendly",
      reason: "Best for self-employed with lower credit scores.",
      creditMin: 580,
      downPayment: "20-25%",
      ratesFrom: "7.00%",
      pros: ["Accepts 580 credit", "Bad credit programs", "Large national lender", "Multiple loan types"],
      cons: ["Higher rates for lower credit", "Longer approval times"],
      redditQuote: "My credit was 620. They still approved me. Had to put 25% down but worth it to own."
    },
    {
      lender: "New American Funding",
      upvotes: "Tech-Forward",
      reason: "Best online experience for tech-savvy self-employed borrowers.",
      creditMin: 620,
      downPayment: "15-20%",
      ratesFrom: "6.75%",
      pros: ["Great mobile app", "Fast digital process", "Responsive customer service", "Multiple program options"],
      cons: ["Not the lowest rates", "Less flexible than smaller lenders"],
      redditQuote: "Everything was online. Uploaded docs from my phone. Super easy process."
    },
    {
      lender: "Local Credit Unions",
      upvotes: "Community Option",
      reason: "Sometimes offer portfolio loans for self-employed members.",
      creditMin: "Varies",
      downPayment: "20-30%",
      ratesFrom: "6.50%+",
      pros: ["Relationship-based lending", "More flexible underwriting", "Lower fees", "Local decision making"],
      cons: ["Must be a member", "Inconsistent availability", "Smaller loan amounts"],
      redditQuote: "My local CU approved me when banks wouldn't. They looked at my whole financial picture, not just tax returns."
    }
  ];

  const redditFAQs = [
    {
      q: "Can I really get a mortgage without tax returns?",
      a: "Yes! Bank statement loans use 12-24 months of business bank statements instead of tax returns. DSCR loans don't look at your income at all—they only care if the rental income covers the mortgage. These are legit programs from licensed lenders, not scams."
    },
    {
      q: "Will the rates be crazy high?",
      a: "Rates are typically 0.5-2% higher than conventional loans. For example, if conventional rates are 6.5%, you might pay 7-8% for a bank statement loan. DSCR loans range from 5.5-8% depending on credit and down payment. Not cheap, but way better than hard money (10-14%)."
    },
    {
      q: "What if I've been self-employed for less than 2 years?",
      a: "DSCR loans don't care how long you've been self-employed since they don't verify income. Bank statement loans typically want 2 years, but some lenders accept 12 months. Asset-based loans are another option if you have significant liquid assets."
    },
    {
      q: "Can I use this for my primary residence?",
      a: "DSCR loans are investment properties only. But bank statement loans work for primary residences, second homes, AND investment properties. If you're buying a home to live in, bank statement loans are your best bet."
    },
    {
      q: "What credit score do I need?",
      a: "Most lenders want 620-640 minimum for self-employed loans. Some go as low as 580 but expect higher rates and bigger down payments. If your credit is 700+, you'll get the best rates and terms."
    },
    {
      q: "How much do I need to put down?",
      a: "Typically 15-25% down. DSCR loans usually require 20-25%. Bank statement loans can go as low as 10-15% on primary residences. Investment properties almost always need at least 20% down."
    }
  ];

  const redditTips = [
    {
      title: "Stop Stressing About Tax Write-Offs",
      content: "Everyone says 'write off everything!' but then you can't qualify for a mortgage. With bank statement/DSCR loans, write off whatever you want. Your tax returns don't matter."
    },
    {
      title: "Get Quotes from 3-5 Lenders",
      content: "Rates and terms vary wildly. One lender quoted me 8.5%, another 7.25% for the same loan. Shop around. It's worth the time."
    },
    {
      title: "Clean Up Your Bank Statements",
      content: "If doing bank statements, avoid large unexplained transfers. Lenders scrutinize every transaction. Keep business and personal separate if possible."
    },
    {
      title: "Consider DSCR for Rentals",
      content: "If buying investment property, DSCR is the easiest. They literally don't care about your income. Property just needs to rent for more than the mortgage."
    },
    {
      title: "Build Relationship with a Broker",
      content: "Good mortgage broker knows which lenders are flexible with self-employed. They can match you with the right program instead of you getting denied 5 times."
    }
  ];

  return (
    <>
      <ArticleSchema
        headline="Best Lenders for Self-Employed (Reddit Recommendations & Real Reviews)"
        description="Real Reddit recommendations for self-employed mortgage lenders. Bank statement loans, DSCR loans, and no-doc options that actually work. Rates from 5.5%."
        datePublished="2025-01-12T00:00:00Z"
        dateModified="2025-01-12T00:00:00Z"
        author="Capital Bridge Solutions"
        image="/Self-employed-DSCR_loans.png"
        url="https://www.capitalbridgesolutions.com/blog/best-lenders-self-employed-reddit"
      />

      <article className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-dark-950 border-b border-primary-500/20 py-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <MessageCircle className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-400 font-medium">Reddit Community Insights</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best Lenders for Self-Employed (According to Reddit)
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Real recommendations from self-employed borrowers who've actually closed loans. No tax returns required. Bank statements, DSCR loans, and alternative income verification.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+19493393555"
                  onClick={handlePhoneClick}
                  className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>(949) 339-3555</span>
                </a>
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Get Pre-Qualified</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Featured Image */}
          <BlogImage
            src="/Self-employed-DSCR_loans.png"
            alt="Best mortgage lenders for self-employed borrowers - Real Reddit recommendations"
            width={1200}
            height={630}
            priority={true}
            caption="Lenders that actually work for self-employed borrowers (tested by Reddit users)"
          />

          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              If you're self-employed and trying to get a mortgage, you've probably discovered that traditional lenders make it unnecessarily complicated. They want 2 years of tax returns, W2s you don't have, and they freak out when they see your business deductions.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Reddit communities like r/RealEstate, r/Entrepreneur, and r/personalfinance are filled with self-employed folks sharing which lenders actually approved them. This guide compiles the most recommended lenders and explains what makes each one work for self-employed borrowers.
            </p>
          </div>

          {/* TL;DR Box */}
          <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <ThumbsUp className="w-6 h-6 text-primary-400" />
              TL;DR - Quick Answers
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Best overall:</strong> Capital Bridge Solutions (DSCR loans, no tax returns, 24-48 hr approval)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Best for primary residence:</strong> Griffin Funding (bank statement loans)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Best for bad credit:</strong> CrossCountry Mortgage (accepts 580 credit)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Best online experience:</strong> New American Funding (mobile app)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-white">Rates:</strong> 5.5-8% depending on credit, down payment, and loan type</span>
              </li>
            </ul>
          </div>

          {/* Reddit Recommendations */}
          <div id="reddit-picks" className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Top Reddit-Recommended Lenders</h2>

            {redditRecommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{rec.lender}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="w-5 h-5 text-primary-400" />
                      <span className="font-semibold text-primary-400">{rec.upvotes}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-6">{rec.reason}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Min Credit</div>
                    <div className="text-xl font-bold text-white">{rec.creditMin}</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Down Payment</div>
                    <div className="text-xl font-bold text-white">{rec.downPayment}</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Rates From</div>
                    <div className="text-xl font-bold text-primary-400">{rec.ratesFrom}</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">✅ Pros</h4>
                    <ul className="space-y-2 text-gray-300">
                      {rec.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">❌ Cons</h4>
                    <ul className="space-y-2 text-gray-300">
                      {rec.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-dark-900/30 border-l-4 border-primary-500 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2 font-semibold">Real Reddit Quote:</p>
                  <p className="text-gray-300 italic">"{rec.redditQuote}"</p>
                </div>

                {index === 0 && (
                  <div className="mt-6">
                    <a
                      href="tel:+19493393555"
                      onClick={handlePhoneClick}
                      className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call (949) 339-3555
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reddit Tips */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Pro Tips from Reddit Users</h2>
            <div className="grid gap-6">
              {redditTips.map((tip, index) => (
                <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary-400" />
                    {tip.title}
                  </h3>
                  <p className="text-gray-300">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Most Asked Questions on Reddit</h2>
            <div className="space-y-6">
              {redditFAQs.map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
                    <MessageCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                    {faq.q}
                  </h3>
                  <p className="text-gray-300 pl-9">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Guide CTA */}
          <div className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary-500/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Want More Detailed Information?</h3>
            <p className="text-gray-300 mb-6">
              Check out our comprehensive guide comparing all 10 top lenders for self-employed borrowers in California, including detailed pros/cons, rates, and qualification requirements.
            </p>
            <Link
              href="/blog/best-lenders-self-employed-california"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Read Complete Guide
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-primary-900/20 to-dark-800 border border-primary-500/20 rounded-2xl p-8 md:p-12 text-center">
            <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Stop Getting Rejected?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Talk to a self-employed mortgage specialist. No tax returns required. Get pre-qualified in 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19493393555"
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-6 h-6" />
                <span>(949) 339-3555</span>
              </a>
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-3 bg-dark-800 hover:bg-dark-700 border border-primary-500/20 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300"
              >
                <ArrowRight className="w-6 h-6" />
                <span>Get Pre-Qualified</span>
              </Link>
            </div>
          </div>

        </section>
      </article>
    </>
  );
}
