import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/referrals - List all referrals
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const partnerId = searchParams.get('partner_id');

  let query = supabase
    .from('referrals')
    .select('*, buyers(*), partners(*)')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  if (partnerId) {
    query = query.eq('partner_id', partnerId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ referrals: data });
}

// POST /api/referrals - Create a new referral (assign buyer to partner)
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { buyer_id, partner_id, notes } = body;

  if (!buyer_id || !partner_id) {
    return NextResponse.json(
      { error: 'buyer_id and partner_id are required' },
      { status: 400 }
    );
  }

  // Check if referral already exists for this buyer
  const { data: existing } = await supabase
    .from('referrals')
    .select('id')
    .eq('buyer_id', buyer_id)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: 'Buyer already has a referral. Update the existing one.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('referrals')
    .insert({
      buyer_id,
      partner_id,
      status: 'new',
      notes,
    })
    .select('*, buyers(*), partners(*)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ referral: data }, { status: 201 });
}
