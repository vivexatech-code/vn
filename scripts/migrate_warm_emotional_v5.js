const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'vn_vidhyapeeth.db');
const db = new DatabaseSync(dbPath);

console.log('Migrating database to Warm Emotional NGO Theme (v5)...');

// 1. Update Settings with Warm Color Theme
db.prepare(`
  UPDATE settings SET
    primary_color = '#C87552',
    secondary_color = '#49352D',
    accent_color = '#78866B',
    quick_amounts = '101,251,501,1001,2501'
  WHERE id = 1
`).run();
console.log('Updated settings with warm palette (#C87552, #49352D, #78866B)');

// 2. Update Hero Slides with simple, emotional copy
db.prepare('DELETE FROM hero_slides').run();

const insertSlide = db.prepare(`
  INSERT INTO hero_slides (badge, title, highlight_text, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, image_url, order_index, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
`);

insertSlide.run(
  'Every Child Matters',
  'A Little Help Can Change',
  'Someone\'s Life.',
  'Every child deserves a chance to dream, every family deserves food on the table, and your small kindness can make someone\'s tomorrow better.',
  'Donate Now',
  '#donate',
  'See Our Work',
  '#our-work',
  '/images/ngo/hero-children-study.jpg',
  1
);

insertSlide.run(
  'Free School Support',
  'Some Children Are Still Waiting For',
  'Their First Opportunity.',
  'Thousands of children are eager to learn. We provide free school kits, notebooks, and learning support so poverty never stops a child from dreaming.',
  'Support a Child',
  '#donate',
  'See Our Work',
  '#our-work',
  '/images/ngo/hero-stationery.jpg',
  2
);

insertSlide.run(
  'Hunger Relief',
  'A Warm Meal Can Bring',
  'Big Hope.',
  'No mother should worry about feeding her children tonight. We deliver wholesome meals and grocery ration kits directly to needy families.',
  'Help Feed a Family',
  '#donate',
  'See Our Work',
  '#our-work',
  '/images/ngo/hero-food-relief.jpg',
  3
);

console.log('Inserted 3 emotional hero slides');

// 3. Update Focus Areas: 6 clear NGO activities
db.prepare('DELETE FROM focus_areas').run();

const insertArea = db.prepare(`
  INSERT INTO focus_areas (title, category, description, icon_name, image_url, link_url, order_index, is_active)
  VALUES (?, ?, ?, ?, ?, ?, ?, 1)
`);

insertArea.run(
  'Child Education',
  'Education',
  'Helping poor children go to school with free books, backpacks, fee assistance and evening learning classes.',
  'BookOpen',
  '/images/ngo/initiative-education.jpg',
  '/initiatives#education',
  1
);

insertArea.run(
  'Food Distribution',
  'Hunger Relief',
  'Serving hot cooked meals and monthly dry ration kits (flour, rice, lentils, oil) directly to hungry families.',
  'Utensils',
  '/images/ngo/initiative-food.jpg',
  '/initiatives#food',
  2
);

insertArea.run(
  'Helping Poor Families',
  'Family Care',
  'Providing warm winter blankets, clothes, emergency living supplies, and dignity support for needy households.',
  'HeartHandshake',
  '/images/ngo/initiative-welfare.jpg',
  '/initiatives#welfare',
  3
);

insertArea.run(
  'Healthcare Support',
  'Healthcare',
  'Organizing free basic medical checkups, distributing essential medicines, and pediatric care for vulnerable people.',
  'Sparkles',
  '/images/ngo/campaign-child-welfare.jpg',
  '/initiatives#healthcare',
  4
);

insertArea.run(
  'Women Empowerment',
  'Skills & Self-Reliance',
  'Teaching stitching, tailoring, handicrafts, and basic literacy so mothers and young women can earn with respect.',
  'Users',
  '/images/ngo/story-sunita.jpg',
  '/initiatives#women',
  5
);

insertArea.run(
  'Community Development',
  'Community Care',
  'Supporting villages and slums with safe drinking water drives, hygiene kits, and local volunteer assistance.',
  'ShieldCheck',
  '/images/ngo/initiative-child-dev.jpg',
  '/initiatives#community',
  6
);

console.log('Inserted 6 clear activities in focus_areas');

// 4. Update Impact Stats with clear, emotional labels
db.prepare('DELETE FROM impact_stats').run();

const insertStat = db.prepare(`
  INSERT INTO impact_stats (label, value, prefix, suffix, description, order_index, is_active)
  VALUES (?, ?, ?, ?, ?, ?, 1)
`);

insertStat.run('Children Helped', '15,000', '', '+', 'Children given free schooling, books and learning support', 1);
insertStat.run('Meals Distributed', '85,000', '', '+', 'Nutritious meals and ration packs delivered to hungry homes', 2);
insertStat.run('Families Supported', '4,200', '', '+', 'Vulnerable households provided emergency supplies and blankets', 3);
insertStat.run('Education Supported', '12,500', '', '+', 'Free notebooks, bags and stationery kits distributed', 4);

console.log('Inserted 4 impact statistics');

// 5. Update popup settings if table exists
try {
  db.prepare(`
    UPDATE popup_settings SET
      heading = 'Your Small Help Can Bring a Big Smile.',
      description = 'Every child deserves an opportunity to learn and every family deserves a meal. Your small support creates a lasting difference.',
      quick_amounts = '101,251,501,1001,2501'
    WHERE id = 1
  `).run();
  console.log('Updated popup_settings with emotional copy');
} catch (e) {
  console.log('Popup settings update skipped or table not present:', e.message);
}

console.log('Database migration v5 finished successfully!');
