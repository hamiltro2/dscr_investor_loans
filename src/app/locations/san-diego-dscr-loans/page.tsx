import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'San Diego DSCR Loans - Investment Property Financing | 5.5% Rates',
  description: 'San Diego DSCR loans for rental properties. No tax returns required. Median home: $875K, Avg rent: $3,200. Finance SD investment properties fast. Call (949) 339-3555.',
  openGraph: {
    title: 'San Diego DSCR Loans - Investment Property Financing',
    description: 'Finance San Diego rental properties with no income verification. Rates from 5.5%, approval in 24-48 hours.',
  },
};

export default function SanDiegoDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">San Diego</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">San Diego, California</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            San Diego DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance San Diego investment properties with no tax returns. From Pacific Beach to East County,
            we fund rental properties across America's Finest City.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$875K</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$3,200</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.23</div>
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why San Diego Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Perfect for Military & Self-Employed',
                  description: 'San Diego\'s large military and biotech community often has non-traditional income. DSCR loans qualify without W-2 complications.'
                },
                {
                  title: 'Finance Vacation Rentals',
                  description: 'Popular for Pacific Beach, Mission Beach, and La Jolla vacation rentals. Use projected Airbnb income for qualification.'
                },
                {
                  title: 'Build Your SD Portfolio',
                  description: 'No 10-property limit. Scale your San Diego rental portfolio without conventional loan restrictions.'
                },
                {
                  title: 'Fast Closings in Competitive Market',
                  description: 'Close in 7-14 days. Win deals in SD\'s tight inventory market where speed wins.'
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
            <h2 className="text-3xl font-bold text-white mb-6">San Diego Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Single-Family:</span>
                      <span className="text-white font-semibold">$875K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condo:</span>
                      <span className="text-white font-semibold">$550K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multi-Family (2-4):</span>
                      <span className="text-white font-semibold">$1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury (La Jolla):</span>
                      <span className="text-white font-semibold">$2.5M+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>1 Bedroom:</span>
                      <span className="text-white font-semibold">$2,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 Bedroom:</span>
                      <span className="text-white font-semibold">$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 Bedroom:</span>
                      <span className="text-white font-semibold">$4,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4+ Bedroom:</span>
                      <span className="text-white font-semibold">$6,000</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Avg Cap Rate:</span>
                      <span className="text-white font-semibold">4.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vacancy Rate:</span>
                      <span className="text-white font-semibold">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YoY Appreciation:</span>
                      <span className="text-white font-semibold">6.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="text-white font-semibold">1.4M+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best San Diego Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Pacific Beach', price: '$925K', rent: '$3,800', dscr: '1.25', notes: 'Strong vacation rental market' },
                { area: 'North Park', price: '$750K', rent: '$3,200', dscr: '1.23', notes: 'Trendy area, high demand' },
                { area: 'Chula Vista', price: '$625K', rent: '$2,800', dscr: '1.20', notes: 'Excellent cash flow' },
                { area: 'La Jolla', price: '$1.9M', rent: '$6,800', dscr: '1.28', notes: 'Premium coastal location' },
                { area: 'Mission Valley', price: '$680K', rent: '$2,900', dscr: '1.21', notes: 'Central location, stable rents' },
                { area: 'Point Loma', price: '$1.1M', rent: '$4,200', dscr: '1.24', notes: 'Military & professionals' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real San Diego DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> North Park, San Diego</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $750,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $187,500</div>
                    <div><strong className="text-white">Loan Amount:</strong> $562,500</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $3,200</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 690</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.99%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $2,605</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.23</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$595/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 30 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Military Veteran, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">
                  Self-employed veteran qualified instantly using property income only. Closed in 10 days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">San Diego DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I use a DSCR loan for a San Diego vacation rental?',
                  a: 'Yes! We use projected Airbnb/VRBO income for qualification. Great for beach properties in Pacific Beach, Mission Beach, and Ocean Beach.'
                },
                {
                  q: 'Do you finance properties near military bases?',
                  a: 'Absolutely! We finance properties near all SD military bases (Miramar, North Island, 32nd Street). Military tenants are very stable.'
                },
                {
                  q: 'What about properties in East County San Diego?',
                  a: 'Yes, we finance throughout San Diego County including El Cajon, Santee, La Mesa, and Lakeside. Often better cash flow in East County.'
                },
                {
                  q: 'Can I finance a condo in downtown San Diego?',
                  a: 'Yes! We finance condos, townhomes, and single-family homes. Minimum loan is $75K.'
                },
                {
                  q: 'How quickly can I close in San Diego\'s competitive market?',
                  a: 'Standard 7-14 days. For hot deals, we can expedite to 5-7 days to help you compete with cash offers.'
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
                Ready to Finance Your San Diego Investment Property?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get pre-approved in 24-48 hours. No tax returns required. Rates starting at 5.5%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">
                  Apply for SD DSCR Loan
                </Link>
                <a
                  href="tel:+19493393555"
                  className="btn-secondary text-lg px-8 py-4"
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
            name: 'Capital Bridge Solutions - San Diego DSCR Loans',
            description: 'DSCR loans for San Diego investment properties. No tax returns required, rates from 5.5%.',
            areaServed: {
              '@type': 'City',
              name: 'San Diego',
              '@id': 'https://en.wikipedia.org/wiki/San_Diego'
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
              latitude: 32.7157,
              longitude: -117.1611
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
              name: 'San Diego'
            },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '5.5',
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
                name: 'Can I use a DSCR loan for a San Diego vacation rental?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! We use projected Airbnb/VRBO income for qualification. Great for beach properties in Pacific Beach, Mission Beach, and Ocean Beach.'
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
                name: 'San Diego DSCR Loans',
                item: 'https://www.capitalbridgesolutions.com/locations/san-diego-dscr-loans'
              }
            ]
          })
        }}
      />
    </div>
  );
}
