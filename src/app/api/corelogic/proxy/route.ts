import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url, method, headers, body } = await request.json();
    console.log('Proxying request to:', url);
    console.log('Request headers:', headers);
    console.log('Request body:', body);

    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      ...(body && { body })
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!response.ok) {
      console.error('CoreLogic API request failed:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: responseText,
        requestUrl: url,
        requestMethod: method,
        requestHeaders: headers,
        requestBody: body
      });
      return NextResponse.json(
        { error: `CoreLogic API request failed: ${response.status} ${responseText}` },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      return NextResponse.json(
        { error: 'Invalid JSON response from CoreLogic API' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('CoreLogic API request failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to proxy CoreLogic API request' },
      { status: 500 }
    );
  }
}
