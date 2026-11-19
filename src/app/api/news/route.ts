import { NextResponse } from 'next/server';
import { getNewsBlogs, createNewsBlog } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || undefined;
  const category = searchParams.get('category') || undefined;
  const all = searchParams.get('all') === 'true';
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;

  const posts = getNewsBlogs({
    type,
    category,
    onlyPublished: !all,
    limit
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json({ error: 'Missing required article fields' }, { status: 400 });
    }

    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    createNewsBlog({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      type: body.type || 'news',
      featured_image: body.featured_image,
      author: body.author || admin.fullName,
      published_at: body.published_at || new Date().toISOString(),
      is_published: body.is_published !== undefined ? body.is_published : 1
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
