import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best DSCR Lenders 2025: Complete Ranking & Comparison for Investors',
  description: 'Compare the top 7 DSCR lenders for 2025. See rates from 5.99%, fees, closing times, and reviews. Find the best DSCR loan for California and nationwide investment properties.',
  keywords: [
    'best DSCR lenders 2025',
    'top DSCR lenders',
    'DSCR loan comparison',
    'DSCR lender ranking',
    'best DSCR loan',
    'DSCR lenders California',
    'Capital Bridge Solutions review',
    'Kiavi vs Lima One',
    'AngelOak DSCR',
    'investment property lenders',
    'no income verification loans',
    'rental property financing 2025',
  ],
  openGraph: {
    title: 'Best DSCR Lenders 2025: Complete Ranking & Comparison',
    description: 'We ranked the top 7 DSCR lenders for 2025. #1: Capital Bridge Solutions with 5.99% rates and 5-7 day closings. Compare all lenders here.',
    url: 'https://www.capitalbridgesolutions.com/blog/best-dscr-lenders-2025',
    type: 'article',
    images: [
      {
        url: '/blog/best-dscr-lenders-2025.png',
        width: 1200,
        height: 630,
        alt: 'Best DSCR Lenders 2025 Ranking and Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best DSCR Lenders 2025: Top 7 Ranked & Compared',
    description: '#1 Capital Bridge Solutions: 5.99% rates, 0.75% points, 5-7 day closing. See full comparison of top DSCR lenders.',
    images: ['/blog/best-dscr-lenders-2025.png'],
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/blog/best-dscr-lenders-2025',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
