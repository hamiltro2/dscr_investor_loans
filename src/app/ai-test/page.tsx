'use client';

import { useEffect, useState } from 'react';

export default function AITestPage() {
  const [contextData, setContextData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ai-context')
      .then(res => res.json())
      .then(data => {
        setContextData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const testEndpoints = [
    { name: 'AI Context API', url: '/api/ai-context', method: 'GET' },
    { name: 'OpenAPI Spec', url: '/openapi.yaml', method: 'GET' },
    { name: 'AI Plugin Manifest', url: '/.well-known/ai-plugin.json', method: 'GET' },
    { name: 'LLM.txt', url: '/llm.txt', method: 'GET' },
    { name: 'AI Prompts', url: '/ai-prompts.txt', method: 'GET' },
    { name: 'AI Policy', url: '/ai-policy.txt', method: 'GET' },
    { name: 'Cap AI Guide', url: '/cap-ai-guide.txt', method: 'GET' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🤖 AI Integration Test Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Testing all ChatGPT integration endpoints for Capital Bridge Solutions
          </p>

          {/* Endpoint Status */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📡 Endpoint Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testEndpoints.map((endpoint) => (
                <div key={endpoint.url} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{endpoint.name}</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {endpoint.method}
                    </span>
                  </div>
                  <a
                    href={endpoint.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 break-all"
                  >
                    {endpoint.url}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* AI Context Data Preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🎯 AI Context API Response
            </h2>
            {loading ? (
              <div className="text-gray-600">Loading...</div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                Error: {error}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Company Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Company</h3>
                  <div className="text-sm text-blue-800">
                    <p><strong>Name:</strong> {contextData?.company?.name}</p>
                    <p><strong>Tagline:</strong> {contextData?.company?.tagline}</p>
                    <p><strong>Phone:</strong> {contextData?.company?.phone}</p>
                    <p><strong>Service Area:</strong> {contextData?.company?.service_area}</p>
                  </div>
                </div>

                {/* Current Offerings */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Current Offerings</h3>
                  <div className="text-sm text-green-800">
                    <p><strong>Loan Range:</strong> {contextData?.current_offerings?.loan_range?.minimum} - {contextData?.current_offerings?.loan_range?.maximum}</p>
                    <p><strong>Rates:</strong> {contextData?.current_offerings?.rates?.range}</p>
                    <p><strong>Points:</strong> {contextData?.current_offerings?.rates?.points}</p>
                    <p><strong>Approval:</strong> {contextData?.current_offerings?.approval?.preapproval_time}</p>
                  </div>
                </div>

                {/* Products */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Products ({contextData?.products?.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contextData?.products?.map((product: any, index: number) => (
                      <div key={index} className="bg-white rounded p-3 text-sm">
                        <p className="font-semibold text-purple-900">{product.name}</p>
                        <p className="text-purple-700 text-xs">{product.key_feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cap AI */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-2">Cap AI Assistant</h3>
                  <div className="text-sm text-orange-800">
                    <p><strong>Availability:</strong> {contextData?.ai_assistant?.availability}</p>
                    <p><strong>Capabilities:</strong> {contextData?.ai_assistant?.capabilities?.length}</p>
                    <p><strong>Access:</strong> {contextData?.ai_assistant?.access}</p>
                  </div>
                </div>

                {/* Competitive Advantages */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    Competitive Advantages ({contextData?.competitive_advantages?.length})
                  </h3>
                  <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                    {contextData?.competitive_advantages?.slice(0, 5).map((adv: string, index: number) => (
                      <li key={index}>{adv}</li>
                    ))}
                  </ul>
                </div>

                {/* Full JSON */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Full JSON Response</h3>
                  <pre className="text-xs text-gray-700 overflow-auto max-h-96 bg-white p-4 rounded">
                    {JSON.stringify(contextData, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Integration Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ✅ Integration Complete!
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>🎉 You're ChatGPT-ready!</strong> All integration files are in place.
              </p>
              <div className="bg-white rounded p-4 space-y-2">
                <p className="font-semibold text-gray-900">Files Created:</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>/.well-known/ai-plugin.json - OpenAI Plugin Manifest</li>
                  <li>/api/ai-context - Real-time company data API</li>
                  <li>/ai-prompts.txt - 100+ conversation starters</li>
                  <li>/llm.txt (enhanced) - Updated with API endpoints</li>
                </ul>
              </div>
              <div className="bg-blue-100 rounded p-4">
                <p className="font-semibold text-blue-900 mb-1">How ChatGPT Will Use This:</p>
                <p className="text-sm text-blue-800">
                  ChatGPT will discover your plugin via the manifest, query the ai-context API for current data,
                  and direct users to chat with Cap at capitalbridgesolutions.com for instant analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
