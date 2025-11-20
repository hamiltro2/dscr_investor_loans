# ============================================
# Google Calendar Integration Setup Script (PowerShell)
# ============================================
# This script automates the entire Google Calendar setup process
# using Google Cloud CLI (gcloud)
#
# Prerequisites:
# 1. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
# 2. Run: gcloud auth login
# 3. Have your Google Workspace email ready
# ============================================

$ErrorActionPreference = "Stop"

Write-Host "Setting up Google Calendar Integration for Cap ChatGPT" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$PROJECT_ID = "capital-bridge-cap-chatgpt"
$SERVICE_ACCOUNT_NAME = "cap-chatgpt-calendar"
$SERVICE_ACCOUNT_EMAIL = "$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com"
$KEY_FILE = "google-service-account.json"

# Prompt for calendar email
Write-Host "What's your Google Workspace email (the calendar to schedule on)?" -ForegroundColor Yellow
$CALENDAR_EMAIL = Read-Host "Email"

Write-Host ""
Write-Host "Setting up with:" -ForegroundColor Green
Write-Host "  Project ID: $PROJECT_ID"
Write-Host "  Service Account: $SERVICE_ACCOUNT_EMAIL"
Write-Host "  Calendar: $CALENDAR_EMAIL"
Write-Host ""
Write-Host "Press Enter to continue or Ctrl+C to cancel..." -ForegroundColor Yellow
$null = Read-Host

# Step 1: Create Project
Write-Host ""
Write-Host "Step 1: Creating Google Cloud Project..." -ForegroundColor Cyan
try {
    gcloud projects describe $PROJECT_ID 2>$null
    Write-Host "Project already exists" -ForegroundColor Green
} catch {
    gcloud projects create $PROJECT_ID --name="Capital Bridge Cap GPT"
    Write-Host "Project created" -ForegroundColor Green
}

# Set the project as active
gcloud config set project $PROJECT_ID

# Step 2: Enable Billing
Write-Host ""
Write-Host "Step 2: Linking billing account..." -ForegroundColor Cyan
Write-Host "You may need to enable billing manually in the console:" -ForegroundColor Yellow
Write-Host "    https://console.cloud.google.com/billing/linkedaccount?project=$PROJECT_ID" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Enter once billing is enabled (or if already enabled)..." -ForegroundColor Yellow
$null = Read-Host

# Step 3: Enable Calendar API
Write-Host ""
Write-Host "Step 3: Enabling Google Calendar API..." -ForegroundColor Cyan
gcloud services enable calendar-json.googleapis.com
Write-Host "Calendar API enabled" -ForegroundColor Green

# Step 4: Create Service Account
Write-Host ""
Write-Host "Step 4: Creating service account..." -ForegroundColor Cyan
try {
    gcloud iam service-accounts describe $SERVICE_ACCOUNT_EMAIL 2>$null
    Write-Host "Service account already exists" -ForegroundColor Green
} catch {
    gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME `
        --display-name="Cap ChatGPT Calendar Service Account" `
        --description="Service account for Cap ChatGPT to create calendar events"
    Write-Host "Service account created" -ForegroundColor Green
}

# Step 5: Create Key
Write-Host ""
Write-Host "Step 5: Creating service account key..." -ForegroundColor Cyan
if (Test-Path $KEY_FILE) {
    Write-Host "Key file already exists. Backing up..." -ForegroundColor Yellow
    $timestamp = [DateTimeOffset]::Now.ToUnixTimeSeconds()
    Move-Item $KEY_FILE "$KEY_FILE.backup.$timestamp"
}

gcloud iam service-accounts keys create $KEY_FILE `
    --iam-account=$SERVICE_ACCOUNT_EMAIL

Write-Host "Key created and saved to: $KEY_FILE" -ForegroundColor Green

# Step 6: Convert to environment variable format
Write-Host ""
Write-Host "Step 6: Preparing environment variable..." -ForegroundColor Cyan

# Read and minify JSON
$jsonContent = Get-Content $KEY_FILE -Raw | ConvertFrom-Json | ConvertTo-Json -Compress -Depth 10
$envVar = "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='$jsonContent'"

Write-Host ""
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 1: Add this to your .env.local file:" -ForegroundColor Yellow
Write-Host ""
Write-Host $envVar -ForegroundColor White
Write-Host ""
Write-Host "GOOGLE_CALENDAR_ID='$CALENDAR_EMAIL'" -ForegroundColor White
Write-Host ""
Write-Host ""
Write-Host "STEP 2: Share your calendar with the service account:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   a) Open Google Calendar: https://calendar.google.com"
Write-Host "   b) Find your calendar (or create 'Cap Scheduled Calls')"
Write-Host "   c) Click settings -> 'Share with specific people'"
Write-Host "   d) Add this email: $SERVICE_ACCOUNT_EMAIL" -ForegroundColor White
Write-Host "   e) Set permission: Make changes to events"
Write-Host "   f) Click Send"
Write-Host ""
Write-Host ""
Write-Host "STEP 3: Test the integration:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   npm run dev"
Write-Host ""
Write-Host "   Then test through Cap ChatGPT:"
Write-Host "   'I want to schedule a call for tomorrow at 2pm'"
Write-Host ""
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "SECURITY REMINDER" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The file $KEY_FILE contains sensitive credentials!" -ForegroundColor Red
Write-Host ""
Write-Host "Already added to .gitignore" -ForegroundColor Green
Write-Host "NEVER commit this file to Git" -ForegroundColor Red
Write-Host "NEVER share this file publicly" -ForegroundColor Red
Write-Host "Store it securely (1Password, etc.)" -ForegroundColor Green
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Copy to clipboard
try {
    $envVar | Set-Clipboard
    Write-Host "Environment variable copied to clipboard!" -ForegroundColor Green
} catch {
    Write-Host "Could not copy to clipboard automatically" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "All done! Follow the next steps above to complete setup." -ForegroundColor Green
