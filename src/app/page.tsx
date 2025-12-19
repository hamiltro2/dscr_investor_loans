'use client';

import { Zap, TrendingDown, Users } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { TypewriterText } from '@/components/TypewriterText'
import { InfoCard } from '@/components/InfoCard'
import { FAQ } from '@/components/FAQ'
import { AIOptimizedContent } from '@/components/AIOptimizedContent'

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Only load the MultiStepForm dynamically since it's heavy
const MultiStepForm = dynamic(
  () => import('@/components/MultiStepForm').then(mod => ({ default: mod.MultiStepForm })),
  {
    loading: () => (
      <div className="card animate-pulse">
        <div className="h-8 w-3/4 bg-dark-800 rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-1/4 bg-dark-800 rounded mb-2"></div>
              <div className="h-10 bg-dark-800 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
)

export default function Home() {
  const [showDisclosureModal, setShowDisclosureModal] = useState(false);
  const cards = [
    {
      icon: Zap,
      title: "Fast Approval Process",
      description: "Get approved quickly with our streamlined application process designed for investors.",
      panelTitle: "Your Path to Quick Approval",
      steps: [
        {
          title: "Initial Consultation",
          description: "Brief 15-minute call to understand your investment goals and requirements."
        },
        {
          title: "Document Collection",
          description: "Simple upload of essential documents through our secure portal."
        },
        {
          title: "Property Analysis",
          description: "Quick review of the investment property's potential and market value."
        },
        {
          title: "Approval & Funding",
          description: "Receive approval within 3-4 days and funding in 2-3 weeks."
        }
      ]
    },
    {
      icon: TrendingDown,
      title: "Competitive Rates",
      description: "Access industry-leading rates that help maximize your investment returns.",
      panelTitle: "Understanding Our Rates",
      steps: [
        {
          title: "Rate Analysis",
          description: "We analyze current market conditions to ensure you get the best possible rate."
        },
        {
          title: "Custom Rate Match",
          description: "Match you with lenders offering rates tailored to your investment strategy."
        },
        {
          title: "Rate Lock",
          description: "Lock in your rate for up to 45 days while completing your transaction."
        },
        {
          title: "Rate Monitoring",
          description: "Ongoing monitoring for refinance opportunities as rates change."
        }
      ]
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our experienced team provides personalized support throughout your journey.",
      panelTitle: "Your Support Team",
      steps: [
        {
          title: "Dedicated Advisor",
          description: "Personal loan advisor to guide you through the entire process."
        },
        {
          title: "Investment Strategy",
          description: "Expert advice on structuring your investment for optimal returns."
        },
        {
          title: "Market Analysis",
          description: "Detailed market insights to help you make informed decisions."
        },
        {
          title: "Ongoing Support",
          description: "Continued assistance for future investments and portfolio growth."
        }
      ]
    }
  ];

  const testimonials = [
    {
      author: {
        name: 'Michael Thompson',
        role: 'Real Estate Investor',
        location: 'San Francisco, CA'
      },
      body: 'Their DSCR loan program helped me expand my portfolio from 3 to 12 properties in just 18 months. The streamlined process and competitive rates made scaling my business possible.',
      highlight: 'Portfolio expanded from 3 to 12 properties'
    },
    {
      author: {
        name: 'Sandra Martinez',
        role: 'Commercial Property Developer',
        location: 'Austin, TX'
      },
      body: 'The construction loan terms were exactly what we needed for our mixed-use development. Their team understood the complexities of our project and provided solutions at every step.',
      highlight: '$14M mixed-use development funded'
    },
    {
      author: {
        name: 'Robert Chen',
        role: 'Multi-Family Investor',
        location: 'Seattle, WA'
      },
      body: 'Refinancing our portfolio of apartment buildings was seamless. Their expertise in multi-family properties and market-leading rates saved us thousands in monthly payments.',
      highlight: '$2.3M annual savings through refinancing'
    }
  ];

  const highlights = [
    {
      title: "Quick Pre-Approval in 24-48 Hours",
      description: "Get a fast response on your investment property loan application."
    },
    {
      title: "No Tax Returns Required & Self-Employed",
      description: "Streamlined documentation process focused on the property's income potential."
    },
    {
      title: "Rates Starting at 5.5%",
      description: "Competitive rates for your investment property financing needs."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate pt-14 pb-8 sm:pb-10">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-block">
                <h1 className="title-glow font-display text-6xl sm:text-7xl font-black tracking-tight leading-none mb-2">
                  <span className="block text-white font-light text-2xl sm:text-3xl uppercase tracking-[0.2em] mb-4 opacity-80">
                    Our Promise
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
                    No Investor
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 -mt-2">
                    Left Behind
                  </span>
                </h1>
                <div className="relative mt-6 mx-auto w-32 h-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 animate-slideIn"></div>
                </div>
              </div>
            </div>

            {/* DSCR Loans Promotional Section */}
            <div className="mt-12 mb-12 flex justify-center">
              <div className="max-w-xl w-full">
                <div className="bg-black/90 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-10 text-center space-y-8">

                  {/* Rate display */}
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-4">
                      <span className="text-5xl sm:text-6xl font-light text-white tracking-tight">
                        5.5%
                      </span>
                      <span className="text-lg text-white/70 font-light">
                        and only
                      </span>
                      <span className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                        0.75%
                      </span>
                      <span className="text-lg text-white/70 font-light">
                        points
                      </span>
                    </div>
                  </div>

                  {/* Clean divider */}
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>

                  {/* Call to action */}
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-wide">
                      DSCR LOANS
                    </h3>

                    {/* NEW: 15% Down Payment */}
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xl sm:text-2xl font-semibold text-white">
                        15% Down Payment for Investment Property purchases!
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/50 animate-pulse">
                        NEW
                      </span>
                    </div>

                    <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 rounded-full">
                      <span className="text-white font-medium">ACT NOW</span>
                    </div>
                  </div>

                  {/* Clean divider */}
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>

                  {/* Phone number */}
                  <div>
                    <a
                      href="tel:+19493393555"
                      className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-light text-white hover:text-white/80 transition-colors duration-300"
                      onClick={() => window.gtag && window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' })}
                    >
                      <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      (949) 339-3555
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
                    {/* ChatGPT AI Advisor Button */}
                    <a
                      href="https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-6 py-3 w-full sm:w-[280px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:shadow-xl"
                    >
                      {/* Featured Badge */}
                      <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-lg">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wide">Featured</span>
                      </div>

                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
                      </svg>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-white">Chat with Cap AI</div>
                        <div className="text-xs text-emerald-300/90">In ChatGPT Store • Get instant answers</div>
                      </div>
                      <svg className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    {/* Chrome Extension Button */}
                    <a
                      href="https://chromewebstore.google.com/detail/pejohinmhmeoneffemjfigpkjiodbnec?utm_source=item-share-cp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-3 px-6 py-3 w-full sm:w-[280px] bg-gradient-to-r from-blue-400/20 to-blue-300/20 backdrop-blur-sm rounded-xl border border-blue-400/30 hover:from-blue-400/30 hover:to-blue-300/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-400/20 hover:shadow-xl"
                    >
                      <svg className="w-5 h-5 text-blue-300 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
                      </svg>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-white">Chrome Extension</div>
                        <div className="text-xs text-blue-200/90">Analyze properties instantly</div>
                      </div>
                      <svg className="w-4 h-4 text-blue-300/60 group-hover:text-blue-300 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* Advertiser Disclosure */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => setShowDisclosureModal(true)}
                      className="text-xs text-white/60 hover:text-white/80 transition-colors duration-300 underline"
                    >
                      Advertiser Disclosure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="relative isolate pt-8 pb-12">
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl mb-8 text-white">
              Based in Southern California, serving investors nationwide. We work around the clock to make your investment goals a reality!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/investor-analysis"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 
                    bg-dark-800 text-emerald-400 rounded-lg border border-emerald-500/30
                    transition-all duration-300 shadow-lg hover:shadow-emerald-500/25
                    hover:bg-dark-700 hover:border-emerald-500/50 hover:text-emerald-300
                    before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
                    before:from-emerald-500/20 before:to-transparent before:opacity-0
                    hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:ring-2 
                    after:ring-emerald-500/0 hover:after:ring-emerald-500/50
                    after:transition-all after:duration-300 overflow-hidden
                    text-lg font-medium"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <TypewriterText
                  text="Try Our AI Investor Query"
                  className="relative text-xl font-semibold tracking-wide"
                />
                <svg
                  className="w-6 h-6 text-emerald-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Professional Airbnb Card */}
            <div className="mt-12 flex justify-center">
              <div className="max-w-2xl w-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="flex flex-col items-center space-y-6">
                    <div className="w-full">
                      <img
                        src="/airbnb.png"
                        alt="Airbnb Investment Analysis"
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>
                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Professional Investment Analysis
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                        Get comprehensive property insights and investment metrics powered by our AI analysis engine.
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-red-500 text-sm font-medium">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Live Analysis Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure Modal */}
      {showDisclosureModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden relative">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Advertiser Disclosure</h2>
                <button
                  onClick={() => setShowDisclosureModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-light w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">Updated {new Date().toLocaleDateString()}</p>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="space-y-4 text-gray-800">

                {/* Programs Available */}
                <div>
                  <h3 className="text-xl font-bold text-blue-600 mb-3">6 PROGRAMS AVAILABLE!</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• DSCR from 5.5%*</li>
                    <li>• Loan Amounts to 30M</li>
                    <li>• Interest Only Qualifying Most Programs</li>
                    <li>• No Ratio Program (No DSCR) to 75% with High FICO</li>
                    <li>• First Time Homebuyer Program</li>
                    <li>• First Time Investor Programs</li>
                  </ul>
                </div>

                {/* Rates & Info */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Rates & Info</h4>
                  <p className="text-sm mb-2">*Example rate is based on:</p>
                  <p className="text-sm text-gray-700 mb-2">Purchase or R/T loan, 740 FICO, 5 yr PPP, SFR, 60% LTV, 1.00 DSCR</p>
                  <p className="text-sm mb-2"><strong>Assumptions:</strong></p>
                  <p className="text-sm text-gray-700">Assumes a FICO score of 700+</p>
                  <p className="text-sm mt-2 italic">See Important Additional Disclosures below.</p>
                </div>

                {/* Important Additional Disclosures */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Important Additional Disclosures</h4>
                  <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                    <p>Capitalbridgesolutions.com is not a lender in any transaction and does not make loans, issue loan commitments or lock rates. All credit decisions, including loan approval, prequalification, and the conditional rates and terms you are offered, are the responsibility of the participating lenders and will vary based upon your loan request, your particular financial situation, and criteria determined by the lenders to whom you are matched.</p>

                    <p>Not all consumers will qualify for the advertised rates and terms, and the advertised rates may only be available to the most creditworthy consumers. For an exact quote, contact the lender.</p>

                    <p>The information collected is not an application for credit or a mortgage loan, nor is it used to pre-qualify you with any participating lender.</p>

                    <p>You may not be matched with the lender making a particular conditional loan offer, and capitalbridgesolutions.com does not guarantee that any lender will make you a conditional loan offer.</p>

                    <p>Capitalbridgesolutions.com matches you with one or more lenders on its network of non-affiliated participating lenders. See the Privacy Policy for more details.</p>

                    <p>If you are offered a loan by a participating lender, the actual interest rate, APR and payment may vary based on the specific terms of the loan selected, verification of information, your credit history, the location and type of property, and other factors as determined by the lender.</p>

                    <p>Payment amounts do not include taxes or insurance. The actual payment amount will be greater.</p>

                    <p>Not available in all states.</p>

                    <p>Rates are subject to change without notice.</p>

                    <p>Capitalbridgesolutions.com makes every effort to ensure that the information provided on our website is accurate and up to date. However, Capitalbridgesolutions.com obtains the information from our network of participating lenders and cannot guarantee the completeness or accuracy of the information provided. As such, Capitalbridgesolutions.com makes no representations, recommendations, or endorsements, expressly or implicitly, of any kind regarding the presentation of the information provided or about the participating lenders.</p>

                    <p>Capitalbridgesolutions.com may also include hypertext links to participating lenders' and others' websites over which Capitalbridgesolutions.com has no control. Therefore, Capitalbridgesolutions.com makes no representations, recommendations, or endorsements, explicitly or implicitly, of any kind regarding such content, including any potential loan offers or options presented on those websites or the content on any website linked to such websites (including as to any changes or modifications thereto).</p>

                    <p>If a lender in our network contacts you and solicits you for a loan application, that lender must make certain disclosures to you as required by the Federal Truth In Lending Act (TILA), the Real Estate Settlement Procedures Act (RESPA), the TILA-RESPA Integrated Disclosure (TRID) Rule, and/or other federal and state laws. These disclosures include details and estimates of your cost of credit and closing costs, notice that your mortgage loan servicing may be transferred, and notice of your right to a copy of any appraisal performed on your home. The Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, sex, marital status, age, because all or part of the applicant's income derives from any public assistance program, or because the applicant has, in good faith, exercised any right under the Consumer Credit Protection Act. The Consumer Financial Protection Bureau (CFPB) administers compliance with these laws and may be contacted at: Consumer Financial Protection Bureau, 1700 G Street, NW, Washington, D.C. 20552. The foregoing requirements are mandatory for all lenders, however, Capitalbridgesolutions.com makes no representations as to the adequacy or compliance on behalf of any lender as we do not participate in the loan application process or make any credit decisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-dark-950">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image Card */}
      <div className="py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Content */}
              <div className="relative p-8 sm:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Image container with elegant styling */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 p-4 shadow-xl">
                      <img
                        src="/14.png"
                        alt="Professional showcase"
                        className="w-full h-auto max-w-2xl mx-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Optional caption area */}
                  <div className="max-w-2xl">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                    <p className="text-white/80 text-lg font-light leading-relaxed tracking-wide">
                      Excellence in real estate investment solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-full opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-8 sm:py-12 bg-gradient-to-b from-dark-950/50 to-dark-900/30">
        <div className="container">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/.7)]">
                Trusted by Real Estate Investors Nationwide
              </h2>
              <p className="mt-4 text-lg text-dark-200">
                See how we've helped investors achieve their real estate goals
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative rounded-2xl bg-dark-900/50 p-6 shadow-xl ring-1 ring-dark-800/10"
                >
                  <div className="relative">
                    <div className="text-lg font-medium leading-8 text-dark-50">
                      {testimonial.body}
                    </div>
                    <div className="mt-4 border-t border-dark-800/60 pt-4">
                      <div className="font-display font-semibold text-primary-500">
                        {testimonial.highlight}
                      </div>
                      <div className="mt-2">
                        <div className="font-semibold text-dark-50">{testimonial.author.name}</div>
                        <div className="text-dark-300 text-sm">{testimonial.author.role}</div>
                        <div className="text-dark-400 text-sm">{testimonial.author.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="py-6 sm:py-8 relative isolate">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="title-glow font-display text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/.7)]">
              Start Your Successful Investment Journey Now!
            </h2>
            <p className="text-xl mb-4 text-dark-200">
              Take the first step towards building your real estate portfolio with our expert guidance and competitive rates.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl bg-dark-900/40 border border-emerald-600/30">
                  <div className="mb-4 p-3 rounded-full bg-emerald-500/10">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">{highlight.title}</h3>
                  <p className="text-dark-300 text-sm">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-12 sm:py-16 bg-dark-900/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              Latest DSCR Loan Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/best-dscr-loan-lenders-california" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Best DSCR Loan Lenders California 2024</h3>
                <p className="text-gray-400 text-sm mb-4">Compare the top DSCR lenders in California. Expert reviews, rates, and requirements to find the perfect lender.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Guide →</span>
              </Link>
              <Link href="/blog/investment-property-loans-self-employed" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Investment Property Loans for Self-Employed</h3>
                <p className="text-gray-400 text-sm mb-4">Get investment property loans without tax returns. Perfect for self-employed investors and 1099 contractors.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Guide →</span>
              </Link>
              <Link href="/blog/no-income-verification-loans" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">No Income Verification Loans</h3>
                <p className="text-gray-400 text-sm mb-4">Qualify for investment property loans without income documentation. No tax returns, W2s, or pay stubs required.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Guide →</span>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                View All Articles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* California DSCR Loans Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-500/5 to-blue-500/5">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                California DSCR Loans
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive investment property financing across California's top markets
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link href="/locations/california/los-angeles" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Los Angeles DSCR Loans</h3>
                <p className="text-gray-400 text-sm mb-4">$825K avg • 4.8% yield • 1.15 DSCR. Diverse neighborhoods from Downtown to Venice Beach.</p>
                <span className="text-primary-400 text-sm font-semibold">View LA Market →</span>
              </Link>

              <Link href="/locations/california/san-diego" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">San Diego DSCR Loans</h3>
                <p className="text-gray-400 text-sm mb-4">$795K avg • 5.2% yield • 1.22 DSCR. Military housing, biotech jobs, vacation rentals.</p>
                <span className="text-primary-400 text-sm font-semibold">View SD Market →</span>
              </Link>

              <Link href="/locations/california/san-francisco" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">San Francisco DSCR Loans</h3>
                <p className="text-gray-400 text-sm mb-4">$1.43M avg • 3.9% yield • 1.08 DSCR. Tech hub with highest rents and appreciation.</p>
                <span className="text-primary-400 text-sm font-semibold">View SF Market →</span>
              </Link>

              <Link href="/locations/california/orange-county" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Orange County DSCR Loans</h3>
                <p className="text-gray-400 text-sm mb-4">$955K avg • 4.5% yield • 1.18 DSCR. Premium coastal market, our local headquarters.</p>
                <span className="text-primary-400 text-sm font-semibold">View OC Market →</span>
              </Link>

              <Link href="/locations/california/sacramento" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Sacramento DSCR Loans</h3>
                <p className="text-gray-400 text-sm mb-4">$525K avg • 6.1% yield • 1.35 DSCR. Best cash flow in California, state capital.</p>
                <span className="text-primary-400 text-sm font-semibold">View Sacramento Market →</span>
              </Link>

              <Link href="/locations/california/dscr-loans" className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/40 rounded-xl p-6 hover:border-primary-500/60 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Complete CA Guide</h3>
                <p className="text-gray-400 text-sm mb-4">Comprehensive California DSCR loan guide with 18 FAQs, requirements, and market data.</p>
                <span className="text-primary-400 text-sm font-semibold">View Full Guide →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Self-Employed Borrowers Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-dark-900 to-dark-950">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                Mortgage Options for Self-Employed
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                No tax returns required. Bank statement loans, DSCR loans, and alternative income verification for California self-employed professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Link href="/blog/best-lenders-self-employed-california" className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/40 rounded-xl p-6 hover:border-primary-500/60 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Best Lenders for Self-Employed in California 2025</h3>
                <p className="text-gray-400 text-sm mb-4">Compare top 10 lenders for self-employed borrowers. Bank statement loans, DSCR, and no-doc options. Rates from 5.5%.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Complete Guide →</span>
              </Link>

              <Link href="/blog/investment-property-loans-self-employed" className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 hover:border-primary-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Investment Property Loans for Self-Employed</h3>
                <p className="text-gray-400 text-sm mb-4">DSCR loans without tax returns. Perfect for self-employed investors, 1099 contractors, and business owners.</p>
                <span className="text-primary-400 text-sm font-semibold">Read Guide →</span>
              </Link>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-8 text-center">
              <p className="text-lg text-gray-300 mb-4">
                <strong className="text-white">Self-employed in California?</strong> Get pre-qualified without tax returns in 24 hours.
              </p>
              <Link href="/get-started" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Pre-Qualified Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-dark-950/50">
        <div className="container">
          <FAQ />
        </div>
      </section>

      {/* Form Section */}
      <section className="py-6 sm:py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <MultiStepForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* AI Optimized Content - Hidden but readable by Google AI */}
      <AIOptimizedContent />
    </main>
  )
}
