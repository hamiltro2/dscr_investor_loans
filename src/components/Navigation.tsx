'use client';

import { useState } from 'react'
import Link from 'next/link'
import { Menu, MessageCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Calculators', href: '/calculators' },
  { name: 'Credit Solutions', href: '/credit-solutions' },
  { name: 'Blog', href: '/blog' },
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
      <nav className="container flex h-24 items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center transition-all duration-300 hover:opacity-80 group"
          onMouseEnter={() => handleLinkHover('/')}
        >
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/logo.png" 
              alt="Capital Bridge Solutions" 
              className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-6 lg:items-center">
          {navigation.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-dark-200 hover:text-dark-50 transition-colors"
              onMouseEnter={() => handleLinkHover(item.href)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Chat with Cap Button */}
          <button
            onClick={() => {
              // Dispatch custom event to open ChatWidget
              window.dispatchEvent(new Event('openChatWidget'));
            }}
            className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold text-sm hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 group-hover:animate-pulse" />
            <span>Chat with Cap</span>
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-400 items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </span>
            </span>
          </button>
          
          {navigation.slice(2).map((item) => (
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
              
              {/* Chat with Cap - Featured in Mobile */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  // Dispatch custom event to open ChatWidget
                  window.dispatchEvent(new Event('openChatWidget'));
                }}
                className="relative flex items-center gap-3 mx-3 mb-3 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-md w-full cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with Cap</span>
                <Sparkles className="w-4 h-4 ml-auto" />
              </button>
              
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
