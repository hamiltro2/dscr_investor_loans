'use client';

import Link from 'next/link';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-dark-950">
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Terms of Service
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
              <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using the Capital Bridge Solutions website and services, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. If you do not agree with any 
                of these terms, you are prohibited from using our services.
              </p>
            </div>

            <div className="space-y-8">
              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Services Overview</h2>
                <p className="text-gray-300 mb-4">
                  Capital Bridge Solutions provides mortgage brokerage services specializing in:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• DSCR (Debt Service Coverage Ratio) loans</li>
                  <li>• Investment property financing</li>
                  <li>• Portfolio lending solutions</li>
                  <li>• Real estate investor consultation</li>
                  <li>• Property analysis and evaluation tools</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Eligibility and Requirements</h2>
                <p className="text-gray-300 mb-4">To use our services, you must:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Be at least 18 years of age</li>
                  <li>• Have legal capacity to enter into binding contracts</li>
                  <li>• Provide accurate and complete information</li>
                  <li>• Meet applicable lending requirements and criteria</li>
                  <li>• Comply with all federal, state, and local laws</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Loan Application Process</h2>
                <h3 className="text-xl font-medium text-primary-400 mb-3">Application Submission</h3>
                <p className="text-gray-300 mb-4">
                  By submitting a loan application, you represent that all information provided is true, 
                  accurate, and complete. False or misleading information may result in application denial 
                  or loan cancellation.
                </p>
                
                <h3 className="text-xl font-medium text-primary-400 mb-3">No Guarantee of Approval</h3>
                <p className="text-gray-300 mb-4">
                  Loan approval is subject to underwriting guidelines, creditworthiness, property evaluation, 
                  and lender requirements. We do not guarantee loan approval or specific terms.
                </p>

                <h3 className="text-xl font-medium text-primary-400 mb-3">Processing Fees</h3>
                <p className="text-gray-300">
                  Certain fees may apply for loan processing, appraisals, and other services. All fees will 
                  be disclosed in writing before collection.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
                <p className="text-gray-300 mb-4">You agree to:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Provide accurate and truthful information</li>
                  <li>• Respond promptly to requests for documentation</li>
                  <li>• Maintain confidentiality of account information</li>
                  <li>• Use our services only for lawful purposes</li>
                  <li>• Not interfere with website functionality or security</li>
                  <li>• Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Prohibited Uses</h2>
                <p className="text-gray-300 mb-4">You may not use our services to:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Submit fraudulent or misleading information</li>
                  <li>• Violate any laws or regulations</li>
                  <li>• Infringe on intellectual property rights</li>
                  <li>• Transmit harmful or malicious code</li>
                  <li>• Attempt unauthorized access to our systems</li>
                  <li>• Engage in any form of harassment or abuse</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-300 mb-4">
                  All content on our website, including text, graphics, logos, images, and software, is the 
                  property of Capital Bridge Solutions or its licensors and is protected by copyright and 
                  other intellectual property laws.
                </p>
                <p className="text-gray-300">
                  You may not reproduce, distribute, modify, or create derivative works without our express 
                  written permission.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Disclaimers and Limitations</h2>
                <h3 className="text-xl font-medium text-primary-400 mb-3">Service Availability</h3>
                <p className="text-gray-300 mb-4">
                  We strive to maintain continuous service availability but do not guarantee uninterrupted 
                  access. Services may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>

                <h3 className="text-xl font-medium text-primary-400 mb-3">Information Accuracy</h3>
                <p className="text-gray-300 mb-4">
                  While we endeavor to provide accurate information, we make no warranties regarding the 
                  completeness, accuracy, or reliability of content on our website.
                </p>

                <h3 className="text-xl font-medium text-primary-400 mb-3">Third-Party Services</h3>
                <p className="text-gray-300">
                  We may use third-party services for various functions. We are not responsible for the 
                  performance, availability, or content of third-party services.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
                <p className="text-gray-300 mb-4">
                  To the maximum extent permitted by law, Capital Bridge Solutions shall not be liable for:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Indirect, incidental, or consequential damages</li>
                  <li>• Loss of profits, data, or business opportunities</li>
                  <li>• Damages resulting from third-party actions</li>
                  <li>• Technical failures or service interruptions</li>
                  <li>• Decisions made by lenders or underwriters</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
                <p className="text-gray-300">
                  You agree to indemnify and hold harmless Capital Bridge Solutions from any claims, damages, 
                  losses, or expenses arising from your use of our services, violation of these terms, or 
                  infringement of any rights of another party.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Privacy and Data Protection</h2>
                <p className="text-gray-300">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we 
                  collect, use, and protect your personal information. By using our services, you consent 
                  to our privacy practices as described in our Privacy Policy.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Regulatory Compliance</h2>
                <p className="text-gray-300 mb-4">
                  Capital Bridge Solutions operates under applicable federal and state regulations, including:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• NMLS (Nationwide Multistate Licensing System) requirements</li>
                  <li>• Truth in Lending Act (TILA)</li>
                  <li>• Real Estate Settlement Procedures Act (RESPA)</li>
                  <li>• Fair Credit Reporting Act (FCRA)</li>
                  <li>• Equal Credit Opportunity Act (ECOA)</li>
                  <li>• State licensing and regulatory requirements</li>
                </ul>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
                <p className="text-gray-300">
                  We reserve the right to terminate or suspend your access to our services at any time, 
                  with or without notice, for violation of these terms or for any other reason. Upon 
                  termination, your right to use our services will cease immediately.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Dispute Resolution</h2>
                <h3 className="text-xl font-medium text-primary-400 mb-3">Governing Law</h3>
                <p className="text-gray-300 mb-4">
                  These terms are governed by the laws of the State of California, without regard to 
                  conflict of law principles.
                </p>

                <h3 className="text-xl font-medium text-primary-400 mb-3">Arbitration</h3>
                <p className="text-gray-300">
                  Any disputes arising from these terms or our services shall be resolved through binding 
                  arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
                <p className="text-gray-300">
                  We reserve the right to modify these Terms of Service at any time. Changes will be 
                  effective immediately upon posting on our website. Your continued use of our services 
                  after changes are posted constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Severability</h2>
                <p className="text-gray-300">
                  If any provision of these terms is found to be unenforceable or invalid, the remaining 
                  provisions will continue in full force and effect.
                </p>
              </section>

              <section className="bg-dark-900/30 rounded-lg p-6 border border-dark-800/50">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <p className="text-gray-300 mb-4">
                  If you have questions about these Terms of Service, please contact us:
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
                  href="/privacy" 
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
