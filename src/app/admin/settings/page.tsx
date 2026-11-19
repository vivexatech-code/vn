'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SiteSettings } from '@/lib/data';
import { Settings, Save, Check, Loader2, Building, Landmark, Phone, Mail, QrCode } from 'lucide-react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form Fields
  const [siteName, setSiteName] = useState('');
  const [tagline, setTagline] = useState('');
  const [trustName, setTrustName] = useState('');
  const [actRegistration, setActRegistration] = useState('');
  const [isoCertified, setIsoCertified] = useState('');
  const [nitiMsme, setNitiMsme] = useState('');

  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  const [headOfficeAddress, setHeadOfficeAddress] = useState('');
  const [registeredOfficeAddress, setRegisteredOfficeAddress] = useState('');

  const [logoUrl, setLogoUrl] = useState('');
  const [logoFullUrl, setLogoFullUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [bankHolder, setBankHolder] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [upiId, setUpiId] = useState('');

  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data: SiteSettings = await res.json();
      if (data) {
        setSiteName(data.site_name || '');
        setTagline(data.tagline || '');
        setTrustName(data.trust_name || '');
        setActRegistration(data.act_registration || '');
        setIsoCertified(data.iso_certified || '');
        setNitiMsme(data.niti_msme || '');
        setEmail(data.email || '');
        setPhone1(data.phone1 || '');
        setPhone2(data.phone2 || '');
        setWhatsapp(data.whatsapp || '');
        setWhatsappNumber(data.whatsapp_number || '+917015358183');
        setWhatsappMessage(data.whatsapp_message || 'Hello VN Vidhyapeeth, I would like to inquire about course admissions.');
        setHeadOfficeAddress(data.head_office_address || '');
        setRegisteredOfficeAddress(data.registered_office_address || '');
        setLogoUrl(data.logo_url || '/images/logo.webp');
        setLogoFullUrl(data.logo_full_url || '/images/logo-full.jpg');
        setQrCodeUrl(data.qr_code_url || '/images/payment-qr.jpg');
        setBankName(data.bank_name || '');
        setBankAccount(data.bank_account || '');
        setBankIfsc(data.bank_ifsc || '');
        setBankHolder(data.bank_holder || '');
        setBankBranch(data.bank_branch || '');
        setUpiId(data.upi_id || '');
        setFacebookUrl(data.facebook_url || '');
        setInstagramUrl(data.instagram_url || '');
        setTwitterUrl(data.twitter_url || '');
        setYoutubeUrl(data.youtube_url || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_name: siteName,
          tagline,
          trust_name: trustName,
          act_registration: actRegistration,
          iso_certified: isoCertified,
          niti_msme: nitiMsme,
          email,
          phone1,
          phone2,
          whatsapp,
          whatsapp_number: whatsappNumber,
          whatsapp_message: whatsappMessage,
          head_office_address: headOfficeAddress,
          registered_office_address: registeredOfficeAddress,
          logo_url: logoUrl,
          logo_full_url: logoFullUrl,
          qr_code_url: qrCodeUrl,
          bank_name: bankName,
          bank_account: bankAccount,
          bank_ifsc: bankIfsc,
          bank_holder: bankHolder,
          bank_branch: bankBranch,
          upi_id: upiId,
          facebook_url: facebookUrl,
          instagram_url: instagramUrl,
          twitter_url: twitterUrl,
          youtube_url: youtubeUrl
        })
      });
      setSavedSuccess(true);
      fetchSettings();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[#183F91]" />
        <span>Loading institutional settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-[#102C63]">
            Website Customization & Institutional Settings
          </h1>
          <p className="text-xs text-slate-500">
            Configure organization information, contact phone numbers, office addresses, and bank deposit coordinates.
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3.5 py-1.5 rounded-full font-semibold border border-green-200">
            <Check className="w-4 h-4" />
            <span>Updated Successfully!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Brand & Organization Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif font-bold text-lg text-[#102C63]">
              1. Brand & Legal Framework
            </h2>
            <p className="text-xs text-slate-400">
              Institution name, trust deed registration, and quality certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization / Brand Name *</label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Trust Description</label>
              <input
                type="text"
                value={trustName}
                onChange={(e) => setTrustName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Act Registration</label>
              <input
                type="text"
                value={actRegistration}
                onChange={(e) => setActRegistration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ISO Certification</label>
              <input
                type="text"
                value={isoCertified}
                onChange={(e) => setIsoCertified(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NITI Aayog & MSME Status</label>
              <input
                type="text"
                value={nitiMsme}
                onChange={(e) => setNitiMsme(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information & Official Addresses */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif font-bold text-lg text-[#102C63]">
              2. Official Contacts & Addresses
            </h2>
            <p className="text-xs text-slate-400">
              Verified office addresses, email, and candidate helplines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Mobile / Helpline *</label>
              <input
                type="text"
                required
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Secondary Mobile</label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Helpline Number</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Floating WhatsApp Button Chat Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+917015358183"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Floating WhatsApp Pre-filled Enquiry Message</label>
              <input
                type="text"
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                placeholder="Hello VN Vidhyapeeth, I would like to inquire about course admissions."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Head Office Address (Documents Verification) *</label>
              <input
                type="text"
                required
                value={headOfficeAddress}
                onChange={(e) => setHeadOfficeAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Registered Office Address *</label>
              <input
                type="text"
                required
                value={registeredOfficeAddress}
                onChange={(e) => setRegisteredOfficeAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bank Details & UPI QR */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif font-bold text-lg text-[#102C63]">
              3. Bank Deposit Details & UPI Configuration
            </h2>
            <p className="text-xs text-slate-400">
              Official institutional account for student admission and examination fee deposits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Account Number</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">IFSC Code</label>
              <input
                type="text"
                value={bankIfsc}
                onChange={(e) => setBankIfsc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Account Holder Name</label>
              <input
                type="text"
                value={bankHolder}
                onChange={(e) => setBankHolder(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Branch</label>
              <input
                type="text"
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Payment QR Code Image Path</label>
              <input
                type="text"
                value={qrCodeUrl}
                onChange={(e) => setQrCodeUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Media Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif font-bold text-lg text-[#102C63]">
              4. Social Media Channels
            </h2>
            <p className="text-xs text-slate-400">
              Links for the official footer and header connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Twitter / X URL</label>
              <input
                type="text"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#183F91] hover:bg-[#102C63] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2 disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All Website Customizations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
