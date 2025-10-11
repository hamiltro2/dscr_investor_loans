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
          <span class="section-icon">💰</span>
          <span>True Monthly Expenses</span>
        </div>
        <div class="section-content">
          ${this.renderExpenses(analysis.expenses)}
        </div>
      </div>

      <!-- Rental Analysis -->
      <div class="analysis-section">
        <div class="section-header">
          <span class="section-icon">🏠</span>
          <span>Rental Analysis</span>
        </div>
        <div class="section-content">
          ${this.renderRentalAnalysis(analysis.rental)}
        </div>
      </div>

      <!-- Financing -->
      <div class="analysis-section">
        <div class="section-header">
          <span class="section-icon">💵</span>
          <span>Best Financing Option</span>
        </div>
        <div class="section-content">
          ${this.renderFinancing(analysis.financing)}
        </div>
      </div>

      <!-- Risks -->
      ${analysis.risks && analysis.risks.length > 0 ? `
      <div class="analysis-section">
        <div class="section-header">
          <span class="section-icon">⚠️</span>
          <span>Potential Risks</span>
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
          <span class="section-icon">💡</span>
          <span>Value-Add Opportunities</span>
        </div>
        <div class="section-content">
          ${analysis.opportunities.map(opp => `<div class="list-item opportunity">${opp}</div>`).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Actions -->
      <div class="ai-actions">
        <button class="action-button primary" onclick="window.open('https://www.capitalbridgesolutions.com/get-started', '_blank')">
          <span>📞</span> Get Pre-Approved
        </button>
        <button class="action-button" onclick="aiController.saveAnalysis()">
          <span>💾</span> Save Analysis
        </button>
      </div>
    `;
    
    this.resultsContainer.innerHTML = html;
    this.resultsContainer.classList.remove('hidden');
    
    // Reset button
    this.analyzeBtn.disabled = false;
    this.analyzeBtn.innerHTML = '<span class="button-icon">🔄</span><span>Analyze Again</span>';
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
