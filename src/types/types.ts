export interface GameStats {
  money: number;       // Tiền (triệu VNĐ)
  reputation: number;  // Uy tín (0 - 100)
  customers: number;   // Khách hàng (0 - 100)
  staff: number;       // Nhân viên (người)
  knowledge: number;   // Kiến thức (0 - 100)
}

export interface Character {
  id: string;
  name: string;
  title: string;
  avatar: string; // Dynamic drawing/icon representation
  difficulty: number; // 1 to 5 stars
  description: string;
  businessType: string;
  baseStats: GameStats;
  strengths: string;
  challenges: string[];
}

export interface Option {
  id: string;
  text: string;
  statsEffect: Partial<GameStats>;
  consequence: string;
  marxTheory: string; // Explaining the theory concept
}

export interface Chapter {
  id: number;
  title: string;
  concept: string;
  description: string;
  getScenario: (character: Character) => {
    intro: string;
    question: string;
    options: Option[];
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAtKnowledge: number;
}

export interface GameState {
  character: Character | null;
  currentChapter: number; // 1 to 7
  stats: GameStats;
  history: Array<{
    chapter: number;
    scenario: string;
    chosenOption: string;
    consequence: string;
    aiFeedback: string;
  }>;
  badges: string[]; // unlocked badge IDs
  gameState: "SELECT_CHARACTER" | "STORY" | "DECISION_RESULT" | "GAME_OVER" | "ENDING";
  aiLoading: boolean;
  currentAiFeedback: string;
}

export interface Ending {
  id: string;
  title: string;
  description: string;
  bgGradient: string;
  illustration: string;
}
