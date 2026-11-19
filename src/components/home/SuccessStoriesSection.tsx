'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Testimonial } from '@/lib/data';
import { Award, ChevronLeft, ChevronRight, GraduationCap, CheckCircle2 } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface SuccessStoriesSectionProps {
  testimonials: Testimonial[];
}

export default function SuccessStoriesSection({ testimonials }: SuccessStoriesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!testimonials || testimonials.length === 0) return null;

  const total = testimonials.length;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#D52D2D] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Successful Students &amp; Placed Alumni</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
              Real Stories of Real Transformation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Meet our proud alumni who mastered clinical paramedical skills and digital technologies at VN Vidhyapeeth and are now working in top healthcare diagnostic centers and hospitals.
            </p>
          </div>

          {/* Slider Navigation Arrows & View All Link */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <Link
              href="/success-stories"
              className="text-xs sm:text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition hidden sm:inline-block"
            >
              View All Alumni →
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Student"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-sm hover:shadow transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Student"
                className="w-10 h-10 rounded-full bg-[#183F91] hover:bg-[#102C63] text-white flex items-center justify-center shadow-md hover:shadow-lg transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500"
          >
            {testimonials.map((story, idx) => (
              <div
                key={story.id}
                className="bg-[#F5F7FC] rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* Photo & Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex-shrink-0">
                      <ImageWithFallback
                        src={story.photo_url || '/images/neeraj-success-section.jpg'}
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
                      <p className="text-xs font-semibold text-[#183F91] mt-0.5 truncate">
                        {story.course_name}
                      </p>
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1.5">
                        <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Verified Alumnus</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Status Pill */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 mb-3 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Achievement / Employment Status
                    </span>
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      {story.achievement}
                    </p>
                  </div>

                  {/* Student Quote */}
                  <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                {/* Footer link to online admission */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">Batch Completed</span>
                  <Link
                    href="/online-admission"
                    className="text-[11px] font-bold text-[#183F91] hover:text-[#D52D2D] transition inline-flex items-center gap-1"
                  >
                    <span>Apply for this Course</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === dotIdx ? 'w-8 bg-[#183F91]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
