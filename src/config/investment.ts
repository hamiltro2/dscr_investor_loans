// Investment Analysis Configuration

// Constants
export const MONTHS_IN_YEAR = 12;
export const DOWN_PAYMENT_PERCENTAGE = 25;
export const PROPERTY_TAX_RATE = 1.2;
export const INSURANCE_RATE = 0.5;
export const MAINTENANCE_RATE = 8;
export const VACANCY_RATE = 5;
export const PROPERTY_MANAGEMENT_RATE = 8;
export const INTEREST_RATE = 7.5;
export const LOAN_TERM_YEARS = 30;
export const MONTHLY_UTILITIES = 200; // $200 monthly utilities as per requirements

// Property type yield rates (annual)
export const propertyYields = {
  commercial: {
    baseYield: 0.09,           // 9% annual yield baseline
    retailMultiplier: 1.1,     // Retail properties premium
    industrialMultiplier: 0.9, // Industrial properties discount
    newBuildingMultiplier: 1.15, // Buildings < 10 years old
    oldBuildingMultiplier: 0.85  // Buildings > 30 years old
  },
  multiFamily: {
    baseYield: 0.08,          // 8% annual yield baseline
    largeComplexMultiplier: 1.1 // Complexes with > 4 units
  },
  singleFamily: {
    baseYield: 0.07,          // 7% annual yield baseline
    largeSizeMultiplier: 1.1, // 4+ bedrooms
    extraBathMultiplier: 1.05, // 3+ bathrooms
    poolMultiplier: 1.08      // Properties with pool
  }
};

export interface InvestmentConfig {
  downPaymentPercent?: number;      // Percentage of purchase price
  interestRate?: number;            // Annual interest rate
  loanTermYears?: number;           // Loan term in years
  propertyTaxRate?: number;         // Annual property tax rate
  insuranceRate?: number;           // Annual insurance rate as percentage of property value
  monthlyUtilities?: number;        // Monthly utilities cost
  maintenancePercent?: number;      // Percentage of rent for maintenance
  vacancyRate?: number;             // Vacancy rate percentage
  propertyManagementPercent?: number; // Property management fee as percentage of rent
}

// Default residential property investment parameters
export const defaultResidentialConfig: InvestmentConfig = {
  downPaymentPercent: 25,           // 25% down payment
  interestRate: 7.5,                // 7.5% annual interest rate
  loanTermYears: 30,                // 30-year term
  propertyTaxRate: 1.2,             // 1.2% annual property tax rate
  insuranceRate: 0.5,               // 0.5% annual insurance rate
  monthlyUtilities: 200,            // $200 monthly utilities
  maintenancePercent: 8,            // 8% of rent for maintenance
  vacancyRate: 5,                   // 5% vacancy rate
  propertyManagementPercent: 8      // 8% property management fee
};

export default defaultResidentialConfig;

// Default multi-family property investment parameters
export const defaultMultiFamilyConfig: InvestmentConfig = {
  downPaymentPercent: 25,           // 25% down payment
  interestRate: 7.5,                // 7.5% annual interest rate
  loanTermYears: 30,                // 30-year term
  propertyTaxRate: 1.2,             // 1.2% annual property tax rate
  insuranceRate: 0.6,               // 0.6% annual insurance rate
  monthlyUtilities: 300,            // $300 monthly utilities
  maintenancePercent: 12,           // 12% of rent for maintenance
  vacancyRate: 7,                   // 7% vacancy rate
  propertyManagementPercent: 10     // 10% property management fee
};

// Default commercial property investment parameters
export const defaultCommercialConfig: InvestmentConfig = {
  downPaymentPercent: 30,           // 30% down payment
  interestRate: 8.5,                // 8.5% annual interest rate
  loanTermYears: 20,                // 20-year term
  propertyTaxRate: 1.5,             // 1.5% annual property tax rate
  insuranceRate: 0.7,               // 0.7% annual insurance rate
  monthlyUtilities: 500,            // $500 monthly utilities
  maintenancePercent: 10,           // 10% of rent for maintenance
  vacancyRate: 8,                   // 8% vacancy rate
  propertyManagementPercent: 6      // 6% property management fee
};

// The default config will use residential parameters as the base case
export const defaultConfig: InvestmentConfig = defaultResidentialConfig;

export enum PropertyClass {
  A = 'A',
  B = 'B',
  C = 'C'
}

export enum PropertyType {
  Residential = 'residential',
  Commercial = 'commercial',
  MultiFamily = 'multiFamily'
}

export enum CommercialPropertyType {
  Office = 'office',
  Retail = 'retail',
  Medical = 'medical',
  Industrial = 'industrial',
  MixedUse = 'mixedUse',
  ShoppingCenter = 'shoppingCenter',
  Warehouse = 'warehouse'
}

export const commercialRentRates = {
  [CommercialPropertyType.Office]: 65,
  [CommercialPropertyType.Retail]: 55,
  [CommercialPropertyType.Medical]: 70,
  [CommercialPropertyType.Industrial]: 35,
  [CommercialPropertyType.MixedUse]: 60,
  [CommercialPropertyType.ShoppingCenter]: 50,
  [CommercialPropertyType.Warehouse]: 30
};

export const buildingClassAdjustments = {
  [PropertyClass.A]: 1.2,  // +20%
  [PropertyClass.B]: 1.0,  // Base rate
  [PropertyClass.C]: 0.8   // -20%
};

export interface PropertyMetrics {
  monthlyRent: number;
  annualRent: number;
  operatingExpenses: number;
  noi: number;
  capRate: number;
  dscr: number;
  cashOnCashReturn: number;
  returnOnEquity: number;
}

export function calculatePropertyMetrics(
  propertyType: PropertyType,
  purchasePrice: number,
  config: InvestmentConfig,
  additionalParams?: {
    commercialType?: CommercialPropertyType;
    propertyClass?: PropertyClass;
    squareFeet?: number;
  }
): PropertyMetrics {
  const {
    downPaymentPercent = 25,
    interestRate = 7.5,
    loanTermYears = 30,
    propertyTaxRate = 1.2,
    insuranceRate = 0.5,
    monthlyUtilities = 200,
    maintenancePercent = 8,
    vacancyRate = 5,
    propertyManagementPercent = 8
  } = config;

  // Calculate base monthly rent
  let monthlyRent = 0;
  if (propertyType === PropertyType.Commercial && additionalParams?.commercialType && additionalParams?.squareFeet) {
    const baseRate = commercialRentRates[additionalParams.commercialType];
    const classMultiplier = additionalParams.propertyClass 
      ? buildingClassAdjustments[additionalParams.propertyClass]
      : 1.0;
    monthlyRent = (baseRate * additionalParams.squareFeet * classMultiplier) / 12;
  } else {
    // For residential properties, use the provided monthly rent or estimate based on purchase price
    monthlyRent = purchasePrice * 0.008; // Estimated monthly rent at 0.8% of purchase price
  }

  const annualRent = monthlyRent * 12;
  
  // Calculate mortgage payment
  const loanAmount = purchasePrice * (1 - downPaymentPercent / 100);
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfPayments = loanTermYears * 12;
  const monthlyMortgage = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) 
    / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Calculate expenses
  const annualPropertyTax = purchasePrice * (propertyTaxRate / 100);
  const annualInsurance = purchasePrice * (insuranceRate / 100);
  const annualUtilities = monthlyUtilities * 12;
  const annualMaintenance = annualRent * (maintenancePercent / 100);
  const annualVacancy = annualRent * (vacancyRate / 100);
  const annualPropertyManagement = annualRent * (propertyManagementPercent / 100);

  const totalAnnualExpenses = annualPropertyTax + annualInsurance + annualUtilities + 
    annualMaintenance + annualVacancy + annualPropertyManagement + (monthlyMortgage * 12);

  const noi = annualRent - totalAnnualExpenses + (monthlyMortgage * 12); // Add back mortgage for NOI
  const capRate = (noi / purchasePrice) * 100;
  const dscr = noi / (monthlyMortgage * 12);
  
  const annualCashFlow = annualRent - totalAnnualExpenses;
  const initialInvestment = purchasePrice * (downPaymentPercent / 100);
  const cashOnCashReturn = (annualCashFlow / initialInvestment) * 100;
  
  // Simplified ROE calculation (can be enhanced with appreciation estimates)
  const returnOnEquity = (annualCashFlow / initialInvestment) * 100;

  return {
    monthlyRent,
    annualRent,
    operatingExpenses: totalAnnualExpenses,
    noi,
    capRate,
    dscr,
    cashOnCashReturn,
    returnOnEquity
  };
}
