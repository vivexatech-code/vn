import { NextResponse } from 'next/server';
import { getDonations } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const donations = getDonations(1000);

  const headers = [
    'Donation ID',
    'Donor Name',
    'Donor Email',
    'Donor Phone',
    'PAN Number',
    'Amount (INR)',
    'Payment Mode',
    'Transaction Reference',
    'Campaign Title',
    'Status',
    'Notes',
    'Date'
  ];

  const escapeCSV = (val: unknown) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = donations.map(d => [
    escapeCSV(`VNV-DON-${d.id}`),
    escapeCSV(d.donor_name),
    escapeCSV(d.donor_email),
    escapeCSV(d.donor_phone || ''),
    escapeCSV(d.pan_number || ''),
    escapeCSV(d.amount),
    escapeCSV(d.payment_mode || ''),
    escapeCSV(d.transaction_id || ''),
    escapeCSV(d.campaign_title || 'General Fund'),
    escapeCSV(d.status),
    escapeCSV(d.notes || ''),
    escapeCSV(d.created_at)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="vn_vidhyapeeth_donations_${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}
