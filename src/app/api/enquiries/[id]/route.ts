import { NextResponse } from 'next/server';
import { updateEnquiryStatus, deleteEnquiry } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const { status, admin_notes } = await req.json();
    if (!status) return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    updateEnquiryStatus(Number(id), status, admin_notes);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  deleteEnquiry(Number(id));
  return NextResponse.json({ success: true });
}
