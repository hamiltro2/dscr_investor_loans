import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendCapLeadNotification } from '@/lib/email';
import { createCalendarEvent, parsePreferredDateTime } from '@/lib/google-calendar';

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

    // Create Google Calendar event if preferred date/time provided
    let calendarResult: any = null;
    let meetLink: string | undefined;

    if (preferred_date || preferred_time) {
      const parsedDateTime = parsePreferredDateTime(preferred_date, preferred_time, timezone);
      
      if (parsedDateTime) {
        const { startTime, endTime } = parsedDateTime;
        
        const eventSummary = `DSCR Consultation: ${full_name}`;
        const eventDescription = `
DSCR Loan Consultation Call

Client: ${full_name}
Email: ${email}
Phone: ${phone}
${property_address ? `\nProperty: ${property_address}` : ''}
${loan_amount ? `\nLoan Amount: $${loan_amount.toLocaleString()}` : ''}
${topic ? `\nTopic: ${topic}` : ''}
${notes ? `\nNotes: ${notes}` : ''}

Source: Cap ChatGPT
Lead ID: ${lead.id}
        `.trim();

        calendarResult = await createCalendarEvent({
          summary: eventSummary,
          description: eventDescription,
          startTime,
          endTime,
          attendeeEmail: email,
          attendeeName: full_name,
          calendarId: process.env.GOOGLE_CALENDAR_ID, // Your team calendar
        });

        if (calendarResult.success) {
          meetLink = calendarResult.meetLink;
          console.log('[ChatGPT schedule-call] Calendar event created:', calendarResult.eventId);
        }
      }
    }

    // Generate Calendly link as fallback
    const calendlyUsername = process.env.CALENDLY_USERNAME || 'capitalbridgesolutions';
    const calendlyEventType = process.env.CALENDLY_EVENT_TYPE || 'dscr-consultation';
    const fullCalendlyLink = `https://calendly.com/${calendlyUsername}/${calendlyEventType}`;

    // Build response based on whether calendar event was created
    const response: any = {
      success: true,
      lead_id: lead.id,
      status: isNewLead ? 'created' : 'updated',
      contact_info: {
        phone: '(949) 339-3555',
        email: 'info@capitalbridgesolutions.com',
        hours: 'Monday-Friday: 8am-6pm PT, Saturday: 9am-2pm PT',
      },
    };

    if (calendarResult?.success) {
      // Calendar event created successfully
      response.message = `Perfect! Your call is scheduled${preferred_date ? ` for ${preferred_date}` : ''}${preferred_time ? ` at ${preferred_time}` : ''}. You'll receive a Google Calendar invite at ${email}.`;
      response.calendar_event = {
        scheduled: true,
        event_link: calendarResult.eventLink,
        meet_link: meetLink,
      };
      response.next_steps = [
        'Check your email for the Google Calendar invite',
        meetLink ? 'Join the call using the Google Meet link in the invite' : 'We\'ll call you at the scheduled time',
        'Add any questions or documents to the calendar event',
        'Our team will be prepared with your information',
      ];
    } else {
      // No specific time, or calendar creation failed
      response.message = 'Call request received! Our team will contact you shortly.';
      response.calendly_link = fullCalendlyLink;
      response.next_steps = [
        'Our team has been notified and will call you within 1 business day',
        'You can book a specific time using the Calendly link above',
        'We typically respond to ChatGPT inquiries within 2-4 hours',
        'Check your email for confirmation',
      ];
    }

    return NextResponse.json(response);

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
