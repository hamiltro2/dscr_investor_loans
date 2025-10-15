/**
 * Submit URLs to Google Indexing API
 * This is MUCH faster than waiting for Google to crawl
 * 
 * Setup:
 * 1. Go to: https://console.cloud.google.com
 * 2. Enable "Web Search Indexing API"
 * 3. Create Service Account
 * 4. Download JSON key
 * 5. Add to Search Console as owner
 * 6. Save key as google-indexing-key.json
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join } from 'path';

// Your blog articles and important pages
const URLS_TO_SUBMIT = [
  // Homepage and main pages
  'https://www.capitalbridgesolutions.com',
  'https://www.capitalbridgesolutions.com/get-started',
  'https://www.capitalbridgesolutions.com/dscr-calculator',
  'https://www.capitalbridgesolutions.com/partner-network',
  
  // Blog articles (31 total)
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-620-credit-score',
  'https://www.capitalbridgesolutions.com/blog/airbnb-dscr-loans-california',
  'https://www.capitalbridgesolutions.com/blog/no-tax-return-investment-property-loans',
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-calculator-california',
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-rates-california-2025',
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-requirements-california-2025',
  'https://www.capitalbridgesolutions.com/blog/dscr-vs-hard-money-loans',
  'https://www.capitalbridgesolutions.com/blog/fix-and-flip-dscr-loans-california',
  'https://www.capitalbridgesolutions.com/blog/how-to-qualify-for-dscr-loan',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-self-employed-california',
  
  // State-specific
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-texas',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-florida',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-arizona',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-georgia',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-nevada',
  
  // Advanced topics
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-multi-family',
  'https://www.capitalbridgesolutions.com/blog/dscr-vs-conventional-loans',
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-refinancing',
  'https://www.capitalbridgesolutions.com/blog/portfolio-dscr-loans',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-foreign-investors',
  
  // Trending
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-predictions-2025',
  'https://www.capitalbridgesolutions.com/blog/dscr-loan-tax-benefits',
  'https://www.capitalbridgesolutions.com/blog/dscr-loans-market-downturn',
  
  // Case studies
  'https://www.capitalbridgesolutions.com/blog/case-study-first-time-investor-620-credit',
  'https://www.capitalbridgesolutions.com/blog/case-study-10-property-portfolio',
  
  // Additional important pages
  'https://www.capitalbridgesolutions.com/blog/best-dscr-loan-lenders-california',
  'https://www.capitalbridgesolutions.com/blog/investment-property-loans-self-employed',
  'https://www.capitalbridgesolutions.com/blog/no-income-verification-loans',
  'https://www.capitalbridgesolutions.com/blog/best-lenders-self-employed-california',
  'https://www.capitalbridgesolutions.com/blog/best-lenders-self-employed-bad-credit',
  'https://www.capitalbridgesolutions.com/blog/best-lenders-self-employed-reddit',
];

async function submitToGoogle() {
  console.log('🚀 Submitting URLs to Google Indexing API...\n');
  
  try {
    // Load service account key
    const keyPath = join(process.cwd(), 'google-indexing-key.json');
    const key = JSON.parse(readFileSync(keyPath, 'utf-8'));
    
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    
    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient as any });
    
    // Submit each URL
    let successCount = 0;
    let errorCount = 0;
    
    for (const url of URLS_TO_SUBMIT) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url,
            type: 'URL_UPDATED', // or 'URL_DELETED' to remove
          },
        });
        
        console.log(`✅ Submitted: ${url}`);
        successCount++;
        
        // Rate limiting - wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error: any) {
        console.error(`❌ Error submitting ${url}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total: ${URLS_TO_SUBMIT.length}`);
    console.log(`\n🎉 Done! Google will start indexing these URLs within 24-48 hours.`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    console.log('\n📋 Setup Instructions:');
    console.log('1. Go to: https://console.cloud.google.com');
    console.log('2. Enable "Web Search Indexing API"');
    console.log('3. Create Service Account with Indexing API permissions');
    console.log('4. Download JSON key');
    console.log('5. Add service account email to Search Console as owner');
    console.log('6. Save key as google-indexing-key.json in project root');
  }
}

// Check URL status (optional)
async function checkUrlStatus(url: string) {
  const keyPath = join(process.cwd(), 'google-indexing-key.json');
  const key = JSON.parse(readFileSync(keyPath, 'utf-8'));
  
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  
  const authClient = await auth.getClient();
  const indexing = google.indexing({ version: 'v3', auth: authClient as any });
  
  const response = await indexing.urlNotifications.getMetadata({ url });
  console.log('URL Status:', response.data);
}

// Run
submitToGoogle();
