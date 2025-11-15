'use client';

import Link from 'next/link';
import { MapPin, Phone, ArrowRight } from 'lucide-react';

export default function LongBeachDSCRPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', { 'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <section className="relative py-20 overflow-hidden border-b border-primary-500/20">
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/locations/california" className="hover:text-primary-400">California</Link>
              <span>/</span>
              <span className="text-primary-400">Long Beach</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="text-primary-300 font-medium text-sm">Coastal LA County</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Long Beach DSCR Loans
            </h1>
            
            <p className="text-2xl text-gray-300 mb-4">Coastal Investment Market with Balanced Returns</p>
            <p className="text-xl text-gray-400 mb-8">
              Median <span className="text-primary-400 font-semibold">$725K</span> • DSCR <span className="text-primary-400 font-semibold">1.15</span> • Port city growth
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl inline-flex items-center gap-2">
                Get Long Beach Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+19493393555" onClick={handlePhoneClick} className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/20 inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-dark-900/50">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 text-center">
            <div><div className="text-4xl font-bold text-primary-400 mb-2">$725K</div><div className="text-gray-400 text-sm">Median Price</div></div>
            <div><div className="text-4xl font-bold text-primary-400 mb-2">$3,100</div><div className="text-gray-400 text-sm">Median Rent</div></div>
            <div><div className="text-4xl font-bold text-primary-400 mb-2">1.15</div><div className="text-gray-400 text-sm">Avg DSCR</div></div>
            <div><div className="text-4xl font-bold text-primary-400 mb-2">5-6%</div><div className="text-gray-400 text-sm">Appreciation</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Long Beach: Coastal Appreciation + Cash Flow</h2>
            <p className="text-gray-300 text-lg mb-4">
              Long Beach offers <strong className="text-primary-400">balanced coastal investing</strong>—better cash flow than LA proper, but still capturing beach city appreciation. As California's 7th largest city and busiest port, Long Beach combines maritime economy with coastal lifestyle appeal.
            </p>
            <p className="text-gray-300 text-lg">
              DSCR loans work perfectly: Median $725K means $145K down (vs. $185K in LA). Rents of $3,000-$3,400 generate DSCR ratios of 1.10-1.20. Mix of SFRs and multi-family near downtown, Belmont Shore, and Naples.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary-900/20 to-dark-800 border border-primary-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Finance Your Long Beach Property</h2>
            <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl inline-flex items-center gap-2">
              Get Pre-Approved <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
