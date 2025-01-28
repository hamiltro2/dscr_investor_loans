'use client';

import { MultiStepForm } from '@/components/MultiStepForm';

export function ContactSection() {
  return (
    <section className="bg-gradient-dark py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold mb-4 text-dark-50">
            Start Your Investment Journey
          </h1>
          <p className="text-xl text-dark-200 max-w-2xl mx-auto">
            Tell us about your investment goals, and we'll help you find the perfect financing solution.
          </p>
        </div>

        {/* Multi-step Form */}
        <div className="max-w-4xl mx-auto">
          <div className="card bg-dark-900/50 border border-dark-800">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
}
