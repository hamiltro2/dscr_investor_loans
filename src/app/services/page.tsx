'use client';

import { useState } from 'react';
import { Building2, BadgeDollarSign, RefreshCw, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';
import ConsultationForm from '@/components/ConsultationForm';

export default function Services() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openConsultation = (service: string) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-dark py-10">
        <div className="container">
          <h1 className="font-display text-4xl font-bold mb-2 text-dark-50">
            Our Lending Solutions
          </h1>
          <p className="text-xl text-dark-200">
            Comprehensive financing options for real estate investors
          </p>
        </div>
      </section>

      {/* Featured Balloon Payment Card */}
      <section className="py-16 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/8 to-white/[0.03] backdrop-blur-xl border border-white/15 shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out">
              {/* Ambient glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/15 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Main content */}
              <div className="relative p-10 sm:p-16">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                    <BadgeDollarSign className="w-5 h-5 text-primary-400" />
                    <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">Balloon Payment Solutions</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white/80">
                    Flexible Payment Structures
                  </h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                    Optimize your cash flow with our balloon payment options designed for sophisticated real estate investors
                  </p>
                </div>
                
                {/* Image container with sophisticated styling */}
                <div className="relative max-w-5xl mx-auto">
                  {/* Subtle background glow */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-primary-500/20 via-blue-500/15 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                  
                  {/* Image frame */}
                  <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 p-6 shadow-2xl">
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-4">
                      <img 
                        src="/Balloon_payment-phone-number.png" 
                        alt="Balloon Payment Solutions - Contact Information" 
                        className="w-full h-auto rounded-lg shadow-xl transition-all duration-700 group-hover:scale-[1.01] group-hover:shadow-2xl"
                      />
                      
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-xl opacity-60"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full blur-xl opacity-60"></div>
                </div>
                
                {/* Call-to-action section */}
                <div className="mt-12 text-center">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-3 text-white/80">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                      <span className="text-lg font-medium">Ready to explore balloon payment options?</span>
                    </div>
                    <button 
                      onClick={() => openConsultation('Balloon Payment Consultation')}
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-primary-400/30"
                    >
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Corner accent elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary-500/10 to-transparent rounded-br-full opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-dark-950">
        <div className="container">
          {/* DSCR Loans */}
          <div className="mb-16">
            <div className="card card-primary relative overflow-hidden">
              <div className="flex items-start gap-6">
                <Building2 className="w-12 h-12 text-primary-500 icon-glow flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4 text-dark-50">DSCR Loans</h2>
                  <p className="text-dark-200 mb-6">
                    Debt Service Coverage Ratio loans are perfect for real estate investors looking to qualify based on the property's income potential rather than personal income.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">No tax returns required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Quick approval process</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Competitive rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Flexible terms available</span>
                    </div>
                  </div>
                  <button
                    onClick={() => openConsultation('DSCR Loan')}
                    className="btn-primary"
                  >
                    Let's Get the Loan You Need Now!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hard Money */}
          <div className="mb-16">
            <div className="card card-primary relative overflow-hidden">
              <div className="flex items-start gap-6">
                <BadgeDollarSign className="w-12 h-12 text-primary-500 icon-glow flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4 text-dark-50">Hard Money Loans</h2>
                  <p className="text-dark-200 mb-6">
                    Quick financing solutions for fix-and-flip investors and those needing short-term capital for real estate investments.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Fast funding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Asset-based lending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Flexible requirements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Bridge loan options</span>
                    </div>
                  </div>
                  <button
                    onClick={() => openConsultation('Hard Money Loan')}
                    className="btn-primary"
                  >
                    Let's Get the Loan You Need Now!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Refinancing */}
          <div>
            <div className="card card-primary relative overflow-hidden">
              <div className="flex items-start gap-6">
                <RefreshCw className="w-12 h-12 text-primary-500 icon-glow flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4 text-dark-50">Refinancing Solutions</h2>
                  <p className="text-dark-200 mb-6">
                    Optimize your real estate portfolio with our refinancing options, including cash-out refinancing and rate-and-term refinancing.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Lower your rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Cash-out options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Portfolio loans</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Term restructuring</span>
                    </div>
                  </div>
                  <button
                    onClick={() => openConsultation('Refinancing')}
                    className="btn-primary"
                  >
                    Let's Get the Loan You Need Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        serviceType={selectedService}
      />
    </main>
  );
}
