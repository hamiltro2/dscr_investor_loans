import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface OAuthParams {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  tokenSecret: string;
}

/**
 * Generate standard Authorization header for OAuth 1.0a
 * Note: For application/json POST requests, body params are not signed.
 */
function generateOAuthHeader(
  method: string,
  url: string,
  params: OAuthParams
): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: params.consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: params.accessToken,
    oauth_version: '1.0',
  };

  // Sort and stringify parameters for signature base string
  const sortedKeys = Object.keys(oauthParams).sort();
  const parameterString = sortedKeys
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(oauthParams[key])}`)
    .join('&');

  const signatureBaseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(parameterString),
  ].join('&');

  const signingKey = [
    encodeURIComponent(params.consumerSecret),
    encodeURIComponent(params.tokenSecret),
  ].join('&');

  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(signatureBaseString)
    .digest('base64');

  oauthParams.oauth_signature = signature;

  const headerKeys = Object.keys(oauthParams).sort();
  const headerString = headerKeys
    .map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
    .join(', ');

  return `OAuth ${headerString}`;
}

/**
 * Post tweet using dedicated X API user context credentials
 */
async function postTweet(text: string): Promise<{ success: boolean; data?: any; error?: string }> {
  const consumerKey = process.env.CBS_X_API_KEY;
  const consumerSecret = process.env.CBS_X_API_SECRET;
  const accessToken = process.env.CBS_X_ACCESS_TOKEN;
  const tokenSecret = process.env.CBS_X_ACCESS_SECRET;

  if (!consumerKey || !consumerSecret || !accessToken || !tokenSecret) {
    return { 
      success: false, 
      error: 'Missing CBS_X_* developer environment variables. Please configure the brand account credentials.' 
    };
  }

  const url = 'https://api.twitter.com/2/tweets';
  const method = 'POST';

  try {
    const authHeader = generateOAuthHeader(method, url, {
      consumerKey,
      consumerSecret,
      accessToken,
      tokenSecret,
    });

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { 
        success: false, 
        error: `X.com API Error: ${data.detail || JSON.stringify(data)}` 
      };
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'Unknown network error' };
  }
}

/**
 * Verification token helper
 */
function verifyToken(id: string, token: string): boolean {
  const secret = process.env.MARKETING_APPROVAL_SECRET || 'fallback-secret';
  const expectedToken = crypto.createHmac('sha256', secret).update(id).digest('hex');
  return token === expectedToken;
}

/**
 * GET route triggered by the email approve link
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    if (!id || !token) {
      return new NextResponse('Error: Missing ID or Token', { status: 400 });
    }

    // 1. Verify authorization
    if (!verifyToken(id, token)) {
      return new NextResponse('Unauthorized: Invalid or expired approval token.', { status: 401 });
    }

    // 2. Load lead data
    const leadsPath = path.join(process.cwd(), 'config', 'leads.json');
    let leads = [];
    
    if (fs.existsSync(leadsPath)) {
      try {
        leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
      } catch (err) {
        console.error('Error parsing leads file:', err);
      }
    }

    const lead = leads.find((l: any) => l.id === id);
    if (!lead) {
      // Fallback: If we can't find the lead in the file (common on Vercel temp builds),
      // we can still attempt to post if we have the ID, but for security we usually want the lead data.
      return new NextResponse('Error: Target lead not found in current deployment state.', { status: 404 });
    }

    // 3. Reconstruct tweet text
    const price = lead.purchase_price;
    const rent = lead.estimated_rent;
    const TAX_RATE = lead.is_ca ? 0.0125 : 0.011;
    const INS_RATE = lead.is_ca ? 0.002 : 0.0015;

    const loanAmount = price * 0.8;
    const interestRate = 0.0599;
    
    const monthlyRate = interestRate / 12;
    const termMonths = 360;
    const pi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    const monthlyTaxes = (price * TAX_RATE) / 12;
    const monthlyInsurance = (price * INS_RATE) / 12;
    const pitia = pi + monthlyTaxes + monthlyInsurance;
    const dscr = rent / pitia;

    let tweetText = '';
    if (lead.type === 'agent') {
      tweetText = `Hey ${lead.handle}, audited your listing at ${lead.address.split(',')[0]}. It qualifies for a ${dscr.toFixed(2)}x DSCR investor loan (zero tax returns required for the buyer). We drafted a custom buyer financing flyer to help you sell this faster: https://www.capitalbridgesolutions.com/audits/${lead.id} @capitalbridgesol`;
    } else {
      tweetText = `Hey ${lead.handle}, ran the DSCR numbers on that ${lead.market} deal. At 5.99% interest, it hits an estimated ${dscr.toFixed(2)}x DSCR with 20% down. Perfect fit for a no-doc investor loan. Full cash-flow audit sheet here: https://www.capitalbridgesolutions.com/audits/${lead.id} #DSCR`;
    }

    // 4. Post to X.com
    const xResult = await postTweet(tweetText);

    if (!xResult.success) {
      return new NextResponse(
        `<html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: white;">
            <h2 style="color: #dc3545;">✗ Posting Failed</h2>
            <p>Could not post audit to X.com.</p>
            <div style="background: #1e293b; padding: 20px; text-align: left; border-radius: 8px; max-width: 600px; margin: 20px auto; overflow-x: auto; border: 1px solid #dc3545;">
              <code>${xResult.error}</code>
            </div>
            <p style="color: #94a3b8; font-size: 14px;">Please check that your CBS_X_* developer keys are set up correctly in Vercel environment variables.</p>
            <a href="/audits/${id}" style="color: #38bdf8; text-decoration: none;">Go back to Audit Preview</a>
          </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    // 5. Attempt to update lead status (will likely fail on Vercel, which is okay)
    try {
      const leadIndex = leads.findIndex((l: any) => l.id === id);
      if (leadIndex !== -1) {
        leads[leadIndex].status = 'posted';
        leads[leadIndex].postedAt = new Date().toISOString();
        leads[leadIndex].tweetId = xResult.data?.data?.id || 'unknown';
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
      }
    } catch (writeErr) {
      console.warn('Status sync failed (Expected on Vercel):', writeErr);
    }

    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: white;">
          <h2 style="color: #10b981;">✓ Successfully Posted!</h2>
          <p>The DSCR cash flow audit has been published to the brand X.com account.</p>
          <p><strong>Published Tweet ID:</strong> <code>${xResult.data?.data?.id || 'N/A'}</code></p>
          <div style="margin: 30px 0;">
            <a href="https://twitter.com/any/status/${xResult.data?.data?.id}" target="_blank" style="background: #1d9bf0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold; margin-right: 15px;">View Tweet on X</a>
            <a href="https://www.capitalbridgesolutions.com/audits/${id}" style="background: #334155; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold;">View Audit Webpage</a>
          </div>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (fatalErr: any) {
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: white;">
          <h2 style="color: #dc3545;">✗ Critical Server Error</h2>
          <p>The approval system encountered an unexpected error.</p>
          <div style="background: #1e293b; padding: 20px; text-align: left; border-radius: 8px; max-width: 600px; margin: 20px auto; overflow-x: auto; border: 1px solid #dc3545;">
            <code>${fatalErr.message}</code>
          </div>
          <a href="/" style="color: #38bdf8; text-decoration: none;">Return to Home</a>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' }, status: 500 }
    );
  }
}
