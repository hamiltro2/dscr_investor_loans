import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'CAPITAL BRIDGE SOLUTIONS - DSCR LOANS California & Nationwide - HARD MONEY LOANS - SELF-EMPLOYED INVESTOR LOANS',
  description: 'Southern California based lender serving all 50 states. Specialized DSCR loans, hard money loans, and investment property financing. No tax returns required. Call (949) 339-3555.',
  keywords: 'DSCR loans, hard money loans, investment property financing, real estate investor loans, no tax return loans, self-employed loans, rental property loans, fix and flip loans, bridge loans, commercial real estate loans',
  authors: [{ name: 'Capital Bridge Solutions' }],
  creator: 'Capital Bridge Solutions',
  publisher: 'Capital Bridge Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.capitalbridgesolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Capital Bridge Solutions - Real Estate Investment Financing',
    description: 'Specialized DSCR loans and investment property financing. Get approved in 24-48 hours with no tax returns required. Rates from 5.99%.',
    url: 'https://www.capitalbridgesolutions.com',
    siteName: 'Capital Bridge Solutions',
    images: [
      {
        url: '/logo.png',
        width: 500,
        height: 200,
        alt: 'Capital Bridge Solutions - Investment Property Financing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Bridge Solutions - DSCR Loans & Investment Financing',
    description: 'Get approved for investment property loans in 24-48 hours. No tax returns required. Competitive rates starting at 5.99%.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://www.capitalbridgesolutions.com" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "@id": "https://www.capitalbridgesolutions.com/#organization",
              "name": "Capital Bridge Solutions",
              "alternateName": "CBS Loans",
              "url": "https://www.capitalbridgesolutions.com",
              "logo": "https://www.capitalbridgesolutions.com/logo.png",
              "image": "https://www.capitalbridgesolutions.com/logo.png",
              "description": "Specialized lending solutions for real estate investors. DSCR loans, hard money loans, and refinancing options with no tax returns required.",
              "telephone": "+1-949-339-3555",
              "email": "info@capitalbridgesolutions.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Southern California",
                "addressRegion": "CA",
                "addressCountry": "US",
                "areaServed": "United States"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "33.6846",
                "longitude": "-117.8265"
              },
              "sameAs": [
                "https://www.facebook.com/capitalbridgesolutions",
                "https://www.linkedin.com/company/capital-bridge-solutions",
                "https://twitter.com/capitalbridgesol"
              ],
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "paymentAccepted": "Cash, Check, Wire Transfer, ACH",
              "currenciesAccepted": "USD",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United States"
                },
                {
                  "@type": "State",
                  "name": "California",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "United States"
                  }
                },
                {
                  "@type": "State",
                  "name": "Texas"
                },
                {
                  "@type": "State",
                  "name": "Florida"
                },
                {
                  "@type": "State",
                  "name": "Arizona"
                },
                {
                  "@type": "State",
                  "name": "Nevada"
                }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "33.6846",
                  "longitude": "-117.8265"
                },
                "geoRadius": "3000 mi"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Real Estate Investment Loans",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "DSCR Loans",
                      "description": "Debt Service Coverage Ratio loans for investment properties"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Hard Money Loans",
                      "description": "Fast funding for fix and flip projects"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Bridge Loans",
                      "description": "Short-term financing solutions"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://www.capitalbridgesolutions.com",
              "name": "Capital Bridge Solutions",
              "description": "Real estate investment financing solutions",
              "publisher": {
                "@id": "https://www.capitalbridgesolutions.com/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.capitalbridgesolutions.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.capitalbridgesolutions.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://www.capitalbridgesolutions.com/services"
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Can I get a DSCR loan with bad credit or a low credit score?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! At Capital Bridge Solutions, we offer DSCR loan programs for borrowers with credit scores as low as 620. We focus on the property's income potential rather than just your credit score."
                  }
                },
                {
                  "@type": "Question",
                  "name": "I'm self-employed - can I still qualify for an investment property loan?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Our DSCR loans don't require tax returns, W-2s, or employment verification. We qualify you based on the rental income from the investment property."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much do you charge in points?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For loans over $450,000, we charge only 0.75% in points - significantly lower than many competitors. All costs are clearly disclosed upfront."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's the lowest interest rate I can get?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Rates start as low as 5.99% for well-qualified borrowers. We work hard to get you the lowest rate possible based on your circumstances."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How fast can I get approved and close on a property?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer 24-48 hour pre-approvals and can close most loans in 2-3 weeks. For time-sensitive deals, we have expedited programs."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-1002915679"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-1002915679');
          `}
        </Script>
        {/* Conversion event snippet for phone calls */}
        <Script id="phone-conversion" strategy="afterInteractive">
          {`
            gtag('config', 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D', {
              'phone_conversion_number': '(949)339-3555'
            });
          `}
        </Script>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
