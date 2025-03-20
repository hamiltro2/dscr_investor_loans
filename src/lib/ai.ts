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
  
  // First, clean up duplicate paragraphs that appear in sequence
  let cleanedMarkdown = markdown;
  
  // Handle numbered items with duplicated text in the next line
  // This pattern matches a numbered item followed by the same text on the next line
  const numberedItemDuplicatePattern = /^(\d+)\.\s+(.*?)(?:\.\.|\.)\s*\n\2\.?$/gm;
  cleanedMarkdown = cleanedMarkdown.replace(numberedItemDuplicatePattern, '$1. $2.');
  
  // Handle numbered items followed by the same title as a heading
  const numberedTitleDuplicatePattern = /^(\d+)\.\s+(.*?)(?:\.\.|\.)\s*\n(.*?)\n/gm;
  cleanedMarkdown = cleanedMarkdown.replace(numberedTitleDuplicatePattern, (match, number, title, nextLine) => {
    // Check if the next line is the same as the title (ignoring punctuation)
    const cleanTitle = title.replace(/[:.]/g, '').trim();
    const cleanNextLine = nextLine.replace(/[:.]/g, '').trim();
    
    if (cleanTitle === cleanNextLine) {
      return `${number}. ${title}\n`;
    }
    return match;
  });
  
  // Handle non-numbered paragraphs with duplicated text in the next line
  const paragraphDuplicatePattern = /^([^<\n#\d\s][^\n]*?)(?:\.\.|\.)\s*\n\1\.?$/gm;
  cleanedMarkdown = cleanedMarkdown.replace(paragraphDuplicatePattern, '$1.');
  
  // Handle more complex patterns with formulas between duplicates
  const formulaWithDuplicatePattern = /^(\d+)\.\s+(.*?)(?:\.\.|\.)\s*\n(.*?\\\s*\n)\2\.?$/gm;
  cleanedMarkdown = cleanedMarkdown.replace(formulaWithDuplicatePattern, '$1. $2.\n$3');
  
  // Handle section titles followed by duplicate items
  const sectionWithDuplicatesPattern = /^([A-Z][^\n:]+):\s*\n((?:\d+\. .*\n)+)/gm;
  cleanedMarkdown = cleanedMarkdown.replace(sectionWithDuplicatesPattern, (match, title, items) => {
    // Process the items to remove duplicates
    const processedItems = items.replace(/^(\d+)\. (.*?)(?:\.\.?)?\s*\n\2\.?$/gm, '$1. $2.\n');
    return `${title}:\n${processedItems}`;
  });
  
  // Handle numbered items with full duplicate paragraph after them
  const numberedItemFullDuplicatePattern = /^(\d+)\.\s+(.*?)(?:\.\.|\.)\s*\n([\s\S]*?)\n\n(.*?):\s+([\s\S]*?)\n/gm;
  cleanedMarkdown = cleanedMarkdown.replace(numberedItemFullDuplicatePattern, (match, number, title, description, calcTitle, formula) => {
    // Check if description is a duplicate of title
    if (description.trim() === title.trim() || description.includes(title.trim())) {
      return `${number}. ${title}.\n\n${calcTitle}: ${formula}\n`;
    }
    return match;
  });
  
  // Handle specific pattern of numbered item followed by duplicate paragraph and calculation
  const specificDuplicatePattern = /^(\d+)\.\s+(.*?)(?:\.\.|\.)\s*\n(.*?)(?:\.\.|\.)\s*\n(Calculation:.*)$/gm;
  cleanedMarkdown = cleanedMarkdown.replace(specificDuplicatePattern, (match, number, title, duplicate, calculation) => {
    // Check if duplicate is similar to title (allowing for minor differences)
    if (duplicate.includes(title.substring(0, Math.min(title.length, 30))) || 
        title.includes(duplicate.substring(0, Math.min(duplicate.length, 30)))) {
      return `${number}. ${title}.\n${calculation}`;
    }
    return match;
  });
  
  // Fix LaTeX formulas with backslashes at the end
  cleanedMarkdown = cleanedMarkdown.replace(/\\(\s*)$/gm, '');
  
  // Fix LaTeX formulas with \[ \] delimiters
  cleanedMarkdown = cleanedMarkdown.replace(/\\[\s\n]*\[\s*\n*([\s\S]*?)\s*\n*\\[\s\n]*\]/g, '<div class="my-4 p-3 bg-gray-700 rounded-md text-center text-green-300" style="font-family: inherit;">$1</div>');
  
  // Fix bullet points with newlines
  cleanedMarkdown = cleanedMarkdown.replace(/•\s*\n+/g, '• ');
  
  // Handle LaTeX formulas with fractions
  cleanedMarkdown = cleanedMarkdown.replace(/\\frac{(.*?)}{(.*?)}/g, '($1)/($2)');
  cleanedMarkdown = cleanedMarkdown.replace(/\\[(.*?)\\]/g, '$1');
  cleanedMarkdown = cleanedMarkdown.replace(/\\\((.*?)\\\)/g, '$1');
  cleanedMarkdown = cleanedMarkdown.replace(/\\approx/g, '≈');
  
  // Format dollar amounts in formulas consistently
  cleanedMarkdown = cleanedMarkdown.replace(/\$([0-9,]+)/g, '$$$1');
  
  // Handle numbered lists with sub-items
  cleanedMarkdown = cleanedMarkdown.replace(/^(\d+)\.\s+(.*?)$/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-amber-500 mr-2">$1.</span><span>$2</span></li>');
  cleanedMarkdown = cleanedMarkdown.replace(/^([a-z])\.\s+(.*?)$/gm, '<li class="ml-12 mb-2 flex items-start"><span class="text-blue-500 mr-2">$1.</span><span>$2</span></li>');
  
  // Process the entire document to find and remove duplicates
  const lines = cleanedMarkdown.split('\n');
  const processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    // Add the current line
    processedLines.push(lines[i]);
    
    // Check if the next line is a duplicate of the current line
    if (i < lines.length - 1) {
      const currentLine = lines[i].replace(/\.\.$/, '.').replace(/\.$/, '');
      const nextLine = lines[i + 1].replace(/\.$/, '');
      
      // If next line is a duplicate, skip it
      if (currentLine === nextLine || currentLine.includes(nextLine) || nextLine.includes(currentLine)) {
        i++; // Skip the next line
      }
    }
  }
  
  // Join the processed lines back together
  cleanedMarkdown = processedLines.join('\n');
  
  return cleanedMarkdown
    // Format headings with colored titles
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-blue-500">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3 text-green-500">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mb-2 text-amber-500">$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4 class="text-md font-bold mb-2 text-purple-500">$1</h4>')
    // Format section titles
    .replace(/^([A-Z][^\n:]+):\s*$/gm, '<h3 class="text-lg font-bold mb-2 text-amber-500">$1</h3>')
    // Remove hashtags from inline text
    .replace(/(\s|^)#(\w+)/g, '$1$2')
    // Format bold text with blue color
    .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-blue-400">$1</span>')
    // Format lists with colored bullets
    .replace(/^\* (.*$)/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-green-500 mr-2">•</span><span>$1</span></li>')
    .replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-blue-500 mr-2">•</span><span>$1</span></li>')
    .replace(/^[0-9]+\. (.*$)/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-amber-500 mr-2">$&.</span><span>$1</span></li>')
    // Format bullet points in text
    .replace(/^• (.*$)/gm, '<li class="ml-6 mb-2 flex items-start"><span class="text-green-500 mr-2">•</span><span>$1</span></li>')
    // Format mathematical formulas - use code blocks instead of LaTeX
    .replace(/```\n?([\s\S]*?)\n?```/g, '<div class="my-4 p-3 bg-gray-700 rounded-md text-green-300" style="font-family: inherit;">$1</div>')
    // Handle complex LaTeX formulas and convert to simple format
    .replace(/\\left\((.*?)\\right\)/g, '($1)')
    .replace(/\\times/g, '×')
    .replace(/\\div/g, '÷')
    // Handle specific ROI formula pattern
    .replace(/\$1,\s*ROI\s*=\s*\(\((.*?)\\,\s*from\s*,\s*Investment\s*-\s*(.*?)\\,\s*of\s*,\s*Investment\)\)\/\((.*?)\\,\s*of\s*\\,\s*Investment\)\s*\$1,/g, 
      '<div class="my-4 p-3 bg-gray-700 rounded-md text-center text-green-300" style="font-family: inherit;">ROI = (Gain from Investment - Cost of Investment) / (Cost of Investment)</div>')
    // Format inline formulas with parentheses in them (like DSCR formula)
    .replace(/\\[ *(.*?\(.*?\).*?) *\\]/g, '<div class="my-4 p-3 bg-gray-700 rounded-md text-center text-green-300" style="font-family: inherit;">$1</div>')
    .replace(/\[ *(.*?\(.*?\).*?) *\]/g, '<div class="my-4 p-3 bg-gray-700 rounded-md text-center text-green-300" style="font-family: inherit;">$1</div>')
    // Format other inline formulas
    .replace(/\\[ *(.*?) *\\]/g, '<div class="my-4 p-3 bg-gray-700 rounded-md text-center text-green-300" style="font-family: inherit;">$1</div>')
    .replace(/\[ *(.*?) *\]/g, '<div class="my-4 p-3 bg-gray-700 rounded-md text-center text-green-300" style="font-family: inherit;">$1</div>')
    // Fix common LaTeX errors
    .replace(/\\text{(.*?)}/g, '$1')
    .replace(/text{(.*?)}/g, '$1')
    .replace(/frac{/g, '\\frac{')
    .replace(/\\( *(.*?) *\\)/g, '<span class="text-green-300">$1</span>')
    // Format dollar amounts in formulas
    .replace(/\$([0-9,]+)/g, '<span class="text-green-300">$$$1</span>')
    // Format paragraphs with better spacing
    .replace(/^(?!<h|<li|<span|<div)(.*$)/gm, '<p class="mb-4">$1</p>')
    // Format conclusion section
    .replace(/^(Conclusion)$/gm, '<h3 class="text-lg font-bold mb-2 text-amber-500">Conclusion</h3>')
    // Format horizontal rules
    .replace(/---/g, '<hr class="my-6 border-t border-gray-600">')
    // Add container styling with Arial font
    .replace(/[\s\S]*/g, '<div class="p-4 font-arial text-gray-200 leading-relaxed" style="font-family: Arial, sans-serif;">$&</div>');
}

/**
 * Get AI response for a question about real estate investing
 */
export async function getAIResponse(
  prompt: string, 
  systemPrompt: string
): Promise<{ content: string; provider: string }> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 2000,
    });

    return { 
      content: completion.choices[0].message.content || '', 
      provider: 'OpenAI'
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

/**
 * Format AI response for display
 */
export function formatAIResponse(response: string): string {
  return formatMarkdownResponse(response);
}
