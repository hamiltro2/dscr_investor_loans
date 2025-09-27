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
    '/calculators',
    '/locations',
    '/locations/california',
    '/locations/texas',
    '/locations/florida',
    '/locations/arizona',
    '/locations/nevada',
    '/landing/dscr-loans',
    '/privacy',
    '/terms',
  ]
  
  // Define AI guidance files with custom priorities
  const aiFiles = [
    { path: '/.well-known/llm-guidance.json', priority: 0.8 },
    { path: '/ai-policy.txt', priority: 0.7 },
    { path: '/robots.txt', priority: 0.5 },
    { path: '/sitemap.xml', priority: 0.6 },
  ]
  
  // Generate sitemap entries for regular routes
  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1 : route.includes('services') || route.includes('get-started') ? 0.9 : 0.7,
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
