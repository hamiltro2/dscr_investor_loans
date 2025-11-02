import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Irvine DSCR Loans - Orange County Investment Properties | 5.99%',
  description: 'Irvine DSCR loans for rental properties. No tax returns required. Median home: $1.1M, Avg rent: $3,800. Finance Orange County investments fast. Call (949) 339-3555.',
  openGraph: {
    title: 'Irvine DSCR Loans - Orange County Investment Financing',
    description: 'Finance Irvine rental properties with no income verification. Rates from 5.99%, approval in 24-48 hours.',
  },
};

export default function IrvineDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Irvine</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Irvine, Orange County, California</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Irvine DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Irvine investment properties with no tax returns. From Irvine Spectrum to University Park, 
            we fund rental properties in Orange County's premier master-planned community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$1.1M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$3,800</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.25</div>
            <div className="text-sm text-gray-400">Typical DSCR</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.99%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">310K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Irvine Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'We\'re Based in Orange County',
                  description: 'Local lender serving our own backyard. We understand Irvine\'s neighborhoods, schools, and rental market better than anyone.'
                },
                {
                  title: 'Perfect for Irvine Professionals',
                  description: 'Ideal for medical professionals, business owners, and real estate agents who maximize tax write-offs and prefer no-doc financing.'
                },
                {
                  title: 'Top School Districts Drive Demand',
                  description: 'Irvine Unified School District is nationally ranked. Strong tenant demand from families seeking top education.'
                },
                {
                  title: 'Master-Planned Community Benefits',
                  description: 'HOA-maintained properties, parks, pools. Lower maintenance costs and stable property values make DSCR qualification easier.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Irvine Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Single-Family:</span>
                      <span className="text-white font-semibold">$1.1M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condo:</span>
                      <span className="text-white font-semibold">$700K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Townhome:</span>
                      <span className="text-white font-semibold">$850K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Luxury (Shady Canyon):</span>
                      <span className="text-white font-semibold">$5M+</span>
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
                      <span className="text-white font-semibold">$3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 Bedroom:</span>
                      <span className="text-white font-semibold">$4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4+ Bedroom:</span>
                      <span className="text-white font-semibold">$5,500</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span>Avg Cap Rate:</span>
                      <span className="text-white font-semibold">4.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vacancy Rate:</span>
                      <span className="text-white font-semibold">2.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YoY Appreciation:</span>
                      <span className="text-white font-semibold">5.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>School Rating:</span>
                      <span className="text-white font-semibold">9-10/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Irvine Villages for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Woodbridge', price: '$950K', rent: '$3,600', dscr: '1.24', notes: 'Established, great schools, pools' },
                { area: 'University Park', price: '$1.2M', rent: '$4,200', dscr: '1.26', notes: 'Near UCI, faculty/grad students' },
                { area: 'Northwood', price: '$1.1M', rent: '$3,900', dscr: '1.23', notes: 'Family-friendly, parks' },
                { area: 'Irvine Spectrum', price: '$850K', rent: '$3,400', dscr: '1.25', notes: 'Condos, young professionals' },
                { area: 'Turtle Rock', price: '$1.3M', rent: '$4,500', dscr: '1.25', notes: 'Premium area, executives' },
                { area: 'Orchard Hills', price: '$1.5M', rent: '$5,000', dscr: '1.27', notes: 'Newest village, modern homes' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real Irvine DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Woodbridge, Irvine</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2.5-bath townhome</div>
                    <div><strong className="text-white">Purchase Price:</strong> $950,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $237,500</div>
                    <div><strong className="text-white">Loan Amount:</strong> $712,500</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $3,600</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 695</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.99%</div>
                    <div><strong className="text-white">Monthly Payment (PITI + HOA):</strong> $2,900</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.24</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$700/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 24 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Local Business Owner, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">
                  OC-based business owner qualified without sharing tax returns or business financials. Closed in 8 days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Irvine DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Why should I choose a local Orange County lender?',
                  a: 'We\'re based in OC and know Irvine intimately. We understand village differences, HOA structures, and which properties qualify best. Plus, faster local service.'
                },
                {
                  q: 'Do you finance condos in the Irvine Company buildings?',
                  a: 'Yes! We finance Irvine Company condos throughout the city. Familiar with their HOA structures and approval processes.'
                },
                {
                  q: 'Can I finance a property near UCI campus?',
                  a: 'Absolutely. University Park and Turtle Rock properties near UCI are excellent rentals. Strong demand from grad students and faculty.'
                },
                {
                  q: 'What about newer villages like Great Park Neighborhoods?',
                  a: 'Yes, we finance in all Irvine villages including newest developments. Great Park, Orchard Hills, and Eastwood all qualify.'
                },
                {
                  q: 'How do HOA fees affect DSCR qualification?',
                  a: 'HOA fees are included in debt calculation. Irvine\'s maintained communities often justify higher rents, offsetting HOA costs.'
                },
                {
                  q: 'Can I close quickly for a competitive Irvine offer?',
                  a: 'Yes! Standard 7-14 days. Being local, we can expedite to 5-7 days to help you compete in Irvine\'s hot market.'
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
                Ready to Finance Your Irvine Investment Property?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Local Orange County lender. Get pre-approved in 24-48 hours. No tax returns required. Rates from 5.99%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">
                  Apply for Irvine DSCR Loan
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
            name: 'Capital Bridge Solutions - Irvine DSCR Loans',
            description: 'Local Orange County DSCR lender. Finance Irvine investment properties with no tax returns required, rates from 5.99%.',
            areaServed: {
              '@type': 'City',
              name: 'Irvine',
              '@id': 'https://en.wikipedia.org/wiki/Irvine,_California'
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
              latitude: 33.6846,
              longitude: -117.8265
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
              name: 'Irvine'
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
                name: 'Why should I choose a local Orange County lender?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We\'re based in OC and know Irvine intimately. We understand village differences, HOA structures, and which properties qualify best. Plus, faster local service.'
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
                name: 'Irvine DSCR Loans',
                item: 'https://www.capitalbridgesolutions.com/locations/irvine-dscr-loans'
              }
            ]
          })
        }}
      />
    </div>
  );
}
