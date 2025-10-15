/**
 * Realtime API Test Page
 * Test the new hands-free voice conversation system
 */

'use client';

import { RealtimeVoiceButton } from '@/components/AIChat/RealtimeVoiceButton';

export default function TestRealtimePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🎙️ Test Realtime Voice API
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Truly hands-free conversation with Cap
          </p>
          <p className="text-gray-400 text-sm">
            Click once, then just talk naturally - like a phone call!
          </p>
        </div>

        {/* Realtime Voice Component */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <RealtimeVoiceButton />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-300 mb-4">
            📋 How to Test:
          </h2>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>Click <strong>"Start Voice Chat"</strong> button (one time only)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>Allow microphone access when prompted</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>Wait for status: <strong>"Connected - Start talking!"</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <span>Start speaking: <em>"I need a DSCR loan for $500,000"</em></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">5.</span>
              <span>Stop speaking and wait ~1 second</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">6.</span>
              <span>Cap responds automatically! 🔊</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">7.</span>
              <span>Keep talking - <strong>no more clicking!</strong></span>
            </li>
          </ol>
        </div>

        {/* Comparison */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-bold text-gray-300 mb-2">💬 ChatWidget</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✅ Click mic each time</li>
              <li>✅ See text conversation</li>
              <li>✅ Lower cost (~$0.10/min)</li>
              <li>⚠️ Must manually stop</li>
            </ul>
            <a
              href="/"
              className="text-primary-400 hover:text-primary-300 text-sm mt-3 inline-block"
            >
              ← Test on Homepage
            </a>
          </div>
          
          <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
            <h3 className="font-bold text-green-300 mb-2">📞 Realtime API ⭐</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ Click once, then talk</li>
              <li>✅ Auto silence detection</li>
              <li>✅ Can interrupt Cap</li>
              <li>✅ Lower latency (~1s)</li>
            </ul>
            <span className="text-green-400 text-sm mt-3 inline-block">
              👈 You're testing it now!
            </span>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
