const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/vn_vidhyapeeth.db');

console.log('=== FOCUS AREAS ===');
console.log(db.prepare("SELECT id, title, category, description, image_url FROM focus_areas").all());

console.log('=== HERO SLIDES ===');
console.log(db.prepare("SELECT id, title, highlight_text, subtitle, cta_primary_text, cta_secondary_text, image_url FROM hero_slides").all());

console.log('=== IMPACT STATS ===');
console.log(db.prepare("SELECT id, label, value, prefix, suffix, description FROM impact_stats").all());

console.log('=== TESTIMONIALS / STORIES ===');
console.log(db.prepare("SELECT id, student_name, course_name, quote, story, achievement, photo_url FROM testimonials").all());

console.log('=== SETTINGS ===');
console.log(db.prepare("SELECT * FROM settings WHERE id = 1").get());
