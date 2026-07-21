"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Folder,
  FolderOpen,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Eye,
  EyeOff,
  BookOpen,
  Target,
  Award,
  X,
} from "lucide-react";
import { goFiles, getFileByPath } from "@/lib/data/files";
import { issues, getIssuesByFile } from "@/lib/data/issues";
import { tasks } from "@/lib/data/tasks";
import { topics } from "@/lib/data/topics";
import { fileTree, type FileNode } from "@/lib/data/tree";
import { achievements } from "@/lib/data/achievements";
import { useAppStore } from "@/store";
import { useAnalyticsStore } from "@/store/analytics";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";
import { useHydration } from "@/lib/hooks/use-hydration";

const severityConfig: Record<string, { color: string; bg: string; label: string }> = {
  critical: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", label: "CRITICAL" },
  high: { color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", label: "HIGH" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "MEDIUM" },
  low: { color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "LOW" },
};

const difficultyColors: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Hard: "text-red-400 bg-red-500/10 border-red-500/20",
};

function FileTreeItem({
  node,
  depth = 0,
  onSelect,
  activeFile,
  fileIssues,
}: {
  node: FileNode;
  depth?: number;
  onSelect: (path: string) => void;
  activeFile: string;
  fileIssues: Record<string, number>;
}) {
  const [expanded, setExpanded] = useState(depth < 2);

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {expanded ? (
            <FolderOpen className="h-3.5 w-3.5 text-zinc-500" />
          ) : (
            <Folder className="h-3.5 w-3.5 text-zinc-500" />
          )}
          <span className="font-medium">{node.name}</span>
        </button>
        <AnimatePresence>
          {expanded && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              {node.children.map((child) => (
                <FileTreeItem
                  key={child.name}
                  node={child}
                  depth={depth + 1}
                  onSelect={onSelect}
                  activeFile={activeFile}
                  fileIssues={fileIssues}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const hasIssues = node.path && fileIssues[node.path];
  return (
    <button
      onClick={() => node.path && onSelect(node.path)}
      className={cn(
        "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors",
        activeFile === node.path
          ? "bg-emerald-500/10 text-emerald-400"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      )}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
    >
      <FileCode2 className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate font-medium">{node.name}</span>
      {hasIssues && (
        <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500/20 px-1 text-[10px] font-bold text-red-400">
          {fileIssues[node.path!]}
        </span>
      )}
    </button>
  );
}

function CodeHighlighter({ content, language }: { content: string; language: string }) {
  return (
    <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
      <code className="font-mono text-zinc-300">
        {content.split("\n").map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-4 inline-block w-8 select-none text-right text-zinc-600">
              {i + 1}
            </span>
            <span className="flex-1">{highlightLine(line, language)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}

const goKeywords = new Set(["package","import","func","type","struct","return","if","else","err","nil","defer","var","const","for","range","interface","map","make","new","error","fmt","log","strings","os","panic","db"]);

function highlightLine(line: string, _language: string) {
  const tokens: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  while (remaining.length > 0) {
    const commentIdx = remaining.indexOf("//");

    let segment = commentIdx >= 0 ? remaining.slice(0, commentIdx) : remaining;
    const comment = commentIdx >= 0 ? remaining.slice(commentIdx) : null;

    const segmentTokens = tokenizeSegment(segment, key);
    key += segmentTokens.length + 1;
    tokens.push(...segmentTokens);

    if (comment) {
      tokens.push(<span key={key++} className="text-zinc-500">{comment}</span>);
    }

    remaining = "";
  }

  return <span>{tokens}</span>;
}

function tokenizeSegment(segment: string, startKey: number): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let key = startKey;
  let rest = segment;

  const pattern = /(["'`])(?:(?!\1|\\).|\\.)*?\1|\b([a-zA-Z_]\w*)\b|(\d+)/g;
  let match: RegExpExecArray | null;
  let lastIdx = 0;

  while ((match = pattern.exec(rest)) !== null) {
    if (match.index > lastIdx) {
      tokens.push(<span key={key++}>{rest.slice(lastIdx, match.index)}</span>);
    }

    if (match[1] !== undefined) {
      tokens.push(<span key={key++} className="text-emerald-400">{match[0]}</span>);
    } else if (match[2] !== undefined) {
      const cls = goKeywords.has(match[2]) ? "text-purple-400" : undefined;
      tokens.push(cls
        ? <span key={key++} className={cls}>{match[0]}</span>
        : <span key={key++}>{match[0]}</span>);
    } else if (match[3] !== undefined) {
      tokens.push(<span key={key++} className="text-cyan-400">{match[0]}</span>);
    }

    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < rest.length) {
    tokens.push(<span key={key++}>{rest.slice(lastIdx)}</span>);
  }

  return tokens;
}

export default function ChallengePage() {
  const hydrated = useHydration();
  const {
    activeFile,
    activeTask,
    sidebarTab,
    setActiveFile,
    setActiveTask,
    setSidebarTab,
    completeTask,
    progress,
  } = useAppStore();
  const { trackChallengeAttempt } = useAnalyticsStore();
  const { currentUser } = useAuthStore();

  const [showSolution, setShowSolution] = useState(false);
  const [expandedHints, setExpandedHints] = useState<number[]>([]);
  const [showIssueDetail, setShowIssueDetail] = useState<string | null>(null);

  const currentFile = getFileByPath(activeFile);
  const currentFileIssues = currentFile ? getIssuesByFile(activeFile) : [];
  const currentTask = activeTask !== null ? tasks.find((t) => t.id === activeTask) : null;

  const fileIssueCounts: Record<string, number> = {};
  goFiles.forEach((f) => {
    const count = getIssuesByFile(f.path).length;
    if (count > 0) fileIssueCounts[f.path] = count;
  });

  const completedCount = progress.completedTasks.length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  if (!hydrated) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
          <span className="text-sm text-zinc-400">Loading challenge...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Navigation */}
      <div className="hidden w-56 shrink-0 border-r border-white/[0.06] bg-[#0c0c12] lg:flex lg:flex-col" data-tour="tour-sidebar">
        <div className="flex border-b border-white/[0.06]">
          {(["tasks", "issues", "learn", "progress"] as const).map((tab) => {
            const icons = { tasks: Target, issues: AlertTriangle, learn: BookOpen, progress: Award };
            const Icon = icons[tab];
            return (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 border-b-2 px-2 py-3 text-[10px] font-medium uppercase tracking-wider transition-colors",
                  sidebarTab === tab
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-zinc-600 hover:text-zinc-400"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {sidebarTab === "tasks" && (
            <div className="space-y-2" data-tour="tour-task-list">
              {/* File Explorer */}
              <div className="rounded-lg border border-white/[0.06] p-2">
                <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                  Files
                </div>
                {fileTree.map((node) => (
                  <FileTreeItem
                    key={node.name}
                    node={node}
                    depth={0}
                    onSelect={setActiveFile}
                    activeFile={activeFile}
                    fileIssues={fileIssueCounts}
                  />
                ))}
              </div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 pt-2">
                Tasks
              </div>
              {tasks.map((task) => {
                const isCompleted = progress.completedTasks.includes(task.id);
                const isActive = activeTask === task.id;
                return (
                  <button
                    key={task.id}
                    data-tour={task.id === 1 ? "tour-first-task" : undefined}
                    onClick={() => {
                      setActiveTask(isActive ? null : task.id);
                      setSidebarTab("tasks");
                    }}
                    className={cn(
                      "w-full rounded-lg p-3 text-left transition-all duration-200",
                      isActive
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "border border-white/[0.06] hover:bg-white/[0.03]",
                      isCompleted && "opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      ) : (
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-zinc-600 text-[10px] font-bold text-zinc-500">
                          {task.id}
                        </div>
                      )}
                      <span className={cn("text-xs font-medium", isCompleted ? "text-zinc-500 line-through" : "text-zinc-200")}>
                        {task.title}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={cn("rounded border px-1.5 py-0.5 text-[10px] font-medium", difficultyColors[task.difficulty])}>
                        {task.difficulty}
                      </span>
                      <span className="text-[10px] text-zinc-600">
                        ~{task.estimatedMinutes}min
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {sidebarTab === "issues" && (
            <div className="space-y-2">
              {issues.map((issue) => {
                const sev = severityConfig[issue.severity];
                return (
                  <button
                    key={issue.id}
                    onClick={() => setShowIssueDetail(showIssueDetail === issue.id ? null : issue.id)}
                    className={cn(
                      "w-full rounded-lg border p-3 text-left transition-all",
                      showIssueDetail === issue.id
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-white/[0.06] hover:bg-white/[0.03]"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", sev.color)} />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-zinc-200">{issue.title}</div>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={cn("rounded border px-1.5 py-0.5 text-[10px] font-bold", sev.bg, sev.color)}>
                            {sev.label}
                          </span>
                          <span className="text-[10px] text-zinc-600">{issue.file}</span>
                        </div>
                      </div>
                    </div>
                    {showIssueDetail === issue.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-3 border-t border-white/[0.06] pt-3"
                      >
                        <p className="text-xs leading-relaxed text-zinc-400">{issue.description}</p>
                        <div className="mt-2 rounded-md bg-red-500/5 p-2">
                          <code className="text-[11px] text-red-400/80">{issue.badCode.split("\n")[0]}</code>
                        </div>
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {sidebarTab === "learn" && (
            <div className="space-y-2">
              {topics.map((topic) => (
                <a
                  key={topic.slug}
                  href={`/learn/${topic.slug}`}
                  className="block rounded-lg border border-white/[0.06] p-3 transition-all hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{topic.icon}</span>
                    <span className="text-xs font-medium text-zinc-200">{topic.title}</span>
                  </div>
                  <p className="mt-1 text-[10px] leading-relaxed text-zinc-500">{topic.summary}</p>
                </a>
              ))}
            </div>
          )}

          {sidebarTab === "progress" && (
            <div className="space-y-4">
              <div className="rounded-lg border border-white/[0.06] p-4">
                <div className="text-xs font-medium text-zinc-400">Overall Progress</div>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-bold text-white">{progressPercent}%</span>
                  <span className="mb-0.5 text-xs text-zinc-600">
                    {completedCount}/{tasks.length} tasks
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-zinc-400">Achievements</div>
                {achievements.map((a) => {
                  const unlocked = progress.achievements.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3",
                        unlocked
                          ? "border-amber-500/20 bg-amber-500/5"
                          : "border-white/[0.06] bg-white/[0.02] opacity-40"
                      )}
                    >
                      <span className="text-xl">{a.icon}</span>
                      <div>
                        <div className="text-xs font-medium text-zinc-200">{a.title}</div>
                        <div className="text-[10px] text-zinc-500">{a.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center - Code Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* File tabs */}
        <div className="flex items-center border-b border-white/[0.06] bg-[#0c0c12]" data-tour="tour-file-tabs">
          <div className="flex overflow-x-auto">
            {goFiles.map((f) => {
              const hasIssue = fileIssueCounts[f.path];
              return (
                <button
                  key={f.path}
                  onClick={() => setActiveFile(f.path)}
                  className={cn(
                    "flex items-center gap-2 border-r border-white/[0.06] px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap",
                    activeFile === f.path
                      ? "bg-[#0a0a0f] text-white"
                      : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
                  )}
                >
                  <FileCode2 className="h-3.5 w-3.5" />
                  {f.name}
                  {hasIssue && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500/20 px-1 text-[10px] font-bold text-red-400">
                      {hasIssue}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code + Issue sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Code */}
          <div className="flex-1 overflow-auto code-block" data-tour="tour-code-viewer">
            {currentFile && (
              <CodeHighlighter
                content={currentFile.content}
                language={currentFile.language}
              />
            )}
          </div>

          {/* File Issues Panel */}
          {currentFileIssues.length > 0 && (
            <div className="w-72 shrink-0 overflow-y-auto border-l border-white/[0.06] bg-[#0c0c12] p-4 hidden md:block" data-tour="tour-issue-panel">
              <div className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Issues in this file ({currentFileIssues.length})
              </div>
              <div className="space-y-2">
                {currentFileIssues.map((issue) => {
                  const sev = severityConfig[issue.severity];
                  return (
                    <div
                      key={issue.id}
                      className={cn("rounded-lg border p-3", sev.bg)}
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", sev.color)} />
                        <div>
                          <div className={cn("text-xs font-medium", sev.color)}>
                            {issue.title}
                          </div>
                          <div className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                            {issue.description.slice(0, 100)}...
                          </div>
                          {issue.line && (
                            <div className="mt-1.5 text-[10px] text-zinc-600">
                              Line {issue.line}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Task Detail */}
      <AnimatePresence>
        {currentTask && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden shrink-0 overflow-hidden border-l border-white/[0.06] bg-[#0c0c12] xl:block"
          >
            <div className="flex h-full w-[380px] flex-col">
              {/* Task Header */}
              <div className="border-b border-white/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      Task {currentTask.id}
                    </span>
                    <span className={cn("rounded border px-2 py-0.5 text-[10px] font-medium", difficultyColors[currentTask.difficulty])}>
                      {currentTask.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTask(null)}
                    className="rounded-md p-1 text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {currentTask.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-400">
                    {currentTask.category}
                  </span>
                  <span className="text-[10px] text-zinc-600">
                    ~{currentTask.estimatedMinutes} min
                  </span>
                </div>
              </div>

              {/* Task Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <div className="text-xs font-medium text-zinc-400">Description</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                    {currentTask.description}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-medium text-zinc-400">Goal</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                    {currentTask.goal}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-medium text-zinc-400">Skills</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {currentTask.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-white/5 border border-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hints */}
                <div data-tour="tour-hints">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium text-zinc-400">
                      <Lightbulb className="mr-1 inline h-3.5 w-3.5" />
                      Hints
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {currentTask.hints.map((hint) => {
                      const revealed = expandedHints.includes(hint.level);
                      return (
                        <div key={hint.level}>
                          {!revealed ? (
                            <button
                              onClick={() =>
                                setExpandedHints([...expandedHints, hint.level])
                              }
                              className="flex w-full items-center gap-2 rounded-lg border border-white/[0.06] p-2.5 text-left transition-all hover:bg-white/[0.03]"
                            >
                              <EyeOff className="h-3.5 w-3.5 text-zinc-600" />
                              <span className="text-[11px] text-zinc-500">
                                Reveal Hint {hint.level}
                              </span>
                            </button>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5"
                            >
                              <div className="flex items-center gap-2">
                                <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                                <span className="text-[10px] font-medium text-amber-400">
                                  Hint {hint.level}
                                </span>
                              </div>
                              <p className="mt-1 text-[11px] leading-relaxed text-zinc-300">
                                {hint.text}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {showSolution ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                    {showSolution ? "Hide Solution" : "Show Solution"}
                  </button>
                  <AnimatePresence>
                    {showSolution && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-2 overflow-hidden rounded-lg bg-[#0d1117] p-3"
                      >
                        <pre className="text-[11px] leading-relaxed text-zinc-300">
                          {currentTask.solution}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Task Footer */}
              <div className="border-t border-white/[0.06] p-4">
                <button
                  onClick={() => {
                    completeTask(currentTask.id);
                    if (currentUser) {
                      trackChallengeAttempt(currentUser.id, currentUser.name, currentTask.id);
                    }
                  }}
                  className={cn(
                    "w-full rounded-lg py-2.5 text-sm font-semibold transition-all",
                    progress.completedTasks.includes(currentTask.id)
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-lg hover:shadow-emerald-500/25"
                  )}
                >
                  {progress.completedTasks.includes(currentTask.id) ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Completed
                    </span>
                  ) : (
                    "Mark as Complete"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Task Overlay */}
      <AnimatePresence>
        {currentTask && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-white/[0.08] bg-[#0c0c12] p-6 xl:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Task {currentTask.id}
                </span>
                <span className={cn("rounded border px-2 py-0.5 text-[10px] font-medium", difficultyColors[currentTask.difficulty])}>
                  {currentTask.difficulty}
                </span>
              </div>
              <button
                onClick={() => setActiveTask(null)}
                className="rounded-md p-1 text-zinc-500 hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h3 className="text-base font-extrabold tracking-tight text-white">{currentTask.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{currentTask.description}</p>
            <div className="mt-4 space-y-2">
              {currentTask.hints.map((hint) => {
                const revealed = expandedHints.includes(hint.level);
                return (
                  <div key={hint.level}>
                    {!revealed ? (
                      <button
                        onClick={() => setExpandedHints([...expandedHints, hint.level])}
                        className="flex w-full items-center gap-2 rounded-lg border border-white/[0.06] p-3 text-left transition-all hover:bg-white/[0.03]"
                      >
                        <EyeOff className="h-3.5 w-3.5 text-zinc-600" />
                        <span className="text-xs text-zinc-500">
                          Reveal Hint {hint.level}
                        </span>
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                          <span className="text-[10px] font-medium text-amber-400">
                            Hint {hint.level}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-300">
                          {hint.text}
                        </p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                completeTask(currentTask.id);
                if (currentUser) {
                  trackChallengeAttempt(currentUser.id, currentUser.name, currentTask.id);
                }
              }}
              className={cn(
                "mt-4 w-full rounded-lg py-3 text-sm font-semibold transition-all",
                progress.completedTasks.includes(currentTask.id)
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black"
              )}
            >
              {progress.completedTasks.includes(currentTask.id) ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Completed
                </span>
              ) : (
                "Mark as Complete"
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
