import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentAdmin } from '@/lib/auth';
import { getSettings, updateSettings, getPopupSettings, updatePopupSettings } from '@/lib/data';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = getSettings();
  const popup = getPopupSettings();

  return NextResponse.json({
    // Smart Popup Controls
    popup_enabled: popup.is_enabled ?? 1,
    popup_heading: popup.heading || 'Your Small Help Can Make a Big Difference.',
    popup_description: popup.description || 'Help us provide education, food and essential support to children and families in need.',
    popup_delay_seconds: popup.delay_seconds ?? 15,
    popup_repeat_interval_seconds: popup.repeat_interval_seconds ?? 150,
    popup_image_url: popup.image_url || '/images/ngo/hero-children-study.jpg',
    popup_quick_amounts: popup.quick_amounts || '101,251,501,1001,2501',
    popup_button_text: popup.button_text || 'Donate Now',

    // Bank & UPI Transfer Controls
    bank_name: settings.bank_name || 'Punjab National Bank (PNB)',
    bank_account: settings.bank_account || '4123000100987654',
    bank_ifsc: settings.bank_ifsc || 'PUNB0123400',
    bank_holder: settings.bank_holder || 'VN Vidhyapeeth Educational & Social Welfare Trust',
    upi_id: settings.upi_id || 'vnvidhyapeeth@pnb',
    qr_code_url: settings.qr_code_url || '/images/ngo/donation-banner.jpg',

    // Gateway & Campaign Controls
    payment_gateway_mode: (settings as any).payment_gateway_mode || 'all',
    default_campaign: (settings as any).default_campaign || 'Wherever Most Needed',
    quick_donation_amounts: (settings as any).quick_amounts || '101,251,501,1001,2501'
  });
}

export async function PATCH(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    // 1. Update Popup Settings
    updatePopupSettings({
      is_enabled: body.popup_enabled !== undefined ? (body.popup_enabled ? 1 : 0) : undefined,
      heading: body.popup_heading,
      description: body.popup_description,
      delay_seconds: body.popup_delay_seconds !== undefined ? Number(body.popup_delay_seconds) : undefined,
      repeat_interval_seconds: body.popup_repeat_interval_seconds !== undefined ? Number(body.popup_repeat_interval_seconds) : undefined,
      image_url: body.popup_image_url,
      button_text: body.popup_button_text,
      quick_amounts: body.popup_quick_amounts
    });

    // 2. Update General Bank & Payment Settings
    updateSettings({
      bank_name: body.bank_name,
      bank_account: body.bank_account,
      bank_ifsc: body.bank_ifsc,
      bank_holder: body.bank_holder,
      upi_id: body.upi_id,
      qr_code_url: body.qr_code_url
    });

    // 3. Update extra settings in settings table if provided
    const db = getDb();
    if (body.default_campaign || body.payment_gateway_mode || body.quick_donation_amounts) {
      db.prepare(`
        UPDATE settings SET
          default_campaign = COALESCE(?, default_campaign),
          payment_gateway_mode = COALESCE(?, payment_gateway_mode),
          quick_amounts = COALESCE(?, quick_amounts)
        WHERE id = 1
      `).run(
        body.default_campaign || null,
        body.payment_gateway_mode || null,
        body.quick_donation_amounts || null
      );
    }

    return NextResponse.json({ success: true, message: 'Donation settings updated successfully' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update donation settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
