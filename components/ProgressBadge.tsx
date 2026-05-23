"use client";

import { useProgress } from "@/lib/progress";

export function ProgressBadge() {
  const { summary } = useProgress();

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      <div className="rounded-lg border-2 border-[#46a302] bg-white p-4 shadow-[0_5px_0_#46a302]">
        <div className="text-3xl font-black text-[#46a302]">{summary.completedCount}</div>
        <div className="text-sm font-bold text-slate-700">Cards completed</div>
      </div>
      <div className="rounded-lg border-2 border-[#1592cc] bg-white p-4 shadow-[0_5px_0_#1592cc]">
        <div className="text-3xl font-black text-lagoon">{summary.accuracy}%</div>
        <div className="text-sm font-bold text-slate-700">Quiz accuracy</div>
      </div>
      <div className="rounded-lg border-2 border-[#e7c531] bg-white p-4 shadow-[0_5px_0_#e7c531]">
        <div className="text-3xl font-black text-[#b88700]">{summary.quizTotal}</div>
        <div className="text-sm font-bold text-slate-700">Quiz attempts</div>
      </div>
      <div className="rounded-lg border-2 border-[#e24d4d] bg-white p-4 shadow-[0_5px_0_#e24d4d]">
        <div className="text-3xl font-black text-coral">{summary.streakCount}</div>
        <div className="text-sm font-bold text-slate-700">Study streak</div>
      </div>
    </div>
  );
}
