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
      <section className="bg-gradient-dark py-10">
        <div className="container">
          <h1 className="font-display text-4xl font-bold mb-2 text-dark-50">
            Bad Credit? No Problem!
          </h1>
          <p className="text-xl text-dark-200 max-w-2xl">
            We specialize in helping investors with credit challenges find the right financing solutions while improving their credit score.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-12 bg-dark-950">
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
          
          {/* Team Image Showcase */}
          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/15 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-out">
                {/* Subtle ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Image container */}
                <div className="relative p-6 sm:p-8">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5 rounded-xl"></div>
                    
                    <img 
                      src="/Capital_Bridge_solutions_team.png" 
                      alt="Capital Bridge Solutions Expert Team" 
                      className="w-full h-auto rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02] relative z-10"
                    />
                    
                    {/* Elegant overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Professional caption */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-3">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                      <span className="text-primary-300 font-medium text-sm uppercase tracking-wider">Our Expert Team</span>
                    </div>
                    <p className="text-white/80 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                      Dedicated professionals with years of experience in credit solutions and real estate lending
                    </p>
                  </div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary-500/15 to-transparent rounded-br-full opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full opacity-60"></div>
              </div>
            </div>
          </div>
          
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
