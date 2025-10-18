/**
 * Knowledge Base Search API for Voice Chat
 * Simple endpoint for searching the knowledge base
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase } from '@/lib/knowledge-base';

export async function POST(req: NextRequest) {
  try {
    const { query, topK = 3 } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const results = await searchKnowledgeBase(query, topK);

    return NextResponse.json({ results });
  } catch (error) {
    console.error('[Knowledge Search] Error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
