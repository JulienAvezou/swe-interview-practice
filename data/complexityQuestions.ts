import type { ComplexityQuestion } from "./types";

export const complexityQuestions: ComplexityQuestion[] = [
  {
    id: "single-loop",
    title: "Single Loop",
    snippet: `let total = 0;
for (const num of nums) {
  total += num;
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(1)",
    explanation: "The loop touches each element once and only stores one running total.",
  },
  {
    id: "nested-loop",
    title: "Nested Loop",
    snippet: `for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < nums.length; j++) {
    pairs.push([nums[i], nums[j]]);
  }
}`,
    timeAnswer: "O(n^2)",
    spaceAnswer: "O(n^2)",
    explanation: "Every element is paired with every element, and the output stores all pairs.",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    snippet: `while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}`,
    timeAnswer: "O(log n)",
    spaceAnswer: "O(1)",
    explanation: "Each iteration cuts the search space in half and uses a constant number of variables.",
  },
  {
    id: "hash-map",
    title: "Hash Map Lookup",
    snippet: `const seen = new Set();
for (const value of nums) {
  if (seen.has(value)) return true;
  seen.add(value);
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(n)",
    explanation: "The scan is linear and the set may store every value.",
  },
  {
    id: "tree-recursion",
    title: "Tree Traversal",
    snippet: `function count(root) {
  if (!root) return 0;
  return 1 + count(root.left) + count(root.right);
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(n)",
    explanation: "Every node is visited once. The call stack can be O(n) for a skewed tree.",
  },
  {
    id: "sorting",
    title: "Sorting",
    snippet: `nums.sort((a, b) => a - b);
return nums[0];`,
    timeAnswer: "O(n log n)",
    spaceAnswer: "O(1)",
    explanation: "Comparison sorting dominates the work. Extra space depends on implementation, but O(1) is a common interview simplification for in-place sort.",
  },
  {
    id: "graph-bfs",
    title: "BFS / DFS",
    snippet: `while (queue.length) {
  const node = queue.shift();
  for (const next of graph.get(node) ?? []) {
    if (!seen.has(next)) queue.push(next);
  }
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(n)",
    explanation: "In graph terms this is O(V + E). With n as total graph size, both traversal work and visited storage are linear.",
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    snippet: `for (let right = 0; right < s.length; right++) {
  while (invalid()) {
    left++;
  }
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(1)",
    explanation: "Although there is a nested while loop, left and right each move forward at most n times.",
  },
];
