import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'San Jose DSCR Loans - Silicon Valley Investment Properties | 5.99%',
  description: 'San Jose DSCR loans for rental properties. No tax returns required. Median home: $1.2M, Avg rent: $4,000. Finance Silicon Valley investments fast. Call (949) 339-3555.',
  openGraph: {
    title: 'San Jose DSCR Loans - Silicon Valley Investment Financing',
    description: 'Finance San Jose rental properties with no income verification. Rates from 5.99%, approval in 24-48 hours.',
  },
};

export default function SanJoseDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">San Jose</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">San Jose, California - Silicon Valley</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            San Jose DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Silicon Valley investment properties with no tax returns. From Willow Glen to Almaden Valley, 
            we fund rental properties in the heart of tech innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$1.2M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$4,000</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.22</div>
            <div className="text-sm text-gray-400">Typical DSCR</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.99%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1M+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why San Jose Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Ideal for Silicon Valley Tech Workers',
                  description: 'Engineers, product managers, and founders with RSUs, stock options, and startup equity qualify without complex income verification.'
                },
                {
                  title: 'Handle High Silicon Valley Prices',
                  description: 'Loan amounts from $75K to $30M. Finance everything from East San Jose condos to Willow Glen estates.'
                },
                {
                  title: 'Strong Tech Tenant Base',
                  description: 'San Jose tenants work at Apple, Google, Meta, Adobe, Cisco. Stable, high-income renters with low vacancy rates.'
                },
                {
                  title: 'Fast Closings for Hot Market',
                  description: 'Close in 7-14 days. Compete in Silicon Valley\'s competitive market where multiple offers are standard.'
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
            <h2 className="text-3xl font-bold text-white mb-6">San Jose Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Single-Family:</span>
                      <span className="text-white font-semibold">$1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condo:</span>
                      <span className="text-white font-semibold">$750K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multi-Family (2-4):</span>
                      <span className="text-white font-semibold">$1.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury (Almaden):</span>
                      <span className="text-white font-semibold">$3M+</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>1 Bedroom:</span>
                      <span className="text-white font-semibold">$2,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2 Bedroom:</span>
                      <span className="text-white font-semibold">$3,400</span>
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
                      <span className="text-white font-semibold">4.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vacancy Rate:</span>
                      <span className="text-white font-semibold">2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YoY Appreciation:</span>
                      <span className="text-white font-semibold">5.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tech Job Growth:</span>
                      <span className="text-white font-semibold">3.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best San Jose Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Willow Glen', price: '$1.5M', rent: '$4,800', dscr: '1.24', notes: 'Premium area, stable families' },
                { area: 'Almaden Valley', price: '$1.7M', rent: '$5,200', dscr: '1.26', notes: 'Top schools, high demand' },
                { area: 'Evergreen', price: '$1.3M', rent: '$4,200', dscr: '1.22', notes: 'Growing area, tech workers' },
                { area: 'Downtown San Jose', price: '$850K', rent: '$3,400', dscr: '1.20', notes: 'Condos, young professionals' },
                { area: 'Silver Creek', price: '$1.1M', rent: '$3,800', dscr: '1.21', notes: 'Good schools, families' },
                { area: 'Berryessa', price: '$950K', rent: '$3,500', dscr: '1.23', notes: 'Best cash flow potential' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real San Jose DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Evergreen, San Jose</div>
                    <div><strong className="text-white">Property Type:</strong> 4-bed, 3-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $1,300,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $325,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $975,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $4,200</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 710</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.75%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $3,450</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.22</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$750/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 32 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Software Engineer, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">
                  Borrower with stock options and RSUs qualified without documenting tech compensation. Closed in 11 days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">San Jose DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I qualify if most of my income is from stock options and RSUs?',
                  a: 'Yes! DSCR loans don\'t require documenting stock compensation, RSUs, or options. Common for Silicon Valley tech workers.'
                },
                {
                  q: 'Do you finance properties near major tech campuses?',
                  a: 'Absolutely. Properties near Apple, Google, Meta, Adobe, Cisco, and other tech campuses are highly desirable. Strong tenant demand.'
                },
                {
                  q: 'Can I finance a property in San Jose while living out of state?',
                  a: 'Yes! Many Silicon Valley investors live elsewhere. DSCR loans are perfect for out-of-state investors.'
                },
                {
                  q: 'What about condos in downtown San Jose?',
                  a: 'Yes, we finance condos, townhomes, and single-family homes. Popular for downtown units near VTA light rail and SAP Center.'
                },
                {
                  q: 'How do you handle San Jose\'s high property prices?',
                  a: 'Loan amounts up to $30M. We specialize in jumbo DSCR loans for Silicon Valley\'s high-value properties.'
                },
                {
                  q: 'Can startups founders with equity qualify?',
                  a: 'Yes! Founders with illiquid startup equity qualify based solely on property income. No need to document company value.'
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
                Ready to Finance Your San Jose Investment Property?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get pre-approved in 24-48 hours. Perfect for Silicon Valley tech professionals. No tax returns required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">
                  Apply for San Jose DSCR Loan
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
            name: 'Capital Bridge Solutions - San Jose DSCR Loans',
            description: 'DSCR loans for San Jose and Silicon Valley investment properties. No tax returns required, rates from 5.99%.',
            areaServed: {
              '@type': 'City',
              name: 'San Jose',
              '@id': 'https://en.wikipedia.org/wiki/San_Jose,_California'
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
              latitude: 37.3382,
              longitude: -121.8863
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
              name: 'San Jose'
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
                name: 'Can I qualify if most of my income is from stock options and RSUs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! DSCR loans don\'t require documenting stock compensation, RSUs, or options. Common for Silicon Valley tech workers.'
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
                name: 'San Jose DSCR Loans',
                item: 'https://www.capitalbridgesolutions.com/locations/san-jose-dscr-loans'
              }
            ]
          })
        }}
      />
    </div>
  );
}
