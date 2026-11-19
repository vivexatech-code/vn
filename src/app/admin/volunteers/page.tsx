import React from 'react';
import { getVolunteers } from '@/lib/data';
import VolunteersManager from './VolunteersManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Volunteer Management | VN Vidhyapeeth Admin'
};

export default function AdminVolunteersPage() {
  const initialVolunteers = getVolunteers();

  return (
    <div className="space-y-6">
      <VolunteersManager initialVolunteers={initialVolunteers} />
    </div>
  );
}
