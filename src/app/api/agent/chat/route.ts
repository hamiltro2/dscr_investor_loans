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
            name: 'scheduleCall',
            description: 'Generate scheduling link for follow-up call',
            parameters: {
              type: 'object',
              properties: {
                leadId: { type: 'string' },
                preferredSlot: { type: 'string' },
              },
              required: ['leadId'],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'crmWebhook',
            description: 'Send lead data to CRM system',
            parameters: {
              type: 'object',
              properties: {
                leadId: { type: 'string' },
                payload: { type: 'object' },
              },
              required: ['leadId', 'payload'],
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

    // Handle tool calls if present
    const choice = response.choices[0];
    if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
      // Process tool calls
      const toolMessages = [];
      
      for (const toolCall of choice.message.tool_calls) {
        console.log('[Agent] Tool call:', toolCall.function.name);
        
        let result: any;
        
        try {
          switch (toolCall.function.name) {
            case 'searchKnowledgeBase': {
              const { query, topK = 3 } = JSON.parse(toolCall.function.arguments);
              const results = await searchKnowledgeBase(query, topK);
              // Format results for the AI
              result = {
                results: results.map(r => ({
                  title: r.chunk.title,
                  url: r.chunk.url,
                  content: r.chunk.content,
                  similarity: r.similarity,
                })),
                count: results.length,
              };
              break;
            }

            case 'saveLead': {
              const { leadDraft } = JSON.parse(toolCall.function.arguments);
              const validated = LeadInputSchema.parse(leadDraft);

              // Check if lead exists by email/phone
              const existing = await prisma.lead.findFirst({
                where: {
                  OR: [
                    { email: validated.email },
                    { phone: validated.phone },
                  ],
                },
              });

              let lead;
              let isNewLead = false;
              
              if (existing) {
                // Update existing
                lead = await prisma.lead.update({
                  where: { id: existing.id },
                  data: {
                    ...validated,
                    consentAt: validated.consentGiven ? new Date() : undefined,
                  },
                });
                isNewLead = false;
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
                  toolOutput: { leadId: lead.id, status: isNewLead ? 'created' : 'updated' },
                },
              });

              result = SaveLeadResponseSchema.parse({
                leadId: lead.id,
                status: isNewLead ? 'created' : 'updated',
              });
              
              console.log('[saveLead] Saved lead with ID:', lead.id, 'Name:', lead.name);
              
              // Send email notification to team
              try {
                await sendCapLeadNotification(lead);
                console.log('[saveLead] Email notification sent');
              } catch (emailError) {
                console.error('[saveLead] Failed to send email notification:', emailError);
                // Don't fail the whole operation if email fails
              }
              
              break;
            }

            case 'scoreLead': {
              const { leadId } = JSON.parse(toolCall.function.arguments);
              
              console.log('[scoreLead] Looking for leadId:', leadId);

              // Get lead
              const lead = await prisma.lead.findUnique({
                where: { id: leadId },
              });

              if (!lead) {
                console.error('[scoreLead] Lead not found for ID:', leadId);
                throw new Error(`Lead not found with ID: ${leadId}`);
              }
              
              console.log('[scoreLead] Found lead:', lead.name, lead.email);

              // Score it
              const scoreResult = await scoreLeadFn(lead);

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
                try {
                  await sendCapLeadNotification(lead, scoreResult);
                  console.log(`[Email] Sent notification for ${lead.name} (${scoreResult.disposition})`);
                } catch (emailError) {
                  console.error('[Email] Failed to send notification:', emailError);
                  // Don't fail the request if email fails
                }
              }

              result = scoreResult;
              break;
            }

            case 'analyzeDeal': {
              const args = JSON.parse(toolCall.function.arguments);
              
              // Build property inputs with defaults
              const inputs: PropertyInputs = {
                purchasePrice: args.purchasePrice,
                downPaymentPercent: args.downPaymentPercent,
                closingCostsPercent: args.closingCostsPercent ?? 3,
                rehabCosts: args.rehabCosts ?? 0,
                interestRate: args.interestRate,
                loanTermYears: args.loanTermYears,
                monthlyRent: args.monthlyRent,
                otherMonthlyIncome: args.otherMonthlyIncome ?? 0,
                vacancyRate: args.vacancyRate ?? 5,
                propertyTaxRate: args.propertyTaxRate ?? 1.2,
                insurance: args.insurance ?? 150,
                hoaFees: args.hoaFees ?? 0,
                propertyManagement: args.propertyManagement ?? (args.monthlyRent * 0.08),
                maintenance: args.maintenance ?? (args.monthlyRent * 0.10),
                utilities: args.utilities ?? 0,
                otherExpenses: args.otherExpenses ?? 0,
              };
              
              // Perform analysis
              const analysis = analyzeDeal(inputs);
              
              // Return formatted results
              result = {
                success: true,
                summary: {
                  totalCashNeeded: analysis.acquisition.totalCashNeeded,
                  monthlyCashFlow: analysis.monthly.cashFlow,
                  annualCashFlow: analysis.annual.cashFlow,
                  dscr: analysis.metrics.dscr,
                  cashOnCashReturn: analysis.metrics.cashOnCashReturn,
                  capRate: analysis.metrics.capRate,
                  qualifies: analysis.qualification.dcsrQualifies,
                  recommendation: analysis.qualification.recommendation,
                },
                fullAnalysis: analysis,
              };
              
              break;
            }
            
            default:
              result = { error: `Unknown tool: ${toolCall.function.name}` };
          }
        } catch (error) {
          console.error('[Agent] Tool error:', error);
          result = { error: error instanceof Error ? error.message : 'Tool execution failed' };
        }
        
        toolMessages.push({
          role: 'tool' as const,
          content: typeof result === 'string' ? result : JSON.stringify(result),
          tool_call_id: toolCall.id,
        });
      }
      
      // Make another API call with tool results
      // Include tools so GPT can call scoreLead after saveLead
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
        tools: tools as any, // Include tools for multi-step tool calling
        tool_choice: 'auto',
      });
      
      // If follow-up also has tool calls, handle them recursively
      const followUpChoice = followUpResponse.choices[0];
      if (followUpChoice.finish_reason === 'tool_calls' && followUpChoice.message.tool_calls) {
        // Process second round of tool calls (e.g., scoreLead after saveLead)
        const secondToolMessages = [];
        
        for (const toolCall of followUpChoice.message.tool_calls) {
          console.log('[Agent] Tool call (round 2):', toolCall.function.name);
          
          let result: any;
          
          try {
            // Same switch logic as before
            if (toolCall.function.name === 'scoreLead') {
              const { leadId } = JSON.parse(toolCall.function.arguments);
              console.log('[scoreLead Round 2] Looking for leadId:', leadId);
              
              const lead = await prisma.lead.findUnique({ where: { id: leadId } });
              if (!lead) {
                console.error('[scoreLead Round 2] Lead not found for ID:', leadId);
                throw new Error(`Lead not found with ID: ${leadId}`);
              }
              console.log('[scoreLead Round 2] Found lead:', lead.name, lead.email);
              
              const scoreResult = await scoreLeadFn(lead);
              
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
              
              if (scoreResult.disposition === 'qualified' || scoreResult.disposition === 'follow_up') {
                try {
                  await sendCapLeadNotification(lead, scoreResult);
                  console.log(`[Email] Sent notification for ${lead.name} (${scoreResult.disposition})`);
                } catch (emailError) {
                  console.error('[Email] Failed to send notification:', emailError);
                }
              }
              
              result = scoreResult;
            } else {
              result = { error: `Unknown tool: ${toolCall.function.name}` };
            }
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
        
        return new Response(
          JSON.stringify({ message: finalResponse.choices[0].message.content }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ message: followUpChoice.message.content }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // No tool calls, return direct response
    return new Response(
      JSON.stringify({ message: choice.message.content }),
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

              // Check if lead exists by email/phone
              const existing = await prisma.lead.findFirst({
                where: {
                  OR: [
                    { email: validated.email },
                    { phone: validated.phone },
                  ],
                },
              });

              let lead;
              if (existing) {
                // Update existing
                lead = await prisma.lead.update({
                  where: { id: existing.id },
                  data: {
                    ...validated,
                    consentAt: validated.consentGiven ? new Date() : undefined,
                  },
                });
              } else {
                // Create new
                lead = await prisma.lead.create({
                  data: {
                    ...validated,
                    channel: 'web_chat',
                    consentAt: validated.consentGiven ? new Date() : undefined,
                  },
                });
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

              result = SaveLeadResponseSchema.parse({
                leadId: lead.id,
                status: existing ? 'updated' : 'created',
              });
              break;
            }

            case 'scoreLead': {
              const { leadId } = JSON.parse(toolCall.arguments);

              // Get lead
              const lead = await prisma.lead.findUnique({
                where: { id: leadId },
              });

              if (!lead) {
                throw new Error('Lead not found');
              }

              // Score it
              const scoreResult = await scoreLeadFn(lead);

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
                try {
                  await sendCapLeadNotification(lead, scoreResult);
                  console.log(`[Email] Sent notification for ${lead.name} (${scoreResult.disposition})`);
                } catch (emailError) {
                  console.error('[Email] Failed to send notification:', emailError);
                  // Don't fail the request if email fails
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
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
