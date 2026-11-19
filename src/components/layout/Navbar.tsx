'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ChevronDown, Phone, Mail,
  GraduationCap, ShieldCheck, UserCheck, BookOpen, Sparkles, Award
} from 'lucide-react';

interface NavbarProps {
  settings?: {
    site_name: string;
    phone1: string;
    phone2?: string;
    email: string;
    logo_url: string;
    logo_full_url?: string;
    whatsapp?: string;
  };
}

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdown(false);
    setCoursesDropdown(false);
    setStudentDropdown(false);
  }, [pathname]);

  const phone = settings?.phone1 || '+91 7015358183';
  const email = settings?.email || 'vnvidyapeeth@gmail.com';
  const emblem = settings?.logo_url || '/images/logo.webp';

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
      {/* 1. Slim Top Information Bar */}
      <div className="bg-[#102C63] text-white text-xs py-2 px-4 sm:px-6 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Legal Trust Status & Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-blue-100 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>Regd. Indian Trust Act 1882 • ISO 9001:2015</span>
            </span>
            <span className="hidden md:inline-block text-blue-400/40">|</span>
            <span className="hidden lg:flex items-center gap-1.5 text-blue-200">
              <span className="bg-[#D52D2D] text-[10px] font-bold px-2 py-0.5 rounded text-white tracking-wider uppercase">
                Admissions 2025–26 Open
              </span>
            </span>
          </div>

          {/* Contact Numbers & Admin Link */}
          <div className="flex items-center gap-4 text-xs text-blue-100">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{phone}</span>
            </a>
            <span className="hidden sm:inline-block text-blue-400/40">|</span>
            <a
              href={`mailto:${email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>{email}</span>
            </a>
            <span className="text-blue-400/40">|</span>
            <Link
              href="/admin/login"
              className="text-[11px] text-blue-300 hover:text-white hover:underline transition font-medium"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-200 ${
          isScrolled ? 'py-2.5' : 'py-3.5'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo - Preserves Original Proportions & Colors */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src={emblem}
                alt="VN Vidhyapeeth Official Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg sm:text-xl text-[#102C63] leading-none group-hover:text-[#183F91] transition">
                VN VIDHYAPEETH
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#667085] font-medium tracking-tight mt-1">
                Educational Initiative • Regd. Trust
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Hierarchy */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-[14px] text-slate-700">
            {/* 1. Home */}
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* 2. About Us (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdown(true)}
              onMouseLeave={() => setAboutDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/about') || pathname === '/mission' || pathname === '/impact'
                    ? 'text-[#183F91] font-semibold bg-blue-50/80'
                    : 'hover:text-[#183F91] hover:bg-slate-50'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-4 h-4 text-slate-400 transition-transform" />
              </button>

              {aboutDropdown && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/about"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    About VN Vidhyapeeth
                  </Link>
                  <Link
                    href="/mission"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Mission & Vision
                  </Link>
                  <Link
                    href="/impact"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Our Social & Educational Impact
                  </Link>
                  <Link
                    href="/about#certifications"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Legal & Approvals
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Courses (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdown(true)}
              onMouseLeave={() => setCoursesDropdown(false)}
            >
              <Link
                href="/courses"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/courses')
                    ? 'text-[#183F91] font-semibold bg-blue-50/80'
                    : 'hover:text-[#183F91] hover:bg-slate-50'
                }`}
              >
                <span>Courses</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>

              {coursesDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/courses"
                    className="block px-4 py-2 text-sm font-semibold text-[#183F91] border-b border-slate-100 hover:bg-blue-50 transition"
                  >
                    View All Programs →
                  </Link>
                  <Link
                    href="/courses?category=paramedical"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Paramedical Sciences (DMLT, DPT, DOTT)
                  </Link>
                  <Link
                    href="/courses?category=computer"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Computer & Digital Skills (ADCA, Tally)
                  </Link>
                  <Link
                    href="/courses?category=vocational"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Vocational & Industrial Trades
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Our Initiatives */}
            <Link
              href="/initiatives"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/initiatives')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Our Initiatives
            </Link>

            {/* 5. Student Corner (Dropdown) */}
            <div
              className="relative"
              onMouseEnter={() => setStudentDropdown(true)}
              onMouseLeave={() => setStudentDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/online-admission' ||
                  pathname === '/success-stories' ||
                  pathname === '/gallery'
                    ? 'text-[#183F91] font-semibold bg-blue-50/80'
                    : 'hover:text-[#183F91] hover:bg-slate-50'
                }`}
              >
                <span>Student Corner</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {studentDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/online-admission"
                    className="block px-4 py-2 text-sm font-semibold text-[#D52D2D] hover:bg-red-50 transition"
                  >
                    Online Admission Form →
                  </Link>
                  <Link
                    href="/success-stories"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Successful Alumni Stories
                  </Link>
                  <Link
                    href="/gallery"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Campus & Practical Gallery
                  </Link>
                  <Link
                    href="/news"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    Exam Notices & Circulars
                  </Link>
                </div>
              )}
            </div>

            {/* 6. News */}
            <Link
              href="/news"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/news') || isActive('/blog')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              News
            </Link>

            {/* 7. Contact */}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Prominent Admission CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/online-admission"
              className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82222] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply for Admission</span>
            </Link>
          </div>

          {/* Mobile Actions: Apply Button + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/online-admission"
              className="inline-flex items-center gap-1.5 bg-[#D52D2D] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Apply Now</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#183F91] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1 pb-4">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Home
              </Link>

              {/* Mobile About Accordion */}
              <div className="py-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  About
                </div>
                <Link
                  href="/about"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  About VN Vidhyapeeth
                </Link>
                <Link
                  href="/mission"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Mission & Vision
                </Link>
                <Link
                  href="/impact"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Our Impact
                </Link>
              </div>

              {/* Mobile Courses Accordion */}
              <div className="py-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Courses & Programs
                </div>
                <Link
                  href="/courses"
                  className="block px-4 py-1.5 text-sm font-medium text-[#183F91]"
                >
                  All Courses Overview
                </Link>
                <Link
                  href="/courses?category=paramedical"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Paramedical Sciences
                </Link>
                <Link
                  href="/courses?category=computer"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Computer & Digital Skills
                </Link>
                <Link
                  href="/courses?category=vocational"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Vocational Trades
                </Link>
              </div>

              <Link
                href="/initiatives"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Our Initiatives
              </Link>

              {/* Mobile Student Corner */}
              <div className="py-1">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Student Corner
                </div>
                <Link
                  href="/online-admission"
                  className="block px-4 py-1.5 text-sm font-semibold text-[#D52D2D]"
                >
                  Online Admission Form
                </Link>
                <Link
                  href="/success-stories"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Successful Students
                </Link>
                <Link
                  href="/gallery"
                  className="block px-4 py-1.5 text-sm text-slate-700 hover:text-[#183F91]"
                >
                  Campus Gallery
                </Link>
              </div>

              <Link
                href="/news"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-800"
              >
                News & Circulars
              </Link>

              <Link
                href="/contact"
                className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Contact Us
              </Link>

              <div className="pt-3 px-3">
                <Link
                  href="/online-admission"
                  className="w-full flex items-center justify-center gap-2 bg-[#D52D2D] text-white py-2.5 rounded-xl font-semibold text-sm shadow-md"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Online Admission Form 2025–26</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
