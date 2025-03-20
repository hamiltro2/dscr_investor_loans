import { AIAnalysis } from '../types/investment';

interface AIAnalysisCardProps {
  analysis: AIAnalysis;
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">AI Investment Analysis</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">Confidence Score:</span>
          <div className="bg-gray-700 px-3 py-1 rounded-full">
            <span className="text-blue-400 font-semibold">{analysis.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Overall Recommendation */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">Recommendation</h4>
        <p className="text-gray-300">{analysis.overallRecommendation}</p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">Summary</h4>
        <p className="text-gray-300">{analysis.summary}</p>
      </div>

      {/* Pros and Cons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-green-400 mb-2">Strengths</h4>
          <ul className="space-y-2">
            {analysis.pros.map((pro, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span className="text-gray-300">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-red-400 mb-2">Challenges</h4>
          <ul className="space-y-2">
            {analysis.cons.map((con, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-400 mr-2">!</span>
                <span className="text-gray-300">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">Risk Factors</h4>
        <ul className="space-y-2">
          {analysis.riskFactors.map((risk, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-500 mr-2">⚠</span>
              <div className="text-gray-300">
                <span className="font-semibold">{risk.factor}</span>
                <span className={`ml-2 px-2 py-0.5 rounded text-sm ${
                  risk.severity === 'High' ? 'bg-red-900 text-red-200' :
                  risk.severity === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-green-900 text-green-200'
                }`}>
                  {risk.severity}
                </span>
                <p className="mt-1 text-gray-400">{risk.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Opportunity Areas */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">Opportunity Areas</h4>
        <ul className="space-y-2">
          {analysis.opportunityAreas.map((opportunity, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-400 mr-2">↗</span>
              <span className="text-gray-300">{opportunity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Market Trends */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">Market Trends</h4>
        <ul className="space-y-2">
          {analysis.marketTrends.map((trend, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-400 mr-2">📈</span>
              <span className="text-gray-300">{trend}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Strategy */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-2">Recommended Strategy</h4>
        <p className="text-gray-300">{analysis.recommendedStrategy}</p>
      </div>

      {/* Additional Considerations */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">Additional Considerations</h4>
        <ul className="space-y-2">
          {analysis.additionalConsiderations.map((consideration, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span className="text-gray-300">{consideration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
