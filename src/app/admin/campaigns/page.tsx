import React from 'react';
import { getCampaigns } from '@/lib/data';
import CampaignsManager from './CampaignsManager';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Welfare Campaigns Management | VN Vidhyapeeth Admin'
};

export default function AdminCampaignsPage() {
  const campaigns = getCampaigns({ onlyActive: false });

  return (
    <div className="space-y-6">
      <CampaignsManager initialCampaigns={campaigns} />
    </div>
  );
}
