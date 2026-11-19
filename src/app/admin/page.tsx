import React from 'react';
import Link from 'next/link';
import { getDashboardStats } from '@/lib/data';
import {
  Heart, Users, Target, HeartHandshake, MessageSquare,
  BookOpen, Newspaper, Image as ImageIcon, Plus, ArrowRight,
  ShieldCheck, CheckCircle2, Clock, Bell, Landmark
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const stats = getDashboardStats();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#102C63] via-[#183F91] to-[#102C63] rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>VN Vidhyapeeth • Social Welfare Trust Admin CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Social Welfare Management Console
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
            Oversee transparent donation records, audit 80G tax receipts, coordinate volunteer distribution drives, and manage welfare campaigns.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/donations"
            className="inline-flex items-center gap-1.5 bg-[#D52D2D] hover:bg-[#b52222] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Donations ({stats.donationCount})</span>
          </Link>
          <Link
            href="/admin/volunteers"
            className="inline-flex items-center gap-1.5 bg-white text-[#102C63] hover:bg-blue-50 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow"
          >
            <Users className="w-4 h-4" />
            <span>Volunteers ({stats.totalVolunteers || 0})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donations Raised */}
        <Link
          href="/admin/donations"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Raised</span>
            <span className="text-2xl sm:text-3xl font-bold text-[#D52D2D] mt-1 block">
              ₹{stats.donationTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 inline-block">
              {stats.donationCount} Contributions
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D52D2D] group-hover:bg-[#D52D2D] group-hover:text-white transition flex items-center justify-center">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </Link>

        {/* Welfare Campaigns */}
        <Link
          href="/admin/campaigns"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Welfare Campaigns</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalCampaigns}
            </span>
            <span className="text-[11px] text-blue-600 font-bold mt-1 inline-block">
              Active Fundraisers
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#183F91] group-hover:bg-[#183F91] group-hover:text-white transition flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </Link>

        {/* Registered Volunteers */}
        <Link
          href="/admin/volunteers"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Volunteers</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalVolunteers || 0}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
              {stats.newVolunteers || 0} Pending Contact
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </Link>

        {/* Core Initiatives */}
        <Link
          href="/admin/initiatives"
          className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-center justify-between transition group"
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Core Initiatives</span>
            <span className="text-3xl font-bold text-[#102C63] mt-1 block">
              {stats.totalInitiatives || 5}
            </span>
            <span className="text-[11px] text-purple-700 font-medium mt-1 inline-block">
              Active Welfare Pillars
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
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
            href="/admin/donations"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-[#D52D2D] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Heart className="w-5 h-5 text-[#D52D2D]" />
            <span className="text-xs font-bold">Review Donations</span>
          </Link>
          <Link
            href="/admin/campaigns"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Target className="w-5 h-5 text-[#183F91]" />
            <span className="text-xs font-bold">Add Campaign</span>
          </Link>
          <Link
            href="/admin/volunteers"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Users className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold">View Volunteers</span>
          </Link>
          <Link
            href="/admin/initiatives"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <HeartHandshake className="w-5 h-5 text-purple-600" />
            <span className="text-xs font-bold">Manage Initiatives</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <BookOpen className="w-5 h-5 text-[#183F91]" />
            <span className="text-xs font-bold">Stories of Change</span>
          </Link>
          <Link
            href="/admin/settings"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#183F91] transition border border-slate-200/60 flex flex-col items-center text-center gap-2 group"
          >
            <Landmark className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold">Bank &amp; UPI Settings</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feed 1: Recent Donations */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#102C63]">
                Recent Donations &amp; Contributions
              </h3>
              <p className="text-xs text-slate-400">Incoming donor records and transfers</p>
            </div>
            <Link
              href="/admin/donations"
              className="text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentDonations && stats.recentDonations.length > 0 ? (
              stats.recentDonations.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-100 text-[#D52D2D] flex items-center justify-center font-bold text-xs">
                      <Heart className="w-4 h-4 fill-[#D52D2D]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{d.donor_name}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        ₹{d.amount.toLocaleString('en-IN')} • {d.campaign_title || 'General Fund'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    d.status === 'verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {d.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No donation records logged yet.
              </p>
            )}
          </div>
        </div>

        {/* Feed 2: Recent Volunteer Registrations */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#102C63]">
                Recent Volunteer Applications
              </h3>
              <p className="text-xs text-slate-400">Citizens eager to assist with ground distribution drives</p>
            </div>
            <Link
              href="/admin/volunteers"
              className="text-xs font-bold text-[#183F91] hover:text-[#D52D2D] transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentVolunteers && stats.recentVolunteers.length > 0 ? (
              stats.recentVolunteers.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-[#183F91] flex items-center justify-center font-bold text-xs">
                      {v.full_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{v.full_name}</h4>
                      <p className="text-[11px] text-slate-500">{v.city} • {v.areas_of_interest}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                    v.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {v.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No volunteer applications recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
