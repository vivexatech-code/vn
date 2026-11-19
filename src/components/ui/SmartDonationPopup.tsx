'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface SmartDonationPopupProps {
  initialSettings?: {
    is_enabled?: number;
    heading?: string;
    description?: string;
    delay_seconds?: number;
    repeat_interval_seconds?: number;
    image_url?: string;
    button_text?: string;
    quick_amounts?: string;
  };
}

export default function SmartDonationPopup({ initialSettings }: SmartDonationPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(251);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [settings, setSettings] = useState(initialSettings || {});
  const dismissedRef = useRef(false);

  useEffect(() => {
    // If not provided in props, fetch settings from API
    if (!initialSettings) {
      fetch('/api/popup-settings')
        .then((res) => res.json())
        .then((data) => {
          const s = data.settings || data;
          if (s && typeof s === 'object') setSettings(s);
        })
        .catch(() => {});
    }
  }, [initialSettings]);

  const isEnabled = settings.is_enabled ?? 1;
  const delaySec = settings.delay_seconds ?? 15;
  const repeatIntervalSec = settings.repeat_interval_seconds ?? 150; // 2.5 minutes
  const heading = settings.heading || 'Your Small Help Can Make a Big Difference.';
  const description =
    settings.description ||
    'Help us provide education, food and essential support to children and families in need.';
  const bannerImage = settings.image_url || '/images/ngo/hero-children-study.jpg';
  const buttonText = settings.button_text || 'Donate Now';

  const amounts = (settings.quick_amounts || '101,251,501,1001')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n) && n > 0);

  useEffect(() => {
    if (isEnabled === 0) return;

    const checkAndShowPopup = () => {
      // Do not interrupt active form typing
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      // Check if user has already completed a donation in this session
      if (sessionStorage.getItem('vnv_donation_completed')) {
        return;
      }

      const lastDismissedStr = sessionStorage.getItem('vnv_popup_last_dismissed');
      if (lastDismissedStr) {
        const elapsed = (Date.now() - parseInt(lastDismissedStr, 10)) / 1000;
        if (elapsed < repeatIntervalSec) {
          return;
        }
      }

      setIsOpen(true);
    };

    // First appearance after delay_seconds
    const initialTimer = setTimeout(() => {
      checkAndShowPopup();
    }, delaySec * 1000);

    // Periodic reminder check every 20 seconds
    const intervalChecker = setInterval(() => {
      if (!dismissedRef.current) {
        checkAndShowPopup();
      }
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalChecker);
    };
  }, [isEnabled, delaySec, repeatIntervalSec]);

  const handleClose = () => {
    setIsOpen(false);
    dismissedRef.current = true;
    sessionStorage.setItem('vnv_popup_last_dismissed', Date.now().toString());

    // Reset dismissedRef after repeatIntervalSec so periodic check can trigger again
    setTimeout(() => {
      dismissedRef.current = false;
    }, repeatIntervalSec * 1000);
  };

  const handleTriggerDonate = () => {
    const amountToPass = customAmount ? Number(customAmount) : selectedAmount;
    setIsOpen(false);
    sessionStorage.setItem('vnv_popup_last_dismissed', Date.now().toString());

    // Trigger the central Quick Donation Modal
    window.dispatchEvent(
      new CustomEvent('open-quick-donation', {
        detail: { amount: amountToPass || 251 }
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close Donation Popup"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Emotional Photograph */}
        <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
          <ImageWithFallback
            src={bannerImage}
            fallbackSrc="/images/placeholder-general.svg"
            alt="Children smiling at VN Vidhyapeeth"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
            <span className="text-white text-xs font-semibold bg-[#D52D2D] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
              <Heart className="w-3 h-3 fill-white" />
              <span>VN Vidhyapeeth Welfare Appeal</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#102C63] leading-snug">
              {heading}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {description}
            </p>
          </div>

          {/* Quick Amounts */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Choose Quick Amount:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {amounts.map((amt) => {
                const isSelected = selectedAmount === amt && !customAmount;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition ${
                      isSelected
                        ? 'bg-[#183F91] text-white shadow-xs ring-2 ring-[#183F91]/20'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="relative">
            <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
            <input
              type="number"
              min="10"
              placeholder="Or enter custom amount..."
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                if (e.target.value) setSelectedAmount(0);
              }}
              className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-1 focus:ring-[#183F91] focus:outline-none"
            />
          </div>

          {/* Donate CTA */}
          <button
            type="button"
            onClick={handleTriggerDonate}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3 rounded-xl font-bold text-sm shadow-md transition"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{buttonText} • ₹{(customAmount ? Number(customAmount) : selectedAmount).toLocaleString('en-IN')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-slate-400 hover:text-slate-600 transition"
            >
              Maybe later, thank you
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
