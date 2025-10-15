/**
 * Knowledge Base for Cap's AI
 * RAG (Retrieval Augmented Generation) system using blog content
 */

import OpenAI from 'openai';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Create OpenAI client lazily to allow env vars to load first
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export interface KnowledgeChunk {
  id: string;
  content: string;
  title: string;
  url: string;
  category: string;
  embedding?: number[];
  metadata?: Record<string, any>;
}

export interface SearchResult {
  chunk: KnowledgeChunk;
  similarity: number;
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search knowledge base for relevant content
 */
export async function searchKnowledgeBase(
  query: string,
  topK: number = 3
): Promise<SearchResult[]> {
  try {
    // Load knowledge base
    const knowledgeBasePath = join(process.cwd(), 'knowledge-base.json');
    
    if (!existsSync(knowledgeBasePath)) {
      console.warn('Knowledge base not found. Run: npm run build:knowledge');
      return [];
    }
    
    const knowledgeBase: KnowledgeChunk[] = JSON.parse(
      readFileSync(knowledgeBasePath, 'utf-8')
    );
    
    // Generate embedding for query
    const client = getOpenAIClient();
    const embeddingResponse = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });
    
    const queryEmbedding = embeddingResponse.data[0].embedding;
    
    // Calculate similarities
    const results: SearchResult[] = knowledgeBase
      .filter(chunk => chunk.embedding && chunk.embedding.length > 0)
      .map(chunk => ({
        chunk,
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding!),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
    
    return results;
  } catch (error) {
    console.error('Knowledge base search error:', error);
    return [];
  }
}

/**
 * Format search results for Cap's context
 */
export function formatKnowledgeResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return 'No relevant information found in knowledge base.';
  }
  
  let formatted = '📚 **From Capital Bridge Solutions Knowledge Base:**\n\n';
  
  results.forEach((result, index) => {
    formatted += `${index + 1}. **${result.chunk.title}**\n`;
    formatted += `${result.chunk.content}\n`;
    formatted += `Source: ${result.chunk.url}\n`;
    formatted += `Relevance: ${(result.similarity * 100).toFixed(1)}%\n\n`;
  });
  
  return formatted;
}

/**
 * Blog content definitions for indexing
 */
export const BLOG_ARTICLES = [
  {
    slug: 'dscr-loan-620-credit-score',
    title: 'DSCR Loans with 620 Credit Score',
    category: 'Credit Requirements',
    keywords: ['620 credit', 'bad credit', 'low credit score', 'minimum credit'],
  },
  {
    slug: 'airbnb-dscr-loans-california',
    title: 'Airbnb DSCR Loans in California',
    category: 'Property Types',
    keywords: ['Airbnb', 'short-term rental', 'STR', 'vacation rental'],
  },
  {
    slug: 'no-tax-return-investment-property-loans',
    title: 'No Tax Return Investment Property Loans',
    category: 'Documentation',
    keywords: ['no tax returns', 'self-employed', 'no income verification'],
  },
  {
    slug: 'dscr-loan-calculator-california',
    title: 'DSCR Loan Calculator',
    category: 'Tools & Calculators',
    keywords: ['calculator', 'DSCR ratio', 'cash flow', 'qualification'],
  },
  {
    slug: 'dscr-loan-rates-california-2025',
    title: 'DSCR Loan Rates 2025',
    category: 'Rates & Terms',
    keywords: ['rates', 'interest rates', '2025', 'current rates'],
  },
  {
    slug: 'dscr-loan-requirements-california-2025',
    title: 'DSCR Loan Requirements',
    category: 'Qualification',
    keywords: ['requirements', 'qualify', 'eligibility', 'criteria'],
  },
  {
    slug: 'dscr-vs-hard-money-loans',
    title: 'DSCR vs Hard Money Loans',
    category: 'Comparisons',
    keywords: ['hard money', 'comparison', 'difference', 'vs'],
  },
  {
    slug: 'fix-and-flip-dscr-loans-california',
    title: 'Fix and Flip DSCR Loans',
    category: 'Investment Strategies',
    keywords: ['fix and flip', 'rehab', 'renovation', 'flipping'],
  },
  {
    slug: 'how-to-qualify-for-dscr-loan',
    title: 'How to Qualify for DSCR Loan',
    category: 'Qualification',
    keywords: ['qualify', 'requirements', 'how to', 'steps'],
  },
  {
    slug: 'dscr-loans-self-employed-california',
    title: 'DSCR Loans for Self-Employed',
    category: 'Borrower Types',
    keywords: ['self-employed', 'business owner', '1099', 'entrepreneur'],
  },
  {
    slug: 'dscr-loans-texas',
    title: 'DSCR Loans in Texas',
    category: 'State Guides',
    keywords: ['Texas', 'TX', 'Houston', 'Dallas', 'Austin'],
  },
  {
    slug: 'dscr-loans-florida',
    title: 'DSCR Loans in Florida',
    category: 'State Guides',
    keywords: ['Florida', 'FL', 'Miami', 'Tampa', 'Orlando'],
  },
  {
    slug: 'dscr-loans-arizona',
    title: 'DSCR Loans in Arizona',
    category: 'State Guides',
    keywords: ['Arizona', 'AZ', 'Phoenix', 'Scottsdale', 'Tucson'],
  },
  {
    slug: 'dscr-loans-georgia',
    title: 'DSCR Loans in Georgia',
    category: 'State Guides',
    keywords: ['Georgia', 'GA', 'Atlanta', 'Savannah'],
  },
  {
    slug: 'dscr-loans-nevada',
    title: 'DSCR Loans in Nevada',
    category: 'State Guides',
    keywords: ['Nevada', 'NV', 'Las Vegas', 'Reno'],
  },
  {
    slug: 'dscr-loans-multi-family',
    title: 'Multi-Family DSCR Loans',
    category: 'Property Types',
    keywords: ['multi-family', 'multifamily', 'duplex', 'triplex', 'fourplex'],
  },
  {
    slug: 'dscr-vs-conventional-loans',
    title: 'DSCR vs Conventional Loans',
    category: 'Comparisons',
    keywords: ['conventional', 'traditional', 'comparison', 'difference'],
  },
  {
    slug: 'dscr-loan-refinancing',
    title: 'DSCR Loan Refinancing',
    category: 'Refinancing',
    keywords: ['refinance', 'refi', 'cash-out', 'rate and term'],
  },
  {
    slug: 'portfolio-dscr-loans',
    title: 'Portfolio DSCR Loans',
    category: 'Advanced Topics',
    keywords: ['portfolio', 'multiple properties', 'bulk', 'package'],
  },
  {
    slug: 'dscr-loans-foreign-investors',
    title: 'DSCR Loans for Foreign Investors',
    category: 'Borrower Types',
    keywords: ['foreign national', 'international', 'non-US citizen', 'ITIN'],
  },
  {
    slug: 'dscr-loan-predictions-2025',
    title: 'DSCR Loan Market Predictions 2025',
    category: 'Market Insights',
    keywords: ['2025', 'predictions', 'forecast', 'trends', 'outlook'],
  },
  {
    slug: 'dscr-loan-tax-benefits',
    title: 'DSCR Loan Tax Benefits',
    category: 'Tax & Finance',
    keywords: ['tax benefits', 'deductions', 'tax advantages', 'IRS'],
  },
  {
    slug: 'dscr-loans-market-downturn',
    title: 'DSCR Loans During Market Downturn',
    category: 'Market Insights',
    keywords: ['market downturn', 'recession', 'economic', 'crisis'],
  },
  {
    slug: 'case-study-first-time-investor-620-credit',
    title: 'Case Study: First-Time Investor with 620 Credit',
    category: 'Case Studies',
    keywords: ['case study', 'success story', 'example', 'real case'],
  },
  {
    slug: 'case-study-10-property-portfolio',
    title: 'Case Study: Building a 10-Property Portfolio',
    category: 'Case Studies',
    keywords: ['portfolio case study', '10 properties', 'scaling'],
  },
];
