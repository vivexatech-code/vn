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
    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-100">
      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-black text-2xl text-[#102C63]">
            Enquiry Successfully Submitted!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for contacting <strong>VN Vidhyapeeth</strong>. Our administrative desk has received your request and will contact you via phone or email within 24 business hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="mt-4 inline-block bg-[#183F91] text-white px-6 py-2.5 rounded-full text-xs font-semibold"
          >
            Submit Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-serif font-black text-2xl text-[#102C63]">
              Send an Official Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
              { id: 'general', label: 'General' },
              { id: 'admission', label: 'Admission 2025' },
              { id: 'affiliation', label: 'Center Affiliation' },
              { id: 'volunteer', label: 'Volunteer / NGO' }
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setType(t.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition ${
                  type === t.id
                    ? 'bg-[#183F91] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Course Interest / Subject (Optional)
              </label>
              <input
                type="text"
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                placeholder="e.g. DMLT, DPT, ADCA"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your City / State / District
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Sirsa, Haryana"
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Message / Query *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your enquiry, admission background, or center affiliation details..."
              className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-3.5 rounded-xl font-semibold text-sm shadow-md transition disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Official Enquiry</span>
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
        subtitle="Reach out to our Head Office or Registered Delhi Office for admissions, center affiliation, or verification."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="py-16 sm:py-20 bg-[#F5F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details & Addresses (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Head Office Card */}
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">Head Office</span>
                    <h3 className="font-serif font-bold text-lg text-[#102C63]">
                      Documents Verification & HO
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Panchmukhi Chowk, Nohar Road, Ellenabad, Sirsa, Haryana – 125102
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-semibold text-slate-800">+91 7015358183 / +91 8199048325</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-red-500" />
                    <span>vnvidyapeeth@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mon - Sat: 9:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Registered Office Card */}
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#183F91] flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#183F91]">Trust Headquarters</span>
                    <h3 className="font-serif font-bold text-lg text-[#102C63]">
                      Registered National Office
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  1359 A, Gali Number 8, Govind Puri, New Delhi – 110019, India
                </p>

                <div className="pt-2 border-t border-slate-100 text-xs text-blue-900 font-medium">
                  Registered under Indian Trust Act 1882
                </div>
              </div>

              {/* Bank Fee Deposit Snapshot */}
              <div className="bg-[#102C63] text-white p-6 rounded-3xl space-y-3">
                <h4 className="font-bold text-base text-white">
                  Student Admission Fee Deposit
                </h4>
                <p className="text-xs text-blue-200">
                  Authorized Punjab National Bank account for academic fee payments:
                </p>
                <div className="text-xs text-blue-100 space-y-1 font-mono">
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
