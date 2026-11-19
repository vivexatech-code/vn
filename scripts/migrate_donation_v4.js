const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const dbPath = path.join(process.cwd(), 'data', 'vn_vidhyapeeth.db');
const db = new DatabaseSync(dbPath);

console.log('--- Migrating Database for Smart Donation & Popup Experience (v4.0) ---');

// 1. Check & upgrade popup_settings
const popupColumns = db.prepare('PRAGMA table_info(popup_settings)').all().map(c => c.name);

if (!popupColumns.includes('repeat_interval_seconds')) {
  db.exec('ALTER TABLE popup_settings ADD COLUMN repeat_interval_seconds INTEGER DEFAULT 150');
  console.log('✓ Added repeat_interval_seconds to popup_settings');
}

if (!popupColumns.includes('quick_amounts')) {
  db.exec("ALTER TABLE popup_settings ADD COLUMN quick_amounts TEXT DEFAULT '101,251,501,1001,2501'");
  console.log('✓ Added quick_amounts to popup_settings');
}

if (!popupColumns.includes('popup_type')) {
  db.exec("ALTER TABLE popup_settings ADD COLUMN popup_type TEXT DEFAULT 'donation'");
  console.log('✓ Added popup_type to popup_settings');
}

// Update default popup content with client requirements
db.prepare(`
  UPDATE popup_settings SET
    is_enabled = 1,
    heading = 'Your Small Help Can Make a Big Difference.',
    description = 'Help us provide education, food and essential support to children and families in need.',
    delay_seconds = 15,
    repeat_interval_seconds = 150,
    frequency = 'repeat_interval',
    image_url = '/images/ngo/hero-children-study.jpg',
    button_text = 'Donate Now',
    quick_amounts = '101,251,501,1001,2501',
    popup_type = 'donation'
  WHERE id = 1
`).run();
console.log('✓ Configured smart donation popup settings (15s delay, 150s repeat interval, client copy).');

// 2. Check & upgrade settings table
const settingsColumns = db.prepare('PRAGMA table_info(settings)').all().map(c => c.name);

if (!settingsColumns.includes('quick_amounts')) {
  db.exec("ALTER TABLE settings ADD COLUMN quick_amounts TEXT DEFAULT '101,251,501,1001,2501'");
  console.log('✓ Added quick_amounts to settings');
}

if (!settingsColumns.includes('default_campaign')) {
  db.exec("ALTER TABLE settings ADD COLUMN default_campaign TEXT DEFAULT 'Wherever Most Needed'");
  console.log('✓ Added default_campaign to settings');
}

if (!settingsColumns.includes('payment_gateway_mode')) {
  db.exec("ALTER TABLE settings ADD COLUMN payment_gateway_mode TEXT DEFAULT 'all'");
  console.log('✓ Added payment_gateway_mode to settings');
}

// 3. Upgrade donations table: Ensure donor_email can be empty string or nullable
// Recreate donations table with cleaner schema if needed, preserving data
const existingDonations = db.prepare('SELECT * FROM donations').all();

db.exec(`
  CREATE TABLE IF NOT EXISTS donations_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    donor_name TEXT NOT NULL,
    donor_email TEXT DEFAULT '',
    donor_phone TEXT,
    amount INTEGER NOT NULL,
    pan_number TEXT,
    payment_mode TEXT DEFAULT 'UPI / QR',
    transaction_id TEXT,
    campaign_id INTEGER,
    campaign_title TEXT DEFAULT 'Wherever Most Needed',
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertNew = db.prepare(`
  INSERT INTO donations_new (id, donor_name, donor_email, donor_phone, amount, pan_number, payment_mode, transaction_id, campaign_id, campaign_title, notes, status, created_at)
  VALUES (@id, @donor_name, @donor_email, @donor_phone, @amount, @pan_number, @payment_mode, @transaction_id, @campaign_id, @campaign_title, @notes, @status, @created_at)
`);

const seenTxns = new Set();
for (const d of existingDonations) {
  try {
    let txn = d.transaction_id || `TXN${Date.now()}_${d.id}`;
    if (seenTxns.has(txn)) {
      txn = `${txn}_${d.id}`;
    }
    seenTxns.add(txn);

    insertNew.run({
      id: d.id,
      donor_name: d.donor_name || 'Anonymous Donor',
      donor_email: d.donor_email || '',
      donor_phone: d.donor_phone || '',
      amount: d.amount || 0,
      pan_number: d.pan_number || '',
      payment_mode: d.payment_mode || 'UPI',
      transaction_id: txn,
      campaign_id: d.campaign_id || null,
      campaign_title: d.campaign_title || 'Wherever Most Needed',
      notes: d.notes || '',
      status: d.status || 'pending',
      created_at: d.created_at || new Date().toISOString()
    });
  } catch (e) {
    // ignore
  }
}

db.exec('DROP TABLE donations');
db.exec('ALTER TABLE donations_new RENAME TO donations');
db.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_donations_txn ON donations(transaction_id) WHERE transaction_id IS NOT NULL AND transaction_id != ''");

console.log(`✓ Recreated donations table with optional email and unique transaction index. Preserved ${existingDonations.length} records.`);

console.log('--- Migration Complete ---');
