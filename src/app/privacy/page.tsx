'use client';

import Link from 'next/link';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-950">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-dark-900/50 rounded-lg p-8 mb-8 border border-dark-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                Capital Bridge Solutions ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services related to DSCR (Debt Service Coverage Ratio) 
                loans and real estate investment financing.
              </p>
            </div>

            <div className="space-y-8">
              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-medium text-primary-400 mb-3">Personal Information</h3>
                <p className="text-gray-300 mb-4">We may collect the following personal information:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>• Name, email address, and phone number</li>
                  <li>• Financial information including income, assets, and credit history</li>
                  <li>• Property information and investment details</li>
                  <li>• Social Security Number and other identification documents</li>
                  <li>• Bank statements and tax returns</li>
                  <li>• Employment and business information</li>
                </ul>

                <h3 className="text-xl font-medium text-primary-400 mb-3">Automatically Collected Information</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• IP address and browser information</li>
                  <li>• Website usage data and analytics</li>
                  <li>• Cookies and similar tracking technologies</li>
                  <li>• Device information and operating system</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
                <p className="text-gray-300 mb-4">We use your information to:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Process and evaluate loan applications</li>
                  <li>• Verify your identity and creditworthiness</li>
                  <li>• Communicate about your loan status and services</li>
                  <li>• Comply with legal and regulatory requirements</li>
                  <li>• Improve our website and services</li>
                  <li>• Provide customer support</li>
                  <li>• Send marketing communications (with your consent)</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-300 mb-4">We may share your information with:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>• Lenders and financial institutions for loan processing</li>
                  <li>• Credit reporting agencies and verification services</li>
                  <li>• Appraisers, title companies, and other service providers</li>
                  <li>• Legal and regulatory authorities when required</li>
                  <li>• Professional advisors (attorneys, accountants, consultants)</li>
                </ul>
                <p className="text-gray-300">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                <p className="text-gray-300 mb-4">
                  We implement appropriate technical and organizational security measures to protect your information:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure servers and databases</li>
                  <li>• Access controls and authentication</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Employee training on data protection</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Rights and Choices</h2>
                <p className="text-gray-300 mb-4">You have the right to:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Access and review your personal information</li>
                  <li>• Request corrections to inaccurate information</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Request deletion of your information (subject to legal requirements)</li>
                  <li>• File complaints with regulatory authorities</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
                <p className="text-gray-300 mb-4">
                  We use cookies and similar technologies to enhance your experience and analyze website usage. 
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Links</h2>
                <p className="text-gray-300">
                  Our website may contain links to third-party websites. We are not responsible for the 
                  privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-300">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly 
                  collect personal information from children under 18.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
                <p className="text-gray-300">
                  We may update this Privacy Policy periodically. We will notify you of any material changes 
                  by posting the new policy on our website and updating the "Last updated" date.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <p className="text-gray-300 mb-4">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="text-gray-300 space-y-2">
                  <p><strong className="text-primary-400">Capital Bridge Solutions</strong></p>
                  <p>Phone: <a href="tel:+19493393555" className="text-primary-400 hover:text-primary-300" onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}>(949) 339-3555</a></p>
                  <p>Email: <a href="mailto:info@capitalbridgesolutions.com" className="text-primary-400 hover:text-primary-300">info@capitalbridgesolutions.com</a></p>
                </div>
              </section>
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-dark-800">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </Link>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  View Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
