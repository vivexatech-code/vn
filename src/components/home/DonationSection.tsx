'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteSettings } from '@/lib/data';
import {
  Heart, Landmark, QrCode, CreditCard, CheckCircle2,
  Copy, ShieldCheck, ArrowRight, Sparkles, BookOpen, Utensils
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface DonationSectionProps {
  settings?: SiteSettings;
}

export default function DonationSection({ settings }: DonationSectionProps) {
  const [selectedTier, setSelectedTier] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentTab, setPaymentTab] = useState<'online' | 'bank' | 'upi'>('online');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form inputs for inline quick donation
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<{ id: number; receipt_no: string; amount: number } | null>(null);

  const bankName = settings?.bank_name || 'Punjab National Bank';
  const bankAccount = settings?.bank_account || '4123000100987654';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0123400';
  const bankHolder = settings?.bank_holder || 'VN Vidhyapeeth Trust';
  const upiId = settings?.upi_id || 'vnvidhyapeeth@pnb';
  const qrCode = settings?.qr_code_url || '/images/payment-qr.jpg';

  const tiers = [
    {
      amount: 500,
      label: '₹500',
      impact: '1 Free Student Stationery Kit (6 notebooks, geometry set, pens & pencils)',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />
    },
    {
      amount: 1000,
      label: '₹1,000',
      impact: 'Wholesome nutritious meals & grocery rations for a hungry family',
      icon: <Utensils className="w-4 h-4 text-[#D52D2D]" />
    },
    {
      amount: 2500,
      label: '₹2,500',
      impact: 'Sponsors school tuition, textbooks & tutoring for an underprivileged child',
      icon: <BookOpen className="w-4 h-4 text-[#183F91]" />
    },
    {
      amount: 5000,
      label: '₹5,000',
      impact: 'Comprehensive family sponsorship (education + winter supplies + dry rations)',
      icon: <Heart className="w-4 h-4 text-[#D52D2D] fill-[#D52D2D]" />
    }
  ];

  const currentAmount = customAmount ? Number(customAmount) : selectedTier;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleQuickDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAmount || currentAmount < 50) {
      alert('Please select or enter an amount of at least ₹50.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: donorName,
          donor_email: donorEmail,
          donor_phone: donorPhone,
          pan_number: panNumber,
          amount: currentAmount,
          payment_mode: paymentTab === 'online' ? 'Online Gateway' : paymentTab === 'upi' ? 'UPI' : 'Bank Transfer',
          campaign_title: 'General Social Welfare Fund'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Donation failed');

      setReceiptData({
        id: data.donation_id,
        receipt_no: data.receipt_no,
        amount: currentAmount
      });
    } catch {
      alert('Failed to process donation. Please check your connection or contact our office.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="donate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#D52D2D] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-[#D52D2D]" />
            Direct Beneficiary Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63]">
            Your Small Contribution Can Change a Life.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every rupee you give directly funds free children&apos;s schooling, daily hot meals, free notebooks &amp; stationery distribution, and compassionate social welfare for economically weaker families.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Preset Impact Tiers & Explanations (5 cols) */}
          <div className="lg:col-span-5 bg-[#F7F8FC] rounded-3xl p-6 sm:p-8 border border-slate-100 space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#102C63] mb-2">
                Choose How You Want to Make an Impact
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select a sponsorship package or enter a customized donation amount below.
              </p>
            </div>

            {/* Preset Tiers */}
            <div className="space-y-3">
              {tiers.map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier.amount);
                    setCustomAmount('');
                  }}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-3.5 ${
                    selectedTier === tier.amount && !customAmount
                      ? 'bg-white border-[#183F91] shadow-md ring-2 ring-[#183F91]/20'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {tier.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm sm:text-base text-[#102C63]">
                        {tier.label}
                      </span>
                      {selectedTier === tier.amount && !customAmount && (
                        <span className="text-[10px] font-bold bg-[#183F91] text-white px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                      {tier.impact}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Amount Field */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Or Enter Custom Contribution (₹ INR):
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-sm font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  placeholder="e.g. 1500"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    if (e.target.value) setSelectedTier(0);
                  }}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Transparency Note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Registered Trust • Instant 80G Tax Exemption Receipt</span>
            </div>
          </div>

          {/* Right Column: Payment Tabs & Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6 overflow-x-auto">
              <button
                type="button"
                onClick={() => setPaymentTab('online')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  paymentTab === 'online'
                    ? 'bg-[#183F91] text-white shadow'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Instant Online Donation</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('upi')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  paymentTab === 'upi'
                    ? 'bg-[#183F91] text-white shadow'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR Scan</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('bank')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  paymentTab === 'bank'
                    ? 'bg-[#183F91] text-white shadow'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>Direct Bank Transfer</span>
              </button>
            </div>

            {/* TAB 1: Online Donation Form */}
            {paymentTab === 'online' && (
              <div>
                {receiptData ? (
                  <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-900">
                      Donation Registered Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                      Thank you for your generosity. Your contribution of <strong>₹{receiptData.amount.toLocaleString('en-IN')}</strong> will directly help children in need.
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 font-mono text-xs text-slate-700 max-w-xs mx-auto">
                      Receipt Reference: <strong>{receiptData.receipt_no}</strong>
                    </div>
                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <Link
                        href={`/donate`}
                        className="inline-flex items-center gap-1.5 bg-[#183F91] text-white px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        <span>Download 80G Tax Receipt</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setReceiptData(null)}
                        className="text-xs text-slate-500 hover:underline px-3 py-2"
                      >
                        Make Another Donation
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickDonate} className="space-y-4">
                    <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#102C63]">Selected Contribution Amount:</span>
                      <span className="text-lg font-bold text-[#D52D2D]">₹{currentAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Donor Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="e.g. Anand Mehra"
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
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="e.g. anand@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
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
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                          placeholder="e.g. ABCDE1234F"
                          maxLength={10}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none uppercase"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3.5 rounded-xl font-bold text-sm transition shadow-md disabled:opacity-50"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>{isSubmitting ? 'Processing Contribution...' : `Proceed to Donate ₹${currentAmount.toLocaleString('en-IN')}`}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: UPI & QR Code */}
            {paymentTab === 'upi' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="relative w-40 h-40 bg-white rounded-xl p-2 border border-slate-200 shadow-sm flex-shrink-0">
                    <ImageWithFallback
                      src={qrCode}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt="VN Vidhyapeeth Official Donation UPI QR"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <span className="text-xs font-bold text-[#183F91] uppercase tracking-wider block">
                      Instant Mobile UPI Scan
                    </span>
                    <h4 className="text-base font-bold text-[#102C63]">
                      Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Scan the official VN Vidhyapeeth QR code or copy the UPI ID directly below.
                    </p>

                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                      <code className="bg-white px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs font-bold text-[#102C63]">
                        {upiId}
                      </code>
                      <button
                        onClick={() => handleCopy(upiId, 'upi')}
                        className="inline-flex items-center gap-1 bg-[#183F91] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#102C63] transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedField === 'upi' ? 'Copied!' : 'Copy UPI'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <strong>Important:</strong> After completing the UPI transfer, please WhatsApp your payment screenshot along with your name and address to <strong>+91 7015358183</strong> to receive your formal 80G donation receipt.
                </div>
              </div>
            )}

            {/* TAB 3: Direct Bank NEFT/IMPS Transfer */}
            {paymentTab === 'bank' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  You can transfer your donations directly via NEFT, RTGS, or IMPS into the official trust bank account:
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5 font-mono text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Account Name:</span>
                    <span className="font-bold text-[#102C63]">{bankHolder}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Bank Name:</span>
                    <span className="font-bold text-[#102C63]">{bankName}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102C63]">{bankAccount}</span>
                      <button
                        onClick={() => handleCopy(bankAccount, 'acct')}
                        className="text-xs text-[#183F91] hover:underline inline-flex items-center gap-0.5"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedField === 'acct' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">IFSC Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#102C63]">{bankIfsc}</span>
                      <button
                        onClick={() => handleCopy(bankIfsc, 'ifsc')}
                        className="text-xs text-[#183F91] hover:underline inline-flex items-center gap-0.5"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedField === 'ifsc' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-500 font-sans">Branch Location:</span>
                    <span className="font-bold text-[#102C63]">Ellenabad / Sirsa, Haryana</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-900">
                  Manual transfers are audited by our accounts desk. Please share your bank UTR / reference number via email to <strong>vnvidyapeeth@gmail.com</strong> to verify your contribution.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
