'use client';

import React from 'react';
import Link from 'next/link';
import { Testimonial } from '@/lib/data';
import { ArrowRight, Quote } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface SuccessStoriesSectionProps {
  testimonials: Testimonial[];
}

export default function SuccessStoriesSection({ testimonials }: SuccessStoriesSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100" id="stories" aria-label="Stories of Change">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
              <span>Human Stories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
              Real Stories of Hope and Dignity
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Every child we sponsor and every family we support has a name, a dream, and a journey.
            </p>
          </div>

          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#183F91] hover:text-[#D52D2D] transition-colors whitespace-nowrap"
          >
            <span>Read more stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Prominent Photo-Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((story) => (
            <div
              key={story.id}
              className="bg-[#F8F9FA] rounded-2xl overflow-hidden border border-slate-200/70 flex flex-col justify-between"
            >
              {/* Authentic Photo with Respectful Natural Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <ImageWithFallback
                  src={story.photo_url || '/images/ngo/story-priya.jpg'}
                  fallbackSrc="/images/placeholder-student.svg"
                  alt={story.student_name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Story Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-[#102C63]">
                        {story.student_name}
                      </h3>
                      <span className="text-xs text-[#D52D2D] font-medium block">
                        {story.course_name}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative pl-4 border-l-2 border-[#D52D2D]/60">
                    "{story.quote}"
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {story.story}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Impact: {story.achievement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
