#!/bin/bash

# ============================================
# Google Calendar Integration Setup Script
# ============================================
# This script automates the entire Google Calendar setup process
# using Google Cloud CLI (gcloud)
#
# Prerequisites:
# 1. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
# 2. Run: gcloud auth login
# 3. Have your Google Workspace email ready
# ============================================

set -e  # Exit on any error

echo "🚀 Setting up Google Calendar Integration for Cap ChatGPT"
echo "=========================================================="
echo ""

# Configuration
PROJECT_ID="capital-bridge-cap-chatgpt"
SERVICE_ACCOUNT_NAME="cap-chatgpt-calendar"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
KEY_FILE="google-service-account.json"

# Prompt for calendar email
echo "📧 What's your Google Workspace email (the calendar to schedule on)?"
read -p "Email: " CALENDAR_EMAIL

echo ""
echo "Setting up with:"
echo "  Project ID: $PROJECT_ID"
echo "  Service Account: $SERVICE_ACCOUNT_EMAIL"
echo "  Calendar: $CALENDAR_EMAIL"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

# Step 1: Create Project
echo ""
echo "📦 Step 1: Creating Google Cloud Project..."
if gcloud projects describe $PROJECT_ID &>/dev/null; then
    echo "✅ Project already exists"
else
    gcloud projects create $PROJECT_ID --name="Capital Bridge Solutions - Cap ChatGPT"
    echo "✅ Project created"
fi

# Set the project as active
gcloud config set project $PROJECT_ID

# Step 2: Enable Billing (required for API)
echo ""
echo "💳 Step 2: Linking billing account..."
echo "⚠️  You may need to enable billing manually in the console:"
echo "    https://console.cloud.google.com/billing/linkedaccount?project=$PROJECT_ID"
echo ""
read -p "Press Enter once billing is enabled (or if already enabled)..."

# Step 3: Enable Calendar API
echo ""
echo "🔌 Step 3: Enabling Google Calendar API..."
gcloud services enable calendar-json.googleapis.com
echo "✅ Calendar API enabled"

# Step 4: Create Service Account
echo ""
echo "👤 Step 4: Creating service account..."
if gcloud iam service-accounts describe $SERVICE_ACCOUNT_EMAIL &>/dev/null; then
    echo "✅ Service account already exists"
else
    gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
        --display-name="Cap ChatGPT Calendar Service Account" \
        --description="Service account for Cap ChatGPT to create calendar events"
    echo "✅ Service account created"
fi

# Step 5: Create Key
echo ""
echo "🔑 Step 5: Creating service account key..."
if [ -f "$KEY_FILE" ]; then
    echo "⚠️  Key file already exists. Backing up..."
    mv $KEY_FILE "${KEY_FILE}.backup.$(date +%s)"
fi

gcloud iam service-accounts keys create $KEY_FILE \
    --iam-account=$SERVICE_ACCOUNT_EMAIL

echo "✅ Key created and saved to: $KEY_FILE"

# Step 6: Convert to environment variable format
echo ""
echo "📋 Step 6: Preparing environment variable..."

# Read the JSON and minify it
SERVICE_ACCOUNT_JSON=$(cat $KEY_FILE | jq -c '.')

echo ""
echo "✅ Setup Complete!"
echo ""
echo "=========================================================="
echo "📝 Next Steps:"
echo "=========================================================="
echo ""
echo "1️⃣  Add this to your .env.local file:"
echo ""
echo "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='${SERVICE_ACCOUNT_JSON}'"
echo ""
echo "GOOGLE_CALENDAR_ID='${CALENDAR_EMAIL}'"
echo ""
echo ""
echo "2️⃣  Share your calendar with the service account:"
echo ""
echo "   a) Open Google Calendar: https://calendar.google.com"
echo "   b) Find your calendar (or create 'Cap Scheduled Calls')"
echo "   c) Click ⚙️ → 'Share with specific people'"
echo "   d) Add this email: ${SERVICE_ACCOUNT_EMAIL}"
echo "   e) Set permission: 'Make changes to events'"
echo "   f) Click 'Send'"
echo ""
echo ""
echo "3️⃣  Test the integration:"
echo ""
echo "   npm run dev"
echo ""
echo "   Then test through Cap ChatGPT:"
echo "   'I want to schedule a call for tomorrow at 2pm'"
echo ""
echo ""
echo "=========================================================="
echo "⚠️  SECURITY REMINDER"
echo "=========================================================="
echo ""
echo "The file $KEY_FILE contains sensitive credentials!"
echo ""
echo "✅ Already added to .gitignore"
echo "❌ NEVER commit this file to Git"
echo "❌ NEVER share this file publicly"
echo "✅ Store it securely (1Password, etc.)"
echo ""
echo "=========================================================="
echo ""

# Optional: Copy to clipboard (if available)
if command -v pbcopy &> /dev/null; then
    echo "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='${SERVICE_ACCOUNT_JSON}'" | pbcopy
    echo "✅ Environment variable copied to clipboard (Mac)"
elif command -v clip &> /dev/null; then
    echo "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='${SERVICE_ACCOUNT_JSON}'" | clip
    echo "✅ Environment variable copied to clipboard (Windows)"
elif command -v xclip &> /dev/null; then
    echo "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS='${SERVICE_ACCOUNT_JSON}'" | xclip -selection clipboard
    echo "✅ Environment variable copied to clipboard (Linux)"
fi

echo ""
echo "🎉 All done! Follow the next steps above to complete setup."
