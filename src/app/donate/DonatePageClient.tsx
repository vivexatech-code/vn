'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings, Campaign } from '@/lib/data';
import {
  Heart, Landmark, QrCode, CreditCard, CheckCircle2,
  Copy, ShieldCheck, ArrowRight, Printer, Sparkles, BookOpen, Utensils
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface DonatePageClientProps {
  settings: SiteSettings;
  campaigns: Campaign[];
}

export default function DonatePageClient({ settings, campaigns }: DonatePageClientProps) {
  const [selectedTier, setSelectedTier] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('General Social Welfare Fund');
  const [paymentMode, setPaymentMode] = useState<string>('UPI');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    pan_number: '',
    address: '',
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

  const bankName = settings.bank_name || 'Punjab National Bank';
  const bankAccount = settings.bank_account || '4123000100987654';
  const bankIfsc = settings.bank_ifsc || 'PUNB0123400';
  const bankHolder = settings.bank_holder || 'VN Vidhyapeeth Trust';
  const upiId = settings.upi_id || 'vnvidhyapeeth@pnb';
  const qrCode = settings.qr_code_url || '/images/payment-qr.jpg';

  const amount = customAmount ? Number(customAmount) : selectedTier;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 50) {
      alert('Please select or enter an amount of at least ₹50.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: formData.donor_name,
          donor_email: formData.donor_email,
          donor_phone: formData.donor_phone,
          pan_number: formData.pan_number,
          amount,
          payment_mode: paymentMode,
          campaign_title: selectedCampaign,
          notes: formData.notes
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
        donor_name: formData.donor_name,
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
    <div className="py-12 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {receipt ? (
          /* Receipt Screen */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100">
            {/* Printable Area */}
            <div id="receipt-print-area" className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={settings.logo_url || '/images/logo.webp'}
                      alt="Logo"
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
                    {receipt.status === 'verified' ? 'Verified Receipt' : 'Transfer Registered'}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">Date: {receipt.date}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
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
                <p className="font-semibold text-[#183F91]">Exemption Declaration:</p>
                <p>
                  Donations made to VN Vidhyapeeth qualify for tax benefits under Section 80G of the Income Tax Act. Thank you for empowering underprivileged children and families.
                </p>
              </div>
            </div>

            {/* Actions */}
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
          /* Donation Wizard */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Mission, Tiers & Bank Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D52D2D] bg-red-50 px-3 py-1 rounded-full uppercase">
                  <Heart className="w-3.5 h-3.5 fill-[#D52D2D]" />
                  Direct Social Impact
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#102C63] mt-3">
                  Transform Lives Through Your Generosity
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Your donation ensures that no child drops out of school due to lack of books or notebooks, and no underprivileged family suffers in hunger.
                </p>
              </div>

              {/* Preset Impact Options */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700">Choose Sponsorship Tier:</label>
                {[
                  { amt: 500, label: '₹500', desc: 'Sponsors 1 complete school stationery kit (6 notebooks, pens, geometry set)' },
                  { amt: 1000, label: '₹1,000', desc: 'Provides nutritious meals & dry rations for an impoverished family' },
                  { amt: 2500, label: '₹2,500', desc: 'Sponsors school tuition, textbooks & coaching for a child for one semester' },
                  { amt: 5000, label: '₹5,000', desc: 'Comprehensive child & family sponsorship (education, food & winter clothing)' }
                ].map((t) => (
                  <button
                    key={t.amt}
                    type="button"
                    onClick={() => {
                      setSelectedTier(t.amt);
                      setCustomAmount('');
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left border transition flex items-center justify-between ${
                      selectedTier === t.amt && !customAmount
                        ? 'bg-white border-[#183F91] ring-2 ring-[#183F91]/20 shadow'
                        : 'bg-white/60 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-[#102C63] block">{t.label}</span>
                      <span className="text-[11px] text-slate-500">{t.desc}</span>
                    </div>
                    {selectedTier === t.amt && !customAmount && (
                      <CheckCircle2 className="w-4 h-4 text-[#183F91] flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Direct Bank Account Summary Box */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#102C63]">
                  <Landmark className="w-4 h-4 text-[#183F91]" />
                  <span>Official Bank Account (NEFT / RTGS)</span>
                </div>
                <div className="space-y-1 font-mono text-slate-600 pt-1">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400">Bank:</span>
                    <span className="font-bold text-slate-800">{bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-slate-400">A/C No:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">{bankAccount}</span>
                      <button onClick={() => handleCopy(bankAccount, 'acct')} className="text-[#183F91] hover:underline">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-slate-400">IFSC:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">{bankIfsc}</span>
                      <button onClick={() => handleCopy(bankIfsc, 'ifsc')} className="text-[#183F91] hover:underline">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-slate-400">UPI ID:</span>
                    <span className="font-bold text-amber-600">{upiId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Donor Form & Payment Channel */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
              <form onSubmit={handleDonationSubmit} className="space-y-5">
                {/* Amount display */}
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Donation Amount:</span>
                  <div className="text-2xl font-bold text-[#D52D2D]">₹{amount.toLocaleString('en-IN')}</div>
                </div>

                {/* Custom Amount option */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Enter Custom Amount (₹ INR):
                  </label>
                  <input
                    type="number"
                    min="50"
                    placeholder="e.g. 3000"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setSelectedTier(0);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>

                {/* Cause / Campaign Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Contribution Toward:
                  </label>
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                  >
                    <option value="General Social Welfare Fund">General Social Welfare Fund (Where Most Needed)</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.category})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      placeholder="e.g. Meera Kapur"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      placeholder="e.g. meera@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.donor_phone}
                      onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      PAN Card Number (For 80G Tax Exemption)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={formData.pan_number}
                      onChange={(e) => setFormData({ ...formData, pan_number: e.target.value.toUpperCase() })}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none uppercase"
                    />
                  </div>
                </div>

                {/* Payment Mode Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Select Contribution Method:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'UPI', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                      { id: 'Online Gateway', label: 'Card / NetBanking', icon: <CreditCard className="w-4 h-4" /> },
                      { id: 'Bank Transfer (NEFT/IMPS)', label: 'Bank Transfer', icon: <Landmark className="w-4 h-4" /> }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMode(m.id)}
                        className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 text-xs font-bold ${
                          paymentMode === m.id
                            ? 'bg-[#183F91] text-white border-[#183F91] shadow'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m.icon}
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-4 rounded-xl font-bold text-sm sm:text-base transition shadow-md disabled:opacity-50"
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
