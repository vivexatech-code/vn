import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getNewsBlogs } from '@/lib/data';
import { Calendar, ArrowRight, BellRing } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Welfare News & Updates | VN Vidhyapeeth Social Welfare Trust',
  description: 'Official announcements, field activity reports, free stationery distributions, and hunger relief drives from VN Vidhyapeeth.'
};

export default function NewsPage() {
  const articles = getNewsBlogs({ onlyPublished: true });

  return (
    <div>
      <PageHeader
        badge="Field Bulletins &amp; Welfare News"
        title="News, Distribution Events &amp; Updates"
        subtitle="Stay updated with our latest social welfare initiatives, free stationery distribution events, hunger relief drives, and community milestones."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News & Updates' }]}
      />

      <section className="py-16 sm:py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-[#EFE4DC] flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={item.featured_image || '/images/ngo/initiative-stationery.jpg'}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#49352D]/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#78665E] mb-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C87552]" />
                      <span>{formatDate(item.published_at)}</span>
                      <span className="uppercase text-[10px] font-bold text-[#C87552]">• {item.type}</span>
                    </div>

                    <h3 className="font-bold text-lg text-[#49352D] group-hover:text-[#C87552] transition line-clamp-2">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#78665E] mt-2.5 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C87552] hover:text-[#B56140] transition"
                  >
                    <span>Read Full Update</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
