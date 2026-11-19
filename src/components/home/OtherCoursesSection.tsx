import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface CourseCategoryCard {
  title: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  link: string;
}

const DISCIPLINES: CourseCategoryCard[] = [
  {
    title: 'Medical Laboratory Technology',
    category: 'Paramedical Sciences',
    image: '/images/dmlt.jpg',
    description: 'Clinical biochemistry, hematology analyzers, pathology slide preparation, and hospital laboratory operations.',
    duration: '1 to 2 Years',
    link: '/courses?category=paramedical'
  },
  {
    title: 'Operation Theatre Technology',
    category: 'Surgical Assistance',
    image: '/images/dott.jpg',
    description: 'Sterilization protocols, anaesthetic workstation assisting, surgical instrumentation, and intensive recovery management.',
    duration: '2 Years',
    link: '/courses?category=paramedical'
  },
  {
    title: 'Physiotherapy & Rehabilitation',
    category: 'Physical Therapy',
    image: '/images/CPT.jpg',
    description: 'Therapeutic exercise protocols, electrotherapy, orthopedic rehabilitation, and neurological mobility recovery.',
    duration: '2 Years',
    link: '/courses?category=paramedical'
  },
  {
    title: 'X-Ray & Medical Imaging Technology',
    category: 'Diagnostic Radiography',
    image: '/images/dxrt.jpg',
    description: 'Diagnostic radiology, computed radiography positioning, darkroom processing, and radiation safety protocols.',
    duration: '2 Years',
    link: '/courses?category=paramedical'
  },
  {
    title: 'Basic & Advance Computer Applications',
    category: 'Information Technology',
    image: '/images/basic.jpg',
    description: 'ADCA & DCA diplomas covering office automation, database administration, web basics, and digital technology tools.',
    duration: '6 Months to 1 Year',
    link: '/courses?category=computer'
  },
  {
    title: 'Tally Prime & GST Accounting',
    category: 'Business Accounting',
    image: '/images/cmlt.jpg',
    description: 'Practical business accounting, GST return filing, e-way bills, inventory tracking, payroll, and banking reconciliation.',
    duration: '6 Months',
    link: '/courses?category=computer'
  },
  {
    title: 'Vocational & Industrial Trades',
    category: 'Vocational Education',
    image: '/images/dbbt.jpg',
    description: 'Job-oriented skill programs in textile manufacturing, industrial maintenance, electrical trades, and craftsmanship.',
    duration: '1 Year',
    link: '/courses?category=vocational'
  },
  {
    title: 'Naturopathy & Yogic Sciences',
    category: 'Holistic Wellness',
    image: '/images/cms.jpg',
    description: 'Drugless natural therapy (DNYS), therapeutic yogic asanas, hydrotherapy, mud therapy, and lifestyle wellness.',
    duration: '2 Years',
    link: '/courses?category=paramedical'
  }
];

export default function OtherCoursesSection() {
  return (
    <section className="py-20 bg-[#F5F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Comprehensive Academic Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
              Other Educational Courses &amp; Programs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our wide spectrum of certified vocational, paramedical, IT, and healthcare diploma programs designed for direct employability and self-employment.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#183F91] hover:bg-[#102C63] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition self-start md:self-auto"
          >
            <span>View All Course Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Disciplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISCIPLINES.map((course, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={course.image}
                    fallbackSrc="/images/placeholder-course.svg"
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#183F91] shadow-xs">
                    {course.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#102C63]/90 text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                    {course.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-base text-[#102C63] group-hover:text-[#183F91] transition line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <Link
                  href={course.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#183F91] group-hover:text-[#D52D2D] transition"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/online-admission"
                  className="text-[11px] font-semibold text-[#D52D2D] hover:underline"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
