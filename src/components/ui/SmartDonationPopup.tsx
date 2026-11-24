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
  const heading = (settings.heading || 'Your Small Help Can Make a Big Difference').replace(/\.$/, '');
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

    const initialTimer = setTimeout(() => {
      checkAndShowPopup();
    }, delaySec * 1000);

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

    setTimeout(() => {
      dismissedRef.current = false;
    }, repeatIntervalSec * 1000);
  };

  const handleTriggerDonate = () => {
    const amountToPass = customAmount ? Number(customAmount) : selectedAmount;
    setIsOpen(false);
    sessionStorage.setItem('vnv_popup_last_dismissed', Date.now().toString());

    window.dispatchEvent(
      new CustomEvent('open-quick-donation', {
        detail: { amount: amountToPass || 251 }
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#49352D]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[#FFF8F0] rounded-2xl max-w-md w-full overflow-hidden shadow-xl border border-[#EFE4DC] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close Donation Popup"
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-lg bg-[#49352D]/70 hover:bg-[#C87552] text-white flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Real Emotional Photograph */}
        <div className="relative aspect-[16/10] w-full bg-[#49352D] overflow-hidden">
          <ImageWithFallback
            src={bannerImage}
            fallbackSrc="/images/placeholder-general.svg"
            alt="Children smiling at VN Vidhyapeeth"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#49352D]/85 via-[#49352D]/30 to-transparent flex items-end p-4">
            <span className="text-white text-[11px] font-medium bg-[#49352D]/90 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
              <span>VN Vidhyapeeth Welfare Appeal</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#49352D] leading-snug">
              {heading}
            </h3>
            <p className="mt-1 text-xs text-[#78665E] leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quick Amounts */}
          <div>
            <label className="block text-xs font-medium text-[#78665E] mb-1.5">
              Choose quick amount:
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
                    className={`py-2 px-1 rounded-xl text-center text-xs font-semibold tabular-nums transition-colors ${
                      isSelected
                        ? 'bg-[#C87552] text-white shadow-xs'
                        : 'bg-white text-[#49352D] hover:bg-[#F4D6C6]/30 border border-[#EFE4DC]'
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
            <span className="absolute left-3 top-2 text-xs font-semibold text-[#78665E]">₹</span>
            <input
              type="number"
              min="10"
              placeholder="Or enter custom amount..."
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                if (e.target.value) setSelectedAmount(0);
              }}
              className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-[#EFE4DC] bg-white text-xs font-medium text-[#49352D] focus:border-[#C87552] focus:outline-hidden"
            />
          </div>

          {/* Donate CTA */}
          <button
            type="button"
            onClick={handleTriggerDonate}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors active:scale-[0.99]"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>{buttonText} • ₹{(customAmount ? Number(customAmount) : selectedAmount).toLocaleString('en-IN')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleClose}
              className="text-xs text-[#78665E] hover:text-[#49352D] transition-colors"
            >
              Maybe later, thank you
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
