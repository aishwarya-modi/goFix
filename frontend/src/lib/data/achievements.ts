export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  category: "security" | "architecture" | "testing" | "general";
}

export const achievements: Achievement[] = [
  {
    id: "first-fix",
    title: "First Fix",
    description: "Completed your first task",
    icon: "🎯",
    requirement: "Complete 1 task",
    category: "general",
  },
  {
    id: "sql-defender",
    title: "SQL Defender",
    description: "Fixed the SQL injection vulnerability",
    icon: "🛡️",
    requirement: "Complete Task 2",
    category: "security",
  },
  {
    id: "security-expert",
    title: "Security Expert",
    description: "Fixed all critical security issues",
    icon: "🔐",
    requirement: "Complete Tasks 1, 2, 3, and 6",
    category: "security",
  },
  {
    id: "go-architect",
    title: "Go Architect",
    description: "Improved the application architecture",
    icon: "🏗️",
    requirement: "Complete Tasks 4 and 5",
    category: "architecture",
  },
  {
    id: "bug-hunter",
    title: "Bug Hunter",
    description: "Found and fixed the error handling bug",
    icon: "🐛",
    requirement: "Complete Task 5",
    category: "general",
  },
  {
    id: "test-master",
    title: "Test Master",
    description: "Added comprehensive test coverage",
    icon: "✅",
    requirement: "Complete Task 7",
    category: "testing",
  },
  {
    id: "full-stack",
    title: "Full Stack Fixer",
    description: "Completed all tasks",
    icon: "👑",
    requirement: "Complete all 7 tasks",
    category: "general",
  },
];
