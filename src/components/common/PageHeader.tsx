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
    <div className="relative bg-[#49352D] text-white py-16 sm:py-20 overflow-hidden border-b-4 border-[#C87552]">
      {/* Background Gradients & Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#49352D] via-[#382822] to-[#49352D] opacity-98" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C87552]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#F4D6C6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Trail */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#F4D6C6]/80 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-[#F4D6C6]/60" />
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
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#F4D6C6] uppercase tracking-wider backdrop-blur-md mb-3 border border-white/15">
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#FFF8F0]/90 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
