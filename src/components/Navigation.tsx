'use client';

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Credit Solutions', href: '/credit-solutions' },
  { name: 'AI Real Estate Investor Query', href: '/investor-analysis' },
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
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21H21M4 18H20M6 15H18M8 12H16M10 9H14M12 3L2 18H22L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold text-blue-500">
              Capital Bridge Solutions
            </span>
          </div>
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
              className="absolute right-0 mt-2 w-64 rounded-lg bg-white py-3 shadow-xl ring-2 ring-primary-500 z-50 border-2 border-primary-400 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-50 pointer-events-none"></div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative block px-6 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-primary-600 border-b border-gray-200 last:border-0"
                  onMouseEnter={() => handleLinkHover(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/get-started"
                className="relative block px-6 py-3 text-lg font-bold text-gray-800 hover:bg-gray-100 hover:text-primary-600 mt-2"
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
