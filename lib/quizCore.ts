export function normalizeQuizAnswer(value: string) {
  return value.trim().toLowerCase();
}

export function sameAnswers(selected: string[], correct: string[]) {
  const selectedSet = new Set(selected.map(normalizeQuizAnswer));
  const correctSet = new Set(correct.map(normalizeQuizAnswer));

  if (selectedSet.size !== correctSet.size) return false;

  for (const answer of correctSet) {
    if (!selectedSet.has(answer)) return false;
  }

  return true;
}
