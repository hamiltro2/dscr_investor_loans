export interface InvestmentConfig {
  purchasePrice?: number;           // Purchase price of the property
  downPaymentPercent?: number;      // Percentage of purchase price
  downPayment?: number;             // Fixed dollar amount for down payment (takes precedence over percentage)
  downPaymentAmount?: number;       // Actual amount in dollars
  interestRate?: number;            // Annual interest rate
  loanTermYears?: number;           // Loan term in years
  loanTerm?: number;                // Alternative name for loan term in years
  propertyTaxRate?: number;         // Annual property tax rate
  insuranceRate?: number;           // Annual insurance rate as percentage of property value
  monthlyUtilities?: number;        // Monthly utilities cost
  maintenancePercent?: number;      // Percentage of rent for maintenance
  maintenanceRate?: number;         // Alternative name for maintenance percentage
  vacancyRate?: number;             // Vacancy rate percentage
  propertyManagementPercent?: number; // Property management fee as percentage of rent
  managementRate?: number;          // Alternative name for property management percentage
  adminRate?: number;               // Administrative fee as percentage of revenue (for commercial properties)
  estimatedMonthlyRent?: number;    // Estimated monthly rental income
  monthlyHOA?: number;              // Monthly HOA fees
  occupancyRate?: number;           // Occupancy rate percentage
  propertyType?: any;               // Type of property (commercial, residential, etc.)
  propertyClass?: any;              // Class of property (A, B, C, etc.)
  leaseType?: any;                  // Type of lease (NNN, Modified Gross, Full Service)
}

/**
 * Market data structure for coastal/inland states like CA and FL
 */
export interface CoastalInlandState {
  coastal: {
    base: number;
    regions: Record<string, number>;
  };
  inland: {
    base: number;
    regions: Record<string, number>;
  };
}

/**
 * Market data structure for states with simple region-based pricing
 */
export interface SimpleState {
  base: number;
  regions: Record<string, number>;
}

/**
 * Default market data structure for states without specific regional pricing
 */
export interface DefaultState {
  base: number;
  premium_markets: {
    [state: string]: Record<string, number>;
  };
}

/**
 * Complete market data structure containing all state types
 */
export interface MarketData {
  CA: CoastalInlandState;
  NY: SimpleState;
  NJ: SimpleState;
  FL: CoastalInlandState;
  TX: SimpleState;
  DEFAULT: DefaultState;
}

export interface MarketAnalysis {
  location: {
    marketArea: string;
    submarket: string;
    zoning: string;
    floodZone: string | null;
  };
  propertyDetails: {
    propertyType: string;
    propertyClass: string;
    quality: string;
    yearBuilt: number;
    lotSize: number;
    livingSize: number;
    amenities: string[];
  };
  marketMetrics: {
    medianHomeValue: number;
    medianRent: number;
    priceToRentRatio: number;
    occupancyRate: number;
    daysOnMarket: number;
    appreciation: number;
  };
  riskFactors: {
    floodRisk: string;
    crimeRate: string;
    schoolQuality: string;
    employmentGrowth: string;
    populationGrowth: string;
  };
}

export interface RentalStrategy {
  monthlyRevenue: number;
  occupancyRate: number;
  netIncome: number;
  roi: number;
  notes: string[];
  additionalCosts?: {
    [key: string]: number;
  };
}

export interface RentalStrategies {
  longTerm: RentalStrategy;
  shortTerm: RentalStrategy;
  midTerm: RentalStrategy;
  section8: RentalStrategy;
}

export type RiskSeverity = 'Low' | 'Medium' | 'High';

export interface RentalAnalysis {
  strategy: string;
  monthlyRevenue: number;
  occupancyRate: number;
  additionalExpenses: {
    [key: string]: number;
  };
  netIncome: number;
  roi: number;
  notes: string[];
}

export enum PropertyClass {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum CommercialPropertyType {
  Office = 'Office',
  Retail = 'Retail',
  Industrial = 'Industrial',
  MixedUse = 'MixedUse',
  MedicalOffice = 'MedicalOffice',
  ShoppingCenter = 'ShoppingCenter',
  Warehouse = 'Warehouse',
  MultiFamily = 'MultiFamily'
}

export enum LeaseType {
  NNN = 'NNN',                 // Triple Net - tenant pays all expenses
  ModifiedGross = 'Modified',  // Tenant pays some expenses
  FullService = 'Full'         // Landlord pays all expenses
}

export interface AIAnalysis {
  overallRecommendation: 'Strong Buy' | 'Buy' | 'Neutral' | 'Caution' | 'Avoid';
  confidenceScore: number;
  summary: string;
  pros: string[];
  cons: string[];
  bestUseCase: string;
  riskFactors: {
    factor: string;
    severity: RiskSeverity;
    description: string;
  }[];
  opportunityAreas: string[];
  marketTrends: string[];
  recommendedStrategy: string;
  additionalConsiderations: string[];
}

export interface InvestmentMetrics {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  downPaymentPercent?: number;
  loanAmount: number;
  interestRate: number;
  monthlyMortgage: number;
  estimatedMonthlyRent: number;
  operatingExpenses: number;
  netOperatingIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  dscr: number;
  occupancyRate: number;
  totalMonthlyExpenses: number;
  cashFlow: number;
  grossMonthlyIncome: number;
  monthlyRevenue: number;
  monthlyInsurance: number;
  monthlyUtilities: number;
  monthlyMaintenance: number;
  monthlyVacancy: number;
  monthlyManagement: number;
  monthlyHOA: number;
  returnOnInvestment: number;
  breakEvenMonths: number;
  monthlyExpenses: {
    mortgage: number;
    propertyTax: number;
    insurance: number;
    maintenance: number;
    vacancy: number;
    management: number;
    utilities: number;
    [key: string]: number;
  };
  rentalStrategies?: { [key: string]: RentalAnalysis };
  aiAnalysis?: AIAnalysis;
}

export interface CommercialInvestmentMetrics extends InvestmentMetrics {
  propertyClass: PropertyClass;
  commercialType: CommercialPropertyType;
  leaseType: LeaseType;
  annualRentPerSqFt: number;
  squareFeet: number;
  vacancyAllowance: number;
  managementFee: number;
  adminFee: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
  debtCoverageRatio: number;
}

export interface FullInvestmentAnalysis {
  baseMetrics: InvestmentMetrics;
  rentalStrategies: { [key: string]: RentalAnalysis };
  aiAnalysis: AIAnalysis;
}
