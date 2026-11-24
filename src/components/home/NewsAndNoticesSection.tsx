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
    <section className="py-20 sm:py-28 bg-[#FFFDFB]" id="news" aria-label="Latest News and Field Updates">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
              <span>Updates from the ground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight">
              Latest Distribution Drives &amp; News
            </h2>
            <p className="mt-2.5 text-base text-[#78665E] leading-relaxed">
              Reports from our recent school stationery handovers, emergency grocery distributions, and community welfare initiatives.
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#C87552] hover:text-[#B56140] transition-colors whitespace-nowrap"
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
              className="bg-white rounded-2xl overflow-hidden border border-[#EFE4DC] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-[#F4D6C6]/20 overflow-hidden">
                  <ImageWithFallback
                    src={art.featured_image || '/images/ngo/initiative-stationery.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={art.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#49352D]/90 text-white px-2 py-0.5 rounded-md text-[11px] font-medium">
                    {art.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#78665E] mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>{formatDate(art.published_at)}</span>
                  </div>

                  <h3 className="font-semibold text-base text-[#49352D] leading-snug line-clamp-2">
                    <Link href={`/news/${art.slug}`} className="hover:text-[#C87552] transition-colors">
                      {art.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-[#78665E] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/news/${art.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#C87552] hover:text-[#B56140] transition-colors"
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
