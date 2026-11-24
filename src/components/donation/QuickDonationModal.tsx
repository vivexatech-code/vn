'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X, Heart, CheckCircle2, QrCode, CreditCard, Landmark,
  Copy, ShieldCheck, ArrowRight, ArrowLeft, Smartphone, Download, Printer, Sparkles
} from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface QuickDonationModalProps {
  defaultAmount?: number;
  defaultCampaign?: string;
  bankSettings?: {
    bank_name?: string;
    bank_account?: string;
    bank_ifsc?: string;
    bank_holder?: string;
    upi_id?: string;
    qr_code_url?: string;
  };
}

export default function QuickDonationModal({
  defaultAmount = 501,
  defaultCampaign = 'Wherever Most Needed',
  bankSettings
}: QuickDonationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Amount & Campaign
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>(defaultCampaign);

  // Step 2: Minimal Donor Details (Email optional)
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');

  // Step 3: Payment Method
  const [paymentMode, setPaymentMode] = useState<'upi_intent' | 'upi_qr' | 'gateway' | 'bank'>('upi_intent');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Step 4: Receipt / Confirmation
  const [receiptData, setReceiptData] = useState<{
    id: number;
    receipt_no: string;
    transaction_id: string;
    amount: number;
    donor_name: string;
    campaign_title: string;
    status: string;
  } | null>(null);

  const quickAmounts = [
    { amount: 101, label: '₹101', note: 'Help Someone' },
    { amount: 251, label: '₹251', note: 'Support a Child' },
    { amount: 501, label: '₹501', note: 'Basic Needs' },
    { amount: 1001, label: '₹1,001', note: 'Bigger Impact' },
    { amount: 2501, label: '₹2,501', note: 'Sponsor Child' }
  ];

  const campaigns = [
    'Wherever Most Needed',
    "Children's Education",
    'Food Distribution & Hunger Relief',
    'Free School Stationery',
    'Helping Poor Families',
    'General Social Welfare'
  ];

  const upiId = bankSettings?.upi_id || 'vnvidhyapeeth@pnb';
  const qrCodeUrl = bankSettings?.qr_code_url || '/images/ngo/donation-banner.jpg';
  const bankName = bankSettings?.bank_name || 'Punjab National Bank (PNB)';
  const bankAccount = bankSettings?.bank_account || '4123000100987654';
  const bankIfsc = bankSettings?.bank_ifsc || 'PUNB0123400';
  const bankHolder = bankSettings?.bank_holder || 'VN Vidhyapeeth Educational & Social Welfare Trust';

  // Listen for global open event
  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ amount?: number; campaign?: string }>;
      if (customEvent.detail?.amount) {
        setSelectedAmount(customEvent.detail.amount);
        setCustomAmount('');
      }
      if (customEvent.detail?.campaign) {
        setSelectedCampaign(customEvent.detail.campaign);
      }
      setIsOpen(true);
      setStep(1);
    };

    window.addEventListener('open-quick-donation', handleOpenEvent);
    return () => window.removeEventListener('open-quick-donation', handleOpenEvent);
  }, []);

  const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleProceedToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount < 10) {
      setErrorMsg('Please select or enter a donation amount of at least ₹10');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanPhone = donorPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10 && !donorEmail.trim()) {
      setErrorMsg('Please enter a valid 10-digit mobile number or email');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleCompleteDonation = async (modeOverride?: string) => {
    setIsSubmitting(true);
    setErrorMsg('');

    const chosenMode = modeOverride || (
      paymentMode === 'upi_intent' ? 'UPI (Mobile Intent)' :
      paymentMode === 'upi_qr' ? 'UPI / QR Scan' :
      paymentMode === 'gateway' ? 'Online Gateway (Cards/NetBanking)' :
      'Bank Transfer (NEFT/IMPS)'
    );

    const generatedTxn = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donor_name: donorName.trim(),
          donor_phone: donorPhone.trim(),
          donor_email: donorEmail.trim(),
          pan_number: panNumber.trim().toUpperCase(),
          amount: effectiveAmount,
          payment_mode: chosenMode,
          transaction_id: generatedTxn,
          campaign_title: selectedCampaign,
          status: chosenMode.includes('Bank Transfer') ? 'pending' : 'verified'
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Donation could not be processed');

      setReceiptData({
        id: data.donation_id,
        receipt_no: data.receipt_no,
        transaction_id: data.transaction_id || generatedTxn,
        amount: effectiveAmount,
        donor_name: donorName.trim(),
        campaign_title: selectedCampaign,
        status: data.status
      });

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vnv_donation_completed', 'true');
      }

      setStep(4);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to register donation';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('VN Vidhyapeeth')}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(`Donation for ${selectedCampaign}`)}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#49352D]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-xl border border-[#EFE4DC] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar - Warm Deep Brown */}
        <div className="bg-[#49352D] text-[#FFF8F0] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C87552] flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold leading-tight">
                VN Vidhyapeeth Donation
              </h2>
              <span className="text-[11px] text-[#F4D6C6] block mt-0.5">
                {step === 1 && 'Step 1: Select amount and cause'}
                {step === 2 && 'Step 2: Donor details'}
                {step === 3 && 'Step 3: Payment method'}
                {step === 4 && 'Step 4: Official receipt and confirmation'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Donation Modal"
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-[#C87552] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar in Terracotta */}
        <div className="w-full bg-[#FFF8F0] h-1.5 border-b border-[#EFE4DC]">
          <div
            className="bg-[#C87552] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="m-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7">
          {/* STEP 1: Select Amount & Cause */}
          {step === 1 && (
            <form onSubmit={handleProceedToDetails} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#78665E] mb-2.5">
                  Select donation amount:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {quickAmounts.map((item) => {
                    const isSelected = selectedAmount === item.amount && !customAmount;
                    return (
                      <button
                        type="button"
                        key={item.amount}
                        onClick={() => {
                          setSelectedAmount(item.amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-2 rounded-xl border text-center transition-colors ${
                          isSelected
                            ? 'bg-[#F4D6C6]/40 border-[#C87552] text-[#C87552]'
                            : 'bg-[#FFF8F0]/40 border-[#EFE4DC] text-[#49352D] hover:border-[#F4D6C6]'
                        }`}
                      >
                        <span className="block text-sm sm:text-base font-serif font-bold tabular-nums">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-[#78665E] block leading-tight mt-0.5">
                          {item.note}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-[#78665E] mb-1 font-medium">
                    Or enter custom amount (₹ INR):
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#78665E]">₹</span>
                    <input
                      type="number"
                      min="10"
                      placeholder="Enter other amount (e.g. 1500)"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm font-medium text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#78665E] mb-1.5">
                  Allocate donation to:
                </label>
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden font-medium"
                >
                  {campaigns.map((camp) => (
                    <option key={camp} value={camp}>{camp}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors active:scale-[0.99]"
                >
                  <span>Donate ₹{effectiveAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center text-[11px] text-[#78665E] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#78866B]" />
                <span>Registered Trust (Indian Trusts Act 1882) • No Account Required</span>
              </div>
            </form>
          )}

          {/* STEP 2: Donor Details */}
          {step === 2 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="bg-[#FFF8F0] p-3 rounded-xl border border-[#EFE4DC] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#78665E] block">Donating to:</span>
                  <strong className="text-[#49352D]">{selectedCampaign}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[#78665E] block">Amount:</span>
                  <strong className="text-[#C87552] text-sm">₹{effectiveAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#49352D] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Mehra"
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
                  placeholder="e.g. 9876543210"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                />
                <span className="text-[10px] text-[#78665E]">We will send donation confirmation &amp; receipt via WhatsApp/SMS</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#49352D] mb-1">
                  Email Address <span className="text-[#78665E] font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. anand@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#49352D] mb-1">
                  PAN Number <span className="text-[#78665E] font-normal">(Optional, for 80G tax exemption)</span>
                </label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="ABCDE1234F"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-sm uppercase text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden font-mono"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#EFE4DC] text-xs font-medium text-[#49352D] hover:bg-[#FFF8F0] transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors active:scale-[0.99]"
                >
                  <span>Continue to payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Method */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-[#FFF8F0] p-3 rounded-xl border border-[#EFE4DC] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#78665E] block">Donor:</span>
                  <strong className="text-[#49352D]">{donorName}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[#78665E] block">Total Donation:</span>
                  <strong className="text-[#C87552] text-sm">₹{effectiveAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Payment Option Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_intent')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMode === 'upi_intent'
                      ? 'bg-[#C87552] text-white border-[#C87552] shadow-xs font-bold'
                      : 'bg-[#FFF8F0]/40 border-[#EFE4DC] text-[#49352D] hover:border-[#F4D6C6]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-xs">UPI App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_qr')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMode === 'upi_qr'
                      ? 'bg-[#C87552] text-white border-[#C87552] shadow-xs font-bold'
                      : 'bg-[#FFF8F0]/40 border-[#EFE4DC] text-[#49352D] hover:border-[#F4D6C6]'
                  }`}
                >
                  <QrCode className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-xs">UPI QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('gateway')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMode === 'gateway'
                      ? 'bg-[#C87552] text-white border-[#C87552] shadow-xs font-bold'
                      : 'bg-[#FFF8F0]/40 border-[#EFE4DC] text-[#49352D] hover:border-[#F4D6C6]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-xs">Cards / NetBank</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMode('bank')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMode === 'bank'
                      ? 'bg-[#C87552] text-white border-[#C87552] shadow-xs font-bold'
                      : 'bg-[#FFF8F0]/40 border-[#EFE4DC] text-[#49352D] hover:border-[#F4D6C6]'
                  }`}
                >
                  <Landmark className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-xs">NEFT / Bank</span>
                </button>
              </div>

              {/* Mode 1: UPI Intent */}
              {paymentMode === 'upi_intent' && (
                <div className="p-4 bg-[#FFF8F0] border border-[#EFE4DC] rounded-2xl space-y-3 text-center">
                  <p className="text-xs text-[#78665E]">
                    Tap below to launch Google Pay, PhonePe, Paytm, or BHIM directly:
                  </p>

                  <a
                    href={upiDeepLink}
                    onClick={() => handleCompleteDonation('UPI (Mobile Intent)')}
                    className="inline-flex items-center justify-center gap-2 bg-[#78866B] hover:bg-[#657358] text-white py-2.5 px-6 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors w-full active:scale-[0.99]"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Launch UPI App &amp; Complete Donation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-[#78665E]">
                    <span>Or copy UPI ID:</span>
                    <code className="bg-white px-2 py-0.5 rounded font-mono font-semibold text-[#49352D]">{upiId}</code>
                    <button
                      onClick={() => handleCopy(upiId, 'upi_intent')}
                      className="text-[#C87552] hover:underline font-medium"
                    >
                      {copiedField === 'upi_intent' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {/* Mode 2: UPI QR Code */}
              {paymentMode === 'upi_qr' && (
                <div className="p-4 bg-[#FFF8F0] border border-[#EFE4DC] rounded-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="relative w-36 h-36 bg-white rounded-xl p-2 border border-[#EFE4DC] flex-shrink-0 shadow-xs">
                    <ImageWithFallback
                      src={qrCodeUrl}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt="VN Vidhyapeeth UPI QR"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-semibold text-[#49352D]">
                      Scan QR Code to Pay ₹{effectiveAmount.toLocaleString('en-IN')}
                    </h4>
                    <p className="text-xs text-[#78665E]">
                      Open any UPI scanner on your phone to transfer directly to VN Vidhyapeeth.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                      <code className="bg-white px-2.5 py-1 rounded-md border border-[#EFE4DC] font-mono text-xs font-semibold text-[#49352D]">
                        {upiId}
                      </code>
                      <button
                        onClick={() => handleCopy(upiId, 'upi_qr')}
                        className="bg-[#C87552] text-white px-2.5 py-1 rounded-md text-xs font-medium"
                      >
                        {copiedField === 'upi_qr' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleCompleteDonation('UPI / QR Scan')}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#78866B] hover:bg-[#657358] text-white py-2 px-3 rounded-xl text-xs font-medium transition-colors shadow-xs mt-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>I have completed UPI payment</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mode 3: Instant Gateway (Card / NetBanking) */}
              {paymentMode === 'gateway' && (
                <div className="p-4 bg-[#FFF8F0] border border-[#EFE4DC] rounded-xl space-y-3">
                  <h4 className="text-xs font-semibold text-[#49352D]">
                    Secure online payment gateway
                  </h4>
                  <p className="text-xs text-[#78665E]">
                    Pay securely using any Indian Debit Card, Credit Card, or Net Banking portal with 256-bit encryption.
                  </p>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleCompleteDonation('Online Gateway (Cards/NetBanking)')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50 active:scale-[0.99]"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isSubmitting ? 'Processing Payment...' : `Pay ₹${effectiveAmount.toLocaleString('en-IN')} Securely`}</span>
                  </button>
                </div>
              )}

              {/* Mode 4: Direct Bank Transfer */}
              {paymentMode === 'bank' && (
                <div className="p-4 bg-[#FFF8F0] border border-[#EFE4DC] rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#EFE4DC]">
                    <span className="text-[#78665E]">Bank name</span>
                    <span className="font-semibold text-[#49352D]">{bankName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EFE4DC]">
                    <span className="text-[#78665E]">Account name</span>
                    <span className="font-semibold text-[#49352D]">{bankHolder}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EFE4DC]">
                    <span className="text-[#78665E]">Account number</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-semibold text-[#49352D]">{bankAccount}</span>
                      <button onClick={() => handleCopy(bankAccount, 'acc')} className="text-[#C87552] font-medium underline">
                        {copiedField === 'acc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EFE4DC]">
                    <span className="text-[#78665E]">IFSC code</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-semibold text-[#49352D]">{bankIfsc}</span>
                      <button onClick={() => handleCopy(bankIfsc, 'ifsc')} className="text-[#C87552] font-medium underline">
                        {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleCompleteDonation('Bank Transfer (NEFT/IMPS)')}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#49352D] hover:bg-[#382822] text-white py-2.5 rounded-xl text-xs font-medium transition-colors shadow-xs mt-3 active:scale-[0.99]"
                  >
                    <span>Record bank transfer for receipt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[#78665E] hover:text-[#49352D] flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Donor Details</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Receipt with Clear Next Steps */}
          {step === 4 && receiptData && (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 bg-[#EBF0E6] text-[#78866B] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#49352D]">
                  Thank You for Your Generosity!
                </h3>
                <p className="text-xs sm:text-sm text-[#78665E] mt-1 max-w-sm mx-auto">
                  Your contribution of <strong className="text-[#C87552]">₹{receiptData.amount.toLocaleString('en-IN')}</strong> to <strong>{receiptData.campaign_title}</strong> directly brings hope and relief.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-[#FFF8F0] rounded-2xl border border-[#EFE4DC] text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between pb-1.5 border-b border-[#EFE4DC]">
                  <span className="text-[#78665E] font-sans">Official Receipt No:</span>
                  <span className="font-bold text-[#C87552]">{receiptData.receipt_no}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#EFE4DC]">
                  <span className="text-[#78665E] font-sans">Transaction Reference:</span>
                  <span className="font-medium text-[#49352D]">{receiptData.transaction_id}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#EFE4DC]">
                  <span className="text-[#78665E] font-sans">Donor Name:</span>
                  <span className="font-semibold text-[#49352D] font-sans">{receiptData.donor_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78665E] font-sans">Status:</span>
                  <span className="font-bold text-[#78866B] uppercase">{receiptData.status}</span>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="p-4 bg-[#EBF0E6]/60 border border-[#78866B]/30 rounded-2xl text-left text-xs text-[#49352D] space-y-1.5">
                <span className="font-bold block text-[#78866B]">Next Steps for Your Contribution:</span>
                <p>1. Your funds are credited directly to the VN Vidhyapeeth registered trust account.</p>
                <p>2. Your receipt has been archived for 80G tax benefit calculation.</p>
                <p>3. WhatsApp our support desk (+91 7015358183) anytime for questions or updates.</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white px-5 py-2.5 rounded-xl text-xs font-medium transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download full 80G receipt</span>
                </Link>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 bg-white border border-[#EFE4DC] text-[#49352D] px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-[#FFF8F0] transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print summary</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-[#78665E]">
                A confirmation has been recorded with VN Vidhyapeeth Educational &amp; Social Welfare Trust.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
