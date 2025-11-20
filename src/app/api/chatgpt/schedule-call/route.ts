import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendCapLeadNotification } from '@/lib/email';

export const runtime = 'nodejs'; // Need Prisma

export async function POST(req: NextRequest) {
  try {
    console.log('[ChatGPT schedule-call] Request received');
    const body = await req.json();
    console.log('[ChatGPT schedule-call] Body:', JSON.stringify(body, null, 2));

    const {
      full_name,
      email,
      phone,
      preferred_date,
      preferred_time,
      timezone,
      topic,
      notes,
      property_address,
      loan_amount,
    } = body;

    // Validate required fields
    if (!full_name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: full_name, email, phone',
        },
        { status: 400 }
      );
    }

    // Build notes with call scheduling information
    const noteParts: string[] = [];
    noteParts.push('📞 CALL REQUESTED via Cap ChatGPT');
    
    if (preferred_date) {
      noteParts.push(`Preferred Date: ${preferred_date}`);
    }
    if (preferred_time) {
      noteParts.push(`Preferred Time: ${preferred_time} ${timezone || 'PT'}`);
    }
    if (topic) {
      noteParts.push(`Topic: ${topic}`);
    }
    if (property_address) {
      noteParts.push(`Property: ${property_address}`);
    }
    if (loan_amount) {
      noteParts.push(`Loan Amount: $${loan_amount.toLocaleString()}`);
    }
    if (notes) {
      noteParts.push(`Notes: ${notes}`);
    }

    const combinedNotes = noteParts.join(' | ');

    // Check if lead already exists
    const existing = await prisma.lead.findFirst({
      where: {
        OR: [
          { email },
          { phone },
        ],
      },
    });

    let lead;
    let isNewLead = false;

    const leadData = {
      name: full_name,
      email,
      phone,
      productType: 'dscr' as const,
      loanAmountRequested: loan_amount || null,
      notes: combinedNotes,
      consentGiven: true,
      channel: 'chatgpt_app',
      consentAt: new Date(),
    };

    if (existing) {
      // Update existing lead
      lead = await prisma.lead.update({
        where: { id: existing.id },
        data: leadData,
      });
    } else {
      // Create new lead
      lead = await prisma.lead.create({
        data: leadData,
      });
      isNewLead = true;
    }

    // Create interaction record for the call request
    await prisma.interaction.create({
      data: {
        leadId: lead.id,
        role: 'tool',
        content: { 
          endpoint: 'chatgpt/schedule-call', 
          result: 'call_requested',
          preferred_date,
          preferred_time,
          timezone,
        },
        toolName: 'chatgpt_schedule_call',
        toolInput: {
          full_name,
          email,
          phone,
          preferred_date,
          preferred_time,
          topic,
        },
        toolOutput: { 
          leadId: lead.id, 
          status: isNewLead ? 'created' : 'updated',
          call_scheduled: true,
        },
      },
    });

    // Send email notification
    try {
      await sendCapLeadNotification(lead);
    } catch (error) {
      console.error('[ChatGPT schedule-call] Failed to send email notification:', error);
      // Don't fail the request if email fails
    }

    // Generate Calendly link (you can replace with your actual Calendly link)
    const calendlyLink = 'https://calendly.com/capitalbridgesolutions/dscr-consultation';
    
    // Or if you have their Calendly username in env
    const calendlyUsername = process.env.CALENDLY_USERNAME || 'capitalbridgesolutions';
    const calendlyEventType = process.env.CALENDLY_EVENT_TYPE || 'dscr-consultation';
    const fullCalendlyLink = `https://calendly.com/${calendlyUsername}/${calendlyEventType}`;

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      status: isNewLead ? 'created' : 'updated',
      message: 'Call request received! Our team will contact you shortly.',
      calendly_link: fullCalendlyLink,
      next_steps: [
        'Our team has been notified and will call you within 1 business day',
        'You can also book a specific time using the Calendly link',
        'We typically respond to ChatGPT inquiries within 2-4 hours',
        'Check your email for a confirmation and calendar invite',
      ],
      contact_info: {
        phone: '(949) 339-3555',
        email: 'info@capitalbridgesolutions.com',
        hours: 'Monday-Friday: 8am-6pm PT, Saturday: 9am-2pm PT',
      },
    });

  } catch (error) {
    console.error('[ChatGPT schedule-call] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
