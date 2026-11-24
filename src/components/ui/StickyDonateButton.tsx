'use client';

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function StickyDonateButton() {
  const triggerQuickDonation = (amount = 501) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-quick-donation', {
          detail: { amount }
        })
      );
    }
  };

  return (
    <>
      {/* 1. Desktop: Persistent Floating Button on Right Edge */}
      <aside className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => triggerQuickDonation(501)}
          aria-label="Quick Donate to VN Vidhyapeeth"
          className="group flex items-center gap-2.5 bg-[#C87552] hover:bg-[#B56140] text-white py-3 px-3.5 rounded-l-xl shadow-md transition-colors border-l border-y border-white/20 active:scale-[0.99]"
        >
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <div className="text-left pr-0.5">
            <span className="block text-xs font-semibold leading-none">
              Donate Now
            </span>
            <span className="text-[10px] text-white/90 font-normal block mt-1">
              Support a child
            </span>
          </div>
        </button>
      </aside>

      {/* 2. Mobile: Persistent Bottom Action Bar (Non-overlapping with WhatsApp) */}
      <aside className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFF8F0]/95 backdrop-blur-md border-t border-[#EFE4DC] py-2.5 px-4 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F4D6C6] flex items-center justify-center flex-shrink-0">
              <Heart className="w-3.5 h-3.5 text-[#C87552] fill-[#C87552]" />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-medium text-[#49352D] block">
                Make a difference
              </span>
              <span className="text-[10px] text-[#78665E] block">
                Food • Education • Kits
              </span>
            </div>
          </div>

          <button
            onClick={() => triggerQuickDonation(251)}
            aria-label="Donate Now"
            className="inline-flex items-center gap-1.5 bg-[#C87552] hover:bg-[#B56140] text-white px-4 py-2 rounded-xl text-xs font-medium shadow-xs transition-colors active:scale-[0.99]"
          >
            <span>Donate now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
