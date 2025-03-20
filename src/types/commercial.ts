export interface CommercialMetrics {
  noi: number;                    // Net Operating Income
  capRate: number;               // Capitalization Rate
  pricePerSqFt: number;         // Price per square foot
  occupancyRate: number;         // Current occupancy rate
  rentPerSqFt: number;          // Base rent per square foot
  operatingExpenseRatio: number; // Operating expense ratio
  debtServiceCoverage: number;   // Debt Service Coverage Ratio
  returnOnEquity: number;        // Return on Equity
  cashOnCash: number;           // Cash on Cash Return
  leaseStructures: LeaseStructures; // Revenue projections by lease type
}

export interface CommercialExpenses {
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  management: number;
  janitorial: number;
  cam: number;               // Common Area Maintenance
  reserves: number;
  other: number;
}

export interface VariableExpenses {
  utilities: {
    electric: number;
    water: number;
    gas: number;
  };
  maintenance: {
    repairs: number;
    preventive: number;
  };
  janitorial: {
    cleaning: number;
    supplies: number;
  };
  cam: {
    landscaping: number;
    snowRemoval: number;
  };
  reserves: {
    capex: number;
    vacancy: number;
  };
}

export interface OperatingExpenseBreakdown {
  fixed: {
    propertyTax: number;
    insurance: number;
    propertyManagement: number;
    adminFees: number;
  };
  variable: VariableExpenses;
  metrics: {
    totalFixed: number;
    totalVariable: number;
    totalExpenses: number;
    expenseRatio: number;    // Operating expenses as % of revenue
    expensePerSqFt: number; // Total expenses per square foot
    fixedExpenseRatio: number;  // Fixed expenses as % of total
    variableExpenseRatio: number; // Variable expenses as % of total
  };
}

export interface LeaseStructure {
  type: 'NNN' | 'Modified Gross' | 'Full Service';
  baseRentPerSqFt: number;
  totalRentPerSqFt: number;
  annualRevenue: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  operatingExpenses: OperatingExpenseBreakdown;
  tenantResponsibilities: string[];
  landlordResponsibilities: string[];
  metrics: {
    occupancyRate: number;
    expenseRecovery: number;
    netEffectiveRent: number;
    cashflow: number;
    expenseRatio: number;
    expensePerSqFt: number;
    fixedExpenseRatio: number;
    variableExpenseRatio: number;
  };
}

export interface LeaseStructures {
  nnn: LeaseStructure;
  modifiedGross: LeaseStructure;
  fullService: LeaseStructure;
}

export interface LeaseStructureAnalysis {
  type: 'NNN' | 'Modified Gross' | 'Full Service';
  baseRentPerSqFt: number;
  totalRentPerSqFt: number;
  annualRevenue: number;
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  tenantResponsibilities: string[];
  landlordResponsibilities: string[];
  operatingExpenses: OperatingExpenseBreakdown;
  metrics: {
    occupancyRate: number;
    expenseRecovery: number;  // Amount recovered from tenants
    netEffectiveRent: number; // After expenses and recoveries
    cashflow: number;
  };
}

export enum CommercialPropertyType {
  Office = 'office',
  Retail = 'retail',
  MedicalOffice = 'medical_office',
  Industrial = 'industrial',
  MixedUse = 'mixed_use',
  ShoppingCenter = 'shopping_center',
  Warehouse = 'warehouse'
}

export interface CommercialAnalysis {
  propertyType: CommercialPropertyType;      // Office, Retail, Industrial, Mixed-Use, etc.
  buildingClass: string;     // A, B, C, etc.
  metrics: CommercialMetrics;
  expenses: CommercialExpenses;
  leaseType: string;         // NNN, Modified Gross, Full Service
  tenantMix?: {             // Optional tenant mix analysis
    numberOfTenants: number;
    majorTenants: string[];
    industryDiversification: string[];
  };
  marketAnalysis: {
    submarket: string;
    comparableRents: number[];
    marketVacancy: number;
    absorption: number;
  };
  riskAnalysis: {
    tenantCreditRisk: string;
    marketRisk: string;
    propertyCondition: string;
    locationRisk: string;
  };
}

// Commercial property rent rates (per sqft per year)
export const commercialRentRates: Record<CommercialPropertyType, number> = {
  office: 65,
  retail: 55,
  medical_office: 70,
  industrial: 35,
  mixed_use: 60,
  shopping_center: 50,
  warehouse: 30,
};
