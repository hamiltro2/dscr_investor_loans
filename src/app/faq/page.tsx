import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Calculator, Home, DollarSign, FileText, Users, TrendingUp, Shield } from 'lucide-react';
import PhoneButton from '@/components/PhoneButton';

export const metadata: Metadata = {
  title: 'DSCR Loan FAQ - Common Questions Answered | Capital Bridge Solutions',
  description: 'Get answers to the most common questions about DSCR loans, requirements, rates, and qualifications. Expert guidance from Capital Bridge Solutions.',
  openGraph: {
    title: 'DSCR Loan FAQ - Common Questions Answered',
    description: 'Everything you need to know about DSCR loans, requirements, rates, and how to qualify.',
  },
};

interface FAQCategory {
  title: string;
  icon: any;
  questions: Array<{
    question: string;
    url: string;
    searchVolume?: string;
  }>;
}

const faqCategories: FAQCategory[] = [
  {
    title: 'DSCR Basics',
    icon: Home,
    questions: [
      { question: 'What is a DSCR loan?', url: '/faq/what-is-a-dscr-loan', searchVolume: '5.4K/mo' },
      { question: 'How does a DSCR loan work?', url: '/faq/how-does-dscr-loan-work', searchVolume: '2.9K/mo' },
      { question: 'What is DSCR in real estate?', url: '/faq/what-is-dscr-in-real-estate', searchVolume: '1.6K/mo' },
      { question: 'What is a good DSCR ratio?', url: '/faq/what-is-good-dscr-ratio', searchVolume: '390/mo' },
      { question: 'How to calculate DSCR for rental property?', url: '/faq/calculate-dscr-rental-property', searchVolume: '590/mo' },
    ],
  },
  {
    title: 'Requirements & Qualifications',
    icon: FileText,
    questions: [
      { question: 'What are DSCR loan requirements?', url: '/faq/dscr-loan-requirements', searchVolume: '3.2K/mo' },
      { question: 'What credit score do I need for a DSCR loan?', url: '/faq/credit-score-for-dscr-loan', searchVolume: '720/mo' },
      { question: 'Can I get a DSCR loan with bad credit?', url: '/faq/dscr-loan-bad-credit', searchVolume: '1.3K/mo' },
      { question: 'Do DSCR loans require tax returns?', url: '/faq/do-dscr-loans-require-tax-returns', searchVolume: '880/mo' },
      { question: 'How much income do I need for a DSCR loan?', url: '/faq/income-requirements-dscr-loan' },
    ],
  },
  {
    title: 'Rates & Costs',
    icon: DollarSign,
    questions: [
      { question: 'What are current DSCR loan rates?', url: '/faq/current-dscr-loan-rates', searchVolume: '2.1K/mo' },
      { question: 'How much are DSCR loan closing costs?', url: '/faq/dscr-loan-closing-costs' },
      { question: 'What are DSCR loan points and fees?', url: '/faq/dscr-loan-points-fees' },
      { question: 'Are DSCR loan rates higher than conventional?', url: '/faq/dscr-vs-conventional-rates' },
    ],
  },
  {
    title: 'Comparisons',
    icon: TrendingUp,
    questions: [
      { question: 'DSCR loan vs conventional loan - which is better?', url: '/faq/dscr-vs-conventional-loan', searchVolume: '480/mo' },
      { question: 'DSCR loan vs hard money loan - what\'s the difference?', url: '/faq/dscr-vs-hard-money-loan' },
      { question: 'DSCR loan vs FHA loan for investment property', url: '/faq/dscr-vs-fha-loan' },
    ],
  },
  {
    title: 'Property Types',
    icon: Shield,
    questions: [
      { question: 'Can I get a DSCR loan for Airbnb or short-term rental?', url: '/faq/dscr-loan-for-airbnb' },
      { question: 'Do DSCR loans work for multi-family properties?', url: '/faq/dscr-loan-multi-family' },
      { question: 'Can I use a DSCR loan for fix and flip?', url: '/faq/dscr-loan-fix-and-flip' },
      { question: 'DSCR loans for commercial properties', url: '/faq/dscr-loan-commercial-property' },
    ],
  },
  {
    title: 'Special Situations',
    icon: Users,
    questions: [
      { question: 'DSCR loans for self-employed borrowers', url: '/faq/dscr-loan-self-employed', searchVolume: '1.1K/mo' },
      { question: 'Can foreign nationals get DSCR loans?', url: '/faq/dscr-loan-foreign-nationals' },
      { question: 'DSCR loans for first-time real estate investors', url: '/faq/dscr-loan-first-time-investors' },
      { question: 'Can I get multiple DSCR loans?', url: '/faq/multiple-dscr-loans' },
    ],
  },
];

export default function FAQIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
            <Search className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-primary-300">Comprehensive DSCR Loan Knowledge Base</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            DSCR Loan <span className="text-gradient">FAQ</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Everything you need to know about Debt Service Coverage Ratio (DSCR) loans. 
            Get expert answers from America's #1 Real Estate Investor Loan Company.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
              <div className="text-3xl font-bold text-primary-400 mb-1">5.99%</div>
              <div className="text-sm text-gray-400">Starting Rate</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
              <div className="text-3xl font-bold text-primary-400 mb-1">620</div>
              <div className="text-sm text-gray-400">Min Credit Score</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
              <div className="text-3xl font-bold text-primary-400 mb-1">24-48h</div>
              <div className="text-sm text-gray-400">Approval Time</div>
            </div>
            <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
              <div className="text-3xl font-bold text-primary-400 mb-1">$30M</div>
              <div className="text-sm text-gray-400">Max Loan</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {faqCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={idx}
                  className="bg-dark-900/50 rounded-2xl border border-dark-800 p-6 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {category.questions.map((q, qIdx) => (
                      <Link
                        key={qIdx}
                        href={q.url}
                        className="block group"
                      >
                        <div className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-dark-800/50 transition-colors">
                          <span className="text-gray-300 group-hover:text-primary-400 transition-colors">
                            {q.question}
                          </span>
                          {q.searchVolume && (
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {q.searchVolume}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary-600/10 to-primary-700/10 border-2 border-primary-600/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Talk to our AI loan companion Cap or speak with a loan specialist. 
              Get pre-approved in 24-48 hours with rates starting at 5.99%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="btn-primary"
              >
                Get Pre-Approved Now
              </Link>
              <PhoneButton phone="+19493393555" className="btn-secondary">
                Call (949) 339-3555
              </PhoneButton>
            </div>
          </div>

          {/* Helpful Resources */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Link href="/calculators/dscr" className="group">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6 hover:border-primary-500/30 transition-colors">
                <Calculator className="w-8 h-8 text-primary-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  DSCR Calculator
                </h4>
                <p className="text-sm text-gray-400">
                  Calculate your debt service coverage ratio instantly
                </p>
              </div>
            </Link>

            <Link href="/blog" className="group">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6 hover:border-primary-500/30 transition-colors">
                <FileText className="w-8 h-8 text-primary-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  Blog & Guides
                </h4>
                <p className="text-sm text-gray-400">
                  In-depth articles on DSCR loans and real estate investing
                </p>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6 hover:border-primary-500/30 transition-colors">
                <Users className="w-8 h-8 text-primary-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  About Us
                </h4>
                <p className="text-sm text-gray-400">
                  Learn why we're America's #1 Real Estate Investor Loan Company
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap(cat => 
              cat.questions.map(q => ({
                '@type': 'Question',
                name: q.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Learn about ${q.question.toLowerCase()} at Capital Bridge Solutions. Visit ${q.url} for detailed information.`,
                  url: `https://www.dscrinvestorloans.com${q.url}`
                }
              }))
            )
          })
        }}
      />
    </div>
  );
}
