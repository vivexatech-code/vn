'use client';

import React from 'react';
import { ImpactStat } from '@/lib/data';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface ImpactCountersProps {
  stats: ImpactStat[];
}

export default function ImpactCounters({ stats }: ImpactCountersProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-[#49352D] text-[#FFF8F0]" id="impact" aria-label="Our Real-World Impact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F4D6C6] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
            <span>Your kindness in action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#FFF8F0] tracking-tight leading-snug">
            Small Donations, Big Changes
          </h2>
          <p className="mt-3 text-base text-[#F4D6C6]/90 leading-relaxed font-normal">
            Behind every number is a real child holding their first notebook, a mother receiving warm rations, and a family that didn't have to sleep hungry.
          </p>
        </div>

        {/* Clean, Dignified Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.slice(0, 4).map((stat) => (
            <div
              key={stat.id}
              className="bg-[#382822]/80 border border-[#5C463D] p-6 rounded-2xl text-center flex flex-col justify-between shadow-xs transition-colors"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F4D6C6] tracking-tight tabular-nums mb-2">
                  <span>{stat.prefix}</span>
                  <span>{stat.value}</span>
                  <span className="text-[#C87552]">{stat.suffix}</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-[#FFF8F0] mb-1">
                  {stat.label}
                </h3>
              </div>
              {stat.description && (
                <p className="text-xs text-[#FFF8F0]/70 leading-relaxed mt-2 pt-2 border-t border-[#5C463D]/60">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-12 text-center text-xs text-[#F4D6C6]/80 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#78866B]" />
            <span>100% Transparency</span>
          </div>
          <span>•</span>
          <span>Managed directly by grassroots volunteers</span>
          <span>•</span>
          <span>All records open for inspection</span>
        </div>
      </div>
    </section>
  );
}
