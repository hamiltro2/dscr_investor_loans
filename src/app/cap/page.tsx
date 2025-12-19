import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles, Brain, Zap, Shield, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meet Cap - AI DSCR Loan Expert | Capital Bridge Solutions',
  description: 'Chat with Cap, our AI-powered DSCR loan expert. Get instant answers about rates (from 5.5%), requirements (620+ credit), and qualification. Available 24/7 with 106+ expert articles of knowledge.',
  keywords: 'DSCR loan AI, DSCR chatbot, AI loan assistant, DSCR loan questions, automated loan advice, 24/7 loan help, AI mortgage advisor',
  openGraph: {
    title: 'Meet Cap - AI DSCR Loan Expert',
    description: 'Get instant answers from our AI expert about DSCR loans, rates, and qualification. Available 24/7.',
    images: ['/og-image-cap.jpg'],
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/cap',
  },
};

export default function CapPage() {
  return (
    <>
      {/* Schema.org markup for SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Cap - DSCR Loan AI Assistant',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '127',
            },
            description: 'AI-powered DSCR loan expert that provides instant answers about rates, requirements, and qualification based on 106+ expert articles.',
            featureList: [
              '24/7 availability',
              'Instant answers from 106+ expert articles',
              'DSCR loan calculator integration',
              'Personalized rate quotes',
              'Credit score guidance (620+ minimum)',
              'Property type expertise (Airbnb, multi-family, etc.)',
              'No-pressure consulting',
            ],
            screenshot: 'https://www.capitalbridgesolutions.com/cap-screenshot.jpg',
            provider: {
              '@type': 'Organization',
              name: 'Capital Bridge Solutions',
              url: 'https://www.capitalbridgesolutions.com',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet Cap
              <span className="block text-primary-200 mt-2">Your AI DSCR Loan Expert</span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Get instant, expert answers about DSCR loans 24/7. Cap knows everything from our 106+ expert articles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 dark:text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl"
              >
                <MessageCircle className="w-5 h-5 mr-2 text-primary-700 dark:text-primary-600" />
                Chat with Cap Now
              </Link>

              <Link
                href="/get-started"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-500/20 text-white rounded-lg font-semibold hover:bg-primary-500/30 transition-all border border-white/20"
              >
                Get Pre-Qualified
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-primary-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span>106+ Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Instant Answers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Cap Knows */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Cap Knows
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Cap has instant access to our entire knowledge base covering every aspect of DSCR loans
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Credit Requirements',
                items: ['620+ minimum credit score', 'Bad credit scenarios', 'How to improve your score', 'Credit repair strategies'],
              },
              {
                title: 'Property Types',
                items: ['Airbnb/Short-term rentals', 'Multi-family properties', 'Fix & Flip projects', 'Traditional rentals'],
              },
              {
                title: 'Self-Employed Investors',
                items: ['No tax return loans', 'Alternative income docs', '1099 contractors', 'Business owners'],
              },
              {
                title: 'Rates & Terms',
                items: ['Current rates (from 5.5%)', 'Only 0.75% origination', 'Up to 85% LTV', '7-14 day closes'],
              },
              {
                title: 'State-Specific Info',
                items: ['California guidelines', 'Texas requirements', 'Florida regulations', 'All 50 states covered'],
              },
              {
                title: 'Advanced Strategies',
                items: ['Portfolio financing', 'Foreign investor loans', 'Tax benefits', 'Market trends 2025'],
              },
            ].map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How Cap Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Cap Works
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Powered by GPT-4 with access to 106 expert articles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Ask Anything',
                description: 'Type your question about DSCR loans, rates, requirements, or qualification.',
              },
              {
                icon: Brain,
                title: 'Cap Searches',
                description: 'Cap searches 106 knowledge chunks using AI-powered semantic search.',
              },
              {
                icon: Sparkles,
                title: 'Get Expert Answer',
                description: 'Receive detailed, accurate answers with sources from our blog articles.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                    <step.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Cap is Better */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Chat with Cap Instead of Calling?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: 'Available 24/7 - no waiting on hold' },
                  { icon: Zap, text: 'Instant answers - no appointment needed' },
                  { icon: Brain, text: 'Expert knowledge from 106+ articles' },
                  { icon: Shield, text: 'No pressure - ask anything anonymously' },
                  { icon: MessageCircle, text: 'Chat history - review answers anytime' },
                  { icon: Sparkles, text: 'Personalized guidance based on your scenario' },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="pt-2">
                      <p className="text-lg text-gray-700">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Example Questions to Ask Cap:</h3>
              <ul className="space-y-3">
                {[
                  '"Can I get a DSCR loan with 620 credit score?"',
                  '"What are your rates for Airbnb properties?"',
                  '"Do I need tax returns for DSCR loans?"',
                  '"How much can I borrow with 85% LTV?"',
                  '"What\'s the difference between DSCR and conventional?"',
                  '"I\'m self-employed, can I qualify?"',
                  '"Do you lend in Florida?"',
                  '"How long does approval take?"',
                ].map((question, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{question}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center w-full px-6 py-4 bg-primary-600 text-white dark:bg-primary-500 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Start Chatting with Cap
                <ArrowRight className="w-5 h-5 ml-2 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-br from-primary-600 to-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Expert Answers?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Cap is standing by 24/7 to answer all your DSCR loan questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 dark:text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-xl"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-primary-700 dark:text-primary-600" />
              Chat with Cap Now
            </Link>
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500/20 text-white rounded-lg font-semibold hover:bg-primary-500/30 transition-all border border-white/20"
            >
              Get Pre-Qualified
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
