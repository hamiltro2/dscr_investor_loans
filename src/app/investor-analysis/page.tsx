'use client';

import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { MetricCard } from '../../components/MetricCard';
import '../../styles/analysis.css';
import { FiCopy, FiX } from 'react-icons/fi';
import { LoadingSpinner } from '../../components/LoadingSpinner';

interface PropertyData {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  estimatedRent: number;
  monthlyMortgage: number;
  monthlyExpenses: number;
  monthlyCashflow: number;
  capRate: number;
  cashOnCash: number;
  dscr: number;
}

interface BestScenario {
  downPaymentPercent: number;
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  annualNOI: number;
  capRate: number;
  cashOnCashReturn: number;
  dscr: number;
}

interface AddressFields {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export default function InvestorAnalysis() {
  const [mounted, setMounted] = useState(false);
  const [propertyUrl, setPropertyUrl] = useState('');
  const [questionInput, setQuestionInput] = useState('');
  const [addressFields, setAddressFields] = useState<AddressFields>({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [bestScenario, setBestScenario] = useState<BestScenario | null>(null);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnalyze = async (input: string, type: 'url' | 'address' | 'question') => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/property-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: input,
          inputType: type,
          addressFields: type === 'address' ? addressFields : undefined
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.data.type === 'question') {
        setAnalysis(result.data.answer || '');
        setPropertyData(null);
        setBestScenario(null);
      } else {
        setPropertyData(result.data);
        setBestScenario(null);
        setAnalysis('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(analysis);
  };

  const handleClose = () => {
    setAnalysis('');
    setQuestionInput('');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            AI Investment Analysis
          </h1>
          <p className="mt-4 text-gray-400">
            Get intelligent property insights powered by artificial intelligence
          </p>
        </div>

        {/* Input Card */}
        <Card className="p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
          <div>
            <div className="mb-8 p-6 bg-dark-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Property Analysis</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Property Address</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={addressFields.street}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-md text-white"
                      spellCheck={false}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={addressFields.city}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-md text-white"
                      spellCheck={false}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={addressFields.state}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-md text-white"
                      spellCheck={false}
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={addressFields.zip}
                      onChange={(e) => setAddressFields(prev => ({ ...prev, zip: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-md text-white"
                      spellCheck={false}
                    />
                  </div>
                  <button
                    onClick={() => handleAnalyze('', 'address')}
                    disabled={loading || (!addressFields.street || !addressFields.city || !addressFields.state)}
                    className="mt-4 w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-all 
                      disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group
                      before:absolute before:inset-0 before:bg-emerald-400/20 before:translate-x-[-100%] hover:before:translate-x-[100%] 
                      before:transition-transform before:duration-500 before:ease-in-out"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" className="text-white" />
                          <span className="text-white font-medium tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                            Analyzing Property...
                          </span>
                        </>
                      ) : (
                        <span>Analyze Property</span>
                      )}
                    </div>
                  </button>
                </div>

                <div className="mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Property URL (Optional)</label>
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Paste Redfin or Zillow URL"
                        value={propertyUrl}
                        onChange={(e) => setPropertyUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-md text-white"
                        spellCheck={false}
                      />
                      <button
                        onClick={() => handleAnalyze(propertyUrl, 'url')}
                        disabled={loading || !propertyUrl.trim()}
                        className="mt-2 w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-all 
                          disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group
                          before:absolute before:inset-0 before:bg-emerald-400/20 before:translate-x-[-100%] hover:before:translate-x-[100%] 
                          before:transition-transform before:duration-500 before:ease-in-out"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <LoadingSpinner size="sm" className="text-white" />
                              <span className="text-white font-medium tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                                Analyzing URL...
                              </span>
                            </>
                          ) : (
                            <span>Analyze URL</span>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
                    {error}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-dark-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Investment Questions</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Ask a Question</label>
                <textarea
                  placeholder="Example: What are typical interest rates for Investment loans?"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-md text-white resize-none"
                  spellCheck={false}
                />
                <button
                  onClick={() => handleAnalyze(questionInput, 'question')}
                  disabled={loading || !questionInput.trim()}
                  className="mt-2 w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-all 
                    disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group
                    before:absolute before:inset-0 before:bg-emerald-400/20 before:translate-x-[-100%] hover:before:translate-x-[100%] 
                    before:transition-transform before:duration-500 before:ease-in-out"
                >
                  <div className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" className="text-white" />
                        <span className="text-white font-medium tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                          Getting Answer...
                        </span>
                      </>
                    ) : (
                      <span>Get Answer</span>
                    )}
                  </div>
                </button>
              </div>

              {/* Question Response Display */}
              {analysis && (
                <div className="mt-6 relative">
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button
                      onClick={handleCopyResponse}
                      className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      title="Copy response"
                    >
                      <FiCopy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleClose}
                      className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      title="Close"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <Card className="p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                    <div className="prose prose-invert max-w-none">
                      <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                          Capital Bridge Solutions
                        </h2>
                        <div className="mt-2 text-emerald-400">
                          Expert Investment Analysis & Investment Loan Insights
                        </div>
                        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 mx-auto rounded-full"></div>
                      </div>
                      <div 
                        className="space-y-8"
                        dangerouslySetInnerHTML={{ 
                          __html: analysis
                            .replace(/# Additional Support([\s\S]*?)(?=\n#|$)/g, (match, content) => `
                              <div class="my-8">
                                <h2 class="text-xl font-semibold mb-4 text-emerald-400">Additional Support</h2>
                                <div class="p-6 rounded-lg bg-gradient-to-br from-emerald-900/50 to-blue-900/50 border border-emerald-500/20">
                                  <p class="text-white mb-4">For personalized assistance with your investment strategy or Investment loan questions:</p>
                                  <div class="space-y-2">
                                    <div class="flex items-center space-x-2">
                                      <span class="text-emerald-400">Call:</span>
                                      <span class="text-white">(949) 614-6390</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                      <span class="text-emerald-400">Email:</span>
                                      <span class="text-white">info@capitalbridgesolutions.com</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            `)
                            .replace(/# (.*?)(?=\n|$)/g, (_, title) => `
                              <div class="mb-8">
                                <h2 class="text-2xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                                  ${title}
                                </h2>
                                <div class="content space-y-4">
                            `)
                            .replace(/(?=#|\n$)/g, '</div></div>')
                            .replace(/## (.*?)(?=\n|$)/g, '<h3 class="text-lg font-semibold mb-4 text-emerald-400">$1</h3>')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .split('\n').map(line => 
                              line.trim().startsWith('* ') || line.trim().startsWith('- ')
                                ? `<div class="flex items-start space-x-3 my-2">
                                    <div class="text-emerald-400 text-lg mt-0.5">•</div>
                                    <div class="flex-1 text-white">${line.substring(2)}</div>
                                   </div>`
                                : line.trim() ? `<p class="my-2 text-white">${line}</p>` : ''
                            ).join('')
                        }}
                      />
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {propertyData && (
              <>
                {/* Property Details Card */}
                <Card className="p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                  <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-dark-800 rounded-lg">
                    <div>
                      <p className="text-gray-400">Address</p>
                      <p className="text-lg font-medium">{propertyData.address}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Price</p>
                      <p className="text-lg font-medium">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(propertyData.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Bedrooms</p>
                      <p className="text-lg font-medium">{propertyData.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Bathrooms</p>
                      <p className="text-lg font-medium">{propertyData.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Square Feet</p>
                      <p className="text-lg font-medium">{propertyData.squareFeet.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Estimated Monthly Rent</p>
                      <p className="text-lg font-medium">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(propertyData.estimatedRent)}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Financial Metrics Card */}
                <Card className="p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                  <h2 className="text-2xl font-semibold mb-4">Financial Metrics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <MetricCard
                      title="Monthly Mortgage"
                      value={propertyData.monthlyMortgage}
                      type="currency"
                    />
                    <MetricCard
                      title="Monthly Expenses"
                      value={propertyData.monthlyExpenses}
                      type="currency"
                    />
                    <MetricCard
                      title="Monthly Cashflow"
                      value={propertyData.monthlyCashflow}
                      type="currency"
                    />
                    <MetricCard
                      title="Cap Rate"
                      value={propertyData.capRate}
                      type="percentage"
                    />
                    <MetricCard
                      title="Cash on Cash"
                      value={propertyData.cashOnCash}
                      type="percentage"
                    />
                    <MetricCard
                      title="DSCR"
                      value={propertyData.dscr}
                      type="ratio"
                    />
                  </div>
                </Card>

                {/* Analysis Results Card */}
                {(bestScenario || analysis) && (
                  <Card className="p-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                    <div className="space-y-6">
                      {bestScenario && (
                        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Best Investment Scenario</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-lg font-medium mb-2">Down Payment Details</h4>
                              <div className="space-y-2">
                                <p><span className="text-gray-400">Percentage:</span> {bestScenario.downPaymentPercent}%</p>
                                <p><span className="text-gray-400">Amount:</span> ${new Intl.NumberFormat('en-US').format(bestScenario.downPayment)}</p>
                                <p><span className="text-gray-400">Loan Amount:</span> ${new Intl.NumberFormat('en-US').format(bestScenario.loanAmount)}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium mb-2">Monthly Financials</h4>
                              <div className="space-y-2">
                                <p><span className="text-gray-400">Payment:</span> ${new Intl.NumberFormat('en-US').format(bestScenario.monthlyPayment)}</p>
                                <p><span className="text-gray-400">Expenses:</span> ${new Intl.NumberFormat('en-US').format(bestScenario.monthlyExpenses)}</p>
                                <p><span className="text-gray-400">Cash Flow:</span> ${new Intl.NumberFormat('en-US').format(bestScenario.monthlyCashFlow)}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium mb-2">Annual Performance</h4>
                              <div className="space-y-2">
                                <p><span className="text-gray-400">NOI:</span> ${new Intl.NumberFormat('en-US').format(bestScenario.annualNOI)}</p>
                                <p><span className="text-gray-400">Cap Rate:</span> {bestScenario.capRate.toFixed(2)}%</p>
                                <p><span className="text-gray-400">Cash on Cash Return:</span> {bestScenario.cashOnCashReturn.toFixed(2)}%</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium mb-2">Loan Metrics</h4>
                              <div className="space-y-2">
                                <p><span className="text-gray-400">DSCR:</span> {bestScenario.dscr.toFixed(2)}</p>
                                <p className="mt-2 text-sm text-emerald-400">
                                  {bestScenario.dscr >= 1.25 
                                    ? 'Strong DSCR - Likely to qualify for best rates'
                                    : bestScenario.dscr >= 1.0
                                    ? 'Acceptable DSCR - May qualify with some lenders'
                                    : 'Low DSCR - May be difficult to qualify'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {analysis && (
                        <div className="prose prose-invert max-w-none">
                          <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-4">Investment Analysis</h3>
                            <div 
                              className="whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{ 
                                __html: analysis
                                  .replace(/# (.*?)(?=\n|$)/g, (_, title) => `<h1>${title}</h1>`)
                                  .replace(/## (.*?)(?=\n|$)/g, (_, title) => `<h2>${title}</h2>`)
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .split('\n').map(line => 
                                    line.trim().startsWith('- ') || line.trim().startsWith('* ')
                                      ? `<div class="flex items-start space-x-3 my-2">
                                          <div class="text-emerald-400 text-lg mt-0.5">•</div>
                                          <div class="flex-1 text-white">${line.substring(2)}</div>
                                        </div>`
                                      : line
                                  ).join('\n')
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
