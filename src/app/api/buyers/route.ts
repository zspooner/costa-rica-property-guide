import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { notifyHyamOfNewBuyer } from '@/lib/email';

// GET /api/buyers - List all buyers
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  const { data, error, count } = await supabase
    .from('buyers')
    .select('*, referrals(*, partners(*))', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ buyers: data, total: count });
}

// POST /api/buyers - Create a new buyer
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, email, budget_range, timeline, intended_use, area_interest } = body;

  // Validate required fields
  if (!name || !email || !budget_range || !timeline || !intended_use || !area_interest) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('buyers')
    .insert({
      name,
      email,
      budget_range,
      timeline,
      intended_use,
      area_interest,
      source: 'website',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send WhatsApp notification to Hyam (non-blocking)
  notifyHyamOfNewBuyer({
    name,
    email,
    budget_range,
    timeline,
    intended_use,
    area_interest,
  }).catch(console.error);

  return NextResponse.json({ buyer: data }, { status: 201 });
}
