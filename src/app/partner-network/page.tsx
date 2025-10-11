import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join Our Partner Network | Capital Bridge Solutions',
  description: 'Become a founding partner in our vetted network of investor-focused real estate professionals. Get featured placement, exclusive leads, and grow your business.',
  openGraph: {
    title: 'Join Our Partner Network | Capital Bridge Solutions',
    description: 'Become a founding partner in our vetted network of investor-focused real estate professionals.',
    url: 'https://www.capitalbridgesolutions.com/partner-network',
  },
};

export default function PartnerNetworkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Partner Network
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with thousands of real estate investors through our Chrome extension
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-blue-100">Target Installs (Year 1)</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-blue-100">Supported Websites</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold">$50-100</div>
                <div className="text-blue-100">Per Qualified Lead</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Partner Network?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">Targeted Exposure</h3>
              <p className="text-gray-600">
                Get in front of active real estate investors while they're browsing properties on Zillow, Redfin, BiggerPockets, and 20+ other sites.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-4">Qualified Leads</h3>
              <p className="text-gray-600">
                Receive pre-qualified leads from investors actively analyzing properties. They're ready to buy, renovate, or manage.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-4">Build Your Brand</h3>
              <p className="text-gray-600">
                Showcase your expertise with verified badges, reviews, and specialties. Stand out as an investor-focused professional.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-4">Track Performance</h3>
              <p className="text-gray-600">
                Access your partner dashboard to track leads, conversion rates, and ROI. Data-driven insights to grow your business.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-4">Exclusive Territory</h3>
              <p className="text-gray-600">
                Founding partners get priority placement and can lock in their service area. Limited spots available per market.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-4">Locked-In Pricing</h3>
              <p className="text-gray-600">
                Founding partners get special pricing that never increases. Lock in your rate before we scale and prices go up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Who We're Looking For
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3">Deal Finders</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Investor-focused agents</li>
                <li>• Off-market specialists</li>
                <li>• Multi-family experts</li>
                <li>• DSCR loan experience</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">🔨</div>
              <h3 className="text-xl font-bold mb-3">Contractors</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Fix & flip specialists</li>
                <li>• Fast turnarounds</li>
                <li>• Volume discounts</li>
                <li>• Licensed & insured</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-3">Property Managers</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Investor-focused</li>
                <li>• 24/7 support</li>
                <li>• High collection rates</li>
                <li>• Hands-off service</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Other Professionals</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• CPAs (RE tax experts)</li>
                <li>• Real estate attorneys</li>
                <li>• 1031 exchange specialists</li>
                <li>• Insurance agents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Founding Partner Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Lock in special rates before we launch. Prices will increase after launch.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <div className="text-4xl font-bold mb-2">$99<span className="text-lg text-gray-600">/mo</span></div>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Standard directory listing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Profile with specialties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Email support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic analytics</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 border-2 border-blue-600 transform scale-105">
              <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Professional</h3>
              <div className="text-4xl font-bold mb-2 text-white">$299<span className="text-lg text-blue-200">/mo</span></div>
              <p className="text-blue-100 mb-6">Best value for growth</p>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Featured listing placement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Verified badge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Lead tracking & CRM</span>
                </li>
              </ul>
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-2">$799<span className="text-lg text-gray-600">/mo</span></div>
              <p className="text-gray-600 mb-6">Dominate your market</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Exclusive territory rights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Top placement guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>API access</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Become a Founding Partner
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
            
            <form className="space-y-6" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                  </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Type *
                </label>
                <select
                  id="partnerType"
                  name="partnerType"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a type...</option>
                  <option value="deal-finder">Real Estate Agent / Deal Finder</option>
                  <option value="contractor">Contractor / Renovation Specialist</option>
                  <option value="property-manager">Property Manager</option>
                  <option value="cpa">CPA / Tax Professional</option>
                  <option value="attorney">Real Estate Attorney</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Area / Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="e.g., Los Angeles, CA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-2">
                  Interested In *
                </label>
                <select
                  id="tier"
                  name="tier"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a tier...</option>
                  <option value="basic">Basic - $99/month</option>
                  <option value="professional">Professional - $299/month</option>
                  <option value="enterprise">Enterprise - $799/month</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Tell Us About Your Business
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Years in business, specialties, why you want to join..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  required
                  className="mt-1 mr-3"
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  I agree to be contacted about the partner network and understand that Capital Bridge Solutions will review my application. *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-900 transition shadow-lg"
              >
                Submit Application
              </button>

              <p className="text-center text-sm text-gray-500">
                We'll review your application and get back to you within 24 hours
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">How many partners will you accept per market?</h3>
              <p className="text-gray-600">
                We limit partners to maintain quality. Typically 5-10 per category per major market. Founding partners get priority and can lock in exclusive territories.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">When will the extension launch?</h3>
              <p className="text-gray-600">
                We're launching in Q1 2025. Founding partners will be featured from day one and get early access to leads.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">How do I receive leads?</h3>
              <p className="text-gray-600">
                Leads come through your partner dashboard with email/SMS notifications. You'll get contact info, property details, and investor intent.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, monthly subscriptions can be canceled anytime. However, founding partner pricing is only available now - if you cancel and rejoin later, standard pricing applies.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2">What makes a good partner?</h3>
              <p className="text-gray-600">
                We look for licensed professionals with investor experience, good reviews, and a track record of success. You should be responsive, professional, and investor-focused.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join now and lock in founding partner pricing before we launch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Apply Now
            </a>
            <a
              href="tel:+19493393555"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition inline-block"
            >
              Call (949) 339-3555
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
