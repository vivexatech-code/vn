import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getNewsBlogs } from '@/lib/data';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Blog & Articles | VN Vidhyapeeth',
  description: 'Articles, healthcare career guides, and technical insights from faculty and industry mentors at VN Vidhyapeeth.'
};


export default function BlogPage() {
  const blogs = getNewsBlogs({ onlyPublished: true });

  return (
    <div>
      <PageHeader
        badge="Insights & Guidance"
        title="Educational Blog & Insights"
        subtitle="In-depth articles covering allied healthcare opportunities, study strategies, and technical trade insights."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-16 sm:py-20 bg-[#F5F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card shadow-card-hover border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={item.featured_image || '/images/dmlt.jpg'}
                      fallbackSrc="/images/placeholder-course.svg"
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#183F91]">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(item.published_at)}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#102C63] group-hover:text-[#183F91] transition line-clamp-2">
                      <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#183F91] group-hover:text-[#D52D2D] transition"
                  >
                    <span>Read Full Story</span>
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
