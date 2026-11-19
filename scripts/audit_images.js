const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        results = results.concat(getFiles(fullPath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = getFiles('src');
const imageRegex = /["']\/images\/([^"']+)["']/g;
const found = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    found.add(match[1]);
  }
});

console.log('Total referenced images in /images/:', found.size);
const missing = [];
found.forEach(img => {
  const exists = fs.existsSync(path.join('public/images', img));
  if (exists) {
    console.log('✓', img);
  } else {
    console.log('✗ MISSING:', img);
    missing.push(img);
  }
});
console.log('Missing count:', missing.length);
