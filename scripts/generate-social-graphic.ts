import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function generateSocialGraphic(id: string) {
  console.log(`📸 Generating TikTok Graphic for lead: ${id}...`);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to TikTok vertical dimensions
  await page.setViewport({
    width: 1080,
    height: 1920,
    deviceScaleFactor: 2, // High resolution
  });

  // Target the local development URL or Production URL
  // In GitHub Actions, we might want to use the production URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.capitalbridgesolutions.com';
  const url = `${siteUrl}/audits/${id}/tiktok`;
  
  console.log(`🔗 Navigating to: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Create the social directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'public', 'social');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${id}-tiktok.png`);
    await page.screenshot({ path: outputPath, type: 'png' });
    
    console.log(`✅ Graphic saved to: ${outputPath}`);
    await browser.close();
    return outputPath;
  } catch (err) {
    console.error(`❌ Failed to generate graphic:`, err);
    await browser.close();
    return null;
  }
}

// Allow running from CLI
if (require.main === module) {
  const leadId = process.argv[2];
  if (!leadId) {
    console.error('Please provide a lead ID');
    process.exit(1);
  }
  generateSocialGraphic(leadId).then(() => process.exit(0));
}

export { generateSocialGraphic };
