import { NextResponse } from 'next/server';
import { getVolunteers } from '@/lib/data';
import { getCurrentAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const volunteers = getVolunteers();

  const headers = [
    'ID',
    'Full Name',
    'Mobile',
    'Email',
    'City',
    'Areas of Interest',
    'Availability',
    'Message',
    'Status',
    'Admin Notes',
    'Registered Date'
  ];

  const escapeCSV = (val: unknown) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = volunteers.map(v => [
    escapeCSV(v.id),
    escapeCSV(v.full_name),
    escapeCSV(v.mobile),
    escapeCSV(v.email),
    escapeCSV(v.city),
    escapeCSV(v.areas_of_interest),
    escapeCSV(v.availability),
    escapeCSV(v.message || ''),
    escapeCSV(v.status),
    escapeCSV(v.admin_notes || ''),
    escapeCSV(v.created_at)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="vn_vidhyapeeth_volunteers_${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}
