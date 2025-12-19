// Lender comparison data for self-employed borrowers in California

export interface Lender {
  id: number;
  name: string;
  badge?: string;
  badgeColor?: string;
  rating: number;
  ratesFrom: string;
  minCredit: number;
  downPayment: string;
  bestFor: string;
  description: string[];
  pros: string[];
  cons: string[];
  website?: string;
  phone?: string;
  cta: string;
}

export const lenders: Lender[] = [
  {
    id: 1,
    name: "Capital Bridge Solutions",
    badge: "BEST OVERALL",
    badgeColor: "emerald",
    rating: 5.0,
    ratesFrom: "5.5%",
    minCredit: 640,
    downPayment: "20%",
    bestFor: "Investment Properties & DSCR Loans",
    description: [
      "Capital Bridge Solutions specializes in DSCR (Debt Service Coverage Ratio) loans, perfect for self-employed real estate investors in California. No tax returns, W-2s, or pay stubs required—you qualify based on the property's rental income alone.",
      "Their unique advantage is deep California market knowledge, with headquarters in Orange County. They understand CA's high property values and can close loans from $75K to $3M in just 10-15 days. They also offer a free Chrome extension that analyzes properties on Zillow, Redfin, and 17+ sites—showing DSCR ratios and cash flow instantly."
    ],
    pros: [
      "No tax returns or income verification",
      "Rates from 5.5% (best in class)",
      "Close in LLC for liability protection",
      "Unlimited properties (no portfolio cap)",
      "Free Chrome extension tool",
      "California market expertise",
      "10-15 day closings"
    ],
    cons: [
      "Investment properties only (no primary residence)",
      "20% down payment minimum",
      "Focus on rental properties vs owner-occupied"
    ],
    phone: "(949) 339-3555",
    cta: "Get Pre-Qualified"
  },
  {
    id: 2,
    name: "Griffin Funding",
    badge: "BEST BANK STATEMENT",
    badgeColor: "blue",
    rating: 4.5,
    ratesFrom: "6.25%",
    minCredit: 620,
    downPayment: "10-20%",
    bestFor: "Bank Statement Loans & Primary Residences",
    description: [
      "Griffin Funding is a California-based lender specializing in bank statement loans for self-employed borrowers. They analyze 12-24 months of bank deposits to determine your income, making them ideal for business owners whose tax returns don't reflect their true earning power.",
      "They offer both personal and business bank statement programs, and can work with borrowers who have been self-employed for less than 2 years if you have strong credit and reserves. Griffin also offers conventional, FHA, VA, and jumbo loans if you qualify."
    ],
    pros: [
      "Bank statement loans (12-24 months)",
      "Down payments from 10%",
      "Primary residence options",
      "California-based and licensed",
      "Multiple loan types available",
      "Strong customer service"
    ],
    cons: [
      "Higher rates than DSCR loans",
      "Still requires 2 years self-employment (usually)",
      "More documentation than DSCR"
    ],
    website: "https://griffinfunding.com",
    cta: "Visit Griffin Funding"
  },
  {
    id: 3,
    name: "Angel Oak Mortgage Solutions",
    badge: "MOST VARIETY",
    badgeColor: "purple",
    rating: 4.3,
    ratesFrom: "6.50%",
    minCredit: 620,
    downPayment: "15-20%",
    bestFor: "Non-QM Variety & HELOCs",
    description: [
      "Angel Oak offers one of the widest ranges of non-QM loan products for self-employed borrowers. They specialize in bank statement loans, asset-based loans, DSCR loans, P&L loans, and even HELOCs for self-employed homeowners.",
      "Their California presence is strong, and they understand the state's diverse property types and price ranges. Angel Oak is particularly good for borrowers with complex income situations—multiple businesses, seasonal income, or those transitioning between employment types."
    ],
    pros: [
      "Wide variety of non-QM products",
      "HELOCs for self-employed",
      "Asset-based loan options",
      "P&L statement programs",
      "Complex income situations",
      "Strong California presence"
    ],
    cons: [
      "Rates slightly higher than competitors",
      "Can be slower to close",
      "More stringent documentation for some programs"
    ],
    website: "https://angeloakms.com",
    cta: "Learn More"
  },
  {
    id: 4,
    name: "CrossCountry Mortgage",
    badge: "BEST BAD CREDIT",
    badgeColor: "red",
    rating: 4.2,
    ratesFrom: "7.00%",
    minCredit: 580,
    downPayment: "20-25%",
    bestFor: "Bad Credit & Credit Challenges",
    description: [
      "CrossCountry Mortgage stands out for accepting self-employed borrowers with credit scores as low as 580. If you've had credit challenges, late payments, or are rebuilding your credit, they offer solutions when others won't.",
      "They understand that self-employment can lead to income fluctuations that affect credit. With larger down payments (20-25%), they can approve borrowers that traditional lenders reject. They're particularly strong in California's competitive market."
    ],
    pros: [
      "Credit scores from 580",
      "Bad credit specialists",
      "Recent credit events accepted",
      "Flexible underwriting",
      "California experience",
      "Multiple non-QM options"
    ],
    cons: [
      "Higher interest rates (7%+)",
      "Larger down payments required",
      "More expensive overall"
    ],
    website: "https://crosscountrymortgage.com",
    cta: "Check Eligibility"
  },
  {
    id: 5,
    name: "New American Funding",
    badge: "BEST ONLINE",
    badgeColor: "cyan",
    rating: 4.4,
    ratesFrom: "6.75%",
    minCredit: 620,
    downPayment: "15-20%",
    bestFor: "Online Experience & Technology",
    description: [
      "New American Funding offers the best digital experience for self-employed borrowers. Their online platform makes it easy to upload documents, track your application, and communicate with your loan officer 24/7.",
      "Based in California, they understand the local market and offer bank statement loans, asset-based loans, and DSCR products. Their technology streamlines the process while maintaining personalized service."
    ],
    pros: [
      "Excellent online platform",
      "24/7 application tracking",
      "Digital document upload",
      "California-based",
      "Fast pre-approvals",
      "Good customer reviews"
    ],
    cons: [
      "Rates slightly higher than some competitors",
      "Less flexible on credit scores",
      "May require more documentation"
    ],
    website: "https://newamericanfunding.com",
    cta: "Apply Online"
  },
  {
    id: 6,
    name: "Guild Mortgage",
    badge: "LOAN VARIETY",
    badgeColor: "indigo",
    rating: 4.3,
    ratesFrom: "6.50%",
    minCredit: 640,
    downPayment: "10-20%",
    bestFor: "Multiple Loan Options",
    description: [
      "Guild Mortgage offers an extensive menu of loan products for self-employed borrowers, from conventional to non-QM. They can often find a solution even if you don't fit the typical self-employed profile.",
      "With strong California operations, they understand the state's unique lending environment. Guild is particularly good at matching borrowers to the right loan type based on their specific situation."
    ],
    pros: [
      "Wide range of loan types",
      "Conventional and non-QM options",
      "Strong California presence",
      "Experienced loan officers",
      "Competitive rates",
      "Good for complex situations"
    ],
    cons: [
      "Can be slower to close",
      "Underwriting can be strict",
      "May require more documentation"
    ],
    website: "https://guildmortgage.com",
    cta: "Get Started"
  },
  {
    id: 7,
    name: "First National Bank of America (FNBA)",
    badge: "HIGH DTI",
    badgeColor: "orange",
    rating: 4.1,
    ratesFrom: "6.75%",
    minCredit: 620,
    downPayment: "15-25%",
    bestFor: "High Debt-to-Income Ratios",
    description: [
      "FNBA specializes in helping self-employed borrowers with high debt-to-income ratios. If you have significant business debt or personal obligations, they can often approve loans that others can't.",
      "Their non-QM programs are designed for self-employed professionals with complex financial situations. They're particularly strong with bank statement loans and asset-based lending."
    ],
    pros: [
      "High DTI ratios accepted (up to 50%)",
      "Flexible underwriting",
      "Bank statement programs",
      "Asset-based options",
      "Business debt understanding",
      "California licensed"
    ],
    cons: [
      "Higher rates for high DTI",
      "Larger down payments may be required",
      "Slower processing times"
    ],
    website: "https://fnba.com",
    cta: "Learn More"
  },
  {
    id: 8,
    name: "AD Mortgage",
    badge: "FAST CLOSING",
    badgeColor: "green",
    rating: 4.2,
    ratesFrom: "6.50%",
    minCredit: 640,
    downPayment: "20%",
    bestFor: "Quick Closings & Speed",
    description: [
      "AD Mortgage is known for fast closings on non-QM loans. If you need to close quickly on a California property, they can often complete the process in 10-14 days.",
      "They specialize in DSCR loans and bank statement loans for self-employed investors. Their streamlined process and experienced underwriters make them ideal when time is critical."
    ],
    pros: [
      "10-14 day closings possible",
      "Streamlined process",
      "DSCR loan specialists",
      "Experienced underwriters",
      "Good communication",
      "California focus"
    ],
    cons: [
      "Limited loan variety",
      "20% down minimum",
      "May have higher fees for speed"
    ],
    website: "https://admortgage.com",
    cta: "Get Fast Pre-Approval"
  },
  {
    id: 9,
    name: "Visio Lending",
    badge: "INVESTORS",
    badgeColor: "teal",
    rating: 4.3,
    ratesFrom: "6.75%",
    minCredit: 660,
    downPayment: "20-25%",
    bestFor: "Real Estate Investors",
    description: [
      "Visio Lending focuses exclusively on real estate investors, making them ideal for self-employed investors building California portfolios. They offer DSCR loans with no income verification.",
      "They understand investor strategies and can finance unlimited properties. Their expertise in California's investment markets makes them a strong choice for serious investors."
    ],
    pros: [
      "Investor-focused",
      "Unlimited properties",
      "DSCR specialists",
      "No income verification",
      "Portfolio lending",
      "California expertise"
    ],
    cons: [
      "Investment properties only",
      "Higher credit score requirements",
      "20-25% down required"
    ],
    website: "https://visi olending.com",
    cta: "Investor Pre-Approval"
  },
  {
    id: 10,
    name: "Lima One Capital",
    badge: "FIX & FLIP",
    badgeColor: "yellow",
    rating: 4.0,
    ratesFrom: "7.00%",
    minCredit: 660,
    downPayment: "20-25%",
    bestFor: "Fix & Flip Projects",
    description: [
      "Lima One Capital specializes in fix-and-flip financing for self-employed investors. If you're renovating properties in California, they offer both acquisition and renovation financing.",
      "They understand the unique needs of property flippers and offer flexible terms. They can also provide DSCR loans for completed rental properties."
    ],
    pros: [
      "Fix & flip specialists",
      "Renovation financing",
      "Fast approvals",
      "Experienced with investors",
      "California active",
      "Bridge loan options"
    ],
    cons: [
      "Higher rates for fix & flip",
      "Short-term loans (not long-term)",
      "More expensive overall"
    ],
    website: "https://limaone.com",
    cta: "Get Fix & Flip Quote"
  }
];

export const loanTypes = [
  {
    name: "Bank Statement Loans",
    description: "Qualify using 12-24 months of personal or business bank statements instead of tax returns. Lenders calculate your income based on deposits.",
    minCredit: "620-640",
    downPayment: "10-20%",
    bestFor: "Business owners with write-offs that reduce taxable income"
  },
  {
    name: "DSCR Loans",
    description: "Qualify based on the property's rental income, not your personal income. No tax returns, W-2s, or pay stubs required.",
    minCredit: "640-660",
    downPayment: "20-25%",
    bestFor: "Real estate investors, self-employed investors"
  },
  {
    name: "Asset-Based Loans",
    description: "Qualify using liquid assets (stocks, bonds, retirement accounts) instead of income. Assets are 'depleted' over the loan term.",
    minCredit: "660-680",
    downPayment: "20-30%",
    bestFor: "High net worth individuals with significant assets"
  },
  {
    name: "P&L Statement Loans",
    description: "Use CPA-prepared profit & loss statements to document income. Less documentation than traditional loans.",
    minCredit: "640-660",
    downPayment: "15-20%",
    bestFor: "Established businesses with clean financials"
  },
  {
    name: "1099 Loans",
    description: "Qualify using 1099 forms showing contractor/freelance income. Good for gig workers and independent contractors.",
    minCredit: "620-640",
    downPayment: "10-20%",
    bestFor: "Freelancers, contractors, gig economy workers"
  },
  {
    name: "No-Doc Loans",
    description: "Minimal documentation required. Based primarily on credit, down payment, and property value.",
    minCredit: "680-700",
    downPayment: "25-35%",
    bestFor: "Privacy-focused borrowers with strong credit and assets"
  }
];
