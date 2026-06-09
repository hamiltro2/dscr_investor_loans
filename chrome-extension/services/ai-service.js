/**
 * AI Analysis Service - Perplexity API Integration
 * @module AIService
 * @description Handles all AI-powered property analysis using Perplexity API
 */

class AIService {
  constructor() {
    // Load from config if available, otherwise use defaults
    this.API_BASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.API_BASE_URL) 
      || 'https://www.capitalbridgesolutions.com';
    this.API_URL = `${this.API_BASE_URL}/api/analyze-deal`;
    this.CACHE_DURATION = (typeof CONFIG !== 'undefined' && CONFIG.CACHE_DURATION_HOURS) 
      ? CONFIG.CACHE_DURATION_HOURS * 60 * 60 * 1000 
      : 24 * 60 * 60 * 1000;
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
      
      // Call backend API
      const analysis = await this._callBackendAnalysisAPI(propertyData);
      
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
   * Call Backend Analysis API
   * @private
   */
  async _callBackendAnalysisAPI(propertyData) {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ propertyData })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    const data = await response.json();
    return data.result;
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
    
    // Calculate monthly payment (Interest-Only)
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * monthlyRate;
    
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
