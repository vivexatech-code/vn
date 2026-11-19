'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, HeartHandshake, Loader2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Volunteer');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer',
          name: name || 'Newsletter Subscriber',
          email,
          phone: 'N/A',
          message: `Get Involved / Volunteer Subscription. Interest role: ${role}`
        })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#F5F7FC] rounded-3xl p-8 sm:p-12 border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Information */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 bg-blue-100/70 text-[#183F91] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <HeartHandshake className="w-3.5 h-3.5" />
                Community & Educational Mentorship
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102C63]">
                Collaborate in Empowering Youth Education
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether as an academic faculty, healthcare clinical mentor, authorized study center partner, or career advisor—join our mission of decentralized skill excellence.
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-6">
              {submitted ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-200 text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs text-slate-600">
                    We have received your interest. Our academic coordination team will contact you regarding upcoming educational workshops.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Interest Role</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91] bg-white"
                      >
                        <option value="Volunteer">Academic Volunteer / Faculty</option>
                        <option value="Center Partner">Authorized Study Center Coordinator</option>
                        <option value="Healthcare Mentor">Hospital Clinical Mentor</option>
                        <option value="Newsletter Only">Receive Academic &amp; Exam Notices</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-md disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>Submit & Subscribe</span>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
