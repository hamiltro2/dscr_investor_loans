import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jubvoulgtndbgsipyfgt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

function generateCuid(): string {
  // A standard cuid is: 'c' + timestamp (base36, 8 chars) + counter (base36, 4 chars) + fingerprint (base36, 4 chars) + random (base36, 8 chars)
  const timestamp = Date.now().toString(36).padStart(8, '0');
  const counter = Math.floor(Math.random() * 1679616).toString(36).padStart(4, '0'); // 1679616 = 36^4
  const fingerprint = 'cbs1';
  const random = Math.floor(Math.random() * 2821109907456).toString(36).padStart(8, '0'); // 2821109907456 = 36^8
  return `c${timestamp}${counter}${fingerprint}${random}`.substring(0, 25);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

function getEmailSubject(formType: string, data: any): string {
  switch (formType) {
    case 'loan':
      return `New Loan Application - ${data.loanType}`;
    case 'dscr':
      return 'New DSCR Calculator Inquiry';
    case 'credit':
      return 'New Credit Solutions Inquiry';
    case 'consultation':
      return `New Consultation Request - ${data.serviceType}`;
    case 'extension':
      return 'CBS Chrome Extension Request';
    case 'quick-capture':
      return '🔥 New Quick Lead - Capital Bridge Solutions';
    default:
      return 'New Inquiry - Capital Bridge Solutions';
  }
}

function getEmailContent(formType: string, data: any): string {
  const baseContent = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
  `;

  switch (formType) {
    case 'loan':
      return `
        <h2>New Loan Application</h2>
        ${baseContent}
        <p><strong>Loan Type:</strong> ${data.loanType}</p>
        <p><strong>Credit Score:</strong> ${data.creditScore}</p>
        ${data.propertyType ? `<p><strong>Property Type:</strong> ${data.propertyType}</p>` : ''}
        ${data.employmentType ? `<p><strong>Employment Type:</strong> ${data.employmentType}</p>` : ''}
        ${data.loanAmount ? `<p><strong>Loan Amount:</strong> ${data.loanAmount}</p>` : ''}
      `;
    
    case 'dscr':
      return `
        <h2>DSCR Calculator Inquiry</h2>
        ${baseContent}
        <p><strong>Property Value:</strong> ${data.propertyValue}</p>
        <p><strong>Monthly Rent:</strong> ${data.monthlyRent}</p>
        <p><strong>Monthly Expenses:</strong> ${data.monthlyExpenses}</p>
        <p><strong>DSCR Ratio:</strong> ${data.dscrRatio}</p>
      `;
    
    case 'credit':
      return `
        <h2>Credit Solutions Inquiry</h2>
        ${baseContent}
        <p><strong>Credit Score Range:</strong> ${data.creditScore}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `;
    
    case 'consultation':
      return `
        <h2>Consultation Request</h2>
        ${baseContent}
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `;
    
    case 'extension':
      return `
        <h2>🏠 Chrome Extension - Property Interest</h2>
        ${baseContent}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <h3>Property Details:</h3>
        <p><strong>Address:</strong> ${data.propertyAddress}</p>
        <p><strong>Price:</strong> ${data.propertyPrice}</p>
        ${data.propertyBeds ? `<p><strong>Bedrooms:</strong> ${data.propertyBeds}</p>` : ''}
        ${data.propertyBaths ? `<p><strong>Bathrooms:</strong> ${data.propertyBaths}</p>` : ''}
        ${data.propertySqft ? `<p><strong>Square Feet:</strong> ${data.propertySqft}</p>` : ''}
        ${data.estimatedRent && data.estimatedRent !== 'N/A' ? `<p><strong>Estimated Rent:</strong> ${data.estimatedRent}</p>` : ''}
        ${data.hoaFees && data.hoaFees !== 'N/A' ? `<p><strong>HOA Fees:</strong> ${data.hoaFees}</p>` : ''}
        ${data.propertyTax && data.propertyTax !== 'N/A' ? `<p><strong>Property Tax:</strong> ${data.propertyTax}</p>` : ''}
        <p><strong>Source:</strong> ${data.source}</p>
      `;
    
    case 'quick-capture':
      return `
        <h2>🔥 Quick Lead Capture</h2>
        ${baseContent}
        ${data.loanType ? `<p><strong>Loan Type:</strong> ${data.loanType}</p>` : ''}
        ${data.source ? `<p><strong>Source:</strong> ${data.source}</p>` : ''}
        ${data.message ? `<p><strong>Notes:</strong> ${data.message}</p>` : ''}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #059669; font-weight: bold;">⚡ This lead came from the mid-page quick capture form — high scroll intent.</p>
      `;
    
    default:
      return baseContent;
  }
}

function mapToProductType(loanType?: string): string {
  if (!loanType) return 'dscr';
  const normalized = loanType.toLowerCase();
  if (normalized.includes('dscr')) return 'dscr';
  if (normalized.includes('fix') || normalized.includes('flip')) return 'fix_flip';
  if (normalized.includes('refi') || normalized.includes('refinance')) return 'balloon_refi';
  if (normalized.includes('note')) return 'note_finance';
  return 'hard_money';
}

function getLeadData(formType: string, data: any) {
  const baseData = {
    name: data.name || 'Unknown',
    email: data.email || 'unknown@example.com',
    phone: data.phone || '',
    channel: formType === 'extension' ? 'extension' : 'web',
  };

  switch (formType) {
    case 'loan': {
      const loanAmount = data.loanAmount ? parseFloat(data.loanAmount.toString().replace(/[^0-9.]/g, '')) : null;
      return {
        ...baseData,
        productType: mapToProductType(data.loanType),
        propertyType: data.propertyType || null,
        loanAmountRequested: loanAmount ? Number(loanAmount) : null,
        notes: `Loan Application. Credit Score: ${data.creditScore || 'N/A'}. Employment Type: ${data.employmentType || 'N/A'}.${data.message ? ` Message: ${data.message}` : ''}`,
      };
    }
    case 'dscr': {
      const propertyValue = data.propertyValue ? parseFloat(data.propertyValue.toString().replace(/[^0-9.]/g, '')) : null;
      const monthlyRent = data.monthlyRent ? parseFloat(data.monthlyRent.toString().replace(/[^0-9.]/g, '')) : null;
      const monthlyExpenses = data.monthlyExpenses ? parseFloat(data.monthlyExpenses.toString().replace(/[^0-9.]/g, '')) : null;
      return {
        ...baseData,
        productType: 'dscr',
        rentalIncome: monthlyRent ? Number(monthlyRent) : null,
        dscrInputs: {
          propertyValue: propertyValue || null,
          monthlyExpenses: monthlyExpenses || null,
          dscrRatio: data.dscrRatio || null,
        },
        notes: `DSCR Calculator Inquiry. Property Value: $${data.propertyValue || 'N/A'}. Monthly Rent: $${data.monthlyRent || 'N/A'}. Monthly Expenses: $${data.monthlyExpenses || 'N/A'}. DSCR Ratio: ${data.dscrRatio || 'N/A'}.`,
      };
    }
    case 'credit':
      return {
        ...baseData,
        productType: 'hard_money',
        notes: `Credit Solutions Inquiry. Credit Score Range: ${data.creditScore || 'N/A'}. Message: ${data.message || 'N/A'}`,
      };
    case 'consultation':
      return {
        ...baseData,
        productType: 'hard_money',
        notes: `Consultation Request. Service Type: ${data.serviceType || 'N/A'}. Preferred Time: ${data.preferredTime || 'N/A'}. Message: ${data.message || 'N/A'}`,
      };
    case 'extension': {
      const price = data.propertyPrice ? parseFloat(data.propertyPrice.toString().replace(/[^0-9.]/g, '')) : null;
      return {
        ...baseData,
        productType: 'dscr',
        address: data.propertyAddress || null,
        loanAmountRequested: price ? Number(price) : null,
        notes: `Chrome Extension Request. Address: ${data.propertyAddress || 'N/A'}. Price: ${data.propertyPrice || 'N/A'}. Beds/Baths: ${data.propertyBeds || 'N/A'}/${data.propertyBaths || 'N/A'}. Sqft: ${data.propertySqft || 'N/A'}. Estimated Rent: ${data.estimatedRent || 'N/A'}. HOA: ${data.hoaFees || 'N/A'}. Tax: ${data.propertyTax || 'N/A'}. Source: ${data.source || 'N/A'}`,
      };
    }
    case 'quick-capture':
      return {
        ...baseData,
        channel: 'web_quick',
        productType: mapToProductType(data.loanType),
        notes: `Quick Lead Capture. Source: ${data.source || 'N/A'}. Message: ${data.message || 'N/A'}`,
      };
    default:
      return {
        ...baseData,
        productType: 'hard_money',
        notes: `Inquiry of type ${formType}. Data: ${JSON.stringify(data)}`,
      };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, data } = body;
    const recipients = process.env.SMTP_TO?.split(',') || [];
    const htmlContent = getEmailContent(formType, data);
    const subject = getEmailSubject(formType, data);

    // Persist lead to database with try-catch block for graceful fallback
    try {
      const leadData = getLeadData(formType, data);
      let leadId = null;
      let existingLead = null;

      if (leadData.email || leadData.phone) {
        const orConditions = [];
        if (leadData.email) orConditions.push(`email.eq.${leadData.email}`);
        if (leadData.phone) orConditions.push(`phone.eq.${leadData.phone}`);

        const { data: existingLeads, error: selectError } = await supabase
          .from('Lead')
          .select('*')
          .or(orConditions.join(','))
          .order('createdAt', { ascending: false })
          .limit(1);

        if (selectError) {
          console.error('Database query error:', selectError.message, selectError.details);
        } else if (existingLeads && existingLeads.length > 0) {
          existingLead = existingLeads[0];
          leadId = existingLead.id;
        }
      }

      if (leadId && existingLead) {
        const notes = existingLead.notes 
          ? `${existingLead.notes}\n\n[Update ${new Date().toISOString()}]: ${leadData.notes}` 
          : leadData.notes;
          
        const { error: updateError } = await supabase
          .from('Lead')
          .update({
            ...leadData,
            notes,
            updatedAt: new Date().toISOString()
          })
          .eq('id', leadId);
          
        if (updateError) {
          console.error('Database update error:', updateError.message, updateError.details);
        } else {
          console.log('Database: Updated existing lead via REST', leadId);
        }
      } else {
        const generatedId = generateCuid();
        const { data: newLead, error: insertError } = await supabase
          .from('Lead')
          .insert([{
            id: generatedId,
            ...leadData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }])
          .select();
          
        if (insertError) {
          console.error('Database insert error:', insertError.message, insertError.details);
        } else if (newLead && newLead.length > 0) {
          console.log('Database: Created new lead via REST', newLead[0].id);
        }
      }
    } catch (dbError) {
      console.error('Failed to log lead to database (falling back gracefully to SMTP):', dbError);
    }

    // Send email and wait for confirmation
    try {
      const info = await transporter.sendMail({
        from: `Capital Bridge Solutions <${process.env.SMTP_FROM}>`,
        to: recipients,
        subject,
        html: htmlContent,
        replyTo: data.email,
      });
      
      console.log('Email sent successfully:', info.messageId);
      console.log('Accepted:', info.accepted);
      console.log('Form data:', data);
      
      return NextResponse.json({ 
        success: true,
        messageId: info.messageId,
        accepted: info.accepted
      });
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      console.error('SMTP Config:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM,
        to: recipients
      });
      console.error('Form data that failed:', data);
      
      // Still return success to user but log the error
      return NextResponse.json({ 
        success: true,
        warning: 'Form received but email notification failed'
      });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
