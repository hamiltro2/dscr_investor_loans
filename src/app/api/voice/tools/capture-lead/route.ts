/**
 * Ultravox Lead Capture Endpoint
 * Receives lead information from Ultravox capture_lead_information tool
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { LeadInputSchema } from '@/lib/schemas';
import { sendCapLeadNotification } from '@/lib/email';
import { z } from 'zod';

export const runtime = 'nodejs';

// Schema for Ultravox tool input
const UltravoxLeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  loanAmount: z.number().positive(),
  creditScore: z.number().min(300).max(850),
  propertyAddress: z.string().optional(),
  propertyValue: z.number().optional(),
  propertyType: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    console.log('[Ultravox Lead Capture] Received request');
    
    const body = await req.json();
    console.log('[Ultravox Lead Capture] Body:', JSON.stringify(body, null, 2));
    
    // Validate input
    const validated = UltravoxLeadSchema.parse(body);
    
    // Transform to LeadInput format
    const leadData = {
      name: validated.name,
      phone: validated.phone,
      email: validated.email,
      productType: 'dscr' as const, // Default to DSCR (primary product)
      loanAmountRequested: validated.loanAmount,
      address: validated.propertyAddress || null,
      propertyType: validated.propertyType || null,
      notes: validated.notes || 'Voice chat inquiry via Ultravox',
      consentGiven: true, // Implicit consent through conversation
      // Store credit score in notes since schema doesn't have dedicated field
      dscrInputs: {
        creditScore: validated.creditScore,
      },
    };

    // Check if lead exists by email or phone
    const existing = await prisma.lead.findFirst({
      where: {
        OR: [
          { email: leadData.email },
          { phone: leadData.phone },
        ],
      },
    });

    let lead;
    let isNewLead = false;

    if (existing) {
      // Update existing lead
      lead = await prisma.lead.update({
        where: { id: existing.id },
        data: {
          ...leadData,
          channel: 'voice_chat_ultravox',
          consentAt: new Date(),
        },
      });
      isNewLead = false;
      console.log('[Ultravox Lead Capture] Updated existing lead:', lead.id);
    } else {
      // Create new lead
      lead = await prisma.lead.create({
        data: {
          ...leadData,
          channel: 'voice_chat_ultravox',
          consentAt: new Date(),
        },
      });
      isNewLead = true;
      console.log('[Ultravox Lead Capture] Created new lead:', lead.id);
    }

    // Log interaction
    await prisma.interaction.create({
      data: {
        leadId: lead.id,
        role: 'tool',
        content: {
          tool: 'capture_lead_information',
          result: 'success',
          channel: 'ultravox',
          points: '450K+',
        },
        toolName: 'capture_lead_information',
        toolInput: validated,
        toolOutput: {
          leadId: lead.id,
          status: isNewLead ? 'created' : 'updated',
        },
      },
    });

    // Send email notification to team
    try {
      await sendCapLeadNotification(lead);
      console.log('[Ultravox Lead Capture] Email notification sent');
    } catch (emailError) {
      console.error('[Ultravox Lead Capture] Email failed (non-critical):', emailError);
      // Don't fail the request if email fails - lead is already saved
    }

    // Return response for Ultravox
    const response = {
      leadId: lead.id,
      status: isNewLead ? 'created' : 'updated',
      message: isNewLead
        ? `Perfect! I've saved your information. Lead ID: ${lead.id}. Our team will reach out within 24 hours to get you pre-approved!`
        : `Updated your information. Lead ID: ${lead.id}. Our team will reach out within 24 hours!`,
    };

    console.log('[Ultravox Lead Capture] Success:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('[Ultravox Lead Capture] Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to capture lead',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
