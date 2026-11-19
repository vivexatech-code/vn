'use client';

import React, { useState } from 'react';
import { Users, Heart, CheckCircle2, Send, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function VolunteerSection() {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    city: '',
    areas_of_interest: 'Education for Every Child',
    availability: 'Weekends (Saturday & Sunday)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#F7F8FC]" id="volunteer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual & Call to Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span>Join Our Community of Changemakers</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#102C63] leading-tight">
              Volunteer With Us &amp; Impact Lives Firsthand
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Real social change happens on the ground. Whether you can give a few hours on a Sunday to teach, help pack stationery kits, or distribute hot meals to homeless families, your presence matters.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Teach underprivileged children in evening tutoring centers</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Distribute wholesome meals &amp; grocery ration kits</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Assemble &amp; hand over free school stationery packs</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Receive verified NGO volunteer participation certificate</span>
              </div>
            </div>

            {/* Volunteer Team Image Preview */}
            <div className="relative h-48 rounded-3xl overflow-hidden shadow-md border-2 border-white">
              <ImageWithFallback
                src="/images/ngo/volunteer-team.jpg"
                fallbackSrc="/images/placeholder-general.svg"
                alt="VN Vidhyapeeth Volunteers"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102C63]/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold">
                  Over 450+ Active Dedicated Volunteers Across Haryana &amp; Delhi NCR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-[#102C63]">
                  Register as a Volunteer
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details and our volunteer coordinator will connect with you via WhatsApp or Call.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    Thank You for Stepping Forward!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Your volunteer registration has been received. Our team will reach out to you within 24–48 hours with upcoming distribution drives.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        full_name: '',
                        mobile: '',
                        email: '',
                        city: '',
                        areas_of_interest: 'Education for Every Child',
                        availability: 'Weekends (Saturday & Sunday)',
                        message: ''
                      });
                    }}
                    className="text-xs font-bold text-[#183F91] hover:underline pt-2"
                  >
                    Register Another Person
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City / District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Sirsa, Hisar, Delhi"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Area of Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.areas_of_interest}
                        onChange={(e) => setFormData({ ...formData, areas_of_interest: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                      >
                        <option value="Education for Every Child">Education &amp; Teaching Children</option>
                        <option value="Food Distribution & Meals">Food Distribution &amp; Meal Relief</option>
                        <option value="Free Stationery Kits">Stationery Packaging &amp; Distribution</option>
                        <option value="Social Welfare & Community">Social Welfare &amp; Community Drives</option>
                        <option value="Event Coordination & Digital">Event Coordination &amp; Media</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Availability <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                      >
                        <option value="Weekends (Saturday & Sunday)">Weekends (Saturday &amp; Sunday)</option>
                        <option value="Weekdays (Morning or Evening)">Weekdays (Morning / Evening)</option>
                        <option value="Flexible / As Needed">Flexible / As Needed</option>
                        <option value="Full Time Internship">Full Time Social Internship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Brief Message or Relevant Skills (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us a little about yourself or what motivates you to volunteer..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting Registration...' : 'Submit Volunteer Registration'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
