// for unweighted edges or static edges, BREADTH FIRST SEARCH (BFS) is used to find the shortest path
// Time Complexity: O(V + E) where V is number of vertices and E is number of edges

// there can be multiple type of inputs to represent a graph structure:
// 1. edges list: [[0,1], [0,2], [1,2], [1,3], ...] where each pair [n1,n2] represents an undirected edge between node n1 and n2. you need to build adjacency list from this first

// question
// given edges list, number of vertices(nodes), start node and destination node, return the shortest path from start to destination

const edges = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 7],
  [3, 7],
  [6, 7],
  [4, 5],
  [4, 6],
  [5, 6],
];

console.log(bfsShortestPath(8, edges, 0, 7), "// [0, 3, 7]");
console.log(bfsShortestPath(8, edges, 2, 6), "// [2, 1, 0, 3, 4, 6]");

function bfsShortestPath(
  V: number,
  edges: number[][], // [n1, n2]
  start: number,
  destination: number
): number[] {
  // build adjacency list
  // init parent(to build path)
  //      queue(to pass neighbors)
  //      visited(not to visit again) array.
  // build parent with consuming queue
  // build path with parent

  // {
  //   N1: [N2, N3, ...],
  //   N2: [N1, N4, ...],
  //   ...
  // }
  const adj: Record<number, number[]> = {};
  for (const [n1, n2] of edges) {
    if (!adj[n1]) adj[n1] = [];
    if (!adj[n2]) adj[n2] = [];
    adj[n1].push(n2);
    adj[n2].push(n1); // undirected
  }

  const parent: number[] = Array(V).fill(-1);
  const queue: number[] = [];
  const visited: boolean[] = [];
  visited[start] = true;
  queue.push(start);

  while (queue.length > 0) {
    const node = queue.shift()!;

    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);

        parent[neighbor] = node;
      }
    }
  }

  // path from destination to start using parent values
  const path: number[] = [];
  let curNode = destination;
  while (curNode !== -1) {
    path.push(curNode);
    curNode = parent[curNode];
  }

  // no path found
  if (path[path.length - 1] !== start) return [];

  return path.reverse();
}

// ----------------------------------------------------------------

// for weighted edges, dijkstra's algorithm is used to find the shortest path
// time complexity: O((V + E) log(V)) where V is number of vertices and E is number of edges

// question
// given edges list with weights, number of vertices(nodes), start node and destination node, return the shortest path from start to destination

const weightedEdges: [number, number, number][] = [
  [0, 1, 5],
  [1, 2, 2],
  [0, 3, 3],
  [3, 4, 6],
  [4, 7, 2],
  [3, 7, 4],
  [6, 7, 1],
  [4, 5, 3],
  [4, 6, 5],
  [5, 6, 2],
];

console.log(
  dijkstraShortestPath(8, weightedEdges, 1, 5),
  "// [ 1, 0, 3, 7, 6, 5 ] cost 15"
);
console.log(
  dijkstraShortestPath(8, weightedEdges, 3, 6),
  "// [ 3, 7, 6 ] cost 5"
);

function dijkstraShortestPath(
  V: number,
  edges: [number, number, number][], // [n1, n2, weight]
  start: number,
  destination: number
): number[] {
  // build adjacency list
  // init parent(to build path)
  //      priority queue(to pass neighbors)
  //      distance(to track shortest known distance) array.
  // build parent with loop
  // build path with parent

  // build adjacency list with weights
  // {
  //   N1: [[N2, weight], [N3, weight], ...],
  //   N2: [[N1, weight], [N4, weight], ...],
  //   ...
  // }
  const adj: Record<number, Array<[number, number]>> = {};
  for (const [n1, n2, weight] of edges) {
    if (!adj[n1]) adj[n1] = [];
    if (!adj[n2]) adj[n2] = [];
    adj[n1].push([n2, weight]);
    adj[n2].push([n1, weight]); // undirected
  }

  // distance array and parent tracking
  const parent: number[] = Array(V).fill(-1);
  const pq: [number, number][] = []; // [distance, node]
  const dist: number[] = Array(V).fill(Infinity);
  dist[start] = 0;
  pq.push([0, start]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift()!;

    for (const [neighbor, weight] of adj[node]) {
      const newDist = d + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.push([newDist, neighbor]);

        parent[neighbor] = node;
      }
    }
  }

  // reconstruct path
  const path: number[] = [];
  let curNode = destination;
  while (curNode !== -1) {
    path.push(curNode);
    curNode = parent[curNode];
  }

  if (path[path.length - 1] !== start) return []; // no path
  return path.reverse();
}

// ----------------------------------------------------------------

// Question
// currency conversion

// array of currency conversion rates. E.g. ['USD', 'GBP', 0.77] which means 1 USD is equal to 0.77 GBP
// an array containing a 'from' currency and a 'to' currency
// Given the above parameters, find the conversion rate that maps to the 'from' currency to the 'to' currency.
// Your return value should be a number.

// Example:
// You are given the following parameters:

// Rates: ['USD', 'JPY', 110] ['US', 'AUD', 1.45] ['JPY', 'GBP', 0.0070]
// To/From currency ['GBP', 'AUD']
// Find the rate for the 'To/From' curency. In this case, the correct result is 1.89.

// this seems like weighted graph problem
// nodes are currencies
// weighted edges are conversion rates

type Rate = [string, string, number];

export function findConversionRateBFS(
  rates: Rate[],
  from: string,
  to: string
): number | null {
  if (from === to) return 1;

  const adj: Record<string, Array<[string, number]>> = {};

  for (const [n1, n2, rate] of rates) {
    if (!adj[n1]) adj[n1] = [];
    if (!adj[n2]) adj[n2] = [];
    adj[n1].push([n2, rate]);
    adj[n2].push([n1, 1 / rate]); // add reverse conversion
  }

  if (!adj[from] || !adj[to]) return null;

  // BFS queue
  const queue: Array<{ cur: string; acc: number }> = [{ cur: from, acc: 1 }];
  const visited = new Set<string>([from]);

  while (queue.length > 0) {
    const { cur, acc } = queue.shift()!;
    if (cur === to) return acc;

    for (const [nbr, rate] of adj[cur] || []) {
      if (!visited.has(nbr)) {
        visited.add(nbr);
        queue.push({ cur: nbr, acc: acc * rate });
      }
    }
  }

  return null; // no conversion path found
}

// Example usage
const rates: Rate[] = [
  ["USD", "JPY", 110],
  ["USD", "AUD", 1.45],
  ["JPY", "GBP", 0.007],
];

console.log(findConversionRateBFS(rates, "GBP", "AUD")); // 1.89

// ----------------------------------------------------------------

// leetcode 399 - Evaluate Division
// You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

// You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

// Example 1:
// Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
// Explanation:
// Given: a / b = 2.0, b / c = 3.0
// queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
// note: x is undefined => -1.0

// SOLUTION
// this is weighted graph question again. nodes are variables, edges are division
export function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const adj: Record<string, Array<[string, number]>> = {};

  for (let i = 0; i < equations.length; i++) {
    const [n1, n2] = equations[i];
    const rate = values[i];

    if (!adj[n1]) adj[n1] = [];
    if (!adj[n2]) adj[n2] = [];
    adj[n1].push([n2, rate]);
    adj[n2].push([n1, 1 / rate]); // add reverse conversion
  }

  const results: number[] = [];

  for (const [from, to] of queries) {
    if (!adj[from] || !adj[to]) {
      results.push(-1);
      continue;
    }

    if (from === to) {
      results.push(1);
      continue;
    }

    // BFS queue
    const queue: Array<{ cur: string; acc: number }> = [{ cur: from, acc: 1 }];
    const visited = new Set<string>([from]);
    let found = false;

    while (queue.length > 0 && !found) {
      const { cur, acc } = queue.shift()!;
      if (cur === to) {
        results.push(acc);
        found = true;
        break;
      }

      for (const [nbr, rate] of adj[cur] || []) {
        if (!visited.has(nbr)) {
          visited.add(nbr);
          queue.push({ cur: nbr, acc: acc * rate });
        }
      }
    }

    if (!found) results.push(-1);
  }

  return results;
}

console.log(
  calcEquation(
    [
      ["a", "b"],
      ["b", "c"],
    ],
    [2.0, 3.0],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"],
    ]
  )
);
