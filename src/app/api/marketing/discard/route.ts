import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Verification token helper
 */
function verifyToken(id: string, token: string): boolean {
  const secret = process.env.MARKETING_APPROVAL_SECRET || 'fallback-secret';
  const expectedToken = crypto.createHmac('sha256', secret).update(id).digest('hex');
  return token === expectedToken;
}

/**
 * GET route triggered by the Telegram "Discard" button
 */
export async function GET(request: NextRequest) {
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
  if (!fs.existsSync(leadsPath)) {
    return new NextResponse('Error: leads.json data file not found.', { status: 500 });
  }

  let leads = [];
  try {
    leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  } catch (err) {
    return new NextResponse('Error parsing leads file.', { status: 500 });
  }

  const leadIndex = leads.findIndex((l: any) => l.id === id);
  if (leadIndex === -1) {
    return new NextResponse('Error: Target lead not found.', { status: 404 });
  }

  // 3. Update lead status to 'discarded'
  leads[leadIndex].status = 'discarded';
  leads[leadIndex].discardedAt = new Date().toISOString();
  fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

  return new NextResponse(
    `<html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0f172a; color: white;">
        <h2 style="color: #94a3b8;">🗑️ Lead Discarded</h2>
        <p>This property has been removed from the active outreach queue.</p>
        <div style="margin: 30px 0;">
          <a href="/" style="background: #334155; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold;">Return Home</a>
        </div>
      </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
