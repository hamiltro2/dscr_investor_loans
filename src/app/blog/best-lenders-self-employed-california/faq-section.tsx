import { CheckCircle } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      q: "Can I get a mortgage with only 1 year of self-employment?",
      a: "Yes, some lenders accept less than 2 years of self-employment if you have strong credit (700+), significant reserves, and were in the same industry before going self-employed. DSCR loans don't require any self-employment history since they qualify based on property income."
    },
    {
      q: "Do I need to provide tax returns?",
      a: "Not necessarily. Bank statement loans, DSCR loans, and asset-based loans don't require tax returns. You can qualify using 12-24 months of bank statements, rental income analysis, or liquid assets instead."
    },
    {
      q: "What credit score do I need as a self-employed borrower?",
      a: "Minimum credit scores range from 580-680 depending on the loan type. Bank statement loans typically require 620-640, DSCR loans need 640-660, and bad credit programs start at 580 with larger down payments."
    },
    {
      q: "How is my income calculated for self-employed mortgages?",
      a: "It depends on the loan type. Bank statement loans use 12-24 months of deposits (minus 25-50% for expenses). DSCR loans use the property's rental income. Asset-based loans deplete your assets over the loan term. Traditional loans average 2 years of tax returns."
    },
    {
      q: "Can I use bank statements instead of tax returns?",
      a: "Yes! Bank statement loans are specifically designed for this. Lenders analyze 12-24 months of personal or business bank statements to calculate your income based on deposits."
    },
    {
      q: "What if I have bad credit and I'm self-employed?",
      a: "Several lenders specialize in bad credit + self-employed combinations. CrossCountry Mortgage accepts scores from 580, though you'll need a larger down payment (20-25%) and will pay higher rates (7%+)."
    },
    {
      q: "How long does approval take for self-employed borrowers?",
      a: "Pre-approval can happen in 24-48 hours. Full approval and closing typically takes 15-30 days for non-QM loans, though some lenders like AD Mortgage can close DSCR loans in 10-14 days."
    },
    {
      q: "Can I buy investment property as a self-employed borrower?",
      a: "Absolutely! DSCR loans are actually easier for investment properties since you qualify based on the property's rental income, not your personal income. No tax returns or income verification required."
    },
    {
      q: "Do I need a larger down payment as a self-employed borrower?",
      a: "Down payments range from 10-25% depending on the loan type and your credit. Bank statement loans can go as low as 10%, while DSCR loans typically require 20-25%. This is comparable to conventional loans."
    },
    {
      q: "What documents do I need for a self-employed mortgage?",
      a: "For bank statement loans: 12-24 months of bank statements, business license, CPA letter. For DSCR loans: lease agreement, property appraisal, insurance. For traditional loans: 2 years tax returns, P&L statements, business license."
    },
    {
      q: "Can I use 1099 income to qualify?",
      a: "Yes! Many lenders offer 1099 loan programs specifically for independent contractors and freelancers. You'll typically need 2 years of 1099s and may need to show consistent or increasing income."
    },
    {
      q: "What about gig economy workers (Uber, DoorDash, etc.)?",
      a: "Gig workers can qualify using bank statement loans or 1099 programs. Lenders will analyze your bank deposits or 1099 income over 12-24 months. Consistency and upward trends help."
    },
    {
      q: "How do lenders verify self-employment income?",
      a: "It depends on the program. Bank statement loans verify deposits. DSCR loans verify rental income via lease and appraisal. Traditional loans verify via tax returns and CPA letters. Some lenders may call clients or verify business licenses."
    },
    {
      q: "Can I refinance as a self-employed borrower?",
      a: "Yes! All the same loan types available for purchases are available for refinances. DSCR loans are particularly popular for refinancing investment properties since they don't require income verification."
    },
    {
      q: "What are the best rates available for self-employed borrowers?",
      a: "Rates currently range from 5.99% to 7.5%+ depending on credit score, down payment, and loan type. DSCR loans offer the best rates (5.99-6.75%), while bad credit programs are higher (7%+). Rates are typically 0.5-1.5% higher than conventional loans."
    }
  ];

  return (
    <div id="faq" className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
              {faq.q}
            </h3>
            <p className="text-gray-300 pl-9">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
