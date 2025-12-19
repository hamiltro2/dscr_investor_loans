'use client';

import Link from 'next/link';
import { MapPin, Phone, Calculator, TrendingUp, Building2, CheckCircle, ArrowRight, DollarSign, Home, Users, Percent, Clock } from 'lucide-react';

export default function InlandEmpireDSCRPage() {
  const handlePhoneClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  const neighborhoods = [
    {
      name: 'Riverside',
      type: 'City Center',
      medianPrice: '$550K',
      medianRent: '$2,500',
      dscr: '1.35',
      yield: '0.55%',
      highlight: 'University demand'
    },
    {
      name: 'Corona',
      type: 'Family Suburb',
      medianPrice: '$680K',
      medianRent: '$3,000',
      dscr: '1.30',
      yield: '0.53%',
      highlight: 'Premium rentals'
    },
    {
      name: 'Moreno Valley',
      type: 'Value Market',
      medianPrice: '$480K',
      medianRent: '$2,300',
      dscr: '1.42',
      yield: '0.58%',
      highlight: 'Highest cash flow'
    },
    {
      name: 'Temecula',
      type: 'Wine Country',
      medianPrice: '$720K',
      medianRent: '$3,200',
      dscr: '1.28',
      yield: '0.53%',
      highlight: 'Strong appreciation'
    },
    {
      name: 'Rancho Cucamonga',
      type: 'Upper Middle',
      medianPrice: '$750K',
      medianRent: '$3,400',
      dscr: '1.32',
      yield: '0.54%',
      highlight: 'Low vacancy'
    },
    {
      name: 'San Bernardino',
      type: 'Value Play',
      medianPrice: '$420K',
      medianRent: '$2,100',
      dscr: '1.48',
      yield: '0.60%',
      highlight: 'Deep value'
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Highest Cash Flow in CA',
      description: 'DSCR ratios of 1.30-1.48 mean strong positive cash flow from day one'
    },
    {
      icon: TrendingUp,
      title: '5-7% Annual Appreciation',
      description: 'Benefiting from LA/OC spillover as investors seek affordability'
    },
    {
      icon: Users,
      title: '4.7M Population',
      description: 'Massive rental demand from families and workers priced out of LA/OC'
    },
    {
      icon: Building2,
      title: 'Diverse Property Types',
      description: 'SFRs, duplexes, condos, townhomes - all with strong rental demand'
    },
    {
      icon: Percent,
      title: 'Entry Prices $420K-$750K',
      description: 'Lower down payments (20% = $84K-$150K) compared to coastal markets'
    },
    {
      icon: Home,
      title: 'Sub-3% Vacancy',
      description: 'Consistent tenant demand keeps properties rented year-round'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Inland Empire DSCR Loans - Riverside & San Bernardino',
            description: 'DSCR loans for Inland Empire investment properties. Highest cash flow in California. Finance properties in Riverside, Corona, Temecula, Rancho Cucamonga.',
            url: 'https://www.capitalbridgesolutions.com/locations/california/inland-empire',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.capitalbridgesolutions.com' },
                { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://www.capitalbridgesolutions.com/locations' },
                { '@type': 'ListItem', position: 3, name: 'California', item: 'https://www.capitalbridgesolutions.com/locations/california' },
                { '@type': 'ListItem', position: 4, name: 'Inland Empire' }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden border-b border-primary-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
                <span>/</span>
                <Link href="/locations/california" className="hover:text-primary-400 transition-colors">California</Link>
                <span>/</span>
                <span className="text-primary-400">Inland Empire</span>
              </div>

              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium text-sm uppercase tracking-wider">Riverside & San Bernardino Counties</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80">
                  Inland Empire DSCR Loans
                </h1>

                <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
                  California's #1 Cash Flow Market for Real Estate Investors
                </p>

                <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                  DSCR ratios of <span className="text-emerald-400 font-semibold">1.30-1.48</span> • Entry from <span className="text-emerald-400 font-semibold">$420K</span> • Rates from <span className="text-primary-400 font-semibold">5.5%</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/get-started" className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                    Get Inland Empire Rate Quote
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

        {/* Market Stats */}
        <section className="py-12 bg-dark-900/50 border-b border-dark-800">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$580K</div>
                <div className="text-gray-400 text-sm">Avg Property Price</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">1.38</div>
                <div className="text-gray-400 text-sm">Avg DSCR Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">$2,600</div>
                <div className="text-gray-400 text-sm">Median Rent (SFR)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">0.54%</div>
                <div className="text-gray-400 text-sm">Monthly Yield</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Overview */}
              <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Why the Inland Empire is California's Best DSCR Market</h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    The Inland Empire (Riverside and San Bernardino Counties) offers <strong className="text-emerald-400">the highest cash flow returns in California</strong>. With DSCR ratios consistently above 1.30, investors can achieve positive cash flow from day one while building long-term equity through steady 5-7% annual appreciation.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    <strong className="text-white">What makes the IE special:</strong> As LA and Orange County prices soar past $1M, families and investors flock to the Inland Empire for affordability. This creates exceptional rental demand—4.7 million residents need housing, and homeownership remains out of reach for many, keeping vacancy rates below 3%.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    DSCR loans are <strong className="text-primary-400">perfect for the Inland Empire</strong> because strong rent-to-price ratios mean your property income easily covers the mortgage. No need to prove personal income—the numbers speak for themselves.
                  </p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Inland Empire Investment Advantages</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="bg-dark-900/50 border border-dark-800 hover:border-emerald-500/30 rounded-xl p-6 transition-all duration-300">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
                        <benefit.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Neighborhoods */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Top Investment Neighborhoods</h2>
                <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                  The Inland Empire offers diverse submarkets from value plays to premium suburbs. All share one thing: <strong className="text-emerald-400">strong cash flow potential</strong>.
                </p>

                <div className="bg-dark-900/50 border border-primary-500/20 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-emerald-900/20 border-b border-emerald-500/30">
                          <th className="text-left p-4 text-white font-bold">Neighborhood</th>
                          <th className="text-left p-4 text-white font-bold">Type</th>
                          <th className="text-left p-4 text-white font-bold">Median Price</th>
                          <th className="text-left p-4 text-white font-bold">Median Rent</th>
                          <th className="text-left p-4 text-white font-bold">DSCR</th>
                          <th className="text-left p-4 text-white font-bold">Yield</th>
                          <th className="text-left p-4 text-white font-bold">Highlight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {neighborhoods.map((hood, index) => (
                          <tr key={index} className={`border-b border-dark-800 ${index % 2 === 0 ? 'bg-dark-900/30' : 'bg-dark-900/50'}`}>
                            <td className="p-4 font-semibold text-white">{hood.name}</td>
                            <td className="p-4 text-gray-300">{hood.type}</td>
                            <td className="p-4 text-gray-300">{hood.medianPrice}</td>
                            <td className="p-4 text-gray-300">{hood.medianRent}</td>
                            <td className="p-4">
                              <span className="font-semibold text-emerald-400">{hood.dscr}</span>
                            </td>
                            <td className="p-4 text-gray-300">{hood.yield}</td>
                            <td className="p-4">
                              <span className="text-sm px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-full">
                                {hood.highlight}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  *Data based on 3BR single-family homes with 20% down at 7.0% interest. Updated Q1 2025.
                </p>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-br from-emerald-900/20 to-dark-800 border border-emerald-500/30 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Real Inland Empire Deal Example</h2>
                  <p className="text-gray-300">See actual numbers from a recent Corona investment property</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-dark-900/50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Property Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white font-semibold">Corona, CA</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Property Type:</span>
                        <span className="text-white font-semibold">3BR/2BA SFR</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Purchase Price:</span>
                        <span className="text-white font-semibold">$680,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Down Payment (20%):</span>
                        <span className="text-white font-semibold">$136,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Loan Amount:</span>
                        <span className="text-white font-semibold">$544,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Interest Rate:</span>
                        <span className="text-white font-semibold">7.25%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-900/50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Monthly Cash Flow</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-emerald-500/20">
                        <span className="text-gray-400">Monthly Rent:</span>
                        <span className="text-emerald-400 font-semibold">$3,800</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">P&I Payment:</span>
                        <span className="text-gray-300">($3,710)</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Property Tax:</span>
                        <span className="text-gray-300">($708)</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">Insurance:</span>
                        <span className="text-gray-300">($150)</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-dark-800">
                        <span className="text-gray-400">HOA:</span>
                        <span className="text-gray-300">($0)</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t-2 border-emerald-500/30">
                        <span className="text-white font-bold">Monthly Cash Flow:</span>
                        <span className="text-emerald-400 font-bold text-xl">+$232</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-white font-bold">DSCR Ratio:</span>
                        <span className="text-emerald-400 font-bold text-2xl">1.05</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4">
                  <p className="text-gray-300 text-center">
                    <strong className="text-white">Approved with DSCR loan</strong> • No tax returns required • Closed in 14 days • Investor now owns cash-flowing asset building $3K+/month in equity
                  </p>
                </div>
              </div>

              {/* Why DSCR for IE */}
              <div className="bg-gradient-to-br from-primary-900/20 to-dark-800 border border-primary-500/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Why DSCR Loans Dominate the Inland Empire</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">✓ Perfect Match for IE Economics</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Strong rent-to-price ratios = easy DSCR qualification</li>
                      <li>• Lower prices = smaller down payments ($84K-$150K)</li>
                      <li>• High tenant demand = minimal vacancy risk</li>
                      <li>• Multiple properties easier to scale</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400 mb-4">✓ Solves Common Investor Challenges</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• No income docs = fast approvals (24-48 hours)</li>
                      <li>• LLC ownership allowed = liability protection</li>
                      <li>• No DTI limits = finance unlimited properties</li>
                      <li>• Self-employed friendly = no tax return hassles</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-emerald-900/20 to-primary-900/20 border border-emerald-500/30 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest in the Inland Empire?</h2>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                  Get pre-approved for DSCR financing and start building your cash-flowing IE portfolio today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/get-started"
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 justify-center"
                  >
                    Start Your Application
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+19493393555"
                    onClick={handlePhoneClick}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 inline-flex items-center gap-2 justify-center"
                  >
                    <Phone className="w-5 h-5" />
                    Talk to IE Specialist
                  </a>
                </div>
                <p className="mt-6 text-sm text-gray-400">
                  Serving Riverside • Corona • Moreno Valley • Temecula • Rancho Cucamonga • San Bernardino • All IE Cities
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
