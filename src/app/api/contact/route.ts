import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

interface FormData {
  formType: string;
  data: any;
}

export async function POST(request: Request) {
  try {
    const { formType, data }: FormData = await request.json();
    
    const result = await sendEmail(formType, data);
    
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
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
