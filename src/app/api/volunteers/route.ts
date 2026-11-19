import { NextResponse } from 'next/server';
import { getVolunteers, createVolunteer } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get('status') || undefined;
  const search = url.searchParams.get('search') || undefined;

  const volunteers = getVolunteers({ status, search });
  return NextResponse.json(volunteers);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.full_name || !body.mobile || !body.email || !body.city) {
      return NextResponse.json({ error: 'Full name, mobile, email, and city are required' }, { status: 400 });
    }

    const id = createVolunteer({
      full_name: body.full_name,
      mobile: body.mobile,
      email: body.email,
      city: body.city,
      areas_of_interest: Array.isArray(body.areas_of_interest)
        ? body.areas_of_interest.join(', ')
        : (body.areas_of_interest || 'General Social Welfare'),
      availability: body.availability || 'Weekends',
      message: body.message
    });

    return NextResponse.json({
      success: true,
      volunteer_id: id,
      message: 'Thank you for volunteering! Our coordinator will contact you shortly.'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Registration failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
