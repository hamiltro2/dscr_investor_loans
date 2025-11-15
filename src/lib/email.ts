import nodemailer from 'nodemailer';

const smtpPort = Number(process.env.SMTP_PORT);
const isSecurePort = smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: isSecurePort, // true for 465, false for other ports like 587
  requireTLS: !isSecurePort, // require TLS for non-465 ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface BaseEmailData {
  name: string;
  email: string;
  phone: string;
}

export interface LoanApplicationData extends BaseEmailData {
  loanType: string;
  creditScore: string;
  propertyType?: string;
  employmentType?: string;
  loanAmount?: string;
  message?: string;
}

export interface DSCRCalculatorData extends BaseEmailData {
  propertyValue: string;
  monthlyRent: string;
  monthlyExpenses: string;
  dscrRatio: string;
}

export interface CreditSolutionsData extends BaseEmailData {
  creditScore: string;
  message: string;
}

export interface ConsultationData extends BaseEmailData {
  serviceType: string;
  preferredTime: string;
  message: string;
}

export interface PartnerApplicationData extends BaseEmailData {
  firstName: string;
  lastName: string;
  company: string;
  partnerType: string;
  location: string;
  tier: string;
  message?: string;
}

function getEmailSubject(formType: string, data: any): string {
  switch (formType) {
    case 'loan':
      return `New Loan Application - ${data.loanType}`;
    case 'dscr':
      return 'New DSCR Calculator Inquiry';
    case 'credit':
      return 'New Credit Solutions Inquiry';
    case 'consultation':
      return 'New Consultation Request';
    case 'partner':
      return `🤝 New Partner Application - ${data.partnerType} (${data.tier})`;
    default:
      return 'New Contact Form Submission';
  }
}

function getEmailContent(formType: string, data: any): string {
  let content = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n`;

  switch (formType) {
    case 'loan':
      content += `Loan Type: ${data.loanType}\n`;
      content += `Credit Score: ${data.creditScore}\n`;
      if (data.propertyType) content += `Property Type: ${data.propertyType}\n`;
      if (data.loanAmount) content += `Loan Amount: $${data.loanAmount}\n`;
      if (data.message) content += `\nAdditional Notes: ${data.message}`;
      break;

    case 'dscr':
      content += `Property Value: $${data.propertyValue}\n`;
      content += `Monthly Rent: $${data.monthlyRent}\n`;
      content += `Monthly Expenses: $${data.monthlyExpenses}\n`;
      content += `DSCR Ratio: ${data.dscrRatio}`;
      break;

    case 'credit':
      content += `Credit Score: ${data.creditScore}\n`;
      content += `Message: ${data.message}`;
      break;

    case 'consultation':
      content += `Service Type: ${data.serviceType}\n`;
      content += `Preferred Time: ${data.preferredTime}\n`;
      content += `Message: ${data.message}`;
      break;

    case 'partner':
      content += `Company: ${data.company}\n`;
      content += `Partner Type: ${data.partnerType}\n`;
      content += `Service Area: ${data.location}\n`;
      content += `Interested In: ${data.tier}\n`;
      if (data.message) content += `\nAbout Their Business:\n${data.message}`;
      content += `\n\n🎯 ACTION: Review application and contact within 24 hours`;
      break;
  }

  return content;
}

export async function sendEmail(formType: string, data: any): Promise<{ success: boolean }> {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: getEmailSubject(formType, data),
      text: getEmailContent(formType, data),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false };
  }
}

/**
 * Send Cap's lead notification with full conversation details
 */
export async function sendCapLeadNotification(lead: any, offer?: any): Promise<{ success: boolean }> {
  try {
    const subject = `🤖 Cap Pre-Qualified Lead: ${lead.name} - ${lead.productType?.toUpperCase() || 'N/A'}`;
    
    let content = `Cap's AI Loan Companion just pre-qualified a new lead!

═══════════════════════════════════════
📋 LEAD INFORMATION
═══════════════════════════════════════

👤 Contact Details:
   Name: ${lead.name}
   Email: ${lead.email}
   Phone: ${lead.phone}

💼 Loan Details:
   Product Type: ${lead.productType || 'Not specified'}
   Loan Amount: $${lead.loanAmountRequested?.toLocaleString() || 'Not specified'}
   Timeline: ${lead.timeline || 'Not specified'}

🏠 Property Information:
   Address: ${lead.address || 'Not provided'}
   City: ${lead.city || 'N/A'}
   State: ${lead.state || 'N/A'}
   ZIP: ${lead.zip || 'N/A'}
   Property Type: ${lead.propertyType || 'Not specified'}
`;

    // Add product-specific details
    if (lead.productType === 'dscr' && lead.rentalIncome) {
      content += `\n💰 DSCR Loan Details:
   Monthly Rental Income: $${lead.rentalIncome.toLocaleString()}
   DSCR Inputs: ${JSON.stringify(lead.dscrInputs || {}, null, 2)}
`;
    }

    if (lead.productType === 'fix_flip') {
      content += `\n🔨 Fix & Flip Details:
   Rehab Budget: $${lead.rehabBudget?.toLocaleString() || 'Not specified'}
   After Repair Value (ARV): $${lead.arv?.toLocaleString() || 'Not specified'}
`;
    }

    if (lead.productType === 'balloon_refi' && lead.currentMortgageInfo) {
      content += `\n🏦 Refinance Details:
   Current Mortgage: ${JSON.stringify(lead.currentMortgageInfo, null, 2)}
`;
    }

    // Add preliminary offer if available
    if (offer) {
      content += `\n═══════════════════════════════════════
💵 PRELIMINARY OFFER PRESENTED
═══════════════════════════════════════

Status: ${offer.disposition || 'Unknown'}
Score: ${offer.score || 'N/A'}/100

${offer.preliminaryOffer ? `
Rate Range: ${offer.preliminaryOffer.rateRange || 'N/A'}
Term: ${offer.preliminaryOffer.term || 'N/A'}
LTV: ${offer.preliminaryOffer.ltv || 'N/A'}
Monthly Payment: ${offer.preliminaryOffer.monthlyPayment || 'N/A'}
` : 'No offer details available'}

Reasoning: ${offer.reasoning || 'N/A'}
`;
    }

    // Add notes if any
    if (lead.notes) {
      content += `\n📝 Additional Notes:
${lead.notes}
`;
    }

    content += `\n═══════════════════════════════════════
📞 NEXT STEPS
═══════════════════════════════════════

Cap told them:
✅ "I've sent your information to our team"
✅ Options: Schedule a call OR we'll call them

🎯 ACTION REQUIRED:
   1. Review the lead details above
   2. Call ${lead.phone} within 24 hours
   3. OR wait for them to schedule via Calendly

═══════════════════════════════════════

Lead ID: ${lead.id || 'N/A'}
Captured: ${new Date().toLocaleString()}
Channel: AI Chat (Cap - Loan Companion)
Consent Given: ${lead.consentGiven ? 'Yes ✅' : 'No ❌'}

═══════════════════════════════════════
`;

    const mailOptions = {
      from: process.env.SMTP_FROM || 'cap@capitalbridgesolutions.com',
      to: process.env.SMTP_TO || 'team@capitalbridgesolutions.com',
      subject: subject,
      text: content,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">🤖 New Lead from Cap!</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">AI Loan Companion Pre-Qualification</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">📋 Lead Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: white;">
                <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Name</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Email</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${lead.email}">${lead.email}</a></td>
              </tr>
              <tr style="background: white;">
                <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Product Type</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>${lead.productType?.toUpperCase() || 'N/A'}</strong></td>
              </tr>
              <tr style="background: white;">
                <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Loan Amount</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>$${lead.loanAmountRequested?.toLocaleString() || 'N/A'}</strong></td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold;">Property</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">${lead.address || 'Not provided'}, ${lead.city || 'N/A'}, ${lead.state || 'N/A'} ${lead.zip || ''}</td>
              </tr>
            </table>

            ${offer ? `
            <h2 style="color: #1f2937; margin-top: 30px;">💵 Preliminary Offer</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; border: 2px solid #10b981;">
              <p><strong>Status:</strong> ${offer.disposition}</p>
              <p><strong>Score:</strong> ${offer.score}/100</p>
              ${offer.preliminaryOffer ? `
                <p><strong>Rate Range:</strong> ${offer.preliminaryOffer.rateRange}</p>
                <p><strong>Term:</strong> ${offer.preliminaryOffer.term}</p>
                <p><strong>LTV:</strong> ${offer.preliminaryOffer.ltv}</p>
              ` : ''}
            </div>
            ` : ''}

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <h3 style="margin-top: 0; color: #92400e;">📞 Action Required</h3>
              <p style="margin: 0;">Call <strong>${lead.phone}</strong> within 24 hours OR wait for them to schedule.</p>
            </div>

            <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
              <strong>Lead ID:</strong> ${lead.id || 'N/A'}<br>
              <strong>Captured:</strong> ${new Date().toLocaleString()}<br>
              <strong>Channel:</strong> AI Chat (Cap - Loan Companion)
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('[Email] Cap lead notification sent successfully');
    return { success: true };
  } catch (error) {
    console.error('[Email] Error sending Cap lead notification:', error);
    return { success: false };
  }
}
