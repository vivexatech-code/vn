'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteSettings, Campaign } from '@/lib/data';
import {
  Heart, Landmark, QrCode, CreditCard, CheckCircle2,
  Copy, ShieldCheck, ArrowRight, Printer, Sparkles, Smartphone, Download
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

  const quickAmounts = [
    { val: 101, label: '₹101', note: 'Help Someone' },
    { val: 251, label: '₹251', note: 'Support a Child' },
    { val: 501, label: '₹501', note: 'Basic Needs' },
    { val: 1001, label: '₹1,001', note: 'Bigger Impact' },
    { val: 2501, label: '₹2,501', note: 'Sponsor Child' },
    { val: 5000, label: '₹5,000', note: 'Family Relief' }
  ];

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
      if (!res.ok) throw new Error(data.error || 'Failed to submit donation');

      setReceipt({
        receipt_no: data.receipt_no,
        id: data.donation_id,
        amount,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        campaign: selectedCampaign,
        donor_name: formData.donor_name.trim(),
        pan: formData.pan_number.trim().toUpperCase() || 'NOT PROVIDED',
        status: isBank ? 'pending verification' : 'verified'
      });

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vnv_donation_completed', 'true');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      alert(`Donation submission error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {receipt ? (
          /* Official Instant Receipt with Clear Next Steps */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-[#EFE4DC] shadow-xs space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#EBF0E6] text-[#78866B] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-medium text-[#C87552] block">
                Official trust receipt
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#49352D]">
                Thank You for Your Generosity!
              </h2>
              <p className="text-xs sm:text-sm text-[#78665E] max-w-md mx-auto">
                Your support directly reaches underprivileged children and needy families on the ground.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-[#FFF8F0] rounded-xl p-5 border border-[#EFE4DC] space-y-3 font-mono text-xs sm:text-sm text-[#49352D]">
              <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                <span className="text-[#78665E] font-sans">Receipt Number:</span>
                <span className="font-semibold text-[#C87552]">{receipt.receipt_no}</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                <span className="text-[#78665E] font-sans">Donor Name:</span>
                <span className="font-semibold">{receipt.donor_name}</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                <span className="text-[#78665E] font-sans">Contribution Amount:</span>
                <span className="font-bold text-base text-[#C87552] font-serif tabular-nums">₹{receipt.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                <span className="text-[#78665E] font-sans">Allocated Initiative:</span>
                <span className="font-medium">{receipt.campaign}</span>
              </div>
              <div className="flex justify-between border-b border-[#EFE4DC] pb-2">
                <span className="text-[#78665E] font-sans">Date:</span>
                <span>{receipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78665E] font-sans">Verification Status:</span>
                <span className="font-semibold uppercase text-[#78866B]">{receipt.status}</span>
              </div>
            </div>

            {/* What Happens Next - Clearly Explained */}
            <div className="bg-[#EBF0E6]/70 border border-[#78866B]/30 rounded-xl p-5 text-left text-xs sm:text-sm text-[#49352D] space-y-2">
              <span className="font-medium text-[#78866B] block">Next Steps for Your Contribution:</span>
              <p>• Your contribution has been registered with the VN Vidhyapeeth registered trust accounts.</p>
              <p>• This donation is 100% tax-deductible under Section 80G of the Income Tax Act.</p>
              <p>• You can print or save this summary immediately for your records.</p>
              <p>• For questions or field distribution updates, contact our trust desk on WhatsApp at <a href="https://wa.me/917015358183" className="font-medium text-[#C87552] underline">+91 7015358183</a> quoting your receipt number.</p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-[#49352D] hover:bg-[#382822] text-white px-5 py-2.5 rounded-xl text-xs font-medium transition-colors shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print official receipt</span>
              </button>
              <button
                type="button"
                onClick={() => setReceipt(null)}
                className="inline-flex items-center gap-2 bg-[#FFF8F0] hover:bg-white text-[#49352D] px-5 py-2.5 rounded-xl text-xs font-medium border border-[#EFE4DC] transition-colors shadow-xs"
              >
                <span>Make another contribution</span>
              </button>
            </div>
          </div>
        ) : (
          /* One-Page Donation Interface */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Direct Causes & Bank Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
                  <span>Direct grassroots support</span>
                </span>
                <h1 className="text-3xl sm:text-4xl font-semibold text-[#49352D] mt-2 leading-snug">
                  A Little Help Can Change Someone's Life
                </h1>
                <p className="text-xs sm:text-sm text-[#78665E] mt-2 leading-relaxed">
                  Your donation ensures that children stay in school with books and study supplies, and poor families receive essential meals and social support.
                </p>
              </div>

              {/* Bank Account Summary */}
              <div className="bg-white rounded-xl p-5 border border-[#EFE4DC] shadow-xs space-y-3 text-xs">
                <div className="flex items-center gap-2 font-medium text-[#49352D]">
                  <Landmark className="w-4 h-4 text-[#C87552]" />
                  <span>Official Bank Account (NEFT / RTGS / IMPS)</span>
                </div>
                <div className="space-y-2 font-mono text-[#49352D] pt-1">
                  <div className="flex justify-between">
                    <span className="font-sans text-[#78665E]">Bank:</span>
                    <span className="font-semibold">{bankName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[#78665E]">A/C Number:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{bankAccount}</span>
                      <button onClick={() => handleCopy(bankAccount, 'acct')} className="text-[#C87552] hover:underline font-sans font-medium">
                        {copiedField === 'acct' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[#78665E]">IFSC Code:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{bankIfsc}</span>
                      <button onClick={() => handleCopy(bankIfsc, 'ifsc')} className="text-[#C87552] hover:underline font-sans font-medium">
                        {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-[#78665E]">UPI ID:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#C87552]">{upiId}</span>
                      <button onClick={() => handleCopy(upiId, 'upi')} className="text-[#C87552] hover:underline font-sans font-medium">
                        {copiedField === 'upi' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-[#78665E] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#78866B] flex-shrink-0" />
                <span>Registered Trust under Indian Trusts Act 1882 • Section 80G Certified</span>
              </div>
            </div>

            {/* Right Column: One-Page Fast Donation Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-[#EFE4DC]">
              <form onSubmit={handleDonationSubmit} className="space-y-6">
                {/* 1. Quick Amount Selection */}
                <div>
                  <label className="block text-xs font-medium text-[#78665E] mb-2">
                    Step 1: Select contribution amount
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {quickAmounts.map((item) => {
                      const isSelected = selectedTier === item.val && !customAmount;
                      return (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => {
                            setSelectedTier(item.val);
                            setCustomAmount('');
                          }}
                          className={`p-3 rounded-xl text-left border transition-colors ${
                            isSelected
                              ? 'bg-[#F4D6C6]/40 border-[#C87552]'
                              : 'bg-[#FFF8F0]/30 border-[#EFE4DC] hover:border-[#F4D6C6]'
                          }`}
                        >
                          <span className={`block text-base font-serif font-bold tabular-nums ${isSelected ? 'text-[#C87552]' : 'text-[#49352D]'}`}>
                            {item.label}
                          </span>
                          <span className="text-[11px] text-[#78665E] block leading-tight mt-0.5">
                            {item.note}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount */}
                  <div className="mt-3 relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-[#78665E]">₹</span>
                    <input
                      type="number"
                      min="10"
                      placeholder="Or enter custom amount..."
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value) setSelectedTier(0);
                      }}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm font-medium text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 2. Campaign Selection */}
                <div>
                  <label className="block text-xs font-medium text-[#78665E] mb-1.5">
                    Direct contribution toward:
                  </label>
                  <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm focus:border-[#C87552] focus:bg-white focus:outline-hidden font-medium text-[#49352D]"
                  >
                    <option value="Wherever Most Needed">Wherever Most Needed</option>
                    <option value="Child Education">Child Education (Free Schooling & Books)</option>
                    <option value="Food Distribution & Hunger Relief">Food Distribution &amp; Hunger Relief</option>
                    <option value="Free School Stationery">Free School Stationery</option>
                    <option value="Helping Poor Families">Helping Poor Families</option>
                    <option value="Healthcare Support">Healthcare Support</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Minimal Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-[#EFE4DC] pt-4">
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
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
                      value={formData.donor_phone}
                      onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Email Address <span className="text-[#78665E] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      PAN Number <span className="text-[#78665E] font-normal">(Optional, for 80G)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={formData.pan_number}
                      onChange={(e) => setFormData({ ...formData, pan_number: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm uppercase text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                {/* 4. Payment Mode Buttons */}
                <div className="border-t border-[#EFE4DC] pt-4">
                  <label className="block text-xs font-medium text-[#78665E] mb-2">
                    Select payment method
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['UPI (Mobile / QR)', 'Credit/Debit Card / NetBanking', 'Direct Bank Transfer (NEFT)'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPaymentMode(mode)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-colors ${
                          paymentMode === mode
                            ? 'bg-[#C87552] text-white border-[#C87552]'
                            : 'bg-[#FFF8F0] text-[#49352D] border-[#EFE4DC] hover:border-[#F4D6C6]'
                        }`}
                      >
                        {mode.includes('UPI') ? 'UPI / QR' : mode.includes('Card') ? 'Cards/NetBanking' : 'Bank Transfer'}
                      </button>
                    ))}
                  </div>

                  {/* QR Code preview when UPI selected */}
                  {paymentMode.includes('UPI') && (
                    <div className="mt-3.5 p-3.5 bg-[#FFF8F0] rounded-xl border border-[#EFE4DC] flex items-center gap-4">
                      <div className="relative w-24 h-24 bg-white rounded-xl p-1.5 border border-[#EFE4DC] flex-shrink-0">
                        <ImageWithFallback
                          src={qrCode}
                          fallbackSrc="/images/placeholder-general.svg"
                          alt="VN Vidhyapeeth UPI QR Code"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-[#49352D] block">Scan &amp; pay directly</span>
                        <p className="text-[11px] text-[#78665E]">
                          Scan using GPay, PhonePe, Paytm, or BHIM. UPI ID: <strong className="text-[#C87552]">{upiId}</strong>
                        </p>
                        <a
                          href={upiDeepLink}
                          className="inline-flex items-center gap-1.5 text-xs text-[#78665E] hover:text-[#C87552] font-medium underline pt-0.5"
                        >
                          <Smartphone className="w-3.5 h-3.5 text-[#C87552]" />
                          <span>Open in Mobile UPI App</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-3 rounded-xl font-medium text-sm shadow-xs transition-colors active:scale-[0.99] disabled:opacity-50"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>
                      {loading ? 'Processing donation...' : `Donate ₹${amount.toLocaleString('en-IN')} now`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
