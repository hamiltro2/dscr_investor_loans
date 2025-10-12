'use client';

import Link from 'next/link';
import { MapPin, Phone, Calculator, TrendingUp, Building2, CheckCircle, ArrowRight, DollarSign, Home, Waves } from 'lucide-react';

export default function SanDiegoDSCRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-primary-400">Locations</Link>
              <span>/</span>
              <Link href="/locations/california" className="hover:text-primary-400">California</Link>
              <span>/</span>
              <span className="text-primary-400">San Diego</span>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">San Diego County</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80">
                San Diego DSCR Loans
              </h1>
              
              <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                Coastal Investment Property Financing for America's Finest City
              </p>
              
              <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                Military housing, vacation rentals, and strong rental demand. <span className="text-primary-400 font-semibold">Rates from 5.99%</span> • Close in 10-15 days
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                  Get Free Rate Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+19493393555" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2" onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}>
                  <Phone className="w-5 h-5" />
                  (949) 339-3555
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-white/10">
        <div className="container">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">$795K</div>
              <div className="text-gray-400 text-sm">Avg Property Price</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">5.2%</div>
              <div className="text-gray-400 text-sm">Rental Yield</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">1.22</div>
              <div className="text-gray-400 text-sm">Avg DSCR Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">$3,200</div>
              <div className="text-gray-400 text-sm">Median Rent</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">San Diego DSCR Loans: Market Overview</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  San Diego County offers unique investment opportunities driven by <strong className="text-white">military housing demand</strong>, <strong className="text-white">biotech job growth</strong>, and <strong className="text-white">year-round tourism</strong>. With 3.3 million residents and a median rent of $3,200, San Diego's rental market combines stability with appreciation potential.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  DSCR loans are ideal for San Diego investors because they allow qualification based on rental income—critical for military housing, vacation rentals, and multi-family properties. Whether you're targeting <strong className="text-primary-400">Pacific Beach vacation rentals</strong>, <strong className="text-primary-400">Mira Mesa single-families</strong>, or <strong className="text-primary-400">North Park multi-families</strong>, DSCR financing removes personal income barriers.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Top Investment Neighborhoods in San Diego</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Pacific Beach', avgPrice: '$825K', yield: '6.5%', description: 'Vacation rentals, beach proximity, high STR income potential' },
                  { name: 'North Park', avgPrice: '$685K', yield: '5.4%', description: 'Urban core, walkable, young professionals, strong appreciation' },
                  { name: 'Mira Mesa', avgPrice: '$695K', yield: '5.3%', description: 'Military families, tech workers, stable rental demand' },
                  { name: 'Chula Vista', avgPrice: '$625K', yield: '5.6%', description: 'South Bay growth, affordable entry, strong cash flow' },
                  { name: 'La Mesa', avgPrice: '$715K', yield: '5.1%', description: 'East County, family-friendly, good schools, stable market' },
                  { name: 'Ocean Beach', avgPrice: '$895K', yield: '5.8%', description: 'Beach community, vacation rentals, bohemian vibe' }
                ].map((neighborhood, index) => (
                  <div key={index} className="bg-dark-900/50 rounded-xl p-6 border border-dark-800 hover:border-primary-500/30 transition-all">
                    <h3 className="text-xl font-bold text-white mb-3">{neighborhood.name}</h3>
                    <div className="flex gap-4 mb-3">
                      <div>
                        <div className="text-sm text-gray-400">Avg Price</div>
                        <div className="text-lg font-bold text-primary-400">{neighborhood.avgPrice}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Yield</div>
                        <div className="text-lg font-bold text-emerald-400">{neighborhood.yield}</div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{neighborhood.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-2xl p-8 border border-emerald-500/20">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Why San Diego is Perfect for DSCR Loans</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Home, title: 'Military Housing Demand', description: 'Multiple military bases create consistent rental demand. Military families need housing year-round.' },
                  { icon: Waves, title: 'Vacation Rental Market', description: 'Coastal location drives strong STR income. Beach communities command premium nightly rates.' },
                  { icon: TrendingUp, title: 'Biotech Job Growth', description: 'Thriving biotech industry attracts high-income renters. Torrey Pines/Sorrento Valley expansion.' },
                  { icon: DollarSign, title: 'Strong Rental Yields', description: 'Average 5.2% yields with appreciation potential. Better cash flow than LA or SF.' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">San Diego DSCR Loan Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Basic Requirements</h3>
                  <ul className="space-y-3">
                    {['640+ credit score (720+ for best rates)', '20-25% down payment', 'Property must be investment (not primary)', 'DSCR ratio 0.75+ (1.0+ preferred)', 'Loan amounts: $75K - $3M', 'Vacation rentals eligible (STR)'].map((req, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">NOT Required</h3>
                  <ul className="space-y-3">
                    {['Tax returns or 1040s', 'W-2 forms or pay stubs', 'Employment verification', 'Personal income documentation', 'Debt-to-income calculations'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0">✗</div>
                        <span className="text-gray-400 line-through">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 border border-primary-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Finance Your San Diego Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-6">Get pre-approved in 24-48 hours. No tax returns required.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 justify-center">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/locations/california/dscr-loans" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center">
                  <Calculator className="w-5 h-5" />
                  View CA DSCR Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
