import { NextResponse } from 'next/server';
import { sendEmail, type EmailData } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data: EmailData = await request.json();
    
    const result = await sendEmail(data);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
