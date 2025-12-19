'use client';

import Link from 'next/link';
import { Target, Zap, Calculator, TrendingUp, Download, CheckCircle, Chrome } from 'lucide-react';

export default function ChromeExtensionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Chrome className="w-5 h-5" />
              <span className="text-sm font-medium">Available on Chrome Web Store</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Analyze Properties<br />
              <span className="text-blue-200">10x Faster</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              AI-powered calculator that auto-fills property data from Zillow, Redfin, and 11+ websites.
              Make faster investment decisions with instant DSCR, ROI, and deal quality scores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://chromewebstore.google.com/detail/pejohinmhmeoneffemjfigpkjiodbnec?utm_source=item-share-cp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Download className="w-6 h-6" />
                Add to Chrome - It's Free
              </a>
              <button
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/20 hover:bg-white/20 transition-all"
              >
                See How It Works
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Works on 11+ Websites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video/Screenshot Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              One-Page Analysis of Any Property
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See everything you need to know about a deal in seconds. No more switching between calculators and spreadsheets.
            </p>
          </div>

          {/* Demo Screenshot with Annotations */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            {/* Browser Chrome */}
            <div className="bg-gray-700 rounded-t-lg p-3 flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-600 rounded px-4 py-1 text-sm text-gray-300">
                zillow.com/property/123-main-st
              </div>
            </div>

            {/* Calculator Display */}
            <div className="bg-white rounded-lg p-6 space-y-6">
              {/* Top Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                  <div className="text-xs text-blue-600 font-semibold mb-1">PURCHASE PRICE</div>
                  <div className="text-2xl font-bold text-blue-900">$450,000</div>
                  <div className="text-xs text-blue-600 mt-1">✓ Auto-filled from Zillow</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                  <div className="text-xs text-green-600 font-semibold mb-1">MONTHLY RENT</div>
                  <div className="text-2xl font-bold text-green-900">$3,200</div>
                  <div className="text-xs text-green-600 mt-1">✓ Estimated by AI</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <div className="text-xs text-purple-600 font-semibold mb-1">DSCR RATIO</div>
                  <div className="text-2xl font-bold text-purple-900">1.28</div>
                  <div className="text-xs text-purple-600 mt-1">✓ Excellent</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
                  <div className="text-xs text-yellow-600 font-semibold mb-1">DEAL SCORE</div>
                  <div className="text-2xl font-bold text-yellow-900">8.5/10</div>
                  <div className="text-xs text-yellow-600 mt-1">✓ Strong Buy</div>
                </div>
              </div>

              {/* Monthly Cash Flow */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-700 font-semibold mb-1">MONTHLY CASH FLOW</div>
                    <div className="text-4xl font-bold text-green-900">+$687</div>
                    <div className="text-sm text-green-600 mt-2">After mortgage, taxes, insurance, HOA</div>
                  </div>
                  <TrendingUp className="w-16 h-16 text-green-500 opacity-50" />
                </div>
              </div>

              {/* AI Analysis Summary */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-indigo-900 mb-2">AI Analysis</h3>
                    <ul className="space-y-2 text-sm text-indigo-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Strong DSCR (1.28):</strong> Qualifies for best rates at 5.5%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Positive cash flow:</strong> $687/month after all expenses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Growing market:</strong> Sacramento rents up 8% YoY</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span><strong>Financing:</strong> Recommend DSCR loan at 75% LTV</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-indigo-200">
                  <div className="text-xs text-indigo-600">💡 Tip: This property meets Capital Bridge Solutions lending requirements</div>
                </div>
              </div>
            </div>

            {/* Floating Feature Callouts */}
            <div className="absolute -right-4 top-1/4 bg-blue-500 text-white px-4 py-2 rounded-l-lg shadow-lg transform rotate-3">
              <div className="text-xs font-semibold">Auto-Filled!</div>
            </div>
            <div className="absolute -left-4 bottom-1/3 bg-green-500 text-white px-4 py-2 rounded-r-lg shadow-lg transform -rotate-3">
              <div className="text-xs font-semibold">AI Powered</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Everything shown above is generated automatically in under 3 seconds!</p>
            <a
              href="https://chromewebstore.google.com/detail/pejohinmhmeoneffemjfigpkjiodbnec?utm_source=item-share-cp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Free Extension
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Analyze Deals
            </h2>
            <p className="text-xl text-gray-600">
              Professional tools used by thousands of investors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Auto-Fill from 11+ Sites</h3>
              <p className="text-gray-600 mb-4">
                Works on Zillow, Redfin, Realtor.com, LoopNet, Roofstock, BiggerPockets, and more.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Purchase price</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Rent estimates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Property taxes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>HOA fees</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3 Professional Calculators</h3>
              <p className="text-gray-600 mb-4">
                DSCR, Hard Money, and ROI calculators all in one extension.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>DSCR ratio & qualification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Fix & flip analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cash-on-cash returns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Monthly cash flow</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Deal Scoring</h3>
              <p className="text-gray-600 mb-4">
                Get instant deal quality scores from 1-10 with AI-powered analysis.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Rental comp analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Market trend insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Financing recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Risk assessment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Analyzing Properties Faster
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of investors who use our extension to make faster, better investment decisions.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/pejohinmhmeoneffemjfigpkjiodbnec?utm_source=item-share-cp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-700 px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          >
            <Chrome className="w-7 h-7" />
            Add to Chrome - Free Forever
          </a>
          <p className="mt-6 text-sm text-blue-200">
            No credit card required • Installs in 10 seconds • Works immediately
          </p>
        </div>
      </section>

      {/* Chat with Cap CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions About the Extension?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Chat with Cap, our AI assistant, to learn more about features, compatibility, and how to get started.
          </p>
          <button
            onClick={() => window.dispatchEvent(new Event('openChatWidget'))}
            className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            Chat with Cap Now
            <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          </button>
        </div>
      </section>
    </div>
  );
}
