'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/lib/data';
import { Clock, GraduationCap, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'Paramedical', label: 'Paramedical & Allied Health' },
    { id: 'Computer', label: 'Computer & Digital' },
    { id: 'Vocational', label: 'Vocational Trades' }
  ];

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#183F91]" />
              Career Oriented Programs
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
              Featured Courses & Diplomas
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Recognized vocational and healthcare curriculums with certified clinical and industrial internships.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition group self-start md:self-auto"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#183F91] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 6).map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-card shadow-card-hover border border-slate-100 flex flex-col justify-between"
            >
              <div>
                {/* Course Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={course.image_url || '/images/dmlt.jpg'}
                    fallbackSrc="/images/placeholder-course.svg"
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#183F91] shadow">
                    {course.category}
                  </div>

                  {course.code && (
                    <div className="absolute top-4 right-4 bg-[#102C63]/90 text-white px-2.5 py-1 rounded text-[11px] font-mono font-medium shadow">
                      {course.code}
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Duration & Eligibility Meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      {course.duration}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-700 truncate" title={course.eligibility}>
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span className="truncate">{course.eligibility}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#102C63] group-hover:text-[#183F91] transition leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {course.short_desc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#F5F7FC] hover:bg-[#183F91] hover:text-white text-[#183F91] py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-200"
                >
                  <span>View Details & Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
