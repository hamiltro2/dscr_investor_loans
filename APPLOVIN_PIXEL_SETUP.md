# AppLovin Axon Pixel Installation

## Overview
The AppLovin Axon Pixel has been successfully installed on your website to track conversions and user actions for your advertising campaigns.

## Installation Details

### 1. Pixel Initialization
**Location:** `/src/app/layout.tsx` (lines 124-131)

The pixel loads on all pages using Next.js Script component with `strategy="afterInteractive"`.

```typescript
<Script id="applovin-pixel" strategy="afterInteractive">
  {`
    var AXON_EVENT_KEY="a74d8b0d-de35-4d89-808f-03c9e051ec68";
    !function(e,r){var t=["https://s.axon.ai/pixel.js","https://res4.applovin.com/p/l/loader.iife.js"];...
    axon("init");
  `}
</Script>
```

### 2. TypeScript Declarations
**Location:** `/src/types/applovin.d.ts`

Provides type safety for the `axon()` function and related interfaces.

### 3. Tracking Utilities
**Location:** `/src/utils/applovin.ts`

Helper functions to make event tracking easy:

#### Available Functions:

- **`trackPageView()`** - Track page views
- **`trackFormSubmission(value, formType)`** - Track lead form submissions
  - `value`: Estimated conversion value
  - `formType`: Type identifier (e.g., 'loan_application', 'consultation')
  
- **`trackPhoneClick()`** - Track phone number clicks
- **`trackCalculatorUse(calculatorType, value)`** - Track calculator usage
- **`trackApplicationStart(loanAmount, loanType)`** - Track loan application starts
- **`trackApplicationComplete(loanAmount, loanType)`** - Track completed applications

#### Standard Events:
```typescript
ApplovinEvents = {
  PAGE_VIEW: 'page_view',
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  CONTACT: 'contact',
  SUBMIT_LEAD_FORM: 'submit_lead_form',
}
```

## Implemented Tracking

### Form Conversions
All forms now track submissions with AppLovin:

1. **MultiStepForm** (`/src/components/MultiStepForm.tsx`)
   - Tracks loan application submissions
   - Conversion value: 1% of loan amount
   - Event: `submit_lead_form`

2. **ConsultationForm** (`/src/components/ConsultationForm.tsx`)
   - Tracks consultation requests
   - Conversion value: $50
   - Event: `submit_lead_form`

3. **CreditSolutionsForm** (`/src/components/CreditSolutionsForm.tsx`)
   - Tracks credit solution inquiries
   - Conversion value: $75
   - Event: `submit_lead_form`

4. **ExitIntentPopup** (`/src/components/ExitIntentPopup.tsx`)
   - Tracks exit intent captures
   - Conversion value: $25
   - Event: `submit_lead_form`
   - Also tracks phone clicks

### Phone Call Tracking
Phone click events are tracked when users click phone numbers in:
- Exit Intent Popup

## Adding Tracking to New Components

### Example: Track a Button Click
```typescript
import { trackApplovinEvent } from '@/utils/applovin';

const handleButtonClick = () => {
  trackApplovinEvent('custom_event', {
    currency: 'USD',
    value: 100,
    event_category: 'engagement',
  });
};
```

### Example: Track a Custom Form
```typescript
import { trackFormSubmission } from '@/utils/applovin';

const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  // Submit form...
  const result = await submitForm();
  
  if (result.success) {
    // Track with AppLovin
    trackFormSubmission(150, 'custom_form_type');
  }
};
```

## Event Data Format

AppLovin Pixel uses GA4-compatible event format:

```typescript
{
  currency: 'USD',           // Currency code
  value: 100,                // Conversion value
  transaction_id: 'unique',  // Transaction ID (for purchase events)
  items: [{                  // Item details (for ecommerce)
    id: 'item_1',
    name: 'Product Name',
    price: 100,
    quantity: 1
  }]
}
```

## Testing

### 1. Browser Console Test
Open browser console and test:
```javascript
// Check if pixel loaded
console.log(window.axon);

// Fire test event
window.axon('track', 'page_view');
```

### 2. Network Tab Test
1. Open DevTools → Network tab
2. Filter by "axon" or "applovin"
3. Perform actions (submit forms, click phones)
4. Verify network requests to `s.axon.ai` or `res4.applovin.com`

### 3. AppLovin Dashboard
1. Log into [Axon Dashboard](https://dash.applovin.com)
2. Navigate to Events section
3. Verify events are being received
4. Check conversion counts

## Key Features

✅ **Site-wide Installation** - Loads on all pages automatically
✅ **Type Safety** - Full TypeScript support
✅ **GA4 Compatible** - Works with existing GA4 data layer
✅ **Easy Integration** - Import and use helper functions
✅ **Dual Tracking** - Works alongside Google Ads conversion tracking
✅ **Error Handling** - Safe fallbacks if pixel fails to load

## Conversion Values

Current conversion value estimates:
- **Loan Application**: 1% of loan amount
- **Consultation Request**: $50
- **Credit Solutions**: $75
- **Exit Intent Capture**: $25
- **Phone Click**: $100

These can be adjusted in each component based on your actual conversion values.

## Important Notes

1. **Pixel ID**: `a74d8b0d-de35-4d89-808f-03c9e051ec68`
2. **Loads on all pages** via root layout
3. **No impact on existing tracking** - Works alongside Google Ads
4. **Client-side only** - All tracking happens in browser
5. **Privacy compliant** - Uses first-party cookies

## Support Resources

- [AppLovin Axon Documentation](https://support.axon.ai/en/growth/promoting-your-websites/axon-pixel-integration/)
- [Event Reference](https://support.axon.ai/en/growth/promoting-your-websites/axon-pixel-integration/events-and-objects/)
- [AppLovin Dashboard](https://dash.applovin.com)

## Next Steps

1. ✅ Pixel installed and initialized
2. ✅ Form tracking implemented
3. ✅ Phone tracking implemented
4. 🔲 Verify events in AppLovin dashboard
5. 🔲 Set up conversion goals in AppLovin
6. 🔲 Monitor conversion data
7. 🔲 Optimize based on insights

---

**Installation Date**: November 2, 2025
**Event Key**: a74d8b0d-de35-4d89-808f-03c9e051ec68
**Status**: ✅ Active
