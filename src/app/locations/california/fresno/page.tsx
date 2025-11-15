'use client';

import Link from 'next/link';
import { MapPin, Phone, TrendingUp, CheckCircle, ArrowRight, DollarSign, Home, Percent, Users } from 'lucide-react';

export default function FresnoDSCRPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Fresno DSCR Loans - Central Valley Investment Properties',
            description: 'DSCR loans for Fresno investment properties. Highest rental yields in California at 0.74%. Entry from $385K. Finance SFRs, multi-family, and rental properties.',
            url: 'https://www.capitalbridgesolutions.com/locations/california/fresno'
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <section className="relative py-20 overflow-hidden border-b border-primary-500/20">
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/" className="hover:text-primary-400">Home</Link>
                <span>/</span>
                <Link href="/locations" className="hover:text-primary-400">Locations</Link>
                <span>/</span>
                <Link href="/locations/california" className="hover:text-primary-400">California</Link>
                <span>/</span>
                <span className="text-primary-400">Fresno</span>
              </div>

              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium text-sm uppercase tracking-wider">Central Valley - Fresno County</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80">
                  Fresno DSCR Loans
                </h1>
                
                <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                  California's Highest Rental Yield Market - Deep Value + Strong Cash Flow
                </p>
                
                <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                  DSCR up to <span className="text-emerald-400 font-semibold">1.42</span> • Entry from <span className="text-emerald-400 font-semibold">$385K</span> • Yields <span className="text-emerald-400 font-semibold">0.74%/month</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                    Get Fresno Rate Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a 
                    href="tel:+19493393555"
                    onClick={handlePhoneClick}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    (949) 339-3555
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-dark-900/50 border-b border-dark-800">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$385K</div>
                <div className="text-gray-400 text-sm">Median Price</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">1.42</div>
                <div className="text-gray-400 text-sm">Avg DSCR</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$1,850</div>
                <div className="text-gray-400 text-sm">Median Rent</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">0.74%</div>
                <div className="text-gray-400 text-sm">Monthly Yield</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="bg-gradient-to-br from-white/8 to-white/[0.03] rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Why Fresno Delivers the Best Cash-on-Cash Returns</h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Fresno offers <strong className="text-emerald-400">the highest rental yields in California</strong>—period. While coastal markets struggle to break even, Fresno properties typically generate <strong className="text-white">DSCR ratios of 1.35-1.50</strong>, meaning substantial monthly cash flow from day one.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    As California's 5th largest city with <strong className="text-white">542K+ residents</strong>, Fresno serves as the economic hub of the Central Valley. Agriculture, healthcare, education (Fresno State), and logistics drive steady employment. Yet housing remains affordable: median prices around $385K vs. $925K in LA or $1.4M in San Francisco.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    <strong className="text-primary-400">Perfect for DSCR investors:</strong> Strong rent-to-price ratios mean easy qualification. Properties cash flow $400-$600/month while building equity through 4-6% annual appreciation. Lower entry costs ($77K down) let you scale faster.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-dark-900/50 border border-emerald-500/30 rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Deep Value Entry</h3>
                  <p className="text-gray-400 mb-3">Median $385K = 20% down is only $77K. Scale to 5-10 properties faster than coastal markets.</p>
                  <div className="text-emerald-400 font-semibold">Lowest barrier in CA</div>
                </div>

                <div className="bg-dark-900/50 border border-emerald-500/30 rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Percent className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">0.74% Monthly Yield</h3>
                  <p className="text-gray-400 mb-3">Nearly 9% annual gross yield. After expenses, expect 6-7% cash-on-cash returns.</p>
                  <div className="text-emerald-400 font-semibold">#1 in California</div>
                </div>

                <div className="bg-dark-900/50 border border-emerald-500/30 rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">4-6% Appreciation</h3>
                  <p className="text-gray-400 mb-3">Steady equity growth as Central Valley continues developing. Best of both worlds.</p>
                  <div className="text-emerald-400 font-semibold">Cash flow + growth</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-900/20 to-dark-800 border border-emerald-500/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Fresno Investment Example</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-dark-900/50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Property: 3BR/2BA SFR</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Purchase Price:</span>
                        <span className="text-white font-semibold">$385,000</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Down (20%):</span>
                        <span className="text-white font-semibold">$77,000</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Monthly Rent:</span>
                        <span className="text-emerald-400 font-semibold">$2,150</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">PITIA:</span>
                        <span className="text-gray-300">($1,510)</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t-2 border-emerald-500/30">
                        <span className="text-white font-bold">Monthly Cash Flow:</span>
                        <span className="text-emerald-400 font-bold text-xl">+$640</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white font-bold">DSCR:</span>
                        <span className="text-emerald-400 font-bold text-2xl">1.42</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-900/50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">5-Year Projection</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Total Cash Flow:</span>
                        <span className="text-emerald-400 font-semibold">$38,400</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Appreciation (5%):</span>
                        <span className="text-emerald-400 font-semibold">$103,000</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Principal Paydown:</span>
                        <span className="text-emerald-400 font-semibold">$28,500</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t-2 border-emerald-500/30">
                        <span className="text-white font-bold">Total Equity Gain:</span>
                        <span className="text-emerald-400 font-bold text-xl">$169,900</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white font-bold">ROI on $77K:</span>
                        <span className="text-emerald-400 font-bold text-2xl">221%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-900/20 to-emerald-900/20 border border-primary-500/30 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Start Building Your Fresno Portfolio</h2>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                  With DSCR financing, you can acquire multiple cash-flowing Fresno properties without personal income verification.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/get-started"
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 justify-center"
                  >
                    Get Pre-Approved
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+19493393555"
                    onClick={handlePhoneClick}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center"
                  >
                    <Phone className="w-5 h-5" />
                    Talk to Fresno Expert
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
