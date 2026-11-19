'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Bell, Save, CheckCircle2, Clock, Upload,
  Eye, GraduationCap, X, Send
} from 'lucide-react';
import { PopupSettings } from '@/lib/data';

interface PopupSettingsManagerProps {
  initialSettings: PopupSettings;
}

export default function PopupSettingsManager({ initialSettings }: PopupSettingsManagerProps) {
  const [settings, setSettings] = useState<PopupSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleUploadBanner = async (file: File) => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('folder', 'banners');

    setUploadingImage(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setSettings(prev => ({ ...prev, image_url: data.url }));
    } catch {
      alert('Failed to upload banner image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    try {
      const res = await fetch('/api/popup-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error('Failed to update settings');
      setSuccessMsg('Popup settings saved successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Automatic Admissions Popup Configuration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure the modal that appears to new prospective students with counseling enquiry fields.
          </p>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-xl border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handleSave} className="space-y-6 text-sm">
            {/* Enable / Disable Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block text-sm">Enable Automatic Popup</span>
                <span className="text-xs text-slate-500">
                  When enabled, prospective students will see this enquiry popup upon landing on the site.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.is_enabled === 1}
                  onChange={e => setSettings({ ...settings, is_enabled: e.target.checked ? 1 : 0 })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#183F91]"></div>
              </label>
            </div>

            {/* Heading */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Modal Main Heading <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={settings.heading}
                onChange={e => setSettings({ ...settings, heading: e.target.value })}
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Supporting Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={settings.description}
                onChange={e => setSettings({ ...settings, description: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none resize-none"
              />
            </div>

            {/* Delay & Frequency Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Popup Delay (Seconds)
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={settings.delay_seconds}
                    onChange={e => setSettings({ ...settings, delay_seconds: parseInt(e.target.value, 10) || 4 })}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Recommended: 4 to 6 seconds after page loads
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Display Frequency
                </label>
                <select
                  value={settings.frequency}
                  onChange={e => setSettings({ ...settings, frequency: e.target.value as PopupSettings['frequency'] })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white text-slate-700"
                >
                  <option value="once_session">Once per Visitor Session (Recommended)</option>
                  <option value="once_day">Once every 24 Hours</option>
                  <option value="always">Always on Every Page Visit (Testing Only)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Prevents annoying repeat popups for ongoing visitors
                </span>
              </div>
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Top Educational Banner Image
              </label>
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex-shrink-0">
                  <Image
                    src={settings.image_url || '/images/newslider1.jpg'}
                    alt="Banner preview"
                    fill
                    className="object-cover opacity-60"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <input
                    type="text"
                    value={settings.image_url}
                    onChange={e => setSettings({ ...settings, image_url: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      className="hidden"
                      onChange={e => e.target.files?.[0] && handleUploadBanner(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* CTA Button Text */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Submit Button CTA Text
              </label>
              <input
                type="text"
                value={settings.button_text}
                onChange={e => setSettings({ ...settings, button_text: e.target.value })}
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#183F91] hover:bg-[#102C63] text-white font-semibold text-sm rounded-xl shadow-md transition disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Settings...' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Visual Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#183F91]" />
              Live Visitor Preview
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${settings.is_enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
              {settings.is_enabled ? 'Active' : 'Disabled'}
            </span>
          </div>

          <div className="bg-slate-900/40 p-4 rounded-3xl border border-slate-300">
            <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 text-xs">
              {/* Modal Top Header Preview */}
              <div className="relative h-28 w-full bg-slate-900 flex flex-col justify-end p-4 text-white overflow-hidden">
                <Image
                  src={settings.image_url || '/images/newslider1.jpg'}
                  alt="Banner preview"
                  fill
                  className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C63] via-[#102C63]/70 to-transparent" />

                <div className="relative z-10 space-y-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D52D2D] text-white uppercase">
                    <GraduationCap className="w-3 h-3" />
                    Admission Helpline
                  </span>
                  <h4 className="text-sm font-bold text-white leading-tight">{settings.heading}</h4>
                  <p className="text-[10px] text-blue-100 line-clamp-1">{settings.description}</p>
                </div>
              </div>

              {/* Form Fields Dummy Preview */}
              <div className="p-4 space-y-2.5">
                <div>
                  <span className="block text-[10px] font-semibold text-slate-600">Full Name *</span>
                  <div className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded text-slate-400 text-[11px]">
                    Student Name
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-600">Mobile / WhatsApp *</span>
                  <div className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded text-slate-400 text-[11px]">
                    10-digit mobile number
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-600">Interested Course</span>
                  <div className="w-full py-1.5 px-2 bg-slate-50 border border-slate-200 rounded text-slate-700 text-[11px]">
                    Diploma in Medical Laboratory Technology (DMLT)
                  </div>
                </div>
                <div className="pt-1">
                  <div className="w-full py-2 bg-[#183F91] text-white rounded text-center font-semibold text-[11px] flex items-center justify-center gap-1.5">
                    <Send className="w-3 h-3" />
                    {settings.button_text || 'Submit Enquiry'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
