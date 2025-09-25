// FAQ and CTA sections for DSCR vs Hard Money article

export const FAQContinued = () => (
  <div className="space-y-6">
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        What if my flip takes longer than expected?
      </h3>
      <p className="text-gray-300">
        Most hard money lenders offer extensions for 1-3% additional points. However, costs add up 
        quickly. If holding long-term becomes likely, start the DSCR refinance process early. Some 
        lenders can close DSCR loans in 14-21 days for time-sensitive situations.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I get 100% financing with either option?
      </h3>
      <p className="text-gray-300">
        DSCR loans typically max out at 80% LTV (20% down). Some hard money lenders offer 100% of 
        purchase price plus renovation costs, but require significant experience and strong credit. 
        Cross-collateralization using other properties is sometimes an option for both.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Which option builds more wealth long-term?
      </h3>
      <p className="text-gray-300">
        DSCR loans build more wealth for buy-and-hold investors through appreciation, cash flow, and 
        principal paydown. Hard money can generate quick profits but requires constant deal flow. Many 
        successful investors use hard money profits to acquire DSCR-financed rentals for passive income.
      </p>
    </div>
  </div>
);

export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Choose Your Financing Strategy?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Whether you need fast hard money for a flip or long-term DSCR financing for rentals, 
          we have the right solution. Our team specializes in both loan types and can help you 
          create a winning investment strategy.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">We Offer Both Solutions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-primary-400 mb-3">DSCR Loans</h4>
              <ul className="space-y-2 text-gray-300 text-left">
                <li>• Rates from 7.5%</li>
                <li>• 30-year fixed terms</li>
                <li>• Close in 21 days</li>
                <li>• No income verification</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-orange-400 mb-3">Hard Money</h4>
              <ul className="space-y-2 text-gray-300 text-left">
                <li>• Close in 7 days</li>
                <li>• Up to 90% financing</li>
                <li>• Fix & flip specialists</li>
                <li>• Flexible terms</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Calculate DSCR Eligibility
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Get Financing Quote
            <span className="text-xl">→</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          Expert guidance • Multiple lenders • Best rates guaranteed
        </p>
      </div>
    </div>
  </section>
);
