'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#102C63] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#183F91] rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/30 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
        <div className="text-center space-y-3 mb-8">
          <div className="relative w-16 h-16 mx-auto">
            <Image
              src="/images/logo.webp"
              alt="VN Vidhyapeeth Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-serif font-black text-2xl text-[#102C63]">
            VN VIDHYAPEETH
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Administrative Management & CMS Console
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl text-[11px] text-[#183F91] border border-blue-100 flex items-center justify-between">
            <span>Default Demo Credentials:</span>
            <span className="font-mono font-bold">admin / admin123</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-70 mt-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-[#183F91] transition font-medium"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
