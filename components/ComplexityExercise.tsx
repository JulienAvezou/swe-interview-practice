"use client";

import { useState } from "react";
import type { ComplexityQuestion } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { Card } from "./Card";

const options = ["O(1)", "O(log n)", "O(n)", "O(n log n)", "O(n^2)", "O(2^n)"];

type ComplexityExerciseProps = {
  questions: ComplexityQuestion[];
};

export function ComplexityExercise({ questions }: ComplexityExerciseProps) {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState("");
  const [space, setSpace] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { recordQuizResult } = useProgress();
  const question = questions[index];
  const correct = time === question.timeAnswer && space === question.spaceAnswer;

  function submit() {
    if (!time || !space || submitted) return;
    setSubmitted(true);
    recordQuizResult("Complexity Quiz", correct, [question.title]);
  }

  function move(delta: number) {
    setIndex((current) => (current + delta + questions.length) % questions.length);
    setTime("");
    setSpace("");
    setSubmitted(false);
  }

  function optionButton(label: string, value: string, setter: (value: string) => void) {
    const selected = value === label;
    return (
      <button
        key={label}
        type="button"
        onClick={() => !submitted && setter(label)}
        className={`rounded-md border-2 px-3 py-2 text-sm font-bold shadow-[0_3px_0_#d7e7df] transition ${
          selected ? "border-accent bg-accent/10 text-slate-950" : "border-line bg-white text-slate-700 hover:border-accent"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <Card>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-black text-slate-950">{question.title}</h2>
          <span className="text-sm font-bold text-slate-600">
            {index + 1} / {questions.length}
          </span>
        </div>
        <pre className="overflow-x-auto rounded-lg border-2 border-[#0d1820] bg-ink p-4 text-sm leading-7 text-slate-100 shadow-[0_5px_0_#0d1820]">
          {question.snippet}
        </pre>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-black text-slate-700">Time complexity</p>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => optionButton(option, time, setTime))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-black text-slate-700">Space complexity</p>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => optionButton(option, space, setSpace))}
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-lg border-2 border-line bg-[#f7fff0] p-4 text-sm font-medium leading-6">
            <p className={correct ? "font-black text-[#46a302]" : "font-black text-coral"}>
              {correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2 text-slate-700">
              Time: <code className="text-accent">{question.timeAnswer}</code>,
              Space: <code className="text-accent"> {question.spaceAnswer}</code>
            </p>
            <p className="mt-2 text-slate-600">{question.explanation}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={!time || !space || submitted}
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
