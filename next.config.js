/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: 'standalone',
  
  // Add environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_CORELOGIC_API_URL: process.env.NEXT_PUBLIC_CORELOGIC_API_URL,
    NEXT_PUBLIC_CORELOGIC_CLIENT_ID: process.env.NEXT_PUBLIC_CORELOGIC_CLIENT_ID,
  },
}

module.exports = nextConfig
