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
    <header className="sticky top-0 z-50 w-full bg-[#FFF8F0] shadow-xs transition-all duration-300">
      {/* 1. Top Information Bar - Deep Brown Warm Atmosphere */}
      <div className="bg-[#49352D] text-[#FFF8F0] text-xs py-2 px-4 sm:px-6 border-b border-[#382822]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Trust Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#F4D6C6] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C87552] flex-shrink-0" />
              <span>VN Vidhyapeeth • Registered Educational & Social Welfare Trust</span>
            </span>
            <span className="hidden md:inline-block text-[#78665E]">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#FFF8F0]/80 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#78866B]"></span>
              <span>100% Tax Deductible (80G) NGO Welfare Programs</span>
            </span>
          </div>

          {/* Quick Links & Contact */}
          <div className="flex items-center gap-4 text-xs text-[#FFF8F0]/90">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#F4D6C6] transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#C87552]" />
              <span>{phone}</span>
            </a>
            <span className="hidden sm:inline-block text-[#78665E]">|</span>
            <a
              href={`mailto:${email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#F4D6C6] transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#C87552]" />
              <span>{email}</span>
            </a>
            <span className="text-[#78665E]">|</span>
            <Link
              href="/volunteer"
              className="text-[11px] text-[#F4D6C6] hover:text-white font-semibold transition flex items-center gap-1"
            >
              <Users className="w-3 h-3 text-[#78866B]" />
              <span>Volunteer</span>
            </Link>
            <span className="text-[#78665E]">|</span>
            <Link
              href="/admin/login"
              className="text-[11px] text-[#FFF8F0]/70 hover:text-white hover:underline transition font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar - Warm Cream Surface */}
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
              <span className="font-bold tracking-tight text-lg sm:text-xl text-[#49352D] leading-none group-hover:text-[#C87552] transition">
                VN VIDHYAPEETH
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#78665E] font-medium tracking-tight mt-1">
                Education for Everyone, Employment for All
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-[13.5px] text-[#49352D]">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/'
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              About Us
            </Link>

            {/* Our Work / Initiatives Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setInitiativesDropdown(true)}
              onMouseLeave={() => setInitiativesDropdown(false)}
            >
              <Link
                href="/initiatives"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive('/initiatives')
                    ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                    : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
                }`}
              >
                <span>Our Work</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#78665E]" />
              </Link>

              {initiativesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-[#FFF8F0] rounded-xl shadow-xl border border-[#EFE4DC] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/initiatives"
                    className="block px-4 py-2 text-xs font-bold text-[#C87552] border-b border-[#EFE4DC] hover:bg-[#F4D6C6]/30 transition"
                  >
                    View All 6 Core Activities →
                  </Link>
                  <Link
                    href="/initiatives#education"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#49352D] hover:bg-[#F4D6C6]/30 hover:text-[#C87552] transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>Child Education</span>
                  </Link>
                  <Link
                    href="/initiatives#food"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#49352D] hover:bg-[#F4D6C6]/30 hover:text-[#C87552] transition"
                  >
                    <Utensils className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>Food Distribution</span>
                  </Link>
                  <Link
                    href="/initiatives#welfare"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#49352D] hover:bg-[#F4D6C6]/30 hover:text-[#C87552] transition"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-[#78866B]" />
                    <span>Helping Poor Families</span>
                  </Link>
                  <Link
                    href="/initiatives#healthcare"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#49352D] hover:bg-[#F4D6C6]/30 hover:text-[#C87552] transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#78866B]" />
                    <span>Healthcare Support</span>
                  </Link>
                  <Link
                    href="/initiatives#women"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#49352D] hover:bg-[#F4D6C6]/30 hover:text-[#C87552] transition"
                  >
                    <Users className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>Women Empowerment</span>
                  </Link>
                  <Link
                    href="/initiatives#community"
                    className="flex items-center gap-2 px-4 py-2 text-xs text-[#49352D] hover:bg-[#F4D6C6]/30 hover:text-[#C87552] transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#78866B]" />
                    <span>Community Development</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/impact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/impact')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Our Impact
            </Link>

            <Link
              href="/campaigns"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/campaigns')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Appeals
            </Link>

            <Link
              href="/stories"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/stories') || isActive('/success-stories')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Real Stories
            </Link>

            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/gallery')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/news"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/news')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Updates
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'text-[#C87552] font-semibold bg-[#F4D6C6]/40'
                  : 'hover:text-[#C87552] hover:bg-[#F4D6C6]/20'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Prominent Warm Terracotta DONATE NOW Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-5 py-2 rounded-xl text-xs font-medium shadow-xs transition-colors active:scale-[0.99]"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate now</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/donate"
              className="inline-flex items-center gap-1.5 bg-[#C87552] text-white px-3 py-1.5 rounded-lg text-xs font-medium"
            >
              <Heart className="w-3 h-3 fill-white" />
              <span>Donate</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#49352D] hover:bg-[#F4D6C6]/40 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 border-t border-[#EFE4DC] pt-3 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                pathname === '/' ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/about') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              About Us
            </Link>
            <Link
              href="/initiatives"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/initiatives') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Our Work & Activities
            </Link>
            <Link
              href="/impact"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/impact') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Our Impact
            </Link>
            <Link
              href="/campaigns"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/campaigns') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Appeals
            </Link>
            <Link
              href="/stories"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/stories') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Real Stories of Hope
            </Link>
            <Link
              href="/gallery"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/gallery') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Photo Gallery
            </Link>
            <Link
              href="/news"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/news') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Updates
            </Link>
            <Link
              href="/volunteer"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/volunteer') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Volunteer With Us
            </Link>
            <Link
              href="/contact"
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                isActive('/contact') ? 'bg-[#F4D6C6]/50 text-[#C87552] font-semibold' : 'text-[#49352D]'
              }`}
            >
              Contact Us
            </Link>

            <div className="pt-2 px-2">
              <Link
                href="/donate"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-xs transition-colors"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate now</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
