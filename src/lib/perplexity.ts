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
    // Perplexity returns citations array
    if (data.citations && Array.isArray(data.citations)) {
      for (const citation of data.citations.slice(0, 5)) {
        if (citation.title && citation.url && citation.text) {
          snippets.push({
            title: citation.title,
            url: citation.url,
            text: citation.text.slice(0, 300), // truncate to 300 chars
          });
        }
      }
    }

    // Fallback: parse from content if no citations
    if (snippets.length === 0 && data.content) {
      // Extract URLs from markdown links
      const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const matches = [...data.content.matchAll(urlRegex)].slice(0, 3);
      
      for (const match of matches) {
        snippets.push({
          title: match[1],
          url: match[2],
          text: data.content.slice(0, 200),
        });
      }
    }
  } catch (error) {
    console.error('Error parsing Perplexity response:', error);
  }

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
      model: 'llama-3.1-sonar-small-128k-online', // Fast, cost-effective
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
      console.error('[Perplexity] API Error:', error);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();

    // Parse response
    const snippets = parsePerplexityResponse(data.choices?.[0]?.message || {});

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
