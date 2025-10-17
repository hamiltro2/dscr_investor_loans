/**
 * Real Estate Deal Analyzer - Core Calculation Engine
 * 
 * Mathematical precision for investment property analysis
 * Implements standard real estate financial formulas with exact calculations
 * 
 * @module dealAnalyzer
 * @author Capital Bridge Solutions Engineering Team
 */

/**
 * Property analysis input parameters
 */
export interface PropertyInputs {
  // Acquisition
  purchasePrice: number;
  downPaymentPercent: number;
  closingCostsPercent: number;
  rehabCosts: number;
  
  // Financing
  interestRate: number;
  loanTermYears: number;
  
  // Income
  monthlyRent: number;
  otherMonthlyIncome: number;
  vacancyRate: number;
  
  // Expenses
  propertyTaxRate: number;
  insurance: number;
  hoaFees: number;
  propertyManagement: number;
  maintenance: number;
  utilities: number;
  otherExpenses: number;
}

/**
 * Comprehensive deal analysis results
 */
export interface DealAnalysis {
  // Acquisition Summary
  acquisition: {
    purchasePrice: number;
    downPayment: number;
    loanAmount: number;
    closingCosts: number;
    rehabCosts: number;
    totalCashNeeded: number;
    afterRepairValue: number;
  };
  
  // Monthly Cash Flow Analysis
  monthly: {
    // Income
    grossRent: number;
    otherIncome: number;
    grossIncome: number;
    vacancy: number;
    effectiveGrossIncome: number;
    
    // Expenses
    principal: number;
    interest: number;
    propertyTax: number;
    insurance: number;
    hoaFees: number;
    propertyManagement: number;
    maintenance: number;
    utilities: number;
    otherExpenses: number;
    totalExpenses: number;
    
    // Results
    netOperatingIncome: number;
    debtService: number;
    cashFlow: number;
  };
  
  // Annual Projections
  annual: {
    grossIncome: number;
    effectiveGrossIncome: number;
    totalExpenses: number;
    noi: number;
    debtService: number;
    cashFlow: number;
  };
  
  // Investment Metrics
  metrics: {
    dscr: number;
    cashOnCashReturn: number;
    capRate: number;
    returnOnInvestment: number;
    grossRentMultiplier: number;
    debtCoverageRatio: number;
    breakEvenOccupancy: number;
  };
  
  // Qualification Status
  qualification: {
    dcsrQualifies: boolean;
    minimumDSCR: number;
    dcsrMargin: number;
    cashFlowStatus: 'positive' | 'negative' | 'breakeven';
    recommendation: string;
  };
}

/**
 * Calculate monthly mortgage payment using standard amortization formula
 * 
 * Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 *   M = Monthly payment
 *   P = Principal (loan amount)
 *   r = Monthly interest rate (annual rate / 12)
 *   n = Number of payments (years * 12)
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): { payment: number; principalPortion: number; interestPortion: number } {
  if (principal <= 0 || annualRate < 0 || years <= 0) {
    return { payment: 0, principalPortion: 0, interestPortion: 0 };
  }
  
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  
  // Handle edge case of 0% interest
  if (monthlyRate === 0) {
    const payment = principal / numPayments;
    return {
      payment,
      principalPortion: payment,
      interestPortion: 0,
    };
  }
  
  // Standard amortization formula
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  // First month breakdown
  const interestPortion = principal * monthlyRate;
  const principalPortion = monthlyPayment - interestPortion;
  
  return {
    payment: monthlyPayment,
    principalPortion,
    interestPortion,
  };
}

/**
 * Calculate Debt Service Coverage Ratio (DSCR)
 * 
 * DSCR = Net Operating Income / Total Debt Service
 * 
 * Industry standard:
 *   < 1.0  = Property doesn't cover debt (negative cash flow)
 *   1.0    = Break-even
 *   1.25+  = Ideal for DSCR loan qualification
 *   1.5+   = Strong deal
 */
export function calculateDSCR(noi: number, debtService: number): number {
  if (debtService === 0) return Infinity;
  return noi / debtService;
}

/**
 * Calculate Cash-on-Cash Return
 * 
 * CoC = Annual Cash Flow / Total Cash Invested
 * 
 * Measures actual return on cash invested (not financed)
 */
export function calculateCashOnCashReturn(
  annualCashFlow: number,
  totalCashInvested: number
): number {
  if (totalCashInvested === 0) return 0;
  return (annualCashFlow / totalCashInvested) * 100;
}

/**
 * Calculate Capitalization Rate (Cap Rate)
 * 
 * Cap Rate = Net Operating Income / Property Value
 * 
 * Measures property's return independent of financing
 * Used for comparing properties and market analysis
 */
export function calculateCapRate(noi: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return (noi / propertyValue) * 100;
}

/**
 * Calculate Gross Rent Multiplier (GRM)
 * 
 * GRM = Property Price / Gross Annual Rent
 * 
 * Quick screening metric: Lower GRM = better deal
 * Typical range: 4-12 (varies by market)
 */
export function calculateGRM(propertyPrice: number, annualGrossRent: number): number {
  if (annualGrossRent === 0) return 0;
  return propertyPrice / annualGrossRent;
}

/**
 * Main deal analyzer function
 * 
 * Performs comprehensive financial analysis of investment property
 * Returns all relevant metrics and qualification status
 */
export function analyzeDeal(inputs: PropertyInputs): DealAnalysis {
  // ============================================================
  // ACQUISITION CALCULATIONS
  // ============================================================
  
  const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
  const loanAmount = inputs.purchasePrice - downPayment;
  const closingCosts = inputs.purchasePrice * (inputs.closingCostsPercent / 100);
  const totalCashNeeded = downPayment + closingCosts + inputs.rehabCosts;
  const afterRepairValue = inputs.purchasePrice + inputs.rehabCosts;
  
  // ============================================================
  // MONTHLY INCOME CALCULATIONS
  // ============================================================
  
  const grossRent = inputs.monthlyRent;
  const otherIncome = inputs.otherMonthlyIncome;
  const grossIncome = grossRent + otherIncome;
  const vacancy = grossIncome * (inputs.vacancyRate / 100);
  const effectiveGrossIncome = grossIncome - vacancy;
  
  // ============================================================
  // MONTHLY EXPENSE CALCULATIONS
  // ============================================================
  
  // Mortgage payment breakdown
  const { payment, principalPortion, interestPortion } = calculateMonthlyPayment(
    loanAmount,
    inputs.interestRate,
    inputs.loanTermYears
  );
  
  // Property tax (annual rate divided by 12)
  const propertyTax = (inputs.purchasePrice * (inputs.propertyTaxRate / 100)) / 12;
  
  // Sum all monthly expenses
  const totalExpenses =
    payment +
    propertyTax +
    inputs.insurance +
    inputs.hoaFees +
    inputs.propertyManagement +
    inputs.maintenance +
    inputs.utilities +
    inputs.otherExpenses;
  
  // ============================================================
  // NET OPERATING INCOME (NOI)
  // ============================================================
  
  // NOI = Effective Gross Income - Operating Expenses (excluding debt service)
  const operatingExpenses =
    propertyTax +
    inputs.insurance +
    inputs.hoaFees +
    inputs.propertyManagement +
    inputs.maintenance +
    inputs.utilities +
    inputs.otherExpenses;
  
  const monthlyNOI = effectiveGrossIncome - operatingExpenses;
  
  // ============================================================
  // CASH FLOW
  // ============================================================
  
  const debtService = payment;
  const monthlyCashFlow = effectiveGrossIncome - totalExpenses;
  
  // ============================================================
  // ANNUAL PROJECTIONS
  // ============================================================
  
  const annualGrossIncome = grossIncome * 12;
  const annualEffectiveGrossIncome = effectiveGrossIncome * 12;
  const annualTotalExpenses = totalExpenses * 12;
  const annualNOI = monthlyNOI * 12;
  const annualDebtService = debtService * 12;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // ============================================================
  // INVESTMENT METRICS
  // ============================================================
  
  const dscr = calculateDSCR(annualNOI, annualDebtService);
  const cashOnCashReturn = calculateCashOnCashReturn(annualCashFlow, totalCashNeeded);
  const capRate = calculateCapRate(annualNOI, inputs.purchasePrice);
  const roi = calculateCashOnCashReturn(annualCashFlow, totalCashNeeded);
  const grm = calculateGRM(inputs.purchasePrice, annualGrossIncome);
  const breakEvenOccupancy = totalExpenses / grossIncome * 100;
  
  // ============================================================
  // QUALIFICATION ANALYSIS
  // ============================================================
  
  const minimumDSCR = 1.0;
  const idealDSCR = 1.25;
  const dcsrQualifies = dscr >= minimumDSCR;
  const dcsrMargin = dscr - minimumDSCR;
  
  let cashFlowStatus: 'positive' | 'negative' | 'breakeven';
  if (monthlyCashFlow > 10) cashFlowStatus = 'positive';
  else if (monthlyCashFlow < -10) cashFlowStatus = 'negative';
  else cashFlowStatus = 'breakeven';
  
  let recommendation: string;
  if (dscr >= idealDSCR && cashFlowStatus === 'positive') {
    recommendation = 'Excellent deal! Strong DSCR and positive cash flow. Highly recommended.';
  } else if (dscr >= minimumDSCR && cashFlowStatus === 'positive') {
    recommendation = 'Good deal. Qualifies for DSCR financing with positive cash flow.';
  } else if (dscr >= minimumDSCR && cashFlowStatus === 'breakeven') {
    recommendation = 'Marginal deal. Qualifies but minimal cash flow. Consider negotiating price or increasing rent.';
  } else if (dscr < minimumDSCR && dscr >= 0.9) {
    recommendation = 'Close to qualifying. Consider larger down payment or rent increase to improve DSCR.';
  } else {
    recommendation = 'Does not qualify. Property expenses exceed income. Avoid this deal or restructure significantly.';
  }
  
  // ============================================================
  // RETURN COMPREHENSIVE ANALYSIS
  // ============================================================
  
  return {
    acquisition: {
      purchasePrice: inputs.purchasePrice,
      downPayment,
      loanAmount,
      closingCosts,
      rehabCosts: inputs.rehabCosts,
      totalCashNeeded,
      afterRepairValue,
    },
    
    monthly: {
      grossRent,
      otherIncome,
      grossIncome,
      vacancy,
      effectiveGrossIncome,
      
      principal: principalPortion,
      interest: interestPortion,
      propertyTax,
      insurance: inputs.insurance,
      hoaFees: inputs.hoaFees,
      propertyManagement: inputs.propertyManagement,
      maintenance: inputs.maintenance,
      utilities: inputs.utilities,
      otherExpenses: inputs.otherExpenses,
      totalExpenses,
      
      netOperatingIncome: monthlyNOI,
      debtService,
      cashFlow: monthlyCashFlow,
    },
    
    annual: {
      grossIncome: annualGrossIncome,
      effectiveGrossIncome: annualEffectiveGrossIncome,
      totalExpenses: annualTotalExpenses,
      noi: annualNOI,
      debtService: annualDebtService,
      cashFlow: annualCashFlow,
    },
    
    metrics: {
      dscr,
      cashOnCashReturn,
      capRate,
      returnOnInvestment: roi,
      grossRentMultiplier: grm,
      debtCoverageRatio: dscr,
      breakEvenOccupancy,
    },
    
    qualification: {
      dcsrQualifies,
      minimumDSCR,
      dcsrMargin,
      cashFlowStatus,
      recommendation,
    },
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format ratio for display
 */
export function formatRatio(value: number): string {
  if (!isFinite(value)) return '∞';
  return value.toFixed(2);
}
