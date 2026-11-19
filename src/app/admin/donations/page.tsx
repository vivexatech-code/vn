import React from 'react';
import { getDonations } from '@/lib/data';
import DonationsManager from './DonationsManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Donation Records & 80G Receipts | VN Vidhyapeeth Admin'
};

export default function AdminDonationsPage() {
  const initialDonations = getDonations(200);

  return (
    <div className="space-y-6">
      <DonationsManager initialDonations={initialDonations} />
    </div>
  );
}
