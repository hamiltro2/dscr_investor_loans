'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 to-dark-900">
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

      {/* Contact Section */}
      <section className="py-16">
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
