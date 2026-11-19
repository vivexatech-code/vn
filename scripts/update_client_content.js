const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const dbPath = path.join(process.cwd(), 'data', 'vn_vidhyapeeth.db');
const db = new DatabaseSync(dbPath);

console.log('--- Updating Database Content to Match Client Feedback ---');

// 1. Update Hero Slides with exact client copy
db.exec('DELETE FROM hero_slides');
const insertSlide = db.prepare(`
  INSERT INTO hero_slides (badge, title, highlight_text, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, image_url, order_index, is_active)
  VALUES (@badge, @title, @highlight_text, @subtitle, @cta_primary_text, @cta_primary_link, @cta_secondary_text, @cta_secondary_link, @image_url, @order_index, @is_active)
`);

const slides = [
  {
    badge: 'Educational & Social Welfare Trust',
    title: 'Together, We Can Make a',
    highlight_text: 'Difference.',
    subtitle: 'Every child deserves an opportunity to learn, every family deserves a meal, and every act of kindness can create a better tomorrow.',
    cta_primary_text: 'Support Our Mission',
    cta_primary_link: '#donate',
    cta_secondary_text: 'Explore Our Work',
    cta_secondary_link: '#initiatives',
    image_url: '/images/ngo/hero-children-study.jpg',
    order_index: 1,
    is_active: 1
  },
  {
    badge: 'Education for Everyone',
    title: 'A Notebook, A Pen, A',
    highlight_text: 'Brighter Future.',
    subtitle: 'Distributing free books, school kits, and remedial learning support to children studying against all odds.',
    cta_primary_text: 'Sponsor a School Kit',
    cta_primary_link: '#donate',
    cta_secondary_text: 'Our Initiatives',
    cta_secondary_link: '#initiatives',
    image_url: '/images/ngo/hero-stationery.jpg',
    order_index: 2,
    is_active: 1
  },
  {
    badge: 'Hunger Relief',
    title: 'Warm Meals & Essential',
    highlight_text: 'Food Relief.',
    subtitle: 'Reaching the most vulnerable families with emergency grocery kits, dry rations, and daily community food support.',
    cta_primary_text: 'Feed a Family',
    cta_primary_link: '#donate',
    cta_secondary_text: 'View Field Work',
    cta_secondary_link: '#gallery',
    image_url: '/images/ngo/hero-food-relief.jpg',
    order_index: 3,
    is_active: 1
  }
];

for (const s of slides) {
  insertSlide.run(s);
}
console.log('✓ Seeded hero slides with client wording.');

// 2. Update the 5 Initiatives (focus_areas) to match the client list:
// 1. Education for Poor Children
// 2. Food Distribution & Hunger Relief
// 3. Free Stationery Distribution
// 4. Social Welfare
// 5. Community Support
db.exec('DELETE FROM focus_areas');
const insertFocus = db.prepare(`
  INSERT INTO focus_areas (title, category, description, icon_name, image_url, link_url, order_index, is_active)
  VALUES (@title, @category, @description, @icon_name, @image_url, @link_url, @order_index, @is_active)
`);

const initiatives = [
  {
    title: 'Education for Poor Children',
    category: 'Education Support',
    description: 'Providing free school fee support, evening learning centers, and tutoring for children from economically disadvantaged families.',
    icon_name: 'BookOpen',
    image_url: '/images/ngo/initiative-education.jpg',
    link_url: '/initiatives#education',
    order_index: 1,
    is_active: 1
  },
  {
    title: 'Food Distribution & Hunger Relief',
    category: 'Hunger Relief',
    description: 'Serving cooked meals and monthly dry ration kits (flour, rice, lentils, oil) directly to families struggling with food insecurity.',
    icon_name: 'Utensils',
    image_url: '/images/ngo/initiative-food.jpg',
    link_url: '/initiatives#food',
    order_index: 2,
    is_active: 1
  },
  {
    title: 'Free Stationery Distribution',
    category: 'School Supplies',
    description: 'Delivering notebooks, textbooks, geometry sets, pens, pencils, and sturdy school bags directly to students in village schools.',
    icon_name: 'FileSpreadsheet',
    image_url: '/images/ngo/initiative-stationery.jpg',
    link_url: '/initiatives#stationery',
    order_index: 3,
    is_active: 1
  },
  {
    title: 'Social Welfare',
    category: 'Family Assistance',
    description: 'Providing winter blankets, clothing drives, emergency healthcare assistance, and essential living supplies to vulnerable households.',
    icon_name: 'HeartHandshake',
    image_url: '/images/ngo/initiative-welfare.jpg',
    link_url: '/initiatives#welfare',
    order_index: 4,
    is_active: 1
  },
  {
    title: 'Community Support',
    category: 'Community Aid',
    description: 'Mobilizing grassroots volunteer teams to support local settlements with clean drinking water initiatives and social awareness.',
    icon_name: 'Users',
    image_url: '/images/ngo/initiative-child-dev.jpg',
    link_url: '/initiatives#community',
    order_index: 5,
    is_active: 1
  }
];

for (const init of initiatives) {
  insertFocus.run(init);
}
console.log('✓ Seeded 5 client-specified initiatives.');

// 3. Ensure settings reflect exact bank & organization information
db.prepare(`
  UPDATE settings SET
    tagline = 'Education for Everyone, Employment for All',
    bank_name = 'Punjab National Bank (PNB)',
    bank_account = '4123000100987654',
    bank_ifsc = 'PUNB0123400',
    qr_code_url = '/images/ngo/donation-banner.jpg'
  WHERE id = 1
`).run();
console.log('✓ Verified settings.');

console.log('--- Content Update Complete ---');
