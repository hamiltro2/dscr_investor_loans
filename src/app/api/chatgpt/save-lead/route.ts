import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { LeadInputSchema } from '@/lib/schemas';
import { sendCapLeadNotification } from '@/lib/email';

export const runtime = 'nodejs'; // Need Prisma

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      full_name,
      phone,
      email,
      loan_amount,
      credit_score_range,
      notes,
      productType,
    } = body ?? {};

    if (!full_name || !phone || !email || typeof loan_amount !== 'number' || !credit_score_range) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Missing required fields: full_name, phone, email, loan_amount (number), credit_score_range',
        },
        { status: 400 },
      );
    }

    const combinedNotesParts: string[] = [];
    if (notes) combinedNotesParts.push(String(notes));
    if (credit_score_range) {
      combinedNotesParts.push(`Credit score range: ${credit_score_range}`);
    }
    const combinedNotes = combinedNotesParts.join(' | ');

    const leadDraft = {
      name: full_name as string,
      phone: phone as string,
      email: email as string,
      productType: (productType as any) ?? 'dscr',
      loanAmountRequested: loan_amount as number,
      notes: combinedNotes || undefined,
      consentGiven: true,
      channel: 'chatgpt_app',
    };

    const validated = LeadInputSchema.parse(leadDraft);

    const existing = await prisma.lead.findFirst({
      where: {
        OR: [{ email: validated.email }, { phone: validated.phone }],
      },
    });

    let lead;
    let isNewLead = false;

    if (existing) {
      lead = await prisma.lead.update({
        where: { id: existing.id },
        data: {
          ...validated,
          channel: 'chatgpt_app',
          consentAt: validated.consentGiven ? new Date() : undefined,
        },
      });
    } else {
      lead = await prisma.lead.create({
        data: {
          ...validated,
          channel: 'chatgpt_app',
          consentAt: validated.consentGiven ? new Date() : undefined,
        },
      });
      isNewLead = true;
    }

    await prisma.interaction.create({
      data: {
        leadId: lead.id,
        role: 'tool',
        content: { endpoint: 'chatgpt/save-lead', result: 'success' },
        toolName: 'chatgpt_save_lead',
        toolInput: validated,
        toolOutput: { leadId: lead.id, status: isNewLead ? 'created' : 'updated' },
      },
    });

    try {
      await sendCapLeadNotification(lead);
    } catch (error) {
      console.error('[ChatGPT save-lead] Failed to send email notification:', error);
      // Do not fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      status: isNewLead ? 'created' : 'updated',
    });
  } catch (error) {
    console.error('[ChatGPT save-lead] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 },
    );
  }
}
