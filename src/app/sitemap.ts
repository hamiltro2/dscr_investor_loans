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
    '/privacy',
    '/terms',
  ]
  
  // Generate sitemap entries
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.includes('services') || route.includes('get-started') ? 0.9 : 0.7,
  }))
}
