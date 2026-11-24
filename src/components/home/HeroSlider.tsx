'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { HeroSlide } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center bg-[#49352D] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Section - VN Vidhyapeeth"
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Real-Life Emotional Photography - High Visibility */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={slide.image_url}
                fallbackSrc="/images/ngo/hero-children-study.jpg"
                alt={slide.title || 'VN Vidhyapeeth Helping Children and Families'}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
              {/* Soft, warm gradient overlay - keeps photo vibrant while ensuring text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#49352D]/90 via-[#49352D]/70 to-[#49352D]/25" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#49352D]/80 via-transparent to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col justify-center">
              <div className="max-w-2xl text-[#FFF8F0] space-y-6">
                {/* Gentle Mission Eyebrow */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-normal text-[#F4D6C6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
                    <span>{slide.badge}</span>
                  </div>
                )}

                {/* Simple Emotional Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FFF8F0] leading-[1.12]">
                  {slide.title.replace(/\.$/, '')}{' '}
                  {slide.highlight_text && (
                    <span className="text-[#F4D6C6]">{slide.highlight_text.replace(/\.$/, '')}</span>
                  )}
                </h1>

                {/* Easy-to-understand Description */}
                <p className="text-base sm:text-lg text-[#FFF8F0]/85 leading-relaxed max-w-xl font-normal">
                  {slide.subtitle}
                </p>

                {/* Two Clear Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* 1. Donate Now - Primary Action */}
                  <Link
                    href={slide.cta_primary_link || '#donate'}
                    className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-xs transition-colors duration-150 active:scale-[0.99]"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{slide.cta_primary_text || 'Donate now'}</span>
                  </Link>

                  {/* 2. See Our Work - Secondary Action */}
                  <Link
                    href={slide.cta_secondary_link || '#our-work'}
                    className="inline-flex items-center gap-2 bg-[#FFF8F0] hover:bg-white text-[#49352D] hover:text-[#C87552] font-medium text-sm px-6 py-3 rounded-xl transition-colors duration-150 border border-[#EFE4DC] active:scale-[0.99]"
                  >
                    <span>{slide.cta_secondary_text || 'See our work'}</span>
                    <ArrowRight className="w-4 h-4 text-[#78665E]" />
                  </Link>
                </div>

                {/* Quick Trust Reassurance */}
                <div className="pt-2 flex items-center gap-3 text-xs text-[#F4D6C6]/80 font-normal">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#78866B]" />
                    <span>Registered Social Welfare Trust</span>
                  </div>
                  <span>•</span>
                  <span>Section 80G Tax Exemption</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slider Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#49352D]/60 hover:bg-[#C87552] text-white items-center justify-center backdrop-blur-sm transition-all border border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#49352D]/60 hover:bg-[#C87552] text-white items-center justify-center backdrop-blur-sm transition-all border border-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? 'w-8 bg-[#C87552]' : 'w-2.5 bg-[#FFF8F0]/40 hover:bg-[#FFF8F0]/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
