import React from 'react';
import Link from 'next/link';
import { FocusArea } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  BookOpen, Utensils, Sparkles, HeartHandshake,
  ShieldCheck, ArrowRight, Heart
} from 'lucide-react';

interface FocusAreasProps {
  areas: FocusArea[];
}

function renderFocusIcon(name?: string) {
  switch (name) {
    case 'BookOpen':
      return <BookOpen className="w-5 h-5 text-[#183F91] group-hover:text-white transition-colors" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 text-[#D52D2D] group-hover:text-white transition-colors" />;
    case 'FileSpreadsheet':
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-amber-500 group-hover:text-white transition-colors" />;
    case 'HeartHandshake':
      return <HeartHandshake className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" />;
    default:
      return <Heart className="w-5 h-5 text-[#D52D2D] group-hover:text-white transition-colors" />;
  }
}

export default function FocusAreas({ areas }: FocusAreasProps) {
  if (!areas || areas.length === 0) return null;

  return (
    <section className="py-20 bg-[#F7F8FC]" id="initiatives">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Our Main Areas of Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
            Our Core Social Welfare Initiatives
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Dedicated to breaking cycles of poverty through education for every child, daily food assistance, free stationery kits, and community development.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <div
              key={area.id}
              className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col ${
                index === 3 || index === 4 ? 'lg:col-span-1 md:col-span-1' : ''
              }`}
            >
              {/* Image with Category Badge */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={area.image_url || '/images/ngo/initiative-education.jpg'}
                  fallbackSrc="/images/placeholder-general.svg"
                  alt={area.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#102C63] shadow-sm">
                  {area.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-[#183F91] group-hover:text-white transition-colors duration-200">
                    {renderFocusIcon(area.icon_name)}
                  </div>

                  <h3 className="text-xl font-bold text-[#102C63] group-hover:text-[#183F91] transition">
                    {area.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/initiatives`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/donate`}
                    className="text-xs font-semibold text-[#D52D2D] hover:underline"
                  >
                    Support This Cause
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
