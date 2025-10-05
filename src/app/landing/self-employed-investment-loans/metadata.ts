import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Self-Employed Investment Property Loans | No Tax Returns | DSCR Loans',
  description: 'Investment property loans for self-employed borrowers. No W2s, no tax returns, no income verification. Qualify by rental income. Call (949) 339-3555.',
  keywords: [
    'self employed investment loan',
    'self employed rental property loan',
    'no tax return investment loan',
    'self employed dscr loan',
    'investment loan no income verification',
    'self employed real estate loan',
    'no w2 investment property loan',
    'self employed mortgage alternative'
  ],
  openGraph: {
    title: 'Self-Employed Investment Property Loans | No Tax Returns Required',
    description: 'DSCR loans designed for self-employed investors. No W2s, no tax returns. Qualify by property cash flow. Get approved in 24-48 hours.',
    type: 'website',
    url: 'https://www.capitalbridgesolutions.com/landing/self-employed-investment-loans',
    images: [
      {
        url: '/og-self-employed.jpg',
        width: 1200,
        height: 630,
        alt: 'Self-Employed Investment Loans - Capital Bridge Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Employed Investment Property Loans | No Tax Returns',
    description: 'DSCR loans for self-employed investors. No W2s, no tax returns. Qualify by rental income.',
  },
  robots: {
    index: false, // Don't index landing pages
    follow: true,
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/landing/self-employed-investment-loans',
  },
};
