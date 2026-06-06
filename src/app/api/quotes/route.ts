import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      property_type,
      purchase_price,
      estimated_rent,
      estimated_credit_score,
      state,
      is_short_term_rental,
    } = body ?? {};

    // Validation
    if (!purchase_price || !estimated_rent || !estimated_credit_score) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: purchase_price, estimated_rent, estimated_credit_score',
        },
        { status: 400 }
      );
    }

    // Determine LTV based on credit score
    const credit = Number(estimated_credit_score);
    let ltv = 0.75; // Default LTV
    if (credit >= 720) {
      ltv = 0.80; // Standard max LTV is 80% (up to 85% for purchases under specific terms)
    } else if (credit >= 680) {
      ltv = 0.75;
    } else if (credit >= 620) {
      ltv = 0.70;
    } else {
      ltv = 0.60; // FICO down to 500
    }

    const loanAmount = purchase_price * ltv;

    // Determine Interest Rate based on credit score
    let baseRate = 5.99;
    if (credit >= 720) {
      baseRate = 5.99;
    } else if (credit >= 680) {
      baseRate = 6.49;
    } else if (credit >= 620) {
      baseRate = 6.99;
    } else {
      baseRate = 7.99; // Low FICO portfolio refi
    }

    // Adjust rate for STR
    if (is_short_term_rental) {
      baseRate += 0.25;
    }

    // Estimate monthly PITIA
    // Principal & Interest (30-year fixed)
    const monthlyRate = baseRate / 100 / 12;
    const numPayments = 360;
    const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Tax (CA is 1.06%, rest of US ~1.25% average)
    const annualTaxRate = state === 'CA' ? 0.0106 : 0.0125;
    const monthlyTax = (purchase_price * annualTaxRate) / 12;

    // Insurance (0.35% of value annually)
    const monthlyInsurance = (purchase_price * 0.0035) / 12;

    // HOA and Other expenses
    const monthlyHOA = property_type === 'Condo' ? 150 : 0;
    const monthlyOther = 100; // Maintenance & Management

    const monthlyPITIA = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA + monthlyOther;
    const dscrRatio = estimated_rent / monthlyPITIA;

    // Build the quote data structure
    const quotePayload = {
      property_type: property_type || 'SingleFamily',
      purchase_price,
      estimated_rent,
      estimated_credit_score: credit,
      state: state || 'CA',
      is_short_term_rental: !!is_short_term_rental,
      loan_amount: Math.round(loanAmount),
      estimated_rate: `${baseRate.toFixed(3)}%`,
      loan_to_value: `${Math.round(ltv * 100)}%`,
      dscr_ratio: parseFloat(dscrRatio.toFixed(3)),
    };

    // Encode payload in quote_id
    const encodedPayload = Buffer.from(JSON.stringify(quotePayload)).toString('base64');
    const quoteId = `q_A2A_${encodedPayload}`;

    return NextResponse.json({
      status: 'qualified_conditional',
      quote_id: quoteId,
      estimated_rate: `${baseRate.toFixed(3)}%`,
      loan_to_value: `${Math.round(ltv * 100)}%`,
      requires_w2: false,
      dscr_ratio: parseFloat(dscrRatio.toFixed(3)),
      message: `This property cash-flows exceptionally well (DSCR: ${dscrRatio.toFixed(2)}). To issue an official Pre-Approval Letter and lock this ${baseRate.toFixed(3)}% rate for 48 hours, please provide the borrower's name, email, and mobile phone number.`,
      action_required: {
        type: 'identification_handshake',
        endpoint: 'https://www.capitalbridgesolutions.com/api/quotes/lock',
        required_fields: ['name', 'email', 'phone'],
      },
    });

  } catch (error) {
    console.error('[A2A quotes] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
