/**
 * Perplexity Search API for Voice Chat
 * Real-time market and property data search
 */

import { NextRequest, NextResponse } from 'next/server';
import { perplexitySearch } from '@/lib/perplexity';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const result = await perplexitySearch({ query: String(query) });
    const answer =
      result.snippets.length > 0
        ? result.snippets.map((s) => `${s.title}: ${s.text}`).join('\n\n')
        : 'No public property or market records found for that query.';

    return NextResponse.json({
      ...result,
      answer,
      sources: result.snippets.map((s) => s.url),
    });
  } catch (error) {
    console.error('[Perplexity Search] Error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
