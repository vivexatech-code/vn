import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import { getNewsBlogBySlug, getNewsBlogs } from '@/lib/data';
import { Calendar, User, Eye, ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsBlogBySlug(slug);
  if (!post) return { title: 'Article Not Found | VN Vidhyapeeth' };

  return {
    title: `${post.title} | VN Vidhyapeeth`,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsBlogBySlug(slug);
  if (!post) notFound();

  const recentPosts = getNewsBlogs({ onlyPublished: true, limit: 4 })
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        badge={post.category}
        title={post.title}
        breadcrumbs={[
          { label: 'News & Updates', href: '/news' },
          { label: post.title }
        ]}
      />

      <section className="py-16 sm:py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Meta Info */}
              <div className="flex items-center gap-6 text-xs text-[#78665E] pb-4 border-b border-[#EFE4DC] flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-[#C87552]" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-[#C87552]" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#78665E]" />
                  {post.views_count} views
                </span>
              </div>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-[#EFE4DC]">
                  <ImageWithFallback
                    src={post.featured_image}
                    fallbackSrc="/images/placeholder-course.svg"
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Excerpt Lead */}
              <div className="p-5 bg-white rounded-2xl border-l-4 border-[#C87552] text-base text-[#49352D] font-medium leading-relaxed shadow-xs">
                {post.excerpt}
              </div>

              {/* Body Content */}
              <div className="text-[#49352D] text-base leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {post.content}
              </div>

              {/* Share / Back Link */}
              <div className="pt-8 border-t border-[#EFE4DC] flex items-center justify-between">
                <Link
                  href="/news"
                  className="text-xs font-bold text-[#C87552] hover:underline"
                >
                  ← Back to All Updates
                </Link>
                <div className="text-xs text-[#78665E]">
                  Published by VN Vidhyapeeth Editorial Team
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Welfare Action Box */}
              <div className="bg-white p-6 rounded-3xl border border-[#EFE4DC] shadow-xs space-y-4">
                <h3 className="font-bold text-lg text-[#49352D]">
                  Support Our Welfare Mission
                </h3>
                <p className="text-xs text-[#78665E] leading-relaxed">
                  Every contribution directly supports our free children&apos;s education, daily meals, and stationery distribution drives across vulnerable communities.
                </p>
                <Link
                  href="/donate"
                  className="w-full flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl text-xs font-bold shadow transition"
                >
                  <span>Donate to Support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Recent Articles */}
              {recentPosts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#49352D]">
                    Recent Updates
                  </h3>
                  <div className="space-y-3">
                    {recentPosts.map((r) => (
                      <Link
                        key={r.id}
                        href={`/news/${r.slug}`}
                        className="block p-4 rounded-2xl bg-white border border-[#EFE4DC] hover:border-[#C87552] transition shadow-xs group"
                      >
                        <span className="text-[10px] text-[#78665E] block mb-1">
                          {formatDate(r.published_at)} • {r.category}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#49352D] group-hover:text-[#C87552] transition line-clamp-2">
                          {r.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
