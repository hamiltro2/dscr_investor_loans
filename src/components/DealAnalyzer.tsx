/**
 * Deal Analyzer Component
 * 
 * Professional investment property analysis tool
 * Real-time calculations with comprehensive financial metrics
 * 
 * @component
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  PropertyInputs,
  DealAnalysis,
  analyzeDeal,
  formatCurrency,
  formatPercent,
  formatRatio,
} from '@/lib/dealAnalyzer';
import { Calculator, TrendingUp, DollarSign, Home, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

/**
 * Default input values based on market averages
 */
const DEFAULT_INPUTS: PropertyInputs = {
  purchasePrice: 400000,
  downPaymentPercent: 25,
  closingCostsPercent: 3,
  rehabCosts: 0,
  interestRate: 6.99,
  loanTermYears: 30,
  monthlyRent: 3200,
  otherMonthlyIncome: 0,
  vacancyRate: 5,
  propertyTaxRate: 1.2,
  insurance: 150,
  hoaFees: 0,
  propertyManagement: 256, // 8% of rent
  maintenance: 320, // 10% of rent
  utilities: 0,
  otherExpenses: 0,
};

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  helpText?: string;
}

/**
 * Reusable input field component with proper formatting
 */
function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min,
  max,
  helpText,
}: InputFieldProps) {
  const [displayValue, setDisplayValue] = useState(value.toString());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDisplayValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    }
  };
  
  const handleBlur = () => {
    const numValue = parseFloat(displayValue);
    if (isNaN(numValue)) {
      setDisplayValue(value.toString());
    } else {
      setDisplayValue(numValue.toString());
    }
  };
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          step={step}
          min={min}
          max={max}
          className={`block w-full rounded-md border-gray-300 ${
            prefix ? 'pl-7' : 'pl-3'
          } ${
            suffix ? 'pr-12' : 'pr-3'
          } py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
}

/**
 * Metric card component for displaying key numbers
 */
function MetricCard({
  icon: Icon,
  label,
  value,
  subValue,
  status,
}: {
  icon: any;
  label: string;
  value: string;
  subValue?: string;
  status?: 'good' | 'warning' | 'bad';
}) {
  const statusColors = {
    good: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    bad: 'bg-red-50 border-red-200',
  };
  
  const iconColors = {
    good: 'text-green-600',
    warning: 'text-yellow-600',
    bad: 'text-red-600',
  };
  
  return (
    <div
      className={`rounded-lg border-2 p-4 ${
        status ? statusColors[status] : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {subValue && (
            <p className="mt-1 text-sm text-gray-500">{subValue}</p>
          )}
        </div>
        <Icon
          className={`h-8 w-8 ${
            status ? iconColors[status] : 'text-gray-400'
          }`}
        />
      </div>
    </div>
  );
}

/**
 * Main Deal Analyzer Component
 */
export default function DealAnalyzer() {
  const [inputs, setInputs] = useState<PropertyInputs>(DEFAULT_INPUTS);
  const [activeTab, setActiveTab] = useState<'inputs' | 'results'>('inputs');
  
  // Update single input value
  const updateInput = (key: keyof PropertyInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  
  // Memoize analysis to avoid unnecessary recalculations
  const analysis: DealAnalysis = useMemo(() => analyzeDeal(inputs), [inputs]);
  
  // Auto-switch to results tab after first calculation
  useEffect(() => {
    if (inputs !== DEFAULT_INPUTS) {
      setActiveTab('results');
    }
  }, []);
  
  // Determine DSCR status
  const dscrStatus = analysis.metrics.dscr >= 1.25 ? 'good' : analysis.metrics.dscr >= 1.0 ? 'warning' : 'bad';
  const cashFlowStatus = analysis.monthly.cashFlow > 0 ? 'good' : analysis.monthly.cashFlow < 0 ? 'bad' : 'warning';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Investment Property Deal Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Professional-grade financial analysis for real estate investors. Calculate DSCR, cash flow, ROI, and all key metrics instantly.
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('inputs')}
            className={`${
              activeTab === 'inputs'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Property Inputs
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`${
              activeTab === 'results'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Analysis Results
          </button>
        </nav>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className={`lg:col-span-1 ${activeTab === 'results' ? 'hidden lg:block' : ''}`}>
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Property Details
            </h2>
            
            <div className="space-y-6">
              {/* Acquisition */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Acquisition
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Purchase Price"
                    value={inputs.purchasePrice}
                    onChange={(v) => updateInput('purchasePrice', v)}
                    prefix="$"
                    step={1000}
                    min={0}
                  />
                  <InputField
                    label="Down Payment"
                    value={inputs.downPaymentPercent}
                    onChange={(v) => updateInput('downPaymentPercent', v)}
                    suffix="%"
                    step={1}
                    min={0}
                    max={100}
                    helpText={`${formatCurrency(analysis.acquisition.downPayment)}`}
                  />
                  <InputField
                    label="Closing Costs"
                    value={inputs.closingCostsPercent}
                    onChange={(v) => updateInput('closingCostsPercent', v)}
                    suffix="%"
                    step={0.1}
                    min={0}
                    max={10}
                    helpText={`${formatCurrency(analysis.acquisition.closingCosts)}`}
                  />
                  <InputField
                    label="Rehab Costs"
                    value={inputs.rehabCosts}
                    onChange={(v) => updateInput('rehabCosts', v)}
                    prefix="$"
                    step={1000}
                    min={0}
                  />
                </div>
              </div>
              
              {/* Financing */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Financing
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Interest Rate"
                    value={inputs.interestRate}
                    onChange={(v) => updateInput('interestRate', v)}
                    suffix="%"
                    step={0.125}
                    min={0}
                    max={20}
                  />
                  <InputField
                    label="Loan Term"
                    value={inputs.loanTermYears}
                    onChange={(v) => updateInput('loanTermYears', v)}
                    suffix="years"
                    step={1}
                    min={1}
                    max={30}
                  />
                </div>
              </div>
              
              {/* Income */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Income
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Monthly Rent"
                    value={inputs.monthlyRent}
                    onChange={(v) => updateInput('monthlyRent', v)}
                    prefix="$"
                    step={50}
                    min={0}
                  />
                  <InputField
                    label="Other Income"
                    value={inputs.otherMonthlyIncome}
                    onChange={(v) => updateInput('otherMonthlyIncome', v)}
                    prefix="$"
                    step={10}
                    min={0}
                    helpText="Parking, laundry, storage, etc."
                  />
                  <InputField
                    label="Vacancy Rate"
                    value={inputs.vacancyRate}
                    onChange={(v) => updateInput('vacancyRate', v)}
                    suffix="%"
                    step={1}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              
              {/* Expenses */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Expenses
                </h3>
                <div className="space-y-4">
                  <InputField
                    label="Property Tax Rate"
                    value={inputs.propertyTaxRate}
                    onChange={(v) => updateInput('propertyTaxRate', v)}
                    suffix="%"
                    step={0.1}
                    min={0}
                    max={5}
                    helpText={`${formatCurrency(analysis.monthly.propertyTax)}/month`}
                  />
                  <InputField
                    label="Insurance"
                    value={inputs.insurance}
                    onChange={(v) => updateInput('insurance', v)}
                    prefix="$"
                    suffix="/mo"
                    step={10}
                    min={0}
                  />
                  <InputField
                    label="HOA Fees"
                    value={inputs.hoaFees}
                    onChange={(v) => updateInput('hoaFees', v)}
                    prefix="$"
                    suffix="/mo"
                    step={10}
                    min={0}
                  />
                  <InputField
                    label="Property Management"
                    value={inputs.propertyManagement}
                    onChange={(v) => updateInput('propertyManagement', v)}
                    prefix="$"
                    suffix="/mo"
                    step={10}
                    min={0}
                    helpText="Usually 8-10% of rent"
                  />
                  <InputField
                    label="Maintenance"
                    value={inputs.maintenance}
                    onChange={(v) => updateInput('maintenance', v)}
                    prefix="$"
                    suffix="/mo"
                    step={10}
                    min={0}
                    helpText="Usually 10% of rent"
                  />
                  <InputField
                    label="Utilities"
                    value={inputs.utilities}
                    onChange={(v) => updateInput('utilities', v)}
                    prefix="$"
                    suffix="/mo"
                    step={10}
                    min={0}
                  />
                  <InputField
                    label="Other Expenses"
                    value={inputs.otherExpenses}
                    onChange={(v) => updateInput('otherExpenses', v)}
                    prefix="$"
                    suffix="/mo"
                    step={10}
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className={`lg:col-span-2 ${activeTab === 'inputs' ? 'hidden lg:block' : ''}`}>
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Key Investment Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricCard
                  icon={TrendingUp}
                  label="DSCR (Debt Service Coverage Ratio)"
                  value={formatRatio(analysis.metrics.dscr)}
                  subValue={analysis.qualification.dcsrQualifies ? '✓ Qualifies for DSCR Loan' : '✗ Does not qualify'}
                  status={dscrStatus}
                />
                
                <MetricCard
                  icon={DollarSign}
                  label="Monthly Cash Flow"
                  value={formatCurrency(analysis.monthly.cashFlow)}
                  subValue={`${formatCurrency(analysis.annual.cashFlow)}/year`}
                  status={cashFlowStatus}
                />
                
                <MetricCard
                  icon={Calculator}
                  label="Cash-on-Cash Return"
                  value={formatPercent(analysis.metrics.cashOnCashReturn)}
                  subValue="Annual return on invested capital"
                />
                
                <MetricCard
                  icon={Home}
                  label="Cap Rate"
                  value={formatPercent(analysis.metrics.capRate)}
                  subValue="Property return without financing"
                />
              </div>
            </div>
            
            {/* Qualification Status */}
            <div className={`rounded-lg p-6 ${
              analysis.qualification.dcsrQualifies
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}>
              <div className="flex items-start">
                {analysis.qualification.dcsrQualifies ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 mr-3" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 mt-0.5 mr-3" />
                )}
                <div>
                  <h3 className={`text-lg font-semibold ${
                    analysis.qualification.dcsrQualifies ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {analysis.qualification.dcsrQualifies
                      ? 'Deal Qualifies for DSCR Financing'
                      : 'Deal Does Not Qualify'}
                  </h3>
                  <p className={`mt-2 ${
                    analysis.qualification.dcsrQualifies ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {analysis.qualification.recommendation}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Acquisition Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Acquisition Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Purchase Price</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(analysis.acquisition.purchasePrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Down Payment ({inputs.downPaymentPercent}%)</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(analysis.acquisition.downPayment)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(analysis.acquisition.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Closing Costs ({inputs.closingCostsPercent}%)</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(analysis.acquisition.closingCosts)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rehab Costs</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(analysis.acquisition.rehabCosts)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total Cash Needed</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(analysis.acquisition.totalCashNeeded)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Monthly Cash Flow */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Cash Flow Analysis
              </h2>
              
              <div className="space-y-4">
                {/* Income Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Income</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gross Rent</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.grossRent)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Other Income</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.otherIncome)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                      <span className="text-gray-600">Gross Income</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(analysis.monthly.grossIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vacancy ({inputs.vacancyRate}%)</span>
                      <span className="text-red-600">-{formatCurrency(analysis.monthly.vacancy)}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-900">Effective Gross Income</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(analysis.monthly.effectiveGrossIncome)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Expense Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Expenses</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mortgage (P&I)</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.debtService)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Property Tax</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.propertyTax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Insurance</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.insurance)}</span>
                    </div>
                    {analysis.monthly.hoaFees > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">HOA Fees</span>
                        <span className="text-gray-900">{formatCurrency(analysis.monthly.hoaFees)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Property Management</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.propertyManagement)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Maintenance</span>
                      <span className="text-gray-900">{formatCurrency(analysis.monthly.maintenance)}</span>
                    </div>
                    {analysis.monthly.utilities > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Utilities</span>
                        <span className="text-gray-900">{formatCurrency(analysis.monthly.utilities)}</span>
                      </div>
                    )}
                    {analysis.monthly.otherExpenses > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Other Expenses</span>
                        <span className="text-gray-900">{formatCurrency(analysis.monthly.otherExpenses)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-900">Total Expenses</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(analysis.monthly.totalExpenses)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Net Cash Flow */}
                <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Monthly Cash Flow</span>
                    <span className={`text-2xl font-bold ${
                      analysis.monthly.cashFlow > 0
                        ? 'text-green-600'
                        : analysis.monthly.cashFlow < 0
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}>
                      {formatCurrency(analysis.monthly.cashFlow)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Annual Cash Flow</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatCurrency(analysis.annual.cashFlow)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Metrics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Gross Rent Multiplier</span>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatRatio(analysis.metrics.grossRentMultiplier)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Break-Even Occupancy</span>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatPercent(analysis.metrics.breakEvenOccupancy)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Net Operating Income (Annual)</span>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatCurrency(analysis.annual.noi)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Annual Debt Service</span>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatCurrency(analysis.annual.debtService)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Finance This Deal?</h3>
              <p className="text-lg mb-6 text-white/90">
                Get pre-approved for a DSCR loan in 24 hours. No tax returns, no W-2s required. Rates from 5.99%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/"
                  className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 text-center"
                >
                  Get Pre-Approved
                </a>
                <a
                  href="tel:+19493393555"
                  className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-400 transition-all duration-200 text-center border-2 border-white/30"
                >
                  Call (949) 339-3555
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
