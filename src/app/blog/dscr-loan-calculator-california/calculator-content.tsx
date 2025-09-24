// FAQ Section Component
export const FAQSection = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              What is the minimum DSCR ratio for California investment properties?
            </h3>
            <p className="text-gray-300">
              Most California lenders require a minimum DSCR of 1.0, though some offer "no-ratio" 
              loans starting at 0.75 DSCR with higher down payments (30-40%). For the best rates 
              and terms, aim for a DSCR of 1.25 or higher.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              How is DSCR calculated for short-term rentals (Airbnb/VRBO)?
            </h3>
            <p className="text-gray-300">
              For short-term rentals, lenders typically use 12 months of rental history or a 
              market analysis showing comparable STR income. Some lenders apply a 10-20% discount 
              to STR income due to higher vacancy rates and operating expenses.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Can I use projected rents for a DSCR loan calculation?
            </h3>
            <p className="text-gray-300">
              Yes, for purchase transactions, lenders use market rent estimates from the appraisal. 
              For refinances with existing tenants, actual lease agreements are required. The 
              appraiser will provide a rent schedule comparing your property to similar rentals.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              What expenses are included in the DSCR calculation?
            </h3>
            <p className="text-gray-300">
              DSCR calculations include Principal, Interest, Taxes, Insurance, and HOA fees (PITIA). 
              Property management fees, maintenance, and utilities are NOT included in the DSCR 
              calculation, though you should factor these into your investment analysis.
            </p>
          </div>

          <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Do California DSCR loans require reserves?
            </h3>
            <p className="text-gray-300">
              Most lenders require 3-6 months of PITIA payments in reserves. For DSCR ratios below 
              1.2, expect 6-12 months reserve requirements. Reserves can include checking, savings, 
              retirement accounts (at 70% value), and other liquid assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// CTA Section Component
export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Your DSCR Loan?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Get pre-approved in 24-48 hours with no tax returns required. 
          Our team specializes in California investment property financing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Start Application
            <span className="text-xl">→</span>
          </a>
          <a 
            href="tel:+19493393555"
            className="inline-flex items-center justify-center gap-2 bg-dark-700 hover:bg-dark-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-primary-500/30"
          >
            Call (949) 339-3555
          </a>
        </div>
      </div>
    </div>
  </section>
);
