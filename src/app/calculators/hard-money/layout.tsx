import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hard Money Loan Calculator - Fix & Flip Financing | Capital Bridge Solutions',
  description: 'Free hard money loan calculator for real estate investors. Calculate loan amounts, monthly payments, and total costs for fix & flip projects. Get funded in days, not months.',
  keywords: 'hard money calculator, fix and flip calculator, bridge loan calculator, short term loan calculator, real estate investment calculator',
  openGraph: {
    title: 'Hard Money Loan Calculator - Quick Funding for Real Estate Investors',
    description: 'Calculate hard money loan amounts and costs instantly. 70% LTV, interest-only payments, fast approval.',
    url: 'https://www.capitalbridgesolutions.com/calculators/hard-money',
    type: 'website',
    images: [
      {
        url: 'https://www.capitalbridgesolutions.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Hard Money Loan Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hard Money Loan Calculator - Capital Bridge Solutions',
    description: 'Free calculator for fix & flip financing. Get loan amounts and costs instantly.',
    images: ['https://www.capitalbridgesolutions.com/logo.png'],
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/calculators/hard-money',
  },
};

export default function HardMoneyCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
