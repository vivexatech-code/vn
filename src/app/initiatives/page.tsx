import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getFocusAreas } from '@/lib/data';
import { Heart, ArrowRight, BookOpen, Utensils, Sparkles, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Initiatives | VN Vidhyapeeth Social Welfare Trust',
  description: 'Explore the 5 core welfare initiatives of VN Vidhyapeeth: Education for poor children, food distribution & hunger relief, free stationery distribution, social welfare, and community support.'
};

export default function InitiativesPage() {
  const initiatives = getFocusAreas(true);

  return (
    <div>
      <PageHeader
        badge="Areas of Social Welfare"
        title="Our Core Welfare Initiatives"
        subtitle="Dedicated grassroots programs working tirelessly to eradicate poverty through education, meals, school supplies, and family assistance."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Initiatives' }]}
      />

      <section className="py-16 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-bold text-[#49352D]">
              Our Core Welfare Initiatives
            </h2>
            <p className="text-[#78665E] text-sm sm:text-base leading-relaxed">
              Every initiative is carefully designed to provide immediate relief and long-term socio-economic dignity to underprivileged children, vulnerable women, and low-income families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((init, idx) => (
              <div
                key={init.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EFE4DC] flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-200">
                    <ImageWithFallback
                      src={init.image_url || '/images/ngo/initiative-education.jpg'}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt={init.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#49352D]/90 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-white shadow">
                      {init.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-xl text-[#49352D] group-hover:text-[#C87552] transition">
                      {init.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#78665E] leading-relaxed">
                      {init.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-3">
                  <Link
                    href="/donate"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Support This Cause</span>
                  </Link>

                  <Link
                    href="/volunteer"
                    className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#49352D] bg-[#FFF8F0] border border-[#EFE4DC] hover:bg-[#F4D6C6]/40 transition"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Social Impact Callout Banner */}
          <div className="bg-[#49352D] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-[#C87552]/30">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-bold text-[#F4D6C6] tracking-wider">
                Community Collaboration
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Join Our Ground Network of Donors &amp; Volunteers
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF8F0]/90">
                Together, we have served over 85,000 meals and supported 15,000+ children with free education and stationery kits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/donate"
                className="bg-[#C87552] hover:bg-[#B56140] text-white px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate Now</span>
              </Link>
              <Link
                href="/volunteer"
                className="bg-white text-[#49352D] hover:bg-[#FFF8F0] px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition"
              >
                Join as Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
