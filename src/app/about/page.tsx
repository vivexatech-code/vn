import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getSettings } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  ShieldCheck, CheckCircle2, Heart, Users, BookOpen,
  Utensils, Sparkles, HeartHandshake, ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About Us | VN Vidhyapeeth Social Welfare Trust',
  description: 'Learn about VN Vidhyapeeth, a registered educational & social welfare trust dedicated to education for everyone, food relief, and child welfare.'
};

export default function AboutPage() {
  const settings = getSettings();

  return (
    <div>
      <PageHeader
        badge="Organizational Overview"
        title="About VN Vidhyapeeth"
        subtitle="Dedicated to building a compassionate, equitable society through free education, hunger relief, and community welfare."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Main Narrative Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Who We Are
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63] leading-tight">
                An Educational &amp; Social Welfare Trust Dedicated to Human Dignity
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                <strong>VN Vidhyapeeth</strong> is a registered educational and social welfare trust constituted under the <strong>Indian Trust Act 1882</strong>. Operating with its registered office in New Delhi and administrative hub in Haryana, the trust works tirelessly to uplift underprivileged children, impoverished families, and marginalized communities.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Our motto, <em>&ldquo;Education for Everyone, Employment for All&rdquo;</em>, embodies our belief that access to free learning, school materials, and adequate nutrition are basic human rights. Through a grassroots network of passionate volunteers, educators, and social workers, we bring tangible change right to the doorsteps of those who need it most.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-100 bg-[#F7F8FC] p-4 rounded-2xl">
                  <span className="font-bold text-base text-[#102C63] block">Indian Trust Act 1882</span>
                  <p className="text-xs text-slate-600 mt-1">Legally registered public charitable trust for education, relief, and child welfare.</p>
                </div>
                <div className="border border-slate-100 bg-[#F7F8FC] p-4 rounded-2xl">
                  <span className="font-bold text-base text-[#102C63] block">NITI Aayog &amp; MSME</span>
                  <p className="text-xs text-slate-600 mt-1">Recognized on government NGO portals and ISO 9001:2015 quality standards.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/ngo/hero-children-study.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Children Education"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Pillars */}
      <section className="py-16 bg-[#F7F8FC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#183F91] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#102C63]">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To eradicate poverty, hunger, and illiteracy by providing free schooling, nutritious food support, school supplies, and socio-economic empowerment to every disadvantaged child and family.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D52D2D] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#102C63]">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A nation where every child has access to books, classrooms, and healthy meals, and where vulnerable families receive compassionate support to build self-reliant livelihoods.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#102C63]">Our Commitment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Absolute 100% financial and operational transparency. Every contribution is directed to verified grassroots distribution drives with zero intermediary wastage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#102C63]">
            Be Part of Our Journey Towards a Kinder Society
          </h2>
          <p className="text-sm text-slate-600">
            Whether you wish to sponsor a child&apos;s education or volunteer on weekends, we welcome you with open arms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow transition"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate Now</span>
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow transition"
            >
              <Users className="w-4 h-4" />
              <span>Join as Volunteer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
