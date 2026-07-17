const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const statsMobileStart = `{/* STATS BAR ON MOBILE ONLY */}
      {gameState.character && (
        <div className="md:hidden flex justify-between bg-[#E8E6E1] border-b-2 border-[#1A1A1A] px-4 py-2 text-xs font-semibold">
          <span className="flex items-center gap-1">🪙 Vốn: <strong className="font-mono">{gameState.stats.money}M</strong></span>
          <span className="flex items-center gap-1">🛡️ Uy tín: <strong className="font-mono">{gameState.stats.reputation}%</strong></span>
          <span className="flex items-center gap-1">👥 Khách: <strong className="font-mono">{gameState.stats.customers}%</strong></span>
          <span className="flex items-center gap-1">📖 Tri thức: <strong className="font-mono text-[#991B1B]">{gameState.stats.knowledge}</strong></span>
        </div>
      )}`;

// Match the Live Stats block within the header
let liveStatsRegex = /\{\/\* Live Stats \*\/\}[\s\S]*?(?=<\/div>\s*<\/div>\s*\)\})/m;
let match = code.match(liveStatsRegex);
if(match) {
    let liveStatsContent = match[0];
    
    // 1. Replace the middle of the header
    let newHeaderMiddle = `{gameState.character && (
          <div className="flex flex-col items-center justify-center hidden md:flex flex-1 px-4">
            <span className="text-sm uppercase font-bold text-red-200">Chương {gameState.currentChapter} / 7</span>
            <span className="text-xs text-white line-clamp-1 text-center">
              {currentChapterData?.concept}
            </span>
          </div>
        )}`;
    
    // Replace from `{gameState.character && (` down to `)}` for the header middle block.
    // The match should start from the line containing <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center">
    let headerMiddleRegex = /\{gameState\.character && \(\s*<div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center">[\s\S]*?(?=<\/div>\s*<\/div>\s*\)\})<\/div>\s*<\/div>\s*\)\}/;
    code = code.replace(headerMiddleRegex, newHeaderMiddle);

    // 2. Replace the mobile stats bar with unified stats bar
    // Modify liveStatsContent slightly to remove the bg-black/20 and rounded-md border
    let newStatsContent = liveStatsContent.replace(/className="flex gap-4 md:gap-6 bg-black\/20 px-4 py-2 rounded-md border border-white\/10"/, 'className="flex justify-center gap-4 md:gap-8 lg:gap-16 w-full flex-wrap"');
    // For mobile it needs smaller fonts maybe. The existing has text-sm md:text-base which is fine.
    
    let unifiedStatsBar = `{/* UNIFIED STATS BAR (ALL SCREENS) */}
      {gameState.character && (
        <div className="bg-[#1A1A1A] text-white border-b-2 border-[#1A1A1A] px-2 py-2.5 flex justify-center shadow-[inset_0_-4px_10px_rgba(0,0,0,0.4)] z-10 relative">
          ${newStatsContent}
        </div>
      )}`;

    code = code.replace(statsMobileStart, unifiedStatsBar);
    
    fs.writeFileSync('src/App.tsx', code);
    console.log("Refactored successfully.");
} else {
    console.log("Could not find Live Stats block.");
}
