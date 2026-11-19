'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Plus, Edit, Trash2, Globe, ExternalLink,
  Upload, CheckCircle, XCircle, Building, X
} from 'lucide-react';
import { Partner } from '@/lib/data';

interface PartnersManagerProps {
  initialPartners: Partner[];
}

export default function PartnersManager({ initialPartners }: PartnersManagerProps) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    logo_url: '/images/partner1.jpg',
    website_url: '',
    category: 'Authorized Partner',
    description: '',
    order_index: 0,
    is_active: 1
  });

  const handleOpenAdd = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      logo_url: '/images/partner1.jpg',
      website_url: '',
      category: 'Authorized Partner',
      description: '',
      order_index: partners.length + 1,
      is_active: 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Partner) => {
    setEditingPartner(p);
    setFormData({
      name: p.name,
      logo_url: p.logo_url,
      website_url: p.website_url || '',
      category: p.category || 'Authorized Partner',
      description: p.description || '',
      order_index: p.order_index,
      is_active: p.is_active
    });
    setModalOpen(true);
  };

  const handleUploadLogo = async (file: File) => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('folder', 'partners');

    setUploadingLogo(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setFormData(prev => ({ ...prev, logo_url: data.url }));
    } catch {
      alert('Failed to upload logo.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.logo_url) {
      alert('Partner name and logo are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingPartner) {
        const res = await fetch(`/api/partners/${editingPartner.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Failed to update partner');

        setPartners(prev =>
          prev.map(p => (p.id === editingPartner.id ? { ...p, ...formData } : p))
        );
      } else {
        const res = await fetch('/api/partners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error('Failed to create partner');

        setPartners(prev => [...prev, { id: data.id, ...formData }]);
      }
      setModalOpen(false);
    } catch {
      alert('Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this partner logo?')) return;
    try {
      const res = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setPartners(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete partner.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Our Partners &amp; Study Centres
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage institutional partners, healthcare councils, and authorized training center logos shown on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#183F91] hover:bg-[#102C63] text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(partner => (
          <div
            key={partner.id}
            className={`bg-white rounded-2xl p-5 border shadow-sm transition hover:shadow-md ${
              partner.is_active ? 'border-slate-200' : 'border-slate-200 opacity-60'
            }`}
          >
            {/* Logo Display */}
            <div className="relative h-28 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center p-3 mb-4">
              <Image
                src={partner.logo_url}
                alt={partner.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {partner.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">Order: #{partner.order_index}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-sm">{partner.name}</h3>
              {partner.description && (
                <p className="text-xs text-slate-500 line-clamp-2">{partner.description}</p>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span
                className={`inline-flex items-center gap-1 font-semibold ${
                  partner.is_active ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {partner.is_active ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {partner.is_active ? 'Visible on Site' : 'Hidden'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(partner)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#183F91] transition"
                  title="Edit Partner"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  title="Delete Partner"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 bg-[#102C63] text-white">
              <h3 className="font-bold text-base">
                {editingPartner ? 'Edit Partner Details' : 'Add New Partner Logo'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Partner / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Healthcare Council"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                />
              </div>

              {/* Logo URL / File Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Partner Logo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src={formData.logo_url}
                      alt="Logo preview"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      required
                      placeholder="/images/partner1.jpg"
                      value={formData.logo_url}
                      onChange={e => setFormData({ ...formData, logo_url: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingLogo ? 'Uploading...' : 'Upload Logo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingLogo}
                        className="hidden"
                        onChange={e => e.target.files?.[0] && handleUploadLogo(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Healthcare Council"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={e => setFormData({ ...formData, order_index: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.org"
                  value={formData.website_url}
                  onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="partnerActive"
                  checked={formData.is_active === 1}
                  onChange={e => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 text-[#183F91] rounded border-slate-300"
                />
                <label htmlFor="partnerActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Display this partner logo publicly on homepage
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || uploadingLogo}
                  className="px-5 py-2 bg-[#183F91] hover:bg-[#102C63] text-white rounded-xl font-semibold text-xs shadow-md transition disabled:opacity-60"
                >
                  {isSubmitting ? 'Saving...' : editingPartner ? 'Update Partner' : 'Add Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
