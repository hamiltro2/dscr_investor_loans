import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Opportunity Zone Investing: Tax Benefits + DSCR Financing | Capital Bridge Solutions',
  description: 'Defer and eliminate capital gains taxes with Opportunity Zone investments. Complete guide to OZ tax benefits, qualified properties, and DSCR financing strategies.',
  openGraph: {
    title: 'Opportunity Zone Investing Guide | Capital Bridge Solutions',
    description: 'Defer and eliminate capital gains taxes with Opportunity Zone investments.',
    url: 'https://www.capitalbridgesolutions.com/blog/opportunity-zone-investing-guide',
  },
};

export default function Article() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-700">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700">Blog</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">Opportunity Zone Investing</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Opportunity Zone Investing: Defer & Eliminate Capital Gains Taxes While Building Wealth
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime="2025-01-15">January 15, 2025</time>
            <span>•</span>
            <span>11 min read</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Opportunity Zones (OZs) offer one of the most powerful tax incentives in U.S. history: Invest capital gains into designated low-income areas, hold for 10 years, and pay ZERO taxes on appreciation. Combined with DSCR financing, it's a wealth-building superpower.
          </p>

          <h2>What are Opportunity Zones?</h2>
          <p>
            Created by the 2017 Tax Cuts and Jobs Act, Opportunity Zones are economically distressed census tracts designated for revitalization. Investors can defer and potentially eliminate capital gains taxes by investing in these areas through Qualified Opportunity Funds (QOFs).
          </p>

          <h3>The Three Tax Benefits</h3>
          <ul>
            <li><strong>Benefit 1: Tax Deferral</strong> - Defer capital gains taxes until 2026 (or sale of OZ investment)</li>
            <li><strong>Benefit 2: Partial Forgiveness</strong> - 10% of original gain forgiven if held 5+ years (missed deadline)</li>
            <li><strong>Benefit 3: Complete Tax Elimination</strong> - 100% of OZ property gains tax-free if held 10+ years</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
            <p className="font-semibold mb-3">Real Example: $500K Stock Gain → OZ Investment</p>
            <ul className="space-y-2">
              <li><strong>Scenario:</strong> Sold stock with $500K gain (20% cap gains tax = $100K owed)</li>
              <li><strong>Step 1:</strong> Invest $500K into OZ property within 180 days</li>
              <li><strong>Step 2:</strong> Defer $100K tax payment until 2026 (or earlier if sold)</li>
              <li><strong>Step 3:</strong> Hold OZ property 10+ years</li>
              <li><strong>Result:</strong> Property appreciates to $1.2M (+$700K gain)</li>
              <li><strong>Tax Owed:</strong> $100K on original gain (in 2026) + $0 on $700K OZ gain!</li>
              <li><strong>Tax Savings:</strong> $140K (20% of $700K) = FREE</li>
            </ul>
          </div>

          <h2>How to Invest in Opportunity Zones</h2>

          <h3>Method 1: Direct Property Investment (via QOF)</h3>
          <ol>
            <li>Realize capital gain from any source (stocks, crypto, business sale, property)</li>
            <li>Form Qualified Opportunity Fund (QOF) - special LLC or partnership</li>
            <li>Invest gain into QOF within 180 days</li>
            <li>QOF buys property in Opportunity Zone (within 180 days of funding)</li>
            <li>Property must be "substantially improved" (invest equal to purchase price in renovations)</li>
            <li>Hold 10+ years for zero tax on appreciation</li>
          </ol>

          <h3>Method 2: Invest in OZ Fund (Passive)</h3>
          <ol>
            <li>Invest capital gains into existing OZ fund</li>
            <li>Fund manager buys/develops OZ properties</li>
            <li>You receive K-1 distributions</li>
            <li>Completely passive (no management)</li>
            <li>Diversification across multiple properties</li>
          </ol>

          <h2>Substantial Improvement Requirement</h2>
          <p>
            Key Rule: You must invest at least as much in improvements as you paid for the property (excluding land).
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
            <p className="font-semibold mb-3">Example: Substantial Improvement</p>
            <ul className="space-y-1">
              <li>Purchase Price: $400,000 (Land: $100K, Building: $300K)</li>
              <li>Improvement Requirement: $300K minimum (match building value)</li>
              <li>Eligible Improvements: Renovations, additions, systems upgrades</li>
              <li>Timeline: Must be completed within 30 months</li>
              <li>Result: $400K purchase + $300K improvements = $700K total basis</li>
            </ul>
          </div>

          <h2>Best OZ Investment Strategies</h2>

          <h3>Strategy 1: Value-Add Multi-Family</h3>
          <ul>
            <li>Buy distressed 20-50 unit building in OZ</li>
            <li>Renovate units (meets substantial improvement)</li>
            <li>Increase rents to market rate</li>
            <li>Hold 10 years tax-free appreciation</li>
          </ul>

          <h3>Strategy 2: Ground-Up Development</h3>
          <ul>
            <li>Buy land in OZ</li>
            <li>Build new apartments, retail, or mixed-use</li>
            <li>100% of development costs count as improvement</li>
            <li>Highest appreciation potential</li>
          </ul>

          <h3>Strategy 3: Adaptive Reuse</h3>
          <ul>
            <li>Convert old warehouses → loft apartments</li>
            <li>Old retail → co-working space</li>
            <li>Meets improvement requirement through conversion</li>
          </ul>

          <h2>DSCR Financing for Opportunity Zones</h2>

          <h3>Why DSCR Works for OZ Investments</h3>
          <ul>
            <li><strong>Fast Closing:</strong> 180-day deadline to deploy capital</li>
            <li><strong>Renovation Financing:</strong> Can finance improvements</li>
            <li><strong>No Income Docs:</strong> Many OZ investors are high-net-worth with complex returns</li>
            <li><strong>Property-Based:</strong> Distressed properties qualify based on future cash flow</li>
          </ul>

          <h3>Financing Structure for OZ Projects</h3>
          <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
            <p className="font-semibold mb-3">Example Capital Stack:</p>
            <ul className="space-y-1">
              <li><strong>Property:</strong> 30-unit building in OZ</li>
              <li><strong>Purchase:</strong> $2,000,000</li>
              <li><strong>Renovations:</strong> $2,000,000 (meets substantial improvement)</li>
              <li><strong>Total Project:</strong> $4,000,000</li>
            </ul>
            <p className="mt-3 font-semibold">Financing:</p>
            <ul className="space-y-1">
              <li>Capital Gains Invested (Equity): $1,500,000</li>
              <li>DSCR Acquisition Loan (70% LTV): $1,400,000</li>
              <li>Construction/Rehab Financing: $1,100,000</li>
              <li>Total Capital: $4,000,000</li>
            </ul>
          </div>

          <h2>Finding Opportunity Zones</h2>
          <ul>
            <li><strong>Official Map:</strong> opportunityzones.hud.gov</li>
            <li><strong>8,764 designated zones nationwide</strong></li>
            <li><strong>Top OZ Markets:</strong> Phoenix, Austin, Nashville, Denver, Tampa</li>
            <li><strong>Research:</strong> Look for gentrifying neighborhoods adjacent to strong areas</li>
          </ul>

          <h2>OZ vs 1031 Exchange Comparison</h2>
          <table className="w-full my-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Feature</th>
                <th className="p-3 text-left">Opportunity Zone</th>
                <th className="p-3 text-left">1031 Exchange</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-t">Eligible Gains</td>
                <td className="p-3 border-t">ANY capital gain (stocks, crypto, business)</td>
                <td className="p-3 border-t">Real estate only</td>
              </tr>
              <tr>
                <td className="p-3 border-t">Timeline</td>
                <td className="p-3 border-t">180 days to invest</td>
                <td className="p-3 border-t">45/180 days</td>
              </tr>
              <tr>
                <td className="p-3 border-t">Hold Period</td>
                <td className="p-3 border-t">10 years for full benefit</td>
                <td className="p-3 border-t">None (but tax deferred)</td>
              </tr>
              <tr>
                <td className="p-3 border-t">Tax Benefit</td>
                <td className="p-3 border-t">Defer + eliminate future gains</td>
                <td className="p-3 border-t">Defer only</td>
              </tr>
              <tr>
                <td className="p-3 border-t">Location</td>
                <td className="p-3 border-t">Must be in OZ</td>
                <td className="p-3 border-t">Anywhere</td>
              </tr>
            </tbody>
          </table>

          <h2>Common OZ Mistakes</h2>
          <ul>
            <li><strong>Missing 180-Day Deadline:</strong> Calendar it immediately after gain realized</li>
            <li><strong>Not Meeting Substantial Improvement:</strong> Track all renovation costs carefully</li>
            <li><strong>Wrong Entity Type:</strong> Must be proper QOF structure (work with CPA)</li>
            <li><strong>Selling Before 10 Years:</strong> Lose tax-free appreciation benefit</li>
          </ul>

          <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-8 rounded-2xl my-12">
            <h3 className="text-2xl font-bold mb-4">Invest Your Capital Gains Tax-Free</h3>
            <p className="text-lg mb-6">
              Get DSCR financing for Opportunity Zone properties. Fast closings to meet 180-day deadline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 text-center">
                Get OZ Financing
              </Link>
              <a href="tel:+19493393555" className="inline-block bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-400 transition-all duration-200 text-center">
                Call (949) 339-3555
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
