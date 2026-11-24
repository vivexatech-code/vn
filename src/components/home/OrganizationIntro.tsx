'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, BookOpen, Utensils, Sparkles } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function OrganizationIntro() {
  const triggerDonation = (amount = 501) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-quick-donation', { detail: { amount } })
      );
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FFF8F0]" id="our-story" aria-label="Why Your Support Matters">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
            <span>Why your support matters</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight leading-snug">
            Behind Every Smile, There Is a Story
          </h2>

          <p className="mt-3 text-base text-[#78665E] leading-relaxed font-normal">
            Some children dream of going to school. Some families struggle to arrange two meals a day. Some people need basic medical care but cannot afford it.
          </p>
        </div>

        {/* 3 Story Cards with Meaningful Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Story Card 1: Education */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] flex flex-col justify-between group transition-colors duration-150 hover:border-[#C87552]/40">
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#F4D6C6]/20 overflow-hidden">
                <ImageWithFallback
                  src="/images/ngo/hero-children-study.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="Child studying with hope"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#49352D]/90 px-2.5 py-1 rounded-md text-[11px] font-medium text-white flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#F4D6C6]" />
                  <span>Education</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-[#49352D] leading-snug">
                  Every Child Deserves a Chance to Dream
                </h3>
                <p className="text-sm text-[#78665E] leading-relaxed font-normal">
                  Many children hold big dreams, but their parents cannot afford notebooks or school fees. A small kit of books and pens allows them to study with dignity.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-[#EFE4DC]">
                <button
                  type="button"
                  onClick={() => triggerDonation(251)}
                  className="text-xs sm:text-sm font-semibold text-[#C87552] hover:text-[#B56140] inline-flex items-center gap-1.5 transition-colors duration-150"
                >
                  <span>Help a child study (₹251)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Story Card 2: Food & Hunger Relief */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] flex flex-col justify-between group transition-colors duration-150 hover:border-[#C87552]/40">
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#F4D6C6]/20 overflow-hidden">
                <ImageWithFallback
                  src="/images/ngo/hero-food-relief.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="Food distribution for needy families"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#49352D]/90 px-2.5 py-1 rounded-md text-[11px] font-medium text-white flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#C87552]" />
                  <span>Food Relief</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-[#49352D] leading-snug">
                  A Meal Can Bring Hope to a Family
                </h3>
                <p className="text-sm text-[#78665E] leading-relaxed font-normal">
                  Daily-wage workers often skip meals so their young ones do not sleep on an empty stomach. Our ration kits provide nutritious food to families in need.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-[#EFE4DC]">
                <button
                  type="button"
                  onClick={() => triggerDonation(501)}
                  className="text-xs sm:text-sm font-semibold text-[#C87552] hover:text-[#B56140] inline-flex items-center gap-1.5 transition-colors duration-150"
                >
                  <span>Provide food for a family (₹501)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Story Card 3: Care & Dignity */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] flex flex-col justify-between group transition-colors duration-150 hover:border-[#C87552]/40">
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#F4D6C6]/20 overflow-hidden">
                <ImageWithFallback
                  src="/images/ngo/initiative-welfare.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="Helping families with essentials"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#49352D]/90 px-2.5 py-1 rounded-md text-[11px] font-medium text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#78866B]" />
                  <span>Family Care</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-[#49352D] leading-snug">
                  Nobody Should Lose Hope
                </h3>
                <p className="text-sm text-[#78665E] leading-relaxed font-normal">
                  Nobody should lose hope simply because they are poor. From warm blankets to medicine and clothing, we stand beside vulnerable families in difficult times.
                </p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-[#EFE4DC]">
                <button
                  type="button"
                  onClick={() => triggerDonation(1001)}
                  className="text-xs sm:text-sm font-semibold text-[#C87552] hover:text-[#B56140] inline-flex items-center gap-1.5 transition-colors duration-150"
                >
                  <span>Send essential care (₹1,001)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emotionally Grounded Callout Bar */}
        <div className="bg-[#49352D] text-[#FFF8F0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#382822]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF8F0]">
              Together, we can make someone&apos;s tomorrow better
            </h4>
            <p className="text-sm text-[#F4D6C6]/85 max-w-xl font-normal">
              Even a small contribution of ₹101 or ₹251 directly reaches a child or a family waiting for help.
            </p>
          </div>
          <button
            type="button"
            onClick={() => triggerDonation(501)}
            className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 whitespace-nowrap active:scale-[0.99]"
          >
            <Heart className="w-4 h-4" />
            <span>Donate what you can</span>
          </button>
        </div>
      </div>
    </section>
  );
}
