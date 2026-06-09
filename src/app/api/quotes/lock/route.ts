import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { LeadInputSchema } from '@/lib/schemas';
import { sendCapLeadNotification } from '@/lib/email';

export const runtime = 'nodejs'; // Needs Prisma

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quote_id, borrower } = body ?? {};

    if (!quote_id || !borrower || !borrower.name || !borrower.email || !borrower.phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required parameters: quote_id, borrower (name, email, phone)',
        },
        { status: 400 }
      );
    }

    // Parse the quote payload from quote_id
    let quoteData: any = {};
    try {
      if (quote_id.startsWith('q_A2A_')) {
        const base64Str = quote_id.substring(6);
        const decodedStr = Buffer.from(base64Str, 'base64').toString('utf-8');
        quoteData = JSON.parse(decodedStr);
      }
    } catch (parseError) {
      console.error('[A2A quotes-lock] Failed to parse quote_id:', parseError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid quote_id format',
        },
        { status: 400 }
      );
    }

    const leadDraft = {
      name: borrower.name as string,
      phone: borrower.phone as string,
      email: borrower.email as string,
      productType: 'dscr',
      loanAmountRequested: quoteData.loan_amount || 300000,
      notes: `A2A Gateway Quote Inquiry | Property type: ${quoteData.property_type || 'N/A'} | Price: $${quoteData.purchase_price || 'N/A'} | Rent: $${quoteData.estimated_rent || 'N/A'} | LTV: ${quoteData.loan_to_value || 'N/A'} | Credit Score FICO: ${quoteData.estimated_credit_score || 'N/A'} | State: ${quoteData.state || 'N/A'} | STR: ${quoteData.is_short_term_rental ? 'Yes' : 'No'}`,
      consentGiven: true,
      channel: 'a2a_gateway',
    };

    const validated = LeadInputSchema.parse(leadDraft);
    let lead;
    let isNewLead = false;

    try {
      const existing = await prisma.lead.findFirst({
        where: {
          OR: [{ email: validated.email }, { phone: validated.phone }],
        },
      });

      if (existing) {
        lead = await prisma.lead.update({
          where: { id: existing.id },
          data: {
            ...validated,
            consentAt: validated.consentGiven ? new Date() : undefined,
          },
        });
      } else {
        lead = await prisma.lead.create({
          data: {
            ...validated,
            consentAt: validated.consentGiven ? new Date() : undefined,
          },
        });
        isNewLead = true;
      }

      // Log interaction
      await prisma.interaction.create({
        data: {
          leadId: lead.id,
          role: 'tool',
          content: { endpoint: 'quotes/lock', result: 'success', quote: quoteData },
          toolName: 'a2a_rate_lock',
          toolInput: { quote_id, borrower },
          toolOutput: { leadId: lead.id, status: isNewLead ? 'created' : 'updated' },
        },
      });
    } catch (dbError) {
      console.warn('[A2A quotes-lock] Database offline fallback:', dbError);
      lead = {
        id: `fallback-a2a-${Date.now()}`,
        ...validated,
        consentAt: validated.consentGiven ? new Date() : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      isNewLead = true;
    }

    // Send notifications
    try {
      await sendCapLeadNotification(lead);
    } catch (emailError) {
      console.error('[A2A quotes-lock] Failed to send notification email:', emailError);
    }

    return NextResponse.json({
      status: 'pending_review',
      message: `Your loan quote inquiry has been submitted successfully. A Capital Bridge Solutions lending officer is reviewing your scenario and will contact you directly at ${borrower.email} or ${borrower.phone} to discuss customized rate ranges, loan options, and pre-approval requirements.`,
    });

  } catch (error) {
    console.error('[A2A quotes-lock] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
