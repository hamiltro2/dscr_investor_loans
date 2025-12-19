import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Berkeley DSCR Loans - UC Berkeley Investment Properties | 5.5%',
  description: 'Berkeley DSCR loans for rental properties. No tax returns required. Median home: $1.2M, Avg rent: $4,200. Finance Berkeley investments fast. Call (949) 339-3555.',
  openGraph: {
    title: 'Berkeley DSCR Loans - East Bay University Investment Financing',
    description: 'Finance Berkeley rental properties with no income verification. Rates from 5.5%, approval in 24-48 hours.',
  },
};

export default function BerkeleyDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Berkeley</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Berkeley, California - UC Berkeley</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Berkeley DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Berkeley investment properties with no tax returns. From UC Campus to the Berkeley Hills,
            we fund rental properties in the East Bay's premier university city.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$1.2M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$4,200</div>
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
            <div className="text-3xl font-bold text-primary-400 mb-1">120K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Berkeley Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'UC Berkeley Student Housing Demand',
                  description: '45,000+ students create year-round rental demand. Student housing commands premium rents with reliable annual turnover.'
                },
                {
                  title: 'Faculty & Professional Tenant Base',
                  description: 'UC faculty, researchers, and tech professionals provide stable, high-quality tenants alongside student demand.'
                },
                {
                  title: 'Resilient Market',
                  description: 'University presence insulates Berkeley from economic downturns. Consistent demand regardless of market conditions.'
                },
                {
                  title: 'Premium Location Appeal',
                  description: 'Progressive culture, arts scene, dining, and proximity to SF. Berkeley Hills offer stunning Bay views and luxury market.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Berkeley Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Single-Family:</span><span className="text-white font-semibold">$1.2M</span></div>
                    <div className="flex justify-between"><span>Condo:</span><span className="text-white font-semibold">$700K</span></div>
                    <div className="flex justify-between"><span>Multi-Family (2-4):</span><span className="text-white font-semibold">$1.6M</span></div>
                    <div className="flex justify-between"><span>Hills Premium:</span><span className="text-white font-semibold">$2.5M+</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Studio:</span><span className="text-white font-semibold">$2,200</span></div>
                    <div className="flex justify-between"><span>1 Bedroom:</span><span className="text-white font-semibold">$2,800</span></div>
                    <div className="flex justify-between"><span>2 Bedroom:</span><span className="text-white font-semibold">$3,600</span></div>
                    <div className="flex justify-between"><span>3+ Bedroom:</span><span className="text-white font-semibold">$5,200</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Avg Cap Rate:</span><span className="text-white font-semibold">4.1%</span></div>
                    <div className="flex justify-between"><span>Vacancy Rate:</span><span className="text-white font-semibold">2.8%</span></div>
                    <div className="flex justify-between"><span>YoY Appreciation:</span><span className="text-white font-semibold">5.3%</span></div>
                    <div className="flex justify-between"><span>Student Population:</span><span className="text-white font-semibold">45K+</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Berkeley Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'North Berkeley', price: '$1.4M', rent: '$4,800', dscr: '1.22', notes: 'Family-friendly, near Gourmet Ghetto' },
                { area: 'Elmwood District', price: '$1.3M', rent: '$4,500', dscr: '1.21', notes: 'Charming, walkable, cafes' },
                { area: 'South Berkeley', price: '$950K', rent: '$3,600', dscr: '1.23', notes: 'Student housing, high demand' },
                { area: 'Downtown Berkeley', price: '$750K', rent: '$3,200', dscr: '1.19', notes: 'BART, students, urban' },
                { area: 'Berkeley Hills', price: '$2.0M', rent: '$6,500', dscr: '1.24', notes: 'Views, luxury, executives' },
                { area: 'Claremont', price: '$1.6M', rent: '$5,200', dscr: '1.23', notes: 'Upscale, families, schools' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real Berkeley DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> North Berkeley</div>
                    <div><strong className="text-white">Property Type:</strong> 3-bed, 2-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $1,400,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $350,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $1,050,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $4,800</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 700</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.75%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $3,945</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.22</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$855/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 30 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - UC Professor, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">Self-employed academic consultant qualified using property income only. Closed in 11 days.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Berkeley DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                { q: 'Can I finance student housing near UC Berkeley?', a: 'Yes! Student rental properties are excellent investments. High demand, consistent turnover, premium rents near campus.' },
                { q: 'How does Berkeley rent control affect DSCR loans?', a: 'We use market rent analysis rather than controlled rents for DSCR calculation, allowing rent-controlled properties to qualify.' },
                { q: 'Are multi-family properties near campus good investments?', a: '2-4 unit buildings near UC are highly profitable. Rent by the room to students for maximum cash flow.' },
                { q: 'Do you finance properties in the Berkeley Hills?', a: 'Absolutely! Hills properties offer luxury market with executives and tech professionals. Excellent long-term appreciation.' },
                { q: 'Can I finance a property for faculty/professional tenants?', a: 'Yes! UC faculty and researchers make excellent tenants. Stable income, long-term leases, low maintenance.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Finance Your Berkeley Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Get pre-approved in 24-48 hours. Perfect for student housing and faculty rentals. No tax returns required.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">Apply for Berkeley DSCR Loan</Link>
                <a href="tel:+19493393555" className="btn-secondary text-lg px-8 py-4">Call (949) 339-3555</a>
              </div>
            </div>
          </section>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Capital Bridge Solutions - Berkeley DSCR Loans', description: 'DSCR loans for Berkeley investment properties. No tax returns required, rates from 5.5%.', areaServed: { '@type': 'City', name: 'Berkeley', '@id': 'https://en.wikipedia.org/wiki/Berkeley,_California' }, address: { '@type': 'PostalAddress', addressLocality: 'Orange County', addressRegion: 'CA', addressCountry: 'US' }, telephone: '+1-949-339-3555', geo: { '@type': 'GeoCoordinates', latitude: 37.8715, longitude: -122.2730 } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Can I finance student housing near UC Berkeley?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Student rental properties are excellent investments. High demand, consistent turnover, premium rents near campus.' } }] }) }} />
    </div>
  );
}
