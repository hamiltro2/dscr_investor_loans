import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const clientId = process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_CORELOGIC_API_URL;
    const tokenUrl = `${baseUrl}/oauth/token`;

    console.log('CoreLogic credentials:', {
      clientId,
      clientSecret: clientSecret ? '***' : undefined,
      tokenUrl
    });

    if (!clientId || !clientSecret) {
      console.error('Missing CoreLogic credentials');
      return NextResponse.json(
        { error: 'CoreLogic credentials not configured' },
        { status: 500 }
      );
    }

    // Create form data with all required parameters
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');

    console.log('Making token request to:', tokenUrl);
    console.log('Request headers:', {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Basic <redacted>'
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: formData
    });

    const responseText = await response.text();
    console.log('Raw token response:', responseText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error('Token request failed:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText
      });

      // Try to parse the error response
      try {
        const errorData = JSON.parse(responseText);
        console.log('Parsed error response:', errorData);
      } catch (e) {
        console.log('Could not parse error response');
      }

      return NextResponse.json(
        { error: `Token request failed: ${response.status} ${responseText}` },
        { status: response.status }
      );
    }

    try {
      const data = JSON.parse(responseText);
      console.log('Token request successful');
      return NextResponse.json(data);
    } catch (error) {
      console.error('Failed to parse token response:', error);
      return NextResponse.json(
        { error: 'Failed to parse token response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Token request error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
