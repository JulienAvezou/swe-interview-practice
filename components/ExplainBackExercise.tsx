"use client";

import { useState } from "react";
import type { ExplainBackPrompt } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { Card } from "./Card";

type ExplainBackExerciseProps = {
  prompts: ExplainBackPrompt[];
};

export function ExplainBackExercise({ prompts }: ExplainBackExerciseProps) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { markCompleted } = useProgress();
  const prompt = prompts[index];

  function submit() {
    setSubmitted(true);
    markCompleted(`explain:${prompt.id}`);
  }

  function next() {
    setIndex((current) => (current + 1) % prompts.length);
    setAnswer("");
    setSubmitted(false);
  }

  return (
    <Card>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-slate-600">
          <span>Prompt {index + 1} of {prompts.length}</span>
          <span>Explanation practice</span>
        </div>
        <h2 className="text-xl font-black text-slate-950">{prompt.prompt}</h2>
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          rows={8}
          className="w-full rounded-lg border-2 border-line bg-white p-4 text-sm font-medium leading-6 text-slate-800 shadow-[0_4px_0_#d7e7df] outline-none transition placeholder:text-slate-400 focus:border-accent"
          placeholder="Write the explanation you would say in an interview..."
        />

        {submitted ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-lg border-2 border-line bg-[#f7fff0] p-4">
              <h3 className="text-sm font-black text-slate-950">Model answer</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-700">{prompt.modelAnswer}</p>
            </section>
            <section className="rounded-lg border-2 border-line bg-[#fff9df] p-4">
              <h3 className="text-sm font-black text-slate-950">Checklist</h3>
              <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-700">
                {prompt.checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={!answer.trim() || submitted}
            className="rounded-md border-2 border-[#46a302] bg-accent px-4 py-2 text-sm font-black text-white shadow-[0_4px_0_#46a302] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Show model answer
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
          >
            Next prompt
          </button>
        </div>
      </div>
    </Card>
  );
}
