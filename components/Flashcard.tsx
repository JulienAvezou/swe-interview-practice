"use client";

import { useMemo, useState } from "react";
import { useProgress } from "@/lib/progress";
import { Card } from "./Card";

type FlashcardItem = {
  id: string;
  front: string;
  back: React.ReactNode;
  tag?: string;
};

type FlashcardProps = {
  items: FlashcardItem[];
  progressPrefix: string;
};

export function Flashcard({ items, progressPrefix }: FlashcardProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { markCompleted, progress } = useProgress();
  const item = items[index];
  const completedId = `${progressPrefix}:${item.id}`;

  const completed = useMemo(
    () => progress.completedCards.includes(completedId),
    [completedId, progress.completedCards],
  );

  function next(delta: number) {
    setIndex((current) => (current + delta + items.length) % items.length);
    setRevealed(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-slate-600">
        <span>
          Card {index + 1} of {items.length}
        </span>
        {item.tag ? (
          <span className="rounded-md border-2 border-[#1592cc] bg-lagoon px-2 py-1 text-white shadow-[0_3px_0_#1592cc]">
            {item.tag}
          </span>
        ) : null}
      </div>

      <Card className="min-h-[24rem]">
        <div className="flex min-h-[20rem] flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {revealed ? "Answer" : "Prompt"}
            </p>
            <div className="mt-4 text-2xl font-black leading-snug text-slate-950">
              {item.front}
            </div>
            {revealed ? (
              <div className="mt-6 text-sm font-medium leading-6 text-slate-700">{item.back}</div>
            ) : (
              <p className="mt-6 text-sm font-medium leading-6 text-slate-600">
                Recall the signals, template shape, complexity, and how you would
                explain it out loud before revealing.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setRevealed((value) => !value)}
              className="rounded-md border-2 border-[#46a302] bg-accent px-4 py-2 text-sm font-black text-white shadow-[0_4px_0_#46a302] transition hover:-translate-y-0.5"
            >
              {revealed ? "Hide answer" : "Reveal answer"}
            </button>
            <button
              type="button"
              onClick={() => markCompleted(completedId)}
              className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
            >
              {completed ? "Completed" : "Mark complete"}
            </button>
            <button
              type="button"
              onClick={() => next(-1)}
              className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => next(1)}
              className="rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-[0_3px_0_#d7e7df] transition hover:border-accent"
            >
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
