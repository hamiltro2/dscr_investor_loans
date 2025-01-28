'use client';

import { Calculator } from '@/components/Calculator';
import { MultiStepForm } from '@/components/MultiStepForm';

export default function Calculators() {
  const calculateDSCR = (values: Record<string, number | string>) => {
    const monthlyRent = Number(values.monthlyRent) || 0;
    const annualRent = monthlyRent * 12;
    
    // Calculate operating expenses (45% of gross rent to account for all expenses)
    // This includes: property tax, insurance, maintenance, vacancy, management fees, utilities, etc.
    const operatingExpenses = annualRent * 0.45;
    const noi = annualRent - operatingExpenses;
    
    const loanAmount = Number(values.loanAmount) || 0;
    const interestRate = Number(values.interestRate) || 0;
    const loanTerm = Number(values.loanTerm) || 30;
    
    // Calculate monthly interest-only payment
    const monthlyPayment = (loanAmount * (interestRate / 100)) / 12;
    const annualDebtService = monthlyPayment * 12;
    
    // Calculate DSCR
    const dscr = annualDebtService > 0 ? (noi / annualDebtService) : 0;
    
    return {
      result: Number(dscr.toFixed(2)),
      details: {
        'Monthly Payment (Interest Only)': monthlyPayment,
        'Annual Gross Rent': annualRent,
        'Operating Expenses (45%)': operatingExpenses,
        'Net Operating Income (NOI)': noi,
        'Annual Debt Service': annualDebtService,
      },
    };
  };

  const calculateHardMoney = (values: Record<string, number | string>) => {
    const purchasePrice = Number(values.purchasePrice) || 0;
    const arv = Number(values.arv) || 0;
    const interestRate = Number(values.interestRate) || 0;
    const loanTerm = Number(values.loanTerm) || 12;
    
    // Use standard 70% LTV for hard money loans
    const ltvRatio = 70;
    const maxLoanAmount = (purchasePrice * (ltvRatio / 100));
    
    // Calculate monthly interest-only payment
    const monthlyPayment = (maxLoanAmount * (interestRate / 100)) / 12;
    
    // Calculate total interest for the term
    const totalInterest = monthlyPayment * loanTerm;
    const totalCost = maxLoanAmount + totalInterest;

    // Calculate key ratios
    const actualLTV = purchasePrice > 0 ? (maxLoanAmount / purchasePrice) * 100 : 0;
    const loanToARV = arv > 0 ? (maxLoanAmount / arv) * 100 : 0;
    const requiredDownPayment = purchasePrice - maxLoanAmount;
    
    return {
      result: maxLoanAmount,
      details: {
        'Loan Amount': maxLoanAmount,
        'Down Payment Required': requiredDownPayment,
        'Monthly Payment (Interest Only)': monthlyPayment,
        'Total Interest': totalInterest,
        'Total Cost (Principal + Interest)': totalCost,
        'Loan to Purchase Price': actualLTV.toFixed(1) + '%',
        'Loan to ARV': loanToARV.toFixed(1) + '%'
      },
    };
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Investment Property Calculators</h1>
            <p className="text-xl text-white">
              Use our calculators to analyze potential investment properties and determine the best financing options for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Calculator
              title="DSCR Loan Calculator"
              titleClassName="text-white"
              description="Calculate your Debt Service Coverage Ratio (DSCR) to determine if your property's income can support the loan payments. DSCR loans require a minimum 20% down payment, and a DSCR of 1.25 or higher is typically required for loan approval. Payments are interest-only."
              descriptionClassName="text-white"
              inputClassName="text-white bg-gray-800 border-gray-700"
              labelClassName="text-white"
              resultClassName="text-white"
              tipsClassName="text-white"
              fields={[
                {
                  name: 'monthlyRent',
                  label: 'Monthly Rental Income',
                  type: 'number',
                  prefix: '$',
                  min: 1000,
                  step: 100,
                },
                {
                  name: 'loanAmount',
                  label: 'Loan Amount (Max 80% LTV)',
                  type: 'number',
                  prefix: '$',
                  min: 100000,
                  step: 5000,
                },
                {
                  name: 'interestRate',
                  label: 'Interest Rate',
                  type: 'number',
                  suffix: '%',
                  min: 1,
                  max: 15,
                  step: 0.125,
                },
                {
                  name: 'loanTerm',
                  label: 'Loan Term',
                  type: 'select',
                  options: [
                    { value: '30', label: '30 Years' },
                    { value: '25', label: '25 Years' },
                    { value: '20', label: '20 Years' },
                    { value: '15', label: '15 Years' },
                  ],
                },
              ]}
              onCalculate={calculateDSCR}
              resultTitle="DSCR:"
              resultPrefix=""
              resultSuffix=""
              tips={[
                'Most lenders require a minimum DSCR of 1.25 but we can fight to get your loan approved with the DSCR of 1',
                'DSCR loans are typically interest-only payments',
                'Operating expenses are calculated at 45% of gross rent to include taxes, insurance, maintenance, vacancy, etc.',
                'A DSCR above 1 means the property income covers the debt payments',
                'Higher DSCR ratios indicate better debt service ability',
              ]}
            />

            <Calculator
              title="Hard Money Loan Calculator"
              titleClassName="text-white"
              description="Estimate your maximum loan amount, monthly payments, and total costs for a hard money loan. Hard money loans typically offer up to 70% of the purchase price with interest-only payments."
              descriptionClassName="text-white"
              inputClassName="text-white bg-gray-800 border-gray-700"
              labelClassName="text-white"
              resultClassName="text-white"
              tipsClassName="text-white"
              resultTitle="Hard Money Loan Amount"
              fields={[
                {
                  name: 'purchasePrice',
                  label: 'Purchase Price',
                  type: 'number',
                  prefix: '$',
                  min: 0,
                },
                {
                  name: 'arv',
                  label: 'After Repair Value (ARV)',
                  type: 'number',
                  prefix: '$',
                  min: 0,
                },
                {
                  name: 'interestRate',
                  label: 'Interest Rate',
                  type: 'number',
                  suffix: '%',
                  min: 0,
                  max: 100,
                  step: 0.125,
                },
                {
                  name: 'loanTerm',
                  label: 'Loan Term (Months)',
                  type: 'select',
                  options: [
                    { value: '12', label: '12 Months' },
                    { value: '18', label: '18 Months' },
                    { value: '24', label: '24 Months' },
                    { value: '36', label: '36 Months' },
                  ],
                },
              ]}
              onCalculate={calculateHardMoney}
              resultPrefix="$"
              tips={[
                'Hard money loans typically lend 70% of the purchase price',
                'Payments are interest-only with a balloon payment at the end',
                'Most hard money lenders lend based on the property value, not your credit score',
                'Consider renovation costs in your total project budget',
                'Plan your exit strategy before the balloon payment is due',
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
