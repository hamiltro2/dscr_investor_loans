import { NextRequest, NextResponse } from 'next/server';
import attomAPI from '@/lib/attom';
import { PropertySearchRequest } from '@/types/attom';
import { 
  CommercialAnalysis, 
  CommercialExpenses, 
  CommercialMetrics, 
  LeaseStructure, 
  LeaseStructures, 
  OperatingExpenseBreakdown, 
  VariableExpenses 
} from '@/types/commercial';

export async function POST(request: NextRequest) {
  try {
    const searchParams: PropertySearchRequest = await request.json();
    console.log('Received commercial property search params:', searchParams);

    if (!searchParams.address || !searchParams.city || !searchParams.state) {
      return NextResponse.json(
        { error: 'Address, city, and state are required' },
        { status: 400 }
      );
    }

    try {
      const propertyData = await attomAPI.searchProperty(searchParams);
      
      if (!propertyData.property || propertyData.property.length === 0) {
        return NextResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        );
      }

      const property = propertyData.property[0];
      
      // Check if property is commercial
      const propertyType = property.summary?.proptype || property.summary?.propsubtype || '';
      console.log('Property type:', propertyType);
      
      if (!isCommercialProperty(propertyType)) {
        return NextResponse.json(
          { 
            status: {
              code: 400,
              msg: 'Not a commercial property'
            },
            error: `Property type "${propertyType}" is not commercial`
          },
          { status: 400 }
        );
      }

      // Calculate commercial metrics
      const commercialAnalysis = await calculateCommercialMetrics(property);

      const formattedResponse = {
        property: {
          identifier: property.identifier,
          address: property.address,
          summary: property.summary,
          area: property.area,
          building: property.building,
          assessment: property.assessment,
          sale: property.sale,
          commercialAnalysis: {
            propertyType: commercialAnalysis.propertyType,
            buildingClass: commercialAnalysis.buildingClass,
            metrics: commercialAnalysis.metrics,
            expenses: commercialAnalysis.expenses,
            marketAnalysis: commercialAnalysis.marketAnalysis,
            riskAnalysis: commercialAnalysis.riskAnalysis
          }
        }
      };

      console.log('Formatted commercial response:', JSON.stringify(formattedResponse, null, 2));
      return NextResponse.json(formattedResponse);
    } catch (error: any) {
      console.error('ATTOM API commercial search error:', error);
      if (error.message === 'Property not found') {
        return NextResponse.json(
          { error: 'No property found with the given address' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in ATTOM commercial API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

function isCommercialProperty(propertyType: string): boolean {
  const commercialTypes = [
    'COMMERCIAL',
    'OFFICE',
    'RETAIL',
    'INDUSTRIAL',
    'MIXED USE',
    'SHOPPING CENTER',
    'WAREHOUSE',
    'FLEX',
    'MEDICAL OFFICE',
    'BUSINESS',
    'STORE',
    'RESTAURANT',
    'HOTEL',
    'MOTEL',
    'PARKING',
    'STORAGE'
  ];
  
  // Convert to uppercase for case-insensitive comparison
  const normalizedType = propertyType.toUpperCase();
  
  // Check if any commercial type is included in the property type
  const isCommercial = commercialTypes.some(type => 
    normalizedType.includes(type)
  );
  
  console.log('Property type check:', {
    normalizedType,
    isCommercial
  });
  
  return isCommercial;
}

async function calculateCommercialMetrics(property: any): Promise<CommercialAnalysis> {
  const squareFeet = property.area?.buildingsize || 2500;
  const propertyValue = property.assessment?.total || property.assessment?.assessed?.assdTtlValue || property.sale?.amount || 50000000;
  const baseRentPerSqFt = calculateMarketRentPerSqFt(property);
  
  // Calculate lease structure variations
  const leaseStructures = calculateLeaseStructures(property, baseRentPerSqFt);

  // Calculate base metrics
  const metrics: CommercialMetrics = {
    noi: leaseStructures.nnn.netOperatingIncome,
    capRate: (leaseStructures.nnn.netOperatingIncome / propertyValue) * 100,
    pricePerSqFt: propertyValue / squareFeet,
    occupancyRate: 0.95, // Default to 95% occupancy
    rentPerSqFt: baseRentPerSqFt,
    operatingExpenseRatio: leaseStructures.nnn.operatingExpenses.metrics.totalExpenses / leaseStructures.nnn.annualRevenue,
    debtServiceCoverage: 1.25, // Target DSCR
    returnOnEquity: 0.15, // Target ROE
    cashOnCash: 0.08, // Target Cash on Cash
    leaseStructures: {
      nnn: {
        type: 'NNN',
        baseRentPerSqFt: leaseStructures.nnn.baseRentPerSqFt,
        totalRentPerSqFt: leaseStructures.nnn.totalRentPerSqFt,
        annualRevenue: leaseStructures.nnn.annualRevenue,
        effectiveGrossIncome: leaseStructures.nnn.effectiveGrossIncome,
        netOperatingIncome: leaseStructures.nnn.netOperatingIncome,
        tenantResponsibilities: [
          'Property Taxes',
          'Insurance',
          'Utilities',
          'Maintenance',
          'Common Area Maintenance',
          'Janitorial'
        ],
        landlordResponsibilities: [
          'Structural Repairs',
          'Roof',
          'Property Management'
        ],
        operatingExpenses: leaseStructures.nnn.operatingExpenses,
        metrics: {
          occupancyRate: 0.95,
          expenseRecovery: leaseStructures.nnn.operatingExpenses.metrics.totalExpenses,
          netEffectiveRent: leaseStructures.nnn.baseRentPerSqFt,
          cashflow: leaseStructures.nnn.netOperatingIncome,
          expenseRatio: leaseStructures.nnn.operatingExpenses.metrics.expenseRatio,
          expensePerSqFt: leaseStructures.nnn.operatingExpenses.metrics.expensePerSqFt,
          fixedExpenseRatio: leaseStructures.nnn.operatingExpenses.metrics.fixedExpenseRatio,
          variableExpenseRatio: leaseStructures.nnn.operatingExpenses.metrics.variableExpenseRatio
        }
      },
      modifiedGross: {
        type: 'Modified Gross',
        baseRentPerSqFt: leaseStructures.modifiedGross.baseRentPerSqFt,
        totalRentPerSqFt: leaseStructures.modifiedGross.totalRentPerSqFt,
        annualRevenue: leaseStructures.modifiedGross.annualRevenue,
        effectiveGrossIncome: leaseStructures.modifiedGross.effectiveGrossIncome,
        netOperatingIncome: leaseStructures.modifiedGross.netOperatingIncome,
        tenantResponsibilities: [
          'Utilities',
          'Janitorial'
        ],
        landlordResponsibilities: [
          'Property Taxes',
          'Insurance',
          'Common Area Maintenance',
          'Structural Repairs',
          'Property Management'
        ],
        operatingExpenses: leaseStructures.modifiedGross.operatingExpenses,
        metrics: {
          occupancyRate: 0.95,
          expenseRecovery: leaseStructures.modifiedGross.operatingExpenses.variable.utilities.electric +
                          leaseStructures.modifiedGross.operatingExpenses.variable.utilities.gas +
                          leaseStructures.modifiedGross.operatingExpenses.variable.utilities.water,
          netEffectiveRent: leaseStructures.modifiedGross.baseRentPerSqFt,
          cashflow: leaseStructures.modifiedGross.netOperatingIncome,
          expenseRatio: leaseStructures.modifiedGross.operatingExpenses.metrics.expenseRatio,
          expensePerSqFt: leaseStructures.modifiedGross.operatingExpenses.metrics.expensePerSqFt,
          fixedExpenseRatio: leaseStructures.modifiedGross.operatingExpenses.metrics.fixedExpenseRatio,
          variableExpenseRatio: leaseStructures.modifiedGross.operatingExpenses.metrics.variableExpenseRatio
        }
      },
      fullService: {
        type: 'Full Service',
        baseRentPerSqFt: leaseStructures.fullService.baseRentPerSqFt,
        totalRentPerSqFt: leaseStructures.fullService.totalRentPerSqFt,
        annualRevenue: leaseStructures.fullService.annualRevenue,
        effectiveGrossIncome: leaseStructures.fullService.effectiveGrossIncome,
        netOperatingIncome: leaseStructures.fullService.netOperatingIncome,
        tenantResponsibilities: [],
        landlordResponsibilities: [
          'Property Taxes',
          'Insurance',
          'Utilities',
          'Maintenance',
          'Common Area Maintenance',
          'Janitorial',
          'Property Management'
        ],
        operatingExpenses: leaseStructures.fullService.operatingExpenses,
        metrics: {
          occupancyRate: 0.95,
          expenseRecovery: 0, // Landlord pays all expenses
          netEffectiveRent: leaseStructures.fullService.baseRentPerSqFt,
          cashflow: leaseStructures.fullService.netOperatingIncome,
          expenseRatio: leaseStructures.fullService.operatingExpenses.metrics.expenseRatio,
          expensePerSqFt: leaseStructures.fullService.operatingExpenses.metrics.expensePerSqFt,
          fixedExpenseRatio: leaseStructures.fullService.operatingExpenses.metrics.fixedExpenseRatio,
          variableExpenseRatio: leaseStructures.fullService.operatingExpenses.metrics.variableExpenseRatio
        }
      }
    }
  };

  // Estimate expenses
  const expenses: CommercialExpenses = {
    propertyTaxes: leaseStructures.nnn.operatingExpenses.fixed.propertyTax,
    insurance: leaseStructures.nnn.operatingExpenses.fixed.insurance,
    utilities: Object.values(leaseStructures.nnn.operatingExpenses.variable.utilities).reduce((a: number, b: number): number => a + b, 0),
    maintenance: Object.values(leaseStructures.nnn.operatingExpenses.variable.maintenance).reduce((a: number, b: number): number => a + b, 0),
    management: leaseStructures.nnn.operatingExpenses.fixed.propertyManagement,
    janitorial: Object.values(leaseStructures.nnn.operatingExpenses.variable.janitorial).reduce((a: number, b: number): number => a + b, 0),
    cam: Object.values(leaseStructures.nnn.operatingExpenses.variable.cam).reduce((a: number, b: number): number => a + b, 0),
    reserves: Object.values(leaseStructures.nnn.operatingExpenses.variable.reserves).reduce((a: number, b: number): number => a + b, 0),
    other: leaseStructures.nnn.operatingExpenses.fixed.adminFees
  };

  return {
    propertyType: property.summary?.proptype || 'Commercial',
    buildingClass: determinePropertyClass(property),
    metrics,
    expenses,
    leaseType: 'NNN', // Default to Triple Net
    marketAnalysis: {
      submarket: property.area?.suffix || 'Unknown',
      comparableRents: [baseRentPerSqFt * 0.9, baseRentPerSqFt, baseRentPerSqFt * 1.1],
      marketVacancy: 0.05,
      absorption: 0
    },
    riskAnalysis: {
      tenantCreditRisk: 'Moderate',
      marketRisk: 'Moderate',
      propertyCondition: property.building?.condition || 'Average',
      locationRisk: 'Moderate'
    }
  };
}

function calculateMarketRentPerSqFt(property: any): number {
  // Base rates for different property types in San Francisco
  const baseRates = {
    'OFFICE': 65,
    'RETAIL': 55,
    'INDUSTRIAL': 35,
    'MIXED USE': 60,
    'SHOPPING CENTER': 50,
    'WAREHOUSE': 30,
    'MEDICAL OFFICE': 70
  };

  const propertyType = property.summary?.proptype?.toUpperCase() || 'OFFICE';
  const baseRate = baseRates[propertyType as keyof typeof baseRates] || 40;

  // Adjust based on building class
  const buildingClass = determinePropertyClass(property);
  const classMultiplier = {
    'A': 1.2,
    'B': 1.0,
    'C': 0.8
  }[buildingClass] || 1.0;

  return baseRate * classMultiplier;
}

function calculateLeaseStructures(property: any, baseRentPerSqFt: number): LeaseStructures {
  const propertyValue = property.assessment?.assessed?.assdTtlValue || 0;
  const annualRevenue = baseRentPerSqFt * (property.building?.size?.bldgSize || 0);

  // Calculate operating expenses
  const operatingExpenses = calculateOperatingExpenses(property, baseRentPerSqFt);

  // NNN Lease
  const nnn: LeaseStructure = {
    type: 'NNN',
    baseRentPerSqFt,
    totalRentPerSqFt: baseRentPerSqFt + operatingExpenses.metrics.totalExpenses / (property.building?.size?.bldgSize || 0),
    annualRevenue,
    effectiveGrossIncome: annualRevenue + operatingExpenses.metrics.totalExpenses, // Tenants pay all expenses
    netOperatingIncome: annualRevenue,
    tenantResponsibilities: [
      'Property Tax',
      'Insurance',
      'Utilities',
      'Maintenance',
      'Common Area Maintenance',
      'Janitorial'
    ],
    landlordResponsibilities: [
      'Structural Repairs',
      'Roof Maintenance'
    ],
    operatingExpenses,
    metrics: {
      occupancyRate: 0.95,
      expenseRecovery: operatingExpenses.metrics.totalExpenses,
      netEffectiveRent: baseRentPerSqFt,
      cashflow: annualRevenue,
      expenseRatio: operatingExpenses.metrics.expenseRatio,
      expensePerSqFt: operatingExpenses.metrics.expensePerSqFt,
      fixedExpenseRatio: operatingExpenses.metrics.fixedExpenseRatio,
      variableExpenseRatio: operatingExpenses.metrics.variableExpenseRatio
    }
  };

  // Modified Gross Lease
  const modifiedGrossBaseRent = baseRentPerSqFt * 1.15; // 15% higher than NNN
  const modifiedGrossRevenue = modifiedGrossBaseRent * (property.building?.size?.bldgSize || 0);
  const modifiedGrossExpenses = calculateOperatingExpenses(property, modifiedGrossBaseRent);
  
  // Tenant only pays utilities in Modified Gross
  const tenantExpenses = modifiedGrossExpenses.variable.utilities;
  const tenantExpenseTotal = Object.values(tenantExpenses).reduce((a: number, b: number): number => a + b, 0);
  
  const modifiedGross: LeaseStructure = {
    type: 'Modified Gross',
    baseRentPerSqFt: modifiedGrossBaseRent,
    totalRentPerSqFt: modifiedGrossBaseRent + Object.values(tenantExpenses).reduce((a: number, b: number): number => a + b, 0) / (property.building?.size?.bldgSize || 0),
    annualRevenue: modifiedGrossRevenue,
    effectiveGrossIncome: modifiedGrossRevenue + tenantExpenseTotal,
    netOperatingIncome: modifiedGrossRevenue - (modifiedGrossExpenses.metrics.totalExpenses - tenantExpenseTotal),
    tenantResponsibilities: [
      'Utilities',
      'Interior Maintenance'
    ],
    landlordResponsibilities: [
      'Property Tax',
      'Insurance',
      'Common Area Maintenance',
      'Janitorial',
      'Structural Repairs'
    ],
    operatingExpenses: modifiedGrossExpenses,
    metrics: {
      occupancyRate: 0.95,
      expenseRecovery: tenantExpenseTotal,
      netEffectiveRent: modifiedGrossBaseRent - (modifiedGrossExpenses.metrics.totalExpenses - tenantExpenseTotal) / (property.building?.size?.bldgSize || 0),
      cashflow: modifiedGrossRevenue - (modifiedGrossExpenses.metrics.totalExpenses - tenantExpenseTotal),
      expenseRatio: modifiedGrossExpenses.metrics.expenseRatio,
      expensePerSqFt: modifiedGrossExpenses.metrics.expensePerSqFt,
      fixedExpenseRatio: modifiedGrossExpenses.metrics.fixedExpenseRatio,
      variableExpenseRatio: modifiedGrossExpenses.metrics.variableExpenseRatio
    }
  };

  // Full Service Lease
  const fullServiceBaseRent = baseRentPerSqFt * 1.35; // 35% higher than NNN
  const fullServiceRevenue = fullServiceBaseRent * (property.building?.size?.bldgSize || 0);
  const fullServiceExpenses = calculateOperatingExpenses(property, fullServiceBaseRent);
  
  const fullService: LeaseStructure = {
    type: 'Full Service',
    baseRentPerSqFt: fullServiceBaseRent,
    totalRentPerSqFt: fullServiceBaseRent,
    annualRevenue: fullServiceRevenue,
    effectiveGrossIncome: fullServiceRevenue,
    netOperatingIncome: fullServiceRevenue - fullServiceExpenses.metrics.totalExpenses,
    tenantResponsibilities: [
      'Excess Utility Usage',
      'Excess Janitorial'
    ],
    landlordResponsibilities: [
      'Property Tax',
      'Insurance',
      'Utilities',
      'Maintenance',
      'Common Area Maintenance',
      'Janitorial',
      'Structural Repairs'
    ],
    operatingExpenses: fullServiceExpenses,
    metrics: {
      occupancyRate: 0.95,
      expenseRecovery: 0, // Landlord pays all expenses
      netEffectiveRent: fullServiceBaseRent - fullServiceExpenses.metrics.totalExpenses / (property.building?.size?.bldgSize || 0),
      cashflow: fullServiceRevenue - fullServiceExpenses.metrics.totalExpenses,
      expenseRatio: fullServiceExpenses.metrics.expenseRatio,
      expensePerSqFt: fullServiceExpenses.metrics.expensePerSqFt,
      fixedExpenseRatio: fullServiceExpenses.metrics.fixedExpenseRatio,
      variableExpenseRatio: fullServiceExpenses.metrics.variableExpenseRatio
    }
  };

  return { nnn, modifiedGross, fullService };
}

function calculateOperatingExpenses(propertyDetails: any, baseRent: number): OperatingExpenseBreakdown {
  const propertyValue = propertyDetails.assessment?.assessed?.assdTtlValue || 0;
  const annualRevenue = baseRent * (propertyDetails.building?.size?.bldgSize || 0);

  // Calculate fixed expenses
  const fixed = {
    propertyTax: propertyValue * 0.012, // 1.2% of property value
    insurance: propertyValue * 0.005,   // 0.5% of property value
    propertyManagement: annualRevenue * 0.04, // 4% of revenue
    adminFees: annualRevenue * 0.02     // 2% of revenue
  };

  const totalFixed = Object.values(fixed).reduce((sum, value) => sum + value, 0);

  // Initialize variable expenses
  const variable: VariableExpenses = {
    utilities: {
      electric: annualRevenue * 0.03,
      water: annualRevenue * 0.02,
      gas: annualRevenue * 0.02
    },
    maintenance: {
      repairs: annualRevenue * 0.03,
      preventive: annualRevenue * 0.02
    },
    janitorial: {
      cleaning: annualRevenue * 0.02,
      supplies: annualRevenue * 0.01
    },
    cam: {
      landscaping: annualRevenue * 0.01,
      snowRemoval: annualRevenue * 0.01
    },
    reserves: {
      capex: annualRevenue * 0.03,
      vacancy: annualRevenue * 0.05
    }
  };

  // Calculate total variable expenses
  const totalVariable = Object.values(variable).reduce((total: number, category: { [key: string]: number }): number => {
    return total + Object.values(category).reduce((sum: number, value: number): number => sum + value, 0);
  }, 0);

  const totalExpenses = totalFixed + totalVariable;
  const expenseRatio = totalExpenses / annualRevenue;
  const expensePerSqFt = totalExpenses / (propertyDetails.building?.size?.bldgSize || 1);
  const fixedExpenseRatio = totalFixed / totalExpenses;
  const variableExpenseRatio = totalVariable / totalExpenses;

  return {
    fixed,
    variable,
    metrics: {
      totalFixed,
      totalVariable,
      totalExpenses,
      expenseRatio,
      expensePerSqFt,
      fixedExpenseRatio,
      variableExpenseRatio
    }
  };
}

function determinePropertyClass(property: any): string {
  const yearBuilt = property.summary?.yearbuilt || 0;
  const condition = property.building?.condition?.toLowerCase() || '';
  
  if (yearBuilt >= 2000 || condition.includes('excellent')) return 'A';
  if (yearBuilt >= 1980 || condition.includes('good')) return 'B';
  return 'C';
}
