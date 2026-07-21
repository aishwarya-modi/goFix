export type QuestionType =
  | "multiple-choice"
  | "multiple-select"
  | "true-false"
  | "code-output"
  | "identify-bug"
  | "complete-code"
  | "scenario"
  | "best-practice"
  | "security"
  | "architecture";

export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  code?: string;
  options: { id: string; text: string; code?: string }[];
  correctAnswer: string | string[];
  explanation: string;
  learnMore?: string;
  difficulty: Difficulty;
  points: number;
  tags: string[];
  relatedLesson: string;
}

export interface QuizTopic {
  slug: string;
  title: string;
  category: string;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  topicSlug: string;
  score: number;
  totalPoints: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  timeTaken: number;
  answers: Record<string, string | string[] | null>;
  completedAt: string;
  mode: "normal" | "timed" | "practice";
}

export interface TopicProgress {
  slug: string;
  bestScore: number;
  attempts: number;
  averageScore: number;
  accuracy: number;
  lastAttempted: string;
  completedQuiz: boolean;
  timeSpent: number;
  weakAreas: string[];
  strengths: string[];
}

export interface QuizDashboardData {
  topicsCompleted: number;
  totalTopics: number;
  quizAccuracy: number;
  currentStreak: number;
  xp: number;
  level: number;
  levelTitle: string;
  totalScore: number;
  bestTopic: string;
  weakestTopic: string;
  hoursStudied: number;
  weeklyProgress: { day: string; score: number; count: number }[];
  quizScores: { topic: string; score: number }[];
  completionPercent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (data: QuizDashboardData, attempts: QuizAttempt[]) => boolean;
  unlocked?: boolean;
}

export const POINTS: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const XP_REWARDS = {
  LESSON_READ: 25,
  QUIZ_PASSED: 100,
  PERFECT_SCORE: 200,
  FIRST_ATTEMPT_PERFECT: 300,
  DAILY_STREAK: 50,
};

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: "Go Newcomer" },
  { level: 2, xp: 200, title: "Go Apprentice" },
  { level: 3, xp: 500, title: "Go Learner" },
  { level: 4, xp: 1000, title: "Go Practitioner" },
  { level: 5, xp: 1800, title: "Backend Developer" },
  { level: 6, xp: 2800, title: "Backend Engineer" },
  { level: 7, xp: 4000, title: "Senior Engineer" },
  { level: 8, xp: 5500, title: "Go Expert" },
  { level: 9, xp: 7500, title: "Go Master" },
  { level: 10, xp: 10000, title: "Backend Architect" },
];

export function getLevelFromXP(xp: number): { level: number; title: string; progress: number; nextXP: number } {
  let current = LEVEL_THRESHOLDS[0];
  let next = LEVEL_THRESHOLDS[1];
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      current = LEVEL_THRESHOLDS[i];
      next = LEVEL_THRESHOLDS[i + 1] || LEVEL_THRESHOLDS[i];
      break;
    }
  }
  const progress = next.xp === current.xp ? 100 : Math.round(((xp - current.xp) / (next.xp - current.xp)) * 100);
  return { level: current.level, title: current.title, progress, nextXP: next.xp };
}

export function calculateGrade(percentage: number): { grade: string; label: string; color: string } {
  if (percentage >= 97) return { grade: "A+", label: "Outstanding", color: "text-emerald-400" };
  if (percentage >= 93) return { grade: "A", label: "Excellent", color: "text-emerald-400" };
  if (percentage >= 90) return { grade: "A-", label: "Great", color: "text-emerald-400" };
  if (percentage >= 87) return { grade: "B+", label: "Very Good", color: "text-cyan-400" };
  if (percentage >= 83) return { grade: "B", label: "Good", color: "text-cyan-400" };
  if (percentage >= 80) return { grade: "B-", label: "Above Average", color: "text-cyan-400" };
  if (percentage >= 77) return { grade: "C+", label: "Average", color: "text-yellow-400" };
  if (percentage >= 73) return { grade: "C", label: "Below Average", color: "text-yellow-400" };
  if (percentage >= 70) return { grade: "C-", label: "Needs Work", color: "text-orange-400" };
  if (percentage >= 60) return { grade: "D", label: "Poor", color: "text-orange-400" };
  return { grade: "F", label: "Needs Improvement", color: "text-red-400" };
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
