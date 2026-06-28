import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'California No-Doc Loans | No-Income Verification Investment Property Loans',
  description: 'California no-doc loans and no-income verification rental property loans. Compare starting rates from 5.5% and 0.75% points vs Angel Oak and Visio Lending. Get pre-approved in 24-48 hours.',
  keywords: 'no doc loans california, no income verification loans ca, California no-doc investment property loans, dscr 2nd mortgage, rental property financing',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
