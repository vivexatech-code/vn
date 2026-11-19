import { NextResponse } from 'next/server';
import { updateFocusArea, deleteFocusArea } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    updateFocusArea(Number(id), body);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update initiative';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    deleteFocusArea(Number(id));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete initiative';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
