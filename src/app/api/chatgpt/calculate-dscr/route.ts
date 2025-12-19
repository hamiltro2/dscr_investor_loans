import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    console.log('[ChatGPT calculate-dscr] Request received');
    const body = await req.json();
    console.log('[ChatGPT calculate-dscr] Body:', JSON.stringify(body, null, 2));

    const {
      monthly_rent,
      purchase_price,
      loan_amount,
      interest_rate,
      property_tax_annual,
      insurance_annual,
      hoa_monthly,
      other_expenses_monthly,
    } = body;

    // Validate required fields
    if (!monthly_rent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: monthly_rent',
        },
        { status: 400 }
      );
    }

    // Calculate or use provided values
    let finalLoanAmount = loan_amount;
    let finalInterestRate = interest_rate || 6.25;
    let finalPropertyTax = property_tax_annual;
    let finalInsurance = insurance_annual;

    // If purchase_price provided but loan_amount not, calculate loan_amount (75% LTV default)
    if (purchase_price && !loan_amount) {
      finalLoanAmount = purchase_price * 0.75;
    }

    // If purchase_price provided but property_tax not, estimate it (1.06% for CA)
    if (purchase_price && !property_tax_annual) {
      finalPropertyTax = purchase_price * 0.0106;
    }

    // If purchase_price provided but insurance not, estimate it (0.35% of value)
    if (purchase_price && !insurance_annual) {
      finalInsurance = purchase_price * 0.0035;
    }

    // If still no loan_amount, we can't calculate P&I
    if (!finalLoanAmount) {
      return NextResponse.json(
        {
          success: false,
          error: 'Must provide either loan_amount or purchase_price',
        },
        { status: 400 }
      );
    }

    // Calculate monthly principal & interest (30-year fixed)
    const monthlyRate = finalInterestRate / 100 / 12;
    const numPayments = 360;
    const monthlyPI = finalLoanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Calculate monthly property tax and insurance
    const monthlyPropertyTax = (finalPropertyTax || 0) / 12;
    const monthlyInsurance = (finalInsurance || 0) / 12;
    const monthlyHOA = hoa_monthly || 0;
    const monthlyOther = other_expenses_monthly || 0;

    // Calculate total PITIA (Principal, Interest, Taxes, Insurance, Association fees)
    const monthlyPITIA = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyOther;

    // Calculate DSCR
    const dscr = monthly_rent / monthlyPITIA;

    // Calculate cash flow
    const monthlyCashFlow = monthly_rent - monthlyPITIA;
    const annualCashFlow = monthlyCashFlow * 12;

    // Determine DSCR rating
    let dscr_rating: 'excellent' | 'good' | 'acceptable' | 'marginal' | 'below_minimum';
    let rating_message: string;
    let approval_likelihood: string;

    if (dscr >= 1.25) {
      dscr_rating = 'excellent';
      rating_message = 'Excellent DSCR - Strong cash flow property';
      approval_likelihood = 'Excellent - Qualify for best rates';
    } else if (dscr >= 1.15) {
      dscr_rating = 'good';
      rating_message = 'Good DSCR - Solid investment property';
      approval_likelihood = 'Very Good - Standard approval';
    } else if (dscr >= 1.0) {
      dscr_rating = 'acceptable';
      rating_message = 'Acceptable DSCR - Break-even to slight positive cash flow';
      approval_likelihood = 'Good - May need stronger compensating factors';
    } else if (dscr >= 0.75) {
      dscr_rating = 'marginal';
      rating_message = 'Marginal DSCR - Negative cash flow, higher down payment needed';
      approval_likelihood = 'Moderate - Requires 30%+ down, strong reserves';
    } else {
      dscr_rating = 'below_minimum';
      rating_message = 'Below minimum DSCR - Significant cash flow deficit';
      approval_likelihood = 'Challenging - May not qualify without major compensating factors';
    }

    // Calculate recommended adjustments if DSCR is low
    const recommendations: string[] = [];

    if (dscr < 1.0) {
      // Calculate required rent for 1.0 DSCR
      const rentForBreakeven = monthlyPITIA;
      const rentIncrease = rentForBreakeven - monthly_rent;
      recommendations.push(`Increase rent by $${Math.round(rentIncrease)} to reach break-even (1.0 DSCR)`);

      // Calculate required rent for 1.25 DSCR
      const rentForExcellent = monthlyPITIA * 1.25;
      const rentIncreaseForExcellent = rentForExcellent - monthly_rent;
      recommendations.push(`Or increase rent by $${Math.round(rentIncreaseForExcellent)} to reach excellent DSCR (1.25)`);

      // Calculate larger down payment needed
      if (purchase_price) {
        const targetMonthlyPI = (monthly_rent - monthlyPropertyTax - monthlyInsurance - monthlyHOA - monthlyOther) / 1.25;
        // This is approximate, would need to solve for loan amount
        recommendations.push('Consider increasing down payment to lower monthly payment');
      }
    } else if (dscr >= 1.25) {
      recommendations.push('Excellent property! Consider locking in your rate today.');
      recommendations.push('This DSCR qualifies you for the best rates (5.5%+).');
    } else if (dscr >= 1.0) {
      recommendations.push('Solid property. Ensure you have 6+ months reserves.');
      recommendations.push('Consider property improvements to increase rent.');
    }

    const calculation = {
      success: true,
      inputs: {
        monthly_rent,
        loan_amount: Math.round(finalLoanAmount),
        interest_rate: finalInterestRate,
        purchase_price: purchase_price || null,
      },
      breakdown: {
        monthly_principal_interest: Math.round(monthlyPI),
        monthly_property_tax: Math.round(monthlyPropertyTax),
        monthly_insurance: Math.round(monthlyInsurance),
        monthly_hoa: monthlyHOA,
        monthly_other_expenses: monthlyOther,
        total_monthly_pitia: Math.round(monthlyPITIA),
      },
      results: {
        dscr: parseFloat(dscr.toFixed(3)),
        dscr_rating,
        rating_message,
        monthly_cash_flow: Math.round(monthlyCashFlow),
        annual_cash_flow: Math.round(annualCashFlow),
        approval_likelihood,
      },
      scenarios: {
        at_1_00_dscr: {
          required_rent: Math.round(monthlyPITIA),
          rent_increase_needed: Math.round(monthlyPITIA - monthly_rent),
        },
        at_1_25_dscr: {
          required_rent: Math.round(monthlyPITIA * 1.25),
          rent_increase_needed: Math.round(monthlyPITIA * 1.25 - monthly_rent),
        },
      },
      recommendations,
      capital_bridge_terms: {
        min_dscr_accepted: 0.75,
        min_credit_score: 640,
        max_ltv: dscr >= 1.15 ? '80%' : dscr >= 1.0 ? '75%' : '70%',
        estimated_rate_range: dscr >= 1.25
          ? '5.5% - 6.99%'
          : dscr >= 1.0
            ? '6.50% - 7.50%'
            : '7.00% - 8.00%',
        estimated_points: finalLoanAmount >= 450000 ? '0.75%' : '1.0% - 1.5%',
      },
    };

    return NextResponse.json(calculation);

  } catch (error) {
    console.error('[ChatGPT calculate-dscr] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
