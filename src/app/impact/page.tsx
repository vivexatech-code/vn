import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getImpactStats, getTestimonials } from '@/lib/data';
import { Award, Users, CheckCircle, GraduationCap, Building2, BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Impact | VN Vidhyapeeth',
  description: 'Verified educational and social impact metrics from VN Vidhyapeeth across India.'
};


export default function ImpactPage() {
  const stats = getImpactStats(true);
  const testimonials = getTestimonials({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Accountability & Progress"
        title="Our Measurable Social Impact"
        subtitle="Tracking the transformative reach of VN Vidhyapeeth in empowering rural and semi-urban communities with self-reliance."
        breadcrumbs={[{ label: 'Our Impact' }]}
      />

      {/* Main Stats Counter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
              Grassroots Change Across 100+ Authorized Centers
            </h2>
            <p className="text-slate-600 text-base">
              Operating under the Indian Trust Act 1882, we channel institutional resources directly to vocational instruction, lab infrastructure, and clinical placements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.id} className="bg-[#F5F7FC] p-8 rounded-3xl border border-slate-100 text-center flex flex-col items-center">
                <span className="font-serif font-black text-5xl text-[#183F91] mb-2">
                  {s.prefix}{s.value}{s.suffix}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#102C63] mb-2">
                  {s.label}
                </h3>
                {s.description && (
                  <p className="text-xs text-slate-500 max-w-xs">{s.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Impact Stories Highlight */}
          <div className="bg-[#102C63] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                Direct Employability
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black">
                Over 85% of Certified Students Placed or Self-Employed
              </h3>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                From emergency medical technicians in regional primary health centers to licensed pathology lab technicians and independent physiotherapy assistants, our graduates form the backbone of rural healthcare.
              </p>
              <div className="pt-2">
                <Link
                  href="/success-stories"
                  className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow transition"
                >
                  <span>Read Student Testimonials</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
