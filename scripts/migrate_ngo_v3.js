const sqlite3 = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'vn_vidhyapeeth.db');
const db = new sqlite3.DatabaseSync(dbPath);

console.log('--- STARTING NGO V3 SCHEMA & DATA MIGRATION ---');

// 1. Create volunteers table
db.exec(`
  CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    areas_of_interest TEXT NOT NULL,
    availability TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
console.log('✓ volunteers table verified/created.');

// 2. Update Settings
db.prepare(`
  UPDATE settings SET
    tagline = 'Education for Everyone, Employment for All',
    trust_name = 'VN Vidhyapeeth (Registered Social Welfare Trust)',
    bank_name = 'Punjab National Bank',
    bank_account = '4123000100987654',
    bank_ifsc = 'PUNB0123400',
    bank_holder = 'VN Vidhyapeeth Trust',
    bank_branch = 'Main Branch, Haryana',
    upi_id = 'vnvidhyapeeth@pnb',
    qr_code_url = '/images/payment-qr.jpg',
    whatsapp_number = '+917015358183',
    whatsapp_message = 'Hello VN Vidhyapeeth, I would like to support your social welfare initiatives.'
  WHERE id = 1;
`).run();
console.log('✓ settings updated with NGO social welfare details.');

// 3. Clear and seed focus_areas (The 5 Initiatives)
db.exec('DELETE FROM focus_areas');
const insertFocus = db.prepare(`
  INSERT INTO focus_areas (title, category, description, icon_name, image_url, link_url, order_index, is_active)
  VALUES (@title, @category, @description, @icon_name, @image_url, @link_url, @order_index, @is_active)
`);

const initiatives = [
  {
    title: 'Education for Every Child',
    category: 'Child Education',
    description: 'Providing free education assistance, remedial learning centers, school admissions, and tuition support for children who cannot afford school.',
    icon_name: 'BookOpen',
    image_url: '/images/ngo/initiative-education.jpg',
    link_url: '/initiatives',
    order_index: 1,
    is_active: 1
  },
  {
    title: 'Food Distribution & Hunger Relief',
    category: 'Hunger Relief',
    description: 'Regular community food distribution drives, wholesome daily meals, and dry ration grocery kits for impoverished families and homeless individuals.',
    icon_name: 'Utensils',
    image_url: '/images/ngo/initiative-food.jpg',
    link_url: '/initiatives',
    order_index: 2,
    is_active: 1
  },
  {
    title: 'Free Stationery for Children',
    category: 'Educational Aid',
    description: 'Equipping underprivileged students with free notebooks, textbooks, school bags, geometry boxes, pens, and pencils to eliminate barriers to learning.',
    icon_name: 'FileSpreadsheet',
    image_url: '/images/ngo/initiative-stationery.jpg',
    link_url: '/initiatives',
    order_index: 3,
    is_active: 1
  },
  {
    title: 'Social Welfare & Family Support',
    category: 'Community Welfare',
    description: 'Essential supplies distribution, emergency family assistance, winter blanket drives, and socio-economic support for economically weaker sections.',
    icon_name: 'HeartHandshake',
    image_url: '/images/ngo/initiative-welfare.jpg',
    link_url: '/initiatives',
    order_index: 4,
    is_active: 1
  },
  {
    title: 'Child Welfare & Development',
    category: 'Child Welfare',
    description: 'Nurturing physical and emotional health through health checkups, life skill workshops, extracurricular activities, and holistic child protection.',
    icon_name: 'Sparkles',
    image_url: '/images/ngo/initiative-child-dev.jpg',
    link_url: '/initiatives',
    order_index: 5,
    is_active: 1
  }
];

for (const init of initiatives) {
  insertFocus.run(init);
}
console.log(`✓ Seeded ${initiatives.length} core initiatives.`);

// 4. Update hero_slides
db.exec('DELETE FROM hero_slides');
const insertSlide = db.prepare(`
  INSERT INTO hero_slides (badge, title, highlight_text, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, image_url, order_index, is_active)
  VALUES (@badge, @title, @highlight_text, @subtitle, @cta_primary_text, @cta_primary_link, @cta_secondary_text, @cta_secondary_link, @image_url, @order_index, @is_active)
`);

const slides = [
  {
    badge: 'Educational & Social Welfare Organization',
    title: 'Building a Better Tomorrow,',
    highlight_text: 'One Life at a Time.',
    subtitle: 'VN Vidhyapeeth is committed to supporting underprivileged children and families through education, food assistance, free stationery and meaningful social welfare initiatives.',
    cta_primary_text: 'Explore Our Initiatives',
    cta_primary_link: '/initiatives',
    cta_secondary_text: 'Donate Now',
    cta_secondary_link: '/donate',
    image_url: '/images/ngo/hero-children-study.jpg',
    order_index: 1,
    is_active: 1
  },
  {
    badge: 'Education for Everyone',
    title: 'Empower Young Minds With',
    highlight_text: 'Free Learning & Books.',
    subtitle: 'Breaking the cycle of poverty by sponsoring schooling, providing free stationery kits, and establishing community learning centers.',
    cta_primary_text: 'Support a Child',
    cta_primary_link: '/campaigns',
    cta_secondary_text: 'Join as Volunteer',
    cta_secondary_link: '/volunteer',
    image_url: '/images/ngo/hero-stationery.jpg',
    order_index: 2,
    is_active: 1
  },
  {
    badge: 'Hunger Relief & Food Drives',
    title: 'Ensuring No Child & Family',
    highlight_text: 'Goes to Sleep Hungry.',
    subtitle: 'Distributing warm nutritious meals and emergency grocery ration kits to vulnerable households across our communities.',
    cta_primary_text: 'Feed a Family',
    cta_primary_link: '/donate',
    cta_secondary_text: 'Our Impact',
    cta_secondary_link: '/impact',
    image_url: '/images/ngo/hero-food-relief.jpg',
    order_index: 3,
    is_active: 1
  }
];

for (const s of slides) {
  insertSlide.run(s);
}
console.log(`✓ Seeded ${slides.length} social welfare hero slides.`);

// 5. Update campaigns
db.exec('DELETE FROM campaigns');
const insertCampaign = db.prepare(`
  INSERT INTO campaigns (title, slug, short_desc, full_desc, target_amount, raised_amount, image_url, category, is_featured, is_active)
  VALUES (@title, @slug, @short_desc, @full_desc, @target_amount, @raised_amount, @image_url, @category, @is_featured, @is_active)
`);

const campaigns = [
  {
    title: "Support a Child's Education",
    slug: 'support-a-childs-education',
    short_desc: 'Sponsor school tuition fees, books, uniforms, and learning materials for an underprivileged child for an entire academic year.',
    full_desc: 'Education is the most powerful tool to lift families out of generational poverty. Your contribution of just ₹500/month covers school supplies, notebooks, tutoring, and nutritional support for a child in need.',
    target_amount: 250000,
    raised_amount: 185000,
    image_url: '/images/ngo/campaign-child-education.jpg',
    category: 'Education',
    is_featured: 1,
    is_active: 1
  },
  {
    title: 'Feed a Hungry Family',
    slug: 'feed-a-hungry-family',
    short_desc: 'Provide comprehensive monthly dry ration food kits (wheat flour, rice, pulses, cooking oil, spices) to impoverished families.',
    full_desc: 'No mother should ever have to see her children cry from hunger. VN Vidhyapeeth conducts weekly community kitchen drives and home distribution of essential grocery kits for daily-wage laborers.',
    target_amount: 150000,
    raised_amount: 112000,
    image_url: '/images/ngo/campaign-feed-family.jpg',
    category: 'Food Relief',
    is_featured: 1,
    is_active: 1
  },
  {
    title: 'Free School Stationery Distribution',
    slug: 'free-school-stationery-distribution',
    short_desc: 'Distribute complete educational stationery packs (notebooks, geometry boxes, pens, pencils, erasers, backpacks) to village schools.',
    full_desc: 'Many brilliant children fall behind in studies simply because their parents cannot afford basic notebooks and writing tools. We distribute customized stationery kits directly to students.',
    target_amount: 100000,
    raised_amount: 78500,
    image_url: '/images/ngo/campaign-stationery.jpg',
    category: 'Stationery Kits',
    is_featured: 1,
    is_active: 1
  },
  {
    title: 'Help Underprivileged Children',
    slug: 'help-underprivileged-children',
    short_desc: 'Holistic child welfare program supporting children in slums and rural areas with healthcare checkups, clothes, and safe learning spaces.',
    full_desc: 'Focusing on total child well-being through seasonal clothing drives, pediatric health screenings, mental well-being workshops, and recreational sports.',
    target_amount: 300000,
    raised_amount: 210000,
    image_url: '/images/ngo/campaign-child-welfare.jpg',
    category: 'Child Welfare',
    is_featured: 1,
    is_active: 1
  }
];

for (const c of campaigns) {
  insertCampaign.run(c);
}
console.log(`✓ Seeded ${campaigns.length} welfare campaigns.`);

// 6. Update impact_stats
db.exec('DELETE FROM impact_stats');
const insertStat = db.prepare(`
  INSERT INTO impact_stats (label, value, prefix, suffix, icon_name, description, order_index, is_active)
  VALUES (@label, @value, @prefix, @suffix, @icon_name, @description, @order_index, @is_active)
`);

const stats = [
  {
    label: 'Children Supported',
    value: '15,000',
    prefix: '',
    suffix: '+',
    icon_name: 'GraduationCap',
    description: 'Children enrolled in learning centers and sponsored with free schooling',
    order_index: 1,
    is_active: 1
  },
  {
    label: 'Meals Distributed',
    value: '85,000',
    prefix: '',
    suffix: '+',
    icon_name: 'Utensils',
    description: 'Wholesome nutritious meals served through community food drives',
    order_index: 2,
    is_active: 1
  },
  {
    label: 'Stationery Kits Given',
    value: '12,500',
    prefix: '',
    suffix: '+',
    icon_name: 'BookOpen',
    description: 'Complete student kits with notebooks, stationery and study materials',
    order_index: 3,
    is_active: 1
  },
  {
    label: 'Families Supported',
    value: '4,200',
    prefix: '',
    suffix: '+',
    icon_name: 'HeartHandshake',
    description: 'Low-income households assisted with monthly grocery rations',
    order_index: 4,
    is_active: 1
  },
  {
    label: 'Community Drives',
    value: '350',
    prefix: '',
    suffix: '+',
    icon_name: 'Users',
    description: 'On-ground social welfare, medical camp & awareness initiatives',
    order_index: 5,
    is_active: 1
  }
];

for (const st of stats) {
  insertStat.run(st);
}
console.log(`✓ Seeded ${stats.length} impact statistics.`);

// 7. Update testimonials (Stories of Change)
db.exec('DELETE FROM testimonials');
const insertTestimonial = db.prepare(`
  INSERT INTO testimonials (student_name, course_name, achievement, quote, story, photo_url, is_featured, is_active)
  VALUES (@student_name, @course_name, @achievement, @quote, @story, @photo_url, @is_featured, @is_active)
`);

const stories = [
  {
    student_name: 'Priya Sharma (Age 11)',
    course_name: 'Primary Education Scholar',
    achievement: 'Class Topper & Aspiring Teacher',
    quote: 'Without VN Vidhyapeeth, I would have dropped out to help at home. Today, I receive my books, notebooks and dream of becoming a government school teacher.',
    story: 'Priya comes from a daily-wage laborer family in a rural village. VN Vidhyapeeth provided complete school fees, a backpack with 6 notebooks, uniforms, and free evening remedial tutoring.',
    photo_url: '/images/ngo/story-priya.jpg',
    is_featured: 1,
    is_active: 1
  },
  {
    student_name: 'Rohit Kumar (Age 14)',
    course_name: 'Middle School Student',
    achievement: 'Science Fair Winner',
    quote: 'The free stationery distribution gave me my first notebook set and geometry box. It motivated me to work hard and secure first division in my examinations.',
    story: 'Rohit could not participate in classroom science assignments because he lacked geometry tools and notebook paper. Our volunteer drive equipped him, unlocking his innate talent for science.',
    photo_url: '/images/ngo/story-rohit.jpg',
    is_featured: 1,
    is_active: 1
  },
  {
    student_name: 'Sunita Devi',
    course_name: 'Mother of 3 Children',
    achievement: 'Community Beneficiary',
    quote: 'During tough monsoon months when construction work stopped, VN Vidhyapeeth ration kits kept my children nourished. They are angels for families like ours.',
    story: 'Sunita is a widow raising three young children. VN Vidhyapeeth enrolled her family into the monthly food relief program and sponsored all three of her children in school.',
    photo_url: '/images/ngo/story-sunita.jpg',
    is_featured: 1,
    is_active: 1
  }
];

for (const story of stories) {
  insertTestimonial.run(story);
}
console.log(`✓ Seeded ${stories.length} stories of change.`);

// 8. Seed sample donations
const donationCount = db.prepare('SELECT COUNT(*) as c FROM donations').get().c;
if (donationCount === 0) {
  const insertDonation = db.prepare(`
    INSERT INTO donations (donor_name, donor_email, donor_phone, amount, pan_number, payment_mode, transaction_id, campaign_id, campaign_title, notes, status)
    VALUES (@donor_name, @donor_email, @donor_phone, @amount, @pan_number, @payment_mode, @transaction_id, @campaign_id, @campaign_title, @notes, @status)
  `);

  insertDonation.run({
    donor_name: 'Vikram Malhotra',
    donor_email: 'vikram.m@example.com',
    donor_phone: '9876543210',
    amount: 5000,
    pan_number: 'ABCDE1234F',
    payment_mode: 'UPI',
    transaction_id: 'UPI2026110912345',
    campaign_id: 1,
    campaign_title: "Support a Child's Education",
    notes: 'In honor of my late parents',
    status: 'verified'
  });

  insertDonation.run({
    donor_name: 'Ananya Deshmukh',
    donor_email: 'ananya.d@example.com',
    donor_phone: '9811223344',
    amount: 2500,
    pan_number: 'XYZPK9876Q',
    payment_mode: 'Bank Transfer (NEFT)',
    transaction_id: 'NEFT9988776655',
    campaign_id: 2,
    campaign_title: 'Feed a Hungry Family',
    notes: 'Monthly family ration kit sponsor',
    status: 'verified'
  });
  console.log('✓ Seeded sample verified donations.');
}

// 9. Seed sample volunteers
const volunteerCount = db.prepare('SELECT COUNT(*) as c FROM volunteers').get().c;
if (volunteerCount === 0) {
  const insertVol = db.prepare(`
    INSERT INTO volunteers (full_name, mobile, email, city, areas_of_interest, availability, message, status)
    VALUES (@full_name, @mobile, @email, @city, @areas_of_interest, @availability, @message, @status)
  `);

  insertVol.run({
    full_name: 'Kavita Singh',
    mobile: '9876501234',
    email: 'kavita.singh@example.com',
    city: 'Hisar',
    areas_of_interest: 'Education for Underprivileged Children, Free Stationery Distribution',
    availability: 'Weekends (Saturday & Sunday)',
    message: 'I am a retired teacher and would love to teach basic English and Mathematics to children.',
    status: 'approved'
  });

  insertVol.run({
    full_name: 'Manish Verma',
    mobile: '9812345678',
    email: 'manish.v@example.com',
    city: 'Bhiwani',
    areas_of_interest: 'Food Distribution & Hunger Relief, Community Welfare Drives',
    availability: 'Weekdays & Weekends',
    message: 'I have a vehicle and can help transport food packets and stationery kits.',
    status: 'pending'
  });
  console.log('✓ Seeded sample volunteers.');
}

// 10. Update Popup Settings for NGO Welfare
db.prepare(`
  UPDATE popup_settings SET
    is_enabled = 1,
    delay_seconds = 4,
    frequency = 'once_session',
    heading = 'Change a Child''s Life Today',
    description = 'Your small contribution provides free notebooks, daily wholesome meals, and educational aid to children in need.',
    button_text = 'Donate to Support',
    image_url = '/images/ngo/campaign-child-education.jpg'
  WHERE id = 1;
`).run();
console.log('✓ Updated popup settings for NGO social welfare appeal.');

console.log('=== NGO V3 MIGRATION FINISHED SUCCESSFULLY ===');
