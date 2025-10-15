# 🎤 Voice/Mic Troubleshooting Guide

**Issue:** Microphone button not activating

---

## 🔍 **Quick Diagnosis**

### **Open Browser Console:**
1. Press **F12** (or right-click → Inspect)
2. Click **Console** tab
3. Click the microphone button in Cap's chat
4. Look for error messages

---

## 🚨 **Common Issues & Fixes**

### **Issue 1: HTTPS Required** ⭐ (Most Common)

**Problem:**
- Microphone only works on HTTPS (secure connection)
- `localhost` works, but `http://` doesn't

**Symptoms:**
```
Microphone access error: NotAllowedError
```

**Solution:**
You're running on `localhost` so this should work, but if deploying:
- ✅ Use HTTPS
- ✅ Get SSL certificate
- ✅ Or use ngrok for testing

---

### **Issue 2: Browser Permissions Denied**

**Problem:**
- Browser blocked microphone access
- User clicked "Block" on permission prompt

**Check:**
1. Look for 🎤 icon in browser address bar
2. If there's a slash through it = blocked

**Solution:**

**Chrome:**
1. Click the 🔒 or 🎤 icon in address bar
2. Find "Microphone"
3. Change to "Allow"
4. Refresh page

**Firefox:**
1. Click 🔒 icon in address bar
2. Find "Permissions"
3. Allow microphone
4. Refresh page

**Edge:**
Same as Chrome

---

### **Issue 3: No Microphone Connected**

**Problem:**
- No physical microphone
- Mic is disabled in OS

**Check:**
- **Windows:** Settings → Privacy → Microphone → Allow apps
- **Check device:** Settings → System → Sound → Input device

---

### **Issue 4: Browser Compatibility**

**Problem:**
- Older browser version
- MediaRecorder API not supported

**Check:**
Open Console and run:
```javascript
console.log('MediaRecorder:', typeof MediaRecorder !== 'undefined');
console.log('getUserMedia:', typeof navigator.mediaDevices !== 'undefined');
```

**Should show:**
```
MediaRecorder: true
getUserMedia: true
```

**If false:**
- Update browser to latest version
- Chrome 49+, Firefox 29+, Edge 79+

---

## 🧪 **Quick Test**

### **Test 1: Check Browser Permissions**

Open Console (F12) and paste:

```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(() => console.log('✅ Microphone access granted!'))
  .catch(err => console.error('❌ Microphone error:', err.name, err.message));
```

**Expected:**
- Browser asks for permission
- Console shows: `✅ Microphone access granted!`

**If error:**
- Check permissions (see Issue 2)
- Make sure you're on localhost or HTTPS

---

### **Test 2: Check MediaRecorder**

Open Console and paste:

```javascript
console.log({
  hasMediaRecorder: typeof MediaRecorder !== 'undefined',
  hasGetUserMedia: typeof navigator.mediaDevices?.getUserMedia !== 'undefined',
  isSecureContext: window.isSecureContext,
  protocol: window.location.protocol
});
```

**Should show:**
```javascript
{
  hasMediaRecorder: true,
  hasGetUserMedia: true,
  isSecureContext: true,  // Important!
  protocol: "http:"       // Should be "http:" on localhost
}
```

---

## 🔧 **Step-by-Step Fix**

### **1. Verify You're on Localhost**
- URL should be: `http://localhost:3000`
- NOT: `http://10.0.0.41:3000` (use localhost!)

### **2. Check Browser Permissions**
1. Click 🔒 icon in address bar
2. Find "Microphone" permission
3. Set to "Allow"
4. Refresh page (Ctrl+R)

### **3. Test Microphone Access**
1. Open chat
2. Click microphone button 🎤
3. Browser should show permission prompt
4. Click "Allow"
5. Button should turn red and pulse

### **4. If Still Not Working**
- Try different browser (Chrome recommended)
- Check Windows microphone permissions
- Restart browser
- Check if antivirus is blocking

---

## 💡 **Expected Behavior**

### **When Working Correctly:**

1. **Click mic button** 🎤
   - Browser asks for permission (first time)
   - Button turns red
   - Button pulses/animates
   - Tooltip changes to "Click to stop recording"

2. **Speak into mic**
   - Record your message
   - Keep clicking red button to stop

3. **Click red button** (stop)
   - Recording stops
   - Text appears in input field
   - Auto-transcribed by Whisper

4. **Click send** or **Enter**
   - Message sent to Cap
   - Cap responds (text + voice)

---

## 🎯 **Quick Fixes Summary**

| Issue | Fix |
|-------|-----|
| **Permission denied** | Allow mic in browser settings |
| **Not on HTTPS** | Use localhost or deploy with SSL |
| **No prompt showing** | Clear site settings, refresh |
| **Mic button does nothing** | Check Console for errors |
| **Wrong URL** | Use `localhost:3000` not IP |

---

## 🚀 **Test Right Now**

### **Method 1: Browser Test**

1. Go to: http://localhost:3000
2. Open Chrome DevTools (F12)
3. Go to Console tab
4. Paste this:

```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    console.log('✅ MIC WORKS!');
    stream.getTracks().forEach(track => track.stop());
  })
  .catch(err => console.error('❌ MIC ERROR:', err));
```

5. Click "Allow" on prompt
6. Should see: `✅ MIC WORKS!`

### **Method 2: Cap's Chat Test**

1. Open Cap's chat
2. Click microphone button
3. Look for:
   - Permission prompt (click Allow)
   - Red pulsing button
   - Recording indicator

---

## 📞 **Still Not Working?**

### **Send me these details:**

1. **Browser & Version:**
   - Chrome 120? Firefox 115? Edge 120?

2. **URL you're using:**
   - localhost:3000? or IP address?

3. **Console errors:**
   - F12 → Console → Screenshot any red errors

4. **Permission status:**
   - 🔒 icon → Microphone → Allowed or Blocked?

---

## ✅ **Quick Checklist**

Before asking for help, verify:

- [ ] Using latest Chrome/Edge
- [ ] On `http://localhost:3000` (not IP)
- [ ] Microphone permission = "Allow"
- [ ] Windows mic permissions enabled
- [ ] Mic physically connected/working
- [ ] Tested in browser console (test above)
- [ ] Checked Console for errors
- [ ] Tried refreshing page (Ctrl+R)
- [ ] Cleared browser cache

---

## 🎉 **Most Common Solution**

**90% of the time it's:**

1. **Wrong URL** → Use `http://localhost:3000`
2. **Permissions** → Allow microphone in browser
3. **First time** → Need to click "Allow" on prompt

**Try those three first!** ✨

---

**Let me know what you see in the Console and I'll help fix it!** 🔧
