# 🚀 QUICK TEST NOW - Start Here!

## ⚡ **5-MINUTE QUICK TEST**

Follow these steps RIGHT NOW to test everything:

---

## 🔧 **STEP 1: Pre-Flight Check (1 minute)**

### **Open Terminal #1 - Check Database:**
```bash
cd c:\Users\hamil\dscr_loan_leads
npx prisma studio
```

This opens a web UI at `http://localhost:5555` where you can see your database.

**Keep this open!** You'll watch leads appear in real-time.

---

### **Open Terminal #2 - Start Dev Server:**
```bash
cd c:\Users\hamil\dscr_loan_leads
npm run dev
```

Wait for:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

---

## 🎙️ **STEP 2: Test Voice Chat Lead Capture (2 minutes)**

### **1. Open Browser:**
```
http://localhost:3000
```

### **2. Open Chat Widget:**
- Look for chat icon (bottom right)
- Click it

### **3. Switch to Voice:**
- Click "Voice" tab
- Click "Start Talking to Cap"
- Allow microphone when prompted

### **4. Say This Exactly:**
```
"I want to get pre-approved for a DSCR loan"
```

**Cap should respond:** "Perfect! What's your full name?"

### **5. Complete the Flow:**
```
You: "Test User"
Cap: "Best number to reach you?"

You: "555-1234"
Cap: "And your email?"

You: "test@example.com"
Cap: "What type of financing?"

You: "DSCR rental property"
Cap: "Do I have your consent?"

You: "Yes"
```

### **6. Watch the Magic! ✨**

Cap should automatically:
1. Save your lead
2. Score your lead
3. Present preliminary offer
4. Offer to schedule call

---

## 👀 **STEP 3: Verify in Database (1 minute)**

### **Switch to Prisma Studio Tab:**
```
http://localhost:5555
```

### **Click "Lead" table:**

You should see:
- ✅ New record with name "Test User"
- ✅ email: "test@example.com"
- ✅ phone: "555-1234"
- ✅ channel: **"voice_chat"** ← KEY CHECK!
- ✅ score: Some number (0-100)
- ✅ status: "qualified" or "follow_up"
- ✅ consentAt: Recent timestamp

### **Click "Interaction" table:**

You should see:
- ✅ Multiple rows
- ✅ Some with toolName: "saveLead"
- ✅ Some with toolName: "scoreLead"

### **Click "Event" table:**

You should see:
- ✅ Event with type: "alert_sales" (if qualified)

---

## 📸 **STEP 4: Test Image Upload (1 minute)**

### **Back to Browser:**

### **1. Switch to Text Tab:**
- Click "Text" tab in chat

### **2. Click Camera Icon:**
- Find camera icon in input area (left side)
- Click it

### **3. Upload Property Photo:**
- Select any property image from your computer
- Image preview should appear

### **4. Type Message:**
```
"Analyze this property"
```

### **5. Click Send:**

Cap should respond with:
- Property type identification
- Condition assessment
- Any visible details

---

## 🔍 **STEP 5: Check Console Logs**

### **In Terminal #2 (npm run dev):**

Look for these SUCCESS messages:
```
[Voice Tools] Executing: saveLead
[Voice Tools] Lead saved: clx1234abc NEW
[Voice Tools] Executing: scoreLead
[Voice Tools] Lead scored: clx1234abc qualified 85
```

If you see these → **✅ SUCCESS!**

---

## ✅ **SUCCESS CHECKLIST:**

After 5 minutes, you should have:

- [x] Voice chat captured lead
- [x] Real lead ID (not 'temp-lead-id')
- [x] Lead visible in Prisma Studio
- [x] Channel = "voice_chat"
- [x] Lead auto-scored
- [x] Image upload works
- [x] Image analyzed by GPT-4o Vision
- [x] Console shows success logs
- [x] No errors in browser console (F12)

---

## ❌ **TROUBLESHOOTING:**

### **If Voice Chat Shows "temp-lead-id":**
```bash
# Check this file exists:
ls src/app/api/voice/tools/route.ts

# Restart dev server:
Ctrl+C (in Terminal #2)
npm run dev
```

### **If Database Empty:**
```bash
# In new terminal:
npx prisma generate
npx prisma db push
```

### **If Microphone Not Working:**
- Try Chrome browser (best compatibility)
- Check browser permissions
- Reload page and try again

### **If Image Upload Fails:**
- Check file size (<10MB)
- Use JPEG or PNG format
- Try different image

---

## 📧 **BONUS: Check Email**

If your SMTP is configured, check:
```
loans@capitalbridgesolutions.com
```

For email with subject:
```
🔥 New Qualified Lead from VOICE CHAT: Test User
```

---

## 🎯 **WHAT TO TEST NEXT:**

Once basic flow works, try:

1. **Deal Analysis:**
```
"Analyze a $400,000 property renting for $3,200 with 25% down"
```

2. **Knowledge Search:**
```
"Can I get a DSCR loan with 620 credit?"
```

3. **Market Research:**
```
"What are rental rates in Phoenix?"
```

4. **Scheduling:**
```
After qualification: "Yes, I want to schedule a call"
```

5. **Multiple Images:**
```
Upload 2-3 property photos
"Compare these properties"
```

---

## 🚨 **CRITICAL CHECKS:**

### **The 3 Most Important Things:**

1. **Lead ID is REAL:**
   - Open Prisma Studio
   - Check Lead table
   - Lead ID should be like "clx1234abc"
   - NOT "temp-lead-id"

2. **Channel is VOICE_CHAT:**
   - In Lead table
   - channel field = "voice_chat"
   - This proves voice tools endpoint is working

3. **Score Exists:**
   - In Lead table
   - score field has number (0-100)
   - This proves auto-scoring worked

**If all 3 pass → PRODUCTION READY! 🚀**

---

## 📊 **VIEWING YOUR TEST DATA:**

### **Prisma Studio:**
```
http://localhost:5555
```

### **Tables to Check:**
1. **Lead** - Your captured leads
2. **Interaction** - Conversation history
3. **Event** - Alerts and schedules

### **Quick SQL Check:**
```bash
# If you have psql:
psql $DATABASE_URL

# Run:
SELECT name, email, channel, score, status FROM "Lead" ORDER BY "createdAt" DESC LIMIT 5;
```

---

## ⏱️ **TIMING:**

- Database startup: 10 seconds
- Dev server startup: 30 seconds  
- Voice test: 2 minutes
- Image test: 1 minute
- Verification: 1 minute

**Total: ~5 minutes**

---

## 🎉 **AFTER SUCCESSFUL TEST:**

You'll have proven:
- ✅ Voice chat captures real leads
- ✅ Database integration works
- ✅ Auto-scoring works
- ✅ Image upload works
- ✅ GPT-4o Vision works
- ✅ Full production-ready system

**READY FOR OPENAI APP STORE! 🚀**

---

## 🔄 **RESET FOR CLEAN TEST:**

If you want to start fresh:

```bash
# Delete test lead from Prisma Studio
# OR
# Keep it for demo purposes
```

---

**START NOW! Open two terminals and follow Step 1!** 🚀
