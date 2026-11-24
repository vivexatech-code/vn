import React from 'react';
import { ShieldCheck, Award, FileCheck2, Building2, CheckCircle2 } from 'lucide-react';

export default function PartnersSection() {
  const credentials = [
    {
      icon: <Building2 className="w-4 h-4 text-[#C87552]" />,
      title: 'Indian Trusts Act 1882',
      desc: 'Registered Social Welfare Trust'
    },
    {
      icon: <Award className="w-4 h-4 text-[#C87552]" />,
      title: 'Section 80G Tax Exemption',
      desc: '50% Income Tax Benefit on Donations'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#78866B]" />,
      title: 'NITI Aayog Darpan',
      desc: 'Verified NGO Registry'
    },
    {
      icon: <FileCheck2 className="w-4 h-4 text-[#78866B]" />,
      title: 'ISO 9001:2015 Certified',
      desc: 'Quality Management Standards'
    },
    {
      icon: <CheckCircle2 className="w-4 h-4 text-[#C87552]" />,
      title: 'Ministry of MSME',
      desc: 'Recognized Social Enterprise'
    }
  ];

  return (
    <section className="py-8 bg-[#FFF8F0] border-y border-[#EFE4DC]" aria-label="Trust and Accreditations">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 items-center">
          {credentials.map((cred, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#EFE4DC] flex items-center justify-center flex-shrink-0 shadow-xs">
                {cred.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-[#49352D] truncate">
                  {cred.title}
                </h4>
                <p className="text-[11px] text-[#78665E] truncate">
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
