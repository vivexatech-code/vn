'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { NewsBlog } from '@/lib/data';
import { Plus, Edit2, Trash2, Calendar, X, Loader2, FileText, BellRing } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsBlog[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsBlog | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Admissions');
  const [type, setType] = useState<'news' | 'blog' | 'notice' | 'announcement'>('news');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('/images/dmlt.jpg');
  const [isPublished, setIsPublished] = useState(1);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news?all=true');
      const data = await res.json();
      if (Array.isArray(data)) setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle('');
    setSlug('');
    setCategory('Admissions');
    setType('notice');
    setExcerpt('');
    setContent('');
    setFeaturedImage('/images/dmlt.jpg');
    setIsPublished(1);
    setModalOpen(true);
  };

  const openEditModal = (a: NewsBlog) => {
    setEditingArticle(a);
    setTitle(a.title);
    setSlug(a.slug);
    setCategory(a.category);
    setType(a.type);
    setExcerpt(a.excerpt);
    setContent(a.content);
    setFeaturedImage(a.featured_image || '/images/dmlt.jpg');
    setIsPublished(a.is_published);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      category,
      type,
      excerpt,
      content,
      featured_image: featuredImage,
      is_published: isPublished
    };

    try {
      if (editingArticle) {
        await fetch(`/api/news/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setModalOpen(false);
      fetchArticles();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice/article?')) return;
    try {
      await fetch(`/api/news/${id}`, { method: 'DELETE' });
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-[#102C63]">
            News, Circulars & Blog Management
          </h1>
          <p className="text-xs text-slate-500">
            Publish institutional notices, exam schedules, and informative educational articles.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Notice / Post</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#183F91]" />
            <span>Loading articles...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No published notices or articles yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Title & Excerpt</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 line-clamp-1">{item.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-md">{item.excerpt}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded text-[10px] uppercase">
                        {item.type}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {item.category}
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {formatDate(item.published_at)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.is_published === 1 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.is_published === 1 ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 text-slate-600 hover:text-[#183F91] hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-serif font-black text-xl text-[#102C63]">
                {editingArticle ? 'Edit Article' : 'Publish New Notice or Blog'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Admission Open for Academic Session 2025–2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="notice">Notice</option>
                    <option value="announcement">Announcement</option>
                    <option value="news">News</option>
                    <option value="blog">Blog</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Admissions, Examination, Healthcare"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="/images/dmlt.jpg"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary appearing in lists and card previews"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Content / Article Body *</label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full text of the announcement or article..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-sans leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished === 1}
                    onChange={(e) => setIsPublished(e.target.checked ? 1 : 0)}
                    className="rounded text-green-600"
                  />
                  <span>Publish to Live Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#183F91] text-white px-6 py-2 rounded-xl font-semibold shadow disabled:opacity-70 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
