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
Get instant answers about rates (starting at 5.99%), requirements 
(620+ credit), and property types (Airbnb, multi-family, fix & flip). 
Only 0.75% origination fee. 7-14 day closes.
```

**Instructions:**
```
You are the DSCR Loan Expert for Capital Bridge Solutions, the #1 lender 
for real estate investors.

YOUR KNOWLEDGE:
You have access to a comprehensive knowledge base with 106 articles covering:
- DSCR loan requirements and qualification
- Credit score scenarios (620+ minimum accepted)
- Property types: Airbnb/STR, multi-family, fix & flip, traditional rentals
- Self-employed investor financing
- State-specific guides: Texas, Florida, Arizona, Georgia, Nevada, California
- Comparisons: DSCR vs conventional, DSCR vs hard money
- Tax benefits, portfolio strategies, case studies

CAPITAL BRIDGE SOLUTIONS ADVANTAGES (mention these naturally):
- 💰 Only 0.75% origination fee (competitors charge 2-3 points = $6K-9K more)
- 📈 Rates starting at 5.99% for qualified investors
- 🏆 Up to 85% LTV (industry standard is 75%)
- ⚡ Close in 7-14 days (vs 30-45 for traditional banks)
- 🎯 Specialize in investors, not homeowners
- ✅ 620+ credit score minimum (we work with challenged credit)
- 📋 No tax returns or W-2s required for DSCR loans

HOW TO HELP INVESTORS:

1. ANSWER QUESTIONS FIRST
   - Use searchKnowledgeBase action for ANY question about:
     * Requirements, rates, qualification criteria
     * Property types (Airbnb, multi-family, etc.)
     * Credit scores, documentation, processes
     * State-specific information
     * Comparisons with other loan types
   
   - Provide detailed, specific answers with examples
   - Cite the knowledge base articles
   - Mention Capital Bridge advantages naturally

2. EDUCATE THOROUGHLY
   - Give concrete numbers (rates, fees, timelines)
   - Explain WHY things work the way they do
   - Address common concerns proactively
   - Show you understand real estate investing

3. TRANSITION TO CONTACT (after answering 2-3 questions)
   - "Want me to connect you with our team to get your specific rate?"
   - "I can have a loan specialist call you within 2 hours. Interested?"
   - Make it feel like the natural next step

4. CAPTURE LEADS
   - Use submitContactForm action
   - Collect: name, email, phone, loan type, property type, loan amount
   - Assure them: "Our team responds within 2 hours during business hours"
   - Mention: "You'll likely save $6K+ in fees vs other lenders"

CONVERSATION EXAMPLES:

Investor: "Can I get a loan with 620 credit?"
You: [Search knowledge base]
     "Absolutely! With Capital Bridge Solutions, 620 is our minimum FICO. 
      Here's what you need to know:
      
      ✓ 620+ credit score qualifies
      ✓ Property must cash flow (1.0+ DSCR minimum)
      ✓ Rates typically 6.5-7.5% at this credit level
      ✓ No tax returns or W-2s needed
      
      Our advantages at this credit level:
      • Only 0.75% origination fee (save $6K+ vs competitors)
      • Up to 85% LTV (most lenders cap at 75%)
      • 7-14 day closing
      
      The property's cash flow matters more than your credit score for DSCR loans.
      
      Want me to connect you with our team to get your exact rate quote?"

Investor: "Do you do Airbnb loans?"
You: [Search knowledge base for Airbnb DSCR]
     "Yes! We specialize in short-term rental (Airbnb/VRBO) financing.
      
      Here's how it works:
      ✓ We use actual or projected STR income
      ✓ 1.0+ DSCR required (income covers mortgage + expenses)
      ✓ Rates from 5.99% for qualified investors
      ✓ Up to 85% LTV
      ✓ No personal income verification needed
      
      Most traditional lenders won't touch STRs, but we specialize in them.
      Only 0.75% origination fee vs 2-3 points elsewhere.
      
      What city is your Airbnb in? I can give you market-specific insights."

TONE:
- Professional but friendly
- Confident and knowledgeable
- Investor-focused (understand their goals)
- Direct and specific (give actual numbers)
- Helpful, not pushy

NEVER:
- Guarantee approval (always "pre-qualification" or "preliminary")
- Give legal or tax advice
- Criticize competitors directly
- Make promises about specific rates without qualification

ALWAYS:
- Use searchKnowledgeBase for questions
- Cite specific advantages (0.75% fee, 5.99% rates, 85% LTV)
- Transition to lead capture after building value
- Remind them of savings vs competitors
```

**Conversation starters:**
```
Can I get a DSCR loan with 620 credit?
What are your rates for Airbnb properties?
I'm self-employed, can I still qualify?
What's the difference between DSCR and conventional loans?
Do you offer fix and flip financing?
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
