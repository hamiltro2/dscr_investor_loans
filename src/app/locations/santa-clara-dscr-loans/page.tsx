import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Santa Clara DSCR Loans - Silicon Valley Tech Hub Properties | 5.99%',
  description: 'Santa Clara DSCR loans for rental properties. No tax returns required. Median home: $1.3M, Avg rent: $4,100. Finance Silicon Valley tech corridor investments. Call (949) 339-3555.',
  openGraph: {
    title: 'Santa Clara DSCR Loans - Silicon Valley Investment Financing',
    description: 'Finance Santa Clara rental properties with no income verification. Heart of Silicon Valley. Rates from 5.99%.',
  },
};

export default function SantaClaraDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Santa Clara</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Santa Clara, California - Heart of Silicon Valley</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Santa Clara DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Santa Clara investment properties with no tax returns. From Intel and Nvidia campuses to Santa Clara University, 
            we fund rental properties in Silicon Valley's tech epicenter.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$1.3M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$4,100</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.23</div>
            <div className="text-sm text-gray-400">Typical DSCR</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.99%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">130K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Santa Clara Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Tech Giant Headquarters Hub',
                  description: 'Intel, Nvidia, Applied Materials, ServiceNow HQs. Massive tech employment creates unlimited tenant demand with premium incomes.'
                },
                {
                  title: 'Perfect for Tech Workers with RSUs',
                  description: 'DSCR loans ignore stock compensation complexity. No need to document RSUs, options, or equity packages for qualification.'
                },
                {
                  title: 'Adjacent to San Jose & Sunnyvale',
                  description: 'Central Silicon Valley location. Properties accessible to Google, Apple, Meta campuses within 15-minute commute.'
                },
                {
                  title: 'Levi\'s Stadium & Entertainment',
                  description: '49ers stadium drives short-term rental demand. Game days, concerts, and events create premium Airbnb opportunities.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Santa Clara Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Single-Family:</span><span className="text-white font-semibold">$1.3M</span></div>
                    <div className="flex justify-between"><span>Condo:</span><span className="text-white font-semibold">$750K</span></div>
                    <div className="flex justify-between"><span>Townhome:</span><span className="text-white font-semibold">$950K</span></div>
                    <div className="flex justify-between"><span>Near Campus:</span><span className="text-white font-semibold">$1.5M+</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>1 Bedroom:</span><span className="text-white font-semibold">$2,600</span></div>
                    <div className="flex justify-between"><span>2 Bedroom:</span><span className="text-white font-semibold">$3,400</span></div>
                    <div className="flex justify-between"><span>3 Bedroom:</span><span className="text-white font-semibold">$4,500</span></div>
                    <div className="flex justify-between"><span>4+ Bedroom:</span><span className="text-white font-semibold">$5,800</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Avg Cap Rate:</span><span className="text-white font-semibold">3.9%</span></div>
                    <div className="flex justify-between"><span>Vacancy Rate:</span><span className="text-white font-semibold">2.1%</span></div>
                    <div className="flex justify-between"><span>YoY Appreciation:</span><span className="text-white font-semibold">6.2%</span></div>
                    <div className="flex justify-between"><span>Tech Employment:</span><span className="text-white font-semibold">85K+</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Santa Clara Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Old Quad', price: '$1.5M', rent: '$5,000', dscr: '1.25', notes: 'Historic, near SCU, charming' },
                { area: 'Rivermark', price: '$1.2M', rent: '$4,300', dscr: '1.24', notes: 'Master-planned, modern, families' },
                { area: 'Mission College Area', price: '$1.1M', rent: '$4,000', dscr: '1.23', notes: 'Near tech campuses, condos' },
                { area: 'Central Park', price: '$1.3M', rent: '$4,400', dscr: '1.24', notes: 'Parks, recreation, central' },
                { area: 'Stadium District', price: '$975K', rent: '$3,800', dscr: '1.22', notes: 'Levi\'s Stadium, entertainment' },
                { area: 'North Santa Clara', price: '$1.4M', rent: '$4,600', dscr: '1.25', notes: 'Premium area, tech execs' },
              ].map((area, idx) => (
                <div key={idx} className="bg-dark-900/50 rounded-xl border border-dark-800 p-5">
                  <h3 className="text-lg font-semibold text-primary-400 mb-3">{area.area}</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between"><span>Median Price:</span><span className="text-white font-semibold">{area.price}</span></div>
                    <div className="flex justify-between"><span>Monthly Rent:</span><span className="text-white font-semibold">{area.rent}</span></div>
                    <div className="flex justify-between"><span>Typical DSCR:</span><span className="text-green-400 font-semibold">{area.dscr}</span></div>
                    <p className="text-xs text-gray-400 mt-2">{area.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Real Santa Clara DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Rivermark, Santa Clara</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2.5-bath townhome</div>
                    <div><strong className="text-white">Purchase Price:</strong> $1,200,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $300,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $900,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $4,300</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 710</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.49%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $3,475</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.24</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$825/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 27 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Nvidia Engineer with RSUs, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">Self-employed tech consultant with complex equity comp qualified using property income only. Closed in 8 days.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Santa Clara DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                { 
                  q: 'Can I qualify with RSUs and stock options from Intel or Nvidia?', 
                  a: 'Yes! DSCR loans completely ignore stock compensation. Whether you have RSUs, ISO, NSO, or ESPP, only the property\'s rental income matters for qualification.' 
                },
                { 
                  q: 'Are properties near Levi\'s Stadium good investments?', 
                  a: 'Excellent! Stadium district offers dual opportunity: long-term tech worker rentals or short-term vacation rentals during 49ers games, concerts, and events.' 
                },
                { 
                  q: 'Do you finance condos near tech campuses?', 
                  a: 'Absolutely! Condos near Intel, Nvidia, Applied Materials HQs have incredible tenant demand. Tech workers value walkability to campus.' 
                },
                { 
                  q: 'What about properties near Santa Clara University?', 
                  a: 'Great investment! SCU faculty, staff, and grad students create stable rental demand. Old Quad area has historic charm and premium appeal.' 
                },
                { 
                  q: 'Can you close quickly for competing offers?', 
                  a: 'Yes! Santa Clara\'s competitive market requires speed. We can close in 5-7 days for strong deals with motivated borrowers.' 
                },
                { 
                  q: 'How do Santa Clara properties compare to San Jose?', 
                  a: 'Similar pricing but smaller city feel. Better walkability, less traffic. Same tech employment benefits with more community character.' 
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
            <h2 className="text-3xl font-bold text-white mb-6">Why Santa Clara Is a Top Investment Market</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary-400 mb-4">Employment Powerhouse</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">Intel HQ:</strong> 20K+ employees, world's largest chip maker</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">Nvidia HQ:</strong> AI/GPU leader, massive growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">Applied Materials:</strong> Semiconductor equipment giant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">ServiceNow HQ:</strong> Cloud platform, 10K+ employees</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-400 mb-4">Lifestyle & Location</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">Central Silicon Valley:</strong> 15 min to Google, Apple, Meta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">VTA Light Rail:</strong> Easy public transit to San Jose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">Great America:</strong> Amusement park, entertainment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-400 mt-1">•</span>
                      <span><strong className="text-white">SCU Campus:</strong> Beautiful university, cultural events</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/20 to-primary-700/20 border-2 border-primary-600/40 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Finance Your Santa Clara Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Get pre-approved in 24-48 hours. Perfect for tech professionals with stock compensation. No tax returns required.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">Apply for Santa Clara DSCR Loan</Link>
                <a href="tel:+19493393555" className="btn-secondary text-lg px-8 py-4")}>Call (949) 339-3555</a>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                5-7 day closings available • $75K-$30M loan amounts • Rates from 5.99% • No income verification
              </p>
            </div>
          </section>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
        '@context': 'https://schema.org', 
        '@type': 'LocalBusiness', 
        name: 'Capital Bridge Solutions - Santa Clara DSCR Loans', 
        description: 'DSCR loans for Santa Clara investment properties in Silicon Valley. Perfect for tech workers. Rates from 5.99%.', 
        areaServed: { 
          '@type': 'City', 
          name: 'Santa Clara', 
          '@id': 'https://en.wikipedia.org/wiki/Santa_Clara,_California' 
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
          latitude: 37.3541, 
          longitude: -121.9552 
        },
        priceRange: '$$$',
        openingHours: 'Mo-Fr 09:00-17:00'
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
        '@context': 'https://schema.org', 
        '@type': 'Service',
        serviceType: 'DSCR Loan',
        provider: {
          '@type': 'FinancialService',
          name: 'Capital Bridge Solutions'
        },
        areaServed: {
          '@type': 'City',
          name: 'Santa Clara, California'
        },
        offers: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '5.99',
            priceCurrency: 'USD',
            unitText: 'PERCENT'
          }
        }
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ 
        '@context': 'https://schema.org', 
        '@type': 'FAQPage', 
        mainEntity: [
          { 
            '@type': 'Question', 
            name: 'Can I qualify with RSUs and stock options from Intel or Nvidia?', 
            acceptedAnswer: { 
              '@type': 'Answer', 
              text: 'Yes! DSCR loans completely ignore stock compensation. Whether you have RSUs, ISO, NSO, or ESPP, only the property\'s rental income matters for qualification.' 
            } 
          },
          { 
            '@type': 'Question', 
            name: 'Are properties near Levi\'s Stadium good investments?', 
            acceptedAnswer: { 
              '@type': 'Answer', 
              text: 'Excellent! Stadium district offers dual opportunity: long-term tech worker rentals or short-term vacation rentals during 49ers games, concerts, and events.' 
            } 
          },
          { 
            '@type': 'Question', 
            name: 'Do you finance condos near tech campuses?', 
            acceptedAnswer: { 
              '@type': 'Answer', 
              text: 'Absolutely! Condos near Intel, Nvidia, Applied Materials HQs have incredible tenant demand. Tech workers value walkability to campus.' 
            } 
          }
        ] 
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
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
            name: 'Santa Clara DSCR Loans',
            item: 'https://www.capitalbridgesolutions.com/locations/santa-clara-dscr-loans'
          }
        ]
      }) }} />
    </div>
  );
}
