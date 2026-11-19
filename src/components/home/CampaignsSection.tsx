import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Campaign } from '@/lib/data';
import { Heart, ArrowRight, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CampaignsSectionProps {
  campaigns: Campaign[];
}

export default function CampaignsSection({ campaigns }: CampaignsSectionProps) {
  if (!campaigns || campaigns.length === 0) return null;

  return (
    <section className="py-20 bg-[#F5F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-red-100/70 text-[#D52D2D] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#D52D2D]" />
              Support Education & Healthcare
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
              Active Sponsorship Campaigns
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Help us educate deserving students from rural and economically weaker sections with full scholarship grants and laboratory toolkits.
            </p>
          </div>

          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition group self-start md:self-auto"
          >
            <span>All Campaigns</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp) => {
            const percentage = Math.min(100, Math.round((camp.raised_amount / camp.target_amount) * 100));

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card shadow-card-hover border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={camp.image_url || '/images/newslider4.jpg'}
                      alt={camp.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#102C63]">
                      {camp.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-[#102C63] hover:text-[#183F91] transition leading-snug line-clamp-2">
                      <Link href={`/campaigns/${camp.slug}`}>{camp.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {camp.short_desc}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Raised: <strong className="text-[#102C63]">{formatCurrency(camp.raised_amount)}</strong></span>
                        <span className="text-slate-500">Goal: <strong className="text-slate-700">{formatCurrency(camp.target_amount)}</strong></span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#183F91] to-[#D52D2D] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 text-[#183F91] font-semibold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {percentage}% Funded
                        </span>
                        <span>Tax exemption compliant</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <Link
                    href={`/donate?campaign=${camp.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Support This Cause</span>
                  </Link>

                  <Link
                    href={`/campaigns/${camp.slug}`}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                    title="Learn More"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
