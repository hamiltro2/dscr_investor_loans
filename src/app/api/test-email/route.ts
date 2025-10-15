import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendCapLeadNotification } from '@/lib/email';

export async function GET() {
  try {
    // Test SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true, // Enable debug output
      logger: true // Enable logger
    });

    // Verify connection
    await transporter.verify();
    
    // Send test email
    const info = await transporter.sendMail({
      from: `Capital Bridge Solutions <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO?.split(',')[0] || 'test@example.com',
      subject: 'Test Email from Capital Bridge Solutions',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify SMTP configuration.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <hr>
        <p>Configuration:</p>
        <ul>
          <li>Host: ${process.env.SMTP_HOST}</li>
          <li>Port: ${process.env.SMTP_PORT}</li>
          <li>User: ${process.env.SMTP_USER}</li>
          <li>From: ${process.env.SMTP_FROM}</li>
          <li>To: ${process.env.SMTP_TO}</li>
        </ul>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully',
      messageId: info.messageId,
      accepted: info.accepted,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO
      }
    });
  } catch (error: any) {
    console.error('Email test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      command: error.command,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_TO
      }
    }, { status: 500 });
  }
}

/**
 * POST endpoint to test Cap's lead notification email
 */
export async function POST() {
  try {
    // Create a sample lead (like what Cap would create)
    const sampleLead = {
      id: 'test-lead-' + Date.now(),
      name: 'Ricardo Hamilton (TEST)',
      email: 'test@example.com',
      phone: '(949) 339-3555',
      productType: 'dscr',
      loanAmountRequested: 500000,
      timeline: '30-60 days',
      address: '123 Test Property Ave',
      city: 'Orange County',
      state: 'CA',
      zip: '92660',
      propertyType: 'Multi-family',
      rentalIncome: 6500,
      dscrInputs: {
        monthlyRent: 6500,
        taxes: 800,
        insurance: 300,
        hoa: 200
      },
      notes: 'This is a TEST lead notification from Cap',
      consentGiven: true,
    };

    // Create a sample preliminary offer
    const sampleOffer = {
      disposition: 'qualified',
      score: 85,
      preliminaryOffer: {
        rateRange: '6.5% - 7.25%',
        term: '30 years, interest-only for 10 years',
        ltv: '75%',
        monthlyPayment: '$2,708 - $3,021'
      },
      reasoning: 'Strong DSCR ratio of 1.44, good property location, adequate rental income coverage'
    };

    // Send Cap's lead notification
    const result = await sendCapLeadNotification(sampleLead, sampleOffer);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Cap lead notification sent successfully!',
        recipients: process.env.SMTP_TO?.split(','),
        leadSample: sampleLead
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send Cap lead notification'
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Cap lead notification test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message
    }, { status: 500 });
  }
}
