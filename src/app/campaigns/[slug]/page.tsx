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

      <section className="py-16 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Feature Image */}
              <div className="relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-lg border border-[#EFE4DC]">
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
              <div className="space-y-6 text-[#49352D] leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#49352D]">
                  About This Welfare Campaign
                </h2>

                <p className="text-base sm:text-lg text-[#78665E] leading-relaxed font-normal">
                  {campaign.full_desc || campaign.short_desc}
                </p>

                <div className="bg-white p-6 rounded-3xl border border-[#EFE4DC] shadow-xs space-y-4">
                  <h3 className="font-bold text-lg text-[#49352D]">
                    How Your Contribution is Utilized:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#78866B] flex-shrink-0" />
                      <span>Direct ground procurement of supplies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#78866B] flex-shrink-0" />
                      <span>100% transparent beneficiary verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#78866B] flex-shrink-0" />
                      <span>Zero middleman commission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#78866B] flex-shrink-0" />
                      <span>Formal 80G tax receipt issued</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/donate?campaign=${campaign.id}`}
                    className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-8 py-4 rounded-2xl text-base font-bold shadow-md transition"
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
              <div className="bg-white rounded-3xl p-6 border border-[#EFE4DC] shadow-xs space-y-5">
                <span className="text-xs font-bold text-[#C87552] uppercase tracking-wider block">
                  Fundraising Status
                </span>

                <div>
                  <div className="text-3xl font-extrabold text-[#49352D]">
                    ₹{campaign.raised_amount.toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs text-[#78665E]">
                    raised of ₹{campaign.target_amount.toLocaleString('en-IN')} target
                  </span>
                </div>

                <div className="w-full h-3 bg-[#FFF8F0] rounded-full overflow-hidden border border-[#EFE4DC]">
                  <div
                    className="h-full bg-[#C87552] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs font-semibold text-[#78665E]">
                  <span>{percentage}% Funded</span>
                  <span className="text-[#78866B] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Active Goal
                  </span>
                </div>

                <Link
                  href={`/donate?campaign=${campaign.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to This Campaign</span>
                </Link>
              </div>

              {/* Other Campaigns */}
              {otherCampaigns.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-[#EFE4DC] shadow-xs space-y-4">
                  <h4 className="font-bold text-base text-[#49352D]">
                    Other Active Campaigns
                  </h4>
                  <div className="space-y-3">
                    {otherCampaigns.map((other) => (
                      <Link
                        key={other.id}
                        href={`/campaigns/${other.slug}`}
                        className="block p-3 rounded-2xl hover:bg-[#FFF8F0] border border-[#EFE4DC] transition"
                      >
                        <span className="text-[11px] font-bold text-[#C87552] block uppercase">{other.category}</span>
                        <h5 className="text-xs font-bold text-[#49352D] line-clamp-1">{other.title}</h5>
                        <span className="text-[11px] text-[#78665E] mt-1 block">
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
