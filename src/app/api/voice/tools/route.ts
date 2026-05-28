/**
 * Voice Chat Tool Execution API
 * Handles tool calls from OpenAI Realtime API with full database integration
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { scoreLead as scoreLeadFn } from '@/lib/scoring';
import { sendCapLeadNotification } from '@/lib/email';
import { LeadInputSchema } from '@/lib/schemas';

export const runtime = 'nodejs'; // Need Prisma

export async function POST(req: NextRequest) {
  try {
    const { tool, args } = await req.json();

    console.log('[Voice Tools] Executing:', tool);

    let result: any;

    switch (tool) {
      case 'saveLead': {
        const { leadDraft } = args;
        const validated = LeadInputSchema.parse(leadDraft);
        let lead;
        let isNewLead = false;

        try {
          // Check if lead exists by email/phone
          const existing = await prisma.lead.findFirst({
            where: {
              OR: [
                { email: validated.email },
                { phone: validated.phone },
              ],
            },
          });

          if (existing) {
            // Update existing
            lead = await prisma.lead.update({
              where: { id: existing.id },
              data: {
                ...validated,
                channel: 'voice_chat', // Mark as voice
                consentAt: validated.consentGiven ? new Date() : undefined,
              },
            });
            isNewLead = false;
          } else {
            // Create new
            lead = await prisma.lead.create({
              data: {
                ...validated,
                channel: 'voice_chat', // Mark as voice
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
              content: { tool: 'saveLead', result: 'success', channel: 'voice' },
              toolName: 'saveLead',
              toolInput: validated,
              toolOutput: { leadId: lead.id, status: isNewLead ? 'created' : 'updated' },
            },
          });
        } catch (dbError) {
          console.warn('[Database offline fallback] Failed to save voice lead in database, using memory fallback:', dbError);
          lead = {
            id: `fallback-lead-${Date.now()}`,
            ...validated,
            consentAt: validated.consentGiven ? new Date() : undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          isNewLead = true;

          // In offline mode, send the lead notification email immediately during saveLead
          try {
            await sendCapLeadNotification(lead);
            console.log('[Voice Tools saveLead Fallback] Resend email notification sent successfully');
          } catch (emailError) {
            console.error('[Voice Tools saveLead Fallback] Failed to send email:', emailError);
          }
        }

        result = {
          leadId: lead.id,
          status: isNewLead ? 'created' : 'updated',
          message: isNewLead 
            ? `Perfect! I've saved your information. Lead ID: ${lead.id}`
            : `Updated your information. Lead ID: ${lead.id}`,
        };

        console.log('[Voice Tools] Lead saved:', lead.id, isNewLead ? 'NEW' : 'UPDATED');
        break;
      }

      case 'scoreLead': {
        const { leadId } = args;
        let lead;
        let isFallback = false;

        try {
          if (String(leadId).startsWith('fallback-lead-')) {
            throw new Error('Database is offline (using fallback lead ID)');
          }

          // Get lead
          lead = await prisma.lead.findUnique({
            where: { id: leadId },
          });

          if (!lead) {
            throw new Error('Lead not found');
          }
        } catch (dbError) {
          console.warn('[Database offline fallback] Failed to load lead for scoring, using fallback scoring logic:', dbError);
          isFallback = true;
          lead = {
            id: leadId,
            name: 'Voice Chat Visitor',
            productType: 'dscr',
            loanAmountRequested: 500000,
          };
        }

        // Score it
        const scoreResult = await scoreLeadFn(lead as any);

        if (!isFallback) {
          try {
            // Update lead with score
            await prisma.lead.update({
              where: { id: leadId },
              data: {
                score: scoreResult.score,
                status: scoreResult.disposition === 'qualified' ? 'qualified' :
                       scoreResult.disposition === 'follow_up' ? 'follow_up' :
                       'disqualified',
                offer: scoreResult.preliminaryOffer as any,
              },
            });

            // Log interaction
            await prisma.interaction.create({
              data: {
                leadId,
                role: 'tool',
                content: { tool: 'scoreLead', result: scoreResult, channel: 'voice' },
                toolName: 'scoreLead',
                toolInput: { leadId },
                toolOutput: scoreResult,
              },
            });

            // Create event if qualified
            if (scoreResult.disposition === 'qualified') {
              await prisma.event.create({
                data: {
                  leadId,
                  type: 'alert_sales',
                  payload: {
                    message: `New qualified lead from VOICE: ${lead.name}`,
                    score: scoreResult.score,
                    offer: scoreResult.preliminaryOffer,
                    channel: 'voice_chat',
                  },
                },
              });
            }

            // Send email notification for qualified AND follow_up leads
            if (scoreResult.disposition === 'qualified' || scoreResult.disposition === 'follow_up') {
              await sendCapLeadNotification(lead, scoreResult);
              console.log(`[Voice Email] Sent notification for ${lead.name} (${scoreResult.disposition})`);
            }
          } catch (dbErrorDuringScore) {
            console.error('[Database offline during scoring] Error writing score to DB, falling back to email only:', dbErrorDuringScore);
            try {
              await sendCapLeadNotification(lead, scoreResult);
            } catch (emailErr) {
              console.error('[Voice Email score fallback] Email failed:', emailErr);
            }
          }
        } else {
          // If in fallback mode, send the scoring update email using Resend
          try {
            await sendCapLeadNotification(lead, scoreResult);
            console.log(`[Voice Email Fallback] Sent scoring update email for ${lead.name}`);
          } catch (emailError) {
            console.error('[Voice Email Fallback] Failed to send scoring update:', emailError);
          }
        }

        result = {
          ...scoreResult,
          message: scoreResult.disposition === 'qualified'
            ? `Great news! You're pre-qualified with a score of ${scoreResult.score}/100.`
            : scoreResult.disposition === 'follow_up'
            ? `You're looking good with a score of ${scoreResult.score}/100. Let's discuss your options.`
            : `Thanks for your interest. Based on your profile, we may need more information.`,
        };

        console.log('[Voice Tools] Lead scored:', leadId, scoreResult.disposition, scoreResult.score);
        break;
      }

      case 'scheduleCall': {
        const { leadId } = args;

        try {
          // Update lead status and create event
          if (leadId && leadId !== 'temp-lead-id' && !String(leadId).startsWith('fallback-lead-')) {
            await prisma.lead.update({
              where: { id: leadId },
              data: {
                status: 'follow_up', // Mark as follow-up when scheduling
              },
            });

            // Create event
            await prisma.event.create({
              data: {
                leadId,
                type: 'schedule',
                payload: {
                  message: `Call scheduling requested via voice chat`,
                  channel: 'voice_chat',
                },
              },
            });
          }
        } catch (dbError) {
          console.warn('[Database offline fallback] Failed to update call schedule in database:', dbError);
        }

        result = {
          meetingUrl: 'https://calendar.app.google/NVzWjvMWQ5uamkw8A?utm_source=voice_ai&utm_campaign=cap',
          message: 'Here\'s your scheduling link. Pick a time that works for you!',
        };

        console.log('[Voice Tools] Call scheduled for lead:', leadId);
        break;
      }

      case 'crmWebhook': {
        const { leadId, payload } = args;

        try {
          if (leadId && !String(leadId).startsWith('fallback-lead-')) {
            // Log webhook call
            await prisma.interaction.create({
              data: {
                leadId,
                role: 'tool',
                content: { tool: 'crmWebhook', payload, channel: 'voice' },
                toolName: 'crmWebhook',
                toolInput: { leadId, payload },
                toolOutput: { status: 'logged' },
              },
            });
          }
        } catch (dbError) {
          console.warn('[Database offline fallback] Failed to log CRM webhook interaction:', dbError);
        }

        result = {
          status: 'success',
          message: 'CRM webhook logged',
        };

        console.log('[Voice Tools] CRM webhook logged for lead:', leadId);
        break;
      }

      default:
        console.error('[Voice Tools] Unknown tool:', tool);
        return NextResponse.json(
          { error: `Unknown tool: ${tool}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, result });

  } catch (error) {
    console.error('[Voice Tools] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Tool execution failed',
        details: error 
      },
      { status: 500 }
    );
  }
}
