import { NextResponse } from 'next/server';
import { getDonations, createDonation, updateDonationStatus } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const donations = getDonations(200);
  return NextResponse.json(donations);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.donor_name || !body.donor_email || !body.amount) {
      return NextResponse.json({ error: 'Name, email, and amount are required' }, { status: 400 });
    }

    const id = createDonation({
      donor_name: body.donor_name,
      donor_email: body.donor_email,
      donor_phone: body.donor_phone,
      amount: Number(body.amount),
      pan_number: body.pan_number,
      payment_mode: body.payment_mode || 'UPI / QR',
      transaction_id: body.transaction_id,
      campaign_id: body.campaign_id ? Number(body.campaign_id) : undefined,
      campaign_title: body.campaign_title,
      notes: body.notes,
      status: 'verified'
    });

    return NextResponse.json({ success: true, donation_id: id });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, status } = await req.json();
    if (!id || !status) return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    updateDonationStatus(Number(id), status);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
