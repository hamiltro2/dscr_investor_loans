'use client';

import { Shield, TrendingUp, FileCheck, Clock, BookOpen, Target } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CreditSolutionsForm = dynamic(
  () => import('@/components/CreditSolutionsForm'),
  {
    loading: () => (
      <div className="card animate-pulse">
        <div className="h-8 w-3/4 bg-dark-800 rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-1/4 bg-dark-800 rounded mb-2"></div>
              <div className="h-10 bg-dark-800 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ),
  }
);

export default function CreditSolutions() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-dark py-16">
        <div className="container">
          <h1 className="font-display text-4xl font-bold mb-4 text-dark-50">
            Bad Credit? No Problem!
          </h1>
          <p className="text-xl text-dark-200 max-w-2xl">
            We specialize in helping investors with credit challenges find the right financing solutions while improving their credit score.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-dark-950">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card card-primary relative overflow-hidden">
              <Shield className="w-12 h-12 text-primary-500 icon-glow mb-4" />
              <h3 className="text-xl font-display font-bold mb-3 text-dark-50">
                Professional Credit Repair Advice
              </h3>
              <p className="text-dark-200">
                Get expert guidance and advice on improving your credit score through proven methods and strategies.
              </p>
            </div>

            <div className="card card-primary relative overflow-hidden">
              <BookOpen className="w-12 h-12 text-primary-500 icon-glow mb-4" />
              <h3 className="text-xl font-display font-bold mb-3 text-dark-50">
                Financial Education
              </h3>
              <p className="text-dark-200">
                Learn the best practices for maintaining good credit and making informed financial decisions.
              </p>
            </div>

            <div className="card card-primary relative overflow-hidden">
              <Target className="w-12 h-12 text-primary-500 icon-glow mb-4" />
              <h3 className="text-xl font-display font-bold mb-3 text-dark-50">
                Personalized Solutions
              </h3>
              <p className="text-dark-200">
                Get customized credit improvement strategies tailored to your specific situation.
              </p>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="max-w-2xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <CreditSolutionsForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-dark-900/50 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-8 text-dark-50">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2 text-dark-100">Expert Team</h3>
              <p className="text-dark-200">
                Years of experience in credit repair and lending
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-dark-100">Fast Results</h3>
              <p className="text-dark-200">
                Quick solutions to get your investment moving
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-dark-100">Proven Success</h3>
              <p className="text-dark-200">
                Track record of helping investors succeed
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
