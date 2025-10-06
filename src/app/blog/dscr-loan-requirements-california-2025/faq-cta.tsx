// FAQ and CTA sections for DSCR Requirements article

export const FAQContinued = () => (
  <div className="space-y-6">
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Do DSCR loans require mortgage insurance?
      </h3>
      <p className="text-gray-300">
        No, DSCR loans don't require PMI regardless of down payment amount. This is a significant 
        advantage over conventional loans, especially when putting down less than 20%.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        What happens if my property's DSCR drops after closing?
      </h3>
      <p className="text-gray-300">
        Nothing—once your loan closes, the DSCR ratio is locked in. Lenders don't monitor or 
        reassess DSCR after closing. However, maintaining positive cash flow is important for 
        your investment success.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I use future rent increases in my DSCR calculation?
      </h3>
      <p className="text-gray-300">
        No, lenders only use current market rents or existing lease agreements. However, if you 
        have a signed lease showing a future rent increase within 60 days of closing, some lenders 
        may consider it.
      </p>
    </div>
  </div>
);

export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Meet California's 2024 DSCR Requirements?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Get a personalized DSCR loan quote in minutes. Our California-focused team understands 
          local markets and can structure the perfect loan for your investment strategy.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">24 Hours</div>
              <p className="text-gray-300">Average approval time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">620+</div>
              <p className="text-gray-300">Minimum credit score</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">0.75</div>
              <p className="text-gray-300">Minimum DSCR ratio</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Calculate Your DSCR
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Get Pre-Approved
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);
