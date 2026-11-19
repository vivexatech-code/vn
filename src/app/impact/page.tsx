import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getImpactStats } from '@/lib/data';
import { Award, Heart, CheckCircle, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Impact | VN Vidhyapeeth Social Welfare Trust',
  description: 'Explore the real-world humanitarian impact of VN Vidhyapeeth: 15,000+ children educated, 85,000+ meals distributed, and thousands of families empowered.'
};

export default function ImpactPage() {
  const stats = getImpactStats(true);

  return (
    <div>
      <PageHeader
        badge="Accountability &amp; Results"
        title="Our Measurable Social Impact"
        subtitle="Transparent, verified statistics reflecting the lives touched by our educational, food, and stationery welfare programs."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Impact' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
              Humanitarian Reach Across Vulnerable Communities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Operating under the Indian Trust Act 1882, VN Vidhyapeeth ensures that 100% of donor funding goes directly to verified children, school kits, and wholesome family meals.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((s) => (
              <div key={s.id} className="bg-[#F7F8FC] p-8 rounded-3xl border border-slate-100 text-center flex flex-col items-center shadow-sm hover:shadow-md transition">
                <span className="font-bold text-4xl sm:text-5xl text-[#183F91] mb-2">
                  {s.prefix}{s.value}<span className="text-[#D52D2D]">{s.suffix}</span>
                </span>
                <h3 className="font-bold text-base text-[#102C63] mb-2">
                  {s.label}
                </h3>
                {s.description && (
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{s.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Impact Stories Highlight Card */}
          <div className="bg-gradient-to-r from-[#102C63] to-[#183F91] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Direct Impact Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                100% Transparency in Every Distribution Drive
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                From delivering stationery kits directly into children&apos;s hands to preparing fresh meals for families in slums, our ground team documents every distribution to maintain total accountability.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Read Stories of Change</span>
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-white text-[#102C63] hover:bg-slate-100 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow transition"
                >
                  <span>Support Our Mission</span>
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
