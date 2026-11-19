'use client';

import React, { useState, useEffect } from 'react';
import { CustomPage } from '@/lib/data';
import { Edit2, Loader2, Check, FileText } from 'lucide-react';

export default function AdminPagesPage() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<CustomPage | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPages(data);
        if (data.length > 0 && !selectedPage) {
          setSelectedPage(data[0]);
          setTitle(data[0].title);
          setContent(data[0].content);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const selectPage = (p: CustomPage) => {
    setSelectedPage(p);
    setTitle(p.title);
    setContent(p.content);
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;
    setSaving(true);
    setSavedSuccess(false);

    try {
      await fetch(`/api/pages/${selectedPage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content
        })
      });
      setSavedSuccess(true);
      fetchPages();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-black text-[#102C63]">
          Static & Institutional Pages Editor
        </h1>
        <p className="text-xs text-slate-500">
          Edit legal agreements, institutional policies, and terms of service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Page Selector (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 shadow-card border border-slate-100 space-y-3">
          <h3 className="font-serif font-bold text-base text-[#102C63] mb-4">
            Select Page to Edit
          </h3>

          <div className="space-y-2">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => selectPage(p)}
                className={`w-full text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between transition ${
                  selectedPage?.id === p.id
                    ? 'bg-[#183F91] text-white shadow'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>{p.title}</span>
                </div>
                <span className="text-[10px] opacity-70 font-mono">/{p.slug}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor (8 cols) */}
        <div className="md:col-span-8 bg-white rounded-3xl p-8 shadow-card border border-slate-100">
          {selectedPage ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-serif font-black text-xl text-[#102C63]">
                    Editing: {selectedPage.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">URL: /{selectedPage.slug}</span>
                </div>

                {savedSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full font-semibold border border-green-200">
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved to Database!</span>
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Page Content (Formatted text)
                </label>
                <textarea
                  required
                  rows={16}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slate-200 leading-relaxed font-sans"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#183F91] hover:bg-[#102C63] text-white px-8 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition disabled:opacity-70 flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>Save Page Content</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-20 text-xs text-slate-400">
              Select a page to edit from the sidebar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
