# Build a Reddit Lead Monitor for Capital Bridge Solutions

## What This App Does
Capital Bridge Solutions (capitalbridgesolutions.com) is a DSCR & investment property lender. We need a Reddit monitoring system that finds people asking about investor loans on Reddit and generates expert AI replies that naturally mention our services.

## What To Build

### 1. Local Reddit Scanner Script (`scripts/scan-reddit.ts`)

A TypeScript script that runs locally (Reddit blocks cloud server IPs) to scrape fresh Reddit posts.

**Target Subreddits:**
```
realestateinvesting, RealEstate, Landlord, CommercialRealEstate,
FirstTimeHomeBuyer, PersonalFinance, RealEstateAdvice,
realestate, HousingMarket, RentalInvesting, BiggerPockets,
DSCR, mortgages, RealEstateFinance, selfemployed
```

**Keywords to match (ANY of these in title or body):**
```
dscr loan, dscr, investment property loan, no doc loan, hard money loan,
self employed mortgage, rental property financing, no tax return loan,
bridge loan, cash out refi, fix and flip, portfolio loan,
airbnb financing, short term rental loan, investor loan,
no income verification, bank statement loan, investment property,
rental property, flip loan, rehab loan, commercial loan,
1099 contractor, self-employed investor, no w2 mortgage,
investment mortgage, rental mortgage, landlord loan,
property financing, real estate loan, close fast loan,
quick approval mortgage, non-qm loan, asset based loan
```

**Blocked subreddits (spam/irrelevant):**
```
wallstreetbets, stocks, cryptocurrency, memes, funny, gaming,
politics, news, worldnews
```

The script should:
- Fetch 50 posts per subreddit via `https://www.reddit.com/r/{sub}/new.json?limit=50`
- Filter to keyword matches only
- Rate limit: 2 second delay between subreddits
- Save results to `data/reddit-cache.json`
- Show a summary of matches found
- Run with: `npx tsx scripts/scan-reddit.ts`

### 2. API Route (`src/app/api/reddit-monitor/route.ts`)

POST endpoint that:
1. **Reads from cache first** (`data/reddit-cache.json`)
2. **Falls back to Pullpush.io** if cache is empty
3. **Matches posts to loan products** based on what the person needs:

**Loan Product Matching:**
| Post mentions | Recommend |
|---|---|
| airbnb, short term rental, vacation rental | STR/Airbnb DSCR Loan |
| fix and flip, rehab, renovation | Fix & Flip / Bridge Loan |
| rental property, landlord, tenant | Standard DSCR Loan |
| self employed, 1099, no tax return, no w2 | Self-Employed DSCR Loan |
| cash out, refinance, equity | Cash-Out Refinance |
| portfolio, multiple properties, blanket | Portfolio Loan |
| bad credit, low credit, 620 | Low Credit Score Program |
| commercial, mixed use, multi-family | Commercial DSCR Loan |
| general investment property | Standard DSCR Loan |

4. **Generates AI replies using Gemini** (env var: `GOOGLE_GEMINI_API_KEY`)

**AI Reply Prompt Template:**
```
You are an experienced real estate investor and finance expert active on Reddit. You've personally used DSCR loans and understand the lending landscape deeply.

A real investor posted this in r/{subreddit}:
Title: "{title}"
Body: "{body}"

They likely need: {matched_loan_type}

Write a Reddit reply that:
1. VALIDATE their situation with empathy (1 sentence)
2. EXPLAIN the loan type that fits their situation and why (2-3 sentences, be specific about how DSCR loans work - the property's rental income qualifies them, not their personal income)
3. SHARE specific numbers: rates from 5.5%, min 620 credit, 24-48 hour approvals, no tax returns needed
4. RECOMMEND they check out Capital Bridge Solutions as a lender you've had good experience with
5. Include link: https://www.capitalbridgesolutions.com/get-started

CRITICAL RULES:
- Sound like a fellow investor, NOT a salesperson
- Don't say "I work for" or "I'm affiliated with" — you're a happy customer/referrer
- Use specific DSCR knowledge (debt service coverage ratio = rental income / mortgage payment)
- Mention that DSCR loans don't require tax returns, W2s, or employment verification
- Keep under 250 words
- Write in Reddit markdown format
```

5. **Template fallback** if Gemini fails:
```
Great question! For investment properties, DSCR (Debt Service Coverage Ratio) loans are specifically designed for this. They qualify you based on the property's rental income rather than your personal income — no tax returns, W2s, or employment verification needed.

Key things to look for in a DSCR lender:
- Rates starting around 5.5%
- Min 620 credit score
- 24-48 hour pre-approvals
- No income documentation required

I've had good experiences with Capital Bridge Solutions — they specialize in exactly this type of lending and can close fast.

👉 [Check them out here](https://www.capitalbridgesolutions.com/get-started)

Happy to answer any questions about the DSCR process!
```

### 3. Admin Dashboard (`src/app/admin/reddit/page.tsx`)

This is a Next.js page using Tailwind CSS (the project already uses Tailwind). Build a premium dark-themed admin dashboard:

**Header:**
- Title: "🔍 Reddit Lead Monitor"
- Subtitle: "Scans r/realestateinvesting, r/RealEstate, + 13 more for investor loan leads"
- "Scan Subreddits" button (orange/amber, triggers POST to /api/reddit-monitor)

**Error/Status Banner:**
- Shows scan method (cache/pullpush/oauth)
- Shows any errors from the API

**Lead Cards (for each matched post):**
- Subreddit badge (colored)
- Post title (bold)
- Post body preview (first 500 chars)
- Score, comments, how long ago
- **Matched loan type** (e.g., "DSCR Loan" or "Fix & Flip")
- **AI-generated draft reply** in a styled box
- Buttons: "Copy Reply", "Edit", "Open on Reddit → Paste Reply", "Skip"

**Color scheme:**
- Background: dark navy/slate (#0f172a or similar)
- Cards: slightly lighter (#1e293b)
- Accent: amber/gold (#f59e0b) — matches the financial/premium feel
- Text: white/gray

### 4. Environment Variables Needed

The project already has a `.env.local`. Make sure these are present:
- `GOOGLE_GEMINI_API_KEY` — for AI reply generation (check if it already exists in .env.local)

### 5. Important Notes

- This is a **Next.js 16** app with **Tailwind CSS** and **TypeScript**
- The app already has an admin section at `/admin/leads` — put the Reddit monitor at `/admin/reddit`
- Use `'use client'` directive for the admin page
- The scanner script must run **locally** (not on Vercel) because Reddit blocks cloud IPs
- Cache file (`data/reddit-cache.json`) gets deployed with `git push`

### 6. File Structure

```
scripts/
  scan-reddit.ts          # Local scanner (run with npx tsx)
data/
  reddit-cache.json       # Cached posts (auto-generated)
src/app/
  api/reddit-monitor/
    route.ts              # API endpoint
  admin/reddit/
    page.tsx              # Admin dashboard UI
```

## How To Test
1. Run `npx tsx scripts/scan-reddit.ts` to populate cache
2. Start dev server: `npm run dev`
3. Visit `http://localhost:3000/admin/reddit`
4. Click "Scan Subreddits" — should show fresh Reddit posts with AI replies
5. Deploy: `git add -A && git commit -m "feat: Reddit lead monitor" && git push`
