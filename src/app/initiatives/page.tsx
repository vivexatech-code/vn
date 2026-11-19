import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getFocusAreas } from '@/lib/data';
import { Sparkles, ArrowRight, HeartHandshake, Stethoscope, Laptop, Wrench, Users, GraduationCap } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Our Initiatives | VN Vidhyapeeth',
  description: 'Explore the social and educational initiatives driven by VN Vidhyapeeth to foster employment and grassroots empowerment.'
};


export default function InitiativesPage() {
  const focusAreas = getFocusAreas(true);

  return (
    <div>
      <PageHeader
        badge="Community & Education"
        title="Our Key Educational Initiatives"
        subtitle="Bridging the opportunity divide through subsidized healthcare training, women skill programs, and digital literacy."
        breadcrumbs={[{ label: 'Our Initiatives' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-serif font-black text-[#102C63]">
              Grassroots Action for Long-Term Self-Sufficiency
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              VN Vidhyapeeth operates through community-centric programs designed to convert untrained potential into certified professional careers. Below are the flagship initiatives currently underway across our affiliated study center network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area) => (
              <div
                key={area.id}
                className="bg-[#F5F7FC] rounded-2xl overflow-hidden border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                    <ImageWithFallback
                      src={area.image_url || '/images/dmlt.jpg'}
                      fallbackSrc="/images/placeholder-course.svg"
                      alt={area.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#183F91]">
                      {area.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-[#102C63] group-hover:text-[#183F91] transition">
                      {area.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={area.link_url || '/courses'}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#183F91] hover:text-white text-[#183F91] py-2.5 rounded-xl text-xs font-bold border border-slate-200 transition"
                  >
                    <span>Learn More & Participate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Social Impact Banner */}
          <div className="bg-gradient-to-r from-[#102C63] to-[#183F91] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase font-bold text-red-300 tracking-wider">
                Partner &amp; Expand
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Partner with us as an Authorized Study Center or Clinical Mentor
              </h3>
              <p className="text-sm text-blue-100">
                Help bring certified paramedical and IT diploma education to your town, district, or healthcare organization.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-[#102C63] hover:bg-slate-100 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow transition"
              >
                Apply for Affiliation
              </Link>
              <Link
                href="/online-admission"
                className="bg-[#D52D2D] hover:bg-[#B52222] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow transition flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Online Admission Form</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
