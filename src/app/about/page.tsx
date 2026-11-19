import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getSettings } from '@/lib/data';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import {
  ShieldCheck, CheckCircle2, Award, Building, FileCheck,
  Users, Stethoscope, Laptop, ArrowRight, Quote
} from 'lucide-react';

export const metadata = {
  title: 'About Us | VN Vidhyapeeth',
  description: 'Learn about VN Vidhyapeeth, an educational initiative operated by a registered trust under the Indian Trust Act 1882, ISO 9001:2015 certified.'
};


export default function AboutPage() {
  const settings = getSettings();

  return (
    <div>
      <PageHeader
        badge="Institutional Overview"
        title="About VN Vidhyapeeth"
        subtitle="Dedicated to democratizing affordable, quality-driven, and employment-focused education across India."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Main Narrative Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Who We Are
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63] leading-tight">
                An Educational Initiative Operated by a Registered Trust
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                <strong>VN Vidhyapeeth</strong> is an autonomous, premier educational and skill-development institution constituted under the <strong>Indian Trust Act 1882</strong>. Headquartered in Ellenabad, Sirsa (Haryana) with its registered office in New Delhi, the institution operates through a decentralized network of authorized study centers spread across multiple states and districts of India.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                The core ethos of VN Vidhyapeeth is simple yet powerful: <em>&ldquo;Skill Based एवं Career Oriented Education&rdquo;</em>. In an era where conventional degrees often fall short of practical industry expectations, VN Vidhyapeeth delivers rigorous practical and clinical curriculums in paramedical sciences, digital technology, and vocational trades that prepare students for immediate employment and self-reliance.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-100 bg-[#F5F7FC] p-4 rounded-xl">
                  <span className="font-serif font-bold text-lg text-[#102C63] block">Indian Trust Act 1882</span>
                  <p className="text-xs text-slate-600 mt-1">Constituted as a legally registered public educational trust for social advancement.</p>
                </div>
                <div className="border border-slate-100 bg-[#F5F7FC] p-4 rounded-xl">
                  <span className="font-serif font-bold text-lg text-[#102C63] block">ISO 9001:2015</span>
                  <p className="text-xs text-slate-600 mt-1">Certified for maintaining quality standards in vocational curriculum and examinations.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <ImageWithFallback
                  src="/images/newslider1.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="VN Vidhyapeeth Institution"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#183F91] text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <span className="font-serif font-black text-3xl block text-red-400">100+</span>
                <span className="text-xs text-blue-100 font-medium">Authorized Study Centers Across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section id="director" className="py-20 bg-[#F5F7FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-200/80 relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
              <Quote className="w-8 h-8" />
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                Institutional Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#102C63]">
                Director&apos;s Message
              </h2>

              <div className="space-y-4 text-base text-slate-700 leading-relaxed font-normal pt-2">
                <p className="italic text-lg text-[#102C63] font-serif">
                  &ldquo;प्रिय छात्रों, VN Vidhyapeeth में आपका स्वागत है।&rdquo;
                </p>
                <p>
                  &ldquo;हमारा उद्देश्य छात्रों को ऐसी शिक्षा प्रदान करना है जो उन्हें सीधे रोजगार से जोड़ सके। आज के समय में केवल डिग्री नहीं, बल्कि Skill सबसे महत्वपूर्ण है। इसी को ध्यान में रखते हुए हम Practical एवं Job Oriented Courses प्रदान कर रहे हैं।&rdquo;
                </p>
                <p>
                  &ldquo;हमारा दृढ़ संकल्प है कि हर पृष्ठभूमि का छात्र अपने जीवन में सफल बने, आत्मनिर्भर बने और राष्ट्र निर्माण में स्वास्थ्य सेवा व तकनीकी दक्षता के माध्यम से योगदान दे। VN Vidhyapeeth परिवार की ओर से आपके उज्ज्वल भविष्य की अनंत शुभकामनाएँ।&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg text-[#102C63]">
                    Director & Governing Body
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    VN Vidhyapeeth Educational Trust
                  </p>
                </div>
                <div className="hidden sm:block text-right text-xs text-slate-400 font-mono">
                  Ellenabad • Sirsa • Delhi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Certifications Section */}
      <section id="legal" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5" />
              Transparency & Affiliation
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
              Legal Accreditations & Certifications
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Verified registrations ensuring institutional credibility, compliant operations, and authentic certification issuance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#183F91] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#102C63]">
                  Indian Trust Act 1882
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Operated under a registered educational trust deed legally executed under the Indian Trust Act 1882 for charitable skill education and social empowerment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-[#183F91]">
                Statutory Non-Profit Registration
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-100 text-[#D52D2D] flex items-center justify-center mb-5">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#102C63]">
                  ISO 9001:2015 Quality Certified
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Certified for implementing rigorous quality management standards in syllabus delivery, student assessment, and vocational skill certifications.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-[#D52D2D]">
                International Quality Standards
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#F5F7FC] border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#183F91] flex items-center justify-center mb-5">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#102C63]">
                  NITI Aayog & MSME Registered
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Recognized and registered with the NGO Darpan portal of NITI Aayog and Ministry of Micro, Small & Medium Enterprises (Govt. of India).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-[#183F91]">
                National Portal Recognition
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-[#102C63] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-black">
            Ready to Begin Your Educational Journey?
          </h2>
          <p className="text-sm text-blue-200 max-w-xl mx-auto">
            Admissions open for academic session 2025–2026 across paramedical, computer, and vocational programs.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link
              href="/courses"
              className="bg-[#D52D2D] hover:bg-[#B52222] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-md transition"
            >
              Browse Available Courses
            </Link>
            <Link
              href="/contact"
              className="bg-white/15 hover:bg-white/25 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition"
            >
              Contact Head Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
