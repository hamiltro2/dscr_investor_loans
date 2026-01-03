import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DSCR Loans in California 2026 | Rates from 5.5% | Capital Bridge Solutions',
  description: 'Compare California DSCR loans for investment properties. No tax returns required. Rates from 5.5%, 20% down, 640+ credit. Finance LA, SF, San Diego, Sacramento rentals.',
  keywords: 'DSCR loans California, California investment property loans, no doc loans California, rental property financing CA, DSCR lenders California, self-employed loans California',
  openGraph: {
    title: 'California DSCR Loans | Finance Your Investment Property',
    description: 'Get DSCR loans for California rental properties. No tax returns. Rates from 5.5%. Serving LA, San Francisco, San Diego, Sacramento.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Capital Bridge Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'California DSCR Loans | Capital Bridge Solutions',
    description: 'Investment property loans for California. No tax returns. Rates from 5.5%.',
  },
  alternates: {
    canonical: 'https://capitalbridgesolutions.com/dscr-loans-california'
  }
}

export default function DSCRLoansCaliforniaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
