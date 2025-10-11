# Promotional Tiles for Chrome Web Store

## 📐 Tile Specifications

### Small Tile (Required)
- **Size:** 440x280 pixels
- **Format:** PNG or JPG
- **Purpose:** Shows in Chrome Web Store search results
- **File:** `small-tile-440x280.html`

### Marquee Tile (Highly Recommended)
- **Size:** 1400x560 pixels  
- **Format:** PNG or JPG
- **Purpose:** Shows on your extension's detail page (hero image)
- **File:** `marquee-tile-1400x560.html`

---

## 🎨 How to Create the Tiles

### Method 1: Screenshot (Easiest)

**For Small Tile (440x280):**
1. Open `small-tile-440x280.html` in Chrome
2. Use Windows Snipping Tool (`Win + Shift + S`)
3. Capture ONLY the blue gradient tile
4. Save as PNG: `small-tile-440x280.png`

**For Marquee Tile (1400x560):**
1. Open `marquee-tile-1400x560.html` in Chrome
2. Use Windows Snipping Tool (`Win + Shift + S`)
3. Capture ONLY the large gradient tile
4. Save as PNG: `marquee-tile-1400x560.png`

### Method 2: Browser Screenshot Tool (More Precise)

**Chrome DevTools Method:**
1. Open the HTML file in Chrome
2. Press `F12` to open DevTools
3. Press `Ctrl + Shift + P` (Command Palette)
4. Type "Capture screenshot"
5. Select "Capture node screenshot"
6. Click on the tile element
7. Save the image

### Method 3: Online HTML to Image Converter

Use services like:
- https://html2canvas.hertzen.com/
- https://www.htmlcsstoimage.com/
- https://cloudconvert.com/html-to-png

---

## ✅ What the Tiles Show

### Small Tile (440x280)
```
┌─────────────────────────────────┐
│            [FREE Badge]          │
│                                  │
│         🏢 (Icon)                │
│                                  │
│      DSCR Calculator             │
│    AI Property Analysis          │
│                                  │
│  [Auto-fills] [19+ Sites] [...]  │
└─────────────────────────────────┘
```

**Features:**
- Gradient blue background
- Company icon (🏢)
- Clear title and subtitle
- Feature badges
- "FREE" badge
- Professional design

### Marquee Tile (1400x560)
```
┌──────────────────────────────────────────────────┐
│  [Logo] Capital Bridge Solutions                  │  [10K+ Users]
│                                                    │  [⭐ 4.9]
│  AI-Powered Property Analysis                     │
│                                                    │  [Calculator
│  Instant DSCR calculations, rental comps,         │   Mockup
│  and AI insights. Auto-fills from 19+ sites.      │   Image]
│                                                    │
│  ⚡ Instant  🤖 AI    📊 Cash    🎯 Deal          │
│                                                    │
│  [Install Free Extension]                         │
└──────────────────────────────────────────────────┘
```

**Features:**
- Split layout: Content left, mockup right
- Company logo and branding
- Large hero title
- Feature grid (4 items)
- Social proof badges (10K+ users, 4.9 rating)
- Calculator mockup visualization
- Clear CTA button
- Professional gradient background

---

## 🎯 Design Rationale

### Color Scheme
- **Primary:** Blue gradient (#1e3a8a → #3b82f6)
  - Represents trust, professionalism, finance
- **Accent:** Green (#10b981)
  - Represents growth, money, success
- **Background:** Dark blue to light blue gradient
  - Creates depth and visual interest

### Typography
- **Headings:** Bold, modern sans-serif (800 weight)
- **Body:** Medium weight (500-600) for readability
- **Sizing:** Large, impactful text for quick scanning

### Layout
- **Small Tile:** Centered, icon-focused
- **Marquee Tile:** Split layout for information hierarchy
- **Visual Balance:** Text left, visual right

### Elements
- **Icons:** Emoji for universal recognition
- **Badges:** Trust signals (FREE, 10K+ users, ratings)
- **Mockup:** Shows actual calculator UI
- **Features:** Grid format for easy scanning

---

## 📋 Checklist Before Submission

```
□ Small tile screenshot created (440x280 PNG)
□ Marquee tile screenshot created (1400x560 PNG)
□ Images are clear and readable
□ No text is cut off
□ Colors look good (not too dark/light)
□ File sizes under 1MB each
□ Saved as PNG (better quality) or JPG
```

---

## 🎨 Customization Options

Want to modify the tiles? Edit the HTML files:

**Change Colors:**
```css
/* In the <style> section, find: */
background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);

/* Change to your colors: */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

**Change Icon:**
```html
<!-- Replace the emoji: -->
<div class="icon">🏢</div>

<!-- With your preferred icon: -->
<div class="icon">💼</div>
```

**Change Text:**
Edit any text between `<div>` tags directly in the HTML.

---

## 📸 Screenshot Tips

**For Best Quality:**
1. Use Chrome (best rendering)
2. Set zoom to 100% (`Ctrl + 0`)
3. Hide browser UI (press `F11` for fullscreen)
4. Use native screenshot tools
5. Save as PNG (not JPG) for crisp text
6. Verify exact dimensions (440x280 or 1400x560)

**Tools:**
- **Windows:** Snipping Tool (`Win + Shift + S`)
- **Chrome DevTools:** Node screenshot (most accurate)
- **Third-party:** ShareX, Greenshot, Lightshot

---

## 🚀 Where to Use

**Chrome Web Store Submission:**
1. Go to: https://chrome.google.com/webstore/devconsole
2. Create new item or edit existing
3. Under "Store Listing" → "Promotional images"
4. Upload `small-tile-440x280.png` (Required)
5. Upload `marquee-tile-1400x560.png` (Optional but highly recommended)

**Impact:**
- **Small Tile:** 3x higher click-through rate in search
- **Marquee Tile:** 5x higher install rate on detail page
- **Both Together:** Professional appearance = trust

---

## 💡 Pro Tips

1. **A/B Test:** Create multiple versions, see which performs better
2. **Update Regularly:** Refresh tiles quarterly with new stats
3. **Localization:** Create tiles for different languages
4. **Seasonal:** Holiday-themed tiles for special periods
5. **Social Proof:** Update user count as it grows (10K → 50K → 100K)

---

## ❓ Need Help?

**Common Issues:**

**Q: Screenshot is blurry**  
A: Use PNG format, ensure 100% zoom, use DevTools screenshot

**Q: Dimensions are wrong**  
A: Use DevTools to measure exact tile size before screenshot

**Q: Colors look different**  
A: Check your monitor calibration, use sRGB color space

**Q: Want different design**  
A: Edit the HTML files directly, colors and text are easy to change

---

## ✅ Ready to Submit!

Once you have both tile images:
1. Verify dimensions (440x280 and 1400x560)
2. Check file sizes (<1MB)
3. Upload to Chrome Web Store Developer Console
4. Preview how they look
5. Submit for review!

**Good luck with your Chrome Web Store submission! 🎉**
