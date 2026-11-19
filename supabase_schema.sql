-- VN VIDHYAPEETH - Complete Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor to initialize or replicate all tables

CREATE TABLE IF NOT EXISTS settings (
  id INT PRIMARY KEY DEFAULT 1,
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
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  badge TEXT,
  title TEXT NOT NULL,
  highlight_text TEXT,
  subtitle TEXT NOT NULL,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  image_url TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS focus_areas (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  image_url TEXT,
  link_url TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS impact_stats (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  prefix TEXT,
  suffix TEXT,
  icon_name TEXT,
  description TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
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
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT,
  target_amount INT NOT NULL,
  raised_amount INT DEFAULT 0,
  image_url TEXT,
  category TEXT DEFAULT 'Education',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount INT NOT NULL,
  pan_number TEXT,
  payment_mode TEXT DEFAULT 'UPI / QR',
  transaction_id TEXT,
  campaign_id INT,
  campaign_title TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  achievement TEXT NOT NULL,
  quote TEXT NOT NULL,
  story TEXT,
  photo_url TEXT,
  is_featured BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news_blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT DEFAULT 'news',
  featured_image TEXT,
  author TEXT DEFAULT 'VN Vidhyapeeth Admin',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  type TEXT DEFAULT 'general',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_interest TEXT,
  address TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_desc TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public read policies for published contents
CREATE POLICY "Public can view active settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public can view active hero slides" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view focus areas" ON focus_areas FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view impact stats" ON impact_stats FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active courses" ON courses FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active campaigns" ON campaigns FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active gallery items" ON gallery_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published news/blogs" ON news_blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published pages" ON pages FOR SELECT USING (is_published = true);

-- Allow public to insert enquiries and donations
CREATE POLICY "Public can submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can record donations" ON donations FOR INSERT WITH CHECK (true);
