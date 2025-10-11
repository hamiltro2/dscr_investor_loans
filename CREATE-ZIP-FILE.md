# Create ZIP File for Chrome Web Store

## 🎯 EASY METHOD - Windows File Explorer

### Step 1: Open the Extension Folder
1. Open File Explorer
2. Navigate to: `C:\Users\hamil\dscr_loan_leads\chrome-extension`
3. You should see these files:
   - manifest.json
   - popup.html
   - popup.css
   - popup.js
   - content.js
   - content.css
   - background.js
   - images (folder)
   - Other .md files (optional, can include)

### Step 2: Select ALL Files
1. Click inside the folder
2. Press **Ctrl + A** (selects everything)
3. All files should be highlighted in blue

### Step 3: Create ZIP
1. Right-click on any selected file
2. Hover over **"Send to"**
3. Click **"Compressed (zipped) folder"**
4. Windows will create a ZIP file
5. Name it: `chrome-extension.zip`

### Step 4: Move ZIP File
1. Cut the ZIP file (Ctrl + X)
2. Navigate to: `C:\Users\hamil\dscr_loan_leads\`
3. Paste it there (Ctrl + V)

---

## ⚠️ CRITICAL: Verify ZIP Structure

### CORRECT Structure (files at root):
```
chrome-extension.zip
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── content.js
├── content.css
├── background.js
└── images/
    ├── icon-16.png
    ├── icon-48.png
    ├── icon-128.png
    └── logo.svg
```

### WRONG Structure (folder inside ZIP):
```
chrome-extension.zip
└── chrome-extension/  ❌ DON'T DO THIS
    ├── manifest.json
    └── ...
```

### How to Check:
1. Double-click the ZIP file
2. You should see manifest.json IMMEDIATELY
3. NOT a folder, then manifest.json

---

## 🔄 ALTERNATIVE: PowerShell Method

If File Explorer doesn't work, use PowerShell:

1. Press **Windows + X**
2. Click **"Windows PowerShell"** or **"Terminal"**
3. Copy and paste this command:

```powershell
cd C:\Users\hamil\dscr_loan_leads
Compress-Archive -Path chrome-extension\* -DestinationPath chrome-extension.zip -Force
```

4. Press Enter
5. ZIP file will be created at: `C:\Users\hamil\dscr_loan_leads\chrome-extension.zip`

---

## ✅ CHECKLIST

Before uploading to Chrome Web Store:

- [ ] ZIP file created
- [ ] ZIP is at: `C:\Users\hamil\dscr_loan_leads\chrome-extension.zip`
- [ ] Double-checked: manifest.json is at root of ZIP (not in a folder)
- [ ] File size is reasonable (should be < 5MB)
- [ ] All images included (icon-16.png, icon-48.png, icon-128.png, logo.svg)

---

## 📤 READY TO UPLOAD!

Once you have the ZIP file:
1. Go back to Chrome Web Store Developer Dashboard
2. Complete registration ($5 fee)
3. Click "New Item"
4. Upload chrome-extension.zip
5. Fill in store listing
6. Submit!

---

## 🆘 TROUBLESHOOTING

**"Can't find the files"**
- Make sure you're in: C:\Users\hamil\dscr_loan_leads\chrome-extension
- Not in: C:\Users\hamil\dscr_loan_leads

**"ZIP is too large"**
- Should be < 5MB
- If larger, you may have extra files
- Only include necessary files

**"Manifest error when uploading"**
- Make sure manifest.json is at ROOT of ZIP
- Not inside a folder

---

Good luck! 🚀
