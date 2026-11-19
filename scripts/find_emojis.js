const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        results = results.concat(getFiles(fullPath));
      }
    } else if (['.ts', '.tsx'].includes(path.extname(file))) {
      results.push(fullPath);
    }
  });
  return results;
}

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
const files = getFiles('src');
let count = 0;
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      console.log(`${f}:${idx + 1}: ${line.trim()}`);
      count++;
    }
  });
});
console.log('Total emoji lines found:', count);
