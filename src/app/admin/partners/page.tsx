import React from 'react';
import { getPartners } from '@/lib/data';
import PartnersManager from './PartnersManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Partners & Affiliations | VN Vidhyapeeth Admin'
};

export default function AdminPartnersPage() {
  const partners = getPartners(false);

  return (
    <div className="space-y-6">
      <PartnersManager initialPartners={partners} />
    </div>
  );
}
