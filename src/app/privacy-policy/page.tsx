import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Capital Bridge Solutions',
  description: 'Capital Bridge Solutions Privacy Policy. Learn how we collect, use, and protect your personal information.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            <strong>Effective Date:</strong> January 1, 2026<br />
            <strong>Last Updated:</strong> January 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p>
            Capital Bridge Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              capitalbridgesolutions.com
            </Link>
            , use our AI chat assistant (Cap), or interact with our services.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Personal Information You Provide</h3>
          <p>We collect information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fill out contact forms or loan inquiry forms</li>
            <li>Interact with our AI chat assistant (Cap)</li>
            <li>Request information about our loan products</li>
            <li>Subscribe to our newsletter or communications</li>
            <li>Create an account on our platform</li>
          </ul>

          <p className="mt-4">This information may include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
            <li><strong>Property Information:</strong> Property address, type, value, rental income</li>
            <li><strong>Financial Information:</strong> Loan amount requested, down payment, credit score range</li>
            <li><strong>Investment Details:</strong> Property type, investment strategy, timeline</li>
            <li><strong>Communication Records:</strong> Chat transcripts, email correspondence, phone call notes</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <p>When you access our website, we automatically collect certain information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, referring website</li>
            <li><strong>Location Data:</strong> General geographic location based on IP address</li>
            <li><strong>Cookies and Tracking:</strong> Session data, preferences, analytics information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Third-Party Information</h3>
          <p>We may receive information about you from third-party sources, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Credit bureaus and financial institutions</li>
            <li>Property data providers (MLS, public records)</li>
            <li>Partner referral networks</li>
            <li>Social media platforms (if you connect your account)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Provide Services</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process loan applications and pre-qualifications</li>
            <li>Provide personalized loan recommendations</li>
            <li>Communicate with you about your inquiry</li>
            <li>Connect you with our loan specialists</li>
            <li>Provide customer support and respond to inquiries</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Improve Our Services</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Analyze usage patterns to improve our website and AI assistant</li>
            <li>Conduct research and analytics</li>
            <li>Test new features and functionality</li>
            <li>Train and improve our AI models</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Marketing and Communications</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Send you promotional materials (with your consent)</li>
            <li>Provide educational content about real estate investing</li>
            <li>Notify you about new products, services, or rates</li>
            <li>Conduct surveys and request feedback</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.4 Legal and Compliance</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with legal obligations and regulations</li>
            <li>Prevent fraud and maintain security</li>
            <li>Enforce our terms and conditions</li>
            <li>Respond to legal requests and prevent harm</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. How We Share Your Information</h2>
          <p>We may share your information with:</p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Service Providers</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Technology Providers:</strong> Hosting, database, AI/ML services (OpenAI, Perplexity)</li>
            <li><strong>Analytics Services:</strong> Google Analytics, marketing analytics</li>
            <li><strong>Communication Tools:</strong> Email service providers, CRM systems</li>
            <li><strong>Payment Processors:</strong> If applicable for fees or services</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Business Partners</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Lending partners and co-lenders</li>
            <li>Real estate professionals (with your consent)</li>
            <li>Property management companies</li>
            <li>Title and escrow companies</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.3 Legal Requirements</h3>
          <p>We may disclose your information when required by law or to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Comply with legal process or government requests</li>
            <li>Enforce our terms and conditions</li>
            <li>Protect our rights, privacy, safety, or property</li>
            <li>Prevent fraud or illegal activity</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.4 Business Transfers</h3>
          <p>
            If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. You will be notified via email and/or a prominent notice on our website of any change in ownership or use of your information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. AI Chat Assistant (Cap)</h2>
          <p>Our AI chat assistant, Cap, uses the following technologies:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>OpenAI GPT-4:</strong> For natural language processing and responses</li>
            <li><strong>Perplexity AI:</strong> For real-time market research and property data</li>
            <li><strong>Internal Knowledge Base:</strong> Our proprietary content and loan information</li>
          </ul>

          <p className="mt-4">When you chat with Cap:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your conversations are logged and stored for service improvement</li>
            <li>Information you provide may be used to train our AI models</li>
            <li>Third-party AI providers process your queries (subject to their privacy policies)</li>
            <li>You can request deletion of your chat history at any time</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences and settings</li>
            <li>Analyze website traffic and user behavior</li>
            <li>Provide targeted advertising</li>
            <li>Improve website functionality</li>
          </ul>

          <p className="mt-4"><strong>Types of cookies we use:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Marketing Cookies:</strong> Track effectiveness of advertising campaigns</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>

          <p className="mt-4">
            You can control cookies through your browser settings. Note that disabling cookies may limit your ability to use certain features of our website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
            <li><strong>Access Controls:</strong> Limited employee access on need-to-know basis</li>
            <li><strong>Secure Storage:</strong> Encrypted databases and secure servers</li>
            <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
            <li><strong>Data Backup:</strong> Regular backups to prevent data loss</li>
          </ul>

          <p className="mt-4">
            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Your Privacy Rights</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 General Rights</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong>Object:</strong> Object to processing of your personal information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.2 California Residents (CCPA)</h3>
          <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right to know what personal information is collected, used, shared, or sold</li>
            <li>Right to delete personal information held by businesses</li>
            <li>Right to opt-out of sale of personal information (we do not sell personal information)</li>
            <li>Right to non-discrimination for exercising your rights</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.3 European Residents (GDPR)</h3>
          <p>If you are located in the European Economic Area, you have rights under the General Data Protection Regulation:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right to access and receive a copy of your personal data</li>
            <li>Right to rectification of inaccurate personal data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent at any time</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.4 How to Exercise Your Rights</h3>
          <p>To exercise any of these rights, please contact us at:</p>
          <ul className="list-none space-y-2">
            <li><strong>Email:</strong> privacy@capitalbridgesolutions.com</li>
            <li><strong>Phone:</strong> (949) 339-3555</li>
            <li><strong>Mail:</strong> Capital Bridge Solutions, Privacy Department, Orange County, CA</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide our services and fulfill transactions</li>
            <li>Comply with legal obligations (typically 7 years for financial records)</li>
            <li>Resolve disputes and enforce our agreements</li>
            <li>Improve our services and AI models</li>
          </ul>

          <p className="mt-4">
            When we no longer need your information, we will securely delete or anonymize it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us, and we will take steps to delete such information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Do Not Track Signals</h2>
          <p>
            Some browsers have a "Do Not Track" feature that lets you tell websites you do not want to have your online activities tracked. We currently do not respond to Do Not Track signals.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. These countries may have data protection laws different from your jurisdiction. By using our services, you consent to the transfer of your information to the United States and other countries.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Posting the new Privacy Policy on this page</li>
            <li>Updating the "Last Updated" date</li>
            <li>Sending you an email notification (for significant changes)</li>
          </ul>

          <p className="mt-4">
            We encourage you to review this Privacy Policy periodically for any updates.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Contact Us</h2>
          <p>
            If you have questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us:
          </p>

          <div className="bg-gray-50 rounded-lg p-6 my-6">
            <p className="font-semibold text-gray-900 mb-4">Capital Bridge Solutions</p>
            <p className="space-y-2">
              <strong>Email:</strong> privacy@capitalbridgesolutions.com<br />
              <strong>Phone:</strong> (949) 339-3555<br />
              <strong>Address:</strong> Orange County, California<br />
              <strong>Website:</strong>{' '}
              <Link href="/" className="text-primary-600 hover:text-primary-700">
                www.capitalbridgesolutions.com
              </Link>
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            We take privacy concerns seriously and will respond to your inquiry within 30 days.
          </p>

          <hr className="my-8 border-gray-200" />

          <p className="text-sm text-gray-600 mt-8">
            <strong>Acknowledgment:</strong> By using Capital Bridge Solutions' website and services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
