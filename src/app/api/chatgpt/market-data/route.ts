import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// California market data for major investment markets
const marketData: Record<string, {
  city: string;
  median_price: number;
  median_rent: number;
  avg_dscr: number;
  rental_yield: number;
  appreciation_rate: number;
  vacancy_rate: number;
  investment_strategy: string;
  neighborhoods: string[];
  market_description: string;
}> = {
  'los-angeles': {
    city: 'Los Angeles',
    median_price: 950000,
    median_rent: 3500,
    avg_dscr: 1.05,
    rental_yield: 4.4,
    appreciation_rate: 6.5,
    vacancy_rate: 4.2,
    investment_strategy: 'Long-term appreciation with moderate cash flow',
    neighborhoods: ['Inglewood', 'Highland Park', 'Boyle Heights', 'South LA'],
    market_description: 'Strong appreciation market with diverse neighborhoods. Best for investors seeking long-term wealth building.',
  },
  'san-diego': {
    city: 'San Diego',
    median_price: 875000,
    median_rent: 3200,
    avg_dscr: 1.08,
    rental_yield: 4.4,
    appreciation_rate: 7.0,
    vacancy_rate: 3.8,
    investment_strategy: 'Balanced appreciation and cash flow',
    neighborhoods: ['North Park', 'City Heights', 'Chula Vista', 'El Cajon'],
    market_description: 'Coastal market with strong military and tech employment. Consistent appreciation with decent yields.',
  },
  'san-francisco': {
    city: 'San Francisco',
    median_price: 1350000,
    median_rent: 4200,
    avg_dscr: 0.95,
    rental_yield: 3.7,
    appreciation_rate: 8.0,
    vacancy_rate: 5.5,
    investment_strategy: 'Pure appreciation play, negative cash flow expected',
    neighborhoods: ['Outer Sunset', 'Excelsior', 'Visitacion Valley', 'Bayview'],
    market_description: 'Highest appreciation potential in CA. Requires significant reserves for negative cash flow.',
  },
  'oakland': {
    city: 'Oakland',
    median_price: 750000,
    median_rent: 3200,
    avg_dscr: 1.15,
    rental_yield: 5.1,
    appreciation_rate: 7.5,
    vacancy_rate: 4.0,
    investment_strategy: 'Bay Area appreciation at better prices',
    neighborhoods: ['Temescal', 'Rockridge', 'Fruitvale', 'East Oakland'],
    market_description: 'Best value in Bay Area. Strong tech demand at half the price of San Francisco.',
  },
  'sacramento': {
    city: 'Sacramento',
    median_price: 520000,
    median_rent: 2400,
    avg_dscr: 1.22,
    rental_yield: 5.5,
    appreciation_rate: 6.0,
    vacancy_rate: 3.5,
    investment_strategy: 'Strong cash flow with steady appreciation',
    neighborhoods: ['Natomas', 'Elk Grove', 'Rancho Cordova', 'North Sacramento'],
    market_description: 'State capital with government jobs. Excellent balance of cash flow and appreciation.',
  },
  'inland-empire': {
    city: 'Inland Empire',
    median_price: 580000,
    median_rent: 2600,
    avg_dscr: 1.38,
    rental_yield: 5.4,
    appreciation_rate: 5.5,
    vacancy_rate: 3.2,
    investment_strategy: 'Highest cash flow in Southern California',
    neighborhoods: ['Riverside', 'Corona', 'Moreno Valley', 'Temecula', 'Rancho Cucamonga'],
    market_description: 'Top cash flow market in California. Strong population growth and warehouse/logistics economy.',
  },
  'fresno': {
    city: 'Fresno',
    median_price: 385000,
    median_rent: 1850,
    avg_dscr: 1.42,
    rental_yield: 5.8,
    appreciation_rate: 4.5,
    vacancy_rate: 3.8,
    investment_strategy: 'Highest rental yield in California',
    neighborhoods: ['Tower District', 'Woodward Park', 'Clovis', 'Northwest Fresno'],
    market_description: 'Best cash flow in California. Central Valley agricultural hub with strong rental demand.',
  },
  'san-jose': {
    city: 'San Jose',
    median_price: 1500000,
    median_rent: 4800,
    avg_dscr: 1.02,
    rental_yield: 3.8,
    appreciation_rate: 8.5,
    vacancy_rate: 3.0,
    investment_strategy: 'Silicon Valley appreciation play',
    neighborhoods: ['Willow Glen', 'Almaden', 'East San Jose', 'Berryessa'],
    market_description: 'Heart of Silicon Valley. Highest tech salaries in the country drive appreciation.',
  },
  'orange-county': {
    city: 'Orange County',
    median_price: 1100000,
    median_rent: 3800,
    avg_dscr: 1.08,
    rental_yield: 4.1,
    appreciation_rate: 7.0,
    vacancy_rate: 3.5,
    investment_strategy: 'Premium coastal market with steady growth',
    neighborhoods: ['Santa Ana', 'Anaheim', 'Garden Grove', 'Tustin'],
    market_description: 'Affluent coastal market. Strong appreciation with better cash flow than LA.',
  },
  'long-beach': {
    city: 'Long Beach',
    median_price: 725000,
    median_rent: 3100,
    avg_dscr: 1.15,
    rental_yield: 5.1,
    appreciation_rate: 6.5,
    vacancy_rate: 4.0,
    investment_strategy: 'Coastal appreciation with solid cash flow',
    neighborhoods: ['Bixby Knolls', 'Belmont Shore', 'North Long Beach', 'Downtown'],
    market_description: 'Port city with maritime economy. Coastal location at more affordable prices than LA.',
  },
};

export async function GET(req: NextRequest) {
  try {
    console.log('[ChatGPT market-data] Request received');
    
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city')?.toLowerCase().replace(/\s+/g, '-');
    const state = searchParams.get('state')?.toUpperCase();

    // If no city specified, return list of available markets
    if (!city) {
      const marketList = Object.entries(marketData).map(([key, data]) => ({
        slug: key,
        city: data.city,
        median_price: data.median_price,
        median_rent: data.median_rent,
        avg_dscr: data.avg_dscr,
        rental_yield: data.rental_yield,
        investment_strategy: data.investment_strategy,
      }));

      return NextResponse.json({
        success: true,
        markets: marketList,
        message: 'Available California markets. Specify ?city=<city-name> for detailed data.',
      });
    }

    // Return specific market data
    const market = marketData[city];

    if (!market) {
      // Return closest match or error
      return NextResponse.json(
        {
          success: false,
          error: `Market data not available for ${city}. Available markets: ${Object.keys(marketData).join(', ')}`,
          available_markets: Object.keys(marketData),
        },
        { status: 404 }
      );
    }

    // Calculate investment metrics for sample property
    const sampleProperty = {
      purchase_price: market.median_price,
      monthly_rent: market.median_rent,
      down_payment_percent: 25,
    };

    const downPayment = sampleProperty.purchase_price * 0.25;
    const loanAmount = sampleProperty.purchase_price * 0.75;
    const estimatedRate = 6.25;
    const monthlyRate = estimatedRate / 100 / 12;
    const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1);
    const monthlyPropertyTax = (sampleProperty.purchase_price * 0.0106) / 12;
    const monthlyInsurance = (sampleProperty.purchase_price * 0.0035) / 12;
    const monthlyPITIA = monthlyPI + monthlyPropertyTax + monthlyInsurance;
    const monthlyCashFlow = sampleProperty.monthly_rent - monthlyPITIA;

    return NextResponse.json({
      success: true,
      market: {
        ...market,
        state: 'CA',
        last_updated: '2024-11-19',
      },
      sample_investment: {
        description: `Typical investment property in ${market.city}`,
        purchase_price: market.median_price,
        monthly_rent: market.median_rent,
        down_payment: Math.round(downPayment),
        loan_amount: Math.round(loanAmount),
        monthly_pitia: Math.round(monthlyPITIA),
        monthly_cash_flow: Math.round(monthlyCashFlow),
        dscr: market.avg_dscr,
        annual_cash_flow: Math.round(monthlyCashFlow * 12),
        cash_on_cash_return: parseFloat(((monthlyCashFlow * 12 / downPayment) * 100).toFixed(2)),
      },
      comparison: {
        vs_california_avg: {
          price_difference: market.median_price - 700000,
          yield_difference: parseFloat((market.rental_yield - 4.8).toFixed(2)),
        },
      },
      recommendations: {
        best_for: market.investment_strategy,
        target_investors: market.avg_dscr >= 1.3 
          ? 'Cash flow focused investors' 
          : market.appreciation_rate >= 7.0 
          ? 'Long-term appreciation investors'
          : 'Balanced investors',
        risk_level: market.vacancy_rate > 4.5 ? 'Moderate-High' : market.vacancy_rate > 3.5 ? 'Moderate' : 'Low-Moderate',
      },
    });

  } catch (error) {
    console.error('[ChatGPT market-data] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
