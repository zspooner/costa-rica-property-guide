export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+13013003089';

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`;

export const BUDGET_RANGES = [
  { value: 'under_250k', label: 'Under $250,000' },
  { value: '250k_500k', label: '$250,000 - $500,000' },
  { value: '500k_1m', label: '$500,000 - $1,000,000' },
  { value: '1m_2m', label: '$1,000,000 - $2,000,000' },
  { value: 'over_2m', label: 'Over $2,000,000' },
] as const;

export const TIMELINES = [
  { value: '0_3_months', label: '0-3 months' },
  { value: '3_6_months', label: '3-6 months' },
  { value: '6_12_months', label: '6-12 months' },
  { value: 'over_12_months', label: 'Over 12 months' },
] as const;

export const INTENDED_USES = [
  { value: 'primary_residence', label: 'Primary Residence' },
  { value: 'vacation_home', label: 'Vacation Home' },
  { value: 'rental_investment', label: 'Rental Investment' },
  { value: 'both_live_and_rent', label: 'Both (Live & Rent)' },
] as const;

export const REFERRAL_STATUSES = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'closed', label: 'Closed', color: 'bg-purple-100 text-purple-800' },
  { value: 'dead', label: 'Dead', color: 'bg-gray-100 text-gray-800' },
] as const;
