/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: 'standalone',
  
  // Add environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_CORELOGIC_API_URL: process.env.NEXT_PUBLIC_CORELOGIC_API_URL,
    NEXT_PUBLIC_CORELOGIC_CLIENT_ID: process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_ID,
  },

  // Redirects for canonical URLs (fixes Google Search Console redirect warnings)
  async redirects() {
    return [
      // Redirect www to non-www (if using non-www as canonical)
      // OR redirect non-www to www (if using www as canonical)
      // This example uses www as canonical - adjust based on your preference
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'capitalbridgesolutions.com',
          },
        ],
        destination: 'https://www.capitalbridgesolutions.com/:path*',
        permanent: true,
      },
    ]
  },

  // Headers for security and SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
