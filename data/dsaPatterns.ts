import type { DSAPattern } from "./types";

export const dsaPatterns: DSAPattern[] = [
  {
    id: "array-traversal",
    name: "Array Traversal",
    explanation: "Walk through an array once or in controlled passes to compute, filter, count, or transform values.",
    signals: ["scan every item", "find max/min", "count values", "in-place update"],
    whenToUse: ["The solution naturally needs to inspect each element", "Order matters but no nested comparison is required"],
    commonProblems: ["Best Time to Buy and Sell Stock", "Move Zeroes", "Maximum Subarray"],
    template: `function scan(nums) {
  let best = -Infinity;
  for (const value of nums) {
    best = Math.max(best, value);
  }
  return best;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "I only need one pass because each element contributes independently to the running answer. That gives O(n) time and constant extra space.",
  },
  {
    id: "hash-map-set",
    name: "Hash Map / Hash Set",
    explanation: "Use keyed storage for constant-time membership checks, counts, indexes, or grouping.",
    signals: ["seen before", "duplicate", "frequency", "lookup complement", "group by"],
    whenToUse: ["You need fast lookup while scanning", "A brute force nested search can be replaced by remembering prior values"],
    commonProblems: ["Two Sum", "Valid Anagram", "Group Anagrams", "Contains Duplicate"],
    template: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
    complexity: { time: "O(n)", space: "O(n)" },
    voiceOver: "I am using a hash map because I need constant-time lookup. That avoids checking every pair and reduces the time from O(n^2) to O(n).",
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    explanation: "Move two indexes through a sequence to compare, partition, shrink, or converge.",
    signals: ["sorted array", "pair sum", "palindrome", "remove in-place", "opposite ends"],
    whenToUse: ["Input is sorted or can be sorted", "A left/right boundary can eliminate impossible candidates"],
    commonProblems: ["Two Sum II", "Valid Palindrome", "Container With Most Water", "Remove Duplicates"],
    template: `function hasPair(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "Because the data is ordered, each pointer movement rules out a set of pairs. I can search linearly instead of trying all combinations.",
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    explanation: "Maintain a moving range over contiguous items while updating state as the range expands or shrinks.",
    signals: ["substring", "subarray", "contiguous", "longest", "smallest window", "at most k"],
    whenToUse: ["The answer must be contiguous", "You can update validity by adding/removing one item"],
    commonProblems: ["Longest Substring Without Repeating Characters", "Minimum Window Substring", "Max Consecutive Ones III"],
    template: `function longestUnique(s) {
  const seen = new Set();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    complexity: { time: "O(n)", space: "O(k)" },
    voiceOver: "The prompt asks for a contiguous substring, so I keep a window and adjust it until it is valid. Each character enters and leaves once, so the scan is linear.",
  },
  {
    id: "prefix-sum",
    name: "Prefix Sum",
    explanation: "Precompute running totals so range sums or subarray differences can be answered quickly.",
    signals: ["range sum", "subarray sum equals k", "many queries", "difference between prefixes"],
    whenToUse: ["You repeatedly need sums over intervals", "A target subarray can be expressed as current prefix minus old prefix"],
    commonProblems: ["Subarray Sum Equals K", "Range Sum Query", "Product Except Self"],
    template: `function buildPrefix(nums) {
  const prefix = [0];
  for (const num of nums) {
    prefix.push(prefix[prefix.length - 1] + num);
  }
  return prefix;
}`,
    complexity: { time: "O(n)", space: "O(n)" },
    voiceOver: "I am turning each range question into a subtraction between prefix totals, which avoids recomputing the same sums repeatedly.",
  },
  {
    id: "binary-search",
    name: "Binary Search",
    explanation: "Repeatedly halve an ordered search space until the target or boundary is found.",
    signals: ["sorted", "minimum possible", "first true", "search answer space", "monotonic"],
    whenToUse: ["The data or answer space is monotonic", "A decision lets you discard half the candidates"],
    commonProblems: ["Binary Search", "Search Insert Position", "Koko Eating Bananas", "Find Minimum in Rotated Sorted Array"],
    template: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    complexity: { time: "O(log n)", space: "O(1)" },
    voiceOver: "I can use binary search because each comparison tells me which half cannot contain the answer. That creates logarithmic time.",
  },
  {
    id: "bfs",
    name: "BFS",
    explanation: "Explore nodes level by level using a queue.",
    signals: ["shortest path in unweighted graph", "level order", "minimum steps", "nearest"],
    whenToUse: ["You need the fewest edges or earliest level", "Neighbors should be processed in waves"],
    commonProblems: ["Rotting Oranges", "Word Ladder", "Binary Tree Level Order Traversal"],
    template: `function bfs(start, getNeighbors) {
  const queue = [start];
  const seen = new Set([start]);
  while (queue.length) {
    const node = queue.shift();
    for (const next of getNeighbors(node)) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
}`,
    complexity: { time: "O(V + E)", space: "O(V)" },
    voiceOver: "BFS is appropriate because I care about levels or minimum steps. The queue preserves distance order in an unweighted graph.",
  },
  {
    id: "dfs",
    name: "DFS",
    explanation: "Explore as far as possible down one path before backtracking.",
    signals: ["connected components", "path exists", "explore all possibilities", "recursive traversal"],
    whenToUse: ["You need full exploration", "The structure is naturally recursive or stack-based"],
    commonProblems: ["Number of Islands", "Clone Graph", "Course Schedule"],
    template: `function dfs(node, seen, getNeighbors) {
  if (seen.has(node)) return;
  seen.add(node);
  for (const next of getNeighbors(node)) {
    dfs(next, seen, getNeighbors);
  }
}`,
    complexity: { time: "O(V + E)", space: "O(V)" },
    voiceOver: "I am using DFS to fully explore each reachable region before moving on. Marking visited nodes prevents cycles from causing repeated work.",
  },
  {
    id: "linked-list-pointers",
    name: "Linked List Pointer Manipulation",
    explanation: "Carefully rewire node references using previous, current, next, slow, or fast pointers.",
    signals: ["reverse list", "cycle", "remove nth", "merge lists", "in-place nodes"],
    whenToUse: ["The structure is node-based", "You must change links without random access"],
    commonProblems: ["Reverse Linked List", "Linked List Cycle", "Merge Two Sorted Lists", "Remove Nth Node"],
    template: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "Because this is a linked list, I cannot index into it. I keep explicit pointers and save next before rewiring the current node.",
  },
  {
    id: "tree-dfs",
    name: "Tree DFS",
    explanation: "Use preorder, inorder, or postorder recursion to collect, validate, or aggregate tree information.",
    signals: ["root to leaf", "height", "valid BST", "path sum", "subtree"],
    whenToUse: ["A decision depends on child subtrees", "The tree can be processed recursively"],
    commonProblems: ["Maximum Depth of Binary Tree", "Validate BST", "Path Sum", "Diameter of Binary Tree"],
    template: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    complexity: { time: "O(n)", space: "O(h)" },
    voiceOver: "Each subtree has the same shape as the original problem, so recursion fits. I visit every node once and use stack space proportional to height.",
  },
  {
    id: "tree-bfs",
    name: "Tree BFS",
    explanation: "Traverse a tree level by level with a queue.",
    signals: ["level order", "right side view", "minimum depth", "average by level"],
    whenToUse: ["The prompt talks about levels", "You need the first answer by distance from the root"],
    commonProblems: ["Level Order Traversal", "Binary Tree Right Side View", "Minimum Depth of Binary Tree"],
    template: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
    complexity: { time: "O(n)", space: "O(w)" },
    voiceOver: "The question is level-oriented, so a queue lets me process one depth at a time and keep the traversal order clear.",
  },
  {
    id: "heap-priority-queue",
    name: "Heap / Priority Queue",
    explanation: "Keep the next smallest or largest item available without fully sorting every time.",
    signals: ["top k", "kth largest", "merge sorted", "schedule by priority", "closest"],
    whenToUse: ["You repeatedly need the min or max", "Only the top portion matters"],
    commonProblems: ["Kth Largest Element", "Merge K Sorted Lists", "Top K Frequent Elements"],
    template: `// JavaScript has no built-in heap. Use a small Heap class in interviews
// or explain push/pop are O(log n) when using a priority queue.`,
    complexity: { time: "O(n log k)", space: "O(k)" },
    voiceOver: "A heap keeps only the most relevant candidates ordered. That is cheaper than sorting all values when I only need the top k.",
  },
  {
    id: "backtracking",
    name: "Backtracking",
    explanation: "Build candidates step by step, undo choices, and prune invalid paths.",
    signals: ["all combinations", "permutations", "subsets", "valid arrangements", "choose or skip"],
    whenToUse: ["You must enumerate possibilities", "Partial choices can be validated before continuing"],
    commonProblems: ["Subsets", "Permutations", "Combination Sum", "N-Queens"],
    template: `function backtrack(path, choices) {
  if (isComplete(path)) {
    result.push([...path]);
    return;
  }
  for (const choice of choices) {
    if (!isValid(choice, path)) continue;
    path.push(choice);
    backtrack(path, choices);
    path.pop();
  }
}`,
    complexity: { time: "O(branches^depth)", space: "O(depth)" },
    voiceOver: "This is an enumeration problem, so I will try choices recursively, stop invalid paths early, and undo each choice before trying the next one.",
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    explanation: "Solve overlapping subproblems once and reuse their answers.",
    signals: ["min/max ways", "count ways", "optimal", "overlapping choices", "state transition"],
    whenToUse: ["Brute force repeats the same subproblem", "The answer can be described by a state and recurrence"],
    commonProblems: ["Climbing Stairs", "House Robber", "Coin Change", "Longest Increasing Subsequence"],
    template: `function climbStairs(n) {
  let prev = 1;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
    complexity: { time: "Usually O(states * transition)", space: "O(states) or optimized" },
    voiceOver: "I see repeated subproblems, so I define what each state means and compute each state once instead of branching repeatedly.",
  },
  {
    id: "monotonic-stack",
    name: "Monotonic Stack",
    explanation: "Maintain a stack in increasing or decreasing order to find next greater or smaller elements efficiently.",
    signals: ["next greater", "previous smaller", "daily temperatures", "span", "nearest boundary"],
    whenToUse: ["Each element needs the nearest larger or smaller neighbor", "A nested scan would repeatedly discard dominated values"],
    commonProblems: ["Daily Temperatures", "Largest Rectangle in Histogram", "Next Greater Element"],
    template: `function nextGreater(nums) {
  const result = Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,
    complexity: { time: "O(n)", space: "O(n)" },
    voiceOver: "The stack keeps unresolved indexes in useful order. Each index is pushed and popped at most once, which turns the nested-looking search into O(n).",
  },
  {
    id: "graph-traversal",
    name: "Graph Traversal",
    explanation: "Represent relationships as adjacency lists and traverse with BFS or DFS while tracking visited nodes.",
    signals: ["nodes and edges", "network", "dependencies", "connected", "routes"],
    whenToUse: ["The problem is about relationships", "You need reachability, components, ordering, or paths"],
    commonProblems: ["Course Schedule", "Number of Connected Components", "Network Delay Time"],
    template: `function buildGraph(edges) {
  const graph = new Map();
  for (const [a, b] of edges) {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push(b);
  }
  return graph;
}`,
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    voiceOver: "I convert the relationships into an adjacency list so traversal is direct. Then I visit nodes once and scan each edge once.",
  },
  {
    id: "union-find",
    name: "Union Find",
    explanation: "Track connected groups with near-constant-time find and merge operations.",
    signals: ["connect components", "friend circles", "redundant edge", "dynamic connectivity"],
    whenToUse: ["You need to merge sets over time", "Connectivity queries appear after unions"],
    commonProblems: ["Number of Provinces", "Redundant Connection", "Accounts Merge"],
    template: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;
    if (this.rank[rootA] < this.rank[rootB]) this.parent[rootA] = rootB;
    else if (this.rank[rootA] > this.rank[rootB]) this.parent[rootB] = rootA;
    else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }
    return true;
  }
}`,
    complexity: { time: "Almost O(1) per operation", space: "O(n)" },
    voiceOver: "Union find is a good fit because I am merging groups and asking whether two items already belong to the same group.",
  },
];
