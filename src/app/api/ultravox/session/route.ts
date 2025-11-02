/**
 * Ultravox Session API
 * Creates Ultravox voice call sessions with Cap's configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCapSystemPrompt, getCapGreeting } from '@/lib/ultravox/prompts';
import { getCapTools } from '@/lib/ultravox/tools';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ULTRAVOX_API_KEY;
    
    if (!apiKey) {
      console.error('[Ultravox Session] ULTRAVOX_API_KEY not configured');
      console.error('[Ultravox Session] Please add ULTRAVOX_API_KEY to your .env.local file');
      console.error('[Ultravox Session] Get your API key from: https://ultravox.ai/dashboard');
      return NextResponse.json(
        { 
          error: 'Ultravox API key not configured',
          solution: 'Add ULTRAVOX_API_KEY to .env.local file',
          docs: 'https://docs.ultravox.ai/getting-started'
        },
        { status: 500 }
      );
    }

    // Get base URL for tool callbacks
    // In production, use NEXT_PUBLIC_BASE_URL or auto-detect from headers
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('host')}`;

    console.log('[Ultravox Session] Creating session with base URL:', baseUrl);

    // Check if we're in development (localhost)
    const isDevelopment = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
    
    // Force production mode if NEXT_PUBLIC_BASE_URL is explicitly set
    const isProduction = !isDevelopment || process.env.NEXT_PUBLIC_BASE_URL !== undefined;
    
    // Prepare request body
    const requestBody: any = {
      systemPrompt: getCapSystemPrompt(),
      temperature: 0.7,
      voice: 'Mark',
      model: 'fixie-ai/ultravox-70B',
      languageHint: 'en',
      
      // Initial greeting (Ultravox uses "agent" role, not "assistant")
      firstSpeaker: 'FIRST_SPEAKER_AGENT', // Agent speaks first
      
      // Recording & transcription
      recordingEnabled: true,
      
      // Medium parameters
      medium: {
        serverWebSocket: {
          inputSampleRate: 24000,
          outputSampleRate: 24000,
        },
      },
    };

    // Tool configuration - Enable tools in production
    if (isProduction) {
      // Production: All tools enabled (HTTPS required)
      requestBody.selectedTools = getCapTools(baseUrl);
      console.log('[Ultravox Session] ✅ All tools enabled (HTTPS mode)');
      console.log('[Ultravox Session] Lead capture will save to database & send emails');
    } else {
      // Local development without HTTPS
      console.log('[Ultravox Session] ⚠️  Tools disabled - localhost requires ngrok for HTTPS');
      console.log('[Ultravox Session] Set NEXT_PUBLIC_BASE_URL or deploy to production');
    }

    console.log('[Ultravox Session] Request:', JSON.stringify(requestBody, null, 2));

    // Create Ultravox call session
    const response = await fetch('https://api.ultravox.ai/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Ultravox Session] API error:', response.status, error);
      return NextResponse.json(
        {
          error: 'Failed to create Ultravox session',
          details: error,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const session = await response.json();
    console.log('[Ultravox Session] Created:', session.callId);

    return NextResponse.json({
      callId: session.callId,
      joinUrl: session.joinUrl,
      // Return WebSocket URL for client connection
      websocketUrl: session.websocketUrl || session.joinUrl,
    });

  } catch (error) {
    console.error('[Ultravox Session] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check session status
export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.ULTRAVOX_API_KEY;
    const searchParams = req.nextUrl.searchParams;
    const callId = searchParams.get('callId');

    if (!callId) {
      return NextResponse.json(
        { error: 'callId parameter required' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Ultravox API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.ultravox.ai/api/calls/${callId}`, {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: 'Failed to get call status', details: error },
        { status: response.status }
      );
    }

    const callStatus = await response.json();
    return NextResponse.json(callStatus);

  } catch (error) {
    console.error('[Ultravox Session GET] Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get session status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
