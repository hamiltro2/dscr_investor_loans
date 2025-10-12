'use client';

import { DollarSign, Star, Calculator, Building2, Target, Shield, CheckCircle } from 'lucide-react';

const requirements = [
  {
    icon: DollarSign,
    title: 'Down Payment',
    requirement: '20-25% minimum',
    details: [
      '20% for DSCR ratios 1.0+',
      '25% for DSCR ratios 0.75-0.99',
      'California\'s appreciation offsets higher down payments',
      'Gift funds accepted from family members'
    ]
  },
  {
    icon: Star,
    title: 'Credit Score',
    requirement: '640 minimum',
    details: [
      '640-679: Higher rates, limited programs',
      '680-719: Good rates, most programs available',
      '720+: Best rates (5.99-6.75%)',
      'Recent late payments OK if explained'
    ]
  },
  {
    icon: Calculator,
    title: 'DSCR Ratio',
    requirement: '0.75+ accepted',
    details: [
      '1.25+: Premium pricing, easiest approval',
      '1.0-1.24: Standard pricing, smooth process',
      '0.75-0.99: Higher rates, larger down payment',
      'California markets often hit 1.2+ naturally'
    ]
  },
  {
    icon: Building2,
    title: 'Property Type',
    requirement: 'Investment only',
    details: [
      'Single-family homes',
      '2-4 unit multi-families',
      'Condos & townhomes (warrantable HOAs)',
      'Short-term rentals (Airbnb/VRBO)'
    ]
  },
  {
    icon: Target,
    title: 'Loan Amount',
    requirement: '$75K - $3M',
    details: [
      'Minimum: $75,000',
      'Maximum: $3,000,000 (purchase/refi)',
      'Cash-out refinance: Up to $2,500,000',
      'Jumbo loans available for high-value CA properties'
    ]
  },
  {
    icon: Shield,
    title: 'Loan-to-Value (LTV)',
    requirement: 'Up to 80%',
    details: [
      'Purchase: 80% LTV max',
      'Rate-term refinance: 80% LTV',
      'Cash-out refinance: 75% LTV',
      'Lower LTV = better rates'
    ]
  }
];

const documentationNeeded = [
  'Government-issued photo ID (driver\'s license or passport)',
  'Purchase contract (for purchases) or property deed (for refinances)',
  'Current lease agreement (if property is leased)',
  'Rent roll or rental history (for multi-family)',
  'HOA documents (for condos/townhomes)',
  'Proof of down payment funds (bank statements)',
  'Property insurance quote or existing policy',
  'LLC operating agreement (if closing in entity)'
];

const notRequired = [
  'Tax returns or 1040s',
  'W-2 forms or pay stubs',
  'Employment verification',
  'Personal income documentation',
  'Debt-to-income (DTI) calculations',
  'Bank statements for income verification'
];

export default function CaliforniaRequirements() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          California DSCR Loan Requirements
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Straightforward qualifications designed for real estate investors
        </p>
      </div>

      {/* Core Requirements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requirements.map((req, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <req.icon className="w-7 h-7 text-primary-400" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{req.title}</h3>
            <div className="text-2xl font-bold text-primary-400 mb-4">{req.requirement}</div>
            
            <ul className="space-y-2">
              {req.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Documentation Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* What You Need */}
        <div className="bg-emerald-500/10 rounded-2xl p-8 border border-emerald-500/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-emerald-400" />
            Documentation Needed
          </h3>
          <ul className="space-y-3">
            {documentationNeeded.map((doc, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What You Don't Need */}
        <div className="bg-blue-500/10 rounded-2xl p-8 border border-blue-500/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🚫</span>
            NOT Required
          </h3>
          <ul className="space-y-3">
            {notRequired.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300 line-through opacity-75">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 font-semibold">
              💡 This is why DSCR loans are perfect for self-employed investors, business owners, and anyone scaling a portfolio!
            </p>
          </div>
        </div>
      </div>

      {/* Qualification Calculator CTA */}
      <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 border border-primary-500/20 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          Do You Qualify for a California DSCR Loan?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Use our calculator below to see your estimated DSCR ratio, monthly cash flow, and loan amount based on California property data.
        </p>
        <button
          onClick={() => {
            const calcSection = document.getElementById('calculator');
            calcSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Your DSCR
        </button>
      </div>
    </div>
  );
}
