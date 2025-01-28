import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'DSCR Loan Leads - Investment Property Financing Solutions',
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
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
