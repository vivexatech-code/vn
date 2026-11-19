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

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Image */}
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-[#F5F7FC] rounded-2xl border border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 block">Course Duration</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#102C63] mt-1">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Eligibility</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#102C63] mt-1">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{course.eligibility}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">Certification</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-[#102C63] mt-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>ISO 9001:2015 / Trust</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-black text-[#102C63]">
                  Course Overview & Objectives
                </h2>
                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>{course.full_desc || course.short_desc}</p>
                </div>
              </div>

              {/* Syllabus Breakdown */}
              {course.syllabus && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#102C63] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#183F91]" />
                    <span>Curriculum & Practical Syllabus</span>
                  </h3>
                  <div className="bg-[#F5F7FC] p-6 rounded-2xl border border-slate-100 text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                    {course.syllabus}
                  </div>
                </div>
              )}

              {/* Career Opportunities */}
              {course.career_prospects && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#102C63] flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-red-600" />
                    <span>Career Prospects & Job Roles</span>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Graduates of this program are qualified for diverse clinical, industrial, and administrative positions:
                  </p>
                  <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 text-sm font-medium text-[#102C63]">
                    {course.career_prospects}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Admission Form & Contact (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Online Admission Action Box */}
              <div className="bg-white p-7 rounded-3xl shadow-card border border-slate-200/80 space-y-5 sticky top-28">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block mb-1">
                    Session 2025–2026
                  </span>
                  <h3 className="text-xl font-serif font-black text-[#102C63]">
                    Apply for Admission
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Submit your application for verification and seat reservation.
                  </p>
                </div>

                <form action="/contact" method="GET" className="space-y-3">
                  <input type="hidden" name="type" value="admission" />
                  <input type="hidden" name="course" value={course.title} />

                  <div className="p-3 bg-[#F5F7FC] rounded-xl text-xs space-y-1">
                    <span className="text-slate-400 block">Selected Course:</span>
                    <strong className="text-[#102C63] block font-medium">{course.title}</strong>
                  </div>

                  <Link
                    href="/online-admission"
                    className="w-full flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition"
                  >
                    <span>Proceed to Online Admission Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </form>

                {/* Direct Helplines */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <span className="font-bold text-[#102C63] block">Need Help Choosing?</span>
                  <a href="tel:+917015358183" className="flex items-center gap-2 hover:text-[#183F91]">
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    <span>+91 7015358183</span>
                  </a>
                  <a href="tel:+918199048325" className="flex items-center gap-2 hover:text-[#183F91]">
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    <span>+91 8199048325</span>
                  </a>
                  <a href="mailto:vnvidyapeeth@gmail.com" className="flex items-center gap-2 hover:text-[#183F91]">
                    <Mail className="w-3.5 h-3.5 text-red-500" />
                    <span>vnvidyapeeth@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="pt-16 mt-16 border-t border-slate-100 space-y-8">
              <h3 className="text-2xl font-serif font-black text-[#102C63]">
                Other Programs in {course.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map((rel) => (
                  <div key={rel.id} className="bg-[#F5F7FC] rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-red-600 block mb-1">{rel.duration}</span>
                      <h4 className="font-serif font-bold text-base text-[#102C63] mb-2">{rel.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{rel.short_desc}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-200/60">
                      <Link href={`/courses/${rel.slug}`} className="text-xs font-bold text-[#183F91] hover:underline flex items-center gap-1">
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
