import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, DollarSign, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Los Angeles DSCR Loans - Investment Property Financing | 5.5% Rates',
  description: 'Los Angeles DSCR loans for rental properties. No tax returns required. Median home: $950K, Avg rent: $3,400. Finance LA investment properties in 7-14 days. Call (949) 339-3555.',
  openGraph: {
    title: 'Los Angeles DSCR Loans - Investment Property Financing',
    description: 'Finance LA rental properties with no income verification. Rates from 5.5%, approval in 24-48 hours.',
  },
};

export default function LosAngelesDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Los Angeles</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Los Angeles, California</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Los Angeles DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance LA investment properties with no tax returns. From Downtown to Venice Beach,
            we fund rental properties across all Los Angeles neighborhoods.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$950K</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$3,400</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.20</div>
            <div className="text-sm text-gray-400">Typical DSCR</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.5%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">24-48hr</div>
            <div className="text-sm text-gray-400">Approval Time</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          {/* Why LA Investors Choose DSCR */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Los Angeles Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'No California Tax Returns Required',
                  description: 'LA investors with high W-2 income or multiple businesses qualify without sharing tax returns. Perfect for entertainment, tech, and real estate professionals.'
                },
                {
                  title: 'Handle LA\'s High Property Prices',
                  description: 'Loan amounts from $75K to $30M. Finance properties from East LA apartments to Brentwood estates.'
                },
                {
                  title: 'Multi-Property Friendly',
                  description: 'No 10-property limit. Build your LA rental portfolio without hitting conventional loan caps.'
                },
                {
                  title: 'Fast Closings for Competitive Market',
                  description: 'Close in 7-14 days. Win deals in LA\'s competitive market where speed matters.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                  <h3 className="text-xl font-semibold text-primary-400 mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* LA Market Data */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Los Angeles Real Estate Market Data 2026</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Single-Family:</span>
                      <span className="text-white font-semibold">$950K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condo:</span>
                      <span className="text-white font-semibold">$625K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multi-Family (2-4):</span>
                      <span className="text-white font-semibold">$1.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury (West LA):</span>
                      <span className="text-white font-semibold">$2.5M+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>1 Bedroom:</span>
                      <span className="text-white font-semibold">$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 Bedroom:</span>
                      <span className="text-white font-semibold">$3,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 Bedroom:</span>
                      <span className="text-white font-semibold">$4,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4+ Bedroom:</span>
                      <span className="text-white font-semibold">$6,500</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Avg Cap Rate:</span>
                      <span className="text-white font-semibold">4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vacancy Rate:</span>
                      <span className="text-white font-semibold">3.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YoY Appreciation:</span>
                      <span className="text-white font-semibold">5.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="text-white font-semibold">4M+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best LA Neighborhoods */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Los Angeles Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  area: 'Downtown LA (DTLA)',
                  price: '$650K',
                  rent: '$2,800',
                  dscr: '1.15',
                  notes: 'Strong rental demand from young professionals'
                },
                {
                  area: 'Silver Lake',
                  price: '$1.1M',
                  rent: '$4,200',
                  dscr: '1.22',
                  notes: 'Trendy area with stable tenant base'
                },
                {
                  area: 'Koreatown',
                  price: '$725K',
                  rent: '$3,100',
                  dscr: '1.18',
                  notes: 'High demand, excellent cash flow'
                },
                {
                  area: 'Venice',
                  price: '$1.8M',
                  rent: '$6,500',
                  dscr: '1.25',
                  notes: 'Premium rents near beach'
                },
                {
                  area: 'Highland Park',
                  price: '$875K',
                  rent: '$3,600',
                  dscr: '1.20',
                  notes: 'Up-and-coming, strong appreciation'
                },
                {
                  area: 'Culver City',
                  price: '$950K',
                  rent: '$3,900',
                  dscr: '1.21',
                  notes: 'Tech hub, reliable tenants'
                },
              ].map((area, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-primary-400 mb-3">{area.area}</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Median Price:</span>
                      <span className="text-white font-semibold">{area.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Rent:</span>
                      <span className="text-white font-semibold">{area.rent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Typical DSCR:</span>
                      <span className="text-green-400 font-semibold">{area.dscr}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{area.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real LA Deal Example */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Real Los Angeles DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Silver Lake, Los Angeles</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $1,100,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $275,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $825,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $4,200</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 705</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.75%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $3,450</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.22</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$750/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 36 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - No Tax Returns Required</p>
                <p className="text-sm text-gray-300">
                  Self-employed borrower qualified based solely on property income. Closed in 12 days.
                </p>
              </div>
            </div>
          </section>

          {/* LA DSCR Requirements */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">DSCR Loan Requirements for Los Angeles Properties</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/10 border border-green-600/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">✓ What You Need</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✓ 620+ credit score (640+ for best rates)</li>
                  <li>✓ 20-25% down payment</li>
                  <li>✓ LA investment property (not primary residence)</li>
                  <li>✓ DSCR of 1.0+ (rent covers mortgage)</li>
                  <li>✓ Property in LA County</li>
                  <li>✓ Loan amount: $75K - $30M</li>
                </ul>
              </div>
              <div className="bg-red-900/10 border border-red-600/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">✗ What You DON'T Need</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>✗ California tax returns</li>
                  <li>✗ W-2s or pay stubs</li>
                  <li>✗ Employment verification</li>
                  <li>✗ Personal income documentation</li>
                  <li>✗ DTI calculation</li>
                  <li>✗ Proof of other assets</li>
                </ul>
              </div>
            </div>
          </section>

          {/* LA FAQs */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Los Angeles DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I get a DSCR loan for a condo in Downtown LA?',
                  a: 'Yes! We finance condos, townhomes, and single-family homes throughout LA. Minimum loan amount is $75K.'
                },
                {
                  q: 'Do you finance properties in all LA neighborhoods?',
                  a: 'Yes, we finance properties in all LA County neighborhoods including Downtown, West LA, Valley, Beach Cities, and South LA.'
                },
                {
                  q: 'What if my LA property has rent control?',
                  a: 'We can still finance rent-controlled properties. We use market rent analysis to determine DSCR, not artificially low controlled rents.'
                },
                {
                  q: 'Can I use a DSCR loan for an LA Airbnb property?',
                  a: 'Yes! We use projected Airbnb income based on AirDNA data. Works great for properties near beaches, Hollywood, and tourist areas.'
                },
                {
                  q: 'How quickly can I close on an LA property?',
                  a: 'Typical closing is 7-14 days. In competitive LA market situations, we can expedite to 5-7 days with all-cash verification.'
                },
                {
                  q: 'Do I need to live in California to get an LA DSCR loan?',
                  a: 'No! We finance out-of-state investors. Many of our LA property owners live outside California.'
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/20 to-primary-700/20 border-2 border-primary-600/40 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Finance Your Los Angeles Investment Property?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get pre-approved in 24-48 hours. No tax returns required. Rates starting at 5.5%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">
                  Apply for LA DSCR Loan
                </Link>
                <a
                  href="tel:+19493393555"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Call (949) 339-3555
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  <Link href="/calculators/dscr" className="hover:text-primary-400">Calculate DSCR</Link>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <Link href="/faq" className="hover:text-primary-400">View FAQ</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Capital Bridge Solutions - Los Angeles DSCR Loans',
            description: 'DSCR loans for Los Angeles investment properties. No tax returns required, rates from 5.5%.',
            areaServed: {
              '@type': 'City',
              name: 'Los Angeles',
              '@id': 'https://en.wikipedia.org/wiki/Los_Angeles'
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Orange County',
              addressRegion: 'CA',
              addressCountry: 'US'
            },
            telephone: '+1-949-339-3555',
            priceRange: '$$',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 34.0522,
              longitude: -118.2437
            },
            url: 'https://www.capitalbridgesolutions.com/locations/los-angeles-dscr-loans',
            sameAs: [
              'https://www.instagram.com/thecapitalbridgesolutions/',
              'https://www.tiktok.com/@capitalbridgesolutions'
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'DSCR Loan',
            provider: {
              '@type': 'FinancialService',
              name: 'Capital Bridge Solutions'
            },
            areaServed: {
              '@type': 'City',
              name: 'Los Angeles',
              '@id': 'https://en.wikipedia.org/wiki/Los_Angeles'
            },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '5.5',
                priceCurrency: 'USD',
                unitText: 'PERCENT'
              }
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Can I get a DSCR loan for a condo in Downtown LA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! We finance condos, townhomes, and single-family homes throughout LA. Minimum loan amount is $75K.'
                }
              },
              {
                '@type': 'Question',
                name: 'How quickly can I close on an LA property?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Typical closing is 7-14 days. In competitive LA market situations, we can expedite to 5-7 days with all-cash verification.'
                }
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.capitalbridgesolutions.com'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Locations',
                item: 'https://www.capitalbridgesolutions.com/locations'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Los Angeles DSCR Loans',
                item: 'https://www.capitalbridgesolutions.com/locations/los-angeles-dscr-loans'
              }
            ]
          })
        }}
      />
    </div>
  );
}
