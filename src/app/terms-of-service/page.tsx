import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Capital Bridge Solutions',
  description: 'Capital Bridge Solutions Terms of Service. Legal terms and conditions for using our website and services.',
  robots: 'index, follow',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            <strong>Effective Date:</strong> January 1, 2025<br />
            <strong>Last Updated:</strong> January 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the Capital Bridge Solutions website, AI chat assistant (Cap), and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </p>
          <p>
            If you do not agree to these Terms, please do not use our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility</h2>
          <p>You must meet the following requirements to use our Services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Not be prohibited from using our Services under applicable law</li>
            <li>Provide accurate and complete information</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Services Description</h2>
          <p>Capital Bridge Solutions provides:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Loan Information:</strong> Educational content about real estate financing</li>
            <li><strong>AI Chat Assistant:</strong> Cap, our AI-powered loan companion</li>
            <li><strong>Pre-Qualification:</strong> Preliminary assessment of loan eligibility</li>
            <li><strong>Deal Analysis Tools:</strong> Calculators and financial analysis</li>
            <li><strong>Loan Facilitation:</strong> Connection to lending partners and services</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Not Financial Advice</h3>
          <p>
            Our Services provide general information only and do not constitute financial, legal, or tax advice. You should consult with qualified professionals before making investment decisions.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Not a Commitment to Lend</h3>
          <p>
            Pre-qualification, rate estimates, and preliminary offers are not commitments to lend. All loans are subject to underwriting approval, property appraisal, and other conditions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. User Accounts and Registration</h2>
          <p>When you create an account or provide information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate, current, and complete information</li>
            <li>You are responsible for maintaining account security</li>
            <li>You must notify us immediately of unauthorized access</li>
            <li>You are responsible for all activities under your account</li>
            <li>We reserve the right to suspend or terminate accounts</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Acceptable Use</h2>
          <p>You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide false or misleading information</li>
            <li>Use our Services for illegal purposes</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Transmit viruses, malware, or harmful code</li>
            <li>Harass, abuse, or harm others</li>
            <li>Scrape, copy, or reproduce our content without permission</li>
            <li>Interfere with the proper functioning of our Services</li>
            <li>Use automated systems (bots) without authorization</li>
            <li>Impersonate any person or entity</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. AI Chat Assistant (Cap)</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 How Cap Works</h3>
          <p>Cap is an AI-powered assistant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Answers questions about real estate financing</li>
            <li>Provides personalized loan recommendations</li>
            <li>Analyzes investment property deals</li>
            <li>Collects information for pre-qualification</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 AI Limitations</h3>
          <p>You acknowledge that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>AI responses may contain errors or inaccuracies</li>
            <li>Cap is not a licensed financial advisor</li>
            <li>AI suggestions should be verified by human professionals</li>
            <li>We are not liable for decisions based solely on AI recommendations</li>
            <li>Conversation data may be used to improve our AI models</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Our Content</h3>
          <p>
            All content on our website, including text, graphics, logos, software, and AI models, is owned by Capital Bridge Solutions or our licensors and protected by intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Limited License</h3>
          <p>We grant you a limited, non-exclusive, non-transferable license to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and use our Services for personal, non-commercial purposes</li>
            <li>View and print content for your own use</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.3 Restrictions</h3>
          <p>You may NOT:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reproduce, distribute, or create derivative works</li>
            <li>Reverse engineer our software or AI models</li>
            <li>Remove copyright or proprietary notices</li>
            <li>Use our content for commercial purposes without permission</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Third-Party Services</h2>
          <p>Our Services may integrate with or link to third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>OpenAI:</strong> AI language processing</li>
            <li><strong>Perplexity AI:</strong> Market research and data</li>
            <li><strong>Google Analytics:</strong> Website analytics</li>
            <li><strong>Other Partners:</strong> Credit bureaus, title companies, lenders</li>
          </ul>

          <p className="mt-4">
            We are not responsible for third-party services, their content, or their practices. Your use of third-party services is subject to their own terms and policies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Disclaimers</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.1 "As Is" Basis</h3>
          <p>
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.2 No Guarantee</h3>
          <p>We do not guarantee that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Our Services will be uninterrupted or error-free</li>
            <li>Information provided is accurate, complete, or current</li>
            <li>Results will meet your expectations</li>
            <li>You will be approved for a loan</li>
            <li>Rate estimates will be available at time of application</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAPITAL BRIDGE SOLUTIONS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Loss of profits, revenue, or data</li>
            <li>Business interruption</li>
            <li>Investment losses</li>
            <li>Missed opportunities</li>
            <li>Cost of substitute services</li>
          </ul>

          <p className="mt-4">
            OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Capital Bridge Solutions and our affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use of our Services</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Information you provide to us</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.1 Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law principles.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.2 Arbitration</h3>
          <p>
            Any dispute arising from these Terms or our Services shall be resolved through binding arbitration in Orange County, California, rather than in court, except that you may assert claims in small claims court if they qualify.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.3 Class Action Waiver</h3>
          <p>
            You agree that disputes will be resolved on an individual basis. You waive any right to participate in a class action lawsuit or class-wide arbitration.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Termination</h2>
          <p>We may terminate or suspend your access to our Services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>For violation of these Terms</li>
            <li>For fraudulent or illegal activity</li>
            <li>If required by law</li>
            <li>At our discretion, with or without notice</li>
          </ul>

          <p className="mt-4">
            Upon termination, your right to use our Services ceases immediately. Provisions that by their nature should survive termination shall survive.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of material changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Posting updated Terms on our website</li>
            <li>Updating the "Last Updated" date</li>
            <li>Sending email notification for significant changes</li>
          </ul>

          <p className="mt-4">
            Your continued use of our Services after changes constitutes acceptance of the modified Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">16. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Capital Bridge Solutions regarding our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">17. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <p className="font-semibold text-gray-900 mb-4">Capital Bridge Solutions</p>
            <p className="space-y-2">
              <strong>Email:</strong> legal@capitalbridgesolutions.com<br />
              <strong>Phone:</strong> (949) 339-3555<br />
              <strong>Address:</strong> Orange County, California<br />
              <strong>Website:</strong>{' '}
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                www.capitalbridgesolutions.com
              </Link>
            </p>
          </div>

          <hr className="my-8 border-gray-200" />

          <p className="text-sm text-gray-600 mt-8">
            <strong>Acknowledgment:</strong> By using Capital Bridge Solutions' Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 text-center space-x-6">
          <Link
            href="/privacy-policy"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
