'use client';

import { MultiStepForm } from '@/components/MultiStepForm'

export default function GetStarted() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-dark py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-blue-500">
              Start Your Successful Investment Journey Now!
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl mx-auto">
              Fill out the form below and we'll help you find the perfect loan solution for your needs.
            </p>
          </div>

          {/* Multi-step Form */}
          <div className="max-w-4xl mx-auto">
            <MultiStepForm />
          </div>
        </div>
      </section>
    </main>
  );
}
