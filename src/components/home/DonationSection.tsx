'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/lib/data';
import {
  Heart, Landmark, QrCode, CreditCard, CheckCircle2,
  Copy, ShieldCheck, ArrowRight, Sparkles, BookOpen, Utensils, Users
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface DonationSectionProps {
  settings?: SiteSettings;
}

export default function DonationSection({ settings }: DonationSectionProps) {
  const [selectedTier, setSelectedTier] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentTab, setPaymentTab] = useState<'online' | 'upi' | 'bank'>('online');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form inputs for inline donation
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<{ id: number; receipt_no: string; amount: number } | null>(null);

  const bankName = settings?.bank_name || 'Punjab National Bank (PNB)';
  const bankAccount = settings?.bank_account || '4123000100987654';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0123400';
  const bankHolder = settings?.bank_holder || 'VN Vidhyapeeth Educational & Social Welfare Trust';
  const upiId = settings?.upi_id || 'vnvidhyapeeth@pnb';
  const qrCode = settings?.qr_code_url || '/images/ngo/donation-banner.jpg';

  const causes = [
    {
      amount: 500,
      label: '₹500',
      title: 'Free Books & Stationery',
      description: 'Provides a complete student stationery pack (notebooks, geometry box, pens, pencils, backpack) to a child in need.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      amount: 1000,
      label: '₹1,000',
      title: 'Food Distribution & Hunger Relief',
      description: 'Provides monthly dry ration groceries (flour, rice, lentils, cooking oil) and warm meals to a struggling family.',
      icon: <Utensils className="w-5 h-5 text-[#D52D2D]" />
    },
    {
      amount: 2500,
      label: '₹2,500',
      title: 'Education for Poor Children',
      description: 'Sponsors school tuition, learning supplies, and evening remedial tutoring for a child for an entire academic term.',
      icon: <BookOpen className="w-5 h-5 text-[#183F91]" />
    },
    {
      amount: 5000,
      label: '₹5,000',
      title: 'Essential Support for Needy Families',
      description: 'Comprehensive family aid including emergency healthcare assistance, seasonal clothing, and community welfare.',
      icon: <Users className="w-5 h-5 text-emerald-600" />
    }
  ];

  const currentAmount = customAmount ? Number(customAmount) : selectedTier;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAmount || currentAmount < 50) {
      alert('Please enter or select a donation amount of at least ₹50.');
      return;
    }
    setIsSubmitting(true);
    try {
      const modeLabel = paymentTab === 'online' ? 'Online Gateway' : paymentTab === 'upi' ? 'UPI / QR' : 'Bank Transfer (NEFT/IMPS)';
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: donorName,
          donor_email: donorEmail,
          donor_phone: donorPhone,
          pan_number: panNumber,
          amount: currentAmount,
          payment_mode: modeLabel,
          campaign_title: causes.find(c => c.amount === selectedTier)?.title || 'General Social Welfare Fund',
          notes: 'Direct contribution via homepage donation section'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Donation could not be registered');

      setReceiptData({
        id: data.donation_id,
        receipt_no: data.receipt_no,
        amount: currentAmount
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to register donation';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white" id="donate" aria-label="Make a Donation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#D52D2D]" />
            <span>Make an Immediate Difference</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight">
            Your Kindness Can Change Someone's Tomorrow.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Every contribution directly funds education for underprivileged children, free books and stationery, food distribution, and essential family relief.
          </p>
        </div>

        {/* Main Donation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Impact Causes (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Select What You Wish to Support:
            </h3>

            <div className="space-y-3">
              {causes.map((cause) => {
                const isSelected = selectedTier === cause.amount && !customAmount;
                return (
                  <button
                    key={cause.amount}
                    type="button"
                    onClick={() => {
                      setSelectedTier(cause.amount);
                      setCustomAmount('');
                    }}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-[#F7F8FC] border-[#183F91] shadow-xs ring-1 ring-[#183F91]'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                      {cause.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#102C63]">
                          {cause.title}
                        </span>
                        <span className="text-xs font-bold text-[#D52D2D] ml-2">
                          {cause.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">
                        {cause.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount */}
            <div className="pt-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Or enter a custom donation amount (₹ INR):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">₹</span>
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
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Quiet 80G Assurance */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Registered Trust • 50% Tax Exemption under Section 80G</span>
            </div>
          </div>

          {/* Right Column: Payment Options & Donor Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            {/* Mode Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentTab('online')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  paymentTab === 'online'
                    ? 'bg-[#183F91] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Online Donation</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('upi')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  paymentTab === 'upi'
                    ? 'bg-[#183F91] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>UPI / QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('bank')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  paymentTab === 'bank'
                    ? 'bg-[#183F91] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {/* TAB 1: Online Form */}
            {paymentTab === 'online' && (
              <div>
                {receiptData ? (
                  <div className="p-6 text-center bg-white border border-emerald-200 rounded-xl space-y-3">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-[#102C63]">
                      Donation Registered Successfully
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you for your generosity. Your contribution of <strong>₹{receiptData.amount.toLocaleString('en-IN')}</strong> will directly help children and families in need.
                    </p>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-700 max-w-xs mx-auto">
                      Receipt No: <strong>{receiptData.receipt_no}</strong>
                    </div>
                    <div className="pt-2 flex flex-wrap justify-center gap-2">
                      <Link
                        href={`/donate`}
                        className="inline-flex items-center gap-1.5 bg-[#183F91] text-white px-4 py-2 rounded-lg text-xs font-semibold"
                      >
                        <span>Download 80G Receipt</span>
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
                  <form onSubmit={handleDonateSubmit} className="space-y-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">Selected Amount:</span>
                      <span className="text-base font-bold text-[#D52D2D]">₹{currentAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="e.g. Ramesh Chandra"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
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
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="e.g. ramesh@example.org"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          PAN Card Number <span className="text-slate-400 font-normal">(Optional, for 80G Tax Exemption)</span>
                        </label>
                        <input
                          type="text"
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                          placeholder="e.g. ABCDE1234F"
                          maxLength={10}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none uppercase bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3 rounded-xl font-semibold text-sm transition shadow-xs disabled:opacity-50"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>{isSubmitting ? 'Registering...' : `Donate ₹${currentAmount.toLocaleString('en-IN')}`}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: UPI & QR Code */}
            {paymentTab === 'upi' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="relative w-36 h-36 bg-slate-50 rounded-lg p-2 border border-slate-200 flex-shrink-0">
                    <ImageWithFallback
                      src={qrCode}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt="VN Vidhyapeeth Official Donation UPI QR"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <h4 className="text-sm font-bold text-[#102C63]">
                      Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Scan the official VN Vidhyapeeth QR code or copy the verified UPI ID below.
                    </p>

                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                      <code className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs font-semibold text-[#102C63]">
                        {upiId}
                      </code>
                      <button
                        onClick={() => handleCopy(upiId, 'upi')}
                        className="inline-flex items-center gap-1 bg-[#183F91] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#102C63] transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183F91] hover:text-[#D52D2D] transition"
                  >
                    <span>Need an 80G tax receipt after UPI transfer? Claim it here</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* TAB 3: Direct Bank Transfer Details */}
            {paymentTab === 'bank' && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs text-slate-500">Bank Name</span>
                    <span className="text-xs font-bold text-[#102C63]">{bankName}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs text-slate-500">Account Name</span>
                    <span className="text-xs font-bold text-[#102C63] text-right">{bankHolder}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs text-slate-500">Account Number</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#102C63]">{bankAccount}</span>
                      <button
                        onClick={() => handleCopy(bankAccount, 'acc')}
                        className="text-xs text-[#183F91] hover:underline"
                      >
                        {copiedField === 'acc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs text-slate-500">IFSC Code</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#102C63]">{bankIfsc}</span>
                      <button
                        onClick={() => handleCopy(bankIfsc, 'ifsc')}
                        className="text-xs text-[#183F91] hover:underline"
                      >
                        {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Account Type</span>
                    <span className="text-xs font-semibold text-slate-700">Current / Trust Account</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  After initiating NEFT/RTGS/IMPS, please submit the transaction reference on our{' '}
                  <Link href="/donate" className="text-[#183F91] font-semibold underline">
                    Donation Portal
                  </Link>{' '}
                  for tax verification.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
