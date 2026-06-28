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
    slug: 'best-lenders-self-employed-bad-credit',
    title: 'Best Lenders for Self-Employed with Bad Credit',
    category: 'Credit Requirements',
    keywords: ['bad credit', 'self employed', 'credit score', '580', '600', '620'],
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
    slug: 'dscr-loan-rates-california-2026',
    title: 'DSCR Loan Rates 2026',
    category: 'Rates & Terms',
    keywords: ['rates', 'interest rates', '2026', 'current rates'],
  },
  {
    slug: 'dscr-loan-prepayment-penalties-guide',
    title: 'DSCR Loan Prepayment Penalties Guide',
    category: 'Rates & Terms',
    keywords: ['prepayment penalty', '5-4-3-2-1', 'hard vs soft prepay', 'yield maintenance'],
  },
  {
    slug: 'dscr-loan-requirements-california-2026',
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
    slug: 'section-8-rental-property-financing',
    title: 'Section 8 Rental Property Financing',
    category: 'Property Types',
    keywords: ['Section 8', 'affordable housing', 'guaranteed rent', 'housing choice voucher'],
  },
  {
    slug: 'self-storage-commercial-dscr-financing',
    title: 'Self-Storage & Commercial DSCR Financing',
    category: 'Property Types',
    keywords: ['self-storage', 'car wash', 'commercial DSCR', 'recession proof'],
  },
  {
    slug: 'mixed-use-property-dscr-loans',
    title: 'Mixed-Use Property DSCR Loans',
    category: 'Property Types',
    keywords: ['mixed-use', 'commercial and residential', 'retail', 'apartments'],
  },
  {
    slug: 'dscr-vs-conventional-loans',
    title: 'DSCR vs Conventional Loans',
    category: 'Comparisons',
    keywords: ['conventional', 'traditional', 'comparison', 'difference'],
  },
  {
    slug: 'capital-bridge-vs-kiavi-vs-angeloak',
    title: 'Capital Bridge Solutions vs Kiavi vs AngelOak',
    category: 'Comparisons',
    keywords: ['comparison', 'lenders', 'Kiavi', 'Angel Oak', 'Capital Bridge'],
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
    slug: 'foreign-national-advanced-strategies',
    title: 'Foreign National Real Estate Investing Advanced Strategies',
    category: 'Advanced Topics',
    keywords: ['foreign national', 'ITIN', 'LLC structure', 'tax treaty'],
  },
  {
    slug: 'non-recourse-dscr-loans-guide',
    title: 'Non-Recourse DSCR Loans Guide',
    category: 'Advanced Topics',
    keywords: ['non-recourse', 'bad boy carve-outs', 'deficiency judgment', 'asset protection'],
  },
  {
    slug: 'dscr-loan-predictions-2026',
    title: 'DSCR Loan Market Predictions 2026',
    category: 'Market Insights',
    keywords: ['2026', 'predictions', 'forecast', 'trends', 'outlook'],
  },
  {
    slug: 'dscr-loan-tax-benefits',
    title: 'DSCR Loan Tax Benefits',
    category: 'Tax & Finance',
    keywords: ['tax benefits', 'deductions', 'tax advantages', 'IRS'],
  },
  {
    slug: '1031-exchange-financing-strategies',
    title: '1031 Exchange Financing Strategies',
    category: 'Tax & Finance',
    keywords: ['1031 exchange', 'like kind', 'tax deferral', 'replacement property'],
  },
  {
    slug: 'opportunity-zone-investing-guide',
    title: 'Opportunity Zone Investing Guide',
    category: 'Tax & Finance',
    keywords: ['opportunity zone', 'QOF', 'capital gains tax', 'tax deferral'],
  },
  {
    slug: 'dscr-loans-market-downturn',
    title: 'DSCR Loans During Market Downturn',
    category: 'Market Insights',
    keywords: ['market downturn', 'recession', 'economic', 'crisis'],
  },
  {
    slug: 'creative-financing-strategies',
    title: 'Creative Financing Strategies',
    category: 'Alternative Financing',
    keywords: ['creative financing', 'seller financing', 'subject-to', 'lease option'],
  },
  {
    slug: 'land-acquisition-development-financing',
    title: 'Land Acquisition & Development Financing',
    category: 'Alternative Financing',
    keywords: ['land loan', 'construction loan', 'development', 'ground up'],
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
  {
    slug: 'brrrr-method-financing',
    title: 'BRRRR Method Financing Guide',
    category: 'Investment Strategies',
    keywords: ['BRRRR', 'refinance', 'rehab', 'recycled capital'],
  },
  {
    slug: 'house-hacking-investment-strategies',
    title: 'House Hacking Strategies 2026',
    category: 'Investment Strategies',
    keywords: ['house hack', 'live rent free', 'multifamily house hacking'],
  },
  {
    slug: 'syndication-group-investing-guide',
    title: 'Real Estate Syndication & Group Investing Guide',
    category: 'Investment Strategies',
    keywords: ['syndication', 'group investing', 'GP LP', 'preferred return'],
  },
  {
    slug: 'best-dscr-loan-lenders-california',
    title: 'Best DSCR Loan Lenders California',
    category: 'Lender Reviews',
    keywords: ['best lenders', 'California DSCR', 'lender comparison'],
  },
  {
    slug: 'best-dscr-lenders-2026',
    title: 'Best DSCR Lenders 2026',
    category: 'Lender Reviews',
    keywords: ['top lenders', 'comparison', '2026 lenders'],
  },
  {
    slug: 'best-lenders-self-employed-california',
    title: 'Best Lenders for Self-Employed in California',
    category: 'Lender Reviews',
    keywords: ['self-employed California', 'bank statement mortgage', 'top lenders CA'],
  },
  {
    slug: 'best-lenders-self-employed-reddit',
    title: 'Best Lenders for Self-Employed Reddit Reviews',
    category: 'Lender Reviews',
    keywords: ['Reddit recommendations', 'reviews', 'self-employed feedback'],
  },
  // Location and GEO Landing Pages for A2A Access
  {
    slug: 'california-no-doc-loans',
    title: 'California No-Doc Loans',
    category: 'Location Guides',
    keywords: ['no doc loans California', 'no income verification loans California', 'CA no doc loans', 'no-doc investment loan'],
    customPath: 'src/app/locations/california/no-doc-loans/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/no-doc-loans',
  },
  {
    slug: 'california-dscr-loans',
    title: 'DSCR Loans in California',
    category: 'Location Guides',
    keywords: ['California', 'CA', 'California DSCR loans', 'dscr loan California', 'investment property loans California'],
    customPath: 'src/app/locations/california/dscr-loans/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/dscr-loans',
  },
  {
    slug: 'california-los-angeles',
    title: 'DSCR Loans in Los Angeles',
    category: 'Location Guides',
    keywords: ['Los Angeles', 'LA', 'Southern California', 'SoCal', 'dscr loans LA', 'investment property loans Los Angeles'],
    customPath: 'src/app/locations/california/los-angeles/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/los-angeles',
  },
  {
    slug: 'california-san-diego',
    title: 'DSCR Loans in San Diego',
    category: 'Location Guides',
    keywords: ['San Diego', 'SD', 'Southern California', 'dscr loans San Diego', 'investment property loans San Diego'],
    customPath: 'src/app/locations/california/san-diego/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/san-diego',
  },
  {
    slug: 'california-san-francisco',
    title: 'DSCR Loans in San Francisco',
    category: 'Location Guides',
    keywords: ['San Francisco', 'SF', 'Bay Area', 'Northern California', 'NorCal', 'dscr loans San Francisco', 'investment property loans SF'],
    customPath: 'src/app/locations/california/san-francisco/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/san-francisco',
  },
  {
    slug: 'california-orange-county',
    title: 'DSCR Loans in Orange County',
    category: 'Location Guides',
    keywords: ['Orange County', 'OC', 'Irvine', 'Anaheim', 'dscr loans Orange County', 'investment property loans OC'],
    customPath: 'src/app/locations/california/orange-county/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/orange-county',
  },
  {
    slug: 'california-sacramento',
    title: 'DSCR Loans in Sacramento',
    category: 'Location Guides',
    keywords: ['Sacramento', 'Sactown', 'Northern California', 'dscr loans Sacramento', 'investment property loans Sacramento'],
    customPath: 'src/app/locations/california/sacramento/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/sacramento',
  },
  {
    slug: 'california-inland-empire',
    title: 'DSCR Loans in Inland Empire',
    category: 'Location Guides',
    keywords: ['Inland Empire', 'Riverside', 'San Bernardino', 'IE', 'dscr loans Inland Empire', 'investment property loans IE'],
    customPath: 'src/app/locations/california/inland-empire/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/inland-empire',
  },
  {
    slug: 'california-fresno',
    title: 'DSCR Loans in Fresno',
    category: 'Location Guides',
    keywords: ['Fresno', 'Central Valley', 'dscr loans Fresno', 'investment property loans Fresno'],
    customPath: 'src/app/locations/california/fresno/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/fresno',
  },
  {
    slug: 'california-san-jose',
    title: 'DSCR Loans in San Jose',
    category: 'Location Guides',
    keywords: ['San Jose', 'Silicon Valley', 'Bay Area', 'dscr loans San Jose', 'investment property loans San Jose'],
    customPath: 'src/app/locations/california/san-jose/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/san-jose',
  },
  {
    slug: 'california-oakland',
    title: 'DSCR Loans in Oakland',
    category: 'Location Guides',
    keywords: ['Oakland', 'East Bay', 'Bay Area', 'dscr loans Oakland', 'investment property loans Oakland'],
    customPath: 'src/app/locations/california/oakland/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/oakland',
  },
  {
    slug: 'california-long-beach',
    title: 'DSCR Loans in Long Beach',
    category: 'Location Guides',
    keywords: ['Long Beach', 'LB', 'dscr loans Long Beach', 'investment property loans Long Beach'],
    customPath: 'src/app/locations/california/long-beach/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/california/long-beach',
  },
  {
    slug: 'arizona-dscr-loans',
    title: 'DSCR Loans in Arizona',
    category: 'Location Guides',
    keywords: ['Arizona', 'AZ', 'Phoenix', 'Scottsdale', 'Tucson', 'dscr loans Arizona'],
    customPath: 'src/app/locations/arizona/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/arizona',
  },
  {
    slug: 'florida-dscr-loans',
    title: 'DSCR Loans in Florida',
    category: 'Location Guides',
    keywords: ['Florida', 'FL', 'Miami', 'Tampa', 'Orlando', 'dscr loans Florida'],
    customPath: 'src/app/locations/florida/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/florida',
  },
  {
    slug: 'nevada-dscr-loans',
    title: 'DSCR Loans in Nevada',
    category: 'Location Guides',
    keywords: ['Nevada', 'NV', 'Las Vegas', 'Reno', 'dscr loans Nevada'],
    customPath: 'src/app/locations/nevada/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/nevada',
  },
  {
    slug: 'texas-dscr-loans',
    title: 'DSCR Loans in Texas',
    category: 'Location Guides',
    keywords: ['Texas', 'TX', 'Houston', 'Dallas', 'Austin', 'dscr loans Texas'],
    customPath: 'src/app/locations/texas/page.tsx',
    customUrl: 'https://www.capitalbridgesolutions.com/locations/texas',
  },
];
