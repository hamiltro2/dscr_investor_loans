import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

async function searchBiggerPockets(question: string) {
  const searchQuery = encodeURIComponent(question);
  const searchUrl = `https://www.biggerpockets.com/search?q=${searchQuery}`;
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Searching BiggerPockets:', searchUrl);
    await page.goto(searchUrl, { waitUntil: 'networkidle0', timeout: 15000 });

    const content = await page.content();
    const $ = cheerio.load(content);

    // Get search results
    const results: { title: string; url: string; excerpt: string }[] = [];
    const searchResults = $('.search-result');

    searchResults.each((_, element) => {
      const title = $(element).find('.search-result__title').text().trim();
      const url = 'https://www.biggerpockets.com' + $(element).find('.search-result__title a').attr('href');
      const excerpt = $(element).find('.search-result__excerpt').text().trim();

      if (title && url) {
        results.push({ title, url, excerpt });
      }
    });

    // Get content from top 2 most relevant results
    const relevantContent: string[] = [];
    for (let i = 0; i < Math.min(2, results.length); i++) {
      const result = results[i];
      try {
        await page.goto(result.url, { waitUntil: 'networkidle0', timeout: 15000 });
        const articleContent = await page.content();
        const article$ = cheerio.load(articleContent);
        
        // Extract main content
        const mainContent = article$('.forum-post-content, .blog-post__content').text();
        if (mainContent) {
          relevantContent.push(`From "${result.title}":\n${mainContent}`);
        }
      } catch (error) {
        console.error(`Error fetching content from ${result.url}:`, error);
      }
    }

    return {
      searchResults: results,
      content: relevantContent
    };

  } finally {
    await browser.close();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'No question provided' },
        { status: 400 }
      );
    }

    console.log('Received question:', question);

    // Search BiggerPockets
    const biggerPocketsData = await searchBiggerPockets(question);

    // Generate answers using both OpenAI and Deepseek in parallel
    const [openaiResponse, deepseekResponse] = await Promise.all([
      // OpenAI Analysis
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert real estate investment advisor working for Capital Bridge Solutions. Analyze the provided content from trusted real estate sources to provide comprehensive answers. When explaining terms or concepts, be clear and thorough but concise.'
            },
            {
              role: 'user',
              content: `Question: ${question}\n\nContent from real estate sources:\n${biggerPocketsData.content.join('\n\n')}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      }).then(async res => {
        if (!res.ok) {
          throw new Error(`OpenAI API error: ${res.status}`);
        }
        return res.json();
      }).catch(error => {
        console.error('OpenAI API error:', error);
        return { choices: [{ message: { content: 'Unable to generate OpenAI response.' } }] };
      }),

      // Deepseek Analysis
      fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are an expert real estate investment advisor. Analyze the provided content from trusted real estate sources to provide comprehensive answers. When explaining terms or concepts, be clear and thorough but concise.'
            },
            {
              role: 'user',
              content: `Question: ${question}\n\nContent from real estate sources:\n${biggerPocketsData.content.join('\n\n')}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      }).then(async res => {
        if (!res.ok) {
          throw new Error(`Deepseek API error: ${res.status}`);
        }
        return res.json();
      }).catch(error => {
        console.error('Deepseek API error:', error);
        return { choices: [{ message: { content: 'Unable to generate Deepseek response.' } }] };
      })
    ]);

    // Safely extract responses
    const openaiAnswer = openaiResponse?.choices?.[0]?.message?.content || 'Unable to generate OpenAI response.';
    const deepseekAnswer = deepseekResponse?.choices?.[0]?.message?.content || 'Unable to generate Deepseek response.';

    const formatLine = (line: string) => {
      // Remove markdown bold markers
      line = line.replace(/\*\*/g, '');
      
      // Convert ### headings to bold uppercase text
      if (line.startsWith('###')) {
        return `<h4 class="text-lg font-bold uppercase mb-3">${line.replace(/^###\s*/, '')}</h4>`;
      }
      
      // Handle numbered items (1., 2., etc.)
      const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return `<div class="flex gap-2 mb-2">
          <span class="font-bold">${numberedMatch[1]}.</span>
          <span>${numberedMatch[2]}</span>
        </div>`;
      }
      
      if (line.trim().startsWith('-')) {
        return `<li class="ml-8 mb-2">${line}</li>`;
      }
      if (line.trim().endsWith(':')) {
        return `<h4 class="text-cyan-400 font-medium mt-3 mb-2">${line}</h4>`;
      }
      return `<p class="mb-2">${line}</p>`;
    };

    const formatSection = (content: string) => {
      return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(formatLine)
        .join('');
    };

    const extractCalculations = (content: string) => {
      return content
        .split('\n')
        .filter(line => line.includes('=') || line.includes('$'))
        .map(line => `<p class="mb-1 font-mono">${line.trim()}</p>`)
        .join('');
    };

    const combinedAnswer = `
<article class="space-y-6">
  <section>
    <h3 class="text-blue-400 text-xl font-semibold mb-3">Primary Analysis</h3>
    ${formatSection(openaiAnswer)}
  </section>

  <section>
    <h3 class="text-emerald-400 text-xl font-semibold mb-3">Additional Insights</h3>
    ${formatSection(deepseekAnswer)}
  </section>

  ${(openaiAnswer + deepseekAnswer).includes('Example') ? `
  <section>
    <h3 class="text-purple-400 text-xl font-semibold mb-3">Example Calculation</h3>
    <div class="bg-gray-800/50 rounded-lg p-4">
      ${extractCalculations(openaiAnswer + deepseekAnswer)}
    </div>
  </section>
  ` : ''}
</article>`.trim();

    return NextResponse.json({ answer: combinedAnswer });

  } catch (error) {
    console.error('Error processing question:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your question. Please try again.' },
      { status: 500 }
    );
  }
}
