'use client';

import React from 'react';
import { PropertyDetail } from '@/types/attom';
import { InvestmentMetrics } from '@/types/investment';
import { formatCurrency, formatShortCurrency } from '@/lib/format';
import { formatAnalysisForExport, generateAIAnalysis } from '@/lib/analysis';
import { DetailRow } from './DetailRow';

interface PropertyDetailsProps {
  property: PropertyDetail;
  investmentMetrics: InvestmentMetrics;
}

const DOWN_PAYMENT_PERCENTAGE = 20;

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  property, 
  investmentMetrics
}) => {
  const propertyAddress = property.address?.oneLine || 'N/A';
  const propertyType = property.summary?.proptype || property.summary?.propLandUse || 'N/A';
  const isCommercial = propertyType.toLowerCase().includes('commercial') || 
                      propertyType.toLowerCase().includes('office') ||
                      propertyType.toLowerCase().includes('retail') ||
                      propertyType.toLowerCase().includes('industrial');

  // Get property configuration details
  const bedrooms = property.building?.rooms?.beds || 'N/A';
  const bathrooms = property.building?.rooms?.bathstotal || 'N/A';
  const livingArea = property.building?.size?.livingsize || 
                    property.building?.size?.universalsize || 
                    property.area?.livingsize || 
                    property.area?.buildingsize || 'N/A';
  const yearBuilt = property.summary?.yearbuilt || 
                   property.building?.yearBuilt || 'N/A';
  const lotSize = property.lot?.lotsize || 
                 (property.lot?.frontage && property.lot?.depth ? 
                  property.lot?.frontage * property.lot?.depth : 'N/A');
  const construction = property.building?.construction?.walls || 
                      property.building?.construction?.wallstype || 'N/A';
  const parking = property.building?.parking?.prkgSpaces || 
                 property.building?.parking?.prkgType || 'N/A';

  // Get owner details
  const ownerOccupied = property.summary?.absenteeInd === 'Y' ? 'No' : 'Yes';
  
  // Get detailed address
  const streetAddress = property.address?.line1 || 'N/A';
  const unitNumber = property.address?.line2 || '';
  const city = property.address?.locality || 'N/A';
  const state = property.address?.state || 'N/A';
  const zipCode = property.address?.postal1 || 'N/A';
  const zipPlus4 = property.address?.postal2 || '';

  const handleCopyToClipboard = async () => {
    const analysis = generateAIAnalysis(property, investmentMetrics);
    const analysisText = formatAnalysisForExport(analysis);
    await navigator.clipboard.writeText(analysisText);
  };

  const handleSaveAnalysis = () => {
    const analysis = generateAIAnalysis(property, investmentMetrics);
    const analysisText = formatAnalysisForExport(analysis);
    const blob = new Blob([analysisText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `property-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleEmailAnalysis = () => {
    const analysis = generateAIAnalysis(property, investmentMetrics);
    const analysisText = formatAnalysisForExport(analysis);
    const subject = `Property Analysis - ${property.address?.line1 || 'Property'}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(analysisText)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      {/* Header with Action Buttons */}
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Property Details</h2>
        <div className="flex gap-4">
          <button
            onClick={handleCopyToClipboard}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy
          </button>
          <button
            onClick={handleSaveAnalysis}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
              <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
            Save
          </button>
          <button
            onClick={handleEmailAnalysis}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Email
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Close
          </button>
        </div>
      </div>

      {/* Property Address */}
      <div className="p-6 border-b border-gray-700">
        <div className="space-y-2">
          <div className="text-xl text-white">{streetAddress} {unitNumber}</div>
          <div className="text-gray-400">{city}, {state} {zipCode}{zipPlus4 ? `-${zipPlus4}` : ''}</div>
        </div>
      </div>

      {/* Property Features */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Property Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Property Type:</span>
            <span className="text-white">{propertyType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Bedrooms:</span>
            <span className="text-white">{bedrooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Bathrooms:</span>
            <span className="text-white">{bathrooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Living Area:</span>
            <span className="text-white">{livingArea} sq ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Year Built:</span>
            <span className="text-white">{yearBuilt}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lot Size:</span>
            <span className="text-white">{lotSize} sq ft</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Construction:</span>
            <span className="text-white">{construction}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Parking:</span>
            <span className="text-white">{parking}</span>
          </div>
        </div>
      </div>

      {/* Building Details */}
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Building Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Building Class:</span>
            <span className="text-white">{property.summary?.quality || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Stories:</span>
            <span className="text-white">{property.building?.construction?.stories || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Foundation:</span>
            <span className="text-white">{property.building?.interior?.bsmttype || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Roof Type:</span>
            <span className="text-white">{property.building?.construction?.wallstype || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">HVAC:</span>
            <span className="text-white">{property.utilities?.heatingtype || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Condition:</span>
            <span className="text-white">{property.building?.condition || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Owner Information */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Owner Information</h3>
        <div className="flex justify-between">
          <span className="text-gray-400">Owner Occupied:</span>
          <span className="text-white">{ownerOccupied}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
