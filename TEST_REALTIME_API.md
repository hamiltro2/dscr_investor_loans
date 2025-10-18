# 🧪 Test OpenAI Realtime API Access

## ✅ Updated Code with Official API Specs

I've updated the implementation to match the official OpenAI Realtime API documentation:

- ✅ Model: `gpt-realtime-2025-08-25` (latest)
- ✅ Audio format: `audio/pcm` at 24000 Hz
- ✅ Transcription: `gpt-4o-transcribe`
- ✅ Voice options: alloy, echo, shimmer, ash, ballad, coral, sage, verse, marin

---

## 🔍 Step 1: Test Your API Access

Run this PowerShell command to test if you have Realtime API access:

```powershell
# Set your API key (get from .env.local)
$apiKey = "YOUR_API_KEY_HERE"

# Test the Realtime Sessions endpoint
$response = Invoke-RestMethod -Uri "https://api.openai.com/v1/realtime/sessions" `
  -Method Post `
  -Headers @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
  } `
  -Body '{"model":"gpt-realtime-2025-08-25","voice":"alloy"}'

# Display results
Write-Host "✅ SUCCESS! You have Realtime API access!" -ForegroundColor Green
Write-Host "Session ID: $($response.id)"
Write-Host "Ephemeral Token: $($response.client_secret.value.Substring(0,30))..."
Write-Host "Expires At: $(Get-Date -UnixTimeSeconds $response.expires_at)"
```

---

## 📊 Expected Responses

### ✅ SUCCESS (You have access):
```json
{
  "id": "sess_abc123",
  "object": "realtime.session",
  "model": "gpt-realtime-2025-08-25",
  "client_secret": {
    "value": "ek_abc123...",
    "expires_at": 1756324625
  },
  "expires_at": 1756324625,
  ...
}
```

**→ If you see this, you're ready to deploy!**

---

### ❌ ERROR: Model Not Available
```json
{
  "error": {
    "message": "The model 'gpt-realtime-2025-08-25' does not exist",
    "type": "invalid_request_error",
    "code": "model_not_found"
  }
}
```

**→ Solutions:**
1. Try older model: `gpt-realtime-2024-10-01`
2. Check if your account tier has access
3. Verify organization is verified

---

### ❌ ERROR: Invalid API Key
```json
{
  "error": {
    "message": "Incorrect API key provided",
    "type": "invalid_request_error"
  }
}
```

**→ Solution:** Check your `.env.local` file has correct `OPENAI_API_KEY`

---

## 🚀 Step 2: Quick Test Script

Save this as `test-realtime.ps1`:

```powershell
# Load environment variables
$envContent = Get-Content .env.local
$apiKey = ($envContent | Where-Object { $_ -match "OPENAI_API_KEY=" }) -replace "OPENAI_API_KEY=", ""

if (-not $apiKey) {
    Write-Host "❌ ERROR: OPENAI_API_KEY not found in .env.local" -ForegroundColor Red
    exit 1
}

Write-Host "🔍 Testing OpenAI Realtime API access..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/realtime/sessions" `
      -Method Post `
      -Headers @{
        "Authorization" = "Bearer $apiKey"
        "Content-Type" = "application/json"
      } `
      -Body '{"model":"gpt-realtime-2025-08-25","voice":"alloy"}'
    
    Write-Host "✅ SUCCESS! Realtime API is working!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Details:" -ForegroundColor Cyan
    Write-Host "  Session ID: $($response.id)"
    Write-Host "  Model: $($response.model)"
    Write-Host "  Ephemeral Key: $($response.client_secret.value.Substring(0,20))..."
    Write-Host "  Expires: $(Get-Date -UnixTimeSeconds $response.expires_at -Format 'yyyy-MM-dd HH:mm:ss')"
    Write-Host ""
    Write-Host "🎉 You're all set! Ready to deploy voice chat!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ ERROR: Failed to access Realtime API" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error Details:" -ForegroundColor Yellow
    Write-Host $_.Exception.Message
    Write-Host ""
    
    if ($_.ErrorDetails.Message) {
        $errorObj = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "API Error:" -ForegroundColor Yellow
        Write-Host "  Type: $($errorObj.error.type)"
        Write-Host "  Message: $($errorObj.error.message)"
        
        if ($errorObj.error.code -eq "model_not_found") {
            Write-Host ""
            Write-Host "💡 Possible Solutions:" -ForegroundColor Cyan
            Write-Host "  1. Try older model: gpt-realtime-2024-10-01"
            Write-Host "  2. Check your account tier"
            Write-Host "  3. Verify organization access"
        }
    }
}
```

**Run it:**
```powershell
.\test-realtime.ps1
```

---

## 📋 Step 3: What I Need From You

**Please run the test script and paste the full output here.**

This will tell me:
- ✅ If you have Realtime API access
- ✅ Which model version works for you
- ✅ If any code adjustments are needed
- ✅ Your account tier limitations

---

## 🎯 Alternative Models to Try

If `gpt-realtime-2025-08-25` doesn't work, try these in order:

1. **`gpt-realtime-2024-10-01`** - Stable release from Oct 2024
2. **`gpt-4o-realtime-preview-2024-12-17`** - December preview
3. **`gpt-4o-realtime-preview-2024-10-01`** - Original preview

I can quickly update the code to use any of these if needed.

---

## 💡 Troubleshooting Guide

### Issue: "Rate limit exceeded"
**Solution:** You're on a low tier. The API works, just needs to wait or upgrade.

### Issue: "Organization not verified"
**Solution:** Go to https://platform.openai.com/settings/organization/general and complete verification.

### Issue: "Model not available"
**Solution:** Try the alternative models above.

### Issue: "Insufficient quota"
**Solution:** Add credits at https://platform.openai.com/account/billing/overview

---

## 🚀 Once Test Passes

If the test succeeds, we can:

1. **Deploy immediately** - Code is ready
2. **Test locally** - Run `npm run dev` and test voice chat
3. **Customize** - Change voice, adjust settings
4. **Launch** - Push to production

---

## 📞 Quick Reference

**API Endpoint:** `https://api.openai.com/v1/realtime/sessions`  
**WebSocket:** `wss://api.openai.com/v1/realtime?model=MODEL_NAME`  
**Latest Model:** `gpt-realtime-2025-08-25`  
**Token Expiry:** 10 minutes (600 seconds)  
**Audio Format:** PCM16, 24kHz  

---

**Run the test and let me know what happens!** 🎙️
