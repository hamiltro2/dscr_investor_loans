import Link from 'next/link'
import { Mail, Phone, MapPin, Building2 } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Credit Solutions', href: '/credit-solutions' },
  ],
  services: [
    { name: 'DSCR Loans', href: '/services#dscr' },
    { name: 'Hard Money Loans', href: '/services#hard-money' },
    { name: 'Refinancing', href: '/services#refinancing' },
    { name: 'Credit Repair', href: '/credit-solutions' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-dark-950 border-t border-dark-800">
      <div className="container py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary-500 icon-glow" />
              <span className="text-xl font-bold logo-text">
                Capital Bridge Solutions
              </span>
            </Link>
            <p className="text-sm leading-6 text-dark-300">
              Providing innovative financing solutions for real estate investors. DSCR loans, hard money loans, and refinancing options tailored to your needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-500 icon-glow" />
                <span className="text-sm text-dark-200">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-500 icon-glow" />
                <span className="text-sm text-dark-200">info@capitalbridgesolutions.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-500 icon-glow" />
                <span className="text-sm text-dark-200">123 Business Ave, Suite 100<br />Los Angeles, CA 90012</span>
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-dark-50">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-dark-200 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-dark-50">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-dark-200 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-dark-50">Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-dark-300 hover:text-dark-200 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dark-800">
          <p className="text-xs leading-5 text-dark-400">
            &copy; {new Date().getFullYear()} <span className="logo-text-small">Capital Bridge Solutions</span>. All rights reserved. NMLS #123456.
          </p>
        </div>
      </div>
    </footer>
  )
}
