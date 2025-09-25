// Case Study and FAQ sections for Airbnb DSCR Loans article

export const CaseStudySection = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Real Success Story: Palm Springs STR Investment
        </h2>

        <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl p-8 border border-primary-500/30">
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-400 mb-4">The Property</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Location: Palm Desert, CA</li>
                <li>• Type: 4BR/3BA Pool Home</li>
                <li>• Purchase Price: $875,000</li>
                <li>• Down Payment: 25% ($218,750)</li>
                <li>• Renovation: $45,000</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-primary-400 mb-4">The Numbers</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Projected ADR: $425/night</li>
                <li>• Occupancy: 70%</li>
                <li>• Annual Revenue: $108,500</li>
                <li>• Monthly PITIA: $4,200</li>
                <li>• DSCR Ratio: 2.15</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-400/30 pt-6">
            <h3 className="text-xl font-semibold text-primary-400 mb-3">The Result</h3>
            <p className="text-gray-300 mb-4">
              "We were able to qualify for a $656,250 DSCR loan at 7.25% based purely on the property's 
              projected Airbnb income. No tax returns needed! The property now generates $5,500+ monthly 
              after all expenses, and we're booked solid through season."
            </p>
            <p className="text-sm text-gray-400 italic">
              - Jennifer & Mark, Los Angeles investors
            </p>
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
          Frequently Asked Questions: STR DSCR Loans
        </h2>

        <div className="space-y-6">
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I get a DSCR loan for a new Airbnb with no rental history?
            </h3>
            <p className="text-gray-300">
              Yes! Lenders use professional market analysis tools like AirDNA to project income based on 
              comparable properties. You'll need a strong market with proven STR demand, and the lender 
              will typically use conservative occupancy estimates (60-65%).
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How do seasonal fluctuations affect DSCR calculations?
            </h3>
            <p className="text-gray-300">
              Lenders average income over 12 months, smoothing out seasonal variations. For example, a 
              ski resort property might earn 70% of annual income in winter, but the DSCR uses the 
              annual average. Ensure your average monthly income covers PITIA year-round.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Do I need an STR permit before applying for the loan?
            </h3>
            <p className="text-gray-300">
              Not always, but you must prove the property is in an STR-legal area. Some lenders require 
              permits at closing, others allow 30-60 days post-closing. Always verify local regulations 
              first—loan approval doesn't guarantee STR legality.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I include furniture costs in my DSCR loan?
            </h3>
            <p className="text-gray-300">
              Some lenders allow up to $50,000 for furniture and setup costs to be included in the loan. 
              This is especially helpful for new STRs. The furniture budget is added to the purchase price 
              for loan calculations, so ensure the total DSCR still works.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              What happens if STR regulations change after I close?
            </h3>
            <p className="text-gray-300">
              Your DSCR loan remains valid regardless of regulation changes. However, if STRs become 
              prohibited, you'd need to convert to long-term rental. Always have a backup plan and 
              ensure the property works as a traditional rental too.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Do property management fees affect the DSCR calculation?
            </h3>
            <p className="text-gray-300">
              No, DSCR only includes PITIA (Principal, Interest, Taxes, Insurance, HOA). Management fees, 
              cleaning, utilities, and other operating expenses aren't included. However, smart investors 
              factor these into their cash flow analysis—typically 25-35% of gross revenue for STRs.
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
          Ready to Finance Your California STR Investment?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Turn your vacation rental dreams into reality with STR-friendly DSCR financing. 
          Our team specializes in Airbnb and VRBO property loans across California's top markets.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us for STR Financing?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">$75M+</div>
              <p className="text-gray-300">STR Properties Funded</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">300+</div>
              <p className="text-gray-300">Airbnb Loans Closed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">15+</div>
              <p className="text-gray-300">STR-Friendly Lenders</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/blog/dscr-loan-calculator-california"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Calculate Your STR DSCR
            <span className="text-xl">→</span>
          </a>
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Get STR Loan Quote
            <span className="text-xl">→</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-6">
          Specializing in Airbnb & VRBO property financing • No tax returns required • Close in 21 days
        </p>
      </div>
    </div>
  </section>
);
