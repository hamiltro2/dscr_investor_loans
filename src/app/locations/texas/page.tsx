'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react';

export default function TexasPage() {
  const cities = [
    'Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth',
    'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Lubbock',
    'Irving', 'Laredo', 'Garland', 'Frisco', 'McKinney'
  ];

  const loanTypes = [
    { name: 'DSCR Loans', description: 'No tax returns required, qualify based on rental income' },
    { name: 'Fix & Flip Loans', description: 'Fast funding for renovation projects' },
    { name: 'Bridge Loans', description: 'Short-term financing for quick closings' },
    { name: 'Multi-Family Loans', description: 'Financing for apartment buildings' },
    { name: 'New Construction Loans', description: 'Ground-up development financing' }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Estate Investment Loans in Texas
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized DSCR loans and investment property financing throughout the Lone Star State. 
              Fast approvals, competitive rates, and expertise in Texas's booming rental markets.
            </p>
          </div>

          {/* Location Info Card */}
          <div className="bg-dark-900/50 rounded-2xl p-8 mb-12 border border-dark-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary-400" />
                  Serving All of Texas
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                    <span>
                      Statewide coverage from Houston to Dallas<br />
                      Expertise in Texas's diverse real estate markets
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-400" />
                    <a href="tel:+19493393555" className="text-primary-400 hover:text-primary-300">
                      (949) 339-3555
                    </a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-400" />
                    <span>Monday - Friday, 9:00 AM - 5:00 PM CT</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Why Choose Capital Bridge Solutions in Texas?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Deep understanding of Texas's diverse markets from Austin tech to Houston energy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Fast approvals for single-family, multi-family, and new construction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">No state income tax maximizes investor cash flow and returns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Competitive rates for one of America's strongest real estate markets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Serving All Major Texas Markets
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cities.map((city) => (
                <div key={city} className="bg-dark-900/30 rounded-lg p-4 text-center border border-dark-800/50 hover:border-primary-500/30 transition-colors">
                  <span className="text-gray-300">{city}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Investment Loan Products for Texas
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {loanTypes.map((loan) => (
                <div key={loan.name} className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-3">{loan.name}</h3>
                  <p className="text-gray-300">{loan.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Finance Your Texas Investment Property?
            </h2>
            <p className="text-xl text-white font-bold mb-8 max-w-2xl mx-auto">
              Get pre-approved in 24-48 hours with no income verification required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-started"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Pre-Approved Now
              </Link>
              <a 
                href="tel:+19493393555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:border-primary-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                (949) 339-3555
              </a>
            </div>
          </div>

          {/* Back to Locations */}
          <div className="mt-12 text-center">
            <Link 
              href="/locations" 
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Locations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
