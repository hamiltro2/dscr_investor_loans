import { PropertyDetail } from '@/types/attom';
import { InvestmentMetrics, CommercialInvestmentMetrics } from '@/types/investment';
import { formatCurrency } from './format';
import attomAPI from './attom';

interface FinancialProjection {
  year: number;
  grossRent: number;
  vacancy: number;
  effectiveGrossIncome: number;
  operatingExpenses: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    management: number;
    total: number;
  };
  netOperatingIncome: number;
  debtService: number;
  cashFlow: number;
  capRate: number;
  cashOnCash: number;
  totalReturn: number;
}

interface DeepseekResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface MarketAnalysis {
  propertyType: 'residential' | 'commercial';
  marketTrends: {
    demandLevel: string;
    priceGrowth: string;
    rentalDemand: string;
    seasonality: string;
    submarket?: string;
  };
  investmentAnalysis: {
    strengthScore: number;
    riskScore: number;
    returnPotential: 'high' | 'medium' | 'low';
    holdingPeriod: string;
    exitStrategy: string[];
  };
  financials: {
    currentValue: number;
    projectedValue: number;
    annualAppreciation: number;
    rentGrowth: number;
    expenseGrowth: number;
    projections?: FinancialProjection[];
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
  comparableProperties?: {
    recentSales: string[];
    activeListings: string[];
    rentalComps: string[];
  };
  commercialSpecific?: {
    tenantMix: string[];
    leaseStructure: string;
    propertyClass: string;
    marketPosition: string;
    competitiveAdvantages: string[];
    improvements: string[];
  };
  provider: 'deepseek' | 'openai';
}

async function analyzeWithOpenAI(prompt: string): Promise<MarketAnalysis> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 second timeout
    
    // Simplify the prompt to reduce token count and processing time
    const simplifiedPrompt = prompt.length > 4000 
      ? prompt.substring(0, 4000) + "\n\n[Content truncated for brevity]" 
      : prompt;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: [
          {
            role: "system",
            content: "You are an expert real estate investment analyst. Analyze property data and provide insights in JSON format. Be concise. Do not use markdown formatting."
          },
          {
            role: "user",
            content: `Analyze this property investment opportunity and provide a response in JSON format:
{
  "propertyType": "residential" | "commercial",
  "marketTrends": {
    "demandLevel": string,
    "priceGrowth": string,
    "rentalDemand": string,
    "seasonality": string,
    "submarket": string
  },
  "investmentAnalysis": {
    "strengthScore": number (0-100),
    "riskScore": number (0-100),
    "returnPotential": "high" | "medium" | "low",
    "holdingPeriod": string,
    "exitStrategy": string[]
  },
  "financials": {
    "currentValue": number,
    "projectedValue": number,
    "annualAppreciation": number,
    "rentGrowth": number,
    "expenseGrowth": number,
    "keyMetrics": {
      "currentCapRate": number,
      "proFormaCapRate": number,
      "cashOnCash": number,
      "internalRateOfReturn": number,
      "returnOnInvestment": number,
      "breakEvenMonths": number,
      "debtServiceCoverage": number,
      "grossRentMultiplier": number
    }
  },
  "riskFactors": string[],
  "opportunities": string[],
  "recommendations": string[]
}

Here is the property data to analyze:

${simplifiedPrompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    let analysis: Omit<MarketAnalysis, 'provider'>;

    try {
      // Parse the JSON response
      const content = data.choices[0].message.content;
      analysis = JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', data.choices[0].message.content);
      throw new Error('Invalid JSON response from OpenAI');
    }
    
    return {
      ...analysis,
      provider: 'openai'
    };
  } catch (error) {
    console.error('OpenAI analysis failed:', error);
    
    // Return a default analysis if the API call fails
    return createDefaultAnalysis();
  }
}

async function analyzeWithDeepseek(prompt: string): Promise<MarketAnalysis> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // Increase timeout to 55 seconds
    
    // Simplify the prompt to reduce token count and processing time
    const simplifiedPrompt = prompt.length > 4000 
      ? prompt.substring(0, 4000) + "\n\n[Content truncated for brevity]" 
      : prompt;
    
    const response = await fetch(process.env.DEEPSEEK_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an expert real estate investment analyst. Analyze property data and provide insights in JSON format. Be concise. Do not use markdown formatting."
          },
          {
            role: "user",
            content: `Analyze this property investment opportunity and provide a response in JSON format:
{
  "propertyType": "residential" | "commercial",
  "marketTrends": {
    "demandLevel": string,
    "priceGrowth": string,
    "rentalDemand": string,
    "seasonality": string,
    "submarket": string
  },
  "investmentAnalysis": {
    "strengthScore": number (0-100),
    "riskScore": number (0-100),
    "returnPotential": "high" | "medium" | "low",
    "holdingPeriod": string,
    "exitStrategy": string[]
  },
  "financials": {
    "currentValue": number,
    "projectedValue": number,
    "annualAppreciation": number,
    "rentGrowth": number,
    "expenseGrowth": number,
    "keyMetrics": {
      "currentCapRate": number,
      "proFormaCapRate": number,
      "cashOnCash": number,
      "internalRateOfReturn": number,
      "returnOnInvestment": number,
      "breakEvenMonths": number,
      "debtServiceCoverage": number,
      "grossRentMultiplier": number
    }
  },
  "riskFactors": string[],
  "opportunities": string[],
  "recommendations": string[]
}

Here is the property data to analyze:

${simplifiedPrompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.statusText}`);
    }

    const data = await response.json() as DeepseekResponse;
    let analysis: Omit<MarketAnalysis, 'provider'>;

    try {
      // Extract JSON from markdown if present
      const content = data.choices[0].message.content;
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      
      analysis = JSON.parse(jsonStr);
    } catch (error) {
      console.error('Failed to parse Deepseek response:', data.choices[0].message.content);
      throw new Error('Invalid JSON response from Deepseek');
    }
    
    return {
      ...analysis,
      provider: 'deepseek'
    };
  } catch (error) {
    console.error('Deepseek analysis failed:', error);
    
    // Return a default analysis if the API call fails
    return createDefaultAnalysis();
  }
}

/**
 * Calculates the projected property value based on annual appreciation
 * @param currentValue The current property value
 * @param years Number of years to project
 * @param annualAppreciationRate Annual appreciation rate (default: 3%)
 * @returns Projected property value
 */
export function calculateProjectedValue(
  currentValue: number, 
  years: number, 
  annualAppreciationRate: number = 3
): number {
  return currentValue * Math.pow(1 + annualAppreciationRate / 100, years);
}

function calculateProjections(
  metrics: InvestmentMetrics,
  isCommercial: boolean,
  marketGrowth: number
): {
  projections: FinancialProjection[];
  keyMetrics: MarketAnalysis['financials']['keyMetrics'];
} {
  const projections: FinancialProjection[] = [];
  const years = 5;
  const rentGrowth = isCommercial ? 0.03 : 0.04; // 3% commercial, 4% residential
  const expenseGrowth = 0.03; // 3% annual expense growth
  const propertyAppreciation = marketGrowth || 0.04; // Use market growth or default to 4%

  let currentValue = metrics.propertyValue || 0;
  let currentRent = (metrics.estimatedMonthlyRent || 0) * 12;
  
  for (let year = 1; year <= years; year++) {
    const grossRent = currentRent * Math.pow(1 + rentGrowth, year - 1);
    const vacancy = grossRent * (isCommercial ? 0.08 : 0.05); // 8% commercial, 5% residential
    const effectiveGrossIncome = grossRent - vacancy;

    // Calculate operating expenses with growth
    const expenseBase = Math.pow(1 + expenseGrowth, year - 1);
    const operatingExpenses = {
      propertyTax: (currentValue * 0.012) * expenseBase, // 1.2% of value
      insurance: (currentValue * 0.005) * expenseBase, // 0.5% of value
      utilities: (isCommercial ? 6000 : 2400) * expenseBase, // $500 or $200 monthly
      maintenance: grossRent * (isCommercial ? 0.10 : 0.08) * expenseBase,
      management: effectiveGrossIncome * (isCommercial ? 0.06 : 0.08) * expenseBase,
      total: 0
    };
    
    operatingExpenses.total = Object.values(operatingExpenses).reduce((sum, exp) => sum + exp, 0);

    const netOperatingIncome = effectiveGrossIncome - operatingExpenses.total;
    const debtService = (metrics.monthlyMortgage || 0) * 12;
    const cashFlow = netOperatingIncome - debtService;
    
    // Calculate property value for this year
    currentValue = calculateProjectedValue(metrics.propertyValue || 0, year);
    
    projections.push({
      year,
      grossRent,
      vacancy,
      effectiveGrossIncome,
      operatingExpenses,
      netOperatingIncome,
      debtService,
      cashFlow,
      capRate: (netOperatingIncome / currentValue) * 100,
      cashOnCash: (cashFlow / (metrics.downPayment || 1)) * 100,
      totalReturn: ((cashFlow + (currentValue - (metrics.propertyValue || 0)) / years) / (metrics.downPayment || 1)) * 100
    });
  }

  // Calculate key metrics
  const firstYear = projections[0];
  const lastYear = projections[years - 1];
  
  const keyMetrics = {
    currentCapRate: (firstYear.netOperatingIncome / (metrics.propertyValue || 1)) * 100,
    proFormaCapRate: (lastYear.netOperatingIncome / lastYear.grossRent) * 100,
    cashOnCash: firstYear.cashOnCash,
    internalRateOfReturn: calculateIRR(projections, metrics),
    returnOnInvestment: ((lastYear.cashFlow * years) / (metrics.downPayment || 1)) * 100,
    breakEvenMonths: (metrics.downPayment || 1) / (firstYear.cashFlow / 12),
    debtServiceCoverage: firstYear.netOperatingIncome / firstYear.debtService,
    grossRentMultiplier: (metrics.propertyValue || 1) / firstYear.grossRent
  };

  return { projections, keyMetrics };
}

function calculateIRR(projections: FinancialProjection[], metrics: InvestmentMetrics): number {
  // Simple IRR calculation - can be enhanced with more sophisticated methods
  const totalCashFlow = projections.reduce((sum, proj) => sum + proj.cashFlow, 0);
  const averageAnnualCashFlow = totalCashFlow / projections.length;
  const estimatedAppreciation = ((metrics.propertyValue || 0) * 0.04) * projections.length; // Assuming 4% annual appreciation
  
  return ((averageAnnualCashFlow + estimatedAppreciation / projections.length) / ((metrics.downPayment || 1) || 1)) * 100;
}

export async function analyzePropertyInvestment(
  property: PropertyDetail,
  metrics: InvestmentMetrics,
  rentalStrategies: any
): Promise<MarketAnalysis> {
  // Format the property data for the LLM
  const propertyDescription = `
Property Details:
Address: ${property.address?.oneLine || 'Not specified'}
Type: ${property.summary?.proptype || 'Not specified'}
Year Built: ${property.summary?.yearbuilt || 'Not specified'}
Bedrooms: ${property.building?.rooms?.beds || 'Not specified'}
Bathrooms: ${property.building?.rooms?.bathstotal || 'Not specified'}
Square Footage: ${property.building?.size?.universalsize || 'Not specified'}
Lot Size: ${property.lot?.lotsize || 'Not specified'} sqft

Purchase Info:
Purchase Price: ${formatCurrency(metrics.purchasePrice || 0)}
Down Payment: ${formatCurrency(metrics.downPayment || 0)} (${((metrics.downPaymentPercent || 0) * 100).toFixed(1)}%)
Loan Amount: ${formatCurrency(metrics.loanAmount || 0)}
Interest Rate: ${metrics.interestRate || 0}%
Monthly Mortgage: ${formatCurrency(metrics.monthlyMortgage || 0)}

Rental Income:
Monthly Rent: ${formatCurrency(metrics.estimatedMonthlyRent || 0)}
Annual Rent: ${formatCurrency((metrics.estimatedMonthlyRent || 0) * 12)}
Occupancy Rate: ${metrics.occupancyRate || 95}%`;

  const financialMetrics = `
Purchase Price: ${formatCurrency(metrics.purchasePrice || 0)}
Down Payment: ${formatCurrency(metrics.downPayment || 0)} (${((metrics.downPaymentPercent || 0) * 100).toFixed(1)}%)
Loan Amount: ${formatCurrency(metrics.loanAmount || 0)}
Monthly Mortgage: ${formatCurrency(metrics.monthlyMortgage || 0)}
Monthly Rent: ${formatCurrency(metrics.estimatedMonthlyRent || 0)}
Monthly Cash Flow: ${formatCurrency(metrics.monthlyCashFlow || 0)}
Cap Rate: ${(metrics.capRate || 0).toFixed(2)}%
Cash on Cash Return: ${(metrics.cashOnCashReturn || 0).toFixed(2)}%
DSCR: ${(metrics.dscr || 0).toFixed(2)}
Break-Even: ${metrics.breakEvenMonths || 0} months`;

  const projectionSummary = `
Year 1: Property Value: ${formatCurrency(calculateProjectedValue(metrics.propertyValue || 0, 1))}
Year 3: Property Value: ${formatCurrency(calculateProjectedValue(metrics.propertyValue || 0, 3))}
Year 5: Property Value: ${formatCurrency(calculateProjectedValue(metrics.propertyValue || 0, 5))}`;

  const prompt = `Analyze this real estate investment opportunity:

Property Details:
${propertyDescription}

Financial Analysis:
${financialMetrics}

5-Year Projections:
${projectionSummary}

Provide a detailed investment analysis including:
1. Market strength (score 0-100)
2. Risk assessment (score 0-100)
3. Key advantages and disadvantages
4. Specific recommendations on:
   - Hold period
   - Exit strategy
   - Value-add opportunities
5. Current market trends affecting this property`;

  try {
    // Create a timeout promise
    const timeoutPromise = new Promise<MarketAnalysis>((resolve) => {
      setTimeout(() => {
        console.log('Property analysis timed out, using default analysis');
        resolve(createDefaultAnalysis());
      }, 60000); // Increase timeout to 60 seconds to allow more time for LLM response
    });

    // Create the actual analysis promise
    const analysisPromise = analyzeWithOpenAI(prompt);

    // Race the timeout against the analysis
    const analysis = await Promise.race([analysisPromise, timeoutPromise]);
    
    // Fill in any missing data from the analysis with calculated values
    return {
      ...analysis,
      financials: {
        ...analysis.financials,
        currentValue: analysis.financials?.currentValue || metrics.propertyValue || 0,
        projectedValue: analysis.financials?.projectedValue || calculateProjectedValue(metrics.propertyValue || 0, 5),
        annualAppreciation: analysis.financials?.annualAppreciation || 3,
        rentGrowth: analysis.financials?.rentGrowth || 3,
        expenseGrowth: analysis.financials?.expenseGrowth || 3,
        keyMetrics: {
          ...analysis.financials?.keyMetrics,
          currentCapRate: analysis.financials?.keyMetrics?.currentCapRate || metrics.capRate || 0,
          proFormaCapRate: analysis.financials?.keyMetrics?.proFormaCapRate || 0,
          cashOnCash: analysis.financials?.keyMetrics?.cashOnCash || metrics.cashOnCashReturn || 0,
          internalRateOfReturn: analysis.financials?.keyMetrics?.internalRateOfReturn || 0,
          returnOnInvestment: analysis.financials?.keyMetrics?.returnOnInvestment || 0,
          debtServiceCoverage: analysis.financials?.keyMetrics?.debtServiceCoverage || metrics.dscr || 0,
          breakEvenMonths: analysis.financials?.keyMetrics?.breakEvenMonths || metrics.breakEvenMonths || 0,
          grossRentMultiplier: analysis.financials?.keyMetrics?.grossRentMultiplier || 0
        }
      }
    };
  } catch (error) {
    console.error('Analysis error:', error);
    return createDefaultAnalysis();
  }
}

function formatProjections(projections: FinancialProjection[]): string {
  return projections.map(p => `
Year ${p.year}:
- Gross Rent: $${p.grossRent.toLocaleString()}
- NOI: $${p.netOperatingIncome.toLocaleString()}
- Cash Flow: $${p.cashFlow.toLocaleString()}
- Cap Rate: ${p.capRate.toFixed(2)}%
- Cash on Cash: ${p.cashOnCash.toFixed(2)}%`).join('\n');
}

function formatPropertyDetails(property: PropertyDetail, isCommercial: boolean): string {
  const building = property.building || {};
  const assessment = property.assessment?.assessed || {};
  const summary = property.summary || {};
  
  const commonDetails = `
- Address: ${property.address?.oneLine || 'Not specified'}
- Year Built: ${building.yearBuilt || 'N/A'}
- Building Size: ${building.size?.bldgsize || 'N/A'} sqft
- Lot Size: ${property.lot?.lotsize || 'N/A'} sqft
- Condition: ${building.condition || 'N/A'}
- Last Sale: ${property.sale?.saleDate || 'N/A'} for ${property.sale?.amount || 'N/A'}
- Assessed Value: ${assessment.assdTtlValue || 'N/A'}`;

  if (isCommercial) {
    return `${commonDetails}
- Property Type: ${summary.proptype || 'Commercial'}
- Stories: ${building.construction?.stories || 'N/A'}
- Construction: ${building.construction?.walls || 'N/A'}
- Parking Spaces: ${building.parking?.prkgSpaces || 'N/A'}
- Zoning: ${property.area?.zoning || 'N/A'}`;
  }

  return `${commonDetails}
- Bedrooms: ${building.rooms?.beds || 'N/A'}
- Bathrooms: ${building.rooms?.bathstotal || 'N/A'}
- Garage: ${building.parking?.prkgType || 'N/A'}
- Property Type: ${summary.proptype || 'Residential'}`;
}

function formatFinancialMetrics(
  metrics: InvestmentMetrics,
  isCommercial: boolean
): string {
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const formatPercent = (value: number | null | undefined) => {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    return value.toFixed(2) + '%';
  };

  const propertyValue = metrics.propertyValue || 0;
  const monthlyRent = metrics.estimatedMonthlyRent || 0;
  const annualRent = monthlyRent * 12;
  const downPayment = metrics.downPayment || 0;
  const loanAmount = metrics.loanAmount || 0;
  const monthlyMortgage = metrics.monthlyMortgage || 0;
  const monthlyInsurance = metrics.monthlyInsurance || 0;
  const monthlyTaxes = propertyValue * 0.012 / 12; // Assuming 1.2% annual property tax rate
  const monthlyUtilities = metrics.monthlyUtilities || 0;
  const monthlyMaintenance = metrics.monthlyMaintenance || 0;
  const monthlyVacancy = metrics.monthlyVacancy || 0;
  const monthlyManagement = metrics.monthlyManagement || 0;
  const monthlyHoaFees = metrics.monthlyHOA || 0;

  const monthlyExpenses = {
    mortgage: monthlyMortgage,
    tax: monthlyTaxes,
    insurance: monthlyInsurance,
    utilities: monthlyUtilities,
    maintenance: monthlyMaintenance,
    vacancy: monthlyVacancy,
    management: monthlyManagement,
    hoa: monthlyHoaFees
  };
  
  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((a, b) => a + b, 0);
  const monthlyCashFlow = (metrics.grossMonthlyIncome || 0) - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const noi = metrics.netOperatingIncome || 0;
  
  const keyMetrics = {
    capRate: metrics.capRate || 0,
    cashOnCashReturn: metrics.cashOnCashReturn || 0,
    dscr: metrics.dscr || 0,
    roi: metrics.returnOnInvestment || 0,
    breakEvenMonths: metrics.breakEvenMonths || 0
  };

  if (isCommercial) {
    // Cast to CommercialInvestmentMetrics to access commercial-specific properties
    const commercialMetrics = metrics as CommercialInvestmentMetrics;
    const squareFeet = commercialMetrics.squareFeet || 0;
    
    return `
Purchase Price: ${formatCurrency(propertyValue)}
Building Size: ${squareFeet} sqft
Price per Sqft: ${formatCurrency(propertyValue / (squareFeet || 1))}
Cap Rate: ${formatPercent(keyMetrics.capRate)}
NOI: ${formatCurrency(noi)}
Annual Rent: ${formatCurrency(annualRent)}
Rent per Sqft: ${formatCurrency(annualRent / (squareFeet || 1))}
Occupancy: ${formatPercent(metrics.occupancyRate || 95)}
Lease Type: ${commercialMetrics.leaseType || 'NNN'}
Tenant Quality: High
Loan Amount: ${formatCurrency(loanAmount)}
Down Payment: ${formatCurrency(downPayment)} (${formatPercent(downPayment / propertyValue * 100)})
Interest Rate: ${formatPercent(metrics.interestRate || 0)}
Loan Term: 30 years
DSCR: ${formatPercent(keyMetrics.dscr)}
Cash on Cash: ${formatPercent(keyMetrics.cashOnCashReturn)}
Monthly Cash Flow: ${formatCurrency(monthlyCashFlow)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
ROI: ${formatPercent(keyMetrics.roi)}`;
  }

  return `
Purchase Price: ${formatCurrency(propertyValue)}
Monthly Rent: ${formatCurrency(monthlyRent)}
Annual Rent: ${formatCurrency(annualRent)}
Gross Rent Multiplier: ${(propertyValue / annualRent).toFixed(2)}
Cap Rate: ${formatPercent(keyMetrics.capRate)}
NOI: ${formatCurrency(noi)}
Loan Amount: ${formatCurrency(loanAmount)}
Down Payment: ${formatCurrency(downPayment)} (${formatPercent(downPayment / propertyValue * 100)})
Interest Rate: ${formatPercent(metrics.interestRate || 0)}
Loan Term: 30 years
Monthly Mortgage: ${formatCurrency(monthlyMortgage)}
Monthly Expenses:
- Property Tax: ${formatCurrency(monthlyTaxes)}
- Insurance: ${formatCurrency(monthlyInsurance)}
- Utilities: ${formatCurrency(monthlyUtilities)}
- Maintenance: ${formatCurrency(monthlyMaintenance)}
- Vacancy: ${formatCurrency(monthlyVacancy)}
- Management: ${formatCurrency(monthlyManagement)}
- HOA: ${formatCurrency(monthlyHoaFees)}
Total Monthly Expenses: ${formatCurrency(totalMonthlyExpenses)}
Monthly Cash Flow: ${formatCurrency(monthlyCashFlow)}
Annual Cash Flow: ${formatCurrency(annualCashFlow)}
Cash on Cash Return: ${formatPercent(keyMetrics.cashOnCashReturn)}
DSCR: ${formatPercent(keyMetrics.dscr)}
Break-Even: ${keyMetrics.breakEvenMonths.toFixed(1)} months`;
}

function createDefaultAnalysis(): MarketAnalysis {
  return {
    propertyType: 'residential',
    marketTrends: {
      demandLevel: 'Moderate',
      priceGrowth: 'Stable',
      rentalDemand: 'Moderate to Strong',
      seasonality: 'Low seasonal variation',
      submarket: 'Established residential area'
    },
    investmentAnalysis: {
      strengthScore: 70,  // Slightly more optimistic default
      riskScore: 35,      // Slightly lower risk
      returnPotential: 'medium',
      holdingPeriod: '5-7 years',
      exitStrategy: ['Traditional sale', 'Refinance', 'Rental income']
    },
    financials: {
      currentValue: 0,    // Will be filled in with actual metrics
      projectedValue: 0,  // Will be filled in with actual metrics
      annualAppreciation: 3.5,  // Align with the calculateProjectedValue function
      rentGrowth: 2.5,
      expenseGrowth: 2.5,
      projections: [],
      keyMetrics: {
        currentCapRate: 0,
        proFormaCapRate: 0,
        cashOnCash: 0,
        internalRateOfReturn: 0,
        returnOnInvestment: 0,
        breakEvenMonths: 0,
        debtServiceCoverage: 0,
        grossRentMultiplier: 0
      }
    },
    riskFactors: [
      'Market volatility', 
      'Potential maintenance issues', 
      'Interest rate fluctuations',
      'Vacancy risk'
    ],
    opportunities: [
      'Value-add potential', 
      'Rental income optimization', 
      'Long-term appreciation',
      'Multiple rental strategies available'
    ],
    recommendations: [
      'Consider all available rental strategies',
      'Evaluate property condition thoroughly', 
      'Analyze local market trends',
      'Review financing options for optimal returns'
    ],
    provider: 'deepseek'
  };
}
