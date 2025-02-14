'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import coreLogicAPI from '@/lib/corelogic';
import { PropertyDetails, TransactionHistory, ComparableProperties, InvestmentRecommendation } from '@/types/corelogic';
import { formatCurrency, formatPercent, formatDate } from '@/lib/formatters';

// Import PropertySearch component with no SSR
const PropertySearch = dynamic(() => import('@/components/PropertySearch'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-800 rounded-lg p-6">
      <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="space-y-3">
        <div className="h-10 bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-700 rounded"></div>
      </div>
    </div>
  )
});

interface InvestmentAnalysis {
  property: PropertyDetails;
  metrics: {
    estimatedMonthlyRent: number;
    estimatedValue: number;
    lastSalePrice: number;
    annualTaxes: number;
    pricePerSqFt: number;
    averageCompPrice: number;
    priceAppreciation: number;
    dscr: number;
    capRate: number;
    cashOnCashReturn: number;
    monthlyCashFlow: number;
    grossMonthlyIncome: number;
    monthlyMortgage: number;
    monthlyTaxes: number;
    monthlyInsurance: number;
    monthlyMaintenance: number;
    monthlyVacancy: number;
    monthlyPropertyManagement: number;
    totalMonthlyExpenses: number;
    downPayment: number;
    loanAmount: number;
    annualCashFlow: number;
    breakEvenMonths: number;
  };
  history: TransactionHistory;
  comparables: ComparableProperties;
  recommendation: InvestmentRecommendation;
}

export default function InvestorAnalysisPage() {
  const [analysis, setAnalysis] = useState<InvestmentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Example questions data
  const exampleQuestions = [
    "What are the key factors to consider when evaluating a DSCR loan for a rental property?",
    "How do I calculate the potential ROI for a fix-and-flip investment?",
    "What's the optimal debt service coverage ratio for a multifamily property?",
    "How do market conditions affect cap rates in different real estate sectors?",
    "What are the advantages of DSCR loans compared to conventional mortgages?",
    "How should I analyze the risk-reward ratio for different investment properties?",
    "What are the best strategies for building a diversified real estate portfolio?",
    "How do I evaluate the potential for value-add opportunities in properties?",
    "What factors should I consider when analyzing different rental markets?",
    "How do I determine the right leverage ratio for my investment properties?",
    "What are the key metrics for evaluating commercial real estate investments?",
    "How do I assess the impact of location on long-term property appreciation?",
    "What strategies can I use to maximize rental income from my properties?",
    "How should I evaluate property management costs in different markets?",
    "What are the best practices for scaling a real estate investment business?",
    "How do I analyze the potential tax benefits of real estate investments?",
    "What factors influence the success of short-term rental investments?",
    "How do I evaluate potential renovation costs for investment properties?"
  ];

  // Calculate pagination
  const questionsPerPage = 3;
  const totalPages = Math.ceil(exampleQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = exampleQuestions.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePropertySelect = async (propertyId: string) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = await coreLogicAPI.analyzeInvestmentPotential(propertyId);
      
      // Ensure we have valid data
      if (!analysis.property || !analysis.history || !analysis.comparables) {
        throw new Error('Missing required property data');
      }

      // Access property data correctly
      const metrics = {
        estimatedMonthlyRent: analysis.property.valuation?.estimatedRent || 0,
        estimatedValue: analysis.property.valuation?.estimatedValue || 0,
        lastSalePrice: analysis.history.transactions[0]?.salePrice || 0,
        annualTaxes: analysis.property.taxes?.annualTaxAmount || 0,
        pricePerSqFt: analysis.property.valuation?.estimatedValue 
          ? analysis.property.valuation.estimatedValue / (analysis.property.characteristics?.squareFeet || 1)
          : 0,
        averageCompPrice: 0,
        priceAppreciation: 0,
        dscr: 0,
        capRate: 0,
        cashOnCashReturn: 0,
        monthlyCashFlow: 0,
        grossMonthlyIncome: 0,
        monthlyMortgage: 0,
        monthlyTaxes: 0,
        monthlyInsurance: 0,
        monthlyMaintenance: 0,
        monthlyVacancy: 0,
        monthlyPropertyManagement: 0,
        totalMonthlyExpenses: 0,
        downPayment: 0,
        loanAmount: 0,
        annualCashFlow: 0,
        breakEvenMonths: 0,
      };

      setAnalysis({
        property: analysis.property,
        metrics,
        history: analysis.history,
        comparables: analysis.comparables,
        recommendation: analysis.recommendation
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze property');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsAskingQuestion(true);
    setIsSearchingWeb(true);
    setAnswer(null);
    
    try {
      const response = await fetch('/api/investment-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      setIsSearchingWeb(false);
      
      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('Sorry, I encountered an error while trying to answer your question. Please try again.');
    } finally {
      setIsAskingQuestion(false);
      setIsSearchingWeb(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">AI Real Estate Investor Analysis</h1>
          <p className="mt-2 text-lg text-gray-400">Get detailed investment insights and expert answers</p>
        </div>

        {/* Investment Questions Section */}
        <section className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Investment Questions</h2>
            <p className="text-gray-300 mb-4">
              Ask any questions about real estate investing. I'll search trusted industry sources 
              and provide comprehensive answers using advanced AI analysis.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    id="question"
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4"
                    placeholder="E.g., What's a good cap rate for rental properties?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isAskingQuestion && question.trim()) {
                        e.preventDefault();
                        handleAskQuestion();
                      }
                    }}
                    spellCheck="false"
                  />
                  <button
                    onClick={handleAskQuestion}
                    disabled={isAskingQuestion || !question.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isAskingQuestion ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      'Ask Question'
                    )}
                  </button>
                </div>
              </div>

              {isAskingQuestion && (
                <div className="mt-4 text-gray-400">
                  {isSearchingWeb ? (
                    <p className="flex items-center">
                      <span className="mr-2">🔍</span>
                      Searching trusted real estate sources...
                    </p>
                  ) : (
                    <p className="flex items-center">
                      <span className="mr-2">🤔</span>
                      Analyzing market insights...
                    </p>
                  )}
                </div>
              )}

              {answer && (
                <div className="mt-4 bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-600 pb-3">
                    <h3 className="text-xl font-semibold text-cyan-400 leading-none">Capital Bridge Solutions</h3>
                    <span className="text-gray-400 leading-none">|</span>
                    <span className="text-sm text-gray-400 leading-none pt-0.5">Advanced AI Investment Response</span>
                  </div>
                  <div className="prose prose-invert prose-blue max-w-none">
                    <div className="text-white" dangerouslySetInnerHTML={{ __html: answer }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Example Questions Section */}
        <section className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Example Investment Questions</h2>
            <p className="mt-2 text-gray-400">Click on any question to analyze it with our AI</p>
          </div>

          <div className="grid gap-4">
            {currentQuestions.map((q, index) => (
              <button
                key={startIndex + index}
                onClick={() => setQuestion(q)}
                className="text-left p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-medium">{startIndex + index + 1}.</span>
                  <p className="text-gray-300 group-hover:text-white transition-colors">{q}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Modern Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Property Analysis Section - Temporarily hidden until CoreLogic API integration
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Analyze a Specific Property</h2>
          <p className="mt-2 text-gray-400">Enter an address to get detailed investment metrics</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <PropertySearch onPropertySelect={handlePropertySelect} />
        </Suspense>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Analyzing property investment potential...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-md p-4 mt-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {analysis && (
          <div className="mt-8 space-y-8">
            <section className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Investment Analysis</h2>
                
                <div className={`mb-6 p-4 rounded-lg ${
                  analysis.recommendation.recommendation === 'Strong Buy' ? 'bg-green-900/50 border border-green-700' :
                  analysis.recommendation.recommendation === 'Buy' ? 'bg-green-900/50 border border-green-700' :
                  analysis.recommendation.recommendation === 'Hold' ? 'bg-yellow-900/50 border border-yellow-700' :
                  'bg-red-900/50 border border-red-700'
                }`}>
                  <h3 className="text-xl font-semibold mb-2">
                    {analysis.recommendation.recommendation}
                  </h3>
                  <p className="text-gray-300">
                    {analysis.recommendation.explanation}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
        */}
      </div>
    </div>
  );
}
