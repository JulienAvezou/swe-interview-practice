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
  {
    id: "fast-slow-pointers",
    name: "Fast & Slow Pointers",
    explanation: "Move two pointers at different speeds to detect cycles, find middles, or locate meeting points.",
    signals: ["cycle", "middle node", "linked list", "runner", "detect loop"],
    whenToUse: ["A sequence is pointer-based", "You need cycle detection or midpoint without extra storage"],
    commonProblems: ["Linked List Cycle", "Find the Duplicate Number", "Middle of the Linked List"],
    template: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "The fast pointer catches the slow pointer only if there is a cycle, so I can detect loops without storing visited nodes.",
  },
  {
    id: "merge-intervals",
    name: "Merge Intervals",
    explanation: "Sort ranges by start time, then combine overlapping ranges as you scan.",
    signals: ["intervals", "overlap", "merge", "meeting rooms", "ranges"],
    whenToUse: ["Ranges may overlap", "Sorting by start makes local merging possible"],
    commonProblems: ["Merge Intervals", "Insert Interval", "Meeting Rooms"],
    template: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  for (const [start, end] of intervals) {
    const last = result[result.length - 1];
    if (!last || start > last[1]) result.push([start, end]);
    else last[1] = Math.max(last[1], end);
  }
  return result;
}`,
    complexity: { time: "O(n log n)", space: "O(n)" },
    voiceOver: "Sorting puts potentially overlapping intervals next to each other, so one scan can either extend the last interval or start a new one.",
  },
  {
    id: "sweep-line",
    name: "Sweep Line",
    explanation: "Turn starts and ends into events, sort them, and track active state as time or position advances.",
    signals: ["maximum overlap", "calendar", "events", "line sweep", "active count"],
    whenToUse: ["You need overlap counts over ranges", "Interval endpoints drive the answer"],
    commonProblems: ["Meeting Rooms II", "Car Pooling", "My Calendar"],
    template: `function maxOverlap(intervals) {
  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1], [end, -1]);
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let active = 0;
  let best = 0;
  for (const [, delta] of events) {
    active += delta;
    best = Math.max(best, active);
  }
  return best;
}`,
    complexity: { time: "O(n log n)", space: "O(n)" },
    voiceOver: "I model each interval boundary as an event. As the sweep moves forward, the active count tells me how many ranges currently overlap.",
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    explanation: "Order directed graph nodes so prerequisites appear before dependents.",
    signals: ["prerequisites", "dependencies", "ordering", "DAG", "cycle"],
    whenToUse: ["Tasks depend on other tasks", "You need a valid order or cycle detection"],
    commonProblems: ["Course Schedule II", "Alien Dictionary", "Build Order"],
    template: `function topoSort(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const indegree = Array(n).fill(0);
  for (const [a, b] of edges) {
    graph[a].push(b);
    indegree[b]++;
  }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return order.length === n ? order : [];
}`,
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    voiceOver: "I track indegrees so I can repeatedly take nodes with no remaining prerequisites. If some nodes never become available, there is a cycle.",
  },
  {
    id: "trie",
    name: "Trie",
    explanation: "Store strings character by character to share prefixes and support prefix lookup.",
    signals: ["prefix", "autocomplete", "dictionary", "word search", "starts with"],
    whenToUse: ["Many strings share prefixes", "Prefix queries must be fast"],
    commonProblems: ["Implement Trie", "Word Search II", "Search Suggestions System"],
    template: `class TrieNode {
  constructor() {
    this.children = new Map();
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.end = true;
  }
}`,
    complexity: { time: "O(L) per word/query", space: "O(total characters)" },
    voiceOver: "A trie lets me reuse shared prefixes, so prefix checks depend on the length of the word rather than the number of words.",
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    explanation: "Use binary representation directly for masks, toggles, parity, and set membership over small domains.",
    signals: ["xor", "single number", "bitmask", "subsets", "power of two"],
    whenToUse: ["The domain fits into bits", "XOR or masking simplifies state"],
    commonProblems: ["Single Number", "Counting Bits", "Subsets with Bitmask"],
    template: `function singleNumber(nums) {
  let value = 0;
  for (const num of nums) {
    value ^= num;
  }
  return value;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "XOR cancels equal values, so pairs disappear and the unique value remains without extra storage.",
  },
  {
    id: "greedy",
    name: "Greedy",
    explanation: "Make the locally best valid choice when that choice can be proven not to block an optimal answer.",
    signals: ["minimum number", "maximum profit", "sort then choose", "interval scheduling", "can reach"],
    whenToUse: ["A local choice has a clear exchange argument", "Sorting exposes the best next decision"],
    commonProblems: ["Jump Game", "Non-overlapping Intervals", "Gas Station"],
    template: `function canJump(nums) {
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
  }
  return true;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "I only need to track the farthest reachable index. If I ever stand beyond it, no future choice can recover.",
  },
  {
    id: "kadane",
    name: "Kadane's Algorithm",
    explanation: "Track the best subarray ending at the current index and the best seen overall.",
    signals: ["maximum subarray", "contiguous sum", "best ending here", "negative reset"],
    whenToUse: ["The answer is a contiguous subarray", "A bad prefix can be dropped"],
    commonProblems: ["Maximum Subarray", "Maximum Product Subarray", "Best Sightseeing Pair"],
    template: `function maxSubArray(nums) {
  let best = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "At each index, I decide whether to extend the previous subarray or start fresh. That captures the best contiguous sum in one pass.",
  },
  {
    id: "divide-and-conquer",
    name: "Divide and Conquer",
    explanation: "Split a problem into independent subproblems, solve them recursively, then combine results.",
    signals: ["split in half", "merge results", "recursive halves", "balanced recursion"],
    whenToUse: ["Subproblems are independent", "Combining smaller answers is simpler than solving globally"],
    commonProblems: ["Merge Sort", "Sort List", "Maximum Subarray Divide and Conquer"],
    template: `function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  return merge(left, right);
}`,
    complexity: { time: "Often O(n log n)", space: "O(n) or recursion-dependent" },
    voiceOver: "I split the input into smaller independent pieces, solve each recursively, and combine their answers in a controlled way.",
  },
  {
    id: "quickselect",
    name: "Quickselect",
    explanation: "Partition around a pivot and recurse only into the side containing the desired rank.",
    signals: ["kth largest", "kth smallest", "top k", "selection without full sort"],
    whenToUse: ["You need one rank, not fully sorted order", "Average-case linear time is acceptable"],
    commonProblems: ["Kth Largest Element", "Top K Frequent Elements", "K Closest Points"],
    template: `function quickselect(nums, k) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const pivotIndex = partition(nums, left, right);
    if (pivotIndex === k) return nums[pivotIndex];
    if (pivotIndex < k) left = pivotIndex + 1;
    else right = pivotIndex - 1;
  }
}`,
    complexity: { time: "Average O(n), worst O(n^2)", space: "O(1)" },
    voiceOver: "Quickselect is useful because after partitioning, only one side can contain the kth element, so I avoid sorting everything.",
  },
  {
    id: "matrix-traversal",
    name: "Matrix Traversal",
    explanation: "Navigate a 2D grid using row/column bounds and directional offsets.",
    signals: ["grid", "matrix", "neighbors", "directions", "bounds"],
    whenToUse: ["The input is a grid", "Movement rules define adjacent cells"],
    commonProblems: ["Spiral Matrix", "Search a 2D Matrix", "Set Matrix Zeroes"],
    template: `const directions = [[1,0],[-1,0],[0,1],[0,-1]];

function inBounds(row, col, grid) {
  return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
}`,
    complexity: { time: "O(rows * cols)", space: "Depends on traversal state" },
    voiceOver: "For matrix problems, I make movement explicit with direction arrays and guard every neighbor with a bounds check.",
  },
  {
    id: "flood-fill",
    name: "Flood Fill",
    explanation: "Expand from a starting cell to all connected cells that meet a condition.",
    signals: ["island", "region", "connected cells", "same color", "component in grid"],
    whenToUse: ["Cells form connected components", "You need to mark or count a whole region"],
    commonProblems: ["Flood Fill", "Number of Islands", "Max Area of Island"],
    template: `function fill(grid, row, col, target) {
  if (!inBounds(row, col, grid) || grid[row][col] !== target) return;
  grid[row][col] = "#";
  fill(grid, row + 1, col, target);
  fill(grid, row - 1, col, target);
  fill(grid, row, col + 1, target);
  fill(grid, row, col - 1, target);
}`,
    complexity: { time: "O(rows * cols)", space: "O(rows * cols) worst-case recursion" },
    voiceOver: "I treat the grid as a graph and mark cells as soon as I visit them so each cell is processed once.",
  },
  {
    id: "multi-source-bfs",
    name: "Multi-source BFS",
    explanation: "Start BFS from many sources at once to compute nearest distance or simultaneous spread.",
    signals: ["nearest", "all gates", "rotting", "minutes", "distance to closest"],
    whenToUse: ["Many starting points spread simultaneously", "You need minimum distance to any source"],
    commonProblems: ["Rotting Oranges", "Walls and Gates", "01 Matrix"],
    template: `function multiSourceBfs(starts, getNeighbors) {
  const queue = [...starts];
  const seen = new Set(starts);
  let distance = 0;
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      for (const next of getNeighbors(node)) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push(next);
      }
    }
    distance++;
  }
}`,
    complexity: { time: "O(V + E)", space: "O(V)" },
    voiceOver: "By seeding the queue with every source, BFS expands in synchronized layers and naturally gives nearest distances.",
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    explanation: "Find shortest paths in a graph with non-negative edge weights using a priority queue.",
    signals: ["weighted graph", "shortest path", "minimum cost", "non-negative weights"],
    whenToUse: ["Edges have weights", "All weights are non-negative"],
    commonProblems: ["Network Delay Time", "Path With Minimum Effort", "Cheapest Flights with constraints variant"],
    template: `function dijkstra(start, graph) {
  const dist = new Map([[start, 0]]);
  const heap = [[0, start]];
  while (heap.length) {
    const [cost, node] = heapPop(heap);
    if (cost !== dist.get(node)) continue;
    for (const [next, weight] of graph.get(node) ?? []) {
      const nextCost = cost + weight;
      if (nextCost < (dist.get(next) ?? Infinity)) {
        dist.set(next, nextCost);
        heapPush(heap, [nextCost, next]);
      }
    }
  }
  return dist;
}`,
    complexity: { time: "O((V + E) log V)", space: "O(V + E)" },
    voiceOver: "The priority queue always expands the cheapest known path next, which is valid because edge weights are non-negative.",
  },
  {
    id: "tree-lca",
    name: "Lowest Common Ancestor",
    explanation: "Find the deepest tree node that has two target nodes in its subtree.",
    signals: ["lowest common ancestor", "two nodes in tree", "ancestor", "subtree contains"],
    whenToUse: ["Two nodes must be related through ancestry", "Recursive subtree results can identify the split point"],
    commonProblems: ["Lowest Common Ancestor of Binary Tree", "LCA of BST", "Smallest Common Region"],
    template: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,
    complexity: { time: "O(n)", space: "O(h)" },
    voiceOver: "If each target appears in a different subtree, the current node is the lowest split point. Otherwise the answer bubbles up from one side.",
  },
  {
    id: "binary-search-on-answer",
    name: "Binary Search on Answer",
    explanation: "Binary search a numeric answer range using a monotonic feasibility check.",
    signals: ["minimize maximum", "capacity", "can finish", "smallest possible", "monotonic condition"],
    whenToUse: ["You can test whether a candidate answer is feasible", "Feasibility stays true or false past a boundary"],
    commonProblems: ["Koko Eating Bananas", "Capacity to Ship Packages", "Split Array Largest Sum"],
    template: `function minFeasible(low, high, canDo) {
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (canDo(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
}`,
    complexity: { time: "O(check * log range)", space: "O(1)" },
    voiceOver: "I am not searching the input directly; I am searching the answer space because the feasibility check is monotonic.",
  },
  {
    id: "palindrome-expansion",
    name: "Palindrome Expansion",
    explanation: "Expand around each possible center to find palindromic substrings.",
    signals: ["palindrome", "substring", "center", "longest palindromic"],
    whenToUse: ["The palindrome is contiguous", "A center-based expansion is simpler than DP"],
    commonProblems: ["Longest Palindromic Substring", "Palindromic Substrings"],
    template: `function expand(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;
    right++;
  }
  return right - left - 1;
}`,
    complexity: { time: "O(n^2)", space: "O(1)" },
    voiceOver: "Every palindrome has a center, so I try each center and expand while the characters match.",
  },
  {
    id: "rolling-hash",
    name: "Rolling Hash",
    explanation: "Maintain a hash for a moving substring so repeated substring checks can be fast.",
    signals: ["duplicate substring", "string matching", "rolling", "Rabin-Karp", "hash window"],
    whenToUse: ["You compare many substrings", "Hash collisions are acceptable with verification or double hashing"],
    commonProblems: ["Repeated DNA Sequences", "Longest Duplicate Substring", "Rabin-Karp Search"],
    template: `function rollingHash(s, length) {
  let hash = 0;
  const base = 26;
  const mod = 1000000007;
  let power = 1;
  for (let i = 0; i < length; i++) power = (power * base) % mod;
  for (let i = 0; i < s.length; i++) {
    hash = (hash * base + s.charCodeAt(i)) % mod;
    if (i >= length) hash = (hash - s.charCodeAt(i - length) * power) % mod;
  }
}`,
    complexity: { time: "O(n)", space: "O(n) for stored hashes" },
    voiceOver: "A rolling hash lets me update a substring fingerprint in constant time as the window moves.",
  },
  {
    id: "monotonic-queue",
    name: "Monotonic Queue",
    explanation: "Maintain a deque in sorted order to answer sliding window min or max queries.",
    signals: ["sliding window maximum", "window minimum", "deque", "range max"],
    whenToUse: ["You need best value in every moving window", "Values leaving the window must be removed efficiently"],
    commonProblems: ["Sliding Window Maximum", "Shortest Subarray with Sum at Least K"],
    template: `function maxSlidingWindow(nums, k) {
  const deque = [];
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
    complexity: { time: "O(n)", space: "O(k)" },
    voiceOver: "The deque keeps only useful candidates for the current window maximum, and every index enters and leaves once.",
  },
  {
    id: "difference-array",
    name: "Difference Array",
    explanation: "Record range updates at boundaries, then prefix-sum the differences to recover final values.",
    signals: ["range update", "increment interval", "many updates", "booking capacity"],
    whenToUse: ["Many operations update ranges", "You only need final values or cumulative counts"],
    commonProblems: ["Car Pooling", "Corporate Flight Bookings", "Range Addition"],
    template: `function applyRangeUpdates(n, updates) {
  const diff = Array(n + 1).fill(0);
  for (const [left, right, value] of updates) {
    diff[left] += value;
    diff[right + 1] -= value;
  }
  const result = Array(n).fill(0);
  let current = 0;
  for (let i = 0; i < n; i++) {
    current += diff[i];
    result[i] = current;
  }
  return result;
}`,
    complexity: { time: "O(n + updates)", space: "O(n)" },
    voiceOver: "Instead of touching every element in a range, I mark where the change starts and stops, then rebuild values with a prefix sum.",
  },
  {
    id: "segment-tree",
    name: "Segment Tree",
    explanation: "Store aggregate values over intervals to support fast range queries and point updates.",
    signals: ["range query", "point update", "mutable array", "sum/min/max interval"],
    whenToUse: ["Both updates and range queries happen repeatedly", "Prefix sums are not enough because values change"],
    commonProblems: ["Range Sum Query Mutable", "Count of Smaller Numbers After Self"],
    template: `class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.tree = Array(this.n * 2).fill(0);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = nums[i];
    for (let i = this.n - 1; i > 0; i--) this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
  }
  update(i, val) {
    i += this.n;
    this.tree[i] = val;
    while (i > 1) {
      i = Math.floor(i / 2);
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
    }
  }
}`,
    complexity: { time: "O(log n) query/update", space: "O(n)" },
    voiceOver: "A segment tree keeps precomputed interval aggregates while still allowing updates in logarithmic time.",
  },
  {
    id: "linearly-scan-state-machine",
    name: "Linear State Machine",
    explanation: "Track a small finite state while scanning input once.",
    signals: ["validate string", "parse pattern", "state changes", "one pass with flags"],
    whenToUse: ["Only a few states matter", "The answer depends on transitions while scanning"],
    commonProblems: ["Valid Number", "String to Integer", "Detect Capital"],
    template: `function validate(s) {
  let seenDigit = false;
  let seenDot = false;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") seenDigit = true;
    else if (ch === "." && !seenDot) seenDot = true;
    else return false;
  }
  return seenDigit;
}`,
    complexity: { time: "O(n)", space: "O(1)" },
    voiceOver: "I can solve this with a small amount of state because each character only changes what is allowed next.",
  },
  {
    id: "ordered-set",
    name: "Ordered Set / Balanced BST",
    explanation: "Use a sorted dynamic structure for predecessor, successor, and rank-style queries.",
    signals: ["closest value", "lower bound", "ceiling", "floor", "dynamic sorted order"],
    whenToUse: ["You need sorted lookups while values change", "Hash maps cannot answer order questions"],
    commonProblems: ["Contains Duplicate III", "My Calendar I", "Find Right Interval"],
    template: `// JavaScript has no built-in ordered set.
// In interviews, explain operations as:
// insert(value) -> O(log n)
// remove(value) -> O(log n)
// lowerBound(value) -> O(log n)`,
    complexity: { time: "O(log n) per operation", space: "O(n)" },
    voiceOver: "A hash set can tell me equality, but an ordered set can find nearest values and boundaries in logarithmic time.",
  },
];
