import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsBlog } from '@/lib/data';
import { Calendar, ArrowRight, BellRing, Sparkles, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface NewsAndNoticesSectionProps {
  articles: NewsBlog[];
}

export default function NewsAndNoticesSection({ articles }: NewsAndNoticesSectionProps) {
  if (!articles || articles.length === 0) return null;

  // Split into featured notice and regular list
  const notices = articles.filter(a => a.type === 'notice' || a.type === 'announcement');
  const blogs = articles.filter(a => a.type === 'blog' || a.type === 'news');

  return (
    <section className="py-20 bg-[#F5F7FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <BellRing className="w-3.5 h-3.5 text-[#183F91]" />
              Official Announcements & Insights
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#102C63]">
              Latest Notices, News & Updates
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Stay informed with recent academic circulars, semester examination notices, admission updates, and institutional milestones.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#183F91] hover:text-[#D52D2D] transition group self-start md:self-auto"
          >
            <span>View All Updates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Notice Board (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-card border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <h3 className="font-serif font-bold text-lg text-[#102C63]">
                    Notice Board
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-[#183F91] bg-blue-50 px-2.5 py-1 rounded-full">
                  Live Updates
                </span>
              </div>

              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="group p-3.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(notice.published_at)}</span>
                      <span className="text-red-500 font-semibold uppercase">• {notice.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#102C63] group-hover:text-[#183F91] transition line-clamp-2">
                      <Link href={`/news/${notice.slug}`}>{notice.title}</Link>
                    </h4>
                  </div>
                ))}

                {/* Additional Quick Notices from authentic website */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                  <div className="flex items-center gap-2 text-[11px] text-blue-700 font-semibold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#183F91]" />
                    ADMISSION OPEN 2025–26
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    Online admission portal active for Paramedical & Computer batches.
                  </p>
                  <Link
                    href="/online-admission"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#183F91] hover:underline mt-2"
                  >
                    <span>Apply Online</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-[#F5F7FC] hover:bg-blue-100 text-[#183F91] text-xs font-bold py-2.5 rounded-xl transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Verify Study Center Status</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Blog Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogs.slice(0, 4).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card shadow-card-hover border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={post.featured_image || '/images/dmlt.jpg'}
                      fallbackSrc="/images/placeholder-course.svg"
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#183F91]">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#102C63] group-hover:text-[#183F91] transition line-clamp-2">
                      <Link href={`/news/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/news/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183F91] group-hover:text-[#D52D2D] transition"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
