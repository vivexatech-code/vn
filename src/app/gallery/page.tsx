import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import MasonryGallery from '@/components/home/MasonryGallery';
import { getGalleryItems } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Field Activity & Welfare Gallery | VN Vidhyapeeth Social Welfare Trust',
  description: 'Photo gallery capturing child education programs, food distribution drives, free stationery distributions, and community welfare events.'
};

export default function GalleryPage() {
  const items = getGalleryItems({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Moments of Hope &amp; Impact"
        title="Field Activity &amp; Welfare Gallery"
        subtitle="Visual glimpses into grassroots educational sessions, food distribution drives, free stationery handovers, and community outreach nationwide."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Photo Gallery' }]}
      />

      <MasonryGallery items={items} showViewAll={false} />
    </div>
  );
}
