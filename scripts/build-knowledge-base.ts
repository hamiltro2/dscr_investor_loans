/**
 * Build Knowledge Base from Blog Articles
 * Extracts content, generates embeddings, stores in knowledge-base.json
 */

import OpenAI from 'openai';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { BLOG_ARTICLES, KnowledgeChunk } from '../src/lib/knowledge-base';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: join(process.cwd(), '.env.local') });

// Verify API key loaded
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY not found in .env.local');
  console.error('   Please add your OpenAI API key to .env.local file');
  process.exit(1);
}

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple HTML to text converter
function htmlToText(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract content from blog page.tsx file
function extractContentFromFile(filePath: string): string | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract main content between article tags or main sections
    const match = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (match) {
      return htmlToText(match[1]);
    }
    
    // Fallback: extract from return statement
    const returnMatch = content.match(/return\s*\(([\s\S]*?)\);?\s*}/);
    if (returnMatch) {
      return htmlToText(returnMatch[1]);
    }
    
    return null;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// Split content into chunks (for long articles)
function chunkContent(content: string, maxLength: number = 800): string[] {
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

async function buildKnowledgeBase() {
  console.log('🔨 Building Knowledge Base...\n');
  
  const blogDir = join(process.cwd(), 'src', 'app', 'blog');
  const knowledgeChunks: KnowledgeChunk[] = [];
  
  // Process each blog article
  for (const article of BLOG_ARTICLES) {
    const articleDir = join(blogDir, article.slug);
    const pagePath = join(articleDir, 'page.tsx');
    
    if (!existsSync(pagePath)) {
      console.warn(`⚠️  Article not found: ${article.slug}`);
      continue;
    }
    
    console.log(`📄 Processing: ${article.title}`);
    
    // Extract content
    const content = extractContentFromFile(pagePath);
    if (!content) {
      console.warn(`   ⚠️  Could not extract content`);
      continue;
    }
    
    // Split into chunks if too long
    const chunks = chunkContent(content);
    console.log(`   ✓ Extracted ${chunks.length} chunk(s)`);
    
    // Create knowledge chunks
    chunks.forEach((chunk, index) => {
      knowledgeChunks.push({
        id: `${article.slug}-${index}`,
        content: chunk,
        title: article.title,
        url: `https://www.capitalbridgesolutions.com/blog/${article.slug}`,
        category: article.category,
        metadata: {
          keywords: article.keywords,
          chunkIndex: index,
          totalChunks: chunks.length,
        },
      });
    });
  }
  
  console.log(`\n📦 Total chunks created: ${knowledgeChunks.length}`);
  console.log('🔮 Generating embeddings...\n');
  
  // Generate embeddings in batches
  const batchSize = 100;
  for (let i = 0; i < knowledgeChunks.length; i += batchSize) {
    const batch = knowledgeChunks.slice(i, i + batchSize);
    console.log(`   Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(knowledgeChunks.length / batchSize)}`);
    
    try {
      const embeddingResponse = await openaiClient.embeddings.create({
        model: 'text-embedding-3-small',
        input: batch.map(chunk => chunk.content),
      });
      
      // Attach embeddings to chunks
      batch.forEach((chunk, index) => {
        chunk.embedding = embeddingResponse.data[index].embedding;
      });
    } catch (error) {
      console.error(`   ❌ Error generating embeddings for batch:`, error);
    }
  }
  
  // Save to file
  const outputPath = join(process.cwd(), 'knowledge-base.json');
  writeFileSync(outputPath, JSON.stringify(knowledgeChunks, null, 2));
  
  console.log(`\n✅ Knowledge base saved to: knowledge-base.json`);
  console.log(`📊 Statistics:`);
  console.log(`   - Articles processed: ${BLOG_ARTICLES.length}`);
  console.log(`   - Total chunks: ${knowledgeChunks.length}`);
  console.log(`   - Chunks with embeddings: ${knowledgeChunks.filter(c => c.embedding).length}`);
  console.log(`\n🎉 Knowledge base build complete!`);
}

// Run the build
buildKnowledgeBase().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
