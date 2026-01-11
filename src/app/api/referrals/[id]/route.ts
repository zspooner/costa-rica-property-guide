import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/referrals/[id] - Get a single referral
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('referrals')
    .select('*, buyers(*), partners(*)')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ referral: data });
}

// PATCH /api/referrals/[id] - Update a referral (status, notes, partner)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const { status, notes, partner_id } = body;

  const updateData: Record<string, unknown> = {};
  if (status) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;
  if (partner_id) updateData.partner_id = partner_id;

  const { data, error } = await supabase
    .from('referrals')
    .update(updateData)
    .eq('id', id)
    .select('*, buyers(*), partners(*)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ referral: data });
}

// DELETE /api/referrals/[id] - Delete a referral
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const { error } = await supabase
    .from('referrals')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
