import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert real estate investment advisor with deep knowledge of DSCR loans, rental properties, and investment strategies. Provide clear, actionable advice with specific numbers and calculations when relevant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
    });

    const answer = completion.choices[0].message.content;

    if (!answer) {
      return NextResponse.json({ error: 'Failed to generate answer' }, { status: 500 });
    }

    // Convert markdown to HTML
    const formattedAnswer = answer
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/# (.*?)(\n|$)/g, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/## (.*?)(\n|$)/g, '<h3 class="text-lg font-semibold mb-2">$1</h3>');

    return NextResponse.json({ answer: formattedAnswer });
  } catch (error) {
    console.error('Error processing question:', error);
    return NextResponse.json(
      { error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
