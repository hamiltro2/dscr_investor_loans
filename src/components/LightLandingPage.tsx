'use client';

import { Zap, TrendingDown, Users, CheckCircle2, ShieldCheck, Clock, TrendingUp, Building2, HardHat, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DynamicHeroHeadlineLight } from '@/components/DynamicHeroHeadlineLight';

const MultiStepForm = dynamic(
  () => import('@/components/MultiStepForm').then(mod => ({ default: mod.MultiStepForm })),
  {
    loading: () => (
      <div className="card animate-pulse h-[500px] flex items-center justify-center bg-white rounded-2xl shadow-xl w-full border border-slate-200">
        <span className="text-slate-500 font-medium">Loading Application...</span>
      </div>
    )
  }
);

export function LightLandingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/Capital_Bridge_solutions_Logo.png" 
                alt="Capital Bridge Solutions" 
                className="h-12 sm:h-16 lg:h-20 w-auto transition-transform group-hover:scale-105 object-contain"
              />
            </Link>
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Speak to a Funding Specialist</span>
                <a href="tel:949-339-3555" className="text-xl font-black text-slate-900 hover:text-emerald-700 transition-colors flex items-center gap-2">
                  (949) 339-3555
                </a>
              </div>
              <button 
                onClick={() => window.gtag && window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' })}
                className="relative group px-6 sm:px-8 py-3 rounded-md bg-[#001D4A] text-white font-bold text-sm sm:text-base hover:bg-blue-900 transition-all shadow-md hover:shadow-lg"
              >
                Access Capital
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 lg:pt-44 lg:pb-20 relative overflow-hidden bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Pragmatic Investor Copy */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              {/* Dynamic Headline Component handles the H1 */}
              <DynamicHeroHeadlineLight />
              
              <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stop letting traditional banks slow down your portfolio growth. Borrow based on the <strong className="text-emerald-700 font-bold">property's cash flow</strong>, not your personal income.
              </p>

              {/* Growth-Oriented Pillars Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-4 max-w-2xl mx-auto lg:mx-0">
                {[
                  { icon: Building2, text: "Unlimited Property Scaling", desc: "No arbitrary portfolio limits" },
                  { icon: BarChart3, text: "Close in Your LLC", desc: "Protect your personal assets" },
                  { icon: ShieldCheck, text: "No W-2s or Tax Returns", desc: "Fast, asset-based underwriting" },
                  { icon: HardHat, text: "Fix & Flip or Buy & Hold", desc: "Solutions for your exact real estate strategy" }
                ].map((pillar, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                         <pillar.icon className="w-5 h-5 text-[#001D4A]" />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-900">{pillar.text}</div>
                      <div className="text-sm text-slate-500 mt-1">{pillar.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: MultiStepForm */}
            <div className="w-full max-w-md mx-auto lg:col-span-5 relative z-20">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl relative border border-slate-300">
                <h3 className="text-2xl font-black text-[#001D4A] mb-2 text-center">Scale Your Portfolio</h3>
                <p className="text-slate-500 text-sm mb-6 text-center font-medium">See how much capital you qualify for today.</p>
                
                {/* Form Background is explicitly set to dark mode so the MultiStepForm renders perfectly */}
                <div className="overflow-hidden bg-slate-900 text-white rounded-xl border border-slate-800 shadow-inner p-2 sm:p-4">
                  <MultiStepForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pragmatic Visuals Section */}
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Capital for Real Investors</h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">Whether you are buying a turnkey 4-plex or funding an extensive flip, we provide the reliable leverage you need to acquire assets and increase your cash flow.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Practical Multi Family Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="/images/multifamily_investment_property.png"
                  alt="Multi-Family Investment Property Cash Flow"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-md shadow-md border border-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 font-bold" />
                <span className="font-bold text-slate-900 text-sm">Long Term Rentals (DSCR)</span>
              </div>
            </div>

            {/* Active Investor Fix and Flip Image */}
            <div className="group relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="/images/investor_on_site.png"
                  alt="Active Real Estate Investor Renovating Property"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4 bg-[#001D4A]/95 backdrop-blur-sm px-4 py-2 rounded-md shadow-md border border-[#001D4A] flex items-center gap-2">
                <HardHat className="w-4 h-4 text-white font-bold" />
                <span className="font-bold text-white text-sm">Fix & Flip Financing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Trust Section */}
      <section className="bg-[#001D4A] py-16 text-white border-y border-slate-800">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl md:text-2xl font-medium text-blue-200 mb-8">Join thousands of high-performing investors scaling with Capital Bridge</h3>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-80">
                <div className="text-center">
                    <div className="text-4xl font-black mb-1">A+</div>
                    <div className="text-sm uppercase tracking-wider text-blue-300 font-bold">BBB Rating</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-black mb-1">10<span className="text-2xl ml-1 text-blue-400">Days</span></div>
                    <div className="text-sm uppercase tracking-wider text-blue-300 font-bold">Average Closing</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-black mb-1">None</div>
                    <div className="text-sm uppercase tracking-wider text-blue-300 font-bold">Portfolio Limits</div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-800 text-slate-400">
        <div className="container mx-auto px-4 md:flex items-center justify-between">
          <div className="mb-8 md:mb-0">
             <img src="/Capital_Bridge_solutions_Logo.png" alt="Logo" className="h-14 lg:h-16 mb-6 brightness-0 invert opacity-40 hover:opacity-100 transition-opacity object-contain" />
             <div className="text-sm">
               © {new Date().getFullYear()} Capital Bridge Solutions.<br/>All Rights Reserved.
             </div>
          </div>
          <div className="max-w-md text-xs sm:text-sm text-slate-500 leading-relaxed md:text-right">
            Lending primarily for investment properties. Not intended for owner-occupied residential use. Rates and terms are subject to change based on market conditions, property valuation, and borrower qualification.
          </div>
        </div>
      </footer>
    </main>
  );
}
