'use client';

import Link from 'next/link';
import { MapPin, Phone, TrendingUp, ArrowRight, DollarSign, Building2 } from 'lucide-react';

export default function SanJoseDSCRPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <section className="relative py-20 overflow-hidden border-b border-primary-500/20">
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/locations/california" className="hover:text-primary-400">California</Link>
              <span>/</span>
              <span className="text-primary-400">San Jose</span>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 font-medium text-sm uppercase tracking-wider">Silicon Valley</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80">
                San Jose DSCR Loans
              </h1>
              
              <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                Silicon Valley's Premier Investment Market - Tech Hub Long-Term Appreciation
              </p>
              
              <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                Median <span className="text-blue-400 font-semibold">$1.5M</span> • Rent <span className="text-blue-400 font-semibold">$4,800/mo</span> • DSCR <span className="text-blue-400 font-semibold">1.02+</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                  Get San Jose Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+19493393555" onClick={handlePhoneClick} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  (949) 339-3555
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-dark-900/50 border-b border-dark-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$1.5M</div>
              <div className="text-gray-400 text-sm">Median Price</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$4,800</div>
              <div className="text-gray-400 text-sm">Median Rent</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1.02</div>
              <div className="text-gray-400 text-sm">Avg DSCR</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">8-10%</div>
              <div className="text-gray-400 text-sm">Annual Appreciation</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="bg-gradient-to-br from-white/8 to-white/[0.03] rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Why San Jose is the Ultimate Long-Term Hold</h2>
              <p className="text-gray-300 text-lg mb-4">
                San Jose, the heart of Silicon Valley, offers <strong className="text-blue-400">exceptional long-term appreciation</strong> fueled by tech salaries averaging $150K+. While cash flow is modest (DSCR 1.0-1.10), investors target <strong className="text-white">8-10% annual appreciation</strong>—turning a $1.5M property into $2.4M+ in 5 years.
              </p>
              <p className="text-gray-300 text-lg">
                DSCR loans work because <strong className="text-primary-400">premium rents ($4,500-$5,500) still qualify you</strong> even with high purchase prices. No personal income docs needed—the property's rent covers the mortgage, and equity growth does the heavy lifting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-dark-900/50 border border-blue-500/30 rounded-xl p-6">
                <Building2 className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Tech Hub Demand</h3>
                <p className="text-gray-400">Apple, Google, Meta, Cisco HQs. Tenants earn $150K-$300K. Recession-resistant rental demand.</p>
              </div>
              <div className="bg-dark-900/50 border border-blue-500/30 rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Elite Appreciation</h3>
                <p className="text-gray-400">Historical 8-10% annual gains. $1.5M property = $150K/year equity growth. Compounding wealth machine.</p>
              </div>
              <div className="bg-dark-900/50 border border-blue-500/30 rounded-xl p-6">
                <DollarSign className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Breakeven+ Cash Flow</h3>
                <p className="text-gray-400">DSCR 1.0-1.10 means $0-$500/mo cash flow. Appreciation is the real payoff.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-dark-800 border border-blue-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">5-Year San Jose Projection</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">Purchase Price:</span>
                    <span className="text-white font-semibold">$1,500,000</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">Down (25%):</span>
                    <span className="text-white font-semibold">$375,000</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">Monthly Rent:</span>
                    <span className="text-blue-400 font-semibold">$5,200</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">DSCR:</span>
                    <span className="text-blue-400 font-bold">1.08</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">Cash Flow (5yr):</span>
                    <span className="text-blue-400 font-semibold">$18,000</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">Appreciation (8%):</span>
                    <span className="text-blue-400 font-semibold">$660,000</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-dark-800">
                    <span className="text-gray-400">Principal Paydown:</span>
                    <span className="text-blue-400 font-semibold">$82,000</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-blue-500/30">
                    <span className="text-white font-bold">ROI:</span>
                    <span className="text-blue-400 font-bold text-2xl">203%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-900/20 to-blue-900/20 border border-primary-500/30 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Finance Your Silicon Valley Investment</h2>
              <p className="text-xl text-gray-300 mb-6">DSCR loans make San Jose accessible—no $500K income verification required.</p>
              <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg inline-flex items-center gap-2">
                Start Application
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
