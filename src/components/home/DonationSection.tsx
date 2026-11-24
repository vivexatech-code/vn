'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/lib/data';
import {
  Heart, Landmark, QrCode, CreditCard, CheckCircle2,
  Copy, ShieldCheck, ArrowRight, Printer, Sparkles, Smartphone, Download
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface DonationSectionProps {
  settings?: SiteSettings;
}

export default function DonationSection({ settings }: DonationSectionProps) {
  // Preset tiers as requested
  const [selectedTier, setSelectedTier] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>('Wherever Most Needed');
  const [paymentTab, setPaymentTab] = useState<'upi' | 'qr' | 'bank' | 'card'>('upi');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Minimal Donor Details (Email is optional)
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    id: number;
    receipt_no: string;
    amount: number;
    donor_name: string;
    payment_mode: string;
    status: string;
  } | null>(null);

  const bankName = settings?.bank_name || 'Punjab National Bank (PNB)';
  const bankAccount = settings?.bank_account || '4123000100987654';
  const bankIfsc = settings?.bank_ifsc || 'PUNB0123400';
  const bankHolder = settings?.bank_holder || 'VN Vidhyapeeth Educational & Social Welfare Trust';
  const upiId = settings?.upi_id || 'vnvidhyapeeth@pnb';
  const qrCode = settings?.qr_code_url || '/images/ngo/donation-banner.jpg';

  // Specific tiers requested in prompt
  const donationTiers = [
    {
      amount: 101,
      label: '₹101',
      title: 'Help Someone',
      description: 'Provides a hot nutritious meal or essential stationery to someone in need.'
    },
    {
      amount: 251,
      label: '₹251',
      title: 'Support a Child',
      description: 'Supplies a child with complete notebooks, pens, pencils and study materials.'
    },
    {
      amount: 501,
      label: '₹501',
      title: 'Provide Basic Needs',
      description: 'Helps a struggling family with emergency dry food rations (flour, rice, dal).'
    },
    {
      amount: 1001,
      label: '₹1,001',
      title: 'Make a Bigger Difference',
      description: 'Sponsors school tuition, warm winter clothing, and healthcare support for a family.'
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
    if (!currentAmount || currentAmount < 10) {
      alert('Please select or enter an amount of at least ₹10.');
      return;
    }
    if (!donorName.trim()) {
      alert('Please enter your full name.');
      return;
    }
    const cleanPhone = donorPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const modeLabel =
        paymentTab === 'upi' ? 'UPI Mobile App' :
        paymentTab === 'qr' ? 'UPI QR Code' :
        paymentTab === 'bank' ? 'Bank Transfer (NEFT/IMPS)' : 'Online Card/NetBanking';

      const isBank = paymentTab === 'bank';

      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: donorName.trim(),
          donor_phone: donorPhone.trim(),
          donor_email: donorEmail.trim(),
          pan_number: panNumber.trim().toUpperCase(),
          amount: currentAmount,
          payment_mode: modeLabel,
          campaign_title: selectedCause,
          notes: 'Direct donation via homepage donation section',
          status: isBank ? 'pending' : 'verified'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setReceiptData({
        id: data.donation_id,
        receipt_no: data.receipt_no,
        amount: currentAmount,
        donor_name: donorName.trim(),
        payment_mode: modeLabel,
        status: isBank ? 'pending' : 'verified'
      });

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vnv_donation_completed', 'true');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      alert(`Error submitting donation: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('VN Vidhyapeeth')}&am=${currentAmount}&cu=INR&tn=${encodeURIComponent(`Donation: ${selectedCause}`)}`;

  return (
    <section className="py-20 sm:py-26 bg-[#FFF8F0] border-t border-[#EFE4DC]" id="donate" aria-label="Make a Donation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
            <span>Every rupee brings hope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight leading-snug">
            Your Small Help Can Bring a Big Smile
          </h2>
          <p className="mt-3 text-base text-[#78665E] leading-relaxed">
            Donating is simple, safe and transparent. Choose an amount below or enter what you can give.
          </p>
        </div>

        {/* Main Donation Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#EFE4DC] shadow-xs">
          {receiptData ? (
            /* Post-Donation Clear Confirmation & Next Steps */
            <div className="max-w-2xl mx-auto text-center py-6 space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#EBF0E6] text-[#78866B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C87552] block mb-1">
                  Donation Recorded Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#49352D]">
                  Thank You, {receiptData.donor_name}!
                </h3>
                <p className="mt-2 text-sm text-[#78665E]">
                  Your contribution of <strong className="text-[#C87552] font-extrabold text-lg">₹{receiptData.amount.toLocaleString('en-IN')}</strong> will touch real lives on the ground.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FFF8F0] border border-[#EFE4DC] rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2.5 font-mono text-[#49352D]">
                <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                  <span className="text-[#78665E]">Official Receipt No:</span>
                  <span className="font-bold text-[#C87552]">{receiptData.receipt_no}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                  <span className="text-[#78665E]">Donor Name:</span>
                  <span className="font-semibold">{receiptData.donor_name}</span>
                </div>
                <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                  <span className="text-[#78665E]">Cause Allocated:</span>
                  <span className="font-semibold">{selectedCause}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78665E]">Status:</span>
                  <span className="font-bold uppercase text-[#78866B]">{receiptData.status}</span>
                </div>
              </div>

              {/* What Happens Next - Clearly Explained as per Requirement 5 */}
              <div className="bg-[#EBF0E6]/60 border border-[#78866B]/30 rounded-2xl p-5 text-left space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-[#49352D] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#78866B]" />
                  <span>What Happens Next With Your Donation?</span>
                </h4>
                <ul className="text-xs sm:text-sm text-[#49352D]/85 space-y-1.5 list-disc pl-4">
                  <li>Your donation is credited into the VN Vidhyapeeth registered trust account.</li>
                  <li>Our field team will utilize these funds directly for food rations, school supplies, or educational support.</li>
                  <li>Your Section 80G tax receipt is ready for your annual income tax deduction.</li>
                  <li>You can reach out anytime to our team on WhatsApp (<a href="https://wa.me/917015358183" className="underline font-bold text-[#C87552]">+91 7015358183</a>) quoting your receipt number.</li>
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-[#FFF8F0] hover:bg-white text-[#49352D] px-5 py-2.5 rounded-xl text-xs font-medium border border-[#EFE4DC] shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print receipt</span>
                </button>
                <button
                  onClick={() => {
                    setReceiptData(null);
                    setCustomAmount('');
                  }}
                  className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-xs transition-colors"
                >
                  <span>Donate again</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDonateSubmit} className="space-y-8">
              {/* 1. Quick Amount Selection Cards */}
              <div>
                <label className="block text-xs font-medium text-[#78665E] mb-3">
                  Step 1: Choose donation amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {donationTiers.map((tier) => {
                    const isSelected = selectedTier === tier.amount && !customAmount;
                    return (
                      <button
                        type="button"
                        key={tier.amount}
                        onClick={() => {
                          setSelectedTier(tier.amount);
                          setCustomAmount('');
                        }}
                        className={`p-4 rounded-xl text-left border transition-colors ${
                          isSelected
                            ? 'bg-[#F4D6C6]/40 border-[#C87552]'
                            : 'bg-[#FFF8F0]/40 border-[#EFE4DC] hover:border-[#F4D6C6] hover:bg-[#FFF8F0]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xl sm:text-2xl font-serif font-bold tabular-nums ${isSelected ? 'text-[#C87552]' : 'text-[#49352D]'}`}>
                            {tier.label}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#C87552]" />
                          )}
                        </div>
                        <span className="block text-xs font-semibold text-[#49352D]">
                          {tier.title}
                        </span>
                        <span className="text-[11px] text-[#78665E] leading-tight block mt-1 line-clamp-2">
                          {tier.description}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-full sm:w-72">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#78665E]">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="10"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Or enter custom amount"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm font-semibold text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  {customAmount && Number(customAmount) > 0 && (
                    <span className="text-xs font-semibold text-[#C87552]">
                      Selected custom donation: ₹{Number(customAmount).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* 2. Cause Selection Dropdown */}
              <div>
                <label className="block text-xs font-medium text-[#78665E] mb-2">
                  Step 2: Choose where your support goes
                </label>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="w-full sm:max-w-md px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm font-medium text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                >
                  <option value="Wherever Most Needed">Wherever Most Needed (General Welfare)</option>
                  <option value="Child Education">Child Education (Free Schooling & Books)</option>
                  <option value="Food Distribution">Food Distribution & Hunger Relief</option>
                  <option value="Helping Poor Families">Helping Poor Families & Blankets</option>
                  <option value="Healthcare Support">Healthcare & Pediatric Support</option>
                  <option value="Women Empowerment">Women Empowerment & Skills</option>
                </select>
              </div>

              {/* 3. Donor Details (Email is optional) */}
              <div className="border-t border-[#EFE4DC] pt-6">
                <label className="block text-xs font-medium text-[#78665E] mb-3">
                  Step 3: Donor details (email is optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Email Address <span className="text-[#78665E] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      PAN Number <span className="text-[#78665E] font-normal">(For 80G tax exemption)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F (Optional)"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm uppercase text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Payment Method Tabs */}
              <div className="border-t border-[#EFE4DC] pt-6">
                <label className="block text-xs font-medium text-[#78665E] mb-3">
                  Step 4: Select how you would like to pay
                </label>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('upi')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
                      paymentTab === 'upi'
                        ? 'bg-[#C87552] text-white border-[#C87552]'
                        : 'bg-[#FFF8F0] text-[#49352D] border-[#EFE4DC] hover:border-[#F4D6C6]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>UPI App (1-Click)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentTab('qr')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
                      paymentTab === 'qr'
                        ? 'bg-[#C87552] text-white border-[#C87552]'
                        : 'bg-[#FFF8F0] text-[#49352D] border-[#EFE4DC] hover:border-[#F4D6C6]'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan QR Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentTab('bank')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
                      paymentTab === 'bank'
                        ? 'bg-[#C87552] text-white border-[#C87552]'
                        : 'bg-[#FFF8F0] text-[#49352D] border-[#EFE4DC] hover:border-[#F4D6C6]'
                    }`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Direct Bank Transfer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
                      paymentTab === 'card'
                        ? 'bg-[#C87552] text-white border-[#C87552]'
                        : 'bg-[#FFF8F0] text-[#49352D] border-[#EFE4DC] hover:border-[#F4D6C6]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cards / NetBanking</span>
                  </button>
                </div>

                {/* Tab 1: UPI Intent */}
                {paymentTab === 'upi' && (
                  <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#EFE4DC] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-[#C87552]">
                        Official trust UPI ID
                      </div>
                      <div className="text-base font-semibold text-[#49352D] font-mono flex items-center gap-2">
                        <span>{upiId}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(upiId, 'upi')}
                          className="text-xs text-[#C87552] hover:underline flex items-center gap-1 font-sans font-medium"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedField === 'upi' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#78665E]">
                        Pay using Google Pay, PhonePe, Paytm, BHIM, or any UPI banking app.
                      </p>
                    </div>

                    <a
                      href={upiDeepLink}
                      className="inline-flex items-center gap-2 bg-[#78866B] hover:bg-[#657358] text-white px-5 py-2.5 rounded-xl text-xs font-medium shadow-xs transition-colors"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Open UPI App on mobile</span>
                    </a>
                  </div>
                )}

                {/* Tab 2: UPI QR Code */}
                {paymentTab === 'qr' && (
                  <div className="bg-[#FFF8F0] rounded-2xl p-5 border border-[#EFE4DC] flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-36 h-36 bg-white rounded-xl p-2 border border-[#EFE4DC] shadow-xs flex-shrink-0">
                      <ImageWithFallback
                        src={qrCode}
                        fallbackSrc="/images/payment-qr.jpg"
                        alt="VN Vidhyapeeth Official Donation QR"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <h4 className="text-base font-bold text-[#49352D]">
                        Scan with Any UPI App
                      </h4>
                      <p className="text-xs text-[#78665E] leading-relaxed max-w-md">
                        Open Google Pay, PhonePe, Paytm, or BHIM on your phone and scan the QR code to send ₹{currentAmount.toLocaleString('en-IN')} directly to VN Vidhyapeeth.
                      </p>
                      <div className="text-xs font-mono text-[#49352D] bg-white px-3 py-1.5 rounded-lg border border-[#EFE4DC] inline-flex items-center gap-2">
                        <span>UPI ID: <strong>{upiId}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy(upiId, 'qr_upi')}
                          className="text-[#C87552] hover:underline text-xs"
                        >
                          {copiedField === 'qr_upi' ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Direct Bank Details */}
                {paymentTab === 'bank' && (
                  <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#EFE4DC] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#C87552]">
                        Official trust bank account (Punjab National Bank)
                      </span>
                      <span className="text-xs text-[#78866B] font-medium">NEFT / RTGS / IMPS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="bg-white p-3 rounded-xl border border-[#EFE4DC]">
                        <span className="text-[#78665E] block text-[11px] font-sans">Bank name</span>
                        <span className="font-semibold text-[#49352D]">{bankName}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#EFE4DC]">
                        <span className="text-[#78665E] block text-[11px] font-sans">Account number</span>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#49352D]">{bankAccount}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(bankAccount, 'acc')}
                            className="text-[#C87552] text-[11px] font-sans hover:underline"
                          >
                            {copiedField === 'acc' ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#EFE4DC]">
                        <span className="text-[#78665E] block text-[11px] font-sans">IFSC code</span>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#49352D]">{bankIfsc}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(bankIfsc, 'ifsc')}
                            className="text-[#C87552] text-[11px] font-sans hover:underline"
                          >
                            {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#EFE4DC]">
                        <span className="text-[#78665E] block text-[11px] font-sans">Account holder</span>
                        <span className="font-semibold text-[#49352D] truncate block">{bankHolder}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Card / NetBanking */}
                {paymentTab === 'card' && (
                  <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#EFE4DC] text-xs sm:text-sm text-[#78665E] space-y-2">
                    <p className="font-medium text-[#49352D]">
                      Indian debit / credit cards & NetBanking portals
                    </p>
                    <p className="text-xs">
                      All donations are processed with 256-bit SSL encryption. An official donation receipt will be generated immediately upon confirmation.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EFE4DC]">
                <div className="text-xs text-[#78665E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#78866B]" />
                  <span>100% Tax Deductible under Section 80G of Income Tax Act 1961</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white font-medium text-sm sm:text-base px-8 py-3 rounded-xl shadow-xs transition-colors active:scale-[0.99] disabled:opacity-50"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>
                    {isSubmitting ? 'Recording donation...' : `Donate ₹${currentAmount.toLocaleString('en-IN')} now`}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
