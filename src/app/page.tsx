'use client';
import { Zap, TrendingDown, Users } from 'lucide-react'
import { InfoCard } from '@/components/InfoCard'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const LoanApplicationForm = dynamic(
  () => import('@/components/LoanApplicationForm'),
  { ssr: false }
)

export default function Home() {
  const cards = [
    {
      icon: Zap,
      title: "Fast Approval Process",
      description: "Get approved quickly with our streamlined application process designed for investors.",
      panelTitle: "Your Path to Quick Approval",
      steps: [
        {
          title: "Initial Consultation",
          description: "Brief 15-minute call to understand your investment goals and requirements."
        },
        {
          title: "Document Collection",
          description: "Simple upload of essential documents through our secure portal."
        },
        {
          title: "Property Analysis",
          description: "Quick review of the investment property's potential and market value."
        },
        {
          title: "Approval & Funding",
          description: "Receive approval within 3-4 days and funding in 2-3 weeks."
        }
      ]
    },
    {
      icon: TrendingDown,
      title: "Competitive Rates",
      description: "Access industry-leading rates that help maximize your investment returns.",
      panelTitle: "Understanding Our Rates",
      steps: [
        {
          title: "Rate Analysis",
          description: "We analyze current market conditions to ensure you get the best possible rate."
        },
        {
          title: "Custom Rate Match",
          description: "Match you with lenders offering rates tailored to your investment strategy."
        },
        {
          title: "Rate Lock",
          description: "Lock in your rate for up to 45 days while completing your transaction."
        },
        {
          title: "Rate Monitoring",
          description: "Ongoing monitoring for refinance opportunities as rates change."
        }
      ]
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Our experienced team provides personalized support throughout your journey.",
      panelTitle: "Your Support Team",
      steps: [
        {
          title: "Dedicated Advisor",
          description: "Personal loan advisor to guide you through the entire process."
        },
        {
          title: "Investment Strategy",
          description: "Expert advice on structuring your investment for optimal returns."
        },
        {
          title: "Market Analysis",
          description: "Detailed market insights to help you make informed decisions."
        },
        {
          title: "Ongoing Support",
          description: "Continued assistance for future investments and portfolio growth."
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-dark py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl font-bold mb-6 text-dark-50 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              No Investor Left Behind
            </h1>
            <p className="text-xl mb-8 text-dark-200">
              We work around the clock to make your investment goals a reality!
            </p>
            <Link href="#get-started" className="btn-primary text-base">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-950">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-dark-900/50">
        <div className="container">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-dark-50">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card">
              <p className="text-dark-200 mb-4">
                "The team helped me secure a DSCR loan when traditional lenders wouldn't. Excellent service!"
              </p>
              <p className="font-semibold text-dark-100">- John D., Real Estate Investor</p>
            </div>
            <div className="card">
              <p className="text-dark-200 mb-4">
                "Despite my credit challenges, they found the perfect hard money solution for my investment property."
              </p>
              <p className="font-semibold text-dark-100">- Sarah M., Property Developer</p>
            </div>
            <div className="card">
              <p className="text-dark-200 mb-4">
                "Their expertise in DSCR loans helped me expand my rental portfolio from 2 to 6 properties in just 18 months."
              </p>
              <p className="font-semibold text-dark-100">- Michael R., Portfolio Investor</p>
            </div>
            <div className="card">
              <p className="text-dark-200 mb-4">
                "Quick approval process and competitive rates. They made refinancing my investment properties seamless."
              </p>
              <p className="font-semibold text-dark-100">- Lisa K., Commercial Investor</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-dark py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-display font-bold mb-6 text-dark-50">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-dark-200">
            Bad credit? No problem! Let us help you find the right solution.
          </p>
          <div id="get-started">
            <LoanApplicationForm />
          </div>
        </div>
      </section>
    </main>
  )
}
