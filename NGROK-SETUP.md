# 🚀 NGROK SETUP - Enable Lead Capture in Development

## Problem
Ultravox requires **HTTPS** for tool callbacks (lead capture, email notifications).  
Your localhost runs on **HTTP**, so tools don't work and leads aren't saved.

## Solution
Use **ngrok** to create an HTTPS tunnel to your localhost.

---

## 📦 SETUP (One-time, 5 minutes)

### 1. Install ngrok

**Option A: Download** (Recommended)
1. Go to https://ngrok.com/download
2. Download for Windows
3. Extract `ngrok.exe` to `C:\ngrok\` or any folder
4. Add to PATH (optional)

**Option B: Using Chocolatey**
```powershell
choco install ngrok
```

### 2. Sign up (Free)
1. Go to https://dashboard.ngrok.com/signup
2. Create free account
3. Copy your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken

### 3. Authenticate
```powershell
ngrok config add-authtoken YOUR_TOKEN_HERE
```

---

## 🎯 DAILY USAGE (Every time you develop)

### Step 1: Start Next.js Dev Server
```powershell
# Terminal 1
npm run dev
# Running on http://localhost:3000
```

### Step 2: Start ngrok Tunnel
```powershell
# Terminal 2 (NEW terminal window)
ngrok http 3000
```

You'll see:
```
Session Status    online
Account           Your Name (Plan: Free)
Version           3.x.x
Region            United States (us)
Forwarding        https://abc123.ngrok.io -> http://localhost:3000
Forwarding        http://abc123.ngrok.io -> http://localhost:3000

Connections       ttl     opn     rt1     rt5     p50     p90
                  0       0       0.00    0.00    0.00    0.00
```

**Copy the HTTPS URL**: `https://abc123.ngrok.io`

### Step 3: Update Environment Variable

**Create or edit** `.env.local`:
```env
# Replace with YOUR ngrok URL (changes each time ngrok restarts)
NEXT_PUBLIC_BASE_URL=https://abc123.ngrok.io

# Your other env variables
ULTRAVOX_API_KEY=your_key_here
DATABASE_URL=your_db_url
# ... etc
```

### Step 4: Restart Next.js
```powershell
# In Terminal 1, press Ctrl+C to stop, then:
npm run dev
```

### Step 5: Access via ngrok URL
**Use the ngrok URL, NOT localhost:**
- ✅ Open: `https://abc123.ngrok.io`
- ❌ Don't use: `http://localhost:3000`

Now test voice chat - **lead capture will work!** 🎉

---

## 🧪 TESTING LEAD CAPTURE

1. Open `https://your-ngrok-url.ngrok.io`
2. Click voice chat
3. Say: **"I need a loan"**
4. Provide info when asked:
   - Name: "John Smith"
   - Email: "john@example.com"
   - Phone: "555-1234"
   - Property type: "single family"
   - Loan amount: "500k" or "500000"

5. **Check**:
   - ✅ Lead saved to database
   - ✅ Email sent to team
   - ✅ No "development mode" message
   - ✅ Console shows: `[Ultravox Session] All tools enabled (production mode with HTTPS)`

---

## 🔄 NGROK URL CHANGES

**Important**: Free ngrok URLs change every time you restart ngrok.

**Each time you start ngrok**:
1. Copy the new HTTPS URL
2. Update `NEXT_PUBLIC_BASE_URL` in `.env.local`
3. Restart Next.js

**To keep the same URL** (Paid feature):
```powershell
# ngrok Pro/Enterprise only
ngrok http 3000 --domain=your-custom-subdomain.ngrok.io
```

---

## 🚨 TROUBLESHOOTING

### Tools still not working?

**Check console logs** in terminal:
```
[Ultravox Session] Creating session with base URL: https://abc123.ngrok.io
[Ultravox Session] All tools enabled (production mode with HTTPS)
```

If you see:
```
[Ultravox Session] ⚠️  WARNING: Running on HTTP (localhost)
```

**Fix**: You're still using localhost. Access via ngrok URL instead.

---

### Can't access ngrok URL?

**Check**:
1. Is ngrok running? (Check Terminal 2)
2. Is Next.js running? (Check Terminal 1)
3. Using HTTPS URL? (Not HTTP)
4. Firewall blocking ngrok?

---

### Lead not saving?

**Check**:
1. Database connection working? (`DATABASE_URL` correct?)
2. Email service configured? (SMTP settings in `.env.local`)
3. Console shows tool was called?
4. Check database for new lead entry

---

## 🌐 PRODUCTION DEPLOYMENT

Once you deploy to **Vercel/Netlify/etc.**, you get HTTPS automatically:
- `https://capitalbridgesolutions.com`
- No ngrok needed!
- Just set `NEXT_PUBLIC_BASE_URL=https://capitalbridgesolutions.com`

---

## 💡 TIPS

### Keep ngrok running
Leave ngrok terminal open while developing. Close it when done.

### Share with team
Your ngrok URL is publicly accessible! Share it with team to test:
- `https://abc123.ngrok.io` - Anyone can access
- Great for showing clients/stakeholders
- **Security**: Don't share sensitive data on free ngrok URLs

### ngrok Web Interface
While ngrok is running, access: http://localhost:4040
- See all requests
- Inspect traffic
- Replay requests
- Debug webhooks

### Alternative: localtunnel
If ngrok doesn't work:
```powershell
npx localtunnel --port 3000
```

---

## ✅ SUCCESS CHECKLIST

After setup, you should have:
- [ ] ngrok installed and authenticated
- [ ] Two terminals running (Next.js + ngrok)
- [ ] `.env.local` with `NEXT_PUBLIC_BASE_URL=https://your-ngrok-url.ngrok.io`
- [ ] Accessing app via ngrok URL (not localhost)
- [ ] Console logs show "All tools enabled (production mode with HTTPS)"
- [ ] Lead capture saves to database
- [ ] Email notifications sent
- [ ] No "development mode" message in voice chat

---

**You're all set! Lead capture will now work in development.** 🚀
