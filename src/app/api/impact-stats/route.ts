import { NextResponse } from 'next/server';
import { getImpactStats, updateImpactStat } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const stats = getImpactStats(false);
  return NextResponse.json(stats);
}

export async function PUT(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    updateImpactStat(Number(id), data);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
