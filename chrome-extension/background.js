// Background script for handling analytics and tracking

// Listen for tracking messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'track') {
    // Log calculator usage
    console.log('Calculator used:', request.type, 'Value:', request.value);
    
    // You could send this to Google Analytics or your own analytics
    // For now, we'll just store usage stats locally
    chrome.storage.local.get(['usageStats'], (result) => {
      const stats = result.usageStats || {
        dscr: 0,
        hardMoney: 0,
        roi: 0,
        totalCalculations: 0
      };
      
      stats[request.type] = (stats[request.type] || 0) + 1;
      stats.totalCalculations += 1;
      
      chrome.storage.local.set({ usageStats: stats });
    });
  }
});

// Set up context menu for quick access and open welcome page on first install
chrome.runtime.onInstalled.addListener((details) => {
  // Create context menu
  chrome.contextMenus.create({
    id: 'openCalculator',
    title: 'Capital Bridge Solutions Calculator',
    contexts: ['page']
  });

  // Open welcome page on first install
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'welcome.html'
    });
  }

  // Open welcome page on update (optional - can remove if you don't want this)
  // if (details.reason === 'update') {
  //   chrome.tabs.create({
  //     url: 'welcome.html'
  //   });
  // }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openCalculator') {
    chrome.action.openPopup();
  }
});
