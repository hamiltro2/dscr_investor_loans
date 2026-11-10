import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { analyzeDeal, PropertyInputs } from '@/lib/dealAnalyzer';

export const runtime = 'nodejs';

function parseNum(val: any, fallback: number): number {
  if (typeof val === 'number' && !isNaN(val)) return val;
  if (typeof val === 'string') {
    const cleaned = val.replace(/[$,%\s]/g, '');
    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed)) return parsed;
  }
  return fallback;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // =========================================================================
    // PATH A: Direct / Ultravox Voice & Chat Numerical Deal Analysis
    // Accepts flat parameters { purchasePrice, monthlyRent, downPaymentPercent, interestRate, loanTermYears }
    // =========================================================================
    if (body && (body.purchasePrice !== undefined || body.monthlyRent !== undefined)) {
      const purchasePrice = parseNum(body.purchasePrice, 0);
      const monthlyRent = parseNum(body.monthlyRent, 0);
      const downPaymentPercent = parseNum(body.downPaymentPercent, 20);
      const interestRate = parseNum(body.interestRate, 5.99);
      const loanTermYears = parseNum(body.loanTermYears, 30);

      if (purchasePrice <= 0) {
        return NextResponse.json(
          { error: 'Invalid purchasePrice: must be a positive number' },
          { status: 400 }
        );
      }

      const inputs: PropertyInputs = {
        purchasePrice,
        downPaymentPercent,
        closingCostsPercent: parseNum(body.closingCostsPercent, 2.5),
        rehabCosts: parseNum(body.rehabCosts, 0),
        interestRate,
        loanTermYears,
        monthlyRent,
        otherMonthlyIncome: parseNum(body.otherMonthlyIncome, 0),
        vacancyRate: parseNum(body.vacancyRate, 0),
        propertyTaxRate: parseNum(body.propertyTaxRate, 1.1),
        insurance: parseNum(body.insurance, 125),
        hoaFees: parseNum(body.hoaFees, 0),
        propertyManagement: parseNum(body.propertyManagement, 0),
        maintenance: parseNum(body.maintenance, 0),
        utilities: parseNum(body.utilities, 0),
        otherExpenses: parseNum(body.otherExpenses, 0),
      };

      const analysis = analyzeDeal(inputs);
      const monthlyPITIA = Math.round(
        analysis.monthly.debtService +
          analysis.monthly.propertyTax +
          analysis.monthly.insurance +
          analysis.monthly.hoaFees
      );

      return NextResponse.json({
        success: true,
        dscr: Number(analysis.metrics.dscr.toFixed(2)),
        monthlyPayment: Math.round(analysis.monthly.debtService),
        monthlyPITIA,
        monthlyCashFlow: Math.round(analysis.monthly.cashFlow),
        annualCashFlow: Math.round(analysis.annual.cashFlow),
        totalCashNeeded: Math.round(analysis.acquisition.totalCashNeeded),
        loanAmount: Math.round(analysis.acquisition.loanAmount),
        downPayment: Math.round(analysis.acquisition.downPayment),
        roi: Number(analysis.metrics.cashOnCashReturn.toFixed(2)),
        capRate: Number(analysis.metrics.capRate.toFixed(2)),
        qualified: analysis.qualification.dcsrQualifies,
        analysis: analysis.qualification.recommendation,
        inputs,
        results: analysis,
      });
    }

    // =========================================================================
    // PATH B: Chrome Extension Property Data Analysis ({ propertyData: { address, price } })
    // =========================================================================
    const { propertyData } = body ?? {};

    if (!propertyData || !propertyData.address || !propertyData.price) {
      return NextResponse.json(
        { error: 'Missing required parameters: provide either { purchasePrice, monthlyRent } or { propertyData: { address, price } }' },
        { status: 400 }
      );
    }

    const apiKey = env.PERPLEXITY_API_KEY || process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Perplexity API key not configured on backend' },
        { status: 500 }
      );
    }

    const { price, address, beds, baths, sqft, propertyType, rent, hoaFees, propertyTax } = propertyData;

    const prompt = `You are a real estate investment analyst. Analyze this property for investment potential:

Property Details:
- Address: ${address}
- Purchase Price: $${price.toLocaleString()}
- Type: ${propertyType || 'Residential'}
- Bedrooms: ${beds || 'N/A'}
- Bathrooms: ${baths || 'N/A'}
- Square Feet: ${sqft ? sqft.toLocaleString() : 'N/A'}
${rent ? `- Listed Rent: $${rent.toLocaleString()}/month` : ''}
${hoaFees ? `- HOA Fees: $${hoaFees.toLocaleString()}/month (ACTUAL from listing)` : ''}
${propertyTax ? `- Annual Property Tax: $${propertyTax.toLocaleString()} (ACTUAL from listing)` : ''}

Provide a detailed investment analysis in JSON format with:

1. **expenses**: Monthly operating expenses breakdown
   ${propertyTax ? `- propertyTax: ${Math.round(propertyTax / 12)} (MUST use this exact monthly value from listing)` : '- propertyTax: estimated monthly property tax'}
   - insurance: estimated monthly insurance
   ${hoaFees ? `- hoa: ${hoaFees} (MUST use this exact monthly value from listing)` : '- hoa: HOA fees (if applicable, or 0 if none)'}
   - maintenance: monthly maintenance reserve
   - vacancy: vacancy factor (5-10%)
   - propertyManagement: property management fee
   - total: sum of all expenses

2. **rental**: Rental analysis
   - estimatedRent: realistic monthly rent
   - lowRange: conservative estimate
   - highRange: optimistic estimate
   - confidence: confidence level (low/medium/high)
   - comparables: brief description of rental comps

3. **financing**: Calculate DSCR loan financing (we specialize in DSCR loans)
   - IMPORTANT: You MUST calculate actual numbers, not return null or undefined
   - Purchase price: $${price.toLocaleString()}
   - Calculate TWO scenarios:
     a) 15% down at 5.99% interest: Loan = price * 0.85
     b) 20% down at 5.99% interest: Loan = price * 0.80
    - Monthly payment formula: Monthly Payment = Loan Amount * (Interest Rate / 100 / 12) (Interest-Only calculation, preferred by real estate investors to maximize cash flow and DSCR ratio)
    - DSCR = Monthly Rent / Monthly Payment
    - Cash Flow = Monthly Rent - Monthly Payment - Total Expenses
    - Choose the BEST scenario and return:
      - loanType: "DSCR Loan" (string)
      - downPayment: 15 or 20 (number, not percentage)
      - interestRate: 5.99 (number)
      - loanAmount: calculated loan amount (number)
      - monthlyPayment: calculated Interest-Only payment (number)
      - dscr: calculated DSCR ratio (number, 2 decimals)
      - cashFlow: calculated monthly cash flow (number)
      - recommendation: brief explanation why this option is better (string)

4. **score**: Investment quality score
   - overall: score from 1-10
   - rating: text rating (Avoid/Poor/Fair/Good/Strong/Excellent)
   - rationale: 2-3 sentence explanation

5. **risks**: Array of potential risks (max 3)

6. **opportunities**: Array of value-add opportunities (max 3)

Return ONLY valid JSON, no markdown formatting.`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are a real estate investment analyst. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Analyze Deal] Perplexity Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Perplexity API returned ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ result: content });
  } catch (error) {
    console.error('[Analyze Deal] Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during analysis' },
      { status: 500 }
    );
  }
}
