import React from 'react';
import { getSettings, getCampaigns } from '@/lib/data';
import PageHeader from '@/components/common/PageHeader';
import DonatePageClient from './DonatePageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Donate Now | VN Vidhyapeeth Social Welfare Trust',
  description: 'Your donation directly supports free education for underprivileged children, daily food distribution, and school stationery kits.'
};

export default function DonatePage() {
  const settings = getSettings();
  const campaigns = getCampaigns({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Direct Social Impact"
        title="Donate to VN Vidhyapeeth"
        subtitle="Empower underprivileged children and struggling families through education, meals, and community welfare."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Donate' }]}
      />
      <DonatePageClient settings={settings} campaigns={campaigns} />
    </div>
  );
}
