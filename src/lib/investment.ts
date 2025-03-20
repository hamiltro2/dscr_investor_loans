/**
 * Calculate Loan to Value ratio
 * @param loanAmount - The loan amount in dollars
 * @param purchasePrice - The purchase price in dollars
 * @returns LTV ratio as a percentage
 */
export const calculateLTV = (loanAmount: number, purchasePrice: number): number => {
  if (!purchasePrice) return 0;
  return (loanAmount / purchasePrice) * 100;
};

/**
 * Calculate loan amount based on purchase price and down payment percentage
 * @param purchasePrice - The purchase price in dollars
 * @param downPaymentPercent - The down payment percentage
 * @returns Loan amount in dollars
 */
export const calculateLoanAmount = (purchasePrice: number, downPaymentPercent: number): number => {
  if (!purchasePrice) return 0;
  return purchasePrice * (1 - downPaymentPercent / 100);
};

/**
 * Calculate monthly mortgage payment
 * @param loanAmount - The loan amount in dollars
 * @param annualInterestRate - Annual interest rate as a percentage
 * @param loanTermYears - Loan term in years
 * @param isInterestOnly - Whether this is an interest-only loan
 * @returns Monthly mortgage payment in dollars
 */
export const calculateMonthlyMortgage = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  isInterestOnly: boolean = true
): number => {
  if (!loanAmount || !annualInterestRate || !loanTermYears) return 0;
  
  const monthlyRate = annualInterestRate / (100 * 12);
  
  if (isInterestOnly) {
    // For DSCR loans, calculate interest-only payment
    return loanAmount * monthlyRate;
  } else {
    // For traditional loans, calculate amortized payment
    const numPayments = loanTermYears * 12;
    return loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
};

/**
 * Calculate Cap Rate
 * @param netOperatingIncome - Annual net operating income in dollars
 * @param purchasePrice - The purchase price in dollars
 * @returns Cap rate as a percentage
 */
export const calculateCapRate = (netOperatingIncome: number, purchasePrice: number): number => {
  if (!purchasePrice) return 0;
  return (netOperatingIncome / purchasePrice) * 100;
};

/**
 * Calculate Cash on Cash Return
 * @param annualCashFlow - Annual cash flow in dollars
 * @param downPayment - Down payment amount in dollars
 * @returns Cash on cash return as a percentage
 */
export const calculateCashOnCash = (annualCashFlow: number, downPayment: number): number => {
  if (!downPayment) return 0;
  return (annualCashFlow / downPayment) * 100;
};

/**
 * Calculate Return on Investment (ROI)
 * @param netOperatingIncome - Annual net operating income in dollars
 * @param totalInvestment - Total investment amount (purchase price + closing costs + repairs)
 * @returns ROI as a percentage
 */
export const calculateROI = (netOperatingIncome: number, totalInvestment: number): number => {
  if (!totalInvestment) return 0;
  return (netOperatingIncome / totalInvestment) * 100;
};
