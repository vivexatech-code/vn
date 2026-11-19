const fs = require('fs');
const path = require('path');

function removeDynamicExport(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeDynamicExport(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes("export const dynamic = 'force-dynamic';")) {
        content = content.replace(/export const dynamic = 'force-dynamic';\r?\n?/g, '');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned dynamic export in ${fullPath}`);
      }
    }
  }
}

removeDynamicExport(path.join(__dirname, '..', 'src', 'app'));
console.log('Finished removing dynamic exports!');
