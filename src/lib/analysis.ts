import { PropertyDetail, PropertySummary } from '@/types/attom';
import { InvestmentMetrics, RentalStrategies, AIAnalysis, RiskSeverity } from '@/types/investment';

// ... existing code

export const generateAIAnalysis = (property: PropertyDetail, metrics: InvestmentMetrics): AIAnalysis => {
  const analysis: AIAnalysis = {
    overallRecommendation: calculateOverallRecommendation(metrics),
    confidenceScore: calculateConfidenceScore(property, metrics),
    summary: generatePropertySummary(property, metrics),
    pros: generatePropertyPros(property, metrics),
    cons: generatePropertyCons(property, metrics),
    riskFactors: generateRiskFactors(property, metrics),
    opportunityAreas: generateOpportunityAreas(property, metrics),
    marketTrends: generateMarketTrends(property),
    recommendedStrategy: generateRecommendedStrategy(property, metrics),
    bestUseCase: generateBestUseCase(property, metrics),
    additionalConsiderations: generateAdditionalConsiderations(property, metrics)
  };
  return analysis;
};

const generatePropertySummary = (property: PropertyDetail, metrics: InvestmentMetrics): string => {
  const capRate = (metrics.netOperatingIncome / metrics.propertyValue) * 100;
  const cashOnCash = (metrics.cashFlow * 12) / metrics.downPayment * 100;
  
  return `This ${property.summary?.proptype || 'property'} in ${property.address?.locality || 'unknown city'}, ${property.address?.state || 'unknown state'} 
    presents a ${capRate >= 8 ? 'strong' : capRate >= 6 ? 'moderate' : 'challenging'} investment opportunity. 
    With a cap rate of ${capRate.toFixed(2)}% and cash-on-cash return of ${cashOnCash.toFixed(2)}%, 
    this property ${metrics.dscr >= 1.25 ? 'meets' : 'falls below'} standard DSCR requirements.`;
};

const generatePropertyPros = (property: PropertyDetail, metrics: InvestmentMetrics): string[] => {
  const pros: string[] = [];
  
  if (metrics.dscr >= 1.25) {
    pros.push('Strong debt service coverage ratio indicates good cash flow potential');
  }
  if (metrics.capRate >= 0.08) {
    pros.push('Above-average cap rate compared to market standards');
  }
  if (metrics.cashOnCashReturn >= 0.08) {
    pros.push('Attractive cash-on-cash return');
  }
  if (property.building?.yearBuilt && property.building.yearBuilt > 2000) {
    pros.push('Newer construction may require less maintenance');
  }
  
  return pros;
};

const generatePropertyCons = (property: PropertyDetail, metrics: InvestmentMetrics): string[] => {
  const cons: string[] = [];
  
  if (metrics.dscr < 1.25) {
    cons.push('DSCR below typical lender requirements');
  }
  if (metrics.capRate < 0.06) {
    cons.push('Below-average cap rate indicates potential cash flow challenges');
  }
  if (metrics.cashOnCashReturn < 0.06) {
    cons.push('Low cash-on-cash return may limit initial profitability');
  }
  if (property.building?.yearBuilt && property.building.yearBuilt < 1980) {
    cons.push('Older property may require significant maintenance and updates');
  }
  
  return cons;
};

const generateRiskFactors = (property: PropertyDetail, metrics: InvestmentMetrics): { factor: string; severity: RiskSeverity; description: string }[] => {
  const riskFactors: { factor: string; severity: RiskSeverity; description: string }[] = [];
  
  // Financial Risks
  if (metrics.dscr < 1.1) {
    riskFactors.push({ 
      factor: 'Low DSCR', 
      severity: 'High',
      description: 'DSCR below 1.1 indicates high risk of default'
    });
  } else if (metrics.dscr < 1.25) {
    riskFactors.push({ 
      factor: 'Marginal DSCR', 
      severity: 'Medium',
      description: 'DSCR below typical lender requirements of 1.25'
    });
  }
  
  // Property Age Risks
  if (property.building?.yearBuilt) {
    if (property.building.yearBuilt < 1960) {
      riskFactors.push({ 
        factor: 'Very Old Property', 
        severity: 'High',
        description: 'Property age over 60 years indicates high maintenance risk'
      });
    } else if (property.building.yearBuilt < 1980) {
      riskFactors.push({ 
        factor: 'Aging Property', 
        severity: 'Medium',
        description: 'Property age over 40 years may require significant updates'
      });
    }
  }
  
  // Market Risks
  if (metrics.capRate < 0.05) {
    riskFactors.push({ 
      factor: 'Low Cap Rate', 
      severity: 'High',
      description: 'Cap rate below 5% indicates potential overvaluation'
    });
  }
  
  return riskFactors;
};

const generateOpportunityAreas = (property: PropertyDetail, metrics: InvestmentMetrics): string[] => {
  const opportunities: string[] = [];
  
  if (property.summary?.proptype === 'MULTI_FAMILY') {
    opportunities.push('Potential for unit-by-unit renovation to increase rents');
  }
  if (metrics.capRate < 0.06) {
    opportunities.push('Room for operational improvements to increase NOI');
  }
  if (property.building?.yearBuilt && property.building.yearBuilt < 1990) {
    opportunities.push('Value-add potential through property updates and modernization');
  }
  
  return opportunities;
};

const generateMarketTrends = (property: PropertyDetail): string[] => {
  const trends: string[] = [];
  
  if (property.summary?.proptype === 'SINGLE_FAMILY') {
    trends.push('Growing demand for single-family rentals in suburban areas');
    trends.push('Rising interest rates affecting buyer affordability');
  } else if (property.summary?.proptype === 'MULTI_FAMILY') {
    trends.push('Strong rental demand in multi-family sector');
    trends.push('Increasing preference for amenity-rich properties');
  }
  
  return trends;
};

const generateRecommendedStrategy = (property: PropertyDetail, metrics: InvestmentMetrics): string => {
  if (metrics.dscr >= 1.25 && metrics.capRate >= 0.07) {
    return 'Long-term hold for steady cash flow and appreciation';
  }
  if (property.building?.yearBuilt && property.building.yearBuilt < 1990) {
    return 'Value-add strategy through strategic renovations';
  }
  if (metrics.capRate < 0.06) {
    return 'Focus on operational improvements to increase NOI';
  }
  if (property.summary?.proptype === 'MULTI_FAMILY') {
    return 'Unit-by-unit renovation strategy to maximize rental income';
  }
  return 'Further analysis needed to determine optimal strategy';
};

const generateBestUseCase = (property: PropertyDetail, metrics: InvestmentMetrics): string => {
  if (metrics.dscr >= 1.25 && property.summary?.proptype === 'SINGLE_FAMILY') {
    return 'Long-term single family rental';
  }
  if (property.summary?.proptype === 'MULTI_FAMILY' && metrics.capRate >= 0.06) {
    return 'Multi-family rental with value-add opportunities';
  }
  return 'Standard rental property with potential for appreciation';
};

const generateAdditionalConsiderations = (property: PropertyDetail, metrics: InvestmentMetrics): string[] => {
  const considerations: string[] = [];
  
  if (property.building?.yearBuilt) {
    considerations.push(`Property age (${new Date().getFullYear() - property.building.yearBuilt} years) impacts maintenance budget`);
  }
  considerations.push(`Market conditions suggest ${metrics.capRate > 0.05 ? 'favorable' : 'challenging'} investment environment`);
  considerations.push(`Local market vacancy rates affect projected returns`);
  
  return considerations;
};

const calculateOverallRecommendation = (metrics: InvestmentMetrics): AIAnalysis['overallRecommendation'] => {
  if (metrics.dscr >= 1.25 && metrics.capRate >= 0.07) return 'Strong Buy';
  if (metrics.dscr >= 1.15 && metrics.capRate >= 0.06) return 'Buy';
  if (metrics.dscr >= 1.0) return 'Neutral';
  if (metrics.dscr >= 0.9) return 'Caution';
  return 'Avoid';
};

const calculateConfidenceScore = (property: PropertyDetail, metrics: InvestmentMetrics): number => {
  let score = 0;
  
  // Financial metrics (50 points max)
  if (metrics.dscr >= 1.25) score += 25;
  else if (metrics.dscr >= 1.15) score += 15;
  if (metrics.capRate >= 0.07) score += 25;
  else if (metrics.capRate >= 0.06) score += 15;
  
  // Property condition (30 points max)
  if (property.building?.yearBuilt) {
    if (property.building.yearBuilt > 2000) score += 30;
    else if (property.building.yearBuilt > 1990) score += 20;
    else if (property.building.yearBuilt > 1980) score += 10;
  }
  
  // Market factors (20 points max)
  if (property.area?.marketArea) score += 10;
  if (property.summary?.quality === 'good' || property.summary?.quality === 'excellent') score += 10;
  
  return score;
};

// ... existing code

export const formatAnalysisForExport = (analysis: AIAnalysis): string => {
  return `
Real Estate Investor AI Query Report

Overall Recommendation: ${analysis.overallRecommendation}
Confidence Score: ${analysis.confidenceScore}%

Summary:
${analysis.summary}

Best Use Case:
${analysis.bestUseCase}

Pros:
${analysis.pros.map(pro => `- ${pro}`).join('\n')}

Cons:
${analysis.cons.map(con => `- ${con}`).join('\n')}

Risk Factors:
${analysis.riskFactors.map(risk => `- ${risk.factor} (${risk.severity}): ${risk.description}`).join('\n')}

Opportunity Areas:
${analysis.opportunityAreas.map(area => `- ${area}`).join('\n')}

Market Trends:
${analysis.marketTrends.map(trend => `- ${trend}`).join('\n')}

Recommended Strategy:
${analysis.recommendedStrategy}

Additional Considerations:
${analysis.additionalConsiderations.map(consideration => `- ${consideration}`).join('\n')}
`.trim();
};
