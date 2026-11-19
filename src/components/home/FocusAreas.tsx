import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FocusArea } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  Stethoscope, Laptop, Wrench, Users, HeartPulse,
  Sparkles, ArrowRight
} from 'lucide-react';

interface FocusAreasProps {
  areas: FocusArea[];
}

function renderFocusIcon(name?: string) {
  switch (name) {
    case 'Stethoscope':
      return <Stethoscope className="w-6 h-6 text-[#183F91] group-hover:text-white transition-colors" />;
    case 'Laptop':
      return <Laptop className="w-6 h-6 text-[#183F91] group-hover:text-white transition-colors" />;
    case 'Wrench':
      return <Wrench className="w-6 h-6 text-[#183F91] group-hover:text-white transition-colors" />;
    case 'Users':
      return <Users className="w-6 h-6 text-[#183F91] group-hover:text-white transition-colors" />;
    case 'HeartPulse':
      return <HeartPulse className="w-6 h-6 text-[#183F91] group-hover:text-white transition-colors" />;
    default:
      return <Sparkles className="w-6 h-6 text-[#183F91] group-hover:text-white transition-colors" />;
  }
}

export default function FocusAreas({ areas }: FocusAreasProps) {
  if (!areas || areas.length === 0) return null;

  return (
    <section className="py-20 bg-[#F5F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            Our Core Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
            Key Educational & Skill Development Focus Areas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Empowering students with industry-relevant competencies designed for immediate career opportunities and community upliftment.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div
              key={area.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-card shadow-card-hover border border-slate-100 flex flex-col"
            >
              {/* Image with Category Badge */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={area.image_url || '/images/dmlt.jpg'}
                  fallbackSrc="/images/placeholder-course.svg"
                  alt={area.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#102C63] shadow-sm">
                  {area.category.toUpperCase()}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-[#183F91] group-hover:text-white transition-colors duration-200">
                    {renderFocusIcon(area.icon_name)}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#102C63] group-hover:text-[#183F91] transition">
                    {area.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={area.link_url || '/courses'}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#183F91] hover:text-[#D52D2D] transition"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
