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
          className="group flex items-center gap-2.5 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3.5 px-4 rounded-l-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-x-1 border-l-2 border-y-2 border-white/20"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-xs font-extrabold uppercase tracking-wider leading-none">
              Donate Now
            </span>
            <span className="text-[10px] text-white/80 font-medium block mt-0.5">
              Support a Child
            </span>
          </div>
        </button>
      </aside>

      {/* 2. Mobile: Persistent Bottom Action Bar (Non-overlapping with WhatsApp) */}
      <aside className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2.5 px-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-[#D52D2D] fill-[#D52D2D]" />
            </div>
            <div className="leading-tight">
              <span className="text-xs font-bold text-[#102C63] block">
                Make a Difference
              </span>
              <span className="text-[10px] text-slate-500 block">
                Food • Education • Kits
              </span>
            </div>
          </div>

          <button
            onClick={() => triggerQuickDonation(251)}
            aria-label="Donate Now"
            className="inline-flex items-center gap-1.5 bg-[#D52D2D] hover:bg-[#b82424] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md transition"
          >
            <span>Donate Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
