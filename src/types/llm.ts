export interface DeepseekResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface MarketAnalysis {
  propertyType: "residential" | "commercial";
  marketTrends: {
    demandLevel: string;
    priceGrowth: string;
    rentalDemand: string;
    seasonality: string;
    submarket: string;
  };
  investmentAnalysis: {
    strengthScore: number;
    riskScore: number;
    returnPotential: "high" | "medium" | "low";
    holdingPeriod: string;
    exitStrategy: string[];
  };
  financials: {
    currentValue: number;
    projectedValue: number;
    annualAppreciation: number;
    rentGrowth: number;
    expenseGrowth: number;
    keyMetrics: {
      currentCapRate: number;
      proFormaCapRate: number;
      cashOnCash: number;
      internalRateOfReturn: number;
      returnOnInvestment: number;
      breakEvenMonths: number;
      debtServiceCoverage: number;
      grossRentMultiplier: number;
    };
  };
  riskFactors: string[];
  opportunities: string[];
  recommendations: string[];
  provider: 'deepseek' | 'openai';
}
