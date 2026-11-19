import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function MissionVisionSection() {
  return (
    <section className="py-20 bg-[#F5F7FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Visual Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                <ImageWithFallback
                  src="/images/newslider4.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="Practical classroom training at VN Vidhyapeeth"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#102C63] text-white p-6 rounded-2xl shadow-md">
                <span className="text-3xl font-serif font-black text-red-400 block mb-1">100%</span>
                <span className="text-xs text-blue-200 uppercase font-semibold tracking-wider">Employment Focus</span>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Dedicated job orientation and placement support across all vocational trades.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
                <span className="text-3xl font-serif font-black text-[#183F91] block mb-1">ITA 1882</span>
                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Registered Trust</span>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Legally constituted non-profit educational institution adhering to national standards.
                </p>
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                <ImageWithFallback
                  src="/images/newslider5.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="Healthcare training demonstration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Mission & Vision Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Organizational Principles
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
                Guiding Purpose & Strategic Vision
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Empowering India&apos;s youth with tangible, job-ready skills so that every student can build a dignified, self-reliant future.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#102C63]">
                  Our Mission
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                To deliver high-quality, subsidized, and employment-driven skill training in allied health, computers, and vocational trades through standardized study centers across the nation.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Practical Clinical Training</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Affordable Education For All</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Direct Hospital Rotations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Self-Reliance (Atmanirbhar)</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#183F91] flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#102C63]">
                  Our Vision
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                To create a pan-India network of authorized skill centers reaching every district and rural village, ensuring no aspiring young mind is deprived of career opportunities due to financial constraints or lack of infrastructure.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition group"
              >
                <span>Discover More on Our Goals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
