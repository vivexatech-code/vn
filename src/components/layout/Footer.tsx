import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Phone, Mail, ShieldCheck, Heart, Users,
  BookOpen, Utensils, Sparkles, HeartHandshake, ArrowRight
} from 'lucide-react';
import { SiteSettings } from '@/lib/data';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone1 = settings?.phone1 || '+91 7015358183';
  const email = settings?.email || 'vnvidyapeeth@gmail.com';
  const hoAddress = settings?.head_office_address || 'Panchmukhi Chowk, Nohar Road, Ellenabad, Sirsa, Haryana - 125102';
  const bankName = settings?.bank_name || 'Punjab National Bank (PNB)';
  const bankAccount = settings?.bank_account || '4123000100987654';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0123400';
  const upiId = settings?.upi_id || 'vnvidhyapeeth@pnb';

  return (
    <footer className="bg-[#49352D] text-[#FFF8F0] pt-16 pb-8 border-t-4 border-[#C87552]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#382822]/70">
          {/* Column 1: Organization & Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 bg-[#FFF8F0] rounded-xl p-1 shadow-xs">
                <Image
                  src={settings?.logo_url || '/images/logo.webp'}
                  alt="VN Vidhyapeeth Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-xl text-[#FFF8F0]">
                  VN VIDHYAPEETH
                </span>
                <span className="text-xs text-[#F4D6C6] font-medium">
                  Educational & Social Welfare Trust
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#FFF8F0]/80 leading-relaxed">
              Working towards a better society through free education for underprivileged children, hunger relief, free school stationery distribution, healthcare support, and compassionate community care.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-[#F4D6C6]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C87552] flex-shrink-0" />
                <span>Regd. under Indian Trusts Act 1882</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#78866B] flex-shrink-0" />
                <span>Registered with NITI Aayog & MSME</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-4 py-2 rounded-xl text-xs font-medium transition-colors shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Support our cause</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Our 6 Core Activities */}
          <div>
            <h3 className="text-xs font-semibold text-[#F4D6C6] border-l-2 border-[#C87552] pl-2.5 mb-3.5">
              Our Core Activities
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FFF8F0]/80">
              <li>
                <Link href="/initiatives#education" className="hover:text-white transition flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0" />
                  <span>Child Education</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#food" className="hover:text-white transition flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0" />
                  <span>Food Distribution</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#welfare" className="hover:text-white transition flex items-center gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#78866B] flex-shrink-0" />
                  <span>Helping Poor Families</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#healthcare" className="hover:text-white transition flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#78866B] flex-shrink-0" />
                  <span>Healthcare Support</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#women" className="hover:text-white transition flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0" />
                  <span>Women Empowerment</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#community" className="hover:text-white transition flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#78866B] flex-shrink-0" />
                  <span>Community Development</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Transparency */}
          <div>
            <h3 className="text-xs font-semibold text-[#F4D6C6] border-l-2 border-[#C87552] pl-2.5 mb-3.5">
              Quick Links & Get Involved
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FFF8F0]/80">
              <li>
                <Link href="/about" className="hover:text-white transition">About Our Mission & Vision</Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition">Our Social Impact Numbers</Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition">Real Stories of Hope</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition">Field Activity Gallery</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">News & Welfare Updates</Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-[#F4D6C6] hover:text-white font-semibold transition flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#78866B]" />
                  <span>Volunteer With Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Us & Locations</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition text-[#F4D6C6]/60">Staff & Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Donation Account & Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-[#F4D6C6] border-l-2 border-[#C87552] pl-2.5 mb-2">
              Direct Bank Donation
            </h3>
            <div className="bg-[#382822] border border-[#5C463D] rounded-xl p-3.5 space-y-1.5 text-xs text-[#FFF8F0]/90 font-mono">
              <div className="flex justify-between">
                <span className="text-[#F4D6C6]/70">Bank:</span>
                <span className="font-semibold text-white">{bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4D6C6]/70">A/C:</span>
                <span className="font-semibold text-white">{bankAccount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4D6C6]/70">IFSC:</span>
                <span className="font-semibold text-white">{bankIfsc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4D6C6]/70">UPI ID:</span>
                <span className="font-semibold text-[#F4D6C6]">{upiId}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#FFF8F0]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0 mt-0.5" />
                <span>{hoAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0" />
                <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="hover:text-white">{phone1}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F4D6C6]/70">
          <p>
            © {currentYear} VN Vidhyapeeth. All rights reserved. Registered Educational & Social Welfare Trust.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/donate" className="text-[#C87552] hover:text-[#F4D6C6] font-semibold transition">Donate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
