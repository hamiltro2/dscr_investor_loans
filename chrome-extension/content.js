// Content script to extract property data from real estate websites

// Function to extract price from various formats
function extractPrice(text) {
  if (!text) return null;
  
  // Remove commas and dollar signs, extract number
  const match = text.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ''));
  }
  return null;
}

// Function to extract number from text
function extractNumber(text) {
  if (!text) return null;
  const match = text.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

// Extract property data based on the website
function extractPropertyData() {
  const hostname = window.location.hostname;
  let propertyData = {
    price: null,
    rent: null,
    address: null,
    type: null,
    bedrooms: null,
    bathrooms: null,
    sqft: null,
    yearBuilt: null,
    propertyTax: null,
    hoaFees: null,
    source: hostname
  };

  // Zillow extraction
  if (hostname.includes('zillow.com')) {
    // Price - Updated selectors for Zillow's current structure
    let priceFound = false;
    
    // Method 1: Try specific Zillow price selectors first
    const priceSelectors = [
      'span[data-testid="price"]',
      '[data-test="property-value"]',
      'h1 + div span[class*="Text"]', // Price often follows h1
      '.ds-home-details-chip span',
      '.ds-summary-row span'
    ];
    
    for (const selector of priceSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          const text = el.textContent.trim();
          // Must start with $ and be a reasonable property price
          if (text.startsWith('$') && text.match(/^\$[\d,]+$/)) {
            const price = extractPrice(text);
            if (price >= 50000 && price <= 50000000) {
              propertyData.price = price;
              priceFound = true;
              console.log('Found Zillow price:', price, 'from selector:', selector);
              break;
            }
          }
        }
        if (priceFound) break;
      } catch (e) {
        continue;
      }
    }
    
    // Method 2: Look for h2/h3 with price if selectors failed
    if (!priceFound) {
      const headings = document.querySelectorAll('h2, h3, h4');
      for (const heading of headings) {
        const text = heading.textContent.trim();
        if (text.match(/^\$[\d,]+$/)) {
          const price = extractPrice(text);
          if (price >= 50000 && price <= 50000000) {
            propertyData.price = price;
            priceFound = true;
            console.log('Found Zillow price from heading:', price);
            break;
          }
        }
      }
    }

    // Rent estimate
    const rentElement = document.querySelector('[data-test="rent-zestimate-value"]');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address - Try multiple selectors
    const addressSelectors = [
      'h1[data-test="property-address"]',
      'h1',
      '[data-testid="property-address"]',
      'h1[class*="address"]',
      '.ds-address-container h1'
    ];
    
    for (const selector of addressSelectors) {
      const addressElement = document.querySelector(selector);
      if (addressElement && addressElement.textContent.trim().length > 10) {
        propertyData.address = addressElement.textContent.trim();
        console.log('Found Zillow address:', propertyData.address);
        break;
      }
    }

    // Bedrooms - Try multiple selectors
    const bedSelectors = ['[data-test="bed-value"]', 'span[data-testid="bed-bath-item"]', '.dp-subtext'];
    for (const selector of bedSelectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.includes('bed')) {
        propertyData.bedrooms = extractNumber(el.textContent);
        console.log('Found bedrooms:', propertyData.bedrooms);
        break;
      }
    }
    
    // If still not found, try to parse from page text
    if (!propertyData.bedrooms) {
      const bodyText = document.body.innerText;
      const bedMatch = bodyText.match(/(\d+)\s*bed/i);
      if (bedMatch) {
        propertyData.bedrooms = parseInt(bedMatch[1]);
        console.log('Found bedrooms from text:', propertyData.bedrooms);
      }
    }

    // Bathrooms - Try multiple selectors
    const bathSelectors = ['[data-test="bath-value"]', 'span[data-testid="bed-bath-item"]'];
    for (const selector of bathSelectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.includes('bath')) {
        propertyData.bathrooms = extractNumber(el.textContent);
        console.log('Found bathrooms:', propertyData.bathrooms);
        break;
      }
    }
    
    // If still not found, try to parse from page text
    if (!propertyData.bathrooms) {
      const bodyText = document.body.innerText;
      const bathMatch = bodyText.match(/(\d+(?:\.\d+)?)\s*bath/i);
      if (bathMatch) {
        propertyData.bathrooms = parseFloat(bathMatch[1]);
        console.log('Found bathrooms from text:', propertyData.bathrooms);
      }
    }

    // Square footage - Try multiple selectors
    const sqftSelectors = ['[data-test="sqft-value"]', 'span[data-testid="bed-bath-beyond-item"]'];
    for (const selector of sqftSelectors) {
      const el = document.querySelector(selector);
      if (el && el.textContent.includes('sqft')) {
        propertyData.sqft = extractNumber(el.textContent);
        console.log('Found sqft:', propertyData.sqft);
        break;
      }
    }
    
    // If still not found, try to parse from page text
    if (!propertyData.sqft) {
      const bodyText = document.body.innerText;
      const sqftMatch = bodyText.match(/([\d,]+)\s*sqft/i);
      if (sqftMatch) {
        propertyData.sqft = parseInt(sqftMatch[1].replace(/,/g, ''));
        console.log('Found sqft from text:', propertyData.sqft);
      }
    }

    // Property tax
    const taxElement = document.querySelector('[data-test="property-tax-value"]');
    if (taxElement) {
      propertyData.propertyTax = extractPrice(taxElement.textContent);
    }

    // HOA fees
    const hoaElement = document.querySelector('[data-test="hoa-value"]');
    if (hoaElement) {
      propertyData.hoaFees = extractPrice(hoaElement.textContent);
    }
  }

  // Redfin extraction
  else if (hostname.includes('redfin.com')) {
    // Price
    const priceElement = document.querySelector('.statsValue, [data-rf-test-id="abp-price"]');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Rent estimate
    const rentElement = document.querySelector('[data-rf-test-id="rent-estimate"]');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.street-address, [data-rf-test-id="abp-streetLine"]');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }

    // Bedrooms
    const bedsElement = document.querySelector('[data-rf-test-id="abp-beds"]');
    if (bedsElement) {
      propertyData.bedrooms = extractNumber(bedsElement.textContent);
    }

    // Bathrooms
    const bathsElement = document.querySelector('[data-rf-test-id="abp-baths"]');
    if (bathsElement) {
      propertyData.bathrooms = extractNumber(bathsElement.textContent);
    }

    // Square footage
    const sqftElement = document.querySelector('[data-rf-test-id="abp-sqFt"]');
    if (sqftElement) {
      propertyData.sqft = extractNumber(sqftElement.textContent);
    }

    // Property tax
    const taxElement = document.querySelector('.tax-value');
    if (taxElement) {
      propertyData.propertyTax = extractPrice(taxElement.textContent);
    }
  }

  // Realtor.com extraction
  else if (hostname.includes('realtor.com')) {
    // Price
    const priceElement = document.querySelector('[data-label="property-meta-price"], .rui__sc-1ij6z0p-0');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('[data-label="property-address"]');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }

    // Bedrooms
    const bedsElement = document.querySelector('[data-label="property-meta-beds"]');
    if (bedsElement) {
      propertyData.bedrooms = extractNumber(bedsElement.textContent);
    }

    // Bathrooms
    const bathsElement = document.querySelector('[data-label="property-meta-baths"]');
    if (bathsElement) {
      propertyData.bathrooms = extractNumber(bathsElement.textContent);
    }

    // Square footage
    const sqftElement = document.querySelector('[data-label="property-meta-sqft"]');
    if (sqftElement) {
      propertyData.sqft = extractNumber(sqftElement.textContent);
    }
  }

  // LoopNet extraction (Commercial)
  else if (hostname.includes('loopnet.com')) {
    // Price
    const priceElement = document.querySelector('.price, .listing-price');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.property-address, h1.address');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }

    // Square footage
    const sqftElement = document.querySelector('.building-size, .sqft');
    if (sqftElement) {
      propertyData.sqft = extractNumber(sqftElement.textContent);
    }

    // Cap rate (for commercial)
    const capRateElement = document.querySelector('.cap-rate');
    if (capRateElement) {
      const capRate = extractNumber(capRateElement.textContent);
      if (capRate && propertyData.price) {
        // Estimate NOI from cap rate
        propertyData.rent = Math.round((propertyData.price * capRate / 100) / 12);
      }
    }
  }

  // Roofstock extraction (Turnkey rentals)
  else if (hostname.includes('roofstock.com')) {
    // Price
    const priceElement = document.querySelector('.property-price, [class*="price"]');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Monthly rent
    const rentElement = document.querySelector('.monthly-rent, [class*="rent"]');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.property-address, h1');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }

    // Bedrooms
    const bedsElement = document.querySelector('[class*="beds"]');
    if (bedsElement) {
      propertyData.bedrooms = extractNumber(bedsElement.textContent);
    }

    // Bathrooms
    const bathsElement = document.querySelector('[class*="baths"]');
    if (bathsElement) {
      propertyData.bathrooms = extractNumber(bathsElement.textContent);
    }
  }

  // BiggerPockets Marketplace
  else if (hostname.includes('biggerpockets.com')) {
    // Price
    const priceElement = document.querySelector('.listing-price, [class*="price"]');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Monthly rent
    const rentElement = document.querySelector('.monthly-rent, [class*="rent"]');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.property-address');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }
  }

  // Trulia extraction
  else if (hostname.includes('trulia.com')) {
    // Price
    const priceElement = document.querySelector('[data-testid="home-summary-price"]');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Rent estimate
    const rentElement = document.querySelector('[data-testid="rent-estimate"]');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Bedrooms
    const bedsElement = document.querySelector('[data-testid="bed-count"]');
    if (bedsElement) {
      propertyData.bedrooms = extractNumber(bedsElement.textContent);
    }

    // Bathrooms
    const bathsElement = document.querySelector('[data-testid="bath-count"]');
    if (bathsElement) {
      propertyData.bathrooms = extractNumber(bathsElement.textContent);
    }

    // Square footage
    const sqftElement = document.querySelector('[data-testid="sqft"]');
    if (sqftElement) {
      propertyData.sqft = extractNumber(sqftElement.textContent);
    }
  }

  // Apartments.com (Multi-family)
  else if (hostname.includes('apartments.com')) {
    // Price (rent for apartments)
    const rentElement = document.querySelector('.pricingColumn, .rentInfoDetail');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.propertyAddress, h1');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }

    // Bedrooms
    const bedsElement = document.querySelector('.bedroomLabel');
    if (bedsElement) {
      propertyData.bedrooms = extractNumber(bedsElement.textContent);
    }

    // Bathrooms
    const bathsElement = document.querySelector('.bathroomLabel');
    if (bathsElement) {
      propertyData.bathrooms = extractNumber(bathsElement.textContent);
    }

    // Square footage
    const sqftElement = document.querySelector('.sqftLabel');
    if (sqftElement) {
      propertyData.sqft = extractNumber(sqftElement.textContent);
    }
  }

  // Mashvisor (Investment analytics)
  else if (hostname.includes('mashvisor.com')) {
    // Price
    const priceElement = document.querySelector('.property-price');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Monthly rent
    const rentElement = document.querySelector('.rental-income, .monthly-rent');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.property-address');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }
  }

  // Crexi (Commercial)
  else if (hostname.includes('crexi.com')) {
    // Price
    const priceElement = document.querySelector('.price-value');
    if (priceElement) {
      propertyData.price = extractPrice(priceElement.textContent);
    }

    // Address
    const addressElement = document.querySelector('.property-address');
    if (addressElement) {
      propertyData.address = addressElement.textContent.trim();
    }

    // Square footage
    const sqftElement = document.querySelector('.building-size');
    if (sqftElement) {
      propertyData.sqft = extractNumber(sqftElement.textContent);
    }
  }

  return propertyData;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPropertyData') {
    const data = extractPropertyData();
    sendResponse(data);
  }
});

// Wait for page to fully load before extracting data
function initializeExtension() {
  // Wait 1 second for dynamic content to load
  setTimeout(() => {
    const propertyData = extractPropertyData();
    console.log('Capital Bridge Solutions: Extracted property data:', propertyData);

    // Store property data in window globals for AI controller access
    window.currentPropertyAddress = propertyData.address || 'Property Address';
    window.currentPropertyBeds = propertyData.bedrooms;
    window.currentPropertyBaths = propertyData.bathrooms;
    window.currentPropertySqft = propertyData.sqft;
    window.currentPropertyType = propertyData.type || 'Residential';
    window.currentPropertyPrice = propertyData.price;
    window.currentPropertyRent = propertyData.rent;

    // Log all extracted data for debugging
    console.log('Capital Bridge Solutions: Extracted property data:', {
      address: propertyData.address,
      price: propertyData.price,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      sqft: propertyData.sqft,
      rent: propertyData.rent
    });

    if (propertyData.price || propertyData.rent) {
      console.log('Capital Bridge Solutions: Sending data to popup');
      chrome.runtime.sendMessage({
        action: 'propertyData',
        ...propertyData
      });
    } else {
      console.log('Capital Bridge Solutions: No price or rent found on page');
    }
  }, 1000);
}

// Initialize when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

// Create floating CTA button to grab attention
function createFloatingCTA() {
  // Check if already dismissed for this session
  const dismissed = sessionStorage.getItem('cbs-cta-dismissed');
  if (dismissed) return;

  // Only show on property detail pages (not search results)
  const hostname = window.location.hostname;
  const isPropertyPage = 
    (hostname.includes('zillow.com') && window.location.pathname.includes('/homedetails/')) ||
    (hostname.includes('redfin.com') && window.location.pathname.includes('/home/')) ||
    (hostname.includes('realtor.com') && window.location.pathname.includes('/realestateandhomes-detail/')) ||
    (hostname.includes('loopnet.com') && window.location.pathname.includes('/listing/')) ||
    (hostname.includes('roofstock.com') && window.location.pathname.includes('/property/')) ||
    window.location.pathname.includes('/property/') ||
    window.location.pathname.includes('/listing/');

  if (!isPropertyPage) return;

  // Create floating button
  const floatingCTA = document.createElement('div');
  floatingCTA.className = 'cbs-floating-cta';
  
  // Get extension logo URL
  const logoUrl = chrome.runtime.getURL('images/icon-48.png');
  
  floatingCTA.innerHTML = `
    <div class="cbs-floating-cta-close" title="Dismiss">×</div>
    <img src="${logoUrl}" class="cbs-floating-cta-icon" alt="CBS Logo" />
    <span>Analyze & Get Approved →</span>
  `;

  // Add to page after a short delay
  setTimeout(() => {
    document.body.appendChild(floatingCTA);
  }, 2000); // Wait 2 seconds after page load

  // Click handler - open extension popup
  floatingCTA.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cbs-floating-cta-close')) {
      // Send message to open popup (Chrome extensions can't programmatically open popup)
      // But we can track the click
      chrome.runtime.sendMessage({
        action: 'track',
        category: 'floating-cta',
        type: 'click'
      });
      
      // Show alert to guide user
      alert('Click the Capital Bridge Solutions icon in your toolbar (top-right) to analyze this property!');
    }
  });

  // Close button handler
  floatingCTA.querySelector('.cbs-floating-cta-close').addEventListener('click', (e) => {
    e.stopPropagation();
    floatingCTA.classList.add('hidden');
    sessionStorage.setItem('cbs-cta-dismissed', 'true');
  });
}

// Initialize floating CTA
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingCTA);
} else {
  createFloatingCTA();
}
