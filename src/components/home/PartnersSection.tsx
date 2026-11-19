import React from 'react';
import { ShieldCheck, Award, FileCheck2, Building2, CheckCircle2 } from 'lucide-react';

export default function PartnersSection() {
  const credentials = [
    {
      icon: <Building2 className="w-4 h-4 text-[#183F91]" />,
      title: 'Indian Trusts Act 1882',
      desc: 'Registered Social Welfare Trust'
    },
    {
      icon: <Award className="w-4 h-4 text-[#D52D2D]" />,
      title: 'Section 80G Tax Exemption',
      desc: '50% Income Tax Exemption on Donations'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      title: 'NITI Aayog Darpan',
      desc: 'Verified NGO Registry'
    },
    {
      icon: <FileCheck2 className="w-4 h-4 text-amber-600" />,
      title: 'ISO 9001:2015 Certified',
      desc: 'Quality Management Standards'
    },
    {
      icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />,
      title: 'Ministry of MSME',
      desc: 'Recognized Social Enterprise'
    }
  ];

  return (
    <section className="py-8 bg-[#F8F9FA] border-y border-slate-200/80" aria-label="Trust and Accreditations">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-center">
          {credentials.map((cred, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-2xs">
                {cred.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#102C63] truncate">
                  {cred.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {cred.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
