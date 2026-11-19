import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { Target, Compass, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Mission & Vision | VN Vidhyapeeth',
  description: 'Our mission and vision for empowering Indian youth through employment-driven skill education and social development.'
};

export default function MissionPage() {
  return (
    <div>
      <PageHeader
        badge="Core Purpose"
        title="Our Mission & Strategic Vision"
        subtitle="Dedicated to building an inclusive India where quality skill training and career opportunities are accessible to all."
        breadcrumbs={[{ label: 'About Us', href: '/about' }, { label: 'Mission & Vision' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          {/* Mission Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Target className="w-3.5 h-3.5" />
                Our Institutional Mission
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
                Empowering Youth Through Practical Healthcare & Technical Excellence
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Our mission is to establish a nationwide network of high-standard vocational study centers offering hands-on, job-oriented training in healthcare, paramedical technologies, computer sciences, and community arts.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-4 bg-[#F5F7FC] rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#102C63]">Practical एवं Job Oriented Training</h4>
                    <p className="text-xs text-slate-600 mt-1">Replacing rote theory with clinical hospital attachments, diagnostic machine handling, and software laboratory drills.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F7FC] rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#102C63]">Healthcare & Technical Skills</h4>
                    <p className="text-xs text-slate-600 mt-1">Focusing on high-demand disciplines such as DMLT, DPT, DOTT, X-Ray, Computer applications, and business accounting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F5F7FC] rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-[#102C63]">Affordable Quality Education</h4>
                    <p className="text-xs text-slate-600 mt-1">Eliminating commercial barriers with subsidized fee scales, free study materials, and scholarships for rural students.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/newslider2.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
            <div className="lg:col-span-6 order-2 lg:order-1 relative">
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/newslider3.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Vision"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                Our National Vision
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
                Reaching Every District to Foster Self-Reliant (Atmanirbhar) Communities
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                &ldquo;हमारा दृष्टिकोण भारत में Skill Based Education को बढ़ावा देना है, ताकि हर छात्र को रोजगार योग्य बनाया जा सके। हम चाहते हैं कि VN Vidhyapeeth देश के हर जिले में शिक्षा पहुंचाए और छात्रों को आत्मनिर्भर बनने में सहायता करे।&rdquo;
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                By 2030, VN Vidhyapeeth envisions equipping 50,000+ youth with professional certifications and clinical competence, empowering rural and semi-urban families with stable healthcare and vocational livelihoods.
              </p>

              <div className="pt-2">
                <Link
                  href="/initiatives"
                  className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition"
                >
                  <span>Explore Our Social Initiatives</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
