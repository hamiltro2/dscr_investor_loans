# How to See Mentions & Analytics from ChatGPT

## 📊 Where to Find Cap Analytics

---

## 1️⃣ Built-in ChatGPT Analytics

### Access Your GPT Dashboard:

1. **Go to ChatGPT:**
   - Visit: https://chatgpt.com/

2. **Navigate to Your GPTs:**
   - Click your profile icon (bottom left)
   - Select **"My GPTs"**
   - Or go directly to: https://chatgpt.com/gpts/mine

3. **Select Cap:**
   - Find "Cap - DSCR Loan Advisor for Real Estate Investors"
   - Click on it

4. **View Analytics (if available):**
   - Look for **"Analytics"** or **"Insights"** tab
   - May show:
     - Total conversations
     - Daily/weekly active users
     - Conversation length
     - Popular queries
     - Retention rate
     - Feedback (thumbs up/down)

**Note:** ChatGPT analytics availability varies. If you don't see detailed analytics, they may be rolling out gradually or only available to certain GPT creators.

---

## 2️⃣ Track Mentions via Lead Capture

### Your Existing System (✅ Already Set Up):

Every time someone provides their contact info through Cap, you get:

**In Email Notifications:**
```
From: Capital Bridge Solutions
Subject: 💬 New ChatGPT Lead: [Name]

Channel: chatgpt_app ← This identifies it came from Cap
```

**In Supabase Database:**
```sql
SELECT * FROM "Lead" WHERE channel = 'chatgpt_app' ORDER BY "createdAt" DESC;
```

**View in Code:**
```bash
node check-leads.mjs
```

This shows all ChatGPT leads with details.

---

## 3️⃣ Track External Traffic to Cap

### Use UTM Parameters:

When sharing Cap's link on social media, blogs, etc., use tracking parameters:

**Base Link:**
```
https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors
```

**With UTM Tracking:**

#### LinkedIn:
```
https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors?utm_source=linkedin&utm_medium=social&utm_campaign=cap_launch
```

#### Twitter:
```
https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors?utm_source=twitter&utm_medium=social&utm_campaign=cap_launch
```

#### Blog Posts:
```
https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors?utm_source=blog&utm_medium=article&utm_campaign=dscr_guide
```

#### Email:
```
https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors?utm_source=email&utm_medium=newsletter&utm_campaign=cap_launch
```

**Track these in:**
- Google Analytics (if you have a redirect through your website)
- Link shortener with analytics (Bitly, Rebrandly)

---

## 4️⃣ Use Link Shorteners with Analytics

### Bitly (Recommended):

1. **Create Bitly Account:** https://bitly.com/
2. **Shorten Cap's URL**
3. **Get Custom Short Link:**
   ```
   bit.ly/cap-dscr-ai
   ```
4. **View Analytics:**
   - Total clicks
   - Geographic location
   - Referrer sources
   - Time of day
   - Device types

### Rebrandly (Custom Domain):

1. **Create custom branded link:**
   ```
   capitalbridge.link/cap
   ```
2. **Track all traffic through your dashboard**

### Different Links for Different Channels:

```
bit.ly/cap-linkedin     (LinkedIn posts)
bit.ly/cap-twitter      (Twitter posts)
bit.ly/cap-email        (Email campaigns)
bit.ly/cap-blog         (Blog posts)
bit.ly/cap-biggerpockets (Forum posts)
```

**Benefit:** Know exactly where your traffic comes from!

---

## 5️⃣ Google Analytics Setup

### If You Want Website Analytics:

Create a redirect page on your website:

**File:** `/src/app/cap/page.tsx`

```typescript
'use client';

import { useEffect } from 'react';

export default function CapRedirect() {
  useEffect(() => {
    // Track the page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cap_click', {
        event_category: 'ChatGPT',
        event_label: 'Cap Redirect',
        value: 1
      });
    }
    
    // Redirect to ChatGPT
    window.location.href = 'https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">Redirecting to Cap AI...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
      </div>
    </div>
  );
}
```

**Now share:**
```
https://www.capitalbridgesolutions.com/cap
```

**Track in Google Analytics:**
- Page views on `/cap`
- Time spent
- Bounce rate
- Geographic data

---

## 6️⃣ Social Media Analytics

### Track Engagement on Each Platform:

#### LinkedIn:
- Post impressions
- Clicks on Cap link
- Comments/reactions
- Shares

**LinkedIn Analytics → Content tab → Find your Cap posts**

#### Twitter/X:
- Tweet impressions
- Link clicks
- Retweets/likes
- Profile visits

**Twitter Analytics → Tweet activity**

#### Facebook:
- Post reach
- Link clicks
- Engagement rate

**Facebook Insights → Posts tab**

---

## 7️⃣ Monitor Brand Mentions

### Google Alerts:

Set up alerts for:
```
"Cap DSCR Loan Advisor"
"Capital Bridge Solutions ChatGPT"
"Cap AI DSCR"
```

**Setup:**
1. Go to: https://www.google.com/alerts
2. Create alerts for each term
3. Get daily/weekly email digests

### Social Listening Tools:

**Free:**
- TweetDeck (Twitter mentions)
- Google Alerts (web mentions)
- Reddit search (saved searches)

**Paid:**
- Brand24
- Mention
- Hootsuite

### Manual Searches:

**Weekly check:**
- Twitter: Search "Cap DSCR" or "Capital Bridge ChatGPT"
- Reddit: Search "DSCR loan AI" or "ChatGPT real estate"
- BiggerPockets: Search "Cap AI" or "DSCR ChatGPT"
- LinkedIn: Search "Cap DSCR Loan Advisor"

---

## 8️⃣ Lead Attribution Tracking

### In Your CRM/Database:

Track which channel each lead came from:

**Query your leads:**
```javascript
// check-leads.mjs already does this!
// Filter by channel
const chatgptLeads = leads.filter(lead => lead.channel === 'chatgpt_app');

console.log(`Total ChatGPT leads: ${chatgptLeads.length}`);
console.log(`Conversion rate: ${chatgptLeads.filter(l => l.status === 'qualified').length / chatgptLeads.length * 100}%`);
```

### Advanced Attribution:

**Track UTM parameters in lead data:**

Update `/api/chatgpt/save-lead/route.ts` to capture UTM params:

```typescript
// If user clicks from social media with UTM params, capture them
const source = req.query.utm_source || 'direct';
const medium = req.query.utm_medium || 'organic';
const campaign = req.query.utm_campaign || 'none';

// Save in lead notes
notes: `${notes}\n\nSource: ${source}, Medium: ${medium}, Campaign: ${campaign}`
```

---

## 9️⃣ Create a Dashboard

### Simple Spreadsheet Tracker:

**Google Sheets Columns:**
- Date
- Channel (LinkedIn, Twitter, Email, etc.)
- Cap Link Shared
- Clicks (from Bitly)
- Conversations Started (estimate)
- Leads Captured (from database)
- Qualified Leads
- Closed Deals
- Revenue

**Update Weekly**

### Example:

| Date | Channel | Clicks | Leads | Qualified | Closed | Revenue |
|------|---------|--------|-------|-----------|--------|---------|
| Nov 15 | LinkedIn | 42 | 3 | 2 | 0 | $0 |
| Nov 16 | Twitter | 28 | 1 | 1 | 0 | $0 |
| Nov 17 | Email | 156 | 8 | 5 | 1 | $12,500 |

---

## 🔟 Weekly Analytics Routine

### Every Monday Morning:

1. **Check ChatGPT Analytics** (if available)
   - Total conversations this week
   - Popular queries
   - Feedback scores

2. **Check Lead Database**
   ```bash
   node check-leads.mjs
   ```
   - Filter by last 7 days
   - Count ChatGPT leads
   - Note lead quality

3. **Check Bitly Links**
   - Total clicks per channel
   - Which posts drove most traffic
   - Geographic insights

4. **Check Social Media**
   - LinkedIn post performance
   - Twitter engagement
   - Facebook reach

5. **Update Dashboard**
   - Add new data to spreadsheet
   - Calculate conversion rates
   - Identify winning channels

6. **Plan Next Week**
   - Double down on what works
   - Adjust messaging
   - New content ideas

---

## 📈 Key Metrics to Track

### Primary Metrics:

1. **Cap Conversations/Week**
   - Goal: 100+
   - Current: [Check ChatGPT analytics]

2. **Leads from Cap/Month**
   - Goal: 50+
   - Current: [Check database]

3. **Lead Quality Score**
   - Qualified leads / Total leads
   - Goal: >40%

4. **Conversion Rate**
   - Closed deals / Total Cap leads
   - Goal: >10%

### Secondary Metrics:

5. **Click-Through Rate**
   - Clicks to Cap / Social impressions
   - Goal: >2%

6. **Conversation Starters Used**
   - Which starters get clicked most
   - Optimize based on data

7. **Avg Conversation Length**
   - Longer = more engaged
   - Goal: >5 messages

8. **Share Rate**
   - Users sharing Cap with others
   - Goal: >5% of users

---

## 🎯 Action Items

### Set Up Now (30 minutes):

- [ ] Create Bitly account
- [ ] Shorten Cap link with different variations
- [ ] Set up Google Alerts for Cap mentions
- [ ] Create analytics spreadsheet
- [ ] Check current ChatGPT analytics (if available)

### Do Weekly (15 minutes):

- [ ] Check Bitly click data
- [ ] Query database for new ChatGPT leads
- [ ] Search Twitter, Reddit, LinkedIn for Cap mentions
- [ ] Update analytics spreadsheet
- [ ] Plan next week's promotion

### Do Monthly (1 hour):

- [ ] Comprehensive analytics review
- [ ] ROI calculation (leads, revenue from Cap)
- [ ] Competitive analysis (check Kiavi, AngelOak mentions)
- [ ] Strategy adjustment based on data
- [ ] Update Cap based on user behavior

---

## 📊 Sample Analytics Report Template

```markdown
# Cap Monthly Analytics - [Month Year]

## Overview
- Total Conversations: [X]
- Total Leads: [X]
- Qualified Leads: [X]
- Closed Deals: [X]
- Revenue Generated: $[X]

## Traffic Sources
1. LinkedIn: [X] clicks, [X] leads
2. Twitter: [X] clicks, [X] leads
3. Email: [X] clicks, [X] leads
4. Blog: [X] clicks, [X] leads
5. Direct/GPT Store: [X] leads

## Top Performing Content
1. [LinkedIn post about X] - [X] clicks
2. [Blog post about Y] - [X] clicks
3. [Email campaign Z] - [X] clicks

## User Behavior
- Most popular conversation starters:
  1. [Starter 1]
  2. [Starter 2]
  3. [Starter 3]

- Most common questions:
  1. [Question 1]
  2. [Question 2]
  3. [Question 3]

## Wins
- [Success story 1]
- [High-quality lead example]
- [User testimonial]

## Areas for Improvement
- [Low-performing channel]
- [Content gap identified]
- [Technical issue found]

## Next Month Goals
- [ ] Increase conversations by [X%]
- [ ] Launch [X] new content pieces
- [ ] Test [X] new promotion strategy
- [ ] Update Cap with [X] new features

## Action Items
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

---

## 🔗 Quick Links

- **Cap ChatGPT:** https://chatgpt.com/g/g-6918c503a9088191bf61ea1f0f10fe20-cap-dscr-loan-advisor-for-real-estate-investors
- **Bitly Dashboard:** https://bitly.com/
- **Google Alerts:** https://www.google.com/alerts
- **Google Analytics:** https://analytics.google.com/
- **Lead Database Query:** `node check-leads.mjs`

---

**Last Updated:** November 15, 2024
