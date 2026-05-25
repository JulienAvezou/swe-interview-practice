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
  {
    id: "hash-map-vs-nested-loop",
    prompt: "Explain why a hash map can improve Two Sum from O(n^2) to O(n).",
    modelAnswer: "The nested-loop approach checks every pair. A hash map remembers numbers already seen, so for each value we only ask whether its complement exists. That makes one pass over the array with average constant-time lookups.",
    checklist: ["Mentions complement lookup", "Mentions one pass", "Contrasts with checking every pair", "States O(n) average time"],
  },
  {
    id: "topological-sort",
    prompt: "Explain when a problem is asking for topological sort.",
    modelAnswer: "Topological sort fits when items have prerequisites or directed dependencies and we need a valid order. If there is a cycle, no valid order exists because at least one item depends on itself indirectly.",
    checklist: ["Mentions directed dependencies", "Mentions valid ordering", "Mentions cycle detection", "Gives prerequisite example"],
  },
  {
    id: "sql-vs-nosql",
    prompt: "Explain how you would choose SQL vs NoSQL in a system design interview.",
    modelAnswer: "I would start from access patterns and correctness requirements. SQL is usually better for relational data, transactions, constraints, and joins. NoSQL can be better for flexible schema, high write volume, simple key-based access, and horizontal partitioning. The choice should connect to consistency, scale, and query needs.",
    checklist: ["Mentions access patterns", "Mentions transactions or joins for SQL", "Mentions scale or flexible schema for NoSQL", "Avoids saying one is always better"],
  },
  {
    id: "queue-benefits",
    prompt: "Explain why queues are useful in system design.",
    modelAnswer: "Queues decouple producers from workers. They keep slow or retryable work out of the request path, absorb traffic spikes, and let workers process jobs at their own rate. The tradeoffs are added latency, retry semantics, and duplicate handling.",
    checklist: ["Mentions decoupling", "Mentions async or retryable work", "Mentions spike absorption", "Mentions duplicate or retry handling"],
  },
  {
    id: "idempotency",
    prompt: "Explain idempotency in plain English and why it matters.",
    modelAnswer: "An idempotent operation can be retried without changing the final result beyond the first successful attempt. It matters because networks fail and clients retry. Idempotency keys help prevent duplicate payments, bookings, or side effects.",
    checklist: ["Defines same final result after retries", "Mentions network failure or retries", "Mentions idempotency keys", "Gives payment or booking example"],
  },
];
