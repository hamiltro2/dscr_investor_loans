'use client';

import { Zap, TrendingDown, Users } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { TypewriterText } from '@/components/TypewriterText'
import { InfoCard } from '@/components/InfoCard'
import { FAQ } from '@/components/FAQ'
import { AIOptimizedContent } from '@/components/AIOptimizedContent'
import { DynamicHeroHeadline } from '@/components/DynamicHeroHeadline'
import { QuickCaptureForm } from '@/components/QuickCaptureForm'

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
      bgImage: "/images/bg_fast_approval_humans.png",
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
      bgImage: "/images/bg_competitive_rates_humans.png",
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
      bgImage: "/images/bg_expert_guidance_humans.png",
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
      title: "Rates Starting at 5.99%",
      description: "Competitive rates for your investment property financing needs."
    }
  ];

  return (
    <main className="min-h-screen">
                  {/* Hero Section */}
      <section className="relative isolate pt-14 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Text Section */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-6">
            <div>
              <DynamicHeroHeadline />
              <p className="text-xl text-emerald-100/90 font-light max-w-2xl mx-auto">
                Direct-to-borrower financing. Experience our streamlined process and close your investment fast!
              </p>
            </div>

            {/* Highlights & Social Proof */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-dark-700/50">
                <span className="text-white font-medium text-lg">5.99%</span>
                <span className="text-dark-300 text-sm">Rates From</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-dark-700/50">
                <span className="text-white font-medium text-lg">15%</span>
                <span className="text-dark-300 text-sm">Down Payment</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-full border border-emerald-500/30">
                <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider">Fast Closing</span>
              </div>
            </div>
          </div>

          {/* Bottom Layout: Video (Left) + Form (Right) */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto pt-4 lg:pl-16">
            
            {/* Left Column: Pain-Point Hero Image & Socials */}
            <div className="w-full lg:w-auto flex flex-col items-center lg:items-start flex-shrink-0">
              {/* Pain-Point Hero Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group w-[380px] max-w-full z-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-red-500/20 blur opacity-50"></div>
                <div className="relative rounded-xl overflow-hidden bg-dark-900 border border-white/5">
                  {/* Hero Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src="/images/investor_pain_point_hero.png" 
                      alt="Real estate investor who lost a deal to a cash buyer"
                      className="w-full h-full object-cover scale-[1.02] contrast-[1.05] saturate-[1.1] brightness-[0.85]"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none"></div>
                    
                    {/* Top badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center gap-1.5 shadow-lg">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Sound Familiar?</span>
                      </div>
                    </div>

                    {/* Pain point text overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                      <h3 className="text-white text-2xl sm:text-[26px] font-extrabold leading-tight tracking-tight drop-shadow-xl">
                        Lost Another Deal<br/>
                        <span className="text-red-400">to a Cash Buyer?</span>
                      </h3>
                      <p className="text-white/80 text-sm font-medium leading-relaxed drop-shadow-lg">
                        Stop watching properties slip away while your bank takes 45+ days to close.
                      </p>
                      
                      {/* Rate callout */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 backdrop-blur-md rounded-lg border border-emerald-400/30">
                          <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          <span className="text-emerald-300 text-sm font-bold">DSCR Loans from 5.99%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 w-fit">
                        <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-white/90 text-sm font-semibold">Close in 5–7 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Accounts */}
              <div className="flex items-center gap-5 pt-6 w-[380px] justify-center lg:justify-start lg:pl-4">
                <span className="text-white/60 text-sm uppercase tracking-wider">Follow us:</span>
                <a href="https://www.instagram.com/thecapitalbridgesolutions/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-pink-500 transition-colors">
                   <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                   </svg>
                </a>
                <a href="https://www.tiktok.com/@capitalbridgesolutions" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                   <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                   </svg>
                </a>
              </div>
            </div>

            {/* Right Column: MultiStepForm */}
            <div className="w-full flex-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[640px] z-10 mt-8 lg:mt-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-blue-500/20 rounded-3xl blur-md opacity-60"></div>
                <div className="relative bg-dark-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 pb-2 min-h-[400px]">
                  <div className="flex items-center justify-between mb-4 pl-2 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white tracking-wide">Get Pre-Qualified Now</h3>
                    </div>
                    {/* Advertiser Disclosure Trigger */}
                    <button
                      onClick={() => setShowDisclosureModal(true)}
                      className="text-xs text-white/50 hover:text-white/80 transition-colors duration-300 underline"
                    >
                      Disclosure
                    </button>
                  </div>
                  <Suspense fallback={
                    <div className="animate-pulse space-y-4 pt-4">
                      <div className="h-4 w-1/4 bg-dark-800 rounded"></div>
                      <div className="h-12 bg-dark-800 rounded"></div>
                      <div className="h-4 w-1/4 bg-dark-800 rounded mt-6"></div>
                      <div className="h-12 bg-dark-800 rounded"></div>
                    </div>
                  }>
                    <div className="hero-form-wrapper">
                       <MultiStepForm />
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>

          </div>
          
          <div className="text-center mt-12 mb-4 flex flex-col items-center">
            <a
              href="tel:+19493393555"
              className="inline-flex items-center gap-3 text-lg sm:text-xl font-light text-white/80 hover:text-white transition-colors duration-300 mb-8"
              onClick={() => window.gtag && window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' })}
            >
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Questions? Call Us: (949) 339-3555
            </a>

            {/* Feature Tools Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-2 w-full max-w-3xl px-4">
              {/* ChatGPT Store Button */}
              <a href="https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors" target="_blank" rel="noopener noreferrer" className="relative flex items-center gap-4 w-full sm:w-[340px] bg-[#071d14] hover:bg-[#0a271b] border border-emerald-900/40 rounded-xl p-4 transition-all duration-300 group shadow-[0_4px_20px_rgba(16,185,129,0.05)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] overflow-visible h-[80px]">
                <div className="absolute -top-3 right-6 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg transform group-hover:-translate-y-0.5 transition-transform z-10">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  FEATURED
                </div>
                <div className="flex-shrink-0 bg-[#0c2a1e] p-2.5 rounded-lg border border-emerald-900/30">
                  <svg className="w-5 h-5 text-[#10a37f]" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.6033 8.3829V6.0544a.0804.0804 0 0 1 .0379-.0568l4.8166-2.7818a4.4992 4.4992 0 0 1 6.3585 6.155l-.1419-.0758-4.783-2.763a.7712.7712 0 0 0-.7806 0zM8.4552 4.4944A4.4755 4.4755 0 0 1 11.3316 3.44l-.1419.0804-4.7783 2.763a.7948.7948 0 0 0-.3927.6813v6.7369L3.9986 12.533a.071.071 0 0 1-.0379-.052V6.8984a4.504 4.504 0 0 1 4.4945-4.404zm11.3268 3.5138v5.6725a.7664.7664 0 0 1-.3879.6765L13.5796 17.71l2.0201-1.1686a.0757.0757 0 0 0 .071 0l4.8303-2.7866a4.504 4.504 0 0 0-2.28-8.1504zM10.6551 13.9169l-2.4578-1.42 2.4578-1.42 2.4578 1.42-2.4578 1.42z"/>
                  </svg>
                </div>
                <div className="text-left w-full pl-1 flex flex-col justify-center">
                  <div className="text-white text-[15px] font-bold tracking-wide">Chat with Cap AI</div>
                  <div className="text-emerald-400 text-[11px] font-medium opacity-90 leading-tight pr-4">In ChatGPT Store • Get instant answers</div>
                </div>
                <svg className="w-5 h-5 text-emerald-600/80 absolute right-4 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>

              {/* Chrome Extension Button */}
              <a href="https://www.capitalbridgesolutions.com/chrome-extension" target="_blank" rel="noopener noreferrer" className="relative flex items-center gap-4 w-full sm:w-[340px] bg-[#141b25] hover:bg-[#1a2331] border border-blue-900/40 rounded-xl p-4 transition-all duration-300 group shadow-[0_4px_20px_rgba(59,130,246,0.05)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] h-[80px]">
                <div className="flex-shrink-0 bg-[#1d2735] p-2.5 rounded-lg border border-blue-900/30">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,1,0,22,12A10,10,0,0,0,12,2ZM18,6.88a7.86,7.86,0,0,1,2,4.89H14.1L18,6.88ZM12,14.5A2.5,2.5,0,1,1,14.5,12A2.5,2.5,0,0,1,12,14.5ZM13,4.19C16.27,4.88,18.84,7.43,20.08,10.66H10.51a4.5,4.5,0,0,1,2.53-6.47ZM6,17.12a7.86,7.86,0,0,1-2-4.89h5.9L6,17.12ZM3.92,13.34c.16,3,.94,5.82,2.44,8.19A8.13,8.13,0,0,1,3.92,13.34Zm8.08,6.47a4.5,4.5,0,0,1-2.53-6.47H10.51C11.54,16.5,12.77,18.52,12,19.81Z"/></svg>
                </div>
                <div className="text-left w-full pl-1 flex flex-col justify-center">
                  <div className="text-white text-[15px] font-bold tracking-wide">Chrome Extension</div>
                  <div className="text-blue-300/80 text-[11px] font-medium leading-tight pr-4">Analyze properties instantly</div>
                </div>
                <svg className="w-5 h-5 text-blue-800 absolute right-4 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
            
            <div className="w-full max-w-4xl mx-auto mt-12 border-t border-white/5 pt-8">
              <button
                onClick={() => setShowDisclosureModal(true)}
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300 underline tracking-wide"
              >
                Advertiser Disclosure
              </button>
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

      {/* Quick Capture CTA Section */}
      <section className="py-10 sm:py-14 relative isolate" id="quick-apply">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="title-glow font-display text-3xl sm:text-4xl font-bold mb-3 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300">
                Get Your Free Rate Quote in 60 Seconds
              </h2>
              <p className="text-lg text-dark-200 max-w-2xl mx-auto">
                No credit check. No obligations. Just your personalized DSCR loan options.
              </p>
            </div>

            {/* Quick Form Card */}
            <QuickCaptureForm />

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-dark-300 text-sm">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-dark-300 text-sm">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-dark-300 text-sm">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                <span>No impact on your credit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-12 sm:py-16 bg-dark-900/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/.7)]">
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/.7)]">
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary)/.7)]">
                Mortgage Options for Self-Employed
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                No tax returns required. Bank statement loans, DSCR loans, and alternative income verification for California self-employed professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Link href="/blog/best-lenders-self-employed-california" className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 border border-primary-500/40 rounded-xl p-6 hover:border-primary-500/60 transition-all duration-300 group">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">Best Lenders for Self-Employed in California 2026</h3>
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
              <a href="#quick-apply" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Pre-Qualified Now →
              </a>
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

      {/* AI Optimized Content - Hidden but readable by Google AI */}
      <AIOptimizedContent />
    </main>
  )
}
