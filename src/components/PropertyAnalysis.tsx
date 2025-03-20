import React from 'react';
import { PropertyDetail } from '@/types/attom';
import { InvestmentMetrics, AIAnalysis, RentalAnalysis } from '@/types/investment';
import { 
  formatCurrency, 
  formatPercent, 
  formatShortCurrency, 
  formatDSCR, 
  formatRatio 
} from '@/lib/format';
import { formatAnalysisForExport } from '@/lib/analysis';
import { MarketAnalysis } from '@/lib/llm';
import { AIAnalysisCard } from './AIAnalysisCard';
import { DetailRow } from './DetailRow';
import {
  getDSCRColor,
  getCashFlowColor,
  getCapRateColor,
  getROIColor,
  getOccupancyColor,
  getTrendColor
} from '@/lib/colors';
import {
  calculateLTV,
  calculateLoanAmount,
  calculateCapRate,
  calculateCashOnCash,
  calculateROI
} from '@/lib/investment';
import attomAPI from '@/lib/attom';
import {
  MONTHS_IN_YEAR,
  DOWN_PAYMENT_PERCENTAGE,
  PROPERTY_TAX_RATE,
  INSURANCE_RATE,
  MAINTENANCE_RATE,
  VACANCY_RATE,
  PROPERTY_MANAGEMENT_RATE,
  INTEREST_RATE,
  LOAN_TERM_YEARS,
  MONTHLY_UTILITIES
} from '@/config/investment';

interface PropertyAnalysisProps {
  propertyData: {
    address: string;
    propertyType: string;
    city: string;
    state: string;
    zipCode: string;
    estimatedValue: number;
    purchasePrice: number;
    monthlyRent: number;
    squareFeet: number;
    yearBuilt: number;
    lotSize: number;
    bedrooms: number;
    bathrooms: number;
    propertyClass: string;
    investmentMetrics?: InvestmentMetrics;
    rentalStrategies?: { [key: string]: RentalAnalysis };
    aiAnalysis?: AIAnalysis;
    propertyDetail?: PropertyDetail; 
  };
}

const PropertyAnalysis: React.FC<PropertyAnalysisProps> = ({ propertyData }) => {
  const {
    address,
    propertyType,
    city,
    state,
    zipCode,
    estimatedValue,
    purchasePrice,
    monthlyRent,
    squareFeet,
    yearBuilt,
    lotSize,
    bedrooms,
    bathrooms,
    propertyClass,
    investmentMetrics,
    rentalStrategies,
    aiAnalysis,
    propertyDetail
  } = propertyData;

  const purchasePriceValue = purchasePrice > 0 ? purchasePrice : (estimatedValue > 0 ? estimatedValue : 350000);
  
  let downPaymentValue: number;
  let downPaymentPercentValue: number;
  
  if (investmentMetrics?.downPayment && investmentMetrics.downPayment > 0) {
    downPaymentValue = investmentMetrics.downPayment;
    downPaymentPercentValue = (downPaymentValue / purchasePriceValue) * 100;
  } else if (investmentMetrics?.downPaymentPercent && investmentMetrics.downPaymentPercent > 0) {
    downPaymentPercentValue = investmentMetrics.downPaymentPercent;
    downPaymentValue = purchasePriceValue * (downPaymentPercentValue / 100);
  } else {
    downPaymentPercentValue = 3; 
    downPaymentValue = purchasePriceValue * (downPaymentPercentValue / 100);
  }
  
  const interestRateValue = investmentMetrics?.interestRate && investmentMetrics.interestRate > 0 
    ? investmentMetrics.interestRate 
    : INTEREST_RATE;
  
  const loanAmount = purchasePriceValue - downPaymentValue;
  const monthlyMortgage = calculateMonthlyMortgage(loanAmount, interestRateValue, LOAN_TERM_YEARS, true);
  const ltv = calculateLTV(loanAmount, purchasePriceValue);

  const monthlyIncome = monthlyRent > 0 ? monthlyRent : (purchasePriceValue * 0.008); 
  const monthlyTaxes = (purchasePriceValue * PROPERTY_TAX_RATE) / (100 * 12);
  const monthlyInsurance = (purchasePriceValue * INSURANCE_RATE) / (100 * 12);
  const monthlyUtilities = MONTHLY_UTILITIES;
  const monthlyMaintenance = monthlyIncome * (MAINTENANCE_RATE / 100);
  const monthlyVacancy = monthlyIncome * (VACANCY_RATE / 100);
  const monthlyManagement = monthlyIncome * (PROPERTY_MANAGEMENT_RATE / 100);
  const monthlyHOA = 0; 

  const monthlyOperatingExpenses = 
    monthlyTaxes +
    monthlyInsurance +
    monthlyUtilities +
    monthlyMaintenance +
    monthlyVacancy +
    monthlyManagement +
    monthlyHOA;

  const totalMonthlyExpenses = monthlyOperatingExpenses + monthlyMortgage;

  const monthlyCashFlow = monthlyIncome - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * MONTHS_IN_YEAR;
  
  const monthlyNOI = monthlyIncome - monthlyOperatingExpenses;
  const annualNOI = monthlyNOI * MONTHS_IN_YEAR;
  
  const capRate = annualNOI > 0 && purchasePriceValue > 0 ? (annualNOI / purchasePriceValue) * 100 : 0;
  const cashOnCash = annualCashFlow > 0 && downPaymentValue > 0 ? (annualCashFlow / downPaymentValue) * 100 : 0;
  const dscr = monthlyMortgage > 0 ? monthlyIncome / monthlyMortgage : 0;
  const returnOnInvestment = annualCashFlow > 0 && downPaymentValue > 0 ? (annualCashFlow / downPaymentValue) * 100 : 0;
  const breakEvenMonths = monthlyCashFlow > 0 ? Math.ceil(downPaymentValue / monthlyCashFlow) : 0;

  let calculatedMetrics: InvestmentMetrics;
  
  if (propertyDetail) {
    try {
      calculatedMetrics = attomAPI.calculateInvestmentMetrics(propertyDetail, {
        purchasePrice: purchasePriceValue,
        downPaymentPercent: downPaymentPercentValue,
        interestRate: interestRateValue,
        estimatedMonthlyRent: monthlyRent > 0 ? monthlyRent : undefined
      });
    } catch (error) {
      console.error('Error calculating investment metrics:', error);
      calculatedMetrics = {
        propertyValue: purchasePriceValue,
        purchasePrice: purchasePriceValue,
        downPayment: downPaymentValue,
        downPaymentPercent: downPaymentPercentValue,
        loanAmount,
        interestRate: interestRateValue,
        monthlyMortgage,
        estimatedMonthlyRent: monthlyIncome,
        operatingExpenses: monthlyOperatingExpenses * MONTHS_IN_YEAR,
        netOperatingIncome: annualNOI,
        monthlyCashFlow,
        annualCashFlow,
        capRate,
        cashOnCashReturn: cashOnCash,
        dscr,
        occupancyRate: 100 - VACANCY_RATE,
        totalMonthlyExpenses,
        cashFlow: annualCashFlow,
        grossMonthlyIncome: monthlyIncome,
        monthlyRevenue: monthlyIncome,
        monthlyInsurance,
        monthlyUtilities,
        monthlyMaintenance,
        monthlyVacancy,
        monthlyManagement,
        monthlyHOA,
        returnOnInvestment,
        breakEvenMonths,
        monthlyExpenses: {
          mortgage: monthlyMortgage,
          propertyTax: monthlyTaxes,
          insurance: monthlyInsurance,
          maintenance: monthlyMaintenance,
          vacancy: monthlyVacancy,
          management: monthlyManagement,
          utilities: monthlyUtilities
        },
        rentalStrategies,
        aiAnalysis
      };
    }
  } else {
    calculatedMetrics = {
      propertyValue: purchasePriceValue,
      purchasePrice: purchasePriceValue,
      downPayment: downPaymentValue,
      downPaymentPercent: downPaymentPercentValue,
      loanAmount,
      interestRate: interestRateValue,
      monthlyMortgage,
      estimatedMonthlyRent: monthlyIncome,
      operatingExpenses: monthlyOperatingExpenses * MONTHS_IN_YEAR,
      netOperatingIncome: annualNOI,
      monthlyCashFlow,
      annualCashFlow,
      capRate,
      cashOnCashReturn: cashOnCash,
      dscr,
      occupancyRate: 100 - VACANCY_RATE,
      totalMonthlyExpenses,
      cashFlow: annualCashFlow,
      grossMonthlyIncome: monthlyIncome,
      monthlyRevenue: monthlyIncome,
      monthlyInsurance,
      monthlyUtilities,
      monthlyMaintenance,
      monthlyVacancy,
      monthlyManagement,
      monthlyHOA,
      returnOnInvestment,
      breakEvenMonths,
      monthlyExpenses: {
        mortgage: monthlyMortgage,
        propertyTax: monthlyTaxes,
        insurance: monthlyInsurance,
        maintenance: monthlyMaintenance,
        vacancy: monthlyVacancy,
        management: monthlyManagement,
        utilities: monthlyUtilities
      },
      rentalStrategies,
      aiAnalysis
    };
  }

  const metrics = investmentMetrics || calculatedMetrics;

  const {
    purchasePrice: metricsPrice = 0,
    downPayment: metricsDownPayment = 0,
    downPaymentPercent: metricsDownPaymentPercent = 0,
    interestRate: metricsInterestRate = 0,
    loanAmount: metricsLoanAmount = 0,
    monthlyMortgage: metricsMonthlyMortgage = 0,
    estimatedMonthlyRent: metricsMonthlyRent = 0,
    totalMonthlyExpenses: metricsTotalMonthlyExpenses = 0,
    monthlyCashFlow: metricsMonthlyCashFlow = 0,
    capRate: metricsCapRate = 0,
    cashOnCashReturn: metricsCashOnCashReturn = 0,
    dscr: metricsDscr = 0,
    breakEvenMonths: metricsBreakEvenMonths = 0,
    monthlyExpenses: metricsMonthlyExpenses = {
      mortgage: 0,
      propertyTax: 0,
      insurance: 0,
      utilities: 0,
      maintenance: 0,
      vacancy: 0,
      management: 0
    },
    monthlyInsurance: metricsMonthlyInsurance = 0,
    monthlyUtilities: metricsMonthlyUtilities = 0,
    monthlyMaintenance: metricsMonthlyMaintenance = 0,
    monthlyVacancy: metricsMonthlyVacancy = 0,
    monthlyManagement: metricsMonthlyManagement = 0,
    monthlyHOA: metricsMonthlyHOA = 0,
  } = metrics || {};

  const renderRentalStrategy = (strategy: RentalAnalysis) => {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">{strategy.strategy}</h4>
        <div className="space-y-3">
          <DetailRow
            label="Monthly Revenue"
            value={formatCurrency(strategy.monthlyRevenue)}
            colorClass={getCashFlowColor(strategy.monthlyRevenue)}
          />
          <DetailRow
            label="Occupancy Rate"
            value={`${strategy.occupancyRate}%`}
            colorClass={getOccupancyColor(strategy.occupancyRate)}
          />
          <DetailRow
            label="Net Income"
            value={formatCurrency(strategy.netIncome)}
            colorClass={getCashFlowColor(strategy.netIncome)}
          />
          <DetailRow
            label="ROI"
            value={`${strategy.roi.toFixed(2)}%`}
            colorClass={getROIColor(strategy.roi)}
          />
          {strategy.additionalExpenses && Object.entries(strategy.additionalExpenses).map(([expense, amount]) => (
            <DetailRow
              key={expense}
              label={expense}
              value={formatCurrency(amount)}
              colorClass="text-gray-300"
              isSubItem={true}
            />
          ))}
          {strategy.notes && strategy.notes.map((note, index) => (
            <div key={index} className="text-sm text-gray-400 mt-1">• {note}</div>
          ))}
        </div>
      </div>
    );
  };

  const renderRentalStrategies = () => {
    if (!rentalStrategies) return null;

    return (
      <div className="mt-8 px-4 md:px-6 lg:px-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Rental Strategies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(rentalStrategies).map((strategy) => {
            const effectiveRevenue = Math.round(strategy.monthlyRevenue * strategy.occupancyRate / 100);
            
            const additionalExpensesTotal = Object.values(strategy.additionalExpenses).reduce((sum, expense) => sum + expense, 0);
            
            const baseExpenses = calculatedMetrics.totalMonthlyExpenses - additionalExpensesTotal;
            
            const totalExpenses = baseExpenses + additionalExpensesTotal;
            
            return (
              <div key={strategy.strategy} className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-4">{strategy.strategy}</h4>
                <div className="space-y-2">
                  <DetailRow
                    label="Monthly Revenue"
                    value={formatCurrency(strategy.monthlyRevenue)}
                    colorClass={getCashFlowColor(strategy.monthlyRevenue)}
                  />
                  <DetailRow
                    label="Occupancy Rate"
                    value={`${strategy.occupancyRate}%`}
                    colorClass={getOccupancyColor(strategy.occupancyRate)}
                  />
                  <DetailRow
                    label="Effective Revenue"
                    value={formatCurrency(effectiveRevenue)}
                    colorClass={getCashFlowColor(effectiveRevenue)}
                    isSubItem={true}
                  />
                  <DetailRow
                    label="Base Expenses"
                    value={formatCurrency(baseExpenses)}
                    colorClass="text-red-400"
                    isSubItem={true}
                  />
                  <DetailRow
                    label="Additional Expenses"
                    value={formatCurrency(additionalExpensesTotal)}
                    colorClass="text-red-400"
                    isSubItem={true}
                  />
                  <DetailRow
                    label="Net Income"
                    value={formatCurrency(strategy.netIncome)}
                    colorClass={getCashFlowColor(strategy.netIncome)}
                    isBold={true}
                    highlight={true}
                  />
                  <DetailRow
                    label="ROI"
                    value={`${strategy.roi.toFixed(2)}%`}
                    colorClass={getROIColor(strategy.roi)}
                    isBold={true}
                  />
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <div className="text-sm text-gray-400 font-medium mb-1">Expenses Breakdown:</div>
                    {strategy.additionalExpenses && Object.entries(strategy.additionalExpenses).map(([expense, amount]) => (
                      <DetailRow
                        key={expense}
                        label={expense}
                        value={formatCurrency(amount)}
                        colorClass="text-gray-300"
                        isSubItem={true}
                      />
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <div className="text-sm text-gray-400 font-medium mb-1">Strategy Notes:</div>
                    {strategy.notes && strategy.notes.map((note, index) => (
                      <div key={index} className="text-sm text-gray-400 mt-1">• {note}</div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPurchaseDetails = () => {
    return (
      <div className="px-4 md:px-6 lg:px-8 py-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Investment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Purchase Information</h4>
            <div className="space-y-2">
              <DetailRow
                label="Purchase Price"
                value={formatCurrency(metricsPrice)}
                isBold={true}
              />
              <DetailRow
                label="Down Payment"
                value={`${formatCurrency(metricsDownPayment)} (${metricsDownPaymentPercent.toFixed(1)}%)`}
                colorClass="text-green-400"
              />
              <DetailRow
                label="Loan Amount"
                value={formatCurrency(metricsLoanAmount)}
              />
              <DetailRow
                label="Interest Rate"
                value={`${metricsInterestRate.toFixed(2)}%`}
              />
              <DetailRow
                label="Monthly Mortgage"
                value={formatCurrency(metricsMonthlyMortgage)}
                colorClass="text-red-400"
              />
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Financial Performance</h4>
            <div className="space-y-2">
              <DetailRow
                label="Monthly Rent"
                value={formatCurrency(metricsMonthlyRent)}
                colorClass="text-green-400"
              />
              <DetailRow
                label="Monthly Expenses"
                value={formatCurrency(metricsTotalMonthlyExpenses)}
                colorClass="text-red-400"
              />
              <DetailRow
                label="Monthly Cash Flow"
                value={formatCurrency(metricsMonthlyCashFlow)}
                colorClass={getCashFlowColor(metricsMonthlyCashFlow)}
                isBold={true}
              />
              <DetailRow
                label="Cap Rate"
                value={`${metricsCapRate.toFixed(2)}%`}
                colorClass={getCapRateColor(metricsCapRate)}
              />
              <DetailRow
                label="Cash on Cash Return"
                value={`${metricsCashOnCashReturn.toFixed(2)}%`}
                colorClass={getROIColor(metricsCashOnCashReturn)}
              />
              <DetailRow
                label="DSCR"
                value={metricsDscr.toFixed(2)}
                colorClass={getDSCRColor(metricsDscr)}
              />
              <DetailRow
                label="Break-Even Timeline"
                value={`${metricsBreakEvenMonths} months`}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Monthly Expense Breakdown</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <DetailRow
                label="Mortgage Payment"
                value={formatCurrency(metricsMonthlyExpenses.mortgage || 0)}
                colorClass="text-red-400"
              />
              <DetailRow
                label="Property Tax"
                value={formatCurrency(metricsMonthlyExpenses.propertyTax || 0)}
                colorClass="text-red-400"
              />
              <DetailRow
                label="Insurance"
                value={formatCurrency(metricsMonthlyExpenses.insurance || 0)}
                colorClass="text-red-400"
              />
            </div>
            <div className="space-y-2">
              <DetailRow
                label="Utilities"
                value={formatCurrency(metricsMonthlyExpenses.utilities || 0)}
                colorClass="text-red-400"
              />
              <DetailRow
                label="Maintenance"
                value={formatCurrency(metricsMonthlyExpenses.maintenance || 0)}
                colorClass="text-red-400"
              />
              <DetailRow
                label="Vacancy Allowance"
                value={formatCurrency(metricsMonthlyExpenses.vacancy || 0)}
                colorClass="text-red-400"
              />
            </div>
            <div className="space-y-2">
              <DetailRow
                label="Property Management"
                value={formatCurrency(metricsMonthlyExpenses.management || 0)}
                colorClass="text-red-400"
              />
              {metricsMonthlyHOA > 0 && (
                <DetailRow
                  label="HOA Fees"
                  value={formatCurrency(metricsMonthlyHOA)}
                  colorClass="text-red-400"
                />
              )}
              <DetailRow
                label="Total Monthly Expenses"
                value={formatCurrency(metricsTotalMonthlyExpenses)}
                colorClass="text-red-400"
                isBold={true}
                highlight={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialMetrics = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <DetailRow 
            label="Monthly Cash Flow" 
            value={formatShortCurrency(metricsMonthlyCashFlow)}
            colorClass={getCashFlowColor(metricsMonthlyCashFlow)}
            isBold
          />
          <DetailRow 
            label="DSCR" 
            value={formatDSCR(metricsDscr)}
            colorClass={getDSCRColor(metricsDscr)}
            isBold
          />
          <DetailRow 
            label="Cap Rate" 
            value={`${formatRatio(metricsCapRate)}%`}
            colorClass={getCapRateColor(metricsCapRate)}
          />
          <DetailRow 
            label="Cash on Cash Return" 
            value={`${formatRatio(metricsCashOnCashReturn)}%`}
            colorClass={getROIColor(metricsCashOnCashReturn)}
          />
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <DetailRow 
            label="Occupancy Rate" 
            value={`${formatRatio(100 - VACANCY_RATE)}%`}
            colorClass={getOccupancyColor(100 - VACANCY_RATE)}
          />
          <DetailRow 
            label="Monthly Rent" 
            value={formatShortCurrency(metricsMonthlyRent)}
            colorClass="text-gray-300"
          />
          <DetailRow 
            label="Operating Expenses" 
            value={formatShortCurrency(metricsTotalMonthlyExpenses / 12)}
            isNegative
          />
          <DetailRow 
            label="Net Operating Income" 
            value={formatShortCurrency(annualNOI / 12)}
            colorClass={getCashFlowColor(annualNOI / 12)}
          />
        </div>
      </div>
    </div>
  );

  interface DetailRowProps {
    label: string;
    value: string | number;
    isNegative?: boolean;
    isBold?: boolean;
    highlight?: boolean;
    colorClass?: string;
    isSubItem?: boolean;
  }

  const DetailRow: React.FC<DetailRowProps> = ({ 
    label, 
    value, 
    isNegative = false, 
    isBold = false,
    highlight = false,
    colorClass,
    isSubItem = false
  }) => (
    <div className={`flex justify-between py-1 ${highlight ? 'bg-gray-700/30' : ''} ${isSubItem ? 'ml-4' : ''}`}>
      <span className={`${isBold ? 'font-semibold' : ''} text-gray-300`}>{label}</span>
      <span className={`
        ${isBold ? 'font-semibold' : ''} 
        ${isNegative ? 'text-red-400' : ''} 
        ${colorClass || 'text-gray-300'}
      `}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      {renderPurchaseDetails()}
      {renderRentalStrategies()}
      {aiAnalysis && <AIAnalysisCard analysis={aiAnalysis} />}
    </div>
  );
};

function calculateMonthlyMortgage(loanAmount: number, interestRate: number, loanTermYears: number, isInterestOnly: boolean) {
  const monthlyRate = interestRate / (100 * 12);
  const numPayments = loanTermYears * 12;
  if (isInterestOnly) {
    return loanAmount * monthlyRate;
  } else {
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
}

export default PropertyAnalysis;
