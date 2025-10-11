# Chrome Web Store Package Creator
# Creates a .zip file ready for Chrome Web Store submission

Write-Host "📦 Packaging Chrome Extension for Chrome Web Store..." -ForegroundColor Cyan

# Output file
$zipFile = "capital-bridge-solutions-extension-v2.0.0.zip"

# Remove old zip if exists
if (Test-Path $zipFile) {
    Remove-Item $zipFile
    Write-Host "🗑️  Removed old package" -ForegroundColor Yellow
}

# Files to include
$filesToInclude = @(
    "manifest.json",
    "popup.html",
    "popup.js",
    "popup.css",
    "background.js",
    "content.js",
    "content.css",
    "config.js",
    "ai-controller.js",
    "lead-modal.js",
    "welcome.html",
    "images/*",
    "styles/*",
    "services/*"
)

# Files to EXCLUDE (important!)
$filesToExclude = @(
    "config.local.js",          # Contains API key
    "*.md",                      # Documentation files
    "*.ps1",                     # This script
    "*.zip",                     # Old packages
    ".git*"                      # Git files
)

Write-Host "📋 Files to include:" -ForegroundColor Green
foreach ($file in $filesToInclude) {
    Write-Host "  ✅ $file"
}

Write-Host "`n🚫 Files to exclude:" -ForegroundColor Red
foreach ($file in $filesToExclude) {
    Write-Host "  ❌ $file"
}

# Create temp directory
$tempDir = "temp-package"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files (excluding config.local.js and other unwanted files)
Write-Host "`n📁 Copying files..." -ForegroundColor Cyan

Copy-Item "manifest.json" -Destination $tempDir
Copy-Item "popup.html" -Destination $tempDir
Copy-Item "popup.js" -Destination $tempDir
Copy-Item "popup.css" -Destination $tempDir
Copy-Item "background.js" -Destination $tempDir
Copy-Item "content.js" -Destination $tempDir
Copy-Item "content.css" -Destination $tempDir
Copy-Item "config.js" -Destination $tempDir
Copy-Item "ai-controller.js" -Destination $tempDir
Copy-Item "lead-modal.js" -Destination $tempDir
Copy-Item "welcome.html" -Destination $tempDir

# Copy directories
Copy-Item "images" -Destination $tempDir -Recurse
Copy-Item "styles" -Destination $tempDir -Recurse
Copy-Item "services" -Destination $tempDir -Recurse

# Verify config.local.js is NOT in package
if (Test-Path "$tempDir\config.local.js") {
    Write-Host "⚠️  WARNING: config.local.js found in package! Removing..." -ForegroundColor Red
    Remove-Item "$tempDir\config.local.js"
}

# Create zip file
Write-Host "`n🗜️  Creating zip file..." -ForegroundColor Cyan
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipFile -Force

# Cleanup temp directory
Remove-Item $tempDir -Recurse -Force

# Get file size
$fileSize = (Get-Item $zipFile).Length / 1KB
$fileSizeFormatted = "{0:N2} KB" -f $fileSize

Write-Host "`n✅ Package created successfully!" -ForegroundColor Green
Write-Host "📦 File: $zipFile" -ForegroundColor Cyan
Write-Host "📏 Size: $fileSizeFormatted" -ForegroundColor Cyan

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to: https://chrome.google.com/webstore/devconsole"
Write-Host "2. Click 'New Item'"
Write-Host "3. Upload: $zipFile"
Write-Host "4. Fill in store listing details"
Write-Host "5. Submit for review!"

Write-Host "`n🔍 IMPORTANT: Verify config.local.js is NOT in the package!" -ForegroundColor Red
Write-Host "⚠️  The package should use the placeholder API key from config.js" -ForegroundColor Yellow
Write-Host "⚠️  Users will need to add their own API key in config.local.js" -ForegroundColor Yellow

Write-Host "`nDone! 🚀" -ForegroundColor Green
