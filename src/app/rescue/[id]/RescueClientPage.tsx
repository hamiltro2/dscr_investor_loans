'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Phone,
  MessageSquare,
  Printer,
  QrCode,
  FileText,
  Smartphone,
  Sparkles,
  Building2,
  Calendar,
  TrendingDown,
  Layers,
  Mail,
} from 'lucide-react';

interface LienInfo {
  position: string;
  amount: number;
  rate: number;
  rateType: string;
  originatedLender: string;
  currentLender: string;
  recordedDate: string;
  maturityDate: string;
  monthlyPI: number;
  verdict: string;
  verdictColor: string;
  verdictNote: string;
}

interface RescueOption {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  newLoanAmount: number;
  keepsFirstLien: boolean;
  blendedEffectiveRate: number;
  newMonthlyOutOfPocket: number;
  newMonthlyWithoutReserve: number;
  reserveAvailable: boolean;
  reserveMonths: number;
  closingTimeline: string;
  highlights: string[];
}

export interface RescueLead {
  id: string;
  county: string;
  apn: string;
  ownerEntity: string;
  ownerPerson: string;
  ownerSalutation: string;
  ownerRole: string;
  uncoveredEmail: string;
  uncoveredPhone: string;
  propertyAddress: string;
  propertyShort: string;
  mailingAddress: string;
  mailingCityStateZip: string;
  propertyType: string;
  bedsBaths: string;
  sqFt: number;
  lotSqFt: number;
  yearBuilt: number;
  purchaseDate: string;
  purchasePrice: number;
  estimatedValue: number;
  totalDebt: number;
  protectedEquity: number;
  equityPercent: number;
  ltvPercent: number;
  annualTaxes: number;
  taxesDelinquent: boolean;
  taxStatusNote: string;
  headlineBadge: string;
  forensicSummary: string;
  painPointTitle: string;
  currentMonthlyCombinedPI: number;
  firstLien: LienInfo;
  secondLien: LienInfo;
  options: RescueOption[];
  letterDate: string;
  letterSubject: string;
  letterParagraphs: string[];
  letterBullets: string[];
  letterSolutionIntro: string;
  letterSolutions: string[];
  letterClosing: string;
  letterPs: string;
}

interface Props {
  lead: RescueLead;
  allLeads: RescueLead[];
}

export default function RescueClientPage({ lead, allLeads }: Props) {
  const [viewMode, setViewMode] = useState<'deal-room' | 'letter'>('deal-room');
  const [selectedOptionId, setSelectedOptionId] = useState<string>(lead.options[0]?.id || 'option-a');
  const [useInterestReserve, setUseInterestReserve] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: lead.ownerPerson,
    phone: '',
    email: lead.uncoveredEmail.includes('@') ? lead.uncoveredEmail : '',
    notes: `Requesting confidential payoff & term sheet for ${lead.propertyAddress} (APN: ${lead.apn}).`,
  });

  const activeOption = lead.options.find((o) => o.id === selectedOptionId) || lead.options[0];

  const dealRoomUrl = `https://www.capitalbridgesolutions.com/rescue/${lead.id}?scan=1`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=8&color=1d1d1f&bgcolor=ffffff&data=${encodeURIComponent(
    dealRoomUrl
  )}`;

  // Fire silent QR scan telemetry when accessed with ?scan=1
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('scan=1')) {
      fetch('/api/rescue/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          eventType: 'qr_scan',
        }),
      }).catch(() => {});
    }
  }, [lead.id]);

  // Calculate Capital Stack Bar Percentages
  const firstLienPct = Math.max(8, Math.round((lead.firstLien.amount / lead.estimatedValue) * 1000) / 10);
  const secondLienPct = Math.max(6, Math.round((lead.secondLien.amount / lead.estimatedValue) * 1000) / 10);
  const equityPct = Math.max(10, Math.round((100 - firstLienPct - secondLienPct) * 10) / 10);

  const displayedMonthlyPayment = useInterestReserve
    ? activeOption.newMonthlyOutOfPocket
    : activeOption.newMonthlyWithoutReserve;

  const monthlySavings = Math.max(0, lead.currentMonthlyCombinedPI - displayedMonthlyPayment);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'quick-capture',
          data: {
            name: contactForm.name,
            email: contactForm.email,
            phone: contactForm.phone,
            message: `[NOD EQUITY RESCUE DEAL ROOM] Property: ${lead.propertyAddress} | Selected Option: ${activeOption.title} | 12-Mo Reserve: ${
              useInterestReserve ? 'YES' : 'NO'
            } | Notes: ${contactForm.notes}`,
          },
        }),
      });
      await fetch('/api/rescue/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lead.id,
          eventType: 'term_sheet_request',
          selectedOption: activeOption.title,
          reserveActive: useInterestReserve,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintLetter = () => {
    setViewMode('letter');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const smsBody = encodeURIComponent(
    `Hi Ricardo & Erol, I just scanned the QR code for ${lead.propertyShort} and would like to review the ${activeOption.title} numbers.`
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-[#0066CC]/15 selection:text-[#0066CC] pb-24">
      {/* Print Stylesheet for 1-Page Executive Letter */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #1d1d1f !important;
          }
          header,
          footer,
          nav,
          .no-print {
            display: none !important;
          }
          .print-sheet {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @page {
            size: letter;
            margin: 0.45in 0.55in;
          }
        }
      `}</style>

      {/* Top Institutional Navigation & Partner Switcher (Hidden in Print) */}
      <div className="no-print sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#D2D2D7]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0066CC] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              CB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-sm text-[#1D1D1F]">
                  CAPITAL BRIDGE SOLUTIONS
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                  <Lock className="w-3 h-3" /> Private Deal Room
                </span>
              </div>
              <p className="text-xs text-[#515154]">
                Quantitative Debt & Equity Advisory • NMLS #211355 • DRE #02113355
              </p>
            </div>
          </div>

          {/* Partner Sample Switcher + Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Switch between Sample #1 and Sample #2 */}
            <div className="hidden md:flex items-center bg-[#F5F5F7] p-1 rounded-xl border border-[#D2D2D7]">
              {allLeads.map((item, idx) => {
                const active = item.id === lead.id;
                return (
                  <Link
                    key={item.id}
                    href={`/rescue/${item.id}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? 'bg-white text-[#1D1D1F] shadow-sm border border-[#D2D2D7]/60'
                        : 'text-[#515154] hover:text-[#1D1D1F]'
                    }`}
                  >
                    Sample #{idx + 1}: {item.propertyShort.split(',')[0]}
                  </Link>
                );
              })}
            </div>

            {/* Toggle: Mobile Deal Room vs Printable Letter with QR */}
            <div className="flex items-center bg-[#F5F5F7] p-1 rounded-xl border border-[#D2D2D7]">
              <button
                onClick={() => setViewMode('deal-room')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'deal-room'
                    ? 'bg-[#0066CC] text-white shadow-sm'
                    : 'text-[#515154] hover:text-[#1D1D1F]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Interactive Deal Room</span>
              </button>
              <button
                onClick={() => setViewMode('letter')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'letter'
                    ? 'bg-[#0066CC] text-white shadow-sm'
                    : 'text-[#515154] hover:text-[#1D1D1F]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Letter + QR Code</span>
              </button>
            </div>

            <button
              onClick={handlePrintLetter}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D1D1F] hover:bg-[#333336] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Letter PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          VIEW 1: APPLE-CLEAN / MIT-ANALYTICAL INTERACTIVE DEAL ROOM
         ===================================================================== */}
      {viewMode === 'deal-room' && (
        <div className="no-print max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
          {/* Mobile Sample Switcher */}
          <div className="flex md:hidden items-center justify-between bg-white p-2 rounded-2xl border border-[#D2D2D7] shadow-sm">
            <span className="text-xs font-semibold text-[#515154] px-2">Switch Sample Lead:</span>
            <div className="flex gap-1">
              {allLeads.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/rescue/${item.id}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    item.id === lead.id
                      ? 'bg-[#0066CC] text-white'
                      : 'bg-[#F5F5F7] text-[#515154]'
                  }`}
                >
                  #{idx + 1} {item.propertyShort.split(' ')[1]}
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Executive Dossier Card */}
          <div className="bg-white rounded-3xl border border-[#D2D2D7]/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-8 border-b border-[#E5E5EA]">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0F7FF] text-[#0066CC] border border-[#BFDBFE]">
                    {lead.headlineBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F5F7] text-[#515154] border border-[#D2D2D7]">
                    APN: {lead.apn} • {lead.county}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F] leading-tight">
                  {lead.propertyAddress}
                </h1>

                <p className="text-base sm:text-lg text-[#515154] font-medium">
                  Prepared Exclusively for{' '}
                  <span className="text-[#1D1D1F] font-bold">{lead.ownerPerson}</span> (
                  <span className="text-[#0066CC] font-semibold">{lead.ownerEntity}</span>)
                </p>
              </div>

              {/* Right Scannable QR Preview Pill */}
              <div className="flex items-center gap-4 bg-[#F5F5F7] p-4 rounded-2xl border border-[#D2D2D7] self-start">
                <img
                  src={qrImageUrl}
                  alt="Property Deal Room QR Code"
                  className="w-20 h-20 rounded-xl border border-[#D2D2D7] bg-white p-1"
                />
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#0066CC]">
                    <QrCode className="w-3.5 h-3.5" /> Personalized QR Active
                  </div>
                  <p className="text-xs font-semibold text-[#1D1D1F] max-w-[190px]">
                    Scanning the letter QR opens this live property model & alerts your Telegram.
                  </p>
                  <button
                    onClick={() => setViewMode('letter')}
                    className="text-xs font-bold text-[#0066CC] hover:underline inline-flex items-center gap-1"
                  >
                    View Printed Letter with QR <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Key Institutional Metrics (Tabular Precision) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">
              <div className="bg-[#F5F5F7]/70 rounded-2xl p-5 border border-[#E5E5EA]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#86868B] mb-1">
                  Estimated Asset Value
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tabular-nums">
                  ${lead.estimatedValue.toLocaleString()}
                </p>
                <p className="text-xs text-[#515154] mt-1 font-medium">{lead.propertyType}</p>
              </div>

              <div className="bg-[#ECFDF5] rounded-2xl p-5 border border-[#A7F3D0]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#047857] mb-1">
                  Protected Owner Equity
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#065F46] tabular-nums">
                  ${lead.protectedEquity.toLocaleString()}
                </p>
                <p className="text-xs text-[#047857] mt-1 font-bold">
                  {lead.equityPercent}% Net Equity ({lead.ltvPercent}% Combined LTV)
                </p>
              </div>

              <div className="bg-[#F0F7FF] rounded-2xl p-5 border border-[#BFDBFE]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-1">
                  1st Mortgage (Keep Intact)
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tabular-nums">
                  {lead.firstLien.rate.toFixed(2)}%{' '}
                  <span className="text-base font-bold text-[#0066CC]">Fixed</span>
                </p>
                <p className="text-xs text-[#515154] mt-1 font-semibold">
                  ${lead.firstLien.amount.toLocaleString()} Balance • Do Not Refi
                </p>
              </div>

              <div className="bg-[#FFFBEB] rounded-2xl p-5 border border-[#FDE68A]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1">
                  Isolated NOD Trigger (2nd Lien)
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#92400E] tabular-nums">
                  ${lead.secondLien.amount.toLocaleString()}
                </p>
                <p className="text-xs text-[#B45309] mt-1 font-bold">
                  {lead.secondLien.rate}% • {lead.secondLien.maturityDate}
                </p>
              </div>
            </div>

            {/* MIT Capital Stack Visualizer */}
            <div className="mt-8 pt-8 border-t border-[#E5E5EA]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0066CC]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1D1D1F]">
                    Quantitative Capital Stack & Equity Cushion
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#515154]">
                  Total Debt: ${lead.totalDebt.toLocaleString()} ({lead.ltvPercent}% LTV) vs. Net Equity: $
                  {lead.protectedEquity.toLocaleString()} ({lead.equityPercent}%)
                </span>
              </div>

              {/* Stacked Horizontal Bar */}
              <div className="h-5 w-full rounded-full overflow-hidden flex bg-[#E5E5EA] p-0.5 gap-0.5">
                <div
                  style={{ width: `${firstLienPct}%` }}
                  className="bg-[#0066CC] h-full rounded-l-full transition-all"
                  title={`1st Mortgage: $${lead.firstLien.amount.toLocaleString()} (${lead.firstLien.rate}%)`}
                />
                <div
                  style={{ width: `${secondLienPct}%` }}
                  className="bg-[#D97706] h-full transition-all"
                  title={`2nd Mortgage (NOD Target): $${lead.secondLien.amount.toLocaleString()}`}
                />
                <div
                  style={{ width: `${equityPct}%` }}
                  className="bg-[#10B981] h-full rounded-r-full transition-all"
                  title={`Protected Net Equity: $${lead.protectedEquity.toLocaleString()} (${lead.equityPercent}%)`}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#0066CC] inline-block" />
                  <span className="font-semibold text-[#1D1D1F]">
                    1st Lien (${lead.firstLien.amount.toLocaleString()} @ {lead.firstLien.rate}%):
                  </span>
                  <span className="text-[#059669] font-bold">KEEP INTACT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#D97706] inline-block" />
                  <span className="font-semibold text-[#1D1D1F]">
                    2nd Lien (${lead.secondLien.amount.toLocaleString()} @ {lead.secondLien.rate}%):
                  </span>
                  <span className="text-[#B45309] font-bold">REPLACE / RE-AMORTIZE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-[#10B981] inline-block" />
                  <span className="font-semibold text-[#1D1D1F]">
                    Protected Equity (${lead.protectedEquity.toLocaleString()}):
                  </span>
                  <span className="text-[#059669] font-bold">{lead.equityPercent}% CUSHION</span>
                </div>
              </div>
            </div>
          </div>

          {/* Forensic Diagnosis & Lien-by-Lien Audit Table */}
          <div className="bg-white rounded-3xl border border-[#D2D2D7]/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E5EA] pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                  STEP 1 • FORENSIC UNDERWRITING DIAGNOSIS
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1F] mt-1">
                  Why Standard Refinance Offers Fail Your Math
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F5F5F7] border border-[#D2D2D7] text-xs font-semibold text-[#1D1D1F]">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span>Property Tax Status: {lead.taxStatusNote}</span>
              </div>
            </div>

            <div className="bg-[#F0F7FF] border border-[#BFDBFE] rounded-2xl p-5 text-sm sm:text-base text-[#1D1D1F] leading-relaxed">
              <p className="font-bold text-[#0066CC] mb-1">
                Executive Finding: {lead.painPointTitle}
              </p>
              <p className="text-[#333336]">{lead.forensicSummary}</p>
            </div>

            {/* Crisp High-Contrast Lien Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#1D1D1F] text-[11px] font-bold uppercase tracking-wider text-[#86868B]">
                    <th className="py-3 pr-4">Lien Position</th>
                    <th className="py-3 px-4">Originated / Current Lender</th>
                    <th className="py-3 px-4">Original Balance</th>
                    <th className="py-3 px-4">Rate & Structure</th>
                    <th className="py-3 px-4">Maturity Date</th>
                    <th className="py-3 px-4">Est. Monthly P&I</th>
                    <th className="py-3 pl-4 text-right">Underwriting Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA] text-sm">
                  {/* 1st Lien Row */}
                  <tr className="hover:bg-[#F5F5F7]/50">
                    <td className="py-4 pr-4 font-bold text-[#1D1D1F]">
                      {lead.firstLien.position}
                      <div className="text-xs font-normal text-[#86868B]">
                        Recorded {lead.firstLien.recordedDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-[#1D1D1F]">{lead.firstLien.currentLender}</div>
                      <div className="text-xs text-[#86868B]">
                        Orig: {lead.firstLien.originatedLender}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold tabular-nums text-[#1D1D1F]">
                      ${lead.firstLien.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-[#059669] tabular-nums">
                        {lead.firstLien.rate.toFixed(2)}%
                      </span>
                      <div className="text-xs text-[#515154]">{lead.firstLien.rateType}</div>
                    </td>
                    <td className="py-4 px-4 font-medium tabular-nums text-[#1D1D1F]">
                      {lead.firstLien.maturityDate}
                    </td>
                    <td className="py-4 px-4 font-bold tabular-nums text-[#1D1D1F]">
                      ${lead.firstLien.monthlyPI.toLocaleString()}/mo
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {lead.firstLien.verdict}
                      </span>
                      <div className="text-[11px] text-[#515154] mt-1 max-w-[220px] ml-auto">
                        {lead.firstLien.verdictNote}
                      </div>
                    </td>
                  </tr>

                  {/* 2nd Lien Row */}
                  <tr className="bg-[#FFFBEB]/40 hover:bg-[#FFFBEB]/70">
                    <td className="py-4 pr-4 font-bold text-[#92400E]">
                      {lead.secondLien.position}
                      <div className="text-xs font-normal text-[#B45309]">
                        Recorded {lead.secondLien.recordedDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-[#1D1D1F]">
                        {lead.secondLien.currentLender}
                      </div>
                      <div className="text-xs text-[#86868B]">
                        Orig: {lead.secondLien.originatedLender}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold tabular-nums text-[#1D1D1F]">
                      ${lead.secondLien.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-[#B45309] tabular-nums">
                        {lead.secondLien.rate.toFixed(2)}%
                      </span>
                      <div className="text-xs text-[#515154]">{lead.secondLien.rateType}</div>
                    </td>
                    <td className="py-4 px-4 font-bold tabular-nums text-[#B45309]">
                      {lead.secondLien.maturityDate}
                    </td>
                    <td className="py-4 px-4 font-bold tabular-nums text-[#1D1D1F]">
                      ${lead.secondLien.monthlyPI.toLocaleString()}/mo
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                        <AlertTriangle className="w-3.5 h-3.5" /> {lead.secondLien.verdict}
                      </span>
                      <div className="text-[11px] text-[#515154] mt-1 max-w-[220px] ml-auto">
                        {lead.secondLien.verdictNote}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Rescue Strategy Simulator + 1-Tap Action Panel */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Interactive Options + 12-Month Reserve Toggle */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D2D2D7]/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                  STEP 2 • INTERACTIVE RESTRUCTURE SIMULATOR
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1F] mt-1">
                  Compare Your Capital Bridge Solutions Paths
                </h2>
              </div>

              {/* Option Selector Tabs */}
              <div className="grid sm:grid-cols-2 gap-3">
                {lead.options.map((opt) => {
                  const isSelected = opt.id === activeOption.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-[#0066CC] bg-[#F0F7FF]/60 shadow-sm'
                          : 'border-[#E5E5EA] bg-white hover:border-[#D2D2D7]'
                      }`}
                    >
                      <span
                        className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${
                          isSelected
                            ? 'bg-[#0066CC] text-white'
                            : 'bg-[#F5F5F7] text-[#515154]'
                        }`}
                      >
                        {opt.tag}
                      </span>
                      <div className="font-bold text-sm sm:text-base text-[#1D1D1F]">
                        {opt.title}
                      </div>
                      <div className="text-xs text-[#515154] mt-1 line-clamp-2">
                        {opt.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive 12-Month $0 Out-of-Pocket Payment Reserve Switch */}
              <div className="bg-[#F5F5F7] rounded-2xl p-4 sm:p-5 border border-[#D2D2D7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0066CC]" />
                    <span className="font-bold text-sm text-[#1D1D1F]">
                      12-Month Payment Reserve Structure (Equity-Funded)
                    </span>
                  </div>
                  <p className="text-xs text-[#515154]">
                    Rolls 12 months of new facility payments into an interest reserve from your existing{' '}
                    {lead.equityPercent}% equity—so you pay $0 out-of-pocket on the new loan for 12 months.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setUseInterestReserve(!useInterestReserve)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shrink-0 ${
                    useInterestReserve
                      ? 'bg-[#059669] text-white shadow-sm'
                      : 'bg-white text-[#1D1D1F] border border-[#D2D2D7]'
                  }`}
                >
                  {useInterestReserve ? '✓ 12-Mo Reserve Active' : 'Enable 12-Mo Reserve'}
                </button>
              </div>

              {/* Active Option Output Card */}
              <div className="bg-white rounded-2xl border border-[#D2D2D7] p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5EA]">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#1D1D1F]">{activeOption.title}</h3>
                    <p className="text-xs text-[#515154] mt-0.5">{activeOption.subtitle}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0F7FF] text-[#0066CC] border border-[#BFDBFE]">
                    Est. Closing: {activeOption.closingTimeline}
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#F5F5F7]">
                    <p className="text-[11px] font-bold uppercase text-[#86868B]">
                      New Facility Amount
                    </p>
                    <p className="text-xl font-extrabold text-[#1D1D1F] tabular-nums mt-1">
                      ${activeOption.newLoanAmount.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-[#515154] mt-0.5">
                      {activeOption.keepsFirstLien
                        ? `1st Lien ($${lead.firstLien.amount.toLocaleString()} @ ${lead.firstLien.rate}%) Untouched`
                        : 'Consolidates 1st & 2nd Liens'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5F5F7]">
                    <p className="text-[11px] font-bold uppercase text-[#86868B]">
                      Out-of-Pocket Monthly P&I
                    </p>
                    <p className="text-xl font-extrabold text-[#0066CC] tabular-nums mt-1">
                      ${displayedMonthlyPayment.toLocaleString()}/mo
                    </p>
                    <p className="text-[11px] text-[#515154] mt-0.5">
                      {useInterestReserve
                        ? 'With 12-Mo Reserve on New Facility'
                        : 'Standard Monthly Amortized Payment'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
                    <p className="text-[11px] font-bold uppercase text-[#047857]">
                      Immediate Monthly Relief
                    </p>
                    <p className="text-xl font-extrabold text-[#065F46] tabular-nums mt-1">
                      {monthlySavings > 0
                        ? `-$${monthlySavings.toLocaleString()}/mo`
                        : 'Cures Matured Balloon'}
                    </p>
                    <p className="text-[11px] text-[#047857] font-semibold mt-0.5">
                      Stops Foreclosure Clock Immediately
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
                    Key Execution Advantages
                  </p>
                  {activeOption.highlights.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#1D1D1F]">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Confidential Partner Action Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#D2D2D7]/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 space-y-6 sticky top-20">
              <div className="border-b border-[#E5E5EA] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
                  DIRECT PRINCIPAL DESK • NO CREDIT PULL TO REVIEW
                </span>
                <h3 className="text-xl font-extrabold text-[#1D1D1F] mt-1">
                  Request Exact Payoff & Term Sheet
                </h3>
                <p className="text-xs text-[#515154] mt-1">
                  Speak directly with Managing Partners <strong>Ricardo Hamilton</strong> &{' '}
                  <strong>Erol Senel (NMLS #211355)</strong>.
                </p>
              </div>

              {/* 1-Tap Smartphone Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:9493393555"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (949) 339-3555</span>
                </a>
                <a
                  href={`sms:9493393555?&body=${smsBody}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] border border-[#D2D2D7] font-bold text-xs sm:text-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#0066CC]" />
                  <span>1-Tap Confidential Text</span>
                </a>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1">
                      Principal / Trustee Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] border border-[#D2D2D7] text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-[#0066CC] focus:bg-white"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1">
                        Direct Mobile / Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 000-0000"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] border border-[#D2D2D7] text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-[#0066CC] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1">
                        Confidential Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5F7] border border-[#D2D2D7] text-sm font-medium text-[#1D1D1F] focus:outline-none focus:border-[#0066CC] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#515154] mb-1">
                      Selected Structure & Notes
                    </label>
                    <textarea
                      rows={3}
                      value={contactForm.notes}
                      onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F5F5F7] border border-[#D2D2D7] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-[#0066CC] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1D1D1F] hover:bg-[#333336] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <span>
                      {isSubmitting
                        ? 'Generating Term Sheet...'
                        : `Send My ${activeOption.title.split(' ')[0]} Term Sheet`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-[#86868B]">
                    🔒 100% Confidential. No SSN or credit pull required to review payoff figures.
                  </p>
                </form>
              ) : (
                <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#059669] mx-auto" />
                  <h4 className="text-base font-extrabold text-[#065F46]">
                    Confidential Term Sheet Request Received
                  </h4>
                  <p className="text-xs text-[#047857]">
                    <strong>Ricardo Hamilton</strong> & <strong>Erol Senel (NMLS #211355)</strong> have
                    been notified and will send your exact payoff breakdown shortly.
                  </p>
                </div>
              )}

              {/* Partner Intelligence Box (Shows Ricardo & Erol the uncovered owner contact info) */}
              <div className="pt-4 border-t border-[#E5E5EA] text-xs space-y-1.5 bg-[#F5F5F7]/70 p-4 rounded-2xl">
                <div className="font-bold uppercase tracking-wider text-[10px] text-[#0066CC]">
                  Verified Public Filing Contact Record
                </div>
                <div className="flex justify-between">
                  <span className="text-[#515154]">Decision-Maker:</span>
                  <span className="font-bold text-[#1D1D1F]">{lead.ownerPerson}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#515154]">Mailing Address:</span>
                  <span className="font-semibold text-[#1D1D1F] text-right">
                    {lead.mailingAddress}, {lead.mailingCityStateZip}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#515154]">Filing Email:</span>
                  <a
                    href={`mailto:${lead.uncoveredEmail}`}
                    className="font-bold text-[#0066CC] hover:underline"
                  >
                    {lead.uncoveredEmail}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#515154]">Filing Phone:</span>
                  <span className="font-semibold text-[#1D1D1F]">{lead.uncoveredPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 2: 8.5" x 11" PRINTABLE EXECUTIVE LETTER WITH SCANNABLE QR CODE
         ===================================================================== */}
      {viewMode === 'letter' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          {/* Action Bar Above Letter (Hidden when printing) */}
          <div className="no-print mb-6 bg-white rounded-2xl border border-[#D2D2D7] p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div>
              <h2 className="text-sm font-bold text-[#1D1D1F]">
                Executive Physical Mailer + Embedded Deal Room QR Code
              </h2>
              <p className="text-xs text-[#515154]">
                Formatted for standard 8.5&quot; × 11&quot; linen or FedEx 2-Day envelope delivery.
                Scan the QR code below with your phone camera to test it live.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0055B3] text-white text-xs font-bold shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save 1-Page Letter PDF</span>
              </button>
            </div>
          </div>

          {/* 8.5" x 11" Paper Sheet */}
          <div className="print-sheet bg-white text-[#1D1D1F] rounded-2xl border border-[#D2D2D7] shadow-[0_12px_40px_rgb(0,0,0,0.06)] p-8 sm:p-12 space-y-5 leading-relaxed">
            {/* Institutional Letterhead */}
            <div className="flex justify-between items-start border-b-2 border-[#1D1D1F] pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#0066CC] text-white font-extrabold text-xs flex items-center justify-center">
                    CB
                  </div>
                  <h1 className="text-lg font-extrabold tracking-tight text-[#1D1D1F]">
                    CAPITAL BRIDGE SOLUTIONS
                  </h1>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#515154] mt-1">
                  Private Debt Restructure & Multi-Family Equity Advisory
                </p>
              </div>
              <div className="text-right text-xs text-[#1D1D1F] space-y-0.5">
                <p className="font-bold">Direct Desk: (949) 339-3555</p>
                <p className="text-[#515154]">ricardo@capitalbridgesolutions.com</p>
                <p className="text-[#0066CC] font-semibold">www.capitalbridgesolutions.com</p>
              </div>
            </div>

            {/* Date & Recipient Mailing Block */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 text-xs sm:text-[13px] pt-1">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#0066CC] mb-1">
                  CONFIDENTIAL – PRINCIPAL TO PRINCIPAL
                </p>
                <p className="font-bold text-[#1D1D1F]">{lead.ownerPerson}</p>
                <p className="font-semibold text-[#333336]">{lead.ownerEntity}</p>
                <p className="text-[#333336]">{lead.mailingAddress}</p>
                <p className="text-[#333336]">{lead.mailingCityStateZip}</p>
              </div>
              <div className="sm:text-right text-xs text-[#515154] space-y-0.5">
                <p className="font-semibold text-[#1D1D1F]">Date: {lead.letterDate}</p>
                <p>County Record: {lead.county}</p>
                <p>Parcel ID (APN): {lead.apn}</p>
                <p className="text-[#059669] font-bold">
                  Verified Equity: {lead.equityPercent}% (~$
                  {(lead.protectedEquity / 1000000).toFixed(2)}M)
                </p>
              </div>
            </div>

            {/* Subject Box */}
            <div className="bg-[#F5F5F7] border-l-4 border-[#0066CC] px-4 py-2.5 rounded-r-xl text-xs sm:text-[13px] font-bold text-[#1D1D1F]">
              RE: {lead.letterSubject}
            </div>

            {/* Salutation & Opening Paragraphs */}
            <div className="space-y-3 text-xs sm:text-[13px] text-[#1D1D1F]">
              <p className="font-semibold">Dear {lead.ownerSalutation},</p>
              {lead.letterParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Forensic Bullets */}
            <div className="bg-[#F0F7FF]/70 border border-[#BFDBFE] rounded-xl p-4 space-y-2 text-xs sm:text-[12.5px]">
              {lead.letterBullets.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-[#0066CC] mt-0.5">•</span>
                  <p className="text-[#1D1D1F]">{b}</p>
                </div>
              ))}
            </div>

            {/* Solutions Section */}
            <div className="space-y-2.5 text-xs sm:text-[13px] text-[#1D1D1F]">
              <p className="font-semibold">{lead.letterSolutionIntro}</p>
              <div className="space-y-2 pl-2">
                {lead.letterSolutions.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="font-extrabold text-[#059669]">{idx + 1}.</span>
                    <p>{s}</p>
                  </div>
                ))}
              </div>
              <p className="pt-1">{lead.letterClosing}</p>
            </div>

            {/* Bottom Signature + Scannable Personalized QR Code Box */}
            <div className="pt-3 border-t border-[#E5E5EA] grid sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-6 space-y-2 text-xs sm:text-[13px]">
                <p className="text-[#515154]">Warm regards,</p>
                <div className="pt-1">
                  <p className="font-extrabold text-sm text-[#1D1D1F]">
                    Ricardo Hamilton & Erol Senel
                  </p>
                  <p className="text-xs font-semibold text-[#0066CC]">
                    Managing Partners | Capital Bridge Solutions
                  </p>
                  <p className="text-xs text-[#515154]">
                    Erol Senel • NMLS #211355 | CA DRE Broker #02113355
                  </p>
                  <p className="text-xs font-bold text-[#1D1D1F] mt-1">
                    Direct: (949) 339-3555 • ricardo@capitalbridgesolutions.com
                  </p>
                </div>
                <p className="text-[11px] italic text-[#333336] pt-1">{lead.letterPs}</p>
              </div>

              {/* High-Contrast Apple-Clean QR Code Deal Room Box */}
              <div className="sm:col-span-6 bg-[#F5F5F7] border-2 border-[#0066CC]/30 rounded-2xl p-4 flex items-center gap-4">
                <img
                  src={qrImageUrl}
                  alt={`QR Code for ${lead.propertyShort}`}
                  className="w-28 h-28 rounded-xl bg-white p-1.5 border border-[#D2D2D7] shrink-0"
                />
                <div className="space-y-1 text-left">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#0066CC] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    🔒 PRIVATE DEAL ROOM
                  </span>
                  <p className="text-xs font-extrabold text-[#1D1D1F]">
                    Scan With Your Phone Camera
                  </p>
                  <p className="text-[11px] text-[#515154] leading-snug">
                    Opens your private side-by-side payoff & monthly payment calculator for{' '}
                    <strong>{lead.propertyShort}</strong> (no login or credit pull required).
                  </p>
                  <p className="text-[10px] font-mono font-bold text-[#0066CC] break-all">
                    capitalbridgesolutions.com/rescue/{lead.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
