/**
 * Usage Tracking Service
 * @module UsageService
 * @description Manages free tier limits and premium features
 */

class UsageService {
  constructor() {
    this.FREE_DAILY_LIMIT = (typeof CONFIG !== 'undefined' && CONFIG.FREE_DAILY_LIMIT) || 3;
    this.STORAGE_KEY = 'ai_usage_tracking';
  }

  /**
   * Check if user can perform an AI analysis
   * @returns {Promise<Object>} Usage status
   */
  async canUseAI() {
    const usage = await this._getUsage();
    const isPremium = await this._isPremium();

    if (isPremium) {
      return {
        allowed: true,
        remaining: 'unlimited',
        isPremium: true
      };
    }

    const today = this._getTodayKey();
    const todayUsage = usage[today] || 0;
    const remaining = this.FREE_DAILY_LIMIT - todayUsage;

    return {
      allowed: remaining > 0,
      remaining: Math.max(0, remaining),
      used: todayUsage,
      limit: this.FREE_DAILY_LIMIT,
      isPremium: false,
      resetsIn: this._getTimeUntilReset()
    };
  }

  /**
   * Record an AI analysis usage
   * @returns {Promise<void>}
   */
  async recordUsage() {
    const usage = await this._getUsage();
    const today = this._getTodayKey();
    
    usage[today] = (usage[today] || 0) + 1;
    
    // Clean old entries (keep last 7 days)
    this._cleanOldEntries(usage);
    
    await chrome.storage.local.set({ [this.STORAGE_KEY]: usage });
  }

  /**
   * Get current usage stats
   * @returns {Promise<Object>}
   */
  async getUsageStats() {
    const usage = await this._getUsage();
    const today = this._getTodayKey();
    const todayUsage = usage[today] || 0;
    const isPremium = await this._isPremium();

    // Calculate total usage (last 7 days)
    const totalUsage = Object.values(usage).reduce((sum, count) => sum + count, 0);

    return {
      today: todayUsage,
      total: totalUsage,
      isPremium,
      limit: this.FREE_DAILY_LIMIT,
      remaining: isPremium ? 'unlimited' : Math.max(0, this.FREE_DAILY_LIMIT - todayUsage)
    };
  }

  /**
   * Check if user has premium access
   * @private
   */
  async _isPremium() {
    const result = await chrome.storage.local.get('premium_status');
    return result.premium_status?.active || false;
  }

  /**
   * Get usage data
   * @private
   */
  async _getUsage() {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    return result[this.STORAGE_KEY] || {};
  }

  /**
   * Get today's key (YYYY-MM-DD)
   * @private
   */
  _getTodayKey() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  /**
   * Clean old usage entries
   * @private
   */
  _cleanOldEntries(usage) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    const cutoffKey = cutoffDate.toISOString().split('T')[0];

    Object.keys(usage).forEach(key => {
      if (key < cutoffKey) {
        delete usage[key];
      }
    });
  }

  /**
   * Get time until daily reset (in hours)
   * @private
   */
  _getTimeUntilReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const hoursUntilReset = Math.ceil((tomorrow - now) / (1000 * 60 * 60));
    return `${hoursUntilReset}h`;
  }
}

// Export singleton instance
const usageService = new UsageService();
