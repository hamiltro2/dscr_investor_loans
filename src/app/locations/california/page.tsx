'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react';

export default function CaliforniaPage() {
  const cities = [
    'Los Angeles', 'San Diego', 'San Francisco', 'Irvine', 'Sacramento',
    'San Jose', 'Fresno', 'Long Beach', 'Oakland', 'Bakersfield',
    'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Chula Vista'
  ];

  const loanTypes = [
    { name: 'DSCR Loans', description: 'No tax returns required, qualify based on rental income' },
    { name: 'Fix & Flip Loans', description: 'Fast funding for renovation projects' },
    { name: 'Bridge Loans', description: 'Short-term financing for quick closings' },
    { name: 'Multi-Family Loans', description: 'Financing for apartment buildings' },
    { name: 'Commercial Loans', description: 'Retail, office, and industrial properties' }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Estate Investment Loans in California
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized DSCR loans and investment property financing throughout the Golden State. 
              Fast approvals, competitive rates, and local expertise.
            </p>
          </div>

          {/* Location Info Card */}
          <div className="bg-dark-900/50 rounded-2xl p-8 mb-12 border border-dark-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary-400" />
                  Southern California Headquarters
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                    <span>
                      Serving all of California from<br />
                      Southern California (Orange County)
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
                    <span>Monday - Friday, 9:00 AM - 5:00 PM PST</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Why Choose Capital Bridge Solutions in California?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Deep understanding of California's diverse real estate markets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Fast approvals tailored to California property types</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Local expertise from Los Angeles to San Francisco</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Competitive rates for California investors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Serving All Major California Markets
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
              California Investment Property Loans
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTypes.map((loan) => (
                <div key={loan.name} className="bg-dark-900/50 rounded-xl p-6 border border-dark-800 hover:border-primary-500/30 transition-colors">
                  <h3 className="text-xl font-semibold text-primary-400 mb-3">{loan.name}</h3>
                  <p className="text-gray-300">{loan.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* California Market Stats */}
          <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 mb-12 border border-primary-500/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              California Real Estate Investment Opportunities
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-400 mb-2">$800K+</div>
                <div className="text-gray-300">Average Property Value</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-400 mb-2">6.5%+</div>
                <div className="text-gray-300">Average Rental Yield</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-400 mb-2">15%+</div>
                <div className="text-gray-300">Annual Appreciation</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Invest in California Real Estate?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get pre-approved for your California investment property loan in 24-48 hours. 
              No tax returns required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/get-started"
                className="btn-primary text-lg px-8 py-4"
              >
                Get Started Now
              </Link>
              <a 
                href="tel:+19493393555"
                className="btn-secondary text-lg px-8 py-4"
              >
                Call (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
