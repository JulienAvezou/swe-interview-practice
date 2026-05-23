import test from "node:test";
import assert from "node:assert/strict";
import {
  addCompletedCard,
  addQuizResult,
  defaultProgress,
  summarizeProgress,
  touchStudy,
} from "../lib/progressCore.ts";

test("touchStudy starts a streak on first study day", () => {
  const progress = touchStudy(defaultProgress, "2026-05-22");

  assert.equal(progress.lastStudied, "2026-05-22");
  assert.equal(progress.streakCount, 1);
});

test("touchStudy increments streak on consecutive days", () => {
  const progress = touchStudy(
    { ...defaultProgress, lastStudied: "2026-05-21", streakCount: 3 },
    "2026-05-22",
  );

  assert.equal(progress.streakCount, 4);
});

test("addCompletedCard does not duplicate completed ids", () => {
  const first = addCompletedCard(defaultProgress, "dsa:binary-search", "2026-05-22");
  const second = addCompletedCard(first, "dsa:binary-search", "2026-05-22");

  assert.deepEqual(second.completedCards, ["dsa:binary-search"]);
});

test("addQuizResult tracks accuracy and weak areas", () => {
  const first = addQuizResult(
    defaultProgress,
    "Pattern Quiz",
    false,
    ["Sliding Window"],
    "2026-05-22",
  );
  const second = addQuizResult(first, "Pattern Quiz", true, [], "2026-05-22");
  const summary = summarizeProgress(second);

  assert.deepEqual(second.quizStats["Pattern Quiz"], { correct: 1, total: 2 });
  assert.deepEqual(summary.weakAreas, [["Sliding Window", 1]]);
  assert.equal(summary.accuracy, 50);
});
