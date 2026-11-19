import React from 'react';
import Link from 'next/link';
import { getDashboardStats } from '@/lib/data';

export const dynamic = 'force-dynamic';
import {
  MessageSquare, BookOpen, GraduationCap, Newspaper, Image as ImageIcon,
  Building, Plus, ArrowRight, ShieldCheck, CheckCircle2, Clock, Bell, User
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const stats = getDashboardStats();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#102C63] via-[#183F91] to-[#102C63] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>VN Vidhyapeeth Administrative Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome to the Institutional Portal CMS
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Review incoming student admissions, manage educational courses, update popup alerts, and oversee affiliated study centers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/admissions"
            className="inline-flex items-center gap-1.5 bg-[#D52D2D] hover:bg-[#b52222] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow"
          >
            <GraduationCap className="w-4 h-4" />
            <span>View Admissions ({stats.totalAdmissions})</span>
          </Link>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 bg-white text-[#102C63] hover:bg-blue-50 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Online Admissions Card */}
        <Link
          href="/admin/admissions"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Online Admissions</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalAdmissions}
            </span>
            <span className="text-[11px] text-[#D52D2D] font-bold mt-1 inline-block">
              {stats.newAdmissions} Pending Review
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D52D2D] group-hover:bg-[#D52D2D] group-hover:text-white transition flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </Link>

        {/* Website Enquiries Card */}
        <Link
          href="/admin/enquiries"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Website Enquiries</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalEnquiries}
            </span>
            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">
              {stats.newEnquiries} New Inquiries
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#183F91] group-hover:bg-[#183F91] group-hover:text-white transition flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </Link>

        {/* Courses Offered Card */}
        <Link
          href="/admin/courses"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Courses Offered</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalCourses}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
              Paramedical &amp; IT
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </Link>

        {/* Partners & Affiliations Card */}
        <Link
          href="/admin/partners"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Partners &amp; Study Centers</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalPartners}
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 inline-block">
              Accredited Alliances
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">
        <h3 className="font-bold text-base text-slate-800 mb-4">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/admissions"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#D52D2D] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <GraduationCap className="w-5 h-5 text-[#D52D2D]" />
            <span className="text-xs font-bold">Review Admissions</span>
          </Link>
          <Link
            href="/admin/courses"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <BookOpen className="w-5 h-5 text-[#183F91]" />
            <span className="text-xs font-bold">Edit Courses</span>
          </Link>
          <Link
            href="/admin/popup-settings"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Bell className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-bold">Popup Settings</span>
          </Link>
          <Link
            href="/admin/partners"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Building className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold">Manage Partners</span>
          </Link>
          <Link
            href="/admin/news"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Newspaper className="w-5 h-5 text-[#183F91]" />
            <span className="text-xs font-bold">Post Notice</span>
          </Link>
          <Link
            href="/admin/settings"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <MessageSquare className="w-5 h-5 text-green-600" />
            <span className="text-xs font-bold">WhatsApp &amp; Info</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feed 1: Recent Online Admissions */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#102C63]">
                Recent Online Admissions
              </h3>
              <p className="text-xs text-slate-400">Incoming applications submitted on the portal</p>
            </div>
            <Link
              href="/admin/admissions"
              className="text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentAdmissions && stats.recentAdmissions.length > 0 ? (
              stats.recentAdmissions.map((adm) => (
                <div
                  key={adm.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-100 text-[#D52D2D] flex items-center justify-center font-bold text-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{adm.student_name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">{adm.application_no} • {adm.course_name}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 capitalize">
                    {adm.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No admission applications recorded yet. Test the online form at /online-admission.
              </p>
            )}
          </div>
        </div>

        {/* Feed 2: Recent General Enquiries */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#102C63]">
                Recent Contact &amp; Counseling Enquiries
              </h3>
              <p className="text-xs text-slate-400">Messages sent via website contact forms and popups</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentEnquiries && stats.recentEnquiries.length > 0 ? (
              stats.recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-[#183F91] flex items-center justify-center font-bold text-xs">
                      {enq.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{enq.name}</h4>
                      <p className="text-[11px] text-slate-500">{enq.phone} • {enq.course_interest || enq.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 capitalize">
                    {enq.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No enquiries received yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
