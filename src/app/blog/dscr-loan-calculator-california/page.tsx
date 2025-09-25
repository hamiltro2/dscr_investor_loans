'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Home, DollarSign, TrendingUp, Info, ArrowRight, CheckCircle } from 'lucide-react';
import { FAQSection, CTASection } from './calculator-content';

export default function DSCRCalculatorPage() {
  const [monthlyRent, setMonthlyRent] = useState('5000');
  const [propertyPrice, setPropertyPrice] = useState('750000');
  const [downPayment, setDownPayment] = useState('20');
  const [interestRate, setInterestRate] = useState('7.5');
  const [propertyTaxes, setPropertyTaxes] = useState('625');
  const [insurance, setInsurance] = useState('150');
  const [hoa, setHoa] = useState('0');

  // Calculate loan amount
  const loanAmount = propertyPrice ? parseFloat(propertyPrice) * (1 - parseFloat(downPayment) / 100) : 0;
  
  // Calculate monthly P&I payment (30-year fixed)
  const monthlyRate = parseFloat(interestRate) / 100 / 12;
  const numPayments = 360;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  // Calculate total PITIA
  const totalPITIA = monthlyPI + parseFloat(propertyTaxes) + parseFloat(insurance) + parseFloat(hoa);
  
  // Calculate DSCR
  const dscr = parseFloat(monthlyRent) / totalPITIA;
  const dscrFormatted = isNaN(dscr) ? '0.00' : dscr.toFixed(2);

  return (
    <article className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      {/* Hero Section */}
      <section className="relative py-16 border-b border-primary-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-primary-400">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary-400">Blog</Link>
              <span>/</span>
              <span className="text-white">DSCR Calculator</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              DSCR Loan Calculator California: Free Tool + 2024 Rates
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>Updated: September 23, 2024</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>By Capital Bridge Solutions Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 mb-8">
                Calculate your Debt Service Coverage Ratio (DSCR) instantly with our free calculator. 
                Designed specifically for California real estate investors, this tool helps you determine 
                if your investment property qualifies for a DSCR loan based on rental income alone—no 
                personal income verification required.
              </p>

              <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Info className="w-6 h-6 text-primary-400" />
                  What is DSCR?
                </h2>
                <p className="text-gray-300">
                  The Debt Service Coverage Ratio (DSCR) measures a property's ability to cover its 
                  mortgage payments using rental income. A DSCR of 1.0 means the property breaks even, 
                  while 1.25 means it generates 25% more income than needed for the mortgage payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              California DSCR Loan Calculator
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-6">Property Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Rental Income
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Property Purchase Price
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={propertyPrice}
                        onChange={(e) => setPropertyPrice(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Down Payment (%)
                    </label>
                    <input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(e.target.value)}
                      className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                      placeholder="5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Property Taxes/mo
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={propertyTaxes}
                          onChange={(e) => setPropertyTaxes(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Insurance/mo
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={insurance}
                          onChange={(e) => setInsurance(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      HOA Fees/mo (if applicable)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        value={hoa}
                        onChange={(e) => setHoa(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                {/* DSCR Result */}
                <div className={`bg-gradient-to-br ${parseFloat(dscrFormatted) >= 1.25 ? 'from-green-500/20 to-green-600/20' : parseFloat(dscrFormatted) >= 1.0 ? 'from-yellow-500/20 to-yellow-600/20' : 'from-red-500/20 to-red-600/20'} rounded-xl p-8 border ${parseFloat(dscrFormatted) >= 1.25 ? 'border-green-500/30' : parseFloat(dscrFormatted) >= 1.0 ? 'border-yellow-500/30' : 'border-red-500/30'}`}>
                  <h3 className="text-2xl font-bold text-white mb-4">Your DSCR Ratio</h3>
                  <div className="text-5xl font-bold text-white mb-4">{dscrFormatted}</div>
                  <p className={`text-lg ${parseFloat(dscrFormatted) >= 1.25 ? 'text-green-400' : parseFloat(dscrFormatted) >= 1.0 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {parseFloat(dscrFormatted) >= 1.25 ? 'Excellent - Easily Qualifies!' : 
                     parseFloat(dscrFormatted) >= 1.0 ? 'Good - May Qualify with Higher Rates' : 
                     'Below Minimum - Consider Larger Down Payment'}
                  </p>
                </div>

                {/* Breakdown */}
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20">
                  <h3 className="text-xl font-bold text-white mb-6">Monthly Breakdown</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Rental Income</span>
                      <span className="text-xl font-semibold text-green-400">
                        ${parseFloat(monthlyRent).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Principal & Interest</span>
                        <span className="text-white">${monthlyPI.toFixed(0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Property Taxes</span>
                        <span className="text-white">${parseFloat(propertyTaxes).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Insurance</span>
                        <span className="text-white">${parseFloat(insurance).toLocaleString()}</span>
                      </div>
                      {parseFloat(hoa) > 0 && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">HOA Fees</span>
                          <span className="text-white">${parseFloat(hoa).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-semibold">Total PITIA</span>
                        <span className="text-xl font-semibold text-red-400">
                          ${totalPITIA.toFixed(0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-semibold">Monthly Cash Flow</span>
                        <span className={`text-xl font-semibold ${parseFloat(monthlyRent) - totalPITIA >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${(parseFloat(monthlyRent) - totalPITIA).toFixed(0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">Ready to Apply?</h3>
                  <p className="text-gray-300 mb-4">
                    Get pre-approved in 24-48 hours with no tax returns required
                  </p>
                  <Link 
                    href="/landing/dscr-loans"
                    className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Start Application
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* California Market Examples */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              DSCR Examples by California Market (2024)
            </h2>

            <div className="space-y-6">
              {/* Los Angeles Example */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Home className="w-5 h-5 text-primary-400" />
                  Los Angeles County Example
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">Property Details:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• 2BR/2BA Condo in Pasadena</li>
                      <li>• Purchase Price: $650,000</li>
                      <li>• 25% Down: $162,500</li>
                      <li>• Monthly Rent: $3,500</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">DSCR Calculation:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Monthly PITIA: $3,250</li>
                      <li>• DSCR Ratio: 1.08</li>
                      <li>• Status: <span className="text-yellow-400">Qualifies with conditions</span></li>
                      <li>• Cash Flow: +$250/month</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Orange County Example */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Home className="w-5 h-5 text-primary-400" />
                  Orange County Example
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">Property Details:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• 3BR/2BA House in Costa Mesa</li>
                      <li>• Purchase Price: $850,000</li>
                      <li>• 20% Down: $170,000</li>
                      <li>• Monthly Rent: $4,800</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">DSCR Calculation:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Monthly PITIA: $4,100</li>
                      <li>• DSCR Ratio: 1.17</li>
                      <li>• Status: <span className="text-green-400">Qualifies</span></li>
                      <li>• Cash Flow: +$700/month</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* San Diego Example */}
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Home className="w-5 h-5 text-primary-400" />
                  San Diego County Example
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">Property Details:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• 2BR/2BA Townhome in La Jolla</li>
                      <li>• Purchase Price: $750,000</li>
                      <li>• 30% Down: $225,000</li>
                      <li>• Monthly Rent: $4,200</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">DSCR Calculation:</p>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Monthly PITIA: $3,350</li>
                      <li>• DSCR Ratio: 1.25</li>
                      <li>• Status: <span className="text-green-400">Excellent - Best Rates</span></li>
                      <li>• Cash Flow: +$850/month</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding DSCR Requirements */}
      <section className="py-12 bg-dark-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              Understanding DSCR Loan Requirements in California
            </h2>

            <div className="prose prose-invert max-w-none">
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">DSCR Ratio Requirements by Lender Type</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white mb-1">DSCR 1.25+ (Excellent)</p>
                      <p className="text-gray-300">Best rates available, typically 0.25-0.5% lower than standard. Multiple lender options, faster approval process.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white mb-1">DSCR 1.0-1.24 (Standard)</p>
                      <p className="text-gray-300">Qualifies with most lenders at standard rates. May require 25% down payment or 6 months reserves.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white mb-1">DSCR 0.75-0.99 (No-Ratio)</p>
                      <p className="text-gray-300">Limited lenders available. Requires 30-40% down, higher rates (1-2% above standard), and strong credit (700+).</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">How to Improve Your DSCR</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h4 className="text-lg font-bold text-white mb-3">Increase Rental Income</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Add value through renovations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Convert to short-term rental (if allowed)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Add ADU or additional units
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Optimize rental pricing
                    </li>
                  </ul>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                  <h4 className="text-lg font-bold text-white mb-3">Reduce Debt Service</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Increase down payment (25-30%)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Shop for better insurance rates
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Consider interest-only options
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400">•</span>
                      Buy in lower tax areas
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Current DSCR Loan Rates in California (September 2024)</h3>
              
              <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20 mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 px-4 text-gray-300">DSCR Ratio</th>
                        <th className="py-3 px-4 text-gray-300">Interest Rate Range</th>
                        <th className="py-3 px-4 text-gray-300">Down Payment</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">1.25+</td>
                        <td className="py-3 px-4">6.99% - 7.49%</td>
                        <td className="py-3 px-4">20%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4">1.0 - 1.24</td>
                        <td className="py-3 px-4">7.49% - 7.99%</td>
                        <td className="py-3 px-4">25%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">0.75 - 0.99</td>
                        <td className="py-3 px-4">8.49% - 9.49%</td>
                        <td className="py-3 px-4">30-40%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  *Rates shown are for 30-year fixed loans with 720+ credit score. Actual rates vary by lender and market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <CTASection />
    </article>
  );
}
