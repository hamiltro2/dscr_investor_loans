'use client';

import Link from 'next/link';
import { MapPin, Phone, Calculator, TrendingUp, Building2, CheckCircle, ArrowRight, DollarSign, Home, Target } from 'lucide-react';

export default function SacramentoDSCRPage() {
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
              <span className="text-primary-400">Sacramento</span>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">Sacramento County</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80">
                Sacramento DSCR Loans
              </h1>
              
              <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                California's Capital - Best Cash Flow Investment Market
              </p>
              
              <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                Lower prices, higher yields, strong appreciation. <span className="text-primary-400 font-semibold">Rates from 5.99%</span> • Close in 10-15 days
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                  Get Free Rate Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+19493393555" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2")}>
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
              <div className="text-4xl font-bold text-primary-400 mb-2">$525K</div>
              <div className="text-gray-400 text-sm">Avg Property Price</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">6.1%</div>
              <div className="text-gray-400 text-sm">Rental Yield</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">1.35</div>
              <div className="text-gray-400 text-sm">Avg DSCR Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">$2,200</div>
              <div className="text-gray-400 text-sm">Median Rent</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Sacramento DSCR Loans: Market Overview</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sacramento offers California's <strong className="text-white">best cash flow opportunities</strong> with property values averaging just $525K—nearly half of LA or SF. As the <strong className="text-white">state capital</strong>, Sacramento provides stable government employment, growing tech sector, and consistent rental demand from 2.4 million metro residents.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  DSCR loans are perfect for Sacramento investors because the lower property prices combined with solid rents ($2,200 median) produce <strong className="text-primary-400">excellent DSCR ratios (1.35 average)</strong>. Whether you're targeting <strong className="text-primary-400">Midtown multi-families</strong>, <strong className="text-primary-400">Natomas single-families</strong>, or <strong className="text-primary-400">Elk Grove new construction</strong>, Sacramento delivers cash flow from day one.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Top Investment Neighborhoods in Sacramento</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Midtown', avgPrice: '$585K', yield: '5.8%', description: 'Urban core, walkable, young professionals, strong appreciation' },
                  { name: 'Natomas', avgPrice: '$495K', yield: '6.3%', description: 'Newer homes, families, excellent cash flow, near airport' },
                  { name: 'Elk Grove', avgPrice: '$525K', yield: '6.0%', description: 'Master-planned, good schools, family rentals, stable market' },
                  { name: 'Land Park', avgPrice: '$625K', yield: '5.5%', description: 'Established neighborhood, parks, premium rentals' },
                  { name: 'Pocket-Greenhaven', avgPrice: '$545K', yield: '5.9%', description: 'Riverside location, quiet, family-oriented, stable' },
                  { name: 'Rancho Cordova', avgPrice: '$465K', yield: '6.5%', description: 'Best cash flow, job growth, affordable entry point' }
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
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Why Sacramento is Perfect for DSCR Loans</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: 'Best Cash Flow in CA', description: 'Average 6.1% yields—highest in major CA markets. Lower prices mean better DSCR ratios and positive cash flow from day one.' },
                  { icon: TrendingUp, title: 'Strong Appreciation', description: 'Sacramento has appreciated 8-10% annually over the past 5 years. Bay Area exodus drives demand and price growth.' },
                  { icon: Building2, title: 'Stable Government Jobs', description: 'State capital provides recession-resistant employment. 250K+ government workers create consistent rental demand.' },
                  { icon: DollarSign, title: 'Lower Entry Costs', description: 'At $525K average, Sacramento allows portfolio scaling. Buy 2 Sacramento properties for the price of 1 SF property.' }
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
              <h2 className="text-3xl font-bold text-white mb-6">Sacramento DSCR Loan Requirements</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Basic Requirements</h3>
                  <ul className="space-y-3">
                    {['640+ credit score (720+ for best rates)', '20-25% down payment', 'Property must be investment (not primary)', 'DSCR ratio 0.75+ (1.0+ preferred)', 'Loan amounts: $75K - $3M', 'Excellent DSCR ratios typical in Sacramento'].map((req, i) => (
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

            <div className="bg-gradient-to-r from-primary-500/10 to-emerald-500/10 rounded-2xl p-8 border border-primary-500/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Cash Flow Champion</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Sacramento: The Cash Flow King</h3>
                <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                  Sacramento consistently delivers the best cash flow in California. With average DSCR ratios of 1.35 and yields exceeding 6%, Sacramento properties often cash flow $500-800/month from day one. Perfect for building passive income and scaling your portfolio quickly.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">$500+</div>
                    <div className="text-sm text-gray-400">Avg Monthly Cash Flow</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">1.35</div>
                    <div className="text-sm text-gray-400">Avg DSCR Ratio</div>
                  </div>
                  <div className="bg-dark-900/50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">6.1%</div>
                    <div className="text-sm text-gray-400">Avg Rental Yield</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 border border-primary-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Finance Your Sacramento Investment Property?</h2>
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
