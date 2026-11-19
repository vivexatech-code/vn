import React from 'react';
import Link from 'next/link';
import { NewsBlog } from '@/lib/data';
import { Calendar, ArrowRight, BellRing, Users, Heart } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface NewsAndNoticesSectionProps {
  articles: NewsBlog[];
}

export default function NewsAndNoticesSection({ articles }: NewsAndNoticesSectionProps) {
  if (!articles || articles.length === 0) return null;

  // Split into notices and feature articles
  const notices = articles.filter(a => a.type === 'notice' || a.type === 'announcement');
  const newsItems = articles.filter(a => a.type === 'blog' || a.type === 'news');

  return (
    <section className="py-20 bg-white" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <BellRing className="w-3.5 h-3.5 text-[#183F91]" />
              Welfare News &amp; Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
              Field Activities, Distribution Events &amp; News
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Follow our latest social welfare initiatives, school stationery distributions, community hunger relief drives, and organizational updates.
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
          <div className="lg:col-span-4 bg-[#F7F8FC] rounded-3xl p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <h3 className="font-bold text-base sm:text-lg text-[#102C63]">
                    Action Alerts &amp; Drives
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-[#183F91] bg-white px-2.5 py-1 rounded-full shadow-sm">
                  Active
                </span>
              </div>

              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow transition-all"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                      <Calendar className="w-3 h-3 text-red-500" />
                      <span>{formatDate(notice.published_at)}</span>
                      <span className="text-[#183F91] font-bold uppercase">• {notice.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#102C63] group-hover:text-[#183F91] transition line-clamp-2">
                      <Link href={`/news/${notice.slug}`}>{notice.title}</Link>
                    </h4>
                  </div>
                ))}

                {/* Quick Join as Volunteer Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#102C63] to-[#183F91] text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-bold uppercase">
                    <Users className="w-3.5 h-3.5" />
                    <span>Join Our Ground Volunteer Team</span>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Help us pack stationery kits, distribute nutritious meals, or teach children on weekends.
                  </p>
                  <Link
                    href="/volunteer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl transition"
                  >
                    <span>Register as Volunteer</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: News Cards Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(newsItems.length > 0 ? newsItems : articles).slice(0, 4).map((art) => (
              <div
                key={art.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={art.featured_image || '/images/ngo/initiative-stationery.jpg'}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-[#102C63]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm">
                      {art.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      <span>{formatDate(art.published_at)}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#102C63] group-hover:text-[#183F91] transition line-clamp-2">
                      <Link href={`/news/${art.slug}`}>{art.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50 mt-2">
                  <Link
                    href={`/news/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition"
                  >
                    <span>Read Full Update</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
