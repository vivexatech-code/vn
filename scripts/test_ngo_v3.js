const http = require('http');

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname + parsed.search,
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING VN VIDHYAPEETH NGO V3 AUTOMATED TEST SUITE ===\n');
  let passCount = 0;
  let failCount = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passCount++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failCount++;
    }
  }

  const BASE = 'http://localhost:3000';

  // 1. Test Static Assets
  const images = [
    '/images/ngo/hero-children-study.jpg',
    '/images/ngo/hero-food-relief.jpg',
    '/images/ngo/hero-stationery.jpg',
    '/images/ngo/hero-community.jpg',
    '/images/ngo/initiative-education.jpg',
    '/images/ngo/initiative-food.jpg',
    '/images/ngo/initiative-stationery.jpg',
    '/images/ngo/initiative-welfare.jpg',
    '/images/ngo/initiative-child-dev.jpg',
    '/images/ngo/campaign-child-education.jpg',
    '/images/ngo/campaign-feed-family.jpg',
    '/images/ngo/campaign-stationery.jpg',
    '/images/ngo/campaign-child-welfare.jpg',
    '/images/ngo/story-priya.jpg',
    '/images/ngo/story-rohit.jpg',
    '/images/ngo/story-sunita.jpg',
    '/images/ngo/volunteer-team.jpg',
    '/images/ngo/donation-banner.jpg',
  ];

  for (const img of images) {
    await test(`Asset Check: ${img}`, async () => {
      const res = await fetchUrl(BASE + img);
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.headers['content-type']?.includes('image'))
        throw new Error(`Invalid content-type: ${res.headers['content-type']}`);
    });
  }

  // 2. Test Public Web Pages
  const pages = [
    '/',
    '/about',
    '/initiatives',
    '/impact',
    '/campaigns',
    '/campaigns/support-a-childs-education',
    '/stories',
    '/gallery',
    '/news',
    '/volunteer',
    '/donate',
    '/contact',
  ];

  for (const page of pages) {
    await test(`Public Page Route: ${page}`, async () => {
      const res = await fetchUrl(BASE + page);
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!res.body.includes('VN Vidhyapeeth') && !res.body.includes('Vidhyapeeth')) {
        throw new Error('Missing branding text');
      }
    });
  }

  // 3. Admin Authentication for Protected Endpoints
  let adminCookie = '';
  await test('Admin Authentication: POST /api/auth/login', async () => {
    const payload = JSON.stringify({
      username: 'admin',
      password: 'admin123',
    });
    const res = await fetchUrl(BASE + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      body: payload,
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}: ${res.body}`);
    const setCookie = res.headers['set-cookie'];
    if (!setCookie) throw new Error('No Set-Cookie returned from login');
    const cookieHeader = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    const match = cookieHeader.match(/vn_admin_token=([^;]+)/);
    if (!match) throw new Error('Could not find vn_admin_token in cookies');
    adminCookie = `vn_admin_token=${match[1]}`;
  });

  // 4. Test Donation API (POST & GET)
  let testDonationId = null;
  let testReceiptNo = '';
  await test('Donation API: POST /api/donations (bank_transfer pending verification)', async () => {
    const payload = JSON.stringify({
      donor_name: 'Test Benefactor',
      donor_email: 'benefactor@example.org',
      donor_phone: '9876543210',
      pan_number: 'ABCDE1234F',
      amount: 2500,
      payment_mode: 'Bank Transfer (NEFT/IMPS)',
      transaction_id: 'TEST-TXN-998877',
      campaign_title: "Support a Child's Education",
      notes: 'Testing pending status for manual bank transfer verification.',
    });

    const res = await fetchUrl(BASE + '/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      body: payload,
    });

    if (res.status !== 201 && res.status !== 200)
      throw new Error(`Status ${res.status}: ${res.body}`);
    const data = JSON.parse(res.body);
    if (!data.receipt_no) throw new Error('No receipt_no returned');
    if (data.status !== 'pending')
      throw new Error(`Expected pending status for manual bank transfer, got ${data.status}`);
    testDonationId = data.donation_id;
    testReceiptNo = data.receipt_no;
  });

  await test('Donation API: GET /api/donations (Authorized)', async () => {
    const res = await fetchUrl(BASE + '/api/donations', {
      headers: {
        Cookie: adminCookie,
      },
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = JSON.parse(res.body);
    if (!Array.isArray(data)) throw new Error('Expected array of donations');
    const found = data.find((d) => d.id === testDonationId);
    if (!found) throw new Error('Could not find newly created donation in list');
    if (found.status !== 'pending') throw new Error(`Expected status pending, got ${found.status}`);
  });

  await test('Donation CSV Export: GET /api/donations/export (Authorized)', async () => {
    const res = await fetchUrl(BASE + '/api/donations/export', {
      headers: {
        Cookie: adminCookie,
      },
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.headers['content-type']?.includes('text/csv')) {
      throw new Error(`Expected text/csv, got ${res.headers['content-type']}`);
    }
    if (!res.body.includes('Donation ID') || !res.body.includes('Donor Name')) {
      throw new Error('CSV headers missing');
    }
    if (!res.body.includes('Test Benefactor')) {
      throw new Error('Test benefactor not found in CSV export');
    }
  });

  // 5. Test Volunteer API (POST & GET)
  let testVolunteerId = null;
  await test('Volunteer API: POST /api/volunteers', async () => {
    const payload = JSON.stringify({
      full_name: 'Dr. Aarav Mehta',
      mobile: '9811223344',
      email: 'aarav.mehta@example.com',
      city: 'Delhi NCR',
      areas_of_interest: 'Education for Every Child, Food Distribution',
      availability: 'Weekends',
      message: 'Dedicated to teaching mathematics and distributing food kits.',
    });

    const res = await fetchUrl(BASE + '/api/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      body: payload,
    });

    if (res.status !== 201 && res.status !== 200)
      throw new Error(`Status ${res.status}: ${res.body}`);
    const data = JSON.parse(res.body);
    if (!data.volunteer_id) throw new Error('No volunteer_id returned');
    testVolunteerId = data.volunteer_id;
  });

  await test('Volunteer API: GET /api/volunteers (Authorized)', async () => {
    const res = await fetchUrl(BASE + '/api/volunteers', {
      headers: {
        Cookie: adminCookie,
      },
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = JSON.parse(res.body);
    if (!Array.isArray(data)) throw new Error('Expected array of volunteers');
    const found = data.find((v) => v.id === testVolunteerId);
    if (!found) throw new Error('Could not find newly created volunteer in list');
    if (found.status !== 'pending') throw new Error(`Expected status pending, got ${found.status}`);
  });

  await test('Volunteer CSV Export: GET /api/volunteers/export (Authorized)', async () => {
    const res = await fetchUrl(BASE + '/api/volunteers/export', {
      headers: {
        Cookie: adminCookie,
      },
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.headers['content-type']?.includes('text/csv')) {
      throw new Error(`Expected text/csv, got ${res.headers['content-type']}`);
    }
    if (!res.body.includes('Full Name') || !res.body.includes('Mobile')) {
      throw new Error('CSV headers missing');
    }
    if (!res.body.includes('Dr. Aarav Mehta')) {
      throw new Error('Test volunteer not found in CSV export');
    }
  });

  // 6. Test Initiatives API
  await test('Initiatives API: GET /api/initiatives', async () => {
    const res = await fetchUrl(BASE + '/api/initiatives');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = JSON.parse(res.body);
    if (!Array.isArray(data) || data.length < 5) {
      throw new Error(`Expected at least 5 initiatives, got ${data?.length}`);
    }
  });

  // 7. Test Campaigns API
  await test('Campaigns API: GET /api/campaigns', async () => {
    const res = await fetchUrl(BASE + '/api/campaigns');
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const data = JSON.parse(res.body);
    if (!Array.isArray(data) || data.length < 4) {
      throw new Error(`Expected at least 4 campaigns, got ${data?.length}`);
    }
  });

  console.log('\n=======================================');
  console.log(`TEST SUMMARY: ${passCount} Passed, ${failCount} Failed`);
  console.log('=======================================');

  if (failCount > 0) process.exit(1);
}

runTests().catch((e) => {
  console.error('Fatal test error:', e);
  process.exit(1);
});
