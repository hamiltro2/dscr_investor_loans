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
