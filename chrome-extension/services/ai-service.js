/**
 * AI Analysis Service - Perplexity API Integration
 * @module AIService
 * @description Handles all AI-powered property analysis using Perplexity API
 */

class AIService {
  constructor() {
    // Load from config if available, otherwise use defaults
    this.API_KEY = (typeof CONFIG !== 'undefined' && CONFIG.PERPLEXITY_API_KEY) 
      || 'pplx-YOUR-API-KEY-HERE';
    this.API_URL = 'https://api.perplexity.ai/chat/completions';
    this.CACHE_DURATION = (typeof CONFIG !== 'undefined' && CONFIG.CACHE_DURATION_HOURS) 
      ? CONFIG.CACHE_DURATION_HOURS * 60 * 60 * 1000 
      : 24 * 60 * 60 * 1000;
    this.MODEL = (typeof CONFIG !== 'undefined' && CONFIG.PERPLEXITY_MODEL) 
      || 'sonar';
  }

  /**
   * Analyze a property using AI
   * @param {Object} propertyData - Property information
   * @param {number} propertyData.price - Purchase price
   * @param {string} propertyData.address - Property address
   * @param {number} propertyData.beds - Number of bedrooms
   * @param {number} propertyData.baths - Number of bathrooms
   * @param {number} propertyData.sqft - Square footage
   * @param {string} propertyData.propertyType - Type of property
   * @param {number} [propertyData.rent] - Current rent (if available)
   * @returns {Promise<Object>} AI analysis results
   */
  async analyzeProperty(propertyData) {
    try {
      // Check cache first
      const cached = await this._getCachedAnalysis(propertyData.address);
      if (cached) {
        console.log('AI Service: Returning cached analysis');
        return cached;
      }

      // Build AI prompt
      const prompt = this._buildPrompt(propertyData);
      
      // Call Perplexity API
      const analysis = await this._callPerplexityAPI(prompt);
      
      // Parse and validate response
      const parsedAnalysis = this._parseAnalysis(analysis, propertyData);
      
      // Cache the result
      await this._cacheAnalysis(propertyData.address, parsedAnalysis);
      
      return parsedAnalysis;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(`AI Analysis failed: ${error.message}`);
    }
  }

  /**
   * Build the AI prompt
   * @private
   */
  _buildPrompt(propertyData) {
    const { price, address, beds, baths, sqft, propertyType, rent, hoaFees, propertyTax } = propertyData;
    
    return `You are a real estate investment analyst. Analyze this property for investment potential:

Property Details:
- Address: ${address}
- Purchase Price: $${price.toLocaleString()}
- Type: ${propertyType || 'Residential'}
- Bedrooms: ${beds || 'N/A'}
- Bathrooms: ${baths || 'N/A'}
- Square Feet: ${sqft ? sqft.toLocaleString() : 'N/A'}
${rent ? `- Listed Rent: $${rent.toLocaleString()}/month` : ''}
${hoaFees ? `- HOA Fees: $${hoaFees.toLocaleString()}/month (ACTUAL from listing)` : ''}
${propertyTax ? `- Annual Property Tax: $${propertyTax.toLocaleString()} (ACTUAL from listing)` : ''}

Provide a detailed investment analysis in JSON format with:

1. **expenses**: Monthly operating expenses breakdown
   ${propertyTax ? `- propertyTax: ${Math.round(propertyTax / 12)} (MUST use this exact monthly value from listing)` : '- propertyTax: estimated monthly property tax'}
   - insurance: estimated monthly insurance
   ${hoaFees ? `- hoa: ${hoaFees} (MUST use this exact monthly value from listing)` : '- hoa: HOA fees (if applicable, or 0 if none)'}
   - maintenance: monthly maintenance reserve
   - vacancy: vacancy factor (5-10%)
   - propertyManagement: property management fee
   - total: sum of all expenses

2. **rental**: Rental analysis
   - estimatedRent: realistic monthly rent
   - lowRange: conservative estimate
   - highRange: optimistic estimate
   - confidence: confidence level (low/medium/high)
   - comparables: brief description of rental comps

3. **financing**: Calculate DSCR loan financing (we specialize in DSCR loans)
   - IMPORTANT: You MUST calculate actual numbers, not return null or undefined
   - Purchase price: $${price.toLocaleString()}
   - Calculate TWO scenarios:
     a) 15% down at 5.99% interest: Loan = price * 0.85
     b) 20% down at 5.99% interest: Loan = price * 0.80
   - Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1] where r=0.0599/12, n=360
   - DSCR = Monthly Rent / Monthly Payment
   - Cash Flow = Monthly Rent - Monthly Payment - Total Expenses
   - Choose the BEST scenario and return:
     - loanType: "DSCR Loan" (string)
     - downPayment: 15 or 20 (number, not percentage)
     - interestRate: 5.99 (number)
     - loanAmount: calculated loan amount (number)
     - monthlyPayment: calculated P&I payment (number)
     - dscr: calculated DSCR ratio (number, 2 decimals)
     - cashFlow: calculated monthly cash flow (number)
     - recommendation: brief explanation why this option is better (string)

4. **score**: Investment quality score
   - overall: score from 1-10
   - rating: text rating (Avoid/Poor/Fair/Good/Strong/Excellent)
   - rationale: 2-3 sentence explanation

5. **risks**: Array of potential risks (max 3)

6. **opportunities**: Array of value-add opportunities (max 3)

CRITICAL: Return ONLY valid JSON with actual calculated numbers. Example structure:
{
  "expenses": {"propertyTax": 250, "insurance": 150, "hoa": 0, "maintenance": 100, "vacancy": 150, "propertyManagement": 120, "total": 770},
  "rental": {"estimatedRent": 2500, "lowRange": 2300, "highRange": 2700, "confidence": "medium", "comparables": "Based on..."},
  "financing": {"loanType": "DSCR Loan", "downPayment": 20, "interestRate": 5.99, "loanAmount": 320000, "monthlyPayment": 1900, "dscr": 1.32, "cashFlow": 830, "recommendation": "20% down..."},
  "score": {"overall": 7, "rating": "Good", "rationale": "Solid..."},
  "risks": ["Risk 1", "Risk 2"],
  "opportunities": ["Opportunity 1"]
}

Return ONLY valid JSON, no markdown formatting.`;
  }

  /**
   * Call Perplexity API
   * @private
   */
  async _callPerplexityAPI(prompt) {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a real estate investment analyst. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Validate and calculate financing if AI didn't provide proper numbers
   * @private
   */
  _validateFinancing(financing, propertyData, rental, expenses) {
    // Check if financing data is complete
    const hasValidData = financing && 
                        financing.loanAmount && 
                        financing.monthlyPayment && 
                        financing.dscr &&
                        financing.cashFlow !== undefined;
    
    if (hasValidData) {
      console.log('AI provided valid financing data');
      return financing;
    }
    
    console.log('AI financing data incomplete, calculating manually...');
    
    // Calculate financing manually using 20% down, 5.99% interest
    const price = propertyData.price;
    const downPaymentPercent = 20;
    const interestRate = 5.99;
    const loanAmount = price * (1 - downPaymentPercent / 100);
    
    // Calculate monthly payment: M = P[r(1+r)^n]/[(1+r)^n-1]
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = 360; // 30 years
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate DSCR and cash flow
    const monthlyRent = rental?.estimatedRent || 0;
    const totalExpenses = expenses?.total || 0;
    const dscr = monthlyRent > 0 ? (monthlyRent / monthlyPayment).toFixed(2) : 0;
    const cashFlow = monthlyRent - monthlyPayment - totalExpenses;
    
    return {
      loanType: financing?.loanType || 'DSCR Loan',
      downPayment: downPaymentPercent,
      interestRate: interestRate,
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      dscr: parseFloat(dscr),
      cashFlow: Math.round(cashFlow),
      recommendation: financing?.recommendation || `20% down provides a DSCR of ${dscr}, ${dscr >= 1.25 ? 'meeting typical DSCR loan requirements' : 'which may require additional reserves or higher down payment'}.`
    };
  }

  /**
   * Parse AI response
   * @private
   */
  _parseAnalysis(aiResponse, propertyData) {
    try {
      // Remove markdown code blocks if present
      let jsonStr = aiResponse.trim();
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/g, '');
      }

      const parsed = JSON.parse(jsonStr);

      // Validate structure
      if (!parsed.expenses || !parsed.rental || !parsed.financing || !parsed.score) {
        throw new Error('Invalid analysis structure');
      }

      // Add metadata
      parsed.metadata = {
        analyzedAt: new Date().toISOString(),
        propertyAddress: propertyData.address,
        cacheExpiry: Date.now() + this.CACHE_DURATION
      };

      // Add address to root for easy access in UI
      parsed.address = propertyData.address;

      // Validate and fix financing data if missing
      parsed.financing = this._validateFinancing(parsed.financing, propertyData, parsed.rental, parsed.expenses);

      return parsed;
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  /**
   * Cache analysis result
   * @private
   */
  async _cacheAnalysis(address, analysis) {
    const cacheKey = `ai_analysis_${this._hashAddress(address)}`;
    await chrome.storage.local.set({ [cacheKey]: analysis });
  }

  /**
   * Get cached analysis
   * @private
   */
  async _getCachedAnalysis(address) {
    const cacheKey = `ai_analysis_${this._hashAddress(address)}`;
    const result = await chrome.storage.local.get(cacheKey);
    const cached = result[cacheKey];

    if (cached && cached.metadata.cacheExpiry > Date.now()) {
      return cached;
    }

    return null;
  }

  /**
   * Simple hash function for address
   * @private
   */
  _hashAddress(address) {
    let hash = 0;
    for (let i = 0; i < address.length; i++) {
      const char = address.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
}

// Export singleton instance
const aiService = new AIService();
