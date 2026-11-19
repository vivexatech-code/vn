import { NextRequest, NextResponse } from 'next/server';
import { getPartners, createPartner } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const partners = getPartners(!all);
    return NextResponse.json({ success: true, partners });
  } catch (error) {
    console.error('Failed to get partners:', error);
    return NextResponse.json({ error: 'Failed to retrieve partners' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.name || !body.logo_url) {
      return NextResponse.json({ error: 'Name and Logo URL are required' }, { status: 400 });
    }

    const id = createPartner(body);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to create partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
