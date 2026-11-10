// Gemini Multimodal Live API Session Setup (Disabled in production in favor of Ultravox)
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_API_KEY || process.env.CRON_SECRET;

  if (!expectedKey || adminKey !== expectedKey) {
    return NextResponse.json(
      { error: 'Unauthorized: Direct API key retrieval is disabled' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    model: 'gemini-2.5-flash',
    endpoint: 'generativelanguage.googleapis.com',
  });
}
