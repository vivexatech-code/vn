import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Phone, Mail, ShieldCheck, Heart, Users,
  BookOpen, Utensils, Sparkles, HeartHandshake, Landmark, ArrowRight
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
  const regAddress = settings?.registered_office_address || '1359 A, Gali Number 8, Govind Puri, New Delhi - 110019, India';
  const bankName = settings?.bank_name || 'Punjab National Bank';
  const bankAccount = settings?.bank_account || '4123000100987654';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0123400';
  const bankHolder = settings?.bank_holder || 'VN Vidhyapeeth Trust';
  const upiId = settings?.upi_id || 'vnvidhyapeeth@pnb';

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
                <span className="font-bold tracking-tight text-xl text-white">
                  VN VIDHYAPEETH
                </span>
                <span className="text-xs text-blue-300 font-medium">
                  Educational & Social Welfare Trust
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Working towards a better society through free education for underprivileged children, hunger relief, free school stationery distribution, and compassionate community welfare.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Regd. under Indian Trust Act 1882</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>Registered with NITI Aayog & MSME</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Support Our Cause</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Our Initiatives */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#D52D2D] pl-3 mb-4">
              Our Core Initiatives
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/initiatives#education" className="hover:text-white transition flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Education for Every Child</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#food" className="hover:text-white transition flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>Food Distribution & Relief</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#stationery" className="hover:text-white transition flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>Free Stationery Distribution</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#welfare" className="hover:text-white transition flex items-center gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Social Welfare for Families</span>
                </Link>
              </li>
              <li>
                <Link href="/initiatives#child-dev" className="hover:text-white transition flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Child Welfare & Development</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/campaigns" className="text-amber-300 hover:text-white font-semibold transition flex items-center gap-1.5">
                  <span>Explore Active Campaigns</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Transparency */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#D52D2D] pl-3 mb-4">
              Quick Links & Get Involved
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition">About Our Mission & Vision</Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition">Our Social Impact Numbers</Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition">Stories of Change</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition">Field Activity Gallery</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">News & Welfare Updates</Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-amber-300 hover:text-white font-semibold transition flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Volunteer With Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Us & Locations</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition text-slate-400">Staff & Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Donation Account & Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-[#D52D2D] pl-3 mb-2">
              Direct Bank Donation
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Bank:</span>
                <span className="font-semibold text-white">{bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">A/C:</span>
                <span className="font-semibold text-white">{bankAccount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IFSC:</span>
                <span className="font-semibold text-white">{bankIfsc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">UPI ID:</span>
                <span className="font-semibold text-amber-300">{upiId}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{hoAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <a href={`tel:${phone1.replace(/\s+/g, '')}`} className="hover:text-white">{phone1}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} VN Vidhyapeeth. All rights reserved. Registered Educational & Social Welfare Trust.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/donate" className="text-red-400 hover:text-white font-semibold transition">Donate</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
