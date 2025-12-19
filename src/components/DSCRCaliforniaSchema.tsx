'use client';

export default function DSCRCaliforniaSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.capitalbridgesolutions.com/dscr-loans-california',
        'url': 'https://www.capitalbridgesolutions.com/dscr-loans-california',
        'name': 'DSCR Loans in California - Rates from 5.5% | Capital Bridge Solutions',
        'description': 'Get DSCR loans for California investment properties. No tax returns required. Rates from 5.5%. Finance rentals in LA, SF, San Diego, Sacramento.',
        'inLanguage': 'en-US'
      },
      {
        '@type': 'FinancialProduct',
        'name': 'California DSCR Loan',
        'description': 'Debt Service Coverage Ratio loans for California real estate investors. Qualify based on property income, not personal tax returns.',
        'provider': {
          '@type': 'FinancialService',
          'name': 'Capital Bridge Solutions',
          'url': 'https://www.capitalbridgesolutions.com',
          'telephone': '+1-949-339-3555',
          'address': {
            '@type': 'PostalAddress',
            'addressRegion': 'CA',
            'addressCountry': 'US'
          }
        },
        'areaServed': {
          '@type': 'State',
          'name': 'California'
        },
        'feesAndCommissionsSpecification': 'Rates from 5.5% for qualified borrowers. Points and fees vary by loan amount and credit profile.',
        'interestRate': {
          '@type': 'QuantitativeValue',
          'minValue': 5.5,
          'unitText': 'Percent'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What minimum DSCR do I need for a California investment property loan?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Most lenders look for a DSCR of 1.0–1.25+, with flexibility in exchange for more equity, stronger credit, or additional reserves. Some programs can go as low as 0.75 DSCR with compensating factors like 25-30% down payment and strong credit.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Do I need tax returns or W-2s for a DSCR loan in California?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'No, DSCR loans generally do not rely on your personal tax returns or W-2s. The emphasis is on property cash flow and DSCR ratio, making them perfect for self-employed investors or those with complex tax situations.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I get a DSCR loan through an LLC in California?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes! Many DSCR programs allow entity borrowers (LLCs, corporations) with personal guarantees from the members/managers. This is common in investor lending and provides liability protection.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What credit score is needed for a California DSCR loan?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Many DSCR lenders look for minimum FICO in the 640–680+ range, with better pricing and leverage at higher scores. Scores above 720 typically qualify for the best rates and terms.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Are Airbnb and short-term rentals allowed with DSCR loans?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Some DSCR lenders finance Airbnb/VRBO properties, using either actual STR income or market long-term rent depending on guidelines. Many accept STR properties in California vacation markets like Palm Springs and Lake Tahoe.'
            }
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.capitalbridgesolutions.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'DSCR Loans California',
            'item': 'https://www.capitalbridgesolutions.com/dscr-loans-california'
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
