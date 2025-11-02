import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Oakland DSCR Loans - East Bay Investment Properties | 5.99% Rates',
  description: 'Oakland DSCR loans for rental properties. No tax returns required. Median home: $750K, Avg rent: $3,100. Finance East Bay investments fast. Call (949) 339-3555.',
  openGraph: {
    title: 'Oakland DSCR Loans - East Bay Investment Financing',
    description: 'Finance Oakland rental properties with no income verification. Rates from 5.99%, approval in 24-48 hours.',
  },
};

export default function OaklandDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Oakland</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Oakland, California - East Bay</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Oakland DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Oakland investment properties with no tax returns. From Jack London Square to the Oakland Hills, 
            we fund rental properties across the East Bay's most dynamic city.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$750K</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$3,100</div>
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
            <div className="text-3xl font-bold text-primary-400 mb-1">440K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Oakland Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'SF Alternative with Better Cash Flow',
                  description: 'Lower prices than SF but similar rents. Better DSCR ratios and cash flow potential across Oakland neighborhoods.'
                },
                {
                  title: 'Strong Tech & Creative Class Tenants',
                  description: 'Tech workers, artists, and professionals priced out of SF. Stable, diverse tenant base with good income.'
                },
                {
                  title: 'Multi-Family Opportunities',
                  description: 'Oakland\'s 2-4 unit buildings offer excellent investment potential. Popular for house hacking and portfolio building.'
                },
                {
                  title: 'Rapid Appreciation Area',
                  description: 'Benefiting from SF spillover. Strong appreciation trends as Oakland becomes Bay Area\'s next hot market.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Oakland Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Single-Family:</span><span className="text-white font-semibold">$750K</span></div>
                    <div className="flex justify-between"><span>Condo:</span><span className="text-white font-semibold">$500K</span></div>
                    <div className="flex justify-between"><span>Multi-Family (2-4):</span><span className="text-white font-semibold">$1.1M</span></div>
                    <div className="flex justify-between"><span>Hills Premium:</span><span className="text-white font-semibold">$1.5M+</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>1 Bedroom:</span><span className="text-white font-semibold">$2,000</span></div>
                    <div className="flex justify-between"><span>2 Bedroom:</span><span className="text-white font-semibold">$2,800</span></div>
                    <div className="flex justify-between"><span>3 Bedroom:</span><span className="text-white font-semibold">$3,800</span></div>
                    <div className="flex justify-between"><span>4+ Bedroom:</span><span className="text-white font-semibold">$5,200</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Avg Cap Rate:</span><span className="text-white font-semibold">4.8%</span></div>
                    <div className="flex justify-between"><span>Vacancy Rate:</span><span className="text-white font-semibold">3.5%</span></div>
                    <div className="flex justify-between"><span>YoY Appreciation:</span><span className="text-white font-semibold">6.8%</span></div>
                    <div className="flex justify-between"><span>BART Access:</span><span className="text-white font-semibold">12 Stations</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Oakland Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Rockridge', price: '$950K', rent: '$3,800', dscr: '1.24', notes: 'Upscale, near BART, families' },
                { area: 'Temescal', price: '$825K', rent: '$3,400', dscr: '1.23', notes: 'Hip neighborhood, restaurants' },
                { area: 'Grand Lake', price: '$875K', rent: '$3,600', dscr: '1.25', notes: 'Lake Merritt, walkable' },
                { area: 'Jack London Square', price: '$650K', rent: '$2,900', dscr: '1.20', notes: 'Waterfront condos, urban' },
                { area: 'Montclair', price: '$1.1M', rent: '$4,200', dscr: '1.26', notes: 'Hills, views, premium area' },
                { area: 'Fruitvale', price: '$625K', rent: '$2,800', dscr: '1.22', notes: 'Best cash flow, BART access' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real Oakland DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Temescal, Oakland</div>
                    <div><strong className="text-white">Property Type:</strong> 2-unit duplex</div>
                    <div><strong className="text-white">Purchase Price:</strong> $850,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $212,500</div>
                    <div><strong className="text-white">Loan Amount:</strong> $637,500</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $3,400 (both units)</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 685</div>
                    <div><strong className="text-white">Interest Rate:</strong> 7.25%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $2,780</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.22</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$620/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 34 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Artist/Creative, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">Self-employed creative qualified using property income only. Closed in 10 days.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Oakland DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                { q: 'Is Oakland a good market for rental properties?', a: 'Yes! Strong rental demand, good appreciation, and better cash flow than SF. Oakland benefits from Bay Area job growth.' },
                { q: 'Do you finance properties near BART stations?', a: 'Absolutely! BART-accessible properties have excellent rental demand. Popular with tenants commuting to SF for work.' },
                { q: 'Can I finance a duplex or triplex in Oakland?', a: 'Yes! We finance 2-4 unit properties. Perfect for house hacking or pure investment. Strong demand for multi-family in Oakland.' },
                { q: 'What about Oakland rent control laws?', a: 'We use market rent analysis rather than controlled rents for DSCR calculation, allowing many rent-controlled properties to qualify.' },
                { q: 'Are Oakland Hills properties eligible?', a: 'Yes! We finance throughout Oakland including Hills properties. Premium areas like Montclair and Rockridge welcome.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Finance Your Oakland Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Get pre-approved in 24-48 hours. No tax returns required. Rates starting at 5.99%.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">Apply for Oakland DSCR Loan</Link>
                <a href="tel:+19493393555" className="btn-secondary text-lg px-8 py-4">Call (949) 339-3555</a>
              </div>
            </div>
          </section>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Capital Bridge Solutions - Oakland DSCR Loans', description: 'DSCR loans for Oakland investment properties. No tax returns required, rates from 5.99%.', areaServed: { '@type': 'City', name: 'Oakland', '@id': 'https://en.wikipedia.org/wiki/Oakland,_California' }, address: { '@type': 'PostalAddress', addressLocality: 'Orange County', addressRegion: 'CA', addressCountry: 'US' }, telephone: '+1-949-339-3555', geo: { '@type': 'GeoCoordinates', latitude: 37.8044, longitude: -122.2712 } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Is Oakland a good market for rental properties?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Strong rental demand, good appreciation, and better cash flow than SF. Oakland benefits from Bay Area job growth.' } }] }) }} />
    </div>
  );
}
