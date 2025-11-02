import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'California DSCR Loans by City - Bay Area & SoCal | Capital Bridge',
  description: 'DSCR loans in Los Angeles, San Diego, San Francisco, San Jose, Santa Clara, Oakland & all California cities. No tax returns. Rates from 5.99%. Call (949) 339-3555.',
  openGraph: {
    title: 'California DSCR Loans - All Major Cities',
    description: 'Finance investment properties across California. Bay Area, Southern California, and beyond.',
  },
};

export default function LocationsPage() {
  const cities = [
    {
      name: 'Los Angeles',
      slug: 'los-angeles-dscr-loans',
      region: 'Southern California',
      description: 'Finance LA rental properties from Downtown to Venice Beach',
      medianPrice: '$950K',
      avgRent: '$3,400',
      searches: '15K/mo',
      dscr: '1.20'
    },
    {
      name: 'San Diego',
      slug: 'san-diego-dscr-loans',
      region: 'Southern California',
      description: 'America\'s Finest City - Pacific Beach to East County',
      medianPrice: '$875K',
      avgRent: '$3,200',
      searches: '8K/mo',
      dscr: '1.23'
    },
    {
      name: 'San Francisco',
      slug: 'san-francisco-dscr-loans',
      region: 'Bay Area',
      description: 'Silicon Valley gateway - SOMA to Sunset District',
      medianPrice: '$1.4M',
      avgRent: '$4,500',
      searches: '8K/mo',
      dscr: '1.18'
    },
    {
      name: 'San Jose',
      slug: 'san-jose-dscr-loans',
      region: 'Bay Area',
      description: 'Silicon Valley hub - Willow Glen to Evergreen',
      medianPrice: '$1.2M',
      avgRent: '$4,000',
      searches: '6K/mo',
      dscr: '1.22'
    },
    {
      name: 'Santa Clara',
      slug: 'santa-clara-dscr-loans',
      region: 'Bay Area',
      description: 'Intel & Nvidia HQ - Heart of Silicon Valley',
      medianPrice: '$1.3M',
      avgRent: '$4,100',
      searches: '2K/mo',
      dscr: '1.23'
    },
    {
      name: 'Palo Alto',
      slug: 'palo-alto-dscr-loans',
      region: 'Bay Area',
      description: 'Stanford & VC hub - Silicon Valley birthplace',
      medianPrice: '$2.8M',
      avgRent: '$6,500',
      searches: '1.8K/mo',
      dscr: '1.18'
    },
    {
      name: 'Oakland',
      slug: 'oakland-dscr-loans',
      region: 'Bay Area',
      description: 'East Bay alternative - Jack London to Oakland Hills',
      medianPrice: '$750K',
      avgRent: '$3,100',
      searches: '3K/mo',
      dscr: '1.22'
    },
    {
      name: 'Long Beach',
      slug: 'long-beach-dscr-loans',
      region: 'Southern California',
      description: 'Coastal living - Belmont Shore to Downtown',
      medianPrice: '$775K',
      avgRent: '$3,000',
      searches: '3K/mo',
      dscr: '1.24'
    },
    {
      name: 'Irvine',
      slug: 'irvine-dscr-loans',
      region: 'Orange County',
      description: 'Master-planned perfection - We\'re based here!',
      medianPrice: '$1.1M',
      avgRent: '$3,800',
      searches: '3K/mo',
      dscr: '1.25'
    },
    {
      name: 'Anaheim',
      slug: 'anaheim-dscr-loans',
      region: 'Orange County',
      description: 'Disney vacation rentals - Resort to Anaheim Hills',
      medianPrice: '$825K',
      avgRent: '$3,300',
      searches: '2.5K/mo',
      dscr: '1.25'
    },
    {
      name: 'Fremont',
      slug: 'fremont-dscr-loans',
      region: 'Bay Area',
      description: 'Tech corridor - Mission San Jose to Warm Springs',
      medianPrice: '$1.1M',
      avgRent: '$3,900',
      searches: '1.5K/mo',
      dscr: '1.25'
    },
    {
      name: 'Berkeley',
      slug: 'berkeley-dscr-loans',
      region: 'Bay Area',
      description: 'UC Berkeley - Student housing to Berkeley Hills',
      medianPrice: '$1.2M',
      avgRent: '$4,200',
      searches: '1.2K/mo',
      dscr: '1.20'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">California</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            California DSCR Loans by City
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance investment properties across California with no tax returns required. 
            From Bay Area tech hubs to Southern California beaches, we fund rental properties statewide.
          </p>
        </div>

        {/* California Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">12</div>
            <div className="text-sm text-gray-400">Major Cities</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">57K+</div>
            <div className="text-sm text-gray-400">Monthly Searches</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.99%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">24-48hr</div>
            <div className="text-sm text-gray-400">Approval Time</div>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Select Your California City</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link 
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="group"
              >
                <div className="bg-dark-900/50 rounded-xl p-6 border border-dark-800 hover:border-primary-500/50 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {city.name}
                    </h3>
                    <span className="text-xs text-primary-400 bg-primary-400/10 px-2 py-1 rounded">
                      {city.searches}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 mb-4">{city.region}</div>
                  <p className="text-gray-300 mb-4 text-sm">
                    {city.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-dark-800">
                    <div>
                      <div className="text-xs text-gray-400">Median Price</div>
                      <div className="text-primary-400 font-semibold">{city.medianPrice}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Avg Rent</div>
                      <div className="text-primary-400 font-semibold">{city.avgRent}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Typical DSCR</div>
                      <div className="text-green-400 font-semibold">{city.dscr}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Rate From</div>
                      <div className="text-primary-400 font-semibold">5.99%</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon Cities */}
        <div className="bg-dark-900/30 rounded-2xl p-8 mb-12 border border-dark-800">
          <h2 className="text-2xl font-semibold text-white mb-6">More California Cities Coming Soon</h2>
          <p className="text-gray-300 mb-6">
            We're expanding coverage to Palo Alto, Sacramento, Santa Ana, Riverside, 
            Huntington Beach, Newport Beach, and 10+ more California cities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-400 mb-6">
            <div>• Palo Alto</div>
            <div>• Sacramento</div>
            <div>• Santa Ana</div>
            <div>• Riverside</div>
            <div>• Huntington Beach</div>
            <div>• Newport Beach</div>
            <div>• Corona</div>
            <div>• Orange</div>
            <div>• Pasadena</div>
            <div>• Santa Monica</div>
            <div>• Torrance</div>
            <div>• Sunnyvale</div>
          </div>
          <p className="text-gray-300 text-sm">
            <strong>Don't see your city?</strong> We finance properties statewide. Contact us to discuss your specific location.
          </p>
        </div>

        {/* Why California */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Why California DSCR Loans?</h2>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">
                  <strong className="text-white">No California Tax Returns:</strong> Perfect for high earners with aggressive tax strategies.
                </p>
                <p className="text-sm">
                  <strong className="text-white">Tech Workers Welcome:</strong> RSUs, stock options, and complex comp structures don't matter.
                </p>
                <p className="text-sm">
                  <strong className="text-white">Handle High Prices:</strong> Loan amounts from $75K to $30M for California's premium markets.
                </p>
                <p className="text-sm">
                  <strong className="text-white">Fast Closings:</strong> 7-14 days to compete in California's hot markets.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">California Market Overview 2025</h2>
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Statewide Median Home:</span>
                    <span className="text-white font-semibold">$785K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Monthly Rent:</span>
                    <span className="text-white font-semibold">$3,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vacancy Rate:</span>
                    <span className="text-white font-semibold">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>YoY Appreciation:</span>
                    <span className="text-white font-semibold">5.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Population:</span>
                    <span className="text-white font-semibold">39M+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-600/20 to-primary-700/20 border-2 border-primary-600/40 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Finance Your California Investment Property
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Based in Orange County, serving all of California. Get pre-approved in 24-48 hours with no tax returns required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-primary text-lg px-8 py-4">
              Apply Now
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

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'California DSCR Loan Locations',
            description: 'DSCR loans available in major California cities',
            itemListElement: cities.map((city, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'FinancialProduct',
                name: `${city.name} DSCR Loans`,
                url: `https://www.capitalbridgesolutions.com/locations/${city.slug}`,
                description: city.description
              }
            }))
          })
        }}
      />
    </div>
  );
}
