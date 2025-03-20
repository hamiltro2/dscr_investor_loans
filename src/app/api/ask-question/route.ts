import { NextResponse } from 'next/server';
import { getAIResponse, formatAIResponse } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { question, propertyContext } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // Create a prompt that includes property context if available
    let prompt = question;
    if (propertyContext) {
      const { address, characteristics, metrics } = propertyContext;
      
      // Safely access nested properties
      const streetAddress = address?.streetAddress || 'N/A';
      const city = address?.city || 'N/A';
      const state = address?.state || 'N/A';
      const bedrooms = characteristics?.bedrooms || 'N/A';
      const bathrooms = characteristics?.bathrooms || 'N/A';
      const squareFeet = characteristics?.squareFeet || 'N/A';
      
      prompt = `
        Context about the property:
        Address: ${streetAddress}, ${city}, ${state}
        Details: ${bedrooms} beds, ${bathrooms} baths, ${squareFeet} sqft
        ${metrics ? `
        Estimated Value: $${metrics.estimatedValue?.toLocaleString() || 'N/A'}
        Monthly Rent: $${metrics.estimatedMonthlyRent?.toLocaleString() || 'N/A'}
        Price per Sqft: $${metrics.pricePerSqFt?.toLocaleString() || 'N/A'}
        Annual Taxes: $${metrics.annualTaxes?.toLocaleString() || 'N/A'}
        ` : ''}

        Question: ${question}

        Please provide a detailed, professional answer focusing on investment analysis and real estate expertise. Format the response in markdown.
      `;
    }

    const systemPrompt = "You are an expert real estate investment advisor with deep knowledge of DSCR loans, rental properties, and investment strategies. Provide clear, actionable advice with specific numbers and calculations when relevant.";

    const { content: answer, provider } = await getAIResponse(prompt, systemPrompt);

    if (!answer) {
      return NextResponse.json({ error: 'Failed to generate answer' }, { status: 500 });
    }

    // Format the response
    const formattedAnswer = formatAIResponse(answer);

    return NextResponse.json({ 
      answer: formattedAnswer,
      provider // Include the provider in the response for monitoring
    });
  } catch (error) {
    console.error('Error processing question:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
