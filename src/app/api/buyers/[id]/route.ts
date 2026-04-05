import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const ALLOWED_BUYER_FIELDS = [
  'name',
  'email',
  'budget_range',
  'timeline',
  'intended_use',
  'area_interest',
  'source',
] as const;

// GET /api/buyers/[id] - Get a single buyer (auth required)
export async function GET(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  const { data, error } = await supabase
    .from('buyers')
    .select('*, referrals(*, partners(*))')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ buyer: data });
}

// PATCH /api/buyers/[id] - Update a buyer (auth required)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();

  // Allowlist fields to prevent mass assignment
  const updateData: Record<string, unknown> = {};
  for (const field of ALLOWED_BUYER_FIELDS) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('buyers')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ buyer: data });
}

// DELETE /api/buyers/[id] - Delete a buyer (auth required)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const { id } = await params;

  const { error } = await supabase
    .from('buyers')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
