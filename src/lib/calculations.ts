export interface InvestmentMetrics {
  noi: number;
  cashFlow: number;
  capRate: number;
  dscr: number;
  roi: number;
  monthlyPayment: number;
}

export interface LoanInputs {
  purchasePrice: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  operatingExpenses: number;
  propertyTaxRate: number;
  insuranceCost: number;
  vacancyRate: number;
  maintenanceReserve: number;
}

export function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  termYears: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = termYears * 12;
  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

export function calculateInvestmentMetrics(inputs: LoanInputs): InvestmentMetrics {
  // Calculate annual values
  const annualRent = inputs.monthlyRent * 12;
  const vacancyLoss = annualRent * (inputs.vacancyRate / 100);
  const effectiveGrossIncome = annualRent - vacancyLoss;
  
  const propertyTax = inputs.purchasePrice * (inputs.propertyTaxRate / 100);
  const totalOperatingExpenses = 
    inputs.operatingExpenses +
    propertyTax +
    inputs.insuranceCost +
    (inputs.maintenanceReserve * 12);

  const noi = effectiveGrossIncome - totalOperatingExpenses;
  
  const monthlyPayment = calculateMonthlyPayment(
    inputs.loanAmount,
    inputs.interestRate,
    inputs.loanTerm
  );
  
  const annualDebtService = monthlyPayment * 12;
  const cashFlow = noi - annualDebtService;
  
  const capRate = (noi / inputs.purchasePrice) * 100;
  const dscr = noi / annualDebtService;
  const roi = (cashFlow / (inputs.purchasePrice - inputs.loanAmount)) * 100;

  return {
    noi,
    cashFlow,
    capRate,
    dscr,
    roi,
    monthlyPayment
  };
}
