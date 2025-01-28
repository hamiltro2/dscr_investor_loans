import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
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

export async function sendEmail(formType: string, data: any) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formType, data }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
