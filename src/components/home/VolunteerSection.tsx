'use client';

import React, { useState } from 'react';
import { Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function VolunteerSection() {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    city: '',
    areas_of_interest: 'Education for Poor Children',
    availability: 'Weekends',
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
    <section className="py-20 sm:py-28 bg-[#F8F9FA] border-t border-slate-100" id="volunteer" aria-label="Volunteer With Us">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Call to Service */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
              <span>Join Hands With Us</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight leading-snug">
              Be the Reason Someone Smiles Today
            </h2>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              Whether you can give a few hours on a weekend to teach children, pack school stationery kits, or help distribute food rations, your presence makes a real difference on the ground.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#183F91] flex-shrink-0 mt-1" />
                <span className="text-sm text-slate-700">Teach or mentor children in community learning sessions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D52D2D] flex-shrink-0 mt-1" />
                <span className="text-sm text-slate-700">Participate in food distribution and dry grocery packing drives</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                <span className="text-sm text-slate-700">Hand over stationery kits and books directly to students</span>
              </div>
            </div>

            {/* Respectful Volunteer Team Image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 shadow-xs">
              <ImageWithFallback
                src="/images/ngo/volunteer-team.jpg"
                fallbackSrc="/images/placeholder-general.svg"
                alt="VN Vidhyapeeth Volunteers"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Clean Registration Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#102C63]">
                Register as a Volunteer
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Share your details and our team will get in touch with upcoming activities in your area.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">
                  Thank You for Stepping Forward!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                  Your volunteer details have been received. We look forward to working alongside you in the field.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#183F91] hover:underline pt-2 block mx-auto"
                >
                  Register Another Volunteer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Meera Verma"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. meera@example.org"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      City / Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Delhi NCR / Haryana"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Area of Interest
                    </label>
                    <select
                      value={formData.areas_of_interest}
                      onChange={(e) => setFormData({ ...formData, areas_of_interest: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
                    >
                      <option value="Education for Poor Children">Education for Poor Children</option>
                      <option value="Food Distribution & Hunger Relief">Food Distribution & Hunger Relief</option>
                      <option value="Free Stationery Distribution">Free Stationery Distribution</option>
                      <option value="Social Welfare">Social Welfare</option>
                      <option value="Community Support">Community Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none bg-white"
                    >
                      <option value="Weekends">Weekends</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Flexible / As Needed">Flexible / As Needed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Message or Experience (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about yourself or how you would like to help..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition disabled:opacity-50"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{loading ? 'Submitting Application...' : 'Submit Volunteer Application'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
