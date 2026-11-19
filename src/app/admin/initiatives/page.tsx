import React from 'react';
import { getFocusAreas } from '@/lib/data';
import InitiativesManager from './InitiativesManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Core Welfare Initiatives Management | VN Vidhyapeeth Admin'
};

export default function AdminInitiativesPage() {
  const initiatives = getFocusAreas(false);

  return (
    <div className="space-y-6">
      <InitiativesManager initialInitiatives={initiatives} />
    </div>
  );
}
