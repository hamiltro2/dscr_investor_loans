import { OpenAI } from 'openai';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for property analysis
const PROPERTY_ANALYSIS_PROMPT = `
You are an expert real estate investment analyst specializing in DSCR loans for investors.
Analyze the property data and provide a detailed investment analysis.
Focus on key metrics, risks, and opportunities.
Format your response in markdown with clear sections.
`;

// System prompt for market analysis
const MARKET_ANALYSIS_PROMPT = `
You are an expert real estate market analyst with deep knowledge of local markets.
Analyze the location data and provide insights on market trends, demographics, and growth potential.
Format your response in markdown with clear sections.
`;

// System prompt for investment strategy
const INVESTMENT_STRATEGY_PROMPT = `
You are an expert real estate investment strategist specializing in DSCR loans.
Based on the property and financial data, recommend optimal investment strategies.
Consider hold periods, exit strategies, and value-add opportunities.
Format your response in markdown with clear sections.
`;

/**
 * Generate a property analysis using OpenAI
 */
export async function analyzeProperty(propertyData: any): Promise<string> {
  const prompt = `
Analyze this investment property:

${JSON.stringify(propertyData, null, 2)}

Provide a detailed analysis including:
1. Property overview
2. Financial analysis
3. Strengths and weaknesses
4. Recommendations
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: PROPERTY_ANALYSIS_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

/**
 * Generate a market analysis using OpenAI
 */
export async function analyzeMarket(locationData: any): Promise<string> {
  const prompt = `
Analyze this real estate market:

${JSON.stringify(locationData, null, 2)}

Provide a detailed market analysis including:
1. Market overview
2. Current trends
3. Future outlook
4. Investment opportunities
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: MARKET_ANALYSIS_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 2000,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

/**
 * Format markdown response for display
 */
export function formatMarkdownResponse(markdown: string): string {
  if (!markdown) return '';
  
  return markdown
    // Format headings
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2">$1</h3>')
    // Format lists
    .replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc mb-1">$1</li>')
    .replace(/^- (.*$)/gm, '<li class="ml-6 list-disc mb-1">$1</li>')
    .replace(/^[0-9]+\. (.*$)/gm, '<li class="ml-6 list-decimal mb-1">$1</li>')
    // Format paragraphs
    .replace(/^(?!<h|<li)(.*$)/gm, '<p class="mb-4">$1</p>')
    // Format horizontal rules
    .replace(/---/g, '<hr class="my-6 border-t border-gray-300">')
    // Add container styling
    .replace(/^(.*)$/gm, '<div class="p-4 font-sans text-gray-800 leading-relaxed">$1</div>');
}
