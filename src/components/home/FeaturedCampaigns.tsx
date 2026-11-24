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
    <section className="py-20 sm:py-26 bg-[#FFF8F0] border-t border-[#EFE4DC]" id="campaigns" aria-label="Active Welfare Appeals">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
              <span>Urgent appeals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight leading-snug">
              Direct Ways to Support Today
            </h2>
            <p className="mt-2.5 text-base text-[#78665E] leading-relaxed">
              Every rupee donated is directly mapped to a specific grassroots initiative with full transparency.
            </p>
          </div>

          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#C87552] hover:text-[#B56140] transition-colors whitespace-nowrap"
          >
            <span>View all appeals</span>
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
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] shadow-xs flex flex-col justify-between"
              >
                {/* Photo with natural 16:10 aspect ratio */}
                <div className="relative aspect-[16/10] w-full bg-[#F4D6C6]/30 overflow-hidden">
                  <ImageWithFallback
                    src={camp.image_url || '/images/ngo/campaign-child-education.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={camp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#49352D]/90 text-white px-2 py-0.5 rounded-md text-[11px] font-medium">
                    {camp.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-semibold text-base text-[#49352D] leading-snug line-clamp-2">
                      {camp.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#78665E] leading-relaxed line-clamp-2">
                      {camp.short_desc}
                    </p>
                  </div>

                  {/* Clean Progress & Donate */}
                  <div className="pt-3 border-t border-[#EFE4DC] space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-xs text-[#49352D] mb-1.5">
                        <span className="text-[#C87552] font-semibold font-serif tabular-nums">₹{camp.raised_amount.toLocaleString('en-IN')}</span>
                        <span className="text-[#78665E] text-[11px] font-normal tabular-nums">of ₹{camp.target_amount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F4D6C6]/40 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C87552] rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="mt-1 text-right text-[10px] text-[#78665E] tabular-nums">
                        {percentage}% funded
                      </div>
                    </div>

                    <Link
                      href="/donate"
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#C87552] hover:bg-[#B56140] text-white text-xs font-medium py-2.5 rounded-xl shadow-xs transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Donate to this cause</span>
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
