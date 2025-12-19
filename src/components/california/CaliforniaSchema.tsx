import Script from 'next/script';

export default function CaliforniaSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the minimum DSCR ratio required in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While we can work with DSCR ratios as low as 0.75, a ratio of 1.0 or higher will get you the best rates and terms. A 1.25 DSCR is considered excellent and qualifies for premium pricing. California's high property values often produce strong DSCR ratios due to competitive rental markets."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to close a DSCR loan in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can close DSCR loans in California in as little as 10-15 business days. The timeline depends on appraisal turnaround (typically 5-7 days in California) and title work. We prioritize California deals and have established relationships with local appraisers and title companies."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get a DSCR loan for an Airbnb or short-term rental in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! California is one of our top markets for short-term rental (STR) DSCR loans. We use a 12-month average of actual rental income for established STRs, or projected income based on AirDNA market reports for new purchases. Palm Springs, San Diego, and Big Bear are particularly strong STR markets."
        }
      },
      {
        "@type": "Question",
        "name": "What down payment is required for a California DSCR loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimum down payment is 20-25% depending on the property type and your DSCR ratio. For California properties with strong DSCR ratios (1.25+) and good credit (720+), 20% down is typical. Investment properties in California often appreciate quickly, building equity that can be leveraged for future purchases."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to show tax returns or W-2s for a California DSCR loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. DSCR loans qualify you based solely on the property's rental income, not your personal income. This is perfect for self-employed California investors, business owners, or anyone who wants to scale their portfolio without income documentation limitations."
        }
      },
      {
        "@type": "Question",
        "name": "What credit score do I need for a California DSCR loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minimum credit score is 640, but 680+ gets better rates. California investors with 720+ credit scores qualify for the best pricing (typically 5.5-6.75% as of 2025). We work with borrowers across the credit spectrum and can find solutions for most situations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I close a DSCR loan in an LLC in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Most California investors close in an LLC for liability protection. We can close in single-member LLCs, multi-member LLCs, or personal names. California's legal structure makes LLC ownership attractive for rental properties."
        }
      },
      {
        "@type": "Question",
        "name": "What property types qualify for California DSCR loans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We finance single-family homes, condos, townhomes, 2-4 unit properties, and even some mixed-use properties in California. Short-term rentals (Airbnb/VRBO) are eligible. Properties must be investment properties (not primary residences). We also finance properties in most California HOAs."
        }
      },
      {
        "@type": "Question",
        "name": "How is rental income calculated for California properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For leased properties, we use the lower of current lease or market rent (we can often use the higher amount). For vacant properties, we use 100% of appraiser's market rent. For short-term rentals, we use 12-month actual income average or AirDNA projections. California's strong rental market typically supports excellent DSCRs."
        }
      },
      {
        "@type": "Question",
        "name": "What are current DSCR loan rates in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As of January 2025, California DSCR loan rates range from 5.5% to 8.25% depending on credit score, DSCR ratio, LTV, and prepayment period. Rates for California properties are competitive with other states."
        }
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "California DSCR Loan",
    "description": "Debt Service Coverage Ratio loans for California investment properties. Qualify based on rental income, not personal income. No tax returns required.",
    "provider": {
      "@type": "Organization",
      "name": "Capital Bridge Solutions",
      "url": "https://www.capitalbridgesolutions.com",
      "telephone": "+1-949-339-3555",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "5.5",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "5.5",
        "priceCurrency": "USD",
        "unitText": "percent per year"
      }
    },
    "feesAndCommissionsSpecification": "Rates from 5.5% APR. Minimum credit score 640. Down payment 20-25%. Loan amounts $75,000 to $3,000,000.",
    "interestRate": {
      "@type": "QuantitativeValue",
      "minValue": "5.5",
      "maxValue": "8.25",
      "unitText": "percent per year"
    },
    "areaServed": {
      "@type": "State",
      "name": "California"
    }
  };

  const breadcrumbSchema = {
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
        "name": "Locations",
        "item": "https://www.capitalbridgesolutions.com/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "California",
        "item": "https://www.capitalbridgesolutions.com/locations/california"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "DSCR Loans",
        "item": "https://www.capitalbridgesolutions.com/locations/california/dscr-loans"
      }
    ]
  };

  return (
    <>
      <Script
        id="california-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="california-financial-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
      />
      <Script
        id="california-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
