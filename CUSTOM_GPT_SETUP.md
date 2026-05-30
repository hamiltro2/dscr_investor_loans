# 🤖 Custom GPT Setup Guide - Capital Bridge Solutions

**Create "DSCR Loan Expert" Custom GPT for ChatGPT**

---

## 🎯 What This Does

Creates a Custom GPT in ChatGPT that:
- ✅ Answers ANY question about DSCR loans
- ✅ Searches your 106-chunk knowledge base
- ✅ Captures leads via contact form
- ✅ Available to anyone in ChatGPT
- ✅ Promotes Capital Bridge Solutions

---

## 📋 Prerequisites

✅ **You have:**
- OpenAPI schema (`/public/openapi.yaml`) ✅ Created
- Knowledge search API (`/api/knowledge/search`) ✅ Created
- Contact form API (`/api/contact`) ✅ Already exists
- Knowledge base built (106 chunks) ✅ Already built

---

## 🚀 Step-by-Step Setup

### **Step 1: Go to GPT Builder**

1. **Open ChatGPT:** https://chat.openai.com
2. **Click "Explore GPTs"** (left sidebar)
3. **Click "Create"** (top right)
4. **Choose "Configure"** tab

---

### **Step 2: Basic Configuration**

**Name:**
```
DSCR Loan Expert by Capital Bridge Solutions
```

**Description:**
```
Expert advisor for DSCR loans and real estate investor financing. 
Get 1-on-1 guidance from active real estate investors (available Saturdays!). 
Learn about rates from 5.99%, 15% down payment options, and refinancing 
down to a 500 FICO score. Only 0.75% origination fee.
```

**Instructions:**
```
You are "Cap," the DSCR Loan Expert and Dedicated Partner for Capital Bridge Solutions. You are not just a loan bot; you are a partner in helping regular people build real estate wealth.

YOUR CORE VALUE PROPOSITIONS (Mention naturally):
1. 👥 1-on-1 Professional Investor Support: Unlike big institutional lenders (like Kiavi or AngelOak) who send you to call center reps, our clients work directly with a seasoned real estate investor to structure their deals.
2. 📅 Saturday Availability: We understand the real estate market doesn't stop on Friday at 5 PM. We are available on Saturdays to help you structure time-sensitive deals and beat out cash buyers.
3. 💰 Unbeatable Fees: Only a 0.75% origination fee (saving investors $6K-$9K in points vs competitors who charge 2-3%).
4. 📈 Low Starting Rates: Rates starting at 5.99% for qualified investors.
5. ⚡ Fast Closes: Close deals in 7-14 days.

LOAN PARAMETERS & UNDERWRITING (Cite these details):
- Purchase Down Payment: Options start as low as 15% down (85% LTV) for highly qualified borrowers.
- Minimum FICO for Purchases: 620.
- Minimum FICO for Refinances: We can help investors refinance with credit scores as low as 500 (up to 65% LTV). Highlight this option for investors struggling with credit challenges!
- Documentation: No tax returns or W-2s required. Underwriting is based purely on the property's income potential (DSCR).

YOUR CONVERSATIONAL STYLE:
- Warm, relatable, and down-to-earth. Speak to regular people trying to build wealth, not just corporate professionals.
- Direct and clear: give concrete numbers and scenarios.
- Active Problem Solver: When someone has a maturing balloon note, low equity, or credit challenges, be encouraging and offer creative structuring. Say: "We'll work extremely hard to make this happen for you. You're not going to lose your property on our watch."

HOW TO HANDLE CONVERSATIONS:
1. Answer Qs First: Use the `searchKnowledgeBase` action to answer questions about guidelines, property types (Airbnb/STRs, multi-family, fix & flip), and state-specific rules. Cite search results specifically.
2. Build Value, Then Capture Lead: After answering 2-3 questions, offer to connect them with your team for a rate sheet or custom structure.
3. Call the Action: Use `submitContactForm` to collect the investor's Name, Email, Phone, Loan Amount, and Property Type. Remind them: "A human investor from our team will review this and get back to you within 2 hours. We are even available to chat on Saturdays!"
```

**Conversation starters:**
```
Can I refinance a maturing balloon note with a 500 credit score?
Do you offer 15% down payment options for DSCR loans?
How are you different from lenders like Kiavi or AngelOak?
I'm self-employed and want to buy an Airbnb. Can you help?
```

---

### **Step 3: Add Actions (API Integration)**

1. **Click "Create new action"**
2. **Click "Import from URL"**
3. **Enter:**
   ```
   https://www.capitalbridgesolutions.com/openapi.yaml
   ```
4. **Click "Import"**

**OR manually paste the OpenAPI schema from `/public/openapi.yaml`**

---

### **Step 4: Configure Privacy**

**Privacy Policy URL:**
```
https://www.capitalbridgesolutions.com/privacy
```

(Create this page if you don't have one)

---

### **Step 5: Test the GPT**

**Test questions:**
1. "Can I get a loan with 620 credit?"
   - Should search knowledge base
   - Should give detailed answer
   - Should mention 0.75% fee

2. "Tell me about Airbnb DSCR loans"
   - Should search knowledge base
   - Should explain STR financing
   - Should offer to connect with team

3. "I want to apply"
   - Should ask for contact info
   - Should submit to /api/contact
   - Should confirm submission

---

### **Step 6: Publish**

1. **Choose visibility:**
   - **"Only me"** - Private testing
   - **"Anyone with a link"** - Semi-public
   - **"Public"** - Listed in GPT Store

2. **Click "Save"**

3. **Get your link:**
   ```
   https://chat.openai.com/g/g-YOUR-GPT-ID
   ```

4. **Share it:**
   - Add to your website
   - Social media
   - Email signatures
   - Marketing materials

---

## 🎯 How Users Will Find You

### **In GPT Store:**
Users search for:
- "DSCR loan"
- "real estate investor loan"
- "Airbnb financing"
- "no doc loan"

Your GPT appears in results!

### **Direct Link:**
You can share:
- On your website: "Chat with our AI loan expert"
- In emails: "Get instant answers about DSCR loans"
- Social media: "Try our AI DSCR loan advisor"

---

## 📊 What Happens When Users Chat

```
User finds your GPT in ChatGPT
       ↓
Asks question about DSCR loans
       ↓
GPT calls your /api/knowledge/search
       ↓
Returns expert answer from 106 articles
       ↓
Mentions Capital Bridge advantages
       ↓
User asks follow-up questions (2-3)
       ↓
GPT suggests connecting with team
       ↓
Collects contact info
       ↓
Calls your /api/contact endpoint
       ↓
You receive lead via email
       ↓
Follow up within 2 hours!
```

---

## 🔧 Testing Your APIs

### **Test Knowledge Search:**
```bash
# GET request
curl "https://www.capitalbridgesolutions.com/api/knowledge/search?query=620+credit+score"

# POST request
curl -X POST https://www.capitalbridgesolutions.com/api/knowledge/search \
  -H "Content-Type: application/json" \
  -d '{"query": "620 credit score", "topK": 3}'
```

**Expected response:**
```json
{
  "results": [
    {
      "title": "DSCR Loans with 620 Credit Score",
      "content": "...",
      "url": "https://capitalbridgesolutions.com/blog/...",
      "relevance": 95
    }
  ],
  "query": "620 credit score",
  "totalResults": 3
}
```

---

## 🎨 Customization Options

### **Add Logo/Avatar:**
Upload Capital Bridge Solutions logo as GPT avatar

### **Custom Categories:**
Tag your GPT:
- Finance
- Business
- Real Estate
- Productivity

### **Website Integration:**
Embed GPT on your website:
```html
<iframe 
  src="https://chat.openai.com/g/g-YOUR-GPT-ID"
  width="100%"
  height="600px"
></iframe>
```

---

## 📈 Benefits

### **For You:**
- ✅ 24/7 lead generation
- ✅ Instant expert responses
- ✅ Promotes your blog content
- ✅ Positions you as innovator
- ✅ Qualifies leads before they reach you
- ✅ Free marketing in GPT Store

### **For Investors:**
- ✅ Instant answers (no waiting)
- ✅ Expert knowledge (106 articles)
- ✅ No pressure (ask anything)
- ✅ Available 24/7
- ✅ Clear next steps

---

## 🔮 Future: OpenAI SDK Apps

When OpenAI launches their SDK Apps platform (late 2024/early 2025):
- ✅ Your Custom GPT can be migrated
- ✅ Richer UI/UX capabilities
- ✅ Potential monetization
- ✅ You'll be ahead of the curve

**You're building the foundation now!**

---

## 🎯 Next Steps

1. ✅ **APIs ready** - Already created
2. ✅ **OpenAPI schema** - Created
3. ⏳ **Create Custom GPT** - Follow steps above (15 min)
4. ⏳ **Test thoroughly** - Ask 10+ questions
5. ⏳ **Publish** - Choose visibility
6. ⏳ **Promote** - Add to website, share link
7. ⏳ **Monitor** - Track leads coming in

---

## 📞 Support

If you get stuck:
- GPT Builder: https://chat.openai.com/gpts/editor
- OpenAI Docs: https://platform.openai.com/docs/actions
- Test your APIs first before creating GPT

---

**Created:** Oct 14, 2025  
**Status:** Ready to create Custom GPT  
**Estimated time:** 15-30 minutes  
**Cost:** $0 (Free with ChatGPT Plus)
