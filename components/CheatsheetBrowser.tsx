"use client";

import { useState } from "react";
import type { SystemDesignCheatsheet } from "@/data/types";
import { Card } from "./Card";

type CheatsheetBrowserProps = {
  cheatsheets: SystemDesignCheatsheet[];
};

const sections: Array<[keyof SystemDesignCheatsheet, string]> = [
  ["functionalRequirements", "Functional Requirements"],
  ["nonFunctionalRequirements", "Non-Functional Requirements"],
  ["coreEntities", "Core Entities"],
  ["apiSketch", "API Sketch"],
  ["architecture", "High-Level Architecture"],
  ["databaseChoices", "Database Choices"],
  ["cachingStrategy", "Caching Strategy"],
  ["queuesEvents", "Queues / Events"],
  ["scalingBottlenecks", "Scaling Bottlenecks"],
  ["tradeoffs", "Tradeoffs"],
  ["failureModes", "Failure Modes"],
  ["talkingPoints", "Interview Talking Points"],
];

export function CheatsheetBrowser({ cheatsheets }: CheatsheetBrowserProps) {
  const [selectedId, setSelectedId] = useState(cheatsheets[0].id);
  const selected = cheatsheets.find((sheet) => sheet.id === selectedId) ?? cheatsheets[0];

  return (
    <div className="grid gap-5 lg:grid-cols-[18rem_1fr]">
      <Card className="h-fit">
        <div className="grid gap-2">
          {cheatsheets.map((sheet) => (
            <button
              key={sheet.id}
              type="button"
              onClick={() => setSelectedId(sheet.id)}
              className={`rounded-md border-2 px-3 py-2 text-left text-sm font-bold transition ${
                selected.id === sheet.id
                  ? "border-[#46a302] bg-accent text-white shadow-[0_4px_0_#46a302]"
                  : "border-line bg-white text-slate-700 shadow-[0_3px_0_#d7e7df] hover:border-accent"
              }`}
            >
              {sheet.title}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-950">{selected.title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{selected.summary}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map(([key, label]) => {
              const values = selected[key];
              if (!Array.isArray(values)) return null;
              return (
                <section key={key} className="rounded-lg border-2 border-line bg-[#f7fff0] p-4">
                  <h3 className="text-sm font-black text-slate-950">{label}</h3>
                  <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-slate-700">
                    {values.map((value) => (
                      <li key={value} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
