// Gemini Multimodal Live API Session Setup
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Return API key securely for client WebSocket connection
    return NextResponse.json({
      apiKey,
      model: 'gemini-2.5-flash',
      endpoint: 'generativelanguage.googleapis.com'
    });
  } catch (error) {
    console.error('Error getting Gemini session:', error);
    return NextResponse.json(
      { error: 'Failed to initialize Gemini session' },
      { status: 500 }
    );
  }
}
