/**
 * AI Agent Chat API
 * Streams responses from OpenAI with tool calling support
 * Tools: searchKnowledgeBase, perplexitySearch, saveLead, scoreLead, scheduleCall, crmWebhook
 */

import OpenAI from 'openai';
import { env } from '@/lib/env';
import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase } from '@/lib/knowledge-base';
import { perplexitySearch } from '@/lib/perplexity';
import { scoreLead as scoreLeadFn } from '@/lib/scoring';
import { analyzeDeal, PropertyInputs } from '@/lib/dealAnalyzer';
import { prisma } from '@/lib/db';
import { sendCapLeadNotification } from '@/lib/email';
import {
  LeadInputSchema,
  PerplexityQuerySchema,
  SaveLeadResponseSchema,
  ScheduleCallResponseSchema,
  CRMWebhookResponseSchema,
} from '@/lib/schemas';
import { SYSTEM_PROMPT } from '@/constants/prompts';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const runtime = 'nodejs'; // Need Prisma, so use Node runtime

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Define tools once for reuse
    const tools = [
        {
          type: 'function',
          function: {
            name: 'searchKnowledgeBase',
            description: 'Search Capital Bridge Solutions knowledge base for detailed information about DSCR loans, requirements, rates, property types, and investor scenarios. Use this FIRST when investors ask questions.',
            parameters: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (e.g., "620 credit score requirements", "Airbnb short-term rental loans", "self-employed investors")',
                },
                topK: {
                  type: 'number',
                  description: 'Number of results to return (default: 3)',
                },
              },
              required: ['query'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'perplexitySearch',
            description: 'Search for property and market information using Perplexity AI. Returns cited sources. Use sparingly (max once per conversation).',
            parameters: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query (e.g., "123 Main St Sacramento CA real estate market zoning")',
                },
                address: {
                  type: 'string',
                  description: 'Property address if available (for cache key)',
                },
                zip: {
                  type: 'string',
                  description: 'ZIP code if available (for cache key)',
                },
              },
              required: ['query'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'saveLead',
            description: 'DIRECTLY save lead information into Capital Bridge Solutions CRM database. This is NOT forwarding to anyone - it saves directly into OUR system. Call this immediately after collecting all required fields. Returns leadId for subsequent operations.',
            parameters: {
              type: 'object',
              properties: {
                leadDraft: {
                  type: 'object',
                  description: 'Lead data to save',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    productType: {
                      type: 'string',
                      enum: ['hard_money', 'dscr', 'fix_flip', 'balloon_refi', 'note_finance'],
                    },
                    address: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    zip: { type: 'string' },
                    propertyType: { type: 'string' },
                    loanAmountRequested: { type: 'number' },
                    timeline: { type: 'string' },
                    exitStrategy: { type: 'string' },
                    rehabBudget: { type: 'number' },
                    arv: { type: 'number' },
                    rentalIncome: { type: 'number' },
                    dscrInputs: { type: 'object' },
                    currentMortgageInfo: { type: 'object' },
                    notes: { type: 'string' },
                    consentGiven: { type: 'boolean' },
                  },
                  required: ['name', 'email', 'phone', 'productType'],
                },
              },
              required: ['leadDraft'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'scoreLead',
            description: 'DIRECTLY analyze the lead in OUR system and generate a real preliminary loan offer from Capital Bridge Solutions. This is YOUR analysis system - not sending to anyone else. Call immediately after saveLead() to provide the investor with their personalized offer.',
            parameters: {
              type: 'object',
              properties: {
                leadId: {
                  type: 'string',
                  description: 'Lead ID from saveLead response',
                },
              },
              required: ['leadId'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'analyzeDeal',
            description: 'Analyze investment property deal with comprehensive financial calculations. Returns DSCR, cash flow, ROI, cap rate, and qualification status. Use when investor asks about specific property numbers or wants to analyze a deal.',
            parameters: {
              type: 'object',
              properties: {
                purchasePrice: {
                  type: 'number',
                  description: 'Property purchase price',
                },
                downPaymentPercent: {
                  type: 'number',
                  description: 'Down payment percentage (e.g., 25 for 25%)',
                },
                interestRate: {
                  type: 'number',
                  description: 'Annual interest rate (e.g., 6.99 for 6.99%)',
                },
                loanTermYears: {
                  type: 'number',
                  description: 'Loan term in years (default: 30)',
                },
                monthlyRent: {
                  type: 'number',
                  description: 'Expected monthly rental income',
                },
                propertyTaxRate: {
                  type: 'number',
                  description: 'Annual property tax rate as percentage (optional, default: 1.2)',
                },
                insurance: {
                  type: 'number',
                  description: 'Monthly insurance cost (optional, default: 150)',
                },
                propertyManagement: {
                  type: 'number',
                  description: 'Monthly property management fee (optional, default: 8% of rent)',
                },
                maintenance: {
                  type: 'number',
                  description: 'Monthly maintenance budget (optional, default: 10% of rent)',
                },
                vacancyRate: {
                  type: 'number',
                  description: 'Vacancy rate percentage (optional, default: 5)',
                },
                closingCostsPercent: {
                  type: 'number',
                  description: 'Closing costs as percentage (optional, default: 3)',
                },
                rehabCosts: {
                  type: 'number',
                  description: 'Renovation/rehab costs (optional, default: 0)',
                },
              },
              required: ['purchasePrice', 'downPaymentPercent', 'interestRate', 'loanTermYears', 'monthlyRent'],
            },
          },
        },
      ];

    // Create chat completion with tools enabled
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: false,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
      tools: tools as any,
      tool_choice: 'auto',
    });

    // Format recent user/assistant conversation transcript for lead context
    const transcriptSummary = Array.isArray(messages)
      ? messages
          .slice(-12)
          .map((m: any) => {
            const text =
              typeof m.content === 'string'
                ? m.content
                : Array.isArray(m.content)
                ? m.content.map((p: any) => p.text || '[Image]').join(' ')
                : '';
            return `${(m.role || 'user').toUpperCase()}: ${text.slice(0, 300)}`;
          })
          .join('\n')
      : '';

    // Track saved leads in-memory during this request so scoreLead in Round 2 works even if DB is in fallback mode
    const inMemoryLeads = new Map<string, any>();

    const executeToolCall = async (toolCall: any): Promise<any> => {
      console.log('[Agent] Executing tool:', toolCall.function.name);
      const rawArgs = JSON.parse(toolCall.function.arguments || '{}');

      switch (toolCall.function.name) {
        case 'searchKnowledgeBase': {
          const { query, topK = 3 } = rawArgs;
          const results = await searchKnowledgeBase(String(query), Number(topK) || 3);
          return {
            results: results.map((r) => ({
              title: r.chunk.title,
              url: r.chunk.url,
              content: r.chunk.content,
              similarity: r.similarity,
            })),
            count: results.length,
          };
        }

        case 'perplexitySearch': {
          const params = PerplexityQuerySchema.parse(rawArgs);
          const searchResult = await perplexitySearch(params);
          if (searchResult.snippets.length === 0) {
            return {
              success: false,
              message:
                'No property information found. The website may be blocking access or the property may not be publicly listed.',
              snippets: [],
            };
          }
          return {
            success: true,
            snippets: searchResult.snippets,
            cached: searchResult.cached,
          };
        }

        case 'saveLead': {
          const { leadDraft } = rawArgs;
          const validated = LeadInputSchema.parse(leadDraft);
          const enrichedNotes = [
            validated.notes || 'Web Chat Inquiry',
            transcriptSummary ? `\n--- Chat Transcript ---\n${transcriptSummary}` : '',
          ]
            .filter(Boolean)
            .join('\n');

          let lead: any;
          let isNewLead = false;

          try {
            const existing = await prisma.lead.findFirst({
              where: {
                OR: [{ email: validated.email }, { phone: validated.phone }],
              },
            });

            if (existing) {
              const mergedNotes = existing.notes
                ? `${existing.notes}\n\n[Chat Update ${new Date().toISOString()}]: ${enrichedNotes}`
                : enrichedNotes;
              lead = await prisma.lead.update({
                where: { id: existing.id },
                data: {
                  ...validated,
                  notes: mergedNotes,
                  consentAt: validated.consentGiven ? new Date() : undefined,
                },
              });
              isNewLead = false;
            } else {
              lead = await prisma.lead.create({
                data: {
                  ...validated,
                  notes: enrichedNotes,
                  channel: 'web_chat',
                  consentAt: validated.consentGiven ? new Date() : undefined,
                },
              });
              isNewLead = true;
            }

            await prisma.interaction.create({
              data: {
                leadId: lead.id,
                role: 'tool',
                content: { tool: 'saveLead', result: 'success', transcript: transcriptSummary },
                toolName: 'saveLead',
                toolInput: validated as any,
                toolOutput: { leadId: lead.id, status: isNewLead ? 'created' : 'updated' },
              },
            });
          } catch (dbError) {
            console.warn(
              '[Database offline fallback] Failed to save lead in database for web_chat, using memory fallback:',
              dbError
            );
            lead = {
              id: `fallback-lead-${Date.now()}`,
              ...validated,
              notes: enrichedNotes,
              channel: 'web_chat',
              consentAt: validated.consentGiven ? new Date() : undefined,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            isNewLead = true;
          }

          inMemoryLeads.set(lead.id, lead);

          try {
            await sendCapLeadNotification(lead);
            console.log('[saveLead] Email + Telegram notification sent for:', lead.name);
          } catch (emailError) {
            console.error('[saveLead] Failed to send notification:', emailError);
          }

          return SaveLeadResponseSchema.parse({
            leadId: lead.id,
            status: isNewLead ? 'created' : 'updated',
          });
        }

        case 'scoreLead': {
          const { leadId } = rawArgs;
          let lead: any = inMemoryLeads.get(leadId);
          let isFallback = String(leadId).startsWith('fallback-lead-');

          if (!lead && !isFallback) {
            try {
              lead = await prisma.lead.findUnique({ where: { id: leadId } });
            } catch (dbError) {
              console.warn('[scoreLead] DB lookup failed, using fallback lead:', dbError);
              isFallback = true;
            }
          }

          if (!lead) {
            isFallback = true;
            lead = {
              id: leadId || `fallback-lead-${Date.now()}`,
              name: 'Web Chat Investor',
              email: 'pending@capitalbridgesolutions.com',
              phone: 'Not provided',
              productType: 'dscr',
              loanAmountRequested: 500000,
              notes: transcriptSummary,
            };
          }

          const scoreResult = await scoreLeadFn(lead as any);

          if (!isFallback) {
            try {
              await prisma.lead.update({
                where: { id: leadId },
                data: {
                  score: scoreResult.score,
                  status:
                    scoreResult.disposition === 'qualified'
                      ? 'qualified'
                      : scoreResult.disposition === 'follow_up'
                      ? 'follow_up'
                      : 'disqualified',
                  offer: scoreResult.preliminaryOffer as any,
                },
              });

              await prisma.interaction.create({
                data: {
                  leadId,
                  role: 'tool',
                  content: { tool: 'scoreLead', result: scoreResult },
                  toolName: 'scoreLead',
                  toolInput: { leadId },
                  toolOutput: scoreResult as any,
                },
              });
            } catch (dbErr) {
              console.warn('[scoreLead] Non-critical DB update error:', dbErr);
            }
          }

          return scoreResult;
        }

        case 'analyzeDeal': {
          const inputs: PropertyInputs = {
            purchasePrice: Number(rawArgs.purchasePrice) || 0,
            downPaymentPercent: Number(rawArgs.downPaymentPercent) || 20,
            closingCostsPercent: Number(rawArgs.closingCostsPercent ?? 2.5),
            rehabCosts: Number(rawArgs.rehabCosts ?? 0),
            interestRate: Number(rawArgs.interestRate) || 5.99,
            loanTermYears: Number(rawArgs.loanTermYears) || 30,
            monthlyRent: Number(rawArgs.monthlyRent) || 0,
            otherMonthlyIncome: Number(rawArgs.otherMonthlyIncome ?? 0),
            vacancyRate: Number(rawArgs.vacancyRate ?? 0),
            propertyTaxRate: Number(rawArgs.propertyTaxRate ?? 1.1),
            insurance: Number(rawArgs.insurance ?? 125),
            hoaFees: Number(rawArgs.hoaFees ?? 0),
            propertyManagement: Number(rawArgs.propertyManagement ?? 0),
            maintenance: Number(rawArgs.maintenance ?? 0),
            utilities: Number(rawArgs.utilities ?? 0),
            otherExpenses: Number(rawArgs.otherExpenses ?? 0),
          };

          const analysis = analyzeDeal(inputs);
          const monthlyPITIA = Math.round(
            analysis.monthly.debtService +
              analysis.monthly.propertyTax +
              analysis.monthly.insurance +
              analysis.monthly.hoaFees
          );

          return {
            success: true,
            summary: {
              totalCashNeeded: Math.round(analysis.acquisition.totalCashNeeded),
              loanAmount: Math.round(analysis.acquisition.loanAmount),
              monthlyPaymentPI: Math.round(analysis.monthly.debtService),
              monthlyPITIA,
              monthlyCashFlow: Math.round(analysis.monthly.cashFlow),
              annualCashFlow: Math.round(analysis.annual.cashFlow),
              dscr: Number(analysis.metrics.dscr.toFixed(2)),
              cashOnCashReturn: Number(analysis.metrics.cashOnCashReturn.toFixed(2)),
              capRate: Number(analysis.metrics.capRate.toFixed(2)),
              qualifies: analysis.qualification.dcsrQualifies,
              recommendation: analysis.qualification.recommendation,
            },
            fullAnalysis: analysis,
          };
        }

        default:
          return { error: `Unknown tool: ${toolCall.function.name}` };
      }
    };

    // Handle tool calls if present
    const choice = response.choices[0];
    if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
      const toolMessages = [];

      for (const toolCall of choice.message.tool_calls) {
        let result: any;
        try {
          result = await executeToolCall(toolCall);
        } catch (error) {
          console.error('[Agent] Tool error (round 1):', error);
          result = { error: error instanceof Error ? error.message : 'Tool execution failed' };
        }

        toolMessages.push({
          role: 'tool' as const,
          content: typeof result === 'string' ? result : JSON.stringify(result),
          tool_call_id: toolCall.id,
        });
      }

      // Make another API call with tool results
      const followUpResponse = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
          choice.message,
          ...toolMessages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
        tools: tools as any,
        tool_choice: 'auto',
      });

      const followUpChoice = followUpResponse.choices[0];
      if (followUpChoice.finish_reason === 'tool_calls' && followUpChoice.message.tool_calls) {
        const secondToolMessages = [];

        for (const toolCall of followUpChoice.message.tool_calls) {
          let result: any;
          try {
            result = await executeToolCall(toolCall);
          } catch (error) {
            console.error('[Agent] Tool error (round 2):', error);
            result = { error: error instanceof Error ? error.message : 'Tool execution failed' };
          }

          secondToolMessages.push({
            role: 'tool' as const,
            content: typeof result === 'string' ? result : JSON.stringify(result),
            tool_call_id: toolCall.id,
          });
        }
        
        // Final response with both tool results
        const finalResponse = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
            choice.message,
            ...toolMessages,
            followUpChoice.message,
            ...secondToolMessages,
          ],
          temperature: 0.7,
          max_tokens: 1000,
        });
        
        // Extract content with null safety
        const finalContent = finalResponse.choices[0]?.message?.content;
        
        if (!finalContent) {
          console.error('[Agent] Empty response from OpenAI (final)');
          return new Response(
            JSON.stringify({ 
              error: 'AI returned empty response', 
              message: 'I apologize, but I encountered an issue processing your request. Please try again.' 
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ 
            message: finalContent,
            choices: [{ message: { content: finalContent } }] // OpenAI format compatibility
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Extract content with null safety
      const followUpContent = followUpChoice.message?.content;
      
      if (!followUpContent) {
        console.error('[Agent] Empty response from OpenAI (follow-up)');
        return new Response(
          JSON.stringify({ 
            error: 'AI returned empty response', 
            message: 'I apologize, but I encountered an issue processing your request. Please try again.' 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          message: followUpContent,
          choices: [{ message: { content: followUpContent } }] // OpenAI format compatibility
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // No tool calls, return direct response with null safety
    const directContent = choice.message?.content;
    
    if (!directContent) {
      console.error('[Agent] Empty response from OpenAI (direct)');
      return new Response(
        JSON.stringify({ 
          error: 'AI returned empty response', 
          message: 'I apologize, but I encountered an issue processing your request. Please try again.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        message: directContent,
        choices: [{ message: { content: directContent } }] // OpenAI format compatibility
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );

    /* Tool calling temporarily disabled for stability
    const stream = {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of response) {
          yield chunk;
        }
      }
    };
    
    const handleToolCalls = async (toolCall: any, appendToolCallMessage: any) => {
        // Log tool call
        console.log('[Agent] Tool call:', toolCall.name, toolCall.arguments);

        try {
          let result: any;

          switch (toolCall.name) {
            case 'perplexitySearch': {
              const params = PerplexityQuerySchema.parse(JSON.parse(toolCall.arguments));
              result = await perplexitySearch(params);
              break;
            }

            case 'saveLead': {
              const { leadDraft } = JSON.parse(toolCall.arguments);
              const validated = LeadInputSchema.parse(leadDraft);
              let lead;
              let isNewLead = false;
              let isUpdated = false;

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
                      consentAt: validated.consentGiven ? new Date() : undefined,
                    },
                  });
                  isUpdated = true;
                } else {
                  // Create new
                  lead = await prisma.lead.create({
                    data: {
                      ...validated,
                      channel: 'web_chat',
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
                    content: { tool: 'saveLead', result: 'success' },
                    toolName: 'saveLead',
                    toolInput: validated,
                    toolOutput: { leadId: lead.id },
                  },
                });
              } catch (dbError) {
                console.warn('[Database offline fallback] Failed to save lead in database for web_chat, using memory fallback:', dbError);
                lead = {
                  id: `fallback-lead-${Date.now()}`,
                  ...validated,
                  consentAt: validated.consentGiven ? new Date() : undefined,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                };
                isNewLead = true;

                // Send email immediately in saveLead if DB is offline
                try {
                  await sendCapLeadNotification(lead);
                  console.log('[saveLead Fallback 2] Resend email notification sent successfully');
                } catch (emailError) {
                  console.error('[saveLead Fallback 2] Failed to send email:', emailError);
                }
              }

              result = SaveLeadResponseSchema.parse({
                leadId: lead.id,
                status: isUpdated ? 'updated' : 'created',
              });
              break;
            }

            case 'scoreLead': {
              const { leadId } = JSON.parse(toolCall.arguments);
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
                  name: 'Web Chat Visitor',
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
                      content: { tool: 'scoreLead', result: scoreResult },
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
                          message: `New qualified lead: ${lead.name}`,
                          score: scoreResult.score,
                          offer: scoreResult.preliminaryOffer,
                        },
                      },
                    });
                  }

                  // Send email notification for qualified AND follow_up leads
                  if (scoreResult.disposition === 'qualified' || scoreResult.disposition === 'follow_up') {
                    await sendCapLeadNotification(lead, scoreResult);
                    console.log(`[Email] Sent notification for ${lead.name} (${scoreResult.disposition})`);
                  }
                } catch (dbErrorDuringScore) {
                  console.error('[Database offline during scoring] Error writing score to DB, falling back to email only:', dbErrorDuringScore);
                  try {
                    await sendCapLeadNotification(lead, scoreResult);
                  } catch (emailErr) {
                    console.error('[Email score fallback] Email failed:', emailErr);
                  }
                }
              } else {
                // If in fallback mode, send the scoring update email using Resend
                try {
                  await sendCapLeadNotification(lead, scoreResult);
                  console.log(`[Email Fallback] Sent scoring update email for ${lead.name}`);
                } catch (emailError) {
                  console.error('[Email Fallback] Failed to send scoring update:', emailError);
                }
              }

              result = scoreResult;
              break;
            }

            case 'scheduleCall': {
              const { leadId, preferredSlot } = JSON.parse(toolCall.arguments);

              // Google Calendar Appointment Schedule booking page with UTM tracking
              const meetingUrl = process.env.BOOKING_URL || 'https://calendar.app.google/NVzWjvMWQ5uamkw8A?utm_source=ai_chat&utm_medium=cap&utm_campaign=lead_conversion';

              // Log event
              await prisma.event.create({
                data: {
                  leadId,
                  type: 'schedule',
                  payload: { meetingUrl, preferredSlot },
                },
              });

              result = ScheduleCallResponseSchema.parse({
                meetingUrl,
                scheduledFor: preferredSlot,
              });
              break;
            }

            case 'crmWebhook': {
              const { leadId, payload } = JSON.parse(toolCall.arguments);

              // TODO: Send to actual CRM webhook
              console.log('[CRM Webhook] Sending:', { leadId, payload });

              // Log event
              await prisma.event.create({
                data: {
                  leadId,
                  type: 'crm_webhook',
                  payload,
                },
              });

              result = CRMWebhookResponseSchema.parse({
                ok: true,
                timestamp: new Date().toISOString(),
              });
              break;
            }

            default:
              throw new Error(`Unknown tool: ${toolCall.name}`);
          }

          // Append tool result to conversation
          const toolMessage = {
            role: 'tool' as const,
            content: JSON.stringify(result),
            tool_call_id: toolCall.id,
          };

          return appendToolCallMessage(toolMessage);

        } catch (error) {
          console.error('[Agent] Tool error:', error);
          
          const errorMessage = {
            role: 'tool' as const,
            content: JSON.stringify({
              error: error instanceof Error ? error.message : 'Tool execution failed',
            }),
            tool_call_id: toolCall.id,
          };

          return appendToolCallMessage(errorMessage);
        }
      }
    };
    */

  } catch (error) {
    console.error('[Agent] Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
