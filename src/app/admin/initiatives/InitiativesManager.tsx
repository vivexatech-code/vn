'use client';

import React, { useState } from 'react';
import { FocusArea } from '@/lib/data';
import { HeartHandshake, Plus, Edit2, Trash2, Check, X, BookOpen, Utensils, Sparkles, ShieldCheck } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface InitiativesManagerProps {
  initialInitiatives: FocusArea[];
}

export default function InitiativesManager({ initialInitiatives }: InitiativesManagerProps) {
  const [initiatives, setInitiatives] = useState<FocusArea[]>(initialInitiatives);
  const [showModal, setShowModal] = useState(false);
  const [editingInit, setEditingInit] = useState<FocusArea | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Child Welfare',
    description: '',
    icon_name: 'BookOpen',
    image_url: '/images/ngo/initiative-education.jpg',
    link_url: '/initiatives',
    order_index: 0,
    is_active: 1
  });

  const handleOpenCreate = () => {
    setEditingInit(null);
    setFormData({
      title: '',
      category: 'Child Welfare',
      description: '',
      icon_name: 'BookOpen',
      image_url: '/images/ngo/initiative-education.jpg',
      link_url: '/initiatives',
      order_index: initiatives.length + 1,
      is_active: 1
    });
    setShowModal(true);
  };

  const handleOpenEdit = (init: FocusArea) => {
    setEditingInit(init);
    setFormData({
      title: init.title,
      category: init.category,
      description: init.description,
      icon_name: init.icon_name || 'BookOpen',
      image_url: init.image_url || '/images/ngo/initiative-education.jpg',
      link_url: init.link_url || '/initiatives',
      order_index: init.order_index,
      is_active: init.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingInit) {
        const res = await fetch(`/api/initiatives/${editingInit.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Update failed');

        setInitiatives(prev =>
          prev.map(i => i.id === editingInit.id ? { ...i, ...formData } : i)
        );
      } else {
        const res = await fetch('/api/initiatives', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Create failed');

        const refreshRes = await fetch('/api/initiatives');
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setInitiatives(data);
        }
      }
      setShowModal(false);
    } catch {
      alert('Failed to save initiative.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this initiative?')) return;
    try {
      const res = await fetch(`/api/initiatives/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setInitiatives(prev => prev.filter(i => i.id !== id));
    } catch {
      alert('Failed to delete initiative.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-[#183F91]" />
            <span>Core Welfare Initiatives Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the flagship welfare pillars: Education, Food Distribution, Free Stationery, Social Welfare, and Child Development.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Initiative</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((init) => (
          <div
            key={init.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100">
                <ImageWithFallback
                  src={init.image_url || '/images/ngo/initiative-education.jpg'}
                  fallbackSrc="/images/placeholder-general.svg"
                  alt={init.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#102C63]/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {init.category}
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-[#102C63]">{init.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{init.description}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleOpenEdit(init)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#183F91] hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(init.id)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-[#102C63]">
                {editingInit ? 'Edit Initiative' : 'Add New Initiative'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Initiative Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Icon Name</label>
                  <select
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="BookOpen">BookOpen (Education)</option>
                    <option value="Utensils">Utensils (Food Relief)</option>
                    <option value="Sparkles">Sparkles (Stationery)</option>
                    <option value="HeartHandshake">HeartHandshake (Welfare)</option>
                    <option value="ShieldCheck">ShieldCheck (Child Care)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.is_active === 1}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-[#183F91] rounded"
                  />
                  <span>Active Initiative</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#183F91] hover:bg-[#102C63] text-white rounded-xl text-xs font-bold shadow"
                >
                  {loading ? 'Saving...' : 'Save Initiative'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
