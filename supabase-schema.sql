-- =====================================================
-- BUYER REFERRAL PLATFORM - DATABASE SCHEMA
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- BUYERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS buyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  budget_range TEXT NOT NULL CHECK (budget_range IN ('under_250k', '250k_500k', '500k_1m', '1m_2m', 'over_2m')),
  timeline TEXT NOT NULL CHECK (timeline IN ('0_3_months', '3_6_months', '6_12_months', 'over_12_months')),
  intended_use TEXT NOT NULL CHECK (intended_use IN ('primary_residence', 'vacation_home', 'rental_investment', 'both_live_and_rent')),
  area_interest TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_buyers_email ON buyers(email);

-- Index for date-based queries
CREATE INDEX IF NOT EXISTS idx_buyers_created_at ON buyers(created_at DESC);

-- =====================================================
-- PARTNERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  firm TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  notes TEXT
);

-- =====================================================
-- REFERRALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  partner_id UUID NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'active', 'closed', 'dead')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for buyer lookups
CREATE INDEX IF NOT EXISTS idx_referrals_buyer_id ON referrals(buyer_id);

-- Index for partner lookups
CREATE INDEX IF NOT EXISTS idx_referrals_partner_id ON referrals(partner_id);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- =====================================================
-- TRIGGER: Auto-update updated_at on referrals
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_referrals_updated_at
  BEFORE UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (Disabled for now - no auth)
-- =====================================================
-- Note: Enable RLS and add policies when auth is implemented

ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Temporary: Allow all operations (remove when auth is added)
CREATE POLICY "Allow all on buyers" ON buyers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on partners" ON partners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on referrals" ON referrals FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- SEED DATA: Initial Partners (Optional)
-- =====================================================
-- Uncomment and modify to add initial partners

-- INSERT INTO partners (name, firm, email, whatsapp, notes) VALUES
--   ('Example Partner', 'Example Realty', 'partner@example.com', '+50612345678', 'Specializes in Tamarindo area'),
--   ('Another Partner', 'Beach Properties CR', 'another@example.com', '+50687654321', 'Full-service brokerage');
