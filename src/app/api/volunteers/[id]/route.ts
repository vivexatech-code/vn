import { NextResponse } from 'next/server';
import { updateVolunteerStatus, deleteVolunteer, getVolunteerById } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const vol = getVolunteerById(Number(id));
  if (!vol) return NextResponse.json({ error: 'Volunteer not found' }, { status: 404 });

  return NextResponse.json(vol);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, admin_notes } = body;

    if (!status) return NextResponse.json({ error: 'Status is required' }, { status: 400 });

    updateVolunteerStatus(Number(id), status, admin_notes);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Update failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    deleteVolunteer(Number(id));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
