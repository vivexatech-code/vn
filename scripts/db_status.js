const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/vn_vidhyapeeth.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
console.log('Existing tables:', tables.map(t => t.name));
