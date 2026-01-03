'use client';

import { Phone, CheckCircle, AlertCircle, Star, TrendingUp, Shield, ArrowRight, Target, DollarSign, Award } from 'lucide-react';
import { ArticleSchema } from '@/components/ArticleSchema';
import { BlogImage } from '@/components/BlogImage';
import Link from 'next/link';

export default function BestLendersSelfEmployedBadCreditPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  const badCreditLenders = [
    {
      name: "CrossCountry Mortgage",
      badge: "Best for 580-620 Credit",
      rating: 4.3,
      creditMin: 580,
      ratesFrom: "7.00%",
      downPayment: "20-30%",
      description: "CrossCountry is one of the few lenders actively approving self-employed borrowers with credit scores as low as 580. They offer bank statement loans and alternative documentation programs specifically designed for credit-challenged self-employed professionals.",
      pros: [
        "Accepts 580 credit score",
        "Bank statement loans available",
        "National lender with local offices",
        "Flexible underwriting",
        "Multiple bad credit programs"
      ],
      cons: [
        "Higher rates for lower credit",
        "25-30% down for sub-620 credit",
        "Longer approval times",
        "More documentation required"
      ],
      bestFor: "Self-employed with 580-620 credit"
    },
    {
      name: "Angel Oak",
      badge: "Best Program Variety",
      rating: 4.4,
      creditMin: 620,
      ratesFrom: "6.50%",
      downPayment: "15-25%",
      description: "Angel Oak offers multiple non-QM loan programs for self-employed borrowers with credit challenges. Their bank statement loans are particularly flexible for borrowers with 620-660 credit who can't qualify conventionally.",
      pros: [
        "620 minimum credit score",
        "12 or 24 month bank statements",
        "Asset depletion loans available",
        "P&L statement options",
        "Competitive rates for non-QM"
      ],
      cons: [
        "Not available in all states",
        "Smaller lender, limited capacity",
        "Higher rates than conventional",
        "Strict documentation requirements"
      ],
      bestFor: "620-660 credit with complex income"
    },
    {
      name: "FNBA (First National Bank of America)",
      badge: "High DTI OK",
      rating: 4.2,
      creditMin: 620,
      ratesFrom: "6.75%",
      downPayment: "15-25%",
      description: "FNBA specializes in non-QM loans for self-employed borrowers who don't fit conventional boxes. They're particularly flexible with high debt-to-income ratios and recent credit issues.",
      pros: [
        "DTI up to 50%",
        "Recent credit events OK (12+ months)",
        "Bank statement loans",
        "DSCR loans available",
        "Fast approval process"
      ],
      cons: [
        "620 minimum (no exceptions)",
        "Higher rates for recent credit issues",
        "20% down minimum",
        "Limited to certain states"
      ],
      bestFor: "High DTI or recent credit issues"
    },
    {
      name: "Griffin Funding",
      badge: "Best for Credit Building",
      rating: 4.5,
      creditMin: 620,
      ratesFrom: "6.25%",
      downPayment: "10-20%",
      description: "Griffin Funding's bank statement loans work well for self-employed borrowers rebuilding credit. They focus on current income and assets rather than past credit issues.",
      pros: [
        "620 minimum credit",
        "12 month bank statements",
        "Lower down payments (10-15%)",
        "Primary residence OK",
        "Rate discounts for higher credit"
      ],
      cons: [
        "Income calculated conservatively",
        "More documentation than DSCR",
        "Reserves required",
        "Primarily CA, FL, TX"
      ],
      bestFor: "620-680 credit, primary residence"
    },
    {
      name: "Capital Bridge Solutions",
      badge: "Best for Investors",
      rating: 4.8,
      creditMin: 640,
      ratesFrom: "5.5%",
      downPayment: "20-25%",
      description: "While Capital Bridge has a higher minimum credit score, their DSCR loans are perfect for self-employed investors with credit in the 640-680 range. No income verification makes approval much easier.",
      pros: [
        "No tax returns or income docs",
        "Fast 24-48 hour approval",
        "640 credit minimum",
        "Investment properties only",
        "Competitive rates for DSCR"
      ],
      cons: [
        "640 minimum (not 580-620)",
        "Investment properties only",
        "20-25% down required",
        "Property must cash flow"
      ],
      bestFor: "640+ credit, investment properties"
    }
  ];

  const creditTiers = [
    {
      range: "580-619",
      lenders: "CrossCountry Mortgage",
      rates: "8.00-9.50%",
      downPayment: "25-30%",
      tips: "Expect higher rates and larger down payments. Focus on improving credit to 620+ for better options."
    },
    {
      range: "620-659",
      lenders: "Angel Oak, FNBA, Griffin, CrossCountry",
      rates: "7.00-8.50%",
      downPayment: "20-25%",
      tips: "Sweet spot for non-QM loans. Many lenders will work with you. Shop rates aggressively."
    },
    {
      range: "660-679",
      lenders: "All lenders + Capital Bridge",
      rates: "6.50-7.50%",
      downPayment: "15-20%",
      tips: "You qualify for most programs. Rates approach conventional. Consider waiting if close to 680."
    },
    {
      range: "680+",
      lenders: "All lenders, best rates",
      rates: "5.5-7.00%",
      downPayment: "10-20%",
      tips: "You're in great shape. Should get competitive rates even without tax returns."
    }
  ];

  const improvementTips = [
    {
      title: "Pay Down Credit Cards",
      impact: "30+ points",
      timeframe: "30-60 days",
      description: "Get credit utilization below 30% (ideally under 10%). This is the fastest way to boost your score."
    },
    {
      title: "Dispute Errors",
      impact: "20-50 points",
      timeframe: "30-45 days",
      description: "Check all three bureaus for errors. Dispute anything incorrect. Errors are more common than you think."
    },
    {
      title: "Become Authorized User",
      impact: "10-40 points",
      timeframe: "60-90 days",
      description: "Get added to someone's old, well-managed credit card. Their positive history can boost your score."
    },
    {
      title: "Pay Collections",
      impact: "Varies",
      timeframe: "Immediate",
      description: "Some lenders want collections paid or settled. Negotiate pay-for-delete if possible."
    },
    {
      title: "Wait for Negatives to Age",
      impact: "Varies",
      timeframe: "6-12 months",
      description: "Recent late payments hurt more. Lenders are more forgiving of issues 12+ months old."
    }
  ];

  const faqs = [
    {
      q: "What's the minimum credit score for self-employed loans?",
      a: "CrossCountry Mortgage accepts 580 for self-employed borrowers, though you'll need 25-30% down and rates will be 8-9.5%. Most lenders want 620+ for bank statement loans. DSCR loans typically require 640-660 minimum. The higher your score, the better your rates and terms."
    },
    {
      q: "Can I get approved with a recent bankruptcy or foreclosure?",
      a: "Most lenders want 2-3 years after bankruptcy (Chapter 7) or foreclosure. Chapter 13 can sometimes qualify after 12 months of payments. DSCR loans are more forgiving since they don't verify personal income or credit history as heavily."
    },
    {
      q: "How much will bad credit cost me?",
      a: "Expect to pay 1-2% higher interest rates compared to good credit. On a $500K loan, that's $5,000-$10,000 per year in extra interest. Plus you'll likely need to put more money down (20-30% vs 10-15%)."
    },
    {
      q: "Should I wait to improve my credit first?",
      a: "Depends on your timeline. If you're at 615 and can get to 640 in 3-6 months, probably worth waiting—you'll save $5K-10K/year. If you're at 585 and need 2+ years to hit 640, might make sense to buy now and refinance later."
    },
    {
      q: "Will applying hurt my credit score?",
      a: "Multiple mortgage inquiries within 45 days count as one inquiry. So shop around! The initial credit check will ding you 5-10 points temporarily, but it recovers in 3-6 months."
    },
    {
      q: "Can I refinance later when my credit improves?",
      a: "Yes! Many borrowers with bad credit use non-QM loans to buy, then refinance to conventional once their credit improves. Just make sure your loan doesn't have prepayment penalties."
    }
  ];

  return (
    <>
      <ArticleSchema
        headline="Best Lenders for Self-Employed with Bad Credit (580-680 Scores)"
        description="Compare mortgage lenders for self-employed borrowers with bad credit. Bank statement loans and DSCR options for 580-680 credit scores. No tax returns required."
        datePublished="2026-01-12T00:00:00Z"
        dateModified="2026-01-12T00:00:00Z"
        author="Capital Bridge Solutions"
        image="/Self-employed-DSCR_loans.png"
        url="https://www.capitalbridgesolutions.com/blog/best-lenders-self-employed-bad-credit"
      />

      <article className="min-h-screen bg-gradient-to-b from-dark-950 to-dark-900 text-gray-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900/20 to-dark-950 border-b border-primary-500/20 py-16">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-400 font-medium">Bad Credit Specialists</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Best Lenders for Self-Employed with Bad Credit
              </h1>

              <p className="text-xl text-gray-300 mb-8">
                Get approved with 580-680 credit scores. No tax returns required. Bank statement loans, DSCR loans, and alternative programs for self-employed borrowers with credit challenges.
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
                  <span>Check Your Options</span>
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
            alt="Best mortgage lenders for self-employed borrowers with bad credit - 580-680 credit scores"
            width={1200}
            height={630}
            priority={true}
            caption="Lenders that approve self-employed borrowers with 580-680 credit scores"
          />

          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              Being self-employed with less-than-perfect credit can feel like a double penalty when applying for a mortgage. Traditional lenders are already skeptical of self-employed income, and add bad credit to the mix? Most won't even talk to you.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              But specialized lenders exist specifically for this situation. They offer bank statement loans and DSCR loans that focus on your current income and business cash flow rather than your credit history. While you'll pay slightly higher rates, you CAN get approved—even with credit scores as low as 580.
            </p>
          </div>

          {/* Credit Score Tiers */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-400" />
              What to Expect by Credit Score
            </h2>
            <div className="space-y-4">
              {creditTiers.map((tier, index) => (
                <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Credit Score: {tier.range}</h3>
                      <p className="text-gray-400">Lenders: {tier.lenders}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-400">{tier.rates}</div>
                      <div className="text-sm text-gray-400">Expected Rates</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Typical Down Payment</div>
                      <div className="text-lg font-semibold text-white">{tier.downPayment}</div>
                    </div>
                  </div>
                  <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
                    <p className="text-sm text-gray-300"><strong className="text-white">💡 Tip:</strong> {tier.tips}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Lenders */}
          <div id="top-lenders" className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Top Lenders for Bad Credit + Self-Employed</h2>

            {badCreditLenders.map((lender, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border mb-8 ${index === 0
                  ? 'bg-gradient-to-br from-primary-500/10 to-primary-600/10 border-primary-500/20'
                  : 'bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl border-white/10'
                  }`}
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{lender.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(lender.rating)
                              ? 'fill-primary-400 text-primary-400'
                              : 'text-gray-600'
                              }`}
                          />
                        ))}
                      </div>
                      <span className={`font-semibold ${index === 0 ? 'text-primary-400' : 'text-gray-400'}`}>
                        {lender.rating}/5.0
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 border rounded-lg bg-emerald-500/20 border-emerald-500/30 text-emerald-400">
                    <span className="font-bold text-sm">{lender.badge}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Min Credit</div>
                    <div className="text-2xl font-bold text-white">{lender.creditMin}</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Rates From</div>
                    <div className="text-2xl font-bold text-primary-400">{lender.ratesFrom}</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Down Payment</div>
                    <div className="text-2xl font-bold text-white">{lender.downPayment}</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{lender.description}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">✅ Pros</h4>
                    <ul className="space-y-2 text-gray-300">
                      {lender.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-3">❌ Cons</h4>
                    <ul className="space-y-2 text-gray-300">
                      {lender.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
                  <p className="text-sm text-gray-300"><strong className="text-white">Best for:</strong> {lender.bestFor}</p>
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

          {/* Credit Improvement Tips */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary-400" />
              How to Improve Your Credit Score
            </h2>
            <p className="text-gray-300 mb-8">
              While you can get approved with bad credit, improving your score even 20-40 points can save you thousands per year in interest. Here are the fastest ways to boost your credit:
            </p>
            <div className="grid gap-6">
              {improvementTips.map((tip, index) => (
                <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <div className="flex items-start justify-between mb-3 flex-wrap gap-4">
                    <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Impact: </span>
                        <span className="text-emerald-400 font-semibold">{tip.impact}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Time: </span>
                        <span className="text-primary-400 font-semibold">{tip.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Guide CTA */}
          <div className="bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-2xl p-8 border border-primary-500/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Compare All Self-Employed Lenders</h3>
            <p className="text-gray-300 mb-6">
              See our complete comparison of the top 10 lenders for self-employed borrowers in California, including options for all credit tiers.
            </p>
            <Link
              href="/blog/best-lenders-self-employed-california"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View Complete Guide
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-primary-900/20 to-dark-800 border border-primary-500/20 rounded-2xl p-8 md:p-12 text-center">
            <Award className="w-16 h-16 text-primary-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Don't Let Bad Credit Stop You</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get pre-qualified in 24-48 hours. Lenders that specialize in self-employed borrowers with credit challenges. No judgment, just solutions.
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
                <span>Check Your Options</span>
              </Link>
            </div>
          </div>

        </section>
      </article>
    </>
  );
}
