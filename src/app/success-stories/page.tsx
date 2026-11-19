import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getTestimonials } from '@/lib/data';
import { Quote, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Student Success Stories | VN Vidhyapeeth',
  description: 'Verified student achievements and alumni testimonials from VN Vidhyapeeth across India.'
};


export default function SuccessStoriesPage() {
  const testimonials = getTestimonials({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Alumni Impact"
        title="Student Success Stories"
        subtitle="Discover how VN Vidhyapeeth diplomas have empowered students to achieve stable careers and financial independence."
        breadcrumbs={[{ label: 'Success Stories' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-serif font-black text-[#102C63]">
              From Classrooms & Labs to Thriving Healthcare Careers
            </h2>
            <p className="text-slate-600 text-base">
              Verified achievements of our students who completed diplomas and are making lasting differences in their communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((story) => (
              <div
                key={story.id}
                className="bg-[#F5F7FC] rounded-3xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="space-y-6">
                  {/* Student Header */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex-shrink-0">
                      <ImageWithFallback
                        src={story.photo_url || '/images/neeraj-success-section.jpg'}
                        fallbackSrc="/images/placeholder-student.svg"
                        alt={story.student_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-xl text-[#102C63]">
                        {story.student_name}
                      </h3>
                      <p className="text-xs font-bold text-[#183F91] mt-0.5">
                        {story.course_name}
                      </p>
                      <div className="inline-flex items-center gap-1.5 bg-green-100/80 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                        <span>{story.achievement}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative p-5 bg-white rounded-2xl border border-slate-100 italic text-slate-700 text-sm leading-relaxed">
                    <Quote className="w-5 h-5 text-blue-200 mb-2" />
                    &ldquo;{story.quote}&rdquo;
                  </div>

                  {/* Full Story Narrative */}
                  {story.story && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {story.story}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Admission CTA Box */}
          <div className="bg-[#102C63] text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-serif font-black">
              Start Writing Your Own Success Story
            </h3>
            <p className="text-sm text-blue-200 max-w-lg mx-auto">
              Enroll today in our verified paramedical, IT, and vocational courses. Admissions open for session 2025–2026.
            </p>
            <div className="pt-2">
              <Link
                href="/online-admission"
                className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-lg transition"
              >
                <span>Apply for Online Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
