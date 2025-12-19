import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Capital Bridge Solutions vs Kiavi vs AngelOak: DSCR Loan Comparison 2024',
  description: 'Compare Capital Bridge Solutions, Kiavi, and AngelOak DSCR loans. See rates from 5.5%, save $20K-$50K over 5 years. California DSCR lender comparison with real cost examples.',
  keywords: [
    'Capital Bridge Solutions vs Kiavi',
    'Kiavi vs AngelOak',
    'DSCR loan comparison',
    'best DSCR lenders',
    'California DSCR loans',
    'Kiavi alternative',
    'AngelOak review',
    'DSCR lender rates',
    'investment property financing',
    'DSCR loan California',
  ],
  openGraph: {
    title: 'Capital Bridge Solutions vs Kiavi vs AngelOak: DSCR Loan Comparison 2024',
    description: 'Save $20K-$50K over 5 years. Compare rates (5.5% vs 7.75%), points, and closing times for California DSCR loans.',
    url: 'https://www.capitalbridgesolutions.com/blog/capital-bridge-vs-kiavi-vs-angeloak',
    type: 'article',
    images: [
      {
        url: '/blog/dscr-lender-comparison.png',
        width: 1200,
        height: 630,
        alt: 'Capital Bridge Solutions vs Kiavi vs AngelOak DSCR Loan Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Bridge Solutions vs Kiavi vs AngelOak: DSCR Loan Comparison',
    description: 'Save $20K-$50K over 5 years. Compare rates, points, and closing times for California DSCR loans.',
    images: ['/blog/dscr-lender-comparison.png'],
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/blog/capital-bridge-vs-kiavi-vs-angeloak',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
