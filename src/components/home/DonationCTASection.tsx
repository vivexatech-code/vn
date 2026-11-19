import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, QrCode, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/lib/data';

interface DonationCTASectionProps {
  settings?: SiteSettings;
}

export default function DonationCTASection({ settings }: DonationCTASectionProps) {
  const bankName = settings?.bank_name || 'Punjab National Bank';
  const bankAccount = settings?.bank_account || '0442102100000677';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0044210';
  const bankHolder = settings?.bank_holder || 'VN VidhyaPeeth';
  const upiId = settings?.upi_id || 'vnvidyapeeth@pnb';

  return (
    <section className="py-20 bg-gradient-to-br from-[#102C63] via-[#183F91] to-[#102C63] text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-300 uppercase tracking-wider backdrop-blur-md border border-white/15">
              <Heart className="w-3.5 h-3.5 fill-red-400" />
              Empower a Student Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black leading-tight text-white">
              Your Contribution Can Fund a Life-Changing Paramedical Diploma
            </h2>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-normal">
              Every ₹5,000 sponsors medical lab equipment, study manuals, and clinical internships for a deserving student from a low-income family. All donations directly support educational scholarships under the registered trust framework of <strong>VN Vidhyapeeth (ITA 1882)</strong>.
            </p>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>100% Funds Allocated to Education</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Registered Trust Transparency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Immediate Digital Receipt</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Direct Bank or UPI QR Settlement</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#B52222] text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate Securely Now</span>
              </Link>

              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold text-base px-6 py-3.5 rounded-full backdrop-blur-sm border border-white/25 transition"
              >
                <span>View All Causes</span>
              </Link>
            </div>
          </div>

          {/* Quick Bank & QR Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-7 shadow-2xl border-4 border-white/20 max-w-md mx-auto">
              <div className="text-center pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-[#183F91] uppercase tracking-wider block mb-1">
                  Official Trust Account
                </span>
                <h3 className="text-xl font-serif font-black text-[#102C63]">
                  Direct Bank & UPI Transfer
                </h3>
              </div>

              {/* QR Image */}
              <div className="my-5 flex flex-col items-center">
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-slate-200 p-2 bg-white shadow-inner">
                  <Image
                    src={settings?.qr_code_url || '/images/payment-qr.jpg'}
                    alt="VN Vidhyapeeth Payment QR Code"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <span className="text-xs text-slate-500 font-mono mt-2 bg-slate-100 px-3 py-1 rounded-full">
                  UPI ID: {upiId}
                </span>
              </div>

              {/* Bank Details Table */}
              <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bank:</span>
                  <span className="font-bold text-slate-800">{bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">A/C Number:</span>
                  <span className="font-mono font-bold text-[#183F91]">{bankAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-mono font-bold text-slate-800">{bankIfsc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Holder:</span>
                  <span className="font-bold text-slate-800">{bankHolder}</span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <Link
                  href="/donate"
                  className="w-full flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-3 rounded-xl font-semibold text-xs transition"
                >
                  <span>Submit Payment Reference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
