'use client';

import { Zap, TrendingDown, Users, CheckCircle2, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DynamicHeroHeadlineLight } from '@/components/DynamicHeroHeadlineLight';

const MultiStepForm = dynamic(
  () => import('@/components/MultiStepForm').then(mod => ({ default: mod.MultiStepForm })),
  {
    loading: () => (
      <div className="card animate-pulse h-[500px] flex items-center justify-center bg-slate-900 rounded-2xl shadow-xl">
        <span className="text-white">Loading secure application...</span>
      </div>
    )
  }
);

export function LightLandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/Capital_Bridge_solutions_Logo.png" 
                alt="Capital Bridge Solutions" 
                className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Call for immediate funding</span>
                <a href="tel:888-521-0353" className="text-lg font-bold text-blue-700 hover:text-blue-800 transition-colors">
                  (888) 521-0353
                </a>
              </div>
              <button 
                onClick={() => window.gtag && window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' })}
                className="relative group px-6 sm:px-8 py-3 rounded-full bg-blue-700 text-white font-semibold text-sm sm:text-base hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                Get Approved
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 lg:pt-48 lg:pb-24 overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & Value Propositions */}
            <div className="text-center lg:text-left space-y-8">
              <DynamicHeroHeadlineLight />
              
              <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0">
                Direct-to-borrower financing. Qualify based entirely on property cash flow—no personal income verification required.
              </p>

              {/* Visio-Style Value Pillars Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                {[
                  { icon: ShieldCheck, text: "No W-2s or Tax Returns" },
                  { icon: TrendingUp, text: "Up to 80% LTV" },
                  { icon: Users, text: "Close in an LLC Name" },
                  { icon: Clock, text: "Close in as few as 10 Days" }
                ].map((pillar, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <pillar.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span className="font-semibold text-slate-800">{pillar.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-6 opacity-80">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-700">5-Star Rated Lender</span>
                </div>
                <div className="w-px h-6 bg-slate-300 hidden sm:block"></div>
                <span className="text-sm font-bold text-slate-700">Nationwide Coverage</span>
              </div>
            </div>

            {/* Right Column: MultiStepForm embedded in a dark card to preserve its styling */}
            <div className="w-full max-w-md mx-auto lg:ml-auto relative z-20">
              <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-[3rem]"></div>
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-700 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Check Your Rate</h3>
                <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-slate-800">Complete this quick form to see what you qualify for in minutes.</p>
                <div className="form-wrapper-dark">
                  <MultiStepForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Grid Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Smart Investors Choose DSCR</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Skip the bureaucracy of traditional banks. Our asset-based lending approach means faster closings and limitless scaling.</p>
          </div>
          
          <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-4">
              <div className="font-bold text-slate-900">Feature</div>
              <div className="font-bold text-center text-blue-700">Capital Bridge DSCR</div>
              <div className="font-bold text-center text-slate-500">Traditional Banks</div>
            </div>
            
            {[
              { label: "Personal Income Required", cbs: "No", bank: "Yes" },
              { label: "Tax Returns / W2s", cbs: "No", bank: "Yes" },
              { label: "Entity Borrowing (LLC)", cbs: "Yes", bank: "Rarely" },
              { label: "Portfolio Limits", cbs: "None", bank: "Strict (Usually 10)" },
              { label: "Closing Speed", cbs: "1-2 Weeks", bank: "30-60 Days" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 p-4 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0`}>
                <div className="font-medium text-slate-700">{row.label}</div>
                <div className="flex justify-center items-center font-bold text-slate-900">
                  {row.cbs === "Yes" || row.cbs === "None" || row.cbs === "No" || row.cbs.includes("Weeks") ? (
                    <span className={row.cbs === "No" && row.label.includes("Income") ? "text-emerald-600 flex items-center gap-1" : "text-slate-900"}>{row.cbs === "No" && row.label.includes("Income") ? <CheckCircle2 className="w-4 h-4"/> : null}{row.cbs}</span>
                  ) : row.cbs}
                </div>
                <div className="flex justify-center items-center text-slate-500">{row.bank}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <img src="/Capital_Bridge_solutions_Logo.png" alt="Logo" className="h-10 mx-auto mb-6 brightness-0 invert opacity-50 hover:opacity-100 transition-opacity" />
          <p className="text-slate-500 text-sm max-w-2xl mx-auto mb-6">
            Lending primarily for investment properties. Not intended for owner-occupied residential use. Rates and terms are subject to change based on market conditions and borrower qualification.
          </p>
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Capital Bridge Solutions. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
