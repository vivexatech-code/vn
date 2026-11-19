'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings, Campaign } from '@/lib/data';
import {
  Heart, Landmark, QrCode, CreditCard, CheckCircle2,
  Copy, ShieldCheck, ArrowRight, Printer, Sparkles, BookOpen, Utensils, Smartphone
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface DonatePageClientProps {
  settings: SiteSettings;
  campaigns: Campaign[];
}

export default function DonatePageClient({ settings, campaigns }: DonatePageClientProps) {
  const [selectedTier, setSelectedTier] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('Wherever Most Needed');
  const [paymentMode, setPaymentMode] = useState<string>('UPI (Mobile / QR)');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form states (Email is optional)
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_phone: '',
    donor_email: '',
    pan_number: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<{
    receipt_no: string;
    id: number;
    amount: number;
    date: string;
    campaign: string;
    donor_name: string;
    pan: string;
    status: string;
  } | null>(null);

  const bankName = settings.bank_name || 'Punjab National Bank (PNB)';
  const bankAccount = settings.bank_account || '4123000100987654';
  const bankIfsc = settings.bank_ifsc || 'PUNB0123400';
  const bankHolder = settings.bank_holder || 'VN Vidhyapeeth Educational & Social Welfare Trust';
  const upiId = settings.upi_id || 'vnvidhyapeeth@pnb';
  const qrCode = settings.qr_code_url || '/images/ngo/donation-banner.jpg';

  const amount = customAmount ? Number(customAmount) : selectedTier;

  const quickAmounts = [101, 251, 501, 1001, 2501, 5000];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('VN Vidhyapeeth')}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Donation for ${selectedCampaign}`)}`;

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 10) {
      alert('Please select or enter an amount of at least ₹10.');
      return;
    }

    if (!formData.donor_name.trim()) {
      alert('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.donor_phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 && !formData.donor_email.trim()) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const isBank = paymentMode.includes('Bank Transfer');
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: formData.donor_name.trim(),
          donor_phone: formData.donor_phone.trim(),
          donor_email: formData.donor_email.trim(),
          pan_number: formData.pan_number.trim().toUpperCase(),
          amount,
          payment_mode: paymentMode,
          campaign_title: selectedCampaign,
          notes: formData.notes || 'Donation via /donate portal',
          status: isBank ? 'pending' : 'verified'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to process donation');

      setReceipt({
        receipt_no: data.receipt_no,
        id: data.donation_id,
        amount,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        campaign: selectedCampaign,
        donor_name: formData.donor_name.trim(),
        pan: formData.pan_number || 'N/A',
        status: data.status
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error processing donation';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {receipt ? (
          /* Receipt Screen */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <div id="receipt-print-area" className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={settings.logo_url || '/images/logo.webp'}
                      alt="VN Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-[#102C63]">VN VIDHYAPEETH</h2>
                    <p className="text-xs text-slate-500">Regd. Educational &amp; Social Welfare Trust (1882)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                    {receipt.status === 'verified' ? 'Verified Receipt' : 'Pending Verification'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Date: {receipt.date}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Contribution Amount</span>
                <div className="text-3xl font-extrabold text-[#D52D2D]">₹{receipt.amount.toLocaleString('en-IN')}</div>
                <p className="text-xs text-slate-600 font-mono">Receipt No: <strong>{receipt.receipt_no}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Donor Name:</span>
                  <span className="font-bold text-slate-800">{receipt.donor_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">PAN Number (80G):</span>
                  <span className="font-bold text-slate-800 font-mono">{receipt.pan}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Allocated Purpose:</span>
                  <span className="font-bold text-slate-800">{receipt.campaign}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Payment Channel:</span>
                  <span className="font-bold text-slate-800">{paymentMode}</span>
                </div>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-[#183F91]">Exemption &amp; Trust Declaration:</p>
                <p>
                  Donations made to VN Vidhyapeeth qualify for tax benefits under Section 80G of the Income Tax Act. Thank you for empowering underprivileged children and families.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-[#183F91] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-[#102C63] transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>

              <button
                type="button"
                onClick={() => setReceipt(null)}
                className="text-xs font-semibold text-slate-600 hover:underline"
              >
                Make Another Contribution
              </button>
            </div>
          </div>
        ) : (
          /* One-Page Donation Interface */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Causes & Bank Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D52D2D] bg-red-50 px-3 py-1 rounded-full uppercase">
                  <Heart className="w-3.5 h-3.5 fill-[#D52D2D]" />
                  Direct Grassroots Support
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#102C63] mt-3">
                  Empower Someone's Tomorrow
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Your donation ensures that children stay in school with books and study supplies, and poor families receive essential meals and social support.
                </p>
              </div>

              {/* Bank Account Summary */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#102C63]">
                  <Landmark className="w-4 h-4 text-[#183F91]" />
                  <span>Official Bank Account (NEFT / RTGS / IMPS)</span>
                </div>
                <div className="space-y-2 font-mono text-slate-600 pt-1">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400">Bank:</span>
                    <span className="font-bold text-slate-800">{bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-slate-400">A/C Number:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">{bankAccount}</span>
                      <button onClick={() => handleCopy(bankAccount, 'acct')} className="text-[#183F91] hover:underline font-sans font-semibold">
                        {copiedField === 'acct' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-slate-400">IFSC Code:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">{bankIfsc}</span>
                      <button onClick={() => handleCopy(bankIfsc, 'ifsc')} className="text-[#183F91] hover:underline font-sans font-semibold">
                        {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-slate-400">UPI ID:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-amber-700">{upiId}</span>
                      <button onClick={() => handleCopy(upiId, 'upi')} className="text-[#183F91] hover:underline font-sans font-semibold">
                        {copiedField === 'upi' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Registered Trust under Indian Trusts Act 1882 • Section 80G Certified</span>
              </div>
            </div>

            {/* Right Column: One-Page Fast Donation Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
              <form onSubmit={handleDonationSubmit} className="space-y-5">
                {/* 1. Quick Amount Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Step 1: Select Contribution Amount
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {quickAmounts.map((amt) => {
                      const isSelected = selectedTier === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedTier(amt);
                            setCustomAmount('');
                          }}
                          className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition ${
                            isSelected
                              ? 'bg-[#183F91] text-white shadow-xs ring-2 ring-[#183F91]/20'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount */}
                  <div className="mt-2.5 relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min="10"
                      placeholder="Or enter custom amount..."
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value) setSelectedTier(0);
                      }}
                      className="w-full pl-7 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Campaign Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Contribution Toward:
                  </label>
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white font-medium"
                  >
                    <option value="Wherever Most Needed">Wherever Most Needed</option>
                    <option value="Children's Education">Children's Education</option>
                    <option value="Food Distribution & Hunger Relief">Food Distribution &amp; Hunger Relief</option>
                    <option value="Free School Stationery">Free School Stationery</option>
                    <option value="General Social Welfare">General Social Welfare</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Minimal Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      placeholder="e.g. Meera Kapur"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.donor_phone}
                      onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      placeholder="e.g. meera@example.org"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      PAN Card Number <span className="text-slate-400 font-normal">(Optional, for 80G Tax Exemption)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={formData.pan_number}
                      onChange={(e) => setFormData({ ...formData, pan_number: e.target.value.toUpperCase() })}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none uppercase"
                    />
                  </div>
                </div>

                {/* 4. Payment Method Options */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Contribution Channel:
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'UPI (Mobile / QR)', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                      { id: 'Online Gateway (Cards/NetBanking)', label: 'Card / NetBank', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'Bank Transfer (NEFT/IMPS)', label: 'Bank Transfer', icon: <Landmark className="w-4 h-4" /> }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMode(m.id)}
                        className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 text-xs font-bold ${
                          paymentMode === m.id
                            ? 'bg-[#183F91] text-white border-[#183F91] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m.icon}
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile UPI Intent Button */}
                {paymentMode.includes('UPI') && (
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
                    <a
                      href={upiDeepLink}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Open Any UPI App (GPay / PhonePe / Paytm)</span>
                    </a>
                    <p className="text-[11px] text-slate-500 text-center">
                      Or scan the official QR code using your phone's UPI camera
                    </p>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3.5 rounded-xl font-bold text-sm sm:text-base transition shadow-md disabled:opacity-50"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{loading ? 'Processing...' : `Donate ₹${amount.toLocaleString('en-IN')} Now`}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
