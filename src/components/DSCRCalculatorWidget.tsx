'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function DSCRCalculatorWidget() {
  const [rent, setRent] = useState('4000');
  const [pitia, setPitia] = useState('3000');
  const [dscr, setDscr] = useState('1.33');

  const calculateDSCR = (rentValue: string, pitiaValue: string) => {
    const r = parseFloat(rentValue) || 0;
    const p = parseFloat(pitiaValue) || 0;
    if (p > 0) {
      const result = (r / p).toFixed(2);
      setDscr(result);
    } else {
      setDscr('0.00');
    }
  };

  const handleRentChange = (value: string) => {
    setRent(value);
    calculateDSCR(value, pitia);
  };

  const handlePitiaChange = (value: string) => {
    setPitia(value);
    calculateDSCR(rent, value);
  };

  const dscrValue = parseFloat(dscr);
  const cashFlow = parseFloat(rent) - parseFloat(pitia);

  return (
    <div className="bg-gradient-to-br from-primary-900/20 to-dark-800 border border-primary-500/30 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-primary-400" />
        <h3 className="text-2xl font-bold text-white">Quick DSCR Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Monthly Rent
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={rent}
              onChange={(e) => handleRentChange(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
              placeholder="4000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Monthly PITIA (Principal, Interest, Taxes, Insurance, Association)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={pitia}
              onChange={(e) => handlePitiaChange(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-dark-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
              placeholder="3000"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-primary-500/20">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-400 mb-2">Your DSCR Ratio</div>
            <div className={`text-5xl font-bold ${dscrValue >= 1.0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {dscr}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Monthly Cash Flow:</span>
            <span className={`font-semibold ${cashFlow >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${cashFlow.toLocaleString()}/mo
            </span>
          </div>

          <div className="mt-4 p-4 bg-dark-900/50 rounded-lg">
            <div className="text-xs text-gray-400">
              {dscrValue >= 1.25 && '✅ Excellent! Strong positive cash flow - Best rates available'}
              {dscrValue >= 1.0 && dscrValue < 1.25 && '✅ Good! Positive cash flow - Qualifies for most programs'}
              {dscrValue >= 0.75 && dscrValue < 1.0 && '⚠️ Below breakeven - May require higher down payment or stronger reserves'}
              {dscrValue < 0.75 && '❌ Needs improvement - Consider larger down payment or higher rents'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
