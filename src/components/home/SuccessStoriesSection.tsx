'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Testimonial } from '@/lib/data';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Sparkles, UserCheck, Users } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface SuccessStoriesSectionProps {
  testimonials: Testimonial[];
}

export default function SuccessStoriesSection({ testimonials }: SuccessStoriesSectionProps) {
  const [activeTab, setActiveTab] = useState<'beneficiaries' | 'donors' | 'volunteers'>('beneficiaries');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Additional experiences as requested in Requirement 8
  const donorExperiences = [
    {
      name: 'Ravi & Neha Malhotra',
      role: 'Monthly Donor',
      location: 'Delhi NCR',
      quote: 'Knowing that our small monthly contribution of ₹501 ensures hot meals for a daily-wage family gives our hearts immense peace.',
      image: '/images/ngo/volunteer-team.jpg',
      badge: 'Donor Perspective'
    },
    {
      name: 'Amitabh Sengupta',
      role: 'Education Supporter',
      location: 'Chandigarh',
      quote: 'I sponsored school kits for 10 village kids. Seeing photos of them holding their new notebooks was the best feeling of my year.',
      image: '/images/ngo/hero-stationery.jpg',
      badge: 'Donor Perspective'
    }
  ];

  const volunteerExperiences = [
    {
      name: 'Dr. Meenakshi Sundaram',
      role: 'Weekend Volunteer Teacher',
      location: 'Sirsa',
      quote: 'Teaching math and reading to children on Saturday mornings opened my eyes. These kids are bright, eager, and full of boundless curiosity.',
      image: '/images/ngo/volunteer-team.jpg',
      badge: 'Volunteer Voice'
    },
    {
      name: 'Karan Deep Singh',
      role: 'Food Relief Coordinator',
      location: 'Ellenabad',
      quote: 'Handing grocery kits directly into the hands of elderly grandmothers and mothers taught me what real community care looks like.',
      image: '/images/ngo/hero-food-relief.jpg',
      badge: 'Volunteer Voice'
    }
  ];

  const totalStories =
    activeTab === 'beneficiaries' ? testimonials.length :
    activeTab === 'donors' ? donorExperiences.length : volunteerExperiences.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalStories);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalStories) % totalStories);

  return (
    <section className="py-20 sm:py-26 bg-[#FFF8F0] border-t border-[#EFE4DC]" id="stories" aria-label="Real Stories and Experiences">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
              <span>Voices from the ground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight leading-snug">
              Stories of Hope, Dignity & Kindness
            </h2>
            <p className="mt-2.5 text-base text-[#78665E] leading-relaxed">
              Hear from the children we support, the generous donors who believe in them, and the volunteers who work beside them.
            </p>
          </div>

          {/* Perspective Selector Tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#EFE4DC]">
            <button
              onClick={() => {
                setActiveTab('beneficiaries');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'beneficiaries'
                  ? 'bg-[#C87552] text-white shadow-xs'
                  : 'text-[#49352D] hover:bg-[#F4D6C6]/30'
              }`}
            >
              Children & Families
            </button>
            <button
              onClick={() => {
                setActiveTab('donors');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'donors'
                  ? 'bg-[#C87552] text-white shadow-xs'
                  : 'text-[#49352D] hover:bg-[#F4D6C6]/30'
              }`}
            >
              Donors
            </button>
            <button
              onClick={() => {
                setActiveTab('volunteers');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'volunteers'
                  ? 'bg-[#C87552] text-white shadow-xs'
                  : 'text-[#49352D] hover:bg-[#F4D6C6]/30'
              }`}
            >
              Volunteers
            </button>
          </div>
        </div>

        {/* Content Slider View */}
        {activeTab === 'beneficiaries' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] shadow-xs flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-[#F4D6C6]/30 overflow-hidden">
                  <ImageWithFallback
                    src={story.photo_url || '/images/ngo/story-priya.jpg'}
                    fallbackSrc="/images/placeholder-student.svg"
                    alt={story.student_name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#49352D]/90 text-[#FFF8F0] px-2.5 py-1 rounded-md text-[11px] font-medium">
                    {story.course_name}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-[#49352D]">
                      {story.student_name}
                    </h3>
                    <p className="font-serif text-sm text-[#49352D] leading-relaxed italic relative pl-3.5 border-l-2 border-[#C87552]">
                      "{story.quote}"
                    </p>
                    <p className="text-xs text-[#78665E] leading-relaxed">
                      {story.story}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EFE4DC] flex items-center justify-between text-xs">
                    <span className="font-medium text-[#78866B] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#78866B]" />
                      <span>{story.achievement}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Donors Tab */}
        {activeTab === 'donors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donorExperiences.map((donor, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#EFE4DC] shadow-xs flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F4D6C6]/30 flex-shrink-0">
                  <ImageWithFallback
                    src={donor.image}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={donor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[11px] font-medium text-[#C87552] bg-[#F4D6C6]/40 px-2.5 py-0.5 rounded-md inline-block">
                    {donor.badge}
                  </span>
                  <p className="font-serif text-sm text-[#49352D] italic leading-relaxed">
                    "{donor.quote}"
                  </p>
                  <div>
                    <h4 className="text-sm font-semibold text-[#49352D]">{donor.name}</h4>
                    <span className="text-xs text-[#78665E]">{donor.role} • {donor.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteerExperiences.map((vol, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#EFE4DC] shadow-xs flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F4D6C6]/30 flex-shrink-0">
                  <ImageWithFallback
                    src={vol.image}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={vol.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[11px] font-medium text-[#78866B] bg-[#EBF0E6] px-2.5 py-0.5 rounded-md inline-block">
                    {vol.badge}
                  </span>
                  <p className="font-serif text-sm text-[#49352D] italic leading-relaxed">
                    "{vol.quote}"
                  </p>
                  <div>
                    <h4 className="text-sm font-semibold text-[#49352D]">{vol.name}</h4>
                    <span className="text-xs text-[#78665E]">{vol.role} • {vol.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#C87552] hover:text-[#B56140] transition-colors"
          >
            <span>Read more stories of real change</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
