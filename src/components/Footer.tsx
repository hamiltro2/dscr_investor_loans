'use client';

import Link from 'next/link';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-dark-800 bg-dark-950/80 backdrop-blur supports-[backdrop-filter]:bg-dark-950/80">
      <div className="container py-20">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-12">
          {/* Logo Section - Left */}
          <div className="flex-shrink-0 lg:max-w-md">
            <div className="mb-8">
              <img 
                src="/logo.png" 
                alt="Capital Bridge Solutions" 
                className="h-24 w-auto transition-opacity duration-300 hover:opacity-80"
              />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Specialized lending solutions for real estate investors nationwide. We provide comprehensive financing options tailored to your investment goals.
            </p>
            <div className="space-y-4">
              <a 
                href="tel:+19496146390" 
                className="inline-flex items-center gap-3 text-primary-400 hover:text-primary-300 transition-colors font-medium text-lg"
                onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (949) 339-3555
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-lg">info@capitalbridgesolutions.com</span>
              </div>
            </div>
          </div>

          {/* Content Section - Right */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-8 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/calculators" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Calculators
                  </Link>
                </li>
                <li>
                  <Link href="/credit-solutions" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Credit Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-8 relative">
                Our Services
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/investor-analysis" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    AI Investor Analysis
                  </Link>
                </li>
                <li>
                  <Link href="/get-started" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Get Started Today
                  </Link>
                </li>
                <li>
                  <span className="text-gray-300 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-60"></span>
                    DSCR Loans
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-60"></span>
                    Investment Financing
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-60"></span>
                    Portfolio Lending
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact & Trust */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-8 relative">
                Why Choose Us
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-primary-500 rounded-full"></div>
              </h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Licensed & Regulated</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">NMLS licensed with full regulatory compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Expert Team</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">Years of experience in real estate lending</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Fast Approvals</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">Quick decisions to keep your deals moving</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-dark-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-base">
              © {currentYear} Capital Bridge Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-base text-gray-400">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
              <span className="text-gray-600">•</span>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
              <span className="text-gray-600">•</span>
              <span className="text-primary-400 font-medium">NMLS Licensed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}