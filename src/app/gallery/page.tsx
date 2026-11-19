import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import MasonryGallery from '@/components/home/MasonryGallery';
import { getGalleryItems } from '@/lib/data';

export const metadata = {
  title: 'Gallery & Life at VN Vidhyapeeth | VN Vidhyapeeth',
  description: 'Photo and video gallery capturing clinical lab workshops, student life, events, and campus moments at VN Vidhyapeeth.'
};


export default function GalleryPage() {
  const items = getGalleryItems({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Media & Campus"
        title="Photo & Video Gallery"
        subtitle="Visual glimpses of diagnostic laboratory practicums, operating room workshops, convocations, and healthcare seminars."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <MasonryGallery items={items} showViewAll={false} />
    </div>
  );
}
