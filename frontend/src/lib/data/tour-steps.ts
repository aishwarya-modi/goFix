import { type TourStep } from "@/components/tour/TourProvider";

export const homeTourSteps: TourStep[] = [
  {
    target: "tour-logo",
    title: "Welcome to GoFix",
    content:
      "This is an interactive platform for learning Go backend engineering. You'll explore a deliberately flawed Go project and fix real production issues.",
    placement: "bottom",
    page: "/",
    icon: "👋",
  },
  {
    target: "tour-nav-challenge",
    title: "The Challenge",
    content:
      "The core experience. Jump into the challenge dashboard to explore code, detect bugs, and complete tasks.",
    placement: "bottom",
    page: "/",
    icon: "🎯",
  },
  {
    target: "tour-nav-security",
    title: "Security Scanner",
    content:
      "Run automated security scans on the project. See which vulnerabilities exist and learn how to fix them.",
    placement: "bottom",
    page: "/",
    icon: "🛡️",
  },
  {
    target: "tour-nav-learn",
    title: "Learning Hub",
    content:
      "Deep-dive into security concepts like SQL Injection, Password Hashing, and Go Error Handling with interactive code examples.",
    placement: "bottom",
    page: "/",
    icon: "📚",
  },
  {
    target: "tour-hero",
    title: "Go Backend Interview Challenge",
    content:
      "This is the main challenge card. It describes the project, difficulty level (Mid-Level), estimated time (90 minutes), and the skills you'll practice.",
    placement: "bottom",
    page: "/",
    icon: "📋",
  },
  {
    target: "tour-start",
    title: "Start Here",
    content:
      "Click this button to enter the challenge dashboard where you'll explore the code, identify issues, and complete tasks.",
    placement: "top",
    page: "/",
    icon: "🚀",
  },
  {
    target: "tour-features",
    title: "Platform Features",
    content:
      "GoFix includes an interactive code viewer, security scanner, learning mode, and guided tasks — everything you need to practice backend skills.",
    placement: "top",
    page: "/",
    icon: "✨",
  },
];

export const challengeTourSteps: TourStep[] = [
  {
    target: "tour-sidebar",
    title: "Task Sidebar",
    content:
      "The left sidebar has 4 tabs: Tasks (your challenge list), Issues (detected vulnerabilities), Learn (quick links), and Progress (your score and achievements).",
    placement: "right",
    page: "/challenge",
    icon: "📑",
  },
  {
    target: "tour-task-list",
    title: "Your Tasks",
    content:
      "Each task is a real engineering challenge. Click on one to see details, hints, and the solution. Tasks range from Easy to Hard.",
    placement: "right",
    page: "/challenge",
    icon: "✅",
  },
  {
    target: "tour-file-tabs",
    title: "File Tabs",
    content:
      "Switch between project files. Badges show how many issues exist in each file. Click to open and explore the code.",
    placement: "bottom",
    page: "/challenge",
    icon: "📂",
  },
  {
    target: "tour-code-viewer",
    title: "Code Viewer",
    content:
      "Browse the actual Go source code with syntax highlighting and line numbers. Look for bugs, security issues, and anti-patterns.",
    placement: "top",
    page: "/challenge",
    icon: "💻",
  },
  {
    target: "tour-issue-panel",
    title: "Issue Detector",
    content:
      "The right panel shows issues found in the currently open file. Each issue has a severity level (Critical, High, Medium) and a description.",
    placement: "left",
    page: "/challenge",
    icon: "⚠️",
  },
  {
    target: "tour-first-task",
    title: "Your First Task",
    content:
      "Click on 'Remove Hardcoded Credentials' to start. You'll see the task description, difficulty, related skills, and progressive hints.",
    placement: "right",
    page: "/challenge",
    icon: "🎯",
  },
  {
    target: "tour-hints",
    title: "Progressive Hints",
    content:
      "Stuck? Reveal hints one by one. Each hint gives you more guidance without giving away the answer immediately.",
    placement: "left",
    page: "/challenge",
    icon: "💡",
  },
];
