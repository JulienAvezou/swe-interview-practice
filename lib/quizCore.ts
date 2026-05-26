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

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function shuffleOptions<T>(options: T[], seed: string) {
  return options
    .map((option, index) => ({
      option,
      index,
      rank: hashString(`${seed}:${String(option)}`),
    }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map(({ option }) => option);
}
