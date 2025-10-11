# How to Create Proper Extension Icons

## The Orange Icon Problem
Chrome shows an orange camera icon because it needs SQUARE icons (not rectangular logos).

## Solution: Create Square Icons

### Method 1: Online Tool (Recommended)
1. Go to: https://www.favicon-generator.org/
2. Upload: `C:\Users\hamil\dscr_loan_leads\public\Capital_Bridge_solutions_Logo.png`
3. Download the ZIP file
4. Extract and copy these files to `chrome-extension/images/`:
   - favicon-16x16.png → rename to icon-16.png
   - favicon-32x32.png → rename to icon-32.png  
   - android-chrome-192x192.png → rename to icon-128.png

### Method 2: Use Photoshop/Canva
1. Create 128x128px square canvas
2. Add your logo centered
3. Add background color (blue #3b82f6 or white)
4. Export as PNG
5. Resize to create:
   - 16x16px (icon-16.png)
   - 48x48px (icon-48.png)
   - 128x128px (icon-128.png)

### Method 3: Simple Text Icon
Create a simple square with "CBS" text:
- Background: #3b82f6 (blue)
- Text: "CBS" in white, bold
- Size: 128x128px
- Save as icon-128.png
- Resize for other sizes

## Quick Fix for Now
The orange icon won't show in Chrome Web Store - only in developer mode.
You can proceed with publishing and fix icons later.

## After Creating Icons
1. Replace files in `chrome-extension/images/`
2. Remove and re-add extension
3. Orange icon will be gone!
