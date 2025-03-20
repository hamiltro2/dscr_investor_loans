import { AttomAPI } from '../lib/attom';

const attomApi = new AttomAPI(process.env.ATTOM_API_KEY || '');

async function searchProperty() {
    try {
        console.log('Searching for property...');
        const response = await attomApi.searchProperty({
            address: '4920 Island View St',
            city: 'Oxnard',
            state: 'CA',
            zip: '93035'
        });
        
        console.log('Property Details:', JSON.stringify(response, null, 2));
        
        if (response.property?.[0]) {
            console.log('\nCalculating investment metrics...');
            const metrics = attomApi.calculateInvestmentMetrics(response.property[0]);
            console.log('\nInvestment Metrics:', JSON.stringify(metrics, null, 2));
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the search
searchProperty();
