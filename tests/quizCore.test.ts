import test from "node:test";
import assert from "node:assert/strict";
import { sameAnswers, shuffleOptions } from "../lib/quizCore.ts";
import { isBlankAnswerCorrect } from "../lib/codeTemplateCore.ts";

test("sameAnswers accepts the same answers in any order", () => {
  assert.equal(
    sameAnswers(["Hash Map / Hash Set", "Sliding Window"], [
      "Sliding Window",
      "Hash Map / Hash Set",
    ]),
    true,
  );
});

test("sameAnswers ignores case and surrounding whitespace", () => {
  assert.equal(sameAnswers([" sliding window "], ["Sliding Window"]), true);
});

test("sameAnswers rejects missing or extra answers", () => {
  assert.equal(sameAnswers(["Sliding Window"], ["Sliding Window", "Hash Map"]), false);
  assert.equal(sameAnswers(["Sliding Window", "BFS"], ["Sliding Window"]), false);
});

test("template blanks accept alternate normalized answers", () => {
  assert.equal(
    isBlankAnswerCorrect("left += 1;", {
      type: "blank",
      answer: "left++",
      acceptedAnswers: ["left += 1", "left = left + 1"],
    }),
    true,
  );
});

test("shuffleOptions keeps the same options while changing deterministic order", () => {
  const options = ["Correct", "Distractor A", "Distractor B", "Distractor C"];
  const shuffled = shuffleOptions(options, "system-design:fanout-write");

  assert.deepEqual([...shuffled].sort(), [...options].sort());
  assert.notDeepEqual(shuffled, options);
  assert.deepEqual(shuffled, shuffleOptions(options, "system-design:fanout-write"));
});
