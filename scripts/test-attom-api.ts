import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import attomAPI from '../src/lib/attom';
import { analyzePropertyInvestment } from '../src/lib/llm';

async function main() {
  const [,, address, city, state] = process.argv;
  
  if (!address || !city || !state) {
    console.error('Usage: npx tsx scripts/test-attom-api.ts "address" "city" "state"');
    process.exit(1);
  }

  try {
    console.log('Searching for property:', { address, city, state });
    const propertyData = await attomAPI.searchProperty({ address, city, state });
    
    if (!propertyData.property || propertyData.property.length === 0) {
      console.error('Property not found');
      process.exit(1);
    }

    const property = propertyData.property[0];
    console.log('Property found:', JSON.stringify(property, null, 2));

    // Calculate investment metrics
    const metrics = await attomAPI.calculateInvestmentMetrics(property);
    console.log('Investment metrics:', JSON.stringify(metrics, null, 2));

    // Get market analysis
    const analysis = await analyzePropertyInvestment(
      property,
      metrics,
      { city, state, zip: property.address?.postal1 || '' }
    );
    console.log('Market analysis:', JSON.stringify(analysis, null, 2));

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
