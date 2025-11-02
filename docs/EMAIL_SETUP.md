# Email Configuration Guide

## Overview
The voice chat system sends email notifications when leads are captured. For emails to work, you need to configure SMTP settings in your `.env.local` file.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
SMTP_FROM=your_email@gmail.com
SMTP_TO=team@capitalbridgesolutions.com
```

## Gmail Setup Instructions

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. In Google Account Security settings
2. Under "2-Step Verification", find "App passwords"
3. Click "Generate" and select "Mail"
4. Copy the 16-character password

### Step 3: Update Environment Variables
```env
SMTP_USER=your_gmail@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop  # Your 16-character app password (no spaces)
SMTP_FROM=your_gmail@gmail.com
SMTP_TO=recipient@example.com      # Where to send lead notifications
```

## Alternative Email Providers

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=465
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

### Outlook/Office365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your_email@outlook.com
SMTP_PASSWORD=your_password
```

## Testing Email Configuration

1. Restart your development server after updating `.env.local`
2. Test with a voice chat lead capture
3. Check console logs for email status:
   - Success: `[Email] Cap lead notification sent successfully`
   - Error: `[Email] Error sending Cap lead notification: [error details]`

## Troubleshooting

### Common Issues:

1. **"Username and Password not accepted"**
   - You're using your regular Gmail password instead of an app password
   - Solution: Generate an app password (see Step 2 above)

2. **"Connection timeout"**
   - Firewall blocking SMTP port
   - Wrong port number
   - Solution: Try port 587 with `secure: false` in the transporter config

3. **"No recipients defined"**
   - Missing SMTP_TO environment variable
   - Solution: Add recipient email(s) to SMTP_TO

4. **Emails not received but no error**
   - Check spam folder
   - Verify SMTP_TO email is correct
   - Check if your email provider has sending limits

## Email Content

Lead notification emails include:
- Lead name, email, phone
- Product type (DSCR, etc.)
- Loan amount requested
- Property details (if provided)
- Credit score (if provided)
- Timestamp and channel (voice_chat_ultravox)

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords, not your main account password
- Consider using a dedicated email account for notifications
- For production, use a professional email service (SendGrid, AWS SES, etc.)
