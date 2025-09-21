import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    
    default:
      return baseContent;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, data } = body;
    const recipients = process.env.SMTP_TO?.split(',') || [];
    const htmlContent = getEmailContent(formType, data);
    const subject = getEmailSubject(formType, data);

    // Send success response immediately
    const response = NextResponse.json({ success: true });

    // Send email asynchronously
    transporter.sendMail({
      from: `Capital Bridge Solutions <${process.env.SMTP_FROM}>`,
      to: recipients,
      subject,
      html: htmlContent,
      replyTo: data.email,
    }).then(info => {
      console.log('Email sent successfully:', info.messageId);
    }).catch(error => {
      console.error('Error sending email:', error);
      console.error('SMTP Config:', {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM,
        to: recipients
      });
    });

    return response;
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
