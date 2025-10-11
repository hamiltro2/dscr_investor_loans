# 🤖 AI Analysis Feature - Setup Guide

## Overview

The Chrome extension now includes an **AI-Powered Property Analysis** feature that uses Perplexity AI to provide:
- 📊 Accurate expense breakdowns
- 🏠 Rental market comparables
- 💰 Optimal financing recommendations
- 🎯 Deal quality scoring (1-10)
- ⚠️ Risk analysis
- 💡 Value-add opportunities

---

## 🔑 Getting Your Perplexity API Key

### Step 1: Create Perplexity Account
1. Go to https://www.perplexity.ai/
2. Sign up for an account (free trial available)
3. Navigate to https://www.perplexity.ai/settings/api

### Step 2: Generate API Key
1. Click "Create API Key"
2. Copy the key (starts with `pplx-`)
3. Save it securely

### Step 3: Add API Key to Extension
1. Open `services/ai-service.js`
2. Find line 7:
   ```javascript
   this.API_KEY = 'pplx-your-api-key-here';
   ```
3. Replace `pplx-your-api-key-here` with your actual key:
   ```javascript
   this.API_KEY = 'pplx-abc123def456...';
   ```
4. Save the file

---

## 💰 Pricing & Usage Limits

### Perplexity API Pricing
- **Model**: `llama-3.1-sonar-small-128k-online`
- **Cost**: ~$0.002 per request
- **Free Tier**: 3 analyses per day (built into extension)
- **Premium**: Unlimited analyses ($9.99/month)

### Cost Examples
| Users | Daily Analyses | Monthly Cost |
|-------|----------------|--------------|
| 100   | 1 per day      | $6.00        |
| 1,000 | 1 per day      | $60.00       |
| 10,000| 1 per day      | $600.00      |

**With Premium Tier**: Extension costs are covered by $9.99/month subscriptions

---

## 🎯 Features Implemented

### 1. Smart Hybrid Approach
- ✅ Instant auto-fill (price, rent, address)
- ✅ On-demand AI analysis button
- ✅ 3 free analyses per day
- ✅ Premium upgrade path

### 2. AI Analysis Includes
```javascript
{
  expenses: {
    propertyTax: 650,
    insurance: 300,
    hoa: 500,
    maintenance: 250,
    vacancy: 150,
    propertyManagement: 200,
    total: 2050
  },
  rental: {
    estimatedRent: 4400,
    lowRange: 4200,
    highRange: 4600,
    confidence: "high",
    comparables: "Based on 12 similar units in area"
  },
  financing: {
    loanType: "DSCR Loan",
    downPayment: 25,
    interestRate: 6.49,
    monthlyPayment: 3400,
    dscr: 1.29,
    cashFlow: 1000
  },
  score: {
    overall: 8.5,
    rating: "Strong Buy",
    rationale: "Excellent cash flow, strong rental market, conservative estimate shows 15% IRR"
  },
  risks: [
    "HOA fees above market average",
    "Rental demand is seasonal"
  ],
  opportunities: [
    "Add short-term rental option",
    "Upgrade finishes for $200/mo premium"
  ]
}
```

### 3. Usage Tracking
- Daily limit enforcement (3 free)
- Premium user unlimited access
- Automatic reset at midnight
- Usage stats display in UI

### 4. Caching System
- 24-hour cache per property
- Reduces API costs
- Instant results for repeated views
- Automatic expiry

---

## 🏗️ Architecture

```
User clicks "Analyze with AI"
        ↓
AIController.handleAnalyze()
        ↓
UsageService.canUseAI()
        ├─ Premium? → Unlimited
        └─ Free? → Check daily limit (3)
        ↓
AIController.extractPropertyData()
        ↓
AIService.analyzeProperty(data)
        ├─ Check cache (24hr)
        ├─ Build AI prompt
        ├─ Call Perplexity API
        ├─ Parse JSON response
        └─ Cache result
        ↓
AIController.displayResults()
        ├─ Deal score
        ├─ Expenses breakdown
        ├─ Rental analysis
        ├─ Financing options
        ├─ Risks & opportunities
        └─ CTA buttons
        ↓
UsageService.recordUsage()
```

---

## 📂 Files Created

### Core Services
1. **`services/ai-service.js`** - Perplexity API integration
2. **`services/usage-service.js`** - Free tier & premium management
3. **`ai-controller.js`** - UI orchestration

### Styles
4. **`styles/ai-analysis.css`** - Beautiful modern UI components

### Updates
5. **`popup.html`** - Added AI section
6. **`content.js`** - Store property data in window globals

---

## 🧪 Testing

### Test the Feature
1. Navigate to Zillow/Redfin property listing
2. Click extension icon
3. View auto-filled price/rent
4. Click **"🚀 Analyze This Deal with AI"**
5. Wait 2-3 seconds for analysis
6. Review results

### Test Free Tier Limits
1. Analyze 3 properties (should work)
2. Try 4th property (should show upgrade prompt)
3. Wait until next day (resets at midnight)

### Test Premium Mode
1. Open DevTools Console
2. Run: 
   ```javascript
   chrome.storage.local.set({ premium_status: { active: true } })
   ```
3. Reload extension popup
4. Should show "👑 Premium - Unlimited Analyses"

---

## 🚀 Deployment Checklist

### Before Publishing
- [ ] Add valid Perplexity API key
- [ ] Test on 5+ different properties
- [ ] Verify daily limits work correctly
- [ ] Test cache system (revisit same property)
- [ ] Verify premium upgrade link
- [ ] Test all 11+ supported websites
- [ ] Review API costs with expected usage

### Chrome Web Store
- [ ] Update extension description
- [ ] Mention "AI-Powered Analysis"
- [ ] Add screenshots showing AI results
- [ ] Update privacy policy (mentions API usage)
- [ ] Set pricing tier (if premium version)

---

## 💡 Monetization Strategy

### Option 1: Freemium Model
- Free: 3 AI analyses per day
- Premium: $9.99/month unlimited
- Revenue covers API costs + profit

### Option 2: Lead Gen Incentive
- Free AI analysis with quote request
- Captures email + phone
- High-intent leads for Capital Bridge

### Option 3: Hybrid
- 3 free daily analyses
- Unlimited with quote request
- Premium tier for power users

**Recommended**: Option 3 (maximizes leads + revenue)

---

## 🔐 Security Notes

### API Key Protection
⚠️ **IMPORTANT**: API key is visible in extension code
- Chrome extensions are client-side JavaScript
- Users can view `ai-service.js` source code
- This is standard for Chrome extensions

### Mitigation Options
1. **Rate limiting** (already implemented via usage service)
2. **Backend proxy** (future: route API calls through your server)
3. **Per-user keys** (premium users get own keys)

**For MVP**: Current approach is fine with daily limits

---

## 📊 Monitoring & Analytics

### Track These Metrics
- AI analysis requests per day
- Free vs premium usage
- API costs per day/month
- Popular property price ranges
- Conversion to quote requests
- User engagement (analyses per user)

### Add Analytics (Future)
```javascript
// In ai-controller.js after successful analysis
chrome.runtime.sendMessage({
  action: 'analytics',
  event: 'ai_analysis_completed',
  data: {
    score: analysis.score.overall,
    price: propertyData.price,
    cashFlow: analysis.financing.cashFlow
  }
});
```

---

## 🐛 Troubleshooting

### "API Key Invalid"
- Check key starts with `pplx-`
- Verify no extra spaces
- Ensure key is active in Perplexity dashboard

### "Analysis Failed"
- Check console for error details
- Verify property data extracted correctly
- Test API key with curl:
  ```bash
  curl https://api.perplexity.ai/chat/completions \
    -H "Authorization: Bearer pplx-YOUR-KEY"
  ```

### "No Property Data"
- Ensure you're on a property detail page
- Check content.js console logs
- Verify site is in supported list

### "Daily Limit Reached"
- Expected behavior for free tier
- Resets at midnight local time
- Upgrade to premium for unlimited

---

## 🎨 UI Customization

### Change Colors
Edit `styles/ai-analysis.css`:
```css
/* Primary gradient */
background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);

/* Change to purple */
background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
```

### Adjust Free Tier Limit
Edit `services/usage-service.js` line 7:
```javascript
this.FREE_DAILY_LIMIT = 3; // Change to 5, 10, etc.
```

### Modify AI Prompt
Edit `services/ai-service.js` `_buildPrompt()` method to customize analysis focus

---

## 📞 Support

### Questions?
- Email: support@capitalbridgesolutions.com
- Phone: (949) 339-3555
- Website: https://www.capitalbridgesolutions.com

### Want Premium Features?
- Custom AI models
- Bulk property analysis
- API access for integrations
- White-label options

---

**Built with ❤️ by Capital Bridge Solutions**  
*Empowering Real Estate Investors with AI*
