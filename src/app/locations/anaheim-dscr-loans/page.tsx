import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Anaheim DSCR Loans - Orange County Disney Area Properties | 5.99%',
  description: 'Anaheim DSCR loans for rental properties. No tax returns required. Median home: $825K, Avg rent: $3,300. Finance Orange County investments fast. Call (949) 339-3555.',
  openGraph: {
    title: 'Anaheim DSCR Loans - Orange County Investment Financing',
    description: 'Finance Anaheim rental properties with no income verification. Rates from 5.99%, approval in 24-48 hours.',
  },
};

export default function AnaheimDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Anaheim</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Anaheim, Orange County, California</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Anaheim DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Anaheim investment properties with no tax returns. From Disneyland Resort to Anaheim Hills, 
            we fund rental properties in Orange County's tourism and residential hub.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$825K</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$3,300</div>
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
            <div className="text-3xl font-bold text-primary-400 mb-1">350K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Anaheim Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Disneyland Vacation Rental Goldmine',
                  description: '19M+ annual Disney visitors create massive short-term rental demand. Properties near resort command premium Airbnb rates year-round.'
                },
                {
                  title: 'Convention Center & Tourism Jobs',
                  description: 'Anaheim Convention Center draws millions annually. Tourism industry employs 40K+ providing stable long-term rental tenant base.'
                },
                {
                  title: 'Orange County Quality of Life',
                  description: 'Excellent schools, parks, beaches nearby. Families and professionals seek Anaheim for affordability versus other OC cities.'
                },
                {
                  title: 'We\'re Your OC Neighbors',
                  description: 'Based in Orange County, we know Anaheim intimately. Local expertise with fast service and market knowledge.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Anaheim Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Single-Family:</span><span className="text-white font-semibold">$825K</span></div>
                    <div className="flex justify-between"><span>Condo:</span><span className="text-white font-semibold">$550K</span></div>
                    <div className="flex justify-between"><span>Near Disney:</span><span className="text-white font-semibold">$675K</span></div>
                    <div className="flex justify-between"><span>Anaheim Hills:</span><span className="text-white font-semibold">$1.2M+</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>1 Bedroom:</span><span className="text-white font-semibold">$2,100</span></div>
                    <div className="flex justify-between"><span>2 Bedroom:</span><span className="text-white font-semibold">$2,800</span></div>
                    <div className="flex justify-between"><span>3 Bedroom:</span><span className="text-white font-semibold">$3,600</span></div>
                    <div className="flex justify-between"><span>4+ Bedroom:</span><span className="text-white font-semibold">$4,800</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Avg Cap Rate:</span><span className="text-white font-semibold">4.9%</span></div>
                    <div className="flex justify-between"><span>Vacancy Rate:</span><span className="text-white font-semibold">3.8%</span></div>
                    <div className="flex justify-between"><span>YoY Appreciation:</span><span className="text-white font-semibold">5.7%</span></div>
                    <div className="flex justify-between"><span>Disney Visitors:</span><span className="text-white font-semibold">19M/yr</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Anaheim Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Anaheim Resort District', price: '$675K', rent: '$3,500', dscr: '1.28', notes: 'Near Disney, vacation rentals' },
                { area: 'Anaheim Hills', price: '$1.1M', rent: '$4,200', dscr: '1.26', notes: 'Premium, hills, families' },
                { area: 'West Anaheim', price: '$725K', rent: '$3,100', dscr: '1.24', notes: 'Established, near beaches' },
                { area: 'Platinum Triangle', price: '$620K', rent: '$2,900', dscr: '1.23', notes: 'Angels Stadium, urban growth' },
                { area: 'East Anaheim', price: '$795K', rent: '$3,300', dscr: '1.25', notes: 'Good schools, families' },
                { area: 'Canyon Rim', price: '$875K', rent: '$3,600', dscr: '1.25', notes: 'Parks, trails, outdoors' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real Anaheim DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Near Disneyland Resort, Anaheim</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2-bath vacation rental</div>
                    <div><strong className="text-white">Purchase Price:</strong> $675,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $168,750</div>
                    <div><strong className="text-white">Loan Amount:</strong> $506,250</div>
                    <div><strong className="text-white">Monthly Income (Airbnb):</strong> $3,500</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 695</div>
                    <div><strong className="text-white">Interest Rate:</strong> 7.49%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $2,735</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.28</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$765/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 28 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Vacation Rental Investor, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">Qualified using AirDNA projected income. Property 1.5 miles from Disneyland. Closed in 9 days.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Anaheim DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                { q: 'Can I finance a vacation rental near Disneyland?', a: 'Yes! Anaheim Resort area is perfect for Airbnb. We use AirDNA data to calculate projected income for DSCR qualification.' },
                { q: 'Do Anaheim vacation rentals cash flow well?', a: 'Excellent! Properties near Disney can earn $200-400/night. Often 2-3x better cash flow than traditional long-term rentals.' },
                { q: 'Are Anaheim Hills properties good investments?', a: 'Yes! Premium area with excellent schools, low crime, families. Strong appreciation and stable long-term tenants.' },
                { q: 'What about properties near Angel Stadium?', a: 'Platinum Triangle is transforming with new developments. Good value play with strong appreciation potential as area develops.' },
                { q: 'Can you close quickly for Anaheim properties?', a: 'Absolutely! Being based in OC, we can close in 5-7 days for urgent deals. Standard is 7-14 days.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Finance Your Anaheim Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Local Orange County lender. Get pre-approved in 24-48 hours. Perfect for Disney vacation rentals.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">Apply for Anaheim DSCR Loan</Link>
                <a href="tel:+19493393555" className="btn-secondary text-lg px-8 py-4")}>Call (949) 339-3555</a>
              </div>
            </div>
          </section>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Capital Bridge Solutions - Anaheim DSCR Loans', description: 'Local OC DSCR lender. Finance Anaheim investment properties including Disney vacation rentals. Rates from 5.99%.', areaServed: { '@type': 'City', name: 'Anaheim', '@id': 'https://en.wikipedia.org/wiki/Anaheim,_California' }, address: { '@type': 'PostalAddress', addressLocality: 'Orange County', addressRegion: 'CA', addressCountry: 'US' }, telephone: '+1-949-339-3555', geo: { '@type': 'GeoCoordinates', latitude: 33.8366, longitude: -117.9143 } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Can I finance a vacation rental near Disneyland?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Anaheim Resort area is perfect for Airbnb. We use AirDNA data to calculate projected income for DSCR qualification.' } }] }) }} />
    </div>
  );
}
