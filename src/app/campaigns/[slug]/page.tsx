import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCampaignBySlug, getCampaigns, getSettings } from '@/lib/data';
import PageHeader from '@/components/common/PageHeader';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Heart, TrendingUp, CheckCircle2, Landmark, Copy, ArrowRight, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CampaignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);
  if (!campaign) notFound();

  const otherCampaigns = getCampaigns({ onlyActive: true }).filter(c => c.id !== campaign.id).slice(0, 3);
  const settings = getSettings();
  const percentage = Math.min(100, Math.round((campaign.raised_amount / campaign.target_amount) * 100));

  return (
    <div>
      <PageHeader
        badge={`Welfare Initiative • ${campaign.category}`}
        title={campaign.title}
        subtitle={campaign.short_desc}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Campaigns', href: '/campaigns' },
          { label: campaign.title }
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Feature Image */}
              <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                <ImageWithFallback
                  src={campaign.image_url || '/images/ngo/campaign-child-education.jpg'}
                  fallbackSrc="/images/placeholder-general.svg"
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Campaign Story & Breakdown */}
              <div className="space-y-6 text-slate-700 leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#102C63]">
                  About This Welfare Campaign
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {campaign.full_desc || campaign.short_desc}
                </p>

                <div className="bg-[#F7F8FC] p-6 rounded-3xl border border-slate-100 space-y-4">
                  <h3 className="font-bold text-lg text-[#102C63]">
                    How Your Contribution is Utilized:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Direct ground procurement of supplies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>100% transparent beneficiary verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Zero middleman commission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Formal 80G tax receipt issued</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/donate?campaign=${campaign.id}`}
                    className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg transition"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Donate to This Campaign</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Fundraising Progress Card */}
              <div className="bg-[#F7F8FC] rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <span className="text-xs font-bold text-[#183F91] uppercase tracking-wider block">
                  Fundraising Status
                </span>

                <div>
                  <div className="text-3xl font-extrabold text-[#102C63]">
                    ₹{campaign.raised_amount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs text-slate-500">
                    raised of ₹{campaign.target_amount.toLocaleString('en-IN')} target
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#183F91] to-[#D52D2D] rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                  <span>{percentage}% Funded</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Active Goal
                  </span>
                </div>

                <Link
                  href={`/donate?campaign=${campaign.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3.5 rounded-xl text-sm font-bold shadow transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Campaign</span>
                </Link>
              </div>

              {/* Other Campaigns */}
              {otherCampaigns.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <h4 className="font-bold text-base text-[#102C63]">
                    Other Active Campaigns
                  </h4>
                  <div className="space-y-3">
                    {otherCampaigns.map((other) => (
                      <Link
                        key={other.id}
                        href={`/campaigns/${other.slug}`}
                        className="block p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 transition"
                      >
                        <span className="text-[11px] font-bold text-[#183F91] block uppercase">{other.category}</span>
                        <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{other.title}</h5>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          ₹{other.raised_amount.toLocaleString('en-IN')} Raised
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
