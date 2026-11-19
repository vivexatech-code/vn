'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, Layers, MessageSquare,
  Image as ImageIcon, Newspaper, Sliders, Settings, LogOut,
  Menu, X, ExternalLink, Users, FileText, GraduationCap,
  Building, Bell
} from 'lucide-react';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render children cleanly without admin chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Online Admissions', href: '/admin/admissions', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Enquiry Management', href: '/admin/enquiries', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Popup Settings', href: '/admin/popup-settings', icon: <Bell className="w-4 h-4" /> },
    { label: 'Hero Slideshow', href: '/admin/hero-slides', icon: <Sliders className="w-4 h-4" /> },
    { label: 'Course Management', href: '/admin/courses', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Successful Students', href: '/admin/testimonials', icon: <Users className="w-4 h-4" /> },
    { label: 'Our Partners', href: '/admin/partners', icon: <Building className="w-4 h-4" /> },
    { label: 'News & Circulars', href: '/admin/news', icon: <Newspaper className="w-4 h-4" /> },
    { label: 'Gallery Media', href: '/admin/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Custom Pages', href: '/admin/pages', icon: <FileText className="w-4 h-4" /> },
    { label: 'Website & WhatsApp Settings', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FC] flex flex-col lg:flex-row font-sans">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-[#102C63] text-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/images/logo.webp" alt="VN Logo" fill className="object-contain" />
          </div>
          <span className="font-serif font-black text-sm tracking-wide">VN VIDHYAPEETH ADMIN</span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-white/10 text-white"
          aria-label="Toggle admin sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#102C63] text-slate-200 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-blue-900/60 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-lg p-1">
                <Image src="/images/logo.webp" alt="VN Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-white text-base tracking-wide leading-none">
                  VN VIDHYAPEETH
                </span>
                <span className="text-[10px] text-blue-300 mt-1 uppercase tracking-wider font-semibold">
                  Admin Console
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#183F91] text-white shadow'
                      : 'text-slate-300 hover:bg-blue-950/60 hover:text-white'
                  }`}
                >
                  <span className={active ? 'text-red-400' : 'text-blue-300'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-blue-900/60 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-blue-300 hover:text-white hover:bg-blue-950/60 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded font-mono">
              Live
            </span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/40 hover:text-red-200 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 lg:overflow-y-auto h-screen">
        {/* Top Navbar */}
        <header className="hidden lg:flex items-center justify-between bg-white px-8 py-4 border-b border-slate-200/80 sticky top-0 z-30">
          <div>
            <h2 className="font-serif font-black text-xl text-[#102C63]">
              Website Content Management
            </h2>
            <p className="text-xs text-slate-400">
              Changes update the database immediately and reflect across the public portal.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183F91] hover:underline bg-blue-50 px-3 py-1.5 rounded-full"
            >
              <span>View Public Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#183F91] text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-xs font-semibold text-slate-700">Administrator</span>
            </div>
          </div>
        </header>

        {/* Children Page View */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
