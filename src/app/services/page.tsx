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
