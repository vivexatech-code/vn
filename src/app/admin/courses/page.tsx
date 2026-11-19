'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Course } from '@/lib/data';
import {
  Plus, Search, Edit2, Trash2, Check, X,
  Clock, GraduationCap, Loader2, Star, Sparkles
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Paramedical');
  const [duration, setDuration] = useState('2 Years');
  const [eligibility, setEligibility] = useState('10+2 with Science (PCM/PCB)');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [careerProspects, setCareerProspects] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/dmlt.jpg');
  const [isFeatured, setIsFeatured] = useState(0);
  const [isActive, setIsActive] = useState(1);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/courses?all=true');
      const data = await res.json();
      if (Array.isArray(data)) setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setTitle('');
    setCode('');
    setSlug('');
    setCategory('Paramedical');
    setDuration('2 Years');
    setEligibility('10+2 with Science (PCM/PCB)');
    setShortDesc('');
    setFullDesc('');
    setSyllabus('');
    setCareerProspects('');
    setImageUrl('/images/dmlt.jpg');
    setIsFeatured(0);
    setIsActive(1);
    setModalOpen(true);
  };

  const openEditModal = (c: Course) => {
    setEditingCourse(c);
    setTitle(c.title);
    setCode(c.code || '');
    setSlug(c.slug);
    setCategory(c.category);
    setDuration(c.duration);
    setEligibility(c.eligibility);
    setShortDesc(c.short_desc);
    setFullDesc(c.full_desc || '');
    setSyllabus(c.syllabus || '');
    setCareerProspects(c.career_prospects || '');
    setImageUrl(c.image_url || '/images/dmlt.jpg');
    setIsFeatured(c.is_featured);
    setIsActive(c.is_active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      code,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      category,
      duration,
      eligibility,
      short_desc: shortDesc,
      full_desc: fullDesc,
      syllabus,
      career_prospects: careerProspects,
      image_url: imageUrl,
      is_featured: isFeatured,
      is_active: isActive
    };

    try {
      if (editingCourse) {
        await fetch(`/api/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (c: Course) => {
    try {
      await fetch(`/api/courses/${c.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: c.is_featured === 1 ? 0 : 1 })
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = courses.filter((c) => {
    const matchCat = filterCat === 'all' || c.category.toLowerCase() === filterCat.toLowerCase();
    const matchSearch = !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.code && c.code.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-black text-[#102C63]">
            Course Management
          </h1>
          <p className="text-xs text-slate-500">
            Add, update, or configure educational programs and diploma syllabuses.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#183F91] hover:bg-[#102C63] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'Paramedical', 'Computer', 'Vocational'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                filterCat.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#183F91] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or code..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20"
          />
        </div>
      </div>

      {/* Courses List Table */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#183F91]" />
            <span>Loading courses from database...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No courses found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Duration & Eligibility</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image src={c.image_url || '/images/dmlt.jpg'} alt={c.title} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{c.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.code || c.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-[#183F91] font-semibold px-2.5 py-1 rounded-md text-[10px]">
                        {c.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      <div><strong>{c.duration}</strong></div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{c.eligibility}</div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleFeatured(c)}
                        className={`p-1.5 rounded-lg transition ${
                          c.is_featured === 1 ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-4 h-4 ${c.is_featured === 1 ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.is_active === 1 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {c.is_active === 1 ? 'Active' : 'Draft'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 text-slate-600 hover:text-[#183F91] hover:bg-blue-50 rounded-lg transition"
                          title="Edit Course"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          title="Delete Course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Course Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-serif font-black text-xl text-[#102C63]">
                {editingCourse ? 'Edit Course Details' : 'Add New Academic Course'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Diploma in Medical Laboratory Technology (DMLT)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. DMLT-01"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Paramedical">Paramedical</option>
                    <option value="Computer">Computer</option>
                    <option value="Vocational">Vocational</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 2 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Eligibility</label>
                  <input
                    type="text"
                    value={eligibility}
                    onChange={(e) => setEligibility(e.target.value)}
                    placeholder="e.g. 10+2 with Science"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL / File Path</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/dmlt.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Summary (Card preview) *</label>
                <textarea
                  required
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Brief 1-2 sentence summary of program..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Detailed Description</label>
                <textarea
                  rows={4}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  placeholder="Detailed course scope, laboratory training protocols, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Syllabus Breakdown</label>
                <textarea
                  rows={4}
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  placeholder="Year 1: ...\nYear 2: ..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Career Prospects</label>
                <input
                  type="text"
                  value={careerProspects}
                  onChange={(e) => setCareerProspects(e.target.value)}
                  placeholder="e.g. Lab Technician, Hospital Associate, Clinic Supervisor"
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
                  <span>Publish as Active</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#183F91] hover:bg-[#102C63] text-white px-6 py-2 rounded-xl font-semibold shadow disabled:opacity-70 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
