import { NextRequest, NextResponse } from 'next/server';
import { getPopupSettings, updatePopupSettings } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const settings = getPopupSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Failed to get popup settings:', error);
    return NextResponse.json({ error: 'Failed to retrieve popup settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    updatePopupSettings(body);
    return NextResponse.json({ success: true, message: 'Popup settings updated successfully' });
  } catch (error) {
    console.error('Failed to update popup settings:', error);
    return NextResponse.json({ error: 'Failed to update popup settings' }, { status: 500 });
  }
}
