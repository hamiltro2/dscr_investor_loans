// Property Search Request Types
export interface PropertySearchRequest {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  bestMatch?: boolean;
}

// Property Address Types
export interface PropertyAddress {
  streetAddress: string;
  propertyStreetAddressParsed?: any;
  city: string;
  state: string;
  zipCode: string;
  zipPlus4?: string;
  unitType?: string;
  unitNumber?: string;
}

// Property APN Types
export interface PropertyAPN {
  fipsCode: string;
  apnSequenceNumber?: string;
  apnParcelNumberUnformatted: string;
  apnParcelNumberFormatted: string;
  previousApnUnformatted?: string;
  universalParcelId?: string;
}

// Address Match Information Types
export interface AddressMatchInformation {
  propertyMatchScore: number; // 0-10
  resultCode: string;
  matchCode: string;
  addressType: 'PROPERTY' | 'RELATED' | 'ALIAS';
  addressMatchCode: string;
  addressMatchDescription: string;
}

// Property Search Response Item Types
export interface PropertySearchResponseItem {
  clip: string;
  v1PropertyId: string;
  propertyAddress: PropertyAddress;
  propertyAPN: PropertyAPN;
  addressMatchInformation: AddressMatchInformation;
}

// Property Search Response Types
export interface PropertySearchResponse {
  metadata: {
    totalCount: number;
  };
  items: PropertySearchResponseItem[];
  messages?: string[];
}

// Property Details Types
export interface PropertyDetails {
  propertyId: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
  };
  characteristics: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    lotSize: number;
    propertyType: string;
    stories: number;
    parking: string;
    construction: string;
  };
  valuation: {
    lastSalePrice: number;
    lastSaleDate: string;
    estimatedValue: number;
    estimatedRent: number;
  };
  taxes: {
    assessedValue: number;
    taxRate: number;
    annualTaxAmount: number;
    taxYear: number;
  };
}

// Transaction History Types
export interface Transaction {
  saleDate: string;
  salePrice: number;
  buyerNames: string[];
  sellerNames: string[];
  documentType: string;
  recordingDate: string;
  documentNumber: string;
}

export interface TransactionHistory {
  propertyId: string;
  transactions: Transaction[];
}

// Property Comparables Types
export interface Comparable {
  propertyId: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
  characteristics: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
  };
  lastSaleInfo: {
    saleDate: string;
    salePrice: number;
  };
  distanceInMiles: number;
  similarityScore: number;
}

export interface ComparableProperties {
  propertyId: string;
  comparables: Comparable[];
}

// Investment Metrics Types
export interface InvestmentMetrics {
  estimatedMonthlyRent: number;
  estimatedValue: number;
  lastSalePrice: number;
  annualTaxes: number;
  pricePerSqFt: number;
  averageCompPrice: number;
  priceAppreciation: number;
  
  // DSCR Loan Calculations
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  monthlyMortgage: number;
  monthlyInsurance: number;
  monthlyTaxes: number;
  monthlyHOA: number;
  monthlyUtilities: number;
  monthlyMaintenance: number;
  monthlyVacancy: number;
  monthlyPropertyManagement: number;
  
  // Investment Returns
  grossMonthlyIncome: number;
  grossAnnualIncome: number;
  totalMonthlyExpenses: number;
  totalAnnualExpenses: number;
  netOperatingIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  dscr: number;
  returnOnInvestment: number;
  breakEvenMonths: number;
}

export interface InvestmentRecommendation {
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  confidence: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: string[];
  suggestedStrategy: string;
  additionalNotes: string[];
}

// API Response Types
export interface ApiError {
  status: number;
  message: string;
  details?: string;
}
