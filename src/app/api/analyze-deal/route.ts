/**
 * Deal Analyzer API Endpoint
 * 
 * Provides programmatic access to deal analysis calculations
 * Used by Cap AI agent and external integrations
 * 
 * @route POST /api/analyze-deal
 */

import { NextRequest, NextResponse } from 'next/server';
import { PropertyInputs, analyzeDeal, DealAnalysis } from '@/lib/dealAnalyzer';

/**
 * Validate property inputs
 */
function validateInputs(data: any): { valid: boolean; error?: string } {
  const required = [
    'purchasePrice',
    'downPaymentPercent',
    'interestRate',
    'loanTermYears',
    'monthlyRent',
  ];
  
  for (const field of required) {
    if (data[field] === undefined || data[field] === null) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
    
    if (typeof data[field] !== 'number' || isNaN(data[field])) {
      return { valid: false, error: `Invalid value for ${field}: must be a number` };
    }
    
    if (data[field] < 0) {
      return { valid: false, error: `Invalid value for ${field}: must be non-negative` };
    }
  }
  
  // Validate percentages
  if (data.downPaymentPercent > 100) {
    return { valid: false, error: 'downPaymentPercent must be <= 100' };
  }
  
  if (data.vacancyRate !== undefined && data.vacancyRate > 100) {
    return { valid: false, error: 'vacancyRate must be <= 100' };
  }
  
  return { valid: true };
}

/**
 * POST /api/analyze-deal
 * 
 * Request body: PropertyInputs (partial allowed, defaults applied)
 * Response: DealAnalysis
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Apply defaults for optional fields
    const inputs: PropertyInputs = {
      purchasePrice: body.purchasePrice,
      downPaymentPercent: body.downPaymentPercent,
      closingCostsPercent: body.closingCostsPercent ?? 3,
      rehabCosts: body.rehabCosts ?? 0,
      interestRate: body.interestRate,
      loanTermYears: body.loanTermYears,
      monthlyRent: body.monthlyRent,
      otherMonthlyIncome: body.otherMonthlyIncome ?? 0,
      vacancyRate: body.vacancyRate ?? 5,
      propertyTaxRate: body.propertyTaxRate ?? 1.2,
      insurance: body.insurance ?? 150,
      hoaFees: body.hoaFees ?? 0,
      propertyManagement: body.propertyManagement ?? body.monthlyRent * 0.08,
      maintenance: body.maintenance ?? body.monthlyRent * 0.10,
      utilities: body.utilities ?? 0,
      otherExpenses: body.otherExpenses ?? 0,
    };
    
    // Validate inputs
    const validation = validateInputs(inputs);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    // Perform analysis
    const analysis: DealAnalysis = analyzeDeal(inputs);
    
    // Return results
    return NextResponse.json({
      success: true,
      inputs,
      analysis,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Deal analysis error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze deal',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analyze-deal
 * 
 * Returns API documentation
 */
export async function GET() {
  return NextResponse.json({
    name: 'Deal Analyzer API',
    version: '1.0.0',
    description: 'Analyze investment property deals with comprehensive financial calculations',
    
    endpoints: {
      'POST /api/analyze-deal': {
        description: 'Analyze a property deal',
        
        requiredParameters: {
          purchasePrice: 'number - Property purchase price',
          downPaymentPercent: 'number - Down payment percentage (0-100)',
          interestRate: 'number - Annual interest rate percentage',
          loanTermYears: 'number - Loan term in years',
          monthlyRent: 'number - Expected monthly rental income',
        },
        
        optionalParameters: {
          closingCostsPercent: 'number - Default: 3',
          rehabCosts: 'number - Default: 0',
          otherMonthlyIncome: 'number - Default: 0',
          vacancyRate: 'number - Default: 5',
          propertyTaxRate: 'number - Annual rate, Default: 1.2',
          insurance: 'number - Monthly cost, Default: 150',
          hoaFees: 'number - Monthly cost, Default: 0',
          propertyManagement: 'number - Monthly cost, Default: 8% of rent',
          maintenance: 'number - Monthly cost, Default: 10% of rent',
          utilities: 'number - Monthly cost, Default: 0',
          otherExpenses: 'number - Monthly cost, Default: 0',
        },
        
        response: {
          success: 'boolean',
          inputs: 'PropertyInputs - Processed inputs',
          analysis: 'DealAnalysis - Comprehensive analysis',
          timestamp: 'string - ISO timestamp',
        },
        
        example: {
          request: {
            purchasePrice: 400000,
            downPaymentPercent: 25,
            interestRate: 6.99,
            loanTermYears: 30,
            monthlyRent: 3200,
          },
          
          response: {
            success: true,
            inputs: '{ ... }',
            analysis: {
              acquisition: '{ ... }',
              monthly: '{ ... }',
              annual: '{ ... }',
              metrics: {
                dscr: 1.45,
                cashOnCashReturn: 8.2,
                capRate: 6.5,
                '...': '...',
              },
              qualification: {
                dcsrQualifies: true,
                recommendation: 'Excellent deal! ...',
              },
            },
          },
        },
      },
    },
    
    formulas: {
      dscr: 'Net Operating Income / Total Debt Service',
      cashOnCashReturn: '(Annual Cash Flow / Total Cash Invested) × 100',
      capRate: '(Net Operating Income / Property Value) × 100',
      monthlyPayment: 'P × [r(1+r)^n] / [(1+r)^n - 1]',
    },
    
    links: {
      tool: 'https://www.capitalbridgesolutions.com/tools/deal-analyzer',
      docs: 'https://www.capitalbridgesolutions.com/api/docs',
    },
  });
}
