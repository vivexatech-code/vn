import { getDb } from './db';

export interface SiteSettings {
  id: number;
  site_name: string;
  tagline: string;
  trust_name: string;
  act_registration: string;
  iso_certified: string;
  niti_msme: string;
  email: string;
  phone1: string;
  phone2?: string;
  whatsapp?: string;
  whatsapp_number?: string;
  whatsapp_message?: string;
  head_office_address: string;
  registered_office_address: string;
  logo_url: string;
  logo_full_url?: string;
  qr_code_url?: string;
  bank_name?: string;
  bank_account?: string;
  bank_ifsc?: string;
  bank_holder?: string;
  bank_branch?: string;
  upi_id?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
}

export interface HeroSlide {
  id: number;
  badge?: string;
  title: string;
  highlight_text?: string;
  subtitle: string;
  cta_primary_text?: string;
  cta_primary_link?: string;
  cta_secondary_text?: string;
  cta_secondary_link?: string;
  image_url: string;
  order_index: number;
  is_active: number;
  created_at?: string;
}

export interface FocusArea {
  id: number;
  title: string;
  category: string;
  description: string;
  icon_name?: string;
  image_url?: string;
  link_url?: string;
  order_index: number;
  is_active: number;
}

export interface ImpactStat {
  id: number;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon_name?: string;
  description?: string;
  order_index: number;
  is_active: number;
}

export interface Course {
  id: number;
  title: string;
  code?: string;
  slug: string;
  category: string;
  duration: string;
  eligibility: string;
  short_desc: string;
  full_desc?: string;
  syllabus?: string;
  career_prospects?: string;
  image_url?: string;
  is_featured: number;
  is_active: number;
  created_at?: string;
}

export interface Campaign {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  full_desc?: string;
  target_amount: number;
  raised_amount: number;
  image_url?: string;
  category: string;
  is_featured: number;
  is_active: number;
  created_at?: string;
}

export interface DonationRecord {
  id: number;
  donor_name: string;
  donor_email?: string;
  donor_phone?: string;
  amount: number;
  pan_number?: string;
  payment_mode?: string;
  transaction_id?: string;
  campaign_id?: number;
  campaign_title?: string;
  notes?: string;
  status: string;
  created_at: string;
}

export interface Testimonial {
  id: number;
  student_name: string;
  course_name: string;
  achievement: string;
  quote: string;
  story?: string;
  photo_url?: string;
  is_featured: number;
  is_active: number;
  created_at?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  media_type: 'image' | 'video';
  url: string;
  thumbnail_url?: string;
  caption?: string;
  order_index: number;
  is_active: number;
  created_at?: string;
}

export interface NewsBlog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  type: 'news' | 'blog' | 'notice' | 'announcement';
  featured_image?: string;
  author: string;
  published_at: string;
  is_published: number;
  views_count: number;
  created_at?: string;
}

export interface Enquiry {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string;
  course_interest?: string;
  address?: string;
  message: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export interface CustomPage {
  id: number;
  title: string;
  slug: string;
  meta_title?: string;
  meta_desc?: string;
  content: string;
  featured_image?: string;
  is_published: number;
  updated_at?: string;
}

export interface Admission {
  id: number;
  application_no: string;
  student_name: string;
  father_name: string;
  mother_name: string;
  dob: string;
  gender: string;
  mobile: string;
  whatsapp?: string;
  email: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  course_category: string;
  course_name: string;
  qualification: string;
  passing_year: string;
  board_university: string;
  study_mode: string;
  photo_url?: string;
  document_url?: string;
  remarks?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  website_url?: string;
  category?: string;
  description?: string;
  order_index: number;
  is_active: number;
  created_at?: string;
}

export interface Volunteer {
  id: number;
  full_name: string;
  mobile: string;
  email: string;
  city: string;
  areas_of_interest: string;
  availability: string;
  message?: string;
  status: 'pending' | 'contacted' | 'approved' | 'inactive';
  admin_notes?: string;
  created_at: string;
}

export interface PopupSettings {
  id: number;
  is_enabled: number;
  heading: string;
  description: string;
  delay_seconds: number;
  repeat_interval_seconds?: number;
  frequency: 'once_session' | 'once_day' | 'always' | 'repeat_interval';
  image_url: string;
  button_text: string;
  quick_amounts?: string;
  popup_type?: string;
  updated_at?: string;
}

function toPlain<T>(obj: T): T {
  return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}

// ------------------- QUERIES -------------------

export function getSettings(): SiteSettings {
  const db = getDb();
  const row = db.prepare('SELECT * FROM settings WHERE id = 1').get();
  return toPlain(row as unknown as SiteSettings);
}

export function updateSettings(data: Partial<SiteSettings>): void {
  const db = getDb();
  const current = getSettings();
  const merged = { ...current, ...data };
  db.prepare(`
    UPDATE settings SET
      site_name = ?,
      tagline = ?,
      trust_name = ?,
      act_registration = ?,
      iso_certified = ?,
      niti_msme = ?,
      email = ?,
      phone1 = ?,
      phone2 = ?,
      whatsapp = ?,
      whatsapp_number = ?,
      whatsapp_message = ?,
      head_office_address = ?,
      registered_office_address = ?,
      logo_url = ?,
      logo_full_url = ?,
      qr_code_url = ?,
      bank_name = ?,
      bank_account = ?,
      bank_ifsc = ?,
      bank_holder = ?,
      bank_branch = ?,
      upi_id = ?,
      facebook_url = ?,
      instagram_url = ?,
      twitter_url = ?,
      youtube_url = ?,
      primary_color = ?,
      secondary_color = ?,
      accent_color = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `).run(
    merged.site_name,
    merged.tagline,
    merged.trust_name,
    merged.act_registration,
    merged.iso_certified,
    merged.niti_msme,
    merged.email,
    merged.phone1,
    merged.phone2 || null,
    merged.whatsapp || null,
    merged.whatsapp_number || null,
    merged.whatsapp_message || null,
    merged.head_office_address,
    merged.registered_office_address,
    merged.logo_url,
    merged.logo_full_url || null,
    merged.qr_code_url || null,
    merged.bank_name || null,
    merged.bank_account || null,
    merged.bank_ifsc || null,
    merged.bank_holder || null,
    merged.bank_branch || null,
    merged.upi_id || null,
    merged.facebook_url || null,
    merged.instagram_url || null,
    merged.twitter_url || null,
    merged.youtube_url || null,
    merged.primary_color || null,
    merged.secondary_color || null,
    merged.accent_color || null
  );
}

// Slides
export function getHeroSlides(onlyActive = true): HeroSlide[] {
  const db = getDb();
  const sql = onlyActive
    ? 'SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY order_index ASC'
    : 'SELECT * FROM hero_slides ORDER BY order_index ASC';
  const rows = db.prepare(sql).all();
  return toPlain(rows as unknown as HeroSlide[]);
}

export function createHeroSlide(slide: Omit<HeroSlide, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO hero_slides (badge, title, highlight_text, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, image_url, order_index, is_active)
    VALUES (@badge, @title, @highlight_text, @subtitle, @cta_primary_text, @cta_primary_link, @cta_secondary_text, @cta_secondary_link, @image_url, @order_index, @is_active)
  `).run(slide);
}

export function updateHeroSlide(id: number, slide: Partial<HeroSlide>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM hero_slides WHERE id = ?').get(id) as unknown as HeroSlide;
  if (!existing) return;
  const merged = { ...existing, ...slide };
  db.prepare(`
    UPDATE hero_slides SET
      badge = @badge,
      title = @title,
      highlight_text = @highlight_text,
      subtitle = @subtitle,
      cta_primary_text = @cta_primary_text,
      cta_primary_link = @cta_primary_link,
      cta_secondary_text = @cta_secondary_text,
      cta_secondary_link = @cta_secondary_link,
      image_url = @image_url,
      order_index = @order_index,
      is_active = @is_active
    WHERE id = @id
  `).run(merged);
}

export function deleteHeroSlide(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM hero_slides WHERE id = ?').run(id);
}

// Focus Areas
export function getFocusAreas(onlyActive = true): FocusArea[] {
  const db = getDb();
  const sql = onlyActive
    ? 'SELECT * FROM focus_areas WHERE is_active = 1 ORDER BY order_index ASC'
    : 'SELECT * FROM focus_areas ORDER BY order_index ASC';
  return toPlain(db.prepare(sql).all() as unknown as FocusArea[]);
}

export function createFocusArea(data: Omit<FocusArea, 'id'>): number {
  const db = getDb();
  const res = (db.prepare(`
    INSERT INTO focus_areas (title, category, description, icon_name, image_url, link_url, order_index, is_active)
    VALUES (@title, @category, @description, @icon_name, @image_url, @link_url, @order_index, @is_active)
  `) as any).run({
    title: data.title,
    category: data.category || 'Child Welfare',
    description: data.description,
    icon_name: data.icon_name || 'BookOpen',
    image_url: data.image_url || '/images/ngo/initiative-education.jpg',
    link_url: data.link_url || '/initiatives',
    order_index: data.order_index || 0,
    is_active: data.is_active ?? 1
  });
  return Number(res.lastInsertRowid);
}

export function updateFocusArea(id: number, data: Partial<FocusArea>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM focus_areas WHERE id = ?').get(id) as unknown as FocusArea;
  if (!existing) return;
  const merged = { ...existing, ...data };
  (db.prepare(`
    UPDATE focus_areas SET
      title = @title,
      category = @category,
      description = @description,
      icon_name = @icon_name,
      image_url = @image_url,
      link_url = @link_url,
      order_index = @order_index,
      is_active = @is_active
    WHERE id = @id
  `) as any).run(merged);
}

export function deleteFocusArea(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM focus_areas WHERE id = ?').run(id);
}

// Impact Stats
export function getImpactStats(onlyActive = true): ImpactStat[] {
  const db = getDb();
  const sql = onlyActive
    ? 'SELECT * FROM impact_stats WHERE is_active = 1 ORDER BY order_index ASC'
    : 'SELECT * FROM impact_stats ORDER BY order_index ASC';
  return toPlain(db.prepare(sql).all() as unknown as ImpactStat[]);
}

export function updateImpactStat(id: number, data: Partial<ImpactStat>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM impact_stats WHERE id = ?').get(id) as unknown as ImpactStat;
  if (!existing) return;
  const merged = { ...existing, ...data };
  db.prepare(`
    UPDATE impact_stats SET
      label = @label,
      value = @value,
      prefix = @prefix,
      suffix = @suffix,
      icon_name = @icon_name,
      description = @description,
      order_index = @order_index,
      is_active = @is_active
    WHERE id = @id
  `).run(merged);
}

// Courses
export function getCourses(opts?: { category?: string; featured?: boolean; onlyActive?: boolean }): Course[] {
  const db = getDb();
  let sql = 'SELECT * FROM courses WHERE 1=1';
  const params: (string | number | bigint | null)[] = [];

  if (opts?.onlyActive !== false) {
    sql += ' AND is_active = 1';
  }
  if (opts?.featured) {
    sql += ' AND is_featured = 1';
  }
  if (opts?.category && opts.category !== 'all') {
    sql += ' AND LOWER(category) = LOWER(?)';
    params.push(opts.category);
  }
  sql += ' ORDER BY is_featured DESC, id DESC';
  return toPlain(db.prepare(sql).all(...params) as unknown as Course[]);
}

export function getCourseBySlug(slug: string): Course | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM courses WHERE slug = ?').get(slug);
  return toPlain((row as unknown as Course) || null);
}

export function createCourse(data: Omit<Course, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO courses (title, code, slug, category, duration, eligibility, short_desc, full_desc, syllabus, career_prospects, image_url, is_featured, is_active)
    VALUES (@title, @code, @slug, @category, @duration, @eligibility, @short_desc, @full_desc, @syllabus, @career_prospects, @image_url, @is_featured, @is_active)
  `).run(data);
}

export function updateCourse(id: number, data: Partial<Course>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM courses WHERE id = ?').get(id) as unknown as Course;
  if (!existing) return;
  const merged = { ...existing, ...data };
  db.prepare(`
    UPDATE courses SET
      title = @title,
      code = @code,
      slug = @slug,
      category = @category,
      duration = @duration,
      eligibility = @eligibility,
      short_desc = @short_desc,
      full_desc = @full_desc,
      syllabus = @syllabus,
      career_prospects = @career_prospects,
      image_url = @image_url,
      is_featured = @is_featured,
      is_active = @is_active
    WHERE id = @id
  `).run(merged);
}

export function deleteCourse(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM courses WHERE id = ?').run(id);
}

// Campaigns
export function getCampaigns(opts?: { featured?: boolean; onlyActive?: boolean }): Campaign[] {
  const db = getDb();
  let sql = 'SELECT * FROM campaigns WHERE 1=1';
  if (opts?.onlyActive !== false) {
    sql += ' AND is_active = 1';
  }
  if (opts?.featured) {
    sql += ' AND is_featured = 1';
  }
  sql += ' ORDER BY is_featured DESC, id DESC';
  return toPlain(db.prepare(sql).all() as unknown as Campaign[]);
}

export function getCampaignBySlug(slug: string): Campaign | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM campaigns WHERE slug = ?').get(slug);
  return toPlain((row as unknown as Campaign) || null);
}

export function createCampaign(data: Omit<Campaign, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO campaigns (title, slug, short_desc, full_desc, target_amount, raised_amount, image_url, category, is_featured, is_active)
    VALUES (@title, @slug, @short_desc, @full_desc, @target_amount, @raised_amount, @image_url, @category, @is_featured, @is_active)
  `).run(data);
}

export function updateCampaign(id: number, data: Partial<Campaign>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM campaigns WHERE id = ?').get(id) as unknown as Campaign;
  if (!existing) return;
  const merged = { ...existing, ...data };
  db.prepare(`
    UPDATE campaigns SET
      title = @title,
      slug = @slug,
      short_desc = @short_desc,
      full_desc = @full_desc,
      target_amount = @target_amount,
      raised_amount = @raised_amount,
      image_url = @image_url,
      category = @category,
      is_featured = @is_featured,
      is_active = @is_active
    WHERE id = @id
  `).run(merged);
}

export function deleteCampaign(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM campaigns WHERE id = ?').run(id);
}

// Donations
export function getDonations(limit = 100): DonationRecord[] {
  const db = getDb();
  return toPlain(db.prepare('SELECT * FROM donations ORDER BY id DESC LIMIT ?').all(limit) as unknown as DonationRecord[]);
}

export function createDonation(data: Omit<DonationRecord, 'id' | 'created_at' | 'status'> & { status?: string }): number {
  const db = getDb();
  const insert = db.prepare(`
    INSERT INTO donations (donor_name, donor_email, donor_phone, amount, pan_number, payment_mode, transaction_id, campaign_id, campaign_title, notes, status)
    VALUES (@donor_name, @donor_email, @donor_phone, @amount, @pan_number, @payment_mode, @transaction_id, @campaign_id, @campaign_title, @notes, @status)
  `);
  const result = insert.run({
    donor_name: data.donor_name,
    donor_email: data.donor_email || '',
    donor_phone: data.donor_phone || null,
    amount: data.amount,
    pan_number: data.pan_number || null,
    payment_mode: data.payment_mode || 'UPI / QR',
    transaction_id: data.transaction_id || null,
    campaign_id: data.campaign_id || null,
    campaign_title: data.campaign_title || 'Wherever Most Needed',
    notes: data.notes || null,
    status: data.status || 'verified'
  });

  // Also update campaign raised_amount if campaign_id provided
  if (data.campaign_id) {
    db.prepare('UPDATE campaigns SET raised_amount = raised_amount + ? WHERE id = ?').run(data.amount, data.campaign_id);
  }

  return Number(result.lastInsertRowid);
}

export function updateDonationStatus(id: number, status: string): void {
  const db = getDb();
  db.prepare('UPDATE donations SET status = ? WHERE id = ?').run(status, id);
}

// Testimonials
export function getTestimonials(opts?: { featured?: boolean; onlyActive?: boolean }): Testimonial[] {
  const db = getDb();
  let sql = 'SELECT * FROM testimonials WHERE 1=1';
  if (opts?.onlyActive !== false) {
    sql += ' AND is_active = 1';
  }
  if (opts?.featured) {
    sql += ' AND is_featured = 1';
  }
  sql += ' ORDER BY id DESC';
  return toPlain(db.prepare(sql).all() as unknown as Testimonial[]);
}

export function createTestimonial(data: Omit<Testimonial, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO testimonials (student_name, course_name, achievement, quote, story, photo_url, is_featured, is_active)
    VALUES (@student_name, @course_name, @achievement, @quote, @story, @photo_url, @is_featured, @is_active)
  `).run(data);
}

export function updateTestimonial(id: number, data: Partial<Testimonial>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id) as unknown as Testimonial;
  if (!existing) return;
  const merged = { ...existing, ...data };
  db.prepare(`
    UPDATE testimonials SET
      student_name = @student_name,
      course_name = @course_name,
      achievement = @achievement,
      quote = @quote,
      story = @story,
      photo_url = @photo_url,
      is_featured = @is_featured,
      is_active = @is_active
    WHERE id = @id
  `).run(merged);
}

export function deleteTestimonial(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
}

// Gallery
export function getGalleryItems(opts?: { category?: string; media_type?: string; onlyActive?: boolean }): GalleryItem[] {
  const db = getDb();
  let sql = 'SELECT * FROM gallery_items WHERE 1=1';
  const params: (string | number | bigint | null)[] = [];
  if (opts?.onlyActive !== false) {
    sql += ' AND is_active = 1';
  }
  if (opts?.category && opts.category !== 'all') {
    sql += ' AND category = ?';
    params.push(opts.category);
  }
  if (opts?.media_type) {
    sql += ' AND media_type = ?';
    params.push(opts.media_type);
  }
  sql += ' ORDER BY order_index ASC, id DESC';
  return toPlain(db.prepare(sql).all(...params) as unknown as GalleryItem[]);
}

export function createGalleryItem(data: Omit<GalleryItem, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO gallery_items (title, category, media_type, url, thumbnail_url, caption, order_index, is_active)
    VALUES (@title, @category, @media_type, @url, @thumbnail_url, @caption, @order_index, @is_active)
  `).run(data);
}

export function deleteGalleryItem(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM gallery_items WHERE id = ?').run(id);
}

// News & Blogs
export function getNewsBlogs(opts?: { type?: string; category?: string; onlyPublished?: boolean; limit?: number }): NewsBlog[] {
  const db = getDb();
  let sql = 'SELECT * FROM news_blogs WHERE 1=1';
  const params: (string | number | bigint | null)[] = [];
  if (opts?.onlyPublished !== false) {
    sql += ' AND is_published = 1';
  }
  if (opts?.type) {
    sql += ' AND type = ?';
    params.push(opts.type);
  }
  if (opts?.category && opts.category !== 'all') {
    sql += ' AND category = ?';
    params.push(opts.category);
  }
  sql += ' ORDER BY published_at DESC, id DESC';
  if (opts?.limit) {
    sql += ' LIMIT ?';
    params.push(opts.limit);
  }
  return toPlain(db.prepare(sql).all(...params) as unknown as NewsBlog[]);
}

export function getNewsBlogBySlug(slug: string): NewsBlog | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM news_blogs WHERE slug = ?').get(slug);
  if (row) {
    // Increment view count
    db.prepare('UPDATE news_blogs SET views_count = views_count + 1 WHERE slug = ?').run(slug);
  }
  return toPlain((row as unknown as NewsBlog) || null);
}

export function createNewsBlog(data: Omit<NewsBlog, 'id' | 'views_count'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO news_blogs (title, slug, excerpt, content, category, type, featured_image, author, published_at, is_published, views_count)
    VALUES (@title, @slug, @excerpt, @content, @category, @type, @featured_image, @author, @published_at, @is_published, 0)
  `).run(data);
}

export function updateNewsBlog(id: number, data: Partial<NewsBlog>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM news_blogs WHERE id = ?').get(id) as unknown as NewsBlog;
  if (!existing) return;
  const merged = { ...existing, ...data };
  db.prepare(`
    UPDATE news_blogs SET
      title = @title,
      slug = @slug,
      excerpt = @excerpt,
      content = @content,
      category = @category,
      type = @type,
      featured_image = @featured_image,
      author = @author,
      published_at = @published_at,
      is_published = @is_published
    WHERE id = @id
  `).run(merged);
}

export function deleteNewsBlog(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM news_blogs WHERE id = ?').run(id);
}

// Enquiries
export function getEnquiries(opts?: { type?: string; status?: string }): Enquiry[] {
  const db = getDb();
  let sql = 'SELECT * FROM enquiries WHERE 1=1';
  const params: (string | number | bigint | null)[] = [];
  if (opts?.type && opts.type !== 'all') {
    sql += ' AND type = ?';
    params.push(opts.type);
  }
  if (opts?.status && opts.status !== 'all') {
    sql += ' AND status = ?';
    params.push(opts.status);
  }
  sql += ' ORDER BY id DESC';
  return toPlain(db.prepare(sql).all(...params) as unknown as Enquiry[]);
}

export function createEnquiry(data: Omit<Enquiry, 'id' | 'created_at' | 'status'> & { status?: string }): number {
  const db = getDb();
  const insert = db.prepare(`
    INSERT INTO enquiries (type, name, email, phone, course_interest, address, message, status, admin_notes)
    VALUES (@type, @name, @email, @phone, @course_interest, @address, @message, @status, @admin_notes)
  `);
  const result = insert.run({
    type: data.type || 'general',
    name: data.name,
    email: data.email,
    phone: data.phone,
    course_interest: data.course_interest || null,
    address: data.address || null,
    message: data.message,
    status: data.status || 'new',
    admin_notes: null
  });
  return Number(result.lastInsertRowid);
}

export function updateEnquiryStatus(id: number, status: string, notes?: string): void {
  const db = getDb();
  db.prepare('UPDATE enquiries SET status = ?, admin_notes = COALESCE(?, admin_notes) WHERE id = ?').run(status, notes || null, id);
}

export function deleteEnquiry(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);
}

// Custom Pages
export function getPages(): CustomPage[] {
  const db = getDb();
  return toPlain(db.prepare('SELECT * FROM pages ORDER BY id ASC').all() as unknown as CustomPage[]);
}

export function getPageBySlug(slug: string): CustomPage | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM pages WHERE slug = ?').get(slug);
  return toPlain((row as unknown as CustomPage) || null);
}

export function updatePage(id: number, data: Partial<CustomPage>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM pages WHERE id = ?').get(id) as unknown as CustomPage;
  if (!existing) return;
  const merged = { ...existing, ...data };
  db.prepare(`
    UPDATE pages SET
      title = @title,
      slug = @slug,
      meta_title = @meta_title,
      meta_desc = @meta_desc,
      content = @content,
      featured_image = @featured_image,
      is_published = @is_published,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = @id
  `).run(merged);
}

// Dashboard statistics
export function getDashboardStats() {
  const db = getDb();
  const totalEnquiries = (db.prepare('SELECT count(*) as count FROM enquiries').get() as { count: number }).count;
  const newEnquiries = (db.prepare("SELECT count(*) as count FROM enquiries WHERE status = 'new'").get() as { count: number }).count;
  const totalCourses = (db.prepare('SELECT count(*) as count FROM courses').get() as { count: number }).count;
  const totalCampaigns = (db.prepare('SELECT count(*) as count FROM campaigns').get() as { count: number }).count;
  const totalInitiatives = (db.prepare('SELECT count(*) as count FROM focus_areas WHERE is_active = 1').get() as { count: number }).count;
  const totalBlogs = (db.prepare('SELECT count(*) as count FROM news_blogs').get() as { count: number }).count;
  const totalGallery = (db.prepare('SELECT count(*) as count FROM gallery_items').get() as { count: number }).count;
  const totalDonations = (db.prepare('SELECT count(*) as count, COALESCE(sum(amount), 0) as total FROM donations').get() as { count: number; total: number });
  const totalAdmissions = (db.prepare('SELECT count(*) as count FROM admissions').get() as { count: number }).count;
  const newAdmissions = (db.prepare("SELECT count(*) as count FROM admissions WHERE status = 'pending'").get() as { count: number }).count;
  const totalVolunteers = (db.prepare('SELECT count(*) as count FROM volunteers').get() as { count: number }).count;
  const newVolunteers = (db.prepare("SELECT count(*) as count FROM volunteers WHERE status = 'pending'").get() as { count: number }).count;
  const totalPartners = (db.prepare('SELECT count(*) as count FROM partners').get() as { count: number }).count;

  const recentEnquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC LIMIT 5').all() as unknown as Enquiry[];
  const recentDonations = db.prepare('SELECT * FROM donations ORDER BY id DESC LIMIT 5').all() as unknown as DonationRecord[];
  const recentVolunteers = db.prepare('SELECT * FROM volunteers ORDER BY id DESC LIMIT 5').all() as unknown as Volunteer[];
  const recentAdmissions = db.prepare('SELECT * FROM admissions ORDER BY id DESC LIMIT 5').all() as unknown as Admission[];

  return toPlain({
    totalEnquiries,
    newEnquiries,
    totalCourses,
    totalCampaigns,
    totalInitiatives,
    totalBlogs,
    totalGallery,
    totalAdmissions,
    newAdmissions,
    totalVolunteers,
    newVolunteers,
    totalPartners,
    donationCount: totalDonations.count,
    donationTotal: totalDonations.total,
    recentEnquiries,
    recentDonations,
    recentVolunteers,
    recentAdmissions
  });
}

// ------------------- ADMISSIONS -------------------
export function getAdmissions(filters?: { status?: string; search?: string; course?: string; limit?: number; offset?: number }): Admission[] {
  const db = getDb();
  let query = 'SELECT * FROM admissions WHERE 1=1';
  const params: (string | number)[] = [];

  if (filters?.status && filters.status !== 'all') {
    query += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters?.course && filters.course !== 'all') {
    query += ' AND (course_name LIKE ? OR course_category LIKE ?)';
    params.push(`%${filters.course}%`, `%${filters.course}%`);
  }
  if (filters?.search) {
    query += ' AND (student_name LIKE ? OR application_no LIKE ? OR mobile LIKE ? OR email LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
  }

  query += ' ORDER BY id DESC';

  if (filters?.limit) {
    query += ' LIMIT ?';
    params.push(filters.limit);
    if (filters?.offset) {
      query += ' OFFSET ?';
      params.push(filters.offset);
    }
  }

  const rows = (db.prepare(query) as any).all(...params);
  return toPlain(rows as unknown as Admission[]);
}

export function getAdmissionById(id: number): Admission | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM admissions WHERE id = ?').get(id);
  return toPlain((row as unknown as Admission) || null);
}

export function getAdmissionByAppNo(appNo: string): Admission | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM admissions WHERE application_no = ?').get(appNo);
  return toPlain((row as unknown as Admission) || null);
}

export function createAdmission(data: {
  student_name: string;
  father_name: string;
  mother_name: string;
  dob: string;
  gender: string;
  mobile: string;
  whatsapp?: string;
  email: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  course_category: string;
  course_name: string;
  qualification: string;
  passing_year: string;
  board_university: string;
  study_mode?: string;
  photo_url?: string;
  document_url?: string;
  remarks?: string;
}): { id: number; application_no: string } {
  const db = getDb();
  // Generate unique application number: VNV-2025-XXXXX
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const application_no = `VNV-${new Date().getFullYear()}-${randomSuffix}`;

  const info = (db.prepare(`
    INSERT INTO admissions (
      application_no, student_name, father_name, mother_name, dob, gender,
      mobile, whatsapp, email, address, state, district, pincode,
      course_category, course_name, qualification, passing_year, board_university,
      study_mode, photo_url, document_url, remarks, status
    ) VALUES (
      @application_no, @student_name, @father_name, @mother_name, @dob, @gender,
      @mobile, @whatsapp, @email, @address, @state, @district, @pincode,
      @course_category, @course_name, @qualification, @passing_year, @board_university,
      @study_mode, @photo_url, @document_url, @remarks, 'pending'
    )
  `) as any).run({
    application_no,
    student_name: data.student_name,
    father_name: data.father_name,
    mother_name: data.mother_name,
    dob: data.dob,
    gender: data.gender,
    mobile: data.mobile,
    whatsapp: data.whatsapp || data.mobile,
    email: data.email,
    address: data.address,
    state: data.state,
    district: data.district,
    pincode: data.pincode,
    course_category: data.course_category,
    course_name: data.course_name,
    qualification: data.qualification,
    passing_year: data.passing_year,
    board_university: data.board_university,
    study_mode: data.study_mode || 'Regular',
    photo_url: data.photo_url || null,
    document_url: data.document_url || null,
    remarks: data.remarks || null
  });

  return { id: Number(info.lastInsertRowid), application_no };
}

export function updateAdmissionStatus(id: number, status: string, admin_notes?: string): void {
  const db = getDb();
  db.prepare(`
    UPDATE admissions SET
      status = ?,
      admin_notes = COALESCE(?, admin_notes),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, admin_notes ?? null, id);
}

export function deleteAdmission(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM admissions WHERE id = ?').run(id);
}

// ------------------- PARTNERS -------------------
export function getPartners(onlyActive = true): Partner[] {
  const db = getDb();
  const query = onlyActive
    ? 'SELECT * FROM partners WHERE is_active = 1 ORDER BY order_index ASC, id ASC'
    : 'SELECT * FROM partners ORDER BY order_index ASC, id ASC';
  const rows = db.prepare(query).all();
  return toPlain(rows as unknown as Partner[]);
}

export function createPartner(data: Partial<Partner>): number {
  const db = getDb();
  const res = (db.prepare(`
    INSERT INTO partners (name, logo_url, website_url, category, description, order_index, is_active)
    VALUES (@name, @logo_url, @website_url, @category, @description, @order_index, @is_active)
  `) as any).run({
    name: data.name,
    logo_url: data.logo_url,
    website_url: data.website_url || null,
    category: data.category || 'Authorized Partner',
    description: data.description || null,
    order_index: data.order_index ?? 0,
    is_active: data.is_active ?? 1
  });
  return Number(res.lastInsertRowid);
}

export function updatePartner(id: number, data: Partial<Partner>): void {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM partners WHERE id = ?').get(id) as unknown as Partner;
  if (!existing) return;
  const merged = { ...existing, ...data };
  (db.prepare(`
    UPDATE partners SET
      name = @name,
      logo_url = @logo_url,
      website_url = @website_url,
      category = @category,
      description = @description,
      order_index = @order_index,
      is_active = @is_active
    WHERE id = @id
  `) as any).run(merged);
}

export function deletePartner(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM partners WHERE id = ?').run(id);
}

// ------------------- POPUP SETTINGS -------------------
export function getPopupSettings(): PopupSettings {
  const db = getDb();
  let row = db.prepare('SELECT * FROM popup_settings WHERE id = 1').get() as unknown as PopupSettings;
  if (!row) {
    db.prepare(`
      INSERT INTO popup_settings (id, is_enabled, heading, description, delay_seconds, frequency, image_url, button_text)
      VALUES (1, 1, 'Admissions Open 2025–2026', 'Connect with our academic counselors for certified paramedical, IT, and vocational healthcare diplomas.', 4, 'once_session', '/images/newslider1.jpg', 'Apply for Admission')
    `).run();
    row = db.prepare('SELECT * FROM popup_settings WHERE id = 1').get() as unknown as PopupSettings;
  }
  return toPlain(row);
}

export function updatePopupSettings(data: Partial<PopupSettings>): void {
  const db = getDb();
  const current = getPopupSettings();
  const merged = { ...current, ...data };
  db.prepare(`
    UPDATE popup_settings SET
      is_enabled = ?,
      heading = ?,
      description = ?,
      delay_seconds = ?,
      repeat_interval_seconds = ?,
      frequency = ?,
      image_url = ?,
      button_text = ?,
      quick_amounts = ?,
      popup_type = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `).run(
    merged.is_enabled ?? 1,
    merged.heading || 'Your Small Help Can Make a Big Difference.',
    merged.description || 'Help us provide education, food and essential support to children and families in need.',
    merged.delay_seconds ?? 15,
    merged.repeat_interval_seconds ?? 150,
    merged.frequency || 'repeat_interval',
    merged.image_url || '/images/ngo/hero-children-study.jpg',
    merged.button_text || 'Donate Now',
    merged.quick_amounts || '101,251,501,1001,2501',
    merged.popup_type || 'donation'
  );
}

// ------------------- VOLUNTEERS -------------------
export function getVolunteers(filters?: { status?: string; search?: string }): Volunteer[] {
  const db = getDb();
  let query = 'SELECT * FROM volunteers WHERE 1=1';
  const params: (string | number)[] = [];

  if (filters?.status && filters.status !== 'all') {
    query += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters?.search) {
    query += ' AND (full_name LIKE ? OR mobile LIKE ? OR email LIKE ? OR city LIKE ? OR areas_of_interest LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
  }

  query += ' ORDER BY id DESC';
  const rows = (db.prepare(query) as any).all(...params);
  return toPlain(rows as unknown as Volunteer[]);
}

export function getVolunteerById(id: number): Volunteer | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM volunteers WHERE id = ?').get(id);
  return toPlain((row as unknown as Volunteer) || null);
}

export function createVolunteer(data: {
  full_name: string;
  mobile: string;
  email: string;
  city: string;
  areas_of_interest: string;
  availability: string;
  message?: string;
}): number {
  const db = getDb();
  const res = (db.prepare(`
    INSERT INTO volunteers (full_name, mobile, email, city, areas_of_interest, availability, message, status)
    VALUES (@full_name, @mobile, @email, @city, @areas_of_interest, @availability, @message, 'pending')
  `) as any).run({
    full_name: data.full_name,
    mobile: data.mobile,
    email: data.email,
    city: data.city,
    areas_of_interest: data.areas_of_interest,
    availability: data.availability,
    message: data.message || null
  });
  return Number(res.lastInsertRowid);
}

export function updateVolunteerStatus(id: number, status: string, admin_notes?: string): void {
  const db = getDb();
  db.prepare(`
    UPDATE volunteers SET
      status = ?,
      admin_notes = COALESCE(?, admin_notes)
    WHERE id = ?
  `).run(status, admin_notes ?? null, id);
}

export function deleteVolunteer(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM volunteers WHERE id = ?').run(id);
}

