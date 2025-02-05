'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-dark-800 bg-dark-950/80 backdrop-blur supports-[backdrop-filter]:bg-dark-950/80">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Capital Bridge Solutions</h3>
            <p className="text-gray-400 mb-2">
              Specialized lending solutions for real estate investors.
            </p>
            <p className="text-gray-400">
              <a href="tel:+19496146390" className="hover:text-primary-500 transition-colors">
                (949) 614-6390
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/credit-solutions" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Credit Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-dark-800">
            <p className="text-center text-gray-400">
              {currentYear} Capital Bridge Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}