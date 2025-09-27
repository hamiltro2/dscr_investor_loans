import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DSCR Loan Calculator - Calculate Debt Service Coverage Ratio | Capital Bridge Solutions',
  description: 'Free DSCR calculator to determine if your rental property qualifies for a DSCR loan. Calculate debt service coverage ratio instantly with no personal income verification required.',
  keywords: 'DSCR calculator, debt service coverage ratio calculator, rental property calculator, investment property loan calculator, DSCR loan calculator',
  openGraph: {
    title: 'DSCR Loan Calculator - Check Your Property\'s Qualification',
    description: 'Calculate your property\'s DSCR instantly. See if you qualify for investment property financing without income verification.',
    url: 'https://www.capitalbridgesolutions.com/calculators/dscr',
    type: 'website',
    images: [
      {
        url: 'https://www.capitalbridgesolutions.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'DSCR Loan Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSCR Loan Calculator - Capital Bridge Solutions',
    description: 'Free DSCR calculator for real estate investors. Check if your property qualifies.',
    images: ['https://www.capitalbridgesolutions.com/logo.png'],
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/calculators/dscr',
  },
};

export default function DSCRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
