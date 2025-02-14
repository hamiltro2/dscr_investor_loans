import { NextResponse } from 'next/server';
import axios from 'axios';
import { calculateInvestmentMetrics, type LoanInputs } from '@/lib/calculations';

interface PropertyData {
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: string;
  estimatedRent: number;
  url: string;
}

function calculateMetrics(propertyData: PropertyData, downPaymentPercent: number) {
  const downPayment = propertyData.price * (downPaymentPercent / 100);
  const loanAmount = propertyData.price - downPayment;
  const interestRate = 0.065; // Current market rate, adjust as needed
  
  // Monthly payment calculation
  const monthlyRate = interestRate / 12;
  const numberOfPayments = 30 * 12; // 30-year fixed
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Operating expenses
  const propertyTax = propertyData.price * 0.012 / 12; // 1.2% annual rate
  const insurance = 1200 / 12; // $1200 annual insurance
  const maintenance = propertyData.squareFeet * 1.5 / 12; // $1.50 per sqft annually
  const vacancy = propertyData.estimatedRent * 0.05; // 5% vacancy rate
  const propertyManagement = propertyData.estimatedRent * 0.08; // 8% property management fee

  const monthlyExpenses = propertyTax + insurance + maintenance + vacancy + propertyManagement;
  const monthlyCashFlow = propertyData.estimatedRent - monthlyPayment - monthlyExpenses;
  
  const annualNOI = (propertyData.estimatedRent - monthlyExpenses) * 12;
  const capRate = (annualNOI / propertyData.price) * 100;
  const cashOnCashReturn = (monthlyCashFlow * 12 / downPayment) * 100;
  const dscr = propertyData.estimatedRent / (monthlyPayment + monthlyExpenses);

  return {
    downPayment,
    loanAmount,
    monthlyPayment,
    monthlyExpenses,
    monthlyCashFlow,
    annualNOI,
    capRate,
    cashOnCashReturn,
    dscr
  };
}

export async function POST(req: Request) {
  try {
    const { propertyData } = await req.json();
    console.log('Received property data:', propertyData);
    
    if (!propertyData || !propertyData.price) {
      throw new Error('Invalid property data received');
    }
    
    // Calculate metrics for different down payment scenarios
    const scenarios = [20, 25, 30].map(downPaymentPercent => {
      console.log(`Calculating scenario for ${downPaymentPercent}% down payment`);
      const metrics = calculateMetrics(propertyData, downPaymentPercent);
      console.log(`Metrics for ${downPaymentPercent}%:`, metrics);
      return {
        downPaymentPercent,
        ...metrics
      };
    });

    // Find the best scenario based on DSCR >= 1.25 and minimum down payment
    const viableScenarios = scenarios.filter(s => s.dscr >= 1.25);
    const bestScenario = viableScenarios.length > 0 
      ? viableScenarios[0] 
      : scenarios[scenarios.length - 1];
    
    console.log('Best scenario:', bestScenario);

    const prompt = `As Capital Bridge Solutions' AI Investment Analyzer, provide a detailed investment analysis report:

Property Details:
- Address: ${propertyData.address}
- Price: $${propertyData.price.toLocaleString()}
- Monthly Rent: $${propertyData.estimatedRent.toLocaleString()}
- Best Scenario:
  * Down Payment: ${bestScenario.downPaymentPercent}% ($${bestScenario.downPayment.toLocaleString()})
  * Monthly Cash Flow: $${bestScenario.monthlyCashFlow.toLocaleString()}
  * Cap Rate: ${bestScenario.capRate.toFixed(2)}%
  * DSCR: ${bestScenario.dscr.toFixed(2)}

Format your response using bold uppercase text for main sections and subsections. For example:

**OVERALL INVESTMENT RECOMMENDATION**
[1-2 paragraphs explaining whether to BUY, SELL, or HOLD and why. Mention that Capital Bridge Solutions can help structure the optimal financing solution.]

**KEY METRICS ANALYSIS**
**FINANCIAL PERFORMANCE**
- Cap Rate: [Analysis of the cap rate]
- Cash Flow: [Analysis of the monthly and annual cash flow]
- DSCR: [Analysis of the debt service coverage ratio]

**MARKET ANALYSIS**
- Location: [Analysis of the property location and market conditions]
- Property Type: [Analysis of the property type and its implications]
- Risk Factors: [Discussion of key risk factors]

**NEXT STEPS WITH CAPITAL BRIDGE SOLUTIONS**
**TAKE ACTION NOW**
- Contact Capital Bridge Solutions at (949) 614-6390 to discuss your financing options and get expert guidance on this investment opportunity.
- Fill out our simple form to get pre-approved and receive a custom financing solution tailored to this property.
- Our team will analyze your investment goals and structure the optimal loan terms to maximize your returns.

**VALUE-ADD OPPORTUNITIES**
[2-3 bullet points focusing on how Capital Bridge Solutions can help improve the investment returns]

**RISK MITIGATION**
[2-3 bullet points emphasizing how working with Capital Bridge Solutions can help minimize investment risks]

**READY TO MOVE FORWARD?**
Don't miss out on this investment opportunity. Contact Capital Bridge Solutions now at (949) 614-6390 or fill out our quick form to get started. Our team of experts is ready to help you structure the perfect financing solution for this property.`;

    console.log('Sending prompt to OpenAI API');
    
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API key');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a professional real estate investment analyst. Provide detailed, data-driven analysis of investment properties."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Received response from OpenAI API');
      
      if (!response.data || !response.data.choices || !response.data.choices[0]) {
        throw new Error('Invalid response from OpenAI API');
      }

      const analysis = response.data.choices[0].message.content;

      // Format the response to ensure numbered items are on separate lines
      let formattedResponse = analysis;
      
      // Format numbered lists to use proper numbering and spacing
      formattedResponse = formattedResponse.replace(
        /(\d+)\.\s+([^\n]+)/g,
        '<div class="flex gap-2 mb-2"><span class="font-bold">$1.</span><span>$2</span></div>'
      );
      
      // Format bullet points
      formattedResponse = formattedResponse.replace(
        /^-\s+(.+)$/gm,
        '<li class="ml-8 mb-2">$1</li>'
      );
      
      // Format section headers (bold uppercase)
      formattedResponse = formattedResponse.replace(
        /\*\*([^*]+)\*\*/g,
        '<h4 class="text-lg font-bold uppercase mb-3">$1</h4>'
      );
      
      // Ensure consistent spacing between sections
      formattedResponse = formattedResponse.replace(/\n{3,}/g, '\n\n');

      return NextResponse.json({
        analysis: formattedResponse,
        scenarios: scenarios,
        bestScenario: bestScenario
      });
    } catch (apiError: any) {
      console.error('OpenAI API error:', apiError.response?.data || apiError);
      throw new Error(
        'Failed to generate analysis: ' + 
        (apiError.response?.data?.error?.message || apiError.message || 'Unknown API error')
      );
    }
  } catch (error) {
    console.error('Analysis generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate analysis: ' + 
          (error instanceof Error ? error.message : 'Unknown error'),
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
