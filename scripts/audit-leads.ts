import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Constants for California Localization
const CA_TAX_RATE = 0.0125; // 1.25%
const CA_INSURANCE_FACTOR = 0.002; // 0.2% of value per year

// Load leads
const leadsPath = path.join(process.cwd(), 'config', 'leads.json');
if (!fs.existsSync(leadsPath)) {
  console.error('❌ leads.json not found in config/');
  process.exit(1);
}

const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));

/**
 * Generate a secure approval token to prevent unauthorized posting
 */
function generateToken(id: string) {
  const secret = process.env.MARKETING_APPROVAL_SECRET || 'fallback-secret';
  return crypto.createHmac('sha256', secret).update(id).digest('hex');
}

/**
 * Send notification to Telegram
 */
async function sendTelegramNotification(lead: any, dscr: number, tweet: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.log("⚠️ Telegram credentials missing. Skipping notification.");
    return;
  }

  const message = `🔍 *New CBS Audit Ready!*
  
*Property*: ${lead.address}
*DSCR*: ${dscr.toFixed(2)}x
*Price*: $${lead.purchase_price.toLocaleString()}

🐦 *Draft Outreach:*
"${tweet}"

🚀 [Approve & Post](https://www.capitalbridgesolutions.com/api/marketing/approve?id=${lead.id}&token=${generateToken(lead.id)})`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    const data = await response.json() as any;
    if (data.ok) {
      console.log("✅ Telegram notification sent.");
    } else {
      console.log("❌ Telegram API error:", data.description);
    }
  } catch (err: any) {
    console.error("❌ Error sending Telegram notification:", err.message);
  }
}

/**
 * Main Audit Execution
 */
async function runAudit() {
  const pendingLeads = leads.filter((l: any) => l.status === 'pending');
  
  if (pendingLeads.length === 0) {
    console.log('✅ No pending leads to audit.');
    return;
  }

  for (const lead of pendingLeads) {
    console.log(`\n🔍 Auditing: ${lead.address} (${lead.market})`);

    // 1. Math - DSCR Calculation
    const price = lead.purchase_price;
    const rent = lead.estimated_rent;
    
    // Estimate PITIA
    // Standard scenario: 20% down, 30-year fixed, 5.99% interest
    const loanAmount = price * 0.8;
    const annualRate = 0.0599; // Updated to 5.99% per user request
    const monthlyRate = annualRate / 12;
    const termMonths = 360;
    
    // Principal & Interest
    const pi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    
    // Taxes & Insurance
    let monthlyTaxes = (price * 0.011) / 12; // National default
    let monthlyInsurance = 150; // Default
    
    if (lead.is_ca) {
      monthlyTaxes = (price * CA_TAX_RATE) / 12;
      monthlyInsurance = (price * CA_INSURANCE_FACTOR) / 12;
    }
    
    const pitia = pi + monthlyTaxes + monthlyInsurance;
    const dscr = rent / pitia;
    
    console.log(`   * Purchase Price: $${price.toLocaleString()}`);
    console.log(`   * Est. Rent: $${rent.toLocaleString()}/mo`);
    console.log(`   * PITIA: $${pitia.toFixed(2)}/mo`);
    console.log(`   * DSCR: ${dscr.toFixed(2)}x`);

    // 2. Draft Outreach Tweet
    let tweetText = '';
    if (lead.type === 'agent') {
      tweetText = `Hey ${lead.handle}, audited your listing at ${lead.address.split(',')[0]}. It qualifies for a ${dscr.toFixed(2)}x DSCR investor loan (zero tax returns required for the buyer). We drafted a custom buyer financing flyer to help you sell this faster: https://www.capitalbridgesolutions.com/audits/${lead.id} @capitalbridgesol`;
    } else {
      tweetText = `Hey ${lead.handle}, ran the DSCR numbers on that ${lead.market} deal. At 5.99% interest, it hits an estimated ${dscr.toFixed(2)}x DSCR with 20% down. Perfect fit for a no-doc investor loan. Full cash-flow audit sheet here: https://www.capitalbridgesolutions.com/audits/${lead.id} #DSCR`;
    }

    console.log(`\n🐦 Draft Tweet:\n"${tweetText}"`);

    // Notify via Telegram
    await sendTelegramNotification(lead, dscr, tweetText);

    // 3. Send Approval Email
    const token = generateToken(lead.id);
    const approveUrl = `https://www.capitalbridgesolutions.com/api/marketing/approve?id=${lead.id}&token=${token}`;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `🚀 Marketing Audit Approved? - ${lead.address.split(',')[0]}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1d9bf0;">Capital Bridge Marketing Audit</h2>
          <p><strong>Property:</strong> ${lead.address}</p>
          <p><strong>Target Lead:</strong> ${lead.name} (${lead.handle})</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
          
          <h3>Draft Outreach Tweet:</h3>
          <div style="font-style: italic; background: #f8f9fa; padding: 15px; border-left: 5px solid #1d9bf0; border-radius: 4px; margin: 15px 0;">
            "${tweetText}"
          </div>
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Financial Audit Summary:</h4>
            <table style="width: 100%;">
              <tr><td>Purchase Price:</td><td style="text-align: right; font-weight: bold;">$${price.toLocaleString()}</td></tr>
              <tr><td>Monthly Rent:</td><td style="text-align: right; font-weight: bold;">$${rent.toLocaleString()}</td></tr>
              <tr><td>Calculated DSCR:</td><td style="text-align: right; font-weight: bold; color: ${dscr >= 1.2 ? '#28a745' : '#dc3545'};">${dscr.toFixed(2)}x</td></tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${approveUrl}" style="background: #1d9bf0; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Approve & Post to X.com</a>
          </div>
          
          <p style="color: #6c757d; font-size: 12px; text-align: center;">
          Clicking the button will instantly post the tweet using your dedicated CBS brand credentials.<br/>
          Preview the landing page: <a href="https://www.capitalbridgesolutions.com/audits/${lead.id}">View Audit Page</a><br/>
          <strong>Erol Senel | NMLS #211355</strong>
        </p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`\n📧 Approval email successfully sent to: ${process.env.SMTP_TO}`);
      
      // Update lead status to 'audited'
      lead.status = 'audited';
      console.log(`✅ Status updated to 'audited' for ${lead.id}`);
      
    } catch (err: any) {
      console.error('❌ Error sending email:', err.message);
    }
  }

  // Save all changes back to file
  fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
  console.log(`\n✅ Audit run complete. All leads updated.`);
}

// Execute the audit
runAudit().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});
