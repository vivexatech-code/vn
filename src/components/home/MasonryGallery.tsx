'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GalleryItem } from '@/lib/data';
import { X, ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface MasonryGalleryProps {
  items: GalleryItem[];
  showViewAll?: boolean;
}

export default function MasonryGallery({ items, showViewAll = true }: MasonryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevMedia = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextMedia = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const activeMedia = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section className="py-20 sm:py-28 bg-[#FFF8F0]" id="gallery" aria-label="Field Activity Gallery">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
              <span>Field activity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight">
              Moments from the Ground
            </h2>
            <p className="mt-2.5 text-base text-[#78665E] leading-relaxed">
              Authentic photographs from our community learning sessions, hunger relief drives, and stationery distribution events.
            </p>
          </div>

          {showViewAll && (
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#C87552] hover:text-[#B56140] transition-colors whitespace-nowrap"
            >
              <span>View full gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Clean Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#C87552] text-white shadow-xs'
                  : 'bg-white text-[#49352D] border border-[#EFE4DC] hover:bg-[#F4D6C6]/30'
              }`}
            >
              {cat === 'all' ? 'All Activities' : cat}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid - Natural 4:3 Aspect Ratio */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white cursor-pointer border border-[#EFE4DC] shadow-xs"
            >
              <ImageWithFallback
                src={item.url}
                fallbackSrc="/images/placeholder-general.svg"
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] font-medium text-[#F4D6C6]">
                  {item.category}
                </span>
                <h4 className="font-medium text-xs leading-snug line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeMedia && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 transition z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition z-50 hidden sm:flex"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition z-50 hidden sm:flex"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] max-h-[580px] rounded-lg overflow-hidden bg-black">
                <ImageWithFallback
                  src={activeMedia.url}
                  fallbackSrc="/images/placeholder-general.svg"
                  alt={activeMedia.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="w-full mt-3 text-center text-white space-y-1">
                <span className="text-[11px] uppercase font-semibold text-amber-300 tracking-wider">
                  {activeMedia.category}
                </span>
                <h3 className="font-bold text-sm sm:text-base">{activeMedia.title}</h3>
                {activeMedia.caption && (
                  <p className="text-xs text-slate-300 max-w-xl mx-auto">{activeMedia.caption}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
