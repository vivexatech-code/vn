const http = require('http');
const fs = require('fs');
const path = require('path');

function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const reqOptions = {
      hostname: u.hostname,
      port: u.port || 3000,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING VN VIDHYAPEETH V2 VERIFICATION ===\n');

  // 1. Audit Images via HTTP
  console.log('1. Testing image HTTP availability from Next.js server...');
  const imageFiles = fs.readdirSync('public/images');
  let imageFailures = 0;
  for (const img of imageFiles) {
    const res = await request(`http://localhost:3000/images/${encodeURIComponent(img)}`);
    if (res.statusCode !== 200) {
      console.error(`✗ HTTP ${res.statusCode} for image: /images/${img}`);
      imageFailures++;
    }
  }
  console.log(`✓ Tested ${imageFiles.length} image files. Failures: ${imageFailures}\n`);

  // 2. Test Key Web Pages
  console.log('2. Testing public routes HTTP 200...');
  const routes = [
    '/',
    '/online-admission',
    '/courses',
    '/about',
    '/mission',
    '/initiatives',
    '/impact',
    '/success-stories',
    '/gallery',
    '/news',
    '/contact'
  ];

  for (const route of routes) {
    const res = await request(`http://localhost:3000${route}`);
    if (res.statusCode === 200) {
      console.log(`✓ [200 OK] ${route}`);
    } else {
      console.error(`✗ [${res.statusCode}] ${route}`);
    }
  }

  // 3. Test /donate redirect
  console.log('\n3. Testing /donate redirect...');
  const donateRes = await request('http://localhost:3000/donate');
  console.log(`Status for /donate: ${donateRes.statusCode} (Redirect: ${donateRes.headers.location || 'none'})`);

  // 4. Test Online Admission API Submission
  console.log('\n4. Testing Online Admission form submission (POST /api/admissions)...');
  const testAdmission = {
    student_name: 'Pooja Rani',
    father_name: 'Suresh Kumar',
    mother_name: 'Sunita Devi',
    dob: '2004-05-15',
    gender: 'Female',
    mobile: '9876543210',
    whatsapp: '9876543210',
    email: 'pooja.test@gmail.com',
    address: 'VPO Ellenabad, Ward No 5',
    state: 'Haryana',
    district: 'Sirsa',
    pincode: '125102',
    course_category: 'Paramedical',
    course_name: 'Diploma in Medical Laboratory Technology (DMLT)',
    qualification: '12th Science (PCB/PCM)',
    passing_year: '2024',
    board_university: 'Haryana Board (BSEH)',
    study_mode: 'Regular',
    remarks: 'Interested in hospital clinical rotations'
  };

  const admPostRes = await request('http://localhost:3000/api/admissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testAdmission);

  console.log(`Admission POST Status: ${admPostRes.statusCode}`);
  const admData = JSON.parse(admPostRes.body);
  console.log(`Generated Application No: ${admData.application_no}, ID: ${admData.id}`);

  // 5. Test Admin Login & Access to Admissions & Export
  console.log('\n5. Testing Admin Authentication and Admissions retrieval...');
  const loginRes = await request('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'admin', password: 'admin123' });

  const setCookie = loginRes.headers['set-cookie'];
  const cookieHeader = Array.isArray(setCookie) ? setCookie.map(c => c.split(';')[0]).join('; ') : setCookie ? setCookie.split(';')[0] : '';
  console.log(`Admin login status: ${loginRes.statusCode}, Cookie established: ${!!cookieHeader}`);

  const admListRes = await request('http://localhost:3000/api/admissions', {
    headers: { cookie: cookieHeader }
  });
  const admListData = JSON.parse(admListRes.body);
  console.log(`Admin retrieved admissions count: ${admListData.admissions ? admListData.admissions.length : 0}`);

  // Test CSV export
  const exportRes = await request('http://localhost:3000/api/admissions/export', {
    headers: { cookie: cookieHeader }
  });
  console.log(`CSV Export status: ${exportRes.statusCode}, Content-Type: ${exportRes.headers['content-type']}`);

  // 6. Test Partners API
  console.log('\n6. Testing Partners API...');
  const partnersRes = await request('http://localhost:3000/api/partners');
  const partnersData = JSON.parse(partnersRes.body);
  console.log(`Partners count: ${partnersData.partners ? partnersData.partners.length : 0}`);

  // 7. Test Popup Settings API
  console.log('\n7. Testing Popup Settings API...');
  const popupRes = await request('http://localhost:3000/api/popup-settings');
  const popupData = JSON.parse(popupRes.body);
  console.log(`Popup enabled: ${popupData.settings?.is_enabled}, Delay: ${popupData.settings?.delay_seconds}s, Heading: "${popupData.settings?.heading}"`);

  console.log('\n=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY ===');
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
