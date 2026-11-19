import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import bcrypt from 'bcryptjs';

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'vn_vidhyapeeth.db');

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (dbInstance) return dbInstance;

  dbInstance = new DatabaseSync(DB_PATH);
  initSchema(dbInstance);
  return dbInstance;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      site_name TEXT NOT NULL,
      tagline TEXT,
      trust_name TEXT,
      act_registration TEXT,
      iso_certified TEXT,
      niti_msme TEXT,
      email TEXT NOT NULL,
      phone1 TEXT NOT NULL,
      phone2 TEXT,
      whatsapp TEXT,
      whatsapp_number TEXT DEFAULT '+917015358183',
      whatsapp_message TEXT DEFAULT 'Hello VN Vidhyapeeth, I would like to inquire about course admissions.',
      head_office_address TEXT NOT NULL,
      registered_office_address TEXT NOT NULL,
      logo_url TEXT NOT NULL,
      logo_full_url TEXT,
      qr_code_url TEXT,
      bank_name TEXT,
      bank_account TEXT,
      bank_ifsc TEXT,
      bank_holder TEXT,
      bank_branch TEXT,
      upi_id TEXT,
      facebook_url TEXT,
      instagram_url TEXT,
      twitter_url TEXT,
      youtube_url TEXT,
      primary_color TEXT DEFAULT '#183F91',
      secondary_color TEXT DEFAULT '#102C63',
      accent_color TEXT DEFAULT '#D52D2D',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE TABLE IF NOT EXISTS hero_slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      badge TEXT,
      title TEXT NOT NULL,
      highlight_text TEXT,
      subtitle TEXT NOT NULL,
      cta_primary_text TEXT,
      cta_primary_link TEXT,
      cta_secondary_text TEXT,
      cta_secondary_link TEXT,
      image_url TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS focus_areas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      icon_name TEXT,
      image_url TEXT,
      link_url TEXT,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS impact_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      prefix TEXT,
      suffix TEXT,
      icon_name TEXT,
      description TEXT,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      code TEXT,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      duration TEXT NOT NULL,
      eligibility TEXT NOT NULL,
      short_desc TEXT NOT NULL,
      full_desc TEXT,
      syllabus TEXT,
      career_prospects TEXT,
      image_url TEXT,
      is_featured INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_desc TEXT NOT NULL,
      full_desc TEXT,
      target_amount INTEGER NOT NULL,
      raised_amount INTEGER DEFAULT 0,
      image_url TEXT,
      category TEXT DEFAULT 'Education',
      is_featured INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS donations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      donor_name TEXT NOT NULL,
      donor_email TEXT NOT NULL,
      donor_phone TEXT,
      amount INTEGER NOT NULL,
      pan_number TEXT,
      payment_mode TEXT DEFAULT 'UPI / QR',
      transaction_id TEXT,
      campaign_id INTEGER,
      campaign_title TEXT,
      notes TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      course_name TEXT NOT NULL,
      achievement TEXT NOT NULL,
      quote TEXT NOT NULL,
      story TEXT,
      photo_url TEXT,
      is_featured INTEGER DEFAULT 1,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      media_type TEXT DEFAULT 'image',
      url TEXT NOT NULL,
      thumbnail_url TEXT,
      caption TEXT,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS news_blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      type TEXT DEFAULT 'news',
      featured_image TEXT,
      author TEXT DEFAULT 'VN Vidhyapeeth Admin',
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_published INTEGER DEFAULT 1,
      views_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT DEFAULT 'general',
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      course_interest TEXT,
      address TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      meta_title TEXT,
      meta_desc TEXT,
      content TEXT NOT NULL,
      featured_image TEXT,
      is_published INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_no TEXT UNIQUE NOT NULL,
      student_name TEXT NOT NULL,
      father_name TEXT NOT NULL,
      mother_name TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      mobile TEXT NOT NULL,
      whatsapp TEXT,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      state TEXT NOT NULL,
      district TEXT NOT NULL,
      pincode TEXT NOT NULL,
      course_category TEXT NOT NULL,
      course_name TEXT NOT NULL,
      qualification TEXT NOT NULL,
      passing_year TEXT NOT NULL,
      board_university TEXT NOT NULL,
      study_mode TEXT DEFAULT 'Regular',
      photo_url TEXT,
      document_url TEXT,
      remarks TEXT,
      status TEXT DEFAULT 'pending',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo_url TEXT NOT NULL,
      website_url TEXT,
      category TEXT DEFAULT 'Authorized Partner',
      description TEXT,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS popup_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      is_enabled INTEGER DEFAULT 1,
      heading TEXT DEFAULT 'Admissions Open 2025–2026',
      description TEXT DEFAULT 'Connect with our academic counselors for certified paramedical, IT, and vocational healthcare diplomas.',
      delay_seconds INTEGER DEFAULT 4,
      frequency TEXT DEFAULT 'once_session',
      image_url TEXT DEFAULT '/images/newslider1.jpg',
      button_text TEXT DEFAULT 'Apply for Admission',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedDefaultData(db);
}

function seedDefaultData(db: DatabaseSync) {
  // Check settings
  const settingsRow = db.prepare('SELECT id FROM settings WHERE id = 1').get();
  if (!settingsRow) {
    db.prepare(`
      INSERT INTO settings (
        id, site_name, tagline, trust_name, act_registration, iso_certified, niti_msme,
        email, phone1, phone2, whatsapp, head_office_address, registered_office_address,
        logo_url, logo_full_url, qr_code_url, bank_name, bank_account, bank_ifsc, bank_holder,
        bank_branch, upi_id, facebook_url, instagram_url, twitter_url, youtube_url
      ) VALUES (
        1,
        'VN Vidhyapeeth',
        'Empowering Lives Through Skill & Healthcare Education',
        'Educational Initiative Operated by a Registered Trust',
        'Registered under Indian Trust Act 1882',
        'ISO 9001:2015 Certified Institution',
        'Registered with NITI Aayog & MSME (Govt. of India)',
        'vnvidyapeeth@gmail.com',
        '+91 7015358183',
        '+91 8199048325',
        '+91 8199048325',
        'Panchmukhi Chowk, Nohar Road, Ellenabad, Sirsa, Haryana - 125102',
        '1359 A, Gali Number 8, Govind Puri, New Delhi - 110019, India',
        '/images/logo.webp',
        '/images/logo-full.jpg',
        '/images/payment-qr.jpg',
        'Punjab National Bank',
        '0442102100000677',
        'PUNB0044210',
        'VN VidhyaPeeth',
        'Ellenabad Branch, Sirsa',
        'vnvidyapeeth@pnb',
        'https://facebook.com',
        'https://instagram.com',
        'https://twitter.com',
        'https://youtube.com'
      )
    `).run();
  }

  // Check admin user
  const adminRow = db.prepare('SELECT id FROM admin_users WHERE username = ?').get('admin');
  if (!adminRow) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin123', salt);
    db.prepare(`
      INSERT INTO admin_users (username, email, password_hash, full_name, role)
      VALUES (?, ?, ?, ?, ?)
    `).run('admin', 'admin@vnvidhyapeeth.ac.in', hash, 'VN Vidhyapeeth Administrator', 'superadmin');
  }

  // Hero Slides
  const slidesCount = (db.prepare('SELECT count(*) as count FROM hero_slides').get() as { count: number }).count;
  if (slidesCount === 0) {
    const slides = [
      {
        badge: 'ISO 9001:2015 Certified • Indian Trust Act 1882',
        title: 'Education for Everyone, Employment for All',
        highlight_text: 'Employment for All',
        subtitle: 'Empowering India’s youth through premier paramedical, vocational, and digital technology career training with hands-on clinical and practical excellence.',
        cta_primary_text: 'Explore Programs',
        cta_primary_link: '/courses',
        cta_secondary_text: 'Support Our Mission',
        cta_secondary_link: '/donate',
        image_url: '/images/newslider1.jpg',
        order_index: 1
      },
      {
        badge: '100+ Authorized Study Centers Across India',
        title: 'High-Demand Healthcare & Paramedical Careers',
        highlight_text: 'Paramedical Careers',
        subtitle: 'Gain professional diplomas in DMLT, DPT, DOTT, Radiology, and Emergency Care with guaranteed practical hospital training.',
        cta_primary_text: 'View Medical Courses',
        cta_primary_link: '/courses?category=paramedical',
        cta_secondary_text: 'Online Admission 2025–26',
        cta_secondary_link: '/contact?type=admission',
        image_url: '/images/newslider2.jpg',
        order_index: 2
      },
      {
        badge: 'Social Empowerment & Community Growth',
        title: 'Bridging the Opportunity Gap Through Skills',
        highlight_text: 'Through Skills',
        subtitle: 'Subsidized education, scholarship initiatives, and digital literacy empowering underprivileged youth and women toward self-reliance.',
        cta_primary_text: 'Our Social Impact',
        cta_primary_link: '/impact',
        cta_secondary_text: 'Donate to Scholarship',
        cta_secondary_link: '/donate',
        image_url: '/images/newslider3.jpg',
        order_index: 3
      }
    ];

    const insertSlide = db.prepare(`
      INSERT INTO hero_slides (badge, title, highlight_text, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, image_url, order_index)
      VALUES (@badge, @title, @highlight_text, @subtitle, @cta_primary_text, @cta_primary_link, @cta_secondary_text, @cta_secondary_link, @image_url, @order_index)
    `);
    for (const s of slides) insertSlide.run(s);
  }

  // Impact Stats
  const statsCount = (db.prepare('SELECT count(*) as count FROM impact_stats').get() as { count: number }).count;
  if (statsCount === 0) {
    const stats = [
      { label: 'Students Trained & Placed', value: '5000', prefix: '', suffix: '+', icon_name: 'GraduationCap', description: 'Empowered youth across healthcare & technical trades', order_index: 1 },
      { label: 'Authorized Study Centers', value: '100', prefix: '', suffix: '+', icon_name: 'Building2', description: 'Nationwide network across multiple states and districts', order_index: 2 },
      { label: 'Specialized Courses', value: '35', prefix: '', suffix: '+', icon_name: 'BookOpen', description: 'Certified paramedical, IT & vocational curriculums', order_index: 3 },
      { label: 'Years of Dedicated Service', value: '7', prefix: '', suffix: '+', icon_name: 'Award', description: 'Sustained institutional commitment to grassroots education', order_index: 4 }
    ];
    const insertStat = db.prepare(`
      INSERT INTO impact_stats (label, value, prefix, suffix, icon_name, description, order_index)
      VALUES (@label, @value, @prefix, @suffix, @icon_name, @description, @order_index)
    `);
    for (const st of stats) insertStat.run(st);
  }

  // Focus Areas
  const focusCount = (db.prepare('SELECT count(*) as count FROM focus_areas').get() as { count: number }).count;
  if (focusCount === 0) {
    const focusAreas = [
      {
        title: 'Paramedical & Allied Health',
        category: 'paramedical',
        description: 'Comprehensive clinical diplomas including DMLT, DPT, DOTT, and Radiology Imaging that prepare youth for immediate hospital employment.',
        icon_name: 'Stethoscope',
        image_url: '/images/dmlt.jpg',
        link_url: '/courses?category=paramedical',
        order_index: 1
      },
      {
        title: 'Information & Digital Technology',
        category: 'computer',
        description: 'Industry-standard computer applications, accounting with Tally GST, digital marketing, and software operator certifications.',
        icon_name: 'Laptop',
        image_url: '/images/basic.jpg',
        link_url: '/courses?category=computer',
        order_index: 2
      },
      {
        title: 'Vocational & Industrial Trades',
        category: 'vocational',
        description: 'Job-oriented skill programs in textile manufacturing, industrial safety, electrical maintenance, and craftsmanship.',
        icon_name: 'Wrench',
        image_url: '/images/dbbt.jpg',
        link_url: '/courses?category=vocational',
        order_index: 3
      },
      {
        title: 'Community Empowerment & Women Welfare',
        category: 'social',
        description: 'Subsidized education schemes and skill workshops enabling young women and rural youth to earn respectable livelihoods.',
        icon_name: 'Users',
        image_url: '/images/newslider5.jpg',
        link_url: '/initiatives',
        order_index: 4
      },
      {
        title: 'Yoga & Naturopathic Wellness',
        category: 'wellness',
        description: 'Traditional and holistic natural health sciences (DNYS) fostering health prevention, therapeutic wellness, and community wellbeing.',
        icon_name: 'HeartPulse',
        image_url: '/images/newslider4.jpg',
        link_url: '/courses?category=wellness',
        order_index: 5
      },
      {
        title: 'Teacher Training & Leadership',
        category: 'teaching',
        description: 'Professional educator courses (CTTC / NTT) developing modern pedagogy, classroom leadership, and early childhood mentorship.',
        icon_name: 'Sparkles',
        image_url: '/images/newslider6.jpg',
        link_url: '/courses?category=teaching',
        order_index: 6
      }
    ];
    const insertFocus = db.prepare(`
      INSERT INTO focus_areas (title, category, description, icon_name, image_url, link_url, order_index)
      VALUES (@title, @category, @description, @icon_name, @image_url, @link_url, @order_index)
    `);
    for (const f of focusAreas) insertFocus.run(f);
  }

  // Courses
  const coursesCount = (db.prepare('SELECT count(*) as count FROM courses').get() as { count: number }).count;
  if (coursesCount === 0) {
    const initialCourses = [
      {
        title: 'Diploma in Medical Laboratory Technology (DMLT)',
        code: 'DMLT-01',
        slug: 'diploma-medical-laboratory-technology-dmlt',
        category: 'Paramedical',
        duration: '2 Years',
        eligibility: '10+2 with Science (PCM/PCB)',
        short_desc: 'Comprehensive training in clinical biochemistry, pathology, hematology, microbiology, and hospital lab diagnostic procedures.',
        full_desc: 'The Diploma in Medical Laboratory Technology (DMLT) is an allied healthcare program designed to impart in-depth knowledge of diagnosis, analysis, and testing of bodily fluids. Students receive extensive practical hospital training in automated biochemistry analyzers, hematology counters, and sterile microbiological culture techniques.',
        syllabus: 'Year 1: Clinical Pathology, Hematology, Blood Banking, Clinical Biochemistry basics, Anatomy & Physiology.\nYear 2: Medical Microbiology, Histopathology, Advanced Diagnostic Instrumentation, Parasitology, Clinical Internship.',
        career_prospects: 'Medical Lab Technician, Pathology Lab Supervisor, Hospital Diagnostic Associate, Research Lab Assistant.',
        image_url: '/images/dmlt.jpg',
        is_featured: 1
      },
      {
        title: 'Diploma in Physiotherapy (DPT)',
        code: 'DPT-02',
        slug: 'diploma-in-physiotherapy-dpt',
        category: 'Paramedical',
        duration: '2 Years',
        eligibility: '10+2 with Science (PCB/PCM)',
        short_desc: 'Hands-on training in rehabilitative exercise therapy, electrotherapy, musculoskeletal recovery, and patient mobility.',
        full_desc: 'Diploma in Physiotherapy trains students to aid patients recovering from physical injuries, neurological conditions, surgeries, and chronic pains. Focuses on manual therapy, therapeutic exercise protocols, heat therapy, and ultrasonic equipment operations.',
        syllabus: 'Year 1: General Anatomy, Physiology, Biomechanics, Exercise Therapy principles.\nYear 2: Electrotherapy, Orthopedic & Neurological Rehabilitation, Community Health Physiotherapy, Practical Clinical Rotations.',
        career_prospects: 'Physiotherapist Assistant, Rehabilitation Specialist, Sports Clinic Therapist, Wellness Consultant.',
        image_url: '/images/CPT.jpg',
        is_featured: 1
      },
      {
        title: 'Diploma in Operation Theatre Technology (DOTT)',
        code: 'DOTT-03',
        slug: 'diploma-operation-theatre-technology-dott',
        category: 'Paramedical',
        duration: '2 Years',
        eligibility: '10+2 with Science (PCM/PCB)',
        short_desc: 'Learn surgical instrument sterilisation, operating room protocols, anaesthetic support, and critical surgical assisting.',
        full_desc: 'DOTT prepares students to manage surgical theatres, calibrate surgical lighting, ventilators, and electrosurgical units, sterilize instruments, assist lead surgeons, and oversee post-operative recovery monitoring.',
        syllabus: 'Year 1: OT Environment, Sterilization Techniques, Anaesthesia Pharmacology, Surgical Equipment.\nYear 2: Advanced Surgical Assisting, Emergency Protocols, Intensive Care Procedures, Supervised Hospital Practicum.',
        career_prospects: 'OT Technician, Surgical Assistant, Anaesthesia Technologist, Critical Care Unit Technician.',
        image_url: '/images/dott.jpg',
        is_featured: 1
      },
      {
        title: 'Diploma in X-Ray & Medical Imaging Technology (DXRT)',
        code: 'DXRT-04',
        slug: 'diploma-x-ray-medical-imaging-technology-dxrt',
        category: 'Paramedical',
        duration: '2 Years',
        eligibility: '10+2 with Science (PCM/PCB)',
        short_desc: 'Master diagnostic radiography, darkroom procedures, digital radiation imaging, and patient radiation safety.',
        full_desc: 'Covers radiographic physics, anatomy visualization, positioning for skeletal and soft-tissue views, radiation protection standards, and handling computed and digital radiography machines.',
        syllabus: 'Year 1: Radiation Physics, Radiographic Anatomy, Darkroom & Digital Imaging Systems.\nYear 2: Specialized Radiographic Procedures, Computed Radiography, Radiation Safety Regulations, Hospital Radiography Practice.',
        career_prospects: 'X-Ray Technician, Radiographer, Diagnostic Center Imaging Assistant, CT/MRI Support Associate.',
        image_url: '/images/dxrt.jpg',
        is_featured: 1
      },
      {
        title: 'Advance Diploma in Computer Applications (ADCA)',
        code: 'ADCA-05',
        slug: 'advance-diploma-computer-applications-adca',
        category: 'Computer',
        duration: '1 Year',
        eligibility: '10th / 12th Pass (Any Stream)',
        short_desc: 'Extensive computer education covering office automation, programming logic, web basics, databases, and financial accounting.',
        full_desc: 'ADCA is an intensive career curriculum covering MS Office Suite, Tally Prime with GST, basic web design (HTML, CSS), database concepts, and operating systems to qualify students for corporate and administrative roles.',
        syllabus: 'Module 1: Operating Systems, Advanced Word, Excel & PowerPoint.\nModule 2: Tally Prime ERP with GST Compliance.\nModule 3: Internet Technologies, Web Design Basics, Database Management Systems.',
        career_prospects: 'Office Administrator, Computer Operator, Data Entry Specialist, Junior Accountant, IT Support Assistant.',
        image_url: '/images/basic.jpg',
        is_featured: 1
      },
      {
        title: 'Tally Prime & GST Professional Accounting',
        code: 'TP-GST-06',
        slug: 'tally-prime-gst-professional-accounting',
        category: 'Computer',
        duration: '6 Months',
        eligibility: '10th / 12th / Undergraduates',
        short_desc: 'Real-world business accounting, e-way bills, GST returns, ledger management, payroll, and financial reconciliation.',
        full_desc: 'A specialized accounting program focused on commercial accounting workflows, balance sheet generation, inventory tracking, taxation calculations, and automated invoicing.',
        syllabus: 'Fundamentals of Accounting, Company Creation, Voucher Entry, Inventory & Stock Management, GST Invoicing & Return Filing, Bank Reconciliation, Payroll.',
        career_prospects: 'Accountant, Billing Executive, GST Assistant, Tax Clerk in Chartered Accountant firms.',
        image_url: '/images/cmlt.jpg',
        is_featured: 0
      },
      {
        title: 'Diploma in Textile Technology',
        code: 'DTT-07',
        slug: 'diploma-in-textile-technology',
        category: 'Vocational',
        duration: '1 Year',
        eligibility: '10th Pass',
        short_desc: 'Training in fabric manufacturing, yarn processing, textile machinery operation, and quality lab inspection.',
        full_desc: 'Covers textile chemistry, weaving mechanics, printing on fabrics, textile testing standards, and machine maintenance for India’s booming garment and fabric sectors.',
        syllabus: 'Fiber Science, Yarn Formation, Weaving & Knitting Technology, Dyeing & Printing on Fabrics, Textile Testing & Quality Control.',
        career_prospects: 'Textile Technician, Quality Inspector, Printing Specialist, Machine Operator.',
        image_url: '/images/dbbt.jpg',
        is_featured: 0
      },
      {
        title: 'Diploma in Naturopathy & Yogic Sciences (DNYS)',
        code: 'DNYS-08',
        slug: 'diploma-naturopathy-yogic-sciences-dnys',
        category: 'Paramedical',
        duration: '2 Years',
        eligibility: '10+2 with Science or equivalent',
        short_desc: 'Holistic health training in therapeutic yoga, hydrotherapy, mud therapy, nutrition, and natural healing methods.',
        full_desc: 'Focuses on drugless healing, disease prevention through dietary regimens, asanas, pranayama, acupressure, and natural treatment modalities.',
        syllabus: 'Anatomy & Physiology, Philosophy of Nature Cure, Hydrotherapy & Mud Therapy, Fasting & Nutrition, Yogic Asanas & Kriyas, Practical Clinic Sessions.',
        career_prospects: 'Yoga Instructor, Naturopathy Clinic Assistant, Wellness Center Consultant, Lifestyle Coach.',
        image_url: '/images/cms.jpg',
        is_featured: 1
      }
    ];

    const insertCourse = db.prepare(`
      INSERT INTO courses (title, code, slug, category, duration, eligibility, short_desc, full_desc, syllabus, career_prospects, image_url, is_featured)
      VALUES (@title, @code, @slug, @category, @duration, @eligibility, @short_desc, @full_desc, @syllabus, @career_prospects, @image_url, @is_featured)
    `);
    for (const c of initialCourses) insertCourse.run(c);
  }

  // Campaigns
  const campCount = (db.prepare('SELECT count(*) as count FROM campaigns').get() as { count: number }).count;
  if (campCount === 0) {
    const campaigns = [
      {
        title: 'Rural Healthcare Skill Scholarship Fund',
        slug: 'rural-healthcare-skill-scholarship-fund',
        short_desc: 'Sponsor diploma education for deserving youth from underprivileged agricultural families aiming for healthcare careers.',
        full_desc: 'Thousands of talented young women and men in rural areas dream of becoming lab technicians, nurses, and medical assistants but lack the financial means for course fees and study materials. This campaign provides 100% full-tuition grants and clinical kits to empower 50 rural students every year.',
        target_amount: 500000,
        raised_amount: 185000,
        image_url: '/images/newslider4.jpg',
        category: 'Healthcare Education',
        is_featured: 1
      },
      {
        title: 'Digital Literacy & Computer Lab Setup for Underprivileged Youth',
        slug: 'digital-literacy-computer-lab-setup',
        short_desc: 'Equipping learning centers with modern computers, high-speed connectivity, and certified digital training.',
        full_desc: 'To bridge the digital divide, VN Vidhyapeeth is outfitting community study centers with modern workstations, office software, and certified mentors to train first-generation learners in computer literacy, typing, and digital tools.',
        target_amount: 300000,
        raised_amount: 120000,
        image_url: '/images/newslider3.jpg',
        category: 'Digital Literacy',
        is_featured: 1
      },
      {
        title: 'Women Empowerment Vocational Sewing & Craft Initiative',
        slug: 'women-empowerment-vocational-initiative',
        short_desc: 'Providing industrial textile training and self-employment toolkits to rural women.',
        full_desc: 'Enabling financial independence for women in semi-urban and rural clusters through certified textile fabrication, cloth printing, and entrepreneurial mentorship.',
        target_amount: 250000,
        raised_amount: 95000,
        image_url: '/images/newslider5.jpg',
        category: 'Women Empowerment',
        is_featured: 1
      }
    ];

    const insertCamp = db.prepare(`
      INSERT INTO campaigns (title, slug, short_desc, full_desc, target_amount, raised_amount, image_url, category, is_featured)
      VALUES (@title, @slug, @short_desc, @full_desc, @target_amount, @raised_amount, @image_url, @category, @is_featured)
    `);
    for (const cp of campaigns) insertCamp.run(cp);
  }

  // Testimonials / Success stories
  const testCount = (db.prepare('SELECT count(*) as count FROM testimonials').get() as { count: number }).count;
  if (testCount === 0) {
    const stories = [
      {
        student_name: 'Neeraj',
        course_name: 'Basic Computer Course (BCC)',
        achievement: 'Successfully Completed & Employed as Data Executive',
        quote: 'VN Vidhyapeeth gave me practical hands-on computer skills that immediately opened employment opportunities in our local administration office.',
        story: 'Coming from a modest background with no prior computer exposure, Neeraj mastered office productivity software and typing, securing full-time employment within weeks of certificate completion.',
        photo_url: '/images/neeraj-success-section.jpg',
        is_featured: 1
      },
      {
        student_name: 'Om Prakash',
        course_name: 'Diploma in Physiotherapy (DPT)',
        achievement: 'Practicing Physiotherapist Assistant',
        quote: 'The rigorous clinical training and supportive faculty gave me the clinical confidence to treat patients and start my professional career with dignity.',
        story: 'Om Prakash completed 2 years of extensive physiotherapy coursework and clinical rotations. Today he assists orthopedic specialists and helps rehabilitate elderly patients.',
        photo_url: '/images/om-prakash-success-section.jpg',
        is_featured: 1
      },
      {
        student_name: 'Raj Kumar',
        course_name: 'Diploma in Operation Theatre Technology (DOTT)',
        achievement: 'Hospital Surgical Team Associate',
        quote: 'Managing modern operating theatre equipment seemed daunting until VN Vidhyapeeth provided real-life hospital internship exposure.',
        story: 'Raj Kumar is now an essential part of the surgical support unit at a regional multispecialty hospital, ensuring patient safety and sterile surgical environments.',
        photo_url: '/images/raj-kumar-success-section.jpg',
        is_featured: 1
      },
      {
        student_name: 'Vijendra Kumar',
        course_name: 'Diploma in X-Ray Technology (DXRT)',
        achievement: 'Lead Radiography Technician at Diagnostic Center',
        quote: 'The practical training with digital X-Ray systems helped me secure an immediate role in a state-of-the-art diagnostic clinic.',
        story: 'Vijendra gained mastery in radiographic imaging protocols and patient positioning, enabling accurate medical diagnoses and a rewarding career.',
        photo_url: '/images/vijendra-kumar-success-section.jpg',
        is_featured: 1
      }
    ];

    const insertStory = db.prepare(`
      INSERT INTO testimonials (student_name, course_name, achievement, quote, story, photo_url, is_featured)
      VALUES (@student_name, @course_name, @achievement, @quote, @story, @photo_url, @is_featured)
    `);
    for (const st of stories) insertStory.run(st);
  }

  // Gallery
  const galCount = (db.prepare('SELECT count(*) as count FROM gallery_items').get() as { count: number }).count;
  if (galCount === 0) {
    const gallery = [
      { title: 'Clinical Laboratory Practical Training', category: 'Training', media_type: 'image', url: '/images/dmlt.jpg', caption: 'Students performing biochemical analysis and hematology testing in hospital labs.', order_index: 1 },
      { title: 'Computer Lab Practical Class', category: 'Education', media_type: 'image', url: '/images/basic.jpg', caption: 'Interactive digital skill training and accounting software workshops.', order_index: 2 },
      { title: 'Operating Theatre Technology Seminar', category: 'Paramedical', media_type: 'image', url: '/images/dott.jpg', caption: 'Sterilization and surgical support demonstration session.', order_index: 3 },
      { title: 'Annual Student Certification Convocation', category: 'Events', media_type: 'image', url: '/images/newslider6.jpg', caption: 'Celebrating the achievements and successful course completions of our batch.', order_index: 4 },
      { title: 'Radiology Equipment Hands-on Session', category: 'Training', media_type: 'image', url: '/images/dxrt.jpg', caption: 'Practical positioning and imaging techniques demonstration.', order_index: 5 },
      { title: 'Social Community Health Awareness Camp', category: 'Social Impact', media_type: 'image', url: '/images/newslider5.jpg', caption: 'Free health checkup and wellness advisory camp organized by VN Vidhyapeeth.', order_index: 6 },
      { title: 'Physiotherapy & Rehabilitation Workshop', category: 'Paramedical', media_type: 'image', url: '/images/CPT.jpg', caption: 'Therapeutic mobility and electrotherapy patient care exercises.', order_index: 7 },
      { title: 'Vocational Textile & Design Workshop', category: 'Vocational', media_type: 'image', url: '/images/dbbt.jpg', caption: 'Fabric printing, yarn inspection, and industrial craft training.', order_index: 8 }
    ];

    const insertGal = db.prepare(`
      INSERT INTO gallery_items (title, category, media_type, url, caption, order_index)
      VALUES (@title, @category, @media_type, @url, @caption, @order_index)
    `);
    for (const g of gallery) insertGal.run(g);
  }

  // News & Blogs
  const newsCount = (db.prepare('SELECT count(*) as count FROM news_blogs').get() as { count: number }).count;
  if (newsCount === 0) {
    const articles = [
      {
        title: 'Admission Open for Academic Session 2025–2026',
        slug: 'admission-open-session-2025-2026',
        excerpt: 'Applications are formally invited for two-year paramedical diplomas, computer certifications, and vocational courses across all study centers.',
        content: `VN Vidhyapeeth announces the commencement of admissions for the upcoming Academic Session 2025–2026. Prospective students can now apply for certified programs in Paramedical Sciences (DMLT, DPT, DOTT, DXRT), Computer Applications (ADCA, Tally Prime GST), and Vocational Trades.\n\nOur programs emphasize practical clinical training, verified syllabus standards, and direct placement support.\n\nKey Dates & Guidelines:\n- Early Bird scholarship applications open through official portal.\n- Verification of academic records at Head Office or authorized local center.\n- Special tuition concessions for rural and female applicants.`,
        category: 'Admissions',
        type: 'announcement',
        featured_image: '/images/newslider1.jpg'
      },
      {
        title: 'Authorized Study Center Affiliation Drive 2025',
        slug: 'authorized-study-center-affiliation-drive-2025',
        excerpt: 'VN Vidhyapeeth invites reputable educational trusts, institutes, and healthcare organizations to partner as authorized study centers.',
        content: `Under our mission of decentralizing quality skill training, VN Vidhyapeeth is expanding its network across tier-2, tier-3 cities and rural clusters in India.\n\nAffiliated institutions receive standardized curriculum blueprints, examination moderation, national certification, and branding support under the Indian Trust Act 1882 & ISO 9001:2015 quality frameworks.\n\nInterested institutes can submit center registration documents online or contact our Head Office directly.`,
        category: 'Institutional',
        type: 'news',
        featured_image: '/images/newslider2.jpg'
      },
      {
        title: 'Why Paramedical Education is Crucial for India’s Healthcare Future',
        slug: 'why-paramedical-education-is-crucial-for-indias-healthcare-future',
        excerpt: 'An insightful overview of the growing demand for certified laboratory technicians, radiographers, and emergency medical personnel.',
        content: `India's healthcare sector is witnessing rapid expansion with new clinics, diagnostic chains, and multispecialty hospitals emerging across every district.\n\nBehind every successful physician and surgeon stands a dedicated team of paramedical technologists—from the laboratory professional analyzing blood pathology to the radiographer operating complex imaging machinery.\n\nAt VN Vidhyapeeth, our curriculum bridges the gap between academic theory and clinical hospital environments, equipping young aspirants with real-world competence.`,
        category: 'Healthcare',
        type: 'blog',
        featured_image: '/images/dmlt.jpg'
      },
      {
        title: 'Examination Schedule & Admit Card Guidelines Released',
        slug: 'examination-schedule-admit-card-guidelines-released',
        excerpt: 'Official circular regarding semester examinations, practical assessment dates, and online admit card downloads for enrolled students.',
        content: `All enrolled students and affiliated center coordinators are advised that the upcoming semester examinations timetable has been finalized.\n\nPractical clinical examinations will take place at assigned hospital training centers followed by centralized theoretical examinations. Admit cards can be verified and downloaded with student enrollment numbers.`,
        category: 'Examination',
        type: 'notice',
        featured_image: '/images/newslider6.jpg'
      }
    ];

    const insertNews = db.prepare(`
      INSERT INTO news_blogs (title, slug, excerpt, content, category, type, featured_image)
      VALUES (@title, @slug, @excerpt, @content, @category, @type, @featured_image)
    `);
    for (const a of articles) insertNews.run(a);
  }

  // Pages
  const pagesCount = (db.prepare('SELECT count(*) as count FROM pages').get() as { count: number }).count;
  if (pagesCount === 0) {
    const pages = [
      {
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        meta_title: 'Privacy Policy | VN Vidhyapeeth',
        meta_desc: 'Read how VN Vidhyapeeth collects, uses, and safeguards student and donor information.',
        content: `VN Vidhyapeeth ("Organization", "we", "us") is dedicated to safeguarding your privacy and ensuring the confidentiality of your personal data.\n\n1. Information Collection: We collect details provided during course enquiries, admission forms, donations, and volunteer registration, including names, contact numbers, email addresses, and educational qualifications.\n\n2. Use of Information: Your data is solely utilized to process applications, communicate institutional updates, issue donation receipts, and manage student records. We never sell, rent, or lease personal information to third parties.\n\n3. Security: We adopt robust administrative and technical protections to secure your data against unauthorized disclosure or tampering.\n\n4. Contact: For privacy questions, contact vnvidyapeeth@gmail.com.`
      },
      {
        title: 'Terms & Conditions',
        slug: 'terms-and-conditions',
        meta_title: 'Terms & Conditions | VN Vidhyapeeth',
        meta_desc: 'Institutional guidelines and terms for website usage, course admissions, and donations.',
        content: `Welcome to the official website of VN Vidhyapeeth, operated by a registered educational trust under the Indian Trust Act 1882.\n\n1. Institutional Status: VN Vidhyapeeth offers autonomous skill-development, paramedical, and vocational diploma programs aimed at direct employability and self-employment.\n\n2. Code of Conduct: Students and website visitors must provide truthful academic and identification information.\n\n3. Donations: Voluntary donations made in support of student scholarships and non-profit educational initiatives are non-refundable.\n\n4. Intellectual Property: All logos, content, and materials published on this portal belong to VN Vidhyapeeth.`
      }
    ];

    const insertPage = db.prepare(`
      INSERT INTO pages (title, slug, meta_title, meta_desc, content)
      VALUES (@title, @slug, @meta_title, @meta_desc, @content)
    `);
    for (const p of pages) insertPage.run(p);
  }
}
