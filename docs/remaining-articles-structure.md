# Remaining 10 Articles - Complete Structure

## Status: 5/15 Complete
✅ Texas, Florida, Arizona (with metadata)
✅ Georgia, Nevada (metadata created)

## Next: Create page.tsx for Georgia & Nevada + 10 more articles

### Articles 4-5: Page Files Needed

**Georgia page.tsx** - Focus on Atlanta job growth, affordable market
**Nevada page.tsx** - Focus on Las Vegas STR, Reno growth

### Articles 6-10: Advanced Topics (Need metadata + page.tsx)

**6. Multi-Family DSCR Loans** `/blog/dscr-loans-multi-family`
- Metadata keywords: multi-family DSCR loans, duplex financing, 2-4 unit loans
- Image: /DSCR_loan_Requirements.png
- Focus: Higher income, better DSCR ratios, 2-4 units

**7. DSCR vs Conventional** `/blog/dscr-vs-conventional-loans`
- Metadata keywords: DSCR vs conventional, investment loan comparison
- Image: /DSCR_vs_HardMoney_loans.png
- Focus: Side-by-side comparison, when to use each

**8. DSCR Refinancing** `/blog/dscr-loan-refinancing`
- Metadata keywords: DSCR refinance, cash-out refinance investment property
- Image: /DSCR-Loans-599.png
- Focus: Cash-out refi, rate-and-term, pull equity

**9. Portfolio DSCR Loans** `/blog/portfolio-dscr-loans`
- Metadata keywords: portfolio DSCR loans, multiple property financing
- Image: /DSCR_loan_Requirements.png
- Focus: Scale portfolio, blanket loans, 5-10+ properties

**10. Foreign Investor DSCR** `/blog/dscr-loans-foreign-investors`
- Metadata keywords: foreign investor DSCR, ITIN DSCR loans
- Image: /DSCR_loan_Requirements.png
- Focus: Non-US citizens, ITIN requirements, international buyers

### Articles 11-13: Trending Topics

**11. 2025 Predictions** `/blog/dscr-loan-predictions-2025`
- Metadata keywords: DSCR loans 2025, market forecast, rate predictions
- Image: /DSCR-Loans-599.png
- Focus: Rate forecasts, market trends, what's coming

**12. Tax Benefits** `/blog/dscr-loan-tax-benefits`
- Metadata keywords: DSCR tax deductions, investment property tax benefits
- Image: /No_Tax_Return_Investment_Property_loans.png
- Focus: Deductions, depreciation, 1031 exchanges

**13. Market Downturn** `/blog/dscr-loans-market-downturn`
- Metadata keywords: DSCR loans recession, downturn strategy
- Image: /DSCR_loan_Requirements.png
- Focus: Recession-proof strategies, opportunity in down markets

### Articles 14-15: Case Studies

**14. 620 Credit Success** `/blog/case-study-first-time-investor-620-credit`
- Metadata keywords: DSCR success story, 620 credit case study
- Image: /DSCR_Loans_620_Credit_Score.png
- Focus: Real investor journey, proof 620 works

**15. 10-Property Portfolio** `/blog/case-study-10-property-portfolio`
- Metadata keywords: DSCR portfolio case study, scaling strategy
- Image: /Capital_Bridge_solutions_team.png
- Focus: From 1 to 10 properties in 2 years

## Template Structure for Each

```tsx
'use client';
import Link from 'next/link';
import { [Icons] } from 'lucide-react';
import { BlogImage } from '@/components/BlogImage';
import { ArticleSchema } from '@/components/ArticleSchema';

export default function [Name]Page() {
  return (
    <>
      <ArticleSchema {...props} />
      <article className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
        {/* Hero with breadcrumbs */}
        {/* BlogImage with priority */}
        {/* Content sections */}
        {/* CTA with phone tracking */}
      </article>
    </>
  );
}
```

## Next Steps
1. Create page.tsx for Georgia & Nevada
2. Create metadata + page.tsx for articles 6-15
3. Update /blog/page.tsx with all 25 articles
4. Update sitemap.xml
5. Test all routes
