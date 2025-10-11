// Partner Database - MIT PhD Level Data Architecture
const partnersDatabase = {
  'los-angeles': [
    {
      id: 'la-001',
      name: 'John Smith',
      category: 'deal-finders',
      title: 'Investor-Focused Agent',
      company: 'Keller Williams Realty',
      avatar: '🏠',
      rating: 5.0,
      reviews: 47,
      verified: true,
      badges: ['Investor-Focused', 'DSCR Expert', '100+ Deals'],
      specialties: [
        'Off-market deal finder',
        'Multi-family specialist',
        'DSCR loan experience',
        '50+ investor clients'
      ],
      quote: 'I help investors find cash-flowing properties that meet DSCR requirements',
      phone: '(555) 123-4567',
      email: 'john@kwrealty.com'
    },
    {
      id: 'la-002',
      name: 'Sarah Johnson',
      category: 'deal-finders',
      title: 'Deal Hunter',
      company: 'RE/MAX Premier',
      avatar: '🎯',
      rating: 4.9,
      reviews: 38,
      verified: true,
      badges: ['Off-Market Pro', 'Negotiation Expert'],
      specialties: [
        'Distressed properties',
        'Value-add opportunities',
        'Aggressive negotiator',
        '$50M+ investor sales'
      ],
      quote: 'I find deals others miss - specializing in below-market opportunities',
      phone: '(555) 234-5678',
      email: 'sarah@remax.com'
    },
    {
      id: 'la-003',
      name: 'ABC Construction',
      category: 'contractors',
      title: 'Fix & Flip Specialists',
      company: 'Licensed #123456',
      avatar: '🔨',
      rating: 5.0,
      reviews: 92,
      verified: true,
      badges: ['Licensed & Insured', 'Fast Turnaround', 'Volume Discounts'],
      specialties: [
        '30-45 day turnarounds',
        'Detailed SOW & budgets',
        'Volume discounts available',
        '100+ flips completed'
      ],
      quote: 'We understand investor timelines and budgets - no surprises',
      phone: '(555) 345-6789',
      email: 'info@abcconstruction.com'
    },
    {
      id: 'la-004',
      name: 'Elite Property Management',
      category: 'management',
      title: 'Hands-Off Property Managers',
      company: 'Managing 500+ Units',
      avatar: '🏢',
      rating: 4.8,
      reviews: 156,
      verified: true,
      badges: ['24/7 Support', '99% Collection Rate', 'Investor-Focused'],
      specialties: [
        'Tenant screening & placement',
        '24/7 maintenance coordination',
        'Monthly financial reporting',
        'Eviction handling'
      ],
      quote: 'We make property ownership truly passive for investors',
      phone: '(555) 456-7890',
      email: 'contact@elitepm.com'
    },
    {
      id: 'la-005',
      name: 'Michael Chen',
      category: 'deal-finders',
      title: 'Investment Strategist',
      company: 'Compass Real Estate',
      avatar: '💼',
      rating: 4.9,
      reviews: 63,
      verified: true,
      badges: ['Data-Driven', 'Portfolio Builder'],
      specialties: [
        'Cash flow analysis',
        'Market trend forecasting',
        '1031 exchange specialist',
        'Portfolio optimization'
      ],
      quote: 'I use data and analytics to find the best investment opportunities',
      phone: '(555) 567-8901',
      email: 'michael@compass.com'
    },
    {
      id: 'la-006',
      name: 'Precision Renovations',
      category: 'contractors',
      title: 'Luxury Rehab Specialists',
      company: 'Licensed #789012',
      avatar: '🏗️',
      rating: 4.9,
      reviews: 71,
      verified: true,
      badges: ['High-End Finishes', 'Design Build', 'Warranty Included'],
      specialties: [
        'Luxury renovations',
        'Design-build services',
        'Premium finishes',
        '2-year warranty'
      ],
      quote: 'We transform properties into premium rentals that command top dollar',
      phone: '(555) 678-9012',
      email: 'info@precisionreno.com'
    }
  ],
  'san-diego': [
    {
      id: 'sd-001',
      name: 'Maria Rodriguez',
      category: 'deal-finders',
      title: 'Coastal Investment Expert',
      company: 'Coldwell Banker',
      avatar: '🌊',
      rating: 5.0,
      reviews: 54,
      verified: true,
      badges: ['Vacation Rental Pro', 'Airbnb Expert'],
      specialties: [
        'Vacation rental properties',
        'Airbnb optimization',
        'Coastal market expert',
        'STR regulations specialist'
      ],
      quote: 'Helping investors capitalize on San Diego\'s vacation rental market',
      phone: '(619) 123-4567',
      email: 'maria@coldwellbanker.com'
    },
    {
      id: 'sd-002',
      name: 'Coastal Contractors',
      category: 'contractors',
      title: 'Vacation Rental Specialists',
      company: 'Licensed #345678',
      avatar: '🏖️',
      rating: 4.8,
      reviews: 45,
      verified: true,
      badges: ['STR Specialist', 'Fast Permits'],
      specialties: [
        'Vacation rental renovations',
        'Permit expediting',
        'Coastal compliance',
        'Turnkey solutions'
      ],
      quote: 'We create vacation rentals that guests love and investors profit from',
      phone: '(619) 234-5678',
      email: 'info@coastalcontractors.com'
    }
  ],
  'san-francisco': [
    {
      id: 'sf-001',
      name: 'David Park',
      category: 'deal-finders',
      title: 'Multi-Family Specialist',
      company: 'Sotheby\'s International',
      avatar: '🏙️',
      rating: 4.9,
      reviews: 81,
      verified: true,
      badges: ['Multi-Family Pro', 'Value-Add Expert'],
      specialties: [
        'Multi-family acquisitions',
        'Value-add opportunities',
        'Rent control navigation',
        'SF market expertise'
      ],
      quote: 'Navigating SF\'s complex market to find profitable multi-family deals',
      phone: '(415) 123-4567',
      email: 'david@sothebys.com'
    }
  ],
  'orange-county': [
    {
      id: 'oc-001',
      name: 'Jennifer Lee',
      category: 'deal-finders',
      title: 'Luxury Investment Agent',
      company: 'Berkshire Hathaway',
      avatar: '💎',
      rating: 5.0,
      reviews: 42,
      verified: true,
      badges: ['Luxury Market', 'High-Net-Worth'],
      specialties: [
        'Luxury investment properties',
        'High-net-worth clients',
        'Premium locations',
        'Exclusive listings'
      ],
      quote: 'Connecting investors with Orange County\'s finest investment properties',
      phone: '(949) 123-4567',
      email: 'jennifer@bhhscal.com'
    }
  ],
  'riverside': [
    {
      id: 'rv-001',
      name: 'Robert Martinez',
      category: 'deal-finders',
      title: 'Cash Flow Specialist',
      company: 'Century 21',
      avatar: '💰',
      rating: 4.8,
      reviews: 67,
      verified: true,
      badges: ['Cash Flow Expert', 'High ROI'],
      specialties: [
        'High cash flow properties',
        'Emerging markets',
        'First-time investors',
        'Portfolio building'
      ],
      quote: 'Finding high-ROI opportunities in Riverside\'s growing market',
      phone: '(951) 123-4567',
      email: 'robert@century21.com'
    }
  ],
  'sacramento': [
    {
      id: 'sac-001',
      name: 'Amanda Wilson',
      category: 'deal-finders',
      title: 'Investment Property Specialist',
      company: 'Lyon Real Estate',
      avatar: '🏛️',
      rating: 4.9,
      reviews: 58,
      verified: true,
      badges: ['Market Expert', 'Data-Driven'],
      specialties: [
        'Sacramento market analysis',
        'Rental property specialist',
        'Investment strategy',
        'Portfolio diversification'
      ],
      quote: 'Leveraging Sacramento\'s growth for investor success',
      phone: '(916) 123-4567',
      email: 'amanda@lyonrealestate.com'
    }
  ]
};

// Export for use in popup.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = partnersDatabase;
}
