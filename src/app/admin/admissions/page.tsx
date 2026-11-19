import React from 'react';
import { getAdmissions } from '@/lib/data';
import AdmissionsManager from './AdmissionsManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Online Admission Applications | VN Vidhyapeeth Admin'
};

export default function AdminAdmissionsPage() {
  const initialAdmissions = getAdmissions();

  return (
    <div className="space-y-6">
      <AdmissionsManager initialAdmissions={initialAdmissions} />
    </div>
  );
}

