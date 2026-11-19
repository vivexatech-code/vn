'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  if (!slides || slides.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center bg-[#102C63] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Section"
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
            {/* Authentic Photography Background */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={slide.image_url}
                fallbackSrc="/images/ngo/hero-children-study.jpg"
                alt={slide.title || 'VN Vidhyapeeth Social Welfare Activities'}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
              {/* Natural, warm gradient overlay - respectful to photograph */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#102C63]/90 via-[#102C63]/75 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102C63]/80 via-transparent to-black/20" />
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col justify-center">
              <div className="max-w-2xl text-white space-y-6">
                {/* Quiet, Dignified Mission Badge */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide text-white border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D52D2D]" />
                    <span>{slide.badge}</span>
                  </div>
                )}

                {/* Primary Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                  {slide.title}{' '}
                  {slide.highlight_text && (
                    <span className="text-[#FFD278]">{slide.highlight_text}</span>
                  )}
                </h1>

                {/* Emotional, Human Subtitle */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-100/90 leading-relaxed max-w-xl font-normal">
                  {slide.subtitle}
                </p>

                {/* Focused Action CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.cta_primary_link || '#donate'}
                    className="inline-flex items-center gap-2.5 bg-[#D52D2D] hover:bg-[#B52222] text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{slide.cta_primary_text || 'Support Our Mission'}</span>
                  </Link>

                  <Link
                    href={slide.cta_secondary_link || '#initiatives'}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-base px-6 py-3.5 rounded-full backdrop-blur-sm border border-white/30 transition-colors"
                  >
                    <span>{slide.cta_secondary_text || 'Explore Our Work'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Quiet Trust Declaration */}
                <div className="pt-4 flex items-center gap-6 text-xs sm:text-sm text-slate-200/80">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Registered Social Welfare Trust
                  </span>
                  <span>•</span>
                  <span>Section 80G Tax Exemption</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">100% Verified Work</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Controls (Only if > 1 slide) */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-6 bg-[#FFD278]' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
}
