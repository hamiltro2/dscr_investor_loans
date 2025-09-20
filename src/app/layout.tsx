import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'CAPITAL BRIDGE SOLUTIONS - DSCR LOANS - HARD MONEY LOANS - SELF-EMPLOYED INVESTOR LOANS - Investment Property Financing Solutions',
  description: 'Specialized lending solutions for real estate investors. DSCR loans, hard money loans, and refinancing options with no tax returns required.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
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
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
