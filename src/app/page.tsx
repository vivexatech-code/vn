import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import OrganizationIntro from '@/components/home/OrganizationIntro';
import FocusAreas from '@/components/home/FocusAreas';
import ImpactCounters from '@/components/home/ImpactCounters';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import OtherCoursesSection from '@/components/home/OtherCoursesSection';
import MissionVisionSection from '@/components/home/MissionVisionSection';
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection';
import MasonryGallery from '@/components/home/MasonryGallery';
import NewsAndNoticesSection from '@/components/home/NewsAndNoticesSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import PartnersSection from '@/components/home/PartnersSection';

import {
  getHeroSlides,
  getFocusAreas,
  getImpactStats,
  getCourses,
  getTestimonials,
  getGalleryItems,
  getNewsBlogs,
  getPartners
} from '@/lib/data';

export default async function HomePage() {
  const slides = getHeroSlides(true);
  const focusAreas = getFocusAreas(true);
  const impactStats = getImpactStats(true);
  const featuredCourses = getCourses({ featured: true, onlyActive: true });
  const testimonials = getTestimonials({ featured: true, onlyActive: true });
  const galleryItems = getGalleryItems({ onlyActive: true });
  const newsBlogs = getNewsBlogs({ onlyPublished: true, limit: 6 });
  const partners = getPartners(true);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Slideshow Carousel */}
      <HeroSlider slides={slides} />

      {/* 2. Institutional Accreditation & Verified Partners Grid */}
      <PartnersSection partners={partners} />

      {/* 3. Organization Introduction & Trust Credentials */}
      <OrganizationIntro />

      {/* 4. Our Focus Educational Pillars */}
      <FocusAreas areas={focusAreas} />

      {/* 5. Verified Impact & Career Placement Statistics */}
      <ImpactCounters stats={impactStats} />

      {/* 6. Featured Career Diploma Programs with Interactive Filters */}
      <FeaturedCourses courses={featuredCourses} />

      {/* 7. Dedicated Other Courses & Disciplines Section */}
      <OtherCoursesSection />

      {/* 8. Mission & Vision Principles */}
      <MissionVisionSection />

      {/* 9. Successful Students & Placed Alumni Carousel Slider */}
      <SuccessStoriesSection testimonials={testimonials} />

      {/* 10. Photo & Clinical Practical Training Gallery */}
      <MasonryGallery items={galleryItems.slice(0, 8)} />

      {/* 11. Official News, Notices, Circulars & Updates Section */}
      <NewsAndNoticesSection articles={newsBlogs} />

      {/* 12. Student Counseling & Admissions Inquiry Callout */}
      <NewsletterSection />
    </div>
  );
}
