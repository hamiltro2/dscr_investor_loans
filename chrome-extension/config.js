/**
 * Extension Configuration
 * Update these settings as needed
 */

const CONFIG = {
  // === AI ANALYSIS SETTINGS ===
  
  // Perplexity API Configuration
  PERPLEXITY_API_KEY: 'pplx-YOUR-API-KEY-HERE', // REPLACE WITH YOUR KEY
  PERPLEXITY_MODEL: 'sonar',
  
  // Free Tier Limits
  FREE_DAILY_LIMIT: 3, // Number of free AI analyses per day
  CACHE_DURATION_HOURS: 24, // How long to cache AI analysis results
  
  // === PREMIUM SETTINGS ===
  PREMIUM_PRICE_MONTHLY: 9.99,
  PREMIUM_PRICE_ANNUAL: 99.99,
  PREMIUM_UPGRADE_URL: 'https://www.capitalbridgesolutions.com/partner-network#apply',
  
  // === BRANDING ===
  COMPANY_NAME: 'Capital Bridge Solutions',
  COMPANY_PHONE: '(949) 339-3555',
  COMPANY_PHONE_LINK: 'tel:+19493393555',
  COMPANY_WEBSITE: 'https://www.capitalbridgesolutions.com',
  PRE_APPROVAL_URL: 'https://www.capitalbridgesolutions.com/get-started',
  PARTNER_NETWORK_URL: 'https://www.capitalbridgesolutions.com/partner-network#apply',
  
  // === FEATURE FLAGS ===
  ENABLE_AI_ANALYSIS: true, // Set to false to disable AI feature
  ENABLE_FLOATING_CTA: true, // Floating "Analyze" button on property pages
  ENABLE_USAGE_TRACKING: true, // Track free tier limits
  ENABLE_PREMIUM_PROMPTS: true, // Show upgrade prompts when limit reached
  
  // === ANALYTICS ===
  TRACK_AI_USAGE: true, // Track AI analysis requests
  TRACK_CONVERSIONS: true, // Track clicks to pre-approval
  
  // === UI CUSTOMIZATION ===
  SHOW_BETA_BADGE: true, // Show "Beta" badge on AI section
  ANIMATION_DURATION: 500, // Milliseconds for UI animations
  LOADING_MIN_DURATION: 2000, // Minimum loading animation duration (feels more authentic)
  
  // === SUPPORTED WEBSITES ===
  SUPPORTED_SITES: [
    'zillow.com',
    'redfin.com',
    'realtor.com',
    'trulia.com',
    'loopnet.com',
    'crexi.com',
    'roofstock.com',
    'biggerpockets.com',
    'apartments.com',
    'mashvisor.com',
    'homes.com'
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
