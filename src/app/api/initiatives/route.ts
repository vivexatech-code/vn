import { NextResponse } from 'next/server';
import { getFocusAreas, createFocusArea } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const areas = getFocusAreas();
  return NextResponse.json(areas);
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    createFocusArea({
      title: body.title,
      category: body.category || 'Social Welfare',
      description: body.description,
      icon_name: body.icon_name || 'Heart',
      image_url: body.image_url || '/images/ngo/initiative-education.jpg',
      link_url: body.link_url || '/initiatives',
      order_index: Number(body.order_index) || 0,
      is_active: body.is_active !== undefined ? (body.is_active ? 1 : 0) : 1
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create initiative';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
