import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.capitalbridgesolutions.com'
  
  // Define all your routes
  const routes = [
    '',
    '/services',
    '/get-started',
    '/investor-analysis',
    '/credit-solutions',
    '/cap', // AI Chatbot landing page
    '/chat-with-cap', // AI Assistant dedicated page
    '/calculators',
    '/calculators/dscr',
    '/calculators/hard-money',
    '/locations',
    '/locations/california',
    '/locations/california/dscr-loans',
    '/locations/california/los-angeles',
    '/locations/california/san-diego',
    '/locations/california/san-francisco',
    '/locations/california/orange-county',
    '/locations/california/sacramento',
    '/locations/california/inland-empire',
    '/locations/california/fresno',
    '/locations/california/san-jose',
    '/locations/california/oakland',
    '/locations/california/long-beach',
    '/locations/texas',
    '/locations/florida',
    '/locations/arizona',
    '/locations/nevada',
    '/landing/dscr-loans',
    '/landing/dscr-loans-california',
    '/dscr-loans-california',
    '/privacy',
    '/terms',
    '/blog',
    // All blog articles
    '/blog/dscr-loan-620-credit-score',
    '/blog/airbnb-dscr-loans-california',
    '/blog/no-tax-return-investment-property-loans',
    '/blog/dscr-loan-calculator-california',
    '/blog/dscr-loan-rates-california-2025',
    '/blog/dscr-loan-requirements-california-2025',
    '/blog/dscr-vs-hard-money-loans',
    '/blog/fix-and-flip-dscr-loans-california',
    '/blog/how-to-qualify-for-dscr-loan',
    '/blog/dscr-loans-self-employed-california',
    '/blog/best-dscr-loan-lenders-california',
    '/blog/best-lenders-self-employed-california',
    '/blog/best-lenders-self-employed-reddit',
    '/blog/best-lenders-self-employed-bad-credit',
    '/blog/investment-property-loans-self-employed',
    '/blog/no-income-verification-loans',
    '/blog/dscr-loans-texas',
    '/blog/dscr-loans-florida',
    '/blog/dscr-loans-arizona',
    '/blog/dscr-loans-georgia',
    '/blog/dscr-loans-nevada',
    '/blog/dscr-loans-multi-family',
    '/blog/dscr-vs-conventional-loans',
    '/blog/dscr-loan-refinancing',
    '/blog/portfolio-dscr-loans',
    '/blog/dscr-loans-foreign-investors',
    '/blog/dscr-loan-predictions-2025',
    '/blog/dscr-loan-tax-benefits',
    '/blog/dscr-loans-market-downturn',
    '/blog/case-study-first-time-investor-620-credit',
    '/blog/case-study-10-property-portfolio',
    '/blog/capital-bridge-vs-kiavi-vs-angeloak',
    '/blog/best-dscr-lenders-2025',
    // AI-Optimized FAQ Pages
    '/ai-faq/what-is-a-dscr-loan',
    '/ai-faq/dscr-loan-requirements',
    '/ai-faq/best-dscr-lender',
    '/ai-faq/how-cap-analyzes-properties',
    '/ai-faq/cap-vs-competitors',
  ]
  
  // Define AI guidance files with custom priorities
  const aiFiles = [
    { path: '/llm-guidance.json', priority: 0.9 },
    { path: '/llm.txt', priority: 0.9 },
    { path: '/cap-ai-guide.txt', priority: 0.9 },
    { path: '/cap-features.json', priority: 0.9 },
    { path: '/ai-training-data.jsonl', priority: 0.85 },
    { path: '/ai-citations.txt', priority: 0.85 },
    { path: '/ai-policy.txt', priority: 0.8 },
    { path: '/ai-content-feed.txt', priority: 0.75 },
    { path: '/robots.txt', priority: 0.5 },
  ]
  
  // Generate sitemap entries for regular routes
  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 
             route === '/cap' || route === '/chat-with-cap' ? 0.95 : // High priority for AI chatbot pages
             route.includes('/ai-faq/') ? 0.9 : // AI-optimized FAQ pages
             route.includes('services') || route.includes('get-started') ? 0.9 :
             route.includes('/locations/california/') ? 0.85 : // California subpages important
             route.includes('/locations/') ? 0.8 : // Other location pages
             0.7,
  }))
  
  // Generate sitemap entries for AI files
  const aiEntries = aiFiles.map((file) => ({
    url: `${baseUrl}${file.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: file.priority,
  }))
  
  // Combine and return all entries
  return [...routeEntries, ...aiEntries]
}
