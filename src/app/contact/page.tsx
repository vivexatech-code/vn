'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/components/common/PageHeader';
import {
  MapPin, Phone, Mail, Building, Landmark,
  CheckCircle2, Send, Loader2, ShieldCheck, Clock
} from 'lucide-react';

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get('type') || 'general';
  const defaultCourse = searchParams.get('course') || '';

  const [type, setType] = useState(defaultType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseInterest, setCourseInterest] = useState(defaultCourse);
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (defaultType) setType(defaultType);
    if (defaultCourse) setCourseInterest(defaultCourse);
  }, [defaultType, defaultCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name,
          email,
          phone,
          course_interest: courseInterest,
          address,
          message
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to submit enquiry.');
      }
    } catch {
      setErrorMessage('Network error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#EFE4DC]">
      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#78866B]/20 text-[#78866B] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-black text-2xl text-[#49352D]">
            Enquiry Successfully Submitted!
          </h3>
          <p className="text-sm text-[#78665E] max-w-md mx-auto leading-relaxed">
            Thank you for contacting <strong>VN Vidhyapeeth</strong>. Our administrative desk has received your request and will contact you via phone or email within 24 business hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="mt-4 inline-block bg-[#C87552] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#B56140] transition"
          >
            Submit Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-serif font-black text-2xl text-[#49352D]">
              Send an Official Message
            </h3>
            <p className="text-xs sm:text-sm text-[#78665E] mt-1">
              Select inquiry category to route your message to the appropriate department.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Form Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'general', label: 'General Inquiry' },
              { id: 'donation', label: 'Donation & 80G' },
              { id: 'volunteer', label: 'Volunteer With Us' },
              { id: 'initiatives', label: 'Welfare Programs' }
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setType(t.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition ${
                  type === t.id
                    ? 'bg-[#C87552] text-white shadow-xs'
                    : 'bg-[#FFF8F0] text-[#49352D] border border-[#EFE4DC] hover:bg-[#F4D6C6]/40'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#49352D] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#C87552]/20 focus:border-[#C87552]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#49352D] mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#C87552]/20 focus:border-[#C87552]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#49352D] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#C87552]/20 focus:border-[#C87552]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#49352D] mb-1">
                Program of Interest (Optional)
              </label>
              <input
                type="text"
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                placeholder="e.g. Child Education, Food Relief"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#C87552]/20 focus:border-[#C87552]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#49352D] mb-1">
              Your City / State / District
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Sirsa, Haryana"
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#C87552]/20 focus:border-[#C87552]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#49352D] mb-1">
              Detailed Message / Query *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your enquiry, volunteer interest, or partnership query..."
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFFDFB] focus:outline-none focus:ring-2 focus:ring-[#C87552]/20 focus:border-[#C87552]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-3.5 rounded-xl font-semibold text-sm shadow-md transition disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Official Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        badge="Connect with Us"
        title="Contact VN Vidhyapeeth"
        subtitle="Reach out to our Head Office or Registered Delhi Office for donations, volunteering, or social welfare partnerships."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-16 sm:py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details & Addresses (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Head Office Card */}
              <div className="bg-white p-7 rounded-3xl shadow-xs border border-[#EFE4DC] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F4D6C6]/50 text-[#C87552] flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C87552]">Head Office</span>
                    <h3 className="font-serif font-bold text-lg text-[#49352D]">
                      Administrative Office &amp; Operations
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#78665E] leading-relaxed">
                  Panchmukhi Chowk, Nohar Road, Ellenabad, Sirsa, Haryana – 125102
                </p>

                <div className="pt-2 border-t border-[#EFE4DC] space-y-2 text-xs text-[#78665E]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#C87552]" />
                    <span className="font-semibold text-[#49352D]">+91 7015358183 / +91 8199048325</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#C87552]" />
                    <span>vnvidyapeeth@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#78665E]">
                    <Clock className="w-3.5 h-3.5 text-[#78665E]" />
                    <span>Mon - Sat: 9:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Registered Office Card */}
              <div className="bg-white p-7 rounded-3xl shadow-xs border border-[#EFE4DC] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C87552]/10 text-[#C87552] flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C87552]">Trust Headquarters</span>
                    <h3 className="font-serif font-bold text-lg text-[#49352D]">
                      Registered National Office
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#78665E] leading-relaxed">
                  1359 A, Gali Number 8, Govind Puri, New Delhi – 110019, India
                </p>

                <div className="pt-2 border-t border-[#EFE4DC] text-xs text-[#49352D] font-medium">
                  Registered under Indian Trust Act 1882
                </div>
              </div>

              {/* Bank Donation Snapshot */}
              <div className="bg-[#49352D] text-white p-6 rounded-3xl space-y-3 border border-[#C87552]/30">
                <h4 className="font-bold text-base text-white">
                  Official NGO Bank Account
                </h4>
                <p className="text-xs text-[#F4D6C6]">
                  Authorized Punjab National Bank account for social welfare contributions:
                </p>
                <div className="text-xs text-[#FFF8F0]/90 space-y-1 font-mono">
                  <p>Bank: Punjab National Bank</p>
                  <p>A/C: 0442102100000677</p>
                  <p>IFSC: PUNB0044210</p>
                  <p>Holder: VN VidhyaPeeth</p>
                </div>
              </div>
            </div>

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-12 text-center text-xs">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
