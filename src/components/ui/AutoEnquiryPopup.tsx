'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, GraduationCap, Send, Phone, User, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface PopupSettingsData {
  is_enabled?: number;
  heading?: string;
  description?: string;
  delay_seconds?: number;
  frequency?: string;
  image_url?: string;
  button_text?: string;
}

interface AutoEnquiryPopupProps {
  settings?: PopupSettingsData;
}

export default function AutoEnquiryPopup({ settings }: AutoEnquiryPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course_interest: 'Diploma in Medical Laboratory Technology (DMLT)',
    message: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const isEnabled = settings?.is_enabled ?? 1;
  const heading = settings?.heading || 'Admissions Open 2025–2026';
  const description =
    settings?.description ||
    'Connect with our admissions team for certified paramedical, IT, and vocational healthcare diplomas.';
  const delaySec = settings?.delay_seconds ?? 4;
  const frequency = settings?.frequency || 'once_session';
  const bannerImage = settings?.image_url || '/images/newslider1.jpg';
  const buttonText = settings?.button_text || 'Submit Enquiry';

  useEffect(() => {
    if (isEnabled === 0) return;

    // Check frequency dismissal
    if (typeof window !== 'undefined') {
      if (frequency === 'once_session') {
        if (sessionStorage.getItem('vnv_enquiry_dismissed')) {
          return;
        }
      } else if (frequency === 'once_day') {
        const lastDismissed = localStorage.getItem('vnv_enquiry_dismissed_time');
        if (lastDismissed) {
          const hoursAgo = (Date.now() - parseInt(lastDismissed, 10)) / (1000 * 60 * 60);
          if (hoursAgo < 24) return;
        }
      }

      // Check if another modal or form is currently focused/opened
      const timer = setTimeout(() => {
        // Double check not dismissed in another tab
        const alreadyDismissed = sessionStorage.getItem('vnv_enquiry_dismissed');
        if (!alreadyDismissed) {
          setIsOpen(true);
        }
      }, delaySec * 1000);

      return () => clearTimeout(timer);
    }
  }, [isEnabled, delaySec, frequency]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      if (frequency === 'once_session') {
        sessionStorage.setItem('vnv_enquiry_dismissed', 'true');
      } else if (frequency === 'once_day') {
        localStorage.setItem('vnv_enquiry_dismissed_time', Date.now().toString());
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'admission_popup',
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: `${cleanPhone}@portal.vnvidhyapeeth.ac.in`,
          course_interest: formData.course_interest,
          message: formData.message.trim() || 'Auto-popup admission interest inquiry'
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setIsSubmitted(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vnv_enquiry_dismissed', 'true');
        localStorage.setItem('vnv_enquiry_dismissed_time', Date.now().toString());
      }
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    } catch {
      setErrorMsg('Failed to send enquiry. Please contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header with Image & Branding */}
        <div className="relative h-36 w-full bg-slate-900 flex flex-col justify-end p-6 text-white overflow-hidden">
          <Image
            src={bannerImage}
            alt="VN Vidhyapeeth Education"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102C63] via-[#102C63]/80 to-transparent" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D52D2D] text-white tracking-wide uppercase">
              <GraduationCap className="w-3.5 h-3.5" />
              Admission Helpline
            </span>
            <h3 className="text-xl font-bold text-white mt-1.5 leading-tight">{heading}</h3>
            <p className="text-xs text-blue-100 line-clamp-1 mt-0.5">{description}</p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Thank You for Inquiring!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Your enquiry has been received. Our admission counselor will contact you shortly on WhatsApp or call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Course Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interested Course Program
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.course_interest}
                    onChange={(e) => setFormData({ ...formData, course_interest: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91] focus:border-transparent bg-white text-slate-800"
                  >
                    <option value="Diploma in Medical Laboratory Technology (DMLT)">DMLT - Medical Lab Technology</option>
                    <option value="Diploma in Physiotherapy (DPT)">DPT - Physiotherapy</option>
                    <option value="Diploma in Operation Theatre Technology (DOTT)">DOTT - Operation Theatre</option>
                    <option value="Diploma in X-Ray & Imaging (DXRT)">DXRT - X-Ray & Imaging</option>
                    <option value="Diploma in Naturopathy & Yogic Sciences (DNYS)">DNYS - Naturopathy & Yoga</option>
                    <option value="Advance Diploma in Computer Applications (ADCA)">ADCA - Computer Diploma</option>
                    <option value="Tally Prime & GST Professional Accounting">Tally Prime & GST</option>
                    <option value="Vocational & Industrial Trades">Vocational & Industrial Trades</option>
                    <option value="Other Certificate Course">Other Educational Programs</option>
                  </select>
                </div>
              </div>

              {/* Remarks / Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Question or Remarks (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ask about syllabus, fees, study mode, or batch dates..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91] focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-[#183F91] hover:bg-[#102C63] text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {buttonText}
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                Operated by Registered Trust under Indian Trust Act 1882 • ISO 9001:2015
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
