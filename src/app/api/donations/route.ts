import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { createDonation } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const search = url.searchParams.get('search');

  const db = getDb();
  let query = 'SELECT * FROM donations WHERE 1=1';
  const params: (string | number)[] = [];

  if (status && status !== 'all') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search) {
    query += ' AND (donor_name LIKE ? OR donor_email LIKE ? OR donor_phone LIKE ? OR transaction_id LIKE ? OR pan_number LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY id DESC LIMIT 500';

  const rows = db.prepare(query).all(...params);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.donor_name || !body.donor_email || !body.amount) {
      return NextResponse.json({ error: 'Name, email, and amount are required' }, { status: 400 });
    }

    // Default status: manual bank transfers are ALWAYS 'pending' until verified by admin.
    // Instant UPI / Gateway payments can be 'verified' if confirmed.
    let status = 'pending';
    if (body.payment_mode === 'Online Gateway' || body.payment_mode === 'UPI' || body.payment_mode === 'UPI / QR') {
      status = body.status || 'verified';
    } else {
      status = 'pending';
    }

    const id = createDonation({
      donor_name: body.donor_name,
      donor_email: body.donor_email,
      donor_phone: body.donor_phone,
      amount: Number(body.amount),
      pan_number: body.pan_number,
      payment_mode: body.payment_mode || 'UPI / QR',
      transaction_id: body.transaction_id || `TXN${Date.now()}`,
      campaign_id: body.campaign_id ? Number(body.campaign_id) : undefined,
      campaign_title: body.campaign_title || 'General Social Welfare Fund',
      notes: body.notes,
      status
    });

    const receipt_no = `VNV-REC-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`;

    return NextResponse.json({
      success: true,
      donation_id: id,
      receipt_no,
      status
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
