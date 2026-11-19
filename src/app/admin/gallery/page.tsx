'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/data';
import { Plus, Trash2, X, Loader2, Video, Image as ImageIcon } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Training');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [url, setUrl] = useState('/images/dmlt.jpg');
  const [caption, setCaption] = useState('');
  const [orderIndex, setOrderIndex] = useState(1);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery?all=true');
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          media_type: mediaType,
          url,
          caption,
          order_index: Number(orderIndex),
          is_active: 1
        })
      });
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-[#102C63]">
            Gallery Media Management
          </h1>
          <p className="text-xs text-slate-500">
            Upload workshop photos, convocation images, and training videos for the public gallery.
          </p>
        </div>

        <button
          onClick={() => {
            setTitle('');
            setCaption('');
            setUrl('/images/dmlt.jpg');
            setOrderIndex(items.length + 1);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 w-full bg-slate-100">
                <Image src={item.url} alt={item.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-[#102C63]">
                  {item.category}
                </div>
                {item.media_type === 'video' && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full shadow">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="p-5 space-y-1">
                <h3 className="font-serif font-bold text-sm text-[#102C63] line-clamp-1">{item.title}</h3>
                {item.caption && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.caption}</p>
                )}
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
              <span className="text-[10px] text-slate-400 font-mono">Order: #{item.order_index}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                title="Delete Media"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-serif font-black text-xl text-[#102C63]">Add Gallery Asset</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Paramedical Lab Practical Demonstration"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Education Programs">Education Programs</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Stationery Distribution">Stationery Distribution</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Community Events">Community Events</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Media Type</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as 'image' | 'video')}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Media URL / Local Path *</label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/images/dmlt.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Caption / Subtitle</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Short description of this moment..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Order Index</label>
                <input
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
                />
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
                  <span>Save Media</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
