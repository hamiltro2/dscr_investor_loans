/**
 * Perplexity AI Search Integration
 * Server-only wrapper with LRU caching for market/property enrichment
 */

import { LRUCache } from 'lru-cache';
import { env } from './env';
import {
  PerplexityQuery,
  PerplexityQuerySchema,
  PerplexityResult,
  PerplexityResultSchema,
  PerplexitySnippet,
} from './schemas';

// LRU Cache Configuration
// TODO: Replace with Redis in production for multi-instance support
const cache = new LRUCache<string, PerplexityResult>({
  max: 500, // max 500 cached queries
  ttl: 1000 * 60 * 60 * 24, // 24 hours
  updateAgeOnGet: true,
});

/**
 * Generate stable cache key from query params
 */
function getCacheKey(params: PerplexityQuery): string {
  const { query, address, zip, domains, recencyDays } = params;
  const parts = [
    query.toLowerCase().trim(),
    address?.toLowerCase().trim() || '',
    zip || '',
    domains?.sort().join(',') || '',
    recencyDays?.toString() || '',
  ];
  return parts.join('|');
}

/**
 * Parse Perplexity API response into normalized snippets
 */
function parsePerplexityResponse(data: any): PerplexitySnippet[] {
  const snippets: PerplexitySnippet[] = [];
  
  try {
    console.log('[Perplexity] Parsing response. Keys:', Object.keys(data));
    
    // NEW FORMAT: sonar models return content directly
    const content = data.content || data.text || '';
    
    // Extract citations from response (if available)
    if (data.citations && Array.isArray(data.citations)) {
      for (const citation of data.citations.slice(0, 5)) {
        if (citation.title && citation.url && citation.text) {
          snippets.push({
            title: citation.title,
            url: citation.url,
            text: citation.text.slice(0, 300),
          });
        }
      }
    }

    // If no citations but we have content, create a synthetic snippet
    if (snippets.length === 0 && content) {
      console.log('[Perplexity] No citations, using content directly');
      snippets.push({
        title: 'Property Information',
        url: 'https://www.perplexity.ai',
        text: content.slice(0, 500), // Use full answer
      });
    }
  } catch (error) {
    console.error('[Perplexity] Error parsing response:', error);
  }

  console.log('[Perplexity] Parsed', snippets.length, 'snippets');
  return snippets;
}

/**
 * Search using Perplexity API
 * Returns normalized snippets with caching
 */
export async function perplexitySearch(
  params: PerplexityQuery
): Promise<PerplexityResult> {
  // Validate input
  const validated = PerplexityQuerySchema.parse(params);
  
  // Check cache
  const cacheKey = getCacheKey(validated);
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('[Perplexity] Cache hit:', cacheKey);
    return { ...cached, cached: true };
  }

  console.log('[Perplexity] Fetching:', validated.query);

  try {
    // Build request payload
    const payload: any = {
      model: 'sonar', // Default Perplexity online search model
      messages: [
        {
          role: 'system',
          content: 'You are a real estate market research assistant. Provide factual, cited information about properties and markets. Be concise.',
        },
        {
          role: 'user',
          content: validated.query,
        },
      ],
      max_tokens: 500,
      temperature: 0.2,
      return_citations: true,
      return_images: false,
    };

    // Add search parameters
    if (validated.recencyDays) {
      payload.search_recency_filter = `${validated.recencyDays}d`;
    }

    if (validated.domains && validated.domains.length > 0) {
      payload.search_domain_filter = validated.domains;
    }

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[Perplexity] API Error Response:', response.status, error);
      throw new Error(`Perplexity API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    console.log('[Perplexity] Raw API response:', JSON.stringify(data, null, 2));

    // Parse response - handle both old and new format
    const message = data.choices?.[0]?.message || data.message || {};
    console.log('[Perplexity] Message object:', JSON.stringify(message, null, 2));
    
    const snippets = parsePerplexityResponse(message);

    const result: PerplexityResult = {
      snippets,
      cached: false,
    };

    // Validate and cache
    const validatedResult = PerplexityResultSchema.parse(result);
    cache.set(cacheKey, validatedResult);

    console.log('[Perplexity] Retrieved', snippets.length, 'snippets');
    return validatedResult;

  } catch (error) {
    console.error('[Perplexity] Error:', error);
    
    // Return empty result on error (graceful degradation)
    return {
      snippets: [],
      cached: false,
    };
  }
}

/**
 * Clear cache (for testing/admin)
 */
export function clearPerplexityCache() {
  cache.clear();
  console.log('[Perplexity] Cache cleared');
}

/**
 * Get cache stats (for monitoring)
 */
export function getPerplexityCacheStats() {
  return {
    size: cache.size,
    max: cache.max,
    calculatedSize: cache.calculatedSize,
  };
}
