export type ProgressState = {
  completedCards: string[];
  quizStats: Record<string, { correct: number; total: number }>;
  weakAreas: Record<string, number>;
  lastStudied: string | null;
  streakCount: number;
};

export const defaultProgress: ProgressState = {
  completedCards: [],
  quizStats: {},
  weakAreas: {},
  lastStudied: null,
  streakCount: 0,
};

export function nextDayKey(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function touchStudy(progress: ProgressState, today: string): ProgressState {
  if (progress.lastStudied === today) return progress;

  const continuesStreak =
    progress.lastStudied !== null && nextDayKey(progress.lastStudied) === today;

  return {
    ...progress,
    lastStudied: today,
    streakCount: continuesStreak ? progress.streakCount + 1 : 1,
  };
}

export function addCompletedCard(
  progress: ProgressState,
  id: string,
  today: string,
) {
  const touched = touchStudy(progress, today);
  if (touched.completedCards.includes(id)) return touched;

  return {
    ...touched,
    completedCards: [...touched.completedCards, id],
  };
}

export function addQuizResult(
  progress: ProgressState,
  mode: string,
  correct: boolean,
  weakAreas: string[],
  today: string,
) {
  const touched = touchStudy(progress, today);
  const stat = touched.quizStats[mode] ?? { correct: 0, total: 0 };
  const nextWeakAreas = { ...touched.weakAreas };

  if (!correct) {
    for (const area of weakAreas) {
      nextWeakAreas[area] = (nextWeakAreas[area] ?? 0) + 1;
    }
  }

  return {
    ...touched,
    quizStats: {
      ...touched.quizStats,
      [mode]: {
        correct: stat.correct + (correct ? 1 : 0),
        total: stat.total + 1,
      },
    },
    weakAreas: nextWeakAreas,
  };
}

export function summarizeProgress(progress: ProgressState) {
  const totals = Object.values(progress.quizStats).reduce(
    (acc, stat) => ({
      correct: acc.correct + stat.correct,
      total: acc.total + stat.total,
    }),
    { correct: 0, total: 0 },
  );

  const accuracy =
    totals.total === 0 ? 0 : Math.round((totals.correct / totals.total) * 100);

  return {
    completedCount: progress.completedCards.length,
    accuracy,
    quizTotal: totals.total,
    weakAreas: Object.entries(progress.weakAreas)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
    streakCount: progress.streakCount,
    lastStudied: progress.lastStudied,
  };
}
