// FAQ and CTA sections for No Tax Return Loans article

export const FAQSection = () => (
  <div className="space-y-6">
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Are no tax return loans legal in California?
      </h3>
      <p className="text-gray-300">
        Yes, these are completely legal loan products offered by licensed lenders. They're 
        simply alternative documentation loans that use different methods to verify your 
        ability to repay.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        How much more expensive are no tax return loans?
      </h3>
      <p className="text-gray-300">
        It varies by loan type. DSCR loans are typically only 0.5-1% higher than conventional 
        rates. Bank statement loans may be 1-1.5% higher. Hard money loans are significantly 
        higher but are meant for short-term use.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I refinance a no tax return loan later?
      </h3>
      <p className="text-gray-300">
        Absolutely. Many investors use these loans to acquire properties, then refinance into 
        conventional loans once they can show the rental income on tax returns. Some keep the 
        no tax return loans long-term for the flexibility.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Do I need to be self-employed to qualify?
      </h3>
      <p className="text-gray-300">
        No. While many borrowers are self-employed, W-2 employees also use these loans for 
        privacy, speed, or because their tax returns don't reflect bonuses, new employment, 
        or investment income.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        What's the minimum credit score needed?
      </h3>
      <p className="text-gray-300">
        It depends on the loan type. DSCR loans can go as low as 620. Bank statement loans 
        typically require 660+. Asset depletion loans need 680+. Hard money loans may not 
        check credit at all.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I use these loans for Airbnb properties?
      </h3>
      <p className="text-gray-300">
        Yes! DSCR loans are particularly popular for short-term rentals. Lenders will use 
        either 12 months of Airbnb income history or comparable market rents to determine 
        the property's income potential.
      </p>
    </div>
  </div>
);

export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Invest Without Tax Returns?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of California investors who've discovered the freedom of no tax return 
          investment property loans. Get pre-approved in 24 hours and close in as little as 2 weeks.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Our No Tax Return Loan Options</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-400 mb-1">DSCR</div>
              <p className="text-sm text-gray-300">From 6.99%</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-1">Bank Statement</div>
              <p className="text-sm text-gray-300">From 7.49%</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-1">Asset Based</div>
              <p className="text-sm text-gray-300">From 7.99%</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400 mb-1">Hard Money</div>
              <p className="text-sm text-gray-300">From 9.99%</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Started Now
            <span className="text-xl">→</span>
          </a>
          <a 
            href="tel:+19493393555"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Call (949) 339-3555
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          No tax returns required • No employment verification • Close in 14-21 days
        </p>
      </div>
    </div>
  </section>
);
