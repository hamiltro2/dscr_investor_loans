'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function AboutPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const aboutFaqs = [
    {
      q: "What is Capital Bridge Solutions' background and experience?",
      a: "Capital Bridge Solutions is a premier real estate investor lending firm based in Southern California, serving all 50 states. We specialize in DSCR, hard money, and portfolio refinancing. Unlike traditional institutional lenders, we provide direct one-on-one professional deal structuring support with active real estate investors available even on Saturdays."
    },
    {
      q: "Where does Capital Bridge Solutions offer loan programs?",
      a: "We are a true nationwide lender offering DSCR, Airbnb/STR, and hard money loans in all 50 US states. Whether you are financing a turnkey multi-family property in Texas, a short-term rental in California, or a rehab property in Florida, we offer local expertise and fast financing."
    },
    {
      q: "What credit score and down payment requirements do you have?",
      a: "Our DSCR loan programs require a minimum credit score of 620 for purchases, and we can refinance properties down to a 500 credit score for existing borrowers. Down payments start as low as 15% to 20% on purchases, depending on borrower qualification. We focus on the property's cash flow, not your personal tax returns or W-2s."
    },
    {
      q: "What are your starting rates, loan amounts, and typical closing times?",
      a: "Our interest rates start from 5.5% with closing points as low as 0.75% on loans over $450,000 (well below the typical lender fee of 2-3%). Our loan range is the widest in the industry, starting from $75,000 up to $30,000,000. Pre-approvals are completed in 24-48 hours, and we close in an average of 10 days."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': aboutFaqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About Capital Bridge Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Your trusted partner in real estate investment financing
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary-500/20">
              <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
              <p className="text-gray-300 mb-6">
                Capital Bridge Solutions specializes in providing innovative financing solutions
                for real estate investors. With years of experience in the industry, we understand
                the unique challenges and opportunities that investors face.
              </p>
              <p className="text-gray-300 mb-6">
                Our team of experts is dedicated to helping you secure the funding you need to
                grow your real estate portfolio. Whether you&apos;re looking for DSCR loans,
                hard money loans, or refinancing options, we have the expertise and resources
                to make it happen.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                To empower real estate investors with flexible, fast, and reliable financing
                solutions that help them achieve their investment goals.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Choose Us</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">✓</span>
                  Fast approvals - Get funded in as little as 24-48 hours
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">✓</span>
                  Flexible terms - Customized solutions for your unique needs
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">✓</span>
                  Competitive rates - Starting from 5.5%
                </li>
                <li className="flex items-start">
                  <span className="text-primary-400 mr-2">✓</span>
                  Expert guidance - Dedicated support throughout the process
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate FAQ Section */}
      <section className="py-16 border-t border-primary-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Corporate Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {aboutFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-dark-900/50 rounded-xl border border-primary-500/10 overflow-hidden transition-all duration-300 hover:border-primary-500/30"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors duration-300 hover:bg-dark-900/70"
                    aria-expanded={openFaqIndex === index}
                  >
                    <h3 className="text-lg font-semibold text-white pr-4">
                      {faq.q}
                    </h3>
                    <span className="flex-shrink-0 text-primary-400">
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-t border-primary-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-primary-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:9493393555" className="text-white hover:text-primary-400 transition-colors">
                      (949) 339-3555
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-primary-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:info@capitalbridgesolutions.com" className="text-white hover:text-primary-400 transition-colors">
                      info@capitalbridgesolutions.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Southern California</p>
                  </div>
                </div>
              </div>

              <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-primary-500/20">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Hours</p>
                    <p className="text-white">Mon-Fri: 9AM-5PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/"
                className="btn-primary inline-flex items-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
