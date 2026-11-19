'use client';

import React from 'react';
import Link from 'next/link';
import { Campaign } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Heart, ArrowRight } from 'lucide-react';

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
}

export default function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
  if (!campaigns || campaigns.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white" id="campaigns" aria-label="Active Welfare Appeals">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
              <span>Urgent Appeals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
              Direct Ways to Support Today
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Every rupee donated is directly mapped to a specific grassroots campaign with full accountability.
            </p>
          </div>

          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#183F91] hover:text-[#D52D2D] transition-colors whitespace-nowrap"
          >
            <span>View all campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((camp) => {
            const percentage = Math.min(100, Math.round((camp.raised_amount / camp.target_amount) * 100));

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                {/* Photo with natural 16:10 aspect ratio */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={camp.image_url || '/images/ngo/campaign-child-education.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={camp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#102C63]">
                    {camp.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-[#102C63] leading-snug line-clamp-2">
                      {camp.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {camp.short_desc}
                    </p>
                  </div>

                  {/* Clean Progress & Donate */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                        <span className="text-[#102C63]">₹{camp.raised_amount.toLocaleString('en-IN')}</span>
                        <span className="text-slate-400 font-normal">of ₹{camp.target_amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D52D2D] rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="mt-1 text-right text-[10px] text-slate-400">
                        {percentage}% funded
                      </div>
                    </div>

                    <Link
                      href={`/donate`}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#183F91] hover:bg-[#102C63] text-white text-xs font-semibold py-2.5 rounded-lg transition"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Donate to This Cause</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
