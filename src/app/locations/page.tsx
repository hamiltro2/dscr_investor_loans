'use client';

import Link from 'next/link';
import { MapPin, TrendingUp, Users, Building } from 'lucide-react';

export default function LocationsPage() {
  const states = [
    {
      name: 'California',
      slug: 'california',
      description: 'Premier investment opportunities in Los Angeles, San Francisco, San Diego, and more',
      stats: { properties: '10,000+', avgLoan: '$850K', markets: '25+' }
    },
    {
      name: 'Texas',
      slug: 'texas',
      description: 'Growing markets in Houston, Dallas, Austin, and San Antonio',
      stats: { properties: '8,500+', avgLoan: '$450K', markets: '20+' }
    },
    {
      name: 'Florida',
      slug: 'florida',
      description: 'High-yield investments in Miami, Orlando, Tampa, and Jacksonville',
      stats: { properties: '7,200+', avgLoan: '$550K', markets: '18+' }
    },
    {
      name: 'Arizona',
      slug: 'arizona',
      description: 'Expanding opportunities in Phoenix, Scottsdale, and Tucson',
      stats: { properties: '4,500+', avgLoan: '$400K', markets: '10+' }
    },
    {
      name: 'Nevada',
      slug: 'nevada',
      description: 'Strong rental markets in Las Vegas and Reno',
      stats: { properties: '3,200+', avgLoan: '$380K', markets: '8+' }
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="container py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Investment Property Loans by Location
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Capital Bridge Solutions provides specialized DSCR loans and investment property 
              financing across major U.S. markets. Find local expertise in your area.
            </p>
          </div>

          {/* National Coverage Banner */}
          <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 mb-12 border border-primary-500/20">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <MapPin className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">50</div>
                <div className="text-gray-300">States Served</div>
              </div>
              <div>
                <Building className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">35K+</div>
                <div className="text-gray-300">Properties Funded</div>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">$2.5B+</div>
                <div className="text-gray-300">Total Funded</div>
              </div>
              <div>
                <Users className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">15K+</div>
                <div className="text-gray-300">Happy Investors</div>
              </div>
            </div>
          </div>

          {/* State Listings */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Select Your State
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {states.map((state) => (
                <Link 
                  key={state.slug}
                  href={`/locations/${state.slug}`}
                  className="group"
                >
                  <div className="bg-dark-900/50 rounded-xl p-6 border border-dark-800 hover:border-primary-500/50 transition-all duration-300 h-full">
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {state.name}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {state.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-dark-800">
                      <div>
                        <div className="text-primary-400 font-semibold">{state.stats.properties}</div>
                        <div className="text-xs text-gray-400">Properties</div>
                      </div>
                      <div>
                        <div className="text-primary-400 font-semibold">{state.stats.avgLoan}</div>
                        <div className="text-xs text-gray-400">Avg Loan</div>
                      </div>
                      <div>
                        <div className="text-primary-400 font-semibold">{state.stats.markets}</div>
                        <div className="text-xs text-gray-400">Markets</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other States Section */}
          <div className="bg-dark-900/30 rounded-2xl p-8 mb-12 border border-dark-800">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              We Also Serve All Other U.S. States
            </h2>
            <p className="text-gray-300 text-center mb-6 max-w-3xl mx-auto">
              Don't see your state listed above? We provide DSCR loans and investment property 
              financing nationwide. Contact us to discuss opportunities in your area.
            </p>
            <div className="text-center">
              <Link 
                href="/get-started"
                className="btn-primary"
              >
                Get Started in Your State
              </Link>
            </div>
          </div>

          {/* SEO Content */}
          <div className="prose prose-invert max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Nationwide Investment Property Financing
            </h2>
            <p className="text-gray-300 mb-4">
              Capital Bridge Solutions specializes in providing DSCR (Debt Service Coverage Ratio) 
              loans and other investment property financing solutions across the United States. 
              Our local market expertise combined with national lending capabilities ensures you 
              get the best rates and terms for your specific market.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3">
              Local Expertise, National Reach
            </h3>
            <p className="text-gray-300 mb-4">
              Whether you're investing in California's competitive markets, Texas's growing cities, 
              Florida's vacation rental properties, or emerging markets across the country, our 
              team understands the unique challenges and opportunities in each location.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3">
              State-Specific Loan Programs
            </h3>
            <p className="text-gray-300">
              We offer tailored loan programs that account for state-specific regulations, market 
              conditions, and investment strategies. From single-family rentals to multi-family 
              properties and commercial real estate, we have the right financing solution for your 
              investment goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
