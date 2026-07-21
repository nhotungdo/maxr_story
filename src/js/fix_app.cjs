const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. In handleProceed, add condition for isViolation
content = content.replace(
  /if \(gameState\.stats\.money <= 0\) {/,
  `if (gameState.stats.money <= 0 || lastSelectedOption?.isViolation) {`
);

// 2. In finalEnding definition, pass isViolation
content = content.replace(
  /const finalEnding = gameState\.character \? determineEnding\({[\s\S]*?}\) : null;/,
  `const finalEnding = gameState.character ? determineEnding({
    money: gameState.stats.money,
    reputation: gameState.stats.reputation,
    knowledge: gameState.stats.knowledge
  }, !!lastSelectedOption?.isViolation) : null;`
);

fs.writeFileSync('src/App.tsx', content);
