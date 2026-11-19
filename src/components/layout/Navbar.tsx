'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Phone, Mail, Heart, ShieldCheck, Users,
  BookOpen, Utensils, Sparkles, HeartHandshake, ChevronDown
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
  const [initiativesDropdown, setInitiativesDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setInitiativesDropdown(false);
  }, [pathname]);

  const phone = settings?.phone1 || '+91 7015358183';
  const email = settings?.email || 'vnvidyapeeth@gmail.com';
  const emblem = settings?.logo_url || '/images/logo.webp';

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300">
      {/* 1. Top Information Bar */}
      <div className="bg-[#102C63] text-white text-xs py-2 px-4 sm:px-6 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Trust Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-blue-100 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              <span>VN Vidhyapeeth • Registered Educational & Social Welfare Trust</span>
            </span>
            <span className="hidden md:inline-block text-blue-400/40">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-blue-200 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% Tax Deductible NGO Welfare Programs</span>
            </span>
          </div>

          {/* Quick Links & Contact */}
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
              href="/volunteer"
              className="text-[11px] text-amber-300 hover:text-white font-semibold transition flex items-center gap-1"
            >
              <Users className="w-3 h-3" />
              <span>Volunteer</span>
            </Link>
            <span className="text-blue-400/40">|</span>
            <Link
              href="/admin/login"
              className="text-[11px] text-blue-300 hover:text-white hover:underline transition font-medium"
            >
              Admin
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
          {/* Brand Logo - Official VN Vidhyapeeth Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src={emblem}
                alt="VN Vidhyapeeth Official Logo"
                fill
                sizes="52px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg sm:text-xl text-[#102C63] leading-none group-hover:text-[#183F91] transition">
                VN VIDHYAPEETH
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#667085] font-medium tracking-tight mt-1">
                Education for Everyone, Employment for All
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-[13.5px] text-slate-700">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* Our Initiatives Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setInitiativesDropdown(true)}
              onMouseLeave={() => setInitiativesDropdown(false)}
            >
              <Link
                href="/initiatives"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/initiatives')
                    ? 'text-[#183F91] font-semibold bg-blue-50/80'
                    : 'hover:text-[#183F91] hover:bg-slate-50'
                }`}
              >
                <span>Our Initiatives</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              {initiativesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/initiatives"
                    className="block px-4 py-2 text-xs font-bold text-[#183F91] border-b border-slate-100 hover:bg-blue-50 transition"
                  >
                    View All 5 Core Initiatives →
                  </Link>
                  <Link
                    href="/initiatives#education"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#183F91]" />
                    <span>Education for Poor Children</span>
                  </Link>
                  <Link
                    href="/initiatives#food"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#D52D2D]" />
                    <span>Food Distribution & Hunger Relief</span>
                  </Link>
                  <Link
                    href="/initiatives#stationery"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Free Stationery Distribution</span>
                  </Link>
                  <Link
                    href="/initiatives#welfare"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Social Welfare</span>
                  </Link>
                  <Link
                    href="/initiatives#community"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Community Support</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/impact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/impact')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Our Impact
            </Link>

            <Link
              href="/campaigns"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/campaigns')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Campaigns
            </Link>

            <Link
              href="/stories"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/stories') || isActive('/success-stories')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Stories
            </Link>

            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/gallery')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/news"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/news')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              News
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'text-[#183F91] font-semibold bg-blue-50/80'
                  : 'hover:text-[#183F91] hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Prominent DONATE NOW Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-white animate-pulse" />
              <span>DONATE NOW</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 bg-[#D52D2D] text-white px-3 py-1.5 rounded-full text-xs font-bold"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 border-t border-slate-100 pt-3 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/' ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/about') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              About Us
            </Link>
            <Link
              href="/initiatives"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/initiatives') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Our Initiatives
            </Link>
            <Link
              href="/impact"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/impact') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Our Impact
            </Link>
            <Link
              href="/campaigns"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/campaigns') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Campaigns
            </Link>
            <Link
              href="/stories"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/stories') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Stories of Change
            </Link>
            <Link
              href="/gallery"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/gallery') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Photo Gallery
            </Link>
            <Link
              href="/news"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/news') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              News & Updates
            </Link>
            <Link
              href="/volunteer"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/volunteer') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Volunteer With Us
            </Link>
            <Link
              href="/contact"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/contact') ? 'bg-blue-50 text-[#183F91] font-semibold' : 'text-slate-700'
              }`}
            >
              Contact Us
            </Link>

            <div className="pt-2 px-2">
              <Link
                href="/donate"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] text-white px-4 py-3 rounded-xl text-sm font-bold shadow"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>DONATE TO SUPPORT</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
