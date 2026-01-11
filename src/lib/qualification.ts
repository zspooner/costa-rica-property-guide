// Qualification gate utilities for filtering leads
// Stores qualification status in localStorage with 30-day expiry

export const QUALIFICATION_KEY = 'cr_qualification_status';
export const EXPIRY_DAYS = 30;

// Budget thresholds - $500k+ qualifies
export const QUALIFYING_BUDGETS = ['500k_1m', '1m_2m', 'over_2m'] as const;

// Timeline thresholds - within 12 months qualifies
export const QUALIFYING_TIMELINES = ['0_3_months', '3_6_months', '6_12_months'] as const;

export interface QualificationAnswers {
  budget: string;
  timeline: string;
  locations: string[];
}

export interface QualificationStatus {
  qualified: boolean;
  timestamp: number;
  answers: QualificationAnswers;
}

/**
 * Get stored qualification status from localStorage
 * Returns null if not found or expired
 */
export function getQualificationStatus(): QualificationStatus | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(QUALIFICATION_KEY);
    if (!stored) return null;

    const status: QualificationStatus = JSON.parse(stored);
    const expiryMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    // Check if expired
    if (Date.now() - status.timestamp > expiryMs) {
      localStorage.removeItem(QUALIFICATION_KEY);
      return null;
    }

    return status;
  } catch {
    return null;
  }
}

/**
 * Check if user is currently qualified
 */
export function isUserQualified(): boolean {
  const status = getQualificationStatus();
  return status?.qualified === true;
}

/**
 * Save qualification status to localStorage
 */
export function setQualificationStatus(qualified: boolean, answers: QualificationAnswers): void {
  if (typeof window === 'undefined') return;

  const status: QualificationStatus = {
    qualified,
    timestamp: Date.now(),
    answers,
  };
  localStorage.setItem(QUALIFICATION_KEY, JSON.stringify(status));
}

/**
 * Clear qualification status (for testing or re-qualification)
 */
export function clearQualificationStatus(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(QUALIFICATION_KEY);
}

/**
 * Determine if answers meet qualification criteria
 * Requires: $500k+ budget AND within 12 months AND at least one location
 */
export function checkQualification(answers: QualificationAnswers): boolean {
  const budgetPasses = QUALIFYING_BUDGETS.includes(answers.budget as typeof QUALIFYING_BUDGETS[number]);
  const timelinePasses = QUALIFYING_TIMELINES.includes(answers.timeline as typeof QUALIFYING_TIMELINES[number]);
  const locationPasses = answers.locations && answers.locations.length > 0;

  return budgetPasses && timelinePasses && locationPasses;
}

// Budget options for the qualification modal
export const BUDGET_OPTIONS = [
  { value: 'under_250k', label: 'Under $250,000', qualified: false },
  { value: '250k_500k', label: '$250,000 – $500,000', qualified: false },
  { value: '500k_1m', label: '$500,000 – $1,000,000', qualified: true },
  { value: '1m_2m', label: '$1,000,000 – $2,000,000', qualified: true },
  { value: 'over_2m', label: 'Over $2,000,000', qualified: true },
] as const;

// Timeline options for the qualification modal
export const TIMELINE_OPTIONS = [
  { value: '0_3_months', label: 'Within 3 months', qualified: true },
  { value: '3_6_months', label: 'Within 6 months', qualified: true },
  { value: '6_12_months', label: 'Within 12 months', qualified: true },
  { value: 'over_12_months', label: 'Over 12 months', qualified: false },
  { value: 'just_researching', label: 'Just researching', qualified: false },
] as const;

// Location options for the qualification modal
export const LOCATION_OPTIONS = [
  { value: 'playa_grande', label: 'Playa Grande' },
  { value: 'playa_flamingo', label: 'Playa Flamingo' },
  { value: 'tamarindo', label: 'Tamarindo' },
  { value: 'other_guanacaste', label: 'Other Guanacaste' },
  { value: 'not_sure', label: 'Not sure yet' },
] as const;
