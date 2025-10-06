// FAQ and CTA sections for DSCR Loan Rates article

export const FAQSection = () => (
  <section className="py-12 bg-dark-800/30">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Common Questions About DSCR Loan Rates
        </h2>

        <div className="space-y-6">
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How do DSCR rates compare to conventional loans?
            </h3>
            <p className="text-gray-300">
              DSCR rates are typically 0.5-1.5% higher than conventional investment property loans. However, 
              DSCR loans don't require tax returns or employment verification, making them accessible to 
              self-employed investors and those with complex income situations.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I lock my DSCR rate?
            </h3>
            <p className="text-gray-300">
              Yes, most DSCR lenders offer 30-45 day rate locks, with some extending to 60 days. Longer 
              locks may cost 0.125-0.25% in additional fees. Lock your rate once you're under contract 
              and have completed the property inspection.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Do DSCR rates vary by California region?
            </h3>
            <p className="text-gray-300">
              The rates themselves don't vary by region, but property location affects the DSCR calculation. 
              High-rent areas like San Francisco or Los Angeles may qualify for better rates due to stronger 
              DSCR ratios, while rural properties might face slightly higher rates due to limited lender options.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Should I pay points to lower my rate?
            </h3>
            <p className="text-gray-300">
              It depends on your hold period. One point (1% of loan amount) typically reduces your rate by 
              0.25%. If holding 5+ years, paying points often makes sense. For shorter holds or if you plan 
              to refinance when rates drop, skip the points.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              When will DSCR rates go down?
            </h3>
            <p className="text-gray-300">
              DSCR rates follow the 10-year Treasury yield plus a spread of 2.75-3.25%. Most analysts expect 
              rates to decrease 0.5-1% by mid-2025 as the Fed cuts rates. However, timing the market is 
              difficult—focus on cash flow rather than perfect timing.
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
          Get Your Personalized DSCR Rate Quote
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Rates change daily. Get a real-time quote based on your specific scenario from our 
          network of 50+ DSCR lenders. We'll show you the best rates you qualify for today.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Why Get Your Quote From Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">50+</div>
              <p className="text-gray-300">DSCR Lenders</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">24hr</div>
              <p className="text-gray-300">Quote Turnaround</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">$0</div>
              <p className="text-gray-300">No Cost Quotes</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-dark-700/50 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Recent Client Rates:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>760 credit, 25% down, SFR:</span>
                <span className="font-semibold text-green-400">7.125%</span>
              </div>
              <div className="flex justify-between">
                <span>720 credit, 30% down, Duplex:</span>
                <span className="font-semibold text-green-400">7.625%</span>
              </div>
              <div className="flex justify-between">
                <span>680 credit, 25% down, SFR:</span>
                <span className="font-semibold text-yellow-400">8.375%</span>
              </div>
              <div className="flex justify-between">
                <span>640 credit, 30% down, SFR:</span>
                <span className="font-semibold text-orange-400">9.250%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get My Rate Quote
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Use Rate Calculator
            <span className="text-xl">→</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          No obligation • Soft credit pull • Compare multiple lenders instantly
        </p>
      </div>
    </div>
  </section>
);
