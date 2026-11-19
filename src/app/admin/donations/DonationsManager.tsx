'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Heart, Search, Filter, Download, Trash2, Eye,
  CheckCircle, Clock, XCircle, RefreshCw, Printer, User, Mail, Phone, Landmark
} from 'lucide-react';
import { DonationRecord } from '@/lib/data';

interface DonationsManagerProps {
  initialDonations: DonationRecord[];
}

export default function DonationsManager({ initialDonations }: DonationsManagerProps) {
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const refreshDonations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/donations');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setDonations(data);
      }
    } catch (e) {
      console.error('Failed to refresh donations:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDonations();
  }, [refreshDonations]);

  const filtered = donations.filter((d) => {
    const term = searchTerm.toLowerCase().trim();
    const donorName = (d.donor_name || '').toLowerCase();
    const donorEmail = (d.donor_email || '').toLowerCase();
    const donorPhone = d.donor_phone || '';
    const txn = (d.transaction_id || '').toLowerCase();
    const pan = (d.pan_number || '').toLowerCase();

    const matchesSearch =
      term === '' ||
      donorName.includes(term) ||
      donorEmail.includes(term) ||
      donorPhone.includes(term) ||
      txn.includes(term) ||
      pan.includes(term);

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRaised = donations.filter(d => d.status === 'verified').reduce((acc, curr) => acc + curr.amount, 0);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: adminNotes })
      });
      if (!res.ok) throw new Error('Update failed');

      setDonations(prev =>
        prev.map(d => d.id === id ? { ...d, status: newStatus, notes: adminNotes || d.notes } : d)
      );
      if (selectedDonation && selectedDonation.id === id) {
        setSelectedDonation(prev => prev ? { ...prev, status: newStatus, notes: adminNotes || prev.notes } : null);
      }
    } catch {
      alert('Failed to update donation status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this donation record?')) return;
    try {
      const res = await fetch(`/api/donations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setDonations(prev => prev.filter(d => d.id !== id));
      if (selectedDonation?.id === id) setSelectedDonation(null);
    } catch {
      alert('Failed to delete donation.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#D52D2D] fill-[#D52D2D]" />
            <span>Donation Records &amp; 80G Receipts</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track verified contributions, audit pending bank transfers, and issue 80G tax receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block pr-4 border-r border-slate-200">
            <span className="text-[11px] text-slate-400 block font-semibold uppercase">Total Verified</span>
            <span className="text-lg font-bold text-emerald-600">₹{totalRaised.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={() => refreshDonations()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <a
            href="/api/donations/export"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by donor name, email, phone, PAN, or transaction ID..."
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
            <option value="verified">Verified (Completed)</option>
            <option value="pending">Pending (Verify Transfer)</option>
            <option value="failed">Failed / Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Donation Ref</th>
                <th className="px-5 py-3.5">Donor Name &amp; Contact</th>
                <th className="px-5 py-3.5">Amount (INR)</th>
                <th className="px-5 py-3.5">Allocation Purpose</th>
                <th className="px-5 py-3.5">Channel</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No donation records found.
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-4 font-mono font-bold text-[#183F91]">
                      VNV-REC-{d.id}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{d.donor_name}</div>
                      <div className="text-slate-500 text-xs">{d.donor_email}</div>
                      {d.donor_phone && <div className="text-[11px] text-slate-400">{d.donor_phone}</div>}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#102C63]">
                      ₹{d.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-xs">
                      {d.campaign_title || 'General Fund'}
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-600">
                      {d.payment_mode || 'UPI / QR'}
                    </td>
                    <td className="px-5 py-4">
                      {d.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      ) : d.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                          <XCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedDonation(d);
                            setAdminNotes(d.notes || '');
                          }}
                          className="p-1.5 rounded-lg bg-blue-50 text-[#183F91] hover:bg-blue-100 transition"
                          title="View Details & Audit"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Record"
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

      {/* Details & Status Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg text-[#102C63]">
                Donation Record: VNV-REC-{selectedDonation.id}
              </h3>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-xs">Donor Name:</span>
                  <span className="font-bold text-slate-800">{selectedDonation.donor_name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Contribution:</span>
                  <span className="font-bold text-[#D52D2D] text-base">₹{selectedDonation.amount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Email:</span>
                  <span className="font-medium text-slate-800">{selectedDonation.donor_email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Phone:</span>
                  <span className="font-medium text-slate-800">{selectedDonation.donor_phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">PAN (80G):</span>
                  <span className="font-bold font-mono text-slate-800">{selectedDonation.pan_number || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Payment Channel:</span>
                  <span className="font-medium text-slate-800">{selectedDonation.payment_mode || 'UPI / QR'}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internal Administrative Notes:
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Bank UTR verified on 18-Nov-2026..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 border-t">
                <span className="text-xs text-slate-500 font-semibold">Change Status:</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedDonation.id, 'verified')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
                  >
                    Mark Verified
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedDonation.id, 'pending')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
                  >
                    Mark Pending
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedDonation.id, 'failed')}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50"
                  >
                    Mark Failed
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
