import { NextResponse } from 'next/server';
import { getCourses, createCourse } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const featured = searchParams.get('featured') === 'true';
  const all = searchParams.get('all') === 'true';

  const courses = getCourses({
    category,
    featured,
    onlyActive: !all
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.category || !body.duration || !body.eligibility || !body.short_desc) {
      return NextResponse.json({ error: 'Missing required course fields' }, { status: 400 });
    }

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    createCourse(body);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
