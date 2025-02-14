import { NextResponse } from 'next/server';
import axios from 'axios';
import puppeteer, { ElementHandle, Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Helper function for page.evaluate with proper typing
async function evaluateElement<T>(page: Page, element: ElementHandle<Element>, fn: (el: Element) => T): Promise<T> {
  return await page.evaluate(fn, element);
}

// Helper function to extract numbers from strings
function extractNumber(text: string | null | undefined): number | null {
  if (!text) return null;
  const match = text.match(/[\d,]+/);
  if (!match) return null;
  return parseInt(match[0].replace(/,/g, ''));
}

// Helper function to clean and standardize address
function standardizeAddress(address: string): string {
  return address
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(\d+)(st|nd|rd|th)/g, '$1')
    .replace(/\b(street|avenue|boulevard|drive|road|lane|way|circle|court|place)\b/g, (match) => {
      const abbrev: { [key: string]: string } = {
        'street': 'st',
        'avenue': 'ave',
        'boulevard': 'blvd',
        'drive': 'dr',
        'road': 'rd',
        'lane': 'ln',
        'way': 'way',
        'circle': 'cir',
        'court': 'ct',
        'place': 'pl'
      };
      return abbrev[match] || match;
    });
}

// Define listing source type
type ListingSource = 'redfin' | 'zillow' | null;

// Helper function to determine the source of the listing
function getListingSource(url: string): ListingSource {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    if (hostname.includes('redfin.com')) return 'redfin';
    if (hostname.includes('zillow.com')) return 'zillow';
    
    return null;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}

interface PropertyData {
  price?: number;
  address?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  yearBuilt?: number;
  lotSize?: number;
  propertyType?: string;
  zestimate?: number;
  rentZestimate?: number;
  [key: string]: any;
}

async function scrapePropertyData(url: string): Promise<PropertyData> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to:', url);
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Random delay between 2-5 seconds to appear more human-like
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    const listingSource = getListingSource(url);
    if (!listingSource) {
      throw new Error('Unsupported listing source. URL must be from Redfin or Zillow.');
    }

    // Wait for key elements with increased timeout and better error handling
    const waitForSelector = async (selector: string, timeout = 15000) => {
      try {
        await page.waitForSelector(selector, { timeout });
        return true;
      } catch (error) {
        console.log(`Selector not found: ${selector}`);
        return false;
      }
    };

    // Wait for any of these selectors to appear based on the source
    const keySelectors = listingSource === 'redfin' ? [
      '.HomeInfo',
      '[data-rf-test-id="abp-price"]',
      '.HomeStatsV2',
      '.home-main-stats'
    ] : [
      // Updated Zillow selectors
      'span[data-testid="price"]',
      '[data-testid="bed-bath-beyond"]',
      '.hdp__sc-1s2b8ok-0',  // New Zillow container class
      '.summary-container',
      '.ds-summary',
      '.hdp__qf5kuj-0',  // Price container
      '.hdp__sc-1tsvzbc-1',  // Address container
      '.hdp__sc-1s2b8ok-1'  // Facts container
    ];

    let foundAnySelector = false;
    for (const selector of keySelectors) {
      if (await waitForSelector(selector)) {
        foundAnySelector = true;
        break;
      }
    }

    if (!foundAnySelector) {
      console.log(`No key property information selectors found on the page for ${listingSource}`);
      throw new Error(`No key property information selectors found on the page for ${listingSource}`);
    }

    // Always take debug screenshot for now
    const screenshotPath = `debug-${listingSource}-${Date.now()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Saved debug screenshot to: ${screenshotPath}`);

    // Add a delay to ensure dynamic content loads
    await new Promise(resolve => setTimeout(resolve, 2000));

    const propertyData: PropertyData = {};

    if (listingSource === 'zillow') {
      // Updated price selectors for Zillow
      const priceSelectors = [
        'span[data-testid="price"]',
        '.hdp__qf5kuj-0 span',
        '.summary-container [data-testid="price"]',
        '.ds-summary span[data-testid="price"]',
        '.price'
      ];

      // Try each price selector with error handling and proper typing
      for (const selector of priceSelectors) {
        if (!propertyData.price) {
          try {
            const priceElement = await page.$(selector);
            if (priceElement) {
              const priceText = await evaluateElement(page, priceElement, (el) => el.textContent || '');
              if (priceText) {
                propertyData.price = extractNumber(priceText);
                console.log(`Found price: ${propertyData.price} using selector: ${selector}`);
                if (propertyData.price) break;
              }
            }
          } catch (error) {
            console.log(`Error getting price with selector ${selector}:`, error);
            continue;
          }
        }
      }

      // Updated stats selectors for Zillow
      const statsSelectors = [
        '[data-testid="bed-bath-beyond"] span',
        '.hdp__sc-1s2b8ok-1 span',  // New facts container
        '.ds-bed-bath-living-area span',
        '.summary-container span'
      ];

      for (const selector of statsSelectors) {
        try {
          const elements = await page.$$(selector);
          for (const element of elements) {
            const text = await evaluateElement(page, element, (el) => el.textContent?.toLowerCase() || '');
            console.log(`Found stat text: ${text} using selector: ${selector}`);
            
            if (!propertyData.bedrooms && (text.includes('bed') || text.includes('bd'))) {
              propertyData.bedrooms = extractNumber(text);
              console.log(`Found bedrooms: ${propertyData.bedrooms}`);
            }
            
            if (!propertyData.bathrooms && (text.includes('bath') || text.includes('ba'))) {
              propertyData.bathrooms = extractNumber(text);
              console.log(`Found bathrooms: ${propertyData.bathrooms}`);
            }
            
            if (!propertyData.squareFeet && (text.includes('sq ft') || text.includes('sqft'))) {
              propertyData.squareFeet = extractNumber(text);
              console.log(`Found square feet: ${propertyData.squareFeet}`);
            }
          }
          
          if (propertyData.bedrooms && propertyData.bathrooms && propertyData.squareFeet) break;
        } catch (error) {
          console.log(`Error getting stats from selector ${selector}:`, error);
        }
      }

      // Updated address selectors for Zillow
      const addressSelectors = [
        '.hdp__sc-1tsvzbc-1',  // New address container
        '[data-testid="property-address"]',
        '.summary-container [data-testid="property-address"]',
        '.ds-address-container'
      ];

      for (const selector of addressSelectors) {
        if (!propertyData.address) {
          try {
            const addressElement = await page.$(selector);
            if (addressElement) {
              const address = await evaluateElement(page, addressElement, (el) => el.textContent?.trim() || '');
              if (address) {
                propertyData.address = address;
                console.log(`Found address: ${address} using selector: ${selector}`);
                break;
              }
            }
          } catch (error) {
            console.log(`Error getting address from selector ${selector}:`, error);
          }
        }
      }

      // If address not found, try to construct it from the URL
      if (!propertyData.address) {
        const urlParts = url.split('/');
        const addressIndex = urlParts.findIndex(part => part.toLowerCase() === 'homedetails');
        if (addressIndex > 0 && addressIndex + 1 < urlParts.length) {
          const addressPart = urlParts[addressIndex + 1];
          const address = addressPart
            .replace(/-/g, ' ')
            .replace(/(\d+)([A-Za-z]+)/, '$1 $2');
          propertyData.address = address;
        }
      }
    } else if (listingSource === 'redfin') {
      // Updated selectors for property details
      const priceSelectors = [
        '[data-rf-test-id="abp-price"] .price',
        '.price-section .statsValue',
        '.HomeInfo [data-rf-test-id="abp-price"]',
        '.price',
        '.home-main-stats span[data-rf-test-name="price"]',
        '.StaticRegion span[data-rf-test-name="price"]'
      ];

      // Try each price selector with error handling and proper typing
      for (const selector of priceSelectors) {
        try {
          const priceElement = await page.$(selector);
          if (priceElement) {
            const text = await evaluateElement(page, priceElement, (el) => el.textContent);
            if (text) {
              propertyData.price = extractNumber(text);
              if (propertyData.price) break;
            }
          }
        } catch (error) {
          console.log(`Error getting price from selector ${selector}:`, error);
        }
      }

      // Updated selectors for beds/baths
      const statsSelectors = [
        '.HomeStatsV2 .stat-block',
        '.home-main-stats .stats-container',
        '.HomeBasicInfo .stat-block',
        '[data-rf-test-id="abp-beds"], [data-rf-test-id="abp-baths"]',
        '.stats .stat-block',
        '.StaticRegion [data-rf-test-name="beds"], .StaticRegion [data-rf-test-name="baths"]'
      ];

      // Try each stats selector
      for (const selector of statsSelectors) {
        try {
          const elements = await page.$$(selector);
          for (const element of elements) {
            const text = await evaluateElement(page, element, (el) => el.textContent?.toLowerCase() || '');
            
            if (!propertyData.bedrooms && (text.includes('bed') || text.includes('bd'))) {
              propertyData.bedrooms = extractNumber(text);
            }
            
            if (!propertyData.bathrooms && (text.includes('bath') || text.includes('ba'))) {
              propertyData.bathrooms = extractNumber(text);
            }
            
            if (!propertyData.squareFeet && (text.includes('sq ft') || text.includes('sqft'))) {
              propertyData.squareFeet = extractNumber(text);
            }
          }
          
          // Break if we found both beds and baths
          if (propertyData.bedrooms && propertyData.bathrooms) break;
        } catch (error) {
          console.log(`Error getting stats from selector ${selector}:`, error);
        }
      }

      // Get address - try multiple selectors and formats
      const addressSelectors = [
        '.street-address',
        '.homeAddress',
        '[data-rf-test-id="abp-streetAddress"]',
        '.detail-section .heading'
      ];

      const cityStateSelectors = [
        '.dp-subtext .city-state',
        '.cityStateZip',
        '[data-rf-test-id="abp-cityState"]',
        '.address-secondary',
        '.location'
      ];

      // Try each address selector combination
      for (const streetSelector of addressSelectors) {
        if (propertyData.address) break;
        const streetElement = await page.$(streetSelector);
        if (streetElement) {
          const street = await evaluateElement(page, streetElement, (el) => el.textContent?.trim() || '');
          if (street) {
            // Try each city/state selector
            for (const cityStateSelector of cityStateSelectors) {
              const cityStateElement = await page.$(cityStateSelector);
              if (cityStateElement) {
                const cityState = await evaluateElement(page, cityStateElement, (el) => el.textContent?.trim() || '');
                if (cityState) {
                  propertyData.address = `${street}, ${cityState}`;
                  break;
                }
              }
            }
          }
        }
      }

      // If address still not found, try looking for a combined address element
      if (!propertyData.address) {
        const combinedSelectors = [
          '.homeAddress-variant',
          '[data-rf-test-id="abp-homeAddress"]',
          '.full-address'
        ];
        
        for (const selector of combinedSelectors) {
          if (propertyData.address) break;
          const element = await page.$(selector);
          if (element) {
            const address = await evaluateElement(page, element, (el) => el.textContent?.trim() || '');
            if (address) {
              propertyData.address = address;
            }
          }
        }
      }

      // If still no address, try to construct it from the URL
      if (!propertyData.address && url.includes('/home/')) {
        const urlParts = url.split('/');
        const addressIndex = urlParts.findIndex(part => part.toLowerCase() === 'ca');
        if (addressIndex > 0) {
          const street = urlParts[addressIndex + 1].replace(/-/g, ' ');
          const city = urlParts[addressIndex - 1].replace(/-/g, ' ');
          const zip = urlParts[addressIndex + 2].split('/')[0];
          propertyData.address = `${street}, ${city}, CA ${zip}`;
        }
      }

      // Get square footage - try multiple selectors
      const sqftSelectors = [
        '[data-rf-test-id="abp-sqFt"] .statsValue',
        '.sqFt .value',
        '.home-main-stats-variant .stats span[data-rf-test-name="property-size"]',
        '.HomeStatsV2 span[data-rf-test-name="property-size"]',
        '.propertyStats .sqft',
        '.PropertyStatsSection [data-rf-test-id="abp-sqFt"]',
        '.table-row span[data-rf-test-name="property-size"]',
        '.SourceContent .stats [data-rf-test-name="property-size"]',
        '.keyDetail',
        '.table-row'
      ];

      // Try each selector and look for square footage text
      for (const selector of sqftSelectors) {
        if (propertyData.squareFeet) break;
        const elements = await page.$$(selector);
        for (const element of elements) {
          const text = await evaluateElement(page, element, (el) => el.textContent);
          if (text && (text.toLowerCase().includes('sq ft') || 
                      text.toLowerCase().includes('square feet') || 
                      text.toLowerCase().includes('sqft'))) {
            const sqft = extractNumber(text);
            if (sqft && sqft > 0 && sqft < 100000) { // Sanity check on size
              propertyData.squareFeet = sqft;
              break;
            }
          }
        }
      }

      // If still not found, try searching in any text that mentions square feet
      if (!propertyData.squareFeet) {
        const bodyText = await page.$eval('body', (el: Element) => el.innerText);
        const sqftMatches = bodyText.match(/(\d{3,5})\s*(?:square\s*feet|sq\.?\s*ft\.?|sqft)/i);
        if (sqftMatches && sqftMatches[1]) {
          const sqft = parseInt(sqftMatches[1]);
          if (sqft > 0 && sqft < 100000) { // Sanity check on size
            propertyData.squareFeet = sqft;
          }
        }
      }

      // Try to find year built
      if (!propertyData.yearBuilt) {
        try {
          const yearBuiltText = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('*'));
            for (const el of elements) {
              const text = el.textContent?.toLowerCase() || '';
              if (text.includes('year built') || text.includes('built in')) {
                return text;
              }
            }
            return '';
          });
          
          if (yearBuiltText) {
            const yearMatch = yearBuiltText.match(/(?:year built|built in).*?(\d{4})/i);
            if (yearMatch) {
              propertyData.yearBuilt = parseInt(yearMatch[1]);
            }
          }
        } catch (error) {
          console.error('Error finding year built:', error);
        }
      }

      // If year still not found, try specific selectors
      if (!propertyData.yearBuilt) {
        try {
          const yearSelectors = [
            '.home-facts',
            '.property-info',
            '.property-details'
          ];

          for (const selector of yearSelectors) {
            const element = await page.$(selector);
            if (element) {
              const text = await evaluateElement(page, element, (el) => el.textContent || '');
              const yearMatch = text.match(/(?:year built|built in).*?(\d{4})/i);
              if (yearMatch) {
                propertyData.yearBuilt = parseInt(yearMatch[1]);
                break;
              }
            }
          }
        } catch (error) {
          console.error('Error finding year built from selectors:', error);
        }
      }

      // Get year built - try multiple selectors and formats
      const yearSelectors = [
        '.table-row',
        '.keyDetails',
        '.homeFactsSection'
      ];

      for (const selector of yearSelectors) {
        if (!propertyData.yearBuilt) {
          const yearElements = await page.$$(selector);
          for (const element of yearElements) {
            const text = await evaluateElement(page, element, (el) => el.textContent?.toLowerCase() || '');
            if (text.includes('year built') || text.includes('built in')) {
              const yearMatch = text.match(/(\d{4})/);
              propertyData.yearBuilt = yearMatch ? parseInt(yearMatch[1]) : null;
              if (propertyData.yearBuilt) break;
            }
          }
        }
      }

      // If data is still missing, try the property details section
      if (!propertyData.bedrooms || !propertyData.bathrooms || !propertyData.squareFeet || !propertyData.yearBuilt) {
        const detailsElements = await page.$$('.amenities-container li, .propertyDetails li, .keyDetails li');
        for (const element of detailsElements) {
          const text = await evaluateElement(page, element, (el) => el.textContent?.toLowerCase() || '');
          
          if (!propertyData.bedrooms && text.includes('bed')) {
            const bedsMatch = text.match(/(\d+\.?\d*)\s*(?:bed|bedroom|br)/i);
            propertyData.bedrooms = bedsMatch ? parseFloat(bedsMatch[1]) : null;
          }
          if (!propertyData.bathrooms && text.includes('bath')) {
            const bathsMatch = text.match(/(\d+\.?\d*)\s*(?:bath|bathroom|ba)/i);
            propertyData.bathrooms = bathsMatch ? parseFloat(bathsMatch[1]) : null;
          }
          if (!propertyData.squareFeet && (text.includes('sq') || text.includes('square'))) {
            const sqftMatch = text.match(/(\d+,?\d*)\s*(?:sqft|sq\s*ft|square\s*feet)/i);
            propertyData.squareFeet = sqftMatch ? parseInt(sqftMatch[1].replace(',', '')) : null;
          }
          if (!propertyData.yearBuilt && (text.includes('built') || text.includes('year'))) {
            const yearMatch = text.match(/(\d{4})/);
            propertyData.yearBuilt = yearMatch ? parseInt(yearMatch[1]) : null;
          }
        }
      }

      // If still missing data, try the property description
      if (!propertyData.bedrooms || !propertyData.bathrooms || !propertyData.squareFeet || !propertyData.yearBuilt) {
        const descriptionElement = await page.$('.remarks, .propertyDescription, #marketing-remarks-scroll');
        if (descriptionElement) {
          const text = await evaluateElement(page, descriptionElement, (el) => el.textContent?.toLowerCase() || '');
          
          if (!propertyData.bedrooms) {
            const bedsMatch = text.match(/(\d+\.?\d*)\s*(?:bed(?:room)?s?|br)/i);
            propertyData.bedrooms = bedsMatch ? parseFloat(bedsMatch[1]) : null;
          }
          if (!propertyData.bathrooms) {
            const bathsMatch = text.match(/(\d+\.?\d*)\s*(?:bath(?:room)?s?|ba)/i);
            propertyData.bathrooms = bathsMatch ? parseFloat(bathsMatch[1]) : null;
          }
          if (!propertyData.squareFeet) {
            const sqftMatch = text.match(/(\d+,?\d*)\s*(?:sq(?:uare)?\s*(?:ft|feet))/i);
            propertyData.squareFeet = sqftMatch ? parseInt(sqftMatch[1].replace(',', '')) : null;
          }
          if (!propertyData.yearBuilt) {
            const yearMatch = text.match(/(?:built|constructed)\s*(?:in)?\s*(\d{4})/i);
            propertyData.yearBuilt = yearMatch ? parseInt(yearMatch[1]) : null;
          }
        }
      }
    }
    // Handle Zillow
    else if (listingSource === 'zillow') {
      // Wait for key elements with longer timeout since Zillow can be slow
      await page.waitForSelector('[data-test="price"], .summary-container', { timeout: 20000 }).catch(() => null);

      // Get address - try multiple selectors
      const addressElement = await page.$('[data-test="property-address"], .ds-address-wrapper');
      if (addressElement) {
        propertyData.address = await evaluateElement(page, addressElement, (el) => el.textContent?.trim() || '');
      }

      // Get price - try multiple selectors
      const priceElement = await page.$('[data-test="price"], .summary-price, .ds-price');
      if (priceElement) {
        const priceText = await evaluateElement(page, priceElement, (el) => el.textContent);
        propertyData.price = extractNumber(priceText);
      }

      // Get beds/baths/sqft - try multiple selectors
      const summaryElement = await page.$('[data-test="bed-bath-beyond"], .ds-bed-bath-living-area, .summary-container');
      if (summaryElement) {
        const text = await evaluateElement(page, summaryElement, (el) => el.textContent);
        if (text) {
          const bedsMatch = text.match(/(\d+\.?\d*)\s*(?:bd|bed|bedroom)s?/i);
          const bathsMatch = text.match(/(\d+\.?\d*)\s*(?:ba|bath|bathroom)s?/i);
          const sqftMatch = text.match(/(\d+,?\d*)\s*(?:sqft|sq\s*ft|square\s*feet)/i);

          if (bedsMatch) propertyData.bedrooms = parseFloat(bedsMatch[1]);
          if (bathsMatch) propertyData.bathrooms = parseFloat(bathsMatch[1]);
          if (sqftMatch) propertyData.squareFeet = parseInt(sqftMatch[1].replace(/,/g, ''));
        }
      }

      // If data still missing, try the home details section
      if (!propertyData.bedrooms || !propertyData.bathrooms || !propertyData.squareFeet) {
        const detailsElements = await page.$$('[data-test="facts-card"] .ds-home-facts-table .ds-standard-card li, .ds-home-facts div');
        for (const element of detailsElements) {
          const text = await evaluateElement(page, element, (el) => el.textContent?.toLowerCase() || '');
          
          if (!propertyData.bedrooms && text.includes('bed')) {
            const bedsMatch = text.match(/(\d+\.?\d*)\s*(?:bd|bed|bedroom)s?/i);
            propertyData.bedrooms = bedsMatch ? parseFloat(bedsMatch[1]) : null;
          }
          if (!propertyData.bathrooms && text.includes('bath')) {
            const bathsMatch = text.match(/(\d+\.?\d*)\s*(?:ba|bath|bathroom)s?/i);
            propertyData.bathrooms = bathsMatch ? parseFloat(bathsMatch[1]) : null;
          }
          if (!propertyData.squareFeet && (text.includes('sqft') || text.includes('square'))) {
            const sqftMatch = text.match(/(\d+,?\d*)\s*(?:sqft|sq\s*ft|square\s*feet)/i);
            propertyData.squareFeet = sqftMatch ? parseInt(sqftMatch[1].replace(',', '')) : null;
          }
          if (!propertyData.yearBuilt && (text.includes('built') || text.includes('year'))) {
            const yearMatch = text.match(/(\d{4})/);
            propertyData.yearBuilt = yearMatch ? parseInt(yearMatch[1]) : null;
          }
        }
      }

      // If still missing data, try the property description
      if (!propertyData.bedrooms || !propertyData.bathrooms || !propertyData.squareFeet || !propertyData.yearBuilt) {
        const descriptionElement = await page.$('[data-test="description"], .ds-overview-section');
        if (descriptionElement) {
          const text = await evaluateElement(page, descriptionElement, (el) => el.textContent?.toLowerCase() || '');
          
          if (!propertyData.bedrooms) {
            const bedsMatch = text.match(/(\d+\.?\d*)\s*(?:bed(?:room)?s?)/i);
            propertyData.bedrooms = bedsMatch ? parseFloat(bedsMatch[1]) : null;
          }
          if (!propertyData.bathrooms) {
            const bathsMatch = text.match(/(\d+\.?\d*)\s*(?:bath(?:room)?s?|ba)/i);
            propertyData.bathrooms = bathsMatch ? parseFloat(bathsMatch[1]) : null;
          }
          if (!propertyData.squareFeet) {
            const sqftMatch = text.match(/(\d+,?\d*)\s*(?:sq(?:uare)?\s*(?:ft|feet))/i);
            propertyData.squareFeet = sqftMatch ? parseInt(sqftMatch[1].replace(',', '')) : null;
          }
          if (!propertyData.yearBuilt) {
            const yearMatch = text.match(/(?:built|constructed)\s*(?:in)?\s*(\d{4})/i);
            propertyData.yearBuilt = yearMatch ? parseInt(yearMatch[1]) : null;
          }
        }
      }

      // Try to get year built from facts section if not found elsewhere
      if (!propertyData.yearBuilt) {
        const factsElement = await page.$('[data-test="facts-card"], .ds-home-facts');
        if (factsElement) {
          const yearMatch = await page.evaluateHandle((el: Element) => {
            const spans = document.querySelectorAll('span, li, div');
            const yearText = Array.from(spans).find(span => 
              span.textContent?.toLowerCase().includes('year built') ||
              span.textContent?.toLowerCase().includes('built in')
            );
            if (yearText) {
              const match = yearText.textContent?.match(/(\d{4})/);
              return match ? match[1] : null;
            }
            return null;
          });
          
          const yearValue = await yearMatch.jsonValue();
          if (yearValue) {
            propertyData.yearBuilt = parseInt(yearValue);
          }
          await yearMatch.dispose();
        }
      }
    }

    console.log('Scraped data:', propertyData);

    // Validate required fields
    const missing = [];
    if (!propertyData.address) missing.push('address');
    if (!propertyData.price) missing.push('price');
    if (!propertyData.bedrooms && propertyData.bedrooms !== 0) missing.push('bedrooms');
    if (!propertyData.bathrooms && propertyData.bathrooms !== 0) missing.push('bathrooms');
    // Make square footage optional since we can estimate it

    if (missing.length > 0) {
      throw new Error(`Could not find the following property data: ${missing.join(', ')}`);
    }

    return propertyData;
  } catch (error) {
    console.error('Error scraping property:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function searchPropertyListings(addressData: { street: string, city: string, state: string, zip: string }) {
  const { street, city, state, zip } = addressData;
  console.log('Searching with address components:', { street, city, state, zip });

  const browser = await puppeteer.launch({ 
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1920,1080',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      '--disable-blink-features=AutomationControlled'  // Hide automation
    ]
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Add more browser-like headers and properties
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Accept-Encoding': 'gzip, deflate, br',
      'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'Upgrade-Insecure-Requests': '1'
    });

    // Mask webdriver
    await page.evaluateOnNewDocument(() => {
      delete (window as any).navigator.__proto__.webdriver;
      (window as any).navigator.chrome = { runtime: {} };
    });

    // Try Redfin first
    console.log('Trying Redfin...');
    const redfinSearchUrl = `https://www.redfin.com/city/${city.replace(/\s+/g, '-')}-${state}/filter/property-type=house+multifamily+condo+townhouse+land,search=${encodeURIComponent(street)}`;
    console.log('Redfin search URL:', redfinSearchUrl);
    
    await page.goto(redfinSearchUrl, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });

    await page.screenshot({ path: 'redfin-debug.png' });
    
    // Look for search results
    const firstResult = await page.$('.HomeCard').catch(() => null);
    if (firstResult) {
      const propertyUrl = await page.$eval('.HomeCard a.slider-item', (el: Element) => el.getAttribute('href')).catch(() => null);
      if (propertyUrl) {
        const fullUrl = propertyUrl.startsWith('http') ? propertyUrl : `https://www.redfin.com${propertyUrl}`;
        console.log('Found Redfin listing:', fullUrl);
        try {
          const data = await scrapePropertyData(fullUrl);
          if (!data.address || !data.price || !data.bedrooms || 
              !data.bathrooms || !data.squareFeet) {
            throw new Error('Could not find all required property data from the URL');
          }

          const location = { 
            city: data.address.split(',')[1]?.trim() || '',
            state: data.address.split(',')[2]?.trim().split(' ')[0] || ''
          };

          if (!location.state) {
            throw new Error('Could not determine property location from address');
          }

          const estimatedRent = await estimateRent(
            data.price,
            data.bedrooms,
            data.bathrooms,
            data.squareFeet,
            location
          );

          const metrics = await calculateMetrics(data, estimatedRent);

          // Format the property data for the AI prompt
          const propertyPrompt = `
You are an expert advisor from Capital Bridge Solutions, a leading provider of DSCR loans and investment property financing. Please provide a detailed analysis of this investment property.

PROPERTY OVERVIEW
- Address: ${data.address}
- Price: $${data.price?.toLocaleString()}
- Bedrooms: ${data.bedrooms}
- Bathrooms: ${data.bathrooms}
- Square Feet: ${data.squareFeet?.toLocaleString()} sq ft${data.squareFeetEstimated ? ' (Estimated)' : ''}
- Year Built: ${data.yearBuilt || 'Not available'}
- Price per Sq Ft: $${data.price && data.squareFeet ? Math.round(data.price / data.squareFeet) : 'N/A'}${data.squareFeetEstimated ? ' (Based on estimate)' : ''}

FINANCIAL METRICS
- Monthly Rent Estimate: $${estimatedRent?.toLocaleString()}
- Annual Gross Rent: $${(estimatedRent * 12)?.toLocaleString()}
- Estimated Monthly Expenses: $${metrics.monthlyExpenses?.toLocaleString()}
- Estimated Monthly Mortgage: $${metrics.monthlyMortgage?.toLocaleString()}
- Approximate Monthly Income: $${(estimatedRent - metrics.monthlyExpenses - metrics.monthlyMortgage)?.toLocaleString()}
- Net Operating Income (NOI): $${(estimatedRent * 12 - metrics.monthlyExpenses * 12)?.toLocaleString()}
- Cap Rate: ${((estimatedRent * 12 - metrics.monthlyExpenses * 12) / data.price * 100).toFixed(2)}%
- Cash on Cash Return: ${(((estimatedRent * 12 - metrics.monthlyExpenses * 12 - metrics.monthlyMortgage * 12) / (data.price * 0.25 + data.price * 0.03)) * 100).toFixed(2)}%
- DSCR: ${((estimatedRent) / (metrics.monthlyMortgage + metrics.monthlyExpenses)).toFixed(2)}

Please provide a comprehensive investment analysis with these exact sections:

# Quick Answer
Provide a clear investment recommendation (Buy, Strong Buy, Hold, Sell, Strong Sell) with a brief explanation.

# Expert Analysis
Detailed explanation incorporating the property's key metrics and potential as an investment.

# Market Insights
Analysis of the property's location, market conditions, and trends affecting its value.

# Risk Assessment
Key risks and challenges to consider, including market, property, and financial risks.

# Best Practices
Recommended strategies for maximizing the property's potential and managing risks.

# Next Steps
Specific actions the investor should take, including financing options and property improvements.

# Additional Support
For personalized assistance with your investment strategy or DSCR loan questions:
- Call: (949) 614-6390
- Email: info@capitalbridgesolutions.com

Format each section with bullet points where appropriate. Maintain Capital Bridge Solutions' professional voice and always direct inquiries to Capital Bridge Solutions.`;

          // Get AI analysis with enhanced context
          const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are an expert real estate investment advisor from Capital Bridge Solutions. While you can reference BiggerPockets community insights, maintain Capital Bridge Solutions' professional voice and always direct inquiries to Capital Bridge Solutions. Combine academic knowledge, real-world experience, and community insights to provide comprehensive advice. Format responses in clear sections with bullet points where appropriate."
              },
              {
                role: "user",
                content: propertyPrompt
              }
            ],
            temperature: 0.7,
          });

          // Format the AI response
          const analysis = completion.choices[0].message.content;

          // Return all the data in the existing format
          return NextResponse.json({
            data: {
              ...data,
              estimatedRent,
              ...metrics,
              analysis,
              url: url
            }
          });
        } catch (error) {
          console.log('Failed to scrape Redfin result:', error);
        }
      }
    }

    // Try Zillow
    console.log('Trying Zillow...');
    const fullAddress = `${street}, ${city}, ${state} ${zip}`;
    const zillowSearchUrl = `https://www.zillow.com/homes/${encodeURIComponent(fullAddress)}_rb/`;
    console.log('Zillow search URL:', zillowSearchUrl);
    
    await page.goto(zillowSearchUrl, { 
      waitUntil: 'networkidle0',
      timeout: 60000 
    });

    await page.screenshot({ path: 'zillow-debug.png' });
    
    // Look for search results
    const propertyCard = await page.$('.property-card-link').catch(() => null);
    if (propertyCard) {
      const propertyUrl = await propertyCard.evaluate((el: Element) => el.getAttribute('href')).catch(() => null);
      if (propertyUrl) {
        const fullUrl = propertyUrl.startsWith('http') ? propertyUrl : `https://www.zillow.com${propertyUrl}`;
        console.log('Found Zillow listing:', fullUrl);
        try {
          const data = await scrapePropertyData(fullUrl);
          if (!data.address || !data.price || !data.bedrooms || 
              !data.bathrooms || !data.squareFeet) {
            throw new Error('Could not find all required property data from the URL');
          }

          const location = { 
            city: data.address.split(',')[1]?.trim() || '',
            state: data.address.split(',')[2]?.trim().split(' ')[0] || ''
          };

          if (!location.state) {
            throw new Error('Could not determine property location from address');
          }

          const estimatedRent = await estimateRent(
            data.price,
            data.bedrooms,
            data.bathrooms,
            data.squareFeet,
            location
          );

          const metrics = await calculateMetrics(data, estimatedRent);

          // Format the property data for the AI prompt
          const propertyPrompt = `
You are an expert advisor from Capital Bridge Solutions, a leading provider of DSCR loans and investment property financing. Please provide a detailed analysis of this investment property.

PROPERTY OVERVIEW
- Address: ${data.address}
- Price: $${data.price?.toLocaleString()}
- Bedrooms: ${data.bedrooms}
- Bathrooms: ${data.bathrooms}
- Square Feet: ${data.squareFeet?.toLocaleString()} sq ft${data.squareFeetEstimated ? ' (Estimated)' : ''}
- Year Built: ${data.yearBuilt || 'Not available'}
- Price per Sq Ft: $${data.price && data.squareFeet ? Math.round(data.price / data.squareFeet) : 'N/A'}${data.squareFeetEstimated ? ' (Based on estimate)' : ''}

FINANCIAL METRICS
- Monthly Rent Estimate: $${estimatedRent?.toLocaleString()}
- Annual Gross Rent: $${(estimatedRent * 12)?.toLocaleString()}
- Estimated Monthly Expenses: $${metrics.monthlyExpenses?.toLocaleString()}
- Estimated Monthly Mortgage: $${metrics.monthlyMortgage?.toLocaleString()}
- Approximate Monthly Income: $${(estimatedRent - metrics.monthlyExpenses - metrics.monthlyMortgage)?.toLocaleString()}
- Net Operating Income (NOI): $${(estimatedRent * 12 - metrics.monthlyExpenses * 12)?.toLocaleString()}
- Cap Rate: ${((estimatedRent * 12 - metrics.monthlyExpenses * 12) / data.price * 100).toFixed(2)}%
- Cash on Cash Return: ${(((estimatedRent * 12 - metrics.monthlyExpenses * 12 - metrics.monthlyMortgage * 12) / (data.price * 0.25 + data.price * 0.03)) * 100).toFixed(2)}%
- DSCR: ${((estimatedRent) / (metrics.monthlyMortgage + metrics.monthlyExpenses)).toFixed(2)}

Please provide a comprehensive investment analysis with these exact sections:

# Quick Answer
Provide a clear investment recommendation (Buy, Strong Buy, Hold, Sell, Strong Sell) with a brief explanation.

# Expert Analysis
Detailed explanation incorporating the property's key metrics and potential as an investment.

# Market Insights
Analysis of the property's location, market conditions, and trends affecting its value.

# Risk Assessment
Key risks and challenges to consider, including market, property, and financial risks.

# Best Practices
Recommended strategies for maximizing the property's potential and managing risks.

# Next Steps
Specific actions the investor should take, including financing options and property improvements.

# Additional Support
For personalized assistance with your investment strategy or DSCR loan questions:
- Call: (949) 614-6390
- Email: info@capitalbridgesolutions.com

Format each section with bullet points where appropriate. Maintain Capital Bridge Solutions' professional voice and always direct inquiries to Capital Bridge Solutions.`;

          // Get AI analysis with enhanced context
          const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are an expert real estate investment advisor from Capital Bridge Solutions. While you can reference BiggerPockets community insights, maintain Capital Bridge Solutions' professional voice and always direct inquiries to Capital Bridge Solutions. Combine academic knowledge, real-world experience, and community insights to provide comprehensive advice. Format responses in clear sections with bullet points where appropriate."
              },
              {
                role: "user",
                content: propertyPrompt
              }
            ],
            temperature: 0.7,
          });

          // Format the AI response
          const analysis = completion.choices[0].message.content;

          // Return all the data in the existing format
          return NextResponse.json({
            data: {
              ...data,
              estimatedRent,
              ...metrics,
              analysis,
              url: url
            }
          });
        } catch (error) {
          console.log('Failed to scrape Zillow result:', error);
        }
      }
    }

    console.log('No property listings found');
    return null;
  } catch (error) {
    console.error('Error searching property listings:', error);
    return null;
  } finally {
    await browser.close();
  }
}

async function estimateRent(
  price: number,
  bedrooms: number,
  bathrooms: number,
  sqft: number,
  location: { city: string, state: string }
) {
  if (!price || !bedrooms || !bathrooms || !sqft || !location.state) {
    throw new Error('Missing required property data for rent estimation');
  }

  // Location-based adjustments
  const locationMultipliers: { [key: string]: number } = {
    'CA': 1.2,
    'NY': 1.3,
    'WA': 1.1,
    'TX': 0.9,
    'FL': 0.95
  };

  const locationMultiplier = locationMultipliers[location.state];
  if (!locationMultiplier) {
    throw new Error(`No rent data available for state: ${location.state}`);
  }
  
  // Property characteristics adjustments
  const baseRentRatio = 0.007; // 0.7% of property value as base monthly rent
  const bedroomMultiplier = 1 + (bedrooms - 3) * 0.12;
  const bathroomMultiplier = 1 + (bathrooms - 2) * 0.08;
  const sqftMultiplier = 1 + (sqft - 1500) / 1500 * 0.15;

  const estimatedRent = price * baseRentRatio * locationMultiplier * 
                       bedroomMultiplier * bathroomMultiplier * sqftMultiplier;
  
  // Round to nearest $50
  return Math.round(estimatedRent / 50) * 50;
}

async function calculateMetrics(propertyData: any, estimatedRent: number) {
  if (!propertyData.price || !estimatedRent) {
    throw new Error('Missing required data for metric calculations');
  }

  // Calculate monthly mortgage payment (30-year fixed, estimated 7% interest rate)
  const interestRate = 0.07;
  const loanTerm = 30;
  const monthlyRate = interestRate / 12;
  const numPayments = loanTerm * 12;
  const loanAmount = propertyData.price * 0.75; // Assuming 25% down payment
  
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                         (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Calculate other expenses
  const propertyTax = propertyData.price * 0.0125 / 12; // 1.25% annual property tax
  const insurance = (propertyData.price * 0.005) / 12; // 0.5% annual insurance
  const maintenance = (propertyData.price * 0.01) / 12; // 1% annual maintenance
  const vacancy = estimatedRent * 0.08; // 8% vacancy rate
  const propertyManagement = estimatedRent * 0.1; // 10% property management fee

  // Calculate total monthly expenses
  const totalMonthlyExpenses = monthlyMortgage + propertyTax + insurance + maintenance + vacancy + propertyManagement;

  // Calculate monthly cashflow
  const monthlyCashflow = estimatedRent - totalMonthlyExpenses;

  // Calculate cap rate
  const annualNOI = (estimatedRent * 12) - ((propertyTax + insurance + maintenance + vacancy + propertyManagement) * 12);
  const capRate = (annualNOI / propertyData.price) * 100;

  // Calculate cash on cash return
  const downPayment = propertyData.price * 0.25;
  const closingCosts = propertyData.price * 0.03;
  const totalInvestment = downPayment + closingCosts;
  const annualCashflow = monthlyCashflow * 12;
  const cashOnCash = (annualCashflow / totalInvestment) * 100;

  // Calculate DSCR
  const dscr = estimatedRent / (monthlyMortgage + propertyTax + insurance);

  return {
    monthlyMortgage: Math.round(monthlyMortgage),
    monthlyExpenses: Math.round(totalMonthlyExpenses),
    monthlyCashflow: Math.round(monthlyCashflow),
    capRate: Math.round(capRate * 100) / 100,
    cashOnCash: Math.round(cashOnCash * 100) / 100,
    dscr: Math.round(dscr * 100) / 100
  };
}

async function getPropertyDataFromAddress(addressData: { street: string, city: string, state: string, zip: string }) {
  try {
    // First try to find and scrape from Redfin/Zillow
    const listingData = await searchPropertyListings(addressData);
    if (listingData) {
      console.log(`Found property data from ${listingData.source}`);
      return listingData.data;
    }

    // If no listing found, fall back to OpenAI
    console.log('No listings found, using OpenAI');
    const fullAddress = `${addressData.street}, ${addressData.city}, ${addressData.state} ${addressData.zip}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a real estate data expert. Given an address, provide ONLY the actual property data you can find. 
          DO NOT make assumptions or use default values. If you cannot find certain information, return null for those fields.
          Format your response EXACTLY like this example, with no additional text:
          {
            "price": 750000,
            "bedrooms": 3,
            "bathrooms": 2,
            "squareFeet": 1500,
            "yearBuilt": 1985,
            "confidence": {
              "price": 0.9,
              "bedrooms": 0.95,
              "bathrooms": 0.95,
              "squareFeet": 0.9,
              "yearBuilt": 0.85
            }
          }`
        },
        {
          role: "user",
          content: `Find property data for this exact address: ${fullAddress}`
        }
      ],
      temperature: 0
    });

    const content = completion.choices[0].message.content;
    console.log('GPT Response:', content);

    try {
      const response = JSON.parse(content.trim());
      console.log('Parsed response:', response);
      
      // Only use values where confidence is high enough
      const propertyData = {
        address: fullAddress,
        price: response.confidence?.price > 0.8 ? response.price : null,
        bedrooms: response.confidence?.bedrooms > 0.8 ? response.bedrooms : null,
        bathrooms: response.confidence?.bathrooms > 0.8 ? response.bathrooms : null,
        squareFeet: response.confidence?.squareFeet > 0.8 ? response.squareFeet : null,
        yearBuilt: response.confidence?.yearBuilt > 0.8 ? response.yearBuilt : null
      };

      console.log('Processed data:', propertyData);

      // Validate that we have enough data
      const missingFields = [];
      if (!propertyData.price) missingFields.push('price');
      if (!propertyData.bedrooms) missingFields.push('bedrooms');
      if (!propertyData.bathrooms) missingFields.push('bathrooms');
      // Make square footage optional since we can estimate it

      if (missingFields.length > 0) {
        throw new Error(`Could not find reliable data for: ${missingFields.join(', ')}`);
      }

      return propertyData;
    } catch (parseError) {
      console.error('Error parsing GPT response:', parseError);
      throw new Error('Could not parse property data response');
    }
  } catch (error) {
    console.error('Error getting property data:', error);
    throw new Error('Could not retrieve property data. Please try providing a property URL instead.');
  }
}

async function getPropertyDataFromCoreLogic(propertyData: any) {
  try {
    // Extract address components from CoreLogic data
    const address = propertyData.propertyAddress;
    
    // Get property details from existing APIs
    const propertyDetails = await getPropertyDataFromAddress({
      street: address.streetAddress,
      city: address.city,
      state: address.state,
      zip: address.zipCode
    });

    // Calculate investment metrics
    const estimatedRent = await estimateRent(
      propertyDetails.price,
      propertyDetails.bedrooms,
      propertyDetails.bathrooms,
      propertyDetails.squareFeet,
      { city: address.city, state: address.state }
    );

    const metrics = calculateMetrics(propertyDetails, estimatedRent);

    return {
      ...propertyDetails,
      ...metrics,
      clip: propertyData.clip,
      propertyMatchScore: propertyData.addressMatchInformation.propertyMatchScore
    };
  } catch (error) {
    console.error('Error processing CoreLogic data:', error);
    throw new Error('Failed to process property data');
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { url, inputType, addressFields, propertyData } = body;

    let result;

    if (inputType === 'corelogic' && propertyData) {
      result = await getPropertyDataFromCoreLogic(propertyData);
    } else if (inputType === 'url' && url) {
      result = await scrapePropertyData(url);
    } else if (inputType === 'address' && addressFields) {
      result = await getPropertyDataFromAddress(addressFields);
    } else if (inputType === 'question') {
      // Scrape BiggerPockets for relevant information
      const bpSearchUrl = `https://www.biggerpockets.com/search?q=${encodeURIComponent(url)}`;
      const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      await page.goto(bpSearchUrl, { waitUntil: 'networkidle0' });
      
      // Get relevant forum posts and discussions
      const bpResults = await page.evaluate(() => {
        const posts = document.querySelectorAll('.search-result');
        return Array.from(posts).slice(0, 5).map(post => {
          const title = post.querySelector('.search-result__title')?.textContent?.trim() || '';
          const snippet = post.querySelector('.search-result__excerpt')?.textContent?.trim() || '';
          return { title, snippet };
        });
      });

      await browser.close();

      // Format BiggerPockets insights
      const bpInsights = bpResults.map(result => 
        `${result.title}\n${result.snippet}`
      ).join('\n\n');

      // Create a comprehensive prompt with Capital Bridge Solutions branding
      const questionPrompt = `
You are an expert advisor from Capital Bridge Solutions, a leading provider of DSCR loans and investment property financing. Use the following BiggerPockets community insights along with your expertise to provide a comprehensive response, while maintaining Capital Bridge Solutions' professional voice.

QUESTION:
${url}

BIGGERPOCKETS RESEARCH:
${bpInsights}

Please structure your response with these exact section titles:

# Quick Answer
Provide a concise, direct answer to the question

# Expert Analysis
Detailed explanation incorporating both BiggerPockets insights and Capital Bridge Solutions' expertise

# Market Insights
Current market conditions and trends related to this topic, referencing relevant BiggerPockets discussions

# Risk Assessment
Important risks and considerations to keep in mind

# Best Practices
Recommended approaches and strategies, combining community knowledge with Capital Bridge Solutions' expertise

# Next Steps
Specific actions the investor should take, emphasizing how Capital Bridge Solutions can help

# Additional Support
For personalized assistance with your investment strategy or DSCR loan questions:
- Call: (949) 614-6390
- Email: info@capitalbridgesolutions.com

Format each section with bullet points where appropriate. Maintain Capital Bridge Solutions' professional voice and always direct inquiries to Capital Bridge Solutions.`;

      // Get AI analysis with enhanced context
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert real estate investment advisor from Capital Bridge Solutions. While you can reference BiggerPockets community insights, maintain Capital Bridge Solutions' professional voice and always direct inquiries to Capital Bridge Solutions. Combine academic knowledge, real-world experience, and community insights to provide comprehensive advice. Format responses in clear sections with bullet points where appropriate."
          },
          {
            role: "user",
            content: questionPrompt
          }
        ],
        temperature: 0.7,
      });

      // Return the enhanced response
      return NextResponse.json({
        data: {
          type: 'question',
          answer: completion.choices[0].message.content,
          bpInsights: bpResults
        }
      });

    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
}
