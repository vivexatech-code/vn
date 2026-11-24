'use client';

import React, { useState } from 'react';
import { Heart, CheckCircle2, ArrowRight, Users, Sparkles } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function VolunteerSection() {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    city: '',
    areas_of_interest: 'Child Education',
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
    <section className="py-20 sm:py-26 bg-[#FFF8F0] border-t border-[#EFE4DC]" id="volunteer" aria-label="Volunteer With Us">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Call to Service */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87552]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C87552]" />
              <span>Become a volunteer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold text-[#49352D] tracking-tight leading-snug">
              Be the Reason Someone Smiles Today
            </h2>

            <p className="text-base text-[#78665E] leading-relaxed">
              Whether you can give a few hours on a weekend to teach children, pack school stationery kits, or help distribute food rations, your presence makes a real difference on the ground.
            </p>

            <div className="space-y-3 pt-1 text-sm text-[#49352D]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C87552] flex-shrink-0 mt-0.5" />
                <span>Teach or mentor children in community learning sessions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#78866B] flex-shrink-0 mt-0.5" />
                <span>Participate in food distribution and dry grocery packing drives</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C87552] flex-shrink-0 mt-0.5" />
                <span>Hand over stationery kits and books directly to students</span>
              </div>
            </div>

            {/* Respectful Volunteer Team Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#EFE4DC] shadow-xs">
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
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#EFE4DC] shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#49352D]">
                Register as a Volunteer
              </h3>
              <p className="text-xs sm:text-sm text-[#78665E] mt-1">
                Share your details and our team will get in touch with upcoming activities in your area.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-[#EBF0E6] border border-[#78866B]/30 rounded-2xl space-y-3">
                <div className="w-12 h-12 bg-[#78866B] text-white rounded-xl flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-[#49352D]">
                  Thank You for Stepping Forward!
                </h4>
                <p className="text-xs sm:text-sm text-[#78665E] max-w-md mx-auto">
                  Your volunteer details have been received. We look forward to working alongside you in the field.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-medium text-[#C87552] hover:underline pt-2 block mx-auto"
                >
                  Register another volunteer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="e.g. Meera Verma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Email Address <span className="text-[#78665E] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Sirsa / Delhi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Area of Interest
                    </label>
                    <select
                      value={formData.areas_of_interest}
                      onChange={(e) => setFormData({ ...formData, areas_of_interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden font-medium"
                    >
                      <option value="Child Education">Child Education & Teaching</option>
                      <option value="Food Distribution">Food Distribution & Rations</option>
                      <option value="Stationery Distribution">Free Stationery Distribution</option>
                      <option value="Healthcare Support">Healthcare & Medical Relief</option>
                      <option value="Women Empowerment">Women Empowerment</option>
                      <option value="Community Welfare">General Community Welfare</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#49352D] mb-1">
                      Availability
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden font-medium"
                    >
                      <option value="Weekends">Weekends Only</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Flexible">Flexible / On-call</option>
                      <option value="Monthly Drives">Monthly Drives Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#49352D] mb-1">
                    Short Message <span className="text-[#78665E] font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How would you like to help?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE4DC] bg-[#FFF8F0]/30 text-xs sm:text-sm text-[#49352D] focus:border-[#C87552] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C87552] hover:bg-[#B56140] text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-colors active:scale-[0.99] disabled:opacity-50"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{loading ? 'Submitting...' : 'Register as a volunteer'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
