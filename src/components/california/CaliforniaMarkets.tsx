'use client';

import { MapPin, TrendingUp, DollarSign, BarChart } from 'lucide-react';

const californiaMarkets = [
  { 
    name: 'Los Angeles',
    avgPrice: '$825,000',
    rentYield: '4.8%',
    dscr: '1.15',
    demandLevel: 'Very High',
    description: 'Diverse neighborhoods from Downtown to Venice. Strong rental demand across all property types.'
  },
  { 
    name: 'San Diego',
    avgPrice: '$795,000',
    rentYield: '5.2%',
    dscr: '1.22',
    demandLevel: 'High',
    description: 'Coastal premium with military and biotech job markets. Excellent vacation rental potential.'
  },
  { 
    name: 'San Francisco',
    avgPrice: '$1,425,000',
    rentYield: '3.9%',
    dscr: '1.08',
    demandLevel: 'Very High',
    description: 'Tech hub with highest rents in state. Appreciation-focused market with strong long-term gains.'
  },
  { 
    name: 'Orange County',
    avgPrice: '$955,000',
    rentYield: '4.5%',
    dscr: '1.18',
    demandLevel: 'Very High',
    description: 'Premium coastal and inland markets. Irvine, Newport, Anaheim offer diverse investment opportunities.'
  },
  { 
    name: 'Sacramento',
    avgPrice: '$525,000',
    rentYield: '6.1%',
    dscr: '1.35',
    demandLevel: 'High',
    description: 'State capital with strong cash flow. Lower entry prices with solid appreciation and rental demand.'
  },
  { 
    name: 'San Jose',
    avgPrice: '$1,315,000',
    rentYield: '3.7%',
    dscr: '1.05',
    demandLevel: 'High',
    description: 'Silicon Valley epicenter. Highest median incomes drive premium rents and appreciation.'
  },
  { 
    name: 'Inland Empire',
    avgPrice: '$495,000',
    rentYield: '6.8%',
    dscr: '1.42',
    demandLevel: 'Very High',
    description: 'Riverside/San Bernardino counties. Best cash flow in SoCal with strong warehouse/logistics job growth.'
  },
  { 
    name: 'Palm Springs',
    avgPrice: '$625,000',
    rentYield: '7.2%',
    dscr: '1.48',
    demandLevel: 'High (STR)',
    description: 'Premier vacation rental market. Coachella Valley offers year-round tourism and strong STR income.'
  }
];

export default function CaliforniaMarkets() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Top California Markets for DSCR Loans
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Real market data to help you identify the best California investment opportunities
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {californiaMarkets.map((market, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{market.name}</h3>
                  <span className={`text-sm font-medium ${
                    market.demandLevel.includes('Very High') ? 'text-emerald-400' : 'text-blue-400'
                  }`}>
                    {market.demandLevel} Demand
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-dark-900/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-4 h-4 text-primary-400" />
                  <span className="text-xs text-gray-400">Avg Price</span>
                </div>
                <div className="text-lg font-bold text-white">{market.avgPrice}</div>
              </div>
              
              <div className="text-center p-3 bg-dark-900/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-400">Yield</span>
                </div>
                <div className="text-lg font-bold text-emerald-400">{market.rentYield}</div>
              </div>
              
              <div className="text-center p-3 bg-dark-900/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BarChart className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">DSCR</span>
                </div>
                <div className="text-lg font-bold text-blue-400">{market.dscr}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {market.description}
            </p>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 border border-primary-500/20 mt-12">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          California Market Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">$800K+</div>
            <div className="text-gray-300">Average Property Value</div>
            <p className="text-sm text-gray-400 mt-2">Statewide median for investment properties</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">5.5%</div>
            <div className="text-gray-300">Average Rental Yield</div>
            <p className="text-sm text-gray-400 mt-2">Gross rental yield across all CA markets</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">6-8%</div>
            <div className="text-gray-300">Annual Appreciation</div>
            <p className="text-sm text-gray-400 mt-2">10-year average property value growth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
