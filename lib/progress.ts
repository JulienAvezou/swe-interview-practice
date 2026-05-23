"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addCompletedCard,
  addQuizResult,
  defaultProgress,
  summarizeProgress,
  type ProgressState,
} from "./progressCore";

const STORAGE_KEY = "interview-pattern-trainer-progress";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) saveProgress(progress);
  }, [isReady, progress]);

  const summary = useMemo(() => summarizeProgress(progress), [progress]);

  function markCompleted(id: string) {
    setProgress((current) => addCompletedCard(current, id, todayKey()));
  }

  function recordQuizResult(mode: string, correct: boolean, weakAreas: string[] = []) {
    setProgress((current) =>
      addQuizResult(current, mode, correct, weakAreas, todayKey()),
    );
  }

  return {
    progress,
    summary,
    isReady,
    markCompleted,
    recordQuizResult,
  };
}
