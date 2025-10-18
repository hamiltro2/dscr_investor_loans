import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the page content
    const response = await fetch(validUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Extract basic info from HTML (for Redfin/Zillow)
    const metadata = extractMetadata(html, validUrl.toString());

    return NextResponse.json({
      url: validUrl.toString(),
      html,
      metadata,
      success: true
    });

  } catch (error) {
    console.error('Error fetching URL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch URL' },
      { status: 500 }
    );
  }
}

function extractMetadata(html: string, url: string): any {
  const metadata: any = {
    url,
    source: 'unknown'
  };

  // Detect source
  if (url.includes('redfin.com')) {
    metadata.source = 'redfin';
  } else if (url.includes('zillow.com')) {
    metadata.source = 'zillow';
  } else if (url.includes('realtor.com')) {
    metadata.source = 'realtor';
  }

  // Extract Open Graph tags
  const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
  if (ogTitleMatch) metadata.title = ogTitleMatch[1];

  const ogDescMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
  if (ogDescMatch) metadata.description = ogDescMatch[1];

  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
  if (ogImageMatch) metadata.image = ogImageMatch[1];

  // Extract structured data (JSON-LD)
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  if (jsonLdMatch) {
    try {
      const jsonLd = JSON.parse(jsonLdMatch[1]);
      metadata.structuredData = jsonLd;
    } catch (e) {
      // Ignore JSON parse errors
    }
  }

  // Try to extract price
  const priceMatches = [
    /\$([0-9,]+)/g,
    /price["\s:]+([0-9,]+)/gi,
    /list["\s:]+([0-9,]+)/gi
  ];

  for (const pattern of priceMatches) {
    const match = html.match(pattern);
    if (match) {
      metadata.priceText = match[0];
      break;
    }
  }

  return metadata;
}
