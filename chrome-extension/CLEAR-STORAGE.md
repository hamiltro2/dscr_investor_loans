# Clear Extension Storage

The Hard Money calculator is showing wrong default values because saved values from DSCR calculator are overwriting them.

## Quick Fix:

1. **Open Chrome DevTools on the extension:**
   - Right-click extension icon
   - Click "Inspect popup"
   - Go to "Console" tab

2. **Run this command:**
   ```javascript
   chrome.storage.local.clear()
   ```

3. **Close and reopen extension**
   - All calculators will now show correct default values

## Or Just Remove and Re-add Extension:
1. Go to chrome://extensions/
2. Remove extension
3. Load unpacked again
4. Fresh start with correct defaults!
