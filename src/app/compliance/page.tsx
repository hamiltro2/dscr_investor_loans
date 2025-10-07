export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Licensing & Compliance</h1>
        
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">NMLS Information</h2>
          <p className="text-gray-300 mb-4">
            Capital Bridge Solutions | NMLS #[YOUR NMLS NUMBER]
          </p>
          <p className="text-gray-300">
            For more information about our company, please visit the Nationwide Multistate Licensing System (NMLS) Consumer Access website at{' '}
            <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
              www.nmlsconsumeraccess.org
            </a>
          </p>
        </div>

        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Equal Housing Lender</h2>
          <p className="text-gray-300 mb-4">
            Capital Bridge Solutions is an Equal Housing Lender. All loans are subject to credit approval. 
            Programs, rates, terms and conditions are subject to change without notice.
          </p>
        </div>

        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Rate Disclosure</h2>
          <p className="text-gray-300 mb-4">
            *Advertised rates starting at 5.99% APR are based on the following assumptions:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>Minimum 760 credit score</li>
            <li>30% down payment</li>
            <li>1.25 or higher DSCR (Debt Service Coverage Ratio)</li>
            <li>Single-family residential investment property</li>
            <li>12-month prepayment penalty</li>
          </ul>
          <p className="text-gray-300 mt-4">
            Your actual rate may vary based on your specific loan characteristics and current market conditions. 
            APR (Annual Percentage Rate) includes the interest rate plus certain fees and costs.
          </p>
        </div>

        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-primary-500/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Business Purpose Loans Only</h2>
          <p className="text-gray-300">
            All loans offered by Capital Bridge Solutions are for business purposes only and are not intended 
            for personal, family, or household use. These loans are not subject to the same regulatory 
            requirements as consumer mortgages. Borrowers should consult with qualified professionals 
            regarding the legal and tax implications of obtaining a business purpose loan.
          </p>
        </div>
      </div>
    </div>
  );
}
