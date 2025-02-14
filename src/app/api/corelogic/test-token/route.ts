import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientId = process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_SECRET;
    const tokenUrl = 'https://api-uat.corelogic.com/oauth/token';

    // Debug: Log environment variables (masked)
    console.log('Debug - Environment variables:', {
      clientIdExists: !!clientId,
      clientIdLength: clientId?.length,
      clientSecretExists: !!clientSecret,
      clientSecretLength: clientSecret?.length,
      tokenUrl
    });

    if (!clientId || !clientSecret) {
      console.error('Missing CoreLogic credentials');
      return NextResponse.json(
        { 
          error: 'CoreLogic credentials not configured',
          clientIdExists: !!clientId,
          clientSecretExists: !!clientSecret
        },
        { status: 500 }
      );
    }

    // Create URL-encoded form data
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    const requestBody = formData.toString();
    console.log('Debug - Request details:', {
      url: tokenUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: requestBody
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: requestBody
    });

    const responseText = await response.text();
    
    // Debug: Log response details
    console.log('Debug - Response details:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 100) // Show first 100 chars
    });

    if (!response.ok) {
      console.error('Token request failed:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText
      });
      return NextResponse.json(
        { 
          error: `Token request failed: ${response.status} ${responseText}`,
          requestDetails: {
            url: tokenUrl,
            body: requestBody,
            responseStatus: response.status,
            responseHeaders: Object.fromEntries(response.headers.entries())
          }
        },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Debug - Parsed response:', {
        hasAccessToken: !!data.access_token,
        tokenType: data.token_type,
        expiresIn: data.expires_in,
        scope: data.scope
      });
    } catch (e) {
      console.error('Failed to parse token response as JSON:', responseText);
      return NextResponse.json(
        { 
          error: 'Invalid JSON response from token endpoint',
          rawResponse: responseText
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      tokenReceived: !!data.access_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type,
      scope: data.scope
    });
  } catch (error) {
    console.error('Token test failed:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to test token',
        errorDetails: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
