# VN VIDHYAPEETH – Modern Educational NGO & Institutional Website

A modern, professional, premium-quality, fully dynamic website for **VN VIDHYAPEETH**, an educational initiative operated by a registered trust under the **Indian Trust Act 1882**, **ISO 9001:2015 Certified**, and registered with **NITI Aayog & MSME** (Govt. of India).

---

## 🏛️ Institutional Highlights & Verified Data

- **Organization Name**: VN Vidhyapeeth
- **Legal Framework**: Operated by a Registered Trust under Indian Trust Act 1882
- **Certifications**: ISO 9001:2015 Quality Management Certified
- **National Portals**: Registered with NITI Aayog (NGO Darpan) & MSME
- **Head Office & Documents Verification**: Panchmukhi Chowk, Nohar Road, Ellenabad, Sirsa, Haryana – 125102
- **Registered Trust Office**: 1359 A, Gali Number 8, Govind Puri, New Delhi – 110019, India
- **Official Helpline Numbers**: +91-7015358183, +91-8199048325
- **Official Email**: vnvidyapeeth@gmail.com
- **Official Banking**:
  - Bank: **Punjab National Bank**
  - Account Number: `0442102100000677`
  - IFSC Code: `PUNB0044210`
  - Account Name: `VN VidhyaPeeth`
  - UPI ID: `vnvidyapeeth@pnb`

---

## 🎨 Visual Identity & Color Palette

Inspired by the official VN Vidhyapeeth brand crest:
- **Royal Blue**: `#183F91` (Primary)
- **Deep Navy**: `#102C63` (Dark Primary)
- **Education Red**: `#D52D2D` (Accent CTA)
- **Soft Background**: `#F5F7FC`
- **Neutral Grey**: `#667085`
- Official logo proportions and high-res vector/webp crests preserved across Navbar, Footer, and Favicon.

---

## 🚀 Key Features

### 1. Public Portal
- **Header & Sticky Navigation**: Modern navbar with quick helplines, registration badges, interactive dropdown menus, and highlighted "Donate Now" CTA.
- **Hero Slideshow**: Multi-slide dynamic carousel with custom badges, headlines, descriptions, and CTA links.
- **Focus Areas**: Paramedical & Allied Health, Information Technology, Vocational Trades, Community Empowerment, Yoga & Naturopathy, Teacher Training.
- **Animated Statistics**: Verified metrics (5,000+ Students Trained, 100+ Authorized Study Centers, 35+ Courses, 7+ Years Experience).
- **Featured Courses & Programs**: Detailed cards with duration, eligibility, and deep-dive syllabus links.
- **Mission & Vision**: Split-layout presentation reflecting trust principles.
- **Student Alumni Success Stories**: Verified achievements of alumni (Neeraj, Om Prakash, Raj Kumar, Vijendra Kumar).
- **Campaigns & Sponsorships**: Live progress bars tracking funds raised vs target goals.
- **Masonry Photo & Video Gallery**: Categorized media gallery with lightbox modal.
- **Notice Board & Articles**: Academic circulars, exam schedules, and blog posts.
- **Donation Section**: Dedicated donation portal with preset tiers, custom amounts, bank details, and instant QR scan.
- **Get Involved / Volunteer**: Real-time form submissions.

### 2. Inner Pages
1. `/about` – Comprehensive institutional story, legal frameworks, and Director's message.
2. `/mission` – Mission, vision, and strategic goals.
3. `/initiatives` – Flagship community and healthcare programs.
4. `/courses` – Filterable course directory with search by keyword or category.
5. `/courses/[slug]` – Course overview, syllabus, career prospects, and direct admission application.
6. `/impact` – Metrics, placement records, and healthcare impact.
7. `/success-stories` – Student alumni stories and career transformations.
8. `/campaigns` – Active sponsorship causes.
9. `/campaigns/[slug]` – Campaign story, progress bar, and direct donation form.
10. `/gallery` – Photo and video gallery with lightbox.
11. `/news` – Official circulars and admission updates.
12. `/blog` – Educational guidance and articles.
13. `/news/[slug]` – Full article view with reader counts.
14. `/contact` – Multi-mode contact form (General, Admission 2025, Affiliation, Volunteer) with office addresses.
15. `/donate` – Interactive donation platform with instant digital acknowledgement slips and celebratory confetti.
16. `/privacy-policy` – Data privacy guidelines.
17. `/terms-and-conditions` – Institutional terms of service.
18. `/sitemap.xml` & `/robots.txt` – Full SEO indexing integration.

### 3. Comprehensive Admin Dashboard (`/admin`)
- **Credentials**: `admin` / `admin123`
- **Dashboard**: Real-time metric cards, recent enquiries, and quick management links.
- **Course Management (`/admin/courses`)**: Full CRUD with search, category filtering, syllabus editor, and homepage feature toggles.
- **Hero Slideshow Builder (`/admin/hero-slides`)**: Add, edit, reorder, and toggle banner slides.
- **Campaign Management (`/admin/campaigns`)**: Create and manage sponsorship funds with target vs raised amounts.
- **Donation Records (`/admin/donations`)**: Review and verify incoming UPI/NEFT donor contributions.
- **Inquiry Management (`/admin/enquiries`)**: Filter by inquiry type (admission, volunteer, affiliation, general) and status (new, contacted, closed); log internal administrative notes.
- **Success Stories (`/admin/testimonials`)**: Manage alumni testimonials and photos.
- **Gallery Media (`/admin/gallery`)**: Add photos and videos with captions and categories.
- **News & Circulars (`/admin/news`)**: Draft and publish exam notices, admission alerts, and articles.
- **Website Settings (`/admin/settings`)**: Edit site title, helpline phones, office addresses, bank coordinates, and UPI ID without touching code.
- **Page Editor (`/admin/pages`)**: Edit Privacy Policy and Terms & Conditions.
- **Impact Metrics (`/admin/stats`)**: Update verified statistics dynamically.

---

## 🛠️ Tech Stack & Database Architecture

- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS
- **Database**:
  - Embedded real relational **SQLite** database (`data/vn_vidhyapeeth.db`) with synchronous transactional safety and instant zero-config local persistence.
  - Complete PostgreSQL **Supabase Schema** (`supabase_schema.sql`) included for easy cloud deployment.
  - Dual-mode `@supabase/supabase-js` client configured.
- **Authentication**: Secure JWT tokens in HTTP-only cookies with bcrypt password hashing.
- **Icons**: Lucide React
- **Validation**: Zod & React Form handling

---

## 💻 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Start production server
npm run start
```
The application will be live at `http://localhost:3000`.
Admin portal is accessible at `http://localhost:3000/admin/login` (Username: `admin`, Password: `admin123`).
