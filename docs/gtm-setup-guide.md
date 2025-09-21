# Google Tag Manager Setup for High-Intent Tracking

## 1. Install GTM (if not already installed)

Add to your layout.tsx:

```tsx
// In the <head> section
<Script id="gtm-script" strategy="afterInteractive">
  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXX');`}
</Script>

// In the <body> section (right after opening tag)
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## 2. High-Intent Triggers to Create in GTM

### Trigger 1: Scroll Depth
- **Trigger Type**: Scroll Depth
- **Vertical Scroll Depths**: 25%, 50%, 75%, 90%
- **Track**: Window Load

### Trigger 2: Time on Page
- **Trigger Type**: Timer
- **Event Name**: gtm.timer
- **Interval**: 30000 (30 seconds)
- **Limit**: 5 (tracks up to 2.5 minutes)

### Trigger 3: Form Engagement
- **Trigger Type**: Form Submission
- **Check Validation**: Yes
- **This trigger fires on**: All Forms

### Trigger 4: Click Tracking
Track clicks on:
- Phone numbers
- CTA buttons
- FAQ items
- Calculator inputs

## 3. Variables to Create

### Variable 1: Scroll Percentage
- **Variable Type**: Data Layer Variable
- **Name**: gtm.scrollThreshold

### Variable 2: Time on Page
- **Variable Type**: Custom JavaScript
```javascript
function() {
  var now = new Date().getTime();
  var loadTime = window.performance.timing.navigationStart;
  return Math.round((now - loadTime) / 1000);
}
```

### Variable 3: Page Path
- **Variable Type**: URL
- **Component Type**: Path

## 4. Tags to Create

### Tag 1: High Intent - Deep Scroll
- **Tag Type**: Google Ads Remarketing
- **Trigger**: Scroll Depth >= 75%
- **Conversion ID**: AW-1002915679
- **Label**: high_intent_scroll

### Tag 2: High Intent - Time Engaged
- **Tag Type**: Google Ads Remarketing
- **Trigger**: Timer >= 2 minutes
- **Label**: high_intent_time

### Tag 3: High Intent - Form Start
- **Tag Type**: Google Analytics Event
- **Category**: Engagement
- **Action**: form_start
- **Trigger**: Form field focus

### Tag 4: High Intent - Multiple Actions
- **Tag Type**: Custom HTML
```javascript
<script>
  // Track users who perform multiple high-intent actions
  window.dataLayer = window.dataLayer || [];
  
  var intentScore = parseInt(localStorage.getItem('intentScore') || 0);
  intentScore++;
  localStorage.setItem('intentScore', intentScore);
  
  if (intentScore >= 3) {
    dataLayer.push({
      'event': 'highIntentUser',
      'intentScore': intentScore
    });
  }
</script>
```

## 5. Google Ads Audiences to Create

### Audience 1: High Intent - Engaged Visitors
- Visited 3+ pages
- Time on site > 2 minutes
- Scrolled > 75% on any page

### Audience 2: High Intent - Almost Converted
- Started filling form
- Clicked phone number
- Visited pricing/rates page

### Audience 3: Calculator Users
- Used DSCR calculator
- Spent > 30 seconds on calculator

### Audience 4: FAQ Readers
- Clicked 2+ FAQ items
- Spent > 1 minute on FAQ section

## 6. Optimization Strategy

### Bid Adjustments:
- High Intent Audiences: +50% bid adjustment
- Almost Converted: +75% bid adjustment
- Calculator Users: +40% bid adjustment

### Custom Messaging:
Create specific ads for each audience:
- "Complete Your Application"
- "Still Have Questions? Call Now"
- "Your Pre-Approval Awaits"

## 7. Implementation Code for Your Site

Add this to your components:

```tsx
// Track scroll depth
useEffect(() => {
  let maxScroll = 0;
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;
      
      if (scrollPercentage > 75 && !sessionStorage.getItem('highScroll')) {
        window.dataLayer?.push({
          'event': 'high_scroll_depth',
          'scroll_percentage': Math.round(scrollPercentage)
        });
        sessionStorage.setItem('highScroll', 'true');
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Track form field interactions
const trackFormEngagement = (fieldName: string) => {
  window.dataLayer?.push({
    'event': 'form_field_interaction',
    'field_name': fieldName
  });
};

// Track time on page
useEffect(() => {
  const startTime = Date.now();
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    if (timeSpent > 120 && !sessionStorage.getItem('highTimeSpent')) {
      window.dataLayer?.push({
        'event': 'high_time_on_page',
        'time_seconds': timeSpent
      });
      sessionStorage.setItem('highTimeSpent', 'true');
    }
  };
  
  const interval = setInterval(trackTime, 30000);
  return () => clearInterval(interval);
}, []);
```

## 8. Testing Your Setup

1. Install Google Tag Assistant Chrome extension
2. Visit
