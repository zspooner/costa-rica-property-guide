export type BudgetRange =
  | 'under_250k'
  | '250k_500k'
  | '500k_1m'
  | '1m_2m'
  | 'over_2m';

export type Timeline =
  | '0_3_months'
  | '3_6_months'
  | '6_12_months'
  | 'over_12_months';

export type IntendedUse =
  | 'primary_residence'
  | 'vacation_home'
  | 'rental_investment'
  | 'both_live_and_rent';

export type ReferralStatus =
  | 'new'
  | 'contacted'
  | 'active'
  | 'closed'
  | 'dead';

export interface Buyer {
  id: string;
  name: string;
  email: string;
  budget_range: BudgetRange;
  timeline: Timeline;
  intended_use: IntendedUse;
  area_interest: string;
  source: string | null;
  created_at: string;
}

export interface Partner {
  id: string;
  name: string;
  firm: string;
  email: string;
  whatsapp: string | null;
  notes: string | null;
}

export interface Referral {
  id: string;
  buyer_id: string;
  partner_id: string;
  status: ReferralStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReferralWithDetails extends Referral {
  buyer: Buyer;
  partner: Partner;
}

export interface BuyerWithReferral extends Buyer {
  referral?: Referral & { partner: Partner };
}
