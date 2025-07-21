'use client';

import { Zap, TrendingDown, Users } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { TypewriterText } from '@/components/TypewriterText'
import { InfoCard } from '@/components/InfoCard'

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
      title: "Rates Starting at 6.99%",
      description: "Competitive rates for your investment property financing needs."
    }
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
              <p className="text-xl mb-8 text-white">
                We work around the clock to make your investment goals a reality!
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
      </main>
    </Suspense>
  )
}
