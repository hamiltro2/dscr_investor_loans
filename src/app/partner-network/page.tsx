import { Metadata } from 'next';
import Link from 'next/link';
import PartnerForm from '@/components/PartnerForm';
import { Target, DollarSign, Star, Mail, Lock, Briefcase, Home, Hammer, Building2, Users } from 'lucide-react';

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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Join Our Partner Network?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Targeted Exposure</h3>
              <p className="text-gray-600">
                Get in front of active real estate investors while they're browsing properties on Zillow, Redfin, BiggerPockets, and 20+ other sites.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Qualified Leads</h3>
              <p className="text-gray-600">
                Receive pre-qualified leads from investors actively analyzing properties. They're ready to buy, renovate, or manage.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Build Your Brand</h3>
              <p className="text-gray-600">
                Showcase your expertise with verified badges, reviews, and specialties. Stand out as an investor-focused professional.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Direct Lead Notifications</h3>
              <p className="text-gray-600">
                Receive instant email notifications when investors request your services. Fast response times mean more closed deals.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Exclusive Territory</h3>
              <p className="text-gray-600">
                Founding partners get priority placement and can lock in their service area. Limited spots available per market.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Locked-In Pricing</h3>
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
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Who We're Looking For
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Deal Finders</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Investor-focused agents</li>
                <li>• Off-market specialists</li>
                <li>• Multi-family experts</li>
                <li>• DSCR loan experience</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Hammer className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Contractors</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Fix & flip specialists</li>
                <li>• Fast turnarounds</li>
                <li>• Volume discounts</li>
                <li>• Licensed & insured</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Property Managers</h3>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• Investor-focused</li>
                <li>• 24/7 support</li>
                <li>• High collection rates</li>
                <li>• Hands-off service</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Other Professionals</h3>
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
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Founding Partner Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Simple, affordable pricing. Lock in founding rates before we scale.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Standard</h3>
              <div className="text-4xl font-bold mb-2 text-gray-900">$49<span className="text-lg text-gray-600">/mo</span></div>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-900">Directory listing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-900">Profile with contact info</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-900">Service area & specialties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-900">Direct lead notifications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-900">Email support</span>
                </li>
              </ul>
              <a
                href="#apply"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
              >
                Get Started
              </a>
            </div>

            <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg shadow-xl p-8 border-2 border-blue-600 transform scale-105">
              <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Featured</h3>
              <div className="text-4xl font-bold mb-2 text-white">$99<span className="text-lg text-blue-200">/mo</span></div>
              <p className="text-blue-100 mb-6">Maximum visibility & leads</p>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Everything in Standard, plus:</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Featured placement (top of list)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Verified partner badge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Priority lead routing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">✓</span>
                  <span>Profile photo & bio</span>
                </li>
              </ul>
              <a
                href="#apply"
                className="block w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PartnerForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-900">How many partners will you accept per market?</h3>
              <p className="text-gray-600">
                We limit partners to maintain quality. Typically 5-10 per category per major market. Founding partners get priority and can lock in exclusive territories.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-900">When will the extension launch?</h3>
              <p className="text-gray-600">
                We're launching in Q1 2026. Founding partners will be featured from day one and get early access to leads.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-900">How do I receive leads?</h3>
              <p className="text-gray-600">
                You'll receive instant email notifications with the investor's contact info, property details, and their specific needs. Simply respond directly to connect.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-900">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes, monthly subscriptions can be canceled anytime. However, founding partner pricing is only available now - if you cancel and rejoin later, standard pricing applies.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-2 text-gray-900">What makes a good partner?</h3>
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
              href="#apply"
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
