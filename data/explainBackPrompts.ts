import type { ExplainBackPrompt } from "./types";

export const explainBackPrompts: ExplainBackPrompt[] = [
  {
    id: "bfs-vs-dfs",
    prompt: "Explain when to use BFS over DFS.",
    modelAnswer: "Use BFS when the problem is about levels, nearest items, or shortest paths in an unweighted graph. BFS explores all nodes at distance 1 before distance 2, so the first time it reaches a target is the minimum number of steps.",
    checklist: ["Mentions level-by-level traversal", "Mentions shortest path in unweighted graphs", "Contrasts with DFS exploring deep paths first"],
  },
  {
    id: "sliding-window",
    prompt: "Explain sliding window in simple terms.",
    modelAnswer: "Sliding window keeps a contiguous range and updates it as the right side expands and the left side shrinks. It works when the prompt asks about subarrays or substrings and the window validity can be maintained incrementally.",
    checklist: ["Mentions contiguous range", "Mentions moving left and right boundaries", "Mentions avoiding recomputing every subarray"],
  },
  {
    id: "binary-search-log",
    prompt: "Explain why binary search is O(log n).",
    modelAnswer: "Binary search is O(log n) because each comparison cuts the remaining search space in half. The number of times you can halve n before reaching one item is logarithmic.",
    checklist: ["Mentions halving", "Mentions sorted or monotonic search space", "Explains number of iterations"],
  },
  {
    id: "fanout",
    prompt: "Explain fan-out-on-write vs fan-out-on-read.",
    modelAnswer: "Fan-out-on-write precomputes followers' feeds when a post is created, making reads fast but writes expensive for high-follower users. Fan-out-on-read builds the feed when requested, making writes cheap but reads slower. Many real systems use a hybrid.",
    checklist: ["Explains write-time feed materialization", "Explains read-time feed generation", "Mentions celebrity or high-follower bottleneck", "Mentions hybrid option"],
  },
  {
    id: "cache-invalidation",
    prompt: "Explain why caches introduce invalidation problems.",
    modelAnswer: "A cache stores a copy of data outside the source of truth. When the original data changes, the cached copy may become stale unless it is updated, evicted, or allowed to expire with a TTL.",
    checklist: ["Identifies source of truth vs copy", "Mentions stale data", "Mentions TTL, eviction, or update strategy"],
  },
];
