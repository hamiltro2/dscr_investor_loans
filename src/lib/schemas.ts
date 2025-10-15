/**
 * Zod Schemas for Runtime Type Validation
 * All tool inputs/outputs and API requests are validated against these schemas
 */

import { z } from 'zod';

// ==================== ENUMS ====================

export const ProductTypeSchema = z.enum([
  'hard_money',
  'dscr',
  'fix_flip',
  'balloon_refi',
  'note_finance',
]);

export const LeadStatusSchema = z.enum([
  'new',
  'qualified',
  'follow_up',
  'disqualified',
  'closed_won',
  'closed_lost',
]);

export const DispositionSchema = z.enum([
  'qualified',
  'follow_up',
  'disqualified',
]);

// ==================== LEAD DATA ====================

export const LeadInputSchema = z.object({
  // Contact (required)
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number'),
  channel: z.string().optional(),

  // Product
  productType: ProductTypeSchema,

  // Property
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2, 'State must be 2-letter code').optional(),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code').optional(),
  propertyType: z.string().optional(),

  // Loan
  loanAmountRequested: z.number().positive().optional(),
  timeline: z.string().optional(),
  exitStrategy: z.string().optional(),

  // Product-specific
  rehabBudget: z.number().positive().optional(), // fix&flip
  arv: z.number().positive().optional(), // fix&flip ARV
  currentMortgageInfo: z.object({
    balance: z.number().positive(),
    rate: z.number().positive(),
    maturityDate: z.string(),
    payment: z.number().positive(),
  }).optional(), // balloon_refi
  rentalIncome: z.number().positive().optional(), // dscr
  dscrInputs: z.object({
    monthlyTaxes: z.number().nonnegative().optional(),
    monthlyInsurance: z.number().nonnegative().optional(),
    monthlyHOA: z.number().nonnegative().optional(),
    proposedRate: z.number().positive().optional(),
  }).optional(),

  // Metadata
  notes: z.string().optional(),
  consentGiven: z.boolean().default(false),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;

// ==================== PERPLEXITY ====================

export const PerplexityQuerySchema = z.object({
  query: z.string().min(3, 'Query must be at least 3 characters'),
  domains: z.array(z.string().url()).optional(),
  recencyDays: z.number().int().positive().max(365).optional(),
  address: z.string().optional(), // for cache key
  zip: z.string().optional(), // for cache key
});

export type PerplexityQuery = z.infer<typeof PerplexityQuerySchema>;

export const PerplexitySnippetSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  text: z.string(),
});

export const PerplexityResultSchema = z.object({
  snippets: z.array(PerplexitySnippetSchema),
  cached: z.boolean().default(false),
});

export type PerplexityResult = z.infer<typeof PerplexityResultSchema>;
export type PerplexitySnippet = z.infer<typeof PerplexitySnippetSchema>;

// ==================== SCORING ====================

export const PreliminaryOfferSchema = z.object({
  productType: ProductTypeSchema,
  amountRange: z.tuple([z.number().positive(), z.number().positive()]),
  rateRange: z.tuple([z.number().positive(), z.number().positive()]),
  termMonths: z.number().int().positive(),
  balloon: z.boolean().optional(),
  ltvApprox: z.number().min(0).max(100).optional(),
  dscrApprox: z.number().positive().optional(),
  notes: z.string().optional(),
});

export type PreliminaryOffer = z.infer<typeof PreliminaryOfferSchema>;

export const ScoreResultSchema = z.object({
  score: z.number().min(0).max(100),
  disposition: DispositionSchema,
  preliminaryOffer: PreliminaryOfferSchema.optional(),
  reasoning: z.string(),
  riskFlags: z.array(z.string()).default([]),
});

export type ScoreResult = z.infer<typeof ScoreResultSchema>;

// ==================== ENRICHMENT ====================

export const EnrichmentDataSchema = z.object({
  neighborhoodRisk: z.number().min(0).max(1).default(0),
  zoningOK: z.boolean().default(true),
  newsNegative: z.boolean().default(false),
  marketTrends: z.string().optional(),
  priorFlips: z.number().int().nonnegative().default(0), // heuristic from notes/enrichment
  comps: z.array(z.object({
    address: z.string(),
    price: z.number(),
    sqft: z.number().optional(),
  })).optional(),
});

export type EnrichmentData = z.infer<typeof EnrichmentDataSchema>;

// ==================== TOOL SCHEMAS ====================

export const SaveLeadToolSchema = z.object({
  leadDraft: LeadInputSchema,
});

export const ScoreLeadToolSchema = z.object({
  leadId: z.string().cuid(),
});

export const ScheduleCallToolSchema = z.object({
  leadId: z.string().cuid(),
  preferredSlot: z.string().optional(),
});

export const CRMWebhookToolSchema = z.object({
  leadId: z.string().cuid(),
  payload: z.record(z.any()),
});

// ==================== API RESPONSES ====================

export const SaveLeadResponseSchema = z.object({
  leadId: z.string().cuid(),
  status: z.enum(['created', 'updated']),
});

export const ScheduleCallResponseSchema = z.object({
  meetingUrl: z.string().url(),
  scheduledFor: z.string().optional(),
});

export const CRMWebhookResponseSchema = z.object({
  ok: z.boolean(),
  timestamp: z.string(),
});

// ==================== CHAT MESSAGES ====================

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system', 'tool']),
  content: z.string(),
  toolCalls: z.array(z.object({
    id: z.string(),
    name: z.string(),
    arguments: z.string(),
  })).optional(),
  toolCallId: z.string().optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
