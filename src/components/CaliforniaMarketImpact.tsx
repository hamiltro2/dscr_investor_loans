'use client';

import { TrendingUp, Home, DollarSign, Users, Building2, MapPin, BarChart, Percent } from 'lucide-react';

export default function CaliforniaMarketImpact() {
  const marketStats = [
    {
      icon: Home,
      label: 'Median Home Price',
      value: '$800K+',
      detail: 'Statewide average 2026',
      trend: '+6.2% YoY'
    },
    {
      icon: DollarSign,
      label: 'Avg Monthly Rent',
      value: '$2,800',
      detail: 'Single-family median',
      trend: '+4.8% YoY'
    },
    {
      icon: Percent,
      label: 'Rental Yield',
      value: '4.2-8.5%',
      detail: 'Varies by market',
      trend: 'Inland higher'
    },
    {
      icon: Users,
      label: 'Renters',
      value: '45%',
      detail: 'Of CA households',
      trend: '17M people'
    }
  ];

  const cityData = [
    {
      city: 'Los Angeles',
      medianPrice: '$925K',
      medianRent: '$3,200',
      dscr: '1.10',
      yield: '0.42%',
      market: 'Appreciation play'
    },
    {
      city: 'San Diego',
      medianPrice: '$875K',
      medianRent: '$3,100',
      dscr: '1.12',
      yield: '0.45%',
      market: 'Balanced'
    },
    {
      city: 'Bay Area',
      medianPrice: '$1.4M',
      medianRent: '$4,500',
      dscr: '1.05',
      yield: '0.38%',
      market: 'Long-term appreciation'
    },
    {
      city: 'Sacramento',
      medianPrice: '$520K',
      medianRent: '$2,400',
      dscr: '1.35',
      yield: '0.55%',
      market: 'Cash flow + growth'
    },
    {
      city: 'Inland Empire',
      medianPrice: '$580K',
      medianRent: '$2,600',
      dscr: '1.38',
      yield: '0.54%',
      market: 'Highest cash flow'
    },
    {
      city: 'Orange County',
      medianPrice: '$1.1M',
      medianRent: '$3,800',
      dscr: '1.08',
      yield: '0.41%',
      market: 'Premium market'
    },
    {
      city: 'Fresno',
      medianPrice: '$385K',
      medianRent: '$1,850',
      dscr: '1.42',
      yield: '0.58%',
      market: 'Value + yield'
    },
    {
      city: 'San Jose',
      medianPrice: '$1.5M',
      medianRent: '$4,800',
      dscr: '1.02',
      yield: '0.38%',
      market: 'Tech hub appreciation'
    }
  ];

  const economicFactors = [
    {
      icon: Building2,
      title: '$3.9 Trillion GDP',
      description: '5th largest economy globally (if CA were a country)',
      impact: 'Diverse, resilient job market supports rental demand'
    },
    {
      icon: Users,
      title: '39.5 Million Residents',
      description: 'Most populous U.S. state with continuing migration',
      impact: 'Sustained housing demand across all price points'
    },
    {
      icon: TrendingUp,
      title: '6-8% Annual Appreciation',
      description: 'Historical average over past decade',
      impact: 'Leverage amplifies equity growth for refinancing'
    },
    {
      icon: MapPin,
      title: '8+ Major Metro Markets',
      description: 'LA, SF, SD, Sacramento, San Jose, OC, Fresno, Long Beach',
      impact: 'Portfolio diversification within one state'
    },
    {
      icon: BarChart,
      title: 'Sub-3% Vacancy Rates',
      description: 'In quality neighborhoods across top markets',
      impact: 'Consistent rental income with minimal turnover'
    },
    {
      icon: DollarSign,
      title: '$75K+ Median Income',
      description: 'Higher than national average ($70K)',
      impact: 'Tenants can afford premium rents'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Market Statistics Overview */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">California Real Estate Market Impact</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Data-driven insights showing why California is the #1 state for DSCR loan investments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {marketStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-primary-900/20 to-dark-800 border border-primary-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.detail}</div>
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-900/10 border border-primary-500/20 rounded-xl p-6">
          <p className="text-gray-300 text-center">
            <strong className="text-white">Why This Matters:</strong> California's high property values combined with premium rents create strong DSCR ratios (1.0-1.4+), making it easier to qualify for investment loans without personal income verification. Even expensive coastal markets often produce 1.05-1.15 DSCR due to robust rental demand.
          </p>
        </div>
      </div>

      {/* City-by-City Breakdown */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">City-by-City Market Analysis</h2>
        <p className="text-gray-300 mb-8">
          California offers diverse investment strategies across 8+ major markets. Use this data to identify which markets align with your investment goals—cash flow, appreciation, or both.
        </p>

        <div className="bg-dark-900/50 border border-primary-500/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-900/20 border-b border-primary-500/30">
                  <th className="text-left p-4 text-white font-bold">Market</th>
                  <th className="text-left p-4 text-white font-bold">Median Price</th>
                  <th className="text-left p-4 text-white font-bold">Median Rent</th>
                  <th className="text-left p-4 text-white font-bold">Avg DSCR</th>
                  <th className="text-left p-4 text-white font-bold">Rent Yield</th>
                  <th className="text-left p-4 text-white font-bold">Strategy</th>
                </tr>
              </thead>
              <tbody>
                {cityData.map((city, index) => (
                  <tr key={index} className={`border-b border-dark-800 ${index % 2 === 0 ? 'bg-dark-900/30' : 'bg-dark-900/50'}`}>
                    <td className="p-4">
                      <div className="font-semibold text-white">{city.city}</div>
                    </td>
                    <td className="p-4 text-gray-300">{city.medianPrice}</td>
                    <td className="p-4 text-gray-300">{city.medianRent}</td>
                    <td className="p-4">
                      <span className={`font-semibold ${parseFloat(city.dscr) >= 1.25 ? 'text-emerald-400' : parseFloat(city.dscr) >= 1.0 ? 'text-primary-400' : 'text-yellow-400'}`}>
                        {city.dscr}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{city.yield}</td>
                    <td className="p-4">
                      <span className="text-sm px-3 py-1 bg-primary-500/10 text-primary-300 rounded-full">
                        {city.market}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4">
            <div className="font-semibold text-emerald-400 mb-2">🎯 Cash Flow Markets</div>
            <p className="text-sm text-gray-400">DSCR &gt; 1.30: Inland Empire, Fresno, Sacramento</p>
          </div>
          <div className="bg-primary-900/20 border border-primary-500/30 rounded-lg p-4">
            <div className="font-semibold text-primary-400 mb-2">⚖️ Balanced Markets</div>
            <p className="text-sm text-gray-400">DSCR 1.10-1.30: San Diego, LA, Orange County</p>
          </div>
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="font-semibold text-blue-400 mb-2">📈 Appreciation Markets</div>
            <p className="text-sm text-gray-400">DSCR 1.0-1.10: Bay Area, San Jose</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          *Based on 3BR single-family homes with 20% down payment at 7.0% interest rate. Actual DSCR varies by specific property, rent, and loan terms. Data represents 2026 market averages.
        </p>
      </div>

      {/* Economic Impact Factors */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Economic Factors Driving California Real Estate</h2>
        <p className="text-gray-300 mb-8">
          California's economy isn't just strong—it's one of the most resilient in the world. These macro factors create sustained demand for rental properties across all market cycles.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {economicFactors.map((factor, index) => (
            <div key={index} className="bg-dark-900/50 border border-dark-800 hover:border-primary-500/30 rounded-xl p-6 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center mb-4">
                <factor.icon className="w-7 h-7 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{factor.title}</h3>
              <p className="text-gray-400 mb-3">{factor.description}</p>
              <div className="pt-3 border-t border-dark-800">
                <p className="text-sm text-primary-300">
                  <strong className="text-white">Impact:</strong> {factor.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Regulations & Investor Considerations */}
      <div className="bg-gradient-to-br from-yellow-900/10 to-dark-800 border border-yellow-500/20 rounded-xl p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <BarChart className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">California Investor Considerations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Advantages:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Strong tenant protections = stable, long-term tenants</li>
                  <li>✓ Prop 13 tax caps = predictable property tax growth</li>
                  <li>✓ High barrier to entry = less competition from new supply</li>
                  <li>✓ Tech/entertainment/agriculture = diverse employment</li>
                  <li>✓ Premium rents support strong debt coverage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Challenges:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>⚠ Higher entry costs (20-25% down typical)</li>
                  <li>⚠ Complex landlord-tenant laws (use property manager)</li>
                  <li>⚠ Some cities have rent control (research local laws)</li>
                  <li>⚠ STR regulations vary by city (check local ordinances)</li>
                  <li>⚠ Insurance costs rising (factor into DSCR calculation)</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-yellow-500/20">
              <p className="text-gray-300">
                <strong className="text-white">Bottom Line:</strong> California's challenges are real but manageable for informed investors. The state's economic fundamentals, rental demand, and long-term appreciation make it one of the best markets for building generational wealth through real estate—especially with DSCR financing that focuses on property performance, not your W-2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
