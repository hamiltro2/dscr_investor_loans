import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

async function searchBiggerPockets(question: string) {
  const searchQuery = encodeURIComponent(question);
  const searchUrl = `https://www.biggerpockets.com/search?q=${searchQuery}`;
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Searching BiggerPockets:', searchUrl);
    await page.goto(searchUrl, { waitUntil: 'networkidle0', timeout: 30000 });

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

    // Get content from top 3 most relevant results
    const relevantContent: string[] = [];
    for (let i = 0; i < Math.min(3, results.length); i++) {
      const result = results[i];
      try {
        await page.goto(result.url, { waitUntil: 'networkidle0', timeout: 30000 });
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

    // Generate answer using OpenAI
    const prompt = `As an AI investment advisor for Capital Bridge Solutions, provide a detailed answer to the following real estate investment question. Use the provided BiggerPockets content as reference, but maintain a professional and balanced perspective.

Question: ${question}

Reference Content from BiggerPockets:
${biggerPocketsData.content.join('\n\n')}

Format your response using this structure:

<h1>Expert Answer</h1>
[Provide a clear, concise answer to the question]

<h1>Key Points</h1>
[List 3-5 main takeaways or important considerations]

<h1>Additional Resources</h1>
[List relevant articles from BiggerPockets with brief descriptions]

<h1>Next Steps with Capital Bridge Solutions</h1>
- Contact us at (949) 614-6390 for personalized investment guidance
- Fill out our quick form to discuss your investment strategy
- Schedule a consultation to explore financing options for your next investment

Remember to be informative yet accessible, and emphasize how Capital Bridge Solutions can help with any financing needs.`;

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are an expert real estate investment advisor working for Capital Bridge Solutions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!openaiRes.ok) {
      throw new Error('Failed to generate answer');
    }

    const openaiData = await openaiRes.json();
    const answer = openaiData.choices[0].message.content;

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Investment question error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process investment question' },
      { status: 500 }
    );
  }
}
