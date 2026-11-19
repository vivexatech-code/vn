import { NextResponse } from 'next/server';
import { getEnquiries, createEnquiry } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || undefined;
  const status = searchParams.get('status') || undefined;

  const enquiries = getEnquiries({ type, status });
  return NextResponse.json(enquiries);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'Name, email, phone, and message are required' }, { status: 400 });
    }

    const id = createEnquiry({
      type: body.type || 'general',
      name: body.name,
      email: body.email,
      phone: body.phone,
      course_interest: body.course_interest,
      address: body.address,
      message: body.message
    });

    return NextResponse.json({ success: true, enquiry_id: id });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
