'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  User, Phone, Mail, MapPin, BookOpen, GraduationCap,
  Calendar, Upload, CheckCircle2, ArrowRight, ArrowLeft,
  FileText, ShieldCheck, Printer, AlertCircle, RefreshCw
} from 'lucide-react';

interface AdmissionFormClientProps {
  helplinePhone?: string;
  helplineEmail?: string;
}

const COURSE_OPTIONS: Record<string, string[]> = {
  Paramedical: [
    'Diploma in Medical Laboratory Technology (DMLT)',
    'Diploma in Physiotherapy (DPT)',
    'Diploma in Operation Theatre Technology (DOTT)',
    'Diploma in X-Ray & Medical Imaging Technology (DXRT)',
    'Diploma in Naturopathy & Yogic Sciences (DNYS)',
    'Certificate in Medical Laboratory Technology (CMLT)',
    'Certificate in Operation Theatre Technology (COTT)',
    'Community Medical Services & Essential Drugs (CMS & ED)',
    'Emergency Medical Technician (EMT)'
  ],
  Computer: [
    'Advance Diploma in Computer Applications (ADCA)',
    'Diploma in Computer Applications (DCA)',
    'Tally Prime & GST Professional Accounting',
    'Basic Computer Course (BCC)',
    'Certificate in Desktop Publishing (DTP)',
    'Web Designing & Development'
  ],
  Vocational: [
    'Diploma in Textile Technology',
    'Industrial Safety & Fire Fighting Management',
    'Electrician & Electrical Maintenance',
    'Fashion Designing & Garment Fabrication',
    'Hotel & Hospital Housekeeping'
  ],
  'Yoga & Wellness': [
    'Diploma in Naturopathy & Yogic Sciences (DNYS)',
    'Certificate in Yoga Therapy (CYT)',
    'Ayurvedic Nursing & Panchakarma Therapy'
  ],
  'Teacher Training': [
    'Nursery Teacher Training (NTT)',
    'Computer Teacher Training Course (CTTC)',
    'Primary Teacher Education (PTE)'
  ]
};

const INDIAN_STATES = [
  'Haryana', 'Delhi', 'Rajasthan', 'Punjab', 'Uttar Pradesh',
  'Bihar', 'Madhya Pradesh', 'Himachal Pradesh', 'Uttarakhand',
  'Maharashtra', 'Gujarat', 'West Bengal', 'Jharkhand', 'Other State'
];

export default function AdmissionFormClient({
  helplinePhone = '+91 7015358183',
  helplineEmail = 'vnvidyapeeth@gmail.com'
}: AdmissionFormClientProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    application_no: string;
    student_name: string;
    course_name: string;
    course_category: string;
    mobile: string;
    created_at: string;
  }>(null);
  const [formError, setFormError] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    student_name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    state: 'Haryana',
    district: '',
    pincode: '',

    // Step 2: Academic Information
    course_category: 'Paramedical',
    course_name: 'Diploma in Medical Laboratory Technology (DMLT)',
    qualification: '12th Science (PCB/PCM)',
    passing_year: '2024',
    board_university: '',
    study_mode: 'Regular',

    // Step 3: Documents & Remarks
    photo_url: '',
    document_url: '',
    remarks: '',
    agreedToTerms: false
  });

  // Upload States
  const [photoUploading, setPhotoUploading] = useState(false);
  const [docUploading, setDocUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [docName, setDocName] = useState<string | null>(null);

  // Handle Category Change
  const handleCategoryChange = (cat: string) => {
    const courses = COURSE_OPTIONS[cat] || [];
    setFormData(prev => ({
      ...prev,
      course_category: cat,
      course_name: courses[0] || ''
    }));
  };

  // Upload File Helper
  const uploadFile = async (file: File, type: 'photo' | 'doc') => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('folder', 'admissions');

    if (type === 'photo') setPhotoUploading(true);
    else setDocUploading(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      if (type === 'photo') {
        setFormData(prev => ({ ...prev, photo_url: data.url }));
        setPhotoPreview(data.url);
      } else {
        setFormData(prev => ({ ...prev, document_url: data.url }));
        setDocName(file.name);
      }
    } catch (err: unknown) {
      alert((err as Error).message || 'File upload failed. Please try again.');
    } finally {
      if (type === 'photo') setPhotoUploading(false);
      else setDocUploading(false);
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    setFormError('');
    if (!formData.student_name.trim()) return 'Please enter student full name';
    if (!formData.father_name.trim()) return 'Please enter father name';
    if (!formData.mother_name.trim()) return 'Please enter mother name';
    if (!formData.dob) return 'Please select date of birth';

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (cleanMobile.length < 10) return 'Please enter a valid 10-digit mobile number';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) return 'Please enter a valid email address';

    if (!formData.address.trim()) return 'Please enter complete postal address';
    if (!formData.district.trim()) return 'Please enter district';
    if (!formData.pincode.trim() || formData.pincode.length < 6) return 'Please enter a valid 6-digit PIN code';

    return null;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    setFormError('');
    if (!formData.course_name) return 'Please select a course program';
    if (!formData.board_university.trim()) return 'Please enter Board / University name (e.g. CBSE / BSEH)';
    return null;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const err = validateStep1();
      if (err) {
        setFormError(err);
        return;
      }
      setFormError('');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const err = validateStep2();
      if (err) {
        setFormError(err);
        return;
      }
      setFormError('');
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    setFormError('');
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.agreedToTerms) {
      setFormError('Please accept the institutional declaration to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmissionSuccess({
        application_no: data.application_no,
        student_name: formData.student_name,
        course_name: formData.course_name,
        course_category: formData.course_category,
        mobile: formData.mobile,
        created_at: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
    } catch (err: unknown) {
      setFormError((err as Error).message || 'Submission failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (submissionSuccess) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 sm:p-12 max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <span>Application Registered Successfully</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102C63]">
            Congratulations, {submissionSuccess.student_name}!
          </h2>

          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Your admission application for Academic Session 2025–2026 has been logged into the VN Vidhyapeeth registry.
          </p>
        </div>

        {/* Official Application Receipt Card */}
        <div className="mt-8 bg-[#F5F7FC] border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 print:border-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Application / Reference ID
              </span>
              <p className="text-2xl font-mono font-black text-[#183F91]">
                {submissionSuccess.application_no}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 font-semibold block">Date of Application</span>
              <span className="text-sm font-semibold text-slate-700">{submissionSuccess.created_at}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Candidate Name</span>
              <span className="font-semibold text-slate-900">{submissionSuccess.student_name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Registered Mobile</span>
              <span className="font-semibold text-slate-900">{submissionSuccess.mobile}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Selected Course</span>
              <span className="font-semibold text-[#183F91]">{submissionSuccess.course_name}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Academic Department</span>
              <span className="font-semibold text-slate-900">{submissionSuccess.course_category}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Operating under Indian Trust Act 1882 • ISO 9001:2015</span>
            <span className="text-emerald-700 font-semibold">Status: Under Verification</span>
          </div>
        </div>

        {/* Instructions / Next Steps */}
        <div className="mt-6 bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-slate-700 space-y-1.5">
          <h4 className="font-bold text-[#183F91] flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-[#D52D2D]" />
            What Happens Next?
          </h4>
          <p>1. Our academic admissions coordinator will verify your academic records and reach you within 24 hours.</p>
          <p>2. Keep your original documents ready for study center verification.</p>
          <p>3. In case of any question, call our helpline at <strong>{helplinePhone}</strong> or email <strong>{helplineEmail}</strong> quoting your Application ID.</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#183F91] hover:bg-[#102C63] text-white font-semibold rounded-xl shadow-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Application Receipt</span>
          </button>

          <button
            onClick={() => {
              setSubmissionSuccess(null);
              setCurrentStep(1);
              setFormData({
                student_name: '',
                father_name: '',
                mother_name: '',
                dob: '',
                gender: 'Male',
                mobile: '',
                whatsapp: '',
                email: '',
                address: '',
                state: 'Haryana',
                district: '',
                pincode: '',
                course_category: 'Paramedical',
                course_name: 'Diploma in Medical Laboratory Technology (DMLT)',
                qualification: '12th Science (PCB/PCM)',
                passing_year: '2024',
                board_university: '',
                study_mode: 'Regular',
                photo_url: '',
                document_url: '',
                remarks: '',
                agreedToTerms: false
              });
              setPhotoPreview(null);
              setDocName(null);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Submit Another Application</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      {/* Step Progress Bar */}
      <div className="bg-[#102C63] p-6 sm:p-8 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Connecting Track */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-900/80 -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#D52D2D] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 1 ? 'bg-[#D52D2D] text-white shadow-lg' : 'bg-slate-700 text-slate-300'
                }`}
              >
                1
              </div>
              <span className="text-xs font-semibold mt-2 hidden sm:block text-blue-100">
                Personal Info
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 2 ? 'bg-[#D52D2D] text-white shadow-lg' : 'bg-slate-700 text-slate-300'
                }`}
              >
                2
              </div>
              <span className="text-xs font-semibold mt-2 hidden sm:block text-blue-100">
                Academic & Course
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  currentStep >= 3 ? 'bg-[#D52D2D] text-white shadow-lg' : 'bg-slate-700 text-slate-300'
                }`}
              >
                3
              </div>
              <span className="text-xs font-semibold mt-2 hidden sm:block text-blue-100">
                Documents & Submit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 sm:p-10 max-w-4xl mx-auto">
        {formError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-[#102C63] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#183F91]" />
                  Step 1: Student Personal Details
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter candidate identification as per 10th / Secondary School Certificate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name as in marksheet"
                    value={formData.student_name}
                    onChange={e => setFormData({ ...formData, student_name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Father&apos;s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Father's full name"
                    value={formData.father_name}
                    onChange={e => setFormData({ ...formData, father_name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>

                {/* Mother's Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mother&apos;s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mother's full name"
                    value={formData.mother_name}
                    onChange={e => setFormData({ ...formData, mother_name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>

                {/* Date of Birth & Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mobile Number (Calling) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile"
                      value={formData.mobile}
                      onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full pl-12 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-slate-400">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="WhatsApp contact"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full pl-12 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>

                {/* Full Postal Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Permanent Postal Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Plot No, Village/Colony, Post Office, Tehsil"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none resize-none"
                  />
                </div>

                {/* State, District, PIN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                  >
                    {INDIAN_STATES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="District"
                      value={formData.district}
                      onChange={e => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-digit PIN"
                      value={formData.pincode}
                      onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMIC & COURSE SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-[#102C63] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#183F91]" />
                  Step 2: Course & Academic Background
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your intended course discipline and past educational qualifications.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Course Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Course Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.course_category}
                    onChange={e => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white font-medium text-[#183F91]"
                  >
                    {Object.keys(COURSE_OPTIONS).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Course Selection <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.course_name}
                    onChange={e => setFormData({ ...formData, course_name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white font-medium text-slate-800"
                  >
                    {(COURSE_OPTIONS[formData.course_category] || []).map(crs => (
                      <option key={crs} value={crs}>{crs}</option>
                    ))}
                  </select>
                </div>

                {/* Highest Qualification */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Highest Educational Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                  >
                    <option value="10th Pass (Matriculation)">10th Pass (Matriculation)</option>
                    <option value="12th Science (PCB/PCM)">12th Science (PCB/PCM)</option>
                    <option value="12th Arts / Commerce">12th Arts / Commerce</option>
                    <option value="Graduate (B.Sc / B.A / B.Com / Other)">Graduate (B.Sc / B.A / B.Com / Other)</option>
                    <option value="Post Graduate / Diploma">Post Graduate / Diploma</option>
                  </select>
                </div>

                {/* Passing Year & Study Mode */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Passing Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.passing_year}
                      onChange={e => setFormData({ ...formData, passing_year: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                    >
                      {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018 or Earlier'].map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Study Mode <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.study_mode}
                      onChange={e => setFormData({ ...formData, study_mode: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none bg-white"
                    >
                      <option value="Regular">Regular Campus</option>
                      <option value="Weekend / Hybrid">Weekend / Hybrid</option>
                      <option value="Distance Learning">Distance Learning</option>
                    </select>
                  </div>
                </div>

                {/* Board / University */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Board / Council / University Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBSE, Haryana Board (BSEH), Rajasthan Board (RBSE), etc."
                    value={formData.board_university}
                    onChange={e => setFormData({ ...formData, board_university: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENTS UPLOAD & DECLARATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-[#102C63] flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#183F91]" />
                  Step 3: Document Uploads & Declaration
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload recent passport photograph and qualification document for student verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Photo Upload Box */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:border-[#183F91] transition bg-slate-50/50">
                  {photoPreview ? (
                    <div className="space-y-2">
                      <div className="relative w-24 h-28 mx-auto rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                        <Image src={photoPreview} alt="Student Preview" fill className="object-cover" />
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold block flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached
                      </span>
                      <label className="text-xs text-blue-600 cursor-pointer hover:underline block">
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'photo')}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#183F91] flex items-center justify-center mx-auto">
                        <User className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">Passport Size Photograph</h4>
                      <p className="text-[11px] text-slate-500">JPG, PNG or WEBP (Max 5MB)</p>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{photoUploading ? 'Uploading...' : 'Browse Image'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={photoUploading}
                          className="hidden"
                          onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'photo')}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Marksheet / Document Upload Box */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:border-[#183F91] transition bg-slate-50/50">
                  {docName ? (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{docName}</h4>
                      <span className="text-xs text-emerald-600 font-semibold block flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Document Attached
                      </span>
                      <label className="text-xs text-blue-600 cursor-pointer hover:underline block">
                        Replace File
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          className="hidden"
                          onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'doc')}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-red-100 text-[#D52D2D] flex items-center justify-center mx-auto">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-800">10th / 12th Marksheet or Aadhaar</h4>
                      <p className="text-[11px] text-slate-500">PDF, JPG or PNG (Max 10MB)</p>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{docUploading ? 'Uploading...' : 'Browse Document'}</span>
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          disabled={docUploading}
                          className="hidden"
                          onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0], 'doc')}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Additional Remarks */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Additional Remarks / Scholarship Inquiry (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter any previous healthcare experience, preferred timing, or scholarship concessions requested..."
                    value={formData.remarks}
                    onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#183F91] focus:outline-none resize-none"
                  />
                </div>

                {/* Institutional Declaration Checkbox */}
                <div className="sm:col-span-2 bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={e => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#183F91] rounded border-slate-300 focus:ring-[#183F91]"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I solemnly affirm that the information provided in this admission form is true and correct to the best of my knowledge. I understand that VN Vidhyapeeth operates under the registered framework of the Indian Trust Act 1882 &amp; ISO 9001:2015 standard, providing autonomous skill development and employment-focused certifications.
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#183F91] hover:bg-[#102C63] text-white font-semibold text-sm rounded-xl shadow-md transition"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting || photoUploading || docUploading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#D52D2D] hover:bg-[#b52222] text-white font-bold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm &amp; Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
