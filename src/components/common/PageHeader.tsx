import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({ title, subtitle, badge, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative bg-[#102C63] text-white py-16 sm:py-20 overflow-hidden">
      {/* Background Gradients & Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#102C63] via-[#183F91] to-[#102C63] opacity-95" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Trail */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-blue-300/60" />
                {b.href ? (
                  <Link href={b.href} className="hover:text-white transition">{b.label}</Link>
                ) : (
                  <span className="text-white font-medium">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {badge && (
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-red-300 uppercase tracking-wider backdrop-blur-md mb-3 border border-white/15">
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
