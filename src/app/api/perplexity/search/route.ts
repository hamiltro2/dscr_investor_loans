/**
 * Perplexity Search API
 * Server-side endpoint for property/market enrichment
 */

import { NextRequest, NextResponse } from 'next/server';
import { perplexitySearch } from '@/lib/perplexity';
import { PerplexityQuerySchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const params = PerplexityQuerySchema.parse(body);
    
    // Search
    const result = await perplexitySearch(params);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('[Perplexity API] Error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
