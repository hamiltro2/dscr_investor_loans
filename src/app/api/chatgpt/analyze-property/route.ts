import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    console.log('[ChatGPT analyze-property] Request received');
    const body = await req.json();
    console.log('[ChatGPT analyze-property] Body:', JSON.stringify(body, null, 2));

    const {
      address,
      city,
      state,
      purchase_price,
      monthly_rent,
      down_payment_percent,
      property_type,
      credit_score,
    } = body;

    // Validate required fields
    if (!purchase_price || !monthly_rent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: purchase_price, monthly_rent',
        },
        { status: 400 }
      );
    }

    // Calculate loan details
    const downPaymentPct = down_payment_percent || 25;
    const downPayment = purchase_price * (downPaymentPct / 100);
    const loanAmount = purchase_price - downPayment;

    // Estimate property expenses (conservative estimates)
    const propertyTaxRate = state === 'CA' ? 0.0106 : 0.011; // California average
    const annualPropertyTax = purchase_price * propertyTaxRate;
    const monthlyPropertyTax = annualPropertyTax / 12;

    const annualInsurance = purchase_price * 0.0035; // 0.35% of value
    const monthlyInsurance = annualInsurance / 12;

    const monthlyHOA = 0; // User would need to specify if applicable

    // Estimate interest rate based on credit score and loan amount
    let estimatedRate = 6.25; // Base rate
    if (credit_score) {
      if (credit_score < 660) estimatedRate = 7.25;
      else if (credit_score < 700) estimatedRate = 6.75;
      else if (credit_score >= 720) estimatedRate = 5.5;
    }

    // Calculate monthly P&I
    const monthlyRate = estimatedRate / 100 / 12;
    const numPayments = 360; // 30 year
    const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate total PITIA
    const monthlyPITIA = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHOA;

    // Calculate DSCR
    const dscr = monthly_rent / monthlyPITIA;

    // Calculate monthly cash flow
    const monthlyCashFlow = monthly_rent - monthlyPITIA;

    // Calculate annual metrics
    const annualRent = monthly_rent * 12;
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashReturn = (annualCashFlow / downPayment) * 100;
    const capRate = (annualRent - (annualPropertyTax + annualInsurance)) / purchase_price * 100;

    // Determine approval likelihood
    let approvalLikelihood: 'excellent' | 'good' | 'moderate' | 'challenging';
    let approvalMessage: string;

    if (dscr >= 1.25) {
      approvalLikelihood = 'excellent';
      approvalMessage = 'Strong approval odds with competitive rates';
    } else if (dscr >= 1.10) {
      approvalLikelihood = 'good';
      approvalMessage = 'Good approval odds, standard terms';
    } else if (dscr >= 0.90) {
      approvalLikelihood = 'moderate';
      approvalMessage = 'Possible approval with higher down payment or reserves';
    } else {
      approvalLikelihood = 'challenging';
      approvalMessage = 'May need additional compensating factors';
    }

    // Recommended loan terms
    const recommendedTerms = {
      max_ltv: dscr >= 1.15 ? 80 : dscr >= 1.0 ? 75 : 70,
      estimated_rate_range: `${estimatedRate}% - ${(estimatedRate + 1.5).toFixed(2)}%`,
      estimated_points: loanAmount >= 450000 ? '0.75%' : '1.0% - 1.5%',
      closing_time: '5-7 days',
    };

    const analysis = {
      success: true,
      property: {
        address: address || 'N/A',
        city: city || 'N/A',
        state: state || 'CA',
        purchase_price,
        property_type: property_type || 'Single Family',
      },
      loan_details: {
        loan_amount: Math.round(loanAmount),
        down_payment: Math.round(downPayment),
        down_payment_percent: downPaymentPct,
        estimated_rate: estimatedRate,
      },
      monthly_breakdown: {
        rent: Math.round(monthly_rent),
        principal_interest: Math.round(monthlyPI),
        property_tax: Math.round(monthlyPropertyTax),
        insurance: Math.round(monthlyInsurance),
        hoa: monthlyHOA,
        total_pitia: Math.round(monthlyPITIA),
        cash_flow: Math.round(monthlyCashFlow),
      },
      metrics: {
        dscr: parseFloat(dscr.toFixed(3)),
        monthly_cash_flow: Math.round(monthlyCashFlow),
        annual_cash_flow: Math.round(annualCashFlow),
        cash_on_cash_return: parseFloat(cashOnCashReturn.toFixed(2)),
        cap_rate: parseFloat(capRate.toFixed(2)),
      },
      approval: {
        likelihood: approvalLikelihood,
        message: approvalMessage,
        recommended_terms: recommendedTerms,
      },
      recommendations: {
        next_steps: [
          dscr < 1.0 ? 'Consider increasing down payment to improve DSCR' : null,
          monthlyCashFlow < 0 ? 'Property may have negative cash flow - ensure you have reserves' : null,
          dscr >= 1.2 ? 'Excellent property - move quickly to lock in rates' : null,
          'Get a formal quote to lock in your rate',
          'Schedule a call to discuss your specific situation',
        ].filter(Boolean),
      },
    };

    return NextResponse.json(analysis);

  } catch (error) {
    console.error('[ChatGPT analyze-property] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
