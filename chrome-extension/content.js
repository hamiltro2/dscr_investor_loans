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
    // Basic info
    price: null,
    rent: null,
    address: null,
    city: null,
    state: null,
    zipCode: null,
    
    // Property details
    type: null,
    bedrooms: null,
    bathrooms: null,
    sqft: null,
    lotSize: null,
    yearBuilt: null,
    parking: null,
    
    // Financial
    propertyTax: null,
    hoaFees: null,
    insurance: null,
    
    // Market data
    daysOnMarket: null,
    pricePerSqft: null,
    mlsNumber: null,
    
    // Location scores
    walkScore: null,
    schoolRating: null,
    
    // Listing details
    listingAgent: null,
    description: null,
    
    source: hostname
  };

  // Zillow extraction
  if (hostname.includes('zillow.com')) {
    // First, find the address element as a reference point
    let addressElement = null;
    const addressSelectors = [
      'h1[data-test="property-address"]',
      'h1',
      '[data-testid="property-address"]',
      'h1[class*="address"]'
    ];
    
    for (const selector of addressSelectors) {
      addressElement = document.querySelector(selector);
      if (addressElement && addressElement.textContent.trim().length > 10) {
        console.log('Found address element:', addressElement.textContent.trim());
        break;
      }
    }
    
    // Price - Find the main listing price (closest to address, largest font, near top)
    let priceFound = false;
    let allPrices = [];
    
    const priceSelectors = [
      'h2',  // Most common for main price
      'h3',
      'span[data-testid="price"]',
      '[data-test="property-value"]'
    ];
    
    for (const selector of priceSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          const text = el.textContent.trim();
          // Must be ONLY a price (no extra text like "price/sqft")
          if (text.match(/^\$[\d,]+$/)) {
            const price = extractPrice(text);
            if (price >= 50000 && price <= 50000000) {
              const rect = el.getBoundingClientRect();
              const isNearTop = rect.top < 600; // Within first 600px
              const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
              
              // Calculate distance from address element if we found it
              let distanceFromAddress = 9999;
              if (addressElement) {
                const addressRect = addressElement.getBoundingClientRect();
                distanceFromAddress = Math.abs(rect.top - addressRect.top) + 
                                     Math.abs(rect.left - addressRect.left);
              }
              
              allPrices.push({
                price: price,
                element: el,
                selector: selector,
                isNearTop: isNearTop,
                fontSize: fontSize,
                distanceFromAddress: distanceFromAddress,
                tagName: el.tagName.toLowerCase()
              });
            }
          }
        }
      } catch (e) {
        continue;
      }
    }
    
    // Sort by: h2/h3 tags first, then closest to address, then largest font, then highest price
    if (allPrices.length > 0) {
      allPrices.sort((a, b) => {
        // Prioritize h2 and h3 tags (main listing price is usually in these)
        const aIsHeading = a.tagName === 'h2' || a.tagName === 'h3';
        const bIsHeading = b.tagName === 'h2' || b.tagName === 'h3';
        if (aIsHeading !== bIsHeading) return bIsHeading ? 1 : -1;
        
        // Must be near top
        if (a.isNearTop !== b.isNearTop) return b.isNearTop - a.isNearTop;
        
        // Closest to address is usually the listing price
        if (Math.abs(a.distanceFromAddress - b.distanceFromAddress) > 100) {
          return a.distanceFromAddress - b.distanceFromAddress;
        }
        
        // Largest font size
        if (Math.abs(a.fontSize - b.fontSize) > 3) return b.fontSize - a.fontSize;
        
        // Prefer lower price if close (conservative approach)
        return a.price - b.price;
      });
      
      propertyData.price = allPrices[0].price;
      priceFound = true;
      console.log('✅ Selected Zillow price:', allPrices[0].price, 'from:', allPrices[0].selector, 
                  '(fontSize:', allPrices[0].fontSize + 'px, distance from address:', Math.round(allPrices[0].distanceFromAddress) + 'px)');
      console.log('All prices found:', allPrices.map(p => `$${p.price.toLocaleString()} (${p.tagName})`).join(', '));
    }

    // Rent estimate
    const rentElement = document.querySelector('[data-test="rent-zestimate-value"]');
    if (rentElement) {
      propertyData.rent = extractPrice(rentElement.textContent);
    }

    // Address - Try multiple selectors to save the address
    const addressSelectorsForSaving = [
      'h1[data-test="property-address"]',
      'h1',
      '[data-testid="property-address"]',
      'h1[class*="address"]',
      '.ds-address-container h1'
    ];
    
    for (const selector of addressSelectorsForSaving) {
      const addrEl = document.querySelector(selector);
      if (addrEl && addrEl.textContent.trim().length > 10) {
        propertyData.address = addrEl.textContent.trim();
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

    // Property tax - Try multiple methods
    let taxFound = false;
    
    // Method 1: Data attribute selector
    const taxElement = document.querySelector('[data-test="property-tax-value"]');
    if (taxElement) {
      propertyData.propertyTax = extractPrice(taxElement.textContent);
      taxFound = true;
      console.log('Found property tax:', propertyData.propertyTax);
    }
    
    // Method 2: Search for "Annual tax" or "Property tax" text
    if (!taxFound) {
      const bodyText = document.body.innerText;
      const taxMatch = bodyText.match(/(?:Annual tax|Property tax)[:\s]+\$?([\d,]+)/i);
      if (taxMatch) {
        propertyData.propertyTax = parseInt(taxMatch[1].replace(/,/g, ''));
        console.log('Found property tax from text:', propertyData.propertyTax);
      }
    }

    // HOA fees - Try multiple methods
    let hoaFound = false;
    
    // Method 1: Data attribute selector
    const hoaElement = document.querySelector('[data-test="hoa-value"]');
    if (hoaElement) {
      propertyData.hoaFees = extractPrice(hoaElement.textContent);
      hoaFound = true;
      console.log('Found HOA fees:', propertyData.hoaFees);
    }
    
    // Method 2: Search for "monthly HOA fee" or "HOA dues" text (like "$2,298 monthly HOA fee")
    if (!hoaFound) {
      const bodyText = document.body.innerText;
      const hoaMatch = bodyText.match(/\$?([\d,]+)\s*(?:monthly HOA fee|HOA dues|per month HOA)/i);
      if (hoaMatch) {
        propertyData.hoaFees = parseInt(hoaMatch[1].replace(/,/g, ''));
        hoaFound = true;
        console.log('Found HOA fees from text:', propertyData.hoaFees);
      }
    }
    
    // Method 3: Look for elements containing "HOA" text
    if (!hoaFound) {
      const allText = Array.from(document.querySelectorAll('*')).map(el => el.textContent);
      for (const text of allText) {
        if (text.includes('HOA') && text.match(/\$[\d,]+/)) {
          const hoaPrice = extractPrice(text);
          if (hoaPrice > 0 && hoaPrice < 10000) {
            propertyData.hoaFees = hoaPrice;
            console.log('Found HOA fees from element scan:', propertyData.hoaFees);
            break;
          }
        }
      }
    }
    
    // Extract additional Zillow data
    const bodyText = document.body.innerText;
    
    // Year built
    const yearMatch = bodyText.match(/Built in (\d{4})|Year built[:\s]+(\d{4})/i);
    if (yearMatch) {
      propertyData.yearBuilt = parseInt(yearMatch[1] || yearMatch[2]);
      console.log('Found year built:', propertyData.yearBuilt);
    }
    
    // Lot size
    const lotMatch = bodyText.match(/([\d,]+(?:\.\d+)?)\s*(?:sqft|sq ft|square feet)\s*lot/i);
    if (lotMatch) {
      propertyData.lotSize = parseInt(lotMatch[1].replace(/,/g, ''));
      console.log('Found lot size:', propertyData.lotSize);
    }
    
    // Property type (Condominium, Single Family, etc.)
    const typeMatch = bodyText.match(/(?:Property type|Home type)[:\s]+([\w\s]+?)(?:\n|,|$)/i);
    if (typeMatch) {
      propertyData.type = typeMatch[1].trim();
      console.log('Found property type:', propertyData.type);
    } else {
      // Try looking for common types
      if (bodyText.match(/Condominium|Condo/i)) propertyData.type = 'Condominium';
      else if (bodyText.match(/Single Family|Single-Family/i)) propertyData.type = 'Single Family';
      else if (bodyText.match(/Townhouse|Town Home/i)) propertyData.type = 'Townhouse';
      else if (bodyText.match(/Multi-family|Multifamily/i)) propertyData.type = 'Multi-Family';
    }
    
    // Parking/Garage
    const parkingMatch = bodyText.match(/(\d+)\s*(?:Garage|Parking|Car garage)/i);
    if (parkingMatch) {
      propertyData.parking = parkingMatch[1] + ' car garage';
      console.log('Found parking:', propertyData.parking);
    }
    
    // Days on Market
    const domMatch = bodyText.match(/(\d+)\s*days?\s*on\s*(?:Zillow|market)/i);
    if (domMatch) {
      propertyData.daysOnMarket = parseInt(domMatch[1]);
      console.log('Found days on market:', propertyData.daysOnMarket);
    }
    
    // Price per sqft
    if (propertyData.price && propertyData.sqft) {
      propertyData.pricePerSqft = Math.round(propertyData.price / propertyData.sqft);
    }
    
    // Walk Score
    const walkMatch = bodyText.match(/Walk\s*Score[:\s®]+(\d+)/i);
    if (walkMatch) {
      propertyData.walkScore = parseInt(walkMatch[1]);
      console.log('Found walk score:', propertyData.walkScore);
    }
    
    // School rating
    const schoolMatch = bodyText.match(/GreatSchools[:\s]+(\d+)\/10|Rating[:\s]+(\d+)\/10/i);
    if (schoolMatch) {
      propertyData.schoolRating = parseInt(schoolMatch[1] || schoolMatch[2]);
      console.log('Found school rating:', propertyData.schoolRating);
    }
    
    // Parse address components (city, state, zip)
    if (propertyData.address) {
      const addrMatch = propertyData.address.match(/,\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})/);
      if (addrMatch) {
        propertyData.city = addrMatch[1].trim();
        propertyData.state = addrMatch[2];
        propertyData.zipCode = addrMatch[3];
      }
    }
  }

  // Redfin extraction
  else if (hostname.includes('redfin.com')) {
    // Price - Use smart extraction similar to Zillow
    let priceFound = false;
    let allPrices = [];
    
    // Find address first for reference
    const addressRef = document.querySelector('.street-address, [data-rf-test-id="abp-streetLine"]');
    
    // Look for all prices on page
    const priceSelectors = [
      '.statsValue',  // Common price class
      '[data-rf-test-id="abp-price"]',
      'div[class*="price"]',
      'span[class*="price"]'
    ];
    
    for (const selector of priceSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          const text = el.textContent.trim();
          // Must be ONLY a price
          if (text.match(/^\$[\d,]+$/)) {
            const price = extractPrice(text);
            if (price >= 50000 && price <= 50000000) {
              const rect = el.getBoundingClientRect();
              const isNearTop = rect.top < 700;
              const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
              
              // Distance from address if found
              let distanceFromAddress = 9999;
              if (addressRef) {
                const addressRect = addressRef.getBoundingClientRect();
                distanceFromAddress = Math.abs(rect.top - addressRect.top) + 
                                     Math.abs(rect.left - addressRect.left);
              }
              
              allPrices.push({
                price: price,
                fontSize: fontSize,
                distanceFromAddress: distanceFromAddress,
                isNearTop: isNearTop
              });
            }
          }
        }
      } catch (e) {
        continue;
      }
    }
    
    // Sort: near top, largest font, closest to address, prefer lower price
    if (allPrices.length > 0) {
      allPrices.sort((a, b) => {
        if (a.isNearTop !== b.isNearTop) return b.isNearTop - a.isNearTop;
        if (Math.abs(a.fontSize - b.fontSize) > 5) return b.fontSize - a.fontSize;
        if (Math.abs(a.distanceFromAddress - b.distanceFromAddress) > 100) {
          return a.distanceFromAddress - b.distanceFromAddress;
        }
        return a.price - b.price; // Prefer lower price if similar
      });
      
      propertyData.price = allPrices[0].price;
      priceFound = true;
      console.log('✅ Selected Redfin price:', allPrices[0].price, 
                  '(fontSize:', allPrices[0].fontSize + 'px, distance from address:', Math.round(allPrices[0].distanceFromAddress) + 'px)');
      console.log('All Redfin prices found:', allPrices.map(p => p.price));
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
    
    // HOA fees - Redfin specific extraction
    const bodyText = document.body.innerText;
    const hoaMatch = bodyText.match(/HOA[:\s]+\$?([\d,]+)(?:\/mo|\/month)?/i);
    if (hoaMatch) {
      propertyData.hoaFees = parseInt(hoaMatch[1].replace(/,/g, ''));
      console.log('Found Redfin HOA fees:', propertyData.hoaFees);
    }
    
    // Additional Redfin data extraction
    const yearMatch = bodyText.match(/Built[:\s]+(\d{4})|Year Built[:\s]+(\d{4})/i);
    if (yearMatch) {
      propertyData.yearBuilt = parseInt(yearMatch[1] || yearMatch[2]);
    }
    
    const lotMatch = bodyText.match(/([\d,]+)\s*(?:sqft|sq\.\s*ft\.?)\s*Lot/i);
    if (lotMatch) {
      propertyData.lotSize = parseInt(lotMatch[1].replace(/,/g, ''));
    }
    
    const typeMatch = bodyText.match(/Property Type[:\s]+([\w\s-]+?)(?:\n|,|$)/i);
    if (typeMatch) {
      propertyData.type = typeMatch[1].trim();
    }
    
    const domMatch = bodyText.match(/(\d+)\s*days?\s*on\s*(?:Redfin|market)/i);
    if (domMatch) {
      propertyData.daysOnMarket = parseInt(domMatch[1]);
    }
    
    if (propertyData.price && propertyData.sqft) {
      propertyData.pricePerSqft = Math.round(propertyData.price / propertyData.sqft);
    }
    
    if (propertyData.address) {
      const addrMatch = propertyData.address.match(/,\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})/);
      if (addrMatch) {
        propertyData.city = addrMatch[1].trim();
        propertyData.state = addrMatch[2];
        propertyData.zipCode = addrMatch[3];
      }
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
    
    // HOA fees and Property Tax - text-based extraction
    const bodyText = document.body.innerText;
    
    const hoaMatch = bodyText.match(/HOA[:\s]+\$?([\d,]+)(?:\/mo|\/month)?/i);
    if (hoaMatch) {
      propertyData.hoaFees = parseInt(hoaMatch[1].replace(/,/g, ''));
      console.log('Found Realtor.com HOA fees:', propertyData.hoaFees);
    }
    
    const taxMatch = bodyText.match(/(?:Annual tax|Property tax)[:\s]+\$?([\d,]+)/i);
    if (taxMatch) {
      propertyData.propertyTax = parseInt(taxMatch[1].replace(/,/g, ''));
      console.log('Found Realtor.com property tax:', propertyData.propertyTax);
    }
  }
  
  // BiggerPockets extraction
  else if (hostname.includes('biggerpockets.com')) {
    // BiggerPockets calculator - extract from input fields
    const priceInput = document.querySelector('input[name="purchase_price"], #purchase-price');
    if (priceInput && priceInput.value) {
      propertyData.price = parseInt(priceInput.value.replace(/[^0-9]/g, ''));
    } else {
      // BiggerPockets Marketplace - extract from listing page with smart algorithm
      let allPrices = [];
      
      // Look for all prices on page
      const priceSelectors = ['h1', 'h2', 'h3', 'div', 'span'];
      
      for (const selector of priceSelectors) {
        try {
          const elements = document.querySelectorAll(selector);
          for (const el of elements) {
            const text = el.textContent.trim();
            // Must be ONLY a price
            if (text.match(/^\$[\d,]+$/)) {
              const price = extractPrice(text);
              if (price >= 50000 && price <= 50000000) {
                const rect = el.getBoundingClientRect();
                const isNearTop = rect.top < 600;
                const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
                
                allPrices.push({
                  price: price,
                  fontSize: fontSize,
                  isNearTop: isNearTop,
                  tagName: el.tagName.toLowerCase()
                });
              }
            }
          }
        } catch (e) {
          continue;
        }
      }
      
      // Sort: h1/h2 first, near top, largest font, prefer lower price
      if (allPrices.length > 0) {
        allPrices.sort((a, b) => {
          const aIsHeading = a.tagName === 'h1' || a.tagName === 'h2';
          const bIsHeading = b.tagName === 'h1' || b.tagName === 'h2';
          if (aIsHeading !== bIsHeading) return bIsHeading ? 1 : -1;
          if (a.isNearTop !== b.isNearTop) return b.isNearTop - a.isNearTop;
          if (Math.abs(a.fontSize - b.fontSize) > 5) return b.fontSize - a.fontSize;
          return a.price - b.price; // Prefer lower price
        });
        
        propertyData.price = allPrices[0].price;
        console.log('✅ Selected BiggerPockets price:', allPrices[0].price, 
                    '(fontSize:', allPrices[0].fontSize + 'px, tag:', allPrices[0].tagName + ')');
        console.log('All BiggerPockets prices found:', allPrices.map(p => `$${p.price.toLocaleString()} (${p.tagName})`).join(', '));
      }
    }
    
    const rentInput = document.querySelector('input[name="monthly_rent"], #monthly-rent');
    if (rentInput && rentInput.value) {
      propertyData.rent = parseInt(rentInput.value.replace(/[^0-9]/g, ''));
    }
    
    const hoaInput = document.querySelector('input[name="hoa"], #hoa-fees');
    if (hoaInput && hoaInput.value) {
      propertyData.hoaFees = parseInt(hoaInput.value.replace(/[^0-9]/g, ''));
    }
    
    const taxInput = document.querySelector('input[name="property_taxes"], #property-taxes');
    if (taxInput && taxInput.value) {
      propertyData.propertyTax = parseInt(taxInput.value.replace(/[^0-9]/g, ''));
    }
    
    // Additional BiggerPockets fields
    const insuranceInput = document.querySelector('input[name="insurance"], #insurance');
    if (insuranceInput && insuranceInput.value) {
      propertyData.insurance = parseInt(insuranceInput.value.replace(/[^0-9]/g, ''));
    }
    
    const bedsInput = document.querySelector('input[name="bedrooms"], #bedrooms');
    if (bedsInput && bedsInput.value) {
      propertyData.bedrooms = parseInt(bedsInput.value.replace(/[^0-9]/g, ''));
    }
    
    const bathsInput = document.querySelector('input[name="bathrooms"], #bathrooms');
    if (bathsInput && bathsInput.value) {
      propertyData.bathrooms = parseFloat(bathsInput.value.replace(/[^0-9.]/g, ''));
    }
    
    const sqftInput = document.querySelector('input[name="sqft"], #square-feet');
    if (sqftInput && sqftInput.value) {
      propertyData.sqft = parseInt(sqftInput.value.replace(/[^0-9]/g, ''));
    }
    
    const addressInput = document.querySelector('input[name="address"], #property-address');
    if (addressInput && addressInput.value) {
      propertyData.address = addressInput.value.trim();
    }
    
    console.log('BiggerPockets data extracted from calculator');
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

  // UNIVERSAL EXTRACTION FALLBACK
  // If we didn't get key data from site-specific extraction, use universal text parsing
  console.log('🌍 Running universal extraction fallback...');
  
  const bodyText = document.body.innerText;
  const pageHTML = document.body.innerHTML.toLowerCase();
  
  // Universal Price Extraction - if not found yet
  if (!propertyData.price) {
    let allPrices = [];
    const priceElements = document.querySelectorAll('h1, h2, h3, div, span');
    
    for (const el of priceElements) {
      const text = el.textContent.trim();
      if (text.match(/^\$[\d,]+$/)) {
        const price = extractPrice(text);
        if (price >= 50000 && price <= 50000000) {
          const rect = el.getBoundingClientRect();
          const isNearTop = rect.top < 600;
          const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
          
          allPrices.push({
            price: price,
            fontSize: fontSize,
            isNearTop: isNearTop,
            tagName: el.tagName.toLowerCase()
          });
        }
      }
    }
    
    if (allPrices.length > 0) {
      allPrices.sort((a, b) => {
        const aIsHeading = a.tagName === 'h1' || a.tagName === 'h2';
        const bIsHeading = b.tagName === 'h1' || b.tagName === 'h2';
        if (aIsHeading !== bIsHeading) return bIsHeading ? 1 : -1;
        if (a.isNearTop !== b.isNearTop) return b.isNearTop - a.isNearTop;
        if (Math.abs(a.fontSize - b.fontSize) > 5) return b.fontSize - a.fontSize;
        return a.price - b.price;
      });
      
      propertyData.price = allPrices[0].price;
      console.log('✅ Universal extraction found price:', propertyData.price);
    }
  }
  
  // Universal Address Extraction
  if (!propertyData.address) {
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent.match(/\d+\s+\w+.*(?:St|Street|Ave|Avenue|Rd|Road|Dr|Drive|Blvd|Boulevard|Way|Lane|Ln|Ct|Court)/i)) {
      propertyData.address = h1.textContent.trim();
      console.log('✅ Universal extraction found address:', propertyData.address);
    }
  }
  
  // Universal Bedrooms Extraction
  if (!propertyData.bedrooms) {
    const bedMatch = bodyText.match(/(\d+)\s*(?:bed|bd|bedroom)/i);
    if (bedMatch) {
      propertyData.bedrooms = parseInt(bedMatch[1]);
      console.log('✅ Universal extraction found bedrooms:', propertyData.bedrooms);
    }
  }
  
  // Universal Bathrooms Extraction
  if (!propertyData.bathrooms) {
    const bathMatch = bodyText.match(/(\d+(?:\.\d+)?)\s*(?:bath|ba|bathroom)/i);
    if (bathMatch) {
      propertyData.bathrooms = parseFloat(bathMatch[1]);
      console.log('✅ Universal extraction found bathrooms:', propertyData.bathrooms);
    }
  }
  
  // Universal Square Footage Extraction
  if (!propertyData.sqft) {
    const sqftMatch = bodyText.match(/([\d,]+)\s*(?:sqft|sq\s*ft|square\s*feet)/i);
    if (sqftMatch) {
      propertyData.sqft = parseInt(sqftMatch[1].replace(/,/g, ''));
      console.log('✅ Universal extraction found sqft:', propertyData.sqft);
    }
  }
  
  // Universal Year Built Extraction
  if (!propertyData.yearBuilt) {
    const yearMatch = bodyText.match(/(?:built|year built)[:\s]+(\d{4})|built in (\d{4})/i);
    if (yearMatch) {
      propertyData.yearBuilt = parseInt(yearMatch[1] || yearMatch[2]);
      console.log('✅ Universal extraction found year built:', propertyData.yearBuilt);
    }
  }
  
  // Universal Property Type Extraction
  if (!propertyData.type) {
    if (bodyText.match(/\bcondominium\b|\bcondo\b/i)) propertyData.type = 'Condominium';
    else if (bodyText.match(/single[- ]family|single family/i)) propertyData.type = 'Single Family';
    else if (bodyText.match(/townhouse|townhome|town home/i)) propertyData.type = 'Townhouse';
    else if (bodyText.match(/multi[- ]family|multifamily|duplex|triplex|fourplex/i)) propertyData.type = 'Multi-Family';
    else if (bodyText.match(/apartment/i)) propertyData.type = 'Apartment';
    
    if (propertyData.type) {
      console.log('✅ Universal extraction found property type:', propertyData.type);
    }
  }
  
  // Universal HOA Fees Extraction
  if (!propertyData.hoaFees) {
    const hoaMatch = bodyText.match(/\$?([\d,]+)\s*(?:\/mo|\/month|per month)?\s*(?:monthly\s*)?(?:HOA|hoa|association)/i);
    if (hoaMatch) {
      propertyData.hoaFees = parseInt(hoaMatch[1].replace(/,/g, ''));
      if (propertyData.hoaFees > 0 && propertyData.hoaFees < 10000) {
        console.log('✅ Universal extraction found HOA fees:', propertyData.hoaFees);
      } else {
        propertyData.hoaFees = null;
      }
    }
  }
  
  // Universal Property Tax Extraction
  if (!propertyData.propertyTax) {
    const taxMatch = bodyText.match(/(?:annual|yearly)?\s*(?:property\s*)?tax(?:es)?[:\s]+\$?([\d,]+)/i);
    if (taxMatch) {
      propertyData.propertyTax = parseInt(taxMatch[1].replace(/,/g, ''));
      if (propertyData.propertyTax > 0 && propertyData.propertyTax < 1000000) {
        console.log('✅ Universal extraction found property tax:', propertyData.propertyTax);
      } else {
        propertyData.propertyTax = null;
      }
    }
  }
  
  // Universal Lot Size Extraction
  if (!propertyData.lotSize) {
    const lotMatch = bodyText.match(/([\d,]+(?:\.\d+)?)\s*(?:sqft|sq\s*ft|square\s*feet)\s*lot/i);
    if (lotMatch) {
      propertyData.lotSize = parseInt(lotMatch[1].replace(/,/g, ''));
      console.log('✅ Universal extraction found lot size:', propertyData.lotSize);
    }
  }
  
  // Universal Parking/Garage Extraction
  if (!propertyData.parking) {
    const parkingMatch = bodyText.match(/(\d+)\s*(?:car\s*)?(?:garage|parking)/i);
    if (parkingMatch) {
      propertyData.parking = parkingMatch[1] + ' car garage';
      console.log('✅ Universal extraction found parking:', propertyData.parking);
    }
  }
  
  // Parse city, state, zip from address if we have it
  if (propertyData.address && !propertyData.city) {
    const addrMatch = propertyData.address.match(/,\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})/);
    if (addrMatch) {
      propertyData.city = addrMatch[1].trim();
      propertyData.state = addrMatch[2];
      propertyData.zipCode = addrMatch[3];
    }
  }
  
  // Calculate price per sqft if we have both
  if (!propertyData.pricePerSqft && propertyData.price && propertyData.sqft) {
    propertyData.pricePerSqft = Math.round(propertyData.price / propertyData.sqft);
  }
  
  console.log('🌍 Universal extraction complete');

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
      city: propertyData.city,
      state: propertyData.state,
      zipCode: propertyData.zipCode,
      price: propertyData.price,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      sqft: propertyData.sqft,
      lotSize: propertyData.lotSize,
      yearBuilt: propertyData.yearBuilt,
      type: propertyData.type,
      parking: propertyData.parking,
      rent: propertyData.rent,
      hoaFees: propertyData.hoaFees,
      propertyTax: propertyData.propertyTax,
      daysOnMarket: propertyData.daysOnMarket,
      pricePerSqft: propertyData.pricePerSqft,
      walkScore: propertyData.walkScore,
      schoolRating: propertyData.schoolRating
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
