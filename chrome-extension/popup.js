// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(tabName).classList.add('active');
    });
  });

  // Load saved values from storage
  loadSavedValues();

  // DSCR Calculator
  document.getElementById('calculate-dscr').addEventListener('click', calculateDSCR);
  
  // Hard Money Calculator
  document.getElementById('calculate-hm').addEventListener('click', calculateHardMoney);
  
  // ROI Calculator
  document.getElementById('calculate-roi').addEventListener('click', calculateROI);

  // Auto-save input values
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('change', saveValues);
  });

  // Listen for property data from content script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'propertyData') {
      console.log('Popup received property data:', request);
      
      // Fill in DSCR calculator fields
      if (request.price) {
        document.getElementById('purchase-price').value = request.price;
      }
      if (request.rent) {
        document.getElementById('monthly-rent').value = request.rent;
      }
      if (request.propertyTax) {
        const monthlyTax = Math.round(request.propertyTax / 12);
        const currentExpenses = parseInt(document.getElementById('monthly-expenses').value) || 0;
        document.getElementById('monthly-expenses').value = currentExpenses + monthlyTax;
      }
      
      // Also fill Hard Money calculator
      if (request.price) {
        document.getElementById('hm-purchase-price').value = request.price;
      }
      
      // Also fill ROI calculator
      if (request.price) {
        document.getElementById('roi-purchase-price').value = request.price;
      }
      if (request.rent) {
        document.getElementById('roi-monthly-rent').value = request.rent;
      }
      
      sendResponse({success: true});
    }
  });

  // Also request property data when popup opens
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'getPropertyData'}, (response) => {
        if (response && response.price) {
          console.log('Popup requested and received data:', response);
          
          // Fill in fields with null checks
          if (response.price) {
            const purchasePriceEl = document.getElementById('purchase-price');
            const hmPurchasePriceEl = document.getElementById('hm-purchase-price');
            const roiPurchasePriceEl = document.getElementById('roi-purchase-price');
            
            if (purchasePriceEl) purchasePriceEl.value = response.price;
            if (hmPurchasePriceEl) hmPurchasePriceEl.value = response.price;
            if (roiPurchasePriceEl) roiPurchasePriceEl.value = response.price;
          }
          if (response.rent) {
            const monthlyRentEl = document.getElementById('monthly-rent');
            const roiMonthlyRentEl = document.getElementById('roi-monthly-rent');
            
            if (monthlyRentEl) monthlyRentEl.value = response.rent;
            if (roiMonthlyRentEl) roiMonthlyRentEl.value = response.rent;
          }
        }
      });
    }
  });
});

// DSCR Calculator Function
function calculateDSCR() {
  // Remove any non-numeric characters except decimal point
  const cleanValue = (val) => parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0;
  
  const purchasePrice = cleanValue(document.getElementById('purchase-price').value);
  const downPaymentPercent = cleanValue(document.getElementById('down-payment').value) || 25;
  const interestRate = cleanValue(document.getElementById('interest-rate').value) || 5.99;
  const monthlyRent = cleanValue(document.getElementById('monthly-rent').value);
  const monthlyExpenses = cleanValue(document.getElementById('monthly-expenses').value);
  
  // Validate required fields
  if (!purchasePrice || !monthlyRent) {
    alert('Please enter Purchase Price and Monthly Rent to calculate DSCR');
    return;
  }

  // Calculate loan amount
  const downPayment = purchasePrice * (downPaymentPercent / 100);
  const loanAmount = purchasePrice - downPayment;

  // Calculate monthly payment (interest-only for simplicity)
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = 30 * 12; // 30-year loan
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Calculate Net Operating Income
  const monthlyNOI = monthlyRent - monthlyExpenses;
  
  // Calculate DSCR
  const dscr = monthlyPayment > 0 ? monthlyNOI / monthlyPayment : 0;
  
  // Debug logging
  console.log('DSCR Calculation:', {
    purchasePrice,
    downPaymentPercent,
    interestRate,
    monthlyRent,
    monthlyExpenses,
    loanAmount,
    monthlyPayment,
    monthlyNOI,
    dscr
  });

  // Display results
  document.getElementById('dscr-ratio').textContent = dscr.toFixed(2);
  document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('loan-amount').textContent = '$' + loanAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Show qualification status with lender requirements
  const statusElement = document.getElementById('dscr-status');
  const ltvPercent = (downPaymentPercent === 25) ? 75 : (100 - downPaymentPercent);
  
  let lenderRequirements = '';
  
  if (dscr >= 1.25) {
    statusElement.textContent = '✅ EXCELLENT! DSCR of ' + dscr.toFixed(2) + ' - Qualifies for best rates';
    statusElement.className = 'result-status qualified';
    lenderRequirements = `
      <div style="margin-top: 15px; padding: 15px; background: #f0fdf4; border-left: 4px solid #10b981; border-radius: 8px;">
        <div style="font-weight: 700; color: #065f46; margin-bottom: 10px;">✅ Lender Requirements Met:</div>
        <div style="font-size: 13px; color: #047857; line-height: 1.8;">
          ✓ DSCR ${dscr.toFixed(2)} exceeds 1.25 (Best programs)<br>
          ✓ LTV ${ltvPercent}% (Standard for DSCR loans)<br>
          ✓ Qualifies for rates from <strong>5.99% APR</strong><br>
          ✓ No income verification required<br>
          ✓ Close in 10-15 days
        </div>
        <button id="dscr-preapproved-btn" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer;">
          Get Pre-Approved →
        </button>
      </div>
    `;
  } else if (dscr >= 1.0) {
    statusElement.textContent = '✅ QUALIFIED! DSCR of ' + dscr.toFixed(2) + ' meets minimum requirements';
    statusElement.className = 'result-status qualified';
    lenderRequirements = `
      <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
        <div style="font-weight: 700; color: #92400e; margin-bottom: 10px;">⚠️ Marginal Qualification:</div>
        <div style="font-size: 13px; color: #78350f; line-height: 1.8;">
          ✓ DSCR ${dscr.toFixed(2)} meets minimum (1.0+)<br>
          ⚠️ Rates may be higher with lower DSCR<br>
          💡 <strong>Tip:</strong> Increase rent or reduce expenses to improve DSCR<br>
          💡 Consider larger down payment to reduce loan amount
        </div>
        <a href="https://www.capitalbridgesolutions.com" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #f59e0b; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px;">
          Check Eligibility →
        </a>
      </div>
    `;
  } else {
    statusElement.textContent = '❌ NOT QUALIFIED. DSCR of ' + dscr.toFixed(2) + ' is below minimum (1.0)';
    statusElement.className = 'result-status not-qualified';
    const targetRent = Math.ceil(monthlyPayment / 1.0 + monthlyExpenses);
    const rentIncrease = targetRent - monthlyRent;
    lenderRequirements = `
      <div style="margin-top: 15px; padding: 15px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px;">
        <div style="font-weight: 700; color: #991b1b; margin-bottom: 10px;">❌ Does Not Meet Requirements:</div>
        <div style="font-size: 13px; color: #7f1d1d; line-height: 1.8;">
          ❌ DSCR ${dscr.toFixed(2)} is below 1.0 minimum<br>
          <br>
          <strong>Options to qualify:</strong><br>
          💡 Increase rent by $${rentIncrease.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} to reach 1.0 DSCR<br>
          💡 Increase down payment to reduce loan amount<br>
          💡 Reduce expenses or negotiate better terms<br>
          💡 Consider hard money for renovation to increase value
        </div>
        <a href="https://www.capitalbridgesolutions.com" target="_blank" style="display: inline-block; margin-top: 10px; padding: 8px 16px; background: #ef4444; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px;">
          Explore Options →
        </a>
      </div>
    `;
  }
  
  // Add lender requirements to results
  document.getElementById('lender-requirements').innerHTML = lenderRequirements;

  // Show results
  document.getElementById('dscr-results').classList.remove('hidden');

  // Track calculation
  chrome.runtime.sendMessage({
    action: 'track',
    category: 'calculator',
    type: 'dscr',
    value: dscr
  });
}

// Hard Money Calculator Function
function calculateHardMoney() {
  const cleanValue = (val) => parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0;
  
  const purchasePrice = cleanValue(document.getElementById('hm-purchase-price').value);
  const rehabCost = cleanValue(document.getElementById('hm-rehab-cost').value);
  const arv = cleanValue(document.getElementById('hm-arv').value);
  const ltvPercent = cleanValue(document.getElementById('hm-ltv').value) || 70;
  const annualRate = cleanValue(document.getElementById('hm-rate').value) || 12;
  const termMonths = cleanValue(document.getElementById('hm-term').value) || 12;
  
  // Validate required fields
  if (!purchasePrice || !arv) {
    alert('Please enter Purchase Price and ARV to calculate');
    return;
  }

  // Calculate max loan amount based on ARV
  const maxLoan = arv * (ltvPercent / 100);
  
  // Calculate total project cost
  const totalProjectCost = purchasePrice + rehabCost;
  
  // Actual loan amount (lesser of max loan or project cost)
  const loanAmount = Math.min(maxLoan, totalProjectCost);
  
  // Calculate monthly payment (interest-only)
  // Convert annual rate to monthly: annual / 12
  const monthlyRate = annualRate / 12;
  const monthlyPayment = loanAmount * (monthlyRate / 100);
  
  // Calculate total interest
  const totalInterest = monthlyPayment * termMonths;
  
  // Calculate cash needed
  const cashNeeded = totalProjectCost - loanAmount;

  // Display results
  document.getElementById('hm-max-loan').textContent = '$' + loanAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('hm-monthly').textContent = '$' + monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('hm-total-interest').textContent = '$' + totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('hm-cash-needed').textContent = '$' + cashNeeded.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Show results
  document.getElementById('hm-results').classList.remove('hidden');
}

// ROI Calculator Function
function calculateROI() {
  const cleanValue = (val) => parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0;
  
  const totalInvestment = cleanValue(document.getElementById('roi-purchase').value);
  const monthlyCashFlow = cleanValue(document.getElementById('roi-monthly-cf').value);
  const appreciationRate = cleanValue(document.getElementById('roi-appreciation').value) || 3;
  
  // Validate required fields
  if (!totalInvestment) {
    alert('Please enter Total Investment to calculate ROI');
    return;
  }

  // Calculate annual cash flow
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calculate cash-on-cash return
  const cashOnCash = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  
  // Calculate appreciation value
  const appreciationValue = totalInvestment * (appreciationRate / 100);
  
  // Calculate total annual return
  const totalAnnualReturn = annualCashFlow + appreciationValue;
  const totalReturnPercent = totalInvestment > 0 ? (totalAnnualReturn / totalInvestment) * 100 : 0;

  // Display results
  document.getElementById('roi-coc').textContent = cashOnCash.toFixed(1) + '%';
  document.getElementById('roi-annual-cf').textContent = '$' + annualCashFlow.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  document.getElementById('roi-total').textContent = totalReturnPercent.toFixed(1) + '%';

  // Show results
  document.getElementById('roi-results').classList.remove('hidden');
}

// Save values to Chrome storage
function saveValues() {
  const values = {};
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    values[input.id] = input.value;
  });
  
  chrome.storage.local.set({ calculatorValues: values });
}

// Load saved values from Chrome storage
function loadSavedValues() {
  chrome.storage.local.get(['calculatorValues'], function(result) {
    if (result.calculatorValues) {
      Object.keys(result.calculatorValues).forEach(key => {
        const input = document.getElementById(key);
        // Only load saved value if input exists AND doesn't already have a default value
        if (input && !input.hasAttribute('value')) {
          input.value = result.calculatorValues[key];
        }
      });
    }
  });
}

// Listen for property data from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'propertyData') {
    // Auto-fill purchase price if available
    if (request.price && document.getElementById('purchase-price')) {
      document.getElementById('purchase-price').value = request.price;
    }
    if (request.price && document.getElementById('hm-purchase-price')) {
      document.getElementById('hm-purchase-price').value = request.price;
    }
    
    // Auto-fill monthly rent if available
    if (request.rent && document.getElementById('monthly-rent')) {
      document.getElementById('monthly-rent').value = request.rent;
    }
  }
});

// ============================================
// PARTNERS SYSTEM - MIT PhD Level Implementation
// ============================================

// Partner category tabs
const partnerTabButtons = document.querySelectorAll('.partner-tab-button');
partnerTabButtons.forEach(button => {
  button.addEventListener('click', () => {
    partnerTabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const category = button.getAttribute('data-category');
    filterPartners(category);
  });
});

// Location selector
document.getElementById('partner-location')?.addEventListener('change', (e) => {
  loadPartners(e.target.value);
});

// Search functionality with debounce
let searchTimeout;
document.getElementById('partner-search')?.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchPartners(e.target.value);
  }, 300);
});

// Load partners when Partners tab is clicked
document.querySelector('[data-tab="partners"]')?.addEventListener('click', () => {
  // Show coming soon message immediately
  showComingSoonIfNeeded();
});

// Partner rendering functions
function loadPartners(location) {
  const partnersList = document.getElementById('partners-list');
  if (!partnersList) return;
  
  // Show loading state
  partnersList.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  `;
  
  // Simulate API call (replace with actual API later)
  setTimeout(() => {
    const partners = getPartnersForLocation(location);
    renderPartners(partners);
  }, 500);
}

function getPartnersForLocation(location) {
  // This would be replaced with actual API call
  const mockData = {
    'los-angeles': [
      {
        id: 'la-001',
        name: 'John Smith',
        category: 'deal-finders',
        title: 'Investor-Focused Agent',
        company: 'Keller Williams Realty',
        avatar: '🏠',
        rating: 5.0,
        reviews: 47,
        verified: true,
        badges: ['Investor-Focused', 'DSCR Expert', '100+ Deals'],
        specialties: [
          'Off-market deal finder',
          'Multi-family specialist',
          'DSCR loan experience',
          '50+ investor clients'
        ],
        quote: 'I help investors find cash-flowing properties that meet DSCR requirements',
        phone: '(555) 123-4567',
        email: 'john@kwrealty.com'
      },
      {
        id: 'la-002',
        name: 'ABC Construction',
        category: 'contractors',
        title: 'Fix & Flip Specialists',
        company: 'Licensed #123456',
        avatar: '🔨',
        rating: 5.0,
        reviews: 92,
        verified: true,
        badges: ['Licensed & Insured', 'Fast Turnaround', 'Volume Discounts'],
        specialties: [
          '30-45 day turnarounds',
          'Detailed SOW & budgets',
          'Volume discounts available',
          '100+ flips completed'
        ],
        quote: 'We understand investor timelines and budgets - no surprises',
        phone: '(555) 345-6789',
        email: 'info@abcconstruction.com'
      },
      {
        id: 'la-003',
        name: 'Elite Property Management',
        category: 'management',
        title: 'Hands-Off Property Managers',
        company: 'Managing 500+ Units',
        avatar: '🏢',
        rating: 4.8,
        reviews: 156,
        verified: true,
        badges: ['24/7 Support', '99% Collection Rate', 'Investor-Focused'],
        specialties: [
          'Tenant screening & placement',
          '24/7 maintenance coordination',
          'Monthly financial reporting',
          'Eviction handling'
        ],
        quote: 'We make property ownership truly passive for investors',
        phone: '(555) 456-7890',
        email: 'contact@elitepm.com'
      }
    ]
  };
  
  return mockData[location] || [];
}

function renderPartners(partners) {
  const partnersList = document.getElementById('partners-list');
  if (!partnersList) return;
  
  if (partners.length === 0) {
    partnersList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No partners found in this area</div>
      </div>
    `;
    return;
  }
  
  partnersList.innerHTML = partners.map(partner => createPartnerCard(partner)).join('');
  
  // Add event listeners to partner action buttons
  attachPartnerEventListeners();
}

function createPartnerCard(partner) {
  const stars = '⭐'.repeat(Math.floor(partner.rating));
  const verifiedBadge = partner.verified ? '<span class="badge verified">✓ Verified</span>' : '';
  
  return `
    <div class="partner-card" data-partner-id="${partner.id}" data-category="${partner.category}">
      <div class="partner-header">
        <div class="partner-avatar">${partner.avatar}</div>
        <div class="partner-info">
          <div class="partner-name">${partner.name}</div>
          <div class="partner-title">${partner.title}</div>
          <div class="partner-rating">
            <span class="stars">${stars}</span>
            <span class="review-count">(${partner.reviews} reviews)</span>
          </div>
        </div>
      </div>
      
      <div class="partner-badges">
        ${verifiedBadge}
        ${partner.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
      </div>
      
      <div class="partner-specialties">
        <ul>
          ${partner.specialties.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
      
      <div class="partner-quote">"${partner.quote}"</div>
      
      <div class="partner-actions">
        <a href="tel:${partner.phone}" class="partner-btn primary" data-action="call" data-partner="${partner.name}">
          📞 Call Now
        </a>
        <a href="mailto:${partner.email}" class="partner-btn secondary" data-action="email" data-partner="${partner.name}">
          ✉️ Email
        </a>
      </div>
    </div>
  `;
}

function attachPartnerEventListeners() {
  // Track partner interactions
  document.querySelectorAll('[data-action="call"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const partnerName = e.currentTarget.getAttribute('data-partner');
      trackPartnerAction('call', partnerName);
    });
  });
  
  document.querySelectorAll('[data-action="email"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const partnerName = e.currentTarget.getAttribute('data-partner');
      trackPartnerAction('email', partnerName);
    });
  });
}

function filterPartners(category) {
  const allCards = document.querySelectorAll('.partner-card');
  
  allCards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function searchPartners(query) {
  const allCards = document.querySelectorAll('.partner-card');
  const searchLower = query.toLowerCase();
  
  allCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(searchLower)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function trackPartnerAction(action, partnerName) {
  chrome.runtime.sendMessage({
    action: 'track',
    category: 'partner',
    type: action,
    partner: partnerName
  });
  
  console.log(`Partner ${action}:`, partnerName);
}

function showComingSoonIfNeeded() {
  const partnersList = document.getElementById('partners-list');
  if (!partnersList) return;
  
  // Check if we have real partners (not demo data)
  const hasRealPartners = false; // Set to true when you have real partners
  
  if (!hasRealPartners) {
    partnersList.innerHTML = `
      <div style="padding: 30px 20px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 20px;">🚀</div>
        <h3 style="color: #fff; font-size: 20px; margin-bottom: 12px;">Partner Network Coming Soon!</h3>
        <p style="color: #888; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
          We're building a vetted network of investor-focused professionals to help you succeed.
        </p>
        
        <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h4 style="color: #3b82f6; font-size: 16px; margin-bottom: 16px;">What's Coming:</h4>
          <div style="text-align: left; color: #888; font-size: 13px; line-height: 2;">
            <div>🏠 <strong style="color: #fff;">Deal Finders</strong> - Investor-focused agents</div>
            <div>🔨 <strong style="color: #fff;">Reliable Contractors</strong> - Fast turnarounds</div>
            <div>🏢 <strong style="color: #fff;">Property Managers</strong> - Hands-off management</div>
            <div>💰 <strong style="color: #fff;">CPAs & Attorneys</strong> - Tax & legal experts</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border: 1px solid #3b82f6; border-radius: 12px; padding: 20px;">
          <p style="color: #fff; font-size: 14px; margin-bottom: 12px;">💼 Are you a real estate professional?</p>
          <a href="https://www.capitalbridgesolutions.com/partner-network" target="_blank" 
             style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); 
                    color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Become a Founding Partner →
          </a>
          <p style="color: #888; font-size: 12px; margin-top: 12px;">
            Founding partners get featured placement & locked-in pricing
          </p>
        </div>
      </div>
    `;
  }
}
