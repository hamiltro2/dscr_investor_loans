// This file contains fixes for the rental strategy ROI calculations

export function calculateRentalROI(
  netIncome: number,
  downPayment: number,
  additionalExpenses: Record<string, number>
): number {
  // Calculate total investment
  const setupCosts = Object.values(additionalExpenses).reduce((a, b) => a + b, 0) * 3; // 3 months of expenses
  const totalInvestment = downPayment + setupCosts;
  
  // Calculate annual net income
  const annualNetIncome = netIncome * 12;
  
  // Calculate ROI with proper handling of negative net income
  if (totalInvestment <= 0) {
    // If no investment, default to 0% ROI
    return 0;
  } else if (netIncome < 0) {
    // For negative cash flow, calculate a negative ROI
    // But limit it to prevent extreme values
    const negativeRoi = (annualNetIncome / totalInvestment) * 100;
    return Math.max(negativeRoi, -10); // Cap at -10%
  } else {
    // For positive cash flow, calculate positive ROI
    const calculatedRoi = (annualNetIncome / totalInvestment) * 100;
    // Cap ROI between 0% and 25%
    const cappedRoi = Math.min(Math.max(calculatedRoi, 0), 25);
    // Return with 2 decimal places
    return parseFloat(cappedRoi.toFixed(2));
  }
}

// Function to fix the projected values in the investment analysis
export function calculateProjectedValue(
  currentValue: number,
  annualAppreciationRate: number = 3.5
): number {
  // Calculate a realistic 5-year projected value with compound growth
  const appreciationFactor = 1 + (annualAppreciationRate / 100);
  return currentValue * Math.pow(appreciationFactor, 5);
}
