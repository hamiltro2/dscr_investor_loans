/**
 * Telegram Real-Time Lead & Voice Call Notification Service
 */

export async function sendTelegramLeadAlert(lead: any, offer?: any): Promise<void> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;

    const channelLabel =
      lead.channel === 'voice_chat_ultravox'
        ? '🎙️ Cap Voice AI'
        : lead.channel === 'chatgpt_app'
        ? '💬 ChatGPT App'
        : '🤖 Cap Text Chat';

    const loanAmt = lead.loanAmountRequested
      ? `$${Number(lead.loanAmountRequested).toLocaleString()}`
      : 'Not specified';

    const offerLine = offer?.preliminaryOffer
      ? `\n📊 *Preliminary Offer:* ${
          Array.isArray(offer.preliminaryOffer.rateRange)
            ? `${offer.preliminaryOffer.rateRange[0]}%–${offer.preliminaryOffer.rateRange[1]}%`
            : offer.preliminaryOffer.rateRange || 'N/A'
        } | Term: ${offer.preliminaryOffer.termMonths || offer.preliminaryOffer.term || 360} mos${
          offer.preliminaryOffer.dscrApprox
            ? ` | DSCR: ${Number(offer.preliminaryOffer.dscrApprox).toFixed(2)}x`
            : ''
        }`
      : '';

    const notesSnippet = lead.notes
      ? `\n📝 *Notes / Transcript:* ${String(lead.notes).slice(0, 600)}`
      : '';

    const text =
      `🚨 *NEW LEAD CAPTURED (${channelLabel})*\n\n` +
      `👤 *Name:* ${lead.name || 'N/A'}\n` +
      `📞 *Phone:* \`${lead.phone || 'N/A'}\`\n` +
      `✉️ *Email:* \`${lead.email || 'N/A'}\`\n` +
      `💼 *Product:* ${(lead.productType || 'dscr').toUpperCase()}\n` +
      `💰 *Loan Amount:* ${loanAmt}\n` +
      `🏠 *Property:* ${lead.propertyType || 'N/A'}${lead.address ? ` (${lead.address})` : ''}` +
      offerLine +
      notesSnippet;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.warn('[Telegram] Lead alert non-critical error:', err);
  }
}
