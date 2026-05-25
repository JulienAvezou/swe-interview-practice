"use client";

import { useMemo, useState } from "react";
import type { CodeTemplate } from "@/data/types";
import { getAcceptedBlankAnswers, isBlankAnswerCorrect } from "@/lib/codeTemplateCore";
import { useProgress } from "@/lib/progress";
import { Card } from "./Card";

type CodeTemplateExerciseProps = {
  templates: CodeTemplate[];
};

export function CodeTemplateExercise({ templates }: CodeTemplateExerciseProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { recordQuizResult } = useProgress();
  const template = templates[index];

  const blanks = useMemo(
    () => template.chunks.filter((chunk) => chunk.type === "blank"),
    [template],
  );

  const chunksWithIndexes = useMemo(() => {
    return template.chunks.map((chunk, chunkIndex) => {
      if (chunk.type === "text") {
        return { chunk, chunkIndex, blankIndex: null };
      }

      const blankIndex =
        template.chunks
          .slice(0, chunkIndex + 1)
          .filter((item) => item.type === "blank").length - 1;

      return { chunk, chunkIndex, blankIndex };
    });
  }, [template]);

  const allCorrect = blanks.every(
    (blank, blankIndex) =>
      isBlankAnswerCorrect(answers[blankIndex] ?? "", blank),
  );

  function submit() {
    setSubmitted(true);
    recordQuizResult("Code Template Fill-in", allCorrect, [template.pattern]);
  }

  function move(delta: number) {
    setIndex((current) => (current + delta + templates.length) % templates.length);
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <Card>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-accent">{template.pattern}</p>
            <h2 className="text-xl font-black text-slate-950">{template.title}</h2>
          </div>
          <span className="rounded-md border-2 border-[#1592cc] bg-lagoon px-2 py-1 text-xs font-black text-white shadow-[0_3px_0_#1592cc]">
            {index + 1} / {templates.length}
          </span>
        </div>

        <pre className="overflow-x-auto rounded-lg border-2 border-[#0d1820] bg-ink p-4 text-sm leading-7 text-slate-100 shadow-[0_5px_0_#0d1820]">
          {chunksWithIndexes.map(({ chunk, chunkIndex, blankIndex }) => {
            if (chunk.type === "text") return chunk.value;
            const currentBlank = blankIndex ?? 0;
            const value = answers[currentBlank] ?? "";
            const isCorrect = isBlankAnswerCorrect(value, chunk);
            return (
              <input
                key={`${template.id}-${chunkIndex}`}
                value={value}
                onChange={(event) =>
                  setAnswers((current) => ({
                    ...current,
                    [currentBlank]: event.target.value,
                  }))
                }
                disabled={submitted}
                aria-label={`Blank ${currentBlank + 1}`}
                className={`mx-1 inline-block w-36 rounded border-2 bg-white px-2 py-1 font-black text-[#46a302] outline-none focus:border-accent ${
                  submitted
                    ? isCorrect
                      ? "border-emerald-400"
                      : "border-rose-400"
                    : "border-line"
                }`}
              />
            );
          })}
        </pre>

        {submitted ? (
          <div className="rounded-lg border-2 border-line bg-[#f7fff0] p-4 text-sm font-medium leading-6">
            <p className={allCorrect ? "text-emerald-300" : "text-rose-300"}>
              {allCorrect ? "All blanks correct" : "Review the highlighted blanks"}
            </p>
            <p className="mt-2 text-slate-700">{template.explanation}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {blanks.map((blank, answerIndex) => (
                <div key={`${template.id}-answer-${answerIndex}`} className="text-slate-600">
                  Blank {answerIndex + 1}:{" "}
                  <code className="text-accent">
                    {getAcceptedBlankAnswers(blank).join(" or ")}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            className="rounded-md border-2 border-[#46a302] bg-accent px-4 py-2 text-sm font-black text-white shadow-[0_4px_0_#46a302] transition hover:-translate-y-0.5"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => move(-1)}
            className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
          >
            Previous template
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
          >
            Next template
          </button>
        </div>
      </div>
    </Card>
  );
}
