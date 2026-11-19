'use client';

import React from 'react';
import { ImpactStat } from '@/lib/data';

interface ImpactCountersProps {
  stats: ImpactStat[];
}

export default function ImpactCounters({ stats }: ImpactCountersProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-[#102C63] text-white" id="impact" aria-label="Our Real-World Impact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#FFD278] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Grassroots Reach</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Our Journey on the Ground
          </h2>
          <p className="mt-2 text-sm text-slate-200/80 leading-relaxed font-normal">
            Behind every number is a child who attended school, a family provided food, and a community supported.
          </p>
        </div>

        {/* Clean, Non-Glitzy Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="p-4 rounded-xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                <span>{stat.prefix}</span>
                <span>{stat.value}</span>
                <span className="text-[#FFD278]">{stat.suffix}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1">
                {stat.label}
              </h3>
              {stat.description && (
                <p className="text-xs text-slate-300/80 leading-snug">
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
