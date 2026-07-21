const fs = require('fs');

// 1. types.ts
let typesContent = fs.readFileSync('src/types/types.ts', 'utf8');
typesContent = typesContent.replace(
  /getScenario: \(character: Character, currentStaff: number\) => {/,
  `getScenario: (character: Character, currentStaff: number, history?: any[]) => {`
);
fs.writeFileSync('src/types/types.ts', typesContent);

// 2. data.ts
let dataContent = fs.readFileSync('src/data/data.ts', 'utf8');
dataContent = dataContent.replace(
  /getScenario: \(char, currentStaff\) => getChapterScenario\((\d+), char, currentStaff\)/g,
  `getScenario: (char, currentStaff, history) => getChapterScenario($1, char, currentStaff, history)`
);
fs.writeFileSync('src/data/data.ts', dataContent);

// 3. scenarios.ts
let scenariosContent = fs.readFileSync('src/data/scenarios.ts', 'utf8');
const chapterScenarioReplacement = `export function getChapterScenario(chapterId: number, char: Character, currentStaff: number, history: any[] = []) {
  const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
  const charTags = char.tags || [];

  const chap = chapterTrees[chapterId];
  
  // Lọc các root nodes phù hợp với tag của nhân vật và số lượng nhân sự
  let validNodes = chap.rootNodes.filter(node => {
    if (node.requiresStaff === true && currentStaff <= 0) return false;
    if (node.requiresStaff === false && currentStaff > 0) return false;
    if (node.tags.length > 0 && !node.tags.some(tag => charTags.includes(tag))) return false;
    
    // Kiểm tra lịch sử để không lặp lại
    const question = interpolate(node.question, terms);
    if (history.some(h => h.scenario === question)) return false;
    
    return true;
  });

  // Fallback nếu tất cả đều đã chơi
  if (validNodes.length === 0) {
    validNodes = chap.rootNodes.filter(node => {
      if (node.requiresStaff === true && currentStaff <= 0) return false;
      if (node.requiresStaff === false && currentStaff > 0) return false;
      if (node.tags.length > 0 && !node.tags.some(tag => charTags.includes(tag))) return false;
      return true;
    });
  }

  // Chọn ngẫu nhiên 1 node hợp lệ
  const node = validNodes.length > 0 
    ? validNodes[Math.floor(Math.random() * validNodes.length)]
    : chap.rootNodes[0]; // fallback`;

scenariosContent = scenariosContent.replace(
  /export function getChapterScenario\([\s\S]*?\/\/ Chọn ngẫu nhiên 1 node hợp lệ\n  const node = validNodes\.length > 0 \n    \? validNodes\[Math\.floor\(Math\.random\(\) \* validNodes\.length\)\]\n    : chap\.rootNodes\[0\]; \/\/ fallback/,
  chapterScenarioReplacement
);
fs.writeFileSync('src/data/scenarios.ts', scenariosContent);

// 4. App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  /return chap\.getScenario\(gameState\.character, gameState\.stats\.staff\);/,
  `return chap.getScenario(gameState.character, gameState.stats.staff, gameState.history);`
);

const makeDecisionRegex = /\/\/ 2\. Calculate new stats\n    const newStats = { \.\.\.gameState\.stats };\n    Object\.entries\(option\.statsEffect\)\.forEach\(\(\[key, val\]\) => {\n      const k = key as keyof GameStats;\n      if \(k === 'knowledge' \|\| k === 'reputation' \|\| k === 'customers'\) {\n        newStats\[k\] = Math\.min\(100, Math\.max\(0, newStats\[k\] \+ \(val \|\| 0\)\)\);\n      } else {\n        newStats\[k\] = Math\.max\(0, newStats\[k\] \+ \(val \|\| 0\)\);\n      }\n    }\);\n\n    \/\/ 3\. Update state to reveal everything immediately \(except AI feedback\)\n    setLastSelectedOption\(option\);\n    setStatChanges\(option\.statsEffect\); \/\/ Triggers visual float animations in header and consequence tags\n    setGameState\(prev => \({/g;

const makeDecisionReplacement = `// 2. Calculate new stats
    const newStats = { ...gameState.stats };
    let isInstantGameOver = false;

    Object.entries(option.statsEffect).forEach(([key, val]) => {
      const k = key as keyof GameStats;
      const rawVal = newStats[k] + (val || 0);
      
      if ((k === 'reputation' || k === 'customers') && rawVal < 0) {
        isInstantGameOver = true;
      }
      
      if (k === 'knowledge' || k === 'reputation' || k === 'customers') {
        newStats[k] = Math.min(100, Math.max(0, rawVal));
      } else {
        newStats[k] = Math.max(0, rawVal);
      }
    });

    if (isInstantGameOver || newStats.money <= 0 || option.isViolation) {
      setLastSelectedOption({ ...option, isViolation: true });
      setGameState(prev => ({
        ...prev,
        stats: newStats,
        gameState: "ENDING"
      }));
      return;
    }

    // 3. Update state to reveal everything immediately (except AI feedback)
    setLastSelectedOption(option);
    setStatChanges(option.statsEffect); // Triggers visual float animations in header and consequence tags
    setGameState(prev => ({`;

appContent = appContent.replace(makeDecisionRegex, makeDecisionReplacement);
fs.writeFileSync('src/App.tsx', appContent);

