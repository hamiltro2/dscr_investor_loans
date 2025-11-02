import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'San Francisco DSCR Loans - Bay Area Investment Properties | 5.99%',
  description: 'San Francisco DSCR loans for rental properties. No tax returns required. Median home: $1.4M, Avg rent: $4,500. Finance SF investment properties fast. Call (949) 339-3555.',
  openGraph: {
    title: 'San Francisco DSCR Loans - Bay Area Investment Financing',
    description: 'Finance San Francisco rental properties with no income verification. Rates from 5.99%, approval in 24-48 hours.',
  },
};

export default function SanFranciscoDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">San Francisco</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">San Francisco, California</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            San Francisco DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance San Francisco investment properties with no tax returns. From SOMA to Sunset District, 
            we fund high-value Bay Area rental properties with rates starting at 5.99%.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$1.4M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$4,500</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.18</div>
            <div className="text-sm text-gray-400">Typical DSCR</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.99%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$75K-$30M</div>
            <div className="text-sm text-gray-400">Loan Range</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why San Francisco Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Perfect for Tech Professionals',
                  description: 'SF tech workers with stock options, RSUs, and complex compensation qualify without explaining non-W-2 income structures.'
                },
                {
                  title: 'Handle SF\'s Premium Prices',
                  description: 'Loan amounts up to $30M. Finance properties from Excelsior District apartments to Pacific Heights mansions.'
                },
                {
                  title: 'No California Tax Return Hassles',
                  description: 'High earners with aggressive tax strategies qualify without sharing sensitive financial documents.'
                },
                {
                  title: 'Multi-Unit Buildings Welcome',
                  description: 'Finance 2-4 unit buildings throughout SF. Popular for Richmond, Sunset, and Mission District multi-families.'
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                  <h3 className="text-xl font-semibold text-primary-400 mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">San Francisco Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Single-Family:</span>
                      <span className="text-white font-semibold">$1.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condo:</span>
                      <span className="text-white font-semibold">$950K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multi-Family (2-4):</span>
                      <span className="text-white font-semibold">$2.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury (Pac Heights):</span>
                      <span className="text-white font-semibold">$5M+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Studio:</span>
                      <span className="text-white font-semibold">$2,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 Bedroom:</span>
                      <span className="text-white font-semibold">$3,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 Bedroom:</span>
                      <span className="text-white font-semibold">$4,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3+ Bedroom:</span>
                      <span className="text-white font-semibold">$6,500</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Avg Cap Rate:</span>
                      <span className="text-white font-semibold">3.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vacancy Rate:</span>
                      <span className="text-white font-semibold">2.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YoY Appreciation:</span>
                      <span className="text-white font-semibold">4.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="text-white font-semibold">880K+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best San Francisco Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Mission District', price: '$1.2M', rent: '$4,200', dscr: '1.15', notes: 'Strong rental demand, diverse tenants' },
                { area: 'Sunset District', price: '$1.3M', rent: '$4,500', dscr: '1.20', notes: 'Family-friendly, stable market' },
                { area: 'Richmond District', price: '$1.25M', rent: '$4,400', dscr: '1.19', notes: 'Near GG Park, excellent schools' },
                { area: 'SOMA', price: '$1.1M', rent: '$4,000', dscr: '1.17', notes: 'Tech professionals, high demand' },
                { area: 'Marina District', price: '$1.8M', rent: '$5,800', dscr: '1.22', notes: 'Premium rents, waterfront' },
                { area: 'Excelsior', price: '$875K', rent: '$3,400', dscr: '1.21', notes: 'Best cash flow in SF' },
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Real San Francisco DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Sunset District, San Francisco</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $1,300,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $325,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $975,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $4,500</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 720</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.49%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $3,755</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.20</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$745/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 28 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Tech Executive, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">
                  Borrower with RSU/stock compensation qualified without complex income documentation. Closed in 9 days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">San Francisco DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I finance rent-controlled properties in San Francisco?',
                  a: 'Yes. We use market rent analysis rather than artificially low rent-controlled amounts. This allows many SF properties to qualify despite rent control.'
                },
                {
                  q: 'Do you finance TICs (Tenancy in Common) in San Francisco?',
                  a: 'Yes! We finance TICs throughout SF. Popular for multi-unit buildings where each unit is separately financed.'
                },
                {
                  q: 'What about properties with ADUs (In-Law units)?',
                  a: 'Absolutely. ADU rental income can be included in DSCR calculation, improving qualification and cash flow.'
                },
                {
                  q: 'Can tech employees with stock options qualify?',
                  a: 'Yes! DSCR loans don\'t require documenting RSUs, stock options, or complex tech compensation. Only property income matters.'
                },
                {
                  q: 'Do you finance properties in all SF neighborhoods?',
                  a: 'Yes, we finance throughout San Francisco including Tenderloin, Bayview, and emerging neighborhoods. No redlining.'
                },
                {
                  q: 'What\'s the maximum loan amount for SF properties?',
                  a: 'Up to $30M. Perfect for high-value SF properties and multi-unit buildings. We specialize in jumbo DSCR loans.'
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/20 to-primary-700/20 border-2 border-primary-600/40 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Finance Your San Francisco Investment Property?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get pre-approved in 24-48 hours. No tax returns required. Loans from $75K to $30M.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">
                  Apply for SF DSCR Loan
                </Link>
                <a
                  href="tel:+19493393555"
                  className="btn-secondary text-lg px-8 py-4"
                 )}
                >
                  Call (949) 339-3555
                </a>
              </div>
            </div>
          </section>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Capital Bridge Solutions - San Francisco DSCR Loans',
            description: 'DSCR loans for San Francisco investment properties. No tax returns required, rates from 5.99%. Loans up to $30M.',
            areaServed: {
              '@type': 'City',
              name: 'San Francisco',
              '@id': 'https://en.wikipedia.org/wiki/San_Francisco'
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Orange County',
              addressRegion: 'CA',
              addressCountry: 'US'
            },
            telephone: '+1-949-339-3555',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 37.7749,
              longitude: -122.4194
            }
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
              name: 'San Francisco'
            },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '5.99',
                priceCurrency: 'USD'
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
                name: 'Can I finance rent-controlled properties in San Francisco?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. We use market rent analysis rather than artificially low rent-controlled amounts. This allows many SF properties to qualify despite rent control.'
                }
              },
              {
                '@type': 'Question',
                name: 'What\'s the maximum loan amount for SF properties?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Up to $30M. Perfect for high-value SF properties and multi-unit buildings. We specialize in jumbo DSCR loans.'
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
                name: 'San Francisco DSCR Loans',
                item: 'https://www.capitalbridgesolutions.com/locations/san-francisco-dscr-loans'
              }
            ]
          })
        }}
      />
    </div>
  );
}
