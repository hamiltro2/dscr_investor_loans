import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
