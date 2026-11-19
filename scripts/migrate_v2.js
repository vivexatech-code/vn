const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'vn_vidhyapeeth.db');
const db = new DatabaseSync(dbPath);

console.log('Running database schema updates...');

// 1. Create admissions table
db.exec(`
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
`);
console.log('✓ admissions table ensured');

// 2. Create partners table
db.exec(`
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
`);
console.log('✓ partners table ensured');

// 3. Create popup_settings table
db.exec(`
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
console.log('✓ popup_settings table ensured');

// Seed popup_settings if missing
const popupRow = db.prepare('SELECT id FROM popup_settings WHERE id = 1').get();
if (!popupRow) {
  db.prepare(`
    INSERT INTO popup_settings (id, is_enabled, heading, description, delay_seconds, frequency, image_url, button_text)
    VALUES (1, 1, 'Admissions Open 2025–2026', 'Connect with our academic counselors for certified paramedical, IT, and vocational healthcare diplomas.', 4, 'once_session', '/images/newslider1.jpg', 'Apply for Admission')
  `).run();
  console.log('✓ popup_settings seeded');
}

// Seed verified partners if missing
const partnerCount = db.prepare('SELECT count(*) as count FROM partners').get().count;
if (partnerCount === 0) {
  const partners = [
    { name: 'National Skill Development & Education Council', logo_url: '/images/partner1.jpg', website_url: 'https://vnvidhyapeeth.ac.in', category: 'Skill Council', description: 'Certified curriculum and assessment framework', order_index: 1 },
    { name: 'All India Healthcare & Paramedical Association', logo_url: '/images/partner2.jpg', website_url: 'https://vnvidhyapeeth.ac.in', category: 'Paramedical Accreditation', description: 'Practical clinical training guidelines', order_index: 2 },
    { name: 'Regional Hospital Training Network', logo_url: '/images/partner3.jpg', website_url: 'https://vnvidhyapeeth.ac.in', category: 'Hospital Partner', description: 'Hands-on clinical internship & rotatory postings', order_index: 3 },
    { name: 'ISO 9001:2015 Quality Management Standard', logo_url: '/images/partner4.jpg', website_url: 'https://vnvidhyapeeth.ac.in', category: 'Quality Certification', description: 'Standardized institutional education processes', order_index: 4 },
    { name: 'NITI Aayog NGO Darpan Registered Associate', logo_url: '/images/partner5.jpg', website_url: 'https://vnvidhyapeeth.ac.in', category: 'National Trust Registry', description: 'Social education empowerment under Govt. of India', order_index: 5 },
    { name: 'Ministry of MSME Recognized Enterprise', logo_url: '/images/partner6.png', website_url: 'https://vnvidhyapeeth.ac.in', category: 'MSME Certified', description: 'Vocational trade and career readiness accreditation', order_index: 6 },
  ];
  const insertPartner = db.prepare(`
    INSERT INTO partners (name, logo_url, website_url, category, description, order_index, is_active)
    VALUES (@name, @logo_url, @website_url, @category, @description, @order_index, 1)
  `);
  for (const p of partners) insertPartner.run(p);
  console.log('✓ partners seeded with 6 authentic assets');
}

// 4. Update hero slides to remove donation links
db.exec(`
  UPDATE hero_slides 
  SET cta_secondary_text = 'Apply for Admission', cta_secondary_link = '/online-admission'
  WHERE cta_secondary_link LIKE '%donate%';
`);
console.log('✓ Updated hero_slides donation links to /online-admission');

// 5. Add whatsapp_number / message to settings if missing
try {
  db.exec(`ALTER TABLE settings ADD COLUMN whatsapp_number TEXT DEFAULT '+917015358183'`);
  console.log('✓ Added whatsapp_number to settings');
} catch (e) {
  // column exists
}
try {
  db.exec(`ALTER TABLE settings ADD COLUMN whatsapp_message TEXT DEFAULT 'Hello VN Vidhyapeeth, I would like to inquire about course admissions.'`);
  console.log('✓ Added whatsapp_message to settings');
} catch (e) {
  // column exists
}

console.log('Migration script completed successfully!');
