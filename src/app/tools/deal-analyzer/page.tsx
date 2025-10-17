import { Metadata } from 'next';
import DealAnalyzer from '@/components/DealAnalyzer';

export const metadata: Metadata = {
  title: 'Investment Property Deal Analyzer | DSCR Calculator | Capital Bridge Solutions',
  description: 'Professional deal analyzer for real estate investors. Calculate DSCR, cash flow, ROI, cap rate, and all key metrics instantly. Free tool from Capital Bridge Solutions.',
  keywords: 'deal analyzer, DSCR calculator, cash flow calculator, ROI calculator, cap rate calculator, real estate investment calculator, property analyzer',
  openGraph: {
    title: 'Investment Property Deal Analyzer | Capital Bridge Solutions',
    description: 'Analyze any investment property deal in seconds. Calculate DSCR, cash flow, and ROI with our professional tool.',
    url: 'https://www.capitalbridgesolutions.com/tools/deal-analyzer',
    type: 'website',
  },
};

export default function DealAnalyzerPage() {
  return <DealAnalyzer />;
}
