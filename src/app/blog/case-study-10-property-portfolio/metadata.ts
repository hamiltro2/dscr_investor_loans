import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Study: Building a 10-Property Portfolio with DSCR Loans',
  description: 'Real case study: How one investor scaled from 1 to 10 properties in 2 years using DSCR loans. Portfolio building strategies revealed.',
  keywords: 'DSCR portfolio case study, scaling real estate portfolio, 10 property portfolio, DSCR loan strategy, portfolio building DSCR',
  authors: [{ name: 'Capital Bridge Solutions' }],
  openGraph: {
    title: 'Case Study: 10-Property Portfolio with DSCR Loans',
    description: 'Real investor journey: From 1 to 10 properties in 2 years using DSCR loan strategies.',
    url: 'https://www.capitalbridgesolutions.com/blog/case-study-10-property-portfolio',
    siteName: 'Capital Bridge Solutions',
    images: [{ url: '/Capital_Bridge_solutions_team.png', width: 1200, height: 630, alt: '10-Property Portfolio Case Study' }],
    locale: 'en_US',
    type: 'article',
    publishedTime: '2024-10-04T00:00:00.000Z',
  },
  twitter: { card: 'summary_large_image', title: 'Case Study: 10-Property Portfolio with DSCR', description: 'Learn how one investor built a 10-property portfolio in 2 years using DSCR loans.', images: ['/Capital_Bridge_solutions_team.png'] },
  alternates: { canonical: 'https://www.capitalbridgesolutions.com/blog/case-study-10-property-portfolio' },
};
