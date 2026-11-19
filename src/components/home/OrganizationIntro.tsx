import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, Award, Users, BookOpen } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function OrganizationIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/newslider2.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Students in Paramedical Training"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C63]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge Card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-[#102C63] text-white p-5 sm:p-6 rounded-2xl shadow-xl border-2 border-white max-w-[260px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-black font-serif text-white block leading-none">7+</span>
                    <span className="text-xs text-blue-200">Years of Service</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Operated by a Registered Trust under <strong>Indian Trust Act 1882</strong>
                </p>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#183F91]" />
              Empowering Lives Through Education
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#102C63] leading-tight">
              A Premier Educational Initiative Dedicated to Skill & Social Empowerment
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              <strong>VN Vidhyapeeth</strong> is an autonomous educational and skill-development institution operated under a registered trust (Indian Trust Act 1882). Our mission is to bridge India’s technical and healthcare skill gap by providing accessible, employment-oriented, and high-quality vocational education to every ambitious student.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FC] border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Job & Practical Oriented</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Real clinical hospital rotations and technical laboratory experiments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FC] border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Affordable & Inclusive</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Subsidized fee structures and merit scholarships for deserving candidates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FC] border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Nationwide Study Centers</h4>
                  <p className="text-xs text-slate-600 mt-0.5">100+ authorized affiliated centers across Indian states and districts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F7FC] border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#102C63]">Verified Accreditations</h4>
                  <p className="text-xs text-slate-600 mt-0.5">ISO 9001:2015 certified, NITI Aayog & MSME registered framework.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-xl shadow-md transition-all duration-200"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/initiatives"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm sm:text-base px-6 py-3 rounded-xl transition-all duration-200"
              >
                <span>Explore Initiatives</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
