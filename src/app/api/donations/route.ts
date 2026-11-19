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

    // Validate minimal required fields: Name and Amount (> 0)
    if (!body.donor_name || !body.donor_name.trim()) {
      return NextResponse.json({ error: 'Donor full name is required' }, { status: 400 });
    }

    const amountNum = Number(body.amount);
    if (isNaN(amountNum) || amountNum < 10) {
      return NextResponse.json({ error: 'Please enter a valid donation amount of at least ₹10' }, { status: 400 });
    }

    // Require at least a mobile number or email address
    if (!body.donor_phone && !body.donor_email) {
      return NextResponse.json({ error: 'Mobile number or email is required for donation receipt' }, { status: 400 });
    }

    const db = getDb();

    // Prevent duplicate transaction_id
    const txnId = body.transaction_id ? String(body.transaction_id).trim() : `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    if (body.transaction_id) {
      const existing = db.prepare('SELECT id FROM donations WHERE transaction_id = ?').get(txnId);
      if (existing) {
        return NextResponse.json({ error: 'This transaction reference has already been registered' }, { status: 409 });
      }
    }

    // Payment verification & status handling:
    // Manual bank transfers are ALWAYS 'pending' until verified by admin.
    // Instant UPI and Gateway payments can be verified.
    const mode = body.payment_mode || 'UPI / QR';
    let status = 'pending';

    if (mode === 'Bank Transfer' || mode.includes('Bank Transfer') || mode.includes('NEFT')) {
      status = 'pending';
    } else if (mode === 'Online Gateway' || mode === 'UPI' || mode === 'UPI / QR' || mode.includes('UPI')) {
      // If signature verification is configured or simulation confirmed
      status = body.status === 'failed' ? 'failed' : (body.status || 'verified');
    }

    const campaignTitle = body.campaign_title || 'Wherever Most Needed';

    const id = createDonation({
      donor_name: body.donor_name.trim(),
      donor_email: body.donor_email ? body.donor_email.trim() : (body.donor_phone ? `${body.donor_phone.replace(/\D/g, '')}@donor.vnvidhyapeeth.ac.in` : ''),
      donor_phone: body.donor_phone ? body.donor_phone.trim() : '',
      amount: amountNum,
      pan_number: body.pan_number ? body.pan_number.trim().toUpperCase() : '',
      payment_mode: mode,
      transaction_id: txnId,
      campaign_id: body.campaign_id ? Number(body.campaign_id) : undefined,
      campaign_title: campaignTitle,
      notes: body.notes || 'One-page quick donation',
      status
    });

    const receipt_no = `VNV-REC-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`;

    return NextResponse.json({
      success: true,
      donation_id: id,
      receipt_no,
      transaction_id: txnId,
      amount: amountNum,
      donor_name: body.donor_name.trim(),
      campaign_title: campaignTitle,
      status
    }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
