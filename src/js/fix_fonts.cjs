const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

// Replace specific small text sizes with standard tailwind sizes
content = content.replace(/text-\[12px\]/g, 'text-sm');
content = content.replace(/text-\[11px\]/g, 'text-sm');
content = content.replace(/text-\[9px\]/g, 'text-xs');
content = content.replace(/text-\[10px\]/g, 'text-xs');

// Replace any remaining italic classes if they exist (just in case)
content = content.replace(/\bitalic\b/g, 'not-italic');

fs.writeFileSync(appPath, content);
console.log('App.tsx updated');
