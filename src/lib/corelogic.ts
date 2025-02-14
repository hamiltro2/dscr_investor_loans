import { 
  PropertySearchRequest, 
  PropertySearchResponse,
  PropertyDetails,
  TransactionHistory,
  ComparableProperties,
  ApiError,
  InvestmentMetrics,
  InvestmentRecommendation
} from '@/types/corelogic';

export class CoreLogicAPI {
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_CORELOGIC_API_URL || 'https://api-uat.corelogic.com';
  }

  private async getAccessToken(): Promise<string> {
    try {
      // Check if we have a valid token
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      console.log('Getting access token from:', `${this.baseUrl}/oauth/token`);

      const response = await fetch('/api/corelogic/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token request failed: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      if (!data.access_token) {
        throw new Error('No access token in response');
      }

      this.accessToken = data.access_token;
      // Set token expiry to 5 minutes before actual expiry to ensure we refresh in time
      this.tokenExpiry = Date.now() + ((data.expires_in - 300) * 1000);

      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  private async apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CoreLogic-ClientId': process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_ID || ''
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async searchProperty(request: PropertySearchRequest): Promise<PropertySearchResponse> {
    try {
      return await this.apiRequest<PropertySearchResponse>('/property/v2/search', {
        method: 'POST',
        body: JSON.stringify(request)
      });
    } catch (error) {
      console.error('Property search failed:', error);
      throw error;
    }
  }

  async getPropertyDetails(propertyId: string): Promise<PropertyDetails> {
    return this.apiRequest(`/property/${propertyId}`);
  }

  async getTransactionHistory(propertyId: string): Promise<TransactionHistory> {
    return this.apiRequest(`/property/${propertyId}/transactions`);
  }

  async getComparableProperties(propertyId: string): Promise<ComparableProperties> {
    return this.apiRequest(`/property/${propertyId}/comparables`);
  }

  async analyzeInvestmentPotential(propertyId: string): Promise<{
    property: PropertyDetails;
    metrics: InvestmentMetrics;
    history: TransactionHistory;
    comparables: ComparableProperties;
    recommendation: InvestmentRecommendation;
  }> {
    const [property, history, comparables] = await Promise.all([
      this.getPropertyDetails(propertyId),
      this.getTransactionHistory(propertyId),
      this.getComparableProperties(propertyId)
    ]);

    // Calculate investment metrics
    const metrics: InvestmentMetrics = {
      estimatedMonthlyRent: property.characteristics.estimatedMonthlyRent || 0,
      estimatedValue: property.characteristics.estimatedValue || 0,
      lastSalePrice: history.transactions[0]?.salePrice || 0,
      annualTaxes: property.characteristics.annualTaxAmount || 0,
      pricePerSqFt: property.characteristics.estimatedValue / property.characteristics.squareFeet || 0,
      averageCompPrice: comparables.comparables.reduce((sum, comp) => sum + comp.lastSaleInfo.salePrice, 0) / comparables.comparables.length,
      priceAppreciation: calculatePriceAppreciation(history.transactions),
      dscr: calculateDSCR(property.characteristics.estimatedMonthlyRent, calculateMonthlyExpenses(property)),
      capRate: calculateCapRate(property.characteristics.estimatedMonthlyRent * 12, property.characteristics.estimatedValue),
      cashOnCashReturn: calculateCashOnCashReturn(property),
      monthlyCashFlow: calculateMonthlyCashFlow(property),
      grossMonthlyIncome: property.characteristics.estimatedMonthlyRent || 0,
      monthlyMortgage: calculateMonthlyMortgage(property.characteristics.estimatedValue),
      monthlyTaxes: (property.characteristics.annualTaxAmount || 0) / 12,
      monthlyInsurance: calculateMonthlyInsurance(property.characteristics.estimatedValue),
      monthlyMaintenance: calculateMonthlyMaintenance(property.characteristics.estimatedValue),
      monthlyVacancy: calculateMonthlyVacancy(property.characteristics.estimatedMonthlyRent),
      monthlyPropertyManagement: calculateMonthlyPropertyManagement(property.characteristics.estimatedMonthlyRent),
      totalMonthlyExpenses: 0, // Will be calculated below
      downPayment: property.characteristics.estimatedValue * 0.25,
      loanAmount: property.characteristics.estimatedValue * 0.75,
      annualCashFlow: 0, // Will be calculated below
      breakEvenMonths: 0, // Will be calculated below
    };

    // Calculate total monthly expenses
    metrics.totalMonthlyExpenses = 
      metrics.monthlyMortgage +
      metrics.monthlyTaxes +
      metrics.monthlyInsurance +
      metrics.monthlyMaintenance +
      metrics.monthlyVacancy +
      metrics.monthlyPropertyManagement;

    // Calculate annual cash flow
    metrics.annualCashFlow = (metrics.grossMonthlyIncome - metrics.totalMonthlyExpenses) * 12;

    // Calculate break-even months
    metrics.breakEvenMonths = Math.ceil(metrics.downPayment / (metrics.grossMonthlyIncome - metrics.totalMonthlyExpenses));

    // Generate investment recommendation
    const recommendation = generateInvestmentRecommendation(property, metrics, history, comparables);

    return {
      property,
      metrics,
      history,
      comparables,
      recommendation
    };
  }
}

// Helper functions for calculations
function calculatePriceAppreciation(transactions: TransactionHistory['transactions']): number {
  if (transactions.length < 2) return 0;
  const oldestPrice = transactions[transactions.length - 1].salePrice;
  const newestPrice = transactions[0].salePrice;
  const yearsDiff = (new Date(transactions[0].saleDate).getTime() - new Date(transactions[transactions.length - 1].saleDate).getTime()) / (1000 * 60 * 60 * 24 * 365);
  return ((newestPrice - oldestPrice) / oldestPrice) / yearsDiff * 100;
}

function calculateMonthlyExpenses(property: PropertyDetails): number {
  const value = property.characteristics.estimatedValue;
  return calculateMonthlyMortgage(value) +
    (property.characteristics.annualTaxAmount || 0) / 12 +
    calculateMonthlyInsurance(value) +
    calculateMonthlyMaintenance(value) +
    calculateMonthlyVacancy(property.characteristics.estimatedMonthlyRent) +
    calculateMonthlyPropertyManagement(property.characteristics.estimatedMonthlyRent);
}

function calculateDSCR(monthlyRent: number, monthlyExpenses: number): number {
  return monthlyRent / monthlyExpenses;
}

function calculateCapRate(annualIncome: number, propertyValue: number): number {
  return (annualIncome / propertyValue) * 100;
}

function calculateCashOnCashReturn(property: PropertyDetails): number {
  const monthlyRent = property.characteristics.estimatedMonthlyRent;
  const monthlyExpenses = calculateMonthlyExpenses(property);
  const annualCashFlow = (monthlyRent - monthlyExpenses) * 12;
  const downPayment = property.characteristics.estimatedValue * 0.25;
  return (annualCashFlow / downPayment) * 100;
}

function calculateMonthlyCashFlow(property: PropertyDetails): number {
  return property.characteristics.estimatedMonthlyRent - calculateMonthlyExpenses(property);
}

function calculateMonthlyMortgage(propertyValue: number): number {
  const loanAmount = propertyValue * 0.75; // 75% LTV
  const annualRate = 0.07; // 7% interest rate
  const monthlyRate = annualRate / 12;
  const terms = 30 * 12; // 30-year mortgage
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, terms)) / (Math.pow(1 + monthlyRate, terms) - 1);
}

function calculateMonthlyInsurance(propertyValue: number): number {
  return (propertyValue * 0.005) / 12; // 0.5% of property value annually
}

function calculateMonthlyMaintenance(propertyValue: number): number {
  return (propertyValue * 0.01) / 12; // 1% of property value annually
}

function calculateMonthlyVacancy(monthlyRent: number): number {
  return monthlyRent * 0.08; // 8% vacancy rate
}

function calculateMonthlyPropertyManagement(monthlyRent: number): number {
  return monthlyRent * 0.1; // 10% property management fee
}

function generateInvestmentRecommendation(
  property: PropertyDetails,
  metrics: InvestmentMetrics,
  history: TransactionHistory,
  comparables: ComparableProperties
): InvestmentRecommendation {
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const risks: string[] = [];
  const additionalNotes: string[] = [];

  // Analyze DSCR
  if (metrics.dscr >= 1.25) {
    strengths.push(`Strong DSCR of ${metrics.dscr.toFixed(2)} indicates good debt service coverage`);
  } else if (metrics.dscr < 1) {
    weaknesses.push(`Low DSCR of ${metrics.dscr.toFixed(2)} indicates negative cash flow`);
  }

  // Analyze Cap Rate
  if (metrics.capRate >= 8) {
    strengths.push(`Above-market cap rate of ${metrics.capRate.toFixed(1)}%`);
  } else if (metrics.capRate < 5) {
    weaknesses.push(`Below-market cap rate of ${metrics.capRate.toFixed(1)}%`);
  }

  // Analyze Cash Flow
  if (metrics.monthlyCashFlow > 500) {
    strengths.push(`Strong positive cash flow of $${metrics.monthlyCashFlow.toFixed(0)} per month`);
  } else if (metrics.monthlyCashFlow < 0) {
    weaknesses.push(`Negative cash flow of $${metrics.monthlyCashFlow.toFixed(0)} per month`);
  }

  // Analyze Price per Square Foot
  const avgCompPricePerSqFt = metrics.averageCompPrice / property.characteristics.squareFeet;
  if (metrics.pricePerSqFt < avgCompPricePerSqFt) {
    opportunities.push(`Property is priced ${((avgCompPricePerSqFt - metrics.pricePerSqFt) / avgCompPricePerSqFt * 100).toFixed(1)}% below comparable properties`);
  }

  // Analyze Price Appreciation
  if (metrics.priceAppreciation > 5) {
    strengths.push(`Strong historical appreciation of ${metrics.priceAppreciation.toFixed(1)}% per year`);
  }

  // Analyze Property Condition and Age
  if (property.characteristics.yearBuilt && (new Date().getFullYear() - property.characteristics.yearBuilt > 30)) {
    risks.push(`Older property (${property.characteristics.yearBuilt}) may require more maintenance`);
  }

  // Generate recommendation based on analysis
  let recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' = 'Hold';
  let confidence = 0;

  // Score different aspects (0-100)
  const dscrScore = Math.min(100, metrics.dscr * 80);
  const capRateScore = Math.min(100, metrics.capRate * 12.5);
  const cashFlowScore = Math.min(100, (metrics.monthlyCashFlow + 500) / 15);
  const appreciationScore = Math.min(100, metrics.priceAppreciation * 20);

  // Calculate overall score
  const overallScore = (dscrScore + capRateScore + cashFlowScore + appreciationScore) / 4;

  if (overallScore >= 80) {
    recommendation = 'Strong Buy';
    confidence = 0.9;
  } else if (overallScore >= 60) {
    recommendation = 'Buy';
    confidence = 0.7;
  } else if (overallScore >= 40) {
    recommendation = 'Hold';
    confidence = 0.6;
  } else {
    recommendation = 'Sell';
    confidence = 0.8;
  }

  // Generate strategy based on recommendation
  let suggestedStrategy = '';
  if (recommendation.includes('Buy')) {
    suggestedStrategy = `
      Recommended Investment Strategy:
      1. Finance with a DSCR loan at 75% LTV
      2. Set aside ${(property.characteristics.estimatedValue * 0.02).toLocaleString()} for repairs and updates
      3. Target a monthly rent of $${metrics.estimatedMonthlyRent.toLocaleString()}
      4. Plan for a ${metrics.breakEvenMonths}-month break-even period
      5. Consider property management to handle tenant relations
    `;
  }

  additionalNotes.push(
    `Break-even period: ${metrics.breakEvenMonths} months`,
    `Annual cash flow: $${metrics.annualCashFlow.toLocaleString()}`,
    `Required down payment: $${metrics.downPayment.toLocaleString()}`
  );

  return {
    recommendation,
    confidence,
    strengths,
    weaknesses,
    opportunities,
    risks,
    suggestedStrategy,
    additionalNotes
  };
}

// Create a singleton instance
const coreLogicAPI = new CoreLogicAPI();
export default coreLogicAPI;
