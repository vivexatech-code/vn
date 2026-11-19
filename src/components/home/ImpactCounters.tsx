'use client';

import React from 'react';
import { ImpactStat } from '@/lib/data';
import { GraduationCap, Building2, BookOpen, Award, CheckCircle } from 'lucide-react';

interface ImpactCountersProps {
  stats: ImpactStat[];
}

const iconMapping: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-8 h-8 text-white" />,
  Building2: <Building2 className="w-8 h-8 text-white" />,
  BookOpen: <BookOpen className="w-8 h-8 text-white" />,
  Award: <Award className="w-8 h-8 text-white" />
};

export default function ImpactCounters({ stats }: ImpactCountersProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="relative py-20 bg-[#102C63] text-white overflow-hidden">
      {/* Subtle Pattern & Glow Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#183F91] rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#D52D2D] rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-200 uppercase tracking-wider backdrop-blur-md border border-white/15">
            <CheckCircle className="w-3.5 h-3.5 text-red-400" />
            Verified Institutional Progress
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
            Measuring Our Real-World Impact
          </h2>
          <p className="text-slate-300 text-base">
            Tangible outcomes delivered across healthcare empowerment, technical literacy, and community building nationwide.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/25 transition-all duration-300 text-center flex flex-col items-center group hover:-translate-y-1 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#183F91]/80 flex items-center justify-center mb-6 group-hover:bg-[#D52D2D] transition-colors duration-300 shadow-md">
                {stat.icon_name && iconMapping[stat.icon_name] ? (
                  iconMapping[stat.icon_name]
                ) : (
                  <Award className="w-8 h-8 text-white" />
                )}
              </div>

              <div className="flex items-baseline justify-center font-serif font-black text-4xl sm:text-5xl text-white mb-2">
                <span>{stat.prefix}</span>
                <span>{stat.value}</span>
                <span className="text-[#D52D2D] ml-1">{stat.suffix}</span>
              </div>

              <h3 className="text-lg font-bold text-white font-serif mb-2">
                {stat.label}
              </h3>

              {stat.description && (
                <p className="text-xs text-blue-200/80 leading-relaxed max-w-[220px]">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
