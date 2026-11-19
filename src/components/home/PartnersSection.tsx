import React from 'react';
import Image from 'next/image';
import { Partner } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { ShieldCheck, Award } from 'lucide-react';

interface PartnersSectionProps {
  partners?: Partner[];
}

const DEFAULT_PARTNERS = [
  { id: 1, name: 'National Skill Development Council', logo_url: '/images/partner1.jpg', category: 'Skill Council' },
  { id: 2, name: 'All India Healthcare & Paramedical Association', logo_url: '/images/partner2.jpg', category: 'Paramedical Council' },
  { id: 3, name: 'Regional Hospital Training Network', logo_url: '/images/partner3.jpg', category: 'Clinical Internship' },
  { id: 4, name: 'ISO 9001:2015 Quality Management Standards', logo_url: '/images/partner4.jpg', category: 'Quality Standard' },
  { id: 5, name: 'NITI Aayog NGO Darpan Registered Associate', logo_url: '/images/partner5.jpg', category: 'Govt. Registry' },
  { id: 6, name: 'Ministry of MSME Recognized Enterprise', logo_url: '/images/partner6.png', category: 'MSME Certified' }
];

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const displayList = partners && partners.length > 0 ? partners : DEFAULT_PARTNERS;

  return (
    <section className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#183F91] text-[11px] font-bold uppercase tracking-wider rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D52D2D]" />
            <span>Accreditations &amp; Institutional Alliances</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#102C63]">
            Our Institutional Partners &amp; Study Centers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Collaborating with national councils, certified hospital networks, and quality standards to ensure career readiness.
          </p>
        </div>

        {/* Clean Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center">
          {displayList.map((p) => (
            <div
              key={p.id}
              className="group bg-slate-50 hover:bg-white p-4 rounded-2xl border border-slate-200/70 hover:border-[#183F91]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center h-32"
            >
              <div className="relative w-full h-16 flex items-center justify-center">
                <ImageWithFallback
                  src={p.logo_url}
                  fallbackSrc="/images/placeholder-general.svg"
                  alt={p.name}
                  fill
                  className="object-contain p-1 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 mt-2 line-clamp-1 group-hover:text-[#183F91] transition">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
