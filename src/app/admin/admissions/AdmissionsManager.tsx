'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Search, Filter, Download, Trash2, Eye,
  CheckCircle, Clock, AlertCircle, XCircle, Phone,
  Mail, MapPin, BookOpen, User, FileText, ExternalLink, X, RefreshCw
} from 'lucide-react';
import { Admission } from '@/lib/data';

interface AdmissionsManagerProps {
  initialAdmissions: Admission[];
}

export default function AdmissionsManager({ initialAdmissions }: AdmissionsManagerProps) {
  const [admissions, setAdmissions] = useState<Admission[]>(initialAdmissions);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const refreshAdmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admissions');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setAdmissions(data);
        }
      }
    } catch (e) {
      console.error('Failed to refresh admissions:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAdmissions();
  }, [refreshAdmissions]);

  // Filtered List
  const filtered = admissions.filter(app => {
    const studentName = (app.student_name || '').toLowerCase();
    const appNo = (app.application_no || '').toLowerCase();
    const mobile = app.mobile || '';
    const email = (app.email || '').toLowerCase();
    const courseName = (app.course_name || '').toLowerCase();
    const courseCat = (app.course_category || '').toLowerCase();
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      term === '' ||
      studentName.includes(term) ||
      appNo.includes(term) ||
      mobile.includes(term) ||
      email.includes(term);

    const matchesStatus =
      statusFilter === 'all' ||
      (app.status || '').toLowerCase() === statusFilter.toLowerCase();

    const matchesCourse =
      courseFilter === 'all' ||
      courseName.includes(courseFilter.toLowerCase()) ||
      courseCat.includes(courseFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Extract unique courses for filter
  const uniqueCourses = Array.from(new Set(admissions.map(a => a.course_name).filter(Boolean)));

  // Status Badge Helper
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3" /> Approved
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" /> Under Review
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  // Change Status
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, admin_notes: adminNotes })
      });
      if (!res.ok) throw new Error('Failed to update status');

      setAdmissions(prev =>
        prev.map(a =>
          a.id === id ? { ...a, status: newStatus as Admission['status'], admin_notes: adminNotes || a.admin_notes } : a
        )
      );
      if (selectedAdmission && selectedAdmission.id === id) {
        setSelectedAdmission(prev =>
          prev ? { ...prev, status: newStatus as Admission['status'], admin_notes: adminNotes || prev.admin_notes } : null
        );
      }
    } catch {
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Application
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this admission application?')) {
      return;
    }
    try {
      const res = await fetch(`/api/admissions/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setAdmissions(prev => prev.filter(a => a.id !== id));
      if (selectedAdmission?.id === id) setSelectedAdmission(null);
    } catch {
      alert('Failed to delete application.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Online Admission Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage incoming student applications, review academic credentials, and verify document attachments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refreshAdmissions()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <a
            href="/api/admissions/export"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV</span>
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by student name, application no, mobile or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Course Filter */}
        <div>
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white text-slate-700 truncate"
          >
            <option value="all">All Programs</option>
            {uniqueCourses.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Application No</th>
                <th className="px-5 py-3.5">Candidate Details</th>
                <th className="px-5 py-3.5">Course Applied</th>
                <th className="px-5 py-3.5">Submission Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No admission applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-4 font-mono font-bold text-[#183F91]">
                      {app.application_no}
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900">{app.student_name}</div>
                      <div className="text-slate-500 text-xs">
                        {app.mobile} • {app.email}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {app.district}, {app.state}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">{app.course_name}</div>
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {app.course_category} • {app.study_mode}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-5 py-4">
                      {renderStatusBadge(app.status)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedAdmission(app);
                            setAdminNotes(app.admin_notes || '');
                          }}
                          className="p-1.5 rounded-lg bg-blue-50 text-[#183F91] hover:bg-blue-100 transition"
                          title="View Complete Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete Application"
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

      {/* Student Details Full Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#102C63] text-white">
              <div>
                <h3 className="font-bold text-lg">Application Details</h3>
                <span className="text-xs text-blue-200 font-mono">
                  {selectedAdmission.application_no}
                </span>
              </div>
              <button
                onClick={() => setSelectedAdmission(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {/* Photo & Primary Header */}
              <div className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b border-slate-100">
                {selectedAdmission.photo_url ? (
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                    <Image
                      src={selectedAdmission.photo_url}
                      alt={selectedAdmission.student_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-28 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <User className="w-10 h-10" />
                  </div>
                )}

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xl font-bold text-slate-900">{selectedAdmission.student_name}</h4>
                    {renderStatusBadge(selectedAdmission.status)}
                  </div>
                  <p className="text-xs text-slate-500">Gender: {selectedAdmission.gender} • DOB: {selectedAdmission.dob}</p>
                  <p className="text-xs font-semibold text-[#183F91]">{selectedAdmission.course_name}</p>

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={`https://wa.me/${selectedAdmission.mobile.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(selectedAdmission.student_name)},%20this%20is%20from%20VN%20Vidhyapeeth%20regarding%20your%20admission%20application%20(${selectedAdmission.application_no}).`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition"
                    >
                      <Phone className="w-3.5 h-3.5" /> WhatsApp Student
                    </a>
                    <a
                      href={`tel:${selectedAdmission.mobile}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                  </div>
                </div>
              </div>

              {/* Personal Information Grid */}
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                  Personal Information
                </h5>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 block">Father&apos;s Name</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.father_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mother&apos;s Name</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.mother_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Calling Mobile</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">WhatsApp</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.whatsapp || selectedAdmission.mobile}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.email}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Full Postal Address</span>
                    <span className="font-semibold text-slate-800">
                      {selectedAdmission.address}, {selectedAdmission.district}, {selectedAdmission.state} - {selectedAdmission.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Academic Background */}
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                  Academic Credentials
                </h5>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 block">Highest Qualification</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.qualification}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Passing Year</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.passing_year}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Board / Council</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.board_university}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Study Mode</span>
                    <span className="font-semibold text-slate-800">{selectedAdmission.study_mode}</span>
                  </div>
                </div>
              </div>

              {/* Attached Document */}
              {selectedAdmission.document_url && (
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                    Attached Marksheet / Certificate
                  </h5>
                  <div className="flex items-center justify-between p-3 bg-blue-50/60 border border-blue-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#183F91]" />
                      <span className="text-xs font-semibold text-slate-800">Student Qualification Document</span>
                    </div>
                    <a
                      href={selectedAdmission.document_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#183F91] text-white rounded-lg text-xs font-semibold hover:bg-[#102C63] transition"
                    >
                      <Download className="w-3.5 h-3.5" /> View / Download
                    </a>
                  </div>
                </div>
              )}

              {/* Student Remarks */}
              {selectedAdmission.remarks && (
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Candidate Remarks
                  </h5>
                  <p className="text-xs bg-slate-50 p-3 rounded-xl text-slate-700 italic">
                    &quot;{selectedAdmission.remarks}&quot;
                  </p>
                </div>
              )}

              {/* Status Update Control */}
              <div className="p-4 bg-slate-100/70 rounded-xl space-y-3">
                <h5 className="font-bold text-xs text-slate-800">
                  Update Application Status
                </h5>
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedAdmission.id, 'approved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
                  >
                    Mark as Approved
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedAdmission.id, 'under_review')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
                  >
                    Set Under Review
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(selectedAdmission.id, 'rejected')}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition"
                  >
                    Reject Application
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Internal Admin Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Verified 12th marksheet on CBSE portal, admission fee deposited"
                    value={adminNotes}
                    onChange={e => setAdminNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#183F91]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
