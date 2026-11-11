import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, eventType = 'qr_scan', selectedOption, reserveActive } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
    }

    const rescuePath = path.join(process.cwd(), 'config', 'rescue-leads.json');
    if (!fs.existsSync(rescuePath)) {
      return NextResponse.json({ ok: false });
    }

    const leads = JSON.parse(fs.readFileSync(rescuePath, 'utf8'));
    const lead = leads.find((l: any) => l.id === id);
    if (!lead) {
      return NextResponse.json({ ok: false });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text =
        eventType === 'qr_scan'
          ? `🔔 *LIVE QR CODE SCAN ALERT*\n\n` +
            `*Owner:* ${lead.ownerPerson} (${lead.ownerEntity})\n` +
            `*Property:* ${lead.propertyAddress}\n` +
            `*Equity:* ${lead.equityPercent}% (~$${(lead.protectedEquity / 1000000).toFixed(2)}M)\n` +
            `*1st Lien:* $${lead.firstLien.amount.toLocaleString()} @ ${lead.firstLien.rate}%\n` +
            `*2nd Lien:* $${lead.secondLien.amount.toLocaleString()} @ ${lead.secondLien.rate}%\n\n` +
            `📞 *Owner Phone:* \`${lead.uncoveredPhone}\`\n` +
            `✉️ *Owner Email:* \`${lead.uncoveredEmail}\`\n` +
            `🔗 [Open Private Deal](https://www.capitalbridgesolutions.com/rescue/${lead.id})`
          : `🔥 *OWNER INTERACTION ON PRIVATE DEAL*\n\n` +
            `*Owner:* ${lead.ownerPerson} (${lead.ownerEntity})\n` +
            `*Property:* ${lead.propertyAddress}\n` +
            `*Viewing Option:* ${selectedOption || 'Option A'}\n` +
            `*12-Month $0 Reserve Toggle:* ${reserveActive ? 'ENABLED' : 'Standard'}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
