import Link from 'next/link';
import { Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-dark-900 to-dark-950 border-t border-dark-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary-500">DSCR Loan Leads</h3>
            <p className="text-dark-200">
              Your trusted partner in real estate investment financing.
            </p>
            <div className="flex items-center gap-2 text-dark-100">
              <Phone className="w-5 h-5 text-primary-500" />
              <a href="tel:+19496146390" className="hover:text-primary-500 transition-colors">
                (949) 614-6390
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark-50">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-dark-200 hover:text-primary-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-dark-200 hover:text-primary-500 transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/credit-solutions" className="text-dark-200 hover:text-primary-500 transition-colors">
                  Credit Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Loan Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark-50">Loan Types</h3>
            <ul className="space-y-2">
              <li className="text-dark-200">DSCR Loans</li>
              <li className="text-dark-200">Hard Money Loans</li>
              <li className="text-dark-200">Construction Loans</li>
              <li className="text-dark-200">Refinance Solutions</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dark-50">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-dark-200 hover:text-primary-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-dark-200 hover:text-primary-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-dark-300">
            <p> {currentYear} DSCR Loan Leads. All rights reserved.</p>
            <p className="text-sm">
              Licensed Mortgage Professional | NMLS# 123456
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
