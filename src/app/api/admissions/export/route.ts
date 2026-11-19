import { NextRequest, NextResponse } from 'next/server';
import { getAdmissions } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admissions = getAdmissions();

    // Generate CSV
    const headers = [
      'Application No',
      'Student Name',
      'Father Name',
      'Mother Name',
      'DOB',
      'Gender',
      'Mobile',
      'WhatsApp',
      'Email',
      'Course Category',
      'Course Name',
      'Qualification',
      'Passing Year',
      'Board / University',
      'Study Mode',
      'State',
      'District',
      'PIN Code',
      'Address',
      'Status',
      'Submission Date'
    ];

    const escapeCsv = (str: unknown) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = admissions.map(a => [
      escapeCsv(a.application_no),
      escapeCsv(a.student_name),
      escapeCsv(a.father_name),
      escapeCsv(a.mother_name),
      escapeCsv(a.dob),
      escapeCsv(a.gender),
      escapeCsv(a.mobile),
      escapeCsv(a.whatsapp),
      escapeCsv(a.email),
      escapeCsv(a.course_category),
      escapeCsv(a.course_name),
      escapeCsv(a.qualification),
      escapeCsv(a.passing_year),
      escapeCsv(a.board_university),
      escapeCsv(a.study_mode),
      escapeCsv(a.state),
      escapeCsv(a.district),
      escapeCsv(a.pincode),
      escapeCsv(a.address),
      escapeCsv(a.status),
      escapeCsv(a.created_at)
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\r\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="VN_Vidhyapeeth_Admissions_${Date.now()}.csv"`
      }
    });
  } catch (error) {
    console.error('CSV export failed:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
