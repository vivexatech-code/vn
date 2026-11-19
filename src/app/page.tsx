import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import OrganizationIntro from '@/components/home/OrganizationIntro';
import FocusAreas from '@/components/home/FocusAreas';
import FeaturedCampaigns from '@/components/home/FeaturedCampaigns';
import DonationSection from '@/components/home/DonationSection';
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection';
import ImpactCounters from '@/components/home/ImpactCounters';
import MasonryGallery from '@/components/home/MasonryGallery';
import NewsAndNoticesSection from '@/components/home/NewsAndNoticesSection';
import VolunteerSection from '@/components/home/VolunteerSection';
import PartnersSection from '@/components/home/PartnersSection';

import {
  getHeroSlides,
  getFocusAreas,
  getImpactStats,
  getCampaigns,
  getTestimonials,
  getGalleryItems,
  getNewsBlogs,
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
  const settings = getSettings();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section: Powerful real photograph, emotional headline, focused CTAs */}
      <HeroSlider slides={slides} />

      {/* 2. Who We Are & Why We Exist: Authentic storytelling with natural photograph */}
      <OrganizationIntro />

      {/* 3. The 5 Core Social Welfare Initiatives: Photo-prominent, short meaningful text */}
      <FocusAreas areas={focusAreas} />

      {/* 4. Urgent Appeals: Clean campaign cards with target progress */}
      <FeaturedCampaigns campaigns={campaigns} />

      {/* 5. Prominent Donation Experience: "Your Kindness Can Change Someone's Tomorrow" */}
      <DonationSection settings={settings} />

      {/* 6. Human Stories of Change: Real beneficiaries, authentic photos, dignified quotes */}
      <SuccessStoriesSection testimonials={stories} />

      {/* 7. Real-World Journey on the Ground: Quiet, transparent impact milestones */}
      <ImpactCounters stats={impactStats} />

      {/* 8. Field Activity Gallery: Moments from the ground with natural aspect ratios */}
      <MasonryGallery items={galleryItems.slice(0, 8)} />

      {/* 9. News & Field Distribution Updates */}
      <NewsAndNoticesSection articles={newsBlogs} />

      {/* 10. Volunteer With Us: Warm, human invitation to join on the ground */}
      <VolunteerSection />

      {/* 11. Trust & Accreditations: Registered Trust, 80G, NITI Aayog, ISO, MSME */}
      <PartnersSection />
    </div>
  );
}
