import React from 'react';
import Link from 'next/link';
import { FocusArea } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

interface FocusAreasProps {
  areas: FocusArea[];
}

export default function FocusAreas({ areas }: FocusAreasProps) {
  if (!areas || areas.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#F8F9FA]" id="initiatives" aria-label="Our Social Welfare Work">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Generous Whitespace */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
            <span>Our Work in Action</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
            How We Serve Our Communities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real change happens when compassion meets consistent action. We focus on five primary areas where support is needed most urgently.
          </p>
        </div>

        {/* Visually Rich Editorial Grid (3 top, 2 bottom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => {
            const isWide = index >= 3;
            return (
              <div
                key={area.id || index}
                className={`bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow flex flex-col ${
                  isWide ? 'lg:col-span-1.5' : ''
                }`}
              >
                {/* Authentic Activity Photograph - Preserving Natural Aspect Ratio */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={area.image_url || '/images/ngo/initiative-education.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={area.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#102C63] shadow-xs">
                    {area.category}
                  </div>
                </div>

                {/* Short, Meaningful Narrative */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#102C63] leading-snug">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                      {area.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={area.link_url || `/initiatives#${area.id}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#183F91] hover:text-[#D52D2D] transition-colors"
                    >
                      <span>Explore this work</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
