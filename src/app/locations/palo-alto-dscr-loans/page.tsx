import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, TrendingUp, Home, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Palo Alto DSCR Loans - Stanford Area Investment Properties | 5.5%',
  description: 'Palo Alto DSCR loans for rental properties near Stanford University. No tax returns required. Median home: $2.8M, Avg rent: $6,500. Silicon Valley birthplace. Call (949) 339-3555.',
  openGraph: {
    title: 'Palo Alto DSCR Loans - Stanford & Silicon Valley Investment Financing',
    description: 'Finance Palo Alto rental properties with no income verification. Birthplace of Silicon Valley. Premium market, premium returns.',
  },
};

export default function PaloAltoDSCRLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      <article className="max-w-6xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-primary-400 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-gray-300">Palo Alto</span>
        </nav>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
            <MapPin className="w-6 h-6" />
            <span className="text-lg font-semibold">Palo Alto, California - Birthplace of Silicon Valley</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Palo Alto DSCR Loans
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Finance Palo Alto investment properties with no tax returns required. From Stanford University to downtown
            University Avenue, we fund rental properties in Silicon Valley's most prestigious city.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$2.8M</div>
            <div className="text-sm text-gray-400">Median Home Price</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">$6,500</div>
            <div className="text-sm text-gray-400">Avg Monthly Rent</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">1.18</div>
            <div className="text-sm text-gray-400">Typical DSCR</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">5.5%</div>
            <div className="text-sm text-gray-400">Starting Rate</div>
          </div>
          <div className="bg-dark-900/50 rounded-xl p-5 text-center border border-primary-600/20">
            <div className="text-3xl font-bold text-primary-400 mb-1">68K+</div>
            <div className="text-sm text-gray-400">Population</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Palo Alto Investors Choose DSCR Loans</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Stanford University Proximity',
                  description: 'Stanford faculty, researchers, PhD students, and visiting scholars create year-round premium rental demand. Academic tenants are stable and low-maintenance.'
                },
                {
                  title: 'Highest Income Demographics in US',
                  description: 'Tech executives, VCs, entrepreneurs command $500K+ incomes. Premium tenants justify premium rents and property appreciation.'
                },
                {
                  title: 'Perfect for High-Net-Worth Investors',
                  description: 'DSCR loans handle complex portfolios, foreign income, and multi-million dollar deals. No income documentation simplifies wealthy investor qualification.'
                },
                {
                  title: 'Silicon Valley Birthplace Prestige',
                  description: 'HP Garage, original tech hub. Owning Palo Alto real estate is owning a piece of technology history with unmatched location value.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Palo Alto Real Estate Market Data 2026</h2>
            <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Property Prices</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Single-Family:</span><span className="text-white font-semibold">$2.8M</span></div>
                    <div className="flex justify-between"><span>Condo:</span><span className="text-white font-semibold">$1.4M</span></div>
                    <div className="flex justify-between"><span>Townhome:</span><span className="text-white font-semibold">$1.8M</span></div>
                    <div className="flex justify-between"><span>Old Palo Alto:</span><span className="text-white font-semibold">$4.5M+</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Rents</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>1 Bedroom:</span><span className="text-white font-semibold">$3,200</span></div>
                    <div className="flex justify-between"><span>2 Bedroom:</span><span className="text-white font-semibold">$4,500</span></div>
                    <div className="flex justify-between"><span>3 Bedroom:</span><span className="text-white font-semibold">$6,800</span></div>
                    <div className="flex justify-between"><span>4+ Bedroom:</span><span className="text-white font-semibold">$9,500</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between"><span>Avg Cap Rate:</span><span className="text-white font-semibold">3.2%</span></div>
                    <div className="flex justify-between"><span>Vacancy Rate:</span><span className="text-white font-semibold">1.8%</span></div>
                    <div className="flex justify-between"><span>YoY Appreciation:</span><span className="text-white font-semibold">7.4%</span></div>
                    <div className="flex justify-between"><span>Median HH Income:</span><span className="text-white font-semibold">$185K</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Best Palo Alto Neighborhoods for DSCR Loans</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { area: 'Old Palo Alto', price: '$4.2M', rent: '$10,000', dscr: '1.19', notes: 'Historic, tree-lined, prestige' },
                { area: 'Professorville', price: '$3.8M', rent: '$9,200', dscr: '1.18', notes: 'Stanford faculty, walkable' },
                { area: 'Crescent Park', price: '$3.5M', rent: '$8,500', dscr: '1.17', notes: 'Family-friendly, top schools' },
                { area: 'Downtown', price: '$1.6M', rent: '$5,200', dscr: '1.20', notes: 'University Ave, condos, urban' },
                { area: 'Midtown', price: '$2.4M', rent: '$6,800', dscr: '1.18', notes: 'Central location, parks' },
                { area: 'Barron Park', price: '$2.6M', rent: '$7,200', dscr: '1.19', notes: 'Near Stanford, families' },
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
            <h2 className="text-3xl font-bold text-white mb-6">Real Palo Alto DSCR Loan Example</h2>
            <div className="bg-gradient-to-br from-primary-600/10 to-primary-700/10 border-2 border-primary-600/30 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Property Details</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Location:</strong> Midtown, Palo Alto</div>
                    <div><strong className="text-white">Property Type:</strong> 4-bed, 3-bath single-family</div>
                    <div><strong className="text-white">Purchase Price:</strong> $2,400,000</div>
                    <div><strong className="text-white">Down Payment (30%):</strong> $720,000</div>
                    <div><strong className="text-white">Loan Amount:</strong> $1,680,000</div>
                    <div><strong className="text-white">Monthly Rent:</strong> $6,800</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Loan Terms</h3>
                  <div className="space-y-3 text-gray-300">
                    <div><strong className="text-white">Credit Score:</strong> 740</div>
                    <div><strong className="text-white">Interest Rate:</strong> 6.25%</div>
                    <div><strong className="text-white">Monthly Payment (PITI):</strong> $5,760</div>
                    <div><strong className="text-white">DSCR:</strong> <span className="text-green-400 font-semibold">1.18</span></div>
                    <div><strong className="text-white">Cash Flow:</strong> +$1,040/month</div>
                    <div><strong className="text-white">Approval Time:</strong> 36 hours</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                <p className="text-green-400 font-semibold mb-2">✓ APPROVED - Venture Capitalist, No Tax Returns Required</p>
                <p className="text-sm text-gray-300">Portfolio investor with complex K-1s qualified using property income only. Closed in 10 days.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Palo Alto DSCR Loan FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I finance a $3-5M Palo Alto property with a DSCR loan?',
                  a: 'Absolutely! We finance properties up to $30M. Palo Alto\'s premium market is perfect for DSCR loans, especially for high-net-worth investors who want to avoid documenting complex income sources.'
                },
                {
                  q: 'Do Stanford faculty and researchers make good tenants?',
                  a: 'Excellent tenants! Stanford affiliates are stable, high-income, respect property, and often stay long-term. Academic calendar creates consistent year-round occupancy.'
                },
                {
                  q: 'How do Palo Alto rents justify the high purchase prices?',
                  a: 'While cap rates are lower (3-3.5%), appreciation averages 7-8% annually. Wealth preservation, prestige, and long-term growth make Palo Alto a strategic hold market.'
                },
                {
                  q: 'Can I qualify if I have venture capital or private equity income?',
                  a: 'Yes! DSCR loans ignore complex K-1s, carried interest, and PE distributions. Only the property\'s rental income matters—perfect for VC partners and PE professionals.'
                },
                {
                  q: 'Are condos near University Avenue good investments?',
                  a: 'Great option! Downtown condos ($1.4-1.8M) offer better cash flow than single-family homes. Popular with young tech professionals and Stanford postdocs.'
                },
                {
                  q: 'Can foreign nationals invest in Palo Alto with DSCR loans?',
                  a: 'Yes! We work with international investors regularly. DSCR loans simplify foreign income documentation. Palo Alto attracts global capital for stability.'
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
            <h2 className="text-3xl font-bold text-white mb-6">Why Palo Alto Is the Ultimate Wealth Preservation Market</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Economic Fundamentals</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>Stanford University:</strong> #2 university globally, $38B endowment</li>
                  <li>• <strong>VC Capital Hub:</strong> Sand Hill Road, $100B+ under management</li>
                  <li>• <strong>Tech Legacy:</strong> HP Garage, Tesla, VMware, Palantir roots</li>
                  <li>• <strong>Limited Supply:</strong> Strict zoning protects appreciation</li>
                </ul>
              </div>
              <div className="bg-dark-900/50 rounded-xl border border-dark-800 p-6">
                <h3 className="text-xl font-semibold text-primary-400 mb-4">Lifestyle Quality</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• <strong>Top Schools:</strong> Top 1% nationally, drives family demand</li>
                  <li>• <strong>University Avenue:</strong> World-class dining, shopping, culture</li>
                  <li>• <strong>Climate:</strong> 300 sunny days, mild year-round</li>
                  <li>• <strong>Safety:</strong> One of America's safest cities</li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary-600/10 to-primary-700/10 border border-primary-600/30 rounded-xl p-6">
              <p className="text-gray-300">
                <strong className="text-white">Investment Philosophy:</strong> Palo Alto represents the intersection of wealth preservation and capital appreciation.
                Lower cap rates (3-3.5%) are offset by 7-8% annual appreciation and institutional-quality tenants.
                Think blue-chip stocks—lower yield but exceptional growth and stability.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-primary-600/20 to-primary-700/20 border-2 border-primary-600/40 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Finance Your Palo Alto Investment Property?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get pre-approved in 24-48 hours for properties up to $30M. Perfect for high-net-worth investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary text-lg px-8 py-4">Apply for Palo Alto DSCR Loan</Link>
                <a href="tel:+19493393555" className="btn-secondary text-lg px-8 py-4">Call (949) 339-3555</a>
              </div>
            </div>
          </section>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Capital Bridge Solutions - Palo Alto DSCR Loans', description: 'Premium DSCR loans for Palo Alto investment properties near Stanford University. Up to $30M.', areaServed: { '@type': 'City', name: 'Palo Alto', '@id': 'https://en.wikipedia.org/wiki/Palo_Alto,_California' }, telephone: '+1-949-339-3555', geo: { '@type': 'GeoCoordinates', latitude: 37.4419, longitude: -122.1430 } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Can I finance a $3-5M Palo Alto property with a DSCR loan?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! We finance properties up to $30M. Palo Alto\'s premium market is perfect for DSCR loans.' } }] }) }} />
    </div>
  );
}
