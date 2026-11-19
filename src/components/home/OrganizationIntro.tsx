import React from 'react';
import Link from 'next/link';
import { Heart, CheckCircle2, ArrowRight, ShieldCheck, BookOpen, Utensils, Sparkles, Users } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function OrganizationIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Composition with authentic welfare photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/ngo/initiative-education.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Free Education & Child Welfare Initiatives"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C63]/70 via-transparent to-transparent" />
              </div>

              {/* Floating Trust Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-[#102C63] text-white p-5 sm:p-6 rounded-2xl shadow-xl border-2 border-white max-w-[270px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#D52D2D] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-white block leading-none">15,000+</span>
                    <span className="text-xs text-blue-200">Children Empowered</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Registered under <strong>Indian Trust Act 1882</strong> • NITI Aayog & MSME NGO Partner
                </p>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-3xl -z-10" />
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
              Social Welfare & Educational NGO
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102C63] leading-tight">
              Together, We Can Make a Difference.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              <strong>VN Vidhyapeeth</strong> is an autonomous educational and social welfare organization operated under a registered trust (Indian Trust Act 1882). We believe that poverty should never be an obstacle to a child’s education or dignity.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our core mission centers on working towards a compassionate, equitable society by providing <strong>free education support</strong> to underprivileged children, carrying out <strong>hunger relief food distribution drives</strong>, distributing <strong>free school stationery kits</strong>, and extending holistic community social welfare.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F8FC] border border-slate-100">
                <BookOpen className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Education for Everyone</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Sponsoring school admissions, textbooks, and free remedial evening tutoring.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F8FC] border border-slate-100">
                <Utensils className="w-5 h-5 text-[#D52D2D] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Hunger Relief Drives</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Wholesome hot meals and monthly dry ration kits for impoverished families.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F8FC] border border-slate-100">
                <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Free School Stationery</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Delivering notebooks, school bags, and stationery kits directly to students.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7F8FC] border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">100% Transparency</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Every rupee donated goes directly to verified grassroots welfare programs.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Read Full Mission & Vision</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate to Support</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
