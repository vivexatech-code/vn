'use client';

import React, { useState, useEffect } from 'react';
import { ImpactStat } from '@/lib/data';
import { Award, Save, Check, Loader2, Plus, Edit2 } from 'lucide-react';

export default function AdminStatsPage() {
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<number | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/impact-stats');
      const data = await res.json();
      if (Array.isArray(data)) setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdate = async (stat: ImpactStat) => {
    setSavingId(stat.id);
    try {
      await fetch('/api/impact-stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat)
      });
      setSavedSuccess(stat.id);
      setTimeout(() => setSavedSuccess(null), 3000);
      fetchStats();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingId(null);
    }
  };

  const handleChange = (id: number, field: keyof ImpactStat, val: any) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-black text-[#102C63]">
          Impact Statistics Management
        </h1>
        <p className="text-xs text-slate-500">
          Manage numbers for Students Trained, Study Centers, Courses, and Years of Dedication.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-serif font-bold text-base text-[#102C63]">{stat.label}</span>
              {savedSuccess === stat.id && (
                <span className="text-[10px] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full font-bold">
                  Saved!
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="col-span-2">
                <label className="block text-slate-500 font-semibold mb-1">Numeric Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleChange(stat.id, 'value', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Suffix (e.g. +)</label>
                <input
                  type="text"
                  value={stat.suffix || ''}
                  onChange={(e) => handleChange(stat.id, 'suffix', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-sm"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-500 font-semibold mb-1">Label / Metric Name</label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleChange(stat.id, 'label', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div className="text-xs">
              <label className="block text-slate-500 font-semibold mb-1">Supporting Description</label>
              <input
                type="text"
                value={stat.description || ''}
                onChange={(e) => handleChange(stat.id, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleUpdate(stat)}
                disabled={savingId === stat.id}
                className="bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition"
              >
                {savingId === stat.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Update Metric</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
