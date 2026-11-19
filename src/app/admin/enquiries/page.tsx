'use client';

import React, { useState, useEffect } from 'react';
import { Enquiry } from '@/lib/data';
import { MessageSquare, Search, Trash2, CheckCircle2, Clock, X, Loader2, Phone, Mail, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Selected enquiry for inspection/notes modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      let url = '/api/enquiries?';
      if (typeFilter !== 'all') url += `type=${typeFilter}&`;
      if (statusFilter !== 'all') url += `status=${statusFilter}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [typeFilter, statusFilter]);

  const handleUpdateStatus = async (id: number, status: string, notes?: string) => {
    setUpdating(true);
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, admin_notes: notes })
      });
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status, admin_notes: notes });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setAdminNotes(enq.admin_notes || '');
  };

  const filtered = enquiries.filter((e) => {
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.toLowerCase().includes(search.toLowerCase()) ||
      (e.course_interest && e.course_interest.toLowerCase().includes(search.toLowerCase())) ||
      e.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-black text-[#102C63]">
          Inquiries & Admission Applications
        </h1>
        <p className="text-xs text-slate-500">
          Review, filter, and track all incoming student admissions, volunteer interests, and center inquiries.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'general', 'admission', 'affiliation', 'volunteer'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                typeFilter === t
                  ? 'bg-[#183F91] text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <div className="relative w-full md:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-[#183F91]" />
            <span>Loading submissions...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No inquiries found matching the active filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Applicant / Enquirer</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Course / Topic</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {formatDate(enq.created_at)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">{enq.name}</div>
                      <div className="text-[11px] text-slate-500">{enq.phone} • {enq.email}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-[#183F91] font-semibold px-2 py-0.5 rounded text-[10px] uppercase">
                        {enq.type}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-medium">{enq.course_interest || 'General'}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{enq.message}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'new'
                          ? 'bg-red-100 text-red-700'
                          : enq.status === 'contacted'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(enq)}
                          className="px-2.5 py-1 bg-[#183F91] text-white hover:bg-[#102C63] rounded-lg text-[11px] font-medium transition"
                        >
                          View & Reply
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
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

      {/* Inquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                  {selectedEnquiry.type} Enquiry #{selectedEnquiry.id}
                </span>
                <h3 className="font-serif font-black text-xl text-[#102C63]">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-[#183F91] hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-[#183F91] hover:underline truncate">
                  {selectedEnquiry.email}
                </a>
              </div>
              {selectedEnquiry.address && (
                <div className="col-span-2 flex items-center gap-2 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedEnquiry.address}</span>
                </div>
              )}
            </div>

            {selectedEnquiry.course_interest && (
              <div className="text-xs">
                <span className="text-slate-500">Interested Course / Program:</span>
                <p className="font-bold text-sm text-[#102C63] mt-0.5">{selectedEnquiry.course_interest}</p>
              </div>
            )}

            <div className="text-xs space-y-1">
              <span className="text-slate-500">Submitted Message / Application:</span>
              <div className="p-4 bg-[#F5F7FC] rounded-2xl border border-slate-100 text-slate-700 whitespace-pre-line leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Admin Status & Notes */}
            <div className="pt-2 border-t border-slate-100 space-y-3 text-xs">
              <label className="block font-semibold text-slate-700">Administrative Notes / Action Log</label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Internal notes (e.g. called candidate, sent admission brochure via WhatsApp)..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">Change Status:</span>
                  {['new', 'contacted', 'closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, st, adminNotes)}
                      className={`px-3 py-1 rounded-lg font-bold capitalize text-[11px] transition ${
                        selectedEnquiry.status === st
                          ? 'bg-[#183F91] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedEnquiry.id, selectedEnquiry.status, adminNotes)}
                  disabled={updating}
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded-xl font-bold shadow text-xs flex items-center gap-1.5"
                >
                  {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
