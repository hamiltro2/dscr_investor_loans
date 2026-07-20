'use client';

import { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Phone, 
  ArrowRight, 
  Printer, 
  Percent, 
  DollarSign, 
  MapPin, 
  HelpCircle, 
  CheckCircle,
  FileText,
  Calendar,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  has_adu_potential?: boolean;
  estimated_adu_rent?: number;
  is_str_zone?: boolean;
  estimated_str_rent?: number;
}

interface AuditClientPageProps {
  lead: LeadData;
}

export default function AuditClientPage({ lead }: AuditClientPageProps) {
  const [selectedTab, setSelectedTab] = useState<'standard' | 'adu' | 'str'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: `Pre-approval request for DSCR Audit: ${lead.address} (${lead.id})`
  });

  // Calculate California vs National constants
  const TAX_RATE = lead.is_ca ? 0.0125 : 0.011; // 1.25% CA vs 1.1% National
  const INS_RATE = lead.is_ca ? 0.002 : 0.0015; // CA fire/hazard adjustment

  // Base DSCR calculations
  const price = lead.purchase_price;
  const rent = selectedTab === 'standard' 
    ? lead.estimated_rent 
    : selectedTab === 'adu' 
      ? lead.estimated_rent + (lead.estimated_adu_rent || 0)
      : (lead.estimated_str_rent || lead.estimated_rent);

  // Financial model (20% Down / 80% LTV, 30-Year Fixed DSCR Loan)
  const ltv = 0.8;
  const loanAmount = price * ltv;
  
  // High-balance / Jumbo adjustment
  const interestRate = 0.0599; // Updated to 5.99% per user request
  
  // Principal & Interest Monthly Payment Calculation
  const monthlyRate = interestRate / 12;
  const termMonths = 360;
  const pi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  // Taxes and Insurance
  const monthlyTaxes = (price * TAX_RATE) / 12;
  const monthlyInsurance = (price * INS_RATE) / 12;
  const pitia = pi + monthlyTaxes + monthlyInsurance;
  
  const dscr = rent / pitia;
  const netCashFlow = rent - pitia;
  const cocReturn = ((netCashFlow * 12) / (price - loanAmount)) * 100;

  // Pricing structure for scenarios
  const downPaymentOptions = [
    { downPercent: 20, rate: interestRate },
    { downPercent: 25, rate: interestRate - 0.0025 }, // 0.25% rate discount for 25% down
    { downPercent: 30, rate: interestRate - 0.005 }   // 0.50% rate discount for 30% down
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'dscr',
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            propertyValue: price.toString(),
            monthlyRent: rent.toString(),
            monthlyExpenses: pitia.toFixed(0),
            dscrRatio: dscr.toFixed(2),
            message: `${formData.notes}\nActive Tab Selected: ${selectedTab.toUpperCase()}\nIs California: ${lead.is_ca ? 'YES' : 'NO'}`
          }
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Lead submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white pb-20 pt-8">
      {/* 1. Global Print Wrapper (Styles loaded only during window.print) */}
      <style jsx global>{`
        @media print {
          /* Hide standard elements */
          body {
            background: white !important;
            color: black !important;
          }
          header, footer, nav, button, form, .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          
          /* Force page margins */
          @page {
            size: 8.5in 11in;
            margin: 0.5in;
          }
          
          .print-container {
            width: 7.5in !important;
            height: 10in !important;
            color: black !important;
            font-family: 'Inter', sans-serif !important;
            background: white !important;
          }
        }
        .print-only {
          display: none;
        }
      `}</style>

      {/* ==================== WEB DISPLAY ==================== */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="text-sm text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">Audits</span> /{' '}
            <span className="text-primary-400 font-semibold">{lead.id}</span>
          </div>
          
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <Printer className="w-4 h-4 text-primary-400" />
            <span>Print or Save PDF Flyer</span>
          </button>
        </div>

        {/* Title Banner */}
        <div className="mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-950 border border-primary-500/30 rounded-full text-xs font-semibold text-primary-400 mb-4 uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{lead.is_ca ? 'California Qualified Deal' : 'Verified Property Audit'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
            Property Financing Audit
          </h1>
          <p className="text-gray-400 text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <span>{lead.address}</span>
          </p>
        </div>

        {/* Tab Controls (Multi-scenario analysis) */}
        {(lead.has_adu_potential || lead.is_str_zone) && (
          <div className="flex border-b border-dark-800 mb-8 overflow-x-auto">
            <button
              onClick={() => setSelectedTab('standard')}
              className={`py-4 px-6 font-semibold text-sm border-b-2 transition-all whitespace-nowrap ${
                selectedTab === 'standard'
                  ? 'border-primary-500 text-primary-400 bg-primary-950/20'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Standard Long-Term Rental
            </button>
            
            {lead.has_adu_potential && (
              <button
                onClick={() => setSelectedTab('adu')}
                className={`py-4 px-6 font-semibold text-sm border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedTab === 'adu'
                    ? 'border-primary-500 text-primary-400 bg-primary-950/20'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>ADU Cash-Flow Boost</span>
              </button>
            )}

            {lead.is_str_zone && (
              <button
                onClick={() => setSelectedTab('str')}
                className={`py-4 px-6 font-semibold text-sm border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedTab === 'str'
                    ? 'border-primary-500 text-primary-400 bg-primary-950/20'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Short-Term Rental Yield</span>
              </button>
            )}
          </div>
        )}

        {/* Main Grid: Calculations vs Form */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Analytics Panel (Left columns) */}
          <div className="lg:col-span-2 bg-white text-gray-900 border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
            
            {/* KPI Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              
              {/* DSCR KPI */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary-500" />
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">DSCR Score</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  {dscr.toFixed(2)}x
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  dscr >= 1.2 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : dscr >= 1.0
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {dscr >= 1.2 ? 'Strong Cash-Flow' : dscr >= 1.0 ? 'Qualified' : 'No-Ratio Eligible'}
                </span>
              </div>

              {/* Net Cash Flow KPI */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Net Cash Flow</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  ${netCashFlow >= 0 ? '+' : ''}{Math.round(netCashFlow).toLocaleString()}/mo
                </p>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>After full debt service</span>
                </span>
              </div>

              {/* ROI KPI */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500" />
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Cash-on-Cash Return</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">
                  {cocReturn.toFixed(1)}%
                </p>
                <span className="text-gray-500 text-xs">
                  Est. annual yield
                </span>
              </div>

            </div>

            {/* Income vs Expenses Horizontal Stack Chart */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Income vs Expenses Analysis</h3>
              
              <div className="space-y-6">
                
                {/* Monthly Income bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Estimated Gross Monthly Rent</span>
                    <span className="font-bold text-gray-900">${Math.round(rent).toLocaleString()}/mo</span>
                  </div>
                  <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Monthly PITIA expenses bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Total Est. Debt Service & Costs (PITIA)</span>
                    <span className="font-bold text-gray-900">${Math.round(pitia).toLocaleString()}/mo</span>
                  </div>
                  <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-600 to-rose-500 rounded-full" 
                      style={{ width: `${Math.min((pitia / rent) * 100, 100)}%` }} 
                    />
                  </div>
                </div>

              </div>

              {/* Legend details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Principal & Interest:</p>
                  <p>${Math.round(pi).toLocaleString()}/mo</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Property Taxes:</p>
                  <p>${Math.round(monthlyTaxes).toLocaleString()}/mo {lead.is_ca && '(CA Prop 13)'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Insurance Premium:</p>
                  <p>${Math.round(monthlyInsurance).toLocaleString()}/mo {lead.is_ca && '(FAIR Plan hazard)'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Interest Rate Pricing:</p>
                  <p>{(interestRate * 100).toFixed(2)}% Fixed Rate</p>
                </div>
              </div>
            </div>

            {/* Down Payment Options Scenarios Grid */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Down Payment Leverage Scenarios</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {downPaymentOptions.map((opt) => {
                  const downAmount = price * (opt.downPercent / 100);
                  const loanAmt = price - downAmount;
                  const mRate = opt.rate / 12;
                  const pAndI = (loanAmt * mRate * Math.pow(1 + mRate, termMonths)) / (Math.pow(1 + mRate, termMonths) - 1);
                  const totalPitia = pAndI + monthlyTaxes + monthlyInsurance;
                  const ratio = rent / totalPitia;
                  const cash = rent - totalPitia;
                  
                  return (
                    <div key={opt.downPercent} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 transition-all shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-gray-900 text-lg">{opt.downPercent}% Down</span>
                        <span className="text-xs bg-primary-50 text-primary-700 font-semibold px-2 py-0.5 rounded border border-primary-200">
                          {(opt.rate * 100).toFixed(2)}% Rate
                        </span>
                      </div>
                      
                      <div className="space-y-3 text-sm text-gray-500">
                        <div className="flex justify-between">
                          <span>Equity Req:</span>
                          <span className="text-gray-900 font-bold">${Math.round(downAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly PITIA:</span>
                          <span className="text-gray-900 font-semibold">${Math.round(totalPitia).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DSCR:</span>
                          <span className="text-emerald-600 font-bold">{ratio.toFixed(2)}x</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-100">
                          <span>Monthly Yield:</span>
                          <span className="text-gray-900 font-extrabold text-base">${Math.round(cash).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ADU / STR context panel description */}
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
              <h4 className="text-primary-700 font-bold mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary-500" />
                <span>How is this California Audit calculated?</span>
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We default properties in California to a **1.25%** property tax rate under Prop 13 guidelines and adjust homeowner insurance estimates upward to account for localized fire and FAIR Plan hazard zones. If ADU potential is indicated, the alternate scenario evaluates the impact of adding a secondary income unit without requiring tax returns or W-2 checks. Short-Term Rental calculations leverage regional AirDNA comp trends.
              </p>
            </div>

          </div>

          {/* Lead Capture Panel (Right Column) */}
          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8 sticky top-28">
            <h3 className="text-xl font-bold text-white mb-2">Get Pre-Approved</h3>
            <p className="text-gray-400 text-sm mb-6">
              Lock in rates starting at 5.99% for this specific property with our no-doc DSCR investor loan.
            </p>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleLeadSubmit} 
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className="w-full bg-dark-950 border border-dark-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@example.com"
                      className="w-full bg-dark-950 border border-dark-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(949) 555-0199"
                      className="w-full bg-dark-950 border border-dark-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Property Inquiry Notes</label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-dark-950 border border-dark-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <span>Get Pre-Approved Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Request Submitted!</h4>
                  <p className="text-gray-300 text-sm">
                    Thank you. **Erol Senel (NMLS #211355)** or a Capital Bridge Solutions representative will analyze this deal and contact you shortly at <strong>{formData.phone}</strong>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* ==================== PRINT ONLY PDF FLYER VIEW ==================== */}
      <div className="print-only print-container mx-auto bg-white text-black p-8 border border-black/10">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-black">CAPITAL BRIDGE SOLUTIONS</h1>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Investor Property Financing Sheet</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">(949) 339-3555</p>
            <p className="text-xs text-gray-500">info@capitalbridgesolutions.com</p>
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">PROPERTY FINANCING AUDIT</h2>
            <p className="text-sm text-gray-600">{lead.address}</p>
            <p className="text-xs font-semibold mt-1 uppercase text-primary-600">
              {lead.is_ca ? '✦ CALIFORNIA QUALIFIED PROGRAM ✦' : '✦ VERIFIED PROPERTY FINANCING ✦'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-black text-white px-2 py-1 rounded font-bold uppercase">
              {selectedTab.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Main Math Columns */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          
          {/* Key Metrics */}
          <div className="border border-black p-5 rounded-lg">
            <h3 className="font-bold border-b border-black pb-2 mb-3 uppercase tracking-wider text-xs">Financial Indicators</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Calculated DSCR</p>
                <p className="text-3xl font-extrabold">{dscr.toFixed(2)}x</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase mt-0.5">
                  {dscr >= 1.2 ? 'Qualifies for Max 80% LTV' : dscr >= 1.0 ? 'Qualifies for 75% LTV' : 'Requires No-Ratio Program'}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Monthly Net Cash Flow</p>
                <p className="text-3xl font-extrabold">${Math.round(netCashFlow).toLocaleString()}/mo</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Est. Cash-on-Cash Return</p>
                <p className="text-3xl font-extrabold">{cocReturn.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* PITIA Breakdown */}
          <div className="border border-black p-5 rounded-lg">
            <h3 className="font-bold border-b border-black pb-2 mb-3 uppercase tracking-wider text-xs">Monthly Cost Breakdown</h3>
            
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Gross Rent (Est):</td>
                  <td className="py-2 text-right font-bold">${Math.round(rent).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Principal & Interest (80%):</td>
                  <td className="py-2 text-right font-bold">${Math.round(pi).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Property Taxes:</td>
                  <td className="py-2 text-right font-bold">${Math.round(monthlyTaxes).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 text-gray-500">Homeowners Insurance:</td>
                  <td className="py-2 text-right font-bold">${Math.round(monthlyInsurance).toLocaleString()}</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-3 text-black">Total Monthly PITIA:</td>
                  <td className="py-3 text-right text-lg">${Math.round(pitia).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Down Payment Options Table */}
        <div className="border border-black p-5 rounded-lg mb-8">
          <h3 className="font-bold border-b border-black pb-2 mb-4 uppercase tracking-wider text-xs">Financing Structure Options</h3>
          
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black">
                <th className="pb-2 font-bold">Scenario LTV</th>
                <th className="pb-2 font-bold">Down Payment</th>
                <th className="pb-2 font-bold">Interest Rate</th>
                <th className="pb-2 font-bold">Est. Monthly PITIA</th>
                <th className="pb-2 font-bold text-right">Net Monthly Cash Flow</th>
              </tr>
            </thead>
            <tbody>
              {downPaymentOptions.map((opt) => {
                const downAmount = price * (opt.downPercent / 100);
                const loanAmt = price - downAmount;
                const mRate = opt.rate / 12;
                const pAndI = (loanAmt * mRate * Math.pow(1 + mRate, termMonths)) / (Math.pow(1 + mRate, termMonths) - 1);
                const totalPitia = pAndI + monthlyTaxes + monthlyInsurance;
                const cash = rent - totalPitia;
                
                return (
                  <tr key={opt.downPercent} className="border-b border-gray-200">
                    <td className="py-3 font-semibold">{opt.downPercent}% Down</td>
                    <td className="py-3">${Math.round(downAmount).toLocaleString()}</td>
                    <td className="py-3">{(opt.rate * 100).toFixed(2)}%</td>
                    <td className="py-3">${Math.round(totalPitia).toLocaleString()}</td>
                    <td className="py-3 text-right font-bold">${Math.round(cash).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ADU Note if applicable */}
        {selectedTab === 'adu' && (
          <div className="bg-gray-100 p-4 rounded-lg text-xs mb-8">
            <p className="font-bold uppercase text-emerald-700 mb-1">★ ADU Cash-Flow Boost Calculation Details:</p>
            <p>
              This calculation models adding a projected Accessory Dwelling Unit (ADU) yielding an estimated **${lead.estimated_adu_rent?.toLocaleString()}/mo** in addition to the primary structure rent of **${lead.estimated_rent?.toLocaleString()}/mo**. By utilizing DSCR financing guidelines, the potential value and cash flow of the ADU are integrated into the debt analysis without checking tax returns or personal income documentation.
            </p>
          </div>
        )}

        {/* Compliance Footer */}
        <div className="mt-auto border-t border-black pt-6 flex justify-between items-end text-[10px] text-gray-500">
          <div>
            <p className="font-bold text-black text-xs">CAPITAL BRIDGE SOLUTIONS, LLC</p>
            <p className="font-bold text-gray-700 mt-1">Erol Senel | NMLS #211355</p>
            <p>Loans made or arranged pursuant to California Financing Law License #60DBO-94935.</p>
            <p>Capital Bridge Solutions is licensed by the California Department of Real Estate, Broker License #02113355.</p>
            <p className="mt-1 font-semibold">Equal Housing Opportunity Lender.</p>
          </div>
          <div className="text-right">
            <p className="font-bold">SCAN TO CHECK RATES & APPLY</p>
            <p className="text-gray-400">capitalbridgesolutions.com/apply</p>
          </div>
        </div>

      </div>

    </div>
  );
}
