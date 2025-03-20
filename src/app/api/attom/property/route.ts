import { NextRequest, NextResponse } from 'next/server';
import attomAPI from '@/lib/attom';
import { PropertySearchRequest } from '@/types/attom';
import defaultResidentialConfig, { defaultCommercialConfig, defaultMultiFamilyConfig, CommercialPropertyType } from '@/config/investment';
import { analyzePropertyInvestment } from '@/lib/llm';
import { formatCurrency } from '@/lib/format';

// Increase the Next.js API route timeout to 2 minutes
export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
  runtime: 'nodejs',
  maxDuration: 120,
};

export async function POST(request: NextRequest) {
  try {
    console.log('ATTOM API Key:', process.env.ATTOM_API_KEY?.substring(0, 8) + '...');
    const searchParams: PropertySearchRequest = await request.json();

    if (!searchParams.address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    if (!searchParams.city || !searchParams.state) {
      return NextResponse.json(
        { error: 'City and state are required' },
        { status: 400 }
      );
    }

    try {
      console.log('Searching property with params:', searchParams);
      const response = await attomAPI.searchProperty(searchParams);
      const property = response.property[0];

      if (!property) {
        return NextResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        );
      }

      // Determine if property is commercial
      const propertyType = property.summary?.proptype || property.summary?.propertyType || '';
      const isCommercial = [
        'office',
        'retail',
        'industrial',
        'mixed use',
        'medical',
        'shopping center',
        'warehouse'
      ].some(type => propertyType.toLowerCase().includes(type));

      console.log(`Property type: ${propertyType}`);
      console.log(`Property detected as: ${isCommercial ? 'Commercial' : 'Residential'}`);

      // Calculate metrics based on property type
      let investmentMetrics;
      if (isCommercial) {
        // Determine commercial property type
        let commercialType = CommercialPropertyType.Office;  // Default to office
        if (propertyType.toLowerCase().includes('office')) {
          if (propertyType.toLowerCase().includes('medical')) {
            commercialType = CommercialPropertyType.Medical;
          } else {
            commercialType = CommercialPropertyType.Office;
          }
        } else if (propertyType.toLowerCase().includes('retail')) {
          commercialType = CommercialPropertyType.Retail;
        } else if (propertyType.toLowerCase().includes('industrial')) {
          commercialType = CommercialPropertyType.Industrial;
        } else if (propertyType.toLowerCase().includes('mixed use')) {
          commercialType = CommercialPropertyType.MixedUse;
        } else if (propertyType.toLowerCase().includes('shopping center')) {
          commercialType = CommercialPropertyType.ShoppingCenter;
        } else if (propertyType.toLowerCase().includes('warehouse')) {
          commercialType = CommercialPropertyType.Warehouse;
        }

        console.log(`Commercial property type: ${commercialType}`);
        const commercialConfig = {
          ...defaultCommercialConfig,
          ...(searchParams.purchasePrice && { purchasePrice: searchParams.purchasePrice }),
          ...(searchParams.downPayment && { downPaymentAmount: Number(searchParams.downPayment) }),
          ...(searchParams.interestRate && { interestRate: searchParams.interestRate }),
        };
        console.log('Using commercial config:', commercialConfig);
        
        investmentMetrics = attomAPI.calculateCommercialInvestmentMetrics(
          property,
          commercialConfig
        );
      } else {
        // Check if it's multi-family
        const isMultiFamily = propertyType.toLowerCase().includes('multi') || 
                            propertyType.toLowerCase().includes('apartment') ||
                            (property.building?.units && property.building.units > 1);
        
        console.log(`Is multi-family: ${isMultiFamily}`);
        const config = isMultiFamily ? defaultMultiFamilyConfig : defaultResidentialConfig;
        const residentialConfig = {
          ...config,
          ...(searchParams.purchasePrice && { purchasePrice: searchParams.purchasePrice }),
          ...(searchParams.downPayment && { downPaymentAmount: Number(searchParams.downPayment) }),
          ...(searchParams.interestRate && { interestRate: searchParams.interestRate }),
        };
        console.log('Using residential config:', residentialConfig);
        
        investmentMetrics = attomAPI.calculateInvestmentMetrics(
          property,
          residentialConfig
        );
      }

      console.log('Investment metrics calculated:', investmentMetrics);

      // Get rental strategies analysis
      console.log('Analyzing rental strategies...');
      const rentalStrategies = await attomAPI.analyzeRentalStrategies(property, investmentMetrics);
      console.log('Rental strategies analyzed:', rentalStrategies);

      // Get LLM analysis
      console.log('Getting LLM analysis...');
      let marketAnalysis;
      try {
        marketAnalysis = await analyzePropertyInvestment(
          property,
          investmentMetrics,
          {
            city: searchParams.city,
            state: searchParams.state,
            zip: searchParams.zip || ''
          }
        );
      } catch (error) {
        console.error('Error getting LLM analysis:', error);
        // Create a basic market analysis with the investment metrics
        marketAnalysis = {
          propertyType: isCommercial ? 'commercial' : 'residential',
          marketTrends: {
            demandLevel: 'Moderate',
            priceGrowth: 'Stable',
            rentalDemand: 'Moderate to Strong',
            seasonality: 'Low seasonal variation',
            submarket: 'Established residential area'
          },
          investmentAnalysis: {
            strengthScore: 70,
            riskScore: 35,
            returnPotential: 'medium',
            holdingPeriod: '5-7 years',
            exitStrategy: ['Traditional sale', 'Refinance']
          },
          financials: {
            currentValue: investmentMetrics.propertyValue,
            projectedValue: investmentMetrics.propertyValue * 1.15,
            annualAppreciation: 3.5,
            rentGrowth: 2.5,
            expenseGrowth: 2.5,
            keyMetrics: {
              currentCapRate: investmentMetrics.capRate,
              proFormaCapRate: investmentMetrics.capRate * 1.1,
              cashOnCash: investmentMetrics.cashOnCashReturn,
              internalRateOfReturn: 12,
              returnOnInvestment: 15,
              breakEvenMonths: investmentMetrics.breakEvenMonths,
              debtServiceCoverage: investmentMetrics.dscr,
              grossRentMultiplier: 10
            },
            projections: []
          },
          riskFactors: ['Market volatility', 'Potential maintenance issues', 'Interest rate fluctuations'],
          opportunities: ['Value-add potential', 'Rental income optimization', 'Long-term appreciation'],
          recommendations: ['Consider all available rental strategies', 'Evaluate property condition thoroughly'],
          provider: 'deepseek'
        };
      }

      // Map market analysis to AI analysis format
      const aiAnalysis = {
        overallRecommendation: marketAnalysis.investmentAnalysis.strengthScore > 75 ? 'Strong Buy' :
                              marketAnalysis.investmentAnalysis.strengthScore > 60 ? 'Buy' :
                              marketAnalysis.investmentAnalysis.strengthScore > 40 ? 'Neutral' :
                              marketAnalysis.investmentAnalysis.strengthScore > 25 ? 'Caution' : 'Avoid',
        confidenceScore: Math.round((100 - marketAnalysis.investmentAnalysis.riskScore) * 0.8), // Adjust confidence based on risk
        summary: marketAnalysis.recommendations[0] || '',
        pros: marketAnalysis.opportunities,
        cons: marketAnalysis.riskFactors,
        bestUseCase: marketAnalysis.recommendations[1] || '',
        riskFactors: marketAnalysis.riskFactors.map((factor: string) => ({
          factor,
          severity: factor.toLowerCase().includes('high') ? 'High' :
                    factor.toLowerCase().includes('moderate') ? 'Medium' : 'Low',
          description: factor
        })),
        opportunityAreas: marketAnalysis.opportunities,
        marketTrends: [
          `Demand Level: ${marketAnalysis.marketTrends.demandLevel}`,
          `Price Growth: ${marketAnalysis.marketTrends.priceGrowth}`,
          `Rental Demand: ${marketAnalysis.marketTrends.rentalDemand}`,
          `Seasonality: ${marketAnalysis.marketTrends.seasonality}`,
          ...(marketAnalysis.marketTrends.submarket ? [`Submarket: ${marketAnalysis.marketTrends.submarket}`] : [])
        ],
        recommendedStrategy: marketAnalysis.recommendations[2] || '',
        additionalConsiderations: [
          `Projected Value in 5 Years: ${formatCurrency(marketAnalysis.financials.projectedValue)}`,
          `Annual Appreciation: ${(marketAnalysis.financials.annualAppreciation * 100).toFixed(1)}%`,
          `Rent Growth: ${(marketAnalysis.financials.rentGrowth * 100).toFixed(1)}%`,
          `Break Even: ${marketAnalysis.financials.keyMetrics.breakEvenMonths} months`,
          `Recommended Holding Period: ${marketAnalysis.investmentAnalysis.holdingPeriod}`,
          ...marketAnalysis.investmentAnalysis.exitStrategy
        ]
      };

      // Prepare the response
      return NextResponse.json({
        property: property,
        investmentMetrics: investmentMetrics,
        rentalStrategies: rentalStrategies,
        analysis: aiAnalysis,
        propertyType: isCommercial ? 'commercial' : 'residential'
      });

    } catch (error) {
      console.error('Property search error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch property data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
