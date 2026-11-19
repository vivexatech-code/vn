'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart, Save, CheckCircle2, AlertCircle, RefreshCw,
  QrCode, Landmark, Settings, Bell, ExternalLink, Download
} from 'lucide-react';

export default function DonationSettingsClient() {
  const [formData, setFormData] = useState({
    popup_enabled: true,
    popup_heading: 'Your Small Help Can Make a Big Difference.',
    popup_description: 'Help us provide education, food and essential support to children and families in need.',
    popup_delay_seconds: 15,
    popup_repeat_interval_seconds: 150,
    popup_image_url: '/images/ngo/hero-children-study.jpg',
    popup_quick_amounts: '101,251,501,1001,2501',
    popup_button_text: 'Donate Now',

    bank_name: 'Punjab National Bank (PNB)',
    bank_account: '4123000100987654',
    bank_ifsc: 'PUNB0123400',
    bank_holder: 'VN Vidhyapeeth Educational & Social Welfare Trust',
    upi_id: 'vnvidhyapeeth@pnb',
    qr_code_url: '/images/ngo/donation-banner.jpg',

    payment_gateway_mode: 'all',
    default_campaign: 'Wherever Most Needed'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/donation-settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setFormData({
        popup_enabled: Boolean(data.popup_enabled),
        popup_heading: data.popup_heading || '',
        popup_description: data.popup_description || '',
        popup_delay_seconds: data.popup_delay_seconds ?? 15,
        popup_repeat_interval_seconds: data.popup_repeat_interval_seconds ?? 150,
        popup_image_url: data.popup_image_url || '/images/ngo/hero-children-study.jpg',
        popup_quick_amounts: data.popup_quick_amounts || '101,251,501,1001,2501',
        popup_button_text: data.popup_button_text || 'Donate Now',

        bank_name: data.bank_name || '',
        bank_account: data.bank_account || '',
        bank_ifsc: data.bank_ifsc || '',
        bank_holder: data.bank_holder || '',
        upi_id: data.upi_id || '',
        qr_code_url: data.qr_code_url || '',

        payment_gateway_mode: data.payment_gateway_mode || 'all',
        default_campaign: data.default_campaign || 'Wherever Most Needed'
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading settings';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/donation-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');

      setStatusMsg({ type: 'success', text: 'All donation and popup settings updated successfully!' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save';
      setStatusMsg({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 text-sm">
        Loading donation configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#102C63]">
            Donation Settings &amp; Smart Popup Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure automatic donation popups, recurring reminder intervals, bank transfer info, UPI QR, and payment gateway options.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/donations"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#183F91] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition"
          >
            <span>View Donations</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <a
            href="/api/donations/export"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Status Feedback */}
      {statusMsg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Smart Donation Popup Controls */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D52D2D] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#102C63]">
                  Smart Timed Donation Popup
                </h3>
                <span className="text-xs text-slate-500">
                  Automatic non-intrusive popup for visitors spending time on the site
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.popup_enabled}
                onChange={(e) => setFormData({ ...formData, popup_enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#183F91]"></div>
              <span className="ml-2 text-xs font-semibold text-slate-700">
                {formData.popup_enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Initial Popup Delay (Seconds):
              </label>
              <input
                type="number"
                min="3"
                max="300"
                value={formData.popup_delay_seconds}
                onChange={(e) => setFormData({ ...formData, popup_delay_seconds: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Recommended: 15 seconds</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Repeat Reminder Interval (Seconds):
              </label>
              <input
                type="number"
                min="30"
                max="1800"
                value={formData.popup_repeat_interval_seconds}
                onChange={(e) => setFormData({ ...formData, popup_repeat_interval_seconds: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Recommended: 150 seconds (2.5 minutes)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Popup Headline:
            </label>
            <input
              type="text"
              value={formData.popup_heading}
              onChange={(e) => setFormData({ ...formData, popup_heading: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Popup Description:
            </label>
            <textarea
              rows={2}
              value={formData.popup_description}
              onChange={(e) => setFormData({ ...formData, popup_description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quick Donation Amounts (Comma-Separated):
              </label>
              <input
                type="text"
                value={formData.popup_quick_amounts}
                onChange={(e) => setFormData({ ...formData, popup_quick_amounts: e.target.value })}
                placeholder="101,251,501,1001,2501"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Popup Photograph URL:
              </label>
              <input
                type="text"
                value={formData.popup_image_url}
                onChange={(e) => setFormData({ ...formData, popup_image_url: e.target.value })}
                placeholder="/images/ngo/hero-children-study.jpg"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Copy any photo URL from <Link href="/admin/media" className="text-[#183F91] underline">Media Library</Link>
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Bank Transfer & UPI Details */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#183F91] flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#102C63]">
                Direct Bank Transfer &amp; UPI Configuration
              </h3>
              <span className="text-xs text-slate-500">
                Official trust accounts displayed across donation modals and footer
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bank Name:
              </label>
              <input
                type="text"
                value={formData.bank_name}
                onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Account Holder Name:
              </label>
              <input
                type="text"
                value={formData.bank_holder}
                onChange={(e) => setFormData({ ...formData, bank_holder: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bank Account Number:
              </label>
              <input
                type="text"
                value={formData.bank_account}
                onChange={(e) => setFormData({ ...formData, bank_account: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bank IFSC Code:
              </label>
              <input
                type="text"
                value={formData.bank_ifsc}
                onChange={(e) => setFormData({ ...formData, bank_ifsc: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none font-mono uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official UPI ID:
              </label>
              <input
                type="text"
                value={formData.upi_id}
                onChange={(e) => setFormData({ ...formData, upi_id: e.target.value })}
                placeholder="vnvidhyapeeth@pnb"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                UPI QR Code Image URL:
              </label>
              <input
                type="text"
                value={formData.qr_code_url}
                onChange={(e) => setFormData({ ...formData, qr_code_url: e.target.value })}
                placeholder="/images/ngo/donation-banner.jpg"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Gateway & Campaign Defaults */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#102C63]">
                Payment Gateway &amp; Campaign Defaults
              </h3>
              <span className="text-xs text-slate-500">
                Payment channels and default fund allocation
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Campaign Allocation:
              </label>
              <input
                type="text"
                value={formData.default_campaign}
                onChange={(e) => setFormData({ ...formData, default_campaign: e.target.value })}
                placeholder="Wherever Most Needed"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Channels Supported:
              </label>
              <select
                value={formData.payment_gateway_mode}
                onChange={(e) => setFormData({ ...formData, payment_gateway_mode: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white font-medium"
              >
                <option value="all">All Methods (UPI Intent, UPI QR, Cards/NetBank, Bank Transfer)</option>
                <option value="upi_qr">UPI &amp; QR Only</option>
                <option value="bank_only">Direct Bank Transfer Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Donation Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
