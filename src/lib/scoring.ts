/**
 * Lead Scoring Engine
 * Transparent, deterministic scoring for real estate loan applications
 * 
 * SCORING METHODOLOGY:
 * - Base score by product type (40-60)
 * - LTV adjustments (-10 to +15)
 * - DSCR adjustments (-10 to +12)
 * - Risk flag penalties (-5 to -15 each)
 * - Final score: 0-100
 * 
 * THRESHOLDS:
 * - ≥70 = Qualified (green light)
 * - 50-69 = Follow-up (needs review)
 * - <50 = Disqualified (red flag)
 */

import { Lead, ProductType } from '@prisma/client';
import {
  ScoreResult,
  PreliminaryOffer,
  EnrichmentData,
  EnrichmentDataSchema,
} from './schemas';

// ==================== CONSTANTS ====================

const BASE_SCORES: Record<ProductType, number> = {
  hard_money: 55,
  fix_flip: 60,
  dscr: 60,
  balloon_refi: 50,
  note_finance: 50,
};

const LTV_BANDS = [
  { max: 0.60, adjustment: +12 },
  { max: 0.70, adjustment: +8 },
  { max: 0.75, adjustment: +4 },
  { max: 0.80, adjustment: 0 },
  { max: Infinity, adjustment: -8 },
] as const;

const DSCR_BANDS = [
  { min: 1.25, adjustment: +10 },
  { min: 1.15, adjustment: +6 },
  { min: 1.10, adjustment: +3 },
  { min: 1.00, adjustment: 0 },
  { min: 0, adjustment: -10 },
] as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Calculate LTV (Loan-to-Value) ratio
 */
function calculateLTV(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 1.0;
  return loanAmount / propertyValue;
}

/**
 * Calculate DSCR (Debt Service Coverage Ratio)
 * DSCR = NOI / Debt Service
 */
function calculateDSCR(
  rentalIncome: number,
  taxes: number,
  insurance: number,
  hoa: number,
  loanAmount: number,
  rate: number = 0.10 // default 10% if not provided
): number {
  // NOI = Rental Income - Operating Expenses
  const noi = rentalIncome - taxes - insurance - hoa;

  // Monthly debt service (interest-only approximation)
  const monthlyPayment = (loanAmount * rate) / 12;

  if (monthlyPayment <= 0) return 0;
  return noi / monthlyPayment;
}

/**
 * Get LTV score adjustment
 */
function getLTVAdjustment(ltv: number): number {
  for (const band of LTV_BANDS) {
    if (ltv <= band.max) {
      return band.adjustment;
    }
  }
  return LTV_BANDS[LTV_BANDS.length - 1].adjustment;
}

/**
 * Get DSCR score adjustment
 */
function getDSCRAdjustment(dscr: number): number {
  for (const band of DSCR_BANDS) {
    if (dscr >= band.min) {
      return band.adjustment;
    }
  }
  return DSCR_BANDS[DSCR_BANDS.length - 1].adjustment;
}

/**
 * Evaluate rehab budget sanity for fix&flip
 */
function evaluateRehabBudget(rehabBudget: number, arv: number): number {
  const ratio = rehabBudget / arv;

  if (ratio >= 0.10 && ratio <= 0.35) {
    return +4; // Sweet spot
  }
  if (ratio > 0.45) {
    return -4; // Too high (risky)
  }
  return 0;
}

/**
 * Parse enrichment data safely
 */
function parseEnrichment(enrichmentJson: any): EnrichmentData {
  try {
    return EnrichmentDataSchema.parse(enrichmentJson);
  } catch {
    return {
      neighborhoodRisk: 0,
      zoningOK: true,
      newsNegative: false,
      priorFlips: 0,
    };
  }
}

// ==================== MAIN SCORING FUNCTION ====================

/**
 * Score a lead and generate preliminary offer
 */
export async function scoreLead(lead: Lead): Promise<ScoreResult> {
  const riskFlags: string[] = [];
  let reasoning = '';

  // Start with base score
  let score = BASE_SCORES[lead.productType] || 50;
  reasoning += `Base score for ${lead.productType}: ${score}\n`;

  // ========== LTV Calculation ==========
  const loanAmount = lead.loanAmountRequested ? Number(lead.loanAmountRequested) : 0;
  let ltv = 0;
  let propertyValue = 0;

  if (lead.productType === 'fix_flip' && lead.arv) {
    propertyValue = Number(lead.arv);
    ltv = calculateLTV(loanAmount, propertyValue);
    const ltvAdj = getLTVAdjustment(ltv);
    score += ltvAdj;
    reasoning += `LTV ${(ltv * 100).toFixed(1)}% → ${ltvAdj >= 0 ? '+' : ''}${ltvAdj}\n`;

    if (ltv > 0.80) {
      riskFlags.push('High LTV (>80%)');
    }
  }

  // ========== DSCR Calculation ==========
  let dscr = 0;
  if (lead.productType === 'dscr' && lead.rentalIncome && loanAmount > 0) {
    // Get detailed inputs if available, otherwise use defaults
    const inputs = (lead.dscrInputs as any) || {};
    const taxes = inputs.monthlyTaxes || 0;
    const insurance = inputs.monthlyInsurance || 0;
    const hoa = inputs.monthlyHOA || 0;
    const rate = inputs.proposedRate || 0.055; // Default to 5.5%

    // Simple DSCR calculation: Rental Income / Monthly Payment
    // Monthly payment for 30-year loan at given rate
    const monthlyRate = rate / 12;
    const numPayments = 360; // 30 years
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

    // NOI (Net Operating Income) = Rental Income - Operating Expenses
    const noi = Number(lead.rentalIncome) - taxes - insurance - hoa;

    // DSCR = NOI / Monthly Payment
    if (monthlyPayment > 0) {
      dscr = noi / monthlyPayment;
    }

    const dscrAdj = getDSCRAdjustment(dscr);
    score += dscrAdj;
    reasoning += `DSCR ${dscr.toFixed(2)} (Rent: $${lead.rentalIncome}, Payment: $${monthlyPayment.toFixed(0)}) → ${dscrAdj >= 0 ? '+' : ''}${dscrAdj}\n`;

    if (dscr < 1.0) {
      riskFlags.push('Negative cash flow (DSCR < 1.0)');
    }
  }

  // ========== Rehab Budget Sanity (Fix&Flip) ==========
  if (lead.productType === 'fix_flip' && lead.rehabBudget && lead.arv) {
    const rehabAdj = evaluateRehabBudget(
      Number(lead.rehabBudget),
      Number(lead.arv)
    );
    score += rehabAdj;
    reasoning += `Rehab budget evaluation → ${rehabAdj >= 0 ? '+' : ''}${rehabAdj}\n`;

    const rehabRatio = Number(lead.rehabBudget) / Number(lead.arv);
    if (rehabRatio > 0.45) {
      riskFlags.push('High rehab budget (>45% of ARV)');
    }
  }

  // ========== Track Record ==========
  // TODO: Extract from notes or enrichment (e.g., "3 prior flips")
  const priorFlips = 0; // Placeholder
  if (priorFlips >= 3) {
    score += 6;
    reasoning += `Experienced investor (${priorFlips}+ flips) → +6\n`;
  } else if (priorFlips >= 1) {
    score += 3;
    reasoning += `Some experience (${priorFlips} flips) → +3\n`;
  }

  // ========== Enrichment Risk Flags ==========
  const enrichment = parseEnrichment(lead.enrichment);

  if (enrichment.neighborhoodRisk > 0.6) {
    score -= 10;
    riskFlags.push('High neighborhood risk');
    reasoning += `Neighborhood risk (${enrichment.neighborhoodRisk.toFixed(2)}) → -10\n`;
  }

  if (!enrichment.zoningOK) {
    score -= 8;
    riskFlags.push('Zoning issues detected');
    reasoning += `Zoning concerns → -8\n`;
  }

  if (enrichment.newsNegative) {
    score -= 6;
    riskFlags.push('Negative news about property/area');
    reasoning += `Negative news sentiment → -6\n`;
  }

  // ========== Clip Score to 0-100 ==========
  score = Math.max(0, Math.min(100, score));
  reasoning += `\nFinal Score: ${score.toFixed(1)}`;

  // ========== Determine Disposition ==========
  let disposition: 'qualified' | 'follow_up' | 'disqualified';
  if (score >= 70) {
    disposition = 'qualified';
  } else if (score >= 50) {
    disposition = 'follow_up';
  } else {
    disposition = 'disqualified';
  }

  // ========== Generate Preliminary Offer ==========
  const preliminaryOffer = generateOffer(lead, ltv, dscr, disposition);

  return {
    score,
    disposition,
    preliminaryOffer,
    reasoning,
    riskFlags,
  };
}

// ==================== OFFER GENERATION ====================

/**
 * Generate preliminary offer ranges
 * IMPORTANT: Always marked as "illustrative / preliminary only"
 */
function generateOffer(
  lead: Lead,
  ltv: number,
  dscr: number,
  disposition: 'qualified' | 'follow_up' | 'disqualified'
): PreliminaryOffer | undefined {
  // Don't generate offer for disqualified leads
  if (disposition === 'disqualified') {
    return undefined;
  }

  const loanAmount = lead.loanAmountRequested ? Number(lead.loanAmountRequested) : 0;

  // Offer varies by product type
  switch (lead.productType) {
    case 'hard_money':
    case 'fix_flip':
      return {
        productType: lead.productType,
        amountRange: [loanAmount * 0.9, loanAmount * 1.0],
        rateRange: [10.5, 12.5],
        termMonths: lead.productType === 'hard_money' ? 12 : 6,
        balloon: true,
        ltvApprox: ltv > 0 ? ltv * 100 : undefined,
        notes: 'Interest-only payments. Rates depend on experience, property condition, and exit strategy. Not a commitment to lend.',
      };

    case 'dscr': {
      // Calculate monthly payment for DSCR loan
      const rate = dscr >= 1.25 ? 0.0599 : 0.07; // Use lower rate for strong DSCR
      const monthlyRate = rate / 12;
      const numPayments = 360;
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

      const monthlyRent = lead.rentalIncome ? Number(lead.rentalIncome) : undefined;
      const monthlyCashFlow = monthlyRent ? monthlyRent - monthlyPayment : undefined;

      return {
        productType: 'dscr',
        amountRange: [loanAmount * 0.95, loanAmount * 1.0],
        rateRange: dscr >= 1.25 ? [5.5, 7.25] : [7.0, 8.5],
        termMonths: 360, // 30-year
        balloon: false,
        ltvApprox: ltv > 0 ? ltv * 100 : undefined,
        dscrApprox: dscr > 0 ? dscr : undefined,
        monthlyPayment: monthlyPayment > 0 ? monthlyPayment : undefined,
        monthlyRent,
        monthlyCashFlow,
        notes: 'DSCR loans require property cash flow ≥ 1.10. Rates depend on DSCR, LTV, and credit. Not a commitment to lend.',
      };
    }

    case 'balloon_refi':
      return {
        productType: 'balloon_refi',
        amountRange: [loanAmount * 0.95, loanAmount * 1.0],
        rateRange: [8.5, 10.5],
        termMonths: 12,
        balloon: true,
        notes: 'Balloon refinance requires clear exit strategy (sale, refinance, or payoff). Not a commitment to lend.',
      };

    case 'note_finance':
      return {
        productType: 'note_finance',
        amountRange: [loanAmount * 0.70, loanAmount * 0.85],
        rateRange: [9.0, 11.0],
        termMonths: 12,
        notes: 'Note purchase at discount. Requires human underwriting. Not a commitment to lend.',
      };

    default:
      return undefined;
  }
}

// ==================== EXPORTS ====================

export type {
  ScoreResult,
  PreliminaryOffer,
};

export {
  BASE_SCORES,
  LTV_BANDS,
  DSCR_BANDS,
  calculateLTV,
  calculateDSCR,
};
