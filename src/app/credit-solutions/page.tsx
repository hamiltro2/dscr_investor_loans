import { Shield, TrendingUp, FileCheck, Clock, BookOpen, Target } from 'lucide-react'
import Link from 'next/link'

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
            <div className="card">
              <h2 className="text-2xl font-display font-bold mb-6 text-dark-50 text-center">
                Get Your Personalized Solution
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="creditScore" className="block text-sm font-medium text-dark-200">
                    Approximate Credit Score
                  </label>
                  <select
                    id="creditScore"
                    name="creditScore"
                    className="select"
                  >
                    <option>Select Score Range</option>
                    <option>Below 580</option>
                    <option>580-619</option>
                    <option>620-659</option>
                    <option>660-699</option>
                    <option>700+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-200">
                    Tell us about your investment goals
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="textarea"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn-primary w-full md:w-auto">
                    Find Your Solution
                  </button>
                </div>
              </form>
            </div>
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
  )
}
