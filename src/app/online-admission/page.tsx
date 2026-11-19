import React from 'react';
import type { Metadata } from 'next';
import AdmissionFormClient from './AdmissionFormClient';
import PageHeader from '@/components/common/PageHeader';
import { ShieldCheck, FileCheck, Award, Clock } from 'lucide-react';
import { getSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Online Admission Form 2025–26 | VN Vidhyapeeth',
  description: 'Apply online for certified Paramedical (DMLT, DPT, DOTT, DXRT), Computer (ADCA, Tally GST), and Vocational diploma courses at VN Vidhyapeeth.',
};

export default function OnlineAdmissionPage() {
  const settings = getSettings();

  return (
    <div className="bg-[#F5F7FC] min-h-screen pb-20">
      <PageHeader
        badge="Session 2025–2026"
        title="Online Admission Portal"
        subtitle="Autonomous Paramedical, IT & Skill Certifications • Operating under Registered Trust Framework (Indian Trust Act 1882)"
        breadcrumbs={[{ label: 'Online Admission Form' }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        {/* Admission Guarantee Features Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#183F91] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">ISO 9001:2015</h4>
              <p className="text-[11px] text-slate-500">Quality Certified Education</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D52D2D] flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Direct Enrollment</h4>
              <p className="text-[11px] text-slate-500">Instant Application ID</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Hospital Internships</h4>
              <p className="text-[11px] text-slate-500">Clinical Practical Training</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Fast Counseling</h4>
              <p className="text-[11px] text-slate-500">Review within 24 Hours</p>
            </div>
          </div>
        </div>

        {/* Multi-step Application Component */}
        <AdmissionFormClient helplinePhone={settings.phone1} helplineEmail={settings.email} />
      </div>
    </div>
  );
}
