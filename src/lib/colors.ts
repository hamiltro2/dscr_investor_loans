// Color utilities for financial metrics

// DSCR color thresholds
export function getDSCRColor(dscr: number): string {
  if (dscr >= 1.5) return 'text-green-600';  // Excellent
  if (dscr >= 1.25) return 'text-emerald-500';  // Very Good
  if (dscr >= 1.0) return 'text-yellow-500';  // Acceptable
  return 'text-red-500';  // Poor
}

// Cash flow color thresholds
export function getCashFlowColor(cashFlow: number): string {
  if (cashFlow >= 1000) return 'text-green-600';
  if (cashFlow > 0) return 'text-emerald-500';
  if (cashFlow === 0) return 'text-yellow-500';
  return 'text-red-500';
}

// Cap rate color thresholds
export function getCapRateColor(capRate: number): string {
  if (capRate >= 8) return 'text-green-600';  // Excellent
  if (capRate >= 6) return 'text-emerald-500';  // Good
  if (capRate >= 4) return 'text-yellow-500';  // Fair
  return 'text-red-500';  // Poor
}

// ROI/COC color thresholds
export function getROIColor(roi: number): string {
  if (roi < 0) return 'text-red-600';  // Negative ROI - Bad investment
  if (roi >= 15) return 'text-green-600';  // Excellent
  if (roi >= 10) return 'text-emerald-500';  // Good
  if (roi >= 5) return 'text-yellow-500';  // Fair
  return 'text-red-500';  // Poor
}

// Occupancy rate color thresholds
export function getOccupancyColor(rate: number): string {
  if (rate >= 95) return 'text-green-600';  // Excellent
  if (rate >= 90) return 'text-emerald-500';  // Good
  if (rate >= 85) return 'text-yellow-500';  // Fair
  return 'text-red-500';  // Poor
}

// Property class color
export function getPropertyClassColor(propertyClass: string): string {
  switch (propertyClass.toUpperCase()) {
    case 'A':
      return 'text-green-600';
    case 'B':
      return 'text-emerald-500';
    case 'C':
      return 'text-yellow-500';
    default:
      return 'text-gray-500';
  }
}

// Generic trend color (for year-over-year changes)
export function getTrendColor(percentChange: number): string {
  if (percentChange >= 10) return 'text-green-600';
  if (percentChange > 0) return 'text-emerald-500';
  if (percentChange === 0) return 'text-yellow-500';
  return 'text-red-500';
}
