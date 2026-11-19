'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Testimonial } from '@/lib/data';
import { Heart, ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface SuccessStoriesSectionProps {
  testimonials: Testimonial[];
}

export default function SuccessStoriesSection({ testimonials }: SuccessStoriesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const total = testimonials.length;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-[#F7F8FC] overflow-hidden" id="stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#D52D2D] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#D52D2D]" />
              <span>Stories of Change</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
              Real Lives, Real Transformation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Meet the children, mothers, and families whose lives have been uplifted through free schooling, stationery kits, hunger relief, and ongoing community welfare.
            </p>
          </div>

          {/* Slider Navigation Arrows & View All Link */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <Link
              href="/stories"
              className="text-xs sm:text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition hidden sm:inline-flex items-center gap-1"
            >
              <span>View All Stories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Story"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm hover:shadow transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Story"
                className="w-10 h-10 rounded-full bg-[#183F91] hover:bg-[#102C63] text-white flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-7 border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div>
                <Quote className="w-8 h-8 text-blue-100 mb-4" />

                {/* Photo & Bio */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md bg-slate-100 flex-shrink-0">
                    <ImageWithFallback
                      src={story.photo_url || '/images/ngo/story-priya.jpg'}
                      fallbackSrc="/images/placeholder-student.svg"
                      alt={story.student_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base text-[#102C63] truncate">
                      {story.student_name}
                    </h4>
                    <span className="text-xs font-semibold text-[#D52D2D] block truncate">
                      {story.course_name}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {story.achievement}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-4">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Story narrative */}
                {story.story && (
                  <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {story.story}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Beneficiary Story
                </span>
                <Link
                  href="/donate"
                  className="text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition flex items-center gap-1"
                >
                  <span>Help More Children</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
