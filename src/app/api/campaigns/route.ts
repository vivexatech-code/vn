import { NextResponse } from 'next/server';
import { getCampaigns, createCampaign } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get('featured') === 'true';
  const all = searchParams.get('all') === 'true';

  const campaigns = getCampaigns({
    featured,
    onlyActive: !all
  });
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.target_amount) {
      return NextResponse.json({ error: 'Title and target amount are required' }, { status: 400 });
    }

    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    createCampaign(body);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
