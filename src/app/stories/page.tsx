import React from 'react';
import Link from 'next/link';
import { getTestimonials } from '@/lib/data';
import PageHeader from '@/components/common/PageHeader';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Heart, Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Stories of Change | VN Vidhyapeeth Social Welfare Trust',
  description: 'Read real stories of transformation: Underprivileged children getting education, hungry families receiving meals, and students equipped with school stationery.'
};

export default function StoriesPage() {
  const stories = getTestimonials({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Real Transformation"
        title="Stories of Change"
        subtitle="Behind every statistic is a human life transformed through your compassion and collective action."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Stories of Change' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-[#F7F8FC] rounded-3xl p-8 border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />

                  {/* Photo & Profile */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white flex-shrink-0">
                      <ImageWithFallback
                        src={story.photo_url || '/images/ngo/story-priya.jpg'}
                        fallbackSrc="/images/placeholder-student.svg"
                        alt={story.student_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#102C63]">
                        {story.student_name}
                      </h3>
                      <span className="text-xs font-semibold text-[#D52D2D] block">
                        {story.course_name}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {story.achievement}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  {story.story && (
                    <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200/60 pt-3">
                      {story.story}
                    </p>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full">
                    Verified Beneficiary
                  </span>
                  <Link
                    href="/donate"
                    className="text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition flex items-center gap-1"
                  >
                    <span>Support Similar Lives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
