/**
 * Lead Modal Controller
 * Handles the property interest modal form
 */
class LeadModal {
  constructor() {
    this.propertyData = null;
    this.isSubmitting = false;
  }

  /**
   * Show modal with property data
   */
  show(propertyData) {
    this.propertyData = propertyData;
    this.render();
    this.attachEventListeners();
  }

  /**
   * Close modal
   */
  close() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  /**
   * Render modal HTML
   */
  render() {
    const html = `
      <div class="modal-overlay">
        <div class="modal-container">
          <div class="modal-header">
            <div class="modal-title">
              🏠 Interested in This Property?
            </div>
            <button class="modal-close" id="modal-close-btn">&times;</button>
          </div>
          
          <div class="modal-body">
            <!-- Property Summary -->
            <div class="property-summary">
              <div class="property-address">${this.propertyData.address || 'Property Address'}</div>
              <div class="property-details">
                <span>💰 ${this.formatPrice(this.propertyData.price)}</span>
                ${this.propertyData.bedrooms ? `<span>🛏️ ${this.propertyData.bedrooms} bed</span>` : ''}
                ${this.propertyData.bathrooms ? `<span>🚿 ${this.propertyData.bathrooms} bath</span>` : ''}
                ${this.propertyData.sqft ? `<span>📐 ${this.propertyData.sqft.toLocaleString()} sqft</span>` : ''}
              </div>
            </div>

            <!-- Form -->
            <form id="lead-form">
              <div class="form-section">
                <div class="form-section-title">
                  📝 Your Information
                </div>

                <div class="form-group">
                  <label class="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    class="form-input" 
                    name="name" 
                    placeholder="John Smith" 
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Email *</label>
                  <input 
                    type="email" 
                    class="form-input" 
                    name="email" 
                    placeholder="john@example.com" 
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Phone *</label>
                  <input 
                    type="tel" 
                    class="form-input" 
                    name="phone" 
                    placeholder="(949) 555-1234" 
                    required
                  />
                </div>
              </div>

              <div id="error-container"></div>

              <button type="submit" class="modal-submit-btn" id="submit-btn">
                <span>Submit Interest</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Click outside to close
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    // Form submission
    const form = document.getElementById('lead-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(form);
      });
    }
  }

  /**
   * Handle form submission
   */
  async handleSubmit(form) {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    const submitBtn = document.getElementById('submit-btn');
    const errorContainer = document.getElementById('error-container');
    
    // Update button state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="btn-loading">
        <span class="spinner"></span>
        <span>Submitting...</span>
      </span>
    `;
    
    // Clear previous errors
    errorContainer.innerHTML = '';

    try {
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        // Property data
        propertyAddress: this.propertyData.address,
        propertyPrice: this.formatPrice(this.propertyData.price),
        propertyBeds: this.propertyData.bedrooms,
        propertyBaths: this.propertyData.bathrooms,
        propertySqft: this.propertyData.sqft,
        estimatedRent: this.propertyData.rent ? this.formatPrice(this.propertyData.rent) : 'N/A',
        hoaFees: this.propertyData.hoaFees ? this.formatPrice(this.propertyData.hoaFees) : 'N/A',
        propertyTax: this.propertyData.propertyTax ? this.formatPrice(this.propertyData.propertyTax) : 'N/A',
        source: 'Chrome Extension'
      };

      console.log('Submitting lead:', data);

      // Submit to your API
      const response = await fetch('https://www.capitalbridgesolutions.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'extension',
          data: data
        })
      });

      const result = await response.json();

      if (result.success) {
        this.showSuccess();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      errorContainer.innerHTML = `
        <div class="error-message">
          ❌ There was an error submitting your request. Please try again or call us directly at (949) 339-3555.
        </div>
      `;
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Submit Interest</span>';
      this.isSubmitting = false;
    }
  }

  /**
   * Show success message
   */
  showSuccess() {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = `
        <div class="modal-success">
          <div class="success-icon">✅</div>
          <div class="success-title">Thank You!</div>
          <div class="success-message">
            <p>We've received your interest in this property.</p>
            <p>One of our loan specialists will contact you within 24 hours.</p>
            <p style="margin-top: 16px; color: #3b82f6; font-weight: 600;">
              📞 (949) 339-3555
            </p>
          </div>
        </div>
      `;

      // Auto-close after 5 seconds
      setTimeout(() => {
        this.close();
      }, 5000);
    }
  }

  /**
   * Format price for display
   */
  formatPrice(price) {
    if (!price) return 'N/A';
    return typeof price === 'number' ? `$${price.toLocaleString()}` : price;
  }
}

// Export for use in other files
window.LeadModal = LeadModal;
