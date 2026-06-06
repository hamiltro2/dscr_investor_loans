'use client';

export default function FinancialProductSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        '@id': 'https://www.capitalbridgesolutions.com/#dscr-loan-product',
        'name': 'Nationwide DSCR Rental & STR Loan Program',
        'description': 'Debt Service Coverage Ratio (DSCR) mortgage financing for real estate investors. No W-2 tax returns or personal income verification required. Qualify based purely on property rental cash flow or projected Airbnb AirDNA income. Close under LLC, Corporation, or Partnership.',
        'provider': {
          '@type': 'FinancialService',
          'name': 'Capital Bridge Solutions',
          'url': 'https://www.capitalbridgesolutions.com',
          'telephone': '+1-949-339-3555',
          'logo': 'https://www.capitalbridgesolutions.com/logo.png',
          'email': 'info@capitalbridgesolutions.com',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Southern California',
            'addressRegion': 'CA',
            'addressCountry': 'US'
          }
        },
        'areaServed': [
          {
            '@type': 'Country',
            'name': 'United States'
          }
        ],
        'offers': {
          '@type': 'Offer',
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'price': '5.99',
            'priceCurrency': 'USD',
            'unitText': 'percent interest rate starting'
          }
        },
        'feesAndCommissionsSpecification': 'Starting rates from 5.99% interest. Minimum credit score of 620 required, with flexible options down to 580 with compensating factors. Down payments start at 20% on purchases.',
        'interestRate': {
          '@type': 'QuantitativeValue',
          'minValue': 5.99,
          'unitText': 'Percent'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Can I get a DSCR loan for an Airbnb or Short-Term Rental (STR)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes! Capital Bridge Solutions specializes in short-term rental DSCR loans. We can qualify your Airbnb or VRBO property using projected revenue from AirDNA or actual historical rental statements, rather than requiring traditional long-term lease agreements.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the minimum credit score for a DSCR loan with Capital Bridge Solutions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Our standard DSCR loan programs require a minimum credit score of 620. However, we have flexible portfolio options that can go down to a 580 credit score with compensating factors like additional equity (higher down payment) or stronger asset reserves.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do self-employed real estate investors qualify without W-2s or tax returns?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Because DSCR loans qualify based on the cash flow of the property being financed (Debt Service Coverage Ratio = Gross Rental Income divided by Mortgage PITI), we do not check W-2s, paystubs, or tax returns. This makes the program ideal for self-employed and 1099 independent contractors.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is LLC vesting allowed on investment property loans?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. We encourage borrowers to close their investment properties in the name of an LLC, Corporation, or Partnership to protect personal assets and maintain liability shielding.'
            }
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
