'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Heart, ArrowRight, ShieldCheck, Users } from 'lucide-react';
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
      className="relative w-full h-[560px] sm:h-[620px] lg:h-[680px] overflow-hidden bg-[#102C63]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Slideshow"
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
            {/* Background Image with Fallback */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={slide.image_url}
                fallbackSrc="/images/ngo/hero-children-study.jpg"
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center transform scale-105 transition-transform duration-10000 ease-linear"
              />
              {/* Deep Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#102C63]/95 via-[#102C63]/85 to-transparent sm:to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102C63] via-transparent to-transparent opacity-80" />
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
              <div className="max-w-2xl text-white space-y-6">
                {/* Badge */}
                {slide.badge && (
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-medium text-blue-200">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    <span>{slide.badge}</span>
                  </div>
                )}

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white">
                  {slide.title}{' '}
                  {slide.highlight_text && (
                    <span className="text-amber-300 font-extrabold">{slide.highlight_text}</span>
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  {slide.cta_primary_link && (
                    <Link
                      href={slide.cta_primary_link}
                      className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <span>{slide.cta_primary_text || 'Explore Our Initiatives'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}

                  {slide.cta_secondary_link && (
                    <Link
                      href={slide.cta_secondary_link}
                      className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full backdrop-blur-sm border border-white/30 transition-all duration-200"
                    >
                      <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                      <span>{slide.cta_secondary_text || 'Donate Now'}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all hidden sm:flex items-center justify-center border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all hidden sm:flex items-center justify-center border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === current
                    ? 'w-8 h-2.5 bg-[#D52D2D]'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
