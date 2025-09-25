// Challenges, FAQ and CTA sections for How to Qualify article

export const ChallengesSection = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Common Challenges & Solutions
        </h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl p-6 border border-red-500/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Challenge: DSCR Below 1.0</h3>
                <p className="text-gray-300 mb-3">Property doesn't cash flow enough to qualify.</p>
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <p className="font-semibold text-green-400 mb-2">Solutions:</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Increase down payment to lower PITIA</li>
                    <li>• Find no-ratio DSCR lender (higher rates)</li>
                    <li>• Negotiate lower purchase price</li>
                    <li>• Look for properties with higher rents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl p-6 border border-orange-500/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Challenge: Low Credit Score</h3>
                <p className="text-gray-300 mb-3">Credit score below 660 limiting options.</p>
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <p className="font-semibold text-green-400 mb-2">Solutions:</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Find 620 minimum lenders (we know several)</li>
                    <li>• Rapid rescore for quick improvements</li>
                    <li>• Larger down payment to offset risk</li>
                    <li>• Co-borrower with better credit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Challenge: Complex Ownership</h3>
                <p className="text-gray-300 mb-3">Multiple LLCs, foreign national, or trust ownership.</p>
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <p className="font-semibold text-green-400 mb-2">Solutions:</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Work with entity-friendly lenders</li>
                    <li>• Provide clear ownership structure</li>
                    <li>• Foreign national programs available</li>
                    <li>• Trust docs must allow borrowing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const FAQSection = () => (
  <section className="py-12 bg-dark-800/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I qualify for a DSCR loan as a first-time investor?
            </h3>
            <p className="text-gray-300">
              Yes! DSCR loans don't require prior landlord experience. The property's income potential is 
              what matters. Many first-time investors use DSCR loans because they can't qualify for 
              traditional financing due to self-employment or complex income.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How is rental income verified for vacant properties?
            </h3>
            <p className="text-gray-300">
              For vacant properties, lenders use a "market rent analysis" from the appraiser. They'll 
              compare similar rentals in the area to determine fair market rent. Some lenders may 
              reduce this by 10-25% for conservative underwriting.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I use gifted funds for the down payment?
            </h3>
            <p className="text-gray-300">
              Most DSCR lenders accept gift funds from family members for down payment and closing costs. 
              You'll need a gift letter stating the funds don't need to be repaid. The funds should be 
              seasoned in your account for at least 30 days before closing.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              What if I have a recent bankruptcy or foreclosure?
            </h3>
            <p className="text-gray-300">
              Most DSCR lenders require 2-4 years seasoning after major credit events. Chapter 7 bankruptcy: 
              4 years. Chapter 13: 2 years after discharge. Foreclosure: 3-4 years. Short sale: 2-3 years. 
              Some portfolio lenders may be more flexible with strong compensating factors.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How many DSCR loans can I have?
            </h3>
            <p className="text-gray-300">
              Unlike conventional loans limited to 10 properties, there's no set limit on DSCR loans. 
              Some investors have 20+ DSCR loans. The key is maintaining strong DSCR ratios on each 
              property and having adequate reserves as your portfolio grows.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Start Your DSCR Loan Journey?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          We've helped hundreds of California investors qualify for DSCR loans, including many 
          who were told "no" elsewhere. Our expertise and lender relationships make the difference.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Why Choose Capital Bridge Solutions?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">620</div>
              <p className="text-gray-300">Minimum Credit Score</p>
              <p className="text-sm text-gray-400 mt-1">Lower than most lenders</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">24hrs</div>
              <p className="text-gray-300">Pre-Approval Time</p>
              <p className="text-sm text-gray-400 mt-1">Know your buying power fast</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
              <p className="text-gray-300">DSCR Lenders</p>
              <p className="text-sm text-gray-400 mt-1">We find the best fit for you</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-dark-700/50 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Our Process is Simple:</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-primary-400 font-bold">1.</span>
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-400 font-bold">2.</span>
                <span>Get pre-qualified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-400 font-bold">3.</span>
                <span>Close in 21 days</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Pre-Qualified Now
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Calculate Your DSCR
            <span className="text-xl">→</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          No tax returns required • Self-employed friendly • Investment properties only
        </p>
      </div>
    </div>
  </section>
);

import { AlertCircle } from 'lucide-react';
