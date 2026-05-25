import type { CodeTemplate } from "./types";

export const codeTemplates: CodeTemplate[] = [
  {
    id: "binary-search",
    title: "Binary Search",
    pattern: "Binary Search",
    language: "javascript",
    chunks: [
      { type: "text", value: "function binarySearch(nums, target) {\n  let left = 0;\n  let right = nums.length - 1;\n\n  while (" },
      { type: "blank", answer: "left" },
      { type: "text", value: " <= " },
      { type: "blank", answer: "right" },
      { type: "text", value: ") {\n    const mid = Math.floor((left + right) / 2);\n\n    if (nums[mid] === target) return mid;\n\n    if (nums[mid] < target) {\n      " },
      { type: "blank", answer: "left" },
      { type: "text", value: " = mid + 1;\n    } else {\n      " },
      { type: "blank", answer: "right" },
      { type: "text", value: " = mid - 1;\n    }\n  }\n\n  return -1;\n}" },
    ],
    explanation: "The loop keeps the target inside [left, right]. Each comparison removes half the remaining array.",
  },
  {
    id: "bfs",
    title: "BFS Queue",
    pattern: "BFS",
    language: "javascript",
    chunks: [
      { type: "text", value: "function bfs(start, getNeighbors) {\n  const queue = [" },
      { type: "blank", answer: "start" },
      { type: "text", value: "];\n  const seen = new Set([" },
      { type: "blank", answer: "start" },
      { type: "text", value: "]);\n\n  while (queue.length) {\n    const node = queue." },
      { type: "blank", answer: "shift()", acceptedAnswers: ["shift(0)"] },
      { type: "text", value: ";\n    for (const next of getNeighbors(node)) {\n      if (seen.has(next)) continue;\n      seen.add(next);\n      queue." },
      { type: "blank", answer: "push(next)", acceptedAnswers: ["push(...[next])"] },
      { type: "text", value: ";\n    }\n  }\n}" },
    ],
    explanation: "BFS uses a queue so nodes are processed in the same order they are discovered.",
  },
  {
    id: "dfs",
    title: "Recursive DFS",
    pattern: "DFS",
    language: "javascript",
    chunks: [
      { type: "text", value: "function dfs(node, seen, getNeighbors) {\n  if (" },
      { type: "blank", answer: "seen.has(node)", acceptedAnswers: ["seen.has(node) === true"] },
      { type: "text", value: ") return;\n  seen." },
      { type: "blank", answer: "add(node)" },
      { type: "text", value: ";\n\n  for (const next of getNeighbors(node)) {\n    " },
      { type: "blank", answer: "dfs(next, seen, getNeighbors)" },
      { type: "text", value: ";\n  }\n}" },
    ],
    explanation: "DFS marks each node before recursively exploring neighbors to avoid cycles.",
  },
  {
    id: "two-sum",
    title: "Two Sum with Hash Map",
    pattern: "Hash Map / Hash Set",
    language: "javascript",
    chunks: [
      { type: "text", value: "function twoSum(nums, target) {\n  const seen = new " },
      { type: "blank", answer: "Map()", acceptedAnswers: ["Map"] },
      { type: "text", value: ";\n\n  for (let i = 0; i < nums.length; i++) {\n    const need = " },
      { type: "blank", answer: "target - nums[i]", acceptedAnswers: ["target-nums[i]"] },
      { type: "text", value: ";\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(" },
      { type: "blank", answer: "nums[i]" },
      { type: "text", value: ", " },
      { type: "blank", answer: "i" },
      { type: "text", value: ");\n  }\n\n  return [];\n}" },
    ],
    explanation: "Store previous numbers and indexes so each current number can look up its missing complement.",
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    pattern: "Sliding Window",
    language: "javascript",
    chunks: [
      { type: "text", value: "function longestUnique(s) {\n  const seen = new Set();\n  let left = 0;\n  let best = 0;\n\n  for (let right = 0; right < s.length; right++) {\n    while (seen.has(s[right])) {\n      seen.delete(s[" },
      { type: "blank", answer: "left" },
      { type: "text", value: "]);\n      " },
      { type: "blank", answer: "left++", acceptedAnswers: ["left += 1", "left = left + 1"] },
      { type: "text", value: ";\n    }\n    seen.add(s[right]);\n    best = Math.max(best, " },
      { type: "blank", answer: "right - left + 1", acceptedAnswers: ["right-left+1"] },
      { type: "text", value: ");\n  }\n\n  return best;\n}" },
    ],
    explanation: "Expand with right, shrink with left until the window becomes valid again.",
  },
  {
    id: "reverse-list",
    title: "Reverse Linked List",
    pattern: "Linked List Pointer Manipulation",
    language: "javascript",
    chunks: [
      { type: "text", value: "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n\n  while (curr) {\n    const next = " },
      { type: "blank", answer: "curr.next", acceptedAnswers: ["curr?.next"] },
      { type: "text", value: ";\n    curr.next = " },
      { type: "blank", answer: "prev" },
      { type: "text", value: ";\n    prev = " },
      { type: "blank", answer: "curr" },
      { type: "text", value: ";\n    curr = " },
      { type: "blank", answer: "next" },
      { type: "text", value: ";\n  }\n\n  return prev;\n}" },
    ],
    explanation: "Save next before rewiring curr.next, then advance both pointers.",
  },
  {
    id: "tree-dfs",
    title: "Tree DFS",
    pattern: "Tree DFS",
    language: "javascript",
    chunks: [
      { type: "text", value: "function maxDepth(root) {\n  if (!root) return " },
      { type: "blank", answer: "0" },
      { type: "text", value: ";\n  return 1 + Math.max(\n    maxDepth(root." },
      { type: "blank", answer: "left" },
      { type: "text", value: "),\n    maxDepth(root." },
      { type: "blank", answer: "right" },
      { type: "text", value: ")\n  );\n}" },
    ],
    explanation: "The base case handles an empty subtree; each node contributes one level above the deeper child.",
  },
  {
    id: "backtracking",
    title: "Backtracking",
    pattern: "Backtracking",
    language: "javascript",
    chunks: [
      { type: "text", value: "function backtrack(path, choices) {\n  if (isComplete(path)) {\n    result.push(" },
      { type: "blank", answer: "[...path]" },
      { type: "text", value: ");\n    return;\n  }\n\n  for (const choice of choices) {\n    if (!isValid(choice, path)) continue;\n    path." },
      { type: "blank", answer: "push(choice)" },
      { type: "text", value: ";\n    backtrack(path, choices);\n    path." },
      { type: "blank", answer: "pop()", acceptedAnswers: ["splice(path.length - 1, 1)"] },
      { type: "text", value: ";\n  }\n}" },
    ],
    explanation: "Push a choice, recurse, then pop to restore state before trying the next choice.",
  },
  {
    id: "monotonic-stack",
    title: "Monotonic Stack",
    pattern: "Monotonic Stack",
    language: "javascript",
    chunks: [
      { type: "text", value: "function nextGreater(nums) {\n  const result = Array(nums.length).fill(-1);\n  const stack = [];\n\n  for (let i = 0; i < nums.length; i++) {\n    while (stack.length && nums[i] > nums[" },
      { type: "blank", answer: "stack[stack.length - 1]", acceptedAnswers: ["stack.at(-1)"] },
      { type: "text", value: "]) {\n      result[" },
      { type: "blank", answer: "stack.pop()" },
      { type: "text", value: "] = nums[i];\n    }\n    stack.push(" },
      { type: "blank", answer: "i" },
      { type: "text", value: ");\n  }\n\n  return result;\n}" },
    ],
    explanation: "The stack stores indexes still waiting for a greater value.",
  },
  {
    id: "prefix-sum-count",
    title: "Prefix Sum Count",
    pattern: "Prefix Sum",
    language: "javascript",
    chunks: [
      { type: "text", value: `function subarraySum(nums, k) {
  const counts = new Map([[0, 1]]);
  let prefix = 0;
  let total = 0;

  for (const num of nums) {
    prefix += num;
    total += counts.get(` },
      { type: "blank", answer: "prefix - k", acceptedAnswers: ["prefix-k"] },
      { type: "text", value: `) ?? 0;
    counts.set(prefix, ` },
      { type: "blank", answer: "(counts.get(prefix) ?? 0) + 1", acceptedAnswers: ["(counts.get(prefix)||0)+1", "1 + (counts.get(prefix) ?? 0)"] },
      { type: "text", value: `);
  }

  return total;
}` },
    ],
    explanation: "For each current prefix, earlier prefixes equal to prefix - k form subarrays that sum to k.",
  },
  {
    id: "topological-sort",
    title: "Topological Sort",
    pattern: "Topological Sort",
    language: "javascript",
    chunks: [
      { type: "text", value: `function topoSort(graph, indegree) {
  const queue = [];
  for (const [node, degree] of indegree) {
    if (degree === 0) queue.` },
      { type: "blank", answer: "push(node)" },
      { type: "text", value: `;
  }

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph.get(node) ?? []) {
      indegree.set(next, indegree.get(next) - 1);
      if (` },
      { type: "blank", answer: "indegree.get(next) === 0", acceptedAnswers: ["indegree.get(next) == 0"] },
      { type: "text", value: `) queue.push(next);
    }
  }

  return order;
}` },
    ],
    explanation: "Kahn's algorithm repeatedly processes nodes with no remaining prerequisites.",
  },
  {
    id: "trie",
    title: "Trie Insert and Search",
    pattern: "Trie",
    language: "javascript",
    chunks: [
      { type: "text", value: `class TrieNode {
  constructor() {
    this.children = new Map();
    this.end = false;
  }
}

function insert(root, word) {
  let node = root;
  for (const ch of word) {
    if (!node.children.has(ch)) node.children.set(ch, ` },
      { type: "blank", answer: "new TrieNode()" },
      { type: "text", value: `);
    node = node.children.get(ch);
  }
  node.` },
      { type: "blank", answer: "end" },
      { type: "text", value: ` = true;
}` },
    ],
    explanation: "Each character moves one level deeper, creating nodes only when the prefix does not exist yet.",
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    pattern: "Merge Intervals",
    language: "javascript",
    chunks: [
      { type: "text", value: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const interval of intervals) {
    const last = merged[merged.length - 1];
    if (!last || interval[0] > last[1]) {
      merged.push(` },
      { type: "blank", answer: "interval" },
      { type: "text", value: `);
    } else {
      last[1] = Math.max(last[1], ` },
      { type: "blank", answer: "interval[1]" },
      { type: "text", value: `);
    }
  }

  return merged;
}` },
    ],
    explanation: "After sorting by start, only the last merged interval can overlap the current interval.",
  },
  {
    id: "kadane",
    title: "Kadane's Algorithm",
    pattern: "Kadane's Algorithm",
    language: "javascript",
    chunks: [
      { type: "text", value: `function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], ` },
      { type: "blank", answer: "current + nums[i]", acceptedAnswers: ["nums[i] + current"] },
      { type: "text", value: `);
    best = Math.max(best, ` },
      { type: "blank", answer: "current" },
      { type: "text", value: `);
  }

  return best;
}` },
    ],
    explanation: "At every index, choose between extending the previous subarray or starting fresh.",
  },
  {
    id: "binary-search-answer",
    title: "Binary Search on Answer",
    pattern: "Binary Search on Answer",
    language: "javascript",
    chunks: [
      { type: "text", value: `function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const hours = piles.reduce((sum, pile) => sum + Math.ceil(pile / mid), 0);
    if (hours <= h) {
      ` },
      { type: "blank", answer: "right = mid", acceptedAnswers: ["right=mid"] },
      { type: "text", value: `;
    } else {
      ` },
      { type: "blank", answer: "left = mid + 1", acceptedAnswers: ["left=mid+1"] },
      { type: "text", value: `;
    }
  }

  return left;
}` },
    ],
    explanation: "If a speed works, try lower speeds; if it fails, all lower speeds fail too.",
  },
  {
    id: "dijkstra",
    title: "Dijkstra with Priority Queue",
    pattern: "Dijkstra's Algorithm",
    language: "javascript",
    chunks: [
      { type: "text", value: `function dijkstra(start, graph) {
  const dist = new Map([[start, 0]]);
  const heap = [[0, start]];

  while (heap.length) {
    const [cost, node] = heapPop(heap);
    if (cost !== dist.get(node)) continue;
    for (const [next, weight] of graph.get(node) ?? []) {
      const nextCost = ` },
      { type: "blank", answer: "cost + weight", acceptedAnswers: ["weight + cost"] },
      { type: "text", value: `;
      if (nextCost < (dist.get(next) ?? Infinity)) {
        dist.set(next, nextCost);
        heapPush(heap, ` },
      { type: "blank", answer: "[nextCost, next]" },
      { type: "text", value: `);
      }
    }
  }

  return dist;
}` },
    ],
    explanation: "The priority queue expands the currently cheapest known path before more expensive candidates.",
  },
  {
    id: "union-find",
    title: "Union Find",
    pattern: "Union Find",
    language: "javascript",
    chunks: [
      { type: "text", value: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.` },
      { type: "blank", answer: "find(this.parent[x])" },
      { type: "text", value: `;
    }
    return this.parent[x];
  }
  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;
    this.parent[rootB] = ` },
      { type: "blank", answer: "rootA" },
      { type: "text", value: `;
    return true;
  }
}` },
    ],
    explanation: "Path compression flattens future lookups, and union merges two connected components.",
  },
  {
    id: "lowest-common-ancestor",
    title: "Lowest Common Ancestor",
    pattern: "Lowest Common Ancestor",
    language: "javascript",
    chunks: [
      { type: "text", value: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return ` },
      { type: "blank", answer: "root" },
      { type: "text", value: `;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return ` },
      { type: "blank", answer: "root" },
      { type: "text", value: `;
  return left || right;
}` },
    ],
    explanation: "If both sides return a target, the current node is the split point and therefore the ancestor.",
  },
  {
    id: "palindrome-expansion",
    title: "Palindrome Expansion",
    pattern: "Palindrome Expansion",
    language: "javascript",
    chunks: [
      { type: "text", value: `function expand(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    ` },
      { type: "blank", answer: "left--", acceptedAnswers: ["left -= 1", "left = left - 1"] },
      { type: "text", value: `;
    ` },
      { type: "blank", answer: "right++", acceptedAnswers: ["right += 1", "right = right + 1"] },
      { type: "text", value: `;
  }
  return right - left - 1;
}` },
    ],
    explanation: "Expanding from a center stops when the characters no longer mirror each other.",
  },
  {
    id: "difference-array",
    title: "Difference Array",
    pattern: "Difference Array",
    language: "javascript",
    chunks: [
      { type: "text", value: `function applyUpdates(n, updates) {
  const diff = Array(n + 1).fill(0);
  for (const [left, right, value] of updates) {
    diff[left] += value;
    diff[` },
      { type: "blank", answer: "right + 1", acceptedAnswers: ["right+1"] },
      { type: "text", value: `] -= value;
  }

  const result = [];
  let current = 0;
  for (let i = 0; i < n; i++) {
    current += diff[i];
    result.push(` },
      { type: "blank", answer: "current" },
      { type: "text", value: `);
  }

  return result;
}` },
    ],
    explanation: "Range updates become two boundary changes; a final prefix sum reconstructs the array.",
  },
];
