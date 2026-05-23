import type { CodeTemplate } from "../data/types";

type BlankChunk = Extract<CodeTemplate["chunks"][number], { type: "blank" }>;

export function normalizeTemplateAnswer(value: string) {
  return value.replace(/\s+/g, "").replace(/;$/, "").toLowerCase();
}

export function getAcceptedBlankAnswers(blank: BlankChunk) {
  return [blank.answer, ...(blank.acceptedAnswers ?? [])];
}

export function isBlankAnswerCorrect(value: string, blank: BlankChunk) {
  const normalizedValue = normalizeTemplateAnswer(value);

  return getAcceptedBlankAnswers(blank).some(
    (answer) => normalizeTemplateAnswer(answer) === normalizedValue,
  );
}
