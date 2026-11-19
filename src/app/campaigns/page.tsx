import React from 'react';
import Link from 'next/link';
import { getCampaigns } from '@/lib/data';
import PageHeader from '@/components/common/PageHeader';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Heart, Target, TrendingUp, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Welfare Campaigns | VN Vidhyapeeth Social Welfare Trust',
  description: 'Explore our active fundraising campaigns: Support a child education, feed a hungry family, free school stationery distribution, and child welfare.'
};

export default function CampaignsPage() {
  const campaigns = getCampaigns({ onlyActive: true });

  return (
    <div>
      <PageHeader
        badge="Welfare Fundraisers"
        title="Our Active Welfare Campaigns"
        subtitle="Every contribution directly empowers underprivileged children and vulnerable families through verified programs."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Campaigns' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((camp) => {
              const percentage = Math.min(100, Math.round((camp.raised_amount / camp.target_amount) * 100));

              return (
                <div
                  key={camp.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <ImageWithFallback
                        src={camp.image_url || '/images/ngo/campaign-child-education.jpg'}
                        fallbackSrc="/images/placeholder-general.svg"
                        alt={camp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-4 left-4 bg-[#102C63]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                        {camp.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#102C63] group-hover:text-[#183F91] transition">
                        <Link href={`/campaigns/${camp.slug}`}>{camp.title}</Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                        {camp.short_desc}
                      </p>

                      {/* Financial Bar */}
                      <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#102C63]">
                            ₹{camp.raised_amount.toLocaleString('en-IN')} Raised
                          </span>
                          <span className="text-slate-400">
                            Goal: ₹{camp.target_amount.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#183F91] to-[#D52D2D] rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <div className="flex justify-between items-center text-[11px] text-slate-400">
                          <span>{percentage}% Funded</span>
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Active Campaign
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <Link
                      href={`/donate?campaign=${camp.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3 rounded-xl text-xs font-bold transition shadow"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Donate Now</span>
                    </Link>
                    <Link
                      href={`/campaigns/${camp.slug}`}
                      className="px-4 py-3 rounded-xl text-xs font-bold text-[#183F91] bg-blue-50 hover:bg-blue-100 transition"
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
    </div>
  );
}
