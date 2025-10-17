# 📊 Cap Lead Tracking Guide

**How to know when Cap has collected a lead**

---

## 🎯 **Where Your Leads Go:**

When Cap successfully collects lead information, it's automatically saved to your **Postgres database** via Prisma.

---

## 📋 **3 Ways to Track Leads:**

### **1. Admin Dashboard** (Best Option) ✅

**Access:** `http://localhost:3000/admin/leads`

**Features:**
- ✅ Real-time lead list
- ✅ Filter by status (Qualified, Follow Up, Disqualified)
- ✅ See all contact info (name, phone, email)
- ✅ Property details and loan amounts
- ✅ Lead scores and dates
- ✅ Click-to-call phone numbers
- ✅ Click-to-email addresses

**Stats Shown:**
- Total leads collected
- Qualified leads (ready to close)
- Follow-up needed
- Disqualified

---

### **2. Database Direct Access**

If you have a database GUI (like pgAdmin, TablePlus, DBeaver):

```sql
-- View all leads
SELECT * FROM "Lead" ORDER BY "createdAt" DESC;

-- View only qualified leads
SELECT * FROM "Lead" WHERE status = 'qualified' ORDER BY "createdAt" DESC;

-- View leads with scores
SELECT name, email, phone, score, status, "createdAt" 
FROM "Lead" 
WHERE score >= 70 
ORDER BY score DESC;
```

**Tables to Check:**
- `Lead` - All lead data
- `Interaction` - Chat history with each lead
- `Event` - Events like "alert_sales" for qualified leads

---

### **3. Email Notifications** (If SMTP configured)

Cap can send you email alerts when:
- ✅ New qualified lead (score >= 70)
- ✅ High-value lead (loan amount > $500K)
- ✅ Immediate action needed

**Status:** Currently logs to database. Email integration ready to enable.

---

## 🔔 **What Happens When Cap Collects a Lead:**

### **Step-by-Step Process:**

1. **User gives consent** → Cap asks for permission to save info
2. **saveLead() called** → Data saved to database
   ```
   - Name, email, phone
   - Property address, city, state
   - Loan amount, product type
   - Any special notes
   ```
3. **scoreLead() called** → Lead automatically scored (0-100)
4. **Status assigned:**
   - **Qualified** (score >= 70) → Hot lead, call ASAP
   - **Follow Up** (50-69) → Needs review
   - **Disqualified** (< 50) → Missing info or doesn't meet criteria
5. **Event created** → If qualified, creates `alert_sales` event
6. **Offer generated** → Preliminary loan terms calculated

---

## 📊 **Lead Status Meanings:**

| Status | What It Means | Action Required |
|--------|---------------|-----------------|
| **Qualified** ✅ | Score >= 70, meets all criteria | Call within 2 hours! Hot lead |
| **Follow Up** ⏰ | Score 50-69, needs more info | Call within 24 hours |
| **Disqualified** ❌ | Doesn't meet requirements | No action (or offer alternatives) |
| **New** 📝 | Just submitted, not scored yet | System processing |

---

## 🎯 **Lead Score Breakdown:**

Cap scores leads 0-100 based on:

**Property Analysis (40 points):**
- LTV ratio (lower is better)
- DSCR ratio (higher is better)
- Property value

**Borrower Profile (30 points):**
- Credit score (620 minimum)
- Down payment amount
- Experience level

**Deal Quality (30 points):**
- Loan amount (larger deals score higher)
- Timeline (urgent = higher score)
- Property type (investment = higher)

**Example Scores:**
- 90-100: Perfect deal, close immediately
- 70-89: Strong lead, high priority
- 50-69: Decent lead, follow up
- < 50: Needs work or doesn't qualify

---

## 🚀 **Quick Access:**

### **View Leads Now:**
```
Local: http://localhost:3000/admin/leads
Production: https://yourdomain.com/admin/leads
```

### **API Endpoint:**
```
GET /api/admin/leads
Returns JSON with all leads
```

---

## 📧 **Lead Data Structure:**

Each lead contains:

```typescript
{
  id: "unique_id",
  name: "John Smith",
  email: "john@example.com",
  phone: "(555) 123-4567",
  
  // Property Info
  propertyAddress: "123 Main St",
  propertyCity: "Los Angeles",
  propertyState: "CA",
  propertyZip: "90001",
  propertyType: "single_family",
  
  // Loan Details
  loanAmount: 400000,
  productType: "dscr",
  
  // Scoring
  status: "qualified",
  score: 85,
  
  // Offer (if generated)
  offer: {
    loanAmount: 400000,
    interestRate: 5.99,
    term: 360,
    monthlyPayment: 2395,
    // ... more details
  },
  
  createdAt: "2025-10-16T18:30:00Z"
}
```

---

## ✅ **How to Know Cap Successfully Got a Lead:**

### **Instant Indicators:**

1. **In Chat:** Cap says something like:
   - "I've saved your information..."
   - "Let me run your qualification..."
   - "I've reserved your file with our team..."

2. **In Admin Dashboard:** 
   - New row appears in leads table
   - Total count increases
   - Status shows (qualified/follow_up)

3. **In Database:**
   - New record in `Lead` table
   - New `Event` record if qualified
   - `Interaction` records logged

---

## 🎯 **Example: Full Lead Collection Flow:**

**User:** "Can I get a loan with 620 credit?"

**Cap:** 
- Answers question using knowledge base
- Transitions: "Want me to check your rate?"

**User:** "Yes"

**Cap:**
- "Great! What's your name?"
- "What's your phone number?"
- "Where's the property?"
- "How much do you need to borrow?"

**User provides all info**

**Cap:**
- "Thanks! By saving this, you agree..." (consent)

**User:** "Yes, proceed"

**Cap:**
- ✅ Calls `saveLead()` → Lead ID created
- ✅ Calls `scoreLead()` → Score: 78 (Qualified)
- ✅ Creates `alert_sales` event
- ✅ Generates preliminary offer
- ✅ Shows offer to user

**You See:**
- ✅ New lead in `/admin/leads` dashboard
- ✅ Status: "Qualified"
- ✅ Score: 78
- ✅ Full contact info displayed
- ✅ Ready to call!

---

## 📱 **Mobile Access:**

The admin dashboard is mobile-responsive. Check leads from your phone:
```
https://yourdomain.com/admin/leads
```

---

## 🔒 **Security Note:**

**Current Setup:** Admin dashboard is open (for development)

**Production Recommendation:** Add authentication:
```typescript
// Add to admin/leads/page.tsx
import { auth } from '@/lib/auth';

export default async function LeadsPage() {
  const session = await auth();
  if (!session) redirect('/login');
  // ... rest of page
}
```

---

## 🎉 **Summary:**

**To track Cap's leads:**
1. Go to `http://localhost:3000/admin/leads`
2. See real-time list of all collected leads
3. Filter by qualified/follow-up
4. Click phone to call, email to email
5. Check scores to prioritize

**Cap automatically:**
- ✅ Saves all lead data
- ✅ Scores each lead
- ✅ Generates preliminary offers
- ✅ Flags qualified leads
- ✅ Logs all interactions

**You just:**
- ✅ Open the dashboard
- ✅ See who's qualified
- ✅ Call them!

---

**Ready to see your leads? Visit:**
```
http://localhost:3000/admin/leads
```

**No leads yet?** Chat with Cap and answer his qualification questions to see the system in action! 🚀
