import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json(settings);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    updateSettings(body);
    const updated = getSettings();
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
