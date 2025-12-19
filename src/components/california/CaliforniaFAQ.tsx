'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is the minimum DSCR ratio required in California?',
    answer: 'While we can work with DSCR ratios as low as 0.75, a ratio of 1.0 or higher will get you the best rates and terms. A 1.25 DSCR is considered excellent and qualifies for premium pricing. California\'s high property values often produce strong DSCR ratios due to competitive rental markets.'
  },
  {
    question: 'How long does it take to close a DSCR loan in California?',
    answer: 'We can close DSCR loans in California in as little as 10-15 business days. The timeline depends on appraisal turnaround (typically 5-7 days in California) and title work. We prioritize California deals and have established relationships with local appraisers and title companies.'
  },
  {
    question: 'Can I get a DSCR loan for an Airbnb or short-term rental in California?',
    answer: 'Yes! California is one of our top markets for short-term rental (STR) DSCR loans. We use a 12-month average of actual rental income for established STRs, or projected income based on AirDNA market reports for new purchases. Palm Springs, San Diego, and Big Bear are particularly strong STR markets.'
  },
  {
    question: 'What down payment is required for a California DSCR loan?',
    answer: 'Minimum down payment is 20-25% depending on the property type and your DSCR ratio. For California properties with strong DSCR ratios (1.25+) and good credit (720+), 20% down is typical. Investment properties in California often appreciate quickly, building equity that can be leveraged for future purchases.'
  },
  {
    question: 'Do I need to show tax returns or W-2s for a California DSCR loan?',
    answer: 'No. DSCR loans qualify you based solely on the property\'s rental income, not your personal income. This is perfect for self-employed California investors, business owners, or anyone who wants to scale their portfolio without income documentation limitations.'
  },
  {
    question: 'What credit score do I need for a California DSCR loan?',
    answer: 'Minimum credit score is 640, but 680+ gets better rates. California investors with 720+ credit scores qualify for the best pricing (typically 5.5-6.75% as of 2025). We work with borrowers across the credit spectrum and can find solutions for most situations.'
  },
  {
    question: 'Can I close a DSCR loan in an LLC in California?',
    answer: 'Yes. Most California investors close in an LLC for liability protection. We can close in single-member LLCs, multi-member LLCs, or personal names. California\'s legal structure makes LLC ownership attractive for rental properties.'
  },
  {
    question: 'What property types qualify for California DSCR loans?',
    answer: 'We finance single-family homes, condos, townhomes, 2-4 unit properties, and even some mixed-use properties in California. Short-term rentals (Airbnb/VRBO) are eligible. Properties must be investment properties (not primary residences). We also finance properties in most California HOAs.'
  },
  {
    question: 'How is rental income calculated for California properties?',
    answer: 'For leased properties, we use the lower of current lease or market rent (we can often use the higher amount). For vacant properties, we use 100% of appraiser\'s market rent. For short-term rentals, we use 12-month actual income average or AirDNA projections. California\'s strong rental market typically supports excellent DSCRs.'
  },
  {
    question: 'Are there prepayment penalties on California DSCR loans?',
    answer: 'Prepayment penalty structures vary by lender. Most offer 0, 1, 2, or 3-year prepayment terms. Longer prepayment periods = better rates. Example: A 3-year prepayment penalty might save you 0.5% on your rate. Many California investors prefer the rate savings and plan to hold long-term anyway.'
  },
  {
    question: 'What are current DSCR loan rates in California?',
    answer: 'As of January 2025, California DSCR loan rates range from 5.5% to 8.25% depending on credit score, DSCR ratio, LTV, and prepayment period. Rates for California properties are competitive with other states. Use our rate calculator for a personalized quote based on your scenario.'
  },
  {
    question: 'How many properties can I finance with DSCR loans in California?',
    answer: 'There\'s no limit! Unlike conventional loans (capped at 10), DSCR loans allow unlimited financed properties. We have California clients with 20, 30, even 50+ properties financed with DSCR loans. This makes them perfect for scaling a California rental portfolio.'
  },
  {
    question: 'Can foreign nationals get DSCR loans in California?',
    answer: 'Yes. Foreign nationals and non-US citizens can qualify for California DSCR loans using an ITIN (Individual Taxpayer Identification Number) or even without one in some cases. California is a popular market for international investors due to strong appreciation and rental demand.'
  },
  {
    question: 'Do California property taxes affect DSCR calculations?',
    answer: 'Yes. DSCR is calculated as: (Monthly Rental Income) ÷ (PITIA). California property taxes (typically 1% + special assessments) are included in the PITIA payment. Despite California\'s Prop 13 tax caps, you should factor in potential reassessment upon purchase when calculating your DSCR.'
  },
  {
    question: 'Can I do a cash-out refinance with a California DSCR loan?',
    answer: 'Yes! Cash-out refinancing is available up to 75% LTV for California DSCR loans. This is popular for pulling equity from appreciated California properties to fund additional purchases. No tax returns required. Great way to leverage California\'s strong appreciation to scale your portfolio.'
  },
  {
    question: 'What makes California unique for DSCR loans?',
    answer: 'California offers: 1) Strong rental markets with high demand, 2) Consistent appreciation (averaging 6-8% annually), 3) Diverse property types (urban, suburban, vacation rentals), 4) Pro-tenant laws that make professional property management essential, 5) High prices that benefit from leverage, and 6) Strong international investor interest.'
  },
  {
    question: 'How does your Chrome extension help California investors?',
    answer: 'Our free Chrome extension works on Zillow, Redfin, and 17+ real estate sites. As you browse California listings, it instantly extracts property data and calculates DSCR, cash flow, and ROI. The AI analysis feature provides market insights specific to the California city/neighborhood. It\'s like having an underwriter built into your browser.'
  },
  {
    question: 'What closing costs should I expect in California?',
    answer: 'California DSCR loan closing costs typically range from 2-4% of the loan amount. This includes: lender fees (~1%), appraisal ($500-800), title/escrow ($1,500-3,000), and recording fees. California transfer taxes vary by county. We provide a detailed fee breakdown upfront - no surprises.'
  }
];

export default function CaliforniaFAQ() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-dark-900/50 rounded-xl border border-dark-800 overflow-hidden hover:border-primary-500/30 transition-all duration-300"
        >
          <button
            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="text-lg font-semibold text-white pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-primary-400 flex-shrink-0 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''
                }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96' : 'max-h-0'
              }`}
          >
            <div className="px-6 pb-5 text-gray-300 leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
