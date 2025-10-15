/**
 * OpenAI Realtime API Session Token Endpoint
 * 
 * Generates ephemeral session tokens for client-side Realtime API connections.
 * 
 * Security:
 * - API key stays server-side (never exposed to client)
 * - Tokens are short-lived (default 60 seconds)
 * - Rate limiting recommended for production
 * 
 * @see https://platform.openai.com/docs/guides/realtime#ephemeral-tokens
 */

import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TOKEN_EXPIRY_SECONDS = 60;

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // ========================================================================
    // Validation
    // ========================================================================

    if (!OPENAI_API_KEY) {
      console.error('[Realtime Session] Missing OPENAI_API_KEY');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // TODO: Add authentication check here
    // Verify user is logged in or has permission to use realtime API
    // Example:
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // ========================================================================
    // Generate Ephemeral Token
    // ========================================================================

    console.log('[Realtime Session] Generating ephemeral token...');

    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview-2024-10-01',
        voice: 'echo',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Realtime Session] OpenAI API error:', response.status, errorText);
      
      return NextResponse.json(
        { 
          error: 'Failed to create session',
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log('[Realtime Session] Token generated successfully');
    console.log('[Realtime Session] Session ID:', data.id);
    console.log('[Realtime Session] Expires in:', TOKEN_EXPIRY_SECONDS, 'seconds');

    // ========================================================================
    // Return Token
    // ========================================================================

    return NextResponse.json({
      token: data.client_secret.value,
      sessionId: data.id,
      expiresAt: data.client_secret.expires_at,
    });

  } catch (error: any) {
    console.error('[Realtime Session] Unexpected error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for token refresh
export async function GET(req: Request) {
  return POST(req); // Reuse POST logic
}
