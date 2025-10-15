/**
 * Knowledge Base Search API
 * For Custom GPT Actions - allows ChatGPT to search our knowledge base
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase } from '@/lib/knowledge-base';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, topK = 3 } = body;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }
    
    // Search knowledge base
    const results = await searchKnowledgeBase(query, topK);
    
    // Format results for Custom GPT
    const formattedResults = results.map(result => ({
      title: result.chunk.title,
      content: result.chunk.content,
      url: result.chunk.url,
      category: result.chunk.category,
      relevance: Math.round(result.similarity * 100), // Convert to percentage
    }));
    
    return NextResponse.json({
      results: formattedResults,
      query,
      totalResults: formattedResults.length,
    });
    
  } catch (error) {
    console.error('[Knowledge Search] Error:', error);
    return NextResponse.json(
      { error: 'Failed to search knowledge base' },
      { status: 500 }
    );
  }
}

// Optional: Allow GET for testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const topK = parseInt(searchParams.get('topK') || '3');
  
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const results = await searchKnowledgeBase(query, topK);
    
    const formattedResults = results.map(result => ({
      title: result.chunk.title,
      content: result.chunk.content,
      url: result.chunk.url,
      category: result.chunk.category,
      relevance: Math.round(result.similarity * 100),
    }));
    
    return NextResponse.json({
      results: formattedResults,
      query,
      totalResults: formattedResults.length,
    });
    
  } catch (error) {
    console.error('[Knowledge Search] Error:', error);
    return NextResponse.json(
      { error: 'Failed to search knowledge base' },
      { status: 500 }
    );
  }
}
