# 🏠 Cap's Comps & Market Data Capability

## ✅ **YES - CAP CAN PULL COMPS NOW!**

---

## 🎯 **CURRENT CAPABILITIES:**

### **1. Perplexity Search (Already Integrated)**

**What It Does:**
- Searches the entire internet for real-time data
- Returns cited sources (Zillow, Redfin, Realtor.com, etc.)
- Pulls rental rates, sale prices, market trends
- Gets property-specific information

**Already Works For:**
- ✅ Rental rates in specific areas
- ✅ Market trends and analysis
- ✅ Property values
- ✅ Neighborhood data
- ✅ Recent sales (comps)

---

## 💬 **EXAMPLE QUERIES CAP CAN HANDLE NOW:**

### **Query 1: Rental Comps**
```
User: "What's the average rent for a 3BR house in Point Loma, San Diego?"

Cap: [Calls Perplexity]
"Let me pull current rental data for Point Loma...

## Point Loma Rental Market:

**3BR Houses:**
- **Average Rent:** $3,800-$4,500/month
- **Market Trend:** Up 5.2% year-over-year
- **Days on Market:** 12-18 days average
- **Source:** Zillow Rent Index, December 2024

💡 Pro tip: Point Loma has strong military demand (Naval Base nearby), 
which means stable occupancy year-round. Properties within walking 
distance to the base command premium rents."
```

---

### **Query 2: Sale Price Comps**
```
User: "What are similar houses selling for in East Sacramento?"

Cap: [Calls Perplexity]
"Let me check recent sales in East Sacramento...

## Recent Comps - East Sacramento:

**3BR/2BA Single-Family (1,500-1,800 sq ft):**
- **Recent Sales:** $525K-$625K
- **Price per Sq Ft:** $350-$370
- **Days on Market:** 15-25 days
- **Market Status:** Seller's market (multiple offers common)
- **Source:** Sacramento MLS data via Redfin, January 2025

Here's what this means for your investment:
- At $575K purchase with $3,200/month rent → DSCR of 1.25
- Properties in this range qualify easily
- Strong appreciation trend (8% YoY)

Want me to run the exact numbers on a specific property?"
```

---

### **Query 3: ARV (After Repair Value) for Fix & Flip**
```
User: "I'm flipping a house in Phoenix. What should my ARV be?"

Cap: [Calls Perplexity]
"Let me pull recent sales data for Phoenix fix & flip comps...

## Phoenix ARV Analysis:

**Recently Renovated Comps (Within 1 mile of your property):**
- 123 Oak Street: Sold $485K (renovated, 1,650 sq ft)
- 456 Maple Ave: Sold $510K (renovated, 1,800 sq ft)
- 789 Pine Court: Sold $465K (renovated, 1,550 sq ft)

**Your Property (1,700 sq ft):**
- **Conservative ARV:** $480K-$495K
- **Price per Sq Ft:** $282-$291
- **Market Condition:** Moving fast (14 days avg)
- **Source:** Phoenix MLS via Zillow, recent 60-day sales

💡 Pro tip: Phoenix renovated homes are selling 22% faster than 
un-renovated. Your ARV looks solid - just make sure your rehab 
budget includes 10-15% buffer for surprises.

Ready to get pre-approved for the purchase?"
```

---

### **Query 4: Investment Property Analysis**
```
User: "Is Austin, TX a good market for rental properties?"

Cap: [Calls Perplexity]
"Great question! Let me pull current Austin market data...

## Austin Rental Investment Analysis:

**Market Fundamentals:**
- **Population Growth:** +2.5% annually (top 5 in US)
- **Job Growth:** Tech sector adding 15K jobs/year
- **Average Rent:** $2,100 for 2BR, up 7.3% YoY
- **Median Home Price:** $450K
- **Rent-to-Price Ratio:** 0.56% (good for cash flow)
- **Vacancy Rate:** 4.2% (healthy)

**Comps - Typical Investment Property:**
- $450K purchase, $2,400/month rent
- DSCR: 1.18-1.25 (qualifies)
- Cash flow: $400-$500/month
- Cap rate: 5.5-6%

**Verdict:** 
Austin is a STRONG market for rentals. Growing economy, tech jobs, 
university demand. Just watch for property taxes (2.5% of value annually).

**Sources:** Austin Board of Realtors, Zillow Research, Texas REIA

Want me to run numbers on a specific Austin property?"
```

---

## 🚀 **HOW CAP USES PERPLEXITY FOR COMPS:**

### **What Happens Behind the Scenes:**

1. **User Asks for Comps/Market Data**
   - "What are houses selling for in [neighborhood]?"
   - "What's rent for a 3BR in [city]?"
   - "Is [market] good for investment?"

2. **Cap Calls Perplexity API**
   ```typescript
   perplexitySearch({
     query: "3 bedroom house rental rates Point Loma San Diego 2025",
     domains: ['zillow.com', 'redfin.com', 'realtor.com'],
     recencyDays: 30
   })
   ```

3. **Perplexity Searches Internet**
   - Real-time data from Zillow, Redfin, Realtor.com
   - Recent listings and sales
   - Market trends and analysis
   - Returns cited sources

4. **Cap Presents Results**
   - Formats as scannable markdown
   - Provides context and insights
   - Cites sources
   - Transitions to lead capture

---

## 💡 **ENHANCED COMPS STRATEGIES:**

### **Strategy 1: Specific Property Comps**

**Query Format:**
```
"3 bedroom 2 bathroom house comps within 1 mile of [address] sold in last 60 days"
```

**What You Get:**
- Recent sales (30-90 days)
- Price per square foot
- Days on market
- Property features
- Cited sources

---

### **Strategy 2: Rental Rate Analysis**

**Query Format:**
```
"Average rental rates for [property type] in [neighborhood] [city] [state] current 2025"
```

**What You Get:**
- Current rental rates
- Year-over-year trends
- Occupancy rates
- Market velocity
- Source citations

---

### **Strategy 3: Investment Property Screening**

**Query Format:**
```
"[City] [State] real estate investment market rental income cash flow analysis 2025"
```

**What You Get:**
- Market fundamentals
- Population/job growth
- Rent-to-price ratios
- Cap rates
- Investment outlook

---

## 🎯 **ENHANCE CAP'S COMPS CAPABILITY:**

### **Add These Prompts to Make Comps Automatic:**

<function_calls>
<invoke name="edit">
<parameter name="file_path">c:\Users\hamil\dscr_loan_leads\src\constants\prompts.ts
