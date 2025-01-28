'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Credit Solutions', href: '/credit-solutions' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-800 bg-dark-950/80 backdrop-blur supports-[backdrop-filter]:bg-dark-950/80">
      <nav className="container flex h-16 items-center">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary-500 icon-glow" />
            <span className="text-xl font-bold logo-text text-dark-50">
              Capital Bridge Solutions
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6 icon-glow" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-dark-200 hover:text-dark-50 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/#get-started"
            className="btn-primary text-sm"
          >
            Get Started Today
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:hidden",
          !mobileMenuOpen && "hidden"
        )}
      >
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-dark-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-dark-800">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary-500 icon-glow" />
              <span className="text-xl font-bold logo-text text-dark-50">
                Capital Bridge Solutions
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-dark-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6 icon-glow" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-dark-800">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-dark-200 hover:bg-dark-900 hover:text-dark-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/#get-started"
                  className="btn-primary w-full justify-center text-base"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
