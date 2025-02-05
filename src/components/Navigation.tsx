'use client';

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Credit Solutions', href: '/credit-solutions' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Preload pages on hover
  const handleLinkHover = (href: string) => {
    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'document'
    preloadLink.href = href
    document.head.appendChild(preloadLink)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-800 bg-dark-950/80 backdrop-blur supports-[backdrop-filter]:bg-dark-950/80">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
          onMouseEnter={() => handleLinkHover('/')}
        >
          <Building2 className="h-6 w-6 text-primary-500 icon-glow" />
          <span className="text-xl font-bold logo-text text-dark-50">
            Capital Bridge Solutions
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-dark-200 hover:text-dark-50 transition-colors"
              onMouseEnter={() => handleLinkHover(item.href)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="hidden lg:block">
          <Link
            href="/get-started"
            className="btn-primary text-sm"
            onMouseEnter={() => handleLinkHover('/get-started')}
          >
            Get Started Today
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="relative lg:hidden">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md p-2 text-dark-200 hover:text-dark-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 icon-glow" />
          </button>

          {mobileMenuOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-md bg-dark-950 py-2 shadow-lg ring-1 ring-dark-800"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-base font-semibold text-dark-200 hover:bg-dark-900 hover:text-dark-50"
                  onMouseEnter={() => handleLinkHover(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/get-started"
                className="block px-4 py-2 text-base font-semibold text-primary-500 hover:bg-dark-900"
                onMouseEnter={() => handleLinkHover('/get-started')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started Today
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
