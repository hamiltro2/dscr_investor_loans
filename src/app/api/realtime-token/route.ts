// Backend endpoint to generate ephemeral OpenAI Realtime API token
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔑 Generating ephemeral client secret for Realtime GA API...');
    
    // MUST use /v1/realtime/client_secrets for GA API (not /sessions which is beta)
    // Note: client_secrets endpoint does NOT accept model parameter!
    // Model must be specified in WebSocket URL and session.update
    const response = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI Realtime API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate token', details: error }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Client secret created successfully');
    console.log('Response structure:', JSON.stringify(data, null, 2));
    
    // client_secrets endpoint returns: { value: "ek_...", expires_at: timestamp }
    // (different from sessions endpoint which wraps it in client_secret object)
    const token = data.value || data.client_secret?.value;
    const expiresAt = data.expires_at || data.client_secret?.expires_at;
    
    if (!token) {
      console.error('No token in response:', data);
      return NextResponse.json(
        { error: 'No token in response', details: data },
        { status: 500 }
      );
    }
    
    console.log('Token (first 20 chars):', token.substring(0, 20) + '...');
    console.log('Expires at:', new Date(expiresAt * 1000).toISOString());
    
    return NextResponse.json({
      token,
      expires_at: expiresAt,
      session_id: data.id || 'no_session_id'
    });
  } catch (error) {
    console.error('Error generating realtime token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' }, 
      { status: 500 }
    );
  }
}

// Optional: Add rate limiting to prevent abuse
export const runtime = 'edge'; // Use edge runtime for faster responses
