'use client';

import { TrendingUp, DollarSign, Home, Calculator } from 'lucide-react';

export default function CaliforniaROIProjections() {
  return (
    <div className="bg-gradient-to-br from-emerald-900/20 to-dark-800 border border-emerald-500/30 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-4">5-Year California Investment Projection</h3>
        <p className="text-gray-300">
          See how DSCR financing accelerates wealth building in California real estate
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Inland Empire Example */}
        <div className="bg-dark-900/50 rounded-xl p-6 border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Inland Empire SFR</h4>
              <p className="text-sm text-gray-400">Cash Flow Strategy</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Purchase Price:</span>
              <span className="text-white font-semibold">$580,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Down Payment (20%):</span>
              <span className="text-white font-semibold">$116,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Monthly Rent:</span>
              <span className="text-white font-semibold">$3,600</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Monthly PITIA:</span>
              <span className="text-white font-semibold">$3,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">DSCR:</span>
              <span className="text-emerald-400 font-bold">1.20</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Monthly Cash Flow:</span>
              <span className="text-emerald-400 font-semibold">+$600</span>
            </div>
          </div>

          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4">
            <h5 className="font-semibold text-white mb-3">5-Year Projections:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Cash Flow (60 mo):</span>
                <span className="text-emerald-400 font-semibold">$36,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Appreciation (6% avg):</span>
                <span className="text-emerald-400 font-semibold">$196,800</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Principal Paydown:</span>
                <span className="text-emerald-400 font-semibold">$42,000</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-emerald-500/30 font-bold">
                <span className="text-white">Total Equity Gained:</span>
                <span className="text-emerald-400 text-lg">$274,800</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-white font-semibold">ROI on $116K Down:</span>
                <span className="text-emerald-400 text-xl font-bold">237%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bay Area Example */}
        <div className="bg-dark-900/50 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Bay Area Condo</h4>
              <p className="text-sm text-gray-400">Appreciation Strategy</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Purchase Price:</span>
              <span className="text-white font-semibold">$950,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Down Payment (25%):</span>
              <span className="text-white font-semibold">$237,500</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Monthly Rent:</span>
              <span className="text-white font-semibold">$4,200</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Monthly PITIA:</span>
              <span className="text-white font-semibold">$4,000</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">DSCR:</span>
              <span className="text-blue-400 font-bold">1.05</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-dark-800">
              <span className="text-gray-400">Monthly Cash Flow:</span>
              <span className="text-blue-400 font-semibold">+$200</span>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h5 className="font-semibold text-white mb-3">5-Year Projections:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Cash Flow (60 mo):</span>
                <span className="text-blue-400 font-semibold">$12,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Appreciation (8% avg):</span>
                <span className="text-blue-400 font-semibold">$419,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Principal Paydown:</span>
                <span className="text-blue-400 font-semibold">$52,000</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-500/30 font-bold">
                <span className="text-white">Total Equity Gained:</span>
                <span className="text-blue-400 text-lg">$483,000</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-white font-semibold">ROI on $237.5K Down:</span>
                <span className="text-blue-400 text-xl font-bold">203%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="mt-8 bg-primary-900/20 border border-primary-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calculator className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h5 className="text-xl font-bold text-white mb-3">The DSCR Advantage</h5>
            <p className="text-gray-300 mb-3">
              Both scenarios show <strong className="text-white">200%+ ROI in 5 years</strong>, but notice the difference in strategy:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong className="text-white">Inland Empire:</strong> Higher cash flow ($600/mo) with solid appreciation. Perfect for investors who want immediate returns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Bay Area:</strong> Lower cash flow ($200/mo) but exceptional appreciation ($419K). Ideal for long-term wealth building.</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-primary-500/20">
              <p className="text-primary-300">
                <strong className="text-white">With DSCR financing,</strong> you can pursue either strategy (or both!) without qualifying based on your personal income. Your property's performance is all that matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        *Projections based on historical California market averages and assume 7.0% interest rate, 30-year loan, 3% annual rent increases, and conservative expense estimates. Individual results will vary. Past performance does not guarantee future results.
      </p>
    </div>
  );
}
