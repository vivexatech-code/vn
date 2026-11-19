import { NextRequest, NextResponse } from 'next/server';
import { getAdmissionById, updateAdmissionStatus, deleteAdmission } from '@/lib/data';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const admission = getAdmissionById(parseInt(id, 10));
    if (!admission) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, admission });
  } catch (error) {
    console.error('Error fetching admission:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, admin_notes } = body;

    updateAdmissionStatus(parseInt(id, 10), status, admin_notes);
    return NextResponse.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating admission:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    deleteAdmission(parseInt(id, 10));
    return NextResponse.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
