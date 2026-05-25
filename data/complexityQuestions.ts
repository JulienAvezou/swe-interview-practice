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
  {
    id: "constant-array-access",
    title: "Constant Array Access",
    snippet: `const first = nums[0];
const last = nums[nums.length - 1];
return first + last;`,
    timeAnswer: "O(1)",
    spaceAnswer: "O(1)",
    explanation: "The code reads a fixed number of positions regardless of the array length.",
  },
  {
    id: "recursive-fibonacci",
    title: "Naive Recursive Fibonacci",
    snippet: `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
    timeAnswer: "O(2^n)",
    spaceAnswer: "O(n)",
    explanation: "Each call branches into two more calls, creating exponential repeated work. The deepest call stack is linear.",
  },
  {
    id: "memoized-fibonacci",
    title: "Memoized Fibonacci",
    snippet: `function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  memo.set(n, fib(n - 1, memo) + fib(n - 2, memo));
  return memo.get(n);
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(n)",
    explanation: "Each value from 0 through n is computed once and stored in the memo table.",
  },
  {
    id: "matrix-scan",
    title: "Matrix Scan",
    snippet: `for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[row].length; col++) {
    count += grid[row][col];
  }
}`,
    timeAnswer: "O(n^2)",
    spaceAnswer: "O(1)",
    explanation: "For an n by n grid, the nested loops visit n squared cells and only keep one counter.",
  },
  {
    id: "two-pointer-palindrome",
    title: "Two Pointer Palindrome Check",
    snippet: `let left = 0;
let right = s.length - 1;
while (left < right) {
  if (s[left] !== s[right]) return false;
  left++;
  right--;
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(1)",
    explanation: "The pointers move toward the middle, so each character is checked at most once.",
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    snippet: `function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid)));
}`,
    timeAnswer: "O(n log n)",
    spaceAnswer: "O(n)",
    explanation: "There are logarithmic split levels, and each level merges all n items. The merge output needs linear space.",
  },
  {
    id: "balanced-tree-search",
    title: "Balanced Tree Search",
    snippet: `while (node) {
  if (node.val === target) return node;
  node = target < node.val ? node.left : node.right;
}`,
    timeAnswer: "O(log n)",
    spaceAnswer: "O(1)",
    explanation: "In a balanced binary search tree, each comparison discards about half the remaining nodes.",
  },
  {
    id: "generate-subsets",
    title: "Generate Subsets",
    snippet: `function dfs(i) {
  if (i === nums.length) {
    result.push([...path]);
    return;
  }
  dfs(i + 1);
  path.push(nums[i]);
  dfs(i + 1);
  path.pop();
}`,
    timeAnswer: "O(2^n)",
    spaceAnswer: "O(2^n)",
    explanation: "Each element has two choices, include or skip, so there are 2^n subsets. Storing all subsets is also exponential.",
  },
  {
    id: "heap-build-pop",
    title: "Heap Top K",
    snippet: `const heap = [];
for (const value of nums) {
  heapPush(heap, value);
  if (heap.length > k) heapPop(heap);
}`,
    timeAnswer: "O(n log n)",
    spaceAnswer: "O(n)",
    explanation: "With the available choices, the dominant idea is logarithmic heap work inside a linear loop. A tighter bound with fixed k is O(n log k).",
  },
  {
    id: "set-intersection",
    title: "Set Intersection",
    snippet: `const values = new Set(nums1);
const result = [];
for (const value of nums2) {
  if (values.has(value)) result.push(value);
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(n)",
    explanation: "Building the set and scanning the second array are linear in total input size, and the set can store all values.",
  },
  {
    id: "sort-then-scan",
    title: "Sort Then Scan",
    snippet: `intervals.sort((a, b) => a[0] - b[0]);
for (const interval of intervals) {
  mergeIntoResult(interval);
}`,
    timeAnswer: "O(n log n)",
    spaceAnswer: "O(n)",
    explanation: "Sorting dominates the linear merge pass. The result can grow to hold all intervals.",
  },
  {
    id: "fixed-alphabet-count",
    title: "Fixed Alphabet Count",
    snippet: `const counts = Array(26).fill(0);
for (const ch of s) {
  counts[ch.charCodeAt(0) - 97]++;
}`,
    timeAnswer: "O(n)",
    spaceAnswer: "O(1)",
    explanation: "The loop scans the string once. The count array has fixed size 26, so it is constant space.",
  },
];
