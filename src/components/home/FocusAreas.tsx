'use client';

import React from 'react';
import Link from 'next/link';
import { FocusArea } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { ArrowRight, BookOpen, Utensils, HeartHandshake, Sparkles, Users, ShieldCheck, Heart } from 'lucide-react';

interface FocusAreasProps {
  areas: FocusArea[];
}

export default function FocusAreas({ areas }: FocusAreasProps) {
  if (!areas || areas.length === 0) return null;

  // Map icon names to clean Lucide icons
  const getIcon = (name?: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-[#C87552]" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-[#C87552]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-[#78866B]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#78866B]" />;
      case 'Users':
        return <Users className="w-4 h-4 text-[#C87552]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-[#78866B]" />;
      default:
        return <Heart className="w-4 h-4 text-[#C87552]" />;
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FFF8F0]" id="our-work" aria-label="Our NGO Work & Activities">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
            <span>How we help</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight leading-snug">
            Simple Acts of Care That Touch Lives
          </h2>
          <p className="mt-3 text-base text-[#78665E] leading-relaxed font-normal">
            We work directly on the ground in villages, slums, and low-income settlements where help is needed most urgently.
          </p>
        </div>

        {/* 6 Visual Activity Cards in a 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {areas.map((area, index) => (
            <div
              key={area.id || index}
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] flex flex-col justify-between group transition-colors duration-150 hover:border-[#C87552]/40"
            >
              <div>
                {/* Meaningful Image with Natural Aspect Ratio */}
                <div className="relative aspect-[16/10] w-full bg-[#F4D6C6]/20 overflow-hidden">
                  <ImageWithFallback
                    src={area.image_url || '/images/ngo/initiative-education.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={area.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#49352D]/90 px-2.5 py-1 rounded-md text-[11px] font-medium text-white flex items-center gap-1.5">
                    {getIcon(area.icon_name)}
                    <span>{area.category}</span>
                  </div>
                </div>

                {/* Short Heading & 1-2 Line Description */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-semibold text-[#49352D] leading-snug group-hover:text-[#C87552] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-[#78665E] leading-relaxed font-normal">
                    {area.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#EFE4DC]">
                  <Link
                    href={area.link_url || `/initiatives#${area.id}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C87552] hover:text-[#B56140] transition-colors duration-150 group/btn"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
