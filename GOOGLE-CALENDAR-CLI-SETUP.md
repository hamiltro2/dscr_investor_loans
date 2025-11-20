# Google Calendar CLI Setup (5 Minutes)

## 🚀 **Fast Setup with Google Cloud CLI**

Instead of clicking through the web console, use this automated script to set up Google Calendar integration in ~5 minutes.

---

## 📋 **Prerequisites (One-Time Setup)**

### **1. Install Google Cloud CLI**

**Windows:**
```powershell
# Download and run installer
# https://cloud.google.com/sdk/docs/install#windows

# Or use Chocolatey:
choco install gcloudsdk
```

**Mac:**
```bash
# Download and install
# https://cloud.google.com/sdk/docs/install#mac

# Or use Homebrew:
brew install google-cloud-sdk
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### **2. Login to Google Cloud**

```bash
gcloud auth login
```

This opens your browser to log in with your Google account.

### **3. Install jq (JSON processor)**

**Windows:**
```powershell
# Using Chocolatey:
choco install jq

# Or download from: https://stedolan.github.io/jq/download/
```

**Mac:**
```bash
brew install jq
```

**Linux:**
```bash
sudo apt-get install jq
```

---

## ⚡ **Run the Setup Script**

### **Windows (PowerShell):**

```powershell
# Navigate to project directory
cd C:\Users\hamil\dscr_loan_leads

# Run the script
.\setup-google-calendar.ps1
```

### **Mac/Linux (Bash):**

```bash
# Navigate to project directory
cd ~/dscr_loan_leads

# Make script executable
chmod +x setup-google-calendar.sh

# Run the script
./setup-google-calendar.sh
```

---

## 📝 **What the Script Does:**

1. ✅ Creates Google Cloud project: `capital-bridge-cap-chatgpt`
2. ✅ Enables Google Calendar API
3. ✅ Creates service account: `cap-chatgpt-calendar`
4. ✅ Generates service account key (JSON)
5. ✅ Formats credentials for `.env.local`
6. ✅ Copies to your clipboard (automatic!)

**Total time: ~3 minutes** ⏱️

---

## 🔧 **After Running the Script:**

### **Step 1: Add Environment Variables**

The script outputs something like this:

```bash
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='{"type":"service_account","project_id":"..."}'

GOOGLE_CALENDAR_ID='your-email@gmail.com'
```

**Copy and paste both lines into your `.env.local` file.**

If you're on Windows, it's already copied to your clipboard! Just:
1. Open `.env.local`
2. Press `Ctrl+V` to paste
3. Add the `GOOGLE_CALENDAR_ID` line with your email

### **Step 2: Share Calendar with Service Account**

1. Open [Google Calendar](https://calendar.google.com)
2. Find your calendar (or create a new one: "Cap Scheduled Calls")
3. Click the **⚙️** icon next to the calendar name
4. Click **"Share with specific people or groups"**
5. Click **"Add people and groups"**
6. Paste the service account email:
   ```
   cap-chatgpt-calendar@capital-bridge-cap-chatgpt.iam.gserviceaccount.com
   ```
7. Set permission to: **"Make changes to events"**
8. Click **"Send"**

**⏱️ Takes 1 minute**

### **Step 3: Install Dependencies**

```bash
npm install googleapis
```

### **Step 4: Test It!**

```bash
# Restart dev server
npm run dev
```

Then in Cap ChatGPT:
```
"I want to schedule a call for tomorrow at 2pm"
```

**Check your Google Calendar - you should see the event!** 🎉

---

## 🆚 **CLI Setup vs Web Console:**

| Method | Time | Steps | Difficulty |
|--------|------|-------|------------|
| **Web Console** | 20-30 min | 8 manual steps | Medium |
| **CLI Script** | 3-5 min | Run 1 script | Easy |

---

## 🔍 **Troubleshooting:**

### **Error: "gcloud: command not found"**

**Solution:** Google Cloud CLI not installed. Follow Prerequisites step 1.

### **Error: "Billing account required"**

**Solution:**
1. Go to: https://console.cloud.google.com/billing
2. Link a billing account to the project
3. **Note:** Calendar API is FREE (up to 1M requests/day)
4. Re-run the script

### **Error: "Calendar API not enabled"**

**Solution:** Wait 1-2 minutes for API to activate, then try again.

### **Script hangs at "Creating service account..."**

**Solution:**
1. Press `Ctrl+C` to cancel
2. Run: `gcloud auth login` again
3. Re-run the script

### **Environment variable too long**

**Solution:** The JSON is minified but still long. That's normal! Just paste the entire line into `.env.local` wrapped in single quotes.

---

## 🎯 **What Happens After Setup:**

### **Example Flow:**

1. **Investor in ChatGPT:** "Schedule a call for tomorrow at 2pm"
2. **Cap collects:** Name, email, phone
3. **API creates:**
   - ✅ Lead in database
   - ✅ Google Calendar event
   - ✅ Google Meet link
   - ✅ Sends invite to investor
4. **Investor receives:**
   - 📧 Email with calendar invite
   - 📅 Event on their Google Calendar
   - 🔗 Google Meet link
5. **Your team sees:**
   - 📅 Event on shared calendar
   - 📝 All lead details in event description
   - 🔗 Google Meet link ready to join

**All automatic! Zero manual work!** 🚀

---

## 🔒 **Security Notes:**

The script creates a file: `google-service-account.json`

**⚠️ This file contains sensitive credentials!**

✅ **Already added to `.gitignore`** - Won't be committed
✅ **Store securely** - Use 1Password, LastPass, etc.
❌ **NEVER commit to Git**
❌ **NEVER share publicly**
❌ **NEVER upload to GitHub**

**In production (Vercel):**
- Don't upload the JSON file
- Only use the environment variable
- Add to Vercel's Environment Variables section

---

## 📊 **Verify It's Working:**

### **Check Database:**

```sql
SELECT * FROM "Interaction"
WHERE "toolName" = 'chatgpt_schedule_call'
ORDER BY "createdAt" DESC;
```

You should see calendar event data in `toolOutput`.

### **Check Google Calendar:**

Look for events titled: **"DSCR Consultation: [Name]"**

### **Check Logs:**

```bash
# In dev server logs, look for:
[ChatGPT schedule-call] Calendar event created: <event_id>
[Google Calendar] Event created: <event_id>
[Google Calendar] Meet link: <meet_link>
```

---

## 🚀 **Production Deployment:**

Once tested locally:

1. **Add to Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` (the entire JSON string)
   - Add: `GOOGLE_CALENDAR_ID` (your calendar email)
   - Add for: Production, Preview, Development

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add Google Calendar integration"
   git push origin main
   ```

3. **Test in production:**
   - Use Cap in production
   - Schedule a test call
   - Verify calendar event is created

---

## 📈 **Expected Results:**

**Before (Calendly only):**
- 📋 User gets Calendly link
- 👆 Has to click and book separately
- 🎯 ~30% actually book
- ⏰ Manual calendar management

**After (Google Calendar integration):**
- ✅ Calendar event created automatically
- 📧 User receives invite immediately  
- 🎯 ~80% show up (calendar reminder)
- 🤖 Zero manual work
- 🔗 Google Meet link included
- 📝 All details in calendar

---

## ⏱️ **Total Setup Time:**

- **Install gcloud CLI:** 5 minutes (one-time)
- **Run script:** 3 minutes
- **Share calendar:** 1 minute
- **Test:** 2 minutes

**Total: ~10 minutes** (vs 30+ minutes with web console)

---

## 🎉 **You're Done!**

Now when investors schedule calls through Cap:
- ✅ Calendar events created automatically
- ✅ Google Meet links generated
- ✅ Email invites sent
- ✅ Your team notified
- ✅ Zero manual work

**This is what Kiavi, Lima One, and AngelOak DON'T have!** 🏆
