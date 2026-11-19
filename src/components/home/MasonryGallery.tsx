'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryItem } from '@/lib/data';
import { Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" />
              Moments of Hope & Impact
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
              Field Welfare & Activity Gallery
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Visual glimpses into grassroots educational sessions, food distribution drives, free stationery handovers, and community outreach programs nationwide.
            </p>
          </div>

          {showViewAll && (
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition group self-start md:self-auto"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 capitalize flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#183F91] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Moments' : cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <ImageWithFallback
                src={item.url}
                fallbackSrc="/images/placeholder-general.svg"
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-300">
                  {item.category}
                </span>
                <h4 className="font-serif font-bold text-sm leading-snug">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1 text-[11px] text-blue-200">
                  <Eye className="w-3 h-3" />
                  <span>Click to expand</span>
                </div>
              </div>

              {item.media_type === 'video' && (
                <div className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full shadow">
                  <Video className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeMedia && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev / Next buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                  aria-label="Previous Media"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50 hidden sm:flex"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                  aria-label="Next Media"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition z-50 hidden sm:flex"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Media Display */}
            <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
              <div className="relative w-full h-[60vh] max-h-[600px] rounded-xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={activeMedia.url}
                  fallbackSrc="/images/placeholder-general.svg"
                  alt={activeMedia.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Caption Bar */}
              <div className="w-full mt-4 text-center text-white space-y-1 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                  {activeMedia.category}
                </span>
                <h3 className="font-serif font-bold text-lg">{activeMedia.title}</h3>
                {activeMedia.caption && (
                  <p className="text-xs text-slate-300 max-w-2xl mx-auto">{activeMedia.caption}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
