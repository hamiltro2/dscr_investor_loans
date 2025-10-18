# 🧪 Complete Flow Testing Guide - Cap AI Assistant

## 🎯 **WHAT WE'RE TESTING:**

1. ✅ Voice chat lead capture (saveLead → scoreLead → scheduleCall)
2. ✅ Text chat with image upload (GPT-4o Vision)
3. ✅ Database operations (Prisma)
4. ✅ Email notifications
5. ✅ Analytics tracking
6. ✅ Multi-step tool flows

---

## 📋 **PRE-TEST CHECKLIST:**

### **1. Environment Variables:**
```bash
# Check .env.local has:
- OPENAI_API_KEY=sk-...
- DATABASE_URL=postgresql://...
- SMTP_HOST=smtp.gmail.com
- SMTP_USER=your-email@gmail.com
- SMTP_PASSWORD=your-app-password
```

### **2. Database Connection:**
```bash
# Test Prisma connection
npx prisma db push
npx prisma generate
```

### **3. Development Server:**
```bash
# Start server
npm run dev
# Should be running on http://localhost:3000
```

---

## 🧪 **TEST 1: VOICE CHAT LEAD CAPTURE**

### **Objective:**
Verify voice chat can capture, score, and schedule leads with full database integration.

### **Steps:**

#### **1. Start Voice Chat:**
1. Open browser: `http://localhost:3000`
2. Click chat widget (bottom right)
3. Switch to "Voice" tab
4. Click "Start Talking to Cap"
5. Allow microphone access

#### **2. Initiate Lead Capture:**
```
You: "I want to get pre-approved for a DSCR loan"

Expected Response:
Cap: "Perfect! Let me get your information. What's your full name?"
```

#### **3. Provide Information:**
```
You: "John Test Investor"
Cap: "Got it. Best number to reach you?"

You: "555-123-4567"
Cap: "Great. And your email address?"

You: "john.test@example.com"
Cap: "What type of financing are you looking for?"

You: "DSCR loan for a rental property"
Cap: "Do I have your permission to save this information?"

You: "Yes"
```

#### **4. Expected Auto-Flow:**
```
[saveLead tool executes]
Cap: "Perfect! I've saved your information."

[scoreLead tool executes automatically]
Cap: "Let me analyze your qualification... 
     You're pre-qualified with a score of XX/100.
     You qualify for up to $XXX,XXX at X.XX% rate."

Cap: "Want to schedule a call with our lending team?"

You: "Yes"

[scheduleCall tool executes]
Cap: "Here's your scheduling link: [URL]"
```

### **5. Verify in Database:**

Open new terminal and run:
```bash
# Check if lead was created
npx prisma studio
```

**In Prisma Studio, verify:**
- ✅ New lead exists in `Lead` table
- ✅ `name` = "John Test Investor"
- ✅ `email` = "john.test@example.com"
- ✅ `phone` = "555-123-4567"
- ✅ `channel` = "voice_chat"
- ✅ `score` exists (0-100)
- ✅ `status` = "qualified" or "follow_up"
- ✅ `offer` field has JSON data
- ✅ `consentAt` has timestamp

**In `Interaction` table:**
- ✅ Multiple interactions logged
- ✅ toolName = "saveLead"
- ✅ toolName = "scoreLead"
- ✅ toolInput and toolOutput populated

**In `Event` table:**
- ✅ Event with type = "alert_sales" (if qualified)
- ✅ Event with type = "schedule" (if scheduled)

### **6. Check Console Logs:**

Look for these log messages:
```
[Voice Tools] Executing: saveLead
[Voice Tools] Lead saved: clx123abc NEW
[Voice Tools] Executing: scoreLead
[Voice Tools] Lead scored: clx123abc qualified 85
[Voice Email] Sent notification for John Test Investor (qualified)
```

### **7. Check Email:**

**If lead is qualified (score > 70):**
- ✅ Check inbox: loans@capitalbridgesolutions.com
- ✅ Subject: "🔥 New Qualified Lead from VOICE CHAT: John Test Investor"
- ✅ Contains lead details, score, and preliminary offer

**If lead is follow-up (score 50-70):**
- ✅ Subject: "👀 New Follow-Up Lead from VOICE CHAT: John Test Investor"

---

## 🧪 **TEST 2: TEXT CHAT WITH IMAGE UPLOAD (GPT-4o VISION)**

### **Objective:**
Verify image upload and GPT-4o Vision analysis works in text chat.

### **Steps:**

#### **1. Start Text Chat:**
1. Close voice chat
2. Switch to "Text" tab
3. You should see message: "Upload property photos for analysis 📸"

#### **2. Upload Property Image:**
**Option A - Click Camera Icon:**
- Click camera icon in input area
- Select property image from computer

**Option B - Click Quick Action:**
- Click "📸 Upload property photo" button
- Select image

**Option C - Mobile Camera (if on phone):**
- Click camera icon
- Choose "Take Photo"
- Capture property photo

#### **3. Analyze Property:**
After upload, type:
```
"Analyze this property and tell me the property type, condition, and any renovation needs you see"
```

Click send.

#### **4. Expected Response:**
```
Cap: "Looking at your property photo, I can see:

Property Type: Single-family home
Condition: Good overall condition
Details:
- Exterior appears well-maintained
- Roof looks relatively new
- Landscaping in good shape
- Estimated 3-4 bedrooms based on size

Renovation Recommendations:
- [Any visible issues Cap identifies]

What are the property details? Purchase price and expected rent?"
```

#### **5. Verify Image Processing:**

**Check Browser Console (F12):**
```
POST /api/agent/chat
Request payload should include:
{
  messages: [{
    content: [
      { type: "text", text: "Analyze this property..." },
      { type: "image_url", image_url: { url: "data:image/png;base64,..." } }
    ]
  }]
}
```

**Check Message Display:**
- ✅ User message shows: "📸 Analyze this property\n[Property image uploaded]"
- ✅ Cap's response is relevant to the image
- ✅ No errors in console

#### **6. Test Multiple Images:**
Upload 2-3 property photos and ask:
```
"Compare these properties and recommend which is the best investment"
```

Expected: Cap analyzes each image and provides comparison.

---

## 🧪 **TEST 3: TEXT CHAT LEAD CAPTURE**

### **Objective:**
Verify text chat lead capture also works (parity with voice).

### **Steps:**

#### **1. In Text Chat, Type:**
```
"I want to get qualified for financing"
```

#### **2. Complete Flow:**
```
Cap: "Perfect! What's your full name?"
You: "Jane Test Investor"

Cap: "Best number to reach you?"
You: "555-987-6543"

Cap: "And your email address?"
You: "jane.test@example.com"

Cap: "What type of financing?"
You: "Hard money loan for fix and flip"

Cap: "Do I have your consent?"
You: "Yes"

[Auto flow: saveLead → scoreLead]
Cap: "You're pre-qualified..."
```

#### **3. Verify Database:**
```bash
npx prisma studio
```

Check:
- ✅ New lead: "Jane Test Investor"
- ✅ `channel` = "web_chat" (not voice_chat)
- ✅ `productType` = "hard_money"
- ✅ Score and offer populated

---

## 🧪 **TEST 4: KNOWLEDGE BASE SEARCH**

### **Objective:**
Verify searchKnowledgeBase tool works in both chat modes.

### **Voice Chat Test:**
```
You: "Can I get a DSCR loan with 620 credit score?"

Expected:
Cap searches knowledge base and provides detailed answer about
620 credit requirements, rates, down payment needs, etc.
```

### **Text Chat Test:**
```
Type: "Do you finance Airbnb properties?"

Expected:
Cap searches knowledge base and explains Airbnb/STR loan options.
```

---

## 🧪 **TEST 5: DEAL ANALYSIS**

### **Objective:**
Verify analyzeDeal tool calculates DSCR, cash flow, ROI correctly.

### **Voice Chat Test:**
```
You: "I'm looking at a $400,000 property that rents for $3,200 per month 
     with 25% down. Can you analyze this deal?"

Expected:
Cap: "Let me run the numbers...
     
     Property Analysis:
     - Purchase Price: $400,000
     - Down Payment (25%): $100,000
     - Loan Amount: $300,000
     - Monthly Rent: $3,200
     
     DSCR: 1.35 ✅ (Qualifies - need 1.25+)
     Monthly Cash Flow: $680
     Cash-on-Cash Return: 8.2%
     
     This is a solid deal! You qualify for financing."
```

### **Text Chat Test:**
Same property details, should get same results.

---

## 🧪 **TEST 6: PERPLEXITY MARKET RESEARCH**

### **Objective:**
Verify perplexitySearch tool provides real-time market data.

### **Test:**
```
You: "What are average rental rates for 3-bedroom homes in Phoenix, Arizona?"

Expected:
Cap uses Perplexity API and returns:
- Current rental rates
- Market trends
- Cited sources
- Neighborhood comparisons
```

---

## 🧪 **TEST 7: MULTI-STEP TOOL FLOWS**

### **Objective:**
Verify Cap automatically chains tools (saveLead → scoreLead).

### **Test:**
```
Complete full lead capture (name, email, phone, consent)

Expected Automatic Flow:
1. saveLead executes → Returns leadId
2. scoreLead executes automatically with leadId → Returns score
3. Cap presents both results in single response

You should NOT need to ask for scoring - it happens automatically!
```

---

## 🧪 **TEST 8: ERROR HANDLING**

### **Objective:**
Verify graceful error handling.

### **Tests:**

#### **1. Invalid Lead Data:**
```
Provide incomplete information (missing email)

Expected:
Cap should re-ask for missing information, not crash.
```

#### **2. Network Error Simulation:**
```
Disconnect internet briefly during conversation

Expected:
Cap should show error message, reconnect gracefully.
```

#### **3. Invalid Image Upload:**
```
Try uploading non-image file (PDF, etc.)

Expected:
"Please upload an image file" error message.
```

#### **4. Large Image Upload:**
```
Try uploading >10MB image

Expected:
"Image too large (max 10MB)" error message.
```

---

## 🧪 **TEST 9: MOBILE EXPERIENCE**

### **Objective:**
Verify everything works on mobile.

### **Tests:**

#### **1. Mobile Voice Chat:**
- Open on phone browser
- Test microphone permission
- Complete lead capture by speaking
- Verify audio quality

#### **2. Mobile Camera:**
- Click camera icon
- Should open camera directly
- Take property photo
- Should upload and analyze

#### **3. Mobile UI:**
- Voice chat controls visible
- Image preview not too large
- Text input usable
- Quick action buttons work

---

## 📊 **VERIFICATION DASHBOARD**

### **After All Tests, Check:**

#### **1. Database Statistics:**
```sql
-- In Prisma Studio or SQL:

-- Count leads by channel
SELECT channel, COUNT(*) 
FROM Lead 
GROUP BY channel;

-- Expected:
-- voice_chat: 1+
-- web_chat: 1+

-- Count interactions
SELECT COUNT(*) FROM Interaction;

-- Count events
SELECT COUNT(*) FROM Event;
```

#### **2. Email Log:**
- Check inbox for notification emails
- Verify qualified leads sent alerts
- Verify follow-up leads sent notifications

#### **3. Console Logs:**
```
Look for:
✅ [Voice Tools] Executing: saveLead
✅ [Voice Tools] Lead saved: clx123abc NEW
✅ [Voice Tools] Executing: scoreLead
✅ [Voice Tools] Lead scored: clx123abc qualified 85
✅ [Voice Email] Sent notification
✅ [Agent] Tool call: searchKnowledgeBase
✅ [Agent] Tool call: analyzeDeal
```

---

## ✅ **SUCCESS CRITERIA:**

### **Voice Chat:**
- [x] Lead capture completes successfully
- [x] Real lead ID returned (not 'temp-lead-id')
- [x] Lead saved to database with channel='voice_chat'
- [x] Lead auto-scored after save
- [x] Email sent for qualified/follow-up leads
- [x] Interactions logged in database
- [x] Events created (alert_sales, schedule)
- [x] Scheduling link provided with UTM tracking
- [x] No console errors
- [x] Smooth audio playback
- [x] Interruption handling works

### **Text Chat:**
- [x] Image upload works (camera icon + quick action)
- [x] Image preview displays correctly
- [x] GPT-4o Vision analyzes images accurately
- [x] Lead capture works (channel='web_chat')
- [x] All tools function (search, analyze, save, score)
- [x] No console errors
- [x] UI responsive and clean

### **Database:**
- [x] Leads table populated correctly
- [x] Interactions table has full history
- [x] Events table has alerts
- [x] Channel attribution correct
- [x] Scores calculated (0-100)
- [x] Offers generated and saved
- [x] Timestamps accurate

### **Email:**
- [x] Qualified leads trigger email
- [x] Follow-up leads trigger email
- [x] Email contains correct data
- [x] No email errors in console

---

## 🐛 **COMMON ISSUES & FIXES:**

### **Issue: "temp-lead-id" returned**
**Fix:** Voice tools endpoint not being called. Check network tab for /api/voice/tools requests.

### **Issue: No email sent**
**Fix:** Check SMTP credentials in .env.local. Verify Gmail app password is correct.

### **Issue: Image upload fails**
**Fix:** Check file size (<10MB) and file type (image/*).

### **Issue: Database error**
**Fix:** Run `npx prisma generate` and `npx prisma db push`

### **Issue: Voice audio glitchy**
**Fix:** Check browser console for audio errors. Try Chrome for best compatibility.

### **Issue: Lead not auto-scored**
**Fix:** Check that scoreLead is in the tools array and OpenAI is calling it automatically.

---

## 📈 **PERFORMANCE BENCHMARKS:**

### **Expected Response Times:**
- Voice latency: <500ms
- Image analysis: 2-5 seconds
- Lead capture: <1 second
- Deal analysis: <2 seconds
- Knowledge search: 1-3 seconds

### **Expected Accuracy:**
- DSCR calculations: 100% accurate
- Image analysis: 85%+ accurate
- Lead scoring: Consistent
- Email delivery: 99%+

---

## 🎉 **TESTING COMPLETE CHECKLIST:**

After running all tests, you should have:

- [x] At least 2 leads in database (1 voice, 1 text)
- [x] Multiple interactions logged
- [x] Events created
- [x] Emails received (if qualified)
- [x] Images analyzed successfully
- [x] No critical errors in console
- [x] Smooth user experience
- [x] All tools functioning
- [x] Database properly populated
- [x] Analytics ready to track

**If all checkboxes pass → PRODUCTION READY! 🚀**

---

## 🔄 **REPEAT TESTS:**

Run these tests:
- Daily during development
- Before each deployment
- After major changes
- With different data scenarios
- On different devices/browsers

---

## 📞 **NEED HELP?**

If tests fail:
1. Check console errors (F12)
2. Check network requests (Network tab)
3. Check database (Prisma Studio)
4. Check logs (terminal running npm run dev)
5. Review error messages
6. Check this guide for common issues

---

**Ready to start testing! Follow each section step-by-step and mark off as you go.** ✅
