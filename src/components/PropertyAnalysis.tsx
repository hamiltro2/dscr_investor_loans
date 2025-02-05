import React from 'react';

interface PropertyData {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  pricePerSqFt: number;
}

interface FinancialMetrics {
  monthlyRent: number;
  annualGrossRent: number;
  monthlyExpenses: number;
  annualNOI: number;
  capRate: number;
  cashOnCashReturn: number;
  dscr: number;
}

interface PropertyAnalysisProps {
  propertyData: PropertyData;
  financialMetrics: FinancialMetrics;
  aiAnalysis: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number) => {
  return (value * 100).toFixed(2) + '%';
};

const PropertyAnalysis: React.FC<PropertyAnalysisProps> = ({
  propertyData,
  financialMetrics,
  aiAnalysis,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Property Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Property Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Address</p>
            <p className="font-semibold">{propertyData.address}</p>
          </div>
          <div>
            <p className="text-gray-600">Price</p>
            <p className="font-semibold">{formatCurrency(propertyData.price)}</p>
          </div>
          <div>
            <p className="text-gray-600">Bedrooms</p>
            <p className="font-semibold">{propertyData.bedrooms}</p>
          </div>
          <div>
            <p className="text-gray-600">Bathrooms</p>
            <p className="font-semibold">{propertyData.bathrooms}</p>
          </div>
          <div>
            <p className="text-gray-600">Square Feet</p>
            <p className="font-semibold">{propertyData.squareFeet.toLocaleString()} sq ft</p>
          </div>
          <div>
            <p className="text-gray-600">Year Built</p>
            <p className="font-semibold">{propertyData.yearBuilt}</p>
          </div>
          <div>
            <p className="text-gray-600">Price per Sq Ft</p>
            <p className="font-semibold">{formatCurrency(propertyData.pricePerSqFt)}/sq ft</p>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Financial Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Monthly Rent</p>
            <p className="font-semibold">{formatCurrency(financialMetrics.monthlyRent)}</p>
          </div>
          <div>
            <p className="text-gray-600">Annual Gross Rent</p>
            <p className="font-semibold">{formatCurrency(financialMetrics.annualGrossRent)}</p>
          </div>
          <div>
            <p className="text-gray-600">Monthly Expenses</p>
            <p className="font-semibold">{formatCurrency(financialMetrics.monthlyExpenses)}</p>
          </div>
          <div>
            <p className="text-gray-600">Annual NOI</p>
            <p className="font-semibold">{formatCurrency(financialMetrics.annualNOI)}</p>
          </div>
          <div>
            <p className="text-gray-600">Cap Rate</p>
            <p className="font-semibold">{formatPercent(financialMetrics.capRate)}</p>
          </div>
          <div>
            <p className="text-gray-600">Cash on Cash Return</p>
            <p className="font-semibold">{formatPercent(financialMetrics.cashOnCashReturn)}</p>
          </div>
          <div>
            <p className="text-gray-600">DSCR</p>
            <p className="font-semibold">{financialMetrics.dscr.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Investment Analysis</h2>
        <div className="prose max-w-none">
          {aiAnalysis.split('\n').map((line, index) => {
            if (line.trim().length === 0) return <br key={index} />;
            if (line.startsWith('#') || line.startsWith('INVESTMENT') || line.startsWith('KEY') || line.startsWith('POTENTIAL') || line.startsWith('SUGGESTIONS') || line.startsWith('ADDITIONAL')) {
              return <h3 key={index} className="font-bold text-lg mt-4 mb-2">{line.replace(/^#\s*/, '')}</h3>;
            }
            if (line.startsWith('-') || line.startsWith('•')) {
              return <li key={index} className="ml-4">{line.substring(1).trim()}</li>;
            }
            if (line.match(/^\d+\./)) {
              return <p key={index} className="font-semibold mt-2">{line}</p>;
            }
            return <p key={index}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalysis;
