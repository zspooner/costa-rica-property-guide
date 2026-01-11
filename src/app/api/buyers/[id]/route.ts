import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/buyers/[id] - Get a single buyer
export async function GET(request: NextRequest, { params }: RouteParams) {
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

// PATCH /api/buyers/[id] - Update a buyer
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const { data, error } = await supabase
    .from('buyers')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ buyer: data });
}

// DELETE /api/buyers/[id] - Delete a buyer
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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
