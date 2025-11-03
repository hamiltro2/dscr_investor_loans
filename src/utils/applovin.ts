/**
 * AppLovin Axon Pixel Tracking Utilities
 * 
 * Use these functions to track conversions and user actions
 */

export const trackApplovinEvent = (eventName: string, eventData?: any) => {
  if (typeof window !== 'undefined' && window.axon) {
    try {
      window.axon('track', eventName, eventData);
      console.log('[AppLovin] Tracked event:', eventName, eventData);
    } catch (error) {
      console.error('[AppLovin] Error tracking event:', error);
    }
  }
};

/**
 * Track page view
 */
export const trackPageView = () => {
  trackApplovinEvent('page_view');
};

/**
 * Track form submission / lead capture
 * @param value - The estimated value of the lead
 * @param formType - Type of form (e.g., 'consultation', 'loan_application')
 */
export const trackFormSubmission = (value?: number, formType?: string) => {
  trackApplovinEvent('submit_lead_form', {
    currency: 'USD',
    value: value || 0,
    form_type: formType,
  });
};

/**
 * Track phone call click
 */
export const trackPhoneClick = () => {
  trackApplovinEvent('contact', {
    method: 'phone',
    value: 100, // Estimated value of a phone call
  });
};

/**
 * Track calculator usage
 * @param calculatorType - Type of calculator used
 * @param value - Loan amount or calculation result
 */
export const trackCalculatorUse = (calculatorType: string, value?: number) => {
  trackApplovinEvent('calculator_use', {
    calculator_type: calculatorType,
    value: value || 0,
    currency: 'USD',
  });
};

/**
 * Track loan application start
 * @param loanAmount - Requested loan amount
 * @param loanType - Type of loan (DSCR, Hard Money, etc.)
 */
export const trackApplicationStart = (loanAmount?: number, loanType?: string) => {
  trackApplovinEvent('begin_checkout', {
    currency: 'USD',
    value: loanAmount || 0,
    loan_type: loanType,
  });
};

/**
 * Track successful loan application submission
 * @param loanAmount - Approved loan amount
 * @param loanType - Type of loan
 */
export const trackApplicationComplete = (loanAmount: number, loanType: string) => {
  trackApplovinEvent('purchase', {
    currency: 'USD',
    value: loanAmount,
    transaction_id: `loan_${Date.now()}`,
    loan_type: loanType,
  });
};

/**
 * Standard ecommerce events for AppLovin
 */
export const ApplovinEvents = {
  PAGE_VIEW: 'page_view',
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  CONTACT: 'contact',
  SUBMIT_LEAD_FORM: 'submit_lead_form',
} as const;
