// CTA Section for 620 Credit Score article

export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Invest with Your 620 Credit Score?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Don't let credit challenges stop you from building wealth through real estate. 
          Our team specializes in helping investors with credit scores as low as 620 get approved for DSCR loans.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">We've Helped 620 Score Borrowers:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">500+</div>
              <p className="text-gray-300">Investors Approved</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">$150M+</div>
              <p className="text-gray-300">Funded with 620-679 Credit</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">24 Hours</div>
              <p className="text-gray-300">Average Pre-Approval Time</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Check Your DSCR Ratio
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Get Pre-Approved Today
            <span className="text-xl">→</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          620 minimum credit score • No income verification • Close in 21-30 days
        </p>
      </div>
    </div>
  </section>
);
