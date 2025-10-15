/**
 * Environment Variable Validation
 * Strict runtime validation for all required environment variables
 */

import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().min(1),
  
  // AI APIs
  OPENAI_API_KEY: z.string().min(1),
  PERPLEXITY_API_KEY: z.string().min(1),
  
  // Security
  WEBHOOK_SIGNING_SECRET: z.string().min(32),
  
  // App Config (client-side safe)
  NEXT_PUBLIC_APP_NAME: z.string().default('Loan Flow'),
  NEXT_PUBLIC_PHONE: z.string().default('(949) 339-3555'),
  
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Validate at module load time
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;

// Type-safe access
export type Env = z.infer<typeof envSchema>;
