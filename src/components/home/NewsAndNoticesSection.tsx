import React from 'react';
import Link from 'next/link';
import { NewsBlog } from '@/lib/data';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface NewsAndNoticesSectionProps {
  articles: NewsBlog[];
}

export default function NewsAndNoticesSection({ articles }: NewsAndNoticesSectionProps) {
  if (!articles || articles.length === 0) return null;

  const displayArticles = articles.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-white" id="news" aria-label="Latest News and Field Updates">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
              <span>Updates from the Ground</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
              Latest Distribution Drives &amp; News
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Reports from our recent school stationery handovers, emergency grocery distributions, and community welfare initiatives.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#183F91] hover:text-[#D52D2D] transition-colors whitespace-nowrap"
          >
            <span>View all updates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={art.featured_image || '/images/ngo/initiative-stationery.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={art.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#102C63]">
                    {art.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3 h-3 text-[#D52D2D]" />
                    <span>{formatDate(art.published_at)}</span>
                  </div>

                  <h3 className="font-bold text-base text-[#102C63] leading-snug line-clamp-2">
                    <Link href={`/news/${art.slug}`} className="hover:text-[#183F91] transition-colors">
                      {art.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/news/${art.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#183F91] hover:text-[#D52D2D] transition-colors"
                >
                  <span>Read update</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
