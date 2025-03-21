'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getAIResponse } from '@/lib/ai';
import { PropertyDetail } from '@/types/attom';
import { InvestmentMetrics } from '@/types/investment';
import LoadingPulse from '@/components/LoadingPulse';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Import PropertyAnalysis but don't render it for now
// import PropertyAnalysis from '@/components/PropertyAnalysis';

// Import components with no SSR but don't render them for now
const PropertySearch = dynamic(() => import('@/components/PropertySearch'), {
  ssr: false,
});

const PropertyDetails = dynamic(() => import('@/components/PropertyDetails'), {
  ssr: false,
});

interface SearchResult {
  property: PropertyDetail;
  investmentMetrics: InvestmentMetrics;
}

// Move example questions outside component to prevent re-renders
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

const QUESTIONS_PER_PAGE = 3;

export default function InvestorAnalysisPage() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<{ text: string; provider: 'deepseek' | 'openai' } | null>(null);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(exampleQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = exampleQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const handlePropertySelect = (result: SearchResult) => {
    setSearchResult(result);
    setError(null);
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsAskingQuestion(true);
    setError(null);

    try {
      const response = await fetch('/api/ask-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          propertyData: searchResult,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer({
        text: data.answer,
        provider: data.provider
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
    } finally {
      setIsAskingQuestion(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isAskingQuestion && question.trim()) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  const handleCloseAnswer = () => {
    setAnswer(null);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Real Estate Investor AI Query</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ask any real estate investment question. Get answers about property analysis, DSCR loans, rental strategies, and investment metrics.
          </p>
        </div>

        {/* Ask a Question */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Ask an Investment Question</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
                Your Question
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <input
                  type="text"
                  id="question"
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 p-2"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about real estate investing, DSCR loans, or property analysis..."
                  onKeyDown={handleKeyDown}
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={handleAskQuestion}
                  disabled={isAskingQuestion || !question.trim()}
                  className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isAskingQuestion ? 'Thinking...' : 'Ask Question'}
                </button>
              </div>
            </div>
            {isAskingQuestion && <LoadingPulse />}
            {answer && (
              <div className="bg-gray-800 rounded-lg p-6 mt-4 animate-fade-in shadow-lg border border-gray-700 relative">
                <button 
                  onClick={handleCloseAnswer}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
                  aria-label="Close answer"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <div 
                  className="text-gray-200 max-w-none font-sans leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: answer.text }} 
                />
              </div>
            )}

            {/* Example Questions */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-3">Example Questions</h3>
              <div className="space-y-2">
                {currentQuestions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="w-full text-left p-3 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    suppressHydrationWarning
                  >
                    <p className="text-white">{q}</p>
                  </button>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    suppressHydrationWarning
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Property Search - temporarily hidden until ATTOM API key is available */}
        {/* <PropertySearch onPropertySelect={handlePropertySelect} /> */}

        {/* Property Details and Analysis */}
        {searchResult && (
          <div className="space-y-8">
            <PropertyDetails property={searchResult.property} investmentMetrics={searchResult.investmentMetrics} />
            {/* Temporarily hide PropertyAnalysis component until ATTOM API key is available
            {searchResult && searchResult.property && searchResult.investmentMetrics && (
              <PropertyAnalysis
                propertyData={{
                  address: searchResult.property.address?.oneLine || '',
                  propertyType: searchResult.property.summary?.proptype || '',
                  city: searchResult.property.address?.locality || '',
                  state: searchResult.property.address?.countrySubd || '',
                  zipCode: searchResult.property.address?.postal1 || '',
                  estimatedValue: searchResult.investmentMetrics.propertyValue,
                  purchasePrice: searchResult.investmentMetrics.purchasePrice,
                  monthlyRent: searchResult.investmentMetrics.estimatedMonthlyRent,
                  bedrooms: searchResult.property.building?.rooms?.beds || 0,
                  bathrooms: searchResult.property.building?.rooms?.bathstotal || 0,
                  squareFeet: searchResult.property.building?.size?.livingsize || 0,
                  yearBuilt: searchResult.property.summary?.yearbuilt || 0,
                  lotSize: Number(searchResult.property.lot?.lotsize || 0),
                  propertyClass: 'B', // Default to class B if not available
                  rentalStrategies: searchResult.investmentMetrics.rentalStrategies,
                  aiAnalysis: searchResult.investmentMetrics.aiAnalysis
                }}
              />
            )} */}
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-md p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
