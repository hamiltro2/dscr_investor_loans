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
              
              {/* Social Media Links */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-gray-400 text-sm">Follow us:</span>
                <a 
                  href="https://www.instagram.com/thecapitalbridgesolutions/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@capitalbridgesolutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
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
                  <button 
                    onClick={() => window.dispatchEvent(new Event('openChatWidget'))}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base cursor-pointer w-full text-left"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Chat with Cap AI 🤖
                  </button>
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
                  <Link href="/locations" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group text-base">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Locations
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
                      <p className="text-gray-400 text-sm leading-relaxed">Equal Housing Lender</p>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}