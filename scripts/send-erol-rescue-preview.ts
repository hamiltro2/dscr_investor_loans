import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function main() {
  const rescuePath = path.join(process.cwd(), 'config', 'rescue-leads.json');
  const leads = JSON.parse(fs.readFileSync(rescuePath, 'utf8'));

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const leadCardsHtml = leads
    .map((lead: any, idx: number) => {
      const dealRoomUrl = `https://www.capitalbridgesolutions.com/rescue/${lead.id}?scan=1`;
      const heroImageUrl = `https://www.capitalbridgesolutions.com${lead.heroImage}`;
      const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&color=1d1d1f&bgcolor=ffffff&data=${encodeURIComponent(
        dealRoomUrl
      )}`;

      const bulletsHtml = lead.letterBullets
        .map(
          (b: string) =>
            `<li style="margin-bottom:8px; color:#1d1d1f; font-size:14px; line-height:1.5;">${b}</li>`
        )
        .join('');

      const solutionsHtml = lead.letterSolutions
        .map(
          (s: string) =>
            `<li style="margin-bottom:8px; color:#1d1d1f; font-size:14px; line-height:1.5;">${s}</li>`
        )
        .join('');

      return `
      <div style="background:#ffffff; border:1px solid #d2d2d7; border-radius:24px; overflow:hidden; margin-bottom:40px; box-shadow:0 8px 30px rgba(0,0,0,0.06);">
        
        <!-- High-Converting Architectural Hero Image Banner -->
        <div style="position:relative;">
          <img src="${heroImageUrl}" alt="${lead.propertyAddress}" width="728" style="width:100%; max-height:300px; object-fit:cover; display:block;" />
        </div>

        <div style="padding:28px 32px;">
          <div style="border-bottom:2px solid #1d1d1f; padding-bottom:18px; margin-bottom:20px;">
            <span style="display:inline-block; background:#f0f7ff; color:#0066cc; border:1px solid #bfdbfe; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; padding:4px 12px; border-radius:999px; margin-bottom:8px;">
              SAMPLE #${idx + 1} • ${lead.county.toUpperCase()} NON-OWNER OCCUPIED NOD
            </span>
            <h2 style="margin:4px 0; font-size:24px; color:#1d1d1F; font-weight:800;">
              ${lead.propertyAddress}
            </h2>
            <p style="margin:4px 0 0; font-size:14px; color:#515154;">
              <strong>Owner / Entity:</strong> ${lead.ownerPerson} (${lead.ownerEntity}) &nbsp;|&nbsp;
              <strong>Uncovered Direct Contact:</strong> <a href="mailto:${lead.uncoveredEmail}" style="color:#0066cc; font-weight:700;">${lead.uncoveredEmail}</a> • ${lead.uncoveredPhone}
            </p>
          </div>

          <!-- 3 Visual KPI Cards Row -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">
            <tr>
              <td width="32%" style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:14px; padding:14px; vertical-align:top;">
                <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#047857; letter-spacing:0.05em;">Protected Equity</div>
                <div style="font-size:20px; font-weight:800; color:#065f46; margin-top:4px;">$${(
                  lead.protectedEquity / 1000000
                ).toFixed(2)}M (${lead.equityPercent}%)</div>
                <div style="font-size:11px; color:#047857; margin-top:2px;">Combined LTV: ${lead.ltvPercent}%</div>
              </td>
              <td width="2%"></td>
              <td width="32%" style="background:#f0f7ff; border:1px solid #bfdbfe; border-radius:14px; padding:14px; vertical-align:top;">
                <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#0066cc; letter-spacing:0.05em;">1st Mortgage (Keep)</div>
                <div style="font-size:20px; font-weight:800; color:#1d1d1f; margin-top:4px;">${lead.firstLien.rate.toFixed(
                  2
                )}% Fixed</div>
                <div style="font-size:11px; color:#515154; margin-top:2px;">$${lead.firstLien.amount.toLocaleString()} Balance</div>
              </td>
              <td width="2%"></td>
              <td width="32%" style="background:#fffbeb; border:1px solid #fde68a; border-radius:14px; padding:14px; vertical-align:top;">
                <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; letter-spacing:0.05em;">2nd Lien Takeout</div>
                <div style="font-size:20px; font-weight:800; color:#92400e; margin-top:4px;">$${lead.secondLien.amount.toLocaleString()}</div>
                <div style="font-size:11px; color:#b45309; font-weight:700; margin-top:2px;">${lead.secondLien.rate}% • Cure Target</div>
              </td>
            </tr>
          </table>

          <!-- Forensic Letter Body -->
          <div style="background:#f5f5f7; border-radius:16px; padding:24px; border:1px solid #e5e5ea; margin-bottom:24px;">
            <p style="margin:0 0 8px; font-size:11px; font-weight:800; color:#0066cc; text-transform:uppercase; letter-spacing:0.05em;">
              PHYSICAL LETTER PREVIEW (MAILED TO: ${lead.mailingAddress}, ${lead.mailingCityStateZip})
            </p>
            <p style="margin:0 0 14px; font-size:14px; font-weight:700; color:#1d1d1f; background:#ffffff; padding:10px 14px; border-left:4px solid #0066cc; border-radius:6px;">
              RE: ${lead.letterSubject}
            </p>
            <p style="font-size:14px; color:#1d1d1f; line-height:1.6;">Dear ${lead.ownerSalutation},</p>
            ${lead.letterParagraphs
              .map(
                (p: string) =>
                  `<p style="font-size:14px; color:#1d1d1f; line-height:1.6; margin:10px 0;">${p}</p>`
              )
              .join('')}
            <ul style="padding-left:20px; margin:14px 0;">
              ${bulletsHtml}
            </ul>
            <p style="font-size:14px; font-weight:700; color:#1d1d1f; line-height:1.6; margin:14px 0 8px;">
              ${lead.letterSolutionIntro}
            </p>
            <ol style="padding-left:20px; margin:10px 0;">
              ${solutionsHtml}
            </ol>
            <p style="font-size:14px; color:#1d1d1f; line-height:1.6; margin:14px 0;">
              ${lead.letterClosing}
            </p>
            <p style="font-size:13px; color:#1d1d1f; font-weight:700; margin:16px 0 4px;">
              Warm regards,<br/>
              Ricardo Hamilton & Erol Senel<br/>
              <span style="font-weight:500; color:#515154;">Managing Partners | Capital Bridge Solutions | NMLS #211355 | (949) 339-3555</span>
            </p>
            <p style="font-size:12px; color:#515154; font-style:italic; margin:8px 0 0;">
              ${lead.letterPs}
            </p>
          </div>

          <!-- Scannable QR Code + Button -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff; border:2px solid #bfdbfe; border-radius:16px; padding:20px;">
            <tr>
              <td width="140" valign="middle" align="center" style="padding-right:20px;">
                <img src="${qrImg}" width="130" height="130" alt="QR Code" style="border-radius:12px; border:1px solid #d2d2d7; background:#ffffff; padding:6px; display:block;" />
              </td>
              <td valign="middle">
                <span style="display:inline-block; background:#0066cc; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 8px; border-radius:4px; margin-bottom:6px;">
                  🔒 LIVE PERSONALIZED QR DEAL ROOM
                </span>
                <h3 style="margin:0 0 6px; font-size:17px; color:#1d1d1f; font-weight:800;">
                  Scan With Your Phone Camera to Test (${lead.propertyShort})
                </h3>
                <p style="margin:0 0 14px; font-size:13px; color:#333336; line-height:1.5;">
                  Scanning this QR code opens the owner's custom-built Apple-clean Deal Room with architectural imagery, their exact 1st & 2nd mortgage breakdown, interactive 12-Month $0 Out-of-Pocket Payment Reserve toggle, and triggers an instant Telegram alert!
                </p>
                <a href="${dealRoomUrl}" style="display:inline-block; background:#0066cc; color:#ffffff; text-decoration:none; font-size:13px; font-weight:700; padding:10px 18px; border-radius:10px;">
                  Open Live Visual Deal Room & Printable Letter →
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      `;
    })
    .join('');

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Capital Bridge Solutions – Visual NOD Letters & QR Deal Rooms</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f5f5f7; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1d1d1f;">
      <div style="max-width:760px; margin:0 auto; padding:32px 16px;">
        
        <!-- Brand Header Card with Official Logo -->
        <div style="background:#ffffff; border:1px solid #d2d2d7; border-radius:24px; padding:28px 32px; margin-bottom:28px; box-shadow:0 4px 20px rgba(0,0,0,0.04);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td valign="middle">
                <img src="https://www.capitalbridgesolutions.com/Capital_Bridge_solutions_Logo_Cropped.png" alt="Capital Bridge Solutions" height="44" style="height:44px; width:auto; display:block; margin-bottom:14px;" />
                <h1 style="margin:0 0 8px; font-size:22px; font-weight:800; color:#1d1d1f;">
                  PARTNER REVIEW: VISUAL NOD LETTERS & QR DEAL ROOMS
                </h1>
                <p style="margin:0; font-size:14px; color:#515154; line-height:1.6;">
                  Hi Erol & Ricardo — Here are the updated <strong>high-converting visual Notice of Default (NOD) Letters & Scannable QR Deal Rooms</strong> featuring architectural property imagery, our official Capital Bridge Solutions branding, and 3-column equity protection KPIs.
                </p>
              </td>
            </tr>
          </table>
        </div>

        ${leadCardsHtml}

      </div>
    </body>
  </html>
  `;

  const recipients =
    process.env.SMTP_TO ||
    'ricardo@capitalbridgesolutions.com,hamiltro2@hotmail.com,erolsenel11@gmail.com';
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: recipients,
    subject:
      '✨ Updated Visual Partner Preview: 2 SoCal NOD Letters + Architectural Imagery + Live QR Deal Rooms',
    html,
  });

  console.log(`✅ Updated visual partner preview email sent to: ${recipients}`);
}

main().catch((err) => {
  console.error('Error sending email:', err);
  process.exit(1);
});
