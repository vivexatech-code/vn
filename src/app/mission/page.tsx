import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Target, Compass, CheckCircle2, Heart, ArrowRight, ShieldCheck, BookOpen, Utensils, Sparkles } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Mission & Vision | VN Vidhyapeeth Social Welfare Trust',
  description: 'Our mission and vision for empowering underprivileged children and families through education, meals, school supplies, and community welfare.'
};

export default function MissionPage() {
  return (
    <div>
      <PageHeader
        badge="Core Purpose &amp; Philosophy"
        title="Our Mission &amp; Strategic Vision"
        subtitle="Dedicated to building an inclusive, dignified society where quality education, nourishment, and essential supplies reach every child in need."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Mission & Vision' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-50 text-[#D52D2D] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                Our Welfare Mission
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
                Education for Everyone, Employment for All
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Our mission is to empower impoverished children and families by providing free school admissions, free textbooks, daily nutritious meals, and holistic community social welfare. We work to break generational cycles of deprivation.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-4 bg-[#F7F8FC] rounded-2xl border border-slate-100">
                  <BookOpen className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#102C63]">Free Education for Every Child</h4>
                    <p className="text-xs text-slate-600 mt-1">Sponsoring tuition, uniforms, and running community remedial tutoring centers in rural clusters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F7F8FC] rounded-2xl border border-slate-100">
                  <Utensils className="w-5 h-5 text-[#D52D2D] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#102C63]">Hunger Relief &amp; Nutritious Meals</h4>
                    <p className="text-xs text-slate-600 mt-1">Conducting weekly community kitchens and delivering monthly dry ration grocery kits to vulnerable families.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F7F8FC] rounded-2xl border border-slate-100">
                  <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#102C63]">Free Stationery &amp; School Kits</h4>
                    <p className="text-xs text-slate-600 mt-1">Delivering notebooks, geometry sets, pens, and backpacks to students across village schools.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/ngo/initiative-food.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Hunger Relief"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/ngo/hero-community.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Community Vision"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                Our Strategic Vision
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
                A Society Where No One is Left Behind
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                We envision an India where birth background does not dictate destiny. By connecting generous donors with verified grassroots beneficiaries, we create self-sustaining communities where every child graduates and every family thrives.
              </p>

              <div className="p-6 bg-gradient-to-br from-[#102C63] to-[#183F91] text-white rounded-3xl space-y-3">
                <h3 className="font-bold text-lg text-amber-300">Our Core Values:</h3>
                <div className="space-y-2 text-xs sm:text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span><strong>Compassion in Action:</strong> Serving every individual with empathy and unconditional respect.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span><strong>100% Transparency:</strong> Providing verifiable proof of all funds received and distributed.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span><strong>Community Empowerment:</strong> Involving local residents and volunteers in every drive.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support Our Mission</span>
                </Link>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow transition"
                >
                  <span>Become a Volunteer</span>
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
