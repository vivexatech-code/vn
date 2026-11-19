'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroSlide } from '@/lib/data';
import { Plus, Edit2, Trash2, Check, X, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('');
  const [ctaPrimaryText, setCtaPrimaryText] = useState('Explore Our Initiatives');
  const [ctaPrimaryLink, setCtaPrimaryLink] = useState('/initiatives');
  const [ctaSecondaryText, setCtaSecondaryText] = useState('Donate Now');
  const [ctaSecondaryLink, setCtaSecondaryLink] = useState('/donate');
  const [imageUrl, setImageUrl] = useState('/images/ngo/hero-children-study.jpg');
  const [orderIndex, setOrderIndex] = useState(1);
  const [isActive, setIsActive] = useState(1);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hero-slides?all=true');
      const data = await res.json();
      if (Array.isArray(data)) setSlides(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const openCreateModal = () => {
    setEditingSlide(null);
    setTitle('');
    setSubtitle('');
    setBadge('Educational & Social Welfare Trust');
    setCtaPrimaryText('Explore Our Initiatives');
    setCtaPrimaryLink('/initiatives');
    setCtaSecondaryText('Donate Now');
    setCtaSecondaryLink('/donate');
    setImageUrl('/images/ngo/hero-children-study.jpg');
    setOrderIndex(slides.length + 1);
    setIsActive(1);
    setModalOpen(true);
  };

  const openEditModal = (s: HeroSlide) => {
    setEditingSlide(s);
    setTitle(s.title);
    setSubtitle(s.subtitle);
    setBadge(s.badge || '');
    setCtaPrimaryText(s.cta_primary_text || '');
    setCtaPrimaryLink(s.cta_primary_link || '');
    setCtaSecondaryText(s.cta_secondary_text || '');
    setCtaSecondaryLink(s.cta_secondary_link || '');
    setImageUrl(s.image_url);
    setOrderIndex(s.order_index);
    setIsActive(s.is_active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      subtitle,
      badge,
      cta_primary_text: ctaPrimaryText,
      cta_primary_link: ctaPrimaryLink,
      cta_secondary_text: ctaSecondaryText,
      cta_secondary_link: ctaSecondaryLink,
      image_url: imageUrl,
      order_index: Number(orderIndex),
      is_active: isActive
    };

    try {
      if (editingSlide) {
        await fetch('/api/hero-slides', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingSlide.id, ...payload })
        });
      } else {
        await fetch('/api/hero-slides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setModalOpen(false);
      fetchSlides();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this hero slide?')) return;
    try {
      await fetch(`/api/hero-slides?id=${id}`, { method: 'DELETE' });
      fetchSlides();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (s: HeroSlide) => {
    try {
      await fetch('/api/hero-slides', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: s.id, is_active: s.is_active === 1 ? 0 : 1 })
      });
      fetchSlides();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-[#102C63]">
            Hero Slideshow Builder
          </h1>
          <p className="text-xs text-slate-500">
            Configure homepage banners, slideshow images, headlines, and call-to-action buttons.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Slide</span>
        </button>
      </div>

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-900">
                <Image src={s.image_url} alt={s.title} fill className="object-cover opacity-80" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white">
                  Order: #{s.order_index}
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleActive(s)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                      s.is_active === 1 ? 'bg-green-500 text-white' : 'bg-slate-400 text-white'
                    }`}
                  >
                    {s.is_active === 1 ? 'Active' : 'Disabled'}
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-2">
                {s.badge && (
                  <span className="text-[10px] font-bold text-red-600 block uppercase tracking-wider">
                    {s.badge}
                  </span>
                )}
                <h3 className="font-serif font-bold text-base text-[#102C63] line-clamp-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {s.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span>CTA 1: {s.cta_primary_text || 'None'}</span>
                  <span>•</span>
                  <span>CTA 2: {s.cta_secondary_text || 'None'}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
              <span className="text-[11px] text-slate-400 font-mono">ID: {s.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-2 text-slate-600 hover:text-[#183F91] hover:bg-blue-50 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-serif font-black text-xl text-[#102C63]">
                {editingSlide ? 'Edit Hero Slide' : 'Add New Slide'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Top Badge Pill</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. ISO 9001:2015 Certified • Indian Trust Act 1882"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Slide Main Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Education for Everyone, Employment for All"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subtitle / Supporting Description *</label>
                <textarea
                  required
                  rows={3}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Brief description that appears under the main headline"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary CTA Text</label>
                  <input
                    type="text"
                    value={ctaPrimaryText}
                    onChange={(e) => setCtaPrimaryText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary CTA Link</label>
                  <input
                    type="text"
                    value={ctaPrimaryLink}
                    onChange={(e) => setCtaPrimaryLink(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Secondary CTA Text</label>
                  <input
                    type="text"
                    value={ctaSecondaryText}
                    onChange={(e) => setCtaSecondaryText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Secondary CTA Link</label>
                  <input
                    type="text"
                    value={ctaSecondaryLink}
                    onChange={(e) => setCtaSecondaryLink(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Slide Image Path *</label>
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/newslider1.jpg"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Order Index (Sort)</label>
                  <input
                    type="number"
                    value={orderIndex}
                    onChange={(e) => setOrderIndex(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive === 1}
                    onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                    className="rounded text-green-600"
                  />
                  <span>Slide is Active on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#183F91] text-white px-6 py-2 rounded-xl font-semibold shadow disabled:opacity-70 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Slide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
