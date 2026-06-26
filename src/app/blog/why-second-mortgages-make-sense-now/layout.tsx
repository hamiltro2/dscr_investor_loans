import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why a Second Mortgage Makes Perfect Sense in 2026 (Keep Your Low-Rate First Mortgage!)',
  description: 'Have a low interest rate on your first mortgage but need cash? Learn why a second mortgage is the smartest way to tap your home equity without resetting your primary rate.',
  keywords: [
    'second mortgage',
    'keep low rate first mortgage',
    'pull out equity',
    'home equity loan',
    'HELOC vs second mortgage',
    'second lien financing',
    'tap home equity',
    'mortgage rate comparison',
  ],
  openGraph: {
    title: 'Why a Second Mortgage Makes Perfect Sense in 2026',
    description: 'Tap your home equity without giving up your low-rate first mortgage. Compare cash-out refinance vs. a second mortgage.',
    url: 'https://www.capitalbridgesolutions.com/blog/why-second-mortgages-make-sense-now',
    type: 'article',
    images: [
      {
        url: '/blog/why-second-mortgages-make-sense-now.png',
        width: 1200,
        height: 630,
        alt: 'Why a Second Mortgage Makes Perfect Sense',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why a Second Mortgage Makes Perfect Sense',
    description: 'Tap your home equity without giving up your low-rate first mortgage. Compare cash-out refinance vs. a second mortgage.',
    images: ['/blog/why-second-mortgages-make-sense-now.png'],
  },
  alternates: {
    canonical: 'https://www.capitalbridgesolutions.com/blog/why-second-mortgages-make-sense-now',
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
