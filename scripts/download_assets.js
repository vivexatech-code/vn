const https = require('https');
const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy downloaded logos from scratch
const scratch = 'C:\\Users\\Vivexa Tech\\.gemini\\antigravity\\brain\\4e66cf3e-2d0a-4150-bf38-1fb7e7b127f1\\scratch';
if (fs.existsSync(path.join(scratch, 'vn_logo.webp'))) {
  fs.copyFileSync(path.join(scratch, 'vn_logo.webp'), path.join(destDir, 'logo.webp'));
  console.log('Copied logo.webp');
}
if (fs.existsSync(path.join(scratch, 'vn_full_logo.jpg'))) {
  fs.copyFileSync(path.join(scratch, 'vn_full_logo.jpg'), path.join(destDir, 'logo-full.jpg'));
  console.log('Copied logo-full.jpg');
}
if (fs.existsSync(path.join(scratch, 'qr-1.jpg'))) {
  fs.copyFileSync(path.join(scratch, 'qr-1.jpg'), path.join(destDir, 'payment-qr.jpg'));
  console.log('Copied payment-qr.jpg');
}

const remoteImages = [
  // Sliders
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/newslider1.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/newslider2.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/newslider3.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/newslider4.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/newslider5.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/newslider6.jpg',
  // Courses
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/dmlt.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/dott.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/dxrt.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/ddt.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/dbbt.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/emt.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2025/01/basic.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2025/01/cmlt.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2025/01/cms.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2025/01/cott.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2025/01/CPT.jpg',
  // Success students
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/neeraj-success-section.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/om-prakash-success-section.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/raj-kumar-success-section.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/vijendra-kumar-success-section.jpg',
  // Partners
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/partner1.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/partner2.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/partner3.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/partner4.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/partner5.jpg',
  'https://vnvidhyapeeth.ac.in/wp-content/uploads/2026/03/partner6.png'
];

async function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.warn(`Failed ${url}: ${res.statusCode}`);
        return resolve();
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      console.warn(`Error on ${url}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const url of remoteImages) {
    const filename = path.basename(url);
    const dest = path.join(destDir, filename);
    await download(url, dest);
    console.log(`Downloaded ${filename}`);
  }
  console.log('All image downloads completed!');
}

run();
