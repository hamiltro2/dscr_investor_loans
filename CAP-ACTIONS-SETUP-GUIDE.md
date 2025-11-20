# Cap ChatGPT Actions Setup Guide

## 🎯 Overview

This guide shows you how to add 5 powerful actions to Cap (your ChatGPT advisor) to make it more useful for real estate investors.

**New Actions:**
1. ✅ **saveLead** - Already configured (captures investor info)
2. 🆕 **analyzeProperty** - Analyzes investment properties
3. 🆕 **getMarketData** - Returns California market stats
4. 🆕 **calculateDSCR** - Interactive DSCR calculator
5. 🆕 **scheduleCall** - Books consultation calls

---

## 📋 Prerequisites

- Access to edit your Cap GPT in ChatGPT (you must be the creator)
- OpenAPI spec file: `public/cap-actions-openapi.json` (already created)
- All API endpoints deployed to production

---

## 🚀 Step-by-Step Setup

### Step 1: Access Cap GPT Editor

1. Go to [ChatGPT](https://chat.openai.com)
2. Click your profile → **My GPTs**
3. Find **Cap - DSCR Loan Advisor** and click **Edit**

### Step 2: Navigate to Actions

1. In the GPT editor, click the **Configure** tab
2. Scroll down to the **Actions** section
3. Click **Create new action** (or edit existing if you already have saveLead configured)

### Step 3: Import OpenAPI Schema

**Option A: Copy/Paste (Recommended)**

1. Open `public/cap-actions-openapi.json`
2. Copy the entire contents
3. In the Actions section, paste it into the **Schema** field

**Option B: Import from URL**

1. After deploying, your schema will be available at:
   ```
   https://www.capitalbridgesolutions.com/cap-actions-openapi.json
   ```
2. Click **Import from URL** and paste that URL

### Step 4: Configure Authentication

1. **Authentication Type**: Select **None** (API key not needed)
   - These are public endpoints for Cap to use
   - They log all interactions in your database
   - No sensitive data is exposed

2. **Privacy Policy**: (Optional)
   ```
   https://www.capitalbridgesolutions.com/privacy
   ```

### Step 5: Review Available Actions

You should now see 5 actions in the list:

| Action ID | Purpose | When Cap Uses It |
|-----------|---------|------------------|
| `saveLead` | Captures investor contact info | User wants quote or to schedule call |
| `analyzeProperty` | Analyzes investment property | User asks "should I buy this property?" |
| `getMarketData` | Returns CA market stats | User asks "where should I invest in CA?" |
| `calculateDSCR` | Calculates DSCR ratio | User wants to run numbers on a deal |
| `scheduleCall` | Books consultation | User wants to talk to loan officer |

### Step 6: Test Each Action

Click **Test** on each action to verify:

#### Test `analyzeProperty`:
```json
{
  "purchase_price": 600000,
  "monthly_rent": 3600,
  "down_payment_percent": 25,
  "credit_score": 680,
  "city": "Riverside",
  "state": "CA"
}
```

Expected result: Full property analysis with DSCR, cash flow, approval likelihood

#### Test `getMarketData`:
```
GET with query parameter: ?city=inland-empire
```

Expected result: Market data for Inland Empire including median prices, rents, DSCR

#### Test `calculateDSCR`:
```json
{
  "monthly_rent": 3500,
  "purchase_price": 600000,
  "interest_rate": 6.25
}
```

Expected result: DSCR calculation with breakdown and recommendations

#### Test `scheduleCall`:
```json
{
  "full_name": "Test Investor",
  "email": "test@example.com",
  "phone": "555-555-5555",
  "preferred_date": "2024-11-25",
  "preferred_time": "2pm PT"
}
```

Expected result: Call scheduled, Calendly link provided

### Step 7: Update Cap's Instructions

Add these instructions to Cap's system prompt to help it use the new actions effectively:

```
## Available Actions

You have access to 5 powerful tools to help investors:

### 1. analyzeProperty
Use when: Investor wants to evaluate a specific property
Required: purchase_price, monthly_rent
Returns: DSCR, cash flow, approval likelihood, recommendations

Example: "Analyze this property: $600K purchase price, $3,600/month rent"

### 2. getMarketData
Use when: Investor asks about California markets or where to invest
Optional parameter: city (e.g., "los-angeles", "inland-empire", "sacramento")
Returns: Median prices, rents, DSCR ratios, investment strategies

Example: "What's the best market for cash flow in California?"

### 3. calculateDSCR
Use when: Investor wants to run different scenarios or understand DSCR
Required: monthly_rent (plus purchase_price OR loan_amount)
Returns: DSCR ratio, cash flow, approval odds, what-if scenarios

Example: "What DSCR would I get with $3,500 rent on a $500K loan?"

### 4. saveLead
Use when: Investor wants a quote, rate lock, or to move forward
Required: full_name, email, phone, loan_amount, credit_score_range
Returns: Confirmation that team will contact them

IMPORTANT: Always ask for permission before saving contact info!

### 5. scheduleCall
Use when: Investor wants to speak with a loan officer
Required: full_name, email, phone
Optional: preferred_date, preferred_time, topic, property_address
Returns: Confirmation + Calendly link

## Action Usage Guidelines

1. **Be proactive**: If investor shares property details, offer to analyze it
2. **Use market data**: When discussing California, pull live market stats
3. **Calculate scenarios**: Help investors run different what-if scenarios
4. **Capture leads**: When investor is ready, save their info or schedule call
5. **Explain results**: Always interpret the data in investor-friendly language

## Example Conversation Flow

User: "I'm looking at a $580K property in Riverside that rents for $3,200/month"

You: "Let me analyze that property for you..."
[Use analyzeProperty action]
[Interpret results]
"This property shows a 1.28 DSCR with $380/month positive cash flow. That's excellent! You'd qualify for our best rates at 5.99%. Would you like me to get you a formal quote?"

User: "Yes please"

You: "Great! I'll need a few details to get you an accurate quote..."
[Collect info]
[Use saveLead action]
"Perfect! Your quote request has been submitted. Our team will call you within 2 business hours with your personalized rate quote. You'll also receive an email confirmation shortly."
```

### Step 8: Save and Test

1. Click **Update** in the top right
2. Click **View GPT** to test in a real conversation
3. Try asking questions that should trigger each action:
   - "Analyze this $600K property with $3,500 rent"
   - "What's the best market for cash flow in California?"
   - "Calculate my DSCR with $4,000 rent and $450K loan"
   - "I want to schedule a call"

---

## 🧪 Testing Checklist

Before going live, test each scenario:

- [ ] Property analysis works and returns accurate DSCR
- [ ] Market data returns correct info for all major CA cities
- [ ] DSCR calculator handles different scenarios
- [ ] Schedule call creates lead in database and sends email
- [ ] Save lead creates/updates lead correctly
- [ ] All actions log to database (check Interactions table)
- [ ] Email notifications are sent for calls and quotes
- [ ] Cap interprets and explains results correctly

---

## 📊 Monitoring & Analytics

### Check Lead Captures:
```sql
-- View all ChatGPT leads
SELECT * FROM "Lead" 
WHERE channel = 'chatgpt_app' 
ORDER BY "createdAt" DESC;

-- View all ChatGPT interactions
SELECT * FROM "Interaction" 
WHERE "toolName" LIKE 'chatgpt_%' 
ORDER BY "createdAt" DESC;
```

### Monitor Action Usage:
- Check which actions are used most frequently
- See which questions lead to lead captures
- Track conversion rate from conversation → lead

### Key Metrics to Track:
1. **Total conversations** with Cap
2. **Action usage** (which actions are most popular)
3. **Lead capture rate** (% of conversations that become leads)
4. **Response time** (how long each action takes)
5. **Error rate** (any failed actions)

---

## 🔧 Troubleshooting

### Action Not Appearing
- Verify OpenAPI schema is valid JSON
- Check that all required fields are marked as "required"
- Try refreshing the GPT editor

### Action Failing
- Check server logs for API endpoint errors
- Verify request format matches OpenAPI spec
- Test endpoint directly with curl/Postman first

### Cap Not Using Actions
- Make sure instructions mention when to use each action
- Check that action names are clear and descriptive
- Test with explicit prompts that should trigger actions

### Database Not Updating
- Check Prisma schema matches database
- Verify environment variables are set correctly
- Check that database connection is working

---

## 🚀 Going Live

Once everything is tested:

1. **Update Cap's public description** to mention new capabilities:
   ```
   Cap analyzes properties, provides market insights, calculates DSCR, 
   and helps you lock in the best rates for California investments.
   ```

2. **Add conversation starters** that showcase new actions:
   - "Analyze a $600K property with $3,500 rent"
   - "What's the best California market for cash flow?"
   - "Calculate my DSCR with $4,000 rent"
   - "Schedule a call to discuss my deal"

3. **Promote new features**:
   - Update your website to mention Cap's analysis tools
   - Share on LinkedIn/Twitter
   - Email past clients about new capabilities

---

## 📈 Next Steps (Future Enhancements)

### Phase 2: OAuth Authentication
- Let users log in to view their applications
- Check application status in ChatGPT
- Upload documents through Cap

### Phase 3: Real-Time Rates
- Pull live rates from your rate sheet
- Personalized rate quotes based on credit/DSCR
- Rate lock directly in ChatGPT

### Phase 4: Advanced Analytics
- Property comps from Zillow API
- Neighborhood analysis
- ROI projections with appreciation

---

## 🆘 Support

If you need help:
1. Check API endpoint logs first
2. Test endpoints directly (not through ChatGPT)
3. Verify OpenAPI schema is valid
4. Check database for logged interactions

**Remember**: Every action creates an Interaction record in your database, so you can always see exactly what happened!

---

## ✅ Success Metrics

After 30 days, you should see:

- **10x more leads** from ChatGPT (actions make conversion easier)
- **Higher quality leads** (property analysis pre-qualifies them)
- **Faster response time** (instant market data vs manual research)
- **Better user experience** (interactive tools vs static info)

**Your competitive advantage**: No other DSCR lender has this! 🎯
