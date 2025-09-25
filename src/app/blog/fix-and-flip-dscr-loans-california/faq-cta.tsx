// FAQ and CTA sections for Fix and Flip DSCR Loans article

export const FAQSection = () => (
  <section className="py-12 bg-dark-800/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Common Questions: Fix & Flip with DSCR Loans
        </h2>

        <div className="space-y-6">
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I use a DSCR loan to purchase a flip property?
            </h3>
            <p className="text-gray-300">
              Generally no - DSCR loans require properties to be rent-ready. However, you can use DSCR 
              for light rehab "wholetail" deals needing only cosmetic work. For major renovations, 
              start with hard money then refinance to DSCR once complete.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How soon can I refinance from hard money to DSCR?
            </h3>
            <p className="text-gray-300">
              Most DSCR lenders require 6 months seasoning from purchase. Some portfolio lenders may 
              go down to 3 months with strong compensating factors. Start the application process at 
              month 4-5 to close right at the seasoning requirement.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              What if my flip doesn't cash flow enough for DSCR?
            </h3>
            <p className="text-gray-300">
              If the property won't meet the 1.0+ DSCR requirement, you have options: 1) Sell as planned, 
              2) Reduce the loan amount with additional down payment, 3) Find a no-ratio DSCR lender 
              (higher rates), or 4) Hold with hard money longer while increasing rents.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Should I flip or keep every property?
            </h3>
            <p className="text-gray-300">
              Keep properties that meet these criteria: 1) Strong cash flow (1.2+ DSCR), 2) Good 
              neighborhood with appreciation potential, 3) Minimal ongoing maintenance needs, 4) 
              You can refinance out 80%+ of invested capital. Flip the rest for immediate profits.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How many properties can I finance with DSCR loans?
            </h3>
            <p className="text-gray-300">
              Unlike conventional loans limited to 10 properties, DSCR lenders focus on each property's 
              performance. Many investors have 20+ DSCR loans. The key is maintaining strong DSCR 
              ratios and having adequate liquidity/reserves as your portfolio grows.
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
          Ready to Scale Your Flipping Business?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Whether you're flipping to sell or building a rental empire, we have the financing 
          solutions to accelerate your success. From hard money to DSCR loans, we're your 
          one-stop shop for California real estate investing.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Complete Financing Solutions</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">7 Days</div>
              <p className="text-gray-300">Hard Money Closing</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">21 Days</div>
              <p className="text-gray-300">DSCR Refinance</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">$50M+</div>
              <p className="text-gray-300">Funded to Flippers</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-dark-700/50 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Our Flipper Services Include:</h4>
            <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-300 text-left">
              <li>✓ Hard money for purchase + rehab</li>
              <li>✓ DSCR loans for flip-to-rent</li>
              <li>✓ Portfolio credit lines</li>
              <li>✓ Cash-out refinancing</li>
              <li>✓ New construction loans</li>
              <li>✓ Fix & flip consulting</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Calculate DSCR Potential
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Get Funding Strategy Call
            <span className="text-xl">→</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          California's premier fix & flip financing partner • No income docs • Asset-based lending
        </p>
      </div>
    </div>
  </section>
);
