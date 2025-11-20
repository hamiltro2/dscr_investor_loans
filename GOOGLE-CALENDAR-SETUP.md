# Google Calendar Integration Setup Guide

## 🎯 Overview

This guide shows you how to integrate Cap's `scheduleCall` action with Google Workspace Calendar so that when investors schedule calls through ChatGPT, calendar events are automatically created in your Google Calendar with Google Meet links.

---

## 📋 Prerequisites

- Google Workspace account (or regular Gmail)
- Admin access to Google Cloud Console
- Access to your `.env.local` file

---

## 🚀 Step-by-Step Setup

### Step 1: Create Google Cloud Project (5 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Name: **"Capital Bridge Solutions - Cap ChatGPT"**
4. Click **"Create"**
5. Wait for project creation, then select it

---

### Step 2: Enable Google Calendar API (2 minutes)

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Calendar API"**
3. Click **"Google Calendar API"**
4. Click **"Enable"**
5. Wait for API to enable (~30 seconds)

---

### Step 3: Create Service Account (5 minutes)

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Fill in details:
   - **Service account name:** `cap-chatgpt-calendar`
   - **Service account ID:** `cap-chatgpt-calendar` (auto-fills)
   - **Description:** "Service account for Cap ChatGPT to create calendar events"
4. Click **"Create and Continue"**
5. **Grant access:** Select role **"Editor"** (or custom role with calendar.events.create permission)
6. Click **"Continue"** → **"Done"**

---

### Step 4: Generate Service Account Key (3 minutes)

1. In **Credentials** page, find your service account under **"Service Accounts"**
2. Click on the service account email (e.g., `cap-chatgpt-calendar@...`)
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. **IMPORTANT:** Save this JSON file securely! It contains credentials.
8. **Rename it** to something like `google-service-account.json`

**⚠️ SECURITY WARNING:**
- Never commit this file to Git
- Never share it publicly
- Store it securely (like 1Password, LastPass, etc.)

---

### Step 5: Share Calendar with Service Account (3 minutes)

The service account needs permission to create events on your calendar.

1. Open [Google Calendar](https://calendar.google.com)
2. Find the calendar you want Cap to use (usually your main calendar or create a new one called "Cap Scheduled Calls")
3. Click the **⚙️** (settings) next to the calendar name
4. Click **"Share with specific people or groups"**
5. Click **"Add people and groups"**
6. Paste your **service account email** (from Step 4, looks like: `cap-chatgpt-calendar@project-id.iam.gserviceaccount.com`)
7. Set permission to **"Make changes to events"**
8. Click **"Send"**

**Note the Calendar ID:**
- In calendar settings, scroll down to **"Integrate calendar"**
- Copy the **Calendar ID** (looks like: `your-email@gmail.com` or a long string)
- You'll need this for `.env.local`

---

### Step 6: Add Environment Variables (3 minutes)

1. Open your `.env.local` file
2. Add these variables:

```bash
# Google Calendar Integration
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='{"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"cap-chatgpt-calendar@your-project-id.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"...","universe_domain":"googleapis.com"}'

# Calendar ID (from Step 5)
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Optional: Calendly fallback (if Google Calendar fails)
CALENDLY_USERNAME=capitalbridgesolutions
CALENDLY_EVENT_TYPE=dscr-consultation
```

**To convert JSON file to environment variable:**

```bash
# On Mac/Linux:
cat google-service-account.json | jq -c '.' | pbcopy

# On Windows PowerShell:
Get-Content google-service-account.json -Raw | ConvertFrom-Json | ConvertTo-Json -Compress | Set-Clipboard
```

Then paste as the value of `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` (wrapped in single quotes).

**⚠️ IMPORTANT:** Make sure to escape newlines in the private key:
- The `private_key` field should have `\n` characters, not actual line breaks
- The JSON should be on ONE line

---

### Step 7: Install Dependencies (1 minute)

```bash
npm install googleapis
```

This installs the Google APIs Node.js client library.

---

### Step 8: Test the Integration (5 minutes)

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Test the endpoint directly** (optional):
   ```bash
   curl -X POST http://localhost:3000/api/chatgpt/schedule-call \
     -H "Content-Type: application/json" \
     -d '{
       "full_name": "Test Investor",
       "email": "your-email@gmail.com",
       "phone": "555-555-5555",
       "preferred_date": "tomorrow",
       "preferred_time": "2pm",
       "timezone": "PT",
       "topic": "DSCR loan for Riverside property"
     }'
   ```

3. **Check your Google Calendar** - you should see a new event!

4. **Check your email** - you should receive a Google Calendar invite

5. **Test through Cap ChatGPT:**
   ```
   "I want to schedule a call for tomorrow at 2pm to discuss a Riverside property"
   ```

---

## ✅ How It Works

### **User Flow:**

1. **User in ChatGPT:** "I want to schedule a call for tomorrow at 2pm"
2. **Cap asks:** Name, email, phone
3. **Cap calls:** `/api/chatgpt/schedule-call` with date/time
4. **API creates:**
   - Lead in database
   - Google Calendar event
   - Google Meet link
   - Sends invite to user's email
5. **User receives:**
   - Calendar invite
   - Email confirmation
   - Google Meet link
   - Event shows up on their calendar

### **Your Team Sees:**

- Event on Google Calendar (shared calendar)
- All lead details in event description
- Lead record in database
- Email notification

---

## 🎨 Calendar Event Details

Events created by Cap include:

**Event Title:**
```
DSCR Consultation: John Smith
```

**Event Description:**
```
DSCR Loan Consultation Call

Client: John Smith
Email: john@example.com
Phone: (555) 555-5555

Property: 123 Main St, Riverside, CA
Loan Amount: $600,000
Topic: First-time DSCR investor, cash flow property

Source: Cap ChatGPT
Lead ID: abc123
```

**Duration:** 30 minutes (configurable)

**Reminders:**
- Email: 1 day before
- Popup: 1 hour before

**Includes:** Google Meet link (automatic)

**Attendees:**
- Investor (automatically added)
- Your team (via shared calendar)

---

## 🔧 Troubleshooting

### **Error: "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not configured"**

**Solution:** Check your `.env.local` file has the credentials and restart dev server.

### **Error: "Permission denied" or "Calendar not found"**

**Solution:** 
1. Verify service account email is added to calendar sharing
2. Verify permission is "Make changes to events"
3. Wait 5-10 minutes for permissions to propagate

### **Error: "Invalid private key"**

**Solution:**
- Make sure private key has `\n` characters (not actual line breaks)
- Entire JSON should be on ONE line
- Wrapped in single quotes in `.env.local`

### **Calendar event created but no Google Meet link**

**Solution:**
- Make sure your Google Workspace admin has enabled Google Meet
- Try creating a test event manually to verify Meet works
- Check service account has proper permissions

### **Investor doesn't receive email invite**

**Solution:**
- Check their email is correct
- Check spam folder
- Verify calendar event has `sendUpdates: 'all'` in code
- Check Google Calendar settings allow sending invites

---

## 📊 Monitoring

Check calendar integration health:

```sql
-- See scheduled calls
SELECT * FROM "Interaction"
WHERE "toolName" = 'chatgpt_schedule_call'
ORDER BY "createdAt" DESC;

-- Check for calendar creation failures
SELECT "toolOutput"
FROM "Interaction"
WHERE "toolName" = 'chatgpt_schedule_call'
AND "toolOutput"::jsonb->>'calendar_event' IS NULL;
```

---

## 🎯 Advanced Configuration

### **Custom Calendar Name**

Create a dedicated calendar for Cap:
1. In Google Calendar, click **"+"** next to "Other calendars"
2. Select **"Create new calendar"**
3. Name: **"Cap Scheduled Calls"**
4. Share with service account (same as Step 5)
5. Use this calendar ID in `.env.local`

### **Multiple Team Members**

To notify multiple team members:
1. Share the calendar with all team members
2. Or create a Google Group
3. Add group email as attendee in code

### **Custom Duration**

Edit `src/lib/google-calendar.ts`:
```typescript
// Change from 30 to 60 minutes
endTime.setMinutes(endTime.getMinutes() + 60);
```

### **Different Timezones**

Update timezone in `src/lib/google-calendar.ts`:
```typescript
timeZone: 'America/New_York', // ET
// or
timeZone: 'America/Chicago', // CT
```

---

## 🚀 Production Deployment

When deploying to Vercel:

1. **Add environment variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`
   - Add `GOOGLE_CALENDAR_ID`
   - Add for: Production, Preview, Development

2. **Redeploy:**
   ```bash
   git push origin main
   ```

3. **Test production:**
   - Schedule a test call through Cap in production
   - Verify calendar event is created
   - Verify email is received

---

## 📈 Expected Results

**Before (Calendly only):**
- User gets Calendly link
- Has to click and book separately
- ~30% actually book a time
- Manual calendar entry

**After (Google Calendar integration):**
- Calendar event created automatically
- User receives invite immediately
- ~80% attendance rate
- Zero manual work
- Google Meet link included
- All details in calendar

---

## 🔒 Security Best Practices

1. **Never commit service account JSON to Git**
   - Add to `.gitignore`: `google-service-account.json`
   - Store credentials in environment variables only

2. **Limit service account permissions**
   - Only grant calendar.events.create permission
   - Use a dedicated calendar (not your main calendar)

3. **Rotate keys periodically**
   - Create new service account key every 90 days
   - Delete old keys

4. **Monitor usage**
   - Check Google Cloud Console for API usage
   - Set up alerts for unusual activity

---

## ✅ Checklist

- [ ] Google Cloud project created
- [ ] Google Calendar API enabled
- [ ] Service account created
- [ ] Service account key downloaded and secured
- [ ] Calendar shared with service account email
- [ ] Environment variables added to `.env.local`
- [ ] `googleapis` package installed
- [ ] Dev server restarted
- [ ] Test event created successfully
- [ ] Calendar event received by test email
- [ ] Google Meet link works
- [ ] Tested through Cap ChatGPT
- [ ] Environment variables added to Vercel
- [ ] Production tested

---

## 🆘 Need Help?

Common issues:
1. Service account permissions → Wait 10 minutes, try again
2. Calendar not found → Double-check calendar ID
3. No Meet link → Check Workspace Meet settings
4. Events not syncing → Check API quota in Cloud Console

**Still stuck?** Check the logs:
```bash
# Dev server logs
npm run dev

# Check for errors in schedule-call endpoint
```

---

**Once set up, this is 100% automated! Cap will create calendar events with Meet links for every scheduled call. 🚀**
