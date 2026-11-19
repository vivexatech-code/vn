const http = require('http');

async function testUrl(url, options = {}) {
  return new Promise((resolve) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data.slice(0, 300)
        });
      });
    });
    req.on('error', (e) => resolve({ error: e.message }));
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  console.log('Testing Live Website Endpoints on http://localhost:3000:');

  const routes = [
    '/',
    '/about',
    '/mission',
    '/initiatives',
    '/courses',
    '/courses/diploma-medical-laboratory-technology-dmlt',
    '/impact',
    '/success-stories',
    '/campaigns',
    '/campaigns/rural-healthcare-skill-scholarship-fund',
    '/gallery',
    '/news',
    '/blog',
    '/news/admission-open-session-2025-2026',
    '/contact',
    '/donate',
    '/privacy-policy',
    '/terms-and-conditions',
    '/sitemap.xml',
    '/robots.txt',
    '/admin/login'
  ];

  for (const r of routes) {
    const res = await testUrl(`http://localhost:3000${r}`);
    console.log(`[${res.status === 200 ? 'PASS' : 'FAIL'}] ${r} -> Status ${res.status}`);
  }

  // Test API Enquiry Submission
  console.log('\nTesting Contact Enquiry API:');
  const enqPayload = JSON.stringify({
    type: 'general',
    name: 'Test Candidate',
    email: 'test@candidate.org',
    phone: '+91 9999999999',
    course_interest: 'DMLT',
    message: 'Testing enquiry submission from verification script'
  });
  const enqRes = await testUrl('http://localhost:3000/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: enqPayload
  });
  console.log('Enquiry submission response:', enqRes.status, enqRes.data);

  // Test API Donation Submission
  console.log('\nTesting Donation Record API:');
  const donPayload = JSON.stringify({
    donor_name: 'Noble Supporter',
    donor_email: 'donor@support.org',
    donor_phone: '+91 9888888888',
    amount: 5000,
    pan_number: 'ABCDE1234F',
    transaction_id: 'UPI1234567890',
    notes: 'Support for paramedical kit'
  });
  const donRes = await testUrl('http://localhost:3000/api/donations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: donPayload
  });
  console.log('Donation recording response:', donRes.status, donRes.data);

  // Test Admin Login API
  console.log('\nTesting Admin Login API:');
  const loginPayload = JSON.stringify({
    username: 'admin',
    password: 'admin123'
  });
  const loginRes = await testUrl('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: loginPayload
  });
  console.log('Admin login response:', loginRes.status, loginRes.data);
}

runTests();
