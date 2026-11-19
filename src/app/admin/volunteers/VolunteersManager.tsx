'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Users, Search, Download, Trash2, Eye, Phone, Mail,
  CheckCircle, Clock, XCircle, RefreshCw, MessageSquare
} from 'lucide-react';
import { Volunteer } from '@/lib/data';

interface VolunteersManagerProps {
  initialVolunteers: Volunteer[];
}

export default function VolunteersManager({ initialVolunteers }: VolunteersManagerProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVol, setSelectedVol] = useState<Volunteer | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const refreshVolunteers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/volunteers');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setVolunteers(data);
      }
    } catch (e) {
      console.error('Failed to refresh volunteers:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshVolunteers();
  }, [refreshVolunteers]);

  const filtered = volunteers.filter((v) => {
    const term = searchTerm.toLowerCase().trim();
    const name = (v.full_name || '').toLowerCase();
    const mobile = v.mobile || '';
    const email = (v.email || '').toLowerCase();
    const city = (v.city || '').toLowerCase();
    const areas = (v.areas_of_interest || '').toLowerCase();

    const matchesSearch =
      term === '' ||
      name.includes(term) ||
      mobile.includes(term) ||
      email.includes(term) ||
      city.includes(term) ||
      areas.includes(term);

    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, admin_notes: adminNotes })
      });
      if (!res.ok) throw new Error('Update failed');

      setVolunteers(prev =>
        prev.map(v => v.id === id ? { ...v, status: newStatus as Volunteer['status'], admin_notes: adminNotes || v.admin_notes } : v)
      );
      if (selectedVol && selectedVol.id === id) {
        setSelectedVol(prev => prev ? { ...prev, status: newStatus as Volunteer['status'], admin_notes: adminNotes || prev.admin_notes } : null);
      }
    } catch {
      alert('Failed to update volunteer status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this volunteer record?')) return;
    try {
      const res = await fetch(`/api/volunteers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setVolunteers(prev => prev.filter(v => v.id !== id));
      if (selectedVol?.id === id) setSelectedVol(null);
    } catch {
      alert('Failed to delete volunteer.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#183F91]" />
            <span>Volunteer Registrations</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review community signups, assign distribution drive roles, and maintain contact with ground volunteers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refreshVolunteers()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <a
            href="/api/volunteers/export"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone, email, city, or interest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="approved">Approved</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Volunteer</th>
                <th className="px-5 py-3.5">Contact Details</th>
                <th className="px-5 py-3.5">City / District</th>
                <th className="px-5 py-3.5">Areas of Interest</th>
                <th className="px-5 py-3.5">Availability</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No volunteer registrations found.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-4 font-bold text-[#102C63]">
                      {v.full_name}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-800 font-medium">{v.mobile}</div>
                      <div className="text-slate-400 text-xs">{v.email}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-700 font-medium">
                      {v.city}
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-xs max-w-xs truncate">
                      {v.areas_of_interest}
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">
                      {v.availability}
                    </td>
                    <td className="px-5 py-4">
                      {v.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" /> Approved
                        </span>
                      ) : v.status === 'contacted' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <Clock className="w-3 h-3" /> Contacted
                        </span>
                      ) : v.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                          <XCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${v.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(v.full_name)},%20thank%20you%20for%20registering%20as%20a%20volunteer%20with%20VN%20Vidhyapeeth.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                          title="Chat on WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            setSelectedVol(v);
                            setAdminNotes(v.admin_notes || '');
                          }}
                          className="p-1.5 rounded-lg bg-blue-50 text-[#183F91] hover:bg-blue-100 transition"
                          title="View Profile & Audit"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedVol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-[#102C63]">
                Volunteer Profile: {selectedVol.full_name}
              </h3>
              <button onClick={() => setSelectedVol(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-xs">Phone:</span>
                  <span className="font-bold text-slate-800">{selectedVol.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Email:</span>
                  <span className="font-bold text-slate-800">{selectedVol.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">City:</span>
                  <span className="font-bold text-slate-800">{selectedVol.city}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Availability:</span>
                  <span className="font-bold text-slate-800">{selectedVol.availability}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-xs font-semibold">Areas of Interest:</span>
                <p className="text-slate-800 font-medium mt-1">{selectedVol.areas_of_interest}</p>
              </div>

              {selectedVol.message && (
                <div>
                  <span className="text-slate-400 block text-xs font-semibold">Applicant Statement:</span>
                  <p className="text-slate-600 italic mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    &ldquo;{selectedVol.message}&rdquo;
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Coordinator Notes:
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Spoke on phone, assigned to Sirsa book distribution drive..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t">
                <span className="text-xs text-slate-500 font-semibold">Status:</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedVol.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedVol.id, 'contacted')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
                  >
                    Contacted
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedVol.id, 'pending')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
                  >
                    Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
