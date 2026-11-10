/**
 * Ultravox & Voice Modal Lead Capture Endpoint
 * Receives lead information from Ultravox capture_lead_information tool or LeadCaptureModal
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendCapLeadNotification } from '@/lib/email';
import { z } from 'zod';

export const runtime = 'nodejs';

// Helper to clean LLM placeholder strings ("None", "null", "N/A", "")
const cleanOptionalString = z.preprocess((val) => {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (
      !trimmed ||
      /^(none|null|undefined|n\/a|unknown)$/i.test(trimmed)
    ) {
      return undefined;
    }
    return trimmed;
  }
  return String(val);
}, z.string().optional());

// Helper to parse LLM numbers ("450000", "$450,000", "450k", "1.5M", or "None")
const coerceOptionalNumber = z.preprocess((val) => {
  if (val === null || val === undefined) return undefined;
  if (typeof val === 'number') return isNaN(val) ? undefined : val;
  if (typeof val === 'string') {
    const trimmed = val.trim().toLowerCase();
    if (!trimmed || /^(none|null|undefined|n\/a|unknown)$/i.test(trimmed)) {
      return undefined;
    }
    const cleaned = trimmed.replace(/[$,\s]/g, '');
    if (cleaned.endsWith('m')) {
      const n = parseFloat(cleaned.slice(0, -1)) * 1_000_000;
      return isNaN(n) ? undefined : n;
    }
    if (cleaned.endsWith('k')) {
      const n = parseFloat(cleaned.slice(0, -1)) * 1_000;
      return isNaN(n) ? undefined : n;
    }
    const n = parseFloat(cleaned);
    return isNaN(n) ? undefined : n;
  }
  return undefined;
}, z.number().optional());

// Schema for Ultravox tool input (tolerant of string-encoded numbers & "None" strings)
const UltravoxLeadSchema = z.object({
  name: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() && !/^(none|null)$/i.test(v.trim()) ? v.trim() : 'Voice Caller'),
    z.string().min(1)
  ),
  phone: z.preprocess(
    (v) => (typeof v === 'string' ? v.trim() : String(v ?? '')),
    z.string().min(1)
  ),
  email: z.preprocess(
    (v) => (typeof v === 'string' ? v.trim().replace(/\s+/g, '') : v),
    z.string().email()
  ),
  loanAmount: coerceOptionalNumber,
  creditScore: coerceOptionalNumber,
  propertyAddress: cleanOptionalString,
  propertyValue: coerceOptionalNumber,
  propertyType: cleanOptionalString,
  productType: cleanOptionalString,
  notes: cleanOptionalString,
  transcript: cleanOptionalString,
});

export async function POST(req: NextRequest) {
  try {
    console.log('[Ultravox Lead Capture] Received request');

    const body = await req.json();
    console.log('[Ultravox Lead Capture] Body:', JSON.stringify(body, null, 2));

    // Validate & coerce input
    const validated = UltravoxLeadSchema.parse(body);

    const normalizedProductType =
      validated.productType &&
      ['hard_money', 'dscr', 'fix_flip', 'balloon_refi', 'note_finance'].includes(validated.productType)
        ? (validated.productType as 'hard_money' | 'dscr' | 'fix_flip' | 'balloon_refi' | 'note_finance')
        : ('dscr' as const);

    const combinedNotes = [
      validated.notes || 'Voice chat inquiry via Cap (Ultravox)',
      validated.creditScore ? `Est. Credit Score: ${validated.creditScore}` : '',
      validated.propertyValue ? `Est. Property Value: $${validated.propertyValue.toLocaleString()}` : '',
      validated.transcript ? `\n--- Voice Transcript ---\n${validated.transcript}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    // Transform to LeadInput format
    const leadData = {
      name: validated.name,
      phone: validated.phone,
      email: validated.email,
      productType: normalizedProductType,
      loanAmountRequested: validated.loanAmount && validated.loanAmount > 0 ? validated.loanAmount : 450000,
      address: validated.propertyAddress || null,
      propertyType: validated.propertyType || 'Single Family / Investment',
      notes: combinedNotes,
      consentGiven: true,
      dscrInputs: validated.creditScore
        ? {
            creditScore: validated.creditScore,
          }
        : undefined,
    };

    let lead: any;
    let isNewLead = false;

    try {
      // Check if lead exists by email or phone
      const existing = await prisma.lead.findFirst({
        where: {
          OR: [{ email: leadData.email }, { phone: leadData.phone }],
        },
      });

      if (existing) {
        const mergedNotes = existing.notes
          ? `${existing.notes}\n\n[Voice Update ${new Date().toISOString()}]: ${combinedNotes}`
          : combinedNotes;

        lead = await prisma.lead.update({
          where: { id: existing.id },
          data: {
            ...leadData,
            notes: mergedNotes,
            channel: 'voice_chat_ultravox',
            consentAt: new Date(),
          },
        });
        isNewLead = false;
        console.log('[Ultravox Lead Capture] Updated existing lead:', lead.id);
      } else {
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
            transcript: validated.transcript || null,
          },
          toolName: 'capture_lead_information',
          toolInput: validated as any,
          toolOutput: {
            leadId: lead.id,
            status: isNewLead ? 'created' : 'updated',
          },
        },
      });
    } catch (dbError) {
      console.warn(
        '[Database offline fallback] Failed to write Ultravox lead to database, using memory fallback:',
        dbError
      );
      lead = {
        id: `fallback-lead-${Date.now()}`,
        ...leadData,
        channel: 'voice_chat_ultravox',
        consentAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      isNewLead = true;
    }

    // Send Email + Telegram notification to team
    try {
      await sendCapLeadNotification(lead);
      console.log('[Ultravox Lead Capture] Email + Telegram notification sent');
    } catch (emailError) {
      console.error('[Ultravox Lead Capture] Notification error (non-critical):', emailError);
    }

    const response = {
      leadId: lead.id,
      status: isNewLead ? 'created' : 'updated',
      message: isNewLead
        ? `Perfect! I've saved your information (Lead ID: ${lead.id}). Our senior underwriting team will reach out within 24 hours to finalize your pre-approval!`
        : `Updated your information (Lead ID: ${lead.id}). Our team will reach out within 24 hours!`,
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
