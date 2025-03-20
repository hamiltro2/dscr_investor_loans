const dotenv = require('dotenv');
const { AttomAPI } = require('../src/lib/attom');
const { defaultResidentialConfig } = require('../src/config/investment');

dotenv.config({ path: '.env.local' });

const propertyData = {
  "identifier": {
    "Id": 156288510,
    "fips": "06111",
    "apn": "191-0-161-105",
    "attomId": 156288510
  },
  "lot": {
    "depth": 100,
    "frontage": 40,
    "lotsize1": 0.0899908,
    "lotsize2": 3920,
    "pooltype": "NO POOL"
  },
  "building": {
    "size": {
      "bldgsize": 3031,
      "grosssize": 2646,
      "livingsize": 3031,
      "universalsize": 3031
    },
    "rooms": {
      "bathsfull": 4,
      "bathstotal": 4,
      "beds": 4,
      "roomsTotal": 7
    },
    "summary": {
      "levels": 2,
      "quality": "AVERAGE",
      "view": "VIEW - NONE"
    }
  },
  "address": {
    "line1": "4920 ISLAND VIEW ST",
    "locality": "OXNARD",
    "countrySubd": "CA",
    "postal1": "93035"
  },
  "summary": {
    "propclass": "Single Family Residence / Townhouse",
    "proptype": "SFR",
    "yearbuilt": 1965,
    "propLandUse": "SFR"
  },
  "area": {
    "countrysecsubd": "Ventura"
  }
};

async function analyzeProperty() {
  const attom = new AttomAPI(process.env.ATTOM_API_KEY);
  
  try {
    // Calculate base metrics using default residential config
    const analysis = await attom.calculateFullInvestmentMetrics(propertyData, defaultResidentialConfig);
    
    // Format the analysis results
    console.log('\nProperty Analysis Report');
    console.log('======================\n');
    
    console.log('Property Details');
    console.log('----------------');
    console.log(`Type: ${propertyData.summary.propclass}`);
    console.log(`Size: ${propertyData.building.size.livingsize} sqft`);
    console.log(`Bedrooms: ${propertyData.building.rooms.beds}`);
    console.log(`Bathrooms: ${propertyData.building.rooms.bathstotal}`);
    console.log(`Year Built: ${propertyData.summary.yearbuilt}`);
    console.log(`Quality: ${propertyData.building.summary.quality}`);
    
    console.log('\nInvestment Analysis');
    console.log('------------------');
    console.log(`Property Value: $${analysis.baseMetrics.propertyValue.toLocaleString()}`);
    console.log(`Down Payment (25%): $${analysis.baseMetrics.downPayment.toLocaleString()}`);
    console.log(`Loan Amount: $${analysis.baseMetrics.loanAmount.toLocaleString()}`);
    console.log(`Interest Rate: ${(analysis.baseMetrics.interestRate * 100).toFixed(2)}%`);
    
    console.log('\nMonthly Income');
    console.log('--------------');
    console.log(`Estimated Monthly Rent: $${analysis.baseMetrics.monthlyRevenue.toLocaleString()}`);
    console.log(`Gross Monthly Income: $${analysis.baseMetrics.grossMonthlyIncome.toLocaleString()}`);
    
    console.log('\nMonthly Expenses');
    console.log('----------------');
    console.log(`Mortgage Payment: $${analysis.baseMetrics.monthlyMortgage.toLocaleString()}`);
    console.log(`Property Tax: $${analysis.baseMetrics.monthlyPropertyTax.toLocaleString()}`);
    console.log(`Insurance: $${analysis.baseMetrics.monthlyInsurance.toLocaleString()}`);
    console.log(`Utilities: $${analysis.baseMetrics.monthlyUtilities.toLocaleString()}`);
    console.log(`Maintenance (8%): $${analysis.baseMetrics.monthlyMaintenance.toLocaleString()}`);
    console.log(`Vacancy (5%): $${analysis.baseMetrics.monthlyVacancy.toLocaleString()}`);
    console.log(`Property Management (8%): $${analysis.baseMetrics.monthlyManagement.toLocaleString()}`);
    console.log(`Total Monthly Expenses: $${(
      analysis.baseMetrics.monthlyMortgage +
      analysis.baseMetrics.monthlyPropertyTax +
      analysis.baseMetrics.monthlyInsurance +
      analysis.baseMetrics.monthlyUtilities +
      analysis.baseMetrics.monthlyMaintenance +
      analysis.baseMetrics.monthlyVacancy +
      analysis.baseMetrics.monthlyManagement
    ).toLocaleString()}`);
    
    console.log('\nInvestment Metrics');
    console.log('-----------------');
    console.log(`Net Operating Income (NOI): $${analysis.baseMetrics.netOperatingIncome.toLocaleString()}/year`);
    console.log(`Monthly Cash Flow: $${analysis.baseMetrics.monthlyCashFlow.toLocaleString()}`);
    console.log(`Cap Rate: ${(analysis.baseMetrics.capRate * 100).toFixed(2)}%`);
    console.log(`Cash on Cash Return: ${(analysis.baseMetrics.cashOnCashReturn * 100).toFixed(2)}%`);
    console.log(`DSCR: ${analysis.baseMetrics.dscr.toFixed(2)}`);
    
    if (analysis.rentalStrategies) {
      console.log('\nRental Strategies Analysis');
      console.log('------------------------');
      Object.entries(analysis.rentalStrategies).forEach(([strategy, data]) => {
        console.log(`\n${strategy.toUpperCase()}`);
        console.log(`Monthly Revenue: $${data.monthlyRevenue.toLocaleString()}`);
        console.log(`Occupancy Rate: ${(data.occupancyRate * 100).toFixed(1)}%`);
        console.log(`Net Income: $${data.netIncome.toLocaleString()}`);
        console.log(`ROI: ${(data.roi * 100).toFixed(2)}%`);
        if (data.notes && data.notes.length > 0) {
          console.log('Notes:');
          data.notes.forEach(note => console.log(`- ${note}`));
        }
      });
    }
    
  } catch (error) {
    console.error('Analysis failed:', error);
  }
}

analyzeProperty();
