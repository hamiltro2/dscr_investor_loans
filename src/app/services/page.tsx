import { Building2, BadgeDollarSign, RefreshCw, CheckCircle2, ArrowLeftRight } from 'lucide-react'
import Link from 'next/link'

export default function Services() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-dark py-16">
        <div className="container">
          <h1 className="font-display text-4xl font-bold mb-4 text-dark-50">
            Our Lending Solutions
          </h1>
          <p className="text-xl text-dark-200">
            Comprehensive financing options for real estate investors
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dark-950">
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
                  <Link href="/contact" className="btn-primary">
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hard Money Loans */}
          <div className="mb-16">
            <div className="card card-primary relative overflow-hidden">
              <div className="flex items-start gap-6">
                <BadgeDollarSign className="w-12 h-12 text-primary-500 icon-glow flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4 text-dark-50">Hard Money Loans</h2>
                  <p className="text-dark-200 mb-6">
                    Fast funding solutions for real estate investors who need quick access to capital for their investment properties.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Quick closings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Asset-based lending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Minimal documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">No income verification</span>
                    </div>
                  </div>
                  <Link href="/contact" className="btn-primary">
                    Get Funded
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Refinancing Options */}
          <div>
            <div className="card card-primary relative overflow-hidden">
              <div className="flex items-start gap-6">
                <RefreshCw className="w-12 h-12 text-primary-500 icon-glow flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-display font-bold mb-4 text-dark-50">Refinancing Options</h2>
                  <p className="text-dark-200 mb-6">
                    Multiple refinancing solutions including private, balloon, and hard money options to help you achieve your investment goals.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Lower monthly payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Cash-out options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Flexible terms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-500" />
                      <span className="text-dark-200">Rate improvement</span>
                    </div>
                  </div>
                  <Link href="/contact" className="btn-primary">
                    Explore Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-900/50 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-6 text-dark-50">
            Not Sure Which Option Is Right for You?
          </h2>
          <p className="text-xl text-dark-200 mb-8 max-w-2xl mx-auto">
            Our experts are here to help you choose the best financing solution for your investment needs.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}
