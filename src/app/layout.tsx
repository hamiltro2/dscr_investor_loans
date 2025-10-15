import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ExitIntentPopup } from '@/components/ExitIntentPopup'
import { TrustBar } from '@/components/TrustBar'
import { IntentTracking } from '@/components/IntentTracking'
import { ChatWidget } from '@/components/AIChat/ChatWidget'

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
    creator: '@capitalbridgesol',
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Capital Bridge Solutions",
    "url": "https://www.capitalbridgesolutions.com",
    "logo": "https://www.capitalbridgesolutions.com/Small_logo_CBS.png",
    "image": "https://www.capitalbridgesolutions.com/Small_logo_CBS.png",
    "description": "Specialized DSCR loans, hard money loans, and investment property financing for real estate investors.",
    "telephone": "+19493393555",
    "email": "info@capitalbridgesolutions.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.instagram.com/thecapitalbridgesolutions/",
      "https://www.tiktok.com/@capitalbridgesolutions",
      "https://www.capitalbridgesolutions.com"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return (
    <html lang="en" className={`dark ${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <link rel="icon" href="/Small_logo_CBS.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://www.capitalbridgesolutions.com" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="apple-touch-icon" href="/Small_logo_CBS.png" />
        
        {/* Google Tag Manager - as high as possible in head */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M79RZRQ9');`}
        </Script>
        
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        
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
                "https://x.com/capitalbridgesol"
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
        
        {/* Structured Data - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "DSCR Loans",
              "provider": {
                "@id": "https://www.capitalbridgesolutions.com/#organization"
              },
              "areaServed": "United States",
              "description": "Debt Service Coverage Ratio loans for real estate investors. No tax returns required. Qualify based on rental income.",
              "offers": {
                "@type": "Offer",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "price": "5.99",
                  "priceCurrency": "USD",
                  "unitText": "percent APR starting rate"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased min-h-screen flex flex-col bg-dark-950 text-white`}>
        
        {/* Google Tag Manager (noscript) - immediately after opening body tag */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M79RZRQ9"
          height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        
        {/* Google Ads Conversion Tracking */}
        <Script id="google-ads-gtag" strategy="afterInteractive">
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
        <ExitIntentPopup />
        <TrustBar />
        <IntentTracking />
        <ChatWidget />
      </body>
    </html>
  )
}
