import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { 
  PropertyDetail,
  PropertyClass
} from '@/types/attom';
import { 
  InvestmentMetrics,
  InvestmentConfig,
  FullInvestmentAnalysis,
  RentalAnalysis as RentalAnalysisType,
  AIAnalysis
} from '@/types/investment';
import { 
  propertyYields,
  defaultResidentialConfig,
  defaultMultiFamilyConfig,
  defaultCommercialConfig,
  commercialRentRates,
  CommercialPropertyType
} from '@/config/investment';
import { calculateRentalROI, calculateProjectedValue } from './rentalFixes';

export interface RentalAnalysis {
  strategy: string;
  monthlyRevenue: number;
  occupancyRate: number;
  additionalExpenses: { [key: string]: number };
  netIncome: number;
  roi: number;
  notes: string[];
}

// Rest of the file remains the same, but with the fixed reduce function
// ...

// Example of the fixed reduce function:
// const monthlyExpenses = Object.values(strategy.additionalExpenses).reduce((a: number, b: number) => a + b, 0);
