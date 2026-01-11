import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/partners - List all partners
export async function GET() {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partners: data });
}

// POST /api/partners - Create a new partner
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { name, firm, email, whatsapp, notes } = body;

  if (!name || !firm || !email) {
    return NextResponse.json(
      { error: 'Name, firm, and email are required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('partners')
    .insert({ name, firm, email, whatsapp, notes })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partner: data }, { status: 201 });
}
