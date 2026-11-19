const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dbPath = path.join(process.cwd(), 'data', 'vn_vidhyapeeth.db');
const db = new DatabaseSync(dbPath);

const checks = [
  { table: 'settings', col: 'logo_url' },
  { table: 'settings', col: 'logo_full_url' },
  { table: 'hero_slides', col: 'image_url' },
  { table: 'focus_areas', col: 'image_url' },
  { table: 'courses', col: 'image_url' },
  { table: 'campaigns', col: 'image_url' },
  { table: 'testimonials', col: 'photo_url' },
  { table: 'gallery_items', col: 'url' },
  { table: 'news_blogs', col: 'featured_image' },
];

let allValid = true;
checks.forEach(({ table, col }) => {
  const rows = db.prepare(`SELECT DISTINCT ${col} as img FROM ${table} WHERE ${col} IS NOT NULL`).all();
  rows.forEach(r => {
    let p = r.img;
    if (p.startsWith('/')) p = p.substring(1);
    const fullP = path.join(process.cwd(), 'public', p);
    const exists = fs.existsSync(fullP);
    if (!exists) {
      console.log(`[DB MISSING] table: ${table}, col: ${col}, value: ${r.img}`);
      allValid = false;
    } else {
      console.log(`[DB OK] table: ${table}, val: ${r.img}`);
    }
  });
});

console.log('Database image check complete. All valid:', allValid);
