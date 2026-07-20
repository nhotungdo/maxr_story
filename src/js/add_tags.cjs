const fs = require('fs');
let content = fs.readFileSync('src/data/data.ts', 'utf8');

const tagsMap = {
  'minh_cafe': ['SERVICE', 'RETAIL'],
  'lan_bun': ['SERVICE', 'RETAIL'],
  'huy_fashion': ['RETAIL'],
  'an_mobile': ['RETAIL', 'DIGITAL'],
  'phuc_driver': ['SERVICE'],
  'mai_farmer': ['AGRICULTURE'],
  'khanh_freelancer': ['DIGITAL', 'SERVICE'],
  'binh_factory': ['MANUFACTURING'],
  'dung_logistics': ['SERVICE'],
  'linh_startup': ['DIGITAL'],
  'tuan_realestate': ['SERVICE', 'RETAIL'],
  'nga_spa': ['SERVICE'],
  'hai_tutor': ['SERVICE'],
  'vy_baker': ['RETAIL', 'SERVICE'],
  'kien_gym': ['SERVICE'],
  'chau_pet': ['RETAIL', 'SERVICE'],
  'phong_garage': ['SERVICE'],
  'my_florist': ['RETAIL'],
  'dat_gamer': ['DIGITAL', 'SERVICE'],
  'hoa_travel': ['SERVICE'],
};

// For each character, find the businessType line and insert tags after it
for (const [id, tags] of Object.entries(tagsMap)) {
  const tagsStr = `    tags: [${tags.map(t => `'${t}'`).join(', ')}],\n`;
  
  // Match the id block, then find businessType in that block and insert tags after it
  // Strategy: find "id: "id_here"" then find next businessType and add tags after
  const idPattern = `id: "${id}"`;
  const idx = content.indexOf(idPattern);
  if (idx === -1) {
    console.log(`Could not find character: ${id}`);
    continue;
  }
  
  // Find businessType after this id
  const btIdx = content.indexOf('businessType:', idx);
  if (btIdx === -1) {
    console.log(`Could not find businessType for: ${id}`);
    continue;
  }
  
  // Find end of this businessType line (next newline)
  const lineEnd = content.indexOf('\n', btIdx);
  if (lineEnd === -1) continue;
  
  // Check if tags already inserted
  const nextLine = content.substring(lineEnd + 1, lineEnd + 20);
  if (nextLine.includes('tags:')) {
    console.log(`Tags already exist for: ${id}`);
    continue;
  }
  
  content = content.substring(0, lineEnd + 1) + tagsStr + content.substring(lineEnd + 1);
  console.log(`Added tags for: ${id}`);
}

fs.writeFileSync('src/data/data.ts', content);
console.log('Done!');
