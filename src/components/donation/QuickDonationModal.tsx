'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X, Heart, CheckCircle2, QrCode, CreditCard, Landmark,
  Copy, ShieldCheck, ArrowRight, ArrowLeft, Smartphone, Download, Printer
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

  // Step 2: Minimal Donor Details
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

  const quickAmounts = [101, 251, 501, 1001, 2501];

  const campaigns = [
    'Wherever Most Needed',
    "Children's Education",
    'Food Distribution & Hunger Relief',
    'Free School Stationery',
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

      setStep(4);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to register donation';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPI deep link for mobile devices
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('VN Vidhyapeeth')}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(`Donation for ${selectedCampaign}`)}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#102C63] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D52D2D] flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight">
                VN Vidhyapeeth Donation
              </h2>
              <span className="text-[11px] text-blue-200 block">
                {step === 1 && 'Step 1: Select Amount & Cause'}
                {step === 2 && 'Step 2: Donor Details'}
                {step === 3 && 'Step 3: Payment Method'}
                {step === 4 && 'Step 4: Official Receipt & Confirmation'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Donation Modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-[#D52D2D] h-full transition-all duration-300"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Select Donation Amount:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {quickAmounts.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 px-3 rounded-xl text-center font-bold text-sm transition ${
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
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Or enter custom amount (₹ INR):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="10"
                    placeholder="Enter other amount (e.g. 1500)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setSelectedAmount(0);
                    }}
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>
              </div>

              {/* Campaign Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Allocate Donation To:
                </label>
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
                >
                  {campaigns.map((camp) => (
                    <option key={camp} value={camp}>
                      {camp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary Pill & Next Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition"
                >
                  <span>Donate ₹{effectiveAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Registered Trust (Indian Trusts Act 1882) • No Account Required</span>
              </div>
            </form>
          )}

          {/* STEP 2: Donor Details */}
          {step === 2 && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Donating to:</span>
                  <span className="text-xs font-bold text-[#102C63]">{selectedCampaign}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Amount:</span>
                  <span className="text-sm font-extrabold text-[#D52D2D]">₹{effectiveAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Anand Mehra"
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
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Used to send your instant receipt &amp; confirmation</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="e.g. anand@example.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  PAN Number <span className="text-slate-400 font-normal">(Optional, for 80G Tax Exemption)</span>
                </label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. ABCDE1234F"
                  maxLength={10}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none uppercase"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3 rounded-xl font-bold text-sm shadow-md transition"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Method Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-400 block">Donor</span>
                  <span className="text-xs font-bold text-[#102C63]">{donorName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Total Donation</span>
                  <span className="text-base font-extrabold text-[#D52D2D]">₹{effectiveAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Mode Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_intent')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMode === 'upi_intent'
                      ? 'bg-[#183F91] text-white border-[#183F91] shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI App</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('upi_qr')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMode === 'upi_qr'
                      ? 'bg-[#183F91] text-white border-[#183F91] shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('gateway')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMode === 'gateway'
                      ? 'bg-[#183F91] text-white border-[#183F91] shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards / NetBank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode('bank')}
                  className={`p-2.5 rounded-xl text-center border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    paymentMode === 'bank'
                      ? 'bg-[#183F91] text-white border-[#183F91] shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <Landmark className="w-4 h-4" />
                  <span>NEFT / Bank</span>
                </button>
              </div>

              {/* Mode 1: UPI Intent (Mobile App Launch) */}
              {paymentMode === 'upi_intent' && (
                <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#183F91] text-white flex items-center justify-center mx-auto">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#102C63]">
                    Pay Directly via Any UPI App
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Click below to open Google Pay, PhonePe, Paytm, or BHIM with ₹{effectiveAmount} pre-filled.
                  </p>

                  <a
                    href={upiDeepLink}
                    onClick={() => handleCompleteDonation('UPI (Mobile Intent)')}
                    className="inline-flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-3 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-md transition w-full"
                  >
                    <span>Launch UPI App &amp; Complete Donation</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                    <span>Or copy UPI ID:</span>
                    <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-[#102C63]">{upiId}</code>
                    <button
                      onClick={() => handleCopy(upiId, 'upi_intent')}
                      className="text-[#183F91] hover:underline font-semibold"
                    >
                      {copiedField === 'upi_intent' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}

              {/* Mode 2: UPI QR Code */}
              {paymentMode === 'upi_qr' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="relative w-36 h-36 bg-white rounded-xl p-2 border border-slate-200 flex-shrink-0 shadow-xs">
                    <ImageWithFallback
                      src={qrCodeUrl}
                      fallbackSrc="/images/placeholder-general.svg"
                      alt="VN Vidhyapeeth UPI QR"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-bold text-[#102C63]">
                      Scan QR Code to Pay ₹{effectiveAmount.toLocaleString('en-IN')}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Open any UPI scanner on your phone to transfer directly to VN Vidhyapeeth.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                      <code className="bg-white px-2.5 py-1 rounded-md border font-mono text-xs font-bold text-[#102C63]">
                        {upiId}
                      </code>
                      <button
                        onClick={() => handleCopy(upiId, 'upi_qr')}
                        className="bg-[#183F91] text-white px-2.5 py-1 rounded-md text-xs font-semibold"
                      >
                        {copiedField === 'upi_qr' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleCompleteDonation('UPI / QR Scan')}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D52D2D] hover:bg-[#b82424] text-white py-2 px-3 rounded-lg text-xs font-bold transition shadow-xs mt-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>I Have Completed UPI Payment</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mode 3: Instant Gateway (Card / NetBanking) */}
              {paymentMode === 'gateway' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-[#102C63] uppercase tracking-wider">
                    Secure Online Payment Gateway
                  </h4>
                  <p className="text-xs text-slate-600">
                    Pay securely using any Indian Debit Card, Credit Card, or Net Banking portal with 256-bit encryption.
                  </p>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleCompleteDonation('Online Gateway (Cards/NetBanking)')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#D52D2D] hover:bg-[#b82424] text-white py-3 rounded-xl font-bold text-sm shadow-md transition disabled:opacity-50"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{isSubmitting ? 'Processing Payment...' : `Pay ₹${effectiveAmount.toLocaleString('en-IN')} Securely`}</span>
                  </button>
                </div>
              )}

              {/* Mode 4: Direct Bank Transfer */}
              {paymentMode === 'bank' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Bank Name</span>
                    <span className="font-bold text-[#102C63]">{bankName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Account Name</span>
                    <span className="font-bold text-[#102C63]">{bankHolder}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Account Number</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-[#102C63]">{bankAccount}</span>
                      <button onClick={() => handleCopy(bankAccount, 'acc')} className="text-[#183F91] font-semibold underline">
                        {copiedField === 'acc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">IFSC Code</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-[#102C63]">{bankIfsc}</span>
                      <button onClick={() => handleCopy(bankIfsc, 'ifsc')} className="text-[#183F91] font-semibold underline">
                        {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleCompleteDonation('Bank Transfer (NEFT/IMPS)')}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#183F91] hover:bg-[#102C63] text-white py-2.5 rounded-xl text-xs font-bold transition shadow-xs mt-3"
                  >
                    <span>Record Bank Transfer for Receipt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-slate-500 hover:text-slate-700 flex items-center gap-1 font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Donor Details</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Receipt */}
          {step === 4 && receiptData && (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#102C63]">
                  Thank You for Your Generosity!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                  Your contribution of <strong className="text-[#D52D2D]">₹{receiptData.amount.toLocaleString('en-IN')}</strong> to <strong>{receiptData.campaign_title}</strong> directly brings hope and relief.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Official Receipt No:</span>
                  <span className="font-mono font-bold text-[#183F91]">{receiptData.receipt_no}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Transaction Reference:</span>
                  <span className="font-mono font-medium text-slate-700">{receiptData.transaction_id}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Donor Name:</span>
                  <span className="font-semibold text-slate-800">{receiptData.donor_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-700 uppercase">{receiptData.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full 80G Receipt</span>
                </Link>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Summary</span>
                </button>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                A confirmation has been recorded with VN Vidhyapeeth Educational &amp; Social Welfare Trust.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
