'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Can I get a DSCR loan with bad credit or a low credit score?",
      answer: "Yes! At Capital Bridge Solutions, we understand that credit challenges happen. While traditional lenders may turn you away, we offer DSCR loan programs for borrowers with credit scores as low as 620. We focus on the property's income potential rather than just your credit score. We also have credit repair partners who can help improve your score for better rates."
    },
    {
      question: "I'm self-employed - can I still qualify for an investment property loan?",
      answer: "Absolutely! Being self-employed is not a barrier with our DSCR loan programs. Unlike traditional mortgages, we don't require tax returns, W-2s, or employment verification. We qualify you based on the rental income from the investment property, making it perfect for self-employed investors, business owners, and entrepreneurs."
    },
    {
      question: "What if I don't want to show my tax returns?",
      answer: "No problem! Our DSCR loans are specifically designed for investors who prefer not to share tax returns. We qualify you based on the property's rental income and your credit score. This is ideal for investors with complex tax situations, multiple income sources, or those who simply value their privacy."
    },
    {
      question: "How much do you charge in points, and are there hidden fees?",
      answer: "We believe in transparent, competitive pricing. For loans over $450,000, we charge only 0.75% in points - significantly lower than many competitors. There are no hidden fees or surprises. All costs are clearly disclosed upfront, including appraisal, processing, and closing costs."
    },
    {
      question: "What's the lowest interest rate I can get?",
      answer: "We work hard to get you the lowest rate possible based on your circumstances. Rates start as low as 5.99% for well-qualified borrowers. Your rate depends on factors like credit score, down payment, property type, and loan amount. We'll shop multiple lenders to find you the best rate available."
    },
    {
      question: "How fast can I get approved and close on a property?",
      answer: "Speed is crucial in real estate investing. We offer 24-48 hour pre-approvals and can close most loans in 2-3 weeks. For time-sensitive deals, we have expedited programs that can close even faster. Our streamlined process means less paperwork and faster decisions."
    },
    {
      question: "Can I use a DSCR loan for Airbnb or short-term rental properties?",
      answer: "Yes! We're one of the few lenders that embrace short-term rental properties. We can use projected Airbnb income for qualification, and we understand the unique potential of vacation rentals. Whether it's a beach house, mountain cabin, or urban apartment, we have programs designed for STR investors."
    },
    {
      question: "What if the property needs repairs or renovation?",
      answer: "We offer several solutions for properties needing work. Our fix-and-flip loans provide funding for both purchase and renovation. We also have bridge loans for quick purchases, and our DSCR loans can work for properties needing minor repairs. We'll help you choose the right program for your project."
    },
    {
      question: "Do you lend on multiple properties or portfolios?",
      answer: "Absolutely! We specialize in helping investors build and expand their portfolios. We offer blanket loans for multiple properties, portfolio refinancing, and can close multiple deals simultaneously. There's no limit to how many investment properties you can finance with us."
    },
    {
      question: "What down payment do I need for an investment property?",
      answer: "Down payment requirements typically start at 20% for DSCR loans, though some programs may require 25-30% depending on your credit score and the property type. We also have creative financing solutions that may help reduce your upfront cash requirements. Let's discuss your specific situation to find the best option."
    },
    {
      question: "Can I get cash out from my existing investment properties?",
      answer: "Yes! Our cash-out refinance programs let you tap into your property's equity for new investments, renovations, or other business needs. You can typically access up to 75% of your property's value. This is a great way to leverage your existing portfolio for growth."
    },
    {
      question: "What types of properties do you finance?",
      answer: "We finance a wide range of investment properties including single-family homes, multi-family (2-4 units), condos, townhomes, mixed-use properties, and even small commercial properties. Whether it's a traditional rental, Airbnb, or fix-and-flip, we have a loan program that fits."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Real answers to real estate investors' most common concerns
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-900/50 rounded-xl border border-dark-800 overflow-hidden transition-all duration-300 hover:border-primary-500/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors duration-300 hover:bg-dark-900/70"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-primary-400">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6">
            Have more questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19493393555"
              className="btn-primary"
              onClick={() => window.gtag && window.gtag('event', 'conversion', {'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'})}
            >
              Call (949) 339-3555
            </a>
            <a
              href="/get-started"
              className="btn-secondary"
            >
              Get Pre-Approved
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
