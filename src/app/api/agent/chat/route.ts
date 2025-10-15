/**
 * AI Agent Chat API
 * Streams responses from OpenAI with tool calling support
 * Tools: searchKnowledgeBase, perplexitySearch, saveLead, scoreLead, scheduleCall, crmWebhook
 */

import OpenAI from 'openai';
import { env } from '@/lib/env';
import { prisma } from '@/lib/db';
import { perplexitySearch } from '@/lib/perplexity';
import { searchKnowledgeBase, formatKnowledgeResults } from '@/lib/knowledge-base';
import { scoreLead as scoreLeadFn } from '@/lib/scoring';
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

    // Create chat completion with tools enabled
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Best for conversational AI: fastest, cheapest, native voice support
      stream: false, // Disable streaming when using tools
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1000,
      tools: [
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
            description: 'Save or update lead information after receiving user consent. Returns leadId for subsequent operations.',
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
            description: 'Score a lead and generate preliminary offer. Call after saveLead.',
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
      ],
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
              result = formatKnowledgeResults(results);
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
      });
      
      return new Response(
        JSON.stringify({ message: followUpResponse.choices[0].message.content }),
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
