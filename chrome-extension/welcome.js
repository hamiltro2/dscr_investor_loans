// Welcome page JavaScript

// Track that user has seen onboarding
chrome.storage.local.set({ onboardingComplete: true });

// Open Chrome Web Store review page
document.addEventListener('DOMContentLoaded', () => {
  const reviewLink = document.getElementById('reviewLink');
  if (reviewLink) {
    reviewLink.addEventListener('click', (e) => {
      e.preventDefault();
      // This will be updated with actual extension ID after publishing
      alert('Thank you! Please rate us 5 stars on the Chrome Web Store after you try the extension!');
    });
  }
});
