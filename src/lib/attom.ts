import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { 
  PropertyDetail,
} from '@/types/attom';
import { 
  InvestmentMetrics,
  InvestmentConfig,
  RentalAnalysis,
  LeaseType, 
  AIAnalysis,
  FullInvestmentAnalysis,
  CommercialPropertyType,
  PropertyClass,
  CoastalInlandState,
  SimpleState,
  DefaultState,
  MarketData,
  CommercialInvestmentMetrics as ImportedCommercialInvestmentMetrics
} from '@/types/investment';
import { 
  propertyYields,
  defaultResidentialConfig,
  defaultMultiFamilyConfig,
  defaultCommercialConfig,
  commercialRentRates
} from '@/config/investment';

// Define the CommercialInvestmentMetrics interface
export interface CommercialInvestmentMetrics {
  propertyValue: number;
  squareFeet: number;
  propertyClass: PropertyClass;
  monthlyRent: number;
  annualRent: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  monthlyMortgage: number;
  monthlyExpenses: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    vacancy: number;
    management: number;
    mortgage: number;
  };
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  netOperatingIncome: number;
  metrics: {
    capRate: number;
    cashOnCashReturn: number;
    dscr: number;
    breakEvenMonths: number;
  };
  leaseRates: {
    nnnRate: number;
    modifiedGrossRate: number;
    fullServiceRate: number;
  };
  cashFlow: number;
  returnOnInvestment: number;
  breakEvenMonths: number;
}

export class AttomAPI {
  private readonly baseUrl = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0';
  private readonly apiKey: string;

  // Define market data structure for rent calculations
  private marketData: MarketData = {
    // California regions
    CA: {
      coastal: {
        base: 2.5,  // Base price per sqft per month
        regions: {
          // LA/Orange County
          '906': 2.5, '907': 2.5, '908': 2.5, '926': 2.5, '927': 2.5, '928': 2.5,
          // SF Bay Area
          '940': 3.5, '941': 3.5, '944': 3.5, '945': 3.5,
          '950': 3.0, '951': 3.0, '943': 3.0, // South Bay
          // San Diego
          '919': 2.3, '920': 2.3, '921': 2.3,
          // Central Coast
          '930': 2.0, '931': 2.0, '934': 2.0,
        }
      },
      inland: {
        base: 1.5,
        regions: {
          // Sacramento
          '956': 1.8, '957': 1.8, '958': 1.8,
          // Central Valley
          '932': 1.4, '936': 1.4, '937': 1.4,
        }
      }
    },
    // Northeast regions
    NY: {
      base: 1.8,
      regions: {
        // NYC Metro
        '100': 3.0, '101': 3.0, '102': 3.0, '103': 3.0, '104': 3.0,
        // Long Island
        '117': 2.2, '118': 2.2, '119': 2.2,
      }
    },
    NJ: {
      base: 1.6,
      regions: {
        // NYC Adjacent
        '070': 2.0, '071': 2.0, '072': 2.0,
        // Jersey Shore
        '077': 1.8, '078': 1.8, '079': 1.8,
      }
    },
    // Florida regions
    FL: {
      coastal: {
        base: 1.6,
        regions: {
          // Miami-Dade
          '331': 2.0, '332': 2.0, '333': 2.0,
          // Tampa Bay
          '335': 1.7, '336': 1.7, '337': 1.7,
        }
      },
      inland: {
        base: 1.3,
        regions: {
          // Orlando
          '327': 1.5, '328': 1.5,
          // Jacksonville
          '322': 1.4, '323': 1.4,
        }
      }
    },
    // Texas regions
    TX: {
      base: 1.2,
      regions: {
        // Austin
        '737': 1.8, '738': 1.8, '739': 1.8,
        // Dallas
        '750': 1.6, '751': 1.6, '752': 1.6,
        // Houston
        '770': 1.4, '771': 1.4, '772': 1.4,
      }
    },
    // Default for other states
    DEFAULT: {
      base: 1.2,
      premium_markets: {
        // Seattle
        'WA': { '981': 2.2, '982': 2.2 },
        // Denver
        'CO': { '802': 1.8, '803': 1.8 },
        // Phoenix
        'AZ': { '850': 1.6, '851': 1.6 },
        // Las Vegas
        'NV': { '891': 1.5, '892': 1.5 },
      }
    }
  };

  // Market condition adjustments
  private marketConditions = {
    EXCELLENT: 1.3,  // High-end market
    GOOD: 1.2,      // Above average market
    AVERAGE: 1.0,   // Standard market
    FAIR: 0.9,      // Below average market
    POOR: 0.8,      // Distressed market
  };

  // Property age adjustments
  private ageAdjustments = {
    NEW: 1.3,       // < 5 years
    RECENT: 1.2,    // 5-10 years
    ESTABLISHED: 1.0, // 10-20 years
    MATURE: 0.95,   // 20-40 years
    HISTORIC: 0.9,  // > 40 years (unless in historic district)
  };

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('ATTOM API key is required. Please add ATTOM_API_KEY to your .env.local file');
    }
    this.apiKey = apiKey;
  }

  /**
   * Makes an API request to the ATTOM API
   * 
   * @param endpoint - API endpoint URL
   * @returns API response data
   * @throws Error if API request fails or response is invalid
   */
  private async apiRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Accept': 'application/json',
          'apikey': this.apiKey,
        },
      });

      const responseText = await response.text();
      let responseData;
      
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse ATTOM API response:', responseText);
        throw new Error(`ATTOM API returned invalid JSON: ${responseText.substring(0, 100)}...`);
      }
      
      // Check for "SuccessWithoutResult" which is a special case where the API returns 400
      // but it's actually just indicating no results were found
      if (responseData?.status?.msg === "SuccessWithoutResult") {
        throw new Error("PROPERTY_NOT_FOUND");
      }

      if (!response.ok) {
        const errorMessage = responseData?.status?.msg || `HTTP Error ${response.status}`;
        console.error(`ATTOM API error (${response.status}):`, errorMessage);
        throw new Error(`ATTOM API error (${response.status}): ${errorMessage}`);
      }

      return responseData as T;
    } catch (error) {
      // Log the error but don't expose internal details to the caller
      console.error('ATTOM API request failed:', error);
      
      // Rethrow with a more user-friendly message if it's not already a known error
      if (error instanceof Error) {
        if (error.message === "PROPERTY_NOT_FOUND") {
          throw error; // Preserve specific error types
        }
        // Check for network errors
        if (error.message.includes('fetch failed') || error.message.includes('network')) {
          throw new Error('Network error: Unable to connect to ATTOM API. Please check your internet connection.');
        }
      }
      
      throw error;
    }
  }

  /**
   * Formats an address for use in API requests
   * 
   * @param address - Street address
   * @param city - Optional city name
   * @param state - Optional state code
   * @param zip - Optional zip code
   * @returns Formatted address string
   */
  private formatAddress(address: string, city?: string, state?: string, zip?: string): string {
    return [address, city, state, zip]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Searches for a property in the ATTOM database
   * 
   * @param request - Object containing address, city, state, and zip
   * @returns Property details from ATTOM API
   * @throws Error if property not found or API request fails
   */
  async searchProperty(request: any): Promise<any> {
    const { address, city, state, zip } = request;
    
    if (!address) {
      throw new Error('Address is required');
    }

    const formattedAddress = this.formatAddress(address, city, state, zip);
    
    try {
      return await this.apiRequest(
        `/property/detail?address=${encodeURIComponent(formattedAddress)}`
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "PROPERTY_NOT_FOUND") {
          console.warn(`Property not found: ${formattedAddress}`);
          // Return a minimal valid response with default values
          return {
            status: {
              code: 200,
              msg: "Property not found in ATTOM database, using default values"
            },
            property: [{
              address: {
                line1: address,
                line2: "",
                locality: city || "",
                countrySubd: state || "",
                postal1: zip || ""
              },
              summary: {
                proptype: "SFR",
                propsubtype: "RESIDENTIAL",
                propIndicator: "10",
                yearbuilt: new Date().getFullYear() - 30, // Default to 30 years old
                grosssize: 0,
                bldgsize: 0
              },
              building: {
                size: {
                  bldgsize: 1500,
                  grosssize: 1500,
                  livingsize: 1500
                },
                rooms: {
                  beds: 3,
                  baths: 2
                },
                interior: {},
                construction: {},
                parking: {},
                summary: {}
              },
              lot: {
                depth: 0,
                frontage: 0,
                lotsize1: 5000,
                lotsize2: 5000
              },
              area: {
                munname: city || "Unknown",
                countyname: "Unknown"
              },
              vintage: {
                lastModified: new Date().toISOString()
              }
            }]
          };
        }
        console.error('Property search failed:', error);
        throw error;
      }
    }
  }

  /**
   * Determines the property class based on year built and condition
   * 
   * @param property - Property detail object
   * @returns Property class (A, B, or C)
   */
  private determinePropertyClass(property: PropertyDetail): PropertyClass {
    const yearBuilt = property.building?.yearBuilt || 0;
    const condition = property.building?.condition || '';
    
    if (yearBuilt >= 2000 || condition.toLowerCase().includes('excellent')) {
      return PropertyClass.A;
    } else if (yearBuilt >= 1980 || condition.toLowerCase().includes('good')) {
      return PropertyClass.B;
    }
    return PropertyClass.C;
  }

  /**
   * Calculates commercial rent rate based on property type, class, and size
   * 
   * @param commercialType - Type of commercial property (office, retail, etc.)
   * @param propertyClass - Property class (A, B, or C)
   * @param squareFeet - Property size in square feet
   * @returns Annual rent amount
   */
  private getCommercialRentRate(
    commercialType: CommercialPropertyType, 
    propertyClass: PropertyClass,
    squareFeet: number
  ): number {
    // Base annual rent rates per square foot by property type
    const baseRates: Record<string, number> = {
      'office': 25,
      'retail': 22,
      'industrial': 12,
      'mixed-use': 20,
      'multi-family': 18,
    };

    // Class multipliers
    const classMultipliers: Record<PropertyClass, number> = {
      [PropertyClass.A]: 1.3,
      [PropertyClass.B]: 1.0,
      [PropertyClass.C]: 0.7,
      [PropertyClass.D]: 0.5,
    };

    // Size adjustment - larger properties generally have lower per-square-foot rates
    let sizeMultiplier = 1.0;
    if (squareFeet > 10000) {
      sizeMultiplier = 0.85;
    } else if (squareFeet > 5000) {
      sizeMultiplier = 0.9;
    } else if (squareFeet < 1000) {
      sizeMultiplier = 1.1;
    }

    // Calculate annual rent per square foot
    const annualRentPerSqFt = 
      baseRates[commercialType] * 
      (classMultipliers[propertyClass] || 1.0) * 
      sizeMultiplier;

    // Calculate total annual rent
    return annualRentPerSqFt * squareFeet;
  }

  /**
   * Analyzes different rental strategies for a property
   * 
   * @param property - Property detail object
   * @param baseMetrics - Base investment metrics
   * @returns Object containing analysis for different rental strategies
   */
  async analyzeRentalStrategies(
    property: PropertyDetail,
    baseMetrics: InvestmentMetrics
  ): Promise<{ [key: string]: RentalAnalysis }> {
    const propertyValue = baseMetrics.propertyValue;
    const sqft = property.building?.size?.livingsize || property.building?.size?.bldgsize || 1500;
    const bedrooms = property.building?.rooms?.beds || 0;
    const bathrooms = property.building?.rooms?.bathstotal || 0;
    const zip = property.address?.postal1 || '';
    const state = property.address?.countrySubd || '';

    // Long-term rental strategy
    const longTerm: RentalAnalysis = {
      strategy: 'Long Term Rental',
      monthlyRevenue: baseMetrics.estimatedMonthlyRent,
      occupancyRate: 95, // 95% occupancy
      additionalExpenses: {
        turnover: 100, // Monthly average for turnover costs
        marketing: 50,  // Monthly marketing costs
      },
      netIncome: 0,    // Calculated below
      roi: 0,          // Calculated below
      notes: [
        'Most stable rental strategy',
        'Lower management overhead',
        'Consistent cash flow',
        'Lower vacancy risk',
        'Reduced maintenance costs'
      ]
    };

    // Short-term rental strategy (Airbnb/VRBO)
    const shortTermBaseRate = baseMetrics.estimatedMonthlyRent * 2.5 / 30; // Daily rate
    const shortTerm: RentalAnalysis = {
      strategy: 'Short Term Rental',
      monthlyRevenue: Math.min(shortTermBaseRate * 30 * 0.65, baseMetrics.estimatedMonthlyRent * 1.8), // Cap at 1.8x long-term rent
      occupancyRate: 65, // 65% occupancy
      additionalExpenses: {
        furnishing: 500,     // Monthly average for furniture replacement
        cleaning: 400,       // Monthly cleaning costs
        supplies: 200,       // Monthly supplies
        utilities: 300,      // Higher utilities due to variable usage
        insurance: 200,      // Additional short-term rental insurance
        marketing: 150,      // Platform fees and marketing
      },
      netIncome: 0,    // Calculated below
      roi: 0,          // Calculated below
      notes: [
        'Higher potential revenue',
        'More management intensive',
        'Seasonal fluctuations',
        'Higher operating costs',
        'May require local permits'
      ]
    };

    // Section 8 rental strategy
    const section8: RentalAnalysis = {
      strategy: 'Section 8 Rental',
      monthlyRevenue: baseMetrics.estimatedMonthlyRent * 1.1, // Often slightly higher than market
      occupancyRate: 98, // Very high occupancy
      additionalExpenses: {
        compliance: 150,    // Monthly average for inspections and compliance
        maintenance: 200,   // Additional maintenance costs
        insurance: 100,     // Additional insurance costs
      },
      netIncome: 0,    // Calculated below
      roi: 0,          // Calculated below
      notes: [
        'Guaranteed rent payments',
        'Higher occupancy rates',
        'Regular inspections required',
        'Potential for longer tenancies',
        'May require additional maintenance'
      ]
    };

    // Mid-term rental strategy (1-6 months)
    const midTerm: RentalAnalysis = {
      strategy: 'Mid Term Rental',
      monthlyRevenue: baseMetrics.estimatedMonthlyRent * 1.4, // Premium for furnished
      occupancyRate: 85, // 85% occupancy
      additionalExpenses: {
        furnishing: 300,    // Monthly average for furniture
        utilities: 200,     // Included utilities
        marketing: 100,     // Marketing costs
        turnover: 150,      // Higher turnover costs
      },
      netIncome: 0,    // Calculated below
      roi: 0,          // Calculated below
      notes: [
        'Higher than long-term rates',
        'Lower turnover than short-term',
        'Popular with business travelers',
        'Good for medical professionals',
        'Reduced wear and tear vs short-term'
      ]
    };

    // Calculate net income and ROI for each strategy
    const strategies = [longTerm, shortTerm, section8, midTerm];
    strategies.forEach(strategy => {
      const monthlyExpenses = Object.values(strategy.additionalExpenses).reduce((a: number, b: number) => a + b, 0);
      const baseExpenses = baseMetrics.totalMonthlyExpenses;
      
      // Calculate net income (revenue - expenses)
      // Ensure we don't get unrealistic values
      const adjustedRevenue = strategy.monthlyRevenue * strategy.occupancyRate / 100;
      const totalMonthlyExpenses = baseExpenses + monthlyExpenses;
      strategy.netIncome = Math.round(adjustedRevenue - totalMonthlyExpenses);
      
      // Cap netIncome to reasonable values to prevent unrealistic numbers
      if (strategy.netIncome > 10000) {
        strategy.netIncome = Math.min(strategy.netIncome, adjustedRevenue * 0.3);
      }

      // Calculate ROI using the improved calculation function
      const downPayment = baseMetrics.downPayment > 0 ? baseMetrics.downPayment : baseMetrics.purchasePrice * 0.25;
      strategy.roi = this.calculateRentalROI(baseMetrics.purchasePrice, downPayment, strategy.monthlyRevenue, totalMonthlyExpenses);
    });

    return {
      LONG_TERM: longTerm,
      SHORT_TERM: shortTerm,
      SECTION_8: section8,
      MID_TERM: midTerm
    };
  }

  /**
   * Calculates the estimated property value based on assessment, valuation, or sale price
   * 
   * @param property - Property detail object
   * @returns Estimated property value
   */
  private calculatePropertyValue(property: PropertyDetail): number {
    // Get property value from assessment or sale price, with a reasonable default
    let saleAmount = 0;
    if (property.sale?.amount) {
      if (typeof property.sale.amount === 'object' && property.sale.amount !== null) {
        // Handle case where amount is an object with saleamt property
        saleAmount = (property.sale.amount as any).saleamt as number || 0;
      } else {
        // Handle case where amount is a direct number
        saleAmount = property.sale.amount as number;
      }
    }
    
    // Fix property access issues in the assessment value calculation
    const assessedValue = property.assessment?.assessed 
      ? property.assessment.assessed.assdTtlValue || 0 
      : 0;
    
    const marketValue = property.assessment?.market 
      ? property.assessment.market.mktTtlValue || 0 
      : 0;

    return (
      assessedValue || 
      marketValue || 
      property.valuation?.value || 
      saleAmount ||
      350000 // Default value if no value is available
    );
  }

  /**
   * Calculates monthly mortgage payment based on loan amount and interest rate
   * 
   * @param loanAmount - Loan amount in dollars
   * @param annualInterestRate - Annual interest rate (percentage)
   * @param loanTermYears - Loan term in years
   * @returns Monthly mortgage payment
   */
  private calculateMonthlyMortgage(loanAmount: number, annualInterestRate: number, loanTermYears: number): number {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = loanTermYears * 12;
    
    const mortgage = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    return Math.round(mortgage);
  }

  /**
   * Gets the base price per square foot based on location
   * 
   * @param state - State code (e.g., 'CA', 'NY')
   * @param zip - Zip code
   * @returns Base price per square foot
   */
  public getBasePrice(state: string, zip: string): number {
    // Default base price if state not found
    let basePrice = 120; // $120 per square foot as default
    
    if (state in this.marketData) {
      const stateData = this.marketData[state as keyof typeof this.marketData];
      
      // Handle different state data formats
      if (state === 'CA' || state === 'FL') {
        // For coastal/inland states
        const stateWithRegions = stateData as CoastalInlandState;
        
        // Check if zip is in coastal regions
        const isCoastal = Object.keys(stateWithRegions.coastal.regions).some(region => 
          zip.startsWith(region)
        );
        
        if (isCoastal) {
          basePrice = stateWithRegions.coastal.base;
          
          // Apply regional adjustments if available
          const zipPrefix = Object.keys(stateWithRegions.coastal.regions).find(prefix => 
            zip.startsWith(prefix)
          );
          
          if (zipPrefix) {
            basePrice = stateWithRegions.coastal.regions[zipPrefix];
          }
        } else {
          basePrice = stateWithRegions.inland.base;
          
          // Apply regional adjustments if available
          const zipPrefix = Object.keys(stateWithRegions.inland.regions).find(prefix => 
            zip.startsWith(prefix)
          );
          
          if (zipPrefix) {
            basePrice = stateWithRegions.inland.regions[zipPrefix];
          }
        }
      } else if (state === 'NY' || state === 'NJ' || state === 'TX') {
        // For simple states with regions
        const simpleState = stateData as SimpleState;
        basePrice = simpleState.base;
        
        // Apply regional adjustments if available
        const zipPrefix = Object.keys(simpleState.regions).find(prefix => 
          zip.startsWith(prefix)
        );
        
        if (zipPrefix) {
          basePrice = simpleState.regions[zipPrefix];
        }
      } else {
        // For default state
        const defaultState = this.marketData.DEFAULT;
        basePrice = defaultState.base;
        
        // Check if there's a premium market for this state
        if (state in defaultState.premium_markets) {
          const premiumMarkets = defaultState.premium_markets[state];
          
          // Apply premium if zip is in premium markets
          const zipPrefix = Object.keys(premiumMarkets).find(prefix => 
            zip.startsWith(prefix)
          );
          
          if (zipPrefix) {
            basePrice = premiumMarkets[zipPrefix];
          }
        }
      }
    }
    
    return basePrice;
  }

  /**
   * Calculates estimated monthly rent based on property details and location
   * 
   * @param property - Property detail object
   * @returns Estimated monthly rent
   */
  public calculateEstimatedRent(property: PropertyDetail): number {
    const sqft = property.building?.size?.livingsize || property.building?.size?.bldgsize || 1500;
    const state = property.address?.state || 'DEFAULT';
    const zip = property.address?.postal1 || '';
    const basePrice = this.getBasePrice(state, zip);
    return Math.round(sqft * basePrice);
  }

  /**
   * Calculates investment metrics for a property
   * 
   * @param property - Property details
   * @param config - Investment configuration
   * @returns Investment metrics
   */
  public calculateInvestmentMetrics(property: PropertyDetail, config: Partial<InvestmentConfig> = {}): InvestmentMetrics {
    try {
      // Helper function to get sale amount
      const getSaleAmount = (prop: PropertyDetail): number => {
        if (prop.sale?.amount) {
          if (typeof prop.sale.amount === 'object' && prop.sale.amount !== null) {
            // Handle case where amount is an object with saleamt property
            return (prop.sale.amount as any).saleamt as number || 0;
          } else {
            // Handle case where amount is a direct number
            return prop.sale.amount as number;
          }
        }
        return 0;
      };

      // Default values
      const purchasePrice = config.purchasePrice || getSaleAmount(property) || 500000;
      
      // Handle downpayment - prioritize amount over percentage if both are provided
      let downPayment: number;
      let downPaymentPercent: number = 25; // Default to 25%
      
      if (config.downPayment !== undefined) {
        downPayment = config.downPayment * purchasePrice;
        downPaymentPercent = config.downPayment * 100;
      } else if (config.downPaymentPercent !== undefined) {
        downPaymentPercent = config.downPaymentPercent;
        downPayment = (purchasePrice * downPaymentPercent) / 100;
      } else {
        // Use default 25% down payment
        downPayment = purchasePrice * 0.25;
      }
      
      const loanAmount = purchasePrice - downPayment;
      const interestRate = config.interestRate !== undefined ? config.interestRate : 7.5;
      const loanTermYears = config.loanTerm || 30;
      
      // Calculate monthly mortgage payment
      const monthlyMortgage = this.calculateMonthlyMortgage(loanAmount, interestRate, loanTermYears);
      
      // Calculate monthly expenses
      const monthlyPropertyTax = (purchasePrice * (config.propertyTaxRate || 1.2)) / (100 * 12);
      const monthlyInsurance = (purchasePrice * (config.insuranceRate || 0.5)) / (100 * 12);
      const monthlyUtilities = config.monthlyUtilities || 200; // Default $200 as per memory
      const monthlyMaintenance = (config.estimatedMonthlyRent || this.calculateEstimatedRent(property)) * ((config.maintenanceRate || config.maintenancePercent || 8) / 100);
      const monthlyVacancy = (config.estimatedMonthlyRent || this.calculateEstimatedRent(property)) * ((config.vacancyRate || 5) / 100);
      const monthlyManagement = (config.estimatedMonthlyRent || this.calculateEstimatedRent(property)) * ((config.managementRate || config.propertyManagementPercent || 8) / 100);
      const monthlyHOA = config.monthlyHOA || 0;
      
      // Calculate total monthly expenses
      const totalMonthlyExpenses = 
        monthlyMortgage +
        monthlyPropertyTax +
        monthlyInsurance +
        monthlyUtilities +
        monthlyMaintenance +
        monthlyVacancy +
        monthlyManagement +
        monthlyHOA;

      // Calculate monthly and annual cash flow
      const monthlyCashFlow = (config.estimatedMonthlyRent || this.calculateEstimatedRent(property)) - totalMonthlyExpenses;
      const annualCashFlow = monthlyCashFlow * 12;
      
      // Calculate NOI (Net Operating Income)
      const monthlyOperatingExpenses = 
        monthlyPropertyTax + 
        monthlyInsurance + 
        monthlyUtilities + 
        monthlyMaintenance + 
        monthlyVacancy + 
        monthlyManagement +
        monthlyHOA;
      const annualOperatingExpenses = monthlyOperatingExpenses * 12;
      const annualRent = (config.estimatedMonthlyRent || this.calculateEstimatedRent(property)) * 12;
      const netOperatingIncome = annualRent - annualOperatingExpenses;
      
      // Calculate investment metrics
      const capRate = (netOperatingIncome / purchasePrice) * 100;
      const cashOnCashReturn = annualCashFlow > 0 && downPayment > 0 ? 
        (annualCashFlow / downPayment) * 100 : 0;
      
      // Calculate DSCR (Debt Service Coverage Ratio) with safeguards
      const annualMortgage = monthlyMortgage * 12;
      const dscr = annualMortgage > 0 ? 
        netOperatingIncome / annualMortgage : 
        (netOperatingIncome > 0 ? 1.5 : 0); // Default to 1.5 if no mortgage but positive NOI
      
      // Calculate months to break even on down payment
      const breakEvenMonths = monthlyCashFlow > 0 ? 
        Math.ceil(downPayment / monthlyCashFlow) : 
        240; // Default to 20 years

      return {
        propertyValue: this.calculatePropertyValue(property),
        purchasePrice,
        downPaymentPercent,
        downPayment,
        loanAmount,
        interestRate,
        monthlyMortgage,
        estimatedMonthlyRent: config.estimatedMonthlyRent || this.calculateEstimatedRent(property),
        grossMonthlyIncome: config.estimatedMonthlyRent || this.calculateEstimatedRent(property),
        monthlyRevenue: config.estimatedMonthlyRent || this.calculateEstimatedRent(property),
        monthlyExpenses: {
          mortgage: monthlyMortgage,
          propertyTax: monthlyPropertyTax,
          insurance: monthlyInsurance,
          utilities: monthlyUtilities,
          maintenance: monthlyMaintenance,
          vacancy: monthlyVacancy,
          management: monthlyManagement,
          hoa: monthlyHOA
        },
        monthlyInsurance,
        monthlyUtilities,
        monthlyMaintenance,
        monthlyVacancy,
        monthlyManagement,
        monthlyHOA,
        operatingExpenses: (monthlyPropertyTax + monthlyInsurance + monthlyUtilities + monthlyMaintenance + monthlyVacancy + monthlyManagement + monthlyHOA) * 12,
        occupancyRate: 100 - (config.vacancyRate ? config.vacancyRate * 100 : 5),
        cashFlow: annualCashFlow,
        returnOnInvestment: (annualCashFlow / downPayment) * 100,
        breakEvenMonths,
        totalMonthlyExpenses,
        monthlyCashFlow,
        annualCashFlow,
        netOperatingIncome,
        capRate,
        cashOnCashReturn,
        dscr
      };
    } catch (error) {
      console.error('Error calculating investment metrics:', error);
      throw new Error('Failed to calculate investment metrics: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Calculates comprehensive investment metrics including rental strategies and AI analysis
   * 
   * @param property - Property detail object
   * @param params - Investment configuration parameters
   * @returns Full investment analysis
   */
  public async calculateFullInvestmentMetrics(
    property: PropertyDetail,
    params: InvestmentConfig = defaultResidentialConfig
  ): Promise<FullInvestmentAnalysis> {
    try {
      // Calculate base metrics
      const baseMetrics = this.calculateInvestmentMetrics(property, params);
      
      // Analyze rental strategies
      const rentalStrategies = await this.analyzeRentalStrategies(property, baseMetrics);
      
      // Generate AI analysis
      const aiAnalysis = await this.generateAIAnalysis(property, baseMetrics, rentalStrategies);
      
      return {
        baseMetrics,
        rentalStrategies,
        aiAnalysis
      };
    } catch (error) {
      console.error('Error calculating full investment metrics:', error);
      throw new Error('Failed to calculate full investment metrics: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  /**
   * Calculates commercial investment metrics for a property
   * 
   * @param property - Property details
   * @param config - Commercial investment configuration
   * @returns Commercial investment metrics
   */
  public calculateCommercialInvestmentMetrics(
    property: PropertyDetail,
    config: Partial<InvestmentConfig> = {}
  ): ImportedCommercialInvestmentMetrics {
    try {
      // Default commercial property type is Office if not specified
      const propertyType = config.propertyType || CommercialPropertyType.Office;
      
      // Default property class is B if not specified
      const propertyClass = config.propertyClass || PropertyClass.B;
      
      // Default lease type is NNN if not specified
      const leaseType = config.leaseType || LeaseType.NNN;
      
      // Get property size (in square feet)
      const totalSqFt = property.building?.size?.bldgsize || 
                       property.building?.size?.livingsize || 
                       5000; // Default to 5000 sqft if not available
      
      // Calculate base rent per square foot based on property type
      let baseRentPerSqFt = 0;
      switch (propertyType) {
        case CommercialPropertyType.Office:
          baseRentPerSqFt = 65;
          break;
        case CommercialPropertyType.Retail:
          baseRentPerSqFt = 55;
          break;
        case CommercialPropertyType.Industrial:
          baseRentPerSqFt = 35;
          break;
        case CommercialPropertyType.MixedUse:
          baseRentPerSqFt = 60;
          break;
        case CommercialPropertyType.MedicalOffice:
          baseRentPerSqFt = 70;
          break;
        case CommercialPropertyType.ShoppingCenter:
          baseRentPerSqFt = 50;
          break;
        case CommercialPropertyType.Warehouse:
          baseRentPerSqFt = 30;
          break;
        default:
          baseRentPerSqFt = 50; // Default value
      }
      
      // Adjust rent based on property class
      let rentMultiplier = 1.0;
      switch (propertyClass) {
        case PropertyClass.A:
          rentMultiplier = 1.2; // Class A: +20%
          break;
        case PropertyClass.B:
          rentMultiplier = 1.0; // Class B: base rate
          break;
        case PropertyClass.C:
          rentMultiplier = 0.8; // Class C: -20%
          break;
        case PropertyClass.D:
          rentMultiplier = 0.6; // Class D: -40%
          break;
        default:
          rentMultiplier = 1.0; // Default to Class B
      }
      
      // Adjust rent based on lease type
      let leaseMultiplier = 1.0;
      switch (leaseType) {
        case LeaseType.NNN:
          leaseMultiplier = 1.0; // NNN: base rate
          break;
        case LeaseType.ModifiedGross:
          leaseMultiplier = 1.15; // Modified Gross: +15%
          break;
        case LeaseType.FullService:
          leaseMultiplier = 1.35; // Full Service: +35%
          break;
        default:
          leaseMultiplier = 1.0; // Default to NNN
      }
      
      // Calculate final rent per square foot
      const rentPerSqFt = baseRentPerSqFt * rentMultiplier * leaseMultiplier;
      
      // Calculate annual rent
      const annualRent = rentPerSqFt * totalSqFt;
      
      // Calculate monthly rent
      const monthlyRent = annualRent / 12;
      
      // Default occupancy rate is 95%
      const occupancyRate = config.occupancyRate || 95;
      
      // Calculate effective gross income (adjusted for occupancy)
      const effectiveGrossIncome = (monthlyRent * occupancyRate) / 100;
      
      // Calculate net rentable area (typically 85% of total area for office/retail)
      const netRentableArea = totalSqFt * 0.85;
      
      // Calculate common area maintenance fee (CAM)
      const commonAreaMaintenanceFee = (totalSqFt - netRentableArea) * 5; // $5 per sqft for common areas
      
      // Get property value (use asking price if available, otherwise use estimated value)
      const propertyValue = property.sale?.amount ? property.sale.amount : 
                           property.assessment?.assessed?.assdTtlValue || 
                           property.assessment?.market?.mktTtlValue || 
                           totalSqFt * 200; // Default value based on $200 per sqft
      
      // Calculate purchase price (use property value if not provided)
      const purchasePrice = config.purchasePrice || propertyValue;
      
      // Calculate down payment amount (default to 25% if not specified)
      const downPaymentPercent = config.downPaymentPercent || 25;
      const downPayment = (purchasePrice * downPaymentPercent) / 100;
      
      // Calculate loan amount
      const loanAmount = purchasePrice - downPayment;
      
      // Calculate monthly mortgage payment (default to 6.5% interest rate and 20 year term for commercial)
      const interestRate = config.interestRate || 6.5;
      const loanTermYears = config.loanTerm || 20;
      const monthlyMortgage = this.calculateMonthlyMortgage(loanAmount, interestRate, loanTermYears);
      
      // Calculate operating expenses
      const monthlyPropertyTax = (purchasePrice * (config.propertyTaxRate || 1.2)) / (100 * 12);
      const monthlyInsurance = (purchasePrice * (config.insuranceRate || 0.5)) / (100 * 12);
      const monthlyManagement = effectiveGrossIncome * ((config.managementRate || 0.04));
      const monthlyUtilities = leaseType === LeaseType.FullService ? totalSqFt * 0.2 : 0; // $0.20 per sqft for utilities if full service
      const monthlyMaintenance = leaseType === LeaseType.FullService ? totalSqFt * 0.15 : 0; // $0.15 per sqft for maintenance if full service
      const monthlyVacancy = monthlyRent * ((100 - occupancyRate) / 100);
      const monthlyHOA = config.monthlyHOA || 0;
      
      // Calculate total monthly expenses
      const totalMonthlyExpenses = 
        monthlyMortgage +
        monthlyPropertyTax + 
        monthlyInsurance + 
        monthlyManagement +
        monthlyUtilities +
        monthlyMaintenance +
        monthlyHOA;
      
      // Calculate monthly cash flow
      const monthlyCashFlow = effectiveGrossIncome - totalMonthlyExpenses;
      const annualCashFlow = monthlyCashFlow * 12;
      
      // Calculate NOI (Net Operating Income)
      const operatingExpenses = 
        monthlyPropertyTax + 
        monthlyInsurance + 
        monthlyManagement +
        monthlyUtilities +
        monthlyMaintenance +
        monthlyHOA;
      
      const monthlyNOI = effectiveGrossIncome - operatingExpenses;
      const netOperatingIncome = monthlyNOI * 12;
      
      // Calculate cap rate
      const capRate = (netOperatingIncome / purchasePrice) * 100;
      
      // Calculate cash on cash return
      const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
      
      // Calculate DSCR (Debt Service Coverage Ratio)
      const annualDebtService = monthlyMortgage * 12;
      const dscr = netOperatingIncome / annualDebtService;
      
      // Calculate break-even occupancy
      const breakEvenMonths = downPayment > 0 ? Math.ceil(downPayment / monthlyCashFlow) : 0;

      // Return commercial investment metrics
      return {
        propertyValue,
        purchasePrice,
        downPayment,
        downPaymentPercent,
        loanAmount,
        interestRate,
        monthlyMortgage,
        estimatedMonthlyRent: monthlyRent,
        grossMonthlyIncome: monthlyRent,
        monthlyRevenue: effectiveGrossIncome,
        monthlyExpenses: {
          mortgage: monthlyMortgage,
          propertyTax: monthlyPropertyTax,
          insurance: monthlyInsurance,
          utilities: monthlyUtilities,
          maintenance: monthlyMaintenance,
          vacancy: monthlyVacancy,
          management: monthlyManagement,
          hoa: monthlyHOA
        },
        totalMonthlyExpenses,
        monthlyCashFlow,
        annualCashFlow,
        netOperatingIncome,
        capRate,
        cashOnCashReturn,
        dscr,
        commercialType: propertyType,
        propertyClass,
        leaseType,
        annualRentPerSqFt: rentPerSqFt,
        squareFeet: totalSqFt,
        vacancyAllowance: config.vacancyRate || 5, // Default to 5% if undefined
        managementFee: monthlyManagement,
        adminFee: (config.adminRate || 2) * monthlyRent / 100, // Default to 2% of revenue based on memory
        occupancyRate: 100 - (config.vacancyRate || 5), // Default to 5% vacancy rate
        operatingExpenses: operatingExpenses * 12,
        monthlyInsurance,
        monthlyUtilities,
        monthlyMaintenance,
        monthlyVacancy,
        monthlyManagement,
        monthlyHOA,
        debtCoverageRatio: dscr,
        cashFlow: annualCashFlow,
        returnOnInvestment: cashOnCashReturn,
        breakEvenMonths
      };
    } catch (error) {
      console.error('Error calculating commercial investment metrics:', error);
      throw new Error(`Failed to calculate commercial investment metrics: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculate return on investment for a rental property
   */
  public calculateRentalROI(
    purchasePrice: number,
    downPayment: number,
    monthlyRent: number,
    monthlyExpenses: number
  ): number {
    const annualRent = monthlyRent * 12;
    const annualExpenses = monthlyExpenses * 12;
    const annualCashFlow = annualRent - annualExpenses;
    const roi = (annualCashFlow / downPayment) * 100;
    return parseFloat(roi.toFixed(2));
  }

  /**
   * Calculate projected property value after a given number of years
   */
  public calculateProjectedValue(
    currentValue: number,
    years: number,
    annualAppreciationRate: number = 3
  ): number {
    return currentValue * Math.pow(1 + annualAppreciationRate / 100, years);
  }

  /**
   * Analyze investment opportunity and provide comprehensive metrics
   */
  public async analyzeInvestmentOpportunity(
    property: PropertyDetail,
    params: Partial<InvestmentConfig> = {}
  ): Promise<FullInvestmentAnalysis> {
    try {
      // Calculate base metrics
      const baseMetrics = this.calculateInvestmentMetrics(property, params);
      
      // Analyze rental strategies
      const rentalStrategies = await this.analyzeRentalStrategies(property, baseMetrics);
      
      // Generate AI analysis
      const aiAnalysis = await this.generateAIAnalysis(property, baseMetrics, rentalStrategies);
      
      return {
        baseMetrics,
        rentalStrategies,
        aiAnalysis
      };
    } catch (error) {
      console.error('Error analyzing investment opportunity:', error);
      throw error;
    }
  }

  /**
   * Generate AI analysis for investment opportunity
   */
  public async generateAIAnalysis(
    property: PropertyDetail,
    baseMetrics: InvestmentMetrics,
    rentalStrategies: { [key: string]: RentalAnalysis }
  ): Promise<AIAnalysis> {
    try {
      // Calculate projected property value
      const projectedValue = this.calculateProjectedValue(baseMetrics.propertyValue, 5);
      
      // Calculate potential ROI
      const totalMonthlyExpenses = Object.values(baseMetrics.monthlyExpenses).reduce((sum, expense) => sum + expense, 0);
      const potentialROI = this.calculateRentalROI(baseMetrics.propertyValue, baseMetrics.downPayment, baseMetrics.estimatedMonthlyRent, totalMonthlyExpenses);
      
      // Analyze rental strategies
      const bestStrategy = Object.values(rentalStrategies).reduce((best: RentalAnalysis, current: RentalAnalysis) => {
        if (current.netIncome > best.netIncome) {
          return current;
        }
        return best;
      }, rentalStrategies.LONG_TERM);
      
      // Generate AI analysis based on the structure defined in types/investment.ts
      const aiAnalysis: AIAnalysis = {
        overallRecommendation: baseMetrics.cashOnCashReturn > 8 ? 'Strong Buy' : 
                              baseMetrics.cashOnCashReturn > 6 ? 'Buy' : 
                              baseMetrics.cashOnCashReturn > 4 ? 'Neutral' : 'Caution',
        confidenceScore: 85,
        summary: `This property has a ${baseMetrics.cashOnCashReturn.toFixed(2)}% cash-on-cash return and a ${baseMetrics.capRate.toFixed(2)}% cap rate.`,
        pros: [
          `DSCR of ${baseMetrics.dscr.toFixed(2)}`,
          `Cap rate of ${baseMetrics.capRate.toFixed(2)}%`,
          `Cash-on-cash return of ${baseMetrics.cashOnCashReturn.toFixed(2)}%`
        ],
        cons: [
          baseMetrics.monthlyCashFlow < 0 ? `Negative cash flow of $${baseMetrics.monthlyCashFlow.toFixed(2)}` : '',
          baseMetrics.capRate < 5 ? 'Cap rate below market average' : ''
        ].filter(item => item !== ''),
        bestUseCase: bestStrategy.strategy,
        riskFactors: [
          {
            factor: 'Market Volatility',
            severity: 'Medium',
            description: 'Real estate markets can fluctuate based on economic conditions.'
          },
          {
            factor: 'Vacancy Risk',
            severity: baseMetrics.monthlyCashFlow < 0 ? 'High' : 'Low',
            description: 'Risk of property remaining vacant for extended periods.'
          }
        ],
        opportunityAreas: [
          'Potential for property value appreciation',
          'Rental income growth potential'
        ],
        marketTrends: [
          'Increasing demand for rental properties',
          'Rising property values in the area'
        ],
        recommendedStrategy: bestStrategy.strategy,
        additionalConsiderations: [
          'Consider long-term holding strategy',
          'Explore refinancing options for better terms'
        ]
      };
      
      return aiAnalysis;
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      throw error;
    }
  }
}

export default new AttomAPI(process.env.ATTOM_API_KEY || '');
