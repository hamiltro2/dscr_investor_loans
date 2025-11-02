# 🚀 PRODUCTION DEPLOYMENT CHECKLIST

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Make sure these are set in your production environment (Vercel/Netlify/etc.):

```env
# Database
DATABASE_URL=your_production_database_url

# Ultravox API
ULTRAVOX_API_KEY=your_ultravox_api_key

# Your Production URL (auto-detected if not set)
NEXT_PUBLIC_BASE_URL=https://capitalbridgesolutions.com

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=info@capitalbridgesolutions.com
NOTIFICATION_EMAIL=team@capitalbridgesolutions.com

# Perplexity AI (optional - for property research)
PERPLEXITY_API_KEY=your_perplexity_key

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# OpenAI (for text chat)
OPENAI_API_KEY=your_openai_key
```

---

## 🎯 Deployment Steps

### **Option A: Vercel (Recommended)**

1. **Push to GitHub**:
```bash
git add .
git commit -m "Production ready - voice chat lead capture"
git push origin main
```

2. **Deploy to Vercel**:
- Go to https://vercel.com
- Click "Import Project"
- Select your GitHub repo
- Add environment variables (see above)
- Click "Deploy"

3. **Set Production URL**:
```bash
# In Vercel dashboard, add environment variable:
NEXT_PUBLIC_BASE_URL=https://capitalbridgesolutions.com
```

4. **Test**:
- Visit: https://capitalbridgesolutions.com
- Start voice chat
- Say "I need a loan"
- Provide info
- ✅ Lead saved to database
- ✅ Email sent to team

---

### **Option B: Netlify**

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**:
- Go to https://netlify.com
- Click "Add new site" → "Import an existing project"
- Select GitHub repo
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `.next`
- Add environment variables
- Click "Deploy"

3. **Set Production URL**:
```bash
# In Netlify dashboard, add environment variable:
NEXT_PUBLIC_BASE_URL=https://capitalbridgesolutions.com
```

---

## 🧪 Post-Deployment Testing

### Test 1: Voice Chat Lead Capture
1. Visit production URL
2. Start voice chat
3. Say: "I need a loan for a rental property"
4. Provide all information:
   - Name
   - Email
   - Phone
   - Property type
   - Loan amount

**Expected**:
- ✅ Lead saved to database
- ✅ Email sent to team
- ✅ Console logs show: "All tools enabled (HTTPS mode)"
- ✅ No "development mode" message

### Test 2: Database Connection
```bash
# Check database for new lead
# Should see entry with:
# - channel: "voice_chat_ultravox"
# - All provided information
# - Timestamp
```

### Test 3: Email Notification
- Check team email inbox
- Should receive email with lead details
- Subject: "🔥 New Voice Chat Lead"
- Contains all lead information

### Test 4: Property Analysis
1. Say: "Tell me about 123 Main St, Los Angeles CA"
2. Cap should call Perplexity tool
3. Should get property details

---

## 🔍 Monitoring & Logs

### Vercel Logs
```bash
# View real-time logs
vercel logs https://capitalbridgesolutions.com --follow

# Or in Vercel dashboard:
Project → Deployments → [Latest] → View Function Logs
```

### What to Look For
```
✅ [Ultravox Session] Creating session with base URL: https://capitalbridgesolutions.com
✅ [Ultravox Session] All tools enabled (HTTPS mode)
✅ [Ultravox Lead Capture] Created new lead: cuid_123
✅ [Ultravox Lead Capture] Email notification sent
```

### Common Issues
```
❌ [Ultravox Session] Tools disabled - localhost requires ngrok
→ Fix: Set NEXT_PUBLIC_BASE_URL in environment variables

❌ [Ultravox Lead Capture] Email failed
→ Fix: Check SMTP credentials in environment variables

❌ [Ultravox] Failed to create session
→ Fix: Check ULTRAVOX_API_KEY is set correctly
```

---

## 📊 Success Metrics

After deployment, you should have:
- ✅ Voice chat fully functional
- ✅ Lead capture working (saving to database)
- ✅ Email notifications sending
- ✅ Property analysis tool working
- ✅ DSCR calculator working
- ✅ Knowledge base search working
- ✅ Full transcript in UI (AI + User messages)
- ✅ No "development mode" messages

---

## 🛡️ Security Checklist

Before going live:
- [ ] All API keys in environment variables (not in code)
- [ ] Database using production credentials
- [ ] SMTP using app-specific passwords (not main password)
- [ ] `.env.local` in `.gitignore` (never commit)
- [ ] Rate limiting enabled (if needed)
- [ ] CORS configured correctly
- [ ] Webhook endpoints secured (if using)

---

## 🔧 Rollback Plan

If something goes wrong:

### Vercel
```bash
# Revert to previous deployment
# In Vercel dashboard:
Deployments → [Previous working version] → Promote to Production
```

### Netlify
```bash
# In Netlify dashboard:
Deploys → [Previous deploy] → Publish deploy
```

---

## 📞 Support Checklist

If users report issues:

1. **Check logs** for errors
2. **Verify lead in database** - was it saved?
3. **Check email delivery** - was notification sent?
4. **Test voice chat yourself** - can you reproduce?
5. **Review Ultravox dashboard** - any failed calls?

---

## 🎉 You're Ready!

Once deployed and tested:
- ✅ Voice chat captures leads automatically
- ✅ Team gets email notifications immediately
- ✅ Full conversation history saved
- ✅ Property analysis tools working
- ✅ No local development limitations

**Your voice lead system is LIVE!** 🚀

---

## 📋 Quick Deploy Commands

```bash
# 1. Final check
npm run build

# 2. Commit changes
git add .
git commit -m "Production ready - all voice features enabled"

# 3. Push to GitHub
git push origin main

# 4. Vercel will auto-deploy or manually:
vercel --prod

# 5. Test immediately at your production URL
```

**That's it! You're production-ready.** ✅
