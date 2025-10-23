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

    // Fetch the page content with timeout (15 seconds)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    
    let response;
    try {
      response = await fetch(validUrl.toString(), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: controller.signal
      });
    } catch (fetchError) {
      clearTimeout(timeout);
      
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          return NextResponse.json(
            { 
              error: 'Request timeout', 
              details: 'The website took too long to respond (>15 seconds)',
              suggestion: 'Try using a screenshot instead'
            },
            { status: 408 }
          );
        }
        throw fetchError; // Re-throw for main catch block
      }
      throw new Error('Unknown fetch error');
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `Failed to fetch URL: ${response.statusText}`,
          details: `HTTP ${response.status}`,
          suggestion: 'The website may be down or blocking requests. Try a screenshot instead.'
        },
        { status: response.status }
      );
    }

    const html = await response.text();
    
    // Validate we got actual HTML content
    if (!html || html.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Empty response from website',
          details: 'The website returned no content',
          suggestion: 'Try using a screenshot of the listing instead'
        },
        { status: 500 }
      );
    }

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
    
    // Provide detailed error information for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      error: 'Failed to fetch URL',
      details: errorMessage,
      suggestion: 'The website may be blocking automated requests. Try using a screenshot or manual input instead.'
    };
    
    return NextResponse.json(errorDetails, { status: 500 });
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
