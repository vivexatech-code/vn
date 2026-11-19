'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Testimonial } from '@/lib/data';
import { Plus, Edit2, Trash2, Star, X, Loader2, Quote, Award } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [achievement, setAchievement] = useState('');
  const [quote, setQuote] = useState('');
  const [story, setStory] = useState('');
  const [photoUrl, setPhotoUrl] = useState('/images/neeraj-success-section.jpg');
  const [isFeatured, setIsFeatured] = useState(1);
  const [isActive, setIsActive] = useState(1);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials?all=true');
      const data = await res.json();
      if (Array.isArray(data)) setStories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const openCreateModal = () => {
    setEditingStory(null);
    setStudentName('');
    setCourseName('Diploma in Medical Laboratory Technology (DMLT)');
    setAchievement('Successfully Employed at Regional Diagnostic Center');
    setQuote('');
    setStory('');
    setPhotoUrl('/images/neeraj-success-section.jpg');
    setIsFeatured(1);
    setIsActive(1);
    setModalOpen(true);
  };

  const openEditModal = (st: Testimonial) => {
    setEditingStory(st);
    setStudentName(st.student_name);
    setCourseName(st.course_name);
    setAchievement(st.achievement);
    setQuote(st.quote);
    setStory(st.story || '');
    setPhotoUrl(st.photo_url || '/images/neeraj-success-section.jpg');
    setIsFeatured(st.is_featured);
    setIsActive(st.is_active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      student_name: studentName,
      course_name: courseName,
      achievement,
      quote,
      story,
      photo_url: photoUrl,
      is_featured: isFeatured,
      is_active: isActive
    };

    try {
      if (editingStory) {
        await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingStory.id, ...payload })
        });
      } else {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setModalOpen(false);
      fetchStories();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student success story?')) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      fetchStories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-[#102C63]">
            Student Success Stories
          </h1>
          <p className="text-xs text-slate-500">
            Showcase verified achievements and testimonials of alumni across healthcare and vocational sectors.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student Story</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stories.map((st) => (
          <div key={st.id} className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image src={st.photo_url || '/images/neeraj-success-section.jpg'} alt={st.student_name} fill className="object-cover" />
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  st.is_featured === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {st.is_featured === 1 ? 'Featured' : 'Standard'}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-base text-[#102C63]">{st.student_name}</h3>
                <p className="text-xs font-semibold text-[#183F91] mt-0.5">{st.course_name}</p>
                <p className="text-[11px] text-green-700 font-medium mt-1">{st.achievement}</p>
              </div>

              <p className="text-xs text-slate-600 italic line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                &ldquo;{st.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-[10px] text-slate-400 font-mono">ID: #{st.id}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => openEditModal(st)} className="p-1.5 text-slate-600 hover:text-[#183F91] hover:bg-blue-50 rounded-lg">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(st.id)} className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="font-serif font-black text-xl text-[#102C63]">
                {editingStory ? 'Edit Student Story' : 'Add Student Story'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Om Prakash"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Completed *</label>
                  <input
                    type="text"
                    required
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="e.g. Diploma in Physiotherapy (DPT)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Achievement / Role *</label>
                <input
                  type="text"
                  required
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  placeholder="e.g. Successfully Completed & Practicing Assistant"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Photo URL / Path</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Quote / Feedback *</label>
                <textarea
                  required
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Short inspirational quote about their learning experience"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Extended Journey Story</label>
                <textarea
                  rows={3}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Background, challenges overcome, and clinical placement details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured === 1}
                    onChange={(e) => setIsFeatured(e.target.checked ? 1 : 0)}
                    className="rounded text-[#183F91]"
                  />
                  <span>Feature on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive === 1}
                    onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                    className="rounded text-green-600"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-slate-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#183F91] text-white px-6 py-2 rounded-xl font-semibold shadow disabled:opacity-70 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Story</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
