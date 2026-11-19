'use client';

import React from 'react';
import Link from 'next/link';
import { Campaign } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Heart, ArrowRight, Target, TrendingUp } from 'lucide-react';

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
}

export default function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
  if (!campaigns || campaigns.length === 0) return null;

  return (
    <section className="py-20 bg-white" id="campaigns">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-red-50 text-[#D52D2D] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Urgent Welfare Appeals
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
              Featured Welfare Campaigns
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Join hands with VN Vidhyapeeth to directly sponsor a child&apos;s schooling, provide daily groceries to a hungry family, or equip rural students with essential stationery kits.
            </p>
          </div>

          <div>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition group"
            >
              <span>View All Campaigns</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {campaigns.map((camp) => {
            const percentage = Math.min(100, Math.round((camp.raised_amount / camp.target_amount) * 100));

            return (
              <div
                key={camp.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={camp.image_url || '/images/ngo/campaign-child-education.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={camp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-[#102C63]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white">
                    {camp.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#102C63] group-hover:text-[#183F91] transition line-clamp-1">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {camp.short_desc}
                    </p>
                  </div>

                  {/* Fundraising Progress */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#102C63]">
                          ₹{camp.raised_amount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-400 font-medium">
                          Goal: ₹{camp.target_amount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#183F91] to-[#D52D2D] rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>{percentage}% Funded</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Active
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <Link
                      href={`/donate?campaign=${camp.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D52D2D] hover:bg-[#b82424] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Donate Now</span>
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
