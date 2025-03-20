import { AttomAPI } from '../lib/attom';
import { analyzePropertyInvestment } from '../lib/llm';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testPropertySearch() {
    const attomApi = new AttomAPI(process.env.ATTOM_API_KEY!);
    
    // Test address - a commercial property in San Francisco
    const searchRequest = {
        address: "555 California St",
        city: "San Francisco",
        state: "CA",
        zip: "94104"
    };

    try {
        console.log("Searching for property...");
        const propertyResponse = await attomApi.searchProperty(searchRequest);
        
        if (!propertyResponse.property?.[0]) {
            console.error("No property found!");
            return;
        }

        const property = propertyResponse.property[0];
        console.log("\nProperty Details:");
        console.log(JSON.stringify(property, null, 2));

        // Calculate investment metrics
        console.log("\nCalculating commercial metrics...");
        const metrics = attomApi.calculateCommercialInvestmentMetrics(property);
        console.log("\nInvestment Metrics:");
        console.log(JSON.stringify(metrics, null, 2));

        // Get AI analysis
        console.log("\nGenerating AI analysis...");
        const analysis = await analyzePropertyInvestment(
            property,
            metrics,
            {
                city: searchRequest.city,
                state: searchRequest.state,
                zip: searchRequest.zip
            }
        );

        console.log("\nAI Analysis:");
        console.log(JSON.stringify(analysis, null, 2));

    } catch (error) {
        console.error("Error during property search:", error);
    }
}

// Run the test
testPropertySearch();
