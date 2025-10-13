import { DollarSign, FileText, TrendingUp, Shield } from 'lucide-react';

export function HowToQualifySection() {
  return (
    <div id="how-to-qualify" className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">How to Qualify as Self-Employed</h2>
      
      <div className="prose prose-invert prose-lg max-w-none mb-8">
        <p className="text-xl text-gray-300">
          Qualifying for a mortgage as a self-employed borrower is different from W-2 employees, but it's absolutely achievable. Here's what lenders look for:
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary-400" />
            1. Credit Score Requirements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-dark-900/50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">Excellent</div>
              <div className="text-xl font-bold text-emerald-400">740+</div>
              <div className="text-xs text-gray-500 mt-1">Best rates</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">Good</div>
              <div className="text-xl font-bold text-blue-400">680-739</div>
              <div className="text-xs text-gray-500 mt-1">Great options</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">Fair</div>
              <div className="text-xl font-bold text-yellow-400">620-679</div>
              <div className="text-xs text-gray-500 mt-1">Higher rates</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">Poor</div>
              <div className="text-xl font-bold text-red-400">580-619</div>
              <div className="text-xs text-gray-500 mt-1">Limited options</div>
            </div>
          </div>
          <p className="text-gray-300">
            Most self-employed loan programs require 620-640 minimum credit scores. DSCR loans typically need 640+, while bank statement loans can go as low as 620. Bad credit specialists accept scores from 580 with larger down payments.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-primary-400" />
            2. Down Payment Expectations
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-dark-900/50 rounded-lg p-4">
              <div className="text-lg font-bold text-primary-400 mb-2">10-15%</div>
              <div className="text-sm text-gray-300">Bank statement loans with excellent credit (720+)</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-4">
              <div className="text-lg font-bold text-primary-400 mb-2">20%</div>
              <div className="text-sm text-gray-300">DSCR loans, most self-employed programs</div>
            </div>
            <div className="bg-dark-900/50 rounded-lg p-4">
              <div className="text-lg font-bold text-primary-400 mb-2">25-30%</div>
              <div className="text-sm text-gray-300">Bad credit, no-doc loans, or complex situations</div>
            </div>
          </div>
          <p className="text-gray-300">
            Larger down payments improve your approval odds and reduce interest rates. Every 5% additional down payment can save you 0.25-0.5% on your rate.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary-400" />
            3. Documentation Needed
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-white mb-3">Bank Statement Loans:</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• 12-24 months personal or business bank statements</li>
                <li>• Business license or proof of self-employment</li>
                <li>• CPA letter (sometimes)</li>
                <li>• Credit report</li>
                <li>• Property appraisal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">DSCR Loans:</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Current lease agreement (if rented)</li>
                <li>• Property appraisal with rent schedule</li>
                <li>• Credit report</li>
                <li>• Property insurance</li>
                <li>• NO income documentation required</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary-400" />
            4. Income Calculation Methods
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4">
              <h4 className="font-bold text-white mb-2">Bank Statement Loans</h4>
              <p className="text-gray-300 text-sm">
                Lenders analyze 12-24 months of deposits and subtract 25-50% for business expenses. Example: $10K/month deposits × 50% = $5K qualifying income.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-white mb-2">DSCR Loans</h4>
              <p className="text-gray-300 text-sm">
                Based on property's rental income only. Monthly rent ÷ monthly payment = DSCR ratio. Need 1.0+ to qualify (some lenders accept 0.75+).
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-bold text-white mb-2">Asset-Based Loans</h4>
              <p className="text-gray-300 text-sm">
                Total liquid assets ÷ loan term = monthly income. Example: $1.2M assets ÷ 360 months = $3,333/month qualifying income.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-white mb-2">Traditional Loans</h4>
              <p className="text-gray-300 text-sm">
                Average last 2 years of tax returns. Add back depreciation and one-time expenses. Declining income is problematic.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">5. Common Challenges & Solutions</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-2xl">❌</div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Challenge: Tax write-offs reduce income</h4>
                <p className="text-gray-300 text-sm mb-2">Your tax returns show $50K but you actually make $120K.</p>
                <div className="flex gap-2 items-start">
                  <div className="text-emerald-400 text-xl">✅</div>
                  <p className="text-emerald-400 text-sm"><strong>Solution:</strong> Use bank statement loans or DSCR loans that don't require tax returns.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">❌</div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Challenge: Irregular income patterns</h4>
                <p className="text-gray-300 text-sm mb-2">Some months you make $15K, others $3K.</p>
                <div className="flex gap-2 items-start">
                  <div className="text-emerald-400 text-xl">✅</div>
                  <p className="text-emerald-400 text-sm"><strong>Solution:</strong> Bank statement loans average your deposits over 12-24 months, smoothing out fluctuations.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">❌</div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Challenge: Less than 2 years self-employed</h4>
                <p className="text-gray-300 text-sm mb-2">You started your business 14 months ago.</p>
                <div className="flex gap-2 items-start">
                  <div className="text-emerald-400 text-xl">✅</div>
                  <p className="text-emerald-400 text-sm"><strong>Solution:</strong> DSCR loans don't require employment history. Some bank statement lenders accept 12 months if you were in the same industry.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-2xl">❌</div>
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">Challenge: Multiple income streams</h4>
                <p className="text-gray-300 text-sm mb-2">You have 3 businesses, rental income, and 1099 work.</p>
                <div className="flex gap-2 items-start">
                  <div className="text-emerald-400 text-xl">✅</div>
                  <p className="text-emerald-400 text-sm"><strong>Solution:</strong> Bank statement loans capture all deposits regardless of source. Asset-based loans ignore income entirely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
