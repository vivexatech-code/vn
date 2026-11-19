import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    const db = getDb();
    db.prepare(`
      UPDATE donations SET
        status = COALESCE(?, status),
        notes = COALESCE(?, notes)
      WHERE id = ?
    `).run(status ?? null, notes ?? null, Number(id));

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
    const db = getDb();
    db.prepare('DELETE FROM donations WHERE id = ?').run(Number(id));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
