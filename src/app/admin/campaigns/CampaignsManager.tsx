'use client';

import React, { useState } from 'react';
import { Campaign } from '@/lib/data';
import { Target, Plus, Edit2, Trash2, Check, X, TrendingUp, Image as ImageIcon } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface CampaignsManagerProps {
  initialCampaigns: Campaign[];
}

export default function CampaignsManager({ initialCampaigns }: CampaignsManagerProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    target_amount: 100000,
    raised_amount: 0,
    short_desc: '',
    full_desc: '',
    image_url: '/images/ngo/campaign-child-education.jpg',
    is_featured: 1,
    is_active: 1
  });

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    setFormData({
      title: '',
      category: 'Education',
      target_amount: 100000,
      raised_amount: 0,
      short_desc: '',
      full_desc: '',
      image_url: '/images/ngo/campaign-child-education.jpg',
      is_featured: 1,
      is_active: 1
    });
    setShowModal(true);
  };

  const handleOpenEdit = (camp: Campaign) => {
    setEditingCampaign(camp);
    setFormData({
      title: camp.title,
      category: camp.category,
      target_amount: camp.target_amount,
      raised_amount: camp.raised_amount,
      short_desc: camp.short_desc,
      full_desc: camp.full_desc || '',
      image_url: camp.image_url || '/images/ngo/campaign-child-education.jpg',
      is_featured: camp.is_featured,
      is_active: camp.is_active
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCampaign) {
        const res = await fetch(`/api/campaigns/${editingCampaign.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Update failed');

        setCampaigns(prev =>
          prev.map(c => c.id === editingCampaign.id ? { ...c, ...formData } : c)
        );
      } else {
        const res = await fetch('/api/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Create failed');

        // Refresh list
        const refreshRes = await fetch('/api/campaigns?all=true');
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setCampaigns(data);
        }
      }
      setShowModal(false);
    } catch {
      alert('Failed to save campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setCampaigns(prev => prev.filter(c => c.id !== id));
    } catch {
      alert('Failed to delete campaign.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-[#183F91]" />
            <span>Welfare Campaigns Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create and oversee fundraising appeals for child education, hunger relief, free stationery, and family support.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          const percentage = Math.min(100, Math.round((camp.raised_amount / camp.target_amount) * 100));

          return (
            <div
              key={camp.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  <ImageWithFallback
                    src={camp.image_url || '/images/ngo/campaign-child-education.jpg'}
                    fallbackSrc="/images/placeholder-general.svg"
                    alt={camp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#102C63]/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {camp.category}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {camp.is_active ? (
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                    ) : (
                      <span className="bg-slate-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Paused</span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-[#102C63] line-clamp-1">{camp.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{camp.short_desc}</p>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-800">₹{camp.raised_amount.toLocaleString('en-IN')}</span>
                      <span className="text-slate-400">Target: ₹{camp.target_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#183F91] to-[#D52D2D]" style={{ width: `${percentage}%` }} />
                    </div>
                    <div className="text-[11px] text-slate-400 text-right">{percentage}% Funded</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleOpenEdit(camp)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#183F91] hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <button
                  onClick={() => handleDelete(camp.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-[#102C63]">
                {editingCampaign ? 'Edit Welfare Campaign' : 'Create New Welfare Campaign'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Free School Stationery Distribution"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.target_amount}
                    onChange={(e) => setFormData({ ...formData, target_amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Raised Amount (₹)</label>
                <input
                  type="number"
                  value={formData.raised_amount}
                  onChange={(e) => setFormData({ ...formData, raised_amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.short_desc}
                  onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Detailed Story</label>
                <textarea
                  rows={3}
                  value={formData.full_desc}
                  onChange={(e) => setFormData({ ...formData, full_desc: e.target.value })}
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
                  <span>Active Campaign</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.is_featured === 1}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-[#183F91] rounded"
                  />
                  <span>Featured on Homepage</span>
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
                  {loading ? 'Saving...' : 'Save Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
