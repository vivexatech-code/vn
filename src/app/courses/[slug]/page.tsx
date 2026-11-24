import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { getCourseBySlug, getCourses } from '@/lib/data';
import {
  Clock, GraduationCap, CheckCircle2, BookOpen,
  Award, Briefcase, Phone, Mail, ArrowRight, ShieldCheck
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: 'Course Not Found | VN Vidhyapeeth' };

  return {
    title: `${course.title} | VN Vidhyapeeth`,
    description: course.short_desc,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const relatedCourses = getCourses({
    category: course.category,
    onlyActive: true
  }).filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <div>
      <PageHeader
        badge={course.category}
        title={course.title}
        subtitle={course.short_desc}
        breadcrumbs={[
          { label: 'Education & Courses', href: '/courses' },
          { label: course.title }
        ]}
      />

      <section className="py-16 sm:py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Image */}
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md border border-[#EFE4DC] bg-slate-100">
                <ImageWithFallback
                  src={course.image_url || '/images/dmlt.jpg'}
                  fallbackSrc="/images/placeholder-course.svg"
                  alt={course.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Course Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-white rounded-2xl border border-[#EFE4DC] shadow-xs">
                <div>
                  <span className="text-xs text-[#78665E] block">Course Duration</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#49352D] mt-1">
                    <Clock className="w-4 h-4 text-[#C87552]" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#78665E] block">Eligibility</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#49352D] mt-1">
                    <GraduationCap className="w-4 h-4 text-[#78866B]" />
                    <span>{course.eligibility}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#78665E] block">Certification</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#49352D] mt-1">
                    <ShieldCheck className="w-4 h-4 text-[#78866B]" />
                    <span>ISO 9001:2015 / Trust</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-black text-[#49352D]">
                  Course Overview & Objectives
                </h2>
                <div className="text-[#78665E] text-sm sm:text-base leading-relaxed space-y-3">
                  <p>{course.full_desc || course.short_desc}</p>
                </div>
              </div>

              {/* Syllabus Breakdown */}
              {course.syllabus && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#49352D] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#C87552]" />
                    <span>Curriculum & Practical Syllabus</span>
                  </h3>
                  <div className="bg-white p-6 rounded-2xl border border-[#EFE4DC] text-sm text-[#49352D] whitespace-pre-line leading-relaxed font-sans shadow-xs">
                    {course.syllabus}
                  </div>
                </div>
              )}

              {/* Career Opportunities */}
              {course.career_prospects && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#49352D] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#C87552]" />
                    <span>Career Prospects & Job Roles</span>
                  </h3>
                  <p className="text-sm text-[#78665E] leading-relaxed">
                    Graduates of this program are qualified for diverse clinical, industrial, and administrative positions:
                  </p>
                  <div className="p-5 bg-white rounded-2xl border border-[#EFE4DC] text-sm font-medium text-[#49352D] shadow-xs">
                    {course.career_prospects}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Admission Form & Contact (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Online Admission Action Box */}
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-[#EFE4DC] space-y-5 sticky top-28">
                <div className="border-b border-[#EFE4DC] pb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C87552] block mb-1">
                    Academic Year 2025–2026
                  </span>
                  <h3 className="text-xl font-serif font-black text-[#49352D]">
                    Apply for Admission
                  </h3>
                  <p className="text-xs text-[#78665E] mt-1">
                    Submit your application for verification and seat reservation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-[#FFF8F0] rounded-xl text-xs space-y-1 border border-[#EFE4DC]">
                    <span className="text-[#78665E] block">Selected Course:</span>
                    <strong className="text-[#49352D] block font-medium">{course.title}</strong>
                  </div>

                  <Link
                    href={`/online-admission?course=${encodeURIComponent(course.title)}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition"
                  >
                    <span>Proceed to Online Admission Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Direct Helplines */}
                <div className="pt-4 border-t border-[#EFE4DC] space-y-2.5 text-xs text-[#78665E]">
                  <span className="font-bold text-[#49352D] block">Need Help Choosing?</span>
                  <a href="tel:+917015358183" className="flex items-center gap-2 hover:text-[#C87552]">
                    <Phone className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>+91 7015358183</span>
                  </a>
                  <a href="tel:+918199048325" className="flex items-center gap-2 hover:text-[#C87552]">
                    <Phone className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>+91 8199048325</span>
                  </a>
                  <a href="mailto:vnvidyapeeth@gmail.com" className="flex items-center gap-2 hover:text-[#C87552]">
                    <Mail className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>vnvidyapeeth@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="pt-16 mt-16 border-t border-[#EFE4DC] space-y-8">
              <h3 className="text-2xl font-serif font-black text-[#49352D]">
                Other Programs in {course.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map((rel) => (
                  <div key={rel.id} className="bg-white rounded-2xl p-5 border border-[#EFE4DC] shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#C87552] block mb-1">{rel.duration}</span>
                      <h4 className="font-serif font-bold text-base text-[#49352D] mb-2">{rel.title}</h4>
                      <p className="text-xs text-[#78665E] line-clamp-2">{rel.short_desc}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#EFE4DC]">
                      <Link href={`/courses/${rel.slug}`} className="text-xs font-bold text-[#C87552] hover:text-[#B56140] flex items-center gap-1">
                        <span>View Program</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
