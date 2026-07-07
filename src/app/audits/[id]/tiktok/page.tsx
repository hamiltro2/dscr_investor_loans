import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { 
  TrendingUp, 
  MapPin, 
  ShieldCheck,
  DollarSign,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface LeadData {
  id: string;
  type: string;
  name: string;
  handle: string;
  address: string;
  market: string;
  is_ca: boolean;
  purchase_price: number;
  estimated_rent: number;
}

async function getLead(id: string): Promise<LeadData | null> {
  const leadsPath = path.join(process.cwd(), 'config', 'leads.json');
  if (!fs.existsSync(leadsPath)) return null;
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  return leads.find((l: any) => l.id === id) || null;
}

export default async function TikTokGraphicPage({ params }: { params: { id: string } }) {
  const lead = await getLead(params.id);
  if (!lead) return notFound();

  // Math (Match the main audit logic)
  const price = lead.purchase_price;
  const rent = lead.estimated_rent;
  const TAX_RATE = lead.is_ca ? 0.0125 : 0.011;
  const INS_RATE = lead.is_ca ? 0.002 : 0.0015;
  const loanAmount = price * 0.8;
  const interestRate = 0.0599;
  const monthlyRate = interestRate / 12;
  const termMonths = 360;
  const pi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  const monthlyTaxes = (price * TAX_RATE) / 12;
  const monthlyInsurance = (price * INS_RATE) / 12;
  const pitia = pi + monthlyTaxes + monthlyInsurance;
  const dscr = rent / pitia;
  const netCashFlow = rent - pitia;

  return (
    <div className="w-[1080px] h-[1920px] bg-dark-950 text-white flex flex-col p-16 relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]" />

      {/* Header / Logo Section */}
      <div className="flex flex-col items-center mt-20 mb-32">
        <div className="bg-primary-600 p-6 rounded-3xl mb-8 shadow-2xl shadow-primary-500/20">
          <Building2 className="w-20 h-20 text-white" />
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-center leading-none">
          CAPITAL BRIDGE<br/>
          <span className="text-primary-400">SOLUTIONS</span>
        </h1>
      </div>

      {/* Main Analysis Title */}
      <div className="mb-20 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-3 bg-primary-950/50 border border-primary-500/30 rounded-full text-2xl font-bold text-primary-400 uppercase tracking-[0.2em] mb-12">
          <ShieldCheck className="w-8 h-8" />
          <span>Real Estate Audit</span>
        </div>
        <h2 className="text-8xl font-black mb-8 leading-[1.1]">
          Does This Deal<br/>
          <span className="text-emerald-400 italic">Work?</span>
        </h2>
        <div className="flex items-center justify-center gap-4 text-4xl text-gray-400 font-medium bg-dark-900/50 py-6 px-10 rounded-2xl border border-white/5 mx-auto w-fit">
          <MapPin className="w-10 h-10 text-primary-500" />
          <span>{lead.address.split(',')[0]}</span>
        </div>
      </div>

      {/* KPI Section - The Big Numbers */}
      <div className="flex-1 flex flex-col gap-12 justify-center">
        
        {/* DSCR KPI */}
        <div className="bg-dark-900/80 border border-white/10 rounded-[4rem] p-16 flex items-center justify-between shadow-2xl backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-500 uppercase tracking-widest">DSCR Ratio</p>
            <p className="text-9xl font-black text-white">{dscr.toFixed(2)}x</p>
          </div>
          <div className="bg-emerald-500/20 p-10 rounded-full border border-emerald-500/30">
            <TrendingUp className="w-24 h-24 text-emerald-400" />
          </div>
        </div>

        {/* Cash Flow KPI */}
        <div className="bg-dark-900/80 border border-white/10 rounded-[4rem] p-16 flex items-center justify-between shadow-2xl backdrop-blur-sm">
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-500 uppercase tracking-widest">Net Cash Flow</p>
            <p className="text-9xl font-black text-emerald-400">
              +${Math.round(netCashFlow).toLocaleString()}
              <span className="text-4xl text-gray-600 font-bold ml-2">/MO</span>
            </p>
          </div>
          <div className="bg-primary-500/20 p-10 rounded-full border border-primary-500/30">
            <DollarSign className="w-24 h-24 text-primary-400" />
          </div>
        </div>

        {/* Feature List */}
        <div className="grid grid-cols-2 gap-8 px-8">
          <div className="flex items-center gap-5 text-4xl font-bold text-gray-300">
            <CheckCircle2 className="w-10 h-10 text-primary-500" />
            <span>5.99% Rate</span>
          </div>
          <div className="flex items-center gap-5 text-4xl font-bold text-gray-300">
            <CheckCircle2 className="w-10 h-10 text-primary-500" />
            <span>20% Down</span>
          </div>
          <div className="flex items-center gap-5 text-4xl font-bold text-gray-300">
            <CheckCircle2 className="w-10 h-10 text-primary-500" />
            <span>No-Doc Loan</span>
          </div>
          <div className="flex items-center gap-5 text-4xl font-bold text-gray-300">
            <CheckCircle2 className="w-10 h-10 text-primary-500" />
            <span>Quick Closing</span>
          </div>
        </div>

      </div>

      {/* Footer / NMLS Section */}
      <div className="mt-auto mb-20 pt-16 border-t border-white/10 flex flex-col items-center gap-4">
        <p className="text-4xl font-black tracking-widest uppercase">www.capitalbridgesolutions.com</p>
        <p className="text-3xl font-bold text-gray-500 uppercase tracking-[0.3em]">NMLS #211355</p>
      </div>

    </div>
  );
}
