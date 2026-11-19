import { NextRequest, NextResponse } from 'next/server';
import { getAdmissions, createAdmission } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const course = searchParams.get('course') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : undefined;

    const admissions = getAdmissions({ status, course, search, limit, offset });
    return NextResponse.json({ success: true, admissions });
  } catch (error) {
    console.error('Failed to get admissions:', error);
    return NextResponse.json({ error: 'Failed to retrieve applications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Required fields check
    const required = [
      'student_name',
      'father_name',
      'mother_name',
      'dob',
      'gender',
      'mobile',
      'email',
      'address',
      'state',
      'district',
      'pincode',
      'course_category',
      'course_name',
      'qualification',
      'passing_year',
      'board_university'
    ];

    for (const f of required) {
      if (!body[f] || String(body[f]).trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${f.replace('_', ' ')}` },
          { status: 400 }
        );
      }
    }

    // Clean mobile number validation (at least 10 digits)
    const cleanMobile = String(body.mobile).replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(body.email))) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const result = createAdmission({
      student_name: String(body.student_name).trim(),
      father_name: String(body.father_name).trim(),
      mother_name: String(body.mother_name).trim(),
      dob: String(body.dob).trim(),
      gender: String(body.gender).trim(),
      mobile: String(body.mobile).trim(),
      whatsapp: body.whatsapp ? String(body.whatsapp).trim() : undefined,
      email: String(body.email).trim().toLowerCase(),
      address: String(body.address).trim(),
      state: String(body.state).trim(),
      district: String(body.district).trim(),
      pincode: String(body.pincode).trim(),
      course_category: String(body.course_category).trim(),
      course_name: String(body.course_name).trim(),
      qualification: String(body.qualification).trim(),
      passing_year: String(body.passing_year).trim(),
      board_university: String(body.board_university).trim(),
      study_mode: body.study_mode ? String(body.study_mode).trim() : 'Regular',
      photo_url: body.photo_url || undefined,
      document_url: body.document_url || undefined,
      remarks: body.remarks || undefined
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      application_no: result.application_no,
      id: result.id
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process admission application. Please try again.' },
      { status: 500 }
    );
  }
}
