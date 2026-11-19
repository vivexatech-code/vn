import { NextResponse } from 'next/server';
import { getGalleryItems, createGalleryItem, deleteGalleryItem } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const media_type = searchParams.get('media_type') || undefined;
  const all = searchParams.get('all') === 'true';

  const items = getGalleryItems({ category, media_type, onlyActive: !all });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.category || !body.url) {
      return NextResponse.json({ error: 'Title, category, and URL are required' }, { status: 400 });
    }
    createGalleryItem(body);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  deleteGalleryItem(Number(id));
  return NextResponse.json({ success: true });
}
