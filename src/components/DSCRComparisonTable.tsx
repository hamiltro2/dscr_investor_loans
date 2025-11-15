'use client';

export default function DSCRComparisonTable() {
  const comparisonData = [
    {
      feature: 'Underwriting Focus',
      dscr: 'Property DSCR / cash flow',
      conventional: 'Borrower income, DTI, credit',
      hardMoney: 'Collateral & exit, sometimes experience'
    },
    {
      feature: 'Income Docs',
      dscr: 'Usually no tax returns / W-2s',
      conventional: 'Full income docs required',
      hardMoney: 'Minimal, mostly asset-based'
    },
    {
      feature: 'Typical Use Cases',
      dscr: 'Long-term rentals, BRRRR refi, portfolios',
      conventional: 'Vanilla rentals, W-2 borrowers',
      hardMoney: 'Fix & flip, short holds, heavy rehab'
    },
    {
      feature: 'Term Length',
      dscr: '30–40 yr, often fixed, sometimes I/O',
      conventional: '15–30 yr fixed/ARM',
      hardMoney: '6–24 months'
    },
    {
      feature: 'Rate & Fees (Relative)',
      dscr: 'Higher than conventional, lower than hard money',
      conventional: 'Lowest rates if you qualify',
      hardMoney: 'Highest rates & fees'
    },
    {
      feature: 'Prepayment Penalties',
      dscr: 'Common (e.g., 3–5 year step-downs)',
      conventional: 'Often limited or none',
      hardMoney: 'Often yield maintenance / minimum interest'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary-900/20 border-b border-primary-500/30">
            <th className="text-left p-4 text-white font-bold">Feature</th>
            <th className="text-left p-4 text-primary-400 font-bold">DSCR Loan (Investor)</th>
            <th className="text-left p-4 text-white font-bold">Conventional Investment Loan</th>
            <th className="text-left p-4 text-white font-bold">Hard Money / Bridge</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, index) => (
            <tr key={index} className={`border-b border-dark-800 ${index % 2 === 0 ? 'bg-dark-900/30' : 'bg-dark-900/50'}`}>
              <td className="p-4 font-semibold text-gray-300">{row.feature}</td>
              <td className="p-4 text-primary-300 bg-primary-500/5">{row.dscr}</td>
              <td className="p-4 text-gray-400">{row.conventional}</td>
              <td className="p-4 text-gray-400">{row.hardMoney}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
