import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DSCR Loans California | No Tax Returns Required | 24-48 Hour Approval',
  description: 'Get approved for DSCR loans in California with no income verification. 620 credit OK, 20% down, qualify by rental income. Call (949) 339-3555 for instant quote.',
  keywords: [
    'dscr loan california',
    'dscr loans',
    'no income verification loan',
    'investment property loan california',
    'rental property financing',
    'no tax return loan',
    'dscr lender california',
    'real estate investor loans'
  ],
  openGraph: {
    title: 'DSCR Loans California | No Tax Returns Required',
    description: 'Get approved in 24-48 hours. No income verification. 620 credit OK. Qualify by rental income alone.',
    type: 'website',
    url: 'https://www.capitalbridgesolutions.com/landing/dscr-loans-california',
    images: [
      {
        url: '/og-dscr-california.jpg',
        width: 1200,
        height: 630,
        alt: 'DSCR Loans California - Capital Bridge Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSCR Loans California | No Tax Returns Required',
    description: 'Get approved in 24-48 hours. No income verification. 620 credit OK.',
  },
  robots: {
    index: false, // Don't index landing pages
    follow: true,
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/landing/dscr-loans-california',
  },
};
