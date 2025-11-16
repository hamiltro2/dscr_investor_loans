import Link from 'next/link';
import { DollarSign, Phone, ArrowRight, Star, MessageSquare } from 'lucide-react';

export function CostComparison({ handlePhoneClick }: { handlePhoneClick: () => void }) {
  return (
    <section className="py-12 bg-dark-800/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Real-World Cost Comparison
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            See exactly how much you'll save with Capital Bridge Solutions on a typical California investment property
          </p>

          {/* Scenario 1: $600K Purchase */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">
              Scenario 1: $600K Purchase in Inland Empire, CA
            </h3>
            <div className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm">
                <div>
                  <p><strong className="text-white">Purchase Price:</strong> $600,000</p>
                  <p><strong className="text-white">Down Payment:</strong> $150,000 (25%)</p>
                  <p><strong className="text-white">Loan Amount:</strong> $450,000</p>
                </div>
                <div>
                  <p><strong className="text-white">Monthly Rent:</strong> $3,600</p>
                  <p><strong className="text-white">Monthly PITIA:</strong> $3,000</p>
                  <p><strong className="text-white">DSCR:</strong> 1.20 | <strong className="text-white">Credit:</strong> 680</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Capital Bridge */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-lg font-bold text-emerald-400">Capital Bridge</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-300 mb-6">
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span className="font-semibold text-emerald-400">6.25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-semibold text-emerald-400">$3,375</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly P&I:</span>
                    <span className="font-semibold">$2,770</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-500/30 pt-2">
                    <span>5-Year Interest:</span>
                    <span className="font-semibold">$88,575</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total 5-Year Cost:</span>
                    <span className="text-emerald-400">$91,950</span>
                  </div>
                </div>
              </div>

              {/* Kiavi */}
              <div className="bg-dark-800/50 border border-orange-500/30 rounded-xl p-6">
                <h4 className="text-lg font-bold text-orange-400 mb-4">Kiavi</h4>
                <div className="space-y-2 text-sm text-gray-300 mb-6">
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span className="font-semibold">8.00%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-semibold">$11,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly P&I:</span>
                    <span className="font-semibold">$3,303</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span>5-Year Interest:</span>
                    <span className="font-semibold">$105,555</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total 5-Year Cost:</span>
                    <span className="text-orange-400">$116,805</span>
                  </div>
                </div>
              </div>

              {/* AngelOak */}
              <div className="bg-dark-800/50 border border-blue-500/30 rounded-xl p-6">
                <h4 className="text-lg font-bold text-blue-400 mb-4">AngelOak</h4>
                <div className="space-y-2 text-sm text-gray-300 mb-6">
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span className="font-semibold">7.75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-semibold">$9,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly P&I:</span>
                    <span className="font-semibold">$3,230</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span>5-Year Interest:</span>
                    <span className="font-semibold">$102,675</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total 5-Year Cost:</span>
                    <span className="text-blue-400">$111,675</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-emerald-400 mb-2">💰 Savings with Capital Bridge Solutions:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <p><strong className="text-white">vs Kiavi:</strong> <span className="text-emerald-400 font-bold text-xl">$24,855 saved</span> over 5 years</p>
                <p><strong className="text-white">vs AngelOak:</strong> <span className="text-emerald-400 font-bold text-xl">$19,725 saved</span> over 5 years</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary-500/10 to-emerald-500/10 border border-primary-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Save $20K-$50K on Your DSCR Loan?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get a personalized quote in 24-48 hours. See exactly how much you'll save with Capital Bridge Solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19493393555"
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Q: Can I get a DSCR loan with a 640 credit score?
              </h3>
              <p className="text-gray-300">
                <strong>A:</strong> Yes! Both <strong className="text-emerald-400">Capital Bridge Solutions</strong> and AngelOak 
                accept 640+ credit scores. Kiavi requires 660 minimum. Capital Bridge offers better rates at the 640-659 credit tier 
                compared to AngelOak.
              </p>
            </div>

            <div className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Q: What's the real difference between 5.99% and 7.75% rates?
              </h3>
              <p className="text-gray-300 mb-2">
                <strong>A:</strong> On a $500K loan:
              </p>
              <ul className="text-gray-300 ml-6 space-y-1">
                <li>• <strong className="text-emerald-400">5.99%</strong> = $2,992/month</li>
                <li>• <strong>7.75%</strong> = $3,587/month</li>
                <li>• <strong className="text-emerald-400">Difference: $595/month or $7,140/year</strong></li>
              </ul>
              <p className="text-gray-300 mt-2">
                Over a typical 5-year hold period, that's <strong className="text-emerald-400">$35,700 in extra interest</strong> at 7.75%.
              </p>
            </div>

            <div className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Q: Why are Capital Bridge's rates so much lower?
              </h3>
              <p className="text-gray-300">
                <strong>A:</strong> Several factors:
              </p>
              <ul className="text-gray-300 ml-6 space-y-1">
                <li>1. <strong>California-focused</strong> = lower risk profile (CA has strong rental markets)</li>
                <li>2. <strong>Portfolio lender</strong> = lower cost of capital vs larger aggregators</li>
                <li>3. <strong>Lower overhead</strong> = savings passed to borrowers</li>
                <li>4. <strong>Competitive pricing strategy</strong> = intentionally undercut national lenders</li>
              </ul>
            </div>

            <div className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Q: Can I do a short-term rental (Airbnb) with a DSCR loan?
              </h3>
              <p className="text-gray-300">
                <strong>A:</strong>
              </p>
              <ul className="text-gray-300 ml-6 space-y-1">
                <li>• <strong className="text-emerald-400">Capital Bridge:</strong> ✅ Yes (strong in Palm Springs, Tahoe, coastal CA)</li>
                <li>• <strong>Kiavi:</strong> ✅ Yes (case by case)</li>
                <li>• <strong>AngelOak:</strong> ⚠️ Limited (generally prefer long-term rentals)</li>
              </ul>
            </div>

            <div className="bg-dark-800/50 border border-primary-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Q: How fast can I really close?
              </h3>
              <p className="text-gray-300">
                <strong>A:</strong>
              </p>
              <ul className="text-gray-300 ml-6 space-y-1">
                <li>• <strong className="text-emerald-400">Capital Bridge:</strong> 5-7 days (documented cases of 5-day closes)</li>
                <li>• <strong>Kiavi:</strong> 10-14 days (standard)</li>
                <li>• <strong>AngelOak:</strong> 10-14 days (standard)</li>
              </ul>
              <p className="text-gray-300 mt-2">
                <strong>Key:</strong> Have your docs ready (bank statements, property info, appraisal ordered immediately).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ handlePhoneClick }: { handlePhoneClick: () => void }) {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-900/20 to-emerald-900/20 border-t border-primary-500/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            The Clear Winner for California Investors
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            If you're investing in California and want the <strong className="text-emerald-400">lowest rates</strong>, 
            <strong className="text-emerald-400"> lowest points</strong>, <strong className="text-emerald-400">fastest closing</strong>, 
            and <strong className="text-emerald-400">California expertise</strong>—Capital Bridge Solutions is the clear choice.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-8 mb-8">
            <p className="text-2xl font-bold text-emerald-400 mb-2">
              Potential Savings: $20,000 - $50,000
            </p>
            <p className="text-gray-300">
              Over 5 years on a typical $500K-$750K loan
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19493393555"
              onClick={handlePhoneClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              (949) 339-3555
            </a>
          </div>

          <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <MessageSquare className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Try Our Free AI Advisor</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Not sure which lender is right for you? <strong className="text-white">Chat with Cap</strong>, our AI-powered 
              DSCR loan advisor in the ChatGPT Store for instant personalized guidance.
            </p>
            <a
              href="https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Chat with Cap AI (Free)
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              🌹 <strong className="text-white">No Investor Left Behind</strong>
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Capital Bridge Solutions | California's Premier DSCR Lender Since 2010
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
