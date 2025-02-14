import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const clientId = process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_SECRET;
    const tokenUrl = 'https://api-uat.corelogic.com/oauth/token';

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
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    console.log('Making token request to:', tokenUrl);

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      body: formData
    });

    const responseText = await response.text();
    console.log('Raw token response:', responseText);

    if (!response.ok) {
      console.error('Token request failed:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText
      });
      return NextResponse.json(
        { error: `Token request failed: ${response.status} ${responseText}` },
        { status: response.status }
      );
    }

    try {
      const data = JSON.parse(responseText);
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
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
