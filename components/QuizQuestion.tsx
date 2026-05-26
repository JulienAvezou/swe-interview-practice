"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion as QuizQuestionType } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { sameAnswers, shuffleOptions } from "@/lib/quizCore";
import { Card } from "./Card";

type QuizQuestionProps = {
  questions: QuizQuestionType[];
  mode: string;
  multiSelect?: boolean;
};

export function QuizQuestion({ questions, mode, multiSelect = true }: QuizQuestionProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { recordQuizResult } = useProgress();
  const question = questions[index];
  const isCorrect = sameAnswers(selected, question.correctAnswers);
  const options = useMemo(
    () => shuffleOptions(question.options, `${mode}:${question.id}`),
    [mode, question.id, question.options],
  );

  function toggle(option: string) {
    if (submitted) return;
    setSelected((current) => {
      if (!multiSelect) return [option];
      return current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
    });
  }

  function submit() {
    if (!selected.length || submitted) return;
    setSubmitted(true);
    recordQuizResult(mode, isCorrect, question.correctAnswers);
  }

  function move(delta: number) {
    setIndex((current) => (current + delta + questions.length) % questions.length);
    setSelected([]);
    setSubmitted(false);
  }

  return (
    <Card>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-slate-600">
          <span>
            Question {index + 1} of {questions.length}
          </span>
          <span>{multiSelect ? "Choose all that apply" : "Choose one"}</span>
        </div>
        <h2 className="text-xl font-black leading-snug text-slate-950">
          {question.prompt}
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const checked = selected.includes(option);
            const correct = question.correctAnswers.includes(option);
            const resultStyle = submitted
              ? correct
                ? "border-emerald-400 bg-emerald-400/10"
                : checked
                  ? "border-rose-400 bg-rose-400/10"
                  : "border-line bg-white"
              : checked
                ? "border-accent bg-accent/10"
                : "border-line bg-white hover:border-accent";

            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className={`rounded-lg border-2 p-4 text-left text-sm font-bold shadow-[0_3px_0_#d7e7df] transition ${resultStyle}`}
              >
                <span className="font-medium text-slate-950">{option}</span>
              </button>
            );
          })}
        </div>

        {submitted ? (
          <div className="rounded-lg border-2 border-line bg-[#f7fff0] p-4 text-sm font-medium leading-6 text-slate-700">
            <p className={isCorrect ? "font-black text-[#46a302]" : "font-black text-coral"}>
              {isCorrect ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-slate-950">Answer:</span>{" "}
              {question.correctAnswers.join(" + ")}
            </p>
            <p className="mt-2">{question.explanation}</p>
            {question.signals?.length ? (
              <p className="mt-2 text-slate-600">
                Signals: {question.signals.join(", ")}
              </p>
            ) : null}
            {question.relatedProblems?.length ? (
              <p className="mt-2 text-slate-600">
                Related: {question.relatedProblems.join(", ")}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={!selected.length || submitted}
            className="rounded-md border-2 border-[#46a302] bg-accent px-4 py-2 text-sm font-black text-white shadow-[0_4px_0_#46a302] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => move(-1)}
            className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
          >
            Previous question
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
          >
            Next question
          </button>
        </div>
      </div>
    </Card>
  );
}
