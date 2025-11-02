import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fremont DSCR Loans - East Bay Silicon Valley Properties | 5.99%',
  description: 'Fremont DSCR loans for rental properties. No tax returns required. Median home: $1.1M, Avg rent: $3,900. Finance East Bay tech corridor investments. Call (949) 339-3555.',
  openGraph: {
    title: 'Fremont DSCR Loans - East Bay Investment Financing',
    description: 'Finance Fremont rental properties with no income verification. Rates from 5.99%, approval in 24-48 hours.',
  },
};

export default function FremontDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Fremont</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Fremont, California - East Bay Tech Corridor</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fremont DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Fremont investment properties with no tax returns. From Mission San Jose to Warm Springs, 
            we fund rental properties in the East Bay's tech and innovation hub.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$1.1M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$3,900</div>
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
            <div className="text-3xl font-bold text-primary-400 mb-1">230K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Fremont Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Tesla & Tech Employment Hub',
                  description: 'Tesla factory, Lam Research, and major tech employers. Stable, high-income tenant base with long-term employment.'
                },
                {
                  title: 'Top-Rated School Districts',
                  description: 'Mission San Jose High and Irvington High rank nationally. Strong family demand drives stable, long-term tenancies.'
                },
                {
                  title: 'Excellent DSCR Ratios',
                  description: 'High rents relative to purchase prices. Fremont offers better cash flow than SF/SJ while maintaining appreciation.'
                },
                {
                  title: 'BART & Infrastructure',
                  description: 'Two BART stations, easy commute to SF and SJ. Warm Springs extension increased accessibility and demand.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Fremont Real Estate Market Data 2025</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Single-Family:</span><span className="text-white font-semibold">$1.1M</span></div>
                    <div className="flex justify-between"><span>Condo:</span><span className="text-white font-semibold">$700K</span></div>
                    <div className="flex justify-between"><span>Townhome:</span><span className="text-white font-semibold">$850K</span></div>
                    <div className="flex justify-between"><span>Premium (Mission SJ):</span><span className="text-white font-semibold">$1.5M+</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>1 Bedroom:</span><span className="text-white font-semibold">$2,500</span></div>
                    <div className="flex justify-between"><span>2 Bedroom:</span><span className="text-white font-semibold">$3,200</span></div>
                    <div className="flex justify-between"><span>3 Bedroom:</span><span className="text-white font-semibold">$4,200</span></div>
                    <div className="flex justify-between"><span>4+ Bedroom:</span><span className="text-white font-semibold">$5,500</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Avg Cap Rate:</span><span className="text-white font-semibold">4.3%</span></div>
                    <div className="flex justify-between"><span>Vacancy Rate:</span><span className="text-white font-semibold">2.4%</span></div>
                    <div className="flex justify-between"><span>YoY Appreciation:</span><span className="text-white font-semibold">5.9%</span></div>
                    <div className="flex justify-between"><span>School Rating:</span><span className="text-white font-semibold">9-10/10</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Fremont Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Mission San Jose', price: '$1.3M', rent: '$4,500', dscr: '1.27', notes: 'Top schools, families, premium' },
                { area: 'Warm Springs', price: '$1.1M', rent: '$4,000', dscr: '1.25', notes: 'New BART station, growth area' },
                { area: 'Irvington', price: '$1.0M', rent: '$3,800', dscr: '1.24', notes: 'Good schools, established' },
                { area: 'Niles District', price: '$950K', rent: '$3,600', dscr: '1.23', notes: 'Historic, walkable, charm' },
                { area: 'Ardenwood', price: '$1.2M', rent: '$4,200', dscr: '1.26', notes: 'Near tech campuses' },
                { area: 'Centerville', price: '$875K', rent: '$3,400', dscr: '1.22', notes: 'Best cash flow in Fremont' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real Fremont DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Mission San Jose, Fremont</div>
                    <div><strong className="text-white">Property Type:</strong> 4-bed, 3-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $1,300,000</div>
                    <div><strong className="text-white">Down Payment (25%):</strong> $325,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $975,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $4,500</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 715</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.49%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $3,535</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.27</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$965/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 26 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Tesla Engineer, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">Self-employed tech consultant qualified using property income only. Closed in 9 days.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Fremont DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                { q: 'Are Mission San Jose properties a good investment?', a: 'Excellent! Top schools drive strong family demand. Premium rents justify higher prices. Very stable, long-term tenants.' },
                { q: 'Do you finance near Tesla factory and tech campuses?', a: 'Yes! Properties near Tesla, Lam Research, and Seagate have excellent rental demand from tech workers.' },
                { q: 'Can I qualify if I work in tech with stock compensation?', a: 'Absolutely! DSCR loans don\'t require documenting RSUs or stock options. Only property income matters for qualification.' },
                { q: 'What about properties near Warm Springs BART?', a: 'Great area! New BART station increased accessibility. Strong appreciation and rental demand in Warm Springs district.' },
                { q: 'Are Fremont schools really that important for rentals?', a: 'Yes! Top-rated schools (Mission SJ High is #1 in CA) drive family demand and justify premium rents. Very stable tenancies.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Finance Your Fremont Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Get pre-approved in 24-48 hours. Perfect for tech professionals. No tax returns required.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">Apply for Fremont DSCR Loan</Link>
                <a href="tel:+19493393555" className="btn-secondary text-lg px-8 py-4")}>Call (949) 339-3555</a>
              </div>
            </div>
          </section>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Capital Bridge Solutions - Fremont DSCR Loans', description: 'DSCR loans for Fremont investment properties. No tax returns required, rates from 5.99%.', areaServed: { '@type': 'City', name: 'Fremont', '@id': 'https://en.wikipedia.org/wiki/Fremont,_California' }, address: { '@type': 'PostalAddress', addressLocality: 'Orange County', addressRegion: 'CA', addressCountry: 'US' }, telephone: '+1-949-339-3555', geo: { '@type': 'GeoCoordinates', latitude: 37.5485, longitude: -121.9886 } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Are Mission San Jose properties a good investment?', acceptedAnswer: { '@type': 'Answer', text: 'Excellent! Top schools drive strong family demand. Premium rents justify higher prices. Very stable, long-term tenants.' } }] }) }} />
    </div>
  );
}
