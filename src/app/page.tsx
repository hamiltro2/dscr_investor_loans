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
        name: 'John D.',
        handle: '@johndoe',
        imageUrl: 'https://example.com/johndoe.jpg'
      },
      body: 'The process was incredibly smooth. Got approved much faster than expected!'
    },
    {
      author: {
        name: 'Sarah M.',
        handle: '@sarahm',
        imageUrl: 'https://example.com/sarahm.jpg'
      },
      body: 'Best rates I\'ve found for investment properties. Highly recommend!'
    },
    {
      author: {
        name: 'Mike R.',
        handle: '@miker',
        imageUrl: 'https://example.com/miker.jpg'
      },
      body: 'Their team really understands the needs of real estate investors.'
    }
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative isolate pt-14 pb-20 sm:pb-24">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-5xl font-bold mb-6 text-dark-50 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                No Investor Left Behind
              </h1>
              <p className="text-xl mb-8 text-white">
                We work around the clock to make your investment goals a reality!
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="/investor-analysis"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-6 
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
                    text="Try Our AI Investment Analysis"
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
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 bg-dark-950">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {cards.map((card, index) => (
                <InfoCard key={index} {...card} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <div className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-emerald-500">Client Reviews</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trusted by Real Estate Investors
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.author.handle}>
                    <figure className="relative h-full rounded-2xl bg-dark-800/30 p-8 transition-all duration-300 
                      hover:bg-dark-800/50 group ring-1 ring-white/10 hover:ring-emerald-500/50
                      before:absolute before:inset-0 before:rounded-2xl before:transition-all before:duration-300
                      before:ring-1 before:ring-emerald-500/0 hover:before:ring-emerald-500/20
                      after:absolute after:inset-0 after:rounded-2xl after:transition-all after:duration-300
                      after:ring-2 after:ring-emerald-500/0 hover:after:ring-emerald-500/10">
                      <blockquote className="relative text-base leading-6">
                        <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{`"${testimonial.body}"`}</p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center gap-x-4 border-t border-white/10 pt-6">
                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 ring-1 ring-white/10 flex items-center justify-center">
                          <span className="text-lg font-semibold text-emerald-500">{testimonial.author.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">{testimonial.author.name}</div>
                          <div className="text-sm text-gray-400 group-hover:text-emerald-300/70 transition-colors duration-300">{testimonial.author.handle}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="relative isolate py-12 sm:py-16 bg-gradient-dark">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-6 text-dark-50 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                Ready to Scale Your Real Estate Portfolio?
              </h2>
              <div className="flex flex-col gap-4 items-center">
                <div className="flex items-center gap-2 text-primary-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-lg">Quick Pre-Approval in 24-48 Hours</p>
                </div>
                <div className="flex items-center gap-2 text-primary-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-lg">No Tax Returns Required</p>
                </div>
                <div className="flex items-center gap-2 text-primary-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-lg">Rates Starting at 6.99%</p>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-dark-800/50 p-8 rounded-xl backdrop-blur-sm border border-primary-500/20 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Start Your Pre-Approval Now
                  </h3>
                  <p className="text-gray-300">
                    Fill out our simple form below and get a response within 24 hours. No hard credit pull required!
                  </p>
                </div>
                <MultiStepForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  )
}
