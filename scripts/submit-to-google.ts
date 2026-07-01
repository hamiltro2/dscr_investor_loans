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
import sitemap from '../src/app/sitemap';

const URLS_TO_SUBMIT = sitemap().map(entry => entry.url);


async function submitToGoogle() {
  console.log('🚀 Submitting URLs to Google Indexing API...\n');
  
  try {
    // Load service account key
    const keyPath = join(process.cwd(), 'google-indexing-key.json');
    const keyContent = readFileSync(keyPath, 'utf-8');
    const key = JSON.parse(keyContent.replace(/^\uFEFF/, ''));
    
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
  const keyContent = readFileSync(keyPath, 'utf-8');
  const key = JSON.parse(keyContent.replace(/^\uFEFF/, ''));
  
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  
  const authClient = await auth.getClient();
  const indexing = google.indexing({ version: 'v3', auth: authClient as any });
  
  const response = await indexing.urlNotifications.getMetadata({ url });
  console.log('URL Status:', response.data);
}

// Submit to IndexNow (Bing, Yandex, Seznam, etc.)
async function submitToIndexNow() {
  console.log('\n🚀 Submitting URLs to IndexNow (Bing/Yandex)...');
  
  const key = '46d5c64c017d4cf48243ec4731dfb8cc';
  const body = {
    host: 'www.capitalbridgesolutions.com',
    key: key,
    keyLocation: `https://www.capitalbridgesolutions.com/${key}.txt`,
    urlList: URLS_TO_SUBMIT
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      console.log(`✅ IndexNow submission successful! Bing will start crawling immediately.`);
    } else {
      const text = await response.text();
      console.error(`❌ IndexNow submission failed with status ${response.status}:`, text);
    }
  } catch (error: any) {
    console.error(`❌ IndexNow error:`, error.message);
  }
}

// Run
async function run() {
  await submitToGoogle();
  await submitToIndexNow();
}

run();
