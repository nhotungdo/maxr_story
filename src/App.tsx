/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Coins,
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  RefreshCw,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Sparkles,
  Info,
  HelpCircle,
  X,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Volume2,
  VolumeX
} from "lucide-react";
import { CHARACTERS, CHAPTERS, BADGES, determineEnding, ENDINGS } from "./data/data";
import { Character, GameState, GameStats, Option } from "./types/types";
import { playSound, setMuted } from "./utils/audio";

export default function App() {
  // Application states
  const [gameState, setGameState] = useState<GameState>({
    character: null,
    currentChapter: 1,
    stats: { money: 0, reputation: 0, customers: 0, staff: 0, knowledge: 0 },
    history: [],
    badges: [],
    gameState: "SELECT_CHARACTER",
    aiLoading: false,
    currentAiFeedback: ""
  });

  // UI state variables
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [selectedCharPreview, setSelectedCharPreview] = useState<Character | null>(CHARACTERS[0]);
  const [showGlossaryModal, setShowGlossaryModal] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever game state or chapter changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    // Also scroll window for mobile layout where body scrolls
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [gameState.gameState, gameState.currentChapter]);

  useEffect(() => {
    if (gameState.gameState === "STORY" && !isMuted && audioRef.current) {
      audioRef.current.play().catch(() => { });
    }
  }, [gameState.gameState, isMuted]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setMuted(newMuted);
    if (audioRef.current) {
      if (newMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
    }
  };

  const [lastSelectedOption, setLastSelectedOption] = useState<Option | null>(null);
  const [statChanges, setStatChanges] = useState<Partial<GameStats> | null>(null);

  // Auto-unlock badges as knowledge level increases
  useEffect(() => {
    if (!gameState.character) return;

    const newBadges = [...gameState.badges];
    let updated = false;

    BADGES.forEach(badge => {
      if (gameState.stats.knowledge >= badge.unlockedAtKnowledge && !newBadges.includes(badge.id)) {
        newBadges.push(badge.id);
        updated = true;
      }
    });

    if (updated) {
      setGameState(prev => ({ ...prev, badges: newBadges }));
    }
  }, [gameState.stats.knowledge, gameState.character]);

  // Handle character selection
  const handleSelectCharacter = (char: Character) => {
    setGameState({
      character: char,
      currentChapter: 1,
      stats: { ...char.baseStats },
      history: [],
      badges: [],
      gameState: "STORY",
      aiLoading: false,
      currentAiFeedback: ""
    });
    setLastSelectedOption(null);
    setStatChanges(null);

    // Automatically unmute when the user clicks "Start Game" (user interaction allows autoplay)
    setIsMuted(false);
    setMuted(false);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Auto-play blocked", e));
    }
  };

  // Handle making a decision
  const handleMakeDecision = async (option: Option) => {
    if (!gameState.character) return;

    const currentChapterData = CHAPTERS.find(c => c.id === gameState.currentChapter);
    if (!currentChapterData) return;

    const scenarioData = currentChapterData.getScenario(gameState.character);

    // 1. Immediately transition to DECISION_RESULT with loading state
    setLastSelectedOption(option);
    setStatChanges(null); // Clear previous visual changes to build suspense

    setGameState(prev => ({
      ...prev,
      aiLoading: true,
      currentAiFeedback: "",
      gameState: "DECISION_RESULT"
    }));

    // 2. Fetch AI feedback
    let feedbackResult = "";
    try {
      const response = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          character: gameState.character.name + " (" + gameState.character.title + ")",
          chapter: gameState.currentChapter,
          concept: currentChapterData.concept,
          scenario: scenarioData.intro,
          choice: option.text,
          consequence: option.consequence
        })
      });

      if (response.ok) {
        const data = await response.json();
        feedbackResult = data.feedback;
      } else {
        throw new Error("Failed to fetch feedback");
      }
    } catch (err) {
      console.error(err);
      // Fallback content in case API is offline or key is missing
      feedbackResult = `[Giáo sư AI phản hồi]: Quyết định này minh họa sâu sắc khái niệm "${currentChapterData.concept}". ` +
        `Lựa chọn của bạn đã trực tiếp tác động lên các thuộc tính hàng hóa và dịch vụ của bạn. Hãy ghi nhớ rằng trong bất kỳ chế độ kinh tế nào, ` +
        `việc tối ưu chi phí lao động cá biệt so với hao phí lao động xã hội cần thiết luôn là chìa khóa để giành lợi thế cạnh tranh!`;
    }

    // 3. Play sound based on money effect
    if (option.statsEffect.money) {
      if (option.statsEffect.money > 0) {
        playSound('success');
      } else {
        playSound('error');
      }
    }

    // 4. Calculate new stats
    const newStats = { ...gameState.stats };
    Object.entries(option.statsEffect).forEach(([key, val]) => {
      const k = key as keyof GameStats;
      newStats[k] = Math.max(0, newStats[k] + (val || 0));
    });

    // 5. Update state to reveal everything at once
    setStatChanges(option.statsEffect); // Triggers visual float animations in header and consequence tags
    setGameState(prev => ({
      ...prev,
      stats: newStats,
      currentAiFeedback: feedbackResult,
      aiLoading: false
    }));
  };

  // Proceed to next chapter or ending
  const handleProceed = () => {
    // Check for failure condition: Money <= 0
    if (gameState.stats.money <= 0) {
      setGameState(prev => ({
        ...prev,
        gameState: "ENDING"
      }));
      return;
    }

    if (gameState.currentChapter < 7) {
      // Save to history
      const currentChapterData = CHAPTERS.find(c => c.id === gameState.currentChapter);
      const scenarioData = currentChapterData?.getScenario(gameState.character!);

      const newHistoryItem = {
        chapter: gameState.currentChapter,
        scenario: scenarioData?.question || "",
        chosenOption: lastSelectedOption?.text || "",
        consequence: lastSelectedOption?.consequence || "",
        aiFeedback: gameState.currentAiFeedback
      };

      setGameState(prev => ({
        ...prev,
        currentChapter: prev.currentChapter + 1,
        history: [...prev.history, newHistoryItem],
        gameState: "STORY",
        currentAiFeedback: ""
      }));
      setLastSelectedOption(null);
      setStatChanges(null);
    } else {
      // Game ended successfully
      const currentChapterData = CHAPTERS.find(c => c.id === gameState.currentChapter);
      const scenarioData = currentChapterData?.getScenario(gameState.character!);

      const newHistoryItem = {
        chapter: gameState.currentChapter,
        scenario: scenarioData?.question || "",
        chosenOption: lastSelectedOption?.text || "",
        consequence: lastSelectedOption?.consequence || "",
        aiFeedback: gameState.currentAiFeedback
      };

      setGameState(prev => ({
        ...prev,
        history: [...prev.history, newHistoryItem],
        gameState: "ENDING"
      }));
    }
  };

  // Restart the game
  const handleRestart = () => {
    setGameState({
      character: null,
      currentChapter: 1,
      stats: { money: 0, reputation: 0, customers: 0, staff: 0, knowledge: 0 },
      history: [],
      badges: [],
      gameState: "SELECT_CHARACTER",
      aiLoading: false,
      currentAiFeedback: ""
    });
    setLastSelectedOption(null);
    setStatChanges(null);
    setSelectedCharPreview(CHARACTERS[0]);
  };

  // Render variables
  const currentChapterData = CHAPTERS.find(c => c.id === gameState.currentChapter);
  const currentScenario = React.useMemo(() => {
    return gameState.character && currentChapterData ? currentChapterData.getScenario(gameState.character) : null;
  }, [gameState.character, gameState.currentChapter, currentChapterData]);
  const finalEnding = gameState.character ? determineEnding({
    money: gameState.stats.money,
    reputation: gameState.stats.reputation,
    knowledge: gameState.stats.knowledge
  }) : null;

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#991B1B]/20 selection:text-[#991B1B]">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" />

      {/* HEADER */}
      <header className="bg-[#991B1B] text-white flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-md border-b-4 border-[#1A1A1A] relative z-20">
        <div className="flex items-center gap-4 mb-3 md:mb-0 cursor-pointer" onClick={handleRestart}>
          <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
            <span className="text-[#991B1B] font-black text-2xl ">M</span>
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter  leading-none">Marx Story</h1>
            <p className="text-sm uppercase tracking-[0.2em] font-medium opacity-85 ">Hành trình Kinh tế Chính trị Mác - Lênin</p>
          </div>
        </div>

        {gameState.character && (
          <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center">
            {/* Chapter Progress */}
            <div className="flex flex-col items-center md:items-end">
              <span className="text-sm uppercase font-bold text-red-200">Chương {gameState.currentChapter} / 7</span>
              <span className="text-xs   text-white line-clamp-1 max-w-[180px] md:max-w-[280px]">
                {currentChapterData?.concept}
              </span>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/30"></div>

            {/* Live Stats */}
            <div className="flex gap-4 md:gap-6 bg-black/20 px-4 py-2 rounded-md border border-white/10">
              <div className="text-center group relative">
                <p className="text-xs uppercase text-red-200 flex items-center justify-center gap-1">
                  <Coins className="w-3 h-3 text-amber-400" /> Vốn
                </p>
                <p className="font-bold font-mono text-sm md:text-base relative">
                  {gameState.stats.money} triệu
                  {statChanges?.money ? (
                    <span className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 font-black text-sm md:text-base drop-shadow-md ${statChanges.money > 0 ? 'text-emerald-400 animate-float-up' : 'text-rose-500 animate-float-down'}`}>
                      {statChanges.money > 0 ? '+' : ''}{statChanges.money}
                    </span>
                  ) : null}
                </p>
              </div>

              <div className="text-center group relative">
                <p className="text-xs uppercase text-red-200 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Uy tín
                </p>
                <p className="font-bold font-mono text-sm md:text-base relative">
                  {gameState.stats.reputation}%
                  {statChanges?.reputation ? (
                    <span className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 font-black text-sm md:text-base drop-shadow-md ${statChanges.reputation > 0 ? 'text-emerald-400 animate-float-up' : 'text-rose-500 animate-float-down'}`}>
                      {statChanges.reputation > 0 ? '+' : ''}{statChanges.reputation}
                    </span>
                  ) : null}
                </p>
              </div>

              <div className="text-center group relative">
                <p className="text-xs uppercase text-red-200 flex items-center justify-center gap-1">
                  <Users className="w-3 h-3 text-sky-400" /> Khách
                </p>
                <p className="font-bold font-mono text-sm md:text-base relative">
                  {gameState.stats.customers}%
                  {statChanges?.customers ? (
                    <span className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 font-black text-sm md:text-base drop-shadow-md ${statChanges.customers > 0 ? 'text-emerald-400 animate-float-up' : 'text-rose-500 animate-float-down'}`}>
                      {statChanges.customers > 0 ? '+' : ''}{statChanges.customers}
                    </span>
                  ) : null}
                </p>
              </div>

              <div className="text-center group relative">
                <p className="text-xs uppercase text-red-200 flex items-center justify-center gap-1">
                  <Briefcase className="w-3 h-3 text-purple-400" /> N.viên
                </p>
                <p className="font-bold font-mono text-sm md:text-base relative">
                  {gameState.stats.staff}
                  {statChanges?.staff ? (
                    <span className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 font-black text-sm md:text-base drop-shadow-md ${statChanges.staff > 0 ? 'text-emerald-400 animate-float-up' : 'text-rose-500 animate-float-down'}`}>
                      {statChanges.staff > 0 ? '+' : ''}{statChanges.staff}
                    </span>
                  ) : null}
                </p>
              </div>

              <div className="text-center group relative">
                <p className="text-xs uppercase text-red-200 flex items-center justify-center gap-1">
                  <BookOpen className="w-3 h-3 text-yellow-300" /> Tri thức
                </p>
                <p className="font-bold font-mono text-sm md:text-base text-yellow-300 relative">
                  {gameState.stats.knowledge}
                  {statChanges?.knowledge ? (
                    <span className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 font-black text-sm md:text-base drop-shadow-md ${statChanges.knowledge > 0 ? 'text-emerald-400 animate-float-up' : 'text-rose-500 animate-float-down'}`}>
                      {statChanges.knowledge > 0 ? '+' : ''}{statChanges.knowledge}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-3 md:mt-0">
          <button
            onClick={toggleMute}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-sm transition-colors text-white flex items-center justify-center"
            title={isMuted ? "Mở âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5"
            id="qr-btn"
          >
            <QrCode className="w-3.5 h-3.5" /> Mã QR
          </button>
          <button
            onClick={() => setShowGlossaryModal(true)}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5"
            id="glossary-btn"
          >
            <Info className="w-3.5 h-3.5" /> Giáo Trình
          </button>
        </div>
      </header>

      {/* STATS BAR ON MOBILE ONLY */}
      {gameState.character && (
        <div className="md:hidden flex justify-between bg-[#E8E6E1] border-b-2 border-[#1A1A1A] px-4 py-2 text-xs font-semibold">
          <span className="flex items-center gap-1">💰 Vốn: <strong className="font-mono">{gameState.stats.money}M</strong></span>
          <span className="flex items-center gap-1">❤️ Uy tín: <strong className="font-mono">{gameState.stats.reputation}%</strong></span>
          <span className="flex items-center gap-1">😊 Khách: <strong className="font-mono">{gameState.stats.customers}%</strong></span>
          <span className="flex items-center gap-1">📚 Tri thức: <strong className="font-mono text-[#991B1B]">{gameState.stats.knowledge}</strong></span>
        </div>
      )}

      {/* GAME AREA */}
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden">

        {/* LEFT PANEL: Selected Character & Stats Progress (Show only when playing) */}
        {gameState.character && gameState.gameState !== "SELECT_CHARACTER" && (
          <aside className="w-full md:w-[360px] bg-[#E8E6E1] border-b-2 md:border-b-0 md:border-r-2 border-[#1A1A1A] p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Character card */}
              <div className="bg-[#D1CFC9] border-2 border-[#1A1A1A] relative overflow-hidden shadow-[4px_4px_0px_#1A1A1A] rounded-sm group">
                <div className="absolute inset-0 bg-[#991B1B]/5 mix-blend-multiply"></div>
                <div className="p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-3xl shadow-[2px_2px_0px_#1A1A1A]">
                    {gameState.character.avatar}
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#991B1B] bg-white px-1.5 py-0.5 border border-[#1A1A1A] rounded-sm">
                      Nhân vật
                    </span>
                    <h2 className="text-xl  font-bold  text-[#1A1A1A] mt-1">{gameState.character.name}</h2>
                    <p className="text-xs font-semibold opacity-75">{gameState.character.title}</p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 border-t border-[#1A1A1A]/20 bg-[#F5F5F0]/50">
                  <p className="text-xs text-[#1A1A1A]/80   mb-2 leading-relaxed">
                    "{gameState.character.description}"
                  </p>
                  <p className="text-sm uppercase font-bold text-[#1A1A1A]/60">Ngành nghề: <span className="text-[#1A1A1A] lowercase font-medium">{gameState.character.businessType}</span></p>
                </div>
              </div>

              {/* Character strengths & challenges */}
              <div className="p-3.5 bg-white border-2 border-[#1A1A1A] rounded-sm shadow-[4px_4px_0px_#991B1B]">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#991B1B] mb-1.5">Ưu thế kinh doanh</h4>
                <p className="text-xs font-medium text-[#1A1A1A] mb-3">✓ {gameState.character.strengths}</p>

                <h4 className="text-sm font-black uppercase tracking-wider text-[#1A1A1A] mb-1.5">Thách thức đối mặt</h4>
                <ul className="text-xs text-[#1A1A1A]/80 space-y-1">
                  {gameState.character.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Educational Glossary helper in panel */}
              <div className="p-3.5 bg-[#FAF9F5] border-2 border-dashed border-[#1A1A1A] rounded-sm">
                <h4 className="text-sm font-black uppercase tracking-widest text-[#1A1A1A] flex items-center gap-1 mb-2">
                  <Info className="w-3.5 h-3.5 text-[#991B1B]" /> Ghi chú học tập
                </h4>
                <div className="space-y-2">
                  <div className="text-sm border-b border-[#1A1A1A]/10 pb-1.5">
                    <span className="font-bold text-[#991B1B]">Tư bản bất biến (C):</span>
                    <p className="text-[#1A1A1A]/80">Bộ phận tư bản biến thành tư liệu sản xuất (nhà xưởng, máy móc, nguyên liệu) giá trị không đổi.</p>
                  </div>
                  <div className="text-sm border-b border-[#1A1A1A]/10 pb-1.5">
                    <span className="font-bold text-[#991B1B]">Tư bản khả biến (V):</span>
                    <p className="text-[#1A1A1A]/80">Bộ phận tư bản biến thành sức lao động, giá trị tăng thêm tạo ra thặng dư.</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-red-700">Giá trị thặng dư (m):</span>
                    <p className="text-[#1A1A1A]/80">Bộ phận giá trị mới do lao động sống của công nhân tạo ra dôi ra ngoài giá trị sức lao động.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges unlocked */}
            <div className="mt-5 border-t border-[#1A1A1A]/20 pt-4">
              <p className="text-sm uppercase font-black tracking-widest mb-2.5 text-[#1A1A1A]/60 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#991B1B]" /> Huy chương đạt được ({gameState.badges.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {BADGES.map((badge) => {
                  const isUnlocked = gameState.badges.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all group relative cursor-help ${isUnlocked
                          ? "border-[#991B1B] bg-white text-xl shadow-[2px_2px_0px_#1A1A1A]"
                          : "border-gray-300 bg-gray-100 text-gray-400 opacity-40 grayscale"
                        }`}
                      title={`${badge.name}: ${badge.description} (${isUnlocked ? "Đã mở" : `Yêu cầu Tri thức >= ${badge.unlockedAtKnowledge}`})`}
                    >
                      <span>{badge.icon}</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block w-48 bg-[#1A1A1A] text-white text-sm rounded p-2 z-30 shadow-lg pointer-events-none">
                        <p className="font-bold text-[#FFA500]">{badge.name}</p>
                        <p className="text-gray-300 mt-0.5">{badge.description}</p>
                        <p className="text-gray-400 mt-1 ">
                          {isUnlocked ? "✓ Đã mở khóa" : `🔒 Khóa (Yêu cầu Tri thức ≥ ${badge.unlockedAtKnowledge})`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* CENTER CONTENT */}
        <div ref={mainContentRef} className="flex-1 p-4 md:p-8 flex flex-col justify-between overflow-y-auto">

          {/* SCREEN 1: CHARACTER SELECTION */}
          {gameState.gameState === "SELECT_CHARACTER" && (
            <div className="max-w-5xl mx-auto w-full space-y-6">

              {/* Introduction Banner */}
              <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[8px_8px_0px_#1A1A1A] text-center space-y-3 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#991B1B]"></div>
                <span className="text-xs uppercase font-black tracking-[0.25em] text-[#991B1B] bg-[#991B1B]/10 px-3 py-1 rounded-sm">
                  Dự án học tập tương tác sáng tạo
                </span>
                <h2 className="text-2xl md:text-4xl   font-black text-[#1A1A1A]">
                  Khởi nghiệp qua lăng kính Kinh tế Chính trị
                </h2>
                <p className="text-sm text-[#1A1A1A]/80 max-w-2xl mx-auto leading-relaxed">
                  Nhập vai vào một trong 20 nhân vật đại diện cho các lĩnh vực sản xuất & dịch vụ thực tế.
                  Trải nghiệm 7 chương của môn học Kinh tế chính trị Mác - Lênin qua các quyết định sống còn giúp doanh nghiệp phát triển bền vững hoặc phá sản!
                </p>
              </div>

              {/* Character selector layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Selector list */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] pb-2">
                    <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#991B1B] block"></span> Chọn nhân vật của bạn
                    </h3>

                    {/* Difficulty filters */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold opacity-70">Độ khó:</span>
                      <select
                        value={difficultyFilter || ""}
                        onChange={(e) => setDifficultyFilter(e.target.value ? Number(e.target.value) : null)}
                        className="text-xs bg-white border border-[#1A1A1A] px-2 py-1 rounded-sm font-medium focus:outline-none"
                      >
                        <option value="">Tất cả</option>
                        <option value="1">1 sao (Dễ)</option>
                        <option value="2">2 sao</option>
                        <option value="3">3 sao (Vừa)</option>
                        <option value="4">4 sao</option>
                        <option value="5">5 sao (Khó)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {CHARACTERS
                      .filter(char => difficultyFilter === null || char.difficulty === difficultyFilter)
                      .map((char) => {
                        const isSelected = selectedCharPreview?.id === char.id;
                        return (
                          <button
                            key={char.id}
                            onClick={() => setSelectedCharPreview(char)}
                            className={`p-3 text-left border-2 rounded-sm transition-all flex items-center gap-3 relative ${isSelected
                                ? "bg-white border-[#991B1B] shadow-[4px_4px_0px_#1A1A1A] scale-[1.01]"
                                : "bg-[#E8E6E1]/50 border-[#1A1A1A]/30 hover:border-[#1A1A1A] hover:bg-white"
                              }`}
                          >
                            <div className="w-10 h-10 bg-[#FAF9F5] border border-[#1A1A1A] rounded-full flex items-center justify-center text-2xl shadow-[1px_1px_0px_#1A1A1A]">
                              {char.avatar}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs truncate text-[#1A1A1A]">{char.name}</h4>
                              <p className="text-sm text-gray-500 truncate">{char.title}</p>
                              <div className="flex text-xs text-[#991B1B] mt-0.5 font-bold">
                                {"★".repeat(char.difficulty)}
                                {"☆".repeat(5 - char.difficulty)}
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#991B1B]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Selected Preview details card */}
                {selectedCharPreview && (
                  <div className="lg:col-span-5 bg-white border-2 border-[#1A1A1A] p-5 shadow-[6px_6px_0px_#1A1A1A] rounded-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3.5 pb-3 border-b border-[#1A1A1A]/10">
                        <div className="w-14 h-14 bg-[#FAF9F5] border-2 border-[#1A1A1A] rounded-full flex items-center justify-center text-3xl shadow-[3px_3px_0px_#1A1A1A]">
                          {selectedCharPreview.avatar}
                        </div>
                        <div>
                          <h3 className=" font-black  text-xl text-[#1A1A1A]">{selectedCharPreview.name}</h3>
                          <p className="text-xs font-semibold text-gray-500 leading-tight">{selectedCharPreview.title}</p>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="bg-[#F5F5F0] p-2.5 border border-[#1A1A1A]/20 rounded-sm">
                          <p className="text-xs text-gray-700 leading-relaxed  ">
                            "{selectedCharPreview.description}"
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="border border-[#1A1A1A]/15 p-2 rounded-sm bg-[#E8E6E1]/20">
                            <span className="font-bold block text-gray-500 uppercase text-xs">💰 Vốn ban đầu</span>
                            <span className="text-sm font-bold font-mono">{selectedCharPreview.baseStats.money} triệu VNĐ</span>
                          </div>
                          <div className="border border-[#1A1A1A]/15 p-2 rounded-sm bg-[#E8E6E1]/20">
                            <span className="font-bold block text-gray-500 uppercase text-xs">👨‍💼 Đội ngũ ban đầu</span>
                            <span className="text-sm font-bold font-mono">{selectedCharPreview.baseStats.staff} nhân viên</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-[#991B1B] uppercase text-xs tracking-wider">Lợi thế đặc trưng:</p>
                          <p className="font-medium text-gray-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-sm">
                            ✓ {selectedCharPreview.strengths}
                          </p>
                        </div>

                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-gray-500 uppercase text-xs tracking-wider">Thách thức khó khăn:</p>
                          <div className="space-y-1 pl-1">
                            {selectedCharPreview.challenges.slice(0, 2).map((ch, idx) => (
                              <p key={idx} className="text-gray-600 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 block"></span>
                                {ch}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectCharacter(selectedCharPreview)}
                      className="w-full py-3 bg-[#991B1B] hover:bg-[#801414] text-white font-black uppercase tracking-widest rounded-sm border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm"
                      id="start-journey-btn"
                    >
                      Bắt đầu hành trình <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 2: SCENARIO STORY & DECISION MAKING */}
          {gameState.gameState === "STORY" && gameState.character && currentScenario && (
            <div className="max-w-3xl mx-auto w-full space-y-6">

              {/* Scenario Context header */}
              <div className="flex items-center gap-2 text-[#991B1B] font-bold text-xs uppercase tracking-widest bg-red-50 py-1.5 px-3 rounded-sm border border-red-200 w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Chương {gameState.currentChapter}: {currentChapterData?.title.split(": ")[1]}
              </div>

              {/* Story Intro */}
              <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[8px_8px_0px_#1A1A1A] rounded-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b-2 border-dashed border-[#1A1A1A]/20">
                  <span className="w-3 h-3 bg-[#991B1B]"></span>
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-500">Tình huống giả định</h3>
                </div>

                <p className="text-lg md:text-xl  text-[#1A1A1A] leading-relaxed  first-letter:text-4xl first-letter:font-bold first-letter:text-[#991B1B] first-letter:float-left first-letter:mr-2">
                  {currentScenario.intro}
                </p>

                {/* Scenario Illustration Dynamic helper */}
                <div className="bg-[#FAF9F5] border border-[#1A1A1A]/10 p-3 rounded-sm text-center flex flex-col justify-center items-center space-y-1">
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Mô tả quy luật liên quan</p>
                  <p className="text-xs   text-gray-600">
                    "{currentChapterData?.concept}"
                  </p>
                </div>
              </div>

              {/* Options Box */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] mb-2">
                  ❓ Quyết định của bạn là gì?
                </h4>

                <div className="grid grid-cols-1 gap-3.5">
                  {currentScenario.options.map((option, idx) => {
                    const optionLetter = idx === 0 ? "A" : "B";
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleMakeDecision(option)}
                        className="w-full text-left p-4 bg-white border-2 border-[#1A1A1A] hover:border-[#991B1B] hover:bg-red-50/20 rounded-sm transition-all flex gap-4 items-center shadow-[4px_4px_0px_#1A1A1A] hover:shadow-[6px_6px_0px_#991B1B] active:translate-y-0.5 active:translate-x-0.5 group"
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-[#1A1A1A] group-hover:border-[#991B1B] group-hover:bg-[#991B1B] group-hover:text-white flex items-center justify-center font-bold  text-sm transition-colors bg-[#FAF9F5]">
                          {optionLetter}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#991B1B] transition-colors">
                            {option.text}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: DECISION RESULT & AI FEEDBACK */}
          {gameState.gameState === "DECISION_RESULT" && gameState.character && lastSelectedOption && (
            <div className="max-w-3xl mx-auto w-full space-y-6">

              {/* Consequence card */}
              <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[8px_8px_0px_#1A1A1A] rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#1A1A1A]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]"></span>
                    <h3 className="font-black text-xs uppercase tracking-widest text-[#991B1B]">Kết quả kinh doanh</h3>
                  </div>

                  {/* Visually dynamic show effects */}
                  <div className="flex gap-2">
                    {statChanges && Object.entries(statChanges).map(([key, value]) => {
                      if (!value) return null;
                      const isPositive = (value as number) > 0;
                      const iconMap: Record<string, string> = { money: "💰", reputation: "❤️", customers: "😊", staff: "👨‍💼", knowledge: "📚" };
                      return (
                        <span
                          key={key}
                          className={`text-sm font-bold px-2 py-0.5 rounded-full border ${isPositive
                              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                              : "bg-rose-50 border-rose-300 text-rose-700"
                            }`}
                        >
                          {iconMap[key]} {isPositive ? `+${value}` : value}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs uppercase font-black text-gray-400">Điều gì vừa xảy ra:</p>
                  <p className="text-lg md:text-xl   text-gray-800 leading-relaxed font-bold">
                    "{lastSelectedOption.consequence}"
                  </p>
                </div>
              </div>

              {/* Action buttons (Moved up for better visibility) */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleProceed}
                  className="px-6 py-3 bg-[#991B1B] hover:bg-[#801414] text-white text-xs font-black uppercase tracking-widest border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] rounded-sm flex items-center gap-2 transition-all active:translate-y-0.5 active:translate-x-0.5"
                >
                  {gameState.currentChapter === 7 ? "Xem Kết Cục Doanh Nghiệp" : `Tiếp tục đến Chương ${gameState.currentChapter + 1}`} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* AI FEEDBACK PANEL */}
              <div className="bg-[#1A1A1A] text-white p-6 shadow-[8px_8px_0px_#991B1B] rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] shadow-[2px_2px_0px_#991B1B]">
                      <GraduationCap className="w-5 h-5 text-[#991B1B]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-red-400">Giảng dạy từ Giáo sư AI</h4>
                      <p className="text-sm text-gray-400 font-medium">Kinh tế chính trị Mác - Lênin trực quan</p>
                    </div>
                  </div>
                  {gameState.aiLoading && (
                    <span className="text-sm bg-red-900/40 text-red-300 border border-red-700/50 px-2 py-0.5 rounded animate-pulse">
                      Đang phân tích dữ liệu...
                    </span>
                  )}
                </div>

                {gameState.aiLoading ? (
                  <div className="py-6 flex flex-col items-center justify-center space-y-3 text-center">
                    <div className="relative">
                      <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      <Sparkles className="w-4 h-4 text-yellow-400 absolute top-3 left-3 animate-ping" />
                    </div>
                    <p className="text-xs   text-gray-400">
                      "Đang chuẩn bị lý thuyết và viết báo cáo phân tích cho bạn..."
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm md:text-base   text-gray-200 leading-relaxed first-letter:text-3xl first-letter:font-black first-letter:text-red-400 first-letter:float-left first-letter:mr-2">
                      {gameState.currentAiFeedback}
                    </p>

                    <div className="bg-white/5 border border-white/10 p-3 rounded-sm flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm uppercase font-bold text-gray-400">Khái niệm cốt lõi:</span>
                        <p className="text-xs text-gray-300  ">
                          {lastSelectedOption.marxTheory}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* SCREEN 4: GAME OVER / ENDING */}
          {gameState.gameState === "ENDING" && gameState.character && finalEnding && (
            <div className="max-w-4xl mx-auto w-full space-y-6">

              {/* Ending Illustration Big Card */}
              <div className={`bg-gradient-to-br ${finalEnding.bgGradient} border-4 border-[#1A1A1A] p-6 md:p-8 shadow-[10px_10px_0px_#1A1A1A] rounded-sm text-center relative overflow-hidden`}>
                <div className="absolute top-4 right-4 text-6xl md:text-8xl opacity-15 pointer-events-none select-none">
                  {finalEnding.illustration}
                </div>

                <span className="text-xs uppercase font-black tracking-[0.3em] bg-white border border-[#1A1A1A] text-[#1A1A1A] px-3 py-1 rounded-sm shadow-[2px_2px_0px_#1A1A1A] inline-block mb-4">
                  KẾT THÚC CÂU CHUYỆN
                </span>

                <h2 className="text-2xl md:text-4xl   font-black text-[#1A1A1A] mb-4 leading-tight">
                  {finalEnding.title}
                </h2>

                <p className="text-sm md:text-base text-gray-800 max-w-2xl mx-auto  leading-relaxed  bg-white/60 p-5 rounded-sm border border-[#1A1A1A]/10 shadow-inner">
                  {finalEnding.description}
                </p>
              </div>

              {/* final Stats and review */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Scoreboard stats */}
                <div className="bg-white border-2 border-[#1A1A1A] p-5 shadow-[6px_6px_0px_#1A1A1A] rounded-sm space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#991B1B]" /> Chỉ số cuối cùng của bạn
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-[#1A1A1A]/15 p-3 rounded-sm bg-[#FAF9F5]">
                      <span className="text-sm text-gray-500 block uppercase font-bold">💰 Vốn doanh nghiệp</span>
                      <strong className="text-lg font-mono text-[#1A1A1A]">{gameState.stats.money} triệu VNĐ</strong>
                    </div>

                    <div className="border border-[#1A1A1A]/15 p-3 rounded-sm bg-[#FAF9F5]">
                      <span className="text-sm text-gray-500 block uppercase font-bold">❤️ Uy tín thương hiệu</span>
                      <strong className="text-lg font-mono text-[#1A1A1A]">{gameState.stats.reputation}%</strong>
                    </div>

                    <div className="border border-[#1A1A1A]/15 p-3 rounded-sm bg-[#FAF9F5]">
                      <span className="text-sm text-gray-500 block uppercase font-bold">😊 Lượng khách hàng</span>
                      <strong className="text-lg font-mono text-[#1A1A1A]">{gameState.stats.customers}%</strong>
                    </div>

                    <div className="border border-[#1A1A1A]/15 p-3 rounded-sm bg-[#FAF9F5]">
                      <span className="text-sm text-gray-500 block uppercase font-bold">📚 Tri thức Mác - Lênin</span>
                      <strong className="text-lg font-mono text-[#991B1B]">{gameState.stats.knowledge} / 100</strong>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] border border-dashed border-[#1A1A1A]/20 p-3 rounded-sm text-center">
                    <p className="text-sm text-gray-500 uppercase font-black tracking-wider">Huy chương thu thập</p>
                    <div className="flex justify-center gap-2 mt-2">
                      {gameState.badges.length === 0 ? (
                        <p className="text-xs text-gray-400  ">Bạn chưa thu được huy chương nào lần này.</p>
                      ) : (
                        BADGES.filter(b => gameState.badges.includes(b.id)).map(badge => (
                          <span
                            key={badge.id}
                            className="text-2xl cursor-help relative group"
                            title={`${badge.name}: ${badge.description}`}
                          >
                            {badge.icon}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* History summary logs list */}
                <div className="bg-[#FAF9F5] border-2 border-[#1A1A1A] p-5 shadow-[6px_6px_0px_#991B1B] rounded-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#991B1B] border-b border-[#1A1A1A]/15 pb-2">
                      📜 Nhật ký hành trình
                    </h3>

                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                      {gameState.history.map((hist, idx) => (
                        <div key={idx} className="text-xs border-b border-gray-200 pb-2">
                          <span className="font-bold text-[#1A1A1A] block">Chương {hist.chapter}: {hist.scenario.substring(0, 50)}...</span>
                          <p className="text-gray-500   mt-0.5">Bạn đã chọn: "{hist.chosenOption.substring(0, 60)}..."</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRestart}
                    className="w-full mt-4 py-3 bg-[#1A1A1A] hover:bg-[#991B1B] text-white font-black uppercase tracking-widest rounded-sm border border-[#1A1A1A] transition-all flex items-center justify-center gap-2 text-xs"
                    id="play-again-btn"
                  >
                    <RefreshCw className="w-4 h-4" /> Khởi nghiệp lại với nghề khác
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="mt-8 pt-4 border-t-2 border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center text-center gap-3">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleRestart()}
                className="px-3 py-1.5 border border-[#1A1A1A] hover:bg-[#E8E6E1] text-sm font-bold uppercase tracking-wider rounded-sm transition-all"
                id="footer-character-select"
              >
                Chọn Nhân Vật
              </button>
              <button
                onClick={() => setShowGlossaryModal(true)}
                className="px-3 py-1.5 border border-[#1A1A1A] hover:bg-[#E8E6E1] text-sm font-bold uppercase tracking-wider rounded-sm transition-all"
                id="footer-syllabus"
              >
                Giáo Trình Học Tập
              </button>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-55  text-[#1A1A1A]">
              Bản quyền &copy; 2026 Marx Story Team • Chuyên đề Giáo dục đổi mới
            </p>
          </footer>
        </div>
      </main>

      {/* SVG DECORATIVE SPINNING STAR */}
      <div className="absolute bottom-6 right-6 w-16 h-16 pointer-events-none opacity-5 hidden lg:block">
        <svg viewBox="0 0 100 100" className="animate-spin text-[#991B1B]" style={{ animationDuration: '20s' }}>
          <path fill="currentColor" d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
        </svg>
      </div>

      {/* MODAL: QR CODE */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setShowQrModal(false)}>
          <div className="bg-[#F5F5F0] border-4 border-[#1A1A1A] w-full max-w-sm flex flex-col shadow-[12px_12px_0px_#991B1B] rounded-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#991B1B] text-white p-4 flex justify-between items-center border-b-2 border-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                <h3 className="font-black text-lg uppercase">Mã QR Website</h3>
              </div>
              <button onClick={() => setShowQrModal(false)} className="text-white hover:text-red-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col items-center justify-center space-y-4">
              <p className="text-sm text-center font-medium text-gray-700">Quét mã QR dưới đây để chia sẻ trang web <br /><span className="text-[#991B1B] font-bold">https://maxr-story.vercel.app/</span></p>
              <div className="p-4 bg-white border-2 border-[#1A1A1A] rounded-sm flex items-center justify-center">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://maxr-story.vercel.app/" alt="QR Code" className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDUCATION SYLLABUS & GLOSSARY */}
      {showGlossaryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="glossary-modal">
          <div className="bg-[#F5F5F0] border-4 border-[#1A1A1A] w-full max-w-3xl max-h-[85vh] flex flex-col shadow-[12px_12px_0px_#991B1B] rounded-sm overflow-hidden">

            {/* Modal header */}
            <div className="bg-[#991B1B] text-white p-4 flex justify-between items-center border-b-2 border-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <h3 className=" font-black  text-lg uppercase">Giáo trình Tóm tắt: Kinh tế Chính trị Mác - Lênin</h3>
              </div>
              <button
                onClick={() => setShowGlossaryModal(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal content body */}
            <div className="p-6 overflow-y-auto space-y-6">

              <div className="bg-white p-4 border border-[#1A1A1A]/15 rounded-sm">
                <h4 className=" font-black  text-red-700 text-sm mb-2">Lời giới thiệu</h4>
                <p className="text-xs text-gray-700 leading-relaxed  ">
                  Kinh tế chính trị Mác - Lênin không phải là những trang lý thuyết hàn lâm nằm ngủ yên trong giáo trình.
                  Đó là các quy luật khách quan chi phối trực tiếp mọi hoạt động sản xuất, trao đổi, và lưu thông hàng hóa trên thị trường mà hàng ngày chúng ta đang tham gia.
                  Hãy dùng cẩm nang này làm kim chỉ nam để giải quyết các chương trong game!
                </p>
              </div>

              <div className="space-y-4">

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 1: Đối tượng và phương pháp nghiên cứu</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Nghiên cứu quan hệ sản xuất trong sự tác động qua lại với lực lượng sản xuất và kiến trúc thượng tầng.
                    Phương pháp chủ đạo là <strong>Trừu tượng hóa khoa học</strong> - loại bỏ các hiện tượng ngẫu nhiên bên ngoài để nắm bắt quy luật bản chất bên trong thị trường.
                  </p>
                </div>

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 2: Hàng hóa, thị trường và vai trò các chủ thể</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Hàng hóa có 2 thuộc tính: <strong>Giá trị sử dụng</strong> (công dụng thỏa mãn nhu cầu) và <strong>Giá trị</strong> (lao động xã hội kết tinh).
                    Lượng giá trị hàng hóa đo bằng <strong>Thời gian lao động xã hội cần thiết</strong>. Doanh nghiệp muốn thắng thế phải giảm hao phí lao động cá biệt của mình.
                  </p>
                </div>

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 3: Tiền tệ và Quy luật giá trị</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Tiền tệ là hàng hóa đặc biệt đóng vai trò là vật ngang giá chung. Tiền có 5 chức năng chính: Thước đo giá trị, Phương tiện lưu thông, Phương tiện cất trữ, Phương tiện thanh toán và Tiền tệ thế giới.
                    Quy luật giá trị yêu cầu việc sản xuất và trao đổi hàng hóa phải dựa trên hao phí lao động xã hội cần thiết.
                  </p>
                </div>

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 4: Học thuyết giá trị thặng dư</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Sức lao động là hàng hóa đặc biệt khi sử dụng sẽ tạo ra giá trị mới lớn hơn giá trị của bản thân nó.
                    Phần dôi ra ngoài giá trị sức lao động gọi là <strong>Giá trị thặng dư (m)</strong>. Có hai phương pháp sản xuất thặng dư: tuyệt đối (kéo dài thời gian làm việc) và tương đối (nâng cao năng suất lao động bằng công nghệ).
                  </p>
                </div>

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 5: Cạnh tranh trong nền kinh tế thị trường</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Cạnh tranh là sự ganh đua giữa các chủ thể kinh tế nhằm giành giật điều kiện thuận lợi để thu lợi nhuận cao.
                    Cạnh tranh lành mạnh thúc đẩy cải tiến kỹ thuật, tăng năng suất lao động cá biệt và làm phong phú giá trị sử dụng cho người dùng.
                  </p>
                </div>

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 6: Độc quyền và độc quyền nhà nước</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Sự phát triển vượt bậc của tích tụ và tập trung tư bản dẫn đến việc hình thành các liên minh độc quyền lớn thống lĩnh thị trường.
                    Chúng áp đặt <strong>Giá cả độc quyền</strong> và thu về <strong>Lợi nhuận độc quyền cao</strong>. Giải pháp là định vị thị trường ngách để sinh tồn.
                  </p>
                </div>

                <div className="border-l-4 border-[#991B1B] pl-3 py-1">
                  <h5 className="font-bold text-xs uppercase text-[#1A1A1A]">Chương 7: Kinh tế thị trường định hướng XHCN ở Việt Nam</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    Nền kinh tế thị trường hiện đại, hội nhập quốc tế, vận hành đầy đủ theo các quy luật thị trường dưới sự quản lý của Nhà nước pháp quyền xã hội chủ nghĩa.
                    Đặc trưng cốt lõi là gắn kết phát triển kinh tế bền vững, bảo vệ môi trường và bảo đảm công bằng xã hội.
                  </p>
                </div>

              </div>
            </div>

            {/* Modal footer close */}
            <div className="bg-[#E8E6E1] p-4 flex justify-end border-t border-[#1A1A1A]/20">
              <button
                onClick={() => setShowGlossaryModal(false)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#991B1B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
              >
                Đóng Giáo Trình
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
