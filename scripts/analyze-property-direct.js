const defaultConfig = {
  downPaymentPercent: 0.25,
  interestRate: 0.075,
  loanTermYears: 30,
  propertyTaxRate: 0.012,
  insuranceRate: 0.005,
  monthlyUtilities: 200,
  maintenancePercent: 0.08,
  vacancyRate: 0.05,
  propertyManagementPercent: 0.08
};

const propertyData = {
  building: {
    size: {
      livingsize: 3031
    },
    rooms: {
      beds: 4,
      bathstotal: 4
    },
    summary: {
      quality: "AVERAGE"
    }
  },
  summary: {
    yearbuilt: 1965
  },
  area: {
    countrysecsubd: "Ventura"
  }
};

function calculatePropertyValue(property) {
  // Base price per sqft for Ventura area
  const basePricePerSqft = 450;
  
  // Quality adjustments
  const qualityMultipliers = {
    'EXCELLENT': 1.3,
    'GOOD': 1.15,
    'AVERAGE': 1.0,
    'FAIR': 0.85,
    'POOR': 0.7
  };
  
  const qualityMultiplier = qualityMultipliers[property.building.summary.quality] || 1.0;
  
  // Age adjustment
  const age = new Date().getFullYear() - property.summary.yearbuilt;
  const ageMultiplier = age < 5 ? 1.3 :
                       age < 10 ? 1.2 :
                       age < 20 ? 1.1 :
                       age < 40 ? 1.0 :
                       0.9;
  
  // Calculate value
  return Math.round(property.building.size.livingsize * basePricePerSqft * qualityMultiplier * ageMultiplier);
}

function calculateMonthlyRent(property) {
  // Base rent per sqft for Ventura area
  const baseRentPerSqft = 2.5;
  
  // Quality adjustments
  const qualityMultipliers = {
    'EXCELLENT': 1.3,
    'GOOD': 1.15,
    'AVERAGE': 1.0,
    'FAIR': 0.85,
    'POOR': 0.7
  };
  
  const qualityMultiplier = qualityMultipliers[property.building.summary.quality] || 1.0;
  
  // Calculate monthly rent
  return Math.round(property.building.size.livingsize * baseRentPerSqft * qualityMultiplier);
}

function calculateInvestmentMetrics(property, config = defaultConfig) {
  // Property Value and Loan Details
  const propertyValue = calculatePropertyValue(property);
  const downPayment = propertyValue * config.downPaymentPercent;
  const loanAmount = propertyValue - downPayment;
  
  // Calculate monthly mortgage payment
  const monthlyInterestRate = config.interestRate / 12;
  const numberOfPayments = config.loanTermYears * 12;
  const monthlyMortgage = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  // Monthly Income
  const monthlyRent = calculateMonthlyRent(property);
  const grossMonthlyIncome = monthlyRent;
  
  // Monthly Expenses
  const monthlyPropertyTax = (propertyValue * config.propertyTaxRate) / 12;
  const monthlyInsurance = (propertyValue * config.insuranceRate) / 12;
  const monthlyUtilities = config.monthlyUtilities;
  const monthlyMaintenance = monthlyRent * config.maintenancePercent;
  const monthlyVacancy = monthlyRent * config.vacancyRate;
  const monthlyManagement = monthlyRent * config.propertyManagementPercent;
  
  const totalMonthlyExpenses = 
    monthlyMortgage +
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyUtilities +
    monthlyMaintenance +
    monthlyVacancy +
    monthlyManagement;
  
  // Calculate Key Metrics
  const monthlyCashFlow = grossMonthlyIncome - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  
  const netOperatingIncome = (grossMonthlyIncome * 12) - 
    ((monthlyPropertyTax + monthlyInsurance + monthlyUtilities + 
      monthlyMaintenance + monthlyVacancy + monthlyManagement) * 12);
  
  const capRate = netOperatingIncome / propertyValue;
  const cashOnCashReturn = annualCashFlow / downPayment;
  const dscr = grossMonthlyIncome / monthlyMortgage;
  
  return {
    propertyValue,
    downPayment,
    loanAmount,
    monthlyMortgage,
    monthlyRent,
    grossMonthlyIncome,
    monthlyPropertyTax,
    monthlyInsurance,
    monthlyUtilities,
    monthlyMaintenance,
    monthlyVacancy,
    monthlyManagement,
    totalMonthlyExpenses,
    monthlyCashFlow,
    annualCashFlow,
    netOperatingIncome,
    capRate,
    cashOnCashReturn,
    dscr
  };
}

function calculateRentalStrategies(property, baseMetrics) {
  const strategies = {};
  
  // Long Term Rental (Traditional)
  strategies.longTerm = {
    monthlyRevenue: baseMetrics.monthlyRent,
    occupancyRate: 0.95,
    netIncome: baseMetrics.monthlyCashFlow * 12,
    roi: baseMetrics.cashOnCashReturn,
    notes: [
      "Most stable income stream",
      "Lower management overhead",
      "Reduced wear and tear on property"
    ]
  };

  // Short Term Rental (Airbnb/VRBO)
  const dailyRate = Math.round(baseMetrics.monthlyRent / 30 * 2.5); // Average daily rate
  const averageOccupancy = 0.70; // 70% occupancy rate
  const monthlyShortTermRevenue = Math.round(dailyRate * 30 * averageOccupancy);
  const shortTermExpenses = {
    cleaning: 150 * 8, // Assuming 8 turnovers per month
    supplies: 200,
    utilities: 400, // Higher utilities due to variable usage
    insurance: baseMetrics.monthlyInsurance * 1.5, // Higher insurance for STR
    maintenance: monthlyShortTermRevenue * 0.12, // Higher maintenance (12%)
    management: monthlyShortTermRevenue * 0.20, // Higher management fee (20%)
    vacancy: monthlyShortTermRevenue * (1 - averageOccupancy) // Vacancy based on occupancy
  };
  
  const shortTermTotalExpenses = Object.values(shortTermExpenses).reduce((a, b) => a + b, 0) +
    baseMetrics.monthlyMortgage + baseMetrics.monthlyPropertyTax;
  
  strategies.shortTerm = {
    monthlyRevenue: monthlyShortTermRevenue,
    occupancyRate: averageOccupancy,
    netIncome: (monthlyShortTermRevenue - shortTermTotalExpenses) * 12,
    roi: ((monthlyShortTermRevenue - shortTermTotalExpenses) * 12) / baseMetrics.downPayment,
    notes: [
      "Higher potential revenue",
      "More management intensive",
      "Higher operating costs",
      "May require furnishing (~$30,000 initial investment)",
      "Good location for vacation rentals"
    ]
  };

  // House Hack (Primary + ADU/Split)
  const primaryUnitRent = Math.round(baseMetrics.monthlyRent * 0.6); // Main house
  const secondaryUnitRent = Math.round(baseMetrics.monthlyRent * 0.5); // Converted space
  const conversionCost = 75000; // Estimated cost to convert/split
  const adjustedDownPayment = baseMetrics.downPayment + conversionCost;
  
  const houseHackExpenses = {
    mortgage: baseMetrics.monthlyMortgage,
    propertyTax: baseMetrics.monthlyPropertyTax,
    insurance: baseMetrics.monthlyInsurance,
    utilities: baseMetrics.monthlyUtilities * 1.5,
    maintenance: (primaryUnitRent + secondaryUnitRent) * 0.08,
    management: (primaryUnitRent + secondaryUnitRent) * 0.08,
    vacancy: (primaryUnitRent + secondaryUnitRent) * 0.05
  };
  
  const houseHackTotalExpenses = Object.values(houseHackExpenses).reduce((a, b) => a + b, 0);
  const houseHackMonthlyRevenue = primaryUnitRent + secondaryUnitRent;
  
  strategies.houseHack = {
    monthlyRevenue: houseHackMonthlyRevenue,
    occupancyRate: 0.95,
    netIncome: (houseHackMonthlyRevenue - houseHackTotalExpenses) * 12,
    roi: ((houseHackMonthlyRevenue - houseHackTotalExpenses) * 12) / adjustedDownPayment,
    notes: [
      "Live in one unit, rent out the other",
      `Conversion cost estimate: $${conversionCost.toLocaleString()}`,
      "Potential for FHA loan with lower down payment",
      "Property layout suitable for conversion",
      "Separate entrances possible"
    ]
  };

  // Section 8 Rental
  const section8Rent = Math.round(baseMetrics.monthlyRent * 1.1); // Often slightly higher than market
  const section8Expenses = {
    mortgage: baseMetrics.monthlyMortgage,
    propertyTax: baseMetrics.monthlyPropertyTax,
    insurance: baseMetrics.monthlyInsurance * 1.2, // Slightly higher insurance
    utilities: baseMetrics.monthlyUtilities,
    maintenance: section8Rent * 0.10, // Higher maintenance (10%)
    management: section8Rent * 0.10, // Higher management (10%)
    vacancy: section8Rent * 0.03 // Lower vacancy (3%)
  };
  
  const section8TotalExpenses = Object.values(section8Expenses).reduce((a, b) => a + b, 0);
  
  strategies.section8 = {
    monthlyRevenue: section8Rent,
    occupancyRate: 0.97,
    netIncome: (section8Rent - section8TotalExpenses) * 12,
    roi: ((section8Rent - section8TotalExpenses) * 12) / baseMetrics.downPayment,
    notes: [
      "Guaranteed rent payments from housing authority",
      "Annual inspections required",
      "Lower vacancy rates",
      "Higher potential wear and tear",
      "Additional paperwork and compliance requirements"
    ]
  };

  return strategies;
}

// Run Analysis
const metrics = calculateInvestmentMetrics(propertyData);
const rentalStrategies = calculateRentalStrategies(propertyData, metrics);

console.log('\nProperty Analysis Report');
console.log('======================\n');

console.log('Property Details');
console.log('----------------');
console.log(`Size: ${propertyData.building.size.livingsize} sqft`);
console.log(`Bedrooms: ${propertyData.building.rooms.beds}`);
console.log(`Bathrooms: ${propertyData.building.rooms.bathstotal}`);
console.log(`Year Built: ${propertyData.summary.yearbuilt}`);
console.log(`Quality: ${propertyData.building.summary.quality}`);

console.log('\nInvestment Analysis');
console.log('------------------');
console.log(`Property Value: $${metrics.propertyValue.toLocaleString()}`);
console.log(`Down Payment (25%): $${metrics.downPayment.toLocaleString()}`);
console.log(`Loan Amount: $${metrics.loanAmount.toLocaleString()}`);
console.log(`Interest Rate: ${(defaultConfig.interestRate * 100).toFixed(2)}%`);

console.log('\nMonthly Income');
console.log('--------------');
console.log(`Estimated Monthly Rent: $${metrics.monthlyRent.toLocaleString()}`);
console.log(`Gross Monthly Income: $${metrics.grossMonthlyIncome.toLocaleString()}`);

console.log('\nMonthly Expenses');
console.log('----------------');
console.log(`Mortgage Payment: $${Math.round(metrics.monthlyMortgage).toLocaleString()}`);
console.log(`Property Tax: $${Math.round(metrics.monthlyPropertyTax).toLocaleString()}`);
console.log(`Insurance: $${Math.round(metrics.monthlyInsurance).toLocaleString()}`);
console.log(`Utilities: $${metrics.monthlyUtilities.toLocaleString()}`);
console.log(`Maintenance (8%): $${Math.round(metrics.monthlyMaintenance).toLocaleString()}`);
console.log(`Vacancy (5%): $${Math.round(metrics.monthlyVacancy).toLocaleString()}`);
console.log(`Property Management (8%): $${Math.round(metrics.monthlyManagement).toLocaleString()}`);
console.log(`Total Monthly Expenses: $${Math.round(metrics.totalMonthlyExpenses).toLocaleString()}`);

console.log('\nInvestment Metrics');
console.log('-----------------');
console.log(`Net Operating Income (NOI): $${Math.round(metrics.netOperatingIncome).toLocaleString()}/year`);
console.log(`Monthly Cash Flow: $${Math.round(metrics.monthlyCashFlow).toLocaleString()}`);
console.log(`Cap Rate: ${(metrics.capRate * 100).toFixed(2)}%`);
console.log(`Cash on Cash Return: ${(metrics.cashOnCashReturn * 100).toFixed(2)}%`);
console.log(`DSCR: ${metrics.dscr.toFixed(2)}`);

console.log('\nRental Strategy Analysis');
console.log('----------------------');

Object.entries(rentalStrategies).forEach(([strategy, data]) => {
  console.log(`\n${strategy.toUpperCase()} STRATEGY`);
  console.log(`Monthly Revenue: $${Math.round(data.monthlyRevenue).toLocaleString()}`);
  console.log(`Occupancy Rate: ${(data.occupancyRate * 100).toFixed(1)}%`);
  console.log(`Annual Net Income: $${Math.round(data.netIncome).toLocaleString()}`);
  console.log(`ROI: ${(data.roi * 100).toFixed(2)}%`);
  console.log('Notes:');
  data.notes.forEach(note => console.log(`- ${note}`));
});
