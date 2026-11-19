import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import VolunteerSection from '@/components/home/VolunteerSection';
import { Users, Heart, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Volunteer With Us | VN Vidhyapeeth Social Welfare Trust',
  description: 'Join hands with VN Vidhyapeeth as a volunteer for child education, hunger relief food drives, and free stationery distribution.'
};

export default function VolunteerPage() {
  return (
    <div>
      <PageHeader
        badge="Community Welfare Movement"
        title="Volunteer With Us"
        subtitle="Give your time, skills, and compassion to uplift underprivileged children and build a kinder society."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Volunteer' }]}
      />

      {/* Volunteer Benefits Banner */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#F7F8FC] border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#183F91] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#102C63]">Meaningful Community Impact</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work directly with children, teach literacy and mathematics, and assist daily-wage families during food drives.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F7F8FC] border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#D52D2D] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#102C63]">Official Certificate of Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an authorized certificate of volunteering and social internship from our registered NGO trust.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F7F8FC] border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#102C63]">Flexible Volunteer Slots</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose weekend distribution drives, weekday teaching shifts, or remote educational mentorship based on your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Volunteer Section with Form */}
      <VolunteerSection />
    </div>
  );
}
