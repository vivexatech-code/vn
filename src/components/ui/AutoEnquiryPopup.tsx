'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Heart, Send, Phone, User, BookOpen } from 'lucide-react';
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
    course_interest: 'Education for Every Child (Child Sponsorship)',
    message: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const isEnabled = settings?.is_enabled ?? 1;
  const heading = settings?.heading || "Change a Child's Life Today";
  const description =
    settings?.description ||
    'Your small contribution provides free notebooks, daily wholesome meals, and educational aid to children in need.';
  const delaySec = settings?.delay_seconds ?? 4;
  const frequency = settings?.frequency || 'once_session';
  const bannerImage = settings?.image_url || '/images/ngo/campaign-child-education.jpg';
  const buttonText = settings?.button_text || 'Support Our Cause';

  useEffect(() => {
    if (isEnabled === 0) return;

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

      const timer = setTimeout(() => {
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
          type: 'donation_inquiry',
          name: formData.name,
          phone: formData.phone,
          course_interest: formData.course_interest,
          message: formData.message || 'Submitted via homepage welfare popup'
        })
      });

      if (!res.ok) throw new Error('Submission failed');

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
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300"
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
            alt="VN Vidhyapeeth Social Welfare"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102C63] via-[#102C63]/80 to-transparent" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D52D2D] text-white tracking-wide uppercase">
              <Heart className="w-3.5 h-3.5 fill-white" />
              Community Welfare Mission
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
                Your message has been received. Our coordinator will contact you shortly on WhatsApp or Call with next steps.
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
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F91]"
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
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                  />
                </div>
              </div>

              {/* Area of Support */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  I Want to Inquire About:
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.course_interest}
                    onChange={(e) => setFormData({ ...formData, course_interest: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183F91] bg-white text-slate-700"
                  >
                    <option value="Education for Every Child (Child Sponsorship)">
                      Education for Every Child (Child Sponsorship)
                    </option>
                    <option value="Food Distribution & Hunger Relief">
                      Food Distribution &amp; Hunger Relief
                    </option>
                    <option value="Free School Stationery Distribution">
                      Free School Stationery Distribution
                    </option>
                    <option value="Volunteer Registration & Ground Support">
                      Volunteer Registration &amp; Ground Support
                    </option>
                    <option value="General Social Welfare & 80G Tax Exemption">
                      General Social Welfare &amp; 80G Tax Exemption
                    </option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#D52D2D] hover:bg-[#b82424] transition-all duration-200 shadow disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting...' : buttonText}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
