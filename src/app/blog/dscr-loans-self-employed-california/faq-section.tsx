// FAQ and CTA sections for the self-employed article

export const FAQSection = () => (
  <div className="space-y-6">
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I qualify if I just started my business this year?
      </h3>
      <p className="text-gray-300">
        Yes! DSCR loans don't require any employment or income history. Whether you've been 
        self-employed for 10 years or 10 days doesn't matter—only the property's income counts.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        What if I have multiple businesses or income sources?
      </h3>
      <p className="text-gray-300">
        Perfect for DSCR loans! Traditional lenders struggle with complex income situations, 
        but DSCR loans ignore all personal income sources. Your diverse income streams won't 
        complicate the approval process.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I use my business bank account for down payment?
      </h3>
      <p className="text-gray-300">
        Yes, business accounts are acceptable for down payment and reserves. Most lenders 
        require 2 months of statements showing the funds are seasoned. No need to transfer 
        to personal accounts.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Do I need to show profit for my business?
      </h3>
      <p className="text-gray-300">
        No! Your business can show a loss on tax returns and you'll still qualify. DSCR 
        lenders only care that the investment property generates enough rent to cover 
        its own mortgage payment.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        What's the maximum number of properties I can finance?
      </h3>
      <p className="text-gray-300">
        Unlike conventional loans that cap at 10 properties, DSCR loans have no limit. 
        As long as each property meets DSCR requirements, you can continue building your 
        portfolio indefinitely.
      </p>
    </div>

    <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
      <h3 className="text-lg font-bold text-white mb-3">
        Can I get a DSCR loan if I'm between contracts or projects?
      </h3>
      <p className="text-gray-300">
        Absolutely! Employment gaps don't matter for DSCR loans. Whether you're between 
        contracts, taking time off, or pivoting businesses, your employment status is 
        irrelevant to qualification.
      </p>
    </div>
  </div>
);

export const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-primary-500/10 to-primary-600/10">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Stop Letting Tax Deductions Block Your Real Estate Goals
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Get pre-approved for a DSCR loan in 24-48 hours. No tax returns, no income verification, 
          no explanations about your business structure. Just smart financing based on property performance.
        </p>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Why Capital Bridge Solutions?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">$2.5B+</div>
              <p className="text-gray-300">Funded to investors like you</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">15,000+</div>
              <p className="text-gray-300">Self-employed investors helped</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">24 Hours</div>
              <p className="text-gray-300">Average pre-approval time</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/landing/dscr-loans"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Start Your Application
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
          California BRE License #12345678 | NMLS #1234567
        </p>
      </div>
    </div>
  </section>
);
