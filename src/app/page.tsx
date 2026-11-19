import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import PartnersSection from '@/components/home/PartnersSection';
import OrganizationIntro from '@/components/home/OrganizationIntro';
import FocusAreas from '@/components/home/FocusAreas';
import ImpactCounters from '@/components/home/ImpactCounters';
import FeaturedCampaigns from '@/components/home/FeaturedCampaigns';
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection';
import MasonryGallery from '@/components/home/MasonryGallery';
import NewsAndNoticesSection from '@/components/home/NewsAndNoticesSection';
import VolunteerSection from '@/components/home/VolunteerSection';
import DonationSection from '@/components/home/DonationSection';

import {
  getHeroSlides,
  getFocusAreas,
  getImpactStats,
  getCampaigns,
  getTestimonials,
  getGalleryItems,
  getNewsBlogs,
  getPartners,
  getSettings
} from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const slides = getHeroSlides(true);
  const focusAreas = getFocusAreas(true);
  const impactStats = getImpactStats(true);
  const campaigns = getCampaigns({ featured: true, onlyActive: true });
  const stories = getTestimonials({ featured: true, onlyActive: true });
  const galleryItems = getGalleryItems({ onlyActive: true });
  const newsBlogs = getNewsBlogs({ onlyPublished: true, limit: 6 });
  const partners = getPartners(true);
  const settings = getSettings();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section with Authentic Social Welfare Photography */}
      <HeroSlider slides={slides} />

      {/* 2. Institutional Accreditations & Verified Partners Grid */}
      <PartnersSection partners={partners} />

      {/* 3. About Us: "Together, We Can Make a Difference." */}
      <OrganizationIntro />

      {/* 4. Our Core Initiatives (The 5 Pillars) */}
      <FocusAreas areas={focusAreas} />

      {/* 5. Our Real-World Impact Statistics */}
      <ImpactCounters stats={impactStats} />

      {/* 6. Featured Welfare Campaigns */}
      <FeaturedCampaigns campaigns={campaigns} />

      {/* 7. Stories of Change (Beneficiary Narratives) */}
      <SuccessStoriesSection testimonials={stories} />

      {/* 8. Field Activity & Welfare Photo Gallery */}
      <MasonryGallery items={galleryItems.slice(0, 8)} />

      {/* 9. Latest News, Distribution Events & Action Notices */}
      <NewsAndNoticesSection articles={newsBlogs} />

      {/* 10. Volunteer With Us Registration Section */}
      <VolunteerSection />

      {/* 11. Prominent Donation Section with Bank, UPI, QR & Presets */}
      <DonationSection settings={settings} />
    </div>
  );
}
