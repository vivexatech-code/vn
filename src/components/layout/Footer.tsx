import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Phone, Mail, ShieldCheck,
  ExternalLink, Building, Landmark, Globe, Share2
} from 'lucide-react';
import { SiteSettings } from '@/lib/data';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone1 = settings?.phone1 || '+91 7015358183';
  const phone2 = settings?.phone2 || '+91 8199048325';
  const email = settings?.email || 'vnvidyapeeth@gmail.com';
  const hoAddress = settings?.head_office_address || 'Panchmukhi Chowk, Nohar Road, Ellenabad, Sirsa, Haryana - 125102';
  const regAddress = settings?.registered_office_address || '1359 A, Gali Number 8, Govind Puri, New Delhi - 110019, India';
  const bankName = settings?.bank_name || 'Punjab National Bank';
  const bankAccount = settings?.bank_account || '0442102100000677';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0044210';
  const bankHolder = settings?.bank_holder || 'VN VidhyaPeeth';

  return (
    <footer className="bg-[#102C63] text-slate-200 pt-16 pb-8 border-t-4 border-[#D52D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-900/60">
          {/* Column 1: Organization & Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg p-1">
                <Image
                  src={settings?.logo_url || '/images/logo.webp'}
                  alt="VN Vidhyapeeth Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black tracking-wider text-xl text-white">
                  VN VIDHYAPEETH
                </span>
                <span className="text-xs text-blue-300 font-medium">
                  Educational Initiative
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              An Educational Initiative Operated by a Registered Trust (Indian Trust Act 1882) committed to democratizing practical, skill-oriented paramedical, vocational, and digital education across India.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>ISO 9001:2015 Certified Institution</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Registered with NITI Aayog & MSME</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings?.facebook_url || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#183F91] transition"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">fb</span>
              </a>
              <a
                href={settings?.instagram_url || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#183F91] transition"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs">ig</span>
              </a>
              <a
                href={settings?.twitter_url || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#183F91] transition"
                aria-label="Twitter / X"
              >
                <span className="font-bold text-xs">x</span>
              </a>
              <a
                href={settings?.youtube_url || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#183F91] transition"
                aria-label="YouTube"
              >
                <span className="font-bold text-xs">yt</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links & Initiatives */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition">
                  About VN Vidhyapeeth
                </Link>
              </li>
              <li>
                <Link href="/mission" className="hover:text-white hover:underline transition">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/initiatives" className="hover:text-white hover:underline transition">
                  Our Initiatives
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white hover:underline transition">
                  Educational Programs & Courses
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white hover:underline transition">
                  Social Impact & Metrics
                </Link>
              </li>
              <li>
                <Link href="/online-admission" className="hover:text-white hover:underline transition font-semibold text-red-300">
                  Online Admission Form 2025–26
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white hover:underline transition">
                  Student Success Stories
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:underline transition">
                  Photo & Practical Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white hover:underline transition">
                  Latest Notices & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Courses & Programs */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]"></span>
              Popular Courses
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/courses?category=paramedical" className="hover:text-white transition block">
                  <span className="font-medium text-white">DMLT</span> - Medical Lab Technology
                </Link>
              </li>
              <li>
                <Link href="/courses?category=paramedical" className="hover:text-white transition block">
                  <span className="font-medium text-white">DPT</span> - Diploma in Physiotherapy
                </Link>
              </li>
              <li>
                <Link href="/courses?category=paramedical" className="hover:text-white transition block">
                  <span className="font-medium text-white">DOTT</span> - Operation Theatre Tech
                </Link>
              </li>
              <li>
                <Link href="/courses?category=paramedical" className="hover:text-white transition block">
                  <span className="font-medium text-white">DXRT</span> - X-Ray & Imaging Tech
                </Link>
              </li>
              <li>
                <Link href="/courses?category=computer" className="hover:text-white transition block">
                  <span className="font-medium text-white">ADCA</span> - Advance Computer Diploma
                </Link>
              </li>
              <li>
                <Link href="/courses?category=computer" className="hover:text-white transition block">
                  <span className="font-medium text-white">Tally Prime & GST</span> Accounting
                </Link>
              </li>
              <li>
                <Link href="/courses?category=vocational" className="hover:text-white transition block">
                  <span className="font-medium text-white">Textile & Industrial</span> Trades
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact?type=admission"
                  className="inline-flex items-center gap-1.5 text-xs text-red-300 font-semibold hover:text-white transition"
                >
                  <span>Apply for Admission Online 2025–26</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Bank Details */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]"></span>
              Official Contacts
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Head & Verification Office:</strong>
                  <span>{hoAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Landmark className="w-4 h-4 text-blue-300 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Registered Office:</strong>
                  <span>{regAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="hover:text-white font-medium">
                    {phone1}
                  </a>
                  {phone2 && (
                    <span className="ml-2">
                      / <a href={`tel:${phone2.replace(/\s+/g, '')}`} className="hover:text-white font-medium">{phone2}</a>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">
                  {email}
                </a>
              </div>
            </div>

            {/* Academic Admission Helpdesk Badge */}
            <div className="bg-blue-950/70 p-4 rounded-xl border border-blue-800/60 text-xs space-y-2">
              <div className="font-semibold text-white flex items-center justify-between">
                <span>Admissions Office</span>
                <span className="bg-[#D52D2D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  2025–2026
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                Enroll in certified paramedical, digital technologies, and vocational diploma programs.
              </p>
              <div className="pt-1">
                <Link
                  href="/online-admission"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D52D2D] hover:bg-[#b82222] text-white font-semibold py-2 px-3 rounded-lg text-xs transition"
                >
                  <span>Fill Admission Form Online →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <div className="text-center sm:text-left">
            <p>
              © {currentYear} <strong>VN VIDHYAPEETH</strong>. All rights reserved.
            </p>
            <p className="text-blue-300/70 text-[11px] mt-0.5">
              Operating under Indian Trust Act 1882 • ISO 9001:2015 Certified Organization.
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-blue-900">•</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition">
              Terms & Conditions
            </Link>
            <span className="text-blue-900">•</span>
            <Link href="/contact" className="hover:text-white transition">
              Authorized Center Verification
            </Link>
            <span className="text-blue-900">•</span>
            <Link href="/admin/login" className="text-blue-300 hover:text-white font-medium transition">
              Staff & Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
