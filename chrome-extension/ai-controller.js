/**
 * AI Analysis Controller
 * @module AIController
 * @description Handles AI analysis UI and orchestrates services
 */

class AIController {
  constructor() {
    this.aiSection = document.getElementById('ai-section');
    this.analyzeBtn = document.getElementById('ai-analyze-btn');
    this.resultsContainer = document.getElementById('ai-results');
    this.usageStatsEl = document.getElementById('usage-stats');
    this.usageCountEl = document.getElementById('usage-count');
    this.premiumPrompt = document.getElementById('premium-prompt');
    
    this.isAnalyzing = false;
    this.currentPropertyData = null;
  }

  /**
   * Initialize the AI controller
   */
  async init() {
    console.log('AI Controller: Initializing');
    
    // Update usage stats
    await this.updateUsageDisplay();
    
    // Attach event listeners
    this.analyzeBtn.addEventListener('click', () => this.handleAnalyze());
    
    console.log('AI Controller: Ready');
  }

  /**
   * Handle analyze button click
   */
  async handleAnalyze() {
    if (this.isAnalyzing) return;

    try {
      // Check if user can use AI
      const canUse = await usageService.canUseAI();
      
      if (!canUse.allowed) {
        this.showPremiumPrompt();
        return;
      }

      // Get property data from current page (async now!)
      const propertyData = await this.extractPropertyData();
      
      if (!propertyData.price || !propertyData.address) {
        this.showError('Please fill in at least the purchase price and ensure you\'re on a property listing page.');
        return;
      }

      // Start analysis
      this.isAnalyzing = true;
      this.showLoading();

      // Call AI service
      const analysis = await aiService.analyzeProperty(propertyData);
      
      // Record usage
      await usageService.recordUsage();
      
      // Display results
      this.displayResults(analysis);
      
      // Update usage display
      await this.updateUsageDisplay();
      
    } catch (error) {
      console.error('AI Controller: Analysis error', error);
      this.showError(error.message || 'Analysis failed. Please try again.');
    } finally {
      this.isAnalyzing = false;
    }
  }

  /**
   * Extract property data from the form and current page
   */
  async extractPropertyData() {
    // Get data from auto-filled inputs
    const price = parseInt(document.getElementById('purchase-price').value) || 0;
    const rent = parseInt(document.getElementById('monthly-rent').value) || null;
    
    // Query the CURRENT tab for fresh property data
    let pageData = {};
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      if (tab) {
        const response = await chrome.tabs.sendMessage(tab.id, {action: 'getPropertyData'});
        if (response) {
          pageData = response;
        }
      }
    } catch (error) {
      console.warn('Could not get fresh property data:', error);
    }
    
    // Return combined data, with fresh page data taking priority
    return {
      price: price || pageData.price || 0,
      rent: rent || pageData.rent || null,
      address: pageData.address || 'Property Address',
      beds: pageData.bedrooms || null,
      baths: pageData.bathrooms || null,
      sqft: pageData.sqft || null,
      propertyType: pageData.type || 'Residential'
    };
  }

  /**
   * Show loading animation
   */
  showLoading() {
    this.analyzeBtn.disabled = true;
    this.analyzeBtn.innerHTML = '<div class="loading-spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';
    
    this.resultsContainer.innerHTML = `
      <div class="ai-loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">🤖 AI is analyzing this property...</p>
        <p class="loading-subtext">Searching comps, calculating expenses, and scoring the deal</p>
        <div class="loading-progress">
          <div class="loading-progress-bar"></div>
        </div>
      </div>
    `;
    
    this.resultsContainer.classList.remove('hidden');
  }

  /**
   * Display AI analysis results
   */
  displayResults(analysis) {
    const html = `
      <!-- Property Address -->
      <div class="property-address-header">
        <svg class="address-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <div class="address-text">${analysis.address || 'Property Analysis'}</div>
      </div>

      <!-- Deal Score -->
      <div class="deal-score">
        <div class="score-number">${analysis.score.overall}<span style="font-size: 24px;">/10</span></div>
        <div class="score-rating">
          <span class="score-indicator ${this.getScoreClass(analysis.score.overall)}"></span>
          ${analysis.score.rating}
        </div>
        <p class="score-rationale">${analysis.score.rationale}</p>
      </div>

      <!-- Monthly Expenses -->
      <div class="analysis-section">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <span>Monthly Expenses</span>
        </div>
        <div class="section-content">
          ${this.renderExpenses(analysis.expenses)}
        </div>
      </div>

      <!-- Rental Analysis -->
      <div class="analysis-section">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Rental Comps</span>
        </div>
        <div class="section-content">
          ${this.renderRentalAnalysis(analysis.rental)}
        </div>
      </div>

      <!-- Financing -->
      <div class="analysis-section">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          <span>Financing</span>
        </div>
        <div class="section-content">
          ${this.renderFinancing(analysis.financing)}
        </div>
      </div>

      <!-- Risks -->
      ${analysis.risks && analysis.risks.length > 0 ? `
      <div class="analysis-section">
        <div class="section-header">
          <svg class="section-icon risk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Risks</span>
        </div>
        <div class="section-content">
          ${analysis.risks.map(risk => `<div class="list-item">${risk}</div>`).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Opportunities -->
      ${analysis.opportunities && analysis.opportunities.length > 0 ? `
      <div class="analysis-section">
        <div class="section-header">
          <svg class="section-icon opportunity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>Opportunities</span>
        </div>
        <div class="section-content">
          ${analysis.opportunities.map(opp => `<div class="list-item opportunity">${opp}</div>`).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Actions -->
      <div class="ai-actions">
        <button class="action-button primary" onclick="window.open('https://www.capitalbridgesolutions.com/get-started', '_blank')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Get Pre-Approved
        </button>
        <button class="action-button" onclick="aiController.saveAnalysis()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Save Analysis
        </button>
      </div>
    `;
    
    this.resultsContainer.innerHTML = html;
    this.resultsContainer.classList.remove('hidden');
    
    // Reset button
    this.analyzeBtn.disabled = false;
    this.analyzeBtn.innerHTML = '<svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg><span>Analyze Again</span>';
  }

  /**
   * Render expenses breakdown
   */
  renderExpenses(expenses) {
    return `
      ${expenses.propertyTax ? `<div class="expense-item"><span class="expense-label">Property Tax</span><span class="expense-value">$${expenses.propertyTax.toLocaleString()}</span></div>` : ''}
      ${expenses.insurance ? `<div class="expense-item"><span class="expense-label">Insurance</span><span class="expense-value">$${expenses.insurance.toLocaleString()}</span></div>` : ''}
      ${expenses.hoa ? `<div class="expense-item"><span class="expense-label">HOA Fees</span><span class="expense-value">$${expenses.hoa.toLocaleString()}</span></div>` : ''}
      ${expenses.maintenance ? `<div class="expense-item"><span class="expense-label">Maintenance Reserve</span><span class="expense-value">$${expenses.maintenance.toLocaleString()}</span></div>` : ''}
      ${expenses.vacancy ? `<div class="expense-item"><span class="expense-label">Vacancy Factor</span><span class="expense-value">$${expenses.vacancy.toLocaleString()}</span></div>` : ''}
      ${expenses.propertyManagement ? `<div class="expense-item"><span class="expense-label">Property Management</span><span class="expense-value">$${expenses.propertyManagement.toLocaleString()}</span></div>` : ''}
      <div class="expense-item"><span class="expense-label">Total Monthly Expenses</span><span class="expense-value">$${expenses.total.toLocaleString()}</span></div>
    `;
  }

  /**
   * Render rental analysis
   */
  renderRentalAnalysis(rental) {
    const confidenceColors = {
      high: '#10b981',
      medium: '#f59e0b',
      low: '#ef4444'
    };
    
    return `
      <div class="rent-estimate">
        <div class="rent-amount">$${rental.estimatedRent.toLocaleString()}</div>
        <div class="rent-range">Range: $${rental.lowRange.toLocaleString()} - $${rental.highRange.toLocaleString()}/mo</div>
        <span class="rent-confidence" style="border-color: ${confidenceColors[rental.confidence]}; color: ${confidenceColors[rental.confidence]}">
          ${rental.confidence.toUpperCase()} CONFIDENCE
        </span>
      </div>
      ${rental.comparables ? `<p class="comparables-text">${rental.comparables}</p>` : ''}
    `;
  }

  /**
   * Render financing options
   */
  renderFinancing(financing) {
    const isNegativeCashFlow = financing.cashFlow < 0;
    
    return `
      <div class="financing-highlight">
        <div class="loan-type">${financing.loanType}</div>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 5px;">
          ${financing.downPayment}% down at ${financing.interestRate}% interest
        </p>
      </div>
      
      <div class="financing-details">
        <div class="financing-detail">
          <div class="detail-label">Monthly Payment</div>
          <div class="detail-value">$${financing.monthlyPayment.toLocaleString()}</div>
        </div>
        <div class="financing-detail">
          <div class="detail-label">DSCR Ratio</div>
          <div class="detail-value">${financing.dscr}</div>
        </div>
      </div>
      
      <div class="cash-flow ${isNegativeCashFlow ? 'negative' : ''}">
        <div class="cash-flow-label">Monthly Cash Flow</div>
        <div class="cash-flow-amount">${isNegativeCashFlow ? '-' : '+'}$${Math.abs(financing.cashFlow).toLocaleString()}</div>
      </div>
    `;
  }

  /**
   * Get CSS class for score indicator
   */
  getScoreClass(score) {
    if (score >= 9) return 'excellent';
    if (score >= 7.5) return 'strong';
    if (score >= 6) return 'good';
    if (score >= 4) return 'fair';
    return 'poor';
  }

  /**
   * Update usage display
   */
  async updateUsageDisplay() {
    const canUse = await usageService.canUseAI();
    
    if (canUse.isPremium) {
      this.usageStatsEl.innerHTML = `
        <span class="usage-stats-icon">👑</span>
        <span class="usage-stats-text" style="color: #8b5cf6; font-weight: 600;">
          Premium - Unlimited Analyses
        </span>
      `;
    } else {
      this.usageCountEl.textContent = canUse.remaining;
      
      if (canUse.remaining === 0) {
        this.usageStatsEl.innerHTML = `
          <span class="usage-stats-icon">⏰</span>
          <span class="usage-stats-text">
            Daily limit reached. Resets in ${canUse.resetsIn}
          </span>
        `;
      }
    }
  }

  /**
   * Show premium upgrade prompt
   */
  showPremiumPrompt() {
    this.resultsContainer.classList.add('hidden');
    this.premiumPrompt.classList.remove('hidden');
    this.analyzeBtn.disabled = true;
  }

  /**
   * Show error message
   */
  showError(message) {
    this.resultsContainer.innerHTML = `
      <div class="ai-loading">
        <div style="font-size: 48px; margin-bottom: 15px;">⚠️</div>
        <p class="loading-text" style="color: #ef4444;">Analysis Error</p>
        <p class="loading-subtext">${message}</p>
      </div>
    `;
    this.resultsContainer.classList.remove('hidden');
    
    this.analyzeBtn.disabled = false;
    this.analyzeBtn.innerHTML = '<span class="button-icon">🚀</span><span>Try Again</span>';
  }

  /**
   * Save analysis to storage
   */
  async saveAnalysis() {
    try {
      const timestamp = new Date().toISOString();
      const savedAnalyses = await chrome.storage.local.get('saved_analyses');
      const analyses = savedAnalyses.saved_analyses || [];
      
      analyses.unshift({
        timestamp,
        propertyData: this.currentPropertyData,
        html: this.resultsContainer.innerHTML
      });
      
      // Keep only last 10
      await chrome.storage.local.set({
        saved_analyses: analyses.slice(0, 10)
      });
      
      alert('✅ Analysis saved! You can view it in your history.');
    } catch (error) {
      alert('❌ Failed to save analysis');
      console.error(error);
    }
  }
}

// Initialize controller when DOM is ready
let aiController;
document.addEventListener('DOMContentLoaded', () => {
  aiController = new AIController();
  aiController.init();
});
