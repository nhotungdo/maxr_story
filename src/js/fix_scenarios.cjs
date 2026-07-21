const fs = require('fs');
let content = fs.readFileSync('src/data/scenarios.ts', 'utf8');

// 1. Add isWrongViolation?: boolean; to ScenarioNode
content = content.replace(
  /nextWrongId\?: string;\n  requiresStaff\?: boolean; \/\/ Nếu true, chỉ hiện ra nếu số lượng nhân viên > 0\n};/,
  `nextWrongId?: string;
  requiresStaff?: boolean; // Nếu true, chỉ hiện ra nếu số lượng nhân viên > 0
  isWrongViolation?: boolean; // Đánh dấu lựa chọn sai là vi phạm (game over)
};`
);

// 2. Add isWrongViolation: true to specific sub nodes
const nodesToUpdate = [
  'c1_env_sub_w',
  'c3_sub_1_w',
  'c4_sub_1_w',
  'c5_sub_1_w',
  'c7_sub_1_w'
];

nodesToUpdate.forEach(nodeId => {
  const regex = new RegExp(`(id: "${nodeId}",[\\s\\S]*?wrong: "[^"]*")\\s*}`, 'g');
  content = content.replace(regex, `$1,\n        isWrongViolation: true\n      }`);
});

// 3. Update getSpecificScenario to map isWrongViolation
const getSpecificReplacement = `const wrongOpt: Option = {
    id: \`\${scenarioId}_wrong\`,
    text: \`\${wDecStr} (Tốn \${cost} vốn)\`,
    statsEffect: { money: -loss, reputation: -10, customers: -5, knowledge: 0 },
    consequence: "Sai lầm nghiêm trọng! Bạn tiếp tục gặp rắc rối.",
    marxTheory: chap.theory,
    nextScenarioId: node.nextWrongId,
    isViolation: node.isWrongViolation
  };`;
content = content.replace(/const wrongOpt: Option = {[\s\S]*?nextScenarioId: node\.nextWrongId\n  };/, getSpecificReplacement);

// 4. Update getChapterScenario to map isWrongViolation
const getChapterReplacement = `const wrongOpt: Option = {
    id: \`\${randomNode.id}_wrong\`,
    text: \`\${wDecStr} (Tốn \${cost} vốn)\`,
    statsEffect: { money: -loss, reputation: -10, customers: -5, knowledge: 0 },
    consequence: "Sai lầm nghiêm trọng! Bạn đang đi ngược lại quy luật khách quan.",
    marxTheory: chap.theory,
    nextScenarioId: randomNode.nextWrongId,
    isViolation: randomNode.isWrongViolation
  };`;
content = content.replace(/const wrongOpt: Option = {[\s\S]*?nextScenarioId: randomNode\.nextWrongId\n  };/, getChapterReplacement);

fs.writeFileSync('src/data/scenarios.ts', content);
